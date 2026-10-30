// База мемов "ЧЁ ЗА МЕМ? (Мемология 2026)"
// Идеальный баланс 50/50: Свежий Брейнрот (2024-2026) и Золотая Классика Рунета (2005-2018)

const MEME_DATABASE = [
  // --- 1. СВЕЖИЙ БРЕЙНРОТ И ЗУМЕРСКИЕ ТРЕНДЫ (50%) ---
  {
    id: "hamster",
    category: "brainrot",
    title: "Тапай Хомяка 🐹",
    word: "ХОМЯК",
    audioPreset: "hamster",
    audioPrompt: "«Тапаем, тапаем, тапаем хомяка...»",
    question: "Летом 2024 года миллионы людей сутками долбили пальцем по экрану ради...",
    visual: {
      type: "svg",
      emoji: "🐹🪙",
      bgGradient: "linear-gradient(135deg, #f59e0b, #d97706)",
      art: `<svg viewBox="0 0 200 200" width="100%" height="100%">
        <circle cx="100" cy="100" r="85" fill="#fef3c7" stroke="#d97706" stroke-width="6"/>
        <circle cx="65" cy="55" r="24" fill="#d97706"/>
        <circle cx="65" cy="55" r="14" fill="#fde68a"/>
        <circle cx="135" cy="55" r="24" fill="#d97706"/>
        <circle cx="135" cy="55" r="14" fill="#fde68a"/>
        <ellipse cx="100" cy="115" rx="55" ry="48" fill="#f59e0b"/>
        <ellipse cx="100" cy="125" rx="38" ry="32" fill="#fffbeb"/>
        <circle cx="80" cy="100" r="9" fill="#1e293b"/>
        <circle cx="83" cy="97" r="3" fill="#ffffff"/>
        <circle cx="120" cy="100" r="9" fill="#1e293b"/>
        <circle cx="123" cy="97" r="3" fill="#ffffff"/>
        <polygon points="100,112 94,106 106,106" fill="#f43f5e"/>
        <rect x="96" y="118" width="8" height="8" rx="2" fill="#ffffff" stroke="#94a3b8" stroke-width="1"/>
        <circle cx="145" cy="140" r="22" fill="#fbbf24" stroke="#b45309" stroke-width="3"/>
        <text x="145" y="148" font-size="20" font-weight="bold" fill="#78350f" text-anchor="middle">HMSTR</text>
        <text x="50" y="155" font-size="34">👆</text>
      </svg>`,
      caption: "Листинг уже завтра, пацаны, покупаем ламбы!"
    },
    options: [
      "Выплаты 17 рублей и пачки сухариков (Hamster Kombat)",
      "Акции Газпрома и личного дворецкого",
      "Бесплатного билета в Хогвартс",
      "Сертификата на годовой запас шаурмы"
    ],
    correctIndex: 0,
    fact: "Легендарный Hamster Kombat обещал сделать всех крипто-магнатами, но на дропе люди получили по 100-300 рублей и пошли обратно на завод. Чистый кринж!",
    punchline: "Тапал хомяка — получил на проезд в трамвае 🚎"
  },
  {
    id: "skuf_altushka",
    category: "zoomer",
    title: "Скуф и Альтушка 🛋️",
    word: "СКУФ",
    audioPreset: "misha",
    audioPrompt: "«Давай по новой, Миша, всё х**ня!»",
    question: "О чём мечтает каждый уважающий себя диванный скуф?",
    visual: {
      type: "svg",
      emoji: "🛋️🍺",
      bgGradient: "linear-gradient(135deg, #1e3a8a, #3b82f6)",
      art: `<svg viewBox="0 0 200 200" width="100%" height="100%">
        <rect width="200" height="200" rx="20" fill="#0f172a"/>
        <rect x="25" y="95" width="150" height="75" rx="16" fill="#78350f" stroke="#451a03" stroke-width="4"/>
        <rect x="20" y="115" width="22" height="45" rx="8" fill="#92400e"/>
        <rect x="158" y="115" width="22" height="45" rx="8" fill="#92400e"/>
        <circle cx="85" cy="85" r="26" fill="#fed7aa"/>
        <path d="M 62 80 Q 85 55 108 80" fill="none" stroke="#78350f" stroke-width="4"/>
        <circle cx="85" cy="98" r="3" fill="#ea580c"/>
        <rect x="68" y="110" width="36" height="35" rx="10" fill="#ffffff"/>
        <rect x="110" y="118" width="16" height="26" rx="4" fill="#fbbf24" stroke="#d97706" stroke-width="2"/>
        <rect x="90" y="25" width="95" height="36" rx="8" fill="#ec4899"/>
        <text x="137" y="48" font-size="12" font-weight="900" fill="#ffffff" text-anchor="middle">АЛЬТУШКА</text>
        <text x="140" y="80" font-size="28">🖤</text>
      </svg>`,
      caption: "Любимый диван, пиво, танки и мечта об альтушке"
    },
    options: [
      "Об альтушке с челкой, банке пива и победе в танках",
      "О карьере топ-модели на подиуме в Париже",
      "О золотой медали на марафоне по бегу",
      "Об открытии веганской смузи-лавки"
    ],
    correctIndex: 0,
    fact: "Скуф и альтушка — главный интернет-мем про противоположности: домашний парень на диване и неформальная девушка с цветными волосами.",
    punchline: "Скуф не стареет — скуф настаивается на диване 🛋️"
  },
  {
    id: "chinazes",
    category: "brainrot",
    title: "Чиназес... Сюдааа 🏖️",
    word: "ЧИНАЗЕС",
    audioPreset: "vineBoom",
    audioPrompt: "Тот самый легендарный звук Vine Boom!",
    question: "Что означает легендарное слово 'ЧИНАЗЕС' от блогера Андре Боярского?",
    visual: {
      type: "svg",
      emoji: "👌✨",
      bgGradient: "linear-gradient(135deg, #10b981, #047857)",
      art: `<svg viewBox="0 0 200 200" width="100%" height="100%">
        <rect width="200" height="200" rx="20" fill="#064e3b"/>
        <circle cx="100" cy="70" r="40" fill="#fde047"/>
        <ellipse cx="100" cy="140" rx="55" ry="22" fill="#78350f" stroke="#451a03" stroke-width="4"/>
        <path d="M 60 140 Q 100 115 140 140" fill="none" stroke="#b45309" stroke-width="8"/>
        <text x="45" y="70" font-size="28">✨</text>
        <text x="145" y="65" font-size="28">🏖️</text>
        <text x="95" y="180" font-size="16" font-weight="900" fill="#a7f3d0" text-anchor="middle">САНДАЛИК ОТДЫХАТЬ</text>
      </svg>`,
      caption: "Чиназес, сандалик, сюдааа... чистый кайф!"
    },
    options: [
      "Полный релакс, благодать, комфорт и кайф",
      "Китайская лапша быстрого приготовления",
      "Прием дзюдо против соперника в сандалиях",
      "Марка дешевого растворимого кофе"
    ],
    correctIndex: 0,
    fact: "Блогер Андре Боярский подарил миру 'Чиназес', 'Сандалик' и 'Сюдааа'. Теперь это универсальный статус абсолютного душевного умиротворения.",
    punchline: "Чиназес момент: лег на диван и отключил рабочий чат 😴"
  },
  {
    id: "quadrobics",
    category: "zoomer",
    title: "Квадроберы 🐾",
    word: "КВАДРОБЕР",
    audioPreset: "skibidi",
    audioPrompt: "«Skibidi dop dop dop yes yes!»",
    question: "Чем занимаются квадроберы в парках по всей стране?",
    visual: {
      type: "svg",
      emoji: "🦊🐾",
      bgGradient: "linear-gradient(135deg, #ec4899, #be185d)",
      art: `<svg viewBox="0 0 200 200" width="100%" height="100%">
        <rect width="200" height="200" rx="20" fill="#831843"/>
        <polygon points="50,90 35,35 90,65" fill="#f472b6" stroke="#ffffff" stroke-width="3"/>
        <polygon points="150,90 165,35 110,65" fill="#f472b6" stroke="#ffffff" stroke-width="3"/>
        <ellipse cx="100" cy="100" rx="55" ry="40" fill="#fbcfe8" stroke="#ffffff" stroke-width="3"/>
        <ellipse cx="75" cy="95" rx="8" ry="12" fill="#1e293b"/>
        <ellipse cx="125" cy="95" rx="8" ry="12" fill="#1e293b"/>
        <polygon points="100,110 93,103 107,103" fill="#ec4899"/>
        <circle cx="60" cy="160" r="14" fill="#fbcfe8" stroke="#f472b6" stroke-width="3"/>
        <circle cx="140" cy="160" r="14" fill="#fbcfe8" stroke="#f472b6" stroke-width="3"/>
        <text x="100" y="170" font-size="28" text-anchor="middle">🦴</text>
      </svg>`,
      caption: "Мяу! Гав! Не подходи к моей лавочке!"
    },
    options: [
      "Бегают на четырех конечностях в масках зверей и прыгают через кусты",
      "Решают квадратные уравнения на скорость под фонк",
      "Собирают квадрокоптеры из подручных березовых веток",
      "Слушают треки группы 'Квадро' 24 часа в сутки"
    ],
    correctIndex: 0,
    fact: "Квадробика взорвала интернет и рилсы в 2024 году так сильно, что её обсуждали все паблики и даже коты во дворах были в шоке.",
    punchline: "Главное правило квадробера: не перепутать корм с чипсами 🐱"
  },
  {
    id: "sigma_face",
    category: "zoomer",
    title: "Сигма Бейтман 🕶️",
    word: "СИГМА",
    audioPreset: "sigma",
    audioPrompt: "Тяжелый бразильский фонк истинного Сигмы!",
    question: "Какое выражение лица делает 'Истинный Сигма' под фонк-музыку?",
    visual: {
      type: "svg",
      emoji: "🗿🫦",
      bgGradient: "linear-gradient(135deg, #18181b, #27272a)",
      art: `<svg viewBox="0 0 200 200" width="100%" height="100%">
        <rect width="200" height="200" rx="20" fill="#09090b"/>
        <circle cx="100" cy="100" r="60" fill="#3f3f46"/>
        <ellipse cx="80" cy="85" rx="10" ry="4" fill="#fafafa"/>
        <ellipse cx="120" cy="85" rx="10" ry="4" fill="#fafafa"/>
        <line x1="68" y1="75" x2="92" y2="80" stroke="#d4d4d8" stroke-width="4"/>
        <line x1="132" y1="75" x2="108" y2="80" stroke="#d4d4d8" stroke-width="4"/>
        <ellipse cx="100" cy="122" rx="12" ry="7" fill="#71717a" stroke="#f43f5e" stroke-width="3"/>
        <text x="100" y="170" font-size="26" text-anchor="middle">🎧</text>
      </svg>`,
      caption: "*Звучит трек Brazilian Phonk и хруст костяшек*"
    },
    options: [
      "Втягивает щёки, сжимает губы трубочкой и одобрительно кивает",
      "Улыбается во все 32 зуба и машет двум руками",
      "Плачет в подушку из-за дедлайна",
      "Показывает язык и крутит пальцем у виска"
    ],
    correctIndex: 0,
    fact: "Мем появился из фильма 'Американский психопат', где Кристиан Бэйл кивает коллеге. Зумеры превратили это в культ сигма-мейлов.",
    punchline: "Сигма не ждет зарплату — зарплата ждет сигму 💼"
  },
  {
    id: "capybara",
    category: "zoomer",
    title: "Капибара 🦫",
    word: "КАПИБАРА",
    audioPreset: "capybara",
    audioPrompt: "«Ка-пи-ба-ра... капибара капибара капибара!»",
    question: "Какой саундтрек автоматически начинает играть в голове любого зумера при виде капибары?",
    visual: {
      type: "svg",
      emoji: "🦫🍊",
      bgGradient: "linear-gradient(135deg, #d97706, #92400e)",
      art: `<svg viewBox="0 0 200 200" width="100%" height="100%">
        <rect width="200" height="200" rx="20" fill="#451a03"/>
        <ellipse cx="100" cy="115" rx="55" ry="38" fill="#b45309"/>
        <ellipse cx="65" cy="95" rx="30" ry="24" fill="#92400e"/>
        <circle cx="65" cy="65" r="14" fill="#f97316"/>
        <circle cx="63" cy="58" r="3" fill="#22c55e"/>
        <line x1="50" y1="92" x2="62" y2="92" stroke="#1c1917" stroke-width="3"/>
        <text x="100" y="180" font-size="14" font-weight="900" fill="#fde68a" text-anchor="middle">КА-ПИ-БА-РА... КАПИБАРА!</text>
      </svg>`,
      caption: "Абсолютный дзен и мандаринчик на макушке"
    },
    options: [
      "Ка-пи-ба-ра, капибара-капибара-капибара... КАПИБАРА!",
      "Калинка-малинка моя в саду ягода малинка",
      "Gangnam Style Оп-оп-оп",
      "Саундтрек из фильма Интерстеллар"
    ],
    correctIndex: 0,
    fact: "Трек музыканта Сто-Личный Она-На про капибару набрал сотни миллионов прослушиваний по всему миру. Капибара стала тотемом спокойствия.",
    punchline: "Будь как капибара: сиди в ванночке и забей на проблемы 🛁"
  },
  {
    id: "pedro_raccoon",
    category: "zoomer",
    title: "Енот Педро 🦝",
    word: "ПЕДРО",
    audioPreset: "pedro",
    audioPrompt: "«Pedro Pedro Pedro Pedro PE!»",
    question: "Что непрерывно делает енот Педро под ритмичную итальянскую песню?",
    visual: {
      type: "svg",
      emoji: "🦝🕺",
      bgGradient: "linear-gradient(135deg, #10b981, #059669)",
      art: `<svg viewBox="0 0 200 200" width="100%" height="100%">
        <rect width="200" height="200" rx="20" fill="#022c22"/>
        <circle cx="100" cy="100" r="70" fill="none" stroke="#34d399" stroke-width="4" stroke-dasharray="10 5"/>
        <circle cx="100" cy="100" r="38" fill="#9ca3af"/>
        <ellipse cx="85" cy="95" rx="14" ry="9" fill="#111827"/>
        <ellipse cx="115" cy="95" rx="14" ry="9" fill="#111827"/>
        <circle cx="85" cy="95" r="4" fill="#ffffff"/>
        <circle cx="115" cy="95" r="4" fill="#ffffff"/>
        <text x="100" y="185" font-size="16" font-weight="900" fill="#6ee7b7" text-anchor="middle">PEDRO PEDRO PEDRO PE!</text>
      </svg>`,
      caption: "Круглый экран смарт-часов + танцующий енот = 100% залипание"
    },
    options: [
      "Вращается по кругу лапками кверху в ритм бита",
      "Стирает носки в ручье под дабстеп",
      "Крадет мусорный бак у соседей",
      "Спит на ветке дерева"
    ],
    correctIndex: 0,
    fact: "Енот по кличке Ginger из России стал звездой мирового интернета, когда его видео соединили с ремиксом песни Рафаэллы Карра 'Pedro'.",
    punchline: "Pedro Pedro Pedro Pedro PE! (теперь эта песня у тебя в голове) 🎶"
  },
  {
    id: "rusi_yascheri",
    category: "brainrot",
    title: "Русы против Ящеров 🛡️",
    word: "БАЙКАЛ",
    audioPreset: "mogiote",
    audioPrompt: "«Умеете, могёте просто! Чётко!»",
    question: "Чем славные древние Русы одолели коварных инопланетных Ящеров у Байкала?",
    visual: {
      type: "svg",
      emoji: "⚔️🦎",
      bgGradient: "linear-gradient(135deg, #15803d, #14532d)",
      art: `<svg viewBox="0 0 200 200" width="100%" height="100%">
        <rect width="200" height="200" rx="20" fill="#052e16"/>
        <circle cx="75" cy="100" r="40" fill="#dc2626" stroke="#fef08a" stroke-width="4"/>
        <text x="75" y="112" font-size="34" text-anchor="middle">☀️</text>
        <text x="140" y="115" font-size="44">🦎</text>
        <text x="100" y="170" font-size="14" font-weight="900" fill="#86efac" text-anchor="middle">БАЙКАЛЬСКАЯ ВОДИЦА</text>
      </svg>`,
      caption: "Слава Перуну! Богатырский зажим коленями работает безотказно!"
    },
    options: [
      "Святой Байкальской водицей и богатырским зажимом",
      "Нейросетями и блокчейном на смарт-контрактах",
      "Лазерными бластерами пришельцев",
      "Мирными переговорами за чашкой латте"
    ],
    correctIndex: 0,
    fact: "Мем про Русов и Ящеров родился из пародийных псевдоисторических лекций с ИИ-озвучкой профессора Багирова и превратился в культовую игру в Steam!",
    punchline: "Отпил байкальской водицы — и никакой ящер не страшен 🌊"
  },
  {
    id: "tyubik_masik",
    category: "zoomer",
    title: "Тюбик vs Масик 🧸",
    word: "МАСИК",
    audioPreset: "mogiote",
    audioPrompt: "«Умеете, могёте просто!»",
    question: "Кто такой 'МАСИК' в современной зумерской классификации парней?",
    visual: {
      type: "svg",
      emoji: "🧸💖",
      bgGradient: "linear-gradient(135deg, #f43f5e, #be123c)",
      art: `<svg viewBox="0 0 200 200" width="100%" height="100%">
        <rect width="200" height="200" rx="20" fill="#4c0519"/>
        <circle cx="100" cy="100" r="45" fill="#fda4af"/>
        <text x="100" y="112" font-size="40" text-anchor="middle">🥰</text>
        <text x="100" y="175" font-size="14" font-weight="900" fill="#fecdd3" text-anchor="middle">ЗЕЛЁНЫЙ ФЛАГ</text>
      </svg>`,
      caption: "Оплатил доставку роллов, выслушал про подруг и погладил котика"
    },
    options: [
      "Заботливый, адекватный парень с зеленым флагом, который вкусно кормит",
      "Нытик, который сливается при первой же трудности (это Тюбик)",
      "Опасный пацан с района с криминальными наклонностями (это Штрих)",
      "Просто рандомный знакомый чувак (это Чечик)"
    ],
    correctIndex: 0,
    fact: "Зумерский словарь: Тюбик — слабак, Чечик — нейтральный парень, Штрих — гопник, а Масик — святой идеал заботы.",
    punchline: "Будь масиком, не будь тюбиком 🧸"
  },
  {
    id: "eto_baza",
    category: "brainrot",
    title: "Это База 🏛️",
    word: "БАЗА",
    audioPreset: "baza",
    audioPrompt: "«Это база! Фундамент и генштаб!»",
    question: "Как звучит полная триада выражения: 'Это база, это...'",
    visual: {
      type: "svg",
      emoji: "🏛️🗿",
      bgGradient: "linear-gradient(135deg, #6366f1, #4338ca)",
      art: `<svg viewBox="0 0 200 200" width="100%" height="100%">
        <rect width="200" height="200" rx="20" fill="#1e1b4b"/>
        <rect x="50" y="60" width="16" height="90" fill="#e0e7ff"/>
        <rect x="92" y="60" width="16" height="90" fill="#e0e7ff"/>
        <rect x="134" y="60" width="16" height="90" fill="#e0e7ff"/>
        <polygon points="40,60 100,25 160,60" fill="#c7d2fe"/>
        <rect x="35" y="150" width="130" height="15" fill="#c7d2fe"/>
        <text x="100" y="185" font-size="14" font-weight="900" fill="#a5b4fc" text-anchor="middle">ФУНДАМЕНТ И ГЕНШТАБ</text>
      </svg>`,
      caption: "Сказал очевидную истину и сидишь довольный"
    },
    options: [
      "Это база, это основа, это фундамент, это генштаб!",
      "Это база, это склад, это гараж соседа дяди Толи",
      "Это база, это кринж, это полный провал",
      "Это база данных PostgreSQL с индексами"
    ],
    correctIndex: 0,
    fact: "Слово 'База' (Based) в Рунете обросло эпитетами 'фундамент, основа, генштаб' и стало высшей похвалой здравого смысла.",
    punchline: "Выдал базу — получил уважение в комментариях 🗿"
  },

  // --- 2. ЗОЛОТАЯ КЛАССИКА РУНЕТА (50%) ---
  {
    id: "yaz_ryba",
    category: "classic",
    title: "ЯЗЬ! Рыба моей мечты 🐟",
    word: "ЯЗЬ",
    audioPreset: "the_rock",
    audioPrompt: "Оглушительный эпический звук удара!",
    question: "Какую рыбу поймал восторженный рыбак Николай на озере?",
    visual: {
      type: "svg",
      emoji: "🎣🐟",
      bgGradient: "linear-gradient(135deg, #0284c7, #075985)",
      art: `<svg viewBox="0 0 200 200" width="100%" height="100%">
        <rect width="200" height="200" rx="20" fill="#082f49"/>
        <ellipse cx="100" cy="100" rx="55" ry="25" fill="#38bdf8" stroke="#ffffff" stroke-width="3"/>
        <polygon points="150,100 185,75 185,125" fill="#0284c7"/>
        <circle cx="65" cy="95" r="5" fill="#0f172a"/>
        <text x="100" y="170" font-size="22" font-weight="900" fill="#fef08a" text-anchor="middle">ЙЯЯЯЯЯЯЗЬ!</text>
      </svg>`,
      caption: "ВОТ ОНА! ЗДОРОВЕННЫЙ! ЗДОРОВЕННЫЙ ЯЗЬ!"
    },
    options: [
      "ЙЯЯЯЯЗЬ! ЗДОРОВЕННЫЙ ЯЗЬ, РЫБА МОЕЙ МЕЧТЫ!",
      "Кильку в томатном соусе по акции",
      "Золотую рыбку с тремя желаниями",
      "Старый дырявый резиновый сапог"
    ],
    correctIndex: 0,
    fact: "Николай Скворцов так искренне обрадовался язю, что получил премию рунета и навсегда вошел в историю интернета.",
    punchline: "Желаем каждому найти своего язя в жизни 🐟"
  },
  {
    id: "povarlovar",
    category: "classic",
    title: "Повар спрашивает повара 👨‍🍳",
    word: "ПОВАР",
    audioPreset: "povar",
    audioPrompt: "«Повар спрашивает повара... ХА-ХА-ХА-ХА!»",
    question: "О чем спросил повар повара в самом древнем видео рунета?",
    visual: {
      type: "svg",
      emoji: "👨‍🍳👮",
      bgGradient: "linear-gradient(135deg, #ef4444, #991b1b)",
      art: `<svg viewBox="0 0 200 200" width="100%" height="100%">
        <rect width="200" height="200" rx="20" fill="#450a0a"/>
        <path d="M 60 70 C 50 30, 150 30, 140 70 Z" fill="#ffffff"/>
        <rect x="65" y="65" width="70" height="15" fill="#f8fafc"/>
        <circle cx="100" cy="115" r="40" fill="#fed7aa"/>
        <path d="M 75 125 Q 100 155 125 125 Z" fill="#b91c1c"/>
        <text x="100" y="185" font-size="14" font-weight="900" fill="#fca5a5" text-anchor="middle">КАКОВА ТВОЯ ПРОФЕССИЯ?</text>
      </svg>`,
      caption: "— Повар! — А моя милиционер! ХА-ХА-ХА-ХА-ХА!"
    },
    options: [
      "— Какова твоя профессия? А моя милиционер! ХА-ХА-ХА!",
      "— Сколько варить макароны твердых сортов?",
      "— Где ты купил такой белый колпак?",
      "— Будешь добавку манной каши без комочков?"
    ],
    correctIndex: 0,
    fact: "Мальчик Антон Сидоров в 2000-х записал легендарный анекдот, ставший эталоном детского заразительного смеха.",
    punchline: "Классика не стареет, повар вечен 🍲"
  },
  {
    id: "borsh_kapustka",
    category: "classic",
    title: "Борщ с капусткой 🍲",
    word: "БОРЩ",
    audioPreset: "litvinkov",
    audioPrompt: "«Борщ с капусткой, но не красный, так... сосисочки...»",
    question: "О чем так душевно и поэтично рассказывал Никита Литвинков в школьной столовой?",
    visual: {
      type: "svg",
      emoji: "🥣🌭",
      bgGradient: "linear-gradient(135deg, #0284c7, #0369a1)",
      art: `<svg viewBox="0 0 200 200" width="100%" height="100%">
        <rect width="200" height="200" rx="20" fill="#082f49"/>
        <path d="M 60 80 Q 90 40 140 70 Q 120 100 80 90 Z" fill="#451a03"/>
        <circle cx="95" cy="100" r="32" fill="#fed7aa"/>
        <ellipse cx="100" cy="155" rx="50" ry="20" fill="#e2e8f0" stroke="#0284c7" stroke-width="3"/>
        <ellipse cx="100" cy="153" rx="42" ry="14" fill="#fbbf24"/>
        <text x="100" y="192" font-size="12" font-weight="900" fill="#38bdf8" text-anchor="middle">ОН МЕНЯ БЕСИТ!</text>
      </svg>`,
      caption: "Сосисочки... ещё какой-то непонятный салат... чай, он так освежает!"
    },
    options: [
      "Про борщ с капусткой (не красный), сосисочки и вкусный чай",
      "Про рецепт том-яма с тигровыми креветками",
      "Про то, как приготовить идеальный стейк рибай",
      "Про школьную пиццу за 15 копеек"
    ],
    correctIndex: 0,
    fact: "Интервью Никиты Литвинкова 2008 года — эталон литературного описания столовской еды с тончайшей интонацией.",
    punchline: "Борщ с капусткой, но не красный — формула идеального обеда 🍵"
  },
  {
    id: "kandibober",
    category: "classic",
    title: "Кандибобер 👒",
    word: "КАНДИБОБЕР",
    audioPreset: "kandibober",
    audioPrompt: "«Имя Ибрагим вам о чем-нибудь говорит?»",
    question: "Если женщина носит кандибобер на голове, что это точно НЕ значит?",
    visual: {
      type: "svg",
      emoji: "👒👠",
      bgGradient: "linear-gradient(135deg, #7c3aed, #4c1d95)",
      art: `<svg viewBox="0 0 200 200" width="100%" height="100%">
        <rect width="200" height="200" rx="20" fill="#2e1065"/>
        <path d="M 60 70 Q 100 20 145 50 Q 160 85 100 80 Z" fill="#dc2626"/>
        <circle cx="100" cy="115" r="32" fill="#fed7aa"/>
        <ellipse cx="88" cy="112" rx="4" ry="4" fill="#000000"/>
        <ellipse cx="112" cy="112" rx="4" ry="4" fill="#000000"/>
        <text x="100" y="180" font-size="13" font-weight="900" fill="#e9d5ff" text-anchor="middle">НЕ ЖЕНЩИНА И НЕ БАЛЕРИНА</text>
      </svg>`,
      caption: "В детстве я проходила Афганскую войну..."
    },
    options: [
      "Это не значит, что она женщина или балерина!",
      "Это не значит, что она забыла зонтик",
      "Это не значит, что на улице холодно",
      "Это не значит, что она стилист Сергея Зверева"
    ],
    correctIndex: 0,
    fact: "Культовое уличной интервью подарило интернету монолог про кандибобер, женщину, балерину и имя Ибрагим.",
    punchline: "Имя Ибрагим вам о чем-нибудь говорит? 🎩"
  },
  {
    id: "vy_kto_takie",
    category: "classic",
    title: "Вы кто такие? 🚪",
    word: "ДЕДУШКА",
    audioPreset: "dedushka",
    audioPrompt: "«Вы кто такие?! Я вас не звал, идите н***й!»",
    question: "Куда дедушка отправил незваных гостей в классическом видео?",
    visual: {
      type: "svg",
      emoji: "👴🚪",
      bgGradient: "linear-gradient(135deg, #b91c1c, #7f1d1d)",
      art: `<svg viewBox="0 0 200 200" width="100%" height="100%">
        <rect width="200" height="200" rx="20" fill="#450a0a"/>
        <rect x="40" y="40" width="65" height="120" fill="#78350f" stroke="#f59e0b" stroke-width="3"/>
        <circle cx="95" cy="100" r="4" fill="#fbbf24"/>
        <circle cx="135" cy="95" r="28" fill="#fed7aa"/>
        <rect x="120" y="70" width="30" height="12" fill="#71717a"/>
        <text x="100" y="185" font-size="13" font-weight="900" fill="#fca5a5" text-anchor="middle">ИДИТЕ Н***Й!</text>
      </svg>`,
      caption: "Универсальный ответ на любые непрошеные советы"
    },
    options: [
      "Идите н***й отсюда!",
      "На чай с домашними плюшками",
      "В библиотеку сдавать книги",
      "На консультацию к астрологу"
    ],
    correctIndex: 0,
    fact: "Короткий диалог через дверной проем стал золотым гимном личных границ любого интроверта.",
    punchline: "Когда тебе звонят из банка с уникальным предложением кредита 📞"
  },
  {
    id: "misha_vse_fignya",
    category: "classic",
    title: "Давай по новой, Миша 📄",
    word: "МИША",
    audioPreset: "misha",
    audioPrompt: "«Текст по-дебильному написан...»",
    question: "Почему видеоролик пришлось перезаписывать с самого начала?",
    visual: {
      type: "svg",
      emoji: "📹❌",
      bgGradient: "linear-gradient(135deg, #475569, #0f172a)",
      art: `<svg viewBox="0 0 200 200" width="100%" height="100%">
        <rect width="200" height="200" rx="20" fill="#020617"/>
        <circle cx="50" cy="50" r="12" fill="#ef4444"/>
        <text x="70" y="55" font-size="12" font-weight="900" fill="#ef4444">REC</text>
        <rect x="60" y="80" width="80" height="70" rx="8" fill="#334155"/>
        <text x="100" y="125" font-size="30" text-anchor="middle">😐</text>
        <text x="100" y="175" font-size="12" font-weight="900" fill="#94a3b8" text-anchor="middle">ТЕКСТ ПО-ДЕБИЛЬНОМУ НАПИСАН</text>
      </svg>`,
      caption: "Миша, у тебя скучное лицо, тебе никто денег не даст!"
    },
    options: [
      "— Давай по новой, Миша, всё х**ня, текст по-дебильному написан!",
      "— Батарейка в камере села, подожди пять минут",
      "— Ты забыл надеть галстук и причесаться",
      "— Микрофон фонит из-за холодильника"
    ],
    correctIndex: 0,
    fact: "Культовое закадровое видео с фразой «Давай по новой, Миша» стало абсолютной классикой интернета о качестве текста и актерской игры.",
    punchline: "С таким лицом тебе точно никто денег не даст 💸"
  },
  {
    id: "druzhko",
    category: "classic",
    title: "Сергей Дружко 🕵️‍♂️",
    word: "ДРУЖКО",
    audioPreset: "druzhko",
    audioPrompt: "«Сильное заявление. Проверять я его, конечно, не буду.»",
    question: "Какая коронная фраза Сергея Дружко стала универсальным интернет-мемом?",
    visual: {
      type: "svg",
      emoji: "🕵️‍♂️📺",
      bgGradient: "linear-gradient(135deg, #1e293b, #0f172a)",
      art: `<svg viewBox="0 0 200 200" width="100%" height="100%">
        <rect width="200" height="200" rx="20" fill="#020617"/>
        <circle cx="100" cy="80" r="30" fill="#fed7aa"/>
        <polygon points="50,170 85,115 115,115 150,170" fill="#1e293b"/>
        <text x="100" y="85" font-size="24" text-anchor="middle">🤨</text>
        <text x="100" y="185" font-size="11" font-weight="900" fill="#38bdf8" text-anchor="middle">ПРОВЕРЯТЬ Я ЕГО, КОНЕЧНО, НЕ БУДУ</text>
      </svg>`,
      caption: "Сильное заявление. Проверять не будем!"
    },
    options: [
      "Сильное заявление. Проверять я его, конечно, не буду.",
      "Я провел двойное слепое плацебо-контролируемое исследование.",
      "Скиньте ссылку на Википедию, пожалуйста.",
      "Я требую адвоката и стакан воды!"
    ],
    correctIndex: 0,
    fact: "Культовая фраза Сергея Дружко моментально стала главным мемом интернета для любых сомнительных новостей и вбросов.",
    punchline: "Звучит правдоподобно, проверять не будем 🤷‍♂️"
  },
  {
    id: "therock",
    category: "classic",
    title: "Бровь Скалы 🤨",
    word: "СКАЛА",
    audioPreset: "the_rock",
    audioPrompt: "Фирменный звук вскинутой брови Скалы!",
    question: "Каким звуковым эффектом всегда сопровождается мем со Скалой Джонсоном, поднимающим бровь?",
    visual: {
      type: "svg",
      emoji: "🤨💥",
      bgGradient: "linear-gradient(135deg, #374151, #111827)",
      art: `<svg viewBox="0 0 200 200" width="100%" height="100%">
        <rect width="200" height="200" rx="20" fill="#030712"/>
        <circle cx="100" cy="105" r="55" fill="#a1a1aa"/>
        <line x1="70" y1="88" x2="90" y2="88" stroke="#18181b" stroke-width="5"/>
        <path d="M 110 90 Q 125 65 140 78" fill="none" stroke="#18181b" stroke-width="6"/>
        <ellipse cx="80" cy="98" rx="8" ry="5" fill="#18181b"/>
        <ellipse cx="125" cy="95" rx="10" ry="10" fill="#18181b"/>
        <text x="100" y="185" font-size="16" font-weight="900" fill="#f87171" text-anchor="middle">*VINE BOOM SOUND*</text>
      </svg>`,
      caption: "Когда мама зашла в комнату без стука и смотрит в монитор"
    },
    options: [
      "Оглушительный глухой удар 'Vine Boom' 💥",
      "Нежный звон колокольчика в церкви",
      "Звук квакающей лягушки",
      "Сирена скорой помощи"
    ],
    correctIndex: 0,
    fact: "Культовый взгляд Дуэйна 'Скалы' Джонсона из рестлинга WWE со звуком Vine Boom — главный индикатор подозрения и постиронии в сети.",
    punchline: "Бровь Скалы видит твои ночные переписки 🤨"
  },
  {
    id: "pop_cat",
    category: "classic",
    title: "Поп Кот 🐱",
    word: "ПОПКОТ",
    audioPreset: "hamster",
    audioPrompt: "«Тапаем, тапаем, тапаем хомяка!»",
    question: "Какой звук издает кот Овсянка (Oatmeal), когда открывает рот огромной буквой 'О'?",
    visual: {
      type: "svg",
      emoji: "🐱⭕",
      bgGradient: "linear-gradient(135deg, #f97316, #ea580c)",
      art: `<svg viewBox="0 0 200 200" width="100%" height="100%">
        <rect width="200" height="200" rx="20" fill="#7c2d12"/>
        <circle cx="100" cy="100" r="50" fill="#ffffff"/>
        <polygon points="60,60 50,25 80,45" fill="#ffffff"/>
        <polygon points="140,60 150,25 120,45" fill="#ffffff"/>
        <circle cx="82" cy="85" r="5" fill="#000000"/>
        <circle cx="118" cy="85" r="5" fill="#000000"/>
        <ellipse cx="100" cy="115" rx="26" ry="24" fill="#991b1b" stroke="#000000" stroke-width="3"/>
        <text x="100" y="180" font-size="18" font-weight="900" fill="#fed7aa" text-anchor="middle">ПОП! ПОП! ПОП!</text>
      </svg>`,
      caption: "Кликали всем миром ради первого места страны"
    },
    options: [
      "Звонкий хлопок: 'ПОП!'",
      "Грустное собачье 'Гав!'",
      "Звук запуска Windows XP",
      "Скрип несмазанной дверной петли"
    ],
    correctIndex: 0,
    fact: "Сайт Popcat.click превратился в международную клик-войну, где страны соревновались, кто больше накликает 'попов'.",
    punchline: "ПОП-ПОП-ПОП — звук продуктивного рабочего дня 🐾"
  },
  {
    id: "shrek_swamp",
    category: "classic",
    title: "Шрек и болото 🧅",
    word: "ШРЕК",
    audioPreset: "vineBoom",
    audioPrompt: "Культовый звук Vine Boom!",
    question: "Какое главное правило нарушили сказочные существа, придя к Шреку?",
    visual: {
      type: "svg",
      emoji: "🟢🧅",
      bgGradient: "linear-gradient(135deg, #65a30d, #3f6212)",
      art: `<svg viewBox="0 0 200 200" width="100%" height="100%">
        <rect width="200" height="200" rx="20" fill="#1a2e05"/>
        <circle cx="100" cy="105" r="50" fill="#84cc16"/>
        <ellipse cx="48" cy="80" rx="10" ry="18" fill="#65a30d" transform="rotate(-30 48 80)"/>
        <ellipse cx="152" cy="80" rx="10" ry="18" fill="#65a30d" transform="rotate(30 152 80)"/>
        <path d="M 75 125 Q 100 145 125 125" fill="none" stroke="#365314" stroke-width="4"/>
        <text x="100" y="185" font-size="13" font-weight="900" fill="#bef264" text-anchor="middle">ЧТО ВЫ ДЕЛАЕТЕ В МОЁМ БОЛОТЕ?!</text>
      </svg>`,
      caption: "Огры — как лук. Они многослойные!"
    },
    options: [
      "Залезли в его родное болото без спроса!",
      "Не помыли руки перед едой",
      "Съели всех улиток и пиявок",
      "Забыли пароль от Wi-Fi в избушке"
    ],
    correctIndex: 0,
    fact: "Шрек — величайшая франшиза и неиссякаемый источник мемов от 'Somebody once told me' до танцев осла. Болото священно!",
    punchline: "Моя квартира в пятницу вечером — это официальный филиал болота 🧅"
  }
];

