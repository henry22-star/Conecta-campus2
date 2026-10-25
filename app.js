"use strict";

/* =========================================================
   CONECTA CAMPUS
   Protótipo frontend com armazenamento local.
   Não utilizar com dados ou senhas reais.
========================================================= */

const $ = (selector, root = document) => root.querySelector(selector);

const STORAGE_KEY = "conectaCampus_v2";

const ROLES = {
  aluno: "Estudante",
  professor: "Professor",
  coordenador: "Coordenador",
  ti: "Administrador de TI",
  financeiro: "Financeiro",
  ceo: "CEO / Direção executiva"
};

const DEMO_USERS = [
  {
    id: "u1",
    name: "Ana Oliveira",
    email: "estudante@conecta.local",
    password: "Aluno@2026!",
    role: "aluno",
    course: "Sistemas de Informação",
    registration: "2026001"
  },
  {
    id: "u2",
    name: "Prof. Rafael Lima",
    email: "professor@conecta.local",
    password: "Prof@2026!",
    role: "professor",
    department: "Tecnologia da Informação"
  },
  {
    id: "u3",
    name: "Mariana Costa",
    email: "coordenador@conecta.local",
    password: "Coord@Campus#2026",
    role: "coordenador",
    department: "Coordenação Acadêmica"
  },
  {
    id: "u4",
    name: "Equipe de TI",
    email: "ti@conecta.local",
    password: "TI@Campus#2026",
    role: "ti",
    department: "Tecnologia"
  },
  {
    id: "u5",
    name: "Lucas Martins",
    email: "financeiro@conecta.local",
    password: "Fin@2026!",
    role: "financeiro",
    department: "Financeiro"
  },
  {
    id: "u6",
    name: "Direção Executiva",
    email: "ceo@conecta.local",
    password: "CEO@Campus#2026",
    role: "ceo",
    department: "Direção"
  }
];

const MENUS = {
  aluno: [
    ["dashboard", "⌂", "Visão geral"],
    ["monitorias", "◎", "Monitorias"],
    ["eventos", "✦", "Eventos"],
    ["estagios", "↗", "Estágios"],
    ["calendario", "▦", "Calendário"],
    ["inscricoes", "✓", "Minhas inscrições"],
    ["favoritos", "♡", "Favoritos"],
    ["perfil", "◉", "Meu perfil"],
    ["solicitacoes", "▤", "Solicitações acadêmicas"]
  ],

  professor: [
    ["dashboard", "⌂", "Painel"],
    ["monitorias", "◎", "Gerenciar monitorias"],
    ["materiais", "▤", "Materiais e avisos"],
    ["atividades", "◷", "Acompanhar atividades"],
    ["solicitacoes", "▣", "Solicitações autorizadas"],
    ["perfil", "◉", "Perfil"]
  ],

  coordenador: [
    ["dashboard", "⌂", "Painel de coordenação"],
    ["eventos", "✦", "Gerenciar eventos"],
    ["monitorias", "◎", "Monitorias"],
    ["calendario", "▦", "Calendário acadêmico"],
    ["avisos", "▣", "Avisos"],
    ["solicitacoes", "▤", "Solicitações"],
    ["perfil", "◉", "Perfil"]
  ],

  ti: [
    ["dashboard", "⌂", "Painel técnico"],
    ["usuarios", "♙", "Usuários demo"],
    ["auditoria", "◷", "Auditoria"],
    ["configuracoes", "⚙", "Configurações"],
    ["dados", "⇩", "Exportar dados"],
    ["perfil", "◉", "Perfil"]
  ],

  financeiro: [
    ["dashboard", "⌂", "Painel financeiro"],
    ["lancamentos", "＄", "Lançamentos"],
    ["categorias", "▦", "Categorias"],
    ["relatorios", "▤", "Relatórios"],
    ["perfil", "◉", "Perfil"]
  ],

  ceo: [
    ["dashboard", "⌂", "Dashboard executivo"],
    ["relatorios", "▤", "Relatórios gerenciais"],
    ["atividade", "◷", "Atividade da plataforma"],
    ["perfil", "◉", "Perfil"]
  ]
};

/* -------------------- DADOS DEMONSTRATIVOS -------------------- */

function offsetDate(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);

  return [
    d.getFullYear(),
    String(d.getMonth() + 1).padStart(2, "0"),
    String(d.getDate()).padStart(2, "0")
  ].join("-");
}

function createInitialData() {
  return {
    version: 2,

    users: structuredClone(DEMO_USERS),

    monitorias: [
      {
        id: "m1",
        title: "Introdução à Programação",
        area: "Tecnologia",
        teacher: "Prof. Rafael Lima",
        schedule: "Terças, 14h–16h",
        seats: 20,
        description: "Apoio em lógica, algoritmos e primeiros programas.",
        status: "Aberta"
      },
      {
        id: "m2",
        title: "Banco de Dados I",
        area: "Tecnologia",
        teacher: "Prof. Rafael Lima",
        schedule: "Quintas, 10h–12h",
        seats: 15,
        description: "Prática de SQL e modelagem de dados.",
        status: "Aberta"
      },
      {
        id: "m3",
        title: "Matemática Discreta",
        area: "Exatas",
        teacher: "Profa. Camila Souza",
        schedule: "Segundas, 16h–18h",
        seats: 12,
        description: "Lógica, conjuntos e combinatória.",
        status: "Aberta"
      }
    ],

    eventos: [
      {
        id: "e1",
        title: "Semana de Tecnologia",
        date: offsetDate(5),
        time: "09:00",
        location: "Auditório Central",
        category: "Acadêmico",
        description: "Palestras, oficinas e projetos estudantis.",
        status: "Publicado"
      },
      {
        id: "e2",
        title: "Feira de Estágios",
        date: offsetDate(12),
        time: "14:00",
        location: "Bloco B",
        category: "Carreira",
        description: "Encontro demonstrativo com empresas.",
        status: "Publicado"
      },
      {
        id: "e3",
        title: "Oficina de Git e GitHub",
        date: offsetDate(18),
        time: "15:00",
        location: "Laboratório 2",
        category: "Oficina",
        description: "Introdução ao versionamento de código.",
        status: "Publicado"
      }
    ],

    estagios: [
      {
        id: "i1",
        title: "Estágio em Desenvolvimento Web",
        company: "Nuvem Digital (fictícia)",
        area: "Desenvolvimento",
        modality: "Híbrido",
        deadline: offsetDate(20),
        description: "Apoio em HTML, CSS e JavaScript.",
        status: "Aberta"
      },
      {
        id: "i2",
        title: "Estágio de Suporte de TI",
        company: "Campus Tech (fictícia)",
        area: "Infraestrutura",
        modality: "Presencial",
        deadline: offsetDate(28),
        description: "Apoio ao atendimento e infraestrutura.",
        status: "Aberta"
      },
      {
        id: "i3",
        title: "Estágio em Dados",
        company: "DataLab (fictícia)",
        area: "Dados",
        modality: "Remoto",
        deadline: offsetDate(35),
        description: "Consultas SQL e elaboração de relatórios.",
        status: "Aberta"
      }
    ],

    materiais: [
      {
        id: "mat1",
        title: "Roteiro de estudos — Algoritmos",
        kind: "Material",
        audience: "Todos os estudantes",
        date: offsetDate(-2),
        description: "Revisão de variáveis, condicionais, laços e funções.",
        author: "Prof. Rafael Lima"
      },
      {
        id: "mat2",
        title: "Aviso: atendimento de monitoria",
        kind: "Aviso",
        audience: "Sistemas de Informação",
        date: offsetDate(-1),
        description: "Confira os horários de atendimento das monitorias.",
        author: "Prof. Rafael Lima"
      }
    ],

    avisos: [],

    solicitacoes: [
      {
        id: "s1",
        owner: "Ana Oliveira",
        ownerId: "u1",
        type: "Declaração de matrícula",
        subject: "Solicito declaração atualizada",
        details: "Preciso de uma declaração para um processo seletivo.",
        date: offsetDate(-1),
        status: "Em análise",
        assigned: "Coordenação Acadêmica",
        authorized: true,
        response: ""
      },
      {
        id: "s2",
        owner: "Ana Oliveira",
        ownerId: "u1",
        type: "Dúvida acadêmica",
        subject: "Equivalência de disciplina",
        details: "Gostaria de orientação sobre equivalência.",
        date: offsetDate(-3),
        status: "Respondida",
        assigned: "Prof. Rafael Lima",
        authorized: true,
        response: "Consulte a coordenação para análise formal.",
        replyBy: "Prof. Rafael Lima"
      }
    ],

    inscricoes: [],
    favoritos: { u1: ["e1", "m1"] },

    financeiro: [
      {
        id: "f1",
        date: offsetDate(-12),
        category: "Mensalidades fictícias",
        description: "Receita demonstrativa",
        type: "Receita",
        amount: 12500
      },
      {
        id: "f2",
        date: offsetDate(-8),
        category: "Infraestrutura",
        description: "Manutenção de equipamentos",
        type: "Despesa",
        amount: 2800
      },
      {
        id: "f3",
        date: offsetDate(-4),
        category: "Eventos",
        description: "Custos de evento acadêmico",
        type: "Despesa",
        amount: 950
      },
      {
        id: "f4",
        date: offsetDate(-2),
        category: "Mensalidades fictícias",
        description: "Receita demonstrativa",
        type: "Receita",
        amount: 8700
      }
    ],

    auditoria: [],
    atividade: [],

    configuracoes: {
      campusName: "Conecta Campus",
      semester: "2026.2",
      maintenance: false
    }
  };
}

