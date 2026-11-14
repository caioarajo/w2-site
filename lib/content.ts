// Conteúdo do site. Edite aqui; no futuro pode vir de um CMS headless (Sanity, Payload).

export const site = {
  name: 'W2 Comunicação e Consultoria',
  short: 'W2',
  // Em homologação sem NEXT_PUBLIC_SITE_URL, usa o endereço gerado pela Vercel.
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'),
  description:
    'Agência full-service de publicidade, marketing digital, branding, mídia e consultoria estratégica para empresas que querem crescer.',
  email: 'contato@w2comunicacao.com.br',
  whatsapp: '5500000000000',
  phone: '(00) 00000-0000',
  address: 'Rua Exemplo, 000 — Sua Cidade/UF',
  social: [
    { label: 'Instagram', href: '#' },
    { label: 'LinkedIn', href: '#' },
    { label: 'YouTube', href: '#' },
    { label: 'Behance', href: '#' },
  ],
};

export const whatsappUrl = (msg = 'Olá, W2! Quero conversar sobre um projeto.') =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg)}`;

export const nav = [
  { href: '/#servicos', label: 'Serviços' },
  { href: '/#trabalhos', label: 'Trabalhos' },
  { href: '/#metodo', label: 'Método' },
  { href: '/#planos', label: 'Planos' },
  { href: '/#contato', label: 'Contato' },
];

export type Hub = { slug: string; title: string; desc: string; items: string[] };

export const hubs: Hub[] = [
  {
    slug: 'estrategia',
    title: 'Estratégia & Consultoria',
    desc: 'Diagnóstico, posicionamento e plano de ação. Pensamos o negócio antes de pensar a peça.',
    items: ['Planejamento estratégico', 'Consultoria de marketing', 'Pesquisa de mercado', 'Análise de concorrência', 'Plano anual de marketing', 'Treinamento comercial'],
  },
  {
    slug: 'criacao',
    title: 'Criação & Branding',
    desc: 'Marcas com personalidade e campanhas que ninguém pula.',
    items: ['Naming e identidade visual', 'Rebranding e manual de marca', 'Campanhas 360°', 'Redação publicitária', 'Embalagem', 'PDV e materiais gráficos'],
  },
  {
    slug: 'midia',
    title: 'Mídia',
    desc: 'Planejamento, negociação e compra de mídia on e off — onde o seu público realmente está.',
    items: ['Plano e compra de mídia', 'TV, rádio e jornal regionais', 'OOH e DOOH', 'Mídia programática', 'Checking e relatórios'],
  },
  {
    slug: 'digital',
    title: 'Digital & Performance',
    desc: 'Tráfego, dados e tecnologia gerando leads e vendas que dá para medir.',
    items: ['Google, Meta, TikTok e LinkedIn Ads', 'SEO e conteúdo', 'Sites, landing pages e e-commerce', 'Automação e e-mail', 'CRM e funil de vendas', 'Dashboards e BI'],
  },
  {
    slug: 'conteudo',
    title: 'Conteúdo & Social',
    desc: 'Conteúdo que conversa, engaja e vira comunidade.',
    items: ['Gestão de redes sociais', 'Foto e vídeo', 'Reels e motion design', 'Influenciadores', 'Podcast e videocast', 'Social listening'],
  },
  {
    slug: 'relacoes',
    title: 'Relações & Experiência',
    desc: 'Reputação e experiências que aproximam marcas e pessoas.',
    items: ['Assessoria de imprensa', 'Comunicação corporativa', 'Gestão de crise', 'Eventos e live marketing', 'Endomarketing', 'Trade marketing'],
  },
];

export const steps = [
  { title: 'Diagnóstico', text: 'Imersão no negócio, no mercado e no público. Entendemos onde você está antes de dizer para onde ir.' },
  { title: 'Estratégia', text: 'Posicionamento, metas e indicadores definidos com você — por escrito.' },
  { title: 'Criação', text: 'Ideias, marca e campanhas que nascem da estratégia, nunca o contrário.' },
  { title: 'Ativação', text: 'Mídia, conteúdo e tecnologia colocando a ideia no mundo.' },
  { title: 'Mensuração', text: 'Dashboard aberto, reunião mensal e otimização contínua.' },
];

export const plans = [
  { name: 'Start', desc: 'Para começar a se posicionar no digital.', items: ['Gestão de 2 redes sociais', '12 posts + 4 reels por mês', 'Tráfego pago em 1 plataforma', 'Relatório mensal'] },
  { name: 'Growth', desc: 'Marketing completo para acelerar vendas.', featured: true, items: ['Planejamento trimestral', '3 redes + produção de vídeo', 'Tráfego pago multicanal', 'Landing pages e automação', 'Dashboard em tempo real'] },
  { name: 'Full Agency', desc: 'A W2 como o seu departamento de marketing.', items: ['Tudo do Growth', 'Campanhas 360° e mídia off', 'Assessoria de imprensa', 'Consultoria de marketing e vendas', 'Atendimento dedicado'] },
];

export const numbers = [
  { value: 120, suffix: '+', label: 'projetos entregues' },
  { value: 45, suffix: '', label: 'clientes ativos' },
  { value: 3, suffix: 'x', label: 'retorno médio em mídia' },
  { value: 98, suffix: '%', label: 'de renovação' },
];

export const clients = ['Café do Vale', 'Construtora Horizonte', 'Clínica Saúde+', 'Moda Viva', 'Auto Center Prime', 'Agro Forte', 'Escola Nova Era', 'Mercado Bom Preço'];

export const interests = ['Diagnóstico', 'Plano Start', 'Plano Growth', 'Plano Full Agency', 'Branding', 'Site / e-commerce', 'Tráfego pago', 'Redes sociais', 'Imprensa', 'Consultoria'];

export type Case = {
  slug: string;
  title: string;
  client: string;
  result: string;
  category: string;
  color: string;
  challenge: string;
  solution: string;
  deliverables: string[];
  metrics: { value: string; label: string }[];
};

// Cases ilustrativos para o protótipo.
export const cases: Case[] = [
  {
    slug: 'cafe-do-vale', title: 'O sabor da manhã', client: 'Café do Vale', result: '+38% em vendas no trimestre', category: 'Campanha 360°', color: '#7a3b16',
    challenge: 'Uma marca regional querida, mas esquecida na gôndola diante de concorrentes nacionais.',
    solution: 'Campanha 360° que transformou o ritual do café da manhã em território da marca, com filme para TV regional, OOH e conteúdo digital.',
    deliverables: ['Conceito criativo', 'Filme 30"', 'Mídia OOH', 'Social e influenciadores'],
    metrics: [{ value: '+38%', label: 'vendas no trimestre' }, { value: '2,1 mi', label: 'pessoas impactadas' }, { value: '+64%', label: 'buscas pela marca' }],
  },
  {
    slug: 'construtora-horizonte', title: 'Uma nova Horizonte', client: 'Construtora Horizonte', result: 'Rebranding completo', category: 'Branding', color: '#1d3557',
    challenge: 'Uma identidade datada que não acompanhava o novo padrão dos empreendimentos.',
    solution: 'Reposicionamento, nova identidade visual e sistema de comunicação para lançamentos.',
    deliverables: ['Plataforma de marca', 'Identidade visual', 'Manual de marca', 'Kit de lançamento'],
    metrics: [{ value: '100%', label: 'pontos de contato renovados' }, { value: '3', label: 'lançamentos com a nova marca' }],
  },
  {
    slug: 'clinica-saude-mais', title: 'Agenda cheia', client: 'Clínica Saúde+', result: 'Custo por lead −52%', category: 'Performance', color: '#0f766e',
    challenge: 'Agenda com horários ociosos e anúncios caros sem retorno claro.',
    solution: 'Landing pages por especialidade, Google Ads com rastreamento ponta a ponta e automação de confirmação via WhatsApp.',
    deliverables: ['Landing pages', 'Google Ads', 'Automação', 'Dashboard'],
    metrics: [{ value: '−52%', label: 'custo por lead' }, { value: '+71%', label: 'agendamentos' }],
  },
  {
    slug: 'moda-viva', title: 'Vista quem você é', client: 'Moda Viva', result: '4 mil → 60 mil seguidores', category: 'Social', color: '#a61e4d',
    challenge: 'Perfil sem identidade e engajamento baixo.',
    solution: 'Linha editorial, produção de reels semanais e collabs com creators locais.',
    deliverables: ['Linha editorial', 'Reels', 'Creators', 'Social listening'],
    metrics: [{ value: '15x', label: 'seguidores em 10 meses' }, { value: '8,4%', label: 'taxa de engajamento' }],
  },
  {
    slug: 'auto-center-prime', title: 'Peça certa, rápido', client: 'Auto Center Prime', result: 'ROAS 3,4x no e-commerce', category: 'Digital', color: '#3f3f46',
    challenge: 'Vendas 100% no balcão e nenhum canal digital.',
    solution: 'E-commerce de peças integrado ao estoque, CRM e campanhas de catálogo.',
    deliverables: ['E-commerce', 'Integração de estoque', 'CRM', 'Shopping Ads'],
    metrics: [{ value: '3,4x', label: 'ROAS' }, { value: '22%', label: 'da receita vinda do online' }],
  },
  {
    slug: 'agro-forte', title: 'Do campo à gôndola', client: 'Agro Forte', result: 'Nova linha no varejo', category: 'Embalagem', color: '#4d7c0f',
    challenge: 'Levar uma marca do agro para a prateleira do supermercado.',
    solution: 'Arquitetura de marca, embalagens e materiais de PDV para a nova linha.',
    deliverables: ['Arquitetura de marca', 'Embalagens', 'PDV', 'Trade marketing'],
    metrics: [{ value: '120', label: 'pontos de venda no lançamento' }],
  },
];