// Ранги
const MEME_RANKS = [
  {
    minScore: 0,
    maxScore: 3,
    title: "Полный Скуф из Одноклассников 🥔",
    badge: "🥔 СКУФ",
    color: "#f59e0b",
    description: "Ты вообще в интернет заходил последние 10 лет? Твой пик юмора — гифка с чашкой кофе в WhatsApp от тёти. Срочно открывай TikTok на реабилитацию!",
    advice: "Поставь лайк на картинку с розами и иди варить пельмени."
  },
  {
    minScore: 4,
    maxScore: 6,
    title: "Нормис Обыкновенный 🥱",
    badge: "🥱 НОРМИС",
    color: "#06b6d4",
    description: "Ты смотришь мемы, когда они уже умерли и их показали по телевизору в новостях. Знаешь базу, но брейнрот обходит тебя стороной.",
    advice: "Меньше спи, больше листай рилсы трехнедельной свежести."
  },
  {
    minScore: 7,
    maxScore: 9,
    title: "Базированный Гигачад 🗿",
    badge: "🗿 БАЗА",
    color: "#a855f7",
    description: "Уважение! Ты мгновенно отличишь скуфа от тюбика, а язя от капибары. Твой словарный запас пугает родителей и восхищает друзей.",
    advice: "Квадратная челюсть уже проглядывается. Продолжай выдавать базу."
  },
  {
    minScore: 10,
    maxScore: 999,
    title: "Абсолютный Повелитель Брейнрота 👑",
    badge: "👑 ЧОЗАБРЕТТО",
    color: "#ec4899",
    description: "Твой мозг на 99% состоит из тиктоков, звуков Vine Boom и криков 'Чиназес'. Ты чувствуешь мемы за секунду до их зарождения!",
    advice: "Срочно потрогай траву во дворе, пока не превратился в квадробера."
  }
];

const WIN_TAUNTS = [
  "БАЗА! Чистейшая база 🗿",
  "Чиназес, сюдааа! Кайф!",
  "Гигачад момент! Красиво вошел!",
  "Перун тобой гордится, славный рус!",
  "О повезло, повезло! Или скилл?",
  "Масик обнаружен! Уважение 🧸",
  "Умеете, могёте просто! Классно!"
];

const LOSE_TAUNTS = [
  "КРИНЖ! Минус социальный рейтинг 💀",
  "Скуф пойман за руку! Иди на диван 🛋️",
  "Тюбик момент... соберись!",
  "Плаки-плаки или нормалдаки? Тут явно плаки 😭",
  "Давай по новой, Миша, всё по-дебильному!",
  "Вы кто такие? Я вас не звал! 🚪",
  "Текст не читал, на кнопку нажал... эх!"
];
