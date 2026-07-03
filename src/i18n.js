export const ZH_HK = "zh-HK";
export const ZH_CN = "zh-CN";
export const EN = "en";
export const LANGUAGE_STORAGE_KEY = "livanudge-menopause-language";
export const LANGUAGES = [ZH_HK, ZH_CN, EN];

export const appCopy = {
  [ZH_HK]: {
    appName: "LivaNudge",
    productLine: "更年期生活支援助手",
    modes: {
      woman: "自我照顧",
      partner: "支援者",
      team: "試點工作台",
      demo: "試點示範"
    },
    womanNav: {
      home: "今日",
      setup: "入組",
      record: "記錄",
      weekly: "週報",
      me: "我的"
    },
    partnerNav: {
      overview: "概覽",
      assist: "協助",
      reminders: "提醒",
      consent: "授權"
    },
    teamNav: {
      queue: "跟進",
      cases: "個案",
      safety: "安全",
      completion: "完成",
      export: "資料",
      integration: "接口"
    },
    common: {
      loading: "載入緊今日內容...",
      minutes: (count) => `${count}分鐘`,
      completed: "已完成",
      markDone: "我做咗",
      safetyNote: "安全提示",
      why: "點解會建議呢個",
      helpNow: "我唔舒服，需要幫手",
      goRecord: "填寫今日記錄",
      noData: "暫時未有資料",
      save: "儲存",
      continue: "繼續",
      optional: "可選",
      status: "狀態",
      authorised: "已授權",
      notAuthorised: "未授權",
      today: "今日",
      thisWeek: "本週",
      sevenDays: "最近7天",
      view: "睇吓",
      update: "更新"
    },
    home: {
      greeting: "林女士，今日點呀",
      title: "先睇吓身體訊號，再試一個舒服小行動",
      safeBody: "今日可以由一個低負擔小行動開始。呢度只提供生活方式支援，唔係診斷或者治療建議。",
      alertBody: "今日先暫停一般舒緩建議。請先聯絡支援者、家庭醫生或者服務人員；如果情況緊急，請打 999。",
      actionsTitle: "今日舒緩小行動",
      remindersTitle: "今日生活提醒",
      completedCount: (done, total) => `${done}/${total} 個已做`,
      partnerTitle: "支援者協助",
      partnerBody: "你可以授權信得過嘅人睇安全提示同簡短週報，亦可以請佢幫手記錄。"
    },
    record: {
      title: "今日記錄",
      subtitle: "先答幾條安全問題，再記錄睡眠、潮熱、心情同今日感受。",
      safetyStep: "第一步：今日有冇以下情況？",
      safetyHelp: "如果任何一項係「有」，系統會暫停一般建議，提醒你先搵人幫手或者求醫。",
      redFlagDetected: "要先處理安全提示",
      redFlagBody: "請先聯絡支援者、家庭醫生、婦科服務或者社區健康服務人員。如果情況緊急，請打 999。",
      recordStep: "第二步：日常記錄",
      feeling: "今日整體感覺點",
      sleep: "昨晚瞓咗幾耐",
      hotFlashes: "今日潮熱幾多次",
      nightSweats: "昨晚有冇夜汗",
      mood: "今日心情",
      stress: "壓力程度（一至五）",
      energy: "精神程度（一至五）",
      periodStatus: "月經情況",
      urinaryLeakage: "有冇尿滲或者盆底困擾",
      jointPain: "有冇關節或者肌肉唔舒服",
      submit: "儲存今日記錄",
      success: "今日記錄已儲存。"
    },
    weekly: {
      title: "週報",
      subtitle: "只顯示生活方式同症狀趨勢，唔作醫療判斷。",
      checkins: "記錄天數",
      actions: "舒緩小行動完成",
      hotFlashes: "潮熱次數",
      sleep: "平均睡眠",
      energy: "今日精神",
      encouragementTitle: "一句鼓勵",
      goalTitle: "下週一個小目標",
      encouragementSafe: "今個星期最重要係講清楚邊度唔舒服。確認安全，比完成任務更重要。",
      encouragementNormal: "你已經開始留意到身體訊號。每日一個小調整，都係照顧自己。",
      goalSafe: "下週先確認安全，再慢慢恢復低負擔小行動。",
      goalNormal: "下週試吓每日做 1 至 3 個舒緩小行動。"
    },
    me: {
      title: "我的",
      subtitle: "語言、支援者、私隱、資料使用同意同查閱紀錄。",
      profileTitle: "個人摘要",
      languageTitle: "語言設定",
      partnerTitle: "支援者管理",
      partnerBody: "林女士已授權伴侶睇今日記錄、安全提示同週報摘要。",
      privacyTitle: "私隱與授權",
      privacyBody: "試點版會記錄邊個睇過資料、幾時協助填寫，以及資料匯出紀錄。",
      consentTitle: "資料使用同意",
      consentBody: "資料只用於服務跟進、試點評估及已授權研究分析。",
      withdrawTitle: "退出試點 / 撤回同意",
      withdrawBody: "參加者可以要求停止試點或者撤回授權，服務團隊需要協助處理。",
      accessTitle: "邊個睇過我嘅資料",
      accessSummary: "睇過週報摘要"
    },
    safety: {
      title: "安全先行",
      body: "LivaNudge 唔會判斷病情，亦唔會提供藥物或者荷爾蒙治療建議。如果有收經後陰道出血、出血好多、心口痛、明顯氣促、突然嚴重頭痛或者一邊身無力，又或者有傷害自己嘅想法，請先聯絡醫護人員或者可信任嘅人。如果情況緊急，請打 999。",
      callPartner: "聯絡支援者",
      callStaff: "聯絡服務人員",
      emergency: "緊急情況打 999"
    },
    partner: {
      title: "支援者版",
      subtitle: "只可以喺參加者授權後睇資料同協助記錄。",
      overviewTitle: "支援者概覽",
      assistedLabel: "由支援者協助填寫",
      assistBody: "提交時會標記支援者身份，方便服務團隊審計。",
      assistSuccess: "已用支援者身份提交今日記錄。",
      remindersTitle: "提醒設定",
      consentTitle: "授權狀態",
      scopeTitle: "授權範圍",
      validTitle: "授權有效狀態",
      revokeHint: "參加者可以隨時撤回授權；未授權時支援者唔可以睇健康資料。",
      blockedTitle: "未獲授權",
      blockedBody: "請先由參加者確認授權，支援者先可以睇今日狀態或者協助填寫。",
      revoke: "模擬撤回授權",
      restore: "恢復試點授權"
    },
    team: {
      title: "試點工作台",
      subtitle: "先處理安全提示同困擾較高嘅個案，再睇試點資料。",
      priority: "優先級",
      participant: "參加者",
      trigger: "觸發原因",
      action: "建議跟進動作",
      owner: "負責人",
      status: "狀態",
      lastRecord: "最近一次記錄",
      queueTitle: "今日跟進隊列",
      casesTitle: "個案列表",
      safetyTitle: "安全提示紀錄",
      completionTitle: "完成情況",
      exportTitle: "試點資料",
      exportBody: "睇去識別化試點資料摘要，供服務檢討同後端對接檢查。",
      exportButton: "匯出資料",
      completionRate: "完成率",
      weeklyActive: "週活躍",
      supportLevel: "支援狀態",
      focusTags: "關注標籤",
      noFollowups: "今日冇待處理跟進。"
    },
    case: {
      basic: "基本資料摘要",
      partner: "支援者聯絡狀態",
      records: "最近7天記錄",
      actions: "最近7天小行動",
      safety: "安全提示歷史",
      notes: "工作備註"
    },
    integration: {
      title: "接口接入中心",
      subtitle: "俾研發、營運同試點負責人睇服務連接、沙盒測試同上線前缺口。",
      maturity: "接入成熟度",
      environment: "當前環境",
      services: "服務連接",
      sandbox: "沙盒接口測試",
      events: "事件日誌",
      images: "圖片流水線",
      mapping: "資料映射",
      gaps: "上市前缺口",
      latency: "平均回應",
      lastSync: "最近同步",
      errors: "近24小時錯誤",
      environmentHint: "環境設定",
      imageBody: "圖片一定要先經人工審核，確認安全、冇治療暗示、冇內嵌文字，先可以展示俾參加者。"
    },
    demo: {
      title: "試點最小可行產品",
      subtitle: "將症狀記錄、舒緩小行動、安全提示、支援者同試點工作台放喺同一個閉環。",
      loopTitle: "產品閉環",
      boundariesTitle: "智能生成邊界",
      tagsTitle: "生活方式與症狀標籤",
      metricsTitle: "試點指標",
      exportTitle: "研究資料匯出",
      retention: "8週留存",
      retentionDetail: "試點目標不低於70%",
      weeklyActive: "週活躍",
      weeklyActiveDetail: "試點目標不低於60%",
      completion: "完成率",
      completionDetail: "試點目標不低於50%",
      loopItems: [
        "身體訊號：用短記錄建立個人基線",
        "舒緩小行動：按症狀同安全狀態返回今日任務",
        "服務跟進：安全提示同高困擾個案自動進入隊列"
      ],
      boundaries: [
        "不作疾病診斷",
        "不提供藥物或荷爾蒙治療建議",
        "安全提示優先進入固定跟進流程",
        "智能生成只輔助表達，不取代人工確認"
      ]
    }
  },
  [EN]: {
    appName: "LivaNudge",
    productLine: "Menopause lifestyle companion",
    modes: {
      woman: "Self Care",
      partner: "Supporter",
      team: "Pilot Desk",
      demo: "Pilot Demo"
    },
    womanNav: {
      home: "Today",
      setup: "Setup",
      record: "Record",
      weekly: "Weekly",
      me: "Me"
    },
    partnerNav: {
      overview: "Overview",
      assist: "Assist",
      reminders: "Reminders",
      consent: "Consent"
    },
    teamNav: {
      queue: "Queue",
      cases: "Cases",
      safety: "Safety",
      completion: "Progress",
      export: "Data",
      integration: "Connect"
    },
    common: {
      loading: "Loading today's content...",
      minutes: (count) => `${count} min`,
      completed: "Done",
      markDone: "I did this",
      safetyNote: "Safety note",
      why: "Why this is suggested",
      helpNow: "I feel unwell / need help",
      goRecord: "Fill today's record",
      noData: "No data yet",
      save: "Save",
      continue: "Continue",
      optional: "Optional",
      status: "Status",
      authorised: "Authorised",
      notAuthorised: "Not authorised",
      today: "Today",
      thisWeek: "This week",
      sevenDays: "Last 7 days",
      view: "View",
      update: "Update"
    },
    home: {
      greeting: "Good day, Ms. Lam",
      title: "Read your body signals, then try one gentle action",
      safeBody: "Start with a low-burden action today. This app provides lifestyle support only, not diagnosis or treatment advice.",
      alertBody: "Pause ordinary suggestions today. Contact a trusted supporter, family doctor, or service staff first. If urgent, call 999.",
      actionsTitle: "Today's relief actions",
      remindersTitle: "Today's lifestyle reminders",
      completedCount: (done, total) => `${done}/${total} done`,
      partnerTitle: "Supporter help",
      partnerBody: "You can authorise a trusted person to view safety alerts, weekly summaries, or assist with records."
    },
    record: {
      title: "Today's record",
      subtitle: "Start with safety questions, then record sleep, hot flashes, mood, and daily symptoms.",
      safetyStep: "Step 1: Did any of these happen today?",
      safetyHelp: "If any answer is yes, ordinary suggestions pause and the app reminds you to seek support or care first.",
      redFlagDetected: "Safety follow-up needed first",
      redFlagBody: "Contact a trusted supporter, family doctor, women's health service, or community health staff first. If urgent, call 999.",
      recordStep: "Step 2: Daily record",
      feeling: "Overall feeling today",
      sleep: "Sleep hours last night",
      hotFlashes: "Hot flashes today",
      nightSweats: "Night sweats last night",
      mood: "Mood today",
      stress: "Stress level, one to five",
      energy: "Energy level, one to five",
      periodStatus: "Period status",
      urinaryLeakage: "Urinary leakage or pelvic floor concern",
      jointPain: "Joint or muscle discomfort",
      submit: "Save today's record",
      success: "Today's record has been saved."
    },
    weekly: {
      title: "Weekly feedback",
      subtitle: "Lifestyle and symptom trends only, without medical judgement.",
      checkins: "Record days",
      actions: "Relief actions done",
      hotFlashes: "Hot flashes",
      sleep: "Average sleep",
      energy: "Energy today",
      encouragementTitle: "Encouragement",
      goalTitle: "One small goal for next week",
      encouragementSafe: "The most important thing this week is describing discomfort clearly. Safety confirmation comes before tasks.",
      encouragementNormal: "You are starting to see your body signals. One small adjustment each day is still self-care.",
      goalSafe: "Next week, confirm safety first before returning to gentle actions.",
      goalNormal: "Next week, try 1 to 3 relief actions each day."
    },
    me: {
      title: "Me",
      subtitle: "Language, supporters, privacy, data consent, and access history.",
      profileTitle: "Profile summary",
      languageTitle: "Language",
      partnerTitle: "Supporter management",
      partnerBody: "Ms. Lam has authorised her partner to view today's records, safety alerts, and weekly summaries.",
      privacyTitle: "Privacy and authorisation",
      privacyBody: "The pilot tracks who viewed data, who helped submit records, and when data was exported.",
      consentTitle: "Data use consent",
      consentBody: "Data is used for service follow-up, pilot evaluation, and authorised research analysis.",
      withdrawTitle: "Leave pilot / withdraw consent",
      withdrawBody: "Participants can ask to stop the pilot or withdraw authorisation. The service team must help process the request.",
      accessTitle: "Who viewed my data",
      accessSummary: "Viewed weekly summary"
    },
    safety: {
      title: "Safety first",
      body: "LivaNudge cannot judge illness severity or provide medication or hormone treatment advice. If postmenopausal bleeding, heavy bleeding, chest pain, marked breathlessness, sudden severe headache or one-sided weakness occurs, or if you have thoughts of harming yourself, contact a clinician or trusted person first. If urgent, call 999.",
      callPartner: "Contact supporter",
      callStaff: "Contact service staff",
      emergency: "Call 999 if urgent"
    },
    partner: {
      title: "Supporter view",
      subtitle: "View and assist only after the participant has authorised access.",
      overviewTitle: "Supporter overview",
      assistedLabel: "Filled in with supporter assistance",
      assistBody: "Submission is marked with the supporter role for service audit.",
      assistSuccess: "Today's record was submitted as supporter-assisted.",
      remindersTitle: "Reminder settings",
      consentTitle: "Authorisation status",
      scopeTitle: "Authorised scope",
      validTitle: "Validity",
      revokeHint: "The participant can withdraw authorisation at any time. Without authorisation, supporters cannot view health data.",
      blockedTitle: "Not authorised",
      blockedBody: "Please ask the participant to confirm authorisation before viewing today status or assisting records.",
      revoke: "Simulate withdrawal",
      restore: "Restore pilot authorisation"
    },
    team: {
      title: "Pilot desk",
      subtitle: "Handle safety alerts and high-burden cases before reviewing pilot data.",
      priority: "Priority",
      participant: "Participant",
      trigger: "Trigger",
      action: "Suggested follow-up",
      owner: "Owner",
      status: "Status",
      lastRecord: "Last record",
      queueTitle: "Today's follow-up queue",
      casesTitle: "Case list",
      safetyTitle: "Safety alert history",
      completionTitle: "Completion",
      exportTitle: "Pilot data",
      exportBody: "Review de-identified pilot data for service review and backend integration checks.",
      exportButton: "Export data",
      completionRate: "Completion rate",
      weeklyActive: "Weekly active",
      supportLevel: "Support status",
      focusTags: "Focus tags",
      noFollowups: "No follow-ups are pending today."
    },
    case: {
      basic: "Basic summary",
      partner: "Supporter contact status",
      records: "Last 7 days records",
      actions: "Last 7 days actions",
      safety: "Safety alert history",
      notes: "Worker notes"
    },
    integration: {
      title: "Connection centre",
      subtitle: "For product, operations, and pilot leads to review service connections, sandbox tests, and pre-launch gaps.",
      maturity: "Connection maturity",
      environment: "Current environment",
      services: "Service connections",
      sandbox: "Sandbox endpoint tests",
      events: "Event logs",
      images: "Image pipeline",
      mapping: "Data mapping",
      gaps: "Pre-launch gaps",
      latency: "Average response",
      lastSync: "Last sync",
      errors: "Errors in 24h",
      environmentHint: "Environment setting",
      imageBody: "Images must be manually reviewed for safety, no treatment implication, and no embedded text before participants can see them."
    },
    demo: {
      title: "Minimum pilot product",
      subtitle: "A closed loop for symptom records, relief actions, safety alerts, supporters, and the pilot desk.",
      loopTitle: "Product loop",
      boundariesTitle: "Generation boundaries",
      tagsTitle: "Lifestyle and symptom tags",
      metricsTitle: "Pilot metrics",
      exportTitle: "Research data export",
      retention: "8-week retention",
      retentionDetail: "Pilot target >=70%",
      weeklyActive: "Weekly active",
      weeklyActiveDetail: "Pilot target >=60%",
      completion: "Completion",
      completionDetail: "Pilot target >=50%",
      loopItems: [
        "Body signals: build a personal baseline with short records",
        "Relief actions: return today's tasks based on symptoms and safety state",
        "Service follow-up: safety alerts and high burden enter the queue"
      ],
      boundaries: [
        "No disease diagnosis",
        "No medication or hormone treatment advice",
        "Safety alerts move to a fixed follow-up flow first",
        "Generation supports expression only; it does not replace human confirmation"
      ]
    }
  }
};

const simplifiedPhraseMap = [
  ["更年期女性生活方式助手", "更年期女性生活方式助手"],
  ["自我照護", "自我照护"],
  ["支持者", "支持者"],
  ["試點工作台", "试点工作台"],
  ["試點展示", "试点展示"],
  ["週報", "周报"],
  ["記錄", "记录"],
  ["授權", "授权"],
  ["跟進", "跟进"],
  ["個案", "个案"],
  ["資料", "数据"],
  ["接口", "接口"],
  ["載入", "加载"],
  ["儲存", "保存"],
  ["繼續", "继续"],
  ["狀態", "状态"],
  ["已授權", "已授权"],
  ["未授權", "未授权"],
  ["為甚麼", "为什么"],
  ["今日好，林女士", "今天好，林女士"],
  ["身體訊號", "身体信号"],
  ["舒緩", "舒缓"],
  ["診斷", "诊断"],
  ["治療", "治疗"],
  ["聯絡", "联系"],
  ["醫生", "医生"],
  ["醫護", "医护"],
  ["服務人員", "服务人员"],
  ["絕經", "绝经"],
  ["陰道", "阴道"],
  ["氣促", "气促"],
  ["嚴重", "严重"],
  ["頭痛", "头痛"],
  ["藥物", "药物"],
  ["荷爾蒙", "荷尔蒙"],
  ["參加者", "参加者"],
  ["週", "周"],
  ["查閱", "查看"],
  ["匯出", "导出"],
  ["私隱", "隐私"],
  ["評估", "评估"],
  ["隊列", "队列"],
  ["優先級", "优先级"],
  ["負責人", "负责人"],
  ["觸發原因", "触发原因"],
  ["對接", "对接"],
  ["圖片", "图片"],
  ["審核", "审核"],
  ["閉環", "闭环"],
  ["智能生成", "智能生成"]
];

