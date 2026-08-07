// Auto-gerado pelo GitHub Actions — nao editar manualmente
const PIPELINE_STATUS = {
  "parking": { "status": "ok", "last_run": null, "duration": "4m 56s", "inserts": null, "error": null, "history": [{"date": "2026-08-06", "status": "ok"}], "last_log": [] },
  "dl": { "status": "ok", "last_run": null, "duration": "25m 10s", "inserts": "25744", "error": null, "history": [{"date": "2026-08-06", "status": "fail"}], "last_log": [] },
  "onepage": { "status": "ok", "last_run": null, "duration": "16m 35s", "inserts": "2088", "error": null, "history": [{"date": "2026-08-06", "status": "ok"}], "last_log": [] },
  "logpbi": { "status": "ok", "last_run": null, "duration": "0m 21s", "inserts": "2139", "error": null, "history": [{"date": "2026-08-06", "status": "ok"}], "last_log": [] },
  "dl_noi": { "status": "ok", "last_run": null, "duration": "1m 53s", "inserts": null, "error": null, "history": [{"date": "2026-08-06", "status": "ok"}], "last_log": [] },
  "energia": { "status": "neutral", "last_run": null, "duration": null, "inserts": null, "error": null, "history": [{"date": "2026-08-06", "status": "neutral"}], "last_log": [] },
  "svc_gaps": { "status": "neutral", "last_run": null, "duration": null, "inserts": null, "error": null, "history": [], "last_log": [] },
  "svc_monitor": { "status": "neutral", "last_run": null, "duration": null, "inserts": null, "error": null, "history": [], "last_log": [] },
  "intel": { "status": "neutral", "last_run": null, "duration": null, "inserts": null, "error": "Execução mensal", "history": [], "last_log": [] },
  "mixlojas": { "status": "neutral", "last_run": null, "duration": null, "inserts": null, "error": "Execução manual", "history": [], "last_log": [] },
};

const SERVER_STATUS = {
  "hostname": "vm-database-01",
  "os": "Ubuntu 24.04.4 LTS",
  "kernel": "6.17.0-1008-azure",
  "cpu_pct": 28.6,
  "ram_used_gb": 13.8,
  "ram_total_gb": 15.6,
  "ram_pct": 88.9,
  "load1": "0.08",
  "load5": "0.06",
  "load15": "0.03",
  "uptime": "140d 23h 18m",
  "proc_count": 211,
  "services": [{"id": "mssql", "label": "SQL Server :1433", "running": true}, {"id": "webhook", "label": "Webhook :9000", "running": true}, {"id": "cronlog", "label": "CronLog :5000", "running": true}, {"id": "runner_dl", "label": "Runner DataLake", "running": false}, {"id": "runner_e", "label": "Runner Energia", "running": false}, {"id": "runner_i", "label": "Runner Inteligência", "running": true}, {"id": "runner_p", "label": "Runner Parking", "running": false}, {"id": "prometheus", "label": "Prometheus", "running": true}],
  "top_mem": [{"user": "mssql", "pid": "1811722", "cpu": "11.9", "mem": "20.0", "rss_mb": 3203.3, "cmd": "/opt/mssql/bin/sqlservr"}, {"user": "viniciu+", "pid": "1811609", "cpu": "0.0", "mem": "0.5", "rss_mb": 90.9, "cmd": "/home/runners/runner_Energia/bin/Runner.Listener run --start"}, {"user": "viniciu+", "pid": "1811934", "cpu": "0.0", "mem": "0.4", "rss_mb": 78.7, "cmd": "/home/runners/runner_Inteligencia/bin/Runner.Listener run --"}, {"user": "root", "pid": "1811549", "cpu": "0.0", "mem": "0.4", "rss_mb": 73.9, "cmd": "/usr/lib/systemd/systemd-journald"}, {"user": "matheus", "pid": "1811895", "cpu": "0.0", "mem": "0.4", "rss_mb": 71.5, "cmd": "/home/matheus/actions-runner/bin/Runner.Listener run --start"}, {"user": "root", "pid": "1820247", "cpu": "0.0", "mem": "0.3", "rss_mb": 61.0, "cmd": "/usr/libexec/fwupd/fwupd"}, {"user": "prometh+", "pid": "739560", "cpu": "0.1", "mem": "0.2", "rss_mb": 43.5, "cmd": "/usr/local/bin/prometheus --config.file=/etc/prometheus/prom"}, {"user": "root", "pid": "1811664", "cpu": "0.0", "mem": "0.2", "rss_mb": 35.0, "cmd": "/usr/bin/python3 -u bin/WALinuxAgent-2.15.2.1-py3.12.egg -ru"}, {"user": "root", "pid": "929960", "cpu": "0.3", "mem": "0.1", "rss_mb": 26.8, "cmd": "/usr/bin/dockerd -H fd:// --containerd=/run/containerd/conta"}, {"user": "root", "pid": "1232657", "cpu": "0.0", "mem": "0.1", "rss_mb": 25.7, "cmd": "/sbin/multipathd -d -s"}],
  "disk": [{"mount": "/", "size": "61G", "used": "54G", "avail": "7.8G", "pct": 88, "level": "critical"}, {"mount": "/mssql/log", "size": "64G", "used": "48G", "avail": "17G", "pct": 75, "level": "warn"}, {"mount": "/mssql/data", "size": "256G", "used": "113G", "avail": "144G", "pct": 45, "level": "ok"}]
};

const STATUS_UPDATED_AT = "06/08/2026 21:15 BRT";

const DISK_STATUS = [{"mount": "/", "size": "61G", "used": "54G", "avail": "7.8G", "pct": 88, "level": "critical"}, {"mount": "/mssql/log", "size": "64G", "used": "48G", "avail": "17G", "pct": 75, "level": "warn"}, {"mount": "/mssql/data", "size": "256G", "used": "113G", "avail": "144G", "pct": 45, "level": "ok"}];

