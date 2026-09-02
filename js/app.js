(function () {
  "use strict";

  // ==================================================================
  // CONFIG / CONSTANTS
  // ==================================================================
  const LS_SESSION = "animakids-session";
  const LS_STATE = "animakids-state";
  const LS_SYNC = "animakids-sync-config";
  const LS_ROSTER = "animakids-roster-cache";
  const DATA_FILE_PATH = "animakids-state.json";
  const ROSTER_FILE_PATH = "roster.json";
  const PASSWORD = "gmna27";

  const ATHLETES = ANIMAKIDS_DATA.athletes;
  const OBJECTIVES = ANIMAKIDS_DATA.objectives;
  const PERIODS = ANIMAKIDS_DATA.periods;
  const PHASES = ANIMAKIDS_DATA.phases;

  // ------------------------------------------------------------------
  // ROSTER (real names) — kept OUT of the public data.js on purpose.
  // ATHLETES only contains anonymous codes (A01, A02, ...), safe for a
  // public repo. Real names live only in this browser's localStorage
  // and, optionally, in a PRIVATE GitHub repo (roster.json), fetched
  // with the same token used for state sync. Never written to the
  // public repo.
  // ------------------------------------------------------------------
  function loadRosterCache() {
    try { return JSON.parse(localStorage.getItem(LS_ROSTER) || "{}"); } catch (e) { return {}; }
  }
  function saveRosterCache(roster) {
    localStorage.setItem(LS_ROSTER, JSON.stringify(roster));
  }
  let ROSTER = loadRosterCache();

  function displayName(code) {
    if (ROSTER[code]) return ROSTER[code];
    const n = parseInt(String(code).replace(/^A0*/, ""), 10);
    return "Atleta " + (isNaN(n) ? code : n);
  }

  const CAT_CLASS = {
    "Mini-Trampolim": "cat-mini-trampolim",
    "Plinto (Reuter)": "cat-plinto-reuter",
    "Solo": "cat-solo",
    "Tumbling": "cat-tumbling",
    "Acrobática": "cat-acrobática",
  };

  const MONTHS_PT = ["janeiro", "fevereiro", "março", "abril", "maio", "junho",
    "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
  const WEEKDAYS_PT = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];

  function fmtDateLong(iso) {
    const d = new Date(iso + "T00:00:00");
    return `${WEEKDAYS_PT[d.getDay()]}, ${d.getDate()} ${MONTHS_PT[d.getMonth()]}`;
  }
  function fmtDateShort(iso) {
    const d = new Date(iso + "T00:00:00");
    return `${d.getDate()} ${MONTHS_PT[d.getMonth()].slice(0, 3)}`;
  }

  // ==================================================================
  // simple checksum (NOT real security — same pattern used across
  // our other client-only apps: djb2-style hash, just obfuscation)
  // ==================================================================
  function simpleHash(str) {
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
      hash = (hash * 33) ^ str.charCodeAt(i);
    }
    return String(hash >>> 0);
  }
  const PASSWORD_HASH = simpleHash(PASSWORD);

  // ==================================================================
  // STATE
  // ==================================================================
  function defaultState() {
    return {
      groups: {},
      progress: {},
      attendance: {},
      completed: {},
      updatedAt: new Date(0).toISOString(),
    };
  }

  let STATE = loadState();

  function loadState() {
    try {
      const raw = localStorage.getItem(LS_STATE);
      if (!raw) return defaultState();
      const parsed = JSON.parse(raw);
      return Object.assign(defaultState(), parsed);
    } catch (e) {
      return defaultState();
    }
  }

  function saveStateLocal() {
    localStorage.setItem(LS_STATE, JSON.stringify(STATE));
  }

  let pushTimer = null;
  function touchAndSave() {
    STATE.updatedAt = new Date().toISOString();
    saveStateLocal();
    schedulePush();
  }

  function getProgress(athlete, objId) {
    return (STATE.progress[athlete] && STATE.progress[athlete][objId]) || 0;
  }
  function setProgress(athlete, objId, level) {
    level = Math.max(0, Math.min(5, level));
    if (!STATE.progress[athlete]) STATE.progress[athlete] = {};
    STATE.progress[athlete][objId] = level;
    touchAndSave();
  }
  function getGroup(athlete) {
    return STATE.groups[athlete] || null;
  }
  function setGroup(athlete, g) {
    STATE.groups[athlete] = (STATE.groups[athlete] === g) ? null : g;
    touchAndSave();
  }
  function getAttendance(periodId, dateIso, athlete) {
    return STATE.attendance[periodId] &&
      STATE.attendance[periodId][dateIso] &&
      STATE.attendance[periodId][dateIso][athlete] || null;
  }
  function setAttendance(periodId, dateIso, athlete, val) {
    if (!STATE.attendance[periodId]) STATE.attendance[periodId] = {};
    if (!STATE.attendance[periodId][dateIso]) STATE.attendance[periodId][dateIso] = {};
    const current = STATE.attendance[periodId][dateIso][athlete];
    STATE.attendance[periodId][dateIso][athlete] = (current === val) ? null : val;
    touchAndSave();
  }
  function getCompleted(periodId, dateIso) {
    return !!(STATE.completed[periodId] && STATE.completed[periodId][dateIso]);
  }
  function setCompleted(periodId, dateIso, val) {
    if (!STATE.completed[periodId]) STATE.completed[periodId] = {};
    STATE.completed[periodId][dateIso] = !!val;
    touchAndSave();
  }

  // ==================================================================
  // TOAST
  // ==================================================================
  function toast(msg) {
    const host = document.getElementById("toastHost");
    const el = document.createElement("div");
    el.className = "toast-msg";
    el.textContent = msg;
    host.appendChild(el);
    requestAnimationFrame(() => el.classList.add("show"));
    setTimeout(() => {
      el.classList.remove("show");
      setTimeout(() => el.remove(), 300);
    }, 2200);
  }

  // ==================================================================
  // AUTH
  // ==================================================================
  const loginScreen = document.getElementById("loginScreen");
  const appShell = document.getElementById("appShell");
  const loginForm = document.getElementById("loginForm");
  const loginPassword = document.getElementById("loginPassword");
  const loginError = document.getElementById("loginError");

  function isLoggedIn() {
    return sessionStorageSafe().getItem(LS_SESSION) === "1" ||
      localStorage.getItem(LS_SESSION) === "1";
  }
  function sessionStorageSafe() {
    try { return window.sessionStorage; } catch (e) { return { getItem: () => null, setItem: () => {} }; }
  }

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const val = loginPassword.value;
    if (simpleHash(val) === PASSWORD_HASH) {
      localStorage.setItem(LS_SESSION, "1");
      loginError.hidden = true;
      loginForm.reset();
      showApp();
    } else {
      loginError.hidden = false;
    }
  });

  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem(LS_SESSION);
    closeModal();
    location.reload();
  });

  function showApp() {
    loginScreen.hidden = true;
    appShell.hidden = false;
    boot();
  }

  // ==================================================================
  // GITHUB SYNC
  // ==================================================================
  function loadSyncConfig() {
    try {
      return JSON.parse(localStorage.getItem(LS_SYNC) || "null");
    } catch (e) { return null; }
  }
  function saveSyncConfig(cfg) {
    localStorage.setItem(LS_SYNC, JSON.stringify(cfg));
  }
  function clearSyncConfig() {
    localStorage.removeItem(LS_SYNC);
  }

  let syncStatus = "off"; // off | syncing | synced | error
  const syncStatusBtn = document.getElementById("syncStatusBtn");
  const syncStatusIcon = document.getElementById("syncStatusIcon");
  const syncStatusText = document.getElementById("syncStatusText");

  function setSyncStatus(status) {
    syncStatus = status;
    syncStatusBtn.classList.remove("synced", "syncing", "error");
    if (status === "off") {
      syncStatusIcon.className = "bi bi-cloud-slash";
      syncStatusText.textContent = "Local";
      syncStatusBtn.title = "Toca para configurar a sincronização";
    } else if (status === "syncing") {
      syncStatusBtn.classList.add("syncing");
      syncStatusIcon.className = "bi bi-arrow-repeat";
      syncStatusText.textContent = "A sincronizar…";
      syncStatusBtn.title = "A sincronizar…";
    } else if (status === "synced") {
      syncStatusBtn.classList.add("synced");
      syncStatusIcon.className = "bi bi-cloud-check";
      syncStatusText.textContent = "Sincronizado";
      syncStatusBtn.title = "Toca para sincronizar agora";
    } else if (status === "error") {
      syncStatusBtn.classList.add("error");
      syncStatusIcon.className = "bi bi-exclamation-triangle";
      syncStatusText.textContent = "Erro";
      syncStatusBtn.title = "Falhou — toca para tentar novamente";
    }
    renderSyncStatusBlock();
  }

  async function githubRequest(method, cfg, path, body, sha) {
    const url = `https://api.github.com/repos/${cfg.repo}/contents/${path}?ref=${encodeURIComponent(cfg.branch || "main")}`;
    const headers = {
      "Accept": "application/vnd.github+json",
      "Authorization": `Bearer ${cfg.token}`,
    };
    if (method === "GET") {
      const res = await fetch(url, { headers });
      return res;
    }
    headers["Content-Type"] = "application/json";
    const payload = {
      message: "AnimaKids: atualizar " + path + " (" + new Date().toISOString() + ")",
      content: btoa(unescape(encodeURIComponent(JSON.stringify(body, null, 2)))),
      branch: cfg.branch || "main",
    };
    if (sha) payload.sha = sha;
    const res = await fetch(
      `https://api.github.com/repos/${cfg.repo}/contents/${path}`,
      { method: "PUT", headers, body: JSON.stringify(payload) }
    );
    return res;
  }

  async function syncPullPath(cfg, path) {
    const res = await githubRequest("GET", cfg, path);
    if (res.status === 404) return { remote: null, sha: null };
    if (!res.ok) throw new Error("GET falhou: " + res.status);
    const json = await res.json();
    const content = JSON.parse(decodeURIComponent(escape(atob(json.content.replace(/\n/g, "")))));
    return { remote: content, sha: json.sha };
  }

  async function syncPushPath(cfg, path, data, sha) {
    const res = await githubRequest("PUT", cfg, path, data, sha);
    if (!res.ok) {
      const errBody = await res.json().catch(() => ({}));
      throw new Error((errBody && errBody.message) || ("PUT falhou: " + res.status));
    }
    return res.json();
  }

  async function syncPull(cfg) { return syncPullPath(cfg, DATA_FILE_PATH); }

  // Push with automatic retry on SHA conflicts (409 "does not match ...sha"):
  // this happens when the remote file changed since we last read it (e.g. two
  // syncs overlapping, or another device pushed first). We just re-read the
  // current sha and retry, up to a few times, before giving up.
  async function pushWithRetry(cfg, path, dataFn, sha, attempt) {
    attempt = attempt || 1;
    try {
      return await syncPushPath(cfg, path, dataFn(), sha);
    } catch (err) {
      const isShaConflict = /does not match|sha/i.test(err.message) && attempt <= 3;
      if (!isShaConflict) throw err;
      const fresh = await syncPullPath(cfg, path);
      return pushWithRetry(cfg, path, dataFn, fresh.sha, attempt + 1);
    }
  }

  async function syncPush(cfg, sha) {
    return pushWithRetry(cfg, DATA_FILE_PATH, () => STATE, sha);
  }

  async function syncRoster(cfg, showToast) {
    try {
      const { remote, sha } = await syncPullPath(cfg, ROSTER_FILE_PATH);
      const localHasNames = Object.keys(ROSTER).length > 0;
      if (remote && remote.roster) {
        ROSTER = remote.roster;
        saveRosterCache(ROSTER);
      } else if (localHasNames) {
        await pushWithRetry(cfg, ROSTER_FILE_PATH, () => ({
          roster: ROSTER,
          note: "Ficheiro PRIVADO — nomes reais das atletas. Nunca colocar no repositório público.",
        }), sha);
      }
    } catch (err) {
      console.error("[AnimaKids roster sync]", err);
      if (showToast) toast("Falha ao sincronizar nomes: " + err.message);
    }
  }

  // Serialize sync calls: if one is already running, queue at most one
  // follow-up run instead of letting two overlap (that's what was causing
  // the SHA-conflict errors — two syncs reading/writing the file at once).
  let syncInFlight = false;
  let syncQueued = null; // holds the `showToast` value of the queued run, if any

  async function syncNow(showToast) {
    if (syncInFlight) {
      syncQueued = showToast || syncQueued;
      return;
    }
    const cfg = loadSyncConfig();
    if (!cfg || !cfg.repo || !cfg.token) {
      setSyncStatus("off");
      return;
    }
    syncInFlight = true;
    setSyncStatus("syncing");
    try {
      const { remote, sha } = await syncPull(cfg);
      if (remote && remote.updatedAt && remote.updatedAt > STATE.updatedAt) {
        STATE = Object.assign(defaultState(), remote);
        saveStateLocal();
      } else {
        await syncPush(cfg, sha);
      }
      await syncRoster(cfg, showToast);
      renderCurrentView();
      setSyncStatus("synced");
      if (showToast) toast("Sincronizado com o GitHub.");
    } catch (err) {
      console.error("[AnimaKids sync]", err);
      setSyncStatus("error");
      if (showToast) toast("Falha na sincronização: " + err.message);
    } finally {
      syncInFlight = false;
      if (syncQueued !== null) {
        const nextToast = syncQueued;
        syncQueued = null;
        syncNow(nextToast);
      }
    }
  }

  function schedulePush() {
    const cfg = loadSyncConfig();
    if (!cfg || !cfg.repo || !cfg.token) return;
    if (pushTimer) clearTimeout(pushTimer);
    pushTimer = setTimeout(() => syncNow(false), 1500);
  }

  function renderSyncStatusBlock() {
    const block = document.getElementById("syncStatusBlock");
    const cfg = loadSyncConfig();
    if (!cfg || !cfg.repo) {
      block.innerHTML = `<i class="bi bi-cloud-slash"></i> Ainda não sincronizado — os dados ficam só neste dispositivo.`;
    } else {
      const label = { off: "Não ligado", syncing: "A sincronizar…", synced: "Sincronizado", error: "Erro na última sincronização" }[syncStatus];
      block.innerHTML = `<i class="bi bi-github"></i> Repositório <strong>${escapeHtml(cfg.repo)}</strong> (ramo ${escapeHtml(cfg.branch || "main")}) — ${label}`;
    }
  }

  document.getElementById("syncForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const repo = document.getElementById("syncRepo").value.trim();
    const branch = document.getElementById("syncBranch").value.trim() || "main";
    const token = document.getElementById("syncToken").value.trim();
    if (!repo || !token) { toast("Preenche o repositório e o token."); return; }
    saveSyncConfig({ repo, branch, token });
    document.getElementById("syncDisconnectBtn").hidden = false;
    document.getElementById("syncToken").value = "";
    await syncNow(true);
  });

  document.getElementById("syncNowBtn").addEventListener("click", () => syncNow(true));

  document.getElementById("syncDisconnectBtn").addEventListener("click", () => {
    clearSyncConfig();
    setSyncStatus("off");
    document.getElementById("syncDisconnectBtn").hidden = true;
    toast("Sincronização desligada neste dispositivo.");
  });

  // Tap the pill to sync/retry immediately. If sync isn't configured yet,
  // open the settings modal instead (nothing to sync/retry).
  syncStatusBtn.addEventListener("click", () => {
    const cfg = loadSyncConfig();
    if (!cfg || !cfg.repo || !cfg.token) {
      openModal();
    } else {
      syncNow(true);
    }
  });

  // ------------------------------------------------------------------
  // Roster editor (private real names)
  // ------------------------------------------------------------------
  const rosterSection = document.getElementById("rosterSection");
  document.getElementById("rosterToggleBtn").addEventListener("click", () => {
    rosterSection.hidden = !rosterSection.hidden;
    if (!rosterSection.hidden) renderRosterFields();
  });

  function renderRosterFields() {
    const host = document.getElementById("rosterFields");
    host.innerHTML = ATHLETES.map((code) => `
      <div class="input-group input-group-sm">
        <span class="input-group-text" style="min-width:56px;">${escapeHtml(code)}</span>
        <input type="text" class="form-control" data-code="${escapeHtml(code)}" value="${escapeHtml(ROSTER[code] || "")}" placeholder="Nome real (opcional)">
      </div>
    `).join("");
  }

  document.getElementById("rosterSaveBtn").addEventListener("click", async () => {
    const inputs = document.querySelectorAll("#rosterFields input[data-code]");
    const newRoster = {};
    inputs.forEach((inp) => {
      const val = inp.value.trim();
      if (val) newRoster[inp.dataset.code] = val;
    });
    ROSTER = newRoster;
    saveRosterCache(ROSTER);
    renderCurrentView();
    toast("Nomes guardados neste dispositivo.");
    const cfg = loadSyncConfig();
    if (cfg && cfg.repo && cfg.token) {
      try {
        const { sha } = await syncPullPath(cfg, ROSTER_FILE_PATH);
        await pushWithRetry(cfg, ROSTER_FILE_PATH, () => ({
          roster: ROSTER,
          note: "Ficheiro PRIVADO — nomes reais das atletas. Nunca colocar no repositório público.",
        }), sha);
        toast("Nomes também enviados para o repositório privado.");
      } catch (err) {
        console.error("[AnimaKids roster save]", err);
        toast("Guardado neste dispositivo, mas falhou o envio para o GitHub: " + err.message);
      }
    }
  });

  // ==================================================================
  // MODAL (settings)
  // ==================================================================
  const settingsModal = document.getElementById("settingsModal");
  function openModal() {
    const cfg = loadSyncConfig();
    if (cfg) {
      document.getElementById("syncRepo").value = cfg.repo || "";
      document.getElementById("syncBranch").value = cfg.branch || "main";
      document.getElementById("syncDisconnectBtn").hidden = false;
    }
    renderSyncStatusBlock();
    settingsModal.hidden = false;
  }
  function closeModal() { settingsModal.hidden = true; }
  document.getElementById("settingsModalClose").addEventListener("click", closeModal);
  settingsModal.addEventListener("click", (e) => { if (e.target === settingsModal) closeModal(); });
  document.getElementById("navSettingsBtn").addEventListener("click", openModal);

  document.getElementById("exportBtn").addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(STATE, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "animakids-state.json";
    a.click();
    URL.revokeObjectURL(url);
  });

  // ------------------------------------------------------------------
  // Export Presenças to Excel, in a monthly-calendar layout (one sheet
  // per calendar month, all days of the month as columns, P/J/F marks
  // only on actual training days, totals via COUNTIF formulas).
  // ------------------------------------------------------------------
  const MESES_PT = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho",
    "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
  const MESES_ABR = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];
  const DIAS_ABR = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  function exportPresencasExcel() {
    if (typeof XLSX === "undefined") { toast("Biblioteca de Excel não carregou. Verifica a ligação à internet."); return; }
    if (Object.keys(ROSTER).length === 0) {
      toast("Aviso: sem nomes reais carregados — o Excel vai sair com códigos (Atleta A01…). Preenche os nomes em Mais → Nomes reais.");
    }
    const wb = XLSX.utils.book_new();
    const monthMap = {};
    PERIODS.forEach((p) => p.sessions.forEach((s) => {
      const d = new Date(s.date + "T00:00:00");
      const key = d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0");
      if (!monthMap[key]) monthMap[key] = { year: d.getFullYear(), month: d.getMonth(), periodId: p.id, dates: [] };
      monthMap[key].dates.push(s.date);
    }));

    Object.keys(monthMap).sort().forEach((key) => {
      const info = monthMap[key];
      const daysInMonth = new Date(info.year, info.month + 1, 0).getDate();
      const trainingDatesSet = new Set(info.dates);
      const sheetName = MESES_ABR[info.month] + String(info.year).slice(2);

      const aoa = [];
      aoa.push(["AnimaKids — Presenças"]);
      aoa.push(["Mês:", MESES_PT[info.month], "", "Ano:", info.year]);
      aoa.push([]);
      const header = ["Nº", "Nome", "Presente", "Justificou", "Faltou"];
      for (let day = 1; day <= daysInMonth; day++) header.push(day);
      aoa.push(header);
      const weekdayRow = ["", "", "", "", ""];
      for (let day = 1; day <= daysInMonth; day++) {
        weekdayRow.push(DIAS_ABR[new Date(info.year, info.month, day).getDay()]);
      }
      aoa.push(weekdayRow);

      ATHLETES.forEach((athlete, idx) => {
        const row = [idx + 1, displayName(athlete), null, null, null];
        for (let day = 1; day <= daysInMonth; day++) {
          const iso = `${info.year}-${String(info.month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          if (trainingDatesSet.has(iso)) {
            const val = getAttendance(info.periodId, iso, athlete);
            row.push(val === "Presente" ? "P" : val === "Justificou" ? "J" : val === "Faltou" ? "F" : "");
          } else {
            row.push("");
          }
        }
        aoa.push(row);
      });

      const ws = XLSX.utils.aoa_to_sheet(aoa);
      const firstDataRowIndex = 5; // 0-based
      const lastColIndex = 4 + daysInMonth; // 0-based
      const firstDayColLetter = XLSX.utils.encode_col(5);
      const lastDayColLetter = XLSX.utils.encode_col(lastColIndex);

      ATHLETES.forEach((athlete, idx) => {
        const r = firstDataRowIndex + idx;
        const excelRow = r + 1;
        const rangeRef = `${firstDayColLetter}${excelRow}:${lastDayColLetter}${excelRow}`;
        ws[XLSX.utils.encode_cell({ r, c: 2 })] = { t: "n", f: `COUNTIF(${rangeRef},"P")` };
        ws[XLSX.utils.encode_cell({ r, c: 3 })] = { t: "n", f: `COUNTIF(${rangeRef},"J")` };
        ws[XLSX.utils.encode_cell({ r, c: 4 })] = { t: "n", f: `COUNTIF(${rangeRef},"F")` };
      });

      ws["!cols"] = [{ wch: 4 }, { wch: 30 }, { wch: 9 }, { wch: 10 }, { wch: 8 }]
        .concat(Array(daysInMonth).fill({ wch: 4 }));

      XLSX.utils.book_append_sheet(wb, ws, sheetName);
    });

    XLSX.writeFile(wb, "AnimaKids_Presencas.xlsx");
    toast("Excel de presenças exportado.");
  }

  document.getElementById("exportExcelBtn").addEventListener("click", exportPresencasExcel);

  // ==================================================================
  // NAVIGATION
  // ==================================================================
  const views = ["plano", "objetivos", "progresso", "atletas", "presencas"];
  let currentView = "plano";

  document.querySelectorAll(".nav-btn[data-view]").forEach((btn) => {
    btn.addEventListener("click", () => switchView(btn.dataset.view));
  });

  function switchView(view) {
    currentView = view;
    views.forEach((v) => {
      document.getElementById("view-" + v).classList.toggle("d-none", v !== view);
    });
    document.querySelectorAll(".nav-btn[data-view]").forEach((b) => {
      b.classList.toggle("active", b.dataset.view === view);
    });
    document.getElementById("appMain").scrollTo(0, 0);
    window.scrollTo(0, 0);
    renderCurrentView();
  }

  function renderCurrentView() {
    if (currentView === "plano") renderPlano();
    else if (currentView === "objetivos") renderObjetivos();
    else if (currentView === "progresso") renderProgresso();
    else if (currentView === "atletas") renderAtletas();
    else if (currentView === "presencas") renderPresencas();
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    }[c]));
  }

  // ==================================================================
  // VIEW: PLANO DE TREINO
  // ==================================================================
  let planoPeriodId = PERIODS[0].id;
  let planoMode = "pendentes"; // pendentes | historico

  document.querySelectorAll(".plano-mode-tabs .btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      planoMode = btn.dataset.planomode;
      document.querySelectorAll(".plano-mode-tabs .btn").forEach((b) => b.classList.toggle("active", b === btn));
      renderPlano();
    });
  });

  function renderPlanoTabs() {
    const host = document.getElementById("planoPeriodTabs");
    host.innerHTML = PERIODS.map((p) => `
      <button type="button" class="btn btn-outline-secondary ${p.id === planoPeriodId ? "active" : ""}" data-period="${p.id}">${escapeHtml(p.label)}</button>
    `).join("");
    host.querySelectorAll("button").forEach((b) => {
      b.addEventListener("click", () => { planoPeriodId = b.dataset.period; renderPlano(); });
    });
  }

  function micoSlug(micro) {
    return (micro || "").toLowerCase()
      .replace("torneio de objetivos", "torneio")
      .split(" + ")[0]
      .split(" ")[0];
  }

  function todayIso() {
    const d = new Date();
    return d.toISOString().slice(0, 10);
  }

  function currentPhase() {
    const today = todayIso();
    let found = PHASES.find((ph) => today >= ph.startDate && today <= ph.endDate);
    if (found) return found;
    // before season: first phase; after season: last phase; between phases: next upcoming
    if (today < PHASES[0].startDate) return PHASES[0];
    if (today > PHASES[PHASES.length - 1].endDate) return PHASES[PHASES.length - 1];
    const upcoming = PHASES.find((ph) => ph.startDate > today);
    return upcoming || PHASES[PHASES.length - 1];
  }

  let phaseExpanded = false;
  function renderPhaseBanner() {
    const host = document.getElementById("phaseBanner");
    const phase = currentPhase();
    const range = `${fmtDateShort(phase.startDate)} — ${fmtDateShort(phase.endDate)}`;
    host.innerHTML = `
      <div class="pb-title"><i class="bi bi-signpost-split"></i> Estamos na ${escapeHtml(phase.title)}</div>
      <div class="pb-range">${range}</div>
      <div class="pb-desc">${phaseExpanded ? escapeHtml(phase.description) : escapeHtml(phase.description.slice(0, 110)) + (phase.description.length > 110 ? "…" : "")}</div>
      <button type="button" class="pb-toggle" id="phaseToggleBtn">${phaseExpanded ? "Ver menos" : "Ver todas as fases da época"}</button>
      ${phaseExpanded ? renderAllPhasesList(phase.key) : ""}
    `;
    document.getElementById("phaseToggleBtn").addEventListener("click", () => {
      phaseExpanded = !phaseExpanded;
      renderPhaseBanner();
    });
  }

  function renderAllPhasesList(currentKey) {
    return `
      <div class="mt-2 d-flex flex-column gap-2">
        ${PHASES.map((ph) => `
          <div style="padding:8px 10px;border-radius:10px;background:${ph.key === currentKey ? "rgba(109,158,235,0.18)" : "rgba(255,255,255,0.6)"};">
            <div style="font-weight:700;font-size:0.76rem;">${escapeHtml(ph.title)} <span style="font-weight:600;color:var(--ak-muted);">(${fmtDateShort(ph.startDate)} – ${fmtDateShort(ph.endDate)})</span></div>
            <div style="font-size:0.72rem;color:var(--ak-muted);margin-top:2px;">${escapeHtml(ph.description)}</div>
          </div>
        `).join("")}
      </div>
    `;
  }

  function renderPlano() {
    renderPlanoTabs();
    renderPhaseBanner();
    const period = PERIODS.find((p) => p.id === planoPeriodId);
    const host = document.getElementById("planoSessionList");
    const sessions = period.sessions.filter((s) => {
      const done = getCompleted(period.id, s.date);
      return planoMode === "historico" ? done : !done;
    });

    host.innerHTML = sessions.map((s) => {
      const slug = micoSlug(s.micro);
      const done = getCompleted(period.id, s.date);
      const badges = [`<span class="badge-micro">${escapeHtml(s.micro)}</span>`];
      if (s.formato) badges.push(`<span class="badge-formato">${escapeHtml(s.formato)}</span>`);
      return `
        <div class="session-card micro-${slug} ${done ? "is-done" : ""}" data-period="${period.id}" data-date="${s.date}">
          <div class="sc-top">
            <div class="sc-date">${fmtDateLong(s.date)}</div>
            <div class="sc-badges">${badges.join("")}</div>
          </div>
          <div class="sc-fase">${escapeHtml(s.fase)}</div>
          <div class="sc-ginastica">${escapeHtml(s.ginastica)}</div>
          <div class="sc-meta">
            <span>🔥 <strong>${escapeHtml(s.aquecimento)}</strong></span>
            <span>🎲 <strong>${escapeHtml(s.jogo)}</strong></span>
            <span>🧘 <strong>${escapeHtml(s.alongamento)}</strong></span>
          </div>
          <div class="sc-done-row">
            <button type="button" class="sc-done-btn ${done ? "done" : ""}">
              <i class="bi ${done ? "bi-check-circle-fill" : "bi-circle"}"></i>
              ${done ? "Treino realizado" : "Marcar como realizado"}
            </button>
          </div>
        </div>
      `;
    }).join("") || emptyState(planoMode === "historico" ? "Ainda não há treinos no histórico." : "Todos os treinos deste período já foram marcados como realizados.");

    host.querySelectorAll(".sc-done-btn").forEach((btn) => {
      const card = btn.closest(".session-card");
      btn.addEventListener("click", () => {
        const p = card.dataset.period, d = card.dataset.date;
        setCompleted(p, d, !getCompleted(p, d));
        renderPlano();
      });
    });
  }

  function emptyState(msg) {
    return `<div class="empty-state"><div class="ico">🤸</div><p>${escapeHtml(msg)}</p></div>`;
  }

  // ==================================================================
  // VIEW: OBJETIVOS
  // ==================================================================
  function renderObjetivos() {
    const host = document.getElementById("objetivosList");
    host.innerHTML = OBJECTIVES.map((o) => `
      <div class="objective-card">
        <span class="objective-cat-badge ${CAT_CLASS[o.categoria] || ""}">${escapeHtml(o.categoria)}</span>
        <h3>${escapeHtml(o.nome)}</h3>
        <ul class="level-list">
          ${o.niveis.map((lvl, i) => `<li><span class="lvl-num">${i + 1}</span><span>${escapeHtml(lvl)}</span></li>`).join("")}
        </ul>
      </div>
    `).join("");
  }

  // ==================================================================
  // VIEW: PROGRESSO
  // ==================================================================
  let progMode = "atleta";
  let progAtletaSel = ATHLETES[0];
  let progObjetivoSel = OBJECTIVES[0].id;

  document.querySelectorAll(".progresso-mode-tabs .btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      progMode = btn.dataset.progmode;
      document.querySelectorAll(".progresso-mode-tabs .btn").forEach((b) => b.classList.toggle("active", b === btn));
      renderProgresso();
    });
  });

  function progressBarHtml(level) {
    let segs = "";
    for (let i = 1; i <= 5; i++) {
      const filled = i <= level;
      const done = level === 5;
      segs += `<div class="prog-seg ${filled ? "filled" : ""} ${filled && done ? "done" : ""}"></div>`;
    }
    return `<div class="prog-bar">${segs}</div>`;
  }

  function progCardHtml(athlete, obj, mode) {
    const level = getProgress(athlete, obj.id);
    const desc = level > 0 ? obj.niveis[level - 1] : "Ainda não iniciado";
    const title = mode === "objetivo" ? displayName(athlete) : obj.nome;
    const sub = obj.categoria;
    return `
      <div class="prog-card" data-athlete="${escapeHtml(athlete)}" data-obj="${obj.id}">
        <div class="prog-title">${escapeHtml(title)}</div>
        <div class="prog-sub">${escapeHtml(sub)}</div>
        <div class="prog-bar-row">
          <button type="button" class="prog-btn btn-minus" ${level <= 0 ? "disabled" : ""}>–</button>
          <div class="prog-bar">${progressBarHtml(level)}</div>
          <button type="button" class="prog-btn btn-plus" ${level >= 5 ? "disabled" : ""}>+</button>
        </div>
        <div class="prog-level-label">Nível ${level}/5</div>
        <div class="prog-level-desc">${escapeHtml(desc)}</div>
      </div>
    `;
  }

  function renderProgresso() {
    const atletaPicker = document.getElementById("progressoAtletaPicker");
    const objPicker = document.getElementById("progressoObjetivoPicker");
    const content = document.getElementById("progressoContent");

    atletaPicker.classList.toggle("d-none", progMode !== "atleta");
    objPicker.classList.toggle("d-none", progMode !== "objetivo");

    if (progMode === "atleta") {
      atletaPicker.innerHTML = ATHLETES.map((a) => `
        <button type="button" class="picker-chip ${a === progAtletaSel ? "active" : ""}" data-athlete="${escapeHtml(a)}">${escapeHtml(displayName(a))}</button>
      `).join("");
      atletaPicker.querySelectorAll(".picker-chip").forEach((chip) => {
        chip.addEventListener("click", () => { progAtletaSel = chip.dataset.athlete; renderProgresso(); });
      });
      content.innerHTML = OBJECTIVES.map((o) => progCardHtml(progAtletaSel, o, "atleta")).join("");
    } else {
      objPicker.innerHTML = OBJECTIVES.map((o) => `
        <button type="button" class="picker-chip ${o.id === progObjetivoSel ? "active" : ""}" data-obj="${o.id}">${escapeHtml(o.nome)}</button>
      `).join("");
      objPicker.querySelectorAll(".picker-chip").forEach((chip) => {
        chip.addEventListener("click", () => { progObjetivoSel = chip.dataset.obj; renderProgresso(); });
      });
      const obj = OBJECTIVES.find((o) => o.id === progObjetivoSel);
      content.innerHTML = ATHLETES.map((a) => progCardHtml(a, obj, "objetivo")).join("");
    }

    content.querySelectorAll(".prog-card").forEach((card) => {
      const athlete = card.dataset.athlete;
      const objId = card.dataset.obj;
      card.querySelector(".btn-plus").addEventListener("click", () => {
        setProgress(athlete, objId, getProgress(athlete, objId) + 1);
        renderProgresso();
      });
      card.querySelector(".btn-minus").addEventListener("click", () => {
        setProgress(athlete, objId, getProgress(athlete, objId) - 1);
        renderProgresso();
      });
    });
  }

  // ==================================================================
  // VIEW: ATLETAS / GRUPOS
  // ==================================================================
  function renderAtletas() {
    const host = document.getElementById("atletasList");
    host.innerHTML = ATHLETES.map((a) => {
      const g = getGroup(a);
      return `
        <div class="athlete-row" data-athlete="${escapeHtml(a)}">
          <span class="athlete-name">${escapeHtml(displayName(a))}</span>
          <div class="group-btns">
            <button type="button" class="group-btn g1 ${g === 1 ? "active" : ""}" data-g="1">1</button>
            <button type="button" class="group-btn g2 ${g === 2 ? "active" : ""}" data-g="2">2</button>
            <button type="button" class="group-btn g3 ${g === 3 ? "active" : ""}" data-g="3">3</button>
          </div>
        </div>
      `;
    }).join("");

    host.querySelectorAll(".athlete-row").forEach((row) => {
      const athlete = row.dataset.athlete;
      row.querySelectorAll(".group-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          setGroup(athlete, parseInt(btn.dataset.g, 10));
          renderAtletas();
        });
      });
    });
  }

  // ==================================================================
  // VIEW: PRESENÇAS
  // ==================================================================
  let presPeriodId = PERIODS[0].id;
  let presDateIso = PERIODS[0].sessions[0].date;

  function findNextSessionRef(periodIdFilter) {
    const today = todayIso();
    let flat = [];
    PERIODS.forEach((p) => {
      if (periodIdFilter && p.id !== periodIdFilter) return;
      p.sessions.forEach((s) => flat.push({ periodId: p.id, date: s.date }));
    });
    flat.sort((a, b) => a.date.localeCompare(b.date));
    return flat.find((s) => s.date >= today) || flat[flat.length - 1];
  }

  // default: open on the next upcoming training (or the last one, if the season is over)
  (function initPresencasDefault() {
    const next = findNextSessionRef(null);
    if (next) { presPeriodId = next.periodId; presDateIso = next.date; }
  })();

  function renderPresencasTabs() {
    const host = document.getElementById("presencasPeriodTabs");
    host.innerHTML = PERIODS.map((p) => `
      <button type="button" class="btn btn-outline-secondary ${p.id === presPeriodId ? "active" : ""}" data-period="${p.id}">${escapeHtml(p.label)}</button>
    `).join("");
    host.querySelectorAll("button").forEach((b) => {
      b.addEventListener("click", () => {
        presPeriodId = b.dataset.period;
        const next = findNextSessionRef(presPeriodId);
        presDateIso = next ? next.date : PERIODS.find((p) => p.id === presPeriodId).sessions[0].date;
        renderPresencas();
      });
    });
  }

  function renderPresencas() {
    renderPresencasTabs();
    const period = PERIODS.find((p) => p.id === presPeriodId);
    const datePicker = document.getElementById("presencasDatePicker");
    datePicker.innerHTML = period.sessions.map((s) => {
      const done = getCompleted(period.id, s.date);
      return `<button type="button" class="picker-chip ${s.date === presDateIso ? "active" : ""}" data-date="${s.date}">${done ? "✅ " : ""}${fmtDateShort(s.date)}</button>`;
    }).join("");
    datePicker.querySelectorAll(".picker-chip").forEach((chip) => {
      chip.addEventListener("click", () => { presDateIso = chip.dataset.date; renderPresencas(); });
    });
    const activeChip = datePicker.querySelector(".picker-chip.active");
    if (activeChip) activeChip.scrollIntoView({ inline: "center", block: "nearest" });

    const isDone = getCompleted(presPeriodId, presDateIso);
    const badge = document.getElementById("presencasTreinoBadge");
    badge.className = "treino-badge " + (isDone ? "done" : "pending");
    badge.innerHTML = isDone
      ? `<i class="bi bi-check-circle-fill"></i> Este treino já foi marcado como realizado no Plano.`
      : `<i class="bi bi-clock-history"></i> Este treino ainda não foi marcado como realizado. Podes marcá-lo na vista Plano.`;

    const list = document.getElementById("presencasList");
    list.innerHTML = ATHLETES.map((a) => {
      const val = getAttendance(presPeriodId, presDateIso, a);
      return `
        <div class="attendance-row" data-athlete="${escapeHtml(a)}">
          <span class="att-name">${escapeHtml(displayName(a))}</span>
          <div class="att-btns">
            <button type="button" class="att-btn p ${val === "Presente" ? "active" : ""}" data-val="Presente">P</button>
            <button type="button" class="att-btn j ${val === "Justificou" ? "active" : ""}" data-val="Justificou">J</button>
            <button type="button" class="att-btn f ${val === "Faltou" ? "active" : ""}" data-val="Faltou">F</button>
          </div>
        </div>
      `;
    }).join("");

    list.querySelectorAll(".attendance-row").forEach((row) => {
      const athlete = row.dataset.athlete;
      row.querySelectorAll(".att-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          setAttendance(presPeriodId, presDateIso, athlete, btn.dataset.val);
          renderPresencas();
        });
      });
    });

    let p = 0, j = 0, f = 0;
    ATHLETES.forEach((a) => {
      const val = getAttendance(presPeriodId, presDateIso, a);
      if (val === "Presente") p++;
      else if (val === "Justificou") j++;
      else if (val === "Faltou") f++;
    });
    document.getElementById("presencasSummary").innerHTML = `
      <span class="chip">✅ ${p} presentes</span>
      <span class="chip">📋 ${j} justificaram</span>
      <span class="chip">❌ ${f} faltaram</span>
    `;
  }

  // ==================================================================
  // BOOT
  // ==================================================================
  function boot() {
    setSyncStatus(loadSyncConfig() ? "syncing" : "off");
    if (loadSyncConfig()) {
      document.getElementById("syncDisconnectBtn").hidden = false;
      syncNow(false);
    }
    switchView("plano");
  }

  if (isLoggedIn()) {
    showApp();
  } else {
    loginScreen.hidden = false;
  }

  // Register service worker
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("service-worker.js").catch(() => {});
    });
  }
})();
