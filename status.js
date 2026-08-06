// Auto-gerado pelo GitHub Actions — nao editar manualmente
const PIPELINE_STATUS = {
  "parking": { "status": "ok", "last_run": "2026-08-06 08:04", "duration": "5m 29s", "inserts": null, "error": null, "history": [{"date": "2026-08-05", "status": "ok"}], "last_log": ["2026-08-06 08:02:18,546 - INFO - ==========================================================================================", "2026-08-06 08:02:18,546 - INFO - [SQL] GOLD_SAIDAS_SP3", "2026-08-06 08:02:18,546 - INFO - ==========================================================================================", "2026-08-06 08:02:18,546 - INFO - Procedure: gold.carga_saidas_diaria_wps", "2026-08-06 08:04:03,626 - INFO - [GOLD] GOLD_SAIDAS_SP3 | OK | 105.08s", "2026-08-06 08:04:03,626 - INFO - ", "2026-08-06 08:04:03,626 - INFO - ==========================================================================================", "2026-08-06 08:04:03,626 - INFO - [SQL] GOLD_PAGANTES_WPS", "2026-08-06 08:04:03,626 - INFO - ==========================================================================================", "2026-08-06 08:04:03,626 - INFO - Procedure: gold.sp_carga_fluxo_pagantes_wps", "2026-08-06 08:04:58,780 - INFO - [GOLD] GOLD_PAGANTES_WPS | OK | 55.15s", "2026-08-06 08:04:58,780 - INFO - ", "2026-08-06 08:04:58,780 - INFO - ==========================================================================================", "2026-08-06 08:04:58,780 - INFO - ETAPA 3 — GOLD CONCLUÍDA", "2026-08-06 08:04:58,780 - INFO - ==========================================================================================", "2026-08-06 08:04:58,780 - INFO - ", "2026-08-06 08:04:58,780 - INFO - ==========================================================================================", "2026-08-06 08:04:58,780 - INFO - ✅ PIPELINE FINALIZADO COM SUCESSO", "2026-08-06 08:04:58,780 - INFO - ==========================================================================================", "2026-08-06 08:04:58,797 - INFO - Execução registrada: /home/Parking_Flow/Estacionamento/Orquestrador/logs/pipeline_executions.json"] },
  "dl": { "status": "ok", "last_run": null, "duration": "25m 51s", "inserts": "24935", "error": null, "history": [{"date": "2026-08-05", "status": "fail"}], "last_log": [] },
  "onepage": { "status": "ok", "last_run": null, "duration": "16m 46s", "inserts": "2088", "error": null, "history": [{"date": "2026-08-05", "status": "ok"}], "last_log": [] },
  "logpbi": { "status": "ok", "last_run": null, "duration": "0m 19s", "inserts": "138", "error": null, "history": [{"date": "2026-08-05", "status": "ok"}], "last_log": [] },
  "dl_noi": { "status": "ok", "last_run": null, "duration": "1m 58s", "inserts": null, "error": null, "history": [{"date": "2026-08-05", "status": "ok"}], "last_log": [] },
  "energia": { "status": "ok", "last_run": "2026-08-06 06:00", "duration": null, "inserts": "1136", "error": null, "history": [{"date": "2026-08-05", "status": "neutral"}], "last_log": ["2026-08-06 06:00:01,843  INFO      Iniciando INCREMENTAL — 2026-08-03 -> 2026-08-05", "2026-08-06 06:00:02,483  INFO      Token obtido", "2026-08-06 06:00:07,826  INFO      1136 pontos recebidos — PONTA: 192 | FORA_PONTA: 944", "2026-08-06 06:00:08,400  INFO      Concluido — 1136 pontos | 1136 linhas afetadas"] },
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
  "ram_used_gb": 14.4,
  "ram_total_gb": 15.6,
  "ram_pct": 92.3,
  "load1": "0.16",
  "load5": "0.17",
  "load15": "0.27",
  "uptime": "140d 7h 18m",
  "proc_count": 209,
  "services": [{"id": "mssql", "label": "SQL Server :1433", "running": true}, {"id": "webhook", "label": "Webhook :9000", "running": true}, {"id": "cronlog", "label": "CronLog :5000", "running": true}, {"id": "runner_dl", "label": "Runner DataLake", "running": false}, {"id": "runner_e", "label": "Runner Energia", "running": false}, {"id": "runner_i", "label": "Runner Inteligência", "running": true}, {"id": "runner_p", "label": "Runner Parking", "running": false}, {"id": "prometheus", "label": "Prometheus", "running": true}],
  "top_mem": [{"user": "mssql", "pid": "1811722", "cpu": "12.5", "mem": "23.4", "rss_mb": 3744.4, "cmd": "/opt/mssql/bin/sqlservr"}, {"user": "matheus", "pid": "1811895", "cpu": "0.0", "mem": "0.4", "rss_mb": 76.1, "cmd": "/home/matheus/actions-runner/bin/Runner.Listener run --start"}, {"user": "viniciu+", "pid": "1811609", "cpu": "0.0", "mem": "0.4", "rss_mb": 75.4, "cmd": "/home/runners/runner_Energia/bin/Runner.Listener run --start"}, {"user": "viniciu+", "pid": "1811934", "cpu": "0.0", "mem": "0.4", "rss_mb": 65.0, "cmd": "/home/runners/runner_Inteligencia/bin/Runner.Listener run --"}, {"user": "root", "pid": "1820247", "cpu": "0.0", "mem": "0.3", "rss_mb": 61.5, "cmd": "/usr/libexec/fwupd/fwupd"}, {"user": "root", "pid": "1811549", "cpu": "0.0", "mem": "0.3", "rss_mb": 60.8, "cmd": "/usr/lib/systemd/systemd-journald"}, {"user": "prometh+", "pid": "739560", "cpu": "0.1", "mem": "0.3", "rss_mb": 48.5, "cmd": "/usr/local/bin/prometheus --config.file=/etc/prometheus/prom"}, {"user": "root", "pid": "1811664", "cpu": "0.0", "mem": "0.2", "rss_mb": 34.7, "cmd": "/usr/bin/python3 -u bin/WALinuxAgent-2.15.2.1-py3.12.egg -ru"}, {"user": "root", "pid": "929960", "cpu": "0.3", "mem": "0.2", "rss_mb": 32.3, "cmd": "/usr/bin/dockerd -H fd:// --containerd=/run/containerd/conta"}, {"user": "root", "pid": "1232657", "cpu": "0.0", "mem": "0.1", "rss_mb": 25.7, "cmd": "/sbin/multipathd -d -s"}],
  "disk": [{"mount": "/", "size": "61G", "used": "54G", "avail": "7.8G", "pct": 88, "level": "critical"}, {"mount": "/mssql/log", "size": "64G", "used": "48G", "avail": "17G", "pct": 74, "level": "warn"}, {"mount": "/mssql/data", "size": "256G", "used": "113G", "avail": "144G", "pct": 45, "level": "ok"}]
};

const STATUS_UPDATED_AT = "06/08/2026 05:15 BRT";

const DISK_STATUS = [{"mount": "/", "size": "61G", "used": "54G", "avail": "7.8G", "pct": 88, "level": "critical"}, {"mount": "/mssql/log", "size": "64G", "used": "48G", "avail": "17G", "pct": 74, "level": "warn"}, {"mount": "/mssql/data", "size": "256G", "used": "113G", "avail": "144G", "pct": 45, "level": "ok"}];