const simplifiedCharMap = {
  "載": "载",
  "錄": "录",
  "記": "记",
  "週": "周",
  "報": "报",
  "隱": "隐",
  "權": "权",
  "試": "试",
  "點": "点",
  "臺": "台",
  "台": "台",
  "隊": "队",
  "個": "个",
  "資": "资",
  "料": "料",
  "態": "态",
  "聯": "联",
  "絡": "络",
  "醫": "医",
  "護": "护",
  "氣": "气",
  "嚴": "严",
  "頭": "头",
  "藥": "药",
  "爾": "尔",
  "參": "参",
  "與": "与",
  "療": "疗",
  "斷": "断",
  "緩": "缓",
  "訊": "讯",
  "號": "号",
  "暫": "暂",
  "無": "无",
  "儲": "储",
  "繼": "继",
  "續": "续",
  "選": "选",
  "狀": "状",
  "覺": "觉",
  "熱": "热",
  "壓": "压",
  "滲": "渗",
  "關": "关",
  "節": "节",
  "經": "经",
  "陰": "阴",
  "陽": "阳",
  "講": "讲",
  "復": "复",
  "設": "设",
  "兒": "儿",
  "閱": "阅",
  "紀": "纪",
  "數": "数",
  "據": "据",
  "評": "评",
  "團": "团",
  "務": "务",
  "處": "处",
  "級": "级",
  "觸": "触",
  "議": "议",
  "負": "负",
  "責": "责",
  "識": "识",
  "檢": "检",
  "對": "对",
  "測": "测",
  "圖": "图",
  "審": "审",
  "後": "后",
  "線": "线",
  "環": "环",
  "輔": "辅",
  "達": "达",
  "廣": "广",
  "態": "态",
  "問": "问",
  "題": "题",
  "體": "体",
  "間": "间",
  "擾": "扰",
  "適": "适",
  "動": "动",
  "從": "从",
  "擔": "担",
  "開": "开",
  "這": "这",
  "裡": "里",
  "沒": "没",
  "幫": "帮",
  "寫": "写",
  "時": "时",
  "溫": "温",
  "穩": "稳",
  "涼": "凉",
  "風": "风",
  "暈": "晕",
  "難": "难",
  "請": "请",
  "並": "并",
  "鐘": "钟",
  "燈": "灯",
  "調": "调",
  "長": "长",
  "緒": "绪",
  "員": "员",
  "詢": "询",
  "練": "练",
  "雙": "双",
  "腳": "脚",
  "協": "协",
  "簡": "简",
  "誘": "诱",
  "類": "类",
  "綠": "绿",
  "護": "护",
  "顯": "显",
  "氣": "气",
  "語": "语",
  "說": "说",
  "側": "侧",
  "傷": "伤",
  "處": "处",
  "慮": "虑",
  "則": "则",
  "習": "习"
};

