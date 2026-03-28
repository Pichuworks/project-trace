const GRAPHIC_BANDS = [31, 62, 125, 250, 500, 1000, 2000, 4000, 8000, 16000];
const DRAW_FREQS = [20, 25, 31, 40, 50, 62, 80, 100, 125, 160, 200, 250, 315, 400, 500, 630, 800, 1000, 1250, 1600, 2000, 2500, 3150, 4000, 5000, 6300, 8000, 10000, 12500, 16000, 20000];
const SAMPLE_RATE = 48000;
const DEFAULT_CURVE_SOURCE = "measurement";
const FIT_FREQS = createLogFrequencyGrid(20, 20000, 72);
const LANGUAGE_STORAGE_KEY = "trace.language";
const MEASUREMENT_SETTINGS = {
  amplitude: 0.32,
  leadInSeconds: 0.12,
  syncFrequency: 1733,
  syncDurationSeconds: 0.08,
  syncGapSeconds: 0.08,
  toneDurationSeconds: 0.16,
  gapDurationSeconds: 0.035,
  fadeSeconds: 0.01,
  tailSeconds: 0.35
};
const DEMO_AUDIO_FILES = [
  { value: "demo #1.flac", label: "Demo #1" },
  { value: "demo #2.flac", label: "Demo #2" }
];
const PARAMETRIC_LAYOUT = [
  {
    labelKey: "filter_low_shelf",
    type: "LS",
    frequencies: [35, 45, 60, 80, 100, 130, 160],
    qs: [0.5, 0.71, 1],
    gains: createGainSteps(8)
  },
  {
    labelKey: "filter_low_mid_bell",
    type: "PK",
    frequencies: [180, 220, 280, 360, 460, 580],
    qs: [0.5, 0.7, 1, 1.4, 2],
    gains: createGainSteps(8)
  },
  {
    labelKey: "filter_center_bell",
    type: "PK",
    frequencies: [700, 900, 1200, 1600, 2000],
    qs: [0.5, 0.7, 1, 1.4, 2],
    gains: createGainSteps(8)
  },
  {
    labelKey: "filter_presence_bell",
    type: "PK",
    frequencies: [2000, 2600, 3200, 4000, 5000, 6300],
    qs: [0.5, 0.7, 1, 1.4, 2],
    gains: createGainSteps(8)
  },
  {
    labelKey: "filter_air_shelf",
    type: "HS",
    frequencies: [5000, 6500, 8000, 10000, 12000],
    qs: [0.5, 0.71, 1],
    gains: createGainSteps(8)
  }
];
const PRESET_STORAGE_KEY = "trace.presets";
const SESSION_STORAGE_KEY = "trace.session";
const SHARE_QUERY_KEY = "state";
const I18N = {
  "zh-CN": {
    app_title: "TRACE",
    topbar_summary: "先拟合响应，再导出可用的 EQ。适用于车载调音和播放器音色匹配。",
    response_delta: "响应偏差",
    workspace: "工作区",
    input_target: "输入与目标",
    calibration_mode: "校正模式",
    mode_car: "车载",
    mode_player: "播放器",
    source: "输入",
    measured_response: "测得响应",
    curve_source: "响应来源",
    curve_source_measurement: "实时分段扫频",
    curve_source_upload: "上传 CSV（REW / sweep 工具）",
    csv_file: "CSV 文件",
    csv_hint: "两列即可：频率 Hz、声级 dB。",
    measure: "测量",
    live_stepped_sweep: "实时分段扫频",
    measurement_hint: "将设备麦克风放在听音位置。应用会播放分段扫频，并提取一条相对响应曲线。",
    run_measurement: "开始测量",
    download_curve: "下载曲线",
    use_measurement: "使用测量结果",
    clear: "清除",
    status: "状态",
    measurement_status_default: "手机浏览器下属于尽力而为的测量方式。若设备允许，请关闭 AGC 或其他增强处理。",
    target_profile: "目标轮廓",
    target_style: "目标风格",
    style_reference: "参考",
    style_warm: "偏暖",
    style_clarity: "清晰",
    style_highway: "高速",
    vehicle_class: "车辆类型",
    vehicle_sedan: "轿车",
    vehicle_suv: "SUV",
    vehicle_hatch: "两厢 / 掀背",
    seat_focus: "听位重点",
    seat_driver: "主驾",
    seat_front_pair: "前排双座",
    seat_all: "全车平均",
    road_noise_bias: "路噪偏置",
    noise_quiet: "安静 / 停车",
    noise_urban: "城市道路",
    noise_highway: "高速公路",
    treble_appetite: "高频偏好",
    db_tilt: "dB 倾斜",
    reference_matching: "参考匹配",
    current_player_a: "当前播放器 A",
    target_player_b: "目标播放器 B",
    player_neutral: "中性基线",
    player_warm: "偏暖播放器",
    player_loudness: "响度增强 DSP",
    player_sparkle: "高频提亮",
    matching_focus: "匹配重点",
    focus_tonal: "只匹配音色平衡",
    focus_presence: "保留人声存在感",
    focus_low_end: "优先低频听感",
    solver: "求解器",
    output_and_limits: "输出与限制",
    output_eq: "输出 EQ",
    output_all: "全部输出",
    output_graphic10: "10 段图示 EQ",
    output_parametric: "参数 EQ",
    output_hybrid: "混合摘要",
    max_correction: "最大修正",
    clamp_at: "限制在",
    generate_eq: "生成 EQ",
    broad_corrections_hint: "优先做宽带修正。窄陷波会被刻意弱化处理。",
    presets: "预设",
    store_and_exchange: "保存与交换",
    preset_name: "预设名称",
    preset_name_placeholder: "主驾暖声夜间",
    save_preset: "保存预设",
    copy_json: "复制 JSON",
    saved_presets: "已存预设",
    no_saved_presets: "还没有已保存的预设",
    choose_saved_preset: "选择一个已保存的预设",
    load: "加载",
    delete: "删除",
    download_preset: "下载预设",
    import_preset: "导入预设",
    preset_status_default: "本地存储仅保存在当前浏览器中。",
    share: "分享",
    share_current_state: "分享当前状态",
    generate_link: "生成链接",
    copy_link: "复制链接",
    share_url: "分享链接",
    share_url_placeholder: "生成一个编码当前状态的分享链接",
    share_status_default: "上传的曲线数据会被编码进分享状态中。",
    quick_reference: "适合作为大多数车厢和回放链路的平衡基线。",
    quick_warm: "补一点低中频厚度，同时收敛上沿锋利感。",
    quick_clarity: "增强存在感区域，同时控制最高频段不过亮。",
    quick_highway: "在路噪遮蔽下保住人声清晰度和低频重量感。",
    result: "结果",
    correction_output: "校正输出",
    average_delta: "平均偏差",
    treble_zone: "高频区",
    bass_zone: "低频区",
    response_chart: "响应曲线图",
    chart_no_measured_data: "暂无测量数据",
    chart_measured: "测得响应",
    chart_player_a: "播放器 A 基线",
    chart_target: "目标曲线",
    chart_corrected: "校正后",
    eq_10_band: "10 段 EQ",
    graphic: "图示 EQ",
    parametric_eq: "参数 EQ",
    biquad_set: "Biquad 组",
    hybrid_notes: "混合建议",
    operator_notes: "操作提示",
    export: "导出",
    playback_ready_text: "可直接使用的文本",
    export_format: "导出格式",
    export_generic_parametric: "通用参数 EQ 文本",
    export_equalizer_apo: "Equalizer APO 文本",
    export_graphic_summary: "10 段摘要",
    export_session_json: "会话 JSON",
    copy_current_format: "复制当前格式",
    copy_export_json: "复制导出 JSON",
    export_status_default: "如无明确目标平台，优先使用通用参数 EQ 文本。",
    preview: "试听",
    browser_listening_check: "浏览器内试听",
    audio_file: "音频文件",
    demo_audio: "演示音频",
    preview_hint: "通过 Web Audio 在本地运行。",
    load_demo_audio: "加载演示音频",
    preview_original: "原始",
    preview_eq: "EQ",
    preview_demo_ready: "演示音频已载入，可在播放时无缝切换原始与 EQ。",
    preview_file_ready: "音频已载入，可在播放时无缝切换原始与 EQ。",
    filter_low_shelf: "低频搁架",
    filter_low_mid_bell: "低中频峰值",
    filter_center_bell: "中频峰值",
    filter_presence_bell: "存在感峰值",
    filter_air_shelf: "空气感搁架",
    hybrid_low_shelf: "建议先在 90 Hz 左右做低频搁架：{value}。如果图示 EQ 太碎，可以优先用这一项。",
    hybrid_low_mid: "低中频轮廓大约在 350 Hz：{value}。这里建议保守，避免把车厢或播放器调得发闷发鼻。",
    hybrid_presence: "存在感区域大约在 3 kHz：{value}。通常这里决定人声清晰度和军鼓攻击感能否回来。",
    hybrid_air: "高频搁架大约在 9 kHz：{value}。如果手机麦高频不稳定，这项可以视情况减弱。",
    measurement_summary_empty: "31 点扫频，锚定 1 kHz。",
    measurement_summary_ready: "{count} 个频点已就绪。低频 {bass}，高频 {treble}。",
    measurement_no_api: "当前浏览器不支持麦克风采集接口。",
    measurement_no_audio_context: "当前浏览器不支持 Web Audio 输出接口。",
    measurement_requesting: "正在请求麦克风权限...",
    measurement_running: "正在执行分段扫频，预计 {seconds} 秒...",
    measurement_sync_failed: "测量结束，但没有可靠地解析出同步脉冲。",
    measurement_captured: "测量完成，已提取 {count} 个频点并应用。",
    measurement_failed: "测量失败：{message}",
    measurement_run_first: "请先执行一次实时测量。",
    measurement_selected: "已选中测量输入源。运行实时分段扫频后会写入数据。",
    measurement_selected_active: "已将实时测量结果设为当前输入曲线。",
    measurement_cleared: "已清除实时测量曲线。",
    measurement_downloaded: "已将测得响应曲线下载为 CSV。",
    upload_curve_invalid: "上传的 CSV 频点不足，无法生成有效曲线。",
    preset_saved: "已在当前浏览器中保存预设“{name}”。",
    preset_choose_first: "请先选择一个已保存的预设。",
    preset_loaded: "已加载预设“{name}”。",
    preset_deleted: "已删除预设“{name}”。",
    preset_deleted_generic: "已删除预设。",
    preset_storage_blocked: "当前浏览器阻止了本地预设存储。",
    preset_file_downloaded: "已下载预设文件“{name}”。",
    preset_import_none: "该文件里没有可用的预设。",
    preset_import_single: "已导入预设“{name}”。",
    preset_import_multi: "已从文件导入 {count} 个预设。",
    preset_import_failed: "该预设文件无法解析。",
    share_generated: "分享链接已生成，共 {count} 个字符。",
    share_generated_long: "分享链接已生成，但长度为 {count} 个字符，部分应用可能无法完整处理。",
    share_copied: "分享链接已复制到剪贴板。",
    clipboard_failed: "当前浏览器无法访问剪贴板。",
    state_json_copied: "当前状态 JSON 已复制到剪贴板。",
    export_copied: "当前导出内容已复制到剪贴板。",
    export_json_copied: "导出 JSON 已复制到剪贴板。",
    shared_link_invalid: "分享链接无法被正确解码。",
    shared_loaded: "已从分享链接载入设置。",
    session_restored: "已恢复上次的本地会话。"
  },
  en: {
    app_title: "TRACE",
    topbar_summary: "Fit the curve. Export the EQ. In-car tuning and player-to-player response matching.",
    response_delta: "Response delta",
    workspace: "Workspace",
    input_target: "Input and target",
    calibration_mode: "Calibration mode",
    mode_car: "Car",
    mode_player: "Player",
    source: "Source",
    measured_response: "Measured response",
    curve_source: "Curve source",
    curve_source_measurement: "Live stepped sweep",
    curve_source_upload: "Upload CSV from REW / sweep tool",
    csv_file: "CSV file",
    csv_hint: "Two columns: frequency in Hz, level in dB.",
    measure: "Measure",
    live_stepped_sweep: "Live stepped sweep",
    measurement_hint: "Use the device microphone at the listening position. The app plays a stepped sweep and captures a relative response curve.",
    run_measurement: "Run measurement",
    download_curve: "Download curve",
    use_measurement: "Use measurement",
    clear: "Clear",
    status: "Status",
    measurement_status_default: "Best effort only in mobile browsers. Disable AGC or enhancement features when possible.",
    target_profile: "Target profile",
    target_style: "Target style",
    style_reference: "Reference",
    style_warm: "Warm",
    style_clarity: "Clarity",
    style_highway: "Highway",
    vehicle_class: "Vehicle class",
    vehicle_sedan: "Sedan",
    vehicle_suv: "SUV",
    vehicle_hatch: "Hatchback",
    seat_focus: "Seat focus",
    seat_driver: "Driver",
    seat_front_pair: "Front pair",
    seat_all: "All seats",
    road_noise_bias: "Road-noise bias",
    noise_quiet: "Quiet / parked",
    noise_urban: "Urban drive",
    noise_highway: "Highway",
    treble_appetite: "Treble appetite",
    db_tilt: "dB tilt",
    reference_matching: "Reference matching",
    current_player_a: "Current player A",
    target_player_b: "Target player B",
    player_neutral: "Neutral baseline",
    player_warm: "Warm streamer",
    player_loudness: "Loudness DSP",
    player_sparkle: "Sparkle enhancer",
    matching_focus: "Matching focus",
    focus_tonal: "Tonal balance only",
    focus_presence: "Preserve vocal presence",
    focus_low_end: "Prioritize low-end feel",
    solver: "Solver",
    output_and_limits: "Output and limits",
    output_eq: "Output EQ",
    output_all: "All outputs",
    output_graphic10: "10-band graphic EQ",
    output_parametric: "Parametric EQ",
    output_hybrid: "Hybrid summary",
    max_correction: "Max correction",
    clamp_at: "Clamp at",
    generate_eq: "Generate EQ",
    broad_corrections_hint: "Broad corrections first. Narrow notches are intentionally de-emphasized.",
    presets: "Presets",
    store_and_exchange: "Store and exchange",
    preset_name: "Preset name",
    preset_name_placeholder: "Driver warm night",
    save_preset: "Save preset",
    copy_json: "Copy JSON",
    saved_presets: "Saved presets",
    no_saved_presets: "No saved presets yet",
    choose_saved_preset: "Choose a saved preset",
    load: "Load",
    delete: "Delete",
    download_preset: "Download preset",
    import_preset: "Import preset",
    preset_status_default: "Local storage is browser-specific.",
    share: "Share",
    share_current_state: "Share the current state",
    generate_link: "Generate link",
    copy_link: "Copy link",
    share_url: "Share URL",
    share_url_placeholder: "Generate a link to encode the current state",
    share_status_default: "Uploaded curves are embedded into the shared state.",
    quick_reference: "Balanced baseline for most cabins and speaker chains.",
    quick_warm: "Fills low mids and softens the upper edge.",
    quick_clarity: "Pushes presence while keeping the top octave controlled.",
    quick_highway: "Protects speech and bass weight against road masking.",
    result: "Result",
    correction_output: "Correction output",
    average_delta: "Average delta",
    treble_zone: "Treble zone",
    bass_zone: "Bass zone",
    response_chart: "Response chart",
    chart_no_measured_data: "No measured data",
    chart_measured: "Measured response",
    chart_player_a: "Player A reference",
    chart_target: "Target curve",
    chart_corrected: "Corrected",
    eq_10_band: "10-band EQ",
    graphic: "Graphic",
    parametric_eq: "Parametric EQ",
    biquad_set: "Biquad set",
    hybrid_notes: "Hybrid notes",
    operator_notes: "Operator notes",
    export: "Export",
    playback_ready_text: "Playback-ready text",
    export_format: "Export format",
    export_generic_parametric: "Generic parametric text",
    export_equalizer_apo: "Equalizer APO text",
    export_graphic_summary: "10-band summary",
    export_session_json: "Session JSON",
    copy_current_format: "Copy current format",
    copy_export_json: "Copy export JSON",
    export_status_default: "Use the generic text as the neutral handoff format.",
    preview: "Preview",
    browser_listening_check: "Browser listening check",
    audio_file: "Audio file",
    demo_audio: "Demo audio",
    preview_hint: "Runs locally through Web Audio.",
    load_demo_audio: "Load demo audio",
    preview_original: "Original",
    preview_eq: "EQ",
    preview_demo_ready: "Demo audio is loaded. Switch between original and EQ while playback continues.",
    preview_file_ready: "Audio is loaded. Switch between original and EQ while playback continues.",
    filter_low_shelf: "Low shelf",
    filter_low_mid_bell: "Low-mid bell",
    filter_center_bell: "Center bell",
    filter_presence_bell: "Presence bell",
    filter_air_shelf: "Air shelf",
    hybrid_low_shelf: "Low shelf around 90 Hz: {value}. Use this first if the graphic EQ feels too fiddly.",
    hybrid_low_mid: "Low-mid contour around 350 Hz: {value}. Keep this subtle to avoid a boxy cabin or nasal player match.",
    hybrid_presence: "Presence zone around 3 kHz: {value}. This is where speech clarity and snare attack usually recover.",
    hybrid_air: "High shelf around 9 kHz: {value}. Treat this as optional when phone-mic measurements are noisy.",
    measurement_summary_empty: "31-point sweep, anchored at 1 kHz.",
    measurement_summary_ready: "{count}-point curve ready. Bass {bass}, treble {treble}.",
    measurement_no_api: "This browser does not expose microphone capture APIs.",
    measurement_no_audio_context: "This browser does not expose Web Audio output APIs.",
    measurement_requesting: "Requesting microphone access...",
    measurement_running: "Running stepped sweep for {seconds} seconds...",
    measurement_sync_failed: "Measurement finished, but the sync pulse could not be resolved cleanly.",
    measurement_captured: "Measurement captured and applied from {count} frequency points.",
    measurement_failed: "Measurement failed: {message}",
    measurement_run_first: "Run a measurement first.",
    measurement_selected: "Measurement source selected. Run the live stepped sweep to populate it.",
    measurement_selected_active: "Live measurement selected as the active input curve.",
    measurement_cleared: "Cleared the live measurement curve.",
    measurement_downloaded: "Downloaded the measured response curve as CSV.",
    upload_curve_invalid: "The uploaded CSV did not contain enough frequency points.",
    preset_saved: "Saved preset \"{name}\" in this browser.",
    preset_choose_first: "Choose a saved preset first.",
    preset_loaded: "Loaded preset \"{name}\".",
    preset_deleted: "Deleted preset \"{name}\".",
    preset_deleted_generic: "Deleted preset.",
    preset_storage_blocked: "This browser blocked local preset storage.",
    preset_file_downloaded: "Downloaded preset file for \"{name}\".",
    preset_import_none: "No valid presets were found in that file.",
    preset_import_single: "Imported preset \"{name}\".",
    preset_import_multi: "Imported {count} presets from file.",
    preset_import_failed: "That preset file could not be parsed.",
    share_generated: "Share link ready at {count} characters.",
    share_generated_long: "Link generated, but it is {count} characters long and may be too large for some apps.",
    share_copied: "Share link copied to clipboard.",
    clipboard_failed: "Clipboard access failed in this browser.",
    state_json_copied: "Current state JSON copied to clipboard.",
    export_copied: "Current export format copied to clipboard.",
    export_json_copied: "Export JSON copied to clipboard.",
    shared_link_invalid: "The shared link could not be decoded cleanly.",
    shared_loaded: "Loaded settings from the shared link.",
    session_restored: "Restored your last local session."
  }
};

