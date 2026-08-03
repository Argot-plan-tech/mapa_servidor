// =============================================================================
// MAPA DO SERVIDOR — DATA.JS
// =============================================================================

const LOGIN_PWD = 'argoplan';   // altere aqui para mudar a senha
const API_URL   = '';           // deixe vazio para detectar automaticamente
                                // ou coloque ex: 'https://mapa-servidor.up.railway.app'

const NODES = [

  // ── PIPELINES ──────────────────────────────────────────────────────────────

  {
    id: "dl", label: "DataLake\nGroup", group: "pipeline", status: "neutral",
    cron: "04:00 BRT (07:00 UTC) — diário", cron_hour: 4, duration_min: 45,
    path: "/home/DataLake_Group",
    description: "Pipeline principal de dados comerciais do grupo. Coleta vendas, contratos, lojas, faturamento e orçamento de um SQL Server de origem e transforma em Bronze → Silver → Gold no banco DataLake.",
    source_db: "SQL Server — origem (BI_AuditoriaVendas, BI_ContratosLocacao...)",
    target_db: "DataLake",
    tables_read: [
      { table: "BI_AuditoriaVendas",   key: "cod_loja, data_venda",    load: "incremental", cols: ["cod_loja","data_venda","valor_venda","qtd_cupons","tipo_venda"] },
      { table: "BI_ContratosLocacao",  key: "id_contrato",             load: "incremental", cols: ["id_contrato","cod_loja","dt_inicio","dt_fim","valor_aluguel","tipo_contrato"] },
      { table: "BI_Lojas",             key: "cod_loja",                load: "full",        cols: ["cod_loja","nome_loja","cod_shopping","segmento","categoria","status"] },
      { table: "BI_Classe",            key: "cod_classe",              load: "full",        cols: ["cod_classe","descricao","grupo"] },
      { table: "BI_Faturamento",       key: "cod_loja, competencia",   load: "incremental", cols: ["cod_loja","competencia","valor_bruto","valor_liquido","tipo"] },
      { table: "BI_ReceitaLiquidada",  key: "cod_loja, competencia",   load: "incremental", cols: ["cod_loja","competencia","receita_liquidada","inadimplencia"] },
      { table: "dbo.BI_Nivel1",        key: "cod_nivel1",              load: "incremental", cols: ["cod_nivel1","descricao","cod_shopping"] },
      { table: "dbo.BI_Orcamento",     key: "cod_loja, competencia",   load: "incremental", cols: ["cod_loja","competencia","orcamento","revisao"] },
      { table: "dbo.BI_CentroCusto",   key: "cod_cc",                  load: "incremental", cols: ["cod_cc","descricao","cod_shopping","tipo"] },
    ],
    tables_written: [
      { table: "bronze.BI_AuditoriaVendas",       key: "cod_loja, data_venda",   load: "incremental", cols: ["cod_loja","data_venda","valor_venda","qtd_cupons","tipo_venda","dt_carga"] },
      { table: "bronze.BI_ContratosLocacao",      key: "id_contrato",            load: "incremental", cols: ["id_contrato","cod_loja","dt_inicio","dt_fim","valor_aluguel","tipo_contrato","dt_carga"] },
      { table: "bronze.BI_Lojas",                 key: "cod_loja",               load: "full",        cols: ["cod_loja","nome_loja","cod_shopping","segmento","categoria","status","dt_carga"] },
      { table: "Bronze.BI_Classes",               key: "cod_classe",             load: "full",        cols: ["cod_classe","descricao","grupo","dt_carga"] },
      { table: "bronze.BI_Faturamento_Group",     key: "cod_loja, competencia",  load: "incremental", cols: ["cod_loja","competencia","valor_bruto","valor_liquido","tipo","dt_carga"] },
      { table: "bronze.BI_ReceitaLiquidada_Group",key: "cod_loja, competencia",  load: "incremental", cols: ["cod_loja","competencia","receita_liquidada","inadimplencia","dt_carga"] },
      { table: "bronze.BI_Nivel1",                key: "cod_nivel1",             load: "incremental", cols: ["cod_nivel1","descricao","cod_shopping","dt_carga"] },
      { table: "bronze.BI_Orcamento",             key: "cod_loja, competencia",  load: "incremental", cols: ["cod_loja","competencia","orcamento","revisao","dt_carga"] },
      { table: "bronze.BI_CentroCusto",           key: "cod_cc",                 load: "incremental", cols: ["cod_cc","descricao","cod_shopping","tipo","dt_carga"] },
      { table: "log_control.pipeline_contagens",  key: "id (identity)",          load: "append",      cols: ["id","dt_execucao","script","tabela_origem","tabela_destino","qtd_origem_antes","qtd_destino_antes","qtd_origem_depois","qtd_destino_depois","diferenca","duracao_segundos","status"] },
    ],
    procedures: [
      "silver.stContratosSilver        — transforma contratos bronze → silver",
      "silver.stVendasSilver           — transforma vendas bronze → silver",
      "silver.stLojasSilver            — transforma lojas bronze → silver",
      "silver.stFaturamento            — transforma faturamento bronze → silver",
      "Silver.stReceitaLiquidada       — transforma receita liquidada bronze → silver",
      "gold.atualizar_vendas_sss       — materializa vendas SSS (Same Store Sales)",
      "gold.atualizar_vendas_sss_ytd   — materializa vendas SSS ano até a data",
      "Gold.stFaturamentoMensalShopping_FullLoad — faturamento mensal por shopping",
      "Gold.stFaturamentoMensalLoja_FullLoad     — faturamento mensal por loja",
      "gold.atualizar_vendas_mensal_loja         — vendas mensais por loja",
      "gold.atualizar_vendas_mensal_shopping     — vendas mensais por shopping",
      "Gold.stReceitaLiquidadaMensalShopping_FullLoad",
      "Gold.stReceitaLiquidadaMensalLoja_FullLoad",
      "gold.stInadimplenciaMensalShopping_FullLoad",
      "gold.usp_Load_CustoOcupacaoMensalLojas",
      "gold.sp_materializar_kpis_shopping — KPIs consolidados por shopping",
    ],
    scripts: [
      "Orquestrador/orquestrador_linux.py",
      "bronze_linux/bronze_vendas.py",
      "bronze_linux/bronze_lojas.py",
      "bronze_linux/bronze_contratos.py",
      "bronze_linux/bronze_classes.py",
      "bronze_linux/bronze_faturamento.py",
      "bronze_linux/bronze_receitaLiquidada.py",
      "bronze_linux/bronze_bi_nivel1.py",
      "bronze_linux/bronze_bi_orcamento.py",
      "bronze_linux/bronze_bi_centrocusto.py",
      "bronze_linux/FullLoad/bronze_bi_nivel1_fullload.py",
      "bronze_linux/FullLoad/bronze_bi_orcamento_fullload.py",
      "bronze_linux/FullLoad/bronze_bi_centrocusto_fullload.py",
    ],
    script_details: [
      {
        name: "orquestrador_linux.py",
        steps: [
          "1. Carrega .env (credenciais SQL_CONN e SQL_CONN_SOURCE)",
          "2. Cria tabela log_control.pipeline_contagens se não existir",
          "3. GRUPO A paralelo (3 workers): bronze_vendas + bronze_lojas ao mesmo tempo",
          "4. GRUPO A serial: bronze_classes e bronze_contratos (serial p/ evitar deadlock)",
          "5. GRUPO B serial: bronze_faturamento e bronze_receitaLiquidada",
          "6. GRUPO C incremental: bronze_bi_nivel1, bronze_bi_orcamento, bronze_bi_centrocusto",
          "7. Se domingo (weekday==6): Full Load dos 3 scripts BI_*",
          "8. SILVER: executa 5 stored procedures sequencialmente",
          "9. GOLD: executa 11 stored procedures sequencialmente",
          "10. Envia e-mail com contagem de registros por tabela (antes/depois/diff)",
          "Retry automático (3x) em erros de conexão TCP (SQLSTATE 08S01, 10054, 10060)",
        ],
      },
      {
        name: "bronze_vendas.py / bronze_*.py (padrão)",
        steps: [
          "1. Conecta no banco SOURCE via pyodbc (SQL_CONN_SOURCE do .env)",
          "2. Conecta no banco TARGET (DataLake) via pyodbc (SQL_CONN do .env)",
          "3. Busca última data carregada no destino (MAX(data_venda))",
          "4. Lê registros novos/alterados da origem desde a última data",
          "5. Faz DELETE + INSERT incremental no bronze destino",
          "6. Registra contagem em log_control.pipeline_contagens",
        ],
      },
      {
        name: "bronze_linux/FullLoad/*.py (domingos)",
        steps: [
          "1. TRUNCATE na tabela bronze destino",
          "2. SELECT * completo da tabela de origem",
          "3. INSERT em lotes (batch) no bronze",
          "4. Recarga total para garantir integridade semanal",
        ],
      },
    ],
    notes: "Retry automático 3x em erros de conexão TCP. FullLoad dos scripts BI_ apenas aos domingos. E-mail de status com contagem registros antes/depois/diff enviado ao final para lista do .env.",
  },

  {
    id: "dl_noi", label: "DataLake\nNOI", group: "pipeline", status: "neutral",
    cron: "20:00 BRT (23:00 UTC) — diário", cron_hour: 20, duration_min: 20,
    path: "/home/DataLake_Group",
    description: "Pipeline noturno de Net Operating Income (NOI). Carrega dados financeiros de NOI para o DataLake após fechamento do dia.",
    source_db: "SQL Server — origem",
    target_db: "DataLake",
    tables_written: [
      { table: "bronze.NOI / silver.NOI / gold.NOI", key: "competencia, cod_shopping", load: "incremental", cols: ["competencia","cod_shopping","receita_bruta","despesas_op","noi","noi_pct"] },
    ],
    scripts: ["orquestrador_NOI.py — orquestra pipeline de NOI"],
    script_details: [
      { name: "orquestrador_NOI.py", steps: ["1. Carrega .env", "2. Executa scripts bronze NOI sequencialmente", "3. Loga resultado em orchestrator_NOI_YYYYMMDD.log"] },
    ],
  },

  {
    id: "parking", label: "Parking\nFlow", group: "pipeline", status: "neutral",
    cron: "05:00 BRT (08:00 UTC) — diário", cron_hour: 5, duration_min: 60,
    path: "/home/Parking_Flow/Estacionamento",
    description: "Pipeline completo de estacionamento (WPS). Coleta saídas, entradas, pagamentos, carências, validações e selos de 13 shoppings. Também processa clima para correlação com fluxo.",
    source_db: "WPS — API/DB dos shoppings por shopping",
    target_db: "Parking_Flow  |  Dimensao (clima)",
    tables_read: [
      { table: "WPS — saídas por shopping", key: "id_saida, cod_shopping", load: "D-1", cols: ["id_saida","cod_shopping","dt_saida","permanencia_min","tipo_veiculo","valor_cobrado"] },
      { table: "WPS — entradas", key: "id_entrada", load: "D-1", cols: ["id_entrada","cod_shopping","dt_entrada","placa","tipo_veiculo"] },
      { table: "WPS — pagamentos", key: "id_pagamento", load: "D-1", cols: ["id_pagamento","cod_shopping","dt_pagamento","valor","forma_pagamento"] },
      { table: "API Clima", key: "cod_shopping, data", load: "D-1", cols: ["cod_shopping","data","temperatura_max","temperatura_min","precipitacao","condicao"] },
    ],
    tables_written: [
      { table: "bronze.saidas_wps",           key: "id_saida, cod_shopping",  load: "incremental", cols: ["id_saida","cod_shopping","dt_saida","permanencia_min","tipo_veiculo","valor_cobrado","dt_carga"] },
      { table: "bronze.entradas_wps",         key: "id_entrada",              load: "incremental", cols: ["id_entrada","cod_shopping","dt_entrada","placa","tipo_veiculo","dt_carga"] },
      { table: "bronze.pagamentos_wps",       key: "id_pagamento",            load: "incremental", cols: ["id_pagamento","cod_shopping","dt_pagamento","valor","forma_pagamento","dt_carga"] },
      { table: "bronze.carencias_wps",        key: "id_carencia",             load: "incremental", cols: ["id_carencia","cod_shopping","dt_carencia","tipo","minutos_carencia"] },
      { table: "bronze.validacoes_wps",       key: "id_validacao",            load: "incremental", cols: ["id_validacao","cod_loja","cod_shopping","dt_validacao","valor_desconto"] },
      { table: "bronze.selos_utilizacao_wps", key: "id_selo, cod_shopping",   load: "incremental", cols: ["id_selo","cod_shopping","dt_selo","tipo_selo","qtd_utilizacoes"] },
      { table: "bronze.selos_geracao_wps",    key: "id_geracao",              load: "incremental", cols: ["id_geracao","cod_shopping","dt_geracao","tipo_selo","qtd_gerada"] },
      { table: "bronze.clima",                key: "cod_shopping, data",       load: "incremental", cols: ["cod_shopping","data","temperatura_max","temperatura_min","precipitacao","condicao"] },
      { table: "silver.saidas_wps",           key: "id_saida",                load: "via proc",    cols: ["(transformações silver via prc_atualiza_saidas_wps)"] },
      { table: "gold.saidas_wps",             key: "data, cod_shopping",      load: "via proc",    cols: ["data","cod_shopping","total_saidas","media_permanencia","receita_total"] },
      { table: "gold.fluxo_pagantes_wps",     key: "data, cod_shopping",      load: "via proc",    cols: ["data","cod_shopping","total_pagantes","ticket_medio","pct_pagantes"] },
      { table: "Dimensao.dbo.clima_diario",   key: "cod_shopping, data",       load: "via proc",    cols: ["cod_shopping","data","temperatura_max","temperatura_min","precipitacao","condicao"] },
    ],
    procedures: [
      "silver.prc_atualiza_saidas_wps",
      "silver.prc_atualiza_entradas_wps",
      "silver.prc_atualiza_pagamentos_wps",
      "silver.prc_atualiza_carencias_wps",
      "silver.prc_atualiza_validacoes_wps",
      "silver.prc_atualiza_selos_utilizacao_wps",
      "silver.prc_atualiza_selos_geracao_wps",
      "dbo.sp_processar_clima_diario  →  grava em DB Dimensao",
      "gold.sp_atualizar_gold_saidas_wps",
      "gold.criar_vw_saidas_wps_diaria",
      "gold.carga_saidas_diaria_wps",
      "gold.sp_carga_fluxo_pagantes_wps",
    ],
    scripts: [
      "Orquestrador/orquestradorlinux.py",
      "Clima/bronze_clima_linux.py",
      "Saida/saidas_main_linux.py",
      "Saida/bronze_entrada.py",
      "Saida/bronze_pagamento.py",
      "Saida/bronze_carencia.py",
      "Saida/bronze_validacao.py",
      "Saida/bronze_seloult.py",
      "Saida/bronze_selogera.py",
    ],
    script_details: [
      {
        name: "orquestradorlinux.py",
        steps: [
          "1. Carrega config.json com credenciais do banco destino (DESTINO.server/database/username/password)",
          "2. ETAPA 1 — BRONZE: executa 8 scripts Python sequencialmente (clima, saídas, entradas, pagamentos, carências, validações, selos_util, selos_ger)",
          "3. ETAPA 2 — SILVER: executa 7 stored procedures de transformação",
          "4. ETAPA 3 — GOLD: executa 4 stored procedures de agregação (clima no DB Dimensao, saídas e pagantes no DB Parking_Flow)",
          "5. Grava resultado em pipeline_executions.json (histórico dos últimos 200 runs)",
          "6. Log texto em /logs/pipeline_YYYYMMDD.log",
        ],
      },
      {
        name: "Saida/saidas_main_linux.py",
        steps: [
          "1. Conecta na API/DB do WPS por shopping",
          "2. Busca saídas do dia anterior (D-1)",
          "3. Calcula permanência em minutos",
          "4. INSERT incremental em bronze.saidas_wps",
        ],
      },
    ],
    shoppings: ["Taquara Plaza","Campinas Shopping","Park Sul","Américas Shopping","West Shopping","Itaipu Multicenter","Prudenshopping","Norte Sul Plaza","Itaboraí Plaza","Vogue Square","Praça Nova Araçatuba","Praça Nova Santa Maria","Montes Claros Shopping"],
    notes: "Execução sequencial por segurança. Logs em JSON (pipeline_executions.json) além do log texto. Clima é gravado no banco Dimensao via sp_processar_clima_diario.",
  },

  {
    id: "energia", label: "Energia\nOperações", group: "pipeline", status: "neutral",
    cron: "03:00 BRT (06:00 UTC) — diário", cron_hour: 3, duration_min: 15,
    path: "/home/Energia_Operacoes",
    description: "Coleta consumo de energia elétrica (kWh/hora) de 25 locations via API Schneider Electric. Faz MERGE incremental dos últimos 3 dias para garantir dados completos.",
    source_db: "Schneider Electric — Resource Advisor API (OAuth2)",
    target_db: "COND_FLOW",
    tables_written: [
      { table: "bronze.energia_ResourceAdvisor", key: "LocationId, DataHora", load: "MERGE (upsert)", cols: ["LocationId","LocationPath","Commodity","MeasurementGroup","UOM","Aggregation","DataHora","Consumo_kWh","DataCarga"] },
    ],
    scripts: [
      "schneider_incremental.py — carga diária (padrão: últimos 3 dias)",
      "schneider_full.py — recarga histórica completa (uso manual)",
    ],
    script_details: [
      {
        name: "schneider_incremental.py",
        steps: [
          "1. Carrega CLIENT_ID e CLIENT_SECRET do .env",
          "2. POST em /security/OAuth2/Token com grant_type=client_credentials → obtém access_token",
          "3. Calcula janela: ontem - (days-1) até ontem (padrão 3 dias, aceita --days N ou --start/--end)",
          "4. Monta payload com 25 LocationIds + Commodity=Electricity + MeasurementGroup=ENERGY + Interval=hourly",
          "5. POST em /interval/Data → recebe séries temporais",
          "6. Parseia ServiceOutput.Series: para cada série, extrai pontos (Timestamp, Value)",
          "7. Cria tabela temporária #stage no SQL Server",
          "8. INSERT em lotes de 500 registros no #stage",
          "9. MERGE #stage → bronze.energia_ResourceAdvisor (upsert por LocationId+DataHora)",
          "10. DROP TABLE #stage",
          "11. Loga resultado em JSON (log_schneider_incremental_YYYYMMDD_HHMMSS.json)",
        ],
      },
    ],
    notes: "25 locations: shoppings principais + subestações de Campinas Shopping e Shopping Três Lagoas + áreas do Vogue Square. Suporta reprocessamento manual via --days N ou --start/--end.",
  },

  {
    id: "onepage", label: "OnePageRMD", group: "pipeline", status: "neutral",
    cron: "06:00 BRT (09:00 UTC) — diário", cron_hour: 6, duration_min: 20,
    path: "/home/OnePageRMD",
    description: "Pipeline do relatório One Page RMD. Baixa planilha Excel do SharePoint, carrega na camada Bronze e executa SP_CARGA_COMPLETA que processa bronze → silver → gold em uma única procedure.",
    source_db: "SharePoint — argoplan.sharepoint.com (Graph API)",
    target_db: "OnePage|RMD",
    tables_written: [
      { table: "bronze.* (via fluxo_sharepoint_carga.py)", key: "—", load: "full", cols: ["dados do Excel SharePoint"] },
      { table: "silver.* (via SP_CARGA_COMPLETA)",         key: "—", load: "via proc", cols: ["transformações silver"] },
      { table: "gold.* (via SP_CARGA_COMPLETA)",           key: "—", load: "via proc", cols: ["dados para Power BI"] },
    ],
    procedures: [
      "[OnePage|RMD].dbo.SP_CARGA_COMPLETA — processa bronze → silver → gold em um único call",
    ],
    scripts: [
      "orquestrador.py — coordena as duas etapas",
      "bronze/fluxo_sharepoint_carga.py — autenticação Graph API, download e carga do Excel",
    ],
    script_details: [
      {
        name: "bronze/fluxo_sharepoint_carga.py",
        steps: [
          "1. Autentica no Azure AD via MSAL (client_credentials)",
          "2. Obtém site_id de argoplan.sharepoint.com",
          "3. Obtém drive_id da biblioteca Documentos",
          "4. Baixa o arquivo Excel do SharePoint via Graph API /drives/{id}/items/{file_id}/content",
          "5. Lê Excel com pandas (sheet configurada)",
          "6. Faz TRUNCATE + INSERT na tabela bronze de destino",
        ],
      },
    ],
  },

  {
    id: "logpbi", label: "Log\nPowerBI", group: "pipeline", status: "neutral",
    cron: "07:00 BRT (10:00 UTC) — diário", cron_hour: 7, duration_min: 10,
    path: "/home/Log_PowerBI",
    description: "Coleta métricas de uso do Power BI. Baixa LOG_BI.xlsx do SharePoint, faz deduplicação por chave composta e insere registros novos. Depois materializa silver e gold via procedures.",
    source_db: "SharePoint — argoplan.sharepoint.com / spo.holding.argotech (MSAL)",
    target_db: "DataLake (banco via .env)",
    tables_read: [
      { table: "LOG_BI.xlsx (SharePoint)", key: "FILE_ID: 1347788A-BA76-48AD-8291-4272A1159C22", load: "download diário", cols: ["UserId","ReportName","SectionId","Timestamp","Date","IsUsageMetricsReport","DistinctCountTimestamp"] },
    ],
    tables_written: [
      { table: "raw_page_view",      key: "UserId, ReportName, SectionId, Timestamp", load: "append (dedup)", cols: ["UserId","ReportName","SectionId","Timestamp","Date","IsUsageMetricsReport","DistinctCountTimestamp"] },
      { table: "silver.page_view",   key: "—", load: "via proc", cols: ["(via sp_PopularSilverPageView)"] },
      { table: "gold.page_view",     key: "—", load: "via proc", cols: ["(via sp_PopularGoldPageView)"] },
      { table: "gold.usuarios_mes",  key: "—", load: "via proc", cols: ["(via sp_materializar_usuarios_mes)"] },
    ],
    procedures: [
      "sp_PopularSilverPageView      — silver de visualizações",
      "sp_PopularGoldPageView        — gold de visualizações",
      "sp_materializar_usuarios_mes  — materializa usuários ativos por mês",
    ],
    scripts: ["orquestrador_linux.py — pipeline completo"],
    script_details: [
      {
        name: "orquestrador_linux.py",
        steps: [
          "1. Autentica no Azure AD via MSAL (client_credentials)",
          "2. Obtém site_id e drive_id via Graph API",
          "3. Baixa LOG_BI.xlsx (FILE_ID fixo: 1347788A-BA76-48AD-8291-4272A1159C22)",
          "4. Lê Excel com pandas (sheet: Planilha1)",
          "5. Busca chaves já existentes em raw_page_view (UserId+ReportName+SectionId+Timestamp)",
          "6. Filtra registros novos (anti-join por chave)",
          "7. Remove duplicatas internas no novo lote",
          "8. INSERT em lotes de 1000 registros",
          "9. Executa 3 procedures sequencialmente para silver e gold",
        ],
      },
    ],
    notes: "Chave de deduplicação: UserId + ReportName + SectionId + Timestamp. Autenticação via Azure AD client_credentials (MSAL).",
  },

  {
    id: "intel", label: "Inteligência", group: "pipeline", status: "neutral",
    cron: "mensal — dias 1, 2 e 5 (03:00 BRT / 06:00 UTC)", cron_hour: 3, duration_min: 90,
    path: "/home/inteligencia",
    description: "Suite de scripts mensais de inteligência de mercado. Coleta frequência de clientes (Mobits), relatórios de investidores de concorrentes (Allos/Multiplan), indicadores do portfólio Argoplan e dados de R.I. via SharePoint.",
    source_db: "Mobits Plaza (Playwright)  |  Allos RI / Multiplan RI (Playwright)  |  SharePoint Argoplan",
    target_db: "ARGO_INTELIGENCIA",
    tables_written: [
      { table: "bronze.clientes_mobits",          key: "cod_shopping, mes",          load: "mensal",    cols: ["cod_shopping","mes","total_clientes","novos","recorrentes","frequencia_media"] },
      { table: "bronze.indicadores_argoplan",     key: "cod_loja, mes, indicador",   load: "mensal",    cols: ["cod_loja","cod_shopping","mes","indicador","valor","trimestre"] },
      { table: "bronze.indicadores_concorrentes", key: "empresa, trimestre",          load: "trimestral",cols: ["empresa","trimestre","noi","abls","vendas_mesmas_lojas","inadimplencia","ocupacao"] },
      { table: "silver.indicadores",              key: "—", load: "via proc", cols: ["(via proc_prata_indicadores)"] },
      { table: "gold.indicadores",                key: "—", load: "via proc", cols: ["(via proc_gold_indicadores)"] },
      { table: "gold.indicadores_cidade_shopping",key: "—", load: "via proc", cols: ["(via proc_gold_indicadores_cidade_shopping)"] },
    ],
    procedures: [
      "proc_gold_indicadores                    — materializa gold de indicadores",
      "proc_gold_indicadores_cidade_shopping    — gold por cidade e shopping",
      "proc_prata_indicadores                   — silver de indicadores",
    ],
    scripts: [
      "mobits_auto.py       — 1º/mês 06:00",
      "mobits_freq_auto.py  — 5º/mês 07:00",
      "ri_auto.py           — 1º/mês 07:30",
      "indicadores_auto.py  — 1º/mês 08:00",
      "concorrentes_auto.py — 2º/mês 09:30",
    ],
    script_details: [
      {
        name: "mobits_auto.py",
        steps: [
          "1. Para cada shopping: abre browser headless via Playwright",
          "2. Navega para URL do shopping (ex: americasshopping.mobitsplaza.com.br)",
          "3. Faz login com e-mail e senha (Guilherme.argo123)",
          "4. Navega até exportação de clientes e clica em Download CSV",
          "5. Salva clientes.csv localmente",
          "6. Faz upload do arquivo para SharePoint (19 - Inteligência e R.I/mobits/Info)",
          "7. Lê CSV com pandas e INSERT em bronze.clientes_mobits",
        ],
      },
      {
        name: "concorrentes_auto.py",
        steps: [
          "1. Verifica no banco quais trimestres já existem para Allos e Multiplan",
          "2. Abre browser Playwright para cada empresa",
          "3. Navega para página de resultados do site de RI",
          "4. Identifica planilhas novas (não existentes no banco)",
          "5. Faz download das planilhas Excel de resultados trimestrais",
          "6. Parseia dados (ABL, Vendas, NOI, Inadimplência, Ocupação)",
          "7. INSERT em bronze.indicadores_concorrentes",
          "8. Move arquivos processados para pasta Enviados no SharePoint",
        ],
      },
      {
        name: "indicadores_auto.py",
        steps: [
          "1. Autentica no SharePoint via Graph API (MSAL)",
          "2. Baixa 'Estudo A.I_Portfolio ARGOPLAN_V2 1.xlsx' da pasta 19 - Inteligência e R.I/R.I",
          "3. Abre com openpyxl para leitura avançada (ranges CQ:CV ignorados)",
          "4. Parseia grupos de indicadores mensais: TX (F:AC), NOI (AE:BB), Vendas (BD:CA)",
          "5. Identifica colunas por mês em português (JANEIRO→1, FEVEREIRO→2...)",
          "6. Processa trimestres: 20244, 20251, 20252, 20253",
          "7. INSERT em lotes de 500 em bronze.indicadores_argoplan",
        ],
      },
    ],
    shoppings: ["Americas Shopping","Norte Sul Plaza","Prudenshopping","Campinas Shopping","West Shopping","Vogue Square","Shopping Taquara Plaza","Park Sul","Itaboraí Plaza","Itaipu Multicenter"],
    notes: "Playwright roda headless (sem interface gráfica). Arquivos processados movidos para Enviados no SharePoint. Concorrentes verificam trimestres existentes para não duplicar.",
  },

  {
    id: "mixlojas", label: "MixLojas", group: "pipeline", status: "neutral",
    cron: "manual", cron_hour: null, duration_min: null,
    path: "/home/MixLojas",
    description: "Pipeline de mix de lojas. Extrai dados de múltiplas fontes, une e padroniza, depois materializa a view gold.",
    target_db: "DataLake",
    tables_written: [
      { table: "bronze.mix_lojas",  key: "cod_loja, cod_shopping", load: "full",     cols: ["cod_loja","cod_shopping","segmento","categoria","area_m2","status"] },
      { table: "silver.mix_lojas",  key: "cod_loja",               load: "via proc", cols: ["(union + padronização)"] },
      { table: "gold.vw_mix_lojas", key: "—",                      load: "view mat.", cols: ["(materializada)"] },
    ],
    scripts: ["extrator_lojas.py","union_e_padronizacao.py","orquestrador.py"],
    script_details: [
      { name: "orquestrador.py", steps: ["1. Roda extrator_lojas.py", "2. Roda union_e_padronizacao.py (Bronze → Silver)", "3. Executa procedure Gold para materializar a view"] },
    ],
  },

  // ── MONITORES ──────────────────────────────────────────────────────────────

  {
    id: "svc_monitor", label: "Monitor\nPipelines", group: "monitor", status: "neutral",
    cron: "08:30 BRT (11:30 UTC) — diário", cron_hour: 8.5, duration_min: 2,
    path: "/home/monitor_pipelines.py",
    description: "Monitora o resultado de todos os pipelines do dia. Lê os arquivos de log de cada pipeline, detecta sucesso/falha e envia card de status consolidado no Microsoft Teams.",
    pipelines_monitorados: [
      "Parking Flow      → /Orquestrador/logs/cron.log",
      "DataLake Group    → /logs/orchestrator_YYYYMMDD.log",
      "OnePageRMD        → /logs/cron.log",
      "Log PowerBI       → /LOG/cron.log",
      "DataLake NOI      → /logs/orchestrator_NOI_ontem.log",
    ],
    scripts: ["monitor_pipelines.py"],
    script_details: [
      {
        name: "monitor_pipelines.py",
        steps: [
          "1. Para cada pipeline: lê arquivo de log do dia",
          "2. Filtra linhas com a data de hoje",
          "3. Busca padrão de sucesso (regex: 'PIPELINE FINALIZADO COM SUCESSO')",
          "4. Busca padrão de falha (regex: 'PIPELINE FALHOU|❌')",
          "5. Extrai step específico que falhou (regex: '[ETAPA] NOME | FAILED')",
          "6. Monta Adaptive Card com status de todos os pipelines",
          "7. POST no Teams Webhook",
        ],
      },
    ],
  },

  {
    id: "svc_gaps", label: "Monitor\nGaps Parking", group: "monitor", status: "neutral",
    cron: "05:30 BRT (08:30 UTC) — diário", cron_hour: 5.5, duration_min: 5,
    path: "/home/Parking_Flow/monitor_gaps_parking.py",
    description: "Verifica gaps nos dados de estacionamento. Para cada shopping, checa se há datas sem registro no banco e envia e-mail de alerta.",
    source_db: "Parking_Flow",
    scripts: ["monitor_gaps_parking.py"],
    script_details: [
      {
        name: "monitor_gaps_parking.py",
        steps: [
          "1. Conecta no banco Parking_Flow usando config.json do pipeline",
          "2. Para cada um dos 13 shoppings: verifica sequência de datas nos últimos 7 dias",
          "3. Detecta datas faltando em bronze.saidas_wps",
          "4. Se houver gap: monta e-mail HTML com tabela de gaps por shopping",
          "5. Envia via SMTP (smtp.office365.com:587)",
        ],
      },
    ],
  },

  // ── BANCOS DE DADOS ────────────────────────────────────────────────────────

  {
    id: "db_datalake", label: "DataLake", group: "database", status: "neutral",
    description: "Banco principal de dados comerciais do grupo. Arquitetura Medallion com Bronze (dados brutos), Silver (transformados) e Gold (agregados para BI).",
    schemas: [
      "bronze — dados brutos copiados das fontes",
      "silver — dados limpos, padronizados e transformados",
      "gold   — dados agregados e materializados para Power BI",
      "log_control — controle de execução dos pipelines",
    ],
    key_tables: [
      { table: "bronze.BI_AuditoriaVendas",      cols: ["cod_loja","data_venda","valor_venda","qtd_cupons","tipo_venda","dt_carga"] },
      { table: "bronze.BI_Faturamento_Group",    cols: ["cod_loja","competencia","valor_bruto","valor_liquido","tipo","dt_carga"] },
      { table: "bronze.BI_ContratosLocacao",     cols: ["id_contrato","cod_loja","dt_inicio","dt_fim","valor_aluguel","tipo_contrato"] },
      { table: "gold.kpis_shopping",             cols: ["cod_shopping","competencia","noi","abls","taxa_ocupacao","vendas_sss","receita_liquida"] },
      { table: "log_control.pipeline_contagens", cols: ["id","dt_execucao","script","tabela_origem","tabela_destino","qtd_origem_antes","qtd_destino_antes","qtd_origem_depois","qtd_destino_depois","diferenca","duracao_segundos","status"] },
    ],
    alimentado_por: ["DataLake_Group (principal)","DataLake_NOI","Log_PowerBI (raw_page_view)","MixLojas"],
  },
  {
    id: "db_parking", label: "Parking_Flow", group: "database", status: "neutral",
    description: "Banco de dados de estacionamento dos shoppings. Saídas, entradas, pagamentos, selos e validações de 13 shoppings em Bronze → Silver → Gold.",
    schemas: [
      "bronze — dados brutos por shopping (D-1)",
      "silver — dados transformados (via procedures prc_atualiza_*)",
      "gold   — agregados para BI (fluxo, pagantes, saídas diárias)",
    ],
    key_tables: [
      { table: "bronze.saidas_wps",       cols: ["id_saida","cod_shopping","dt_saida","permanencia_min","tipo_veiculo","valor_cobrado","dt_carga"] },
      { table: "bronze.entradas_wps",     cols: ["id_entrada","cod_shopping","dt_entrada","placa","tipo_veiculo","dt_carga"] },
      { table: "bronze.pagamentos_wps",   cols: ["id_pagamento","cod_shopping","dt_pagamento","valor","forma_pagamento","dt_carga"] },
      { table: "gold.fluxo_pagantes_wps", cols: ["data","cod_shopping","total_pagantes","ticket_medio","pct_pagantes"] },
      { table: "gold.saidas_diaria_wps",  cols: ["data","cod_shopping","total_saidas","media_permanencia","receita_total"] },
    ],
    alimentado_por: ["Parking_Flow"],
  },
  {
    id: "db_dimensao", label: "Dimensao", group: "database", status: "neutral",
    description: "Banco de dimensões compartilhadas. Recebe dados de clima para análise de correlação com fluxo de visitantes.",
    schemas: ["dbo — tabelas de dimensão e clima diário"],
    key_tables: [
      { table: "dbo.clima_diario", cols: ["cod_shopping","data","temperatura_max","temperatura_min","precipitacao","condicao"] },
    ],
    alimentado_por: ["Parking_Flow (clima gold via sp_processar_clima_diario)"],
  },
  {
    id: "db_condflow", label: "COND_FLOW", group: "database", status: "neutral",
    description: "Banco de consumo de energia elétrica dos shoppings. Dados horários de kWh por location da API Schneider Electric.",
    schemas: ["bronze — dados horários de energia"],
    key_tables: [
      { table: "bronze.energia_ResourceAdvisor", cols: ["LocationId","LocationPath","Commodity","MeasurementGroup","UOM","Aggregation","DataHora","Consumo_kWh","DataCarga"] },
    ],
    alimentado_por: ["Energia_Operacoes"],
  },
  {
    id: "db_onepage", label: "OnePage|RMD", group: "database", status: "neutral",
    description: "Banco do relatório One Page RMD. Bronze, silver e gold processados via SP_CARGA_COMPLETA.",
    schemas: ["dbo — bronze, silver e gold do relatório"],
    alimentado_por: ["OnePageRMD"],
  },
  {
    id: "db_inteligencia", label: "ARGO_INTELIGENCIA", group: "database", status: "neutral",
    description: "Banco de inteligência de mercado. Frequência de clientes (Mobits), indicadores Argoplan e dados de concorrentes (Allos/Multiplan).",
    schemas: [
      "bronze — dados brutos (clientes_mobits, indicadores_argoplan, indicadores_concorrentes)",
      "silver — indicadores transformados",
      "gold   — indicadores consolidados por shopping e cidade",
    ],
    key_tables: [
      { table: "bronze.indicadores_concorrentes", cols: ["empresa","trimestre","noi","abls","vendas_mesmas_lojas","inadimplencia","ocupacao"] },
      { table: "bronze.indicadores_argoplan",     cols: ["cod_loja","cod_shopping","mes","indicador","valor","trimestre"] },
      { table: "bronze.clientes_mobits",          cols: ["cod_shopping","mes","total_clientes","novos","recorrentes","frequencia_media"] },
      { table: "gold.indicadores",                cols: ["cod_shopping","mes","indicador","valor_argoplan","valor_concorrente","variacao"] },
    ],
    alimentado_por: ["Inteligencia"],
  },

  // ── FONTES EXTERNAS ────────────────────────────────────────────────────────

  { id: "ext_schneider",    label: "Schneider\nElectric API", group: "external", status: "neutral", description: "API Resource Advisor da Schneider Electric. Fornece dados horários de consumo de energia elétrica por location.", info: "URL: api.resourceadvisor.schneider-electric.com\nAuth: OAuth2 client_credentials\nEndpoint: POST /interval/Data\nCommodity: Electricity | Interval: hourly | UOM: kWh" },
  { id: "ext_sharepoint",   label: "SharePoint\nArgoplan",   group: "external", status: "neutral", description: "SharePoint corporativo da Argoplan. Fonte dos arquivos Excel e CSV consumidos pelos pipelines OnePageRMD, Log PowerBI e Inteligência.", info: "Host: argoplan.sharepoint.com\nSite: /sites/spo.holding.argotech\nLib: Documentos\nAuth: Graph API — Azure AD client_credentials (MSAL)" },
  { id: "ext_mobits",       label: "Mobits Plaza",           group: "external", status: "neutral", description: "Sistema de gestão de clientes usado pelos shoppings. Login automatizado via Playwright headless em 10 portais.", info: "Auth: login/senha por shopping (Playwright headless)\n10 shoppings mapeados\nArquivo gerado: clientes.csv" },
  { id: "ext_concorrentes", label: "Allos /\nMultiplan",     group: "external", status: "neutral", description: "Sites de RI da Allos e Multiplan. Playwright navega e baixa planilhas trimestrais de resultados automaticamente.", info: "Allos: ri.allos.com.br/informacoes-financeiras/fundamentos-e-planilhas/\nMultiplan: ri.multiplan.com.br/ferramentas-de-analise/central-de-resultados/\nAuth: Playwright headless (público)" },
  { id: "ext_github",       label: "GitHub\nArgot-plan-tech","group": "external", status: "neutral", description: "Organização GitHub da Argoplan Tech com CI/CD configurado via GitHub Actions e runners auto-hospedados.", info: "Organização: Argot-plan-tech\nRepos: DataLake_Group / energia / inteligencia / Parking_Flow\nCI/CD: GitHub Actions — self-hosted runners\nWebhook: push → webhook_server.py :9000" },
  { id: "ext_teams",        label: "Microsoft\nTeams",       group: "external", status: "neutral", description: "Canal Teams que recebe notificações automáticas de status diariamente às 11:30.", info: "Tipo: Incoming Webhook\nURL: portalargo.webhook.office.com\nFormato: Adaptive Card\nHorário: 11:30 diário" },

  // ── RUNNERS CI/CD ──────────────────────────────────────────────────────────

  { id: "runner_dl",      label: "Runner\nDataLake",     group: "runner", status: "neutral", info: "Repo: DataLake_Group\nPath: /home/runners/runner_DataLake\nUser: matheus\nService: actions.runner.Argot-plan-tech-DataLake_Group.vm-database-01" },
  { id: "runner_energia", label: "Runner\nEnergia",      group: "runner", status: "neutral", info: "Repo: energia\nPath: /home/runners/runner_Energia\nUser: vinicius-argo\nService: actions.runner.Argot-plan-tech-energia.vm-database-01" },
  { id: "runner_intel",   label: "Runner\nInteligência", group: "runner", status: "neutral", info: "Repo: inteligencia\nPath: /home/runners/runner_Inteligencia\nUser: vinicius-argo\nService: actions.runner.Argot-plan-tech-inteligencia.vm-database-01" },
  { id: "runner_parking", label: "Runner\nParking",      group: "runner", status: "neutral", info: "Repo: Parking_Flow\nPath: /home/runners/runner_Parking\nUser: vinicius-argo\nService: actions.runner.Argot-plan-tech-Parking_Flow.vm-database-01" },

  // ── SERVIÇOS ───────────────────────────────────────────────────────────────

  { id: "svc_sqlserver",  label: "SQL Server\n:1433",        group: "service", status: "neutral", description: "Microsoft SQL Server rodando no Linux. Hospeda todos os bancos de dados da Argoplan.", info: "Serviço: mssql-server.service\nPorta: 1433\nBancos: DataLake, Parking_Flow, Dimensao, COND_FLOW, OnePage|RMD, ARGO_INTELIGENCIA" },
  { id: "svc_webhook",    label: "Webhook\nServer :9000",    group: "service", status: "neutral", description: "Flask que recebe push do GitHub, valida assinatura HMAC-SHA256 e executa git pull no repositório correspondente.", info: "Arquivo: /home/webhook_server.py\nPorta: 9000\nAuth: HMAC-SHA256 (GITHUB_WEBHOOK_SECRET)\nRepos: OnePageRMD, Parking_Flow, DataLake_Group, inteligencia" },
  { id: "svc_cronlog",    label: "CronLog\nDashboard :5000", group: "service", status: "neutral", description: "Dashboard web de monitoramento de status dos crons em tempo real.", info: "Arquivo: /home/control_cronlog/app.py\nPorta: 5000\nRota /map → este mapa" },

];