function simplifyString(value) {
  let result = value;
  simplifiedPhraseMap.forEach(([from, to]) => {
    result = result.split(from).join(to);
  });
  return Array.from(result).map((char) => simplifiedCharMap[char] || char).join("");
}

function simplifyCopy(value) {
  if (typeof value === "string") return simplifyString(value);
  if (typeof value === "function") return (...args) => simplifyString(value(...args));
  if (Array.isArray(value)) return value.map((item) => simplifyCopy(item));
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, simplifyCopy(item)]));
  }
  return value;
}

appCopy[ZH_CN] = {
  ...simplifyCopy(appCopy[ZH_HK]),
  productLine: "更年期女性生活方式助手",
  modes: {
    woman: "自我照护",
    partner: "支持者",
    team: "试点工作台",
    demo: "试点展示"
  },
  womanNav: {
    home: "今日",
    setup: "入组",
    record: "记录",
    weekly: "周报",
    me: "我的"
  },
  partnerNav: {
    overview: "概览",
    assist: "协助",
    reminders: "提醒",
    consent: "授权"
  },
  teamNav: {
    queue: "跟进",
    cases: "个案",
    safety: "安全",
    completion: "完成",
    export: "数据",
    integration: "接口"
  },
  common: {
    loading: "正在加载今日内容...",
    minutes: (count) => `${count}分钟`,
    completed: "已完成",
    markDone: "我完成了",
    safetyNote: "安全提示",
    why: "为什么建议",
    helpNow: "我不舒服，需要帮忙",
    goRecord: "填写今日记录",
    noData: "暂无数据",
    save: "保存",
    continue: "继续",
    optional: "可选",
    status: "状态",
    authorised: "已授权",
    notAuthorised: "未授权",
    today: "今日",
    thisWeek: "本周",
    sevenDays: "最近7天",
    view: "查看",
    update: "更新"
  },
  home: {
    greeting: "今天好，林女士",
    title: "先了解身体信号，再做一个舒服的小行动",
    safeBody: "今天可以从低负担的小行动开始。这里只提供生活方式支持，不作诊断或治疗建议。",
    alertBody: "今天先暂停普通舒缓建议。请先联系支持者、家庭医生或服务人员；如情况紧急，请拨打 999。",
    actionsTitle: "今日舒缓小行动",
    remindersTitle: "今日生活提醒",
    completedCount: (done, total) => `${done}/${total} 个已完成`,
    partnerTitle: "支持者协助",
    partnerBody: "你可以授权可信任的人查看安全提示和简短周报，也可以请她协助记录。"
  },
  record: {
    title: "今日记录",
    subtitle: "先回答安全问题，再记录睡眠、潮热、心情和日常感受。",
    safetyStep: "第一步：今天有没有以下情况？",
    safetyHelp: "如任何一项为“有”，系统会暂停普通建议，并提醒你先找人协助或求医。",
    redFlagDetected: "需要先处理安全提示",
    redFlagBody: "请先联系支持者、家庭医生、妇科服务或社区健康服务人员。如情况紧急，请拨打 999。",
    recordStep: "第二步：日常记录",
    feeling: "今天整体感觉",
    sleep: "昨晚睡眠时间",
    hotFlashes: "今日潮热次数",
    nightSweats: "昨晚有夜汗",
    mood: "今日心情",
    stress: "压力程度（一至五）",
    energy: "精力程度（一至五）",
    periodStatus: "月经状态",
    urinaryLeakage: "有尿渗或盆底困扰",
    jointPain: "有关节或肌肉不适",
    submit: "保存今日记录",
    success: "今日记录已保存。"
  },
  weekly: {
    title: "周报",
    subtitle: "只显示生活方式和症状趋势，不作医疗判断。",
    checkins: "记录天数",
    actions: "舒缓小行动完成",
    hotFlashes: "潮热次数",
    sleep: "平均睡眠",
    energy: "今日精力",
    encouragementTitle: "一句鼓励",
    goalTitle: "下周一个小目标",
    encouragementSafe: "这星期最重要是把不舒服讲清楚。安全确认比完成任务更重要。",
    encouragementNormal: "你已经开始看见身体信号。每天一个小调整，也是在照顾自己。",
    goalSafe: "下周先确认安全，再恢复低负担小行动。",
    goalNormal: "下周试试每天完成 1 至 3 个舒缓小行动。"
  },
  me: {
    title: "我的",
    subtitle: "语言、支持者、隐私、数据使用同意和查阅记录。",
    profileTitle: "个人摘要",
    languageTitle: "语言设置",
    partnerTitle: "支持者管理",
    partnerBody: "林女士已授权伴侣查看今日记录、安全提示和周报摘要。",
    privacyTitle: "隐私与授权",
    privacyBody: "试点版会记录谁看过数据、何时协助填写，以及数据导出记录。",
    consentTitle: "数据使用同意",
    consentBody: "数据只用于服务跟进、试点评估及已授权研究分析。",
    withdrawTitle: "退出试点 / 撤回同意",
    withdrawBody: "参加者可要求停止试点或撤回授权，服务团队需协助处理。",
    accessTitle: "谁看过我的数据",
    accessSummary: "查看周报摘要"
  },
  safety: {
    title: "安全先行",
    body: "LivaNudge 不能判断病情，也不能提供药物或激素治疗建议。如有绝经后阴道出血、大量出血、胸口痛、明显气促、突然严重头痛或一侧无力，或出现伤害自己的想法，请先联系医护或可信任的人。如情况紧急，请拨打 999。",
    callPartner: "联系支持者",
    callStaff: "联系服务人员",
    emergency: "紧急情况拨打 999"
  },
  partner: {
    title: "支持者版",
    subtitle: "只在参加者授权后查看数据及协助记录。",
    overviewTitle: "支持者概览",
    assistedLabel: "由支持者协助填写",
    assistBody: "提交时会标记支持者身份，方便服务团队审计。",
    assistSuccess: "已以支持者身份提交今日记录。",
    remindersTitle: "提醒设置",
    consentTitle: "授权状态",
    scopeTitle: "授权范围",
    validTitle: "授权有效状态",
    revokeHint: "参加者可随时撤回授权；未授权时支持者不可查看健康数据。",
    blockedTitle: "未获授权",
    blockedBody: "请先由参加者确认授权，支持者才可查看今日状态或协助填写。",
    revoke: "模拟撤回授权",
    restore: "恢复试点授权"
  },
  team: {
    title: "试点工作台",
    subtitle: "先处理安全提示和高困扰个案，再查看试点数据。",
    priority: "优先级",
    participant: "参加者",
    trigger: "触发原因",
    action: "建议跟进动作",
    owner: "负责人",
    status: "状态",
    lastRecord: "最近一次记录",
    queueTitle: "今日跟进队列",
    casesTitle: "个案列表",
    safetyTitle: "安全提示记录",
    completionTitle: "完成情况",
    exportTitle: "试点数据",
    exportBody: "查看去识别化试点数据摘要，供服务检讨和后端对接检查。",
    exportButton: "导出数据",
    completionRate: "完成率",
    weeklyActive: "周活跃",
    supportLevel: "支持状态",
    focusTags: "关注标签",
    noFollowups: "今日没有待处理跟进。"
  },
  case: {
    basic: "基本资料摘要",
    partner: "支持者联系状态",
    records: "最近7天记录",
    actions: "最近7天小行动",
    safety: "安全提示历史",
    notes: "工作备注"
  },
  integration: {
    title: "接口接入中心",
    subtitle: "给研发、运营及试点负责人查看服务连接、沙盒测试和上线前缺口。",
    maturity: "接入成熟度",
    environment: "当前环境",
    services: "服务连接",
    sandbox: "沙盒接口测试",
    events: "事件日志",
    images: "图片流水线",
    mapping: "数据映射",
    gaps: "上线前缺口",
    latency: "平均响应",
    lastSync: "最近同步",
    errors: "近24小时错误",
    environmentHint: "环境设置",
    imageBody: "图片必须先由人工审核，确认安全、无治疗暗示及没有文字后，才可展示给参加者。"
  },
  demo: {
    title: "试点最小可行产品",
    subtitle: "把症状记录、舒缓小行动、安全提示、支持者和试点工作台放在同一个闭环。",
    loopTitle: "产品闭环",
    boundariesTitle: "智能生成边界",
    tagsTitle: "生活方式与症状标签",
    metricsTitle: "试点指标",
    exportTitle: "研究数据导出",
    retention: "8周留存",
    retentionDetail: "试点目标不低于70%",
    weeklyActive: "周活跃",
    weeklyActiveDetail: "试点目标不低于60%",
    completion: "完成率",
    completionDetail: "试点目标不低于50%",
    loopItems: [
      "身体信号：用短记录建立个人基线",
      "舒缓小行动：按症状和安全状态返回今日任务",
      "服务跟进：安全提示和高困扰自动进入队列"
    ],
    boundaries: [
      "不作疾病诊断",
      "不提供药物或激素治疗建议",
      "安全提示优先进入固定跟进流程",
      "智能生成只辅助表达，不取代人工确认"
    ]
  }
};

const optionLabels = {
  female: { [ZH_HK]: "女", [ZH_CN]: "女", [EN]: "Female" },
  perimenopause: { [ZH_HK]: "更年期前後", [ZH_CN]: "围绝经期", [EN]: "Perimenopause" },
  postmenopause: { [ZH_HK]: "收經後", [ZH_CN]: "绝经后", [EN]: "Postmenopause" },
  regular: { [ZH_HK]: "仲算規律", [ZH_CN]: "仍然规律", [EN]: "Still regular" },
  irregular: { [ZH_HK]: "開始唔規律", [ZH_CN]: "开始不规律", [EN]: "Becoming irregular" },
  no_period_12m: { [ZH_HK]: "已經12個月冇月經", [ZH_CN]: "已12个月没有月经", [EN]: "No period for 12 months" },
  good: { [ZH_HK]: "幾好", [ZH_CN]: "挺好", [EN]: "Good" },
  okay: { [ZH_HK]: "仲可以", [ZH_CN]: "还可以", [EN]: "Okay" },
  tired: { [ZH_HK]: "有啲攰", [ZH_CN]: "有点累", [EN]: "A little tired" },
  unwell: { [ZH_HK]: "唔太舒服", [ZH_CN]: "不太舒服", [EN]: "Not feeling well" },
  steady: { [ZH_HK]: "平穩", [ZH_CN]: "平稳", [EN]: "Steady" },
  anxious: { [ZH_HK]: "焦慮", [ZH_CN]: "焦虑", [EN]: "Anxious" },
  low: { [ZH_HK]: "心情低落", [ZH_CN]: "低落", [EN]: "Low" },
  irritable: { [ZH_HK]: "易怒", [ZH_CN]: "易怒", [EN]: "Irritable" },
  mild: { [ZH_HK]: "輕微", [ZH_CN]: "轻微", [EN]: "Mild" },
  moderate: { [ZH_HK]: "中等", [ZH_CN]: "中等", [EN]: "Moderate" },
  severe: { [ZH_HK]: "較嚴重", [ZH_CN]: "较严重", [EN]: "Severe" },
  normal: { [ZH_HK]: "正常", [ZH_CN]: "正常", [EN]: "Normal" },
  watch: { [ZH_HK]: "要留意", [ZH_CN]: "需要留意", [EN]: "Watch" },
  high: { [ZH_HK]: "偏高", [ZH_CN]: "偏高", [EN]: "High" },
  phone: { [ZH_HK]: "電話", [ZH_CN]: "电话", [EN]: "Phone" },
  whatsapp: { [ZH_HK]: "WhatsApp", [ZH_CN]: "WhatsApp", [EN]: "WhatsApp" },
  in_app: { [ZH_HK]: "App 內提示", [ZH_CN]: "App 内提醒", [EN]: "In-app reminder" },
  partner: { [ZH_HK]: "伴侶", [ZH_CN]: "伴侣", [EN]: "Partner" },
  daughter: { [ZH_HK]: "女兒", [ZH_CN]: "女儿", [EN]: "Daughter" },
  friend: { [ZH_HK]: "朋友", [ZH_CN]: "朋友", [EN]: "Friend" }
};

