import { useEffect, useMemo, useState } from "react";
import {
  LANGUAGES,
  LANGUAGE_STORAGE_KEY,
  getCopy,
  getInitialLanguage,
  isChineseLanguage,
  joinLabels,
  labelOption,
  labelPriority,
  labelSafety,
  labelStatus,
  labelSupport,
  labelTag,
  labelUser,
  languageName,
  localizeText
} from "./i18n.js";
import * as api from "./services/livanudgeApi.js";

const today = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Hong_Kong" }).format(new Date());
const STORAGE_KEY = "livanudge-menopause-mpvp-state";

const defaultUser = {
  user_id: "W001",
  pilot_id: "MENO-HK-001",
  name: "msLam",
  age: 52,
  gender: "female",
  life_stage: "perimenopause",
  district: "Kowloon East",
  group: "intervention"
};

const defaultCheckin = {
  date: today,
  feeling: "okay",
  sleep_hours: 6,
  hot_flashes: 2,
  night_sweats: false,
  mood: "steady",
  stress_level: 3,
  energy_level: 3,
  period_status: "irregular",
  urinary_leakage: false,
  joint_pain: false,
  postmenopausal_bleeding: false,
  heavy_bleeding: false,
  chest_pain: false,
  severe_breathless: false,
  severe_headache_neuro: false,
  self_harm_thoughts: false
};

const safetyFields = [
  "postmenopausal_bleeding",
  "heavy_bleeding",
  "chest_pain",
  "severe_breathless",
  "severe_headache_neuro",
  "self_harm_thoughts"
];
const statusOptions = ["pending", "contacted", "closed"];

