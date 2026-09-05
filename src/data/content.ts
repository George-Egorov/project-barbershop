export type ContentImage =
  | "/images/interior.webp"
  | "/images/client-portrait.webp"
  | "/images/craft.webp"
  | "/images/team-editorial-01.webp"
  | "/images/team-editorial-02.webp"
  | "/images/team-editorial-03.webp";

export interface SiteIdentity {
  name: string | null;
  descriptor: string;
  logoSrc: string | null;
}

export interface SocialLink {
  label: string;
  url: string;
}

export interface SiteSettings {
  identity: SiteIdentity;
  eyebrow: string;
  heroLines: readonly [string, string];
  heroMeta: readonly [string, string];
  description: string;
  bookingLabel: string;
  bookingUrl: string | null;
  socialLink: SocialLink | null;
  metadata: {
    title: string;
    description: string;
  };
}

export interface NavItem {
  label: string;
  href: `#${string}`;
}

export interface Branch {
  id: string;
  city: string;
  name: string;
  address: string;
  phone?: {
    label: string;
    href: `tel:${string}`;
  };
  bookingUrl?: string;
}

export interface Service {
  id: string;
  index: string;
  displayTitle: string;
  title: string;
  description: string;
  note: string;
  image: ContentImage;
  imageAlt: string;
}

export interface TeamRole {
  id: string;
  index: string;
  role: string;
  focus: string;
  description: string;
  image: ContentImage;
  imageAlt: string;
}

export interface LookbookItem {
  id: string;
  image: ContentImage;
  imageAlt: string;
  caption: string;
  format: "portrait" | "landscape" | "square";
}

export interface Article {
  id: string;
  category: "Гид" | "Уход" | "Культура";
  title: string;
  excerpt: string;
  image: ContentImage;
  imageAlt: string;
  href: `#${string}`;
}

export const siteSettings: SiteSettings = {
  identity: {
    name: null,
    descriptor: "БАРБЕРШОП",
    logoSrc: "/brand/barbershop-mark.svg",
  },
  eyebrow: "МУЖСКОЙ СТИЛЬ / УХОД",
  heroLines: ["БОЛЬШЕ ЧЕМ", "СТРИЖКА."],
  heroMeta: ["НИЖЕ — БОЛЬШЕ", "УСЛУГИ / КОМАНДА / ЗАПИСЬ"],
  description:
    "Мужская стрижка как точная работа с формой, характером и вашим ежедневным ритмом.",
  bookingLabel: "Перейти к записи",
  bookingUrl: null,
  socialLink: null,
  metadata: {
    title: "Премиальный барбершоп — стрижки, бритьё и уход",
    description:
      "Концепт сайта барбершопа: услуги, команда, образы, материалы об уходе и подготовленное место для онлайн-записи.",
  },
};

export const navItems = [
  { label: "Услуги", href: "#services" },
  { label: "Команда", href: "#team" },
  { label: "Образы", href: "#lookbook" },
  { label: "Журнал", href: "#journal" },
  { label: "Запись", href: "#booking" },
] as const satisfies readonly NavItem[];

export const manifesto = {
  words: ["СТРИЖКА.", "БРИТЬЁ.", "СТИЛЬ.", "СНОВА."],
  statement:
    "Мы работаем не только с волосами. Мы собираем образ, в котором удобно оставаться собой каждый день.",
} as const;

export const pageCopy = {
  services: {
    index: "02",
    eyebrow: "Услуги",
    title: "Выберите свой ритуал.",
    titleLines: ["Выберите", "свой ритуал."],
    description:
      "От точной стрижки до полного ухода. Выберите задачу, а мастер поможет собрать форму под ваш ритм и привычки.",
  },
  team: {
    index: "03",
    eyebrow: "Команда",
    title: "Характер создают люди.",
    titleLines: ["Характер", "создают люди."],
    description:
      "Команда с разным опытом и одним вниманием к деталям. Подберём мастера под задачу, стиль и комфортный темп общения.",
  },
  lookbook: {
    index: "04",
    eyebrow: "Образы",
    title: "Форма, которую хочется рассмотреть ближе.",
    titleLines: ["Форма, которую хочется", "рассмотреть ближе."],
    description:
      "Тактильные детали, рабочий процесс и спокойная уверенность результата — без постановочного глянца.",
  },
  journal: {
    index: "05",
    eyebrow: "Журнал",
    title: "Уход, стиль и жизнь команды.",
    titleLines: ["Уход и стиль.", "Жизнь команды."],
    description:
      "Практичные материалы, к которым можно вернуться между визитами.",
  },
  atmosphere: {
    eyebrow: "Атмосфера",
    lines: ["КРЕСЛО.", "ЗВУК.", "РИТУАЛ."],
    note: "Спокойный свет, знакомая музыка и время, которое можно посвятить только себе.",
  },
  booking: {
    index: "06",
    eyebrow: "Ваш следующий визит",
    title: "ВАШЕ КРЕСЛО",
    description:
      "Здесь появятся выбор услуги, мастера и удобного времени после подключения системы онлайн-записи.",
    availability: "Услуги / мастер / удобное время",
  },
} as const;

export const services = [
  {
    id: "haircut",
    index: "01",
    displayTitle: "СТРИЖКА",
    title: "Мужская стрижка",
    description:
      "Форма с учётом структуры волос, пропорций лица и привычного способа укладки.",
    note: "Стоимость уточняется",
    image: "/images/craft.webp",
    imageAlt: "Крупный план работы ножницами над мужской стрижкой",
  },
  {
    id: "beard",
    index: "02",
    displayTitle: "БОРОДА",
    title: "Оформление бороды",
    description:
      "Коррекция длины, контура и объёма, чтобы борода продолжала форму стрижки.",
    note: "Стоимость уточняется",
    image: "/images/client-portrait.webp",
    imageAlt: "Мужской образ с аккуратно оформленной бородой",
  },
  {
    id: "full-service",
    index: "03",
    displayTitle: "ПОЛНЫЙ ОБРАЗ",
    title: "Стрижка и борода",
    description:
      "Единый визит, в котором силуэт стрижки, форма бороды и завершающий уход работают вместе.",
    note: "Стоимость уточняется",
    image: "/images/interior.webp",
    imageAlt: "Кресло в пространстве современного барбершопа",
  },
  {
    id: "gray-blending",
    index: "04",
    displayTitle: "КАМУФЛЯЖ",
    title: "Камуфляж седины",
    description:
      "Мягкая работа с оттенком волос или бороды без плотного окрашивания и резкой границы отрастания.",
    note: "Стоимость уточняется",
    image: "/images/client-portrait.webp",
    imageAlt: "Аккуратный мужской образ после работы с оттенком волос",
  },
  {
    id: "junior-haircut",
    index: "05",
    displayTitle: "ЮНЫЙ ГОСТЬ",
    title: "Детская стрижка",
    description:
      "Спокойная стрижка для юного гостя с понятным процессом, комфортным темпом и лёгкой укладкой.",
    note: "Стоимость уточняется",
    image: "/images/craft.webp",
    imageAlt: "Точная работа ножницами во время стрижки",
  },
  {
    id: "styling-care",
    index: "06",
    displayTitle: "УКЛАДКА И УХОД",
    title: "Укладка и уход",
    description:
      "Финишная укладка, рекомендации по средствам и простой домашний ритуал без лишних шагов.",
    note: "Стоимость уточняется",
    image: "/images/interior.webp",
    imageAlt: "Интерьер барбершопа и зона ухода за гостем",
  },
] as const satisfies readonly Service[];

export const team = [
  {
    id: "senior-barber",
    index: "01",
    role: "Старший барбер",
    focus: "Форма / текстура / наставничество",
    description:
      "Ведёт сложные работы и помогает команде сохранять единый стандарт результата.",
    image: "/images/team-editorial-01.webp",
    imageAlt: "Редакционный портрет старшего барбера",
  },
  {
    id: "beard-specialist",
    index: "02",
    role: "Эксперт по бороде",
    focus: "Контуры / объём / уход",
    description:
      "Работает с пропорциями бороды и подбирает понятный домашний ритуал ухода.",
    image: "/images/team-editorial-02.webp",
    imageAlt: "Редакционный портрет эксперта по бороде",
  },
  {
    id: "barber",
    index: "03",
    role: "Барбер",
    focus: "Стрижка / укладка / детали",
    description:
      "Собирает практичный образ и объясняет, как поддерживать его между визитами.",
    image: "/images/team-editorial-03.webp",
    imageAlt: "Редакционный портрет барбера",
  },
] as const satisfies readonly TeamRole[];

export const lookbook = [
  {
    id: "craft-closeup",
    image: "/images/craft.webp",
    imageAlt: "Руки барбера и ножницы во время точной работы",
    caption: "Ремесло / точная работа",
    format: "landscape",
  },
  {
    id: "finished-shape",
    image: "/images/client-portrait.webp",
    imageAlt: "Мужской портрет с законченной формой стрижки и бороды",
    caption: "Результат / форма и характер",
    format: "portrait",
  },
  {
    id: "quiet-interior",
    image: "/images/interior.webp",
    imageAlt: "Современное тёмное пространство барбершопа с креслом",
    caption: "Пространство / тишина перед визитом",
    format: "landscape",
  },
  {
    id: "team-detail-one",
    image: "/images/team-editorial-01.webp",
    imageAlt: "Редакционный портрет мастера в рабочем пространстве",
    caption: "Люди / спокойная уверенность",
    format: "portrait",
  },
  {
    id: "team-detail-two",
    image: "/images/team-editorial-02.webp",
    imageAlt: "Редакционный портрет опытного мастера",
    caption: "Опыт / без лишнего шума",
    format: "square",
  },
  {
    id: "team-detail-three",
    image: "/images/team-editorial-03.webp",
    imageAlt: "Редакционный портрет молодого барбера у зеркала",
    caption: "Дальше / новое поколение команды",
    format: "portrait",
  },
] as const satisfies readonly LookbookItem[];

export const branches: readonly Branch[] = [];

export const articles = [
  {
    id: "haircut-shape-guide",
    category: "Гид",
    title: "Как выбрать форму стрижки и говорить с барбером на одном языке",
    excerpt:
      "Короткий ориентир по длине, силуэту и референсам перед следующим визитом.",
    image: "/images/client-portrait.webp",
    imageAlt: "Мужская стрижка для материала о выборе формы",
    href: "#journal-haircut-shape-guide",
  },
  {
    id: "beard-care-at-home",
    category: "Уход",
    title: "Борода дома: простой уход без лишних средств",
    excerpt:
      "Что действительно помогает сохранять мягкость, аккуратный контур и комфорт кожи.",
    image: "/images/craft.webp",
    imageAlt: "Работа барбера для материала об уходе за бородой",
    href: "#journal-beard-care-at-home",
  },
  {
    id: "between-visits",
    category: "Культура",
    title: "Между визитами: как дольше сохранять собранный образ",
    excerpt:
      "Несколько привычек для укладки и понятный сигнал, что пора обновить форму.",
    image: "/images/interior.webp",
    imageAlt: "Атмосфера барбершопа для редакционного материала",
    href: "#journal-between-visits",
  },
] as const satisfies readonly Article[];