const supportLabels = {
  normal: { [ZH_HK]: "狀態平穩", [ZH_CN]: "状态平稳", [EN]: "Stable" },
  watch: { [ZH_HK]: "要留意", [ZH_CN]: "需要留意", [EN]: "Needs attention" },
  high: { [ZH_HK]: "困擾偏高", [ZH_CN]: "困扰偏高", [EN]: "Higher burden" },
  safety: { [ZH_HK]: "安全提示", [ZH_CN]: "安全提示", [EN]: "Safety alert" }
};

const priorityLabels = {
  urgent: { [ZH_HK]: "緊急", [ZH_CN]: "紧急", [EN]: "Urgent" },
  high: { [ZH_HK]: "高", [ZH_CN]: "高", [EN]: "High" },
  medium: { [ZH_HK]: "中", [ZH_CN]: "中", [EN]: "Medium" },
  routine: { [ZH_HK]: "常規", [ZH_CN]: "常规", [EN]: "Routine" }
};

const statusLabels = {
  pending: { [ZH_HK]: "待處理", [ZH_CN]: "待处理", [EN]: "Pending" },
  contacted: { [ZH_HK]: "已聯絡", [ZH_CN]: "已联系", [EN]: "Contacted" },
  closed: { [ZH_HK]: "已完成", [ZH_CN]: "已完成", [EN]: "Closed" }
};

