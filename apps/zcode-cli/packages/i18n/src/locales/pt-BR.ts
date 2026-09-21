import type { ZCodeCopy } from "../types.js";

export const ptBR: ZCodeCopy = {
  locale: "pt-BR",
  cli: {
    errors: {
      localeUnsupported: (value) =>
        `Valor de --locale não suportado: ${value}. Locales suportados: en-US, zh-CN, pt-BR, auto.`,
    },
    help: (version) => `zcode ${version}

Uso:
  zcode [command] [options]

Sem nenhum comando, o zcode abre a TUI em tela cheia.

Comandos:
  app-server Executa o app server stdio do ZCode Protocol
  commands   Lista os slash commands personalizados (\`commands list\`)
  doctor     Inspeciona premissas de runtime e empacotamento
  login [zai|bigmodel]  Faça login por autorização no navegador
  logout     Remove as credenciais compartilhadas de login Z.AI
  plugins    Gerencia plugins e marketplaces (\`plugins list|install|uninstall|enable|disable|update|validate|marketplace ...\`; alias: plugin)
  skills     Lista skills locais (\`skills list\`)
  tui        Abre a UI de terminal
  version    Exibe a versão do CLI

Opções:
  -h, --help       Mostra a ajuda
  -v, --version    Exibe a versão
  -p, --prompt <text>  Executa um único prompt sem abrir a TUI
  --memory-bench   Com --prompt, ativa a extração automática de Memory e aguarda antes de sair (requer Memory habilitado)
  --browser-use <mode> Habilita o backend Browser Use (suportado: headless)
  --surface <surface>  Superfície de apresentação para prompts/app-server headless: terminal ou desktop
  --browser-executable <path> Executável Chrome/Chromium para o Browser Use headless
  --attach <path>  Anexa um arquivo local a --prompt; repita a flag para vários arquivos
  --cwd <path>     Executa este comando a partir do diretório informado
  --disallowed-tools, --disallowedTools <tools...>
    Remove ferramentas inteiras apenas nesta execução de prompt/TUI; as configurações salvas ficam inalteradas.
    Nomes de ferramentas separados por vírgula ou espaço, ex.: "Bash Edit".
    "Bash(git *)" remove o Bash inteiro; padrões de comando não são comparados.
  --force-mcs      Força a projeção de system de meio de conversa para providers Anthropic
  --locale <locale>  Locale da UI: en-US, zh-CN, pt-BR ou auto
  --mode <mode>    Modo de permissão para prompts: build, edit, plan ou yolo (padrão: yolo para --prompt)
  --resume <sessionId>  Retoma uma sessão persistida pelo sessionId (sess_...)
  --target <text>  Executa ou define a meta da sessão em modo headless
  --target-replace Substitui qualquer meta de sessão existente definida por --target
  -c, --continue        Retoma a sessão mais recente do diretório atual
  --json           Exibe JSON legível por máquina onde suportado
  --no-browser     Exibe a URL OAuth sem abrir um navegador
  --no-color       Desativa cores ANSI
  --verbose        Exibe detalhes extras de diagnóstico

Slash Commands:
  /help [command]       Mostra a ajuda dos slash commands
  /login                Escolhe login no navegador Z.AI ou BigModel
  /logout               Remove as credenciais compartilhadas de login Z.AI
  /compact [instructions]  Compacta a conversa atual
  /expert [status|resume|stop|<task>]  Executa ou gerencia o fluxo de trabalho expert
  /dwf [list|cancel|resume]  Lista, cancela ou retoma execuções de dynamic workflow
  /fork [latest|checkpointId]  Cria uma nova sessão a partir de um checkpoint do workspace
  /mcp [list|status|connect|disconnect]  Mostra ou gerencia servidores MCP
  /mode [mode]          Mostra ou troca o modo de permissão: build, edit, plan ou yolo
  /model [id]           Mostra ou troca o modelo da sessão atual
  /new                  Inicia uma nova sessão na TUI
  /resume [sessionId]   Retoma uma sessão pelo sessionId; omita para a mais recente no cwd
  /rewind [latest|checkpointId]  Mostra o checkpoint mais recente ou restaura arquivos do workspace
  /skill [name] [task]  Lista skills, ou força o próximo prompt a carregar uma
  /goal [action]        Mostra ou define a meta da sessão atual
`,
  },
  tui: {
    copy: {
      copied: "Texto selecionado copiado para a área de transferência.",
      failed: "Não foi possível copiar o texto selecionado.",
      unavailable: "A cópia para a área de transferência não está disponível neste terminal.",
    },
    effort: {
      disabled: "desativado",
      enabled: "ativado",
    },
    input: {
      activeStatusHint: "esc para interromper",
      busyPlaceholder: "Digite para enfileirar",
      placeholder: "Digite um prompt",
      queuedMore: (count) => `+ ${count} mais na fila`,
      queuedSubmitHint: "Será enviado após a próxima chamada de ferramenta.",
      queuedTitle: (count) => ` Fila (${count}) `,
      title: "Entrada",
      noHistorySource: "Nenhuma fonte de histórico de entrada está configurada.",
      noPreviousInput: "Não há entrada anterior para este projeto.",
      restoredPreviousInput: "Entrada anterior restaurada.",
      restoredPreviousInputWithAttachments: (count) =>
        `Entrada anterior restaurada com ${count} anexo(s).`,
      restorePreviousInputFailed: "Não foi possível restaurar a entrada anterior.",
      typePrompt: "Digite uma pergunta e pressione Enter.",
    },
    loginRequired: {
      help: "Use /model para ver os modelos, ou /login para conectar uma conta Coding Plan.",
      message: "Nenhum modelo disponível. Configure um provider ou faça login com /login.",
      status: "Nenhum modelo disponível. Configure um provider ou faça login com /login.",
      title: "configuração de modelo necessária",
    },
    loginSetup: {
      emptyMessage: "Nenhuma opção de login disponível.",
      help: "Use Up/Down para escolher, Enter para selecionar.",
      options: {
        bigmodelApiKey: {
          inputPrimary: "Informe a API Key do BigModel Coding Plan",
          inputSecondary: "Cole a key aqui. Ela fica oculta enquanto você digita.",
          primary: "API Key do BigModel Coding Plan",
          secondary: "Cole uma API key do Coding Plan manualmente.",
        },
        bigmodelOauth: {
          pendingPrimary: "Aguardando autorização do BigModel",
          pendingSecondary:
            "Conclua o login no seu navegador. A autorização é detectada automaticamente.",
          primary: "BigModel Coding Plan",
          secondary: "Abre o login no navegador; a autorização é detectada automaticamente.",
        },
        zaiApiKey: {
          inputPrimary: "Informe a API Key do Z.AI Coding Plan",
          inputSecondary: "Cole a key aqui. Ela fica oculta enquanto você digita.",
          primary: "API Key do Z.AI Coding Plan",
          secondary: "Cole uma API key do Coding Plan manualmente.",
        },
        zaiOauth: {
          pendingPrimary: "Aguardando autorização do Z.AI",
          pendingSecondary:
            "Conclua o login no seu navegador. Continuarei quando a autorização terminar.",
          primary: "Z.AI Coding Plan",
          secondary: "Abre o login no navegador e cria uma API key do Coding Plan.",
        },
      },
      pending: {
        cancelStatus: "Login cancelado. Escolha um método de configuração.",
        help: "Esc cancela e retorna às opções de configuração.",
        status: "Aguardando autorização no navegador...",
      },
      input: {
        cancelStatus: "Entrada de API key cancelada. Escolha um método de configuração.",
        clearStatus: "Entrada de API key limpa.",
        emptyStatus: "A API key é obrigatória.",
        help: "Enter salva a key. Esc retorna às opções de configuração.",
        placeholder: "Cole a API key",
        status: "Informe a API key e pressione Enter.",
        submitStatus: "Salvando API key...",
      },
      prompt: "Escolha um método de login ou de configuração de API key.",
      response: "Escolha como configurar um provider do Coding Plan.",
      title: "Configurar Coding Plan",
    },
    model: {
      requestFailed: (message) => `Falha na requisição ao modelo: ${message}`,
      responseReceived: "Resposta do modelo recebida.",
      responseReceivedWithTokens: (tokens) => `Resposta do modelo recebida. ${tokens} tokens.`,
      retryScheduled: ({ attempt, delay, maxAttempts, reason }) =>
        `Tentando novamente a requisição ao modelo ${attempt}/${Math.max(1, maxAttempts - 1)} em ${delay}: ${reason}`,
      streamStalled: "O stream do modelo estagnou.",
    },
    sidebar: {
      subagents: {
        title: "Subagentes",
        empty: "Ainda não há subagentes.",
        emptyOutput: "Ainda não há saída.",
        back: "← Conversa principal",
        readonly: "Somente leitura · Esc para voltar",
        loading: "Carregando saída do subagente...",
        unavailable: "Saída do subagente indisponível.",
        retry: "Tentar novamente",
        more: "Carregar mais",
        pendingMain: "A conversa principal precisa da sua entrada — volte para responder",
        ended: (count) => `Encerrados (${count})`,
        status: {
          running: "em execução",
          waiting: "aguardando",
          blocked: "bloqueado",
          success: "concluído",
          failed: "falhou",
          cancelled: "cancelado",
          lost: "perdido",
        },
      },
      api: {
        empty: "Ainda não há chamadas de API.",
        model: "Modelo",
        more: (count) => `+${count} mais`,
        requests: "Requisições",
        server: "Servidor",
      },
      cache: {
        hit: "acerto",
        lastHit: "último acerto",
        lastMiss: "última falha",
        readWrite: ({ read, write }) => `${read} leitura / ${write} escrita`,
        total: "total",
      },
      context: {
        cache: "Cache",
        cacheReadWrite: "Cache R/W",
        inputOutput: "E/S",
        reason: "Raciocínio",
        tokens: "Tokens",
        used: "Usado",
        window: "Janela",
      },
      modifiedFiles: {
        empty: "Ainda não há alterações de arquivos.",
        more: (count) => `+${count} mais`,
      },
      mcp: {
        empty: "Nenhum servidor MCP configurado.",
        loadFailed: "Status do MCP indisponível.",
        loading: "Carregando status do MCP...",
        more: (count) => `+${count} mais`,
        servers: "Servidores",
        status: {
          connected: "conectado",
          connecting: "conectando",
          disabled: "desativado",
          disconnected: "desconectado",
          failed: "falhou",
          untrusted: "não confiável",
        },
        summary: ({ connected, total }) => `${connected}/${total} conectados`,
        tools: (count) => `${count} ${count === 1 ? "ferramenta" : "ferramentas"}`,
      },
      request: {
        complete: "concluído",
        error: "erro",
        errorWithStatus: (statusCode) => `erro ${statusCode}`,
        pending: "pendente",
      },
      status: {
        last: "Último",
      },
      run: {
        draft: "Rascunho",
        draftChars: (count) => `${count} caracteres`,
        draftEmpty: "vazio",
        messages: "Mensagens",
        mode: "Modo",
        model: "Modelo",
        provider: "Provider",
        thought: "Pensamento",
        trace: "Trace",
        turn: "Turno",
        workspace: "Workspace",
      },
      sections: {
        apis: "APIs",
        context: "Contexto",
        mcp: "MCP",
        modifiedFiles: "Arquivos Modificados",
        run: "Execução",
        status: "Status",
        todos: "Tarefas",
      },
      shellSubtitle: "Shell OpenTUI",
      title: "Barra lateral",
      todos: {
        empty: "Ainda não há tarefas.",
        more: (count) => `+${count} mais`,
        progress: "Progresso",
      },
    },
    status: {
      compactFailed: "Falha na compressão do contexto.",
      compacted: "Conversa compactada.",
      compacting: "Comprimindo o contexto...",
      interruptedStreamDiscarded: "Stream do modelo interrompido foi descartado.",
      modelCalling: "Chamando o modelo...",
      permissionRequested: (toolName) => `Permissão solicitada para ${toolName}.`,
      permissionResolved: (toolName) => `Permissão resolvida para ${toolName}.`,
      ready: "Pronto.",
      recoveringStream: "Recuperando stream do modelo interrompido...",
      retryingStream: "Tentando novamente o stream do modelo...",
      sessionResumed: "Sessão retomada.",
      targetChanged: (action) => `Meta ${action}.`,
      thinking: "Pensando...",
      toolCompleted: (toolName) => `Ferramenta ${toolName} concluída.`,
      toolFailed: (toolName) => `Ferramenta ${toolName} falhou.`,
      toolPending: (toolName) => `Ferramenta ${toolName} pendente.`,
      toolRunning: (toolName) => `Ferramenta ${toolName} em execução.`,
      turnFailed: "Falha no turno.",
    },
    terminal: {
      requiresInteractive: "A TUI requer um terminal interativo.",
      starting: "Iniciando o ZCode... Ctrl+C para sair",
    },
    transcript: {
      compact: {
        completed: "Contexto comprimido",
        failed: "Falha na compressão do contexto",
        interrupted: "Compressão do contexto interrompida",
        retry: (command) => `Ctrl-R para tentar novamente ${command}`,
        retrying: ({ attempt, maxAttempts }) =>
          maxAttempts > 0
            ? `Tentando novamente a compressão do contexto (${attempt}/${maxAttempts})`
            : "Tentando novamente a compressão do contexto",
        skipped: "Contexto está atualizado; nenhuma compressão necessária",
        started: "Comprimindo o contexto",
      },
      roles: {
        agent: "Agente",
        system: "Sistema",
        user: "Usuário",
      },
      thought: {
        complete: "Pensamento",
        thinking: "Pensando...",
      },
      title: "Transcrição",
      workflow: {
        actors: "atores:",
        actorRow: ({ name, status }) => `${name} - ${status}`,
        usage: ({ spentTokens }) => `uso: ${spentTokens} tokens`,
        collapsed: ({ label, status, nodesSettled, nodesTotal }) =>
          `Workflow ${label} - ${status} (${nodesSettled}/${nodesTotal} etapas)`,
        error: (message) => `erro: ${message}`,
        expandHint: "+ para expandir",
        collapseHint: "- para recolher",
        log: "log:",
        nodes: ({ nodesSettled, nodesTotal }) => `${nodesSettled}/${nodesTotal} etapas resolvidas`,
        result: (preview) => `resultado: ${preview}`,
        status: {
          completed: "concluído",
          errored: "com erro",
          pending: "pendente",
          running: "em execução",
          stopped: "parado",
        },
        stopReason: {
          user: "por você",
          model: "pelo agente",
          provider: "erro do modelo",
          interrupted: "processo encerrado",
          superseded: "substituído por um run corrigido",
        },
        truncated: "(truncado - histórico completo no journal do run)",
        interruptedNotice: ({ label, runId }) =>
          `O workflow ${label} foi interrompido e pode ser retomado: /dwf resume ${runId}`,
      },
    },
    selection: {
      defaultHelp: "Enter seleciona, Esc cancela",
      disabled: (reason) => ` [desativado: ${reason}]`,
      filterLine: ({ filter, help }) =>
        `filtro: ${filter || "-"} | ${help ?? "Enter seleciona, Esc cancela"}`,
      noFilter: "-",
    },
    fileMention: {
      empty: "Nenhum caminho do workspace correspondente.",
      loading: "Carregando caminhos do workspace...",
      row: ({ path, selected }) => `${selected ? ">" : " "} ${path}`,
      title: "Arquivos",
    },
    slash: {
      title: "Comandos",
      row: ({ name, selected, summary }) => `${selected ? ">" : " "} /${name}  ${summary}`,
    },
  },
};