function readSavedState() {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function getSafetyAlerts(checkin) {
  return safetyFields.filter((field) => Boolean(checkin[field]));
}

function getSupport(checkin, partnerAuthorised) {
  const alerts = getSafetyAlerts(checkin);
  const hotFlashes = Number(checkin.hot_flashes) || 0;
  const stress = Number(checkin.stress_level) || 0;
  const energy = Number(checkin.energy_level) || 0;
  const sleep = Number(checkin.sleep_hours) || 0;

  const score =
    (hotFlashes >= 5 ? 3 : hotFlashes >= 3 ? 2 : hotFlashes >= 1 ? 1 : 0) +
    (checkin.night_sweats ? 2 : 0) +
    (sleep < 5.5 ? 2 : sleep < 6.5 ? 1 : 0) +
    (checkin.mood === "low" || checkin.mood === "anxious" ? 2 : checkin.mood === "irritable" ? 1 : 0) +
    (stress >= 5 ? 2 : stress >= 4 ? 1 : 0) +
    (energy <= 2 ? 1 : 0) +
    (checkin.urinary_leakage ? 1 : 0) +
    (checkin.joint_pain ? 1 : 0) +
    (partnerAuthorised ? 0 : 1);

  const level = alerts.length ? "safety" : score >= 8 ? "high" : score >= 4 ? "watch" : "normal";
  const colorClass =
    level === "safety"
      ? "border-rose-300 bg-rose-100 text-rose-950"
      : level === "high"
        ? "border-orange-300 bg-orange-100 text-orange-950"
        : level === "watch"
          ? "border-amber-300 bg-amber-100 text-amber-950"
          : "border-teal-300 bg-teal-100 text-teal-950";

  const tags = alerts.length ? ["safety_first", "partner_support", "service_followup"] : [];
  if (!alerts.length && hotFlashes >= 1) tags.push("hot_flashes");
  if (!alerts.length && (checkin.night_sweats || sleep < 6.5)) tags.push("sleep_rhythm");
  if (!alerts.length && (checkin.mood !== "steady" || stress >= 4)) tags.push("mood_pressure");
  if (!alerts.length && checkin.joint_pain) tags.push("bone_strength");
  if (!alerts.length && checkin.urinary_leakage) tags.push("pelvic_floor");
  if (!alerts.length) tags.push("nutrition");

  return { level, score, alerts, colorClass, tags: tags.slice(0, 5) };
}

function buildAccessLog(language) {
  return [
    {
      who: isChineseLanguage(language) ? labelOption("partner", language) : "Partner",
      action: getCopy(language).me.accessSummary,
      time: "2026-05-21 09:12"
    },
    {
      who: isChineseLanguage(language) ? localizeText("服務護士 A", language) : "Nurse A",
      action: getCopy(language).team.safetyTitle,
      time: "2026-05-20 16:40"
    }
  ];
}

function useEndpoint(loader, deps) {
  const [state, setState] = useState({ loading: true, error: "", data: null });
  useEffect(() => {
    let alive = true;
    setState({ loading: true, error: "", data: null });
    loader()
      .then((data) => alive && setState({ loading: false, error: "", data }))
      .catch((error) => alive && setState({ loading: false, error: error.message || "Error", data: null }));
    return () => {
      alive = false;
    };
  }, deps);
  return state;
}

function App() {
  const savedState = useMemo(() => readSavedState(), []);
  const [language, setLanguage] = useState(() => savedState?.language || getInitialLanguage());
  const [mode, setMode] = useState(savedState?.mode || "woman");
  const [womanPage, setWomanPage] = useState("home");
  const [partnerPage, setPartnerPage] = useState("overview");
  const [teamPage, setTeamPage] = useState("queue");
  const [checkin, setCheckin] = useState({ ...defaultCheckin, ...(savedState?.checkin || {}) });
  const [completed, setCompleted] = useState(savedState?.completed || {});
  const [followupStatuses, setFollowupStatuses] = useState(savedState?.followupStatuses || {});
  const [partnerAuthorised, setPartnerAuthorised] = useState(savedState?.partnerAuthorised ?? true);
  const [recordStep, setRecordStep] = useState("safety");
  const [recordSaved, setRecordSaved] = useState(false);
  const [partnerSaved, setPartnerSaved] = useState(false);
  const [needHelp, setNeedHelp] = useState(false);
  const text = getCopy(language);
  const support = useMemo(() => getSupport(checkin, partnerAuthorised), [checkin, partnerAuthorised]);

  const todayState = useEndpoint(
    () => api.getToday({ locale: language, support, checkin }),
    [language, support.level, checkin.hot_flashes, checkin.night_sweats, checkin.sleep_hours, checkin.mood]
  );
  const actionsState = useEndpoint(
    () => api.getTodayActions({ locale: language, support, completed }),
    [language, support.level, support.tags.join("|"), JSON.stringify(completed)]
  );
  const followupsState = useEndpoint(
    () => api.listFollowups({ locale: language, support, alerts: support.alerts, completed, statuses: followupStatuses }),
    [language, support.level, support.alerts.join("|"), JSON.stringify(completed), JSON.stringify(followupStatuses)]
  );
  const caseState = useEndpoint(
    () => api.getCaseDetail({ locale: language, support, alerts: support.alerts, completed }),
    [language, support.level, support.alerts.join("|"), JSON.stringify(completed)]
  );
  const integrationState = useEndpoint(() => api.getIntegrationOverview({ locale: language }), [language]);

  useEffect(() => {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ language, mode, checkin, completed, followupStatuses, partnerAuthorised, updated_at: new Date().toISOString() })
    );
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  }, [language, mode, checkin, completed, followupStatuses, partnerAuthorised]);

  const switchMode = (nextMode) => {
    setMode(nextMode);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const updateCheckin = (field, value) => {
    setRecordSaved(false);
    setPartnerSaved(false);
    setCheckin((current) => ({ ...current, [field]: value }));
  };

  const handleSafetyChange = (field, checked) => {
    updateCheckin(field, checked);
    if (checked) setRecordStep("safety-alert");
  };

  const submitRecord = async (inputBy = "participant") => {
    const payload = {
      ...checkin,
      input_by_role: inputBy,
      ...(inputBy === "partner"
        ? { input_by_user_id: "SP001", assisted_user_id: defaultUser.user_id }
        : { input_by_user_id: defaultUser.user_id })
    };
    await api.createCheckin({ locale: language, payload });
    if (inputBy === "partner") setPartnerSaved(true);
    else setRecordSaved(true);
  };

  const completeAction = async (assignmentId) => {
    await api.completeAction({ locale: language, assignmentId });
    setCompleted((current) => ({ ...current, [assignmentId]: true }));
  };

  const updateFollowup = async (followupId, status) => {
    await api.updateFollowup({ locale: language, followupId, status });
    setFollowupStatuses((current) => ({ ...current, [followupId]: status }));
  };

  const exportPayload = {
    exported_at: new Date().toISOString(),
    locale: language,
    service_mode: api.getApiMode(),
    participant: { user_id: defaultUser.user_id, pilot_id: defaultUser.pilot_id, life_stage: defaultUser.life_stage },
    today_record: checkin,
    support: { level: support.level, tags: support.tags, alerts: support.alerts },
    completion: completed,
    partner_authorised: partnerAuthorised,
    followups: followupsState.data?.items || []
  };

  return (
    <div className="app-shell text-slate-950">
      <header className="sticky top-0 z-30 border-b border-rose-100 bg-white/95 backdrop-blur">
        <div className="mobile-container flex flex-col gap-3 px-4 py-3">
          <div>
            <p className="text-lg font-bold text-teal-700">{text.appName}</p>
            <h1 className="text-xl font-bold tracking-normal">{text.productLine}</h1>
          </div>
          <div className="flex flex-col gap-3">
            <ModeSelector mode={mode} modes={text.modes} switchMode={switchMode} />
            <LanguageSelector language={language} setLanguage={setLanguage} />
          </div>
        </div>
      </header>

      <main className="mobile-container px-4 pb-40 pt-4">
        {mode === "woman" && womanPage === "home" && (
          <WomanHome
            text={text}
            language={language}
            support={support}
            todayState={todayState}
            actionsState={actionsState}
            completed={completed}
            needHelp={needHelp}
            setNeedHelp={setNeedHelp}
            onComplete={completeAction}
            goRecord={() => setWomanPage("record")}
          />
        )}
        {mode === "woman" && womanPage === "record" && (
          <TodayRecord
            text={text}
            language={language}
            support={support}
            checkin={checkin}
            recordStep={recordStep}
            setRecordStep={setRecordStep}
            recordSaved={recordSaved}
            updateCheckin={updateCheckin}
            handleSafetyChange={handleSafetyChange}
            submitRecord={() => submitRecord("participant")}
          />
        )}
        {mode === "woman" && womanPage === "weekly" && <WeeklyPage text={text} language={language} support={support} checkin={checkin} completed={completed} />}
        {mode === "woman" && womanPage === "me" && (
          <MePage
            text={text}
            language={language}
            support={support}
            partnerAuthorised={partnerAuthorised}
            setPartnerAuthorised={setPartnerAuthorised}
            setLanguage={setLanguage}
          />
        )}

        {mode === "partner" && (
          <PartnerDesk
            text={text}
            language={language}
            page={partnerPage}
            setPage={setPartnerPage}
            support={support}
            checkin={checkin}
            completed={completed}
            authorised={partnerAuthorised}
            setAuthorised={setPartnerAuthorised}
            updateCheckin={updateCheckin}
            submitRecord={() => submitRecord("partner")}
            partnerSaved={partnerSaved}
          />
        )}

        {mode === "team" && (
          <TeamDesk
            text={text}
            language={language}
            page={teamPage}
            support={support}
            followupsState={followupsState}
            caseState={caseState}
            integrationState={integrationState}
            updateFollowup={updateFollowup}
            exportPayload={exportPayload}
          />
        )}

        {mode === "demo" && <DemoMode text={text} language={language} support={support} exportPayload={exportPayload} />}
      </main>

      {mode === "woman" && <MobileBottomNav active={womanPage} setActive={setWomanPage} items={text.womanNav} />}
      {mode === "partner" && <MobileBottomNav active={partnerPage} setActive={setPartnerPage} items={text.partnerNav} />}
      {mode === "team" && <MobileBottomNav active={teamPage} setActive={setTeamPage} items={mobileTeamNav(text.teamNav)} />}
    </div>
  );
}