const PLAYER_SIGNATURES = {
  "neutral-player": curveFrom([[20, 0], [80, 0], [250, 0], [1000, 0], [4000, 0], [16000, 0], [20000, 0]]),
  "warm-player": curveFrom([[20, 1.2], [40, 1.7], [80, 2.1], [250, 1.2], [1000, 0], [4000, -0.8], [8000, -1.2], [16000, -1.4], [20000, -1.6]]),
  "loudness-player": curveFrom([[20, 2.5], [40, 2.7], [80, 2.4], [250, 0.8], [1000, 0], [2000, 0.4], [4000, 0.8], [8000, 1.4], [16000, 1.1], [20000, 0.6]]),
  "sparkle-player": curveFrom([[20, 0.3], [80, 0.4], [250, 0.2], [1000, 0], [2000, 0.9], [4000, 1.8], [8000, 2.3], [16000, 1.9], [20000, 1.2]])
};

const el = {
  modeButtons: [...document.querySelectorAll(".mode-button")],
  modePanels: [...document.querySelectorAll("[data-mode-panel]")],
  curveSource: document.querySelector("#curve-source"),
  curveUpload: document.querySelector("#curve-upload"),
  uploadWrap: document.querySelector("#upload-wrap"),
  startMeasurement: document.querySelector("#start-measurement"),
  downloadMeasurement: document.querySelector("#download-measurement"),
  useMeasurement: document.querySelector("#use-measurement"),
  clearMeasurement: document.querySelector("#clear-measurement"),
  measurementStatus: document.querySelector("#measurement-status"),
  measurementSummary: document.querySelector("#measurement-summary"),
  languageSelect: document.querySelector("#language-select"),
  carStyle: document.querySelector("#car-style"),
  vehicleClass: document.querySelector("#vehicle-class"),
  seatFocus: document.querySelector("#seat-focus"),
  noiseLevel: document.querySelector("#noise-level"),
  airiness: document.querySelector("#airiness"),
  airinessReadout: document.querySelector("#airiness-readout"),
  playerA: document.querySelector("#player-a"),
  playerB: document.querySelector("#player-b"),
  matchFocus: document.querySelector("#match-focus"),
  eqTopology: document.querySelector("#eq-topology"),
  maxBoost: document.querySelector("#max-boost"),
  maxBoostReadout: document.querySelector("#max-boost-readout"),
  fitButton: document.querySelector("#fit-button"),
  presetName: document.querySelector("#preset-name"),
  savePreset: document.querySelector("#save-preset"),
  savedPresets: document.querySelector("#saved-presets"),
  loadPreset: document.querySelector("#load-preset"),
  deletePreset: document.querySelector("#delete-preset"),
  downloadPreset: document.querySelector("#download-preset"),
  importPresetTrigger: document.querySelector("#import-preset-trigger"),
  presetImport: document.querySelector("#preset-import"),
  presetStatus: document.querySelector("#preset-status"),
  generateLink: document.querySelector("#generate-link"),
  copyLink: document.querySelector("#copy-link"),
  shareLink: document.querySelector("#share-link"),
  shareStatus: document.querySelector("#share-status"),
  copyJson: document.querySelector("#copy-json"),
  copyParametric: document.querySelector("#copy-parametric"),
  copyExportJson: document.querySelector("#copy-export-json"),
  exportFormat: document.querySelector("#export-format"),
  exportOutput: document.querySelector("#export-output"),
  exportStatus: document.querySelector("#export-status"),
  graphicSection: document.querySelector("#graphic-section"),
  parametricSection: document.querySelector("#parametric-section"),
  hybridSection: document.querySelector("#hybrid-section"),
  graphicOutput: document.querySelector("#graphic-output"),
  parametricOutput: document.querySelector("#parametric-output"),
  hybridOutput: document.querySelector("#hybrid-output"),
  avgDelta: document.querySelector("#avg-delta"),
  trebleDelta: document.querySelector("#treble-delta"),
  bassDelta: document.querySelector("#bass-delta"),
  chart: document.querySelector("#response-chart"),
  chartMeasuredLabel: document.querySelector("#chart-measured-label"),
  chartTargetLabel: document.querySelector("#chart-target-label"),
  chartCorrectedLabel: document.querySelector("#chart-corrected-label"),
  heroDelta: document.querySelector("#hero-delta"),
  audioUpload: document.querySelector("#audio-upload"),
  demoAudioSelect: document.querySelector("#demo-audio-select"),
  loadDemoAudio: document.querySelector("#load-demo-audio"),
  previewAudio: document.querySelector("#preview-audio"),
  previewOriginal: document.querySelector("#preview-original"),
  previewEq: document.querySelector("#preview-eq")
};

