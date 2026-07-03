import { EN, ZH_CN } from "../i18n.js";

const wait = (payload) => Promise.resolve(payload);

function isZh(locale) {
  return locale !== EN;
}

function zhCopy(locale, hkValue, cnValue) {
  return locale === ZH_CN ? cnValue : hkValue;
}

function today() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Hong_Kong" }).format(new Date());
}

function sceneDataUri(kind) {
  const settings = {
    cooling: { bg: "#fff1f2", wash: "#e7f5ef", main: "#4b245f", accent: "#c86b5b", icon: "cooling" },
    sleep: { bg: "#f5f0fa", wash: "#e8f3f0", main: "#3b2553", accent: "#8b5e87", icon: "sleep" },
    strength: { bg: "#edf8f2", wash: "#fff2ed", main: "#3f7769", accent: "#b75c6b", icon: "strength" },
    nutrition: { bg: "#fff7e8", wash: "#e8f5ef", main: "#6d5428", accent: "#3f7769", icon: "nutrition" },
    pelvic: { bg: "#fff1f7", wash: "#edf8f5", main: "#7a3159", accent: "#8b5e87", icon: "pelvic" },
    mood: { bg: "#f3f8f5", wash: "#fff1f2", main: "#4b245f", accent: "#3f7769", icon: "mood" },
    record: { bg: "#f8f5fb", wash: "#fff1f2", main: "#4b245f", accent: "#3f7769", icon: "record" }
  };
  const { bg, wash, main, accent, icon } = settings[kind] || settings.cooling;
  const iconMarkup = {
    cooling: `
      <path d="M206 236c20-45 53-68 98-68 44 0 77 23 98 68-50 24-146 24-196 0z" fill="#fffdfb" stroke="${main}" stroke-width="8"/>
      <path d="M238 212c20-18 39-18 59 0 20 17 41 17 63-1" stroke="${accent}" stroke-width="10" stroke-linecap="round" fill="none"/>
      <path d="M416 128c42 18 64 48 65 90" stroke="${main}" stroke-width="9" stroke-linecap="round" fill="none"/>
      <path d="M416 128c22 35 22 70 0 105" stroke="${main}" stroke-width="9" stroke-linecap="round" fill="none" opacity="0.7"/>
      <path d="M416 128c-9 37-35 63-78 79" stroke="${main}" stroke-width="9" stroke-linecap="round" fill="none" opacity="0.55"/>
    `,
    sleep: `
      <rect x="168" y="152" width="192" height="82" rx="30" fill="#fffdfb" stroke="${main}" stroke-width="8"/>
      <path d="M194 184h137" stroke="${accent}" stroke-width="10" stroke-linecap="round" opacity="0.82"/>
      <path d="M398 102c-26 47 3 101 54 112-19 19-47 28-76 21-42-10-69-52-59-95 7-31 31-55 63-64-1 10 5 20 18 26z" fill="${main}" opacity="0.9"/>
      <path d="M172 254c44 22 95 22 154 0 58-22 105-20 140 4" stroke="${accent}" stroke-width="8" stroke-linecap="round" fill="none" opacity="0.52"/>
    `,
    strength: `
      <path d="M184 238c24-40 59-60 104-60 44 0 79 20 104 60" fill="#fffdfb" stroke="${main}" stroke-width="8"/>
      <circle cx="288" cy="128" r="25" fill="${accent}"/>
      <path d="M288 154v66M244 188h88" stroke="${main}" stroke-width="10" stroke-linecap="round" fill="none"/>
      <path d="M414 128h70v84h-94M420 212v48M482 212v48" stroke="${main}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity="0.78"/>
      <path d="M206 260c62 28 128 28 198 0" stroke="${accent}" stroke-width="9" stroke-linecap="round" fill="none" opacity="0.58"/>
    `,
    nutrition: `
      <path d="M172 216c25 53 184 53 209 0H172z" fill="#fffdfb" stroke="${main}" stroke-width="8"/>
      <path d="M202 194c50-27 101-27 151 0" stroke="${accent}" stroke-width="10" stroke-linecap="round" fill="none"/>
      <path d="M414 116c40 35 35 91-11 124-31-43-27-88 11-124z" fill="${wash}" stroke="${main}" stroke-width="7"/>
      <path d="M442 126c45 5 73 43 66 86-45-4-74-36-66-86z" fill="#fffdfb" stroke="${accent}" stroke-width="7"/>
      <path d="M238 176c10-22 29-34 56-34" stroke="${main}" stroke-width="8" stroke-linecap="round" fill="none" opacity="0.52"/>
    `,
    pelvic: `
      <path d="M214 116c28 34 37 75 27 124" stroke="${main}" stroke-width="10" stroke-linecap="round" fill="none"/>
      <path d="M330 116c-28 34-37 75-27 124" stroke="${main}" stroke-width="10" stroke-linecap="round" fill="none"/>
      <path d="M238 239c24-29 49-44 76-44s52 15 76 44" stroke="${accent}" stroke-width="10" stroke-linecap="round" fill="none"/>
      <path d="M198 265c76 25 154 25 232 0" stroke="${main}" stroke-width="7" stroke-linecap="round" fill="none" opacity="0.2"/>
      <path d="M426 132c34 27 43 67 26 119-51-23-61-63-26-119z" fill="${wash}" stroke="${main}" stroke-width="7"/>
    `,
    mood: `
      <rect x="172" y="106" width="176" height="150" rx="26" fill="#fffdfb" stroke="${main}" stroke-width="8"/>
      <path d="M202 148h96M202 184h114M202 220h74" stroke="${accent}" stroke-width="9" stroke-linecap="round"/>
      <path d="M414 116c40 6 72 35 79 75-42 3-80-16-101-52 6-9 13-17 22-23z" fill="${wash}" stroke="${main}" stroke-width="7"/>
      <path d="M410 224c25 28 66 30 97 5" stroke="${accent}" stroke-width="9" stroke-linecap="round" fill="none"/>
    `,
    record: `
      <rect x="178" y="94" width="188" height="174" rx="26" fill="#fffdfb" stroke="${main}" stroke-width="8"/>
      <path d="M218 144h100M218 184h100M218 224h66" stroke="${accent}" stroke-width="9" stroke-linecap="round"/>
      <path d="M404 132h70M404 180h70M404 228h70" stroke="${main}" stroke-width="8" stroke-linecap="round" opacity="0.7"/>
      <path d="M392 132l13 13 25-31M392 228l13 13 25-31" stroke="${accent}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <path d="M456 180h.01" stroke="${accent}" stroke-width="16" stroke-linecap="round"/>
    `
  }[icon];
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="640" height="360" viewBox="0 0 640 360" role="img" aria-label="Menopause wellbeing action illustration">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="${bg}"/>
          <stop offset="0.58" stop-color="#fffdfb"/>
          <stop offset="1" stop-color="${wash}"/>
        </linearGradient>
        <linearGradient id="curtain" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="${accent}" stop-opacity="0.72"/>
          <stop offset="1" stop-color="${main}" stop-opacity="0.62"/>
        </linearGradient>
      </defs>
      <rect width="640" height="360" rx="0" fill="url(#bg)"/>
      <path d="M0 0h190L114 360H0z" fill="#ffffff" opacity="0.24"/>
      <path d="M440 0h200v360H520z" fill="#ffffff" opacity="0.2"/>
      <path d="M28 0c42 71 58 140 48 206-7 49-2 100 18 154H0V0z" fill="url(#curtain)" opacity="0.16"/>
      <path d="M612 0c-42 71-58 140-48 206 7 49 2 100-18 154h94V0z" fill="url(#curtain)" opacity="0.14"/>
      <path d="M0 286c73-26 143-31 210-15 77 18 134 13 207-21 68-31 143-34 223-8v118H0z" fill="#fffdfb" opacity="0.72"/>
      <path d="M58 72c78-36 162-35 252 5 92 42 179 41 272-8" stroke="#ffffff" stroke-width="14" stroke-linecap="round" opacity="0.64"/>
      <path d="M84 306c113 22 282 20 472-5" stroke="${main}" stroke-width="6" stroke-linecap="round" opacity="0.14"/>
      <g transform="translate(0 0)">
        ${iconMarkup}
      </g>
    </svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

const actionImageUrls = {
  cooling: "/action-photos/hongkong-cooling-rest.png",
  sleep: "/action-photos/hongkong-sleep-winddown.png",
  strength: "/action-photos/hongkong-gentle-strength.png",
  nutrition: "/action-photos/hongkong-kitchen-nutrition.png",
  pelvic: "/action-photos/hongkong-private-care.png",
  mood: "/action-photos/hongkong-mood-journal.png",
  record: "/action-photos/hongkong-symptom-note.png"
};

const actionLibrary = {
  cooling_breath: {
    category: "cooling",
    imageKind: "cooling",
    minutes: 2,
    zh: {
      title: "潮熱時做 60 秒降溫呼吸",
      description: "先坐穩，慢慢呼吸，用凍水或者小風扇幫身體降溫。",
      reason: "潮熱好多時會突然嚟。先俾身體慢落嚟，可以減少慌張，亦方便你留意誘因。",
      safety: "如果心口痛、暈低或者呼吸困難，請先停低並求助。"
    },
    zhCN: {
      title: "潮热时做 60 秒降温呼吸",
      description: "先坐稳，放慢呼吸，用凉水或小风扇帮助身体降温。",
      reason: "潮热常会突然出现。先让身体降速，可以降低慌张感，也方便你观察诱因。",
      safety: "如胸口痛、晕倒或呼吸困难，请先停止并求助。"
    },
    en: {
      title: "Try 60 seconds of cooling breathing during a hot flash",
      description: "Sit steadily, slow your breathing, and use cool water or a small fan.",
      reason: "Hot flashes can arrive suddenly. Slowing down first may reduce panic and help you notice triggers.",
      safety: "Stop and seek help if chest pain, fainting, or breathing difficulty occurs."
    }
  },
  sleep_winddown: {
    category: "sleep",
    imageKind: "sleep",
    minutes: 5,
    zh: {
      title: "瞓前 5 分鐘減少刺激",
      description: "瞓前調暗燈光，暫停睇訊息，寫低一件聽日先處理嘅事。",
      reason: "有夜汗或者瞓得淺時，固定嘅瞓前流程可以幫身體慢慢入休息狀態。",
      safety: "如果長期嚴重失眠或者心情低落，請向醫護人員查詢。"
    },
    zhCN: {
      title: "睡前 5 分钟降低刺激",
      description: "睡前把灯调暗，暂停查看信息，记下一件明天再处理的事。",
      reason: "夜汗和睡眠浅时，固定睡前流程可以让身体更容易进入休息状态。",
      safety: "如果长期严重失眠或情绪低落，请向医护人员查询。"
    },
    en: {
      title: "Lower stimulation for 5 minutes before sleep",
      description: "Dim the lights, pause messages, and write down one thing to handle tomorrow.",
      reason: "When night sweats or light sleep occur, a fixed wind-down routine can help the body prepare for rest.",
      safety: "If severe insomnia or low mood persists, speak with a clinician."
    }
  },
  strength_bones: {
    category: "strength",
    imageKind: "strength",
    minutes: 4,
    zh: {
      title: "坐站練習 5 次",
      description: "搵張穩陣椅，雙腳踩實地，慢慢企起身再坐低，最多 5 次。",
      reason: "更年期前後要留意肌力同骨骼健康。低負擔力量動作，會比一次做太多更易持續。",
      safety: "如果膝頭痛、頭暈或者企唔穩，請即刻停低。"
    },
    zhCN: {
      title: "坐站练习 5 次",
      description: "找稳固椅子，双脚踩地，慢慢站起再坐下，最多 5 次。",
      reason: "绝经前后要留意肌力和骨骼健康。低负担力量动作比一次做太多更容易持续。",
      safety: "如膝痛、头晕或站不稳，请立即停下。"
    },
    en: {
      title: "Do 5 sit-to-stand repetitions",
      description: "Use a stable chair, keep both feet on the floor, stand slowly, then sit down.",
      reason: "Around menopause, strength and bone health matter. Low-burden strength actions are easier to sustain.",
      safety: "Stop if knee pain, dizziness, or unsteadiness appears."
    }
  },
  calcium_plate: {
    category: "nutrition",
    imageKind: "nutrition",
    minutes: 2,
    zh: {
      title: "今日加一份護骨食物",
      description: "可以揀奶類、豆腐、深綠色蔬菜，或者其他適合你嘅食物。",
      reason: "呢個係生活方式提醒，目標係幫你慢慢建立對骨骼友善嘅飲食習慣。",
      safety: "如果有腎病、飲食限制或者正在服藥，請按醫護原本指示。"
    },
    zhCN: {
      title: "今日加一份护骨食物",
      description: "可选奶类、豆腐、深绿色蔬菜或其他合适食物。",
      reason: "这是生活方式提醒，目标是帮你慢慢建立对骨骼友善的饮食习惯。",
      safety: "如有肾病、饮食限制或正在服药，请按医护原有指示。"
    },
    en: {
      title: "Add one bone-supporting food today",
      description: "Choose dairy, tofu, dark green vegetables, or another suitable option.",
      reason: "This lifestyle reminder helps build bone-friendly eating habits gradually.",
      safety: "If you have kidney disease, dietary restrictions, or medication needs, follow clinical advice."
    }
  },
  pelvic_floor: {
    category: "pelvic",
    imageKind: "pelvic",
    minutes: 3,
    zh: {
      title: "盆底放鬆同收縮 3 組",
      description: "坐穩，輕輕收緊盆底 3 秒，再完全放鬆 6 秒。",
      reason: "有尿滲困擾時，溫和而正確嘅盆底練習可以作為日常支援。",
      safety: "唔好忍氣或者太用力；如果有痛楚，請停低。"
    },
    zhCN: {
      title: "盆底放松和收缩 3 组",
      description: "坐稳，轻轻收紧盆底 3 秒，再完全放松 6 秒。",
      reason: "有尿渗困扰时，温和而正确的盆底练习可以作为日常支持。",
      safety: "不要憋气或用力过猛；如有痛楚，请停止。"
    },
    en: {
      title: "Try 3 gentle pelvic floor sets",
      description: "Sit steadily, gently contract for 3 seconds, then fully relax for 6 seconds.",
      reason: "Gentle and correct pelvic floor practice can support daily concerns about leakage.",
      safety: "Do not hold your breath or push hard. Stop if pain appears."
    }
  },
  mood_reset: {
    category: "mood",
    imageKind: "mood",
    minutes: 3,
    zh: {
      title: "三分鐘情緒重置",
      description: "寫低而家嘅感受、身體邊度有反應，以及一件可以遲啲先處理嘅事。",
      reason: "情緒有波動唔代表你做錯咗。將感受具體寫低，有助減少俾情緒推住走。",
      safety: "如果有傷害自己嘅想法，請即刻聯絡可信任嘅人或者緊急服務。"
    },
    zhCN: {
      title: "三分钟情绪重置",
      description: "写下现在的感受、身体位置，以及一件可以推迟的事。",
      reason: "情绪波动不代表你做错了。把感受具体写下来，有助于减少被情绪推着走。",
      safety: "如有伤害自己的想法，请立即联系可信任的人或紧急服务。"
    },
    en: {
      title: "Three-minute mood reset",
      description: "Write down what you feel, where it sits in the body, and one task that can wait.",
      reason: "Mood changes do not mean you did anything wrong. Naming the feeling can reduce overwhelm.",
      safety: "If you have thoughts of self-harm, contact a trusted person or emergency service immediately."
    }
  },
  symptom_note: {
    category: "record",
    imageKind: "record",
    minutes: 1,
    zh: {
      title: "記低一個可能誘因",
      description: "可以記低咖啡、酒精、辣嘢、壓力、睡眠或者天氣。",
      reason: "短記錄有助搵出個人模式，令下次建議更貼近你。",
      safety: "記錄只作觀察，唔代表自動判斷病情。"
    },
    zhCN: {
      title: "记下一个可能诱因",
      description: "可记录咖啡、酒精、辛辣食物、压力、睡眠或天气。",
      reason: "短记录有助找出个人模式，让下次建议更贴近你。",
      safety: "记录只作观察，不代表自动判断病情。"
    },
    en: {
      title: "Note one possible trigger",
      description: "Record caffeine, alcohol, spicy food, stress, sleep, or weather.",
      reason: "Short notes help identify personal patterns and improve future suggestions.",
      safety: "Records are for observation only and do not diagnose illness."
    }
  }
};

function actionPayload(key, locale, index, completed) {
  const source = actionLibrary[key];
  const zhSource = locale === ZH_CN ? source.zhCN : source.zh;
  const copy = isZh(locale)
    ? {
        title: zhSource.title,
        description: zhSource.description,
        reason: zhSource.reason,
        safety: zhSource.safety
      }
    : source.en;
  const id = `M-${key}`;
  return {
    assignment_id: id,
    category: source.category,
    sort_order: index + 1,
    title: copy.title,
    short_description: copy.description,
    estimated_minutes: source.minutes,
    safety_note: copy.safety,
    reason: copy.reason,
    status: completed[id] ? "completed" : "assigned",
    image_status: "approved",
    image_url: actionImageUrls[source.imageKind] || sceneDataUri(source.imageKind),
    alt_text_zh_hk: source.zh.title,
    alt_text_zh_cn: source.zhCN.title,
    alt_text_en: source.en.title
  };
}

export function getToday({ locale, support, checkin }) {
  const safetyAlert = support.level === "safety";
  return wait({
    endpoint: "GET /api/v1/participants/W001/today",
    date: today(),
    safety_alert: safetyAlert,
    safety_title: isZh(locale)
      ? (safetyAlert ? zhCopy(locale, "要先跟進安全提示", "需要先跟进安全提示") : zhCopy(locale, "今日冇安全提示", "今日没有安全提示"))
      : (safetyAlert ? "Safety follow-up needed first" : "No safety alerts today"),
    safety_body: isZh(locale)
      ? safetyAlert
        ? zhCopy(locale, "一般舒緩建議已暫停。請先聯絡支援者、家庭醫生或者服務人員；如果情況緊急，請打 999。", "普通舒缓建议已暂停。请先联系支持者、家庭医生或服务人员；如情况紧急，请拨打 999。")
        : zhCopy(locale, "可以先做低負擔嘅舒緩小行動，過程中唔舒服就停。", "可以先做低负担的舒缓小行动，过程中不舒服就停。")
      : safetyAlert
        ? "Ordinary relief suggestions are paused. Contact a supporter, family doctor, or service staff first; if urgent, call 999."
        : "You can start with low-burden relief actions. Stop if you feel unwell.",
    summary: {
      feeling: checkin.feeling,
      hot_flashes: checkin.hot_flashes,
      sleep_hours: checkin.sleep_hours,
      mood: checkin.mood
    },
    reminders: [actionPayload("symptom_note", locale, 0, {}), actionPayload("calcium_plate", locale, 1, {}), actionPayload("sleep_winddown", locale, 2, {})]
  });
}

export function getTodayActions({ locale, support, completed }) {
  if (support.level === "safety") {
    return wait({
      endpoint: "GET /api/v1/participants/W001/actions/today",
      date: today(),
      actions: []
    });
  }

  const keys = ["cooling_breath", "sleep_winddown", "strength_bones"];
  if (support.tags.includes("pelvic_floor")) keys[2] = "pelvic_floor";
  if (support.tags.includes("mood_pressure")) keys[1] = "mood_reset";
  if (!support.tags.includes("hot_flashes")) keys[0] = "symptom_note";

  return wait({
    endpoint: "GET /api/v1/participants/W001/actions/today",
    date: today(),
    actions: Array.from(new Set(keys)).slice(0, 3).map((key, index) => actionPayload(key, locale, index, completed))
  });
}

export function createCheckin({ payload }) {
  return wait({
    endpoint: "POST /api/v1/participants/W001/symptom-checkins",
    checkin: payload,
    saved_at: new Date().toISOString()
  });
}

export function completeAction({ assignmentId }) {
  return wait({
    endpoint: `POST /api/v1/participants/W001/actions/${assignmentId}/complete`,
    assignment_id: assignmentId,
    status: "completed",
    completed_at: new Date().toISOString()
  });
}

export function listFollowups({ locale, support, alerts, completed, statuses }) {
  const completedCount = Object.values(completed).filter(Boolean).length;
  const rows = [
    {
      followup_id: "MF001",
      priority: support.level === "safety" ? "urgent" : "medium",
      participant: "msLam",
      pilot_id: "MENO-HK-001",
      trigger: alerts.length ? (isZh(locale) ? zhCopy(locale, "安全提示", "安全提示") : "Safety alert") : (isZh(locale) ? zhCopy(locale, "潮熱同睡眠困擾偏高", "潮热和睡眠困扰偏高") : "Higher hot flash and sleep burden"),
      suggested_action: alerts.length ? (isZh(locale) ? zhCopy(locale, "電話確認，並建議尋求醫護協助", "电话确认并建议寻求医护协助") : "Phone check and advise clinical support") : (isZh(locale) ? zhCopy(locale, "提醒完成舒緩小行動，並留意誘因", "提醒完成舒缓小行动并观察诱因") : "Remind relief actions and trigger notes"),
      owner: isZh(locale) ? zhCopy(locale, "服務護士 A", "服务护士 A") : "Nurse A",
      status: statuses.MF001 || "pending",
      support_level: support.level,
      completion_rate: Math.round((completedCount / 3) * 100),
      last_record_at: `${today()} 09:15`
    },
    {
      followup_id: "MF002",
      priority: "high",
      participant: "msHo",
      pilot_id: "MENO-HK-014",
      trigger: isZh(locale) ? zhCopy(locale, "連續 2 日未記錄，夜汗較多", "连续 2 天未记录，夜汗较多") : "No record for 2 days, more night sweats",
      suggested_action: isZh(locale) ? zhCopy(locale, "支援者或者服務團隊協助聯絡", "支持者或服务团队协助联系") : "Supporter or service team to contact",
      owner: isZh(locale) ? zhCopy(locale, "服務護士 B", "服务护士 B") : "Nurse B",
      status: statuses.MF002 || "pending",
      support_level: "watch",
      completion_rate: 22,
      last_record_at: "2026-05-19 20:40"
    },
    {
      followup_id: "MF003",
      priority: "routine",
      participant: "msTang",
      pilot_id: "MENO-HK-027",
      trigger: isZh(locale) ? zhCopy(locale, "正常完成", "正常完成") : "Normal completion",
      suggested_action: isZh(locale) ? zhCopy(locale, "下次週報提醒", "下次周报提醒") : "Next weekly feedback reminder",
      owner: isZh(locale) ? zhCopy(locale, "服務人員 C", "服务人员 C") : "Worker C",
      status: statuses.MF003 || "contacted",
      support_level: "normal",
      completion_rate: 67,
      last_record_at: `${today()} 08:50`
    }
  ];

  const priorityOrder = { urgent: 0, high: 1, medium: 2, routine: 3 };
  rows.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  return wait({
    endpoint: "GET /api/v1/care-team/followups",
    items: rows
  });
}

export function updateFollowup({ followupId, status }) {
  return wait({
    endpoint: `PATCH /api/v1/care-team/followups/${followupId}`,
    followup_id: followupId,
    status
  });
}

export function getCaseDetail({ locale, support, alerts, completed }) {
  const actionDone = Object.values(completed).filter(Boolean).length;
  return wait({
    endpoint: "GET /api/v1/care-team/cases/MENO-HK-001",
    case: {
      pilot_id: "MENO-HK-001",
      participant: "msLam",
      age: 52,
      district: isZh(locale) ? zhCopy(locale, "九龍東", "九龙东") : "Kowloon East",
      support_level: support.level,
      partner_contact: isZh(locale) ? zhCopy(locale, "伴侶已授權，可以電話聯絡", "伴侣已授权，电话可联系") : "Partner authorised, reachable by phone",
      seven_day_records: [true, true, false, true, true, true, true],
      seven_day_actions: [2, 1, 0, 3, 2, 2, actionDone],
      safety_history: alerts.length ? alerts : [],
      worker_notes: isZh(locale)
        ? zhCopy(locale, "建議先確認安全提示，再慢慢恢復低負擔舒緩小行動。", "建议先确认安全提示，再恢复低负担舒缓小行动。")
        : "Confirm safety alerts first before returning to low-burden relief actions."
    }
  });
}

export function getIntegrationOverview({ locale }) {
  return wait({
    endpoint: "GET /api/v1/admin/integrations/overview",
    environment: import.meta.env.VITE_API_ENV || "mock",
    maturity: isZh(locale) ? zhCopy(locale, "沙盒準備中", "沙盒准备中") : "Sandbox ready",
    services: isZh(locale)
      ? [
          { name: zhCopy(locale, "今日內容服務", "今日内容服务"), status: zhCopy(locale, "已連接", "已连接"), latency_ms: 112, last_sync: "2026-05-21 09:30", errors_24h: 0 },
          { name: zhCopy(locale, "症狀記錄服務", "症状记录服务"), status: zhCopy(locale, "已連接", "已连接"), latency_ms: 124, last_sync: "2026-05-21 09:28", errors_24h: 0 },
          { name: zhCopy(locale, "跟進隊列服務", "跟进队列服务"), status: zhCopy(locale, "已連接", "已连接"), latency_ms: 138, last_sync: "2026-05-21 09:26", errors_24h: 1 }
        ]
      : [
          { name: "/api/v1/participants/{id}/today", status: "connected", latency_ms: 112, last_sync: "2026-05-21 09:30", errors_24h: 0 },
          { name: "/api/v1/participants/{id}/symptom-checkins", status: "connected", latency_ms: 124, last_sync: "2026-05-21 09:28", errors_24h: 0 },
          { name: "/api/v1/care-team/followups", status: "connected", latency_ms: 138, last_sync: "2026-05-21 09:26", errors_24h: 1 }
        ],
    sandbox_tests: isZh(locale)
      ? [
          { name: zhCopy(locale, "讀取今日內容", "读取今日内容"), result: zhCopy(locale, "通過", "通过") },
          { name: zhCopy(locale, "提交症狀記錄", "提交症状记录"), result: zhCopy(locale, "通過", "通过") },
          { name: zhCopy(locale, "更新跟進狀態", "更新跟进状态"), result: zhCopy(locale, "待重測", "待重测") }
        ]
      : [
          { name: "GET today", result: "Passed" },
          { name: "POST symptom check-in", result: "Passed" },
          { name: "PATCH follow-up", result: "Retest needed" }
        ],
    event_logs: isZh(locale)
      ? [
          zhCopy(locale, `已附加語言標記：${locale}`, `已附加语言标记：${locale}`),
          zhCopy(locale, "已附加平台標記：手機網頁", "已附加平台标记：手机网页"),
          zhCopy(locale, "已附加版本標記：更年期0.1.0", "已附加版本标记：更年期0.1.0"),
          zhCopy(locale, "圖片只返回已審核狀態", "图片只返回已审核状态"),
          zhCopy(locale, "支援者提交已帶角色標記", "支持者提交已带角色标记")
        ]
      : [
          `Attached X-LivaNudge-Locale: ${locale}`,
          "Attached X-LivaNudge-Platform: mobile-web",
          "Attached X-LivaNudge-App-Version: menopause-0.1.0",
          "Images return reviewed status only",
          "Supporter submission includes input_by_role"
        ],
    image_pipeline: { pending: 6, approved: 28, rejected: 2 },
    mappings: isZh(locale)
      ? [
          { source: zhCopy(locale, "支援者協助欄位", "支持者协助字段"), target: zhCopy(locale, "支援關係記錄", "支持关系记录"), status: zhCopy(locale, "已對齊", "已对齐") },
          { source: zhCopy(locale, "症狀標籤", "症状标签"), target: zhCopy(locale, "每日症狀記錄", "每日症状记录"), status: zhCopy(locale, "已對齊", "已对齐") },
          { source: zhCopy(locale, "安全提示類型", "安全提示类型"), target: zhCopy(locale, "安全事件記錄", "安全事件记录"), status: zhCopy(locale, "待接入", "待接入") }
        ]
      : [
          { source: "assisted_user_id", target: "support_relationship.assisted_user_id", status: "Mapped" },
          { source: "symptom_tags", target: "symptom_checkin.tags", status: "Mapped" },
          { source: "red_flag_type", target: "safety_event.red_flag_type", status: "Pending" }
        ],
    gaps: [
      isZh(locale) ? zhCopy(locale, "正式登入同授權流程", "正式登录与授权流程") : "Production login and consent flow",
      isZh(locale) ? zhCopy(locale, "後端 API、資料庫同角色權限", "后端 API、数据库和角色权限") : "Backend API, database, and role-based access",
      isZh(locale) ? zhCopy(locale, "AI 小行動生成服務同審計紀錄", "AI 小行动生成服务与审计记录") : "AI nudge service and audit logs",
      isZh(locale) ? zhCopy(locale, "婦科或者家庭醫生轉介備註欄", "妇科或家庭医生转介备注栏") : "Women's health or family doctor referral notes",
      isZh(locale) ? zhCopy(locale, "圖片人工審核後台", "图片人工审核后台") : "Manual image review console"
    ]
  });
}
