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

  const MOVEKIDS_ATHLETES = MOVEKIDS_DATA.athletes;
  const MOVEKIDS_PERIODS = MOVEKIDS_DATA.periods;

  // ------------------------------------------------------------------
  // DIRETÓRIO (privado): nomes reais + classes (e respetivos atletas).
  // O ficheiro público data.js só tem códigos anónimos; quem pertence a
  // cada classe, e os nomes, vivem aqui (localStorage) e, se a
  // sincronização estiver ligada, no roster.json do repositório PRIVADO.
  // Permite adicionar/remover atletas e classes sem tocar no código.
  // ------------------------------------------------------------------
  const LS_CONFIG = "animakids-config-cache";
  const EPOCH_ISO = new Date(0).toISOString();
  const BUILTIN_PERIODS = { animakids: PERIODS, movekids: MOVEKIDS_PERIODS };

  // Feriados nacionais + feriado municipal de Sintra (29 jun), época 26/27
  const HOLIDAYS_PT = [
    "2026-10-05", "2026-11-01", "2026-12-01", "2026-12-08", "2026-12-25",
    "2027-01-01", "2027-03-26", "2027-04-25", "2027-05-01", "2027-05-27",
    "2027-06-10", "2027-06-29", "2027-08-15",
  ];

  function numOfCode(code) { return parseInt(String(code).replace(/^\D+/, ""), 10) || 0; }
  function nextNumFor(prefix, codes, roster) {
    let m = 0;
    codes.concat(Object.keys(roster || {})).forEach((code) => {
      if (String(code).startsWith(prefix)) m = Math.max(m, numOfCode(code));
    });
    return m + 1;
  }

  function defaultClasses(roster) {
    return [
      { key: "animakids", label: "AnimaKids", builtin: true, prefix: "A",
        athletes: ATHLETES.slice(), nextNum: nextNumFor("A", ATHLETES, roster) },
      { key: "movekids", label: "MoveKids", builtin: true, prefix: "M",
        athletes: MOVEKIDS_ATHLETES.slice(), nextNum: nextNumFor("M", MOVEKIDS_ATHLETES, roster) },
    ];
  }

  function normalizeClasses(list, roster) {
    const out = [];
    (Array.isArray(list) ? list : []).forEach((c) => {
      if (!c || !c.key || !c.label) return;
      const builtin = Object.prototype.hasOwnProperty.call(BUILTIN_PERIODS, c.key);
      const prefix = c.prefix || (c.key === "animakids" ? "A" : c.key === "movekids" ? "M" : "X");
      const athletes = Array.isArray(c.athletes) ? c.athletes.slice() : [];
      out.push({
        key: String(c.key), label: String(c.label), builtin, prefix, athletes,
        nextNum: Math.max(Number(c.nextNum) || 1, nextNumFor(prefix, athletes, roster)),
        periods: builtin ? undefined : (Array.isArray(c.periods) ? c.periods : []),
      });
    });
    defaultClasses(roster).slice().reverse().forEach((d) => {
      if (!out.some((c) => c.key === d.key)) out.unshift(d);
    });
    return out;
  }

  function loadDir() {
    let dir = null;
    try { dir = JSON.parse(localStorage.getItem(LS_CONFIG) || "null"); } catch (e) { dir = null; }
    let legacy = {};
    try { legacy = JSON.parse(localStorage.getItem(LS_ROSTER) || "{}"); } catch (e) { legacy = {}; }
    if (!dir || typeof dir !== "object") dir = { roster: legacy, classes: null, updatedAt: EPOCH_ISO };
    if (!dir.roster || typeof dir.roster !== "object") dir.roster = legacy;
    dir.classes = normalizeClasses(dir.classes, dir.roster);
    if (!dir.updatedAt) dir.updatedAt = EPOCH_ISO;
    return dir;
  }
  let DIR = loadDir();
  function saveDir() { localStorage.setItem(LS_CONFIG, JSON.stringify(DIR)); }
  function touchDir() {
    DIR.updatedAt = new Date().toISOString();
    saveDir();
    schedulePush();
  }

  function displayName(code) {
    if (DIR.roster[code]) return DIR.roster[code];
    return "Atleta " + code;
  }

  // Ordem alfabética (pt) pelo nome mostrado — usada em TODAS as listas.
  function sortCodesByName(codes) {
    return codes.slice().sort((a, b) =>
      displayName(a).localeCompare(displayName(b), "pt", { sensitivity: "base" }) || a.localeCompare(b));
  }

  // Classes prontas a usar na vista Presenças (atletas já ordenados).
  function getClasses() {
    return DIR.classes.map((c) => ({
      key: c.key,
      label: c.label,
      builtin: !!c.builtin,
      hasPlano: c.key === "animakids",
      athletes: sortCodesByName(c.athletes),
      periods: c.builtin ? BUILTIN_PERIODS[c.key] : (c.periods || []),
    }));
  }
  function presClass(key) {
    const all = getClasses();
    return all.find((c) => c.key === key) || all[0];
  }
  // Atletas da AnimaKids (usadas em Atletas & Grupos e em Progresso)
  function animaAthletes() { return presClass("animakids").athletes; }


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

  function dirPayload() {
    return {
      roster: DIR.roster,
      classes: DIR.classes,
      updatedAt: DIR.updatedAt,
      note: "Ficheiro PRIVADO — nomes reais das atletas e classes. Nunca colocar no repositório público.",
    };
  }

  // Ganha sempre a versão mais recente (updatedAt). Um roster.json antigo
  // (só com nomes, sem classes) é aceite uma vez e depois substituído.
  async function syncRoster(cfg, showToast) {
    try {
      const { remote, sha } = await syncPullPath(cfg, ROSTER_FILE_PATH);
      const localT = DIR.updatedAt || EPOCH_ISO;
      const remoteT = (remote && remote.updatedAt) || EPOCH_ISO;
      if (remote && (remote.roster || remote.classes)) {
        if (remoteT > localT) {
          if (remote.roster) DIR.roster = remote.roster;
          if (remote.classes) DIR.classes = normalizeClasses(remote.classes, DIR.roster);
          DIR.updatedAt = remoteT;
          saveDir();
        } else if (localT > remoteT) {
          await pushWithRetry(cfg, ROSTER_FILE_PATH, dirPayload, sha);
        } else if (remote.roster && !remote.classes) {
          DIR.roster = remote.roster; // ficheiro antigo, só nomes
          DIR.classes = normalizeClasses(DIR.classes, DIR.roster);
          saveDir();
        }
      } else if (Object.keys(DIR.roster).length > 0 || localT > EPOCH_ISO) {
        await pushWithRetry(cfg, ROSTER_FILE_PATH, dirPayload, sha);
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
  // Atletas e classes (Definições): adicionar/remover atletas e classes
  // ------------------------------------------------------------------
  const manageSection = document.getElementById("manageSection");
  const manageBody = document.getElementById("manageBody");
  document.getElementById("manageToggleBtn").addEventListener("click", () => {
    manageSection.hidden = !manageSection.hidden;
    if (!manageSection.hidden) renderManage();
  });

  const WEEKDAY_OPTS = [[1, "Seg"], [2, "Ter"], [3, "Qua"], [4, "Qui"], [5, "Sex"], [6, "Sáb"], [0, "Dom"]];

  function renderManage() {
    const classes = getClasses();
    const classesHtml = classes.map((cls) => `
      <div class="manage-class" data-class="${escapeHtml(cls.key)}">
        <div class="manage-class-head">
          <div><strong>${escapeHtml(cls.label)}</strong> <span class="text-muted small">· ${cls.athletes.length} atletas</span></div>
          ${cls.builtin ? "" : `<button type="button" class="btn btn-sm btn-outline-danger" data-act="del-class"><i class="bi bi-trash"></i> Remover classe</button>`}
        </div>
        ${cls.athletes.map((code) => `
          <div class="input-group input-group-sm mb-1" data-code="${escapeHtml(code)}">
            <span class="input-group-text manage-code">${escapeHtml(code)}</span>
            <input type="text" class="form-control manage-name" value="${escapeHtml(DIR.roster[code] || "")}" placeholder="Nome (opcional)">
            <button type="button" class="btn btn-outline-danger" data-act="del-athlete" title="Remover atleta"><i class="bi bi-trash"></i></button>
          </div>
        `).join("") || `<div class="text-muted small mb-2">Sem atletas nesta classe.</div>`}
        <div class="input-group input-group-sm mt-2">
          <input type="text" class="form-control manage-new-name" placeholder="Nome do novo atleta">
          <button type="button" class="btn btn-primary" data-act="add-athlete"><i class="bi bi-plus-lg"></i> Adicionar</button>
        </div>
      </div>
    `).join("");

    const today = todayIso();
    const newClassHtml = `
      <div class="manage-class manage-newclass">
        <div class="manage-class-head"><strong>Adicionar classe (para Presenças)</strong></div>
        <input type="text" class="form-control form-control-sm mb-2" id="ncName" placeholder="Nome da classe (ex: FlipKids)">
        <div class="small text-muted mb-1">Dias de treino</div>
        <div class="manage-weekdays mb-2">
          ${WEEKDAY_OPTS.map(([v, l]) => `<label class="manage-wd"><input type="checkbox" class="nc-wd" value="${v}"> ${l}</label>`).join("")}
        </div>
        <div class="row g-2 mb-2">
          <div class="col-6"><label class="small text-muted">Início</label><input type="date" class="form-control form-control-sm" id="ncStart" value="${today}"></div>
          <div class="col-6"><label class="small text-muted">Fim</label><input type="date" class="form-control form-control-sm" id="ncEnd" value="2027-07-31"></div>
        </div>
        <label class="small d-block mb-2"><input type="checkbox" id="ncHolidays" checked> Excluir feriados nacionais e de Sintra</label>
        <button type="button" class="btn btn-primary btn-sm w-100" data-act="add-class"><i class="bi bi-plus-lg"></i> Criar classe</button>
      </div>
    `;
    manageBody.innerHTML = classesHtml + newClassHtml;
  }

  function isoLocal(d) {
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }
  function monthAbbr(m) { return MONTHS_PT[m].charAt(0).toUpperCase() + MONTHS_PT[m].slice(1, 3); }

  // Gera os treinos (datas) de uma classe nova e agrupa-os em períodos de
  // até 4 meses (ex.: "Set - Dez 2026"), como as classes existentes.
  function buildCustomPeriods(key, weekdays, startIso, endIso, excludeHolidays) {
    const hol = new Set(excludeHolidays ? HOLIDAYS_PT : []);
    const dates = [];
    const d = new Date(startIso + "T00:00:00");
    const end = new Date(endIso + "T00:00:00");
    while (d <= end) {
      const iso = isoLocal(d);
      if (weekdays.includes(d.getDay()) && !hol.has(iso)) dates.push(iso);
      d.setDate(d.getDate() + 1);
    }
    if (!dates.length) return [];
    const first = new Date(dates[0] + "T00:00:00");
    const base = first.getFullYear() * 12 + first.getMonth();
    const chunks = {};
    dates.forEach((iso) => {
      const dt = new Date(iso + "T00:00:00");
      const idx = Math.floor((dt.getFullYear() * 12 + dt.getMonth() - base) / 4);
      (chunks[idx] = chunks[idx] || []).push(iso);
    });
    return Object.keys(chunks).map(Number).sort((a, b) => a - b).map((idx, n) => {
      const list = chunks[idx];
      const a = new Date(list[0] + "T00:00:00");
      const b = new Date(list[list.length - 1] + "T00:00:00");
      let label;
      if (a.getFullYear() === b.getFullYear()) {
        label = a.getMonth() === b.getMonth()
          ? `${monthAbbr(a.getMonth())} ${a.getFullYear()}`
          : `${monthAbbr(a.getMonth())} - ${monthAbbr(b.getMonth())} ${a.getFullYear()}`;
      } else {
        label = `${monthAbbr(a.getMonth())} ${a.getFullYear()} - ${monthAbbr(b.getMonth())} ${b.getFullYear()}`;
      }
      return { id: `${key}-p${n + 1}`, label, sessions: list.map((date) => ({ date })) };
    });
  }

  function slugify(s) {
    return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "classe";
  }
  // Prefixo de código único por classe (um código nunca colide entre classes)
  function pickPrefix(label) {
    const used = new Set(DIR.classes.map((c) => c.prefix));
    const letters = (label.toUpperCase().replace(/[^A-Z]/g, "") + "ABCDEFGHIJKLMNOPQRSTUVWXYZ").split("");
    const free = letters.find((l) => !used.has(l));
    return free || ("C" + (DIR.classes.length + 1));
  }

  function addAthleteToClass(classKey, name) {
    const c = DIR.classes.find((x) => x.key === classKey);
    if (!c) return;
    const code = c.prefix + String(c.nextNum).padStart(2, "0");
    c.nextNum += 1; // contador nunca recua: um código removido não é reutilizado
    c.athletes.push(code);
    DIR.roster[code] = name;
    touchDir();
  }
  function removeAthleteFromClass(classKey, code) {
    const c = DIR.classes.find((x) => x.key === classKey);
    if (!c) return;
    c.athletes = c.athletes.filter((x) => x !== code);
    delete DIR.roster[code]; // o nome sai; o histórico (anónimo) fica guardado
    touchDir();
  }

  manageBody.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-act]");
    if (!btn) return;
    const act = btn.dataset.act;
    const box = btn.closest(".manage-class");
    const classKey = box && box.dataset.class;

    if (act === "add-athlete") {
      const input = box.querySelector(".manage-new-name");
      const name = input.value.trim();
      if (!name) { toast("Escreve o nome do atleta."); return; }
      addAthleteToClass(classKey, name);
      renderManage();
      renderCurrentView();
      toast("Atleta adicionado.");
    } else if (act === "del-athlete") {
      const code = btn.closest("[data-code]").dataset.code;
      const cls = presClass(classKey);
      if (!window.confirm(`Remover ${displayName(code)} de ${cls.label}?\n\nO nome é apagado e o atleta deixa de aparecer; o histórico de presenças/progresso (anónimo) fica guardado.`)) return;
      removeAthleteFromClass(classKey, code);
      renderManage();
      renderCurrentView();
      toast("Atleta removido.");
    } else if (act === "del-class") {
      const cls = presClass(classKey);
      if (!window.confirm(`Remover a classe ${cls.label} e os seus ${cls.athletes.length} atletas das Presenças?\n\nOs nomes são apagados; o histórico anónimo fica guardado.`)) return;
      const c = DIR.classes.find((x) => x.key === classKey);
      c.athletes.forEach((code) => { delete DIR.roster[code]; });
      DIR.classes = DIR.classes.filter((x) => x.key !== classKey);
      if (presClassKey === classKey) presClassKey = "animakids";
      touchDir();
      renderManage();
      renderCurrentView();
      toast("Classe removida.");
    } else if (act === "add-class") {
      const label = document.getElementById("ncName").value.trim();
      const weekdays = Array.from(manageBody.querySelectorAll(".nc-wd:checked")).map((i) => parseInt(i.value, 10));
      const start = document.getElementById("ncStart").value;
      const endD = document.getElementById("ncEnd").value;
      const excl = document.getElementById("ncHolidays").checked;
      if (!label) { toast("Dá um nome à classe."); return; }
      if (DIR.classes.some((c) => c.label.toLowerCase() === label.toLowerCase())) { toast("Já existe uma classe com esse nome."); return; }
      if (!weekdays.length) { toast("Escolhe pelo menos um dia de treino."); return; }
      if (!start || !endD || start > endD) { toast("Confirma as datas de início e fim."); return; }
      const key = slugify(label) + "-" + Date.now().toString(36).slice(-4);
      const periods = buildCustomPeriods(key, weekdays, start, endD, excl);
      if (!periods.length) { toast("Não há treinos nesse intervalo."); return; }
      DIR.classes.push({ key, label, builtin: false, prefix: pickPrefix(label), athletes: [], nextNum: 1, periods });
      touchDir();
      renderManage();
      renderCurrentView();
      toast("Classe criada. Já aparece em Presenças.");
    }
  });

  manageBody.addEventListener("change", (e) => {
    const inp = e.target.closest(".manage-name");
    if (!inp) return;
    const code = inp.closest("[data-code]").dataset.code;
    const val = inp.value.trim();
    if (val) DIR.roster[code] = val; else delete DIR.roster[code];
    touchDir();
    renderCurrentView();
    toast("Nome guardado.");
  });

  manageBody.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && e.target.classList.contains("manage-new-name")) {
      e.preventDefault();
      e.target.closest(".manage-class").querySelector('[data-act="add-athlete"]').click();
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

  // ------------------------------------------------------------------
  // Guardar / partilhar um ficheiro gerado no dispositivo. Um simples
  // <a download> clicado por JS é ignorado, em silêncio, em muitos
  // browsers quando a app corre em modo standalone (instalada com
  // "Adicionar ao ecrã principal") — é por isso que a exportação
  // funcionava no browser mas não na "App". Quando a Web Share API
  // consegue partilhar ficheiros, usamos a folha de partilha nativa
  // (que sabe gravar em Ficheiros/Downloads mesmo em modo standalone);
  // caso contrário, usamos o link de download clássico.
  // ------------------------------------------------------------------
  async function saveOrShareFile(blob, filename, mimeType) {
    try {
      const file = new File([blob], filename, { type: mimeType });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title: filename });
        return true;
      }
    } catch (err) {
      if (err && err.name === "AbortError") return false; // utilizador cancelou a partilha
      // qualquer outro erro na partilha: tenta na mesma o download clássico abaixo
    }
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    return true;
  }

  document.getElementById("exportBtn").addEventListener("click", async () => {
    const blob = new Blob([JSON.stringify(STATE, null, 2)], { type: "application/json" });
    await saveOrShareFile(blob, "animakids-state.json", "application/json");
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

  async function exportPresencasExcel() {
    if (typeof XLSX === "undefined") { toast("Biblioteca de Excel não carregou. Verifica a ligação à internet."); return; }
    if (Object.keys(DIR.roster).length === 0) {
      toast("Aviso: sem nomes reais carregados — o Excel vai sair com códigos (Atleta A01…). Preenche os nomes em Mais → Nomes reais.");
    }
    const wb = XLSX.utils.book_new();

    // One set of sheets per classe (AnimaKids, MoveKids, ...), prefixadas
    // para nunca colidir nomes de folha entre classes no mesmo mês.
    const usedPrefixes = new Set();
    getClasses().forEach((cls) => {
      let prefix = cls.key.slice(0, 2).toUpperCase();
      for (let n = 2; usedPrefixes.has(prefix); n++) prefix = cls.key.slice(0, 1).toUpperCase() + n;
      usedPrefixes.add(prefix);
      const monthMap = {};
      cls.periods.forEach((p) => p.sessions.forEach((s) => {
        const d = new Date(s.date + "T00:00:00");
        const key = d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0");
        if (!monthMap[key]) monthMap[key] = { year: d.getFullYear(), month: d.getMonth(), periodId: p.id, dates: [] };
        monthMap[key].dates.push(s.date);
      }));

      Object.keys(monthMap).sort().forEach((key) => {
        const info = monthMap[key];
        const daysInMonth = new Date(info.year, info.month + 1, 0).getDate();
        const trainingDatesSet = new Set(info.dates);
        const sheetName = (prefix + "-" + MESES_ABR[info.month] + String(info.year).slice(2)).slice(0, 31);

        const aoa = [];
        aoa.push([cls.label + " — Presenças"]);
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

        cls.athletes.forEach((athlete, idx) => {
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

        cls.athletes.forEach((athlete, idx) => {
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
    });

    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([wbout], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    const ok = await saveOrShareFile(blob, "Presencas_AnimaKids.xlsx", blob.type);
    if (ok) toast("Excel de presenças exportado.");
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
  let progAtletaSel = animaAthletes()[0];
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

    const anima = animaAthletes();
    if (!anima.includes(progAtletaSel)) progAtletaSel = anima[0];

    if (progMode === "atleta") {
      atletaPicker.innerHTML = anima.map((a) => `
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
      content.innerHTML = anima.map((a) => progCardHtml(a, obj, "objetivo")).join("");
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
    host.innerHTML = animaAthletes().map((a) => {
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

  // Preserve scroll position across re-renders triggered by a tap inside
  // a view. Presenças (and now Totais) fully replace their list's
  // innerHTML on every tap; the clicked button gets removed from the DOM
  // and re-created, and some browsers respond by moving focus back to
  // <body> and auto-scrolling the page to the top. We save the scroll
  // position beforehand and restore it right after (and again on the
  // next frame, to win against that auto-scroll).
  function withScrollPreserved(fn) {
    const mainEl = document.getElementById("appMain");
    const y = window.scrollY;
    const mainY = mainEl ? mainEl.scrollTop : 0;
    fn();
    window.scrollTo(0, y);
    if (mainEl) mainEl.scrollTop = mainY;
    requestAnimationFrame(() => {
      window.scrollTo(0, y);
      if (mainEl) mainEl.scrollTop = mainY;
    });
  }

  function findNextSessionRef(periods, periodIdFilter) {
    const today = todayIso();
    let flat = [];
    periods.forEach((p) => {
      if (periodIdFilter && p.id !== periodIdFilter) return;
      p.sessions.forEach((s) => flat.push({ periodId: p.id, date: s.date }));
    });
    flat.sort((a, b) => a.date.localeCompare(b.date));
    return flat.find((s) => s.date >= today) || flat[flat.length - 1];
  }

  function classAllSessionsFlat(cls) {
    let flat = [];
    cls.periods.forEach((p) => p.sessions.forEach((s) => flat.push({ periodId: p.id, date: s.date })));
    flat.sort((a, b) => a.date.localeCompare(b.date));
    return flat;
  }

  // Has any attendance been recorded, for any athlete of this class, on
  // this session? Used as the "done" checkmark for classes without a
  // Plano de Treino (e.g. MoveKids) to mirror in AnimaKids.
  function sessionHasAttendance(cls, periodId, dateIso) {
    return cls.athletes.some((a) => !!getAttendance(periodId, dateIso, a));
  }

  // How many of the most recent *recorded* sessions in a row (up to
  // today, across all periods of the class) this athlete has NOT been
  // marked "Presente" in. Sessions with no attendance taken yet are
  // skipped (we simply don't know), and the streak stops as soon as a
  // "Presente" is found going backwards in time.
  function attendanceGap(cls, athlete) {
    const today = todayIso();
    const flat = classAllSessionsFlat(cls).filter((s) => s.date <= today);
    let streak = 0;
    for (let i = flat.length - 1; i >= 0; i--) {
      const val = getAttendance(flat[i].periodId, flat[i].date, athlete);
      if (!val) continue;
      if (val === "Presente") break;
      streak++;
    }
    return { streak };
  }

  function attendanceWarnHtml(cls, athlete) {
    const gap = attendanceGap(cls, athlete);
    return gap.streak > 4
      ? `<div class="att-warn"><i class="bi bi-exclamation-triangle-fill"></i> não vem há ${gap.streak} treinos</div>`
      : "";
  }

  let presClassKey = "animakids";
  let presMode = "marcar"; // marcar | totais
  const presSelByClass = {}; // { [classKey]: { periodId, dateIso } }

  // Seleção por classe: por defeito abre no próximo treino (ou no último,
  // se a época dessa classe já acabou). Revalida se as datas mudarem.
  function ensureSel(cls) {
    let sel = presSelByClass[cls.key];
    const valid = sel && cls.periods.some((p) => p.id === sel.periodId && p.sessions.some((s) => s.date === sel.dateIso));
    if (!valid) {
      const next = findNextSessionRef(cls.periods, null);
      sel = next
        ? { periodId: next.periodId, dateIso: next.date }
        : (cls.periods[0] ? { periodId: cls.periods[0].id, dateIso: cls.periods[0].sessions[0].date } : null);
      presSelByClass[cls.key] = sel;
    }
    return sel;
  }

  function renderPresencas() {
    const cls = presClass(presClassKey);
    presClassKey = cls.key;
    const sel = ensureSel(cls);

    const classTabsHost = document.getElementById("presencasClassTabs");
    classTabsHost.innerHTML = getClasses().map((c) => `
      <button type="button" class="btn btn-outline-secondary ${c.key === presClassKey ? "active" : ""}" data-class="${c.key}">${escapeHtml(c.label)}</button>
    `).join("");
    classTabsHost.querySelectorAll("button").forEach((b) => {
      b.addEventListener("click", () => {
        if (b.dataset.class === presClassKey) return;
        withScrollPreserved(() => { presClassKey = b.dataset.class; renderPresencas(); });
      });
    });

    const modeTabsHost = document.getElementById("presencasModeTabs");
    modeTabsHost.innerHTML = `
      <button type="button" class="btn btn-outline-secondary ${presMode === "marcar" ? "active" : ""}" data-mode="marcar">Marcar presenças</button>
      <button type="button" class="btn btn-outline-secondary ${presMode === "totais" ? "active" : ""}" data-mode="totais">Total</button>
    `;
    modeTabsHost.querySelectorAll("button").forEach((b) => {
      b.addEventListener("click", () => {
        if (b.dataset.mode === presMode) return;
        withScrollPreserved(() => { presMode = b.dataset.mode; renderPresencas(); });
      });
    });

    document.getElementById("presencasMarcarSection").classList.toggle("d-none", presMode !== "marcar");
    document.getElementById("presencasTotaisSection").classList.toggle("d-none", presMode !== "totais");

    if (presMode === "marcar" && !sel) {
      document.getElementById("presencasPeriodTabs").innerHTML = "";
      document.getElementById("presencasDatePicker").innerHTML = "";
      document.getElementById("presencasTreinoBadge").hidden = true;
      document.getElementById("presencasList").innerHTML = emptyState("Esta classe ainda não tem treinos.");
      document.getElementById("presencasSummary").innerHTML = "";
    } else if (presMode === "marcar") renderPresencasMarcar(cls, sel);
    else renderPresencasTotais(cls);
  }

  function renderPresencasMarcar(cls, sel) {
    const host = document.getElementById("presencasPeriodTabs");
    host.innerHTML = cls.periods.map((p) => `
      <button type="button" class="btn btn-outline-secondary ${p.id === sel.periodId ? "active" : ""}" data-period="${p.id}">${escapeHtml(p.label)}</button>
    `).join("");
    host.querySelectorAll("button").forEach((b) => {
      b.addEventListener("click", () => {
        withScrollPreserved(() => {
          sel.periodId = b.dataset.period;
          const next = findNextSessionRef(cls.periods, sel.periodId);
          sel.dateIso = next ? next.date : cls.periods.find((p) => p.id === sel.periodId).sessions[0].date;
          renderPresencas();
        });
      });
    });

    const period = cls.periods.find((p) => p.id === sel.periodId);
    const datePicker = document.getElementById("presencasDatePicker");
    datePicker.innerHTML = period.sessions.map((s) => {
      const done = cls.hasPlano ? getCompleted(period.id, s.date) : sessionHasAttendance(cls, period.id, s.date);
      return `<button type="button" class="picker-chip ${s.date === sel.dateIso ? "active" : ""}" data-date="${s.date}">${done ? "✅ " : ""}${fmtDateShort(s.date)}</button>`;
    }).join("");
    datePicker.querySelectorAll(".picker-chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        withScrollPreserved(() => { sel.dateIso = chip.dataset.date; renderPresencas(); });
      });
    });
    const activeChip = datePicker.querySelector(".picker-chip.active");
    if (activeChip) activeChip.scrollIntoView({ inline: "center", block: "nearest" });

    const badge = document.getElementById("presencasTreinoBadge");
    if (cls.hasPlano) {
      const isDone = getCompleted(sel.periodId, sel.dateIso);
      badge.hidden = false;
      badge.className = "treino-badge " + (isDone ? "done" : "pending");
      badge.innerHTML = isDone
        ? `<i class="bi bi-check-circle-fill"></i> Este treino já foi marcado como realizado no Plano.`
        : `<i class="bi bi-clock-history"></i> Este treino ainda não foi marcado como realizado. Podes marcá-lo na vista Plano.`;
    } else {
      badge.hidden = true;
      badge.innerHTML = "";
    }

    const list = document.getElementById("presencasList");
    list.innerHTML = cls.athletes.map((a) => {
      const val = getAttendance(sel.periodId, sel.dateIso, a);
      return `
        <div class="attendance-row" data-athlete="${escapeHtml(a)}">
          <div class="att-name-col">
            <span class="att-name">${escapeHtml(displayName(a))}</span>
            ${attendanceWarnHtml(cls, a)}
          </div>
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
          withScrollPreserved(() => {
            setAttendance(sel.periodId, sel.dateIso, athlete, btn.dataset.val);
            renderPresencas();
          });
        });
      });
    });

    let p = 0, j = 0, f = 0;
    cls.athletes.forEach((a) => {
      const val = getAttendance(sel.periodId, sel.dateIso, a);
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

  // "Total" — para todas as crianças da classe atual, a soma de
  // presenças, faltas e justificações já registadas em toda a época
  // (todos os períodos), mais o aviso de quem não vem há mais de 4
  // treinos.
  function renderPresencasTotais(cls) {
    const flat = classAllSessionsFlat(cls);
    const host = document.getElementById("presencasTotaisList");
    host.innerHTML = cls.athletes.map((a) => {
      let p = 0, j = 0, f = 0;
      flat.forEach((s) => {
        const val = getAttendance(s.periodId, s.date, a);
        if (val === "Presente") p++;
        else if (val === "Justificou") j++;
        else if (val === "Faltou") f++;
      });
      return `
        <div class="attendance-row totals-row">
          <div class="att-name-col">
            <span class="att-name">${escapeHtml(displayName(a))}</span>
            ${attendanceWarnHtml(cls, a)}
          </div>
          <div class="totals-counts">
            <span class="totals-count p">✅ ${p}</span>
            <span class="totals-count j">📋 ${j}</span>
            <span class="totals-count f">❌ ${f}</span>
          </div>
        </div>
      `;
    }).join("") || emptyState("Sem atletas nesta classe.");
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