const state = {
  language: "zh-CN",
  mode: "car",
  uploadedCurve: null,
  measuredCurve: null,
  graphicGains: Array(GRAPHIC_BANDS.length).fill(0),
  parametricFilters: [],
  presets: [],
  audioContext: null,
  audioSource: null,
  audioFilters: [],
  previewWetInput: null,
  previewDryGain: null,
  previewWetGain: null,
  previewMode: "original",
  audioObjectUrl: null,
  measurementRunning: false,
  measurementPlan: null
};

function curveFrom(points) {
  return points.map(([freq, db]) => ({ freq, db }));
}

function toPairs(curve) {
  return curve.map((point) => [point.freq, point.db]);
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function round(value, digits = 1) {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

function createLogFrequencyGrid(start, end, count) {
  return Array.from({ length: count }, (_, index) => {
    const ratio = index / (count - 1);
    return round(10 ** (Math.log10(start) + ratio * (Math.log10(end) - Math.log10(start))), 2);
  });
}

function createGainSteps(limit = 6, step = 0.5) {
  const values = [];
  for (let gain = -limit; gain <= limit + 1e-6; gain += step) {
    values.push(round(gain));
  }
  return values;
}

function formatSigned(value) {
  const rounded = round(value);
  return `${rounded >= 0 ? "+" : ""}${rounded.toFixed(1)} dB`;
}

function interpolateCurve(curve, freq) {
  const pairs = toPairs(curve);
  if (freq <= pairs[0][0]) return pairs[0][1];
  if (freq >= pairs[pairs.length - 1][0]) return pairs[pairs.length - 1][1];

  for (let index = 0; index < pairs.length - 1; index += 1) {
    const [leftFreq, leftDb] = pairs[index];
    const [rightFreq, rightDb] = pairs[index + 1];
    if (freq >= leftFreq && freq <= rightFreq) {
      const position = (Math.log10(freq) - Math.log10(leftFreq)) / (Math.log10(rightFreq) - Math.log10(leftFreq));
      return lerp(leftDb, rightDb, position);
    }
  }

  return 0;
}

function averageRange(curve, low, high) {
  const subset = DRAW_FREQS.filter((freq) => freq >= low && freq <= high).map((freq) => interpolateCurve(curve, freq));
  return subset.reduce((sum, value) => sum + value, 0) / subset.length;
}

function averageWeighted(curve, centerFreq, width) {
  let sum = 0;
  let weightSum = 0;
  curve.forEach((point) => {
    const distance = Math.abs(Math.log10(point.freq) - Math.log10(centerFreq));
    const weight = Math.exp(-(distance ** 2) / (2 * width ** 2));
    sum += point.db * weight;
    weightSum += weight;
  });
  return sum / weightSum;
}

function averageOfIndices(values, indices) {
  return indices.reduce((sum, index) => sum + values[index], 0) / indices.length;
}

function setStatus(element, text) {
  element.textContent = text;
}

function t(key, variables = {}) {
  const table = I18N[state.language] ?? I18N.en;
  const template = table[key] ?? I18N.en[key] ?? key;
  return template.replace(/\{(\w+)\}/g, (_, token) => String(variables[token] ?? ""));
}

function applyI18n() {
  document.documentElement.lang = state.language;
  document.title = t("app_title");
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
    node.placeholder = t(node.dataset.i18nPlaceholder);
  });
  document.querySelectorAll("[data-i18n-aria-label]").forEach((node) => {
    node.setAttribute("aria-label", t(node.dataset.i18nAriaLabel));
  });
  if (el.languageSelect) el.languageSelect.value = state.language;
  if (el.previewOriginal && el.previewEq) {
    el.previewOriginal.textContent = t("preview_original");
    el.previewEq.textContent = t("preview_eq");
    el.loadDemoAudio.textContent = t("load_demo_audio");
  }
  populateDemoAudioSelect(el.demoAudioSelect?.value);
}

function populateDemoAudioSelect(selectedValue = "") {
  if (!el.demoAudioSelect) return;
  const currentValue = selectedValue || el.demoAudioSelect.value || DEMO_AUDIO_FILES[0].value;
  el.demoAudioSelect.innerHTML = "";
  DEMO_AUDIO_FILES.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.value;
    option.textContent = item.label;
    if (item.value === currentValue) option.selected = true;
    el.demoAudioSelect.append(option);
  });
}

function buildCarTarget() {
  const style = el.carStyle.value;
  const vehicleClass = el.vehicleClass.value;
  const seatFocus = el.seatFocus.value;
  const noiseLevel = el.noiseLevel.value;
  const airiness = Number(el.airiness.value);

  const baseCurve = {
    reference: curveFrom([[20, -7.5], [31, -3.4], [40, -1.1], [62, 0.9], [80, 1.6], [125, 1.2], [250, 0.4], [500, 0.1], [1000, 0], [2000, -0.6], [4000, -1.5], [8000, -2.6], [16000, -4.8], [20000, -6]]),
    warm: curveFrom([[20, -7.2], [31, -2.8], [40, -0.3], [62, 1.6], [80, 2.3], [125, 1.8], [250, 0.9], [500, 0.2], [1000, -0.2], [2000, -1], [4000, -2.2], [8000, -3.4], [16000, -5.6], [20000, -7]]),
    clarity: curveFrom([[20, -8], [31, -3.7], [40, -1.4], [62, 0.3], [80, 1.1], [125, 0.8], [250, 0.2], [500, 0.1], [1000, 0], [2000, 0], [4000, 0.5], [8000, -0.4], [16000, -2.3], [20000, -3.9]]),
    highway: curveFrom([[20, -6.5], [31, -2.4], [40, 0.1], [62, 1.5], [80, 2], [125, 1.4], [250, 0.7], [500, 0.2], [1000, 0.1], [2000, 0.6], [4000, 0.2], [8000, -0.8], [16000, -2.8], [20000, -4.4]])
  }[style];

  return DRAW_FREQS.map((freq) => {
    let db = interpolateCurve(baseCurve, freq);

    if (vehicleClass === "suv") {
      if (freq <= 125) db += 0.5;
      if (freq >= 4000) db -= 0.4;
    }

    if (vehicleClass === "hatch") {
      if (freq <= 80) db += 0.3;
      if (freq >= 2500 && freq <= 8000) db += 0.4;
    }

    if (seatFocus === "front-pair" && freq >= 2000) db -= 0.3;

    if (seatFocus === "all-seats") {
      if (freq <= 80) db -= 0.4;
      if (freq >= 4000) db -= 0.4;
    }

    if (noiseLevel === "urban" && freq >= 2500 && freq <= 8000) db += 0.4;

    if (noiseLevel === "highway") {
      if (freq <= 125) db += 0.6;
      if (freq >= 2000 && freq <= 5000) db += 0.8;
      if (freq >= 10000) db -= 0.2;
    }

    if (freq >= 2500) {
      db += airiness;
    } else if (freq >= 1000) {
      db += airiness * 0.4;
    }

    return { freq, db };
  });
}

function buildPlayerTarget() {
  const playerACurve = PLAYER_SIGNATURES[el.playerA.value];
  const playerBCurve = PLAYER_SIGNATURES[el.playerB.value];
  const focus = el.matchFocus.value;

  return DRAW_FREQS.map((freq) => {
    let db = interpolateCurve(playerBCurve, freq);
    const aDb = interpolateCurve(playerACurve, freq);

    if (focus === "presence" && freq >= 1500 && freq <= 4500) db = lerp(db, aDb, 0.2);
    if (focus === "low-end" && freq <= 140) db += 0.5;

    return { freq, db };
  });
}

function getFallbackCurve() {
  if (state.mode === "player") {
    if (el.curveSource.value === "upload" && state.uploadedCurve) return state.uploadedCurve;
    return DRAW_FREQS.map((freq) => ({ freq, db: interpolateCurve(PLAYER_SIGNATURES[el.playerA.value], freq) }));
  }

  if (el.curveSource.value === "upload" && state.uploadedCurve) return state.uploadedCurve;
  return DRAW_FREQS.map((freq) => ({ freq, db: 0 }));
}

function getMeasuredCurve() {
  if (el.curveSource.value === "measurement" && state.measuredCurve) {
    return state.measuredCurve;
  }

  return getFallbackCurve();
}

function smoothCurve(curve, width = 1.2) {
  return curve.map((point) => {
    let sum = 0;
    let weightSum = 0;

    curve.forEach((neighbor) => {
      const distance = Math.abs(Math.log10(point.freq) - Math.log10(neighbor.freq));
      const weight = Math.exp(-(distance ** 2) / (2 * width ** 2 * 0.012));
      sum += neighbor.db * weight;
      weightSum += weight;
    });

    return { freq: point.freq, db: sum / weightSum };
  });
}

function computeBandGains(measuredCurve, targetCurve, maxBoost) {
  return GRAPHIC_BANDS.map((band) => {
    const measured = averageWeighted(measuredCurve, band, 0.18);
    const target = averageWeighted(targetCurve, band, 0.18);
    return Math.round(clamp(target - measured, -maxBoost, maxBoost) * 10) / 10;
  });
}

function buildHybridNotes(bandGains) {
  const bassLift = averageOfIndices(bandGains, [0, 1, 2]);
  const lowMid = averageOfIndices(bandGains, [3, 4]);
  const presence = averageOfIndices(bandGains, [6, 7]);
  const air = averageOfIndices(bandGains, [8, 9]);

  return [
    t("hybrid_low_shelf", { value: formatSigned(bassLift) }),
    t("hybrid_low_mid", { value: formatSigned(lowMid) }),
    t("hybrid_presence", { value: formatSigned(presence) }),
    t("hybrid_air", { value: formatSigned(air) })
  ];
}

function buildParametricFilters(measuredCurve, targetCurve, maxBoost) {
  const targetDelta = FIT_FREQS.map(
    (freq) => interpolateCurve(targetCurve, freq) - interpolateCurve(measuredCurve, freq)
  );
  const limits = { maxBoost: round(maxBoost) };
  let filters = PARAMETRIC_LAYOUT.map((layout) => ({
    labelKey: layout.labelKey,
    type: layout.type,
    frequency: layout.frequencies[Math.floor(layout.frequencies.length / 2)],
    q: layout.qs[Math.floor(layout.qs.length / 2)],
    gain: 0
  }));

  filters = filters.map((_, index) => {
    const locked = filters.slice(0, index);
    const residual = computeResidualDelta(targetDelta, locked, FIT_FREQS);
    return selectBestFilter(PARAMETRIC_LAYOUT[index], residual, FIT_FREQS, limits);
  });

  for (let pass = 0; pass < 2; pass += 1) {
    filters = filters.map((currentFilter, index) => {
      const otherFilters = filters.filter((_, filterIndex) => filterIndex !== index);
      const residual = computeResidualDelta(targetDelta, otherFilters, FIT_FREQS);
      const refined = selectBestFilter(PARAMETRIC_LAYOUT[index], residual, FIT_FREQS, limits);
      return refined.score <= evaluateFilters(targetDelta, [...otherFilters, currentFilter], FIT_FREQS)
        ? refined
        : currentFilter;
    });
  }

  return filters.map((filter) => ({
    ...filter,
    gain: round(filter.gain),
    q: round(filter.q, 2),
    score: undefined
  }));
}

function computeResidualDelta(targetDelta, filters, frequencies) {
  const combined = evaluateFilterStack(filters, frequencies);
  return targetDelta.map((value, index) => value - combined[index]);
}

function evaluateFilterStack(filters, frequencies) {
  return frequencies.map((freq) =>
    filters.reduce((sum, filter) => sum + biquadMagnitudeDb(filter, freq), 0)
  );
}

function evaluateFilters(targetDelta, filters, frequencies) {
  const response = evaluateFilterStack(filters, frequencies);
  return weightedError(
    targetDelta,
    response,
    frequencies
  );
}

function weightedError(target, prediction, frequencies) {
  let total = 0;
  for (let index = 0; index < target.length; index += 1) {
    const freq = frequencies[index];
    let weight = 1;
    if (freq < 45) weight *= 0.6;
    if (freq > 9000) weight *= 0.65;
    if (freq >= 200 && freq <= 6000) weight *= 1.2;
    const delta = target[index] - prediction[index];
    total += delta * delta * weight;
  }
  return total;
}

function selectBestFilter(layout, targetDelta, frequencies, limits) {
  const gainCandidates = layout.gains.filter((gain) => Math.abs(gain) <= limits.maxBoost + 1e-6);
  let best = {
    labelKey: layout.labelKey,
    type: layout.type,
    frequency: layout.frequencies[0],
    q: layout.qs[0],
    gain: 0,
    score: Infinity
  };

  layout.frequencies.forEach((frequency) => {
    layout.qs.forEach((q) => {
      gainCandidates.forEach((gain) => {
        const candidate = { labelKey: layout.labelKey, type: layout.type, frequency, q, gain };
        const prediction = frequencies.map((freq) => biquadMagnitudeDb(candidate, freq));
        const score = weightedError(targetDelta, prediction, frequencies);
        if (score < best.score) {
          best = { ...candidate, score };
        }
      });
    });
  });

  return best;
}

function biquadMagnitudeDb(filter, frequency, sampleRate = SAMPLE_RATE) {
  if (!filter || Math.abs(filter.gain) < 0.05) return 0;
  const coeffs = getBiquadCoefficients(filter, sampleRate);
  const omega = (2 * Math.PI * frequency) / sampleRate;
  const cosOmega = Math.cos(omega);
  const sinOmega = Math.sin(omega);
  const cosTwoOmega = Math.cos(2 * omega);
  const sinTwoOmega = Math.sin(2 * omega);

  const numRe = coeffs.b0 + coeffs.b1 * cosOmega + coeffs.b2 * cosTwoOmega;
  const numIm = -(coeffs.b1 * sinOmega + coeffs.b2 * sinTwoOmega);
  const denRe = 1 + coeffs.a1 * cosOmega + coeffs.a2 * cosTwoOmega;
  const denIm = -(coeffs.a1 * sinOmega + coeffs.a2 * sinTwoOmega);

  const numerator = numRe * numRe + numIm * numIm;
  const denominator = denRe * denRe + denIm * denIm;
  return 10 * Math.log10(Math.max(numerator / Math.max(denominator, 1e-12), 1e-12));
}

function getBiquadCoefficients(filter, sampleRate) {
  const A = 10 ** (filter.gain / 40);
  const omega = (2 * Math.PI * filter.frequency) / sampleRate;
  const sinOmega = Math.sin(omega);
  const cosOmega = Math.cos(omega);
  const q = Math.max(filter.q, 0.1);

  if (filter.type === "PK") {
    const alpha = sinOmega / (2 * q);
    return normalizeBiquad({
      b0: 1 + alpha * A,
      b1: -2 * cosOmega,
      b2: 1 - alpha * A,
      a0: 1 + alpha / A,
      a1: -2 * cosOmega,
      a2: 1 - alpha / A
    });
  }

  const shelfSlope = q;
  const alpha =
    (sinOmega / 2) *
    Math.sqrt((A + 1 / A) * (1 / shelfSlope - 1) + 2);
  const sqrtA = Math.sqrt(A);

  if (filter.type === "LS") {
    return normalizeBiquad({
      b0: A * ((A + 1) - (A - 1) * cosOmega + 2 * sqrtA * alpha),
      b1: 2 * A * ((A - 1) - (A + 1) * cosOmega),
      b2: A * ((A + 1) - (A - 1) * cosOmega - 2 * sqrtA * alpha),
      a0: (A + 1) + (A - 1) * cosOmega + 2 * sqrtA * alpha,
      a1: -2 * ((A - 1) + (A + 1) * cosOmega),
      a2: (A + 1) + (A - 1) * cosOmega - 2 * sqrtA * alpha
    });
  }

  return normalizeBiquad({
    b0: A * ((A + 1) + (A - 1) * cosOmega + 2 * sqrtA * alpha),
    b1: -2 * A * ((A - 1) + (A + 1) * cosOmega),
    b2: A * ((A + 1) + (A - 1) * cosOmega - 2 * sqrtA * alpha),
    a0: (A + 1) - (A - 1) * cosOmega + 2 * sqrtA * alpha,
    a1: 2 * ((A - 1) - (A + 1) * cosOmega),
    a2: (A + 1) - (A - 1) * cosOmega - 2 * sqrtA * alpha
  });
}