function ModeSelector({ mode, modes, switchMode }) {
  return (
    <label className="block">
      <span className="sr-only">Mode</span>
      <select value={mode} onChange={(event) => switchMode(event.target.value)} className="large-tap w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-lg font-bold text-slate-900">
        {Object.entries(modes).map(([key, label]) => (
          <option key={key} value={key}>{label}</option>
        ))}
      </select>
    </label>
  );
}

function MobileBottomNav({ active, setActive, items }) {
  const entries = Object.entries(items);
  const gridClass = entries.length > 4 ? "grid-cols-3" : "grid-cols-4";
  return (
    <nav className="mobile-bottom-nav fixed bottom-0 z-40 border-t border-rose-100 bg-white px-2 pb-[calc(env(safe-area-inset-bottom)+8px)] pt-2 shadow-[0_-12px_30px_rgba(15,23,42,0.10)]">
      <div className={`mx-auto grid ${gridClass} gap-1`}>
        {entries.map(([key, label]) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            className={`min-h-[56px] rounded-md border px-1 py-2 text-base font-bold leading-tight ${active === key ? "border-teal-700 bg-teal-700 text-white" : "border-slate-200 bg-white text-slate-800"}`}
          >
            {label}
          </button>
        ))}
      </div>
    </nav>
  );
}

function mobileTeamNav(items) {
  return {
    queue: items.queue,
    cases: items.cases,
    safety: items.safety,
    integration: items.integration
  };
}

function t(language, zhHK, en) {
  return isChineseLanguage(language) ? localizeText(zhHK, language) : en;
}

function LanguageSelector({ language, setLanguage }) {
  return (
    <div className="grid grid-cols-3 gap-2 rounded-lg border border-slate-200 bg-slate-50 p-1">
      {LANGUAGES.map((item) => (
        <button
          key={item}
          onClick={() => setLanguage(item)}
          className={`large-tap rounded-md px-3 py-2 text-base font-bold ${language === item ? "bg-slate-900 text-white" : "bg-white text-slate-800"}`}
        >
          {languageName(item, language)}
        </button>
      ))}
    </div>
  );
}

function WomanHome({ text, language, support, todayState, actionsState, completed, needHelp, setNeedHelp, onComplete, goRecord }) {
  if (todayState.loading || actionsState.loading) return <LoadingCard text={text} />;
  const todayData = todayState.data;
  const actions = (actionsState.data?.actions || []).filter((action) => action.image_status === "approved").slice(0, 3);
  const completedCount = actions.filter((action) => completed[action.assignment_id]).length;
  const showSafety = support.level === "safety" || needHelp;

  return (
    <div className="space-y-6">
      <section className="grid gap-4">
        <div className="hero-card rounded-xl p-6">
          <p className="text-lg font-bold text-teal-900">{text.home.greeting}</p>
          <h2 className="mt-2 text-3xl font-bold leading-tight">{text.home.title}</h2>
          <p className="mt-3 text-lg leading-8 text-slate-700">{showSafety ? text.home.alertBody : text.home.safeBody}</p>
          <div className={`mt-5 rounded-lg border p-4 ${support.colorClass}`}>
            <p className="text-base font-bold">{todayData.safety_title}</p>
            <p className="mt-1 text-2xl font-bold">{labelSupport(support.level, language)}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {support.tags.map((tag) => <span key={tag} className="rounded-full bg-white/75 px-3 py-2 text-sm font-bold">{labelTag(tag, language)}</span>)}
            </div>
          </div>
          <div className="mt-6 grid gap-3">
            <button onClick={() => setNeedHelp(true)} className="large-tap rounded-md bg-rose-700 px-5 py-4 text-xl font-bold text-white">
              {text.common.helpNow}
            </button>
            <button onClick={goRecord} className="large-tap rounded-md bg-teal-700 px-5 py-4 text-xl font-bold text-white">
              {text.common.goRecord}
            </button>
          </div>
        </div>
      </section>

      {showSafety ? (
        <SafetyPanel text={text} />
      ) : (
        <section className="card rounded-lg p-6">
          <h3 className="text-3xl font-bold">{text.home.actionsTitle}</h3>
          <p className="mt-2 text-lg text-slate-600">{text.home.completedCount(completedCount, actions.length)}</p>
          <div className="mt-5 grid gap-4">
            {actions.map((action) => <ActionCard key={action.assignment_id} action={action} text={text} language={language} onComplete={onComplete} />)}
          </div>
        </section>
      )}

      <section className="grid gap-4">
        <InfoPanel title={text.home.partnerTitle} body={text.home.partnerBody} tone="teal" />
        <div className="card rounded-lg p-6">
          <h3 className="text-2xl font-bold">{text.home.remindersTitle}</h3>
          <div className="mt-4 space-y-3">
            {todayData.reminders.map((reminder) => (
              <div key={reminder.assignment_id} className="rounded-lg border border-teal-100 bg-teal-50 p-4">
                <p className="text-lg font-bold text-teal-950">{reminder.title}</p>
                <p className="mt-1 text-base leading-7 text-teal-950">{reminder.short_description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function ActionCard({ action, text, language, onComplete }) {
  const [open, setOpen] = useState(false);
  const done = action.status === "completed";
  const altText = language === "zh-CN" ? action.alt_text_zh_cn : isChineseLanguage(language) ? action.alt_text_zh_hk : action.alt_text_en;
  return (
    <article className="overflow-hidden rounded-lg border border-rose-100 bg-white shadow-sm">
      <img src={action.image_url} alt={altText} className="h-40 w-full object-cover" />
      <div className="p-5">
        <h4 className="text-2xl font-bold leading-tight">{action.title}</h4>
        <p className="mt-3 text-lg leading-8 text-slate-700">{action.short_description}</p>
        <div className="mt-4 rounded-lg bg-teal-50 p-3 text-base font-semibold text-teal-950">
          {text.common.safetyNote}: {action.safety_note}
        </div>
        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="rounded-full bg-slate-100 px-3 py-2 text-base font-bold text-slate-700">{text.common.minutes(action.estimated_minutes)}</span>
          <button onClick={() => onComplete(action.assignment_id)} className={`large-tap rounded-md px-5 py-3 text-lg font-bold ${done ? "bg-emerald-600 text-white" : "bg-teal-700 text-white"}`}>
            {done ? text.common.completed : text.common.markDone}
          </button>
        </div>
        <button onClick={() => setOpen((value) => !value)} className="large-tap mt-4 w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-base font-bold text-slate-800">
          {text.common.why}
        </button>
        {open && <p className="mt-3 rounded-lg bg-slate-50 p-3 text-base leading-7 text-slate-700">{action.reason}</p>}
      </div>
    </article>
  );
}

function TodayRecord({ text, language, support, checkin, recordStep, setRecordStep, recordSaved, updateCheckin, handleSafetyChange, submitRecord }) {
  if (support.level === "safety" || recordStep === "safety-alert") {
    return (
      <div className="space-y-6">
        <PageTitle title={text.record.redFlagDetected} subtitle={text.record.redFlagBody} />
        <SafetyPanel text={text} />
        <button onClick={() => setRecordStep("record")} className="large-tap rounded-md border border-teal-700 bg-white px-6 py-4 text-xl font-bold text-teal-800">
          {text.record.recordStep}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageTitle title={text.record.title} subtitle={text.record.subtitle} />
      {recordStep === "safety" ? (
        <section className="card rounded-lg p-6">
          <h3 className="text-3xl font-bold">{text.record.safetyStep}</h3>
          <p className="mt-3 text-lg leading-8 text-slate-700">{text.record.safetyHelp}</p>
          <div className="mt-5 grid gap-3">
            {safetyFields.map((field) => (
              <label key={field} className="flex min-h-16 items-center gap-3 rounded-lg border border-rose-200 bg-rose-50 p-4 text-lg font-bold text-rose-950">
                <input className="h-6 w-6 accent-rose-700" type="checkbox" checked={Boolean(checkin[field])} onChange={(event) => handleSafetyChange(field, event.target.checked)} />
                <span>{labelSafety(field, language)}</span>
              </label>
            ))}
          </div>
          <button onClick={() => setRecordStep("record")} className="large-tap mt-6 rounded-md bg-teal-700 px-6 py-4 text-xl font-bold text-white">
            {text.common.continue}
          </button>
        </section>
      ) : (
        <RecordForm text={text} language={language} checkin={checkin} updateCheckin={updateCheckin} submitLabel={text.record.submit} onSubmit={submitRecord} saved={recordSaved} success={text.record.success} />
      )}
    </div>
  );
}

function RecordForm({ text, language, checkin, updateCheckin, submitLabel, onSubmit, saved, success, assisted }) {
  return (
    <section className="card rounded-lg p-6">
      <h3 className="text-3xl font-bold">{text.record.recordStep}</h3>
      {assisted && <p className="mt-3 rounded-lg bg-teal-50 p-4 text-lg font-bold text-teal-950">{assisted}</p>}
      <div className="mt-5 grid gap-4">
        <SelectField label={text.record.feeling} value={checkin.feeling} options={["good", "okay", "tired", "unwell"]} language={language} onChange={(value) => updateCheckin("feeling", value)} />
        <NumberField label={text.record.sleep} value={checkin.sleep_hours} step="0.5" min="0" onChange={(value) => updateCheckin("sleep_hours", value)} />
        <NumberField label={text.record.hotFlashes} value={checkin.hot_flashes} min="0" onChange={(value) => updateCheckin("hot_flashes", value)} />
        <SelectField label={text.record.mood} value={checkin.mood} options={["steady", "anxious", "low", "irritable"]} language={language} onChange={(value) => updateCheckin("mood", value)} />
        <NumberField label={text.record.stress} value={checkin.stress_level} min="1" max="5" onChange={(value) => updateCheckin("stress_level", value)} />
        <NumberField label={text.record.energy} value={checkin.energy_level} min="1" max="5" onChange={(value) => updateCheckin("energy_level", value)} />
        <SelectField label={text.record.periodStatus} value={checkin.period_status} options={["regular", "irregular", "no_period_12m", "postmenopause"]} language={language} onChange={(value) => updateCheckin("period_status", value)} />
        <ToggleRow label={text.record.nightSweats} checked={checkin.night_sweats} onChange={(value) => updateCheckin("night_sweats", value)} />
        <ToggleRow label={text.record.urinaryLeakage} checked={checkin.urinary_leakage} onChange={(value) => updateCheckin("urinary_leakage", value)} />
        <ToggleRow label={text.record.jointPain} checked={checkin.joint_pain} onChange={(value) => updateCheckin("joint_pain", value)} />
      </div>
      <button onClick={onSubmit} className="large-tap mt-6 rounded-md bg-teal-700 px-6 py-4 text-xl font-bold text-white">
        {submitLabel}
      </button>
      {saved && <p className="mt-4 rounded-lg bg-emerald-50 p-4 text-lg font-bold text-emerald-900">{success}</p>}
    </section>
  );
}

function WeeklyPage({ text, language, support, checkin, completed }) {
  const done = Object.values(completed).filter(Boolean).length;
  const safe = support.level === "safety";
  return (
    <div className="space-y-6">
      <PageTitle title={text.weekly.title} subtitle={text.weekly.subtitle} />
      <section className="grid gap-4">
        <MetricCard title={text.weekly.checkins} value="5" detail={text.common.sevenDays} />
        <MetricCard title={text.weekly.actions} value={`${done}/3`} detail={text.common.thisWeek} />
        <MetricCard title={text.weekly.hotFlashes} value={String(Number(checkin.hot_flashes) + 8)} detail={t(language, "近7天估算", "Estimated in 7 days")} />
        <MetricCard title={text.weekly.sleep} value={String(((Number(checkin.sleep_hours) + 6 + 6.5 + 7 + 5.5) / 5).toFixed(1))} detail={isChineseLanguage(language) ? localizeText("小時", language) : "hours"} />
        <MetricCard title={text.weekly.energy} value={`${checkin.energy_level}/5`} detail={text.record.energy} />
      </section>
      <section className="grid gap-4">
        <InfoPanel title={text.weekly.encouragementTitle} body={safe ? text.weekly.encouragementSafe : text.weekly.encouragementNormal} tone="green" />
        <InfoPanel title={text.weekly.goalTitle} body={safe ? text.weekly.goalSafe : text.weekly.goalNormal} tone="teal" />
      </section>
    </div>
  );
}

function MePage({ text, language, support, partnerAuthorised, setPartnerAuthorised, setLanguage }) {
  const accessLog = buildAccessLog(language);
  return (
    <div className="space-y-6">
      <PageTitle title={text.me.title} subtitle={text.me.subtitle} />
      <section className="grid gap-4">
        <div className="card rounded-lg p-6">
          <h3 className="text-2xl font-bold">{text.me.profileTitle}</h3>
          <div className="mt-4 grid gap-3">
            <InfoRow label={isChineseLanguage(language) ? localizeText("姓名", language) : "Name"} value={labelUser(defaultUser.name, language)} />
            <InfoRow label={isChineseLanguage(language) ? localizeText("試點編號", language) : "Pilot ID"} value={defaultUser.pilot_id} />
            <InfoRow label={isChineseLanguage(language) ? localizeText("階段", language) : "Stage"} value={labelOption(defaultUser.life_stage, language)} />
            <InfoRow label={text.team.supportLevel} value={labelSupport(support.level, language)} />
          </div>
        </div>
        <InfoPanel title={text.me.partnerTitle} body={text.me.partnerBody} tone="teal" />
        <div className="card rounded-lg p-6">
          <h3 className="text-2xl font-bold">{text.me.languageTitle}</h3>
          <div className="mt-4">
            <LanguageSelector language={language} setLanguage={setLanguage} />
          </div>
        </div>
      </section>
      <section className="grid gap-4">
        <InfoPanel title={text.me.privacyTitle} body={text.me.privacyBody} tone="green" />
        <InfoPanel title={text.me.consentTitle} body={text.me.consentBody} tone="teal" />
        <div className="rounded-lg border border-rose-300 bg-rose-50 p-6 text-rose-950">
          <h3 className="text-2xl font-bold">{text.me.withdrawTitle}</h3>
          <p className="mt-3 text-lg leading-8">{text.me.withdrawBody}</p>
          <button onClick={() => setPartnerAuthorised(false)} className="large-tap mt-4 rounded-md bg-rose-700 px-5 py-3 text-lg font-bold text-white">
            {text.partner.revoke}
          </button>
        </div>
      </section>
      <section className="card rounded-lg p-6">
        <h3 className="text-2xl font-bold">{text.me.accessTitle}</h3>
        <div className="mt-4 grid gap-3">
          {accessLog.map((row) => <InfoRow key={`${row.who}-${row.time}`} label={`${row.who} · ${row.time}`} value={row.action} />)}
        </div>
      </section>
      {!partnerAuthorised && (
        <button onClick={() => setPartnerAuthorised(true)} className="large-tap rounded-md border border-teal-700 bg-white px-6 py-4 text-xl font-bold text-teal-800">
          {text.partner.restore}
        </button>
      )}
    </div>
  );
}

function PartnerDesk({ text, language, page, setPage, support, checkin, completed, authorised, setAuthorised, updateCheckin, submitRecord, partnerSaved }) {
  if (!authorised) return <AuthorisationGate text={text} setAuthorised={setAuthorised} />;

  if (page === "assist") {
    return (
      <div className="space-y-6">
        <PageTitle title={text.partner.assistedLabel} subtitle={text.partner.assistBody} />
        <RecordForm text={text} language={language} checkin={checkin} updateCheckin={updateCheckin} submitLabel={text.record.submit} onSubmit={submitRecord} saved={partnerSaved} success={text.partner.assistSuccess} assisted={text.partner.assistedLabel} />
      </div>
    );
  }

  if (page === "reminders") return <PartnerReminders text={text} language={language} />;
  if (page === "consent") return <PartnerConsent text={text} language={language} setAuthorised={setAuthorised} />;

  const done = Object.values(completed).filter(Boolean).length;
  const hasSafety = support.level === "safety";
  return (
    <div className="space-y-6">
      <PageTitle title={text.partner.overviewTitle} subtitle={text.partner.subtitle} />
      <section className="grid gap-4">
        <MobileAnswerCard
          tone="teal"
          question={t(language, "今日有沒有記錄？", "Has she recorded today?")}
          title={t(language, "今日狀態", "Today status")}
          body={`${isChineseLanguage(language) ? localizeText("已記錄", language) : "Recorded"} · ${labelUser(defaultUser.name, language)} · ${today}`}
        />
        <MobileAnswerCard
          tone={hasSafety ? "red" : "green"}
          question={t(language, "有沒有需要先處理的提示？", "Any priority alert?")}
          title={text.safety.title}
          body={support.alerts.length ? `${labelSupport("safety", language)} · ${joinLabels(support.alerts, language, labelSafety)}` : t(language, "今日沒有安全提示，可以按平日方式支持。", "No safety alert today. Offer ordinary support.")}
        />
        <MobileAnswerCard
          tone={hasSafety ? "red" : "teal"}
          question={t(language, "我可以怎樣幫？", "How can I help?")}
          title={text.partner.assistedLabel}
          body={hasSafety ? `${t(language, "先關心和陪同求助", "Check in and help seek care first")} · ${text.home.alertBody}` : text.partner.assistBody}
          actionLabel={text.partner.assistedLabel}
          onAction={() => setPage("assist")}
        />
        <MobileAnswerCard
          tone="green"
          question={text.common.sevenDays}
          title={t(language, "最近 7 天", "Last 7 days")}
          body={t(language, `近7天有 5 天完成記錄，今日舒緩小行動完成 ${done}/3 個。`, `Records were completed on 5 of the last 7 days. Today's actions: ${done}/3.`)}
        />
      </section>
    </div>
  );
}

function MobileAnswerCard({ question, title, body, actionLabel, onAction, tone = "teal" }) {
  const toneClass =
    tone === "red"
      ? "border-rose-300 bg-rose-50 text-rose-950"
      : tone === "green"
        ? "border-emerald-300 bg-emerald-50 text-emerald-950"
        : "border-teal-300 bg-teal-50 text-teal-950";
  return (
    <section className={`rounded-lg border p-5 ${toneClass}`}>
      <p className="text-base font-bold opacity-90">{question}</p>
      <h3 className="mt-2 text-2xl font-bold leading-tight">{title}</h3>
      <p className="mt-3 text-lg leading-8">{body}</p>
      {actionLabel && (
        <button onClick={onAction} className="large-tap mt-4 w-full rounded-md bg-teal-700 px-5 py-3 text-lg font-bold text-white">
          {actionLabel}
        </button>
      )}
    </section>
  );
}

function AuthorisationGate({ text, setAuthorised }) {
  return (
    <section className="rounded-lg border-2 border-amber-300 bg-amber-50 p-6 text-amber-950">
      <h2 className="text-3xl font-bold">{text.partner.blockedTitle}</h2>
      <p className="mt-3 text-xl leading-9">{text.partner.blockedBody}</p>
      <button onClick={() => setAuthorised(true)} className="large-tap mt-5 rounded-md bg-teal-700 px-6 py-4 text-xl font-bold text-white">
        {text.partner.restore}
      </button>
    </section>
  );
}

function PartnerReminders({ text, language }) {
  const rows = isChineseLanguage(language)
    ? ["每日晚上提醒完成症狀記錄", "如出現安全提示，立即通知支持者", "每週一早上發送簡短週報"].map((item) => localizeText(item, language))
    : ["Evening reminder for symptom check-in", "Notify supporter immediately when a safety alert appears", "Send a simple weekly summary every Monday morning"];
  return <ListPanel title={text.partner.remindersTitle} items={rows} />;
}

function PartnerConsent({ text, language, setAuthorised }) {
  return (
    <div className="space-y-6">
      <PageTitle title={text.partner.consentTitle} subtitle={text.partner.revokeHint} />
      <section className="grid gap-4">
        <MetricCard title={text.partner.validTitle} value={text.common.authorised} detail={isChineseLanguage(language) ? "有效至 2026-08-31" : "Valid until 2026-08-31"} />
        <MetricCard title={text.partner.scopeTitle} value={isChineseLanguage(language) ? localizeText("3項", language) : "3 scopes"} detail={isChineseLanguage(language) ? localizeText("今日記錄、安全提示、週報", language) : "Today records, safety alerts, weekly summary"} />
        <MetricCard title={isChineseLanguage(language) ? localizeText("關係", language) : "Relationship"} value={labelOption("partner", language)} detail={labelUser(defaultUser.name, language)} />
      </section>
      <button onClick={() => setAuthorised(false)} className="large-tap rounded-md bg-rose-700 px-6 py-4 text-xl font-bold text-white">
        {text.partner.revoke}
      </button>
    </div>
  );
}

function TeamDesk({ text, language, page, support, followupsState, caseState, integrationState, updateFollowup, exportPayload }) {
  if (followupsState.loading || caseState.loading || integrationState.loading) return <LoadingCard text={text} />;
  const followups = followupsState.data?.items || [];
  if (page === "queue") return <FollowupQueue text={text} language={language} followups={followups} updateFollowup={updateFollowup} />;
  if (page === "cases") return <CaseList text={text} language={language} followups={followups} caseData={caseState.data?.case} />;
  if (page === "safety") return <SafetyRecords text={text} language={language} caseData={caseState.data?.case} followups={followups} />;
  if (page === "completion") return <CompletionReport text={text} language={language} followups={followups} />;
  if (page === "integration") return <IntegrationCenter text={text} overview={integrationState.data} />;
  return <ExportPanel text={text} language={language} support={support} exportPayload={exportPayload} />;
}

function FollowupQueue({ text, language, followups, updateFollowup }) {
  const urgentCount = followups.filter((row) => row.priority === "urgent").length;
  return (
    <div className="space-y-6">
      <PageTitle title={text.team.queueTitle} subtitle={text.team.subtitle} />
      <section className="grid gap-3">
        <MobileToolTile title={t(language, "今日待跟進", "Due today")} value={String(followups.length)} detail={text.team.queueTitle} />
        <MobileToolTile title={t(language, "優先安全提示", "Priority alerts")} value={String(urgentCount)} detail={text.team.safetyTitle} tone={urgentCount ? "red" : "green"} />
        <MobileToolTile title={t(language, "個案快速查看", "Quick case view")} value={followups[0]?.pilot_id || "--"} detail={followups[0] ? labelUser(followups[0].participant, language) : text.common.noData} />
        <MobileToolTile title={t(language, "更新狀態", "Update status")} value={labelStatus("contacted", language)} detail={t(language, "一隻手即可處理", "One-handed update")} />
      </section>
      <div className="grid gap-3">
        {followups.map((row) => (
          <article key={row.followup_id} className="card rounded-lg p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-base font-bold text-slate-700">{t(language, "姓名 / 試點編號", "Name / pilot ID")}</p>
                <h3 className="mt-1 text-2xl font-bold">{labelUser(row.participant, language)}</h3>
                <p className="mt-1 text-base font-semibold text-slate-700">{row.pilot_id}</p>
              </div>
              <span className="rounded-full bg-teal-100 px-3 py-2 text-base font-bold text-teal-950">{labelPriority(row.priority, language)}</span>
            </div>
            <div className="mt-4 space-y-3">
              <DetailLine label={text.team.priority} value={labelPriority(row.priority, language)} />
              <DetailLine label={text.team.trigger} value={row.trigger} />
              <DetailLine label={text.team.action} value={row.suggested_action} />
              <DetailLine label={text.team.lastRecord} value={row.last_record_at} />
            </div>
            <StatusButtons text={text} language={language} value={row.status} onChange={(status) => updateFollowup(row.followup_id, status)} />
          </article>
        ))}
      </div>
    </div>
  );
}

function MobileToolTile({ title, value, detail, tone = "teal" }) {
  const toneClass =
    tone === "red"
      ? "border-rose-300 bg-rose-50 text-rose-950"
      : tone === "green"
        ? "border-emerald-300 bg-emerald-50 text-emerald-950"
        : "border-teal-300 bg-teal-50 text-teal-950";
  return (
    <section className={`rounded-lg border p-4 ${toneClass}`}>
      <p className="text-base font-bold">{title}</p>
      <p className="mt-1 text-3xl font-bold leading-tight">{value}</p>
      <p className="mt-1 text-base leading-6">{detail}</p>
    </section>
  );
}

function DetailLine({ label, value }) {
  return (
    <div>
      <p className="text-base font-bold text-slate-700">{label}</p>
      <p className="mt-1 text-lg font-semibold leading-7 text-slate-950">{value}</p>
    </div>
  );
}

function StatusButtons({ text, language, value, onChange }) {
  return (
    <div className="mt-4">
      <p className="text-lg font-bold text-slate-800">{text.team.status}</p>
      <div className="mt-2 grid grid-cols-3 gap-2">
        {statusOptions.map((status) => (
          <button
            key={status}
            onClick={() => onChange(status)}
            className={`large-tap rounded-md border px-2 py-3 text-base font-bold ${value === status ? "border-teal-700 bg-teal-700 text-white" : "border-slate-300 bg-white text-slate-800"}`}
          >
            {labelStatus(status, language)}
          </button>
        ))}
      </div>
    </div>
  );
}

function CaseList({ text, language, followups, caseData }) {
  return (
    <div className="space-y-6">
      <PageTitle title={text.team.casesTitle} subtitle={text.team.subtitle} />
      <section className="grid gap-4">
        {followups.map((row) => (
          <MetricCard key={row.followup_id} title={labelUser(row.participant, language)} value={`${row.completion_rate}%`} detail={`${row.pilot_id} · ${labelSupport(row.support_level, language)}`} />
        ))}
      </section>
      {caseData && <CaseDetail text={text} language={language} caseData={caseData} />}
    </div>
  );
}

function CaseDetail({ text, language, caseData }) {
  return (
    <section className="card rounded-lg p-6">
      <h3 className="text-3xl font-bold">{labelUser(caseData.participant, language)} · {caseData.pilot_id}</h3>
      <div className="mt-5 grid gap-4">
        <InfoRow label={text.case.basic} value={`${caseData.age} · ${caseData.district} · ${labelSupport(caseData.support_level, language)}`} />
        <InfoRow label={text.case.partner} value={caseData.partner_contact} />
        <InfoRow label={text.case.records} value={`${caseData.seven_day_records.filter(Boolean).length}/7`} />
        <InfoRow label={text.case.actions} value={caseData.seven_day_actions.join(" / ")} />
        <InfoRow label={text.case.safety} value={caseData.safety_history.length ? joinLabels(caseData.safety_history, language, labelSafety) : text.common.noData} />
        <InfoRow label={text.case.notes} value={caseData.worker_notes} />
      </div>
    </section>
  );
}

function SafetyRecords({ text, language, caseData, followups }) {
  const urgentRows = followups.filter((row) => row.priority === "urgent");
  return (
    <div className="space-y-6">
      <PageTitle title={text.team.safetyTitle} subtitle={text.team.subtitle} />
      {urgentRows.length ? (
        <div className="grid gap-3">
          {urgentRows.map((row) => (
            <div key={row.followup_id} className="rounded-lg border border-rose-200 bg-rose-50 p-5 text-lg text-rose-950">
              <strong>{labelUser(row.participant, language)}</strong> · {row.trigger} · {labelStatus(row.status, language)}
            </div>
          ))}
        </div>
      ) : (
        <InfoPanel title={text.common.noData} body={text.team.noFollowups} tone="green" />
      )}
      {caseData?.safety_history?.length ? <InfoPanel title={text.case.safety} body={joinLabels(caseData.safety_history, language, labelSafety)} tone="red" /> : null}
    </div>
  );
}

function CompletionReport({ text, language, followups }) {
  return (
    <div className="space-y-6">
      <PageTitle title={text.team.completionTitle} subtitle={text.team.subtitle} />
      <div className="grid gap-4">
        {followups.map((row) => <MetricCard key={row.followup_id} title={labelUser(row.participant, language)} value={`${row.completion_rate}%`} detail={row.trigger} />)}
      </div>
    </div>
  );
}

function ExportPanel({ text, language, support, exportPayload }) {
  const focusTags = joinLabels(support.tags, language, labelTag) || text.common.noData;
  return (
    <div className="space-y-6">
      <PageTitle title={text.team.exportTitle} subtitle={text.team.exportBody} />
      <button onClick={() => downloadJson("livanudge-menopause-pilot-data.json", exportPayload)} className="large-tap rounded-md bg-slate-900 px-6 py-4 text-xl font-bold text-white">
        {text.team.exportButton}
      </button>
      <section className="grid gap-4">
        <InfoRow label={text.team.supportLevel} value={labelSupport(support.level, language)} />
        <InfoRow label={text.team.focusTags} value={focusTags} />
        <InfoRow label={isChineseLanguage(language) ? localizeText("接口模式", language) : "Connection mode"} value={api.getApiMode()} />
      </section>
    </div>
  );
}

function IntegrationCenter({ text, overview }) {
  return (
    <div className="space-y-6">
      <PageTitle title={text.integration.title} subtitle={text.integration.subtitle} />
      <section className="grid gap-4">
        <MetricCard title={text.integration.maturity} value={overview.maturity} detail={text.integration.environment} />
        <MetricCard title={text.integration.environment} value={overview.environment} detail={text.integration.environmentHint} />
        <MetricCard title={text.integration.images} value={String(overview.image_pipeline.approved)} detail={text.integration.imageBody} />
      </section>
      <section className="grid gap-4">
        <ListPanel title={text.integration.services} items={overview.services.map((service) => `${service.name} · ${service.status} · ${text.integration.latency} ${service.latency_ms}ms`)} />
        <ListPanel title={text.integration.sandbox} items={overview.sandbox_tests.map((test) => `${test.name}: ${test.result}`)} tone="green" />
        <ListPanel title={text.integration.events} items={overview.event_logs} />
        <ListPanel title={text.integration.gaps} items={overview.gaps} tone="red" />
      </section>
      <section className="card rounded-lg p-6">
        <h3 className="text-2xl font-bold">{text.integration.mapping}</h3>
        <div className="mt-4 grid gap-3">
          {overview.mappings.map((row) => <InfoRow key={row.source} label={row.source} value={`${row.target} · ${row.status}`} />)}
        </div>
      </section>
    </div>
  );
}

function DemoMode({ text, language, support, exportPayload }) {
  return (
    <div className="space-y-6">
      <PageTitle title={text.demo.title} subtitle={text.demo.subtitle} />
      <section className="grid gap-4">
        <ListPanel title={text.demo.loopTitle} items={text.demo.loopItems} />
        <ListPanel title={text.demo.boundariesTitle} items={text.demo.boundaries} tone="green" />
      </section>
      <section className={`rounded-lg border p-6 ${support.colorClass}`}>
        <h3 className="text-2xl font-bold">{text.demo.tagsTitle}</h3>
        <p className="mt-3 text-4xl font-bold">{labelSupport(support.level, language)}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {support.tags.map((tag) => <span key={tag} className="rounded-full bg-white/70 px-3 py-2 text-base font-bold">{labelTag(tag, language)}</span>)}
        </div>
      </section>
      <section className="grid gap-4">
        <MetricCard title={text.demo.retention} value="74%" detail={text.demo.retentionDetail} />
        <MetricCard title={text.demo.weeklyActive} value="68%" detail={text.demo.weeklyActiveDetail} />
        <MetricCard title={text.demo.completion} value="57%" detail={text.demo.completionDetail} />
      </section>
      <ExportPanel text={{ ...text, team: { ...text.team, exportTitle: text.demo.exportTitle } }} language={language} support={support} exportPayload={exportPayload} />
    </div>
  );
}

function SafetyPanel({ text }) {
  return (
    <section className="rounded-lg border-2 border-rose-500 bg-rose-50 p-6 text-rose-950">
      <h3 className="text-3xl font-bold">{text.safety.title}</h3>
      <p className="mt-3 text-xl leading-9">{text.safety.body}</p>
      <div className="mt-5 grid gap-3">
        <button className="large-tap rounded-md bg-rose-700 px-5 py-4 text-lg font-bold text-white">{text.safety.callPartner}</button>
        <button className="large-tap rounded-md bg-white px-5 py-4 text-lg font-bold text-rose-800 ring-1 ring-rose-300">{text.safety.callStaff}</button>
        <button className="large-tap rounded-md bg-white px-5 py-4 text-lg font-bold text-rose-800 ring-1 ring-rose-300">{text.safety.emergency}</button>
      </div>
    </section>
  );
}

function LoadingCard({ text }) {
  return <div className="card rounded-lg p-6 text-xl font-bold">{text.common.loading}</div>;
}

function PageTitle({ title, subtitle }) {
  return (
    <div>
      <h2 className="text-3xl font-bold">{title}</h2>
      <p className="mt-3 max-w-4xl text-lg leading-8 text-slate-700">{subtitle}</p>
    </div>
  );
}

function MetricCard({ title, value, detail }) {
  return (
    <div className="card rounded-lg p-5">
      <p className="text-lg font-semibold text-slate-600">{title}</p>
      <p className="mt-2 text-3xl font-bold text-slate-950">{value}</p>
      <p className="mt-2 text-base leading-7 text-slate-600">{detail}</p>
    </div>
  );
}

function InfoPanel({ title, body, tone = "teal" }) {
  const toneClass =
    tone === "red"
      ? "border-rose-300 bg-rose-50 text-rose-950"
      : tone === "green"
        ? "border-emerald-300 bg-emerald-50 text-emerald-950"
        : "border-teal-300 bg-teal-50 text-teal-950";
  return (
    <section className={`rounded-lg border p-6 ${toneClass}`}>
      <h3 className="text-2xl font-bold">{title}</h3>
      <p className="mt-3 text-lg leading-8">{body}</p>
    </section>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <p className="text-base font-bold text-slate-500">{label}</p>
      <p className="mt-1 text-lg font-semibold leading-7 text-slate-900">{value}</p>
    </div>
  );
}

function SelectField({ label, value, options, language, onChange }) {
  return (
    <label className="block">
      <span className="text-lg font-bold text-slate-800">{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} className="large-tap mt-2 w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-lg font-semibold">
        {options.map((option) => <option key={option} value={option}>{labelOption(option, language)}</option>)}
      </select>
    </label>
  );
}

function NumberField({ label, value, onChange, step = "1", min, max }) {
  return (
    <label className="block">
      <span className="text-lg font-bold text-slate-800">{label}</span>
      <input value={value} min={min} max={max} step={step} onChange={(event) => onChange(event.target.value)} type="number" className="large-tap mt-2 w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-lg font-semibold" />
    </label>
  );
}

function ToggleRow({ label, checked, onChange }) {
  return (
    <label className="flex min-h-16 items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white p-4 text-lg font-bold text-slate-900">
      <span>{label}</span>
      <input className="h-6 w-6 accent-teal-700" type="checkbox" checked={Boolean(checked)} onChange={(event) => onChange(event.target.checked)} />
    </label>
  );
}

function ListPanel({ title, items, tone = "teal" }) {
  const toneClass =
    tone === "red"
      ? "border-rose-300 bg-rose-50 text-rose-950"
      : tone === "green"
        ? "border-emerald-300 bg-emerald-50 text-emerald-950"
        : "border-teal-300 bg-teal-50 text-teal-950";
  return (
    <section className={`rounded-lg border p-6 ${toneClass}`}>
      <h3 className="text-2xl font-bold">{title}</h3>
      <div className="mt-4 grid gap-3">
        {items.map((item) => (
          <div key={item} className="rounded-md bg-white/70 p-3 text-lg font-semibold leading-7">{item}</div>
        ))}
      </div>
    </section>
  );
}

function downloadJson(filename, payload) {
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

export default App;