const safetyLabels = {
  postmenopausal_bleeding: { [ZH_HK]: "收經後陰道出血", [ZH_CN]: "绝经后阴道出血", [EN]: "Postmenopausal bleeding" },
  heavy_bleeding: { [ZH_HK]: "出血好多，或者頭暈無力", [ZH_CN]: "大量出血或头晕乏力", [EN]: "Heavy bleeding or dizziness" },
  chest_pain: { [ZH_HK]: "心口痛或者心口明顯唔舒服", [ZH_CN]: "胸口痛或胸口明显不适", [EN]: "Chest pain or clear chest discomfort" },
  severe_breathless: { [ZH_HK]: "明顯氣促或者呼吸困難", [ZH_CN]: "明显气促或呼吸困难", [EN]: "Marked shortness of breath or breathing difficulty" },
  severe_headache_neuro: { [ZH_HK]: "突然嚴重頭痛、講嘢唔清楚或者一邊身無力", [ZH_CN]: "突然严重头痛、说话不清或一侧无力", [EN]: "Sudden severe headache, speech trouble, or one-sided weakness" },
  self_harm_thoughts: { [ZH_HK]: "有傷害自己嘅想法", [ZH_CN]: "有伤害自己的想法", [EN]: "Thoughts of self-harm" }
};