function normalizeBiquad(coeffs) {
  return {
    b0: coeffs.b0 / coeffs.a0,
    b1: coeffs.b1 / coeffs.a0,
    b2: coeffs.b2 / coeffs.a0,
    a1: coeffs.a1 / coeffs.a0,
    a2: coeffs.a2 / coeffs.a0
  };
}

function createMeasurementPlan(sampleRate = SAMPLE_RATE) {
  const {
    amplitude,
    leadInSeconds,
    syncFrequency,
    syncDurationSeconds,
    syncGapSeconds,
    toneDurationSeconds,
    gapDurationSeconds,
    fadeSeconds,
    tailSeconds
  } = MEASUREMENT_SETTINGS;
  const leadInSamples = Math.round(leadInSeconds * sampleRate);
  const syncDurationSamples = Math.round(syncDurationSeconds * sampleRate);
  const syncGapSamples = Math.round(syncGapSeconds * sampleRate);
  const toneDurationSamples = Math.round(toneDurationSeconds * sampleRate);
  const gapDurationSamples = Math.round(gapDurationSeconds * sampleRate);
  const tailSamples = Math.round(tailSeconds * sampleRate);
  const fadeSamples = Math.max(8, Math.round(fadeSeconds * sampleRate));
  const totalSamples =
    leadInSamples +
    syncDurationSamples +
    syncGapSamples +
    DRAW_FREQS.length * (toneDurationSamples + gapDurationSamples) +
    tailSamples;
  const data = new Float32Array(totalSamples);

  const writeTone = (startSample, durationSamples, frequency, toneAmplitude) => {
    for (let index = 0; index < durationSamples && startSample + index < data.length; index += 1) {
      let envelope = 1;
      if (index < fadeSamples) envelope *= index / fadeSamples;
      if (index > durationSamples - fadeSamples) envelope *= (durationSamples - index) / fadeSamples;
      data[startSample + index] += Math.sin((2 * Math.PI * frequency * index) / sampleRate) * toneAmplitude * envelope;
    }
  };

  const syncStartSample = leadInSamples;
  writeTone(syncStartSample, syncDurationSamples, syncFrequency, amplitude * 1.25);

  const measurementStartSample = syncStartSample + syncDurationSamples + syncGapSamples;
  const segments = DRAW_FREQS.map((frequency, index) => {
    const toneStartSample = measurementStartSample + index * (toneDurationSamples + gapDurationSamples);
    writeTone(toneStartSample, toneDurationSamples, frequency, amplitude);
    const analysisStartOffset = Math.round(toneDurationSamples * 0.22);
    const analysisLength = Math.round(toneDurationSamples * 0.56);
    return {
      frequency,
      toneStartSample,
      analysisStartOffset,
      analysisLength,
      referenceMagnitude: 0
    };
  });

  segments.forEach((segment) => {
    const segmentWindow = data.slice(
      segment.toneStartSample + segment.analysisStartOffset,
      segment.toneStartSample + segment.analysisStartOffset + segment.analysisLength
    );
    segment.referenceMagnitude = measureToneMagnitude(segmentWindow, segment.frequency, sampleRate);
  });

  return {
    sampleRate,
    data,
    syncStartSample,
    syncDurationSamples,
    syncGapSamples,
    measurementStartSample,
    toneDurationSamples,
    gapDurationSamples,
    totalSamples,
    durationSeconds: totalSamples / sampleRate,
    segments
  };
}

function flattenChunks(chunks) {
  const totalLength = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
  const merged = new Float32Array(totalLength);
  let offset = 0;
  chunks.forEach((chunk) => {
    merged.set(chunk, offset);
    offset += chunk.length;
  });
  return merged;
}

function measureToneMagnitude(samples, frequency, sampleRate) {
  if (!samples.length) return 0;
  let inPhase = 0;
  let quadrature = 0;
  let weightSum = 0;

  for (let index = 0; index < samples.length; index += 1) {
    const weight = 0.5 - 0.5 * Math.cos((2 * Math.PI * index) / Math.max(samples.length - 1, 1));
    const phase = (2 * Math.PI * frequency * index) / sampleRate;
    const weighted = samples[index] * weight;
    inPhase += weighted * Math.cos(phase);
    quadrature += weighted * Math.sin(phase);
    weightSum += weight * weight;
  }

  return Math.sqrt(inPhase * inPhase + quadrature * quadrature) / Math.max(Math.sqrt(weightSum), 1e-9);
}

function detectSyncPulse(recording, plan) {
  const windowSize = 256;
  const baselineWindows = Math.max(4, Math.floor((plan.syncStartSample * 0.7) / windowSize));
  let baseline = 0;

  for (let index = 0; index < baselineWindows; index += 1) {
    const offset = index * windowSize;
    let sum = 0;
    for (let sample = 0; sample < windowSize && offset + sample < recording.length; sample += 1) {
      const value = recording[offset + sample];
      sum += value * value;
    }
    baseline += Math.sqrt(sum / windowSize);
  }

  baseline = baselineWindows ? baseline / baselineWindows : 0.002;
  const threshold = Math.max(baseline * 5, 0.008);
  const searchLimit = Math.min(recording.length - windowSize, Math.round(plan.sampleRate * 2.5));

  for (let offset = 0; offset < searchLimit; offset += Math.floor(windowSize / 2)) {
    let sum = 0;
    for (let sample = 0; sample < windowSize; sample += 1) {
      const value = recording[offset + sample];
      sum += value * value;
    }
    const rms = Math.sqrt(sum / windowSize);
    if (rms >= threshold) return offset;
  }

  return null;
}

function analyzeMeasurementRecording(recording, plan) {
  const syncStart = detectSyncPulse(recording, plan);
  if (syncStart === null) return null;

  const measurementStart = syncStart + plan.syncDurationSamples + plan.syncGapSamples;
  const curve = plan.segments
    .map((segment, index) => {
      const toneStart = measurementStart + index * (plan.toneDurationSamples + plan.gapDurationSamples);
      const analysisStart = toneStart + segment.analysisStartOffset;
      const analysisEnd = analysisStart + segment.analysisLength;
      if (analysisEnd >= recording.length) return null;
      const window = recording.slice(analysisStart, analysisEnd);
      const magnitude = measureToneMagnitude(window, segment.frequency, plan.sampleRate);
      const ratio = magnitude / Math.max(segment.referenceMagnitude, 1e-9);
      return { freq: segment.frequency, db: 20 * Math.log10(Math.max(ratio, 1e-9)) };
    })
    .filter(Boolean);

  if (curve.length < Math.max(8, Math.floor(plan.segments.length * 0.75))) return null;

  const anchorPoint =
    curve.find((point) => point.freq === 1000) ??
    curve[Math.floor(curve.length / 2)] ??
    { db: 0 };

  return curve.map((point) => ({
    freq: point.freq,
    db: round(point.db - anchorPoint.db, 2)
  }));
}

function updateMeasurementUi() {
  const hasMeasurement = Boolean(state.measuredCurve?.length);
  el.useMeasurement.disabled = !hasMeasurement;
  el.downloadMeasurement.disabled = !hasMeasurement;
  el.clearMeasurement.disabled = !hasMeasurement;
  el.startMeasurement.disabled = state.measurementRunning;
  if (!hasMeasurement) {
    el.measurementSummary.textContent = t("measurement_summary_empty");
    return;
  }

  const low = averageRange(state.measuredCurve, 40, 200);
  const high = averageRange(state.measuredCurve, 2500, 10000);
  el.measurementSummary.textContent = t("measurement_summary_ready", {
    count: state.measuredCurve.length,
    bass: formatSigned(low),
    treble: formatSigned(high)
  });
}

async function runLiveMeasurement() {
  if (state.measurementRunning) return;
  if (!navigator.mediaDevices?.getUserMedia) {
    setStatus(el.measurementStatus, t("measurement_no_api"));
    return;
  }

  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) {
    setStatus(el.measurementStatus, t("measurement_no_audio_context"));
    return;
  }

  state.measurementRunning = true;
  updateMeasurementUi();
  setStatus(el.measurementStatus, t("measurement_requesting"));

  let stream;
  let context;
  let sourceNode;
  let processorNode;
  let monitorGain;
  let playbackNode;

  try {
    stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        channelCount: 1,
        echoCancellation: false,
        noiseSuppression: false,
        autoGainControl: false
      }
    });

    context = new AudioContextClass({ sampleRate: SAMPLE_RATE });
    if (context.state === "suspended") await context.resume();
    const plan = createMeasurementPlan(context.sampleRate);
    state.measurementPlan = plan;
    const chunks = [];

    sourceNode = context.createMediaStreamSource(stream);
    processorNode = context.createScriptProcessor(4096, 1, 1);
    monitorGain = context.createGain();
    monitorGain.gain.value = 0;
    processorNode.onaudioprocess = (event) => {
      if (!state.measurementRunning) return;
      chunks.push(new Float32Array(event.inputBuffer.getChannelData(0)));
    };
    sourceNode.connect(processorNode);
    processorNode.connect(monitorGain);
    monitorGain.connect(context.destination);

    const buffer = context.createBuffer(1, plan.data.length, context.sampleRate);
    buffer.copyToChannel(plan.data, 0);
    playbackNode = context.createBufferSource();
    playbackNode.buffer = buffer;
    playbackNode.connect(context.destination);

    setStatus(el.measurementStatus, t("measurement_running", { seconds: plan.durationSeconds.toFixed(1) }));
    const ended = new Promise((resolve) => {
      playbackNode.onended = resolve;
    });
    playbackNode.start(context.currentTime + 0.12);
    await ended;
    await new Promise((resolve) => window.setTimeout(resolve, 180));

    const recording = flattenChunks(chunks);
    const measuredCurve = analyzeMeasurementRecording(recording, plan);

    if (!measuredCurve) {
      setStatus(el.measurementStatus, t("measurement_sync_failed"));
      return;
    }

    state.measuredCurve = measuredCurve;
    el.curveSource.value = "measurement";
    fitEq();
    setStatus(el.measurementStatus, t("measurement_captured", { count: measuredCurve.length }));
  } catch (error) {
    setStatus(el.measurementStatus, t("measurement_failed", { message: error?.message ?? "unknown error" }));
  } finally {
    state.measurementRunning = false;
    playbackNode?.disconnect();
    processorNode?.disconnect();
    sourceNode?.disconnect();
    monitorGain?.disconnect();
    stream?.getTracks().forEach((track) => track.stop());
    await context?.close?.();
    updateMeasurementUi();
  }
}