function loadData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      const parsed = JSON.parse(saved);

      if (parsed.version === 2) {
        const initial = createInitialData();

        // Garante que listas novas existam caso o esquema evolua.
        Object.keys(initial).forEach(key => {
          if (parsed[key] === undefined) {
            parsed[key] = initial[key];
          }
        });

        return parsed;
      }
    }
  } catch (error) {
    console.warn("Não foi possível carregar os dados locais.", error);
  }

  return createInitialData();
}

let db = loadData();
let currentUser = null;
let activePage = "dashboard";
let modalHandler = null;
let toastTimeout = null;

/* -------------------- UTILITÁRIOS -------------------- */

function saveData() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
    return true;
  } catch (error) {
    console.error(error);
    notify("Não foi possível salvar. Verifique o armazenamento do navegador.");
    return false;
  }
}

function makeId(prefix = "item") {
  return prefix + "_" + Date.now().toString(36) +
    "_" + Math.random().toString(36).slice(2, 7);
}

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

function money(value) {
  return Number(value || 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function formatDate(value) {
  if (!value) return "—";

  const date = new Date(value + "T12:00:00");

  return Number.isNaN(date.getTime())
    ? "—"
    : date.toLocaleDateString("pt-BR");
}

function roleLabel(role) {
  return ROLES[role] || role || "—";
}

function notify(message) {
  const element = $("#toast");
  element.textContent = message;
  element.classList.add("show");

  clearTimeout(toastTimeout);

  toastTimeout = setTimeout(() => {
    element.classList.remove("show");
  }, 3000);
}

function logAction(action, detail = "") {
  const entry = {
    id: makeId("log"),
    user: currentUser?.name || "Sistema",
    role: currentUser?.role || "sistema",
    action,
    detail,
    date: new Date().toISOString()
  };

  db.auditoria.unshift(entry);
  db.atividade.unshift(entry);

  db.auditoria = db.auditoria.slice(0, 500);
  db.atividade = db.atividade.slice(0, 500);

  saveData();
}

function allCatalogItems() {
  return [
    ...db.monitorias,
    ...db.eventos,
    ...db.estagios
  ];
}

function myRegistrations() {
  return db.inscricoes.filter(item => item.userId === currentUser.id);
}

function myFavorites() {
  return db.favoritos[currentUser.id] || [];
}

function isFavorite(itemId) {
  return myFavorites().includes(itemId);
}

function menuLabel(page) {
  const list = MENUS[currentUser.role] || [];

  return list.find(item => item[0] === page)?.[2] || "Painel";
}

/* -------------------- COMPONENTES HTML -------------------- */

function pageHeader(title, description, action = "") {
  return `
    <div class="page-heading">
      <div>
        <h1>${escapeHTML(title)}</h1>
        <p>${escapeHTML(description)}</p>
      </div>
      <div class="heading-actions">${action}</div>
    </div>`;
}

function button(label, action, style = "primary") {
  return `
    <button type="button" class="btn ${style}"
      data-action="${escapeHTML(action)}">
      ${escapeHTML(label)}
    </button>`;
}

function stat(label, value, icon, note = "") {
  return `
    <article class="stat-card">
      <div class="stat-top">
        <span>${escapeHTML(label)}</span>
        <span class="stat-icon">${icon}</span>
      </div>
      <div class="stat-value">${escapeHTML(value)}</div>
      <div class="stat-note">${escapeHTML(note)}</div>
    </article>`;
}

function statsGrid(items) {
  return `<div class="grid stats-grid">
    ${items.map(item => stat(...item)).join("")}
  </div>`;
}

function panel(title, body, subtitle = "", action = "") {
  return `
    <section class="panel">
      <div class="panel-head">
        <div>
          <h2 class="section-title">${escapeHTML(title)}</h2>
          ${subtitle
            ? `<p class="section-subtitle">${escapeHTML(subtitle)}</p>`
            : ""}
        </div>
        ${action}
      </div>
      ${body}
    </section>`;
}

function emptyState(title, description = "Nada para mostrar por enquanto.") {
  return `
    <div class="empty-state">
      <strong>${escapeHTML(title)}</strong>
      ${escapeHTML(description)}
    </div>`;
}

function tag(status) {
  let style = "";

  if (/aberta|publicado|respondida|aprovada|ativa|registrada|receita/i.test(status)) {
    style = "green";
  } else if (/análise|pendente|rascunho|aguardando|despesa/i.test(status)) {
    style = "amber";
  } else if (/negada|cancelada|encerrada|rejeitada|erro/i.test(status)) {
    style = "red";
  }

  return `<span class="tag ${style}">${escapeHTML(status)}</span>`;
}

function quickLink(icon, title, description, page) {
  return `
    <button class="quick-link" data-action="goto:${page}">
      <span class="q-icon">${icon}</span>
      <span>
        <strong>${escapeHTML(title)}</strong>
        <small>${escapeHTML(description)}</small>
      </span>
    </button>`;
}

function activityList(rows, limit = 6) {
  if (!rows.length) {
    return emptyState("Sem atividade recente",
      "As ações registradas aparecerão aqui.");
  }

  return `<div class="activity-list">
    ${rows.slice(0, limit).map(row => `
      <div class="activity-row">
        <div class="activity-dot">↗</div>
        <div>
          <strong>${escapeHTML(row.action)}</strong>
          <p>${escapeHTML(row.detail || "Atividade registrada")}</p>
          <time>${escapeHTML(row.user || "Sistema")} ·
            ${new Date(row.date).toLocaleString("pt-BR")}
          </time>
        </div>
      </div>
    `).join("")}
  </div>`;
}

/* -------------------- MENU E NAVEGAÇÃO -------------------- */

function renderNavigation() {
  const menu = MENUS[currentUser.role] || [];

  $("#sideNav").innerHTML = menu.map(([key, icon, label]) => `
    <button class="nav-item ${activePage === key ? "active" : ""}"
      data-page="${key}">
      <span class="nav-icon">${icon}</span>
      <span>${escapeHTML(label)}</span>
    </button>
  `).join("");
}

function navigate(page) {
  const menu = MENUS[currentUser.role] || [];

  if (!menu.some(item => item[0] === page)) {
    notify("Essa área não está disponível para este perfil.");
    return;
  }

  activePage = page;
  renderNavigation();
  renderPage();

  $("#sidebar").classList.remove("open");
}

function renderPage() {
  if (!currentUser) return;

  $("#pageCrumb").textContent = menuLabel(activePage);
  $("#content").innerHTML = getPageContent();
}

/* -------------------- DASHBOARDS POR PERFIL -------------------- */

function getPageContent() {
  const role = currentUser.role;

  if (activePage === "dashboard") {
    switch (role) {
      case "aluno": return studentDashboard();
      case "professor": return teacherDashboard();
      case "coordenador": return coordinatorDashboard();
      case "ti": return itDashboard();
      case "financeiro": return financeDashboard();
      case "ceo": return executiveDashboard();
    }
  }

  const handlers = {
    monitorias: () => role === "professor"
      ? manageMonitorias()
      : browseMonitorias(),

    eventos: () => role === "coordenador"
      ? manageEvents()
      : browseEvents(),

    estagios: browseInternships,
    calendario: calendarPage,
    inscricoes: registrationsPage,
    favoritos: favoritesPage,
    perfil: profilePage,

    solicitacoes: () => role === "professor"
      ? teacherRequests()
      : requestsPage(),

    materiais: materialsPage,
    atividades: activitiesPage,
    avisos: noticesPage,
    usuarios: usersPage,
    auditoria: auditPage,
    configuracoes: settingsPage,
    dados: dataPage,
    lancamentos: financeEntriesPage,
    categorias: financeCategoriesPage,

    relatorios: () => role === "financeiro"
      ? financeReportsPage()
      : executiveReportsPage(),

    atividade: platformActivityPage
  };

  return handlers[activePage]
    ? handlers[activePage]()
    : emptyState("Área indisponível");
}

function studentDashboard() {
  const pending = db.solicitacoes.filter(item =>
    item.ownerId === currentUser.id &&
    !["Respondida", "Concluída", "Negada"].includes(item.status)
  ).length;

  return pageHeader(
    "Olá, " + currentUser.name.split(" ")[0] + " 👋",
    "Organize sua vida acadêmica e encontre novas oportunidades.",
    button("Explorar eventos", "goto:eventos")
  ) +
  statsGrid([
    ["Monitorias abertas", db.monitorias.filter(x => x.status === "Aberta").length, "◎", "Apoio acadêmico"],
    ["Eventos publicados", db.eventos.filter(x => x.status === "Publicado").length, "✦", "Atividades do campus"],
    ["Minhas inscrições", myRegistrations().length, "✓", "Registros realizados"],
    ["Solicitações em aberto", pending, "▤", "Acompanhe suas demandas"]
  ]) +
  `<div class="grid dashboard-grid">
    ${panel("Próximos eventos",
      db.eventos.filter(x => x.status === "Publicado")
        .sort((a, b) => a.date.localeCompare(b.date))
        .slice(0, 3).map(eventCard).join("") ||
        emptyState("Nenhum evento publicado"),
      "Programação acadêmica",
      button("Ver todos", "goto:eventos", "secondary"))}
    ${panel("Acesso rápido", `<div class="grid two-col">
      ${quickLink("◎", "Monitorias", "Apoio aos estudos", "monitorias")}
      ${quickLink("↗", "Estágios", "Oportunidades", "estagios")}
      ${quickLink("▦", "Calendário", "Datas acadêmicas", "calendario")}
      ${quickLink("▤", "Solicitações", "Pedir apoio", "solicitacoes")}
    </div>`)}
  </div>` +
  panel("Avisos recentes",
    db.materiais.filter(x => x.kind === "Aviso")
      .map(materialRow).join("") || emptyState("Nenhum aviso"));
}

function teacherDashboard() {
  const assigned = db.solicitacoes.filter(x =>
    x.assigned === currentUser.name && x.authorized
  );

  return pageHeader("Painel do professor",
    "Gerencie monitorias, materiais e solicitações acadêmicas.") +
    statsGrid([
      ["Monitorias", db.monitorias.length, "◎", "Catálogo acadêmico"],
      ["Materiais publicados", db.materiais.filter(x => x.author === currentUser.name).length, "▤", "Conteúdos cadastrados"],
      ["Solicitações atribuídas", assigned.length, "▣", "Acesso autorizado"],
      ["Inscrições totais", db.inscricoes.length, "✓", "Registros da demonstração"]
    ]) +
    `<div class="grid dashboard-grid">
      ${panel("Monitorias", db.monitorias.slice(0, 5)
        .map(x => activityRow(x.title, x.schedule, x.status)).join(""),
        "Acompanhe o catálogo",
        button("Gerenciar", "goto:monitorias", "secondary"))}
      ${panel("Solicitações atribuídas",
        assigned.map(requestRow).join("") ||
        emptyState("Nenhuma solicitação atribuída"),
        "Demandas autorizadas",
        button("Abrir", "goto:solicitacoes", "secondary"))}
    </div>`;
}

function coordinatorDashboard() {
  const pending = db.solicitacoes.filter(x =>
    !["Respondida", "Concluída", "Negada"].includes(x.status)
  ).length;

  return pageHeader("Painel de coordenação",
    "Acompanhe a programação acadêmica e as solicitações.") +
    statsGrid([
      ["Eventos", db.eventos.length, "✦", "Programação"],
      ["Monitorias", db.monitorias.length, "◎", "Apoio estudantil"],
      ["Solicitações abertas", pending, "▤", "Demandas pendentes"],
      ["Avisos", db.avisos.length + db.materiais.filter(x => x.kind === "Aviso").length, "▣", "Comunicados"]
    ]) +
    `<div class="grid dashboard-grid">
      ${panel("Solicitações recentes",
        db.solicitacoes.slice(0, 6).map(requestRow).join("") ||
        emptyState("Nenhuma solicitação"),
        "Fluxo acadêmico",
        button("Acompanhar", "goto:solicitacoes", "secondary"))}
      ${panel("Próximos eventos",
        db.eventos.slice().sort((a, b) => a.date.localeCompare(b.date))
          .slice(0, 5).map(e => activityRow(e.title, formatDate(e.date), e.status)).join(""))}
    </div>`;
}

function itDashboard() {
  return pageHeader("Painel técnico",
    "Configurações, usuários demonstrativos e exportação.") +
    `<div class="notice warning">
      Este é um protótipo local. A auditoria pode ser modificada por quem tiver
      acesso ao navegador e não substitui registros de servidor.
    </div>` +
    statsGrid([
      ["Usuários demo", db.users.length, "♙", "Contas de teste"],
      ["Registros de auditoria", db.auditoria.length, "◷", "Armazenamento local"],
      ["Monitorias", db.monitorias.length, "◎", "Dados locais"],
      ["Modo manutenção", db.configuracoes.maintenance ? "Ativo" : "Inativo", "⚙", "Configuração visual"]
    ]) +
    `<div class="grid two-col">
      ${panel("Atalhos técnicos", `<div class="grid two-col">
        ${quickLink("♙", "Usuários", "Contas demo", "usuarios")}
        ${quickLink("◷", "Auditoria", "Histórico local", "auditoria")}
        ${quickLink("⚙", "Configurações", "Preferências", "configuracoes")}
        ${quickLink("⇩", "Exportar", "Backup de dados", "dados")}
      </div>`)}
      ${panel("Atividade recente", activityList(db.auditoria, 6))}
    </div>`;
}

function financeTotals() {
  const income = db.financeiro
    .filter(x => x.type === "Receita")
    .reduce((sum, x) => sum + Number(x.amount), 0);

  const expenses = db.financeiro
    .filter(x => x.type === "Despesa")
    .reduce((sum, x) => sum + Number(x.amount), 0);

  return { income, expenses, balance: income - expenses };
}

function financeDashboard() {
  const totals = financeTotals();

  return pageHeader("Painel financeiro",
    "Indicadores fictícios e relatórios demonstrativos.") +
    `<div class="notice warning">
      Os valores financeiros deste portal são fictícios e não representam
      cobranças, saldos bancários ou registros contábeis reais.
    </div>` +
    statsGrid([
      ["Receitas", money(totals.income), "↗", "Valores demonstrativos"],
      ["Despesas", money(totals.expenses), "↘", "Valores demonstrativos"],
      ["Saldo demonstrativo", money(totals.balance), "＄", "Receitas menos despesas"],
      ["Lançamentos", db.financeiro.length, "▤", "Registros locais"]
    ]) +
    `<div class="grid dashboard-grid">
      ${panel("Lançamentos recentes",
        financeTable(db.financeiro.slice().sort((a, b) =>
          b.date.localeCompare(a.date)).slice(0, 5)),
        "Entradas e saídas",
        button("Gerenciar", "goto:lancamentos", "secondary"))}
      ${panel("Resumo por categoria", categorySummary())}
    </div>`;
}

function executiveDashboard() {
  const pending = db.solicitacoes.filter(x =>
    !["Respondida", "Concluída", "Negada"].includes(x.status)
  ).length;

  return pageHeader("Visão executiva",
    "Indicadores gerais e visão gerencial da plataforma.") +
    statsGrid([
      ["Eventos", db.eventos.length, "✦", "Programação"],
      ["Monitorias", db.monitorias.length, "◎", "Apoio acadêmico"],
      ["Inscrições", db.inscricoes.length, "✓", "Registros locais"],
      ["Solicitações abertas", pending, "▤", "Demandas acadêmicas"]
    ]) +
    `<div class="grid dashboard-grid">
      ${panel("Indicadores gerais", `
        <div class="metric-line"><strong>Usuários demonstrativos</strong><span>${db.users.length}</span></div>
        <div class="metric-line"><strong>Materiais e avisos</strong><span>${db.materiais.length + db.avisos.length}</span></div>
        <div class="metric-line"><strong>Estágios</strong><span>${db.estagios.length}</span></div>
        <div class="metric-line"><strong>Atividades registradas</strong><span>${db.atividade.length}</span></div>
      `)}
      ${panel("Atividade da plataforma", activityList(db.atividade, 7),
        "Registros locais",
        button("Ver relatório", "goto:atividade", "secondary"))}
    </div>`;
}

/* -------------------- CATÁLOGOS -------------------- */

function eventCard(item) {
  const registered = myRegistrations().some(r => r.itemId === item.id);

  return `<article class="data-card">
    <span class="tag blue">${escapeHTML(item.category || "Evento")}</span>
    <h3>${escapeHTML(item.title)}</h3>
    <p>${escapeHTML(item.description)}</p>
    <div class="card-meta">
      <span>▦ ${formatDate(item.date)} ${escapeHTML(item.time || "")}</span>
      <span>⌖ ${escapeHTML(item.location || "")}</span>
    </div>
    <div class="card-actions">
      ${registered ? tag("Inscrito") : button("Inscrever-se", "register:" + item.id)}
      ${button(isFavorite(item.id) ? "♥ Favorito" : "♡ Favoritar",
        "favorite:" + item.id, "secondary")}
    </div>
  </article>`;
}

function monitoriaCard(item) {
  const registered = myRegistrations().some(r => r.itemId === item.id);

  return `<article class="data-card">
    <span class="tag blue">${escapeHTML(item.area)}</span>
    <h3>${escapeHTML(item.title)}</h3>
    <p>${escapeHTML(item.description)}</p>
    <div class="card-meta">
      <span>◷ ${escapeHTML(item.schedule)}</span>
      <span>♙ ${escapeHTML(item.teacher)}</span>
      <span>Vagas: ${escapeHTML(item.seats)}</span>
    </div>
    <div class="card-actions">
      ${registered ? tag("Inscrito") : button("Participar", "register:" + item.id)}
      ${button(isFavorite(item.id) ? "♥ Favorito" : "♡ Favoritar",
        "favorite:" + item.id, "secondary")}
    </div>
  </article>`;
}

function internshipCard(item) {
  const registered = myRegistrations().some(r => r.itemId === item.id);

  return `<article class="data-card">
    <span class="tag blue">${escapeHTML(item.area)}</span>
    <h3>${escapeHTML(item.title)}</h3>
    <p>${escapeHTML(item.description)}</p>
    <div class="card-meta">
      <span>${escapeHTML(item.company)}</span>
      <span>${escapeHTML(item.modality)}</span>
      <span>Prazo: ${formatDate(item.deadline)}</span>
    </div>
    <div class="card-actions">
      ${registered ? tag("Candidatado") : button("Candidatar-se", "register:" + item.id)}
      ${button(isFavorite(item.id) ? "♥ Favorito" : "♡ Favoritar",
        "favorite:" + item.id, "secondary")}
    </div>
  </article>`;
}

function browseMonitorias() {
  return pageHeader("Monitorias",
    "Encontre apoio acadêmico e acompanhe os horários.") +
    `<div class="toolbar">
      <input id="catalogSearch" class="search-input"
        placeholder="Buscar monitoria, área ou professor...">
      <select id="catalogStatus" class="filter-select">
        <option value="">Todas as situações</option>
        <option value="Aberta">Aberta</option>
        <option value="Encerrada">Encerrada</option>
      </select>
    </div>
    <div id="catalogResults" class="grid three-col">
      ${db.monitorias.filter(x => x.status === "Aberta")
        .map(monitoriaCard).join("") || emptyState("Nenhuma monitoria aberta")}
    </div>`;
}

function manageMonitorias() {
  return pageHeader("Gerenciar monitorias",
    "Cadastre, edite, encerre ou remova monitorias.",
    button("＋ Nova monitoria", "create:monitoria")) +
    panel("Catálogo de monitorias",
      db.monitorias.length ? `
        <div class="table-wrap"><table>
          <thead><tr><th>Monitoria</th><th>Responsável</th><th>Horário</th><th>Vagas</th><th>Status</th><th>Ações</th></tr></thead>
          <tbody>
          ${db.monitorias.map(item => `<tr>
            <td><strong>${escapeHTML(item.title)}</strong><br>${escapeHTML(item.area)}</td>
            <td>${escapeHTML(item.teacher)}</td>
            <td>${escapeHTML(item.schedule)}</td>
            <td>${escapeHTML(item.seats)}</td>
            <td>${tag(item.status)}</td>
            <td><div class="table-actions">
              <button class="mini-btn" data-action="edit:monitoria:${item.id}">Editar</button>
              <button class="mini-btn" data-action="toggle-monitoria:${item.id}">${item.status === "Aberta" ? "Encerrar" : "Reabrir"}</button>
              <button class="mini-btn delete" data-action="delete:monitoria:${item.id}">Excluir</button>
            </div></td>
          </tr>`).join("")}
          </tbody>
        </table></div>` : emptyState("Nenhuma monitoria cadastrada"),
      `${db.monitorias.length} registro(s)`);
}

function browseEvents() {
  return pageHeader("Eventos acadêmicos",
    "Consulte a programação, inscreva-se e salve favoritos.") +
    `<div class="grid three-col">
      ${db.eventos.filter(x => x.status === "Publicado")
        .sort((a, b) => a.date.localeCompare(b.date))
        .map(eventCard).join("") || emptyState("Nenhum evento publicado")}
    </div>`;
}

function manageEvents() {
  return pageHeader("Gerenciar eventos",
    "Crie eventos e controle sua publicação.",
    button("＋ Novo evento", "create:event")) +
    `<div class="grid three-col">
      ${db.eventos.map(item => `<article class="data-card">
        <span class="tag blue">${escapeHTML(item.category)}</span>
        <h3>${escapeHTML(item.title)}</h3>
        <p>${escapeHTML(item.description)}</p>
        <div class="card-meta">${formatDate(item.date)} · ${escapeHTML(item.location)}</div>
        ${tag(item.status)}
        <div class="card-actions">
          ${button("Editar", "edit:event:" + item.id, "secondary")}
          ${button(item.status === "Publicado" ? "Retirar publicação" : "Publicar",
            "toggle-event:" + item.id, "secondary")}
          ${button("Excluir", "delete:event:" + item.id, "danger")}
        </div>
      </article>`).join("") || emptyState("Nenhum evento")}
    </div>`;
}

function browseInternships() {
  return pageHeader("Estágios",
    "Explore oportunidades de carreira demonstrativas.") +
    `<div class="notice">
      Empresas e vagas fictícias. Verifique oportunidades em canais oficiais
      antes de compartilhar informações pessoais.
    </div>
    <div class="grid three-col">
      ${db.estagios.filter(x => x.status === "Aberta")
        .map(internshipCard).join("") || emptyState("Nenhuma vaga aberta")}
    </div>`;
}

/* -------------------- CALENDÁRIO -------------------- */

function calendarPage() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const firstDay = new Date(year, month, 1);
  const days = new Date(year, month + 1, 0).getDate();
  const start = (firstDay.getDay() + 6) % 7;

  let cells = "";

  for (let i = 0; i < start; i++) {
    cells += `<div class="calendar-day"></div>`;
  }

  for (let day = 1; day <= days; day++) {
    const date = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const events = db.eventos.filter(e => e.date === date);

    cells += `
      <div class="calendar-day ${day === now.getDate() ? "today" : ""}">
        <strong>${day}</strong>
        ${events.map(e => `<small title="${escapeHTML(e.title)}">${escapeHTML(e.title)}</small>`).join("")}
      </div>`;
  }

  const futureEvents = db.eventos
    .filter(e => e.date >= offsetDate(0))
    .sort((a, b) => a.date.localeCompare(b.date));

  return pageHeader("Calendário acadêmico",
    "Visualize datas e eventos do campus.") +
    panel(now.toLocaleDateString("pt-BR", { month: "long", year: "numeric" }),
      `<div class="calendar-grid">
        ${["SEG", "TER", "QUA", "QUI", "SEX", "SÁB", "DOM"]
          .map(d => `<div class="calendar-weekday">${d}</div>`).join("")}
        ${cells}
      </div>`) +
    panel("Próximos eventos",
      futureEvents.map(e => activityRow(e.title,
        `${formatDate(e.date)} · ${e.time} · ${e.location}`, e.status)).join("") ||
      emptyState("Sem eventos futuros"));
}

/* -------------------- INSCRIÇÕES E FAVORITOS -------------------- */

function registerItem(itemId) {
  const item = allCatalogItems().find(x => x.id === itemId);

  if (!item) {
    notify("Esse item não está mais disponível.");
    return;
  }

  if (myRegistrations().some(x => x.itemId === itemId)) {
    notify("Você já possui uma inscrição nesse item.");
    return;
  }

  if (item.status && !["Aberta", "Publicado"].includes(item.status)) {
    notify("Esse item não está aceitando inscrições.");
    return;
  }

  const kind = db.eventos.some(x => x.id === itemId)
    ? "Evento"
    : db.monitorias.some(x => x.id === itemId)
      ? "Monitoria"
      : "Estágio";

  db.inscricoes.push({
    id: makeId("inscricao"),
    userId: currentUser.id,
    itemId,
    kind,
    date: offsetDate(0),
    status: "Registrada"
  });

  saveData();
  logAction("Inscrição registrada", item.title);
  notify("Inscrição registrada.");
  renderPage();
}

function toggleFavorite(itemId) {
  db.favoritos[currentUser.id] ||= [];

  const list = db.favoritos[currentUser.id];

  db.favoritos[currentUser.id] = list.includes(itemId)
    ? list.filter(id => id !== itemId)
    : [...list, itemId];

  saveData();
  logAction("Favoritos atualizados", itemId);
  renderPage();
}

function registrationsPage() {
  const registrations = myRegistrations();

  return pageHeader("Minhas inscrições",
    "Acompanhe seus registros em eventos, monitorias e estágios.") +
    panel("Histórico de inscrições",
      registrations.length ? `
        <div class="table-wrap"><table>
          <thead><tr><th>Atividade</th><th>Tipo</th><th>Data</th><th>Status</th><th>Ação</th></tr></thead>
          <tbody>
          ${registrations.map(r => {
            const item = allCatalogItems().find(x => x.id === r.itemId);
            return `<tr>
              <td>${escapeHTML(item?.title || "Item indisponível")}</td>
              <td>${escapeHTML(r.kind)}</td>
              <td>${formatDate(r.date)}</td>
              <td>${tag(r.status)}</td>
              <td><button class="mini-btn delete" data-action="unregister:${r.id}">Cancelar</button></td>
            </tr>`;
          }).join("")}
          </tbody>
        </table></div>` : emptyState("Você ainda não tem inscrições",
          "Explore as áreas de eventos, monitorias e estágios."));
}

function favoritesPage() {
  const items = allCatalogItems().filter(x => myFavorites().includes(x.id));

  return pageHeader("Favoritos",
    "Seus itens salvos para consultar depois.") +
    `<div class="grid three-col">
      ${items.map(item =>
        db.eventos.some(x => x.id === item.id) ? eventCard(item) :
        db.monitorias.some(x => x.id === item.id) ? monitoriaCard(item) :
        internshipCard(item)
      ).join("") || emptyState("Sua lista está vazia",
        "Use o botão Favoritar nos catálogos.")}
    </div>`;
}

/* -------------------- PERFIL -------------------- */

function profilePage() {
  const initials = currentUser.name.split(" ")
    .map(x => x[0]).slice(0, 2).join("").toUpperCase();

  return pageHeader("Meu perfil",
    "Confira e atualize seus dados demonstrativos.") +
    `<section class="panel">
      <div class="profile-head">
        <div class="profile-avatar">${escapeHTML(initials)}</div>
        <div>
          <h2>${escapeHTML(currentUser.name)}</h2>
          <p>${escapeHTML(roleLabel(currentUser.role))} · ${escapeHTML(currentUser.email)}</p>
        </div>
      </div>
      <form id="profileForm" class="field-grid">
        ${field("name", "Nome de exibição", currentUser.name)}
        ${field("email", "E-mail", currentUser.email, "email", true)}
        ${currentUser.role === "aluno"
          ? field("course", "Curso", currentUser.course || "")
          : field("department", "Departamento", currentUser.department || "")}
        ${currentUser.role === "aluno"
          ? field("registration", "Matrícula demonstrativa", currentUser.registration || "", "text", true)
          : ""}
        <div class="field full-field">
          <button class="btn primary" type="submit">Salvar perfil</button>
        </div>
      </form>
    </section>
    <section class="panel">
      <h2 class="section-title">Privacidade</h2>
      <p class="muted">
        Os dados ficam no armazenamento local deste navegador. Não inclua
        informações pessoais reais neste protótipo.
      </p>
      ${button("Sair da conta", "logout", "secondary")}
    </section>`;
}

function field(name, label, value = "", type = "text", disabled = false) {
  return `
    <div class="field">
      <label for="field-${name}">${escapeHTML(label)}</label>
      <input id="field-${name}" name="${name}" type="${type}"
        value="${escapeHTML(value)}" ${disabled ? "disabled" : ""}
        maxlength="120" ${name === "name" ? "required" : ""}>
    </div>`;
}

/* -------------------- SOLICITAÇÕES ACADÊMICAS -------------------- */

function requestsPage() {
  const rows = db.solicitacoes.filter(x => x.ownerId === currentUser.id);

  return pageHeader("Solicitações acadêmicas",
    "Envie pedidos e acompanhe as respostas.",
    button("＋ Nova solicitação", "create:request")) +
    `<div class="notice">
      Não envie documentos ou informações pessoais sensíveis. Os registros
      são armazenados apenas neste navegador.
    </div>` +
    panel("Minhas solicitações",
      rows.map(requestCard).join("") ||
      emptyState("Nenhuma solicitação enviada"));
}

function requestCard(r) {
  return `<article class="data-card" style="margin-bottom:12px">
    <div class="panel-head">
      <div>
        ${tag(r.type)}
        <h3>${escapeHTML(r.subject)}</h3>
      </div>
      ${tag(r.status)}
    </div>
    <p>${escapeHTML(r.details)}</p>
    <div class="card-meta">
      <span>Data: ${formatDate(r.date)}</span>
      <span>Responsável: ${escapeHTML(r.assigned || "A definir")}</span>
    </div>
    ${r.response ? `<div class="notice success">
      <strong>Resposta — ${escapeHTML(r.replyBy || r.assigned || "Equipe")}:</strong><br>
      ${escapeHTML(r.response)}
    </div>` : ""}
  </article>`;
}

function requestRow(r) {
  return activityRow(
    r.subject,
    `${r.owner} · ${r.type} · ${formatDate(r.date)}`,
    r.status
  );
}

function teacherRequests() {
  const rows = db.solicitacoes.filter(r =>
    r.assigned === currentUser.name && r.authorized === true
  );

  return pageHeader("Solicitações autorizadas",
    "Responda às solicitações atribuídas e autorizadas.") +
    `<div class="notice warning">
      A verificação de autorização neste exemplo é feita no navegador.
      Um sistema real precisa verificar as permissões no servidor.
    </div>` +
    panel("Solicitações atribuídas",
      rows.map(r => `
        <article class="data-card" style="margin-bottom:12px">
          <div class="panel-head">
            <div>
              ${tag(r.type)}
              <h3>${escapeHTML(r.subject)}</h3>
            </div>
            ${tag(r.status)}
          </div>
          <p><strong>Solicitante:</strong> ${escapeHTML(r.owner)}<br>
          ${escapeHTML(r.details)}</p>
          <div class="card-actions">
            ${button("Responder", "reply:" + r.id)}
            ${button("Marcar concluída", "complete:" + r.id, "secondary")}
          </div>
          ${r.response ? `<div class="notice success">${escapeHTML(r.response)}</div>` : ""}
        </article>
      `).join("") || emptyState("Nenhuma solicitação atribuída"));
}

/* -------------------- MATERIAIS, AVISOS E ATIVIDADES -------------------- */

function materialRow(item) {
  return activityRow(item.title,
    `${item.description} · ${item.author} · ${formatDate(item.date)}`,
    item.kind);
}

function activityRow(title, description, status = "") {
  return `<div class="activity-row">
    <div class="activity-dot">▣</div>
    <div>
      <strong>${escapeHTML(title)}</strong>
      <p>${escapeHTML(description)}</p>
    </div>
    ${status ? tag(status) : ""}
  </div>`;
}

function materialsPage() {
  return pageHeader("Materiais e avisos",
    "Publique conteúdo acadêmico e comunicados.",
    button("＋ Publicar conteúdo", "create:material")) +
    panel("Conteúdos publicados",
      db.materiais.map(m => `
        <article class="data-card" style="margin-bottom:12px">
          ${tag(m.kind)}
          <h3>${escapeHTML(m.title)}</h3>
          <p>${escapeHTML(m.description)}</p>
          <div class="card-meta">${escapeHTML(m.audience)} · ${escapeHTML(m.author)} · ${formatDate(m.date)}</div>
          <div class="card-actions">
            ${button("Editar", "edit:material:" + m.id, "secondary")}
            ${button("Excluir", "delete:material:" + m.id, "danger")}
          </div>
        </article>
      `).join("") || emptyState("Nenhum conteúdo publicado"));
}

function noticesPage() {
  return pageHeader("Avisos da coordenação",
    "Publique comunicados para a comunidade acadêmica.",
    button("＋ Novo aviso", "create:notice")) +
    panel("Comunicados da coordenação",
      db.avisos.map(n => `
        <article class="data-card" style="margin-bottom:12px">
          <h3>${escapeHTML(n.title)}</h3>
          <p>${escapeHTML(n.description)}</p>
          <div class="card-meta">${escapeHTML(n.audience)} · ${formatDate(n.date)}</div>
          ${button("Excluir", "delete:notice:" + n.id, "danger")}
        </article>
      `).join("") || emptyState("Nenhum aviso publicado")) +
    panel("Avisos dos professores",
      db.materiais.filter(m => m.kind === "Aviso")
        .map(materialRow).join("") || emptyState("Nenhum aviso de professor"));
}

function activitiesPage() {
  return pageHeader("Acompanhamento de atividades",
    "Consulte os registros da demonstração.") +
    panel("Atividade recente", activityList(db.atividade, 40));
}

function platformActivityPage() {
  return pageHeader("Atividade da plataforma",
    "Visão gerencial das ações locais.",
    button("Exportar JSON", "export:json", "secondary")) +
    panel("Feed de atividade", activityList(db.atividade, 50));
}

/* -------------------- ADMINISTRADOR DE TI -------------------- */

function usersPage() {
  return pageHeader("Usuários de demonstração",
    "Lista de contas de teste. As senhas não são exibidas.") +
    `<div class="notice warning">
      As contas demonstrativas estão definidas no JavaScript. Isso não
      representa autenticação segura.
    </div>` +
    panel("Contas locais", `
      <div class="table-wrap"><table>
        <thead><tr><th>Nome</th><th>E-mail</th><th>Perfil</th><th>Curso/departamento</th></tr></thead>
        <tbody>${db.users.map(u => `<tr>
          <td>${escapeHTML(u.name)}</td>
          <td>${escapeHTML(u.email)}</td>
          <td>${escapeHTML(roleLabel(u.role))}</td>
          <td>${escapeHTML(u.course || u.department || "—")}</td>
        </tr>`).join("")}</tbody>
      </table></div>
    `);
}

function auditPage() {
  return pageHeader("Auditoria local",
    "Histórico de ações registradas pelo protótipo.",
    button("Exportar CSV", "export:audit", "secondary")) +
    panel("Registros", db.auditoria.length ? `
      <div class="table-wrap"><table>
        <thead><tr><th>Data</th><th>Usuário</th><th>Perfil</th><th>Ação</th><th>Detalhes</th></tr></thead>
        <tbody>${db.auditoria.map(a => `<tr>
          <td>${new Date(a.date).toLocaleString("pt-BR")}</td>
          <td>${escapeHTML(a.user)}</td>
          <td>${escapeHTML(roleLabel(a.role))}</td>
          <td>${escapeHTML(a.action)}</td>
          <td>${escapeHTML(a.detail)}</td>
        </tr>`).join("")}</tbody>
      </table></div>
    ` : emptyState("Ainda sem registros"));
}

function settingsPage() {
  return pageHeader("Configurações",
    "Preferências locais da demonstração.") +
    `<section class="panel">
      <form id="settingsForm" class="field-grid">
        ${field("campusName", "Nome da plataforma", db.configuracoes.campusName)}
        ${field("semester", "Semestre de referência", db.configuracoes.semester)}
        <div class="field full-field">
          <label>
            <input type="checkbox" name="maintenance"
              ${db.configuracoes.maintenance ? "checked" : ""}
              style="width:auto">
            Ativar aviso de manutenção (apenas visual)
          </label>
        </div>
        <div class="field full-field">
          <button class="btn primary" type="submit">Salvar configurações</button>
        </div>
      </form>
    </section>` +
    panel("Dados demonstrativos",
      `<p class="muted">Você pode restaurar os dados fictícios originais. Essa ação remove as alterações locais.</p>
       ${button("Restaurar demonstração", "reset", "danger")}`);
}

function dataPage() {
  return pageHeader("Exportar dados",
    "Faça cópias dos registros armazenados localmente.") +
    `<div class="grid two-col">
      <article class="data-card">
        <span class="stat-icon">⇩</span>
        <h3>Backup completo JSON</h3>
        <p>Exporta os dados do protótipo para um arquivo JSON.</p>
        ${button("Baixar backup", "export:json")}
      </article>
      <article class="data-card">
        <span class="stat-icon">▤</span>
        <h3>Exportar tabelas CSV</h3>
        <p>Arquivos compatíveis com programas de planilha.</p>
        <div class="card-actions">
          ${button("Monitorias", "export:monitorias", "secondary")}
          ${button("Eventos", "export:eventos", "secondary")}
          ${button("Solicitações", "export:solicitacoes", "secondary")}
          ${button("Auditoria", "export:audit", "secondary")}
          ${button("Financeiro", "export:financeiro", "secondary")}
        </div>
      </article>
    </div>`;
}

/* -------------------- FINANCEIRO -------------------- */

function financeEntriesPage() {
  return pageHeader("Lançamentos financeiros",
    "Gerencie entradas e saídas fictícias.",
    button("＋ Novo lançamento", "create:financeiro")) +
    `<div class="notice warning">Todos os valores são fictícios.</div>` +
    panel("Lançamentos",
      financeTable(db.financeiro.slice().sort((a, b) =>
        b.date.localeCompare(a.date))),
      `${db.financeiro.length} registro(s)`,
      button("Exportar CSV", "export:financeiro", "secondary"));
}

function financeTable(rows) {
  if (!rows.length) return emptyState("Nenhum lançamento");

  return `<div class="table-wrap"><table>
    <thead><tr><th>Data</th><th>Descrição</th><th>Categoria</th><th>Tipo</th><th>Valor</th><th>Ações</th></tr></thead>
    <tbody>${rows.map(f => `<tr>
      <td>${formatDate(f.date)}</td>
      <td>${escapeHTML(f.description)}</td>
      <td>${escapeHTML(f.category)}</td>
      <td>${tag(f.type)}</td>
      <td>${money(f.amount)}</td>
      <td><div class="table-actions">
        <button class="mini-btn" data-action="edit:financeiro:${f.id}">Editar</button>
        <button class="mini-btn delete" data-action="delete:financeiro:${f.id}">Excluir</button>
      </div></td>
    </tr>`).join("")}</tbody>
  </table></div>`;
}

function categorySummary() {
  const categories = {};

  db.financeiro.forEach(item => {
    const sign = item.type === "Receita" ? 1 : -1;
    categories[item.category] =
      (categories[item.category] || 0) + sign * Number(item.amount);
  });

  return Object.entries(categories).map(([name, value]) => `
    <div class="metric-line">
      <strong>${escapeHTML(name)}</strong>
      <span>${money(value)}</span>
    </div>
  `).join("") || emptyState("Sem categorias");
}

function financeCategoriesPage() {
  const categories = [...new Set(db.financeiro.map(x => x.category))];

  return pageHeader("Categorias financeiras",
    "Resumo das categorias utilizadas nos lançamentos.") +
    `<div class="grid three-col">
      ${categories.map(category => {
        const rows = db.financeiro.filter(x => x.category === category);
        const total = rows.reduce((sum, x) =>
          sum + (x.type === "Receita" ? 1 : -1) * Number(x.amount), 0);

        return `<article class="data-card">
          <span class="stat-icon">▦</span>
          <h3>${escapeHTML(category)}</h3>
          <p>${rows.length} lançamento(s)</p>
          <strong>${money(total)}</strong>
        </article>`;
      }).join("") || emptyState("Nenhuma categoria")}
    </div>`;
}

function financeReportsPage() {
  const totals = financeTotals();

  return pageHeader("Relatórios financeiros",
    "Resumo de lançamentos demonstrativos.",
    button("Exportar CSV", "export:financeiro", "secondary")) +
    statsGrid([
      ["Receitas", money(totals.income), "↗", "Fictícias"],
      ["Despesas", money(totals.expenses), "↘", "Fictícias"],
      ["Saldo", money(totals.balance), "＄", "Sem validade contábil"],
      ["Lançamentos", db.financeiro.length, "▤", "Registros locais"]
    ]) +
    panel("Categorias", categorySummary()) +
    panel("Detalhamento", financeTable(db.financeiro));
}

function executiveReportsPage() {
  return pageHeader("Relatórios gerenciais",
    "Indicadores consolidados da demonstração.",
    button("Exportar JSON", "export:json", "secondary")) +
    `<div class="grid two-col">
      ${panel("Indicadores acadêmicos", `
        <div class="metric-line"><strong>Monitorias</strong><span>${db.monitorias.length}</span></div>
        <div class="metric-line"><strong>Eventos</strong><span>${db.eventos.length}</span></div>
        <div class="metric-line"><strong>Estágios</strong><span>${db.estagios.length}</span></div>
        <div class="metric-line"><strong>Materiais e avisos</strong><span>${db.materiais.length + db.avisos.length}</span></div>
      `)}
      ${panel("Solicitações", `
        <div class="metric-line"><strong>Total</strong><span>${db.solicitacoes.length}</span></div>
        <div class="metric-line"><strong>Em análise</strong><span>${db.solicitacoes.filter(x => x.status === "Em análise").length}</span></div>
        <div class="metric-line"><strong>Respondidas</strong><span>${db.solicitacoes.filter(x => x.status === "Respondida").length}</span></div>
        <div class="metric-line"><strong>Concluídas</strong><span>${db.solicitacoes.filter(x => x.status === "Concluída").length}</span></div>
      `)}
    </div>` +
    panel("Atividade recente", activityList(db.atividade, 15));
}

/* -------------------- FORMULÁRIOS E CADASTROS -------------------- */

function formField(name, label, value = "", type = "text", options = {}) {
  const required = options.required === false ? "" : "required";
  const full = options.full ? " full-field" : "";
  const safeName = escapeHTML(name);

  let input;

  if (type === "textarea") {
    input = `<textarea name="${safeName}" ${required}
      maxlength="1500">${escapeHTML(value)}</textarea>`;
  } else if (type === "select") {
    input = `<select name="${safeName}" ${required}>
      ${(options.values || []).map(v =>
        `<option value="${escapeHTML(v)}"
          ${v === value ? "selected" : ""}>${escapeHTML(v)}</option>`
      ).join("")}
    </select>`;
  } else {
    input = `<input name="${safeName}" type="${type}"
      value="${escapeHTML(value)}" ${required}
      ${type === "number" ? 'min="0" step="0.01"' : ""}
      maxlength="180">`;
  }

  return `<div class="field${full}">
    <label>${escapeHTML(label)}</label>
    ${input}
  </div>`;
}

function openModal(title, fields, callback) {
  $("#modalTitle").textContent = title;
  $("#modalFields").innerHTML = `<div class="field-grid">${fields.join("")}</div>`;
  modalHandler = callback;
  $("#itemDialog").showModal();
}

function valuesFromForm(form) {
  return Object.fromEntries(new FormData(form).entries());
}

function openEditor(kind, existing = null) {
  const editing = Boolean(existing);
  const item = existing || {};

  if (kind === "monitoria") {
    openModal(editing ? "Editar monitoria" : "Nova monitoria", [
      formField("title", "Nome", item.title || ""),
      formField("area", "Área", item.area || "Tecnologia"),
      formField("teacher", "Professor responsável", item.teacher || currentUser.name),
      formField("schedule", "Horário", item.schedule || ""),
      formField("seats", "Número de vagas", item.seats ?? 15, "number"),
      formField("status", "Situação", item.status || "Aberta", "select",
        { values: ["Aberta", "Encerrada"] }),
      formField("description", "Descrição", item.description || "", "textarea",
        { full: true })
    ], values => {
      const row = {
        ...item,
        ...values,
        id: item.id || makeId("m"),
        seats: Number(values.seats)
      };

      if (editing) {
        db.monitorias = db.monitorias.map(x => x.id === item.id ? row : x);
      } else {
        db.monitorias.unshift(row);
      }

      finishEditor(editing ? "Monitoria atualizada" : "Monitoria cadastrada", row.title);
    });
  }

  if (kind === "event") {
    openModal(editing ? "Editar evento" : "Novo evento", [
      formField("title", "Título", item.title || ""),
      formField("category", "Categoria", item.category || "Acadêmico", "select",
        { values: ["Acadêmico", "Carreira", "Oficina", "Cultural", "Esportivo", "Outro"] }),
      formField("date", "Data", item.date || offsetDate(7), "date"),
      formField("time", "Horário", item.time || "14:00", "time"),
      formField("location", "Local", item.location || ""),
      formField("status", "Situação", item.status || "Publicado", "select",
        { values: ["Publicado", "Rascunho"] }),
      formField("description", "Descrição", item.description || "", "textarea",
        { full: true })
    ], values => {
      const row = { ...item, ...values, id: item.id || makeId("e") };

      if (editing) {
        db.eventos = db.eventos.map(x => x.id === item.id ? row : x);
      } else {
        db.eventos.unshift(row);
      }

      finishEditor(editing ? "Evento atualizado" : "Evento cadastrado", row.title);
    });
  }

  if (kind === "material" || kind === "notice") {
    const isNotice = kind === "notice";

    openModal(isNotice ? "Novo aviso" : "Publicar material ou aviso", [
      formField("title", "Título", ""),
      formField("kind", "Tipo", isNotice ? "Aviso" : "Material", "select",
        { values: isNotice ? ["Aviso"] : ["Material", "Aviso"] }),
      formField("audience", "Público-alvo", "Todos os estudantes", "select",
        { values: ["Todos os estudantes", "Sistemas de Informação", "Professores", "Coordenação"] }),
      formField("description", "Conteúdo", "", "textarea", { full: true })
    ], values => {
      if (!values.title.trim() || !values.description.trim()) {
        throw new Error("Preencha o título e o conteúdo.");
      }

      const row = {
        ...values,
        id: makeId(isNotice ? "aviso" : "material"),
        date: offsetDate(0),
        author: currentUser.name
      };

      if (isNotice) db.avisos.unshift(row);
      else db.materiais.unshift(row);

      finishEditor("Conteúdo publicado", row.title);
    });
  }

  if (kind === "request") {
    openModal("Nova solicitação acadêmica", [
      formField("type", "Tipo", "Declaração de matrícula", "select", {
        values: [
          "Declaração de matrícula",
          "Dúvida acadêmica",
          "Equivalência de disciplina",
          "Revisão de nota",
          "Trancamento",
          "Aproveitamento de estudos",
          "Outro"
        ]
      }),
      formField("subject", "Assunto", ""),
      formField("details", "Detalhes", "", "textarea", { full: true })
    ], values => {
      if (!values.subject.trim() || !values.details.trim()) {
        throw new Error("Preencha o assunto e os detalhes.");
      }

      db.solicitacoes.unshift({
        id: makeId("s"),
        owner: currentUser.name,
        ownerId: currentUser.id,
        type: values.type,
        subject: values.subject,
        details: values.details,
        date: offsetDate(0),
        status: "Em análise",
        assigned: "Coordenação Acadêmica",
        authorized: true,
        response: ""
      });

      finishEditor("Solicitação enviada", values.subject);
    });
  }

  if (kind === "financeiro") {
    openModal(editing ? "Editar lançamento" : "Novo lançamento fictício", [
      formField("date", "Data", item.date || offsetDate(0), "date"),
      formField("type", "Tipo", item.type || "Despesa", "select",
        { values: ["Receita", "Despesa"] }),
      formField("category", "Categoria", item.category || "Operacional"),
      formField("description", "Descrição", item.description || ""),
      formField("amount", "Valor em reais", item.amount ?? "", "number")
    ], values => {
      const amount = Number(values.amount);

      if (!values.description.trim() ||
          !values.category.trim() ||
          !Number.isFinite(amount) || amount <= 0) {
        throw new Error("Informe descrição, categoria e valor maior que zero.");
      }

      const row = {
        ...item,
        ...values,
        id: item.id || makeId("f"),
        amount
      };

      if (editing) {
        db.financeiro = db.financeiro.map(x => x.id === item.id ? row : x);
      } else {
        db.financeiro.unshift(row);
      }

      finishEditor("Lançamento salvo", row.description);
    });
  }
}

function finishEditor(message, detail) {
  saveData();
  $("#itemDialog").close();
  modalHandler = null;
  logAction(message, detail);
  notify(message + ".");
  renderPage();
}

function deleteItem(collection, itemId) {
  const item = db[collection]?.find(x => x.id === itemId);

  if (!item) return;

  const name = item.title || item.description || item.subject || "este registro";

  if (!confirm(`Deseja realmente excluir "${name}"?`)) return;

  db[collection] = db[collection].filter(x => x.id !== itemId);

  saveData();
  logAction("Registro excluído", name);
  notify("Registro excluído.");
  renderPage();
}

/* -------------------- RESPOSTAS ÀS SOLICITAÇÕES -------------------- */

function replyRequest(requestId) {
  const request = db.solicitacoes.find(x =>
    x.id === requestId &&
    x.assigned === currentUser.name &&
    x.authorized === true
  );

  if (!request) {
    notify("Você não está autorizado a responder essa solicitação.");
    return;
  }

  openModal("Responder solicitação", [
    formField("response", "Resposta ao solicitante",
      request.response || "", "textarea", { full: true })
  ], values => {
    if (!values.response.trim()) {
      throw new Error("Digite uma resposta.");
    }

    request.response = values.response;
    request.status = "Respondida";
    request.replyBy = currentUser.name;

    finishEditor("Resposta registrada", request.subject);
  });
}

function completeRequest(requestId) {
  const request = db.solicitacoes.find(x =>
    x.id === requestId &&
    x.assigned === currentUser.name &&
    x.authorized === true
  );

  if (!request) {
    notify("Você não está autorizado a alterar essa solicitação.");
    return;
  }

  request.status = "Concluída";
  saveData();
  logAction("Solicitação concluída", request.subject);
  notify("Solicitação concluída.");
  renderPage();
}

/* -------------------- EXPORTAÇÃO CSV E JSON -------------------- */

function downloadFile(filename, content, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");

  anchor.href = url;
  anchor.download = filename;

  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();

  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function csvValue(value) {
  if (value && typeof value === "object") {
    value = JSON.stringify(value);
  }

  return '"' + String(value ?? "").replace(/"/g, '""') + '"';
}

function exportCSV(key) {
  const collections = {
    audit: db.auditoria,
    monitorias: db.monitorias,
    eventos: db.eventos,
    solicitacoes: db.solicitacoes,
    financeiro: db.financeiro
  };

  const rows = collections[key];

  if (!rows || rows.length === 0) {
    notify("Não há dados para exportar.");
    return;
  }

  const headers = [...new Set(rows.flatMap(row => Object.keys(row)))];

  const csv = "\uFEFF" + [
    headers.map(csvValue).join(";"),
    ...rows.map(row => headers.map(key => csvValue(row[key])).join(";"))
  ].join("\r\n");

  downloadFile(
    `conecta-campus-${key}-${offsetDate(0)}.csv`,
    csv,
    "text/csv;charset=utf-8"
  );

  logAction("Exportação CSV", key);
}

function exportJSON() {
  downloadFile(
    `conecta-campus-backup-${offsetDate(0)}.json`,
    JSON.stringify(db, null, 2),
    "application/json;charset=utf-8"
  );

  logAction("Exportação JSON", "Backup dos dados locais");
}

/* -------------------- AÇÕES DOS BOTÕES -------------------- */

function handleAction(action) {
  if (action.startsWith("goto:")) {
    navigate(action.slice(5));
    return;
  }

  if (action === "logout") {
    logout();
    return;
  }

  if (action.startsWith("register:")) {
    registerItem(action.slice(9));
    return;
  }

  if (action.startsWith("favorite:")) {
    toggleFavorite(action.slice(9));
    return;
  }

  if (action.startsWith("unregister:")) {
    const id = action.slice(11);
    const registration = db.inscricoes.find(x =>
      x.id === id && x.userId === currentUser.id
    );

    if (!registration) return;

    db.inscricoes = db.inscricoes.filter(x => x.id !== id);
    saveData();
    logAction("Inscrição cancelada", registration.itemId);
    notify("Inscrição cancelada.");
    renderPage();
    return;
  }

  if (action.startsWith("create:")) {
    openEditor(action.slice(7));
    return;
  }

  if (action.startsWith("edit:")) {
    const [, kind, itemId] = action.split(":");

    const collectionName = {
      monitoria: "monitorias",
      event: "eventos",
      material: "materiais",
      financeiro: "financeiro"
    }[kind];

    const item = db[collectionName]?.find(x => x.id === itemId);

    if (item) openEditor(kind, item);
    return;
  }

  if (action.startsWith("delete:")) {
    const [, kind, itemId] = action.split(":");

    const collectionName = {
      monitoria: "monitorias",
      event: "eventos",
      material: "materiais",
      notice: "avisos",
      financeiro: "financeiro"
    }[kind];

    if (collectionName) deleteItem(collectionName, itemId);
    return;
  }

  if (action.startsWith("toggle-monitoria:")) {
    const id = action.slice("toggle-monitoria:".length);
    const item = db.monitorias.find(x => x.id === id);

    if (!item) return;

    item.status = item.status === "Aberta" ? "Encerrada" : "Aberta";
    saveData();
    logAction("Situação da monitoria alterada", item.title);
    renderPage();
    return;
  }

  if (action.startsWith("toggle-event:")) {
    const id = action.slice("toggle-event:".length);
    const item = db.eventos.find(x => x.id === id);

    if (!item) return;

    item.status = item.status === "Publicado" ? "Rascunho" : "Publicado";
    saveData();
    logAction("Publicação de evento alterada", item.title);
    renderPage();
    return;
  }

  if (action.startsWith("reply:")) {
    replyRequest(action.slice(6));
    return;
  }

  if (action.startsWith("complete:")) {
    completeRequest(action.slice(9));
    return;
  }

  if (action.startsWith("export:")) {
    const key = action.slice(7);

    if (key === "json") exportJSON();
    else exportCSV(key);

    return;
  }

  if (action === "reset") {
    if (!confirm("Restaurar os dados demonstrativos? Suas alterações locais serão apagadas.")) {
      return;
    }

    db = createInitialData();
    saveData();
    logAction("Dados de demonstração restaurados");
    notify("Dados demonstrativos restaurados.");
    renderPage();
  }
}

/* -------------------- LOGIN E LOGOUT -------------------- */

function login(email, password) {
  const user = db.users.find(u =>
    u.email.toLowerCase() === email.trim().toLowerCase() &&
    u.password === password
  );

  if (!user) return false;

  currentUser = user;
  activePage = "dashboard";

  $("#loginScreen").classList.add("hidden");
  $("#appShell").classList.remove("hidden");

  $("#userName").textContent = user.name;
  $("#userRole").textContent = roleLabel(user.role);

  $("#userAvatar").textContent = user.name
    .split(" ").map(x => x[0]).slice(0, 2).join("").toUpperCase();

  $("#topDate").textContent = new Date().toLocaleDateString("pt-BR", {
    weekday: "short",
    day: "2-digit",
    month: "short"
  });

  renderNavigation();
  renderPage();
  logAction("Login realizado", roleLabel(user.role));

  return true;
}

function logout() {
  if (currentUser) {
    logAction("Logout realizado", roleLabel(currentUser.role));
  }

  currentUser = null;

  $("#appShell").classList.add("hidden");
  $("#loginScreen").classList.remove("hidden");
  $("#password").value = "";
  $("#loginError").textContent = "";
  $("#sidebar").classList.remove("open");
}

/* -------------------- EVENTOS DOS FORMULÁRIOS -------------------- */

function bindEvents() {
  $("#loginForm").addEventListener("submit", event => {
    event.preventDefault();

    const email = $("#email").value;
    const password = $("#password").value;

    $("#loginError").textContent = "";

    if (!login(email, password)) {
      $("#loginError").textContent =
        "E-mail ou senha incorretos. Confira as contas demonstrativas.";
    }
  });

  $("#togglePassword").addEventListener("click", () => {
    const input = $("#password");
    input.type = input.type === "password" ? "text" : "password";
  });

  $("#logoutBtn").addEventListener("click", logout);

  $("#mobileMenu").addEventListener("click", () => {
    $("#sidebar").classList.toggle("open");
  });

  $("#sideNav").addEventListener("click", event => {
    const button = event.target.closest("[data-page]");

    if (button) navigate(button.dataset.page);
  });

  $("#content").addEventListener("click", event => {
    const button = event.target.closest("[data-action]");

    if (button) handleAction(button.dataset.action);
  });

  $("#content").addEventListener("input", event => {
    if (event.target.id === "catalogSearch" ||
        event.target.id === "catalogStatus") {
      filterMonitorias();
    }
  });

  $("#content").addEventListener("submit", event => {
    if (event.target.id === "profileForm") {
      event.preventDefault();

      const values = valuesFromForm(event.target);
      currentUser.name = values.name.trim();

      if (values.course !== undefined) {
        currentUser.course = values.course.trim();
      }

      if (values.department !== undefined) {
        currentUser.department = values.department.trim();
      }

      db.users = db.users.map(user =>
        user.id === currentUser.id ? { ...user, ...currentUser } : user
      );

      saveData();

      $("#userName").textContent = currentUser.name;
      $("#userAvatar").textContent = currentUser.name
        .split(" ").map(x => x[0]).slice(0, 2).join("").toUpperCase();

      logAction("Perfil atualizado", currentUser.name);
      notify("Perfil atualizado.");
      renderPage();
    }

    if (event.target.id === "settingsForm") {
      event.preventDefault();

      const values = valuesFromForm(event.target);

      db.configuracoes.campusName = values.campusName.trim();
      db.configuracoes.semester = values.semester.trim();
      db.configuracoes.maintenance =
        event.target.elements.maintenance.checked;

      saveData();
      logAction("Configurações atualizadas", db.configuracoes.semester);
      notify("Configurações salvas.");
      renderPage();
    }
  });

  $("#itemForm").addEventListener("submit", event => {
    event.preventDefault();

    if (!modalHandler) return;

    try {
      modalHandler(valuesFromForm(event.target));
    } catch (error) {
      notify(error.message || "Confira os campos e tente novamente.");
    }
  });

  $("#closeModal").addEventListener("click", () => {
    $("#itemDialog").close();
    modalHandler = null;
  });

  $("#cancelModal").addEventListener("click", () => {
    $("#itemDialog").close();
    modalHandler = null;
  });

  $("#demoAccounts").innerHTML = DEMO_USERS.map(user => `
    <div class="demo-account">
      <span>
        <strong>${escapeHTML(roleLabel(user.role))}</strong><br>
        ${escapeHTML(user.email)}
      </span>
      <button type="button" data-fill="${user.id}">Usar conta</button>
    </div>
  `).join("");

  $("#demoAccounts").addEventListener("click", event => {
    const button = event.target.closest("[data-fill]");

    if (!button) return;

    const user = DEMO_USERS.find(x => x.id === button.dataset.fill);

    if (user) {
      $("#email").value = user.email;
      $("#password").value = user.password;
      $("#password").focus();
    }
  });
}

/* -------------------- BUSCA DE MONITORIAS -------------------- */

function filterMonitorias() {
  const query = ($("#catalogSearch")?.value || "").toLowerCase();
  const status = $("#catalogStatus")?.value || "";

  const filtered = db.monitorias.filter(item => {
    const matchesStatus = !status || item.status === status;

    const matchesQuery = [
      item.title,
      item.area,
      item.teacher,
      item.description
    ].some(value => String(value || "").toLowerCase().includes(query));

    return matchesStatus && matchesQuery;
  });

  $("#catalogResults").innerHTML = filtered.map(monitoriaCard).join("") ||
    emptyState("Nenhum resultado", "Experimente alterar sua pesquisa.");
}

/* -------------------- INICIALIZAÇÃO -------------------- */

function init() {
  $("#year").textContent = new Date().getFullYear();

  bindEvents();

  // Se o navegador não tiver dados, inicializa a demonstração.
  if (!localStorage.getItem(STORAGE_KEY)) {
    saveData();
  }
}

init();