import type { Locale, SkillScope } from "@zcode/shared";

interface SkillDisplayCandidate {
  name: string;
  description: string;
  path: string;
  scope: SkillScope;
  pluginName?: string;
}

const OFFICIAL_BUILTIN_PLUGIN_NAMES = new Set([
  "android-emulator",
  "browser",
  "browser-use",
  "document-skills",
  "documents",
  "pdf",
  "presentations",
  "spreadsheets",
  "ios-simulator",
  "skill-creator",
  "plugin-creator",
  "superpowers",
  "zcode-guide",
]);

const OFFICIAL_PLUGIN_PATH_MARKERS = [
  "/zcode-plugins-official/",
  "\\zcode-plugins-official\\",
  "/android-emulator-plugin/",
  "/browser-use-plugin/",
  "/document-skills-plugin/",
  "/documents-plugin/",
  "/pdf-plugin/",
  "/presentations-plugin/",
  "/spreadsheets-plugin/",
  "/ios-simulator-plugin/",
  "/skill-creator-plugin/",
  "/plugin-creator-plugin/",
  "/superpowers-plugin/",
  "/zcode-guide-plugin/",
];

const BUILTIN_SKILL_DESCRIPTIONS: Record<string, Record<Locale, string>> = {
  "android-dev": {
    "zh-CN": "通过 android-emulator MCP 工具构建、运行、检查并轻量自动化 Android 应用。",
    "en-US":
      "Build, run, inspect, and lightly automate Android apps through the android-emulator MCP tools.",
    "pt-BR":
      "Compile, execute, inspecione e automatize levemente apps Android pelas ferramentas MCP do android-emulator.",
  },
  brainstorming: {
    "zh-CN":
      "在任何创造性工作前使用：创建功能、构建组件、增加能力或修改行为；先探索用户意图、需求和设计。",
    "en-US":
      "Use before any creative work, including creating features, building components, adding functionality, or modifying behavior. Explores user intent, requirements, and design before implementation.",
    "pt-BR":
      "Use antes de qualquer trabalho criativo: criar funcionalidades, construir componentes, adicionar capacidades ou modificar comportamento. Explora a intenção do usuário, requisitos e design antes da implementação.",
  },
  "control-browser": {
    "zh-CN": "控制 ZCode 内置浏览器，用于打开、检查、点击、输入、截图或验证网页和本地开发页面。",
    "en-US":
      "Control ZCode's built-in browser to open, inspect, click, type, screenshot, or verify webpages and local development targets.",
    "pt-BR":
      "Controle o navegador embutido do ZCode para abrir, inspecionar, clicar, digitar, capturar telas ou verificar páginas web e alvos de desenvolvimento locais.",
  },
  "dispatching-parallel-agents": {
    "zh-CN": "面对 2 个以上彼此独立、无共享状态或顺序依赖的任务时使用。",
    "en-US":
      "Use when facing 2+ independent tasks that can be worked on without shared state or sequential dependencies.",
    "pt-BR":
      "Use ao enfrentar 2 ou mais tarefas independentes que podem ser executadas sem estado compartilhado ou dependências sequenciais.",
  },
  docx: {
    "zh-CN":
      "完整的 DOCX 文档创建、编辑与分析能力，支持修订、批注、格式保持和文本提取。适用于创建新文档、修改内容、处理修订、添加批注或其它专业 Word 文档任务。",
    "en-US":
      "Create, edit, and analyze DOCX documents with revisions, comments, formatting preservation, and text extraction. Use for new documents, edits, revision handling, comments, and professional Word document work.",
    "pt-BR":
      "Crie, edite e analise documentos DOCX com revisões, comentários, preservação de formatação e extração de texto. Use para novos documentos, edições, tratamento de revisões, comentários e trabalho profissional com documentos Word.",
  },
  "dynamic-workflows": {
    "zh-CN":
      "编写、调试或重新提交 CreateWorkflow 的 dynamic workflow 脚本时使用：如何设计子代理拓扑、定义结果类型、按文件或 git 扇出、用 world.run 命令做门控检查、用 EvalWorkflowSnippet 预检片段、写 planner-reviewer 循环、用 report() 保住已完成的工作、把产物发布给用户，以及 run 转入后台后该怎么处理。",
    "en-US":
      "Use when writing, debugging, or resubmitting a dynamic-workflow script for CreateWorkflow: choosing subagent topology, typing subagent results, fanning out over files or git, gating loops on world.run commands, testing pieces with EvalWorkflowSnippet, planner-reviewer loops, report() salvage, publishing artifacts the user opens, and handling a backgrounded run.",
    "pt-BR":
      "Use ao escrever, depurar ou reenviar um script de dynamic workflow para o CreateWorkflow: escolher a topologia de subagentes, tipar resultados de subagentes, fan-out sobre arquivos ou git, gating de loops com comandos world.run, testar trechos com EvalWorkflowSnippet, loops planner-reviewer, resgate com report(), publicar artefatos que o usuário abre e lidar com um run em segundo plano.",
  },
  "executing-plans": {
    "zh-CN": "已有书面实现计划，并要在带评审检查点的独立会话中执行时使用。",
    "en-US":
      "Use when you have a written implementation plan to execute in a separate session with review checkpoints.",
    "pt-BR":
      "Use quando você tiver um plano de implementação escrito para executar em uma sessão separada com checkpoints de revisão.",
  },
  "finishing-a-development-branch": {
    "zh-CN": "实现已完成、测试通过、需要决定如何合并、发 PR 或清理分支时使用。",
    "en-US":
      "Use when implementation is complete, tests pass, and you need to decide how to integrate the work through merge, PR, or cleanup.",
    "pt-BR":
      "Use quando a implementação estiver completa, os testes passarem e você precisar decidir como integrar o trabalho via merge, PR ou limpeza.",
  },
  "ios-dev": {
    "zh-CN": "通过 ios-simulator MCP 工具构建、运行、检查并轻量自动化 iOS 模拟器应用。",
    "en-US":
      "Build, run, inspect, and lightly automate iOS Simulator apps through the ios-simulator MCP tools.",
    "pt-BR":
      "Compile, execute, inspecione e automatize levemente apps do iOS Simulator pelas ferramentas MCP do ios-simulator.",
  },
  pdf: {
    "zh-CN":
      "专业 PDF 工具集，覆盖报告、创意视觉、学术 LaTeX 和现有 PDF 处理四条生产线。可按文档类型自动路由，支持报告、海报、论文、简历、提取、合并、拆分、表单填写和格式转换等任务。",
    "en-US":
      "Professional PDF toolkit for reports, creative visuals, academic LaTeX, and existing-PDF workflows. Supports reports, posters, papers, resumes, extraction, merge, split, forms, and conversion.",
    "pt-BR":
      "Kit de ferramentas PDF profissional para relatórios, visuais criativos, LaTeX acadêmico e fluxos com PDFs existentes. Suporta relatórios, pôsteres, artigos, currículos, extração, mesclagem, divisão, formulários e conversão.",
  },
  pptx: {
    "zh-CN":
      "检查并窄范围更新从 PPTX 预览区选择的元素。通过完整文件指纹和 OOXML 定位校验 shape 文本或表格单元格，冲突时停止而不猜测。",
    "en-US":
      "Inspect and narrowly update elements selected in PPTX Preview Pane. Verifies the whole-file fingerprint and OOXML locator for shape or table-cell text, and stops on conflicts instead of guessing.",
    "pt-BR":
      "Inspecione e atualize de forma restrita elementos selecionados no Painel de Visualização PPTX. Verifica a impressão digital do arquivo inteiro e o localizador OOXML para texto de shape ou célula de tabela, e para em conflitos em vez de adivinhar.",
  },
  "receiving-code-review": {
    "zh-CN":
      "收到代码评审反馈、准备实现建议前使用；尤其当反馈不清楚或技术上可疑时，需要严谨验证而非盲目同意。",
    "en-US":
      "Use when receiving code review feedback before implementing suggestions, especially when feedback is unclear or technically questionable.",
    "pt-BR":
      "Use ao receber feedback de revisão de código antes de implementar sugestões, especialmente quando o feedback não estiver claro ou for tecnicamente questionável.",
  },
  "requesting-code-review": {
    "zh-CN": "完成任务、实现重大功能或合并前，用于请求代码评审以确认满足需求。",
    "en-US":
      "Use when completing tasks, implementing major features, or before merging to verify work meets requirements.",
    "pt-BR":
      "Use ao concluir tarefas, implementar funcionalidades importantes ou antes de mesclar para verificar se o trabalho atende aos requisitos.",
  },
  "plugin-creator": {
    "zh-CN": "创建、校验 ZCode 插件，并指导本地安装与更新。",
    "en-US": "Create and validate ZCode plugins, and guide local installation and updates.",
    "pt-BR":
      "Crie e valide plugins do ZCode, e oriente a instalação e a atualização locais.",
  },
  "skill-creator": {
    "zh-CN":
      "创建新技能、编辑现有技能并迭代措辞。适用于从零编写 SKILL.md、改进已有技能、把重复工作流沉淀为可复用技能，或优化技能描述以提升触发可靠性。",
    "en-US":
      "Create new skills, edit existing skills, and iterate wording. Use for writing SKILL.md from scratch, improving skills, capturing repeated workflows, or tuning descriptions for reliable triggering.",
    "pt-BR":
      "Crie novas skills, edite skills existentes e itere o texto. Use para escrever SKILL.md do zero, melhorar skills, capturar fluxos de trabalho repetidos ou ajustar descrições para um acionamento confiável.",
  },
  "subagent-driven-development": {
    "zh-CN": "在当前会话中执行包含独立任务的实现计划时使用。",
    "en-US":
      "Use when executing implementation plans with independent tasks in the current session.",
    "pt-BR":
      "Use ao executar planos de implementação com tarefas independentes na sessão atual.",
  },
  "systematic-debugging": {
    "zh-CN": "遇到任何 bug、测试失败或异常行为时，在提出修复前使用。",
    "en-US":
      "Use when encountering any bug, test failure, or unexpected behavior, before proposing fixes.",
    "pt-BR":
      "Use ao encontrar qualquer bug, falha de teste ou comportamento inesperado, antes de propor correções.",
  },
  "test-driven-development": {
    "zh-CN": "实现任何功能或 bugfix 时，在编写实现代码前使用。",
    "en-US": "Use when implementing any feature or bugfix, before writing implementation code.",
    "pt-BR":
      "Use ao implementar qualquer funcionalidade ou correção de bug, antes de escrever o código de implementação.",
  },
  "using-git-worktrees": {
    "zh-CN":
      "开始需要隔离的功能工作或执行实现计划前使用，确保存在隔离 workspace，优先使用原生工具，否则回退 git worktree。",
    "en-US":
      "Use when starting feature work that needs isolation or before executing implementation plans. Ensures an isolated workspace exists via native tools or git worktree fallback.",
    "pt-BR":
      "Use ao iniciar trabalho de funcionalidade que precise de isolamento ou antes de executar planos de implementação. Garante que exista um workspace isolado via ferramentas nativas ou fallback para git worktree.",
  },
  "using-superpowers": {
    "zh-CN":
      "开始任何对话时使用；说明如何查找和使用技能，并要求在任何回复包括澄清问题前调用 Skill 工具。",
    "en-US":
      "Use when starting any conversation. Establishes how to find and use skills, requiring Skill tool invocation before any response including clarifying questions.",
    "pt-BR":
      "Use ao iniciar qualquer conversa. Estabelece como encontrar e usar skills, exigindo a invocação da ferramenta Skill antes de qualquer resposta, incluindo perguntas de esclarecimento.",
  },
  "verification-before-completion": {
    "zh-CN":
      "准备声明工作完成、已修复或测试通过前使用；要求先运行验证命令并确认输出，先有证据再下结论。",
    "en-US":
      "Use before claiming work is complete, fixed, or passing. Requires running verification commands and confirming output before success claims.",
    "pt-BR":
      "Use antes de afirmar que o trabalho está completo, corrigido ou passando. Exige executar comandos de verificação e confirmar a saída antes de declarar sucesso.",
  },
  "web-gui-tester": {
    "zh-CN":
      "使用 ZCode Browser Use 对网页和本地 Web 前端执行纯 GUI 黑盒测试，通过真实用户交互、DOM 语义证据和截图验证功能、交互与响应式布局。",
    "en-US":
      "Run pure GUI black-box tests against websites and local web frontends with ZCode Browser Use, combining real user interactions, semantic DOM evidence, and inspected screenshots.",
    "pt-BR":
      "Execute testes black-box puramente de GUI contra sites e frontends web locais com o ZCode Browser Use, combinando interações reais de usuário, evidências semânticas do DOM e capturas de tela inspecionadas.",
  },
  "writing-plans": {
    "zh-CN": "已有规格或多步骤任务需求，在动代码前用于编写实现计划。",
    "en-US":
      "Use when you have a spec or requirements for a multi-step task, before touching code.",
    "pt-BR":
      "Use quando você tiver uma especificação ou requisitos para uma tarefa de múltiplas etapas, antes de tocar no código.",
  },
  "writing-skills": {
    "zh-CN": "创建新技能、编辑现有技能或在发布前验证技能是否有效时使用。",
    "en-US":
      "Use when creating new skills, editing existing skills, or verifying skills work before deployment.",
    "pt-BR":
      "Use ao criar novas skills, editar skills existentes ou verificar se as skills funcionam antes da implantação.",
  },
};

export function resolveSkillSourceLabel(scope: SkillScope, locale?: Locale): string {
  if (locale === "zh-CN") {
    if (scope === "workspace") return "工作区";
    if (scope === "plugin") return "插件";
    return "用户";
  }
  if (locale === "pt-BR") {
    if (scope === "workspace") return "Workspace";
    if (scope === "plugin") return "Plugin";
    return "Usuário";
  }
  if (scope === "workspace") return "Workspace";
  if (scope === "plugin") return "Plugin";
  return "User";
}

export function resolveSkillDisplayDescription(
  skill: SkillDisplayCandidate,
  locale?: Locale,
): string {
  const localized = isOfficialBuiltinSkill(skill)
    ? BUILTIN_SKILL_DESCRIPTIONS[skill.name]?.[locale ?? "en-US"]
    : undefined;
  return localized ?? skill.description;
}

function isOfficialBuiltinSkill(skill: SkillDisplayCandidate): boolean {
  if (skill.scope !== "plugin") {
    return false;
  }
  const pluginName = skill.pluginName?.trim();
  if (pluginName && OFFICIAL_BUILTIN_PLUGIN_NAMES.has(pluginName)) {
    return true;
  }
  const normalizedPath = skill.path.replaceAll("\\", "/");
  return OFFICIAL_PLUGIN_PATH_MARKERS.some((marker) => normalizedPath.includes(marker));
}