function useMeasuredCurve() {
  if (!state.measuredCurve?.length) {
    setStatus(el.measurementStatus, t("measurement_run_first"));
    return;
  }
  el.curveSource.value = "measurement";
  fitEq();
  setStatus(el.measurementStatus, t("measurement_selected_active"));
}

function clearMeasuredCurve() {
  state.measuredCurve = null;
  if (el.curveSource.value === "measurement") {
    el.curveSource.value = state.uploadedCurve ? "upload" : DEFAULT_CURVE_SOURCE;
  }
  updateMeasurementUi();
  fitEq();
  setStatus(el.measurementStatus, t("measurement_cleared"));
}

function downloadMeasuredCurve() {
  if (!state.measuredCurve?.length) {
    setStatus(el.measurementStatus, t("measurement_run_first"));
    return;
  }
  const csv = ["frequency,db", ...state.measuredCurve.map((point) => `${point.freq},${point.db}`)].join("\n");
  downloadTextFile("live-measurement-curve.csv", csv, "text/csv");
  setStatus(el.measurementStatus, t("measurement_downloaded"));
}

function renderGraphicOutput(bandGains) {
  el.graphicOutput.innerHTML = "";
  bandGains.forEach((gain, index) => {
    const row = document.createElement("div");
    const band = document.createElement("span");
    const value = document.createElement("span");
    band.textContent = `${GRAPHIC_BANDS[index]} Hz`;
    value.textContent = formatSigned(gain);
    value.className = gain >= 0 ? "boost" : "cut";
    row.append(band, value);
    el.graphicOutput.append(row);
  });
}

function renderParametricOutput(filters) {
  el.parametricOutput.innerHTML = "";
  filters.forEach((filter, index) => {
    const row = document.createElement("div");
    const left = document.createElement("div");
    const label = document.createElement("strong");
    const meta = document.createElement("small");
    const value = document.createElement("span");

    label.textContent = `F${index + 1} ${t(filter.labelKey)}`;
    meta.textContent = `${filter.type} | ${filter.frequency} Hz | ${filter.type === "PK" ? "Q" : "Q/S"} ${filter.q.toFixed(2)}`;
    value.textContent = formatSigned(filter.gain);
    value.className = filter.gain >= 0 ? "boost" : "cut";

    left.append(label, meta);
    row.append(left, value);
    el.parametricOutput.append(row);
  });
}

function renderHybridNotes(notes) {
  el.hybridOutput.innerHTML = "";
  notes.forEach((note) => {
    const paragraph = document.createElement("p");
    paragraph.textContent = note;
    el.hybridOutput.append(paragraph);
  });
}

function buildParametricText(filters) {
  return filters
    .map(
      (filter, index) =>
        `Filter ${index + 1}: ON ${filter.type} Fc ${filter.frequency} Hz Gain ${formatSigned(filter.gain)} ${filter.type === "PK" ? "Q" : "Q/S"} ${filter.q.toFixed(2)}`
    )
    .join("\n");
}

function getCurrentConfig() {
  return {
    language: state.language,
    mode: state.mode,
    curveSource: el.curveSource.value,
    measuredCurve: state.measuredCurve
      ? state.measuredCurve.map((point) => [point.freq, round(point.db, 2)])
      : null,
    uploadedCurve:
      el.curveSource.value === "upload" && state.uploadedCurve
        ? state.uploadedCurve.map((point) => [point.freq, round(point.db)])
        : null,
    carStyle: el.carStyle.value,
    vehicleClass: el.vehicleClass.value,
    seatFocus: el.seatFocus.value,
    noiseLevel: el.noiseLevel.value,
    airiness: el.airiness.value,
    playerA: el.playerA.value,
    playerB: el.playerB.value,
    matchFocus: el.matchFocus.value,
    eqTopology: el.eqTopology.value,
    maxBoost: el.maxBoost.value
  };
}

function buildExportPayload() {
  return {
    version: 1,
    mode: state.mode,
    measuredSource: el.curveSource.value,
    output: {
      graphicEq: GRAPHIC_BANDS.map((frequency, index) => ({ frequency, gain: state.graphicGains[index] })),
      parametricEq: state.parametricFilters
    },
    config: getCurrentConfig()
  };
}

function buildGraphicSummaryText() {
  return GRAPHIC_BANDS.map((frequency, index) => `${frequency} Hz: ${formatSigned(state.graphicGains[index])}`).join("\n");
}

function buildEqualizerApoText() {
  const maxParametricGain = state.parametricFilters.reduce(
    (maxValue, filter) => Math.max(maxValue, filter.gain),
    0
  );
  const preamp = Math.max(0, round(maxParametricGain + 0.5));
  const filterLines = state.parametricFilters.map((filter) => {
    const shape = filter.type === "PK" ? "Q" : "Q";
    return `Filter: ON ${filter.type} Fc ${filter.frequency} Hz Gain ${formatSigned(filter.gain)} ${shape} ${filter.q.toFixed(2)}`;
  });
  return [`Preamp: -${preamp.toFixed(1)} dB`, ...filterLines].join("\n");
}

function buildCurrentExportText() {
  switch (el.exportFormat.value) {
    case "equalizer-apo":
      return buildEqualizerApoText();
    case "graphic-summary":
      return buildGraphicSummaryText();
    case "session-json":
      return JSON.stringify(buildExportPayload(), null, 2);
    case "generic-parametric":
    default:
      return buildParametricText(state.parametricFilters);
  }
}

function renderExportOutput() {
  el.exportOutput.value = buildCurrentExportText();
}

function mapFreq(freq, width, padding) {
  const start = Math.log10(20);
  const end = Math.log10(20000);
  return padding.left + ((Math.log10(freq) - start) / (end - start)) * (width - padding.left - padding.right);
}

function mapDb(db, minDb, maxDb, height, padding) {
  return height - padding.bottom - ((db - minDb) / (maxDb - minDb)) * (height - padding.top - padding.bottom);
}

