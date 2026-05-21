import { EN, ZH_CN, localizeText } from "../i18n.js";

const wait = (payload) => Promise.resolve(payload);

function isZh(locale) {
  return locale !== EN;
}

function zhText(locale, value) {
  return locale === ZH_CN ? localizeText(value, locale) : value;
}

function today() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Hong_Kong" }).format(new Date());
}

function sceneDataUri(kind) {
  const palettes = {
    cooling: ["#e0f2fe", "#0f766e", "#fff7ed", "#fb7185"],
    sleep: ["#eef2ff", "#4338ca", "#fff1f2", "#0f766e"],
    strength: ["#ecfdf5", "#047857", "#fef3c7", "#c2410c"],
    nutrition: ["#fefce8", "#a16207", "#dcfce7", "#0f766e"],
    pelvic: ["#fdf2f8", "#be185d", "#ecfeff", "#0f766e"],
    mood: ["#f0fdfa", "#0f766e", "#ffe4e6", "#be123c"],
    record: ["#f8fafc", "#475569", "#ecfeff", "#0f766e"]
  };
  const [bg, main, light, accent] = palettes[kind] || palettes.cooling;
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="640" height="360" viewBox="0 0 640 360" role="img">
      <rect width="640" height="360" fill="${bg}"/>
      <circle cx="126" cy="112" r="64" fill="${light}"/>
      <circle cx="510" cy="236" r="82" fill="#ffffff" opacity="0.72"/>
      <path d="M74 270c76-82 154-82 236 0s160 82 256-2" fill="none" stroke="${accent}" stroke-width="22" stroke-linecap="round" opacity="0.55"/>
      <rect x="236" y="78" width="168" height="210" rx="36" fill="#ffffff" opacity="0.92"/>
      <path d="M286 150c16-24 52-24 68 0 12 18 8 44-34 78-42-34-46-60-34-78z" fill="${main}" opacity="0.88"/>
      <path d="M252 118h136M252 260h136" stroke="${main}" stroke-width="14" stroke-linecap="round" opacity="0.3"/>
      <circle cx="458" cy="118" r="32" fill="${accent}" opacity="0.75"/>
      <path d="M458 164v74M426 202h64" stroke="${accent}" stroke-width="18" stroke-linecap="round"/>
    </svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

const actionLibrary = {
  cooling_breath: {
    category: "cooling",
    imageKind: "cooling",
    minutes: 2,
    zh: {
      title: "潮熱時做 60 秒降溫呼吸",
      description: "先坐穩，放慢呼吸，用涼水或小風扇幫身體降溫。",
      reason: "潮熱常會突然出現。先讓身體降速，可以降低慌張感，也方便你觀察誘因。",
      safety: "如胸口痛、暈倒或呼吸困難，請先停止並求助。"
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
      title: "睡前 5 分鐘降刺激",
      description: "睡前把燈調暗，暫停查看訊息，記下一件明天再處理的事。",
      reason: "夜汗和睡眠淺時，固定睡前流程可以讓身體更容易進入休息狀態。",
      safety: "如果長期嚴重失眠或情緒低落，請向醫護人員查詢。"
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
      description: "找穩固椅子，雙腳踩地，慢慢站起再坐下，最多 5 次。",
      reason: "絕經前後要留意肌力和骨骼健康。低負擔力量動作比一次做太多更容易持續。",
      safety: "如膝痛、頭暈或站不穩，請立即停下。"
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
      description: "可選奶類、豆腐、深綠色蔬菜或其他合適食物。",
      reason: "這是生活方式提醒，目標是幫你慢慢建立對骨骼友善的飲食習慣。",
      safety: "如有腎病、飲食限制或正在服藥，請按醫護原有指示。"
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
      title: "盆底放鬆和收縮 3 組",
      description: "坐穩，輕輕收緊盆底 3 秒，再完全放鬆 6 秒。",
      reason: "有尿滲困擾時，溫和而正確的盆底練習可以作為日常支持。",
      safety: "不要憋氣或用力過猛；如有痛楚，請停止。"
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
      description: "寫下現在的感受、身體位置，以及一件可以推遲的事。",
      reason: "情緒波動不代表你做錯了。把感受具體寫下來，有助於減少被情緒推着走。",
      safety: "如有傷害自己的想法，請立即聯絡可信任的人或緊急服務。"
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
      title: "記下一個可能誘因",
      description: "可記錄咖啡、酒精、辛辣食物、壓力、睡眠或天氣。",
      reason: "短記錄有助找出個人模式，讓下次建議更貼近你。",
      safety: "記錄只作觀察，不代表自動判斷病情。"
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
  const copy = isZh(locale)
    ? {
        title: zhText(locale, source.zh.title),
        description: zhText(locale, source.zh.description),
        reason: zhText(locale, source.zh.reason),
        safety: zhText(locale, source.zh.safety)
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
    image_url: sceneDataUri(source.imageKind),
    alt_text_zh_hk: source.zh.title,
    alt_text_zh_cn: localizeText(source.zh.title, ZH_CN),
    alt_text_en: source.en.title
  };
}

export function getToday({ locale, support, checkin }) {
  const safetyAlert = support.level === "safety";
  return wait({
    endpoint: "GET /api/v1/participants/W001/today",
    date: today(),
    safety_alert: safetyAlert,
    safety_title: isZh(locale) ? zhText(locale, safetyAlert ? "需要先跟進安全提示" : "今日沒有安全提示") : (safetyAlert ? "Safety follow-up needed first" : "No safety alerts today"),
    safety_body: isZh(locale)
      ? zhText(locale, safetyAlert
        ? "普通舒緩建議已暫停。請先聯絡支持者、家庭醫生或服務人員；如情況緊急，請致電 999。"
        : "可以先做低負擔的舒緩小行動，過程中不舒服就停。")
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
      trigger: alerts.length ? (isZh(locale) ? zhText(locale, "安全提示") : "Safety alert") : (isZh(locale) ? zhText(locale, "潮熱和睡眠困擾偏高") : "Higher hot flash and sleep burden"),
      suggested_action: alerts.length ? (isZh(locale) ? zhText(locale, "電話確認並建議尋求醫護協助") : "Phone check and advise clinical support") : (isZh(locale) ? zhText(locale, "提醒完成舒緩小行動並觀察誘因") : "Remind relief actions and trigger notes"),
      owner: isZh(locale) ? zhText(locale, "服務護士 A") : "Nurse A",
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
      trigger: isZh(locale) ? zhText(locale, "連續 2 天未記錄，夜汗較多") : "No record for 2 days, more night sweats",
      suggested_action: isZh(locale) ? zhText(locale, "支持者或服務團隊協助聯絡") : "Supporter or service team to contact",
      owner: isZh(locale) ? zhText(locale, "服務護士 B") : "Nurse B",
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
      trigger: isZh(locale) ? zhText(locale, "正常完成") : "Normal completion",
      suggested_action: isZh(locale) ? zhText(locale, "下次週報提醒") : "Next weekly feedback reminder",
      owner: isZh(locale) ? zhText(locale, "服務人員 C") : "Worker C",
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
      district: isZh(locale) ? zhText(locale, "九龍東") : "Kowloon East",
      support_level: support.level,
      partner_contact: isZh(locale) ? zhText(locale, "伴侶已授權，電話可聯絡") : "Partner authorised, reachable by phone",
      seven_day_records: [true, true, false, true, true, true, true],
      seven_day_actions: [2, 1, 0, 3, 2, 2, actionDone],
      safety_history: alerts.length ? alerts : [],
      worker_notes: isZh(locale)
        ? zhText(locale, "建議先確認安全提示，再恢復低負擔舒緩小行動。")
        : "Confirm safety alerts first before returning to low-burden relief actions."
    }
  });
}

export function getIntegrationOverview({ locale }) {
  return wait({
    endpoint: "GET /api/v1/admin/integrations/overview",
    environment: import.meta.env.VITE_API_ENV || "mock",
    maturity: isZh(locale) ? zhText(locale, "沙盒準備中") : "Sandbox ready",
    services: isZh(locale)
      ? [
          { name: zhText(locale, "今日內容服務"), status: zhText(locale, "已連接"), latency_ms: 112, last_sync: "2026-05-21 09:30", errors_24h: 0 },
          { name: zhText(locale, "症狀記錄服務"), status: zhText(locale, "已連接"), latency_ms: 124, last_sync: "2026-05-21 09:28", errors_24h: 0 },
          { name: zhText(locale, "跟進隊列服務"), status: zhText(locale, "已連接"), latency_ms: 138, last_sync: "2026-05-21 09:26", errors_24h: 1 }
        ]
      : [
          { name: "/api/v1/participants/{id}/today", status: "connected", latency_ms: 112, last_sync: "2026-05-21 09:30", errors_24h: 0 },
          { name: "/api/v1/participants/{id}/symptom-checkins", status: "connected", latency_ms: 124, last_sync: "2026-05-21 09:28", errors_24h: 0 },
          { name: "/api/v1/care-team/followups", status: "connected", latency_ms: 138, last_sync: "2026-05-21 09:26", errors_24h: 1 }
        ],
    sandbox_tests: isZh(locale)
      ? [
          { name: zhText(locale, "讀取今日內容"), result: zhText(locale, "通過") },
          { name: zhText(locale, "提交症狀記錄"), result: zhText(locale, "通過") },
          { name: zhText(locale, "更新跟進狀態"), result: zhText(locale, "待重測") }
        ]
      : [
          { name: "GET today", result: "Passed" },
          { name: "POST symptom check-in", result: "Passed" },
          { name: "PATCH follow-up", result: "Retest needed" }
        ],
    event_logs: isZh(locale)
      ? [
          zhText(locale, `已附加語言標記：${locale}`),
          zhText(locale, "已附加平台標記：手機網頁"),
          zhText(locale, "已附加版本標記：更年期0.1.0"),
          zhText(locale, "圖片只返回已審核狀態"),
          zhText(locale, "支持者提交已帶角色標記")
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
          { source: zhText(locale, "支持者協助欄位"), target: zhText(locale, "支持關係記錄"), status: zhText(locale, "已對齊") },
          { source: zhText(locale, "症狀標籤"), target: zhText(locale, "每日症狀記錄"), status: zhText(locale, "已對齊") },
          { source: zhText(locale, "安全提示類型"), target: zhText(locale, "安全事件記錄"), status: zhText(locale, "待接入") }
        ]
      : [
          { source: "assisted_user_id", target: "support_relationship.assisted_user_id", status: "Mapped" },
          { source: "symptom_tags", target: "symptom_checkin.tags", status: "Mapped" },
          { source: "red_flag_type", target: "safety_event.red_flag_type", status: "Pending" }
        ],
    gaps: [
      isZh(locale) ? zhText(locale, "正式登入與授權流程") : "Production login and consent flow",
      isZh(locale) ? zhText(locale, "婦科或家庭醫生轉介備註欄") : "Women's health or family doctor referral notes",
      isZh(locale) ? zhText(locale, "圖片人工審核後台") : "Manual image review console"
    ]
  });
}
