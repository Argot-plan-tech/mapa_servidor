// Auto-gerado por update_status.ps1 — nao editar manualmente
const PIPELINE_STATUS = {
  "parking":     { "status": "ok",      "last_run": "2026-07-10 08:04", "duration": "4m 52s",  "inserts": null,    "error": null, "history": [], "last_log": [] },
  "dl":          { "status": "ok",      "last_run": "2026-07-10 07:20", "duration": "20m 38s", "inserts": "23832", "error": null, "history": [], "last_log": [] },
  "onepage":     { "status": "ok",      "last_run": "2026-07-10 09:44", "duration": "44m 26s", "inserts": "2088",  "error": null, "history": [], "last_log": [] },
  "logpbi":      { "status": "ok",      "last_run": "2026-07-10 10:00", "duration": "19s",      "inserts": "211",   "error": null, "history": [], "last_log": [] },
  "dl_noi":      { "status": "ok",      "last_run": null,               "duration": "2m 24s",  "inserts": null,    "error": null, "history": [], "last_log": [] },
  "energia":     { "status": "ok",      "last_run": "2026-07-10 06:00", "duration": null,       "inserts": "1280",  "error": null, "history": [], "last_log": [] },
  "svc_gaps":    { "status": "ok",      "last_run": "2026-07-10 08:30", "duration": null,       "inserts": null,    "error": null, "history": [], "last_log": [] },
  "svc_monitor": { "status": "ok",      "last_run": "2026-07-10 11:30", "duration": null,       "inserts": null,    "error": null, "history": [], "last_log": [] },
  "intel":       { "status": "neutral", "last_run": null,               "duration": null,       "inserts": null,    "error": "Execução mensal", "history": [], "last_log": [] },
  "mixlojas":    { "status": "neutral", "last_run": null,               "duration": null,       "inserts": null,    "error": "Execução manual", "history": [], "last_log": [] },
};
const SERVER_STATUS = {
  "hostname": "vm-database-01", "os": "Ubuntu 24.04.4 LTS", "kernel": "6.8.0-1021-azure",
  "cpu_pct": 2.3,
  "ram_used_gb": 14.5, "ram_total_gb": 15.6, "ram_pct": 92.9,
  "load1": "0.04", "load5": "0.04", "load15": "0.06",
  "uptime": "113d 18h 42m", "proc_count": 127,
  "services": [
    { "id": "mssql",     "label": "SQL Server :1433",      "running": true },
    { "id": "webhook",   "label": "Webhook :9000",          "running": true },
    { "id": "cronlog",   "label": "CronLog :5000",          "running": true },
    { "id": "runner_dl", "label": "Runner DataLake",        "running": true },
    { "id": "runner_e",  "label": "Runner Energia",         "running": true },
    { "id": "runner_i",  "label": "Runner Inteligência",    "running": true },
    { "id": "runner_p",  "label": "Runner Parking",         "running": true },
    { "id": "prometheus","label": "Prometheus",             "running": true }
  ]
};
const DISK_STATUS = [
  { "mount": "/",           "size": "61G",  "used": "32G",  "avail": "30G",  "pct": 52, "level": "ok"   },
  { "mount": "/mssql/log",  "size": "64G",  "used": "47G",  "avail": "18G",  "pct": 73, "level": "warn" },
  { "mount": "/mssql/data", "size": "256G", "used": "112G", "avail": "145G", "pct": 44, "level": "ok"   }
];
const STATUS_UPDATED_AT = "10/07/2026 15:30 BRT";