function drawCurve(ctx, curve, color, width, height, padding, minDb, maxDb) {
  ctx.beginPath();
  curve.forEach((point, index) => {
    const x = mapFreq(point.freq, width, padding);
    const y = mapDb(point.db, minDb, maxDb, height, padding);
    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.lineWidth = 3;
  ctx.strokeStyle = color;
  ctx.stroke();
}

function drawChart(measuredCurve, targetCurve, correctedCurve) {
  const ctx = el.chart.getContext("2d");
  const width = el.chart.width;
  const height = el.chart.height;
  const padding = { top: 26, right: 28, bottom: 42, left: 56 };
  const minDb = -10;
  const maxDb = 6;

  ctx.clearRect(0, 0, width, height);
  ctx.strokeStyle = "rgba(255,255,255,0.08)";
  ctx.lineWidth = 1;

  for (let db = minDb; db <= maxDb; db += 2) {
    const y = mapDb(db, minDb, maxDb, height, padding);
    ctx.beginPath();
    ctx.moveTo(padding.left, y);
    ctx.lineTo(width - padding.right, y);
    ctx.stroke();
    ctx.fillStyle = "rgba(238,244,255,0.5)";
    ctx.font = '12px "IBM Plex Mono"';
    ctx.fillText(`${db} dB`, 10, y + 4);
  }

  DRAW_FREQS.forEach((freq) => {
    const x = mapFreq(freq, width, padding);
    ctx.beginPath();
    ctx.moveTo(x, padding.top);
    ctx.lineTo(x, height - padding.bottom);
    ctx.stroke();
    ctx.fillStyle = "rgba(238,244,255,0.45)";
    ctx.font = '11px "IBM Plex Mono"';
    ctx.fillText(freq >= 1000 ? `${freq / 1000}k` : `${freq}`, x - 12, height - 16);
  });

  drawCurve(ctx, measuredCurve, "#ff9d6c", width, height, padding, minDb, maxDb);
  drawCurve(ctx, targetCurve, "#7de2d1", width, height, padding, minDb, maxDb);
  drawCurve(ctx, correctedCurve, "#8aa7ff", width, height, padding, minDb, maxDb);
}

function updateChartLegend() {
  let measuredLabelKey = "chart_measured";
  if (state.mode === "player") {
    measuredLabelKey = "chart_player_a";
  } else if (
    (el.curveSource.value === "measurement" && !state.measuredCurve?.length) ||
    (el.curveSource.value === "upload" && !state.uploadedCurve?.length)
  ) {
    measuredLabelKey = "chart_no_measured_data";
  }

  el.chartMeasuredLabel.textContent = t(measuredLabelKey);
  el.chartTargetLabel.textContent = t("chart_target");
  el.chartCorrectedLabel.textContent = t("chart_corrected");
}

function computeCorrectedCurve(measuredCurve, bandGains) {
  return measuredCurve.map((point) => {
    const correction = averageWeighted(
      GRAPHIC_BANDS.map((freq, index) => ({ freq, db: bandGains[index] })),
      point.freq,
      0.16
    );
    return { freq: point.freq, db: point.db + correction };
  });
}

function computeCorrectedCurveFromFilters(measuredCurve, filters) {
  return measuredCurve.map((point) => ({
    freq: point.freq,
    db: point.db + filters.reduce((sum, filter) => sum + biquadMagnitudeDb(filter, point.freq), 0)
  }));
}

function updateStats(measuredCurve, targetCurve) {
  const deltas = DRAW_FREQS.map((freq) => interpolateCurve(targetCurve, freq) - interpolateCurve(measuredCurve, freq));
  const avg = deltas.reduce((sum, value) => sum + Math.abs(value), 0) / deltas.length;
  const treble = averageRange(targetCurve, 2500, 10000) - averageRange(measuredCurve, 2500, 10000);
  const bass = averageRange(targetCurve, 40, 200) - averageRange(measuredCurve, 40, 200);

  el.avgDelta.textContent = `${avg.toFixed(1)} dB`;
  el.trebleDelta.textContent = formatSigned(treble);
  el.bassDelta.textContent = formatSigned(bass);
  el.heroDelta.textContent = `+/-${avg.toFixed(1)} dB`;
}

function updateOutputVisibility() {
  const topology = el.eqTopology.value;
  const showAll = topology === "all";
  el.graphicSection.classList.toggle("hidden", !(showAll || topology === "graphic10"));
  el.parametricSection.classList.toggle("hidden", !(showAll || topology === "parametric"));
  el.hybridSection.classList.toggle("hidden", !(showAll || topology === "hybrid"));
}

function createSuggestedPresetName() {
  if (state.mode === "car") {
    return `${el.vehicleClass.value}-${el.carStyle.value}-${el.noiseLevel.value}`;
  }
  return `${el.playerA.value}-to-${el.playerB.value}`;
}

function applyConfig(config, options = {}) {
  const { refit = true } = options;
  if (!config) return;

  state.language = config.language ?? state.language;
  state.mode = config.mode ?? state.mode;
  el.curveSource.value = config.curveSource ?? el.curveSource.value;
  if ("measuredCurve" in config) {
    state.measuredCurve = Array.isArray(config.measuredCurve)
      ? config.measuredCurve.map(([freq, db]) => ({ freq, db }))
      : null;
  }
  state.uploadedCurve = Array.isArray(config.uploadedCurve)
    ? config.uploadedCurve.map(([freq, db]) => ({ freq, db }))
    : null;

  el.carStyle.value = config.carStyle ?? el.carStyle.value;
  el.vehicleClass.value = config.vehicleClass ?? el.vehicleClass.value;
  el.seatFocus.value = config.seatFocus ?? el.seatFocus.value;
  el.noiseLevel.value = config.noiseLevel ?? el.noiseLevel.value;
  el.airiness.value = config.airiness ?? el.airiness.value;
  el.playerA.value = config.playerA ?? el.playerA.value;
  el.playerB.value = config.playerB ?? el.playerB.value;
  el.matchFocus.value = config.matchFocus ?? el.matchFocus.value;
  el.eqTopology.value = config.eqTopology ?? el.eqTopology.value;
  el.maxBoost.value = config.maxBoost ?? el.maxBoost.value;

  el.airinessReadout.textContent = Number(el.airiness.value).toFixed(1);
  el.maxBoostReadout.textContent = Number(el.maxBoost.value).toFixed(1);
  el.uploadWrap.classList.toggle("hidden", el.curveSource.value !== "upload");
  applyI18n();
  updateMeasurementUi();

  el.modeButtons.forEach((button) => {
    const active = button.dataset.mode === state.mode;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", String(active));
  });
  el.modePanels.forEach((panel) => panel.classList.toggle("hidden", panel.dataset.modePanel !== state.mode));

  if (refit) fitEq();
}

function readStoredPresets() {
  try {
    const raw = localStorage.getItem(PRESET_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeStoredPresets(presets) {
  try {
    localStorage.setItem(PRESET_STORAGE_KEY, JSON.stringify(presets));
  } catch {
    setStatus(el.presetStatus, t("preset_storage_blocked"));
  }
}

function persistSession() {
  try {
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(getCurrentConfig()));
  } catch {
    return;
  }
}

function loadSession() {
  try {
    const raw = localStorage.getItem(SESSION_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function populatePresetSelect(selectedId = "") {
  state.presets = readStoredPresets();
  el.savedPresets.innerHTML = "";

  if (!state.presets.length) {
    const option = document.createElement("option");
    option.value = "";
    option.textContent = t("no_saved_presets");
    el.savedPresets.append(option);
    return;
  }

  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = t("choose_saved_preset");
  el.savedPresets.append(placeholder);

  state.presets
    .slice()
    .sort((left, right) => right.updatedAt - left.updatedAt)
    .forEach((preset) => {
      const option = document.createElement("option");
      option.value = preset.id;
      option.textContent = preset.name;
      if (preset.id === selectedId) option.selected = true;
      el.savedPresets.append(option);
    });
}

function savePreset() {
  const name = (el.presetName.value || createSuggestedPresetName()).trim();
  const presets = readStoredPresets();
  const existing = presets.find(
    (preset) => preset.id === el.savedPresets.value || preset.name.toLowerCase() === name.toLowerCase()
  );

  const payload = {
    id: existing?.id ?? `preset-${Date.now()}`,
    name,
    updatedAt: Date.now(),
    config: getCurrentConfig()
  };

  const nextPresets = existing
    ? presets.map((preset) => (preset.id === payload.id ? payload : preset))
    : [payload, ...presets];

  writeStoredPresets(nextPresets);
  populatePresetSelect(payload.id);
  el.presetName.value = payload.name;
  setStatus(el.presetStatus, t("preset_saved", { name: payload.name }));
}

function loadSelectedPreset() {
  const preset = state.presets.find((item) => item.id === el.savedPresets.value);
  if (!preset) {
    setStatus(el.presetStatus, t("preset_choose_first"));
    return;
  }

  el.presetName.value = preset.name;
  applyConfig(preset.config);
  setStatus(el.presetStatus, t("preset_loaded", { name: preset.name }));
}

function deleteSelectedPreset() {
  const selectedId = el.savedPresets.value;
  if (!selectedId) {
    setStatus(el.presetStatus, t("preset_choose_first"));
    return;
  }

  const target = state.presets.find((item) => item.id === selectedId);
  const nextPresets = state.presets.filter((item) => item.id !== selectedId);
  writeStoredPresets(nextPresets);
  populatePresetSelect();
  setStatus(el.presetStatus, target ? t("preset_deleted", { name: target.name }) : t("preset_deleted_generic"));
}

function sanitizeFilename(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "preset";
}

function downloadTextFile(filename, content, mimeType = "application/json") {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

function downloadCurrentPresetFile() {
  const name = (el.presetName.value || createSuggestedPresetName()).trim();
  const payload = {
    schema: "trace-preset/v1",
    exportedAt: new Date().toISOString(),
    preset: {
      id: `preset-${Date.now()}`,
      name,
      updatedAt: Date.now(),
      config: getCurrentConfig()
    }
  };
  downloadTextFile(`${sanitizeFilename(name)}.json`, JSON.stringify(payload, null, 2));
  setStatus(el.presetStatus, t("preset_file_downloaded", { name }));
}

function normalizeImportedPresets(parsed) {
  if (Array.isArray(parsed)) return parsed;
  if (parsed?.preset) return [parsed.preset];
  if (Array.isArray(parsed?.presets)) return parsed.presets;
  return [];
}

async function importPresetFile(file) {
  try {
    const parsed = JSON.parse(await file.text());
    const imported = normalizeImportedPresets(parsed)
      .filter((preset) => preset?.name && preset?.config)
      .map((preset, index) => ({
        id: preset.id ?? `preset-import-${Date.now()}-${index}`,
        name: String(preset.name),
        updatedAt: preset.updatedAt ?? Date.now(),
        config: preset.config
      }));

    if (!imported.length) {
      setStatus(el.presetStatus, t("preset_import_none"));
      return;
    }

    const existing = readStoredPresets();
    const mergedByName = new Map(
      existing.map((preset) => [preset.name.toLowerCase(), preset])
    );
    imported.forEach((preset) => {
      mergedByName.set(preset.name.toLowerCase(), preset);
    });

    const merged = [...mergedByName.values()];
    writeStoredPresets(merged);
    populatePresetSelect(imported[0].id);
    el.presetName.value = imported[0].name;
    applyConfig(imported[0].config);
    setStatus(
      el.presetStatus,
      imported.length === 1
        ? t("preset_import_single", { name: imported[0].name })
        : t("preset_import_multi", { count: imported.length })
    );
  } catch {
    setStatus(el.presetStatus, t("preset_import_failed"));
  }
}

function toBase64Url(value) {
  const json = JSON.stringify(value);
  const bytes = new TextEncoder().encode(json);
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function fromBase64Url(value) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padding = "=".repeat((4 - (normalized.length % 4 || 4)) % 4);
  const binary = atob(normalized + padding);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return JSON.parse(new TextDecoder().decode(bytes));
}

function buildShareLink() {
  const payload = { v: 1, c: getCurrentConfig() };
  const url = new URL(window.location.href);
  url.searchParams.set(SHARE_QUERY_KEY, toBase64Url(payload));
  return url.toString();
}

function generateShareLink() {
  const url = buildShareLink();
  el.shareLink.value = url;
  setStatus(
    el.shareStatus,
    url.length > 6000
      ? t("share_generated_long", { count: url.length })
      : t("share_generated", { count: url.length })
  );
}

async function copyText(text, statusElement, successMessage) {
  try {
    await navigator.clipboard.writeText(text);
    setStatus(statusElement, successMessage);
  } catch {
    setStatus(statusElement, t("clipboard_failed"));
  }
}

function mapShareStateFromUrl() {
  try {
    const params = new URLSearchParams(window.location.search);
    const encoded = params.get(SHARE_QUERY_KEY);
    if (!encoded) return null;
    const payload = fromBase64Url(encoded);
    return payload?.c ?? null;
  } catch {
    setStatus(el.shareStatus, t("shared_link_invalid"));
    return null;
  }
}

function fitEq() {
  const measuredCurve = smoothCurve(getMeasuredCurve());
  const targetCurve = smoothCurve(state.mode === "car" ? buildCarTarget() : buildPlayerTarget());
  const bandGains = computeBandGains(measuredCurve, targetCurve, Number(el.maxBoost.value));

  state.graphicGains = bandGains;
  state.parametricFilters = buildParametricFilters(
    measuredCurve,
    targetCurve,
    Number(el.maxBoost.value)
  );
  const correctedCurve =
    el.eqTopology.value === "graphic10" || el.eqTopology.value === "hybrid"
      ? computeCorrectedCurve(measuredCurve, bandGains)
      : computeCorrectedCurveFromFilters(measuredCurve, state.parametricFilters);
  renderGraphicOutput(bandGains);
  renderParametricOutput(state.parametricFilters);
  renderHybridNotes(buildHybridNotes(bandGains));
  renderExportOutput();
  drawChart(measuredCurve, targetCurve, correctedCurve);
  updateChartLegend();
  updateStats(measuredCurve, targetCurve);
  updateOutputVisibility();
  updatePreviewFilters();
  persistSession();
}

function setMode(mode) {
  applyConfig({ ...getCurrentConfig(), mode });
}

async function parseUploadedCurve(file) {
  const text = await file.text();
  const curve = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => line.split(/[,;\t]/).slice(0, 2).map((item) => Number(item.trim())))
    .filter(([freq, db]) => Number.isFinite(freq) && Number.isFinite(db))
    .sort((a, b) => a[0] - b[0])
    .map(([freq, db]) => ({ freq, db }));

  state.uploadedCurve = curve.length >= 4 ? curve : null;
  if (!state.uploadedCurve) {
    setStatus(el.measurementStatus, t("upload_curve_invalid"));
  }
  fitEq();
}

async function setupPreview() {
  if (!state.audioContext) {
    state.audioContext = new AudioContext();
    state.audioSource = state.audioContext.createMediaElementSource(el.previewAudio);
    state.previewWetInput = state.audioContext.createGain();
    state.previewDryGain = state.audioContext.createGain();
    state.previewWetGain = state.audioContext.createGain();

    state.audioSource.connect(state.previewDryGain);
    state.previewDryGain.connect(state.audioContext.destination);

    state.audioSource.connect(state.previewWetInput);
    state.previewWetGain.connect(state.audioContext.destination);
  }

  if (state.audioContext.state === "suspended") await state.audioContext.resume();
  updatePreviewFilters();
  setPreviewMode(state.previewMode, true);
}

function updatePreviewFilters() {
  if (!state.previewWetInput || !state.previewWetGain || !state.audioContext) return;

  state.previewWetInput.disconnect();
  state.audioFilters.forEach((filter) => filter.disconnect());

  const topology = el.eqTopology.value;
  const useGraphic = topology === "graphic10" || topology === "hybrid";
  const filters = useGraphic
    ? GRAPHIC_BANDS.map((frequency, index) => ({
        type: "PK",
        frequency,
        q: frequency < 100 ? 0.8 : frequency < 1000 ? 1.1 : 1.3,
        gain: state.graphicGains[index]
      }))
    : state.parametricFilters;

  state.audioFilters = filters.map((filterConfig) => {
    const filter = state.audioContext.createBiquadFilter();
    filter.type =
      filterConfig.type === "LS" ? "lowshelf" : filterConfig.type === "HS" ? "highshelf" : "peaking";
    filter.frequency.value = filterConfig.frequency;
    filter.Q.value = filterConfig.q;
    filter.gain.value = filterConfig.gain;
    return filter;
  });

  let current = state.previewWetInput;
  state.audioFilters.forEach((filter) => {
    current.connect(filter);
    current = filter;
  });
  current.connect(state.previewWetGain);
}

function setPreviewMode(mode, immediate = false) {
  state.previewMode = mode;
  el.previewOriginal.classList.toggle("active", mode === "original");
  el.previewEq.classList.toggle("active", mode === "eq");
  if (!state.previewDryGain || !state.previewWetGain || !state.audioContext) return;

  const now = state.audioContext.currentTime;
  const fade = immediate ? 0 : 0.04;
  const dryTarget = mode === "original" ? 1 : 0;
  const wetTarget = mode === "eq" ? 1 : 0;

  [state.previewDryGain, state.previewWetGain].forEach((gainNode) => {
    gainNode.gain.cancelScheduledValues(now);
    gainNode.gain.setValueAtTime(gainNode.gain.value, now);
  });

  state.previewDryGain.gain.linearRampToValueAtTime(dryTarget, now + fade);
  state.previewWetGain.gain.linearRampToValueAtTime(wetTarget, now + fade);
}

function setPreviewSourceFromUrl(url, statusMessage) {
  el.previewAudio.src = url;
  el.previewOriginal.disabled = false;
  el.previewEq.disabled = false;
  setStatus(el.exportStatus, statusMessage);
}

function bindEvents() {
  const scrollTrigger = document.querySelector("[data-scroll-target]");
  if (scrollTrigger) {
    scrollTrigger.addEventListener("click", (event) => {
      const target = document.querySelector(event.currentTarget.dataset.scrollTarget);
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  el.modeButtons.forEach((button) => button.addEventListener("click", () => setMode(button.dataset.mode)));

  el.curveSource.addEventListener("change", () => {
    if (el.curveSource.value === "measurement" && !state.measuredCurve?.length) {
      setStatus(el.measurementStatus, t("measurement_selected"));
    }
    el.uploadWrap.classList.toggle("hidden", el.curveSource.value !== "upload");
    fitEq();
  });

  el.curveUpload.addEventListener("change", (event) => {
    const [file] = event.target.files ?? [];
    if (file) parseUploadedCurve(file);
  });

  el.startMeasurement.addEventListener("click", runLiveMeasurement);
  el.useMeasurement.addEventListener("click", useMeasuredCurve);
  el.clearMeasurement.addEventListener("click", clearMeasuredCurve);
  el.downloadMeasurement.addEventListener("click", downloadMeasuredCurve);

  [el.carStyle, el.vehicleClass, el.seatFocus, el.noiseLevel, el.playerA, el.playerB, el.matchFocus, el.eqTopology, el.exportFormat].forEach((control) => {
    control.addEventListener("change", fitEq);
  });

  el.airiness.addEventListener("input", () => {
    el.airinessReadout.textContent = Number(el.airiness.value).toFixed(1);
    fitEq();
  });

  el.maxBoost.addEventListener("input", () => {
    el.maxBoostReadout.textContent = Number(el.maxBoost.value).toFixed(1);
    fitEq();
  });

  el.fitButton.addEventListener("click", fitEq);
  el.savePreset.addEventListener("click", savePreset);
  el.loadPreset.addEventListener("click", loadSelectedPreset);
  el.deletePreset.addEventListener("click", deleteSelectedPreset);
  el.downloadPreset.addEventListener("click", downloadCurrentPresetFile);
  el.importPresetTrigger.addEventListener("click", () => el.presetImport.click());
  el.presetImport.addEventListener("change", async (event) => {
    const [file] = event.target.files ?? [];
    if (file) await importPresetFile(file);
    event.target.value = "";
  });
  el.generateLink.addEventListener("click", generateShareLink);
  el.copyLink.addEventListener("click", async () => {
    if (!el.shareLink.value) generateShareLink();
    await copyText(el.shareLink.value, el.shareStatus, t("share_copied"));
  });

  el.copyJson.addEventListener("click", async () => {
    await copyText(
      JSON.stringify(getCurrentConfig(), null, 2),
      el.presetStatus,
      t("state_json_copied")
    );
  });

  el.copyParametric.addEventListener("click", async () => {
    await copyText(
      buildCurrentExportText(),
      el.exportStatus,
      t("export_copied")
    );
  });

  el.copyExportJson.addEventListener("click", async () => {
    await copyText(
      JSON.stringify(buildExportPayload(), null, 2),
      el.exportStatus,
      t("export_json_copied")
    );
  });

  el.languageSelect.addEventListener("change", () => {
    state.language = el.languageSelect.value;
    localStorage.setItem(LANGUAGE_STORAGE_KEY, state.language);
    applyI18n();
    populatePresetSelect(el.savedPresets.value);
    updateMeasurementUi();
    fitEq();
  });

  el.audioUpload.addEventListener("change", async (event) => {
    const [file] = event.target.files ?? [];
    if (!file) return;
    if (state.audioObjectUrl) URL.revokeObjectURL(state.audioObjectUrl);
    state.audioObjectUrl = URL.createObjectURL(file);
    await setupPreview();
    setPreviewSourceFromUrl(state.audioObjectUrl, t("preview_file_ready"));
    updatePreviewFilters();
  });

  el.loadDemoAudio.addEventListener("click", async () => {
    await setupPreview();
    const demoFile = el.demoAudioSelect.value || DEMO_AUDIO_FILES[0].value;
    setPreviewSourceFromUrl(`./demo_audio/${encodeURIComponent(demoFile)}`, t("preview_demo_ready"));
    updatePreviewFilters();
  });

  el.previewOriginal.addEventListener("click", async () => {
    await setupPreview();
    setPreviewMode("original");
  });

  el.previewEq.addEventListener("click", async () => {
    await setupPreview();
    setPreviewMode("eq");
  });
}

function init() {
  state.language = localStorage.getItem(LANGUAGE_STORAGE_KEY) || "zh-CN";
  applyI18n();
  populatePresetSelect();
  bindEvents();
  updateMeasurementUi();

  const sharedConfig = mapShareStateFromUrl();
  const sessionConfig = loadSession();
  const initialConfig = sharedConfig ?? sessionConfig;

  if (initialConfig) {
    applyConfig(initialConfig);
    if (sharedConfig) {
      generateShareLink();
      setStatus(el.shareStatus, t("shared_loaded"));
    } else {
      setStatus(el.presetStatus, t("session_restored"));
    }
  } else {
    el.airinessReadout.textContent = Number(el.airiness.value).toFixed(1);
    el.maxBoostReadout.textContent = Number(el.maxBoost.value).toFixed(1);
    fitEq();
  }

  if (!el.presetName.value) {
    el.presetName.value = createSuggestedPresetName();
  }
}

init();