// =============================================================================
// CONEXÕES
// =============================================================================

const EDGES = [
  { from: "ext_schneider",    to: "energia",  label: "kWh horário",      dashes: true },
  { from: "ext_sharepoint",   to: "onepage",  label: "Excel",             dashes: true },
  { from: "ext_sharepoint",   to: "logpbi",   label: "LOG_BI.xlsx",       dashes: true },
  { from: "ext_sharepoint",   to: "intel",    label: "R.I / Indicadores", dashes: true },
  { from: "ext_mobits",       to: "intel",    label: "clientes.csv",      dashes: true },
  { from: "ext_concorrentes", to: "intel",    label: "planilhas RI",      dashes: true },
  { from: "dl",       to: "db_datalake",     label: "bronze→silver→gold" },
  { from: "dl_noi",   to: "db_datalake",     label: "NOI" },
  { from: "parking",  to: "db_parking",      label: "bronze→silver→gold" },
  { from: "parking",  to: "db_dimensao",     label: "clima gold" },
  { from: "energia",  to: "db_condflow",     label: "MERGE upsert" },
  { from: "onepage",  to: "db_onepage",      label: "SP_CARGA_COMPLETA" },
  { from: "logpbi",   to: "db_datalake",     label: "raw_page_view" },
  { from: "intel",    to: "db_inteligencia", label: "indicadores" },
  { from: "mixlojas", to: "db_datalake",     label: "mix lojas" },
  { from: "svc_monitor", to: "ext_teams", label: "card status" },
  { from: "svc_gaps",    to: "ext_teams", label: "alerta e-mail", dashes: true },
  { from: "dl",          to: "ext_teams", label: "e-mail status", dashes: true },
  { from: "ext_github",     to: "runner_dl",      dashes: true },
  { from: "ext_github",     to: "runner_energia",  dashes: true },
  { from: "ext_github",     to: "runner_intel",    dashes: true },
  { from: "ext_github",     to: "runner_parking",  dashes: true },
  { from: "runner_dl",      to: "dl",       label: "deploy" },
  { from: "runner_energia", to: "energia",  label: "deploy" },
  { from: "runner_intel",   to: "intel",    label: "deploy" },
  { from: "runner_parking", to: "parking",  label: "deploy" },
  { from: "ext_github",  to: "svc_webhook", label: "push event", dashes: true },
  { from: "svc_sqlserver", to: "db_datalake",     dashes: true },
  { from: "svc_sqlserver", to: "db_parking",      dashes: true },
  { from: "svc_sqlserver", to: "db_dimensao",     dashes: true },
  { from: "svc_sqlserver", to: "db_condflow",     dashes: true },
  { from: "svc_sqlserver", to: "db_onepage",      dashes: true },
  { from: "svc_sqlserver", to: "db_inteligencia", dashes: true },
];