const tagLabels = {
  safety_first: { [ZH_HK]: "安全先行", [ZH_CN]: "安全先行", [EN]: "Safety first" },
  hot_flashes: { [ZH_HK]: "潮熱管理", [ZH_CN]: "潮热管理", [EN]: "Hot flash support" },
  sleep_rhythm: { [ZH_HK]: "睡眠節律", [ZH_CN]: "睡眠节律", [EN]: "Sleep rhythm" },
  mood_pressure: { [ZH_HK]: "情緒與壓力", [ZH_CN]: "情绪与压力", [EN]: "Mood and stress" },
  bone_strength: { [ZH_HK]: "骨骼與力量", [ZH_CN]: "骨骼与力量", [EN]: "Bone and strength" },
  pelvic_floor: { [ZH_HK]: "盆底支援", [ZH_CN]: "盆底支持", [EN]: "Pelvic floor" },
  nutrition: { [ZH_HK]: "飲食支援", [ZH_CN]: "饮食支持", [EN]: "Nutrition support" },
  partner_support: { [ZH_HK]: "支援者協助", [ZH_CN]: "支持者协助", [EN]: "Supporter help" },
  service_followup: { [ZH_HK]: "服務跟進優先", [ZH_CN]: "服务跟进优先", [EN]: "Service follow-up priority" }
};

const userLabels = {
  msLam: { [ZH_HK]: "林女士", [ZH_CN]: "林女士", [EN]: "Ms. Lam" },
  msHo: { [ZH_HK]: "何女士", [ZH_CN]: "何女士", [EN]: "Ms. Ho" },
  msTang: { [ZH_HK]: "鄧女士", [ZH_CN]: "邓女士", [EN]: "Ms. Tang" }
};

export function getCopy(language) {
  return appCopy[normalizeLanguage(language)] || appCopy[ZH_HK];
}

export function getInitialLanguage() {
  if (typeof window === "undefined") return ZH_HK;
  return normalizeLanguage(window.localStorage.getItem(LANGUAGE_STORAGE_KEY) || import.meta.env.VITE_DEFAULT_LOCALE || ZH_HK);
}

export function isChineseLanguage(language) {
  return language === ZH_HK || language === ZH_CN;
}

export function normalizeLanguage(language) {
  if (language === "zh") return ZH_HK;
  return LANGUAGES.includes(language) ? language : ZH_HK;
}

export function languageName(language, currentLanguage = language) {
  const labels = {
    [ZH_HK]: { [ZH_HK]: "廣東話", [ZH_CN]: "粤语", [EN]: "Cantonese" },
    [ZH_CN]: { [ZH_HK]: "普通話", [ZH_CN]: "普通话", [EN]: "Mandarin" },
    [EN]: { [ZH_HK]: "英文", [ZH_CN]: "英文", [EN]: "English" }
  };
  return labels[language]?.[currentLanguage] || language;
}

export function localizeText(value, language) {
  if (language === ZH_CN) return simplifyString(value);
  return value;
}

function labelFromMap(map, value, language) {
  const normalizedLanguage = normalizeLanguage(language);
  const fallback = map[value]?.[ZH_HK] || value;
  return map[value]?.[normalizedLanguage] || (normalizedLanguage === ZH_CN ? simplifyString(fallback) : fallback);
}

export const labelOption = (value, language) => labelFromMap(optionLabels, value, language);
export const labelSupport = (value, language) => labelFromMap(supportLabels, value, language);
export const labelPriority = (value, language) => labelFromMap(priorityLabels, value, language);
export const labelStatus = (value, language) => labelFromMap(statusLabels, value, language);
export const labelSafety = (value, language) => labelFromMap(safetyLabels, value, language);
export const labelTag = (value, language) => labelFromMap(tagLabels, value, language);
export const labelUser = (value, language) => labelFromMap(userLabels, value, language);

export function joinLabels(values, language, labeler = (value) => value) {
  return values.map((value) => labeler(value, language)).join(isChineseLanguage(language) ? "、" : ", ");
}
