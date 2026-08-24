/* situations.js — 生活情境索引（2026-08-24 新增）
 *
 * 起因：Owen 看到一門按「生活情境」組織的線上課（Fabio 口袋法文），說
 * 「照他的脈絡整理也許是我學好的契機」。他的直覺對，但理由要說清楚：
 * **情境化不是離開考試，那就是口說考試的題型本身**——DELF A2 口說第三部分是
 * dialogue simulé（抽情境角色扮演），TEF 口說 Section A 是向對方取得資訊。
 * 課本按文法組織，所以他缺的是「按情境找得到東西」這條軸線。
 *
 * ⚠️ 這支檔案**不新增任何法文內容**，只是把既有素材重新掛索引：
 *    topics → questions.js 的題目｜lessons → french_notes.html 的課次｜ac → answer_cards.js
 * 教材鐵律不變：所有法文仍然只來自筆記與課堂材料。
 *
 * 每個情境的 `exam` 欄位是重點——它說明這個情境在考試的哪裡出現。
 * 沒有 exam 價值的情境不要加進來（那是觀光課的事，不是我們的目標）。
 *
 * ⚠️ **純文法與應試技巧的 topic 刻意不收進來**（reflexive-verbs、negation、futur-proche、
 *    pronoms-y-en、strategie-lecture、paires-confusables…）——它們不屬於任何生活情境，
 *    它們有自己的軸線：map.html 的「📐 文法大局觀」與「📚 文法資料庫」。
 *    情境索引只回答「我在這個場合要用什麼」，不回答「這個文法怎麼運作」。
 */
const SITUATIONS = [
  { id:'se-presenter', icon:'🙋', zh:'自我介紹與寒暄', fr:'Se présenter',
    exam:'DELF/TEF 口說第一部分 entretien dirigé 幾乎必考——考官一開口就是這個',
    topics:['greetings-politeness','etre-avoir','question-words','on-vs-nous','cest-il-est'],
    lessons:[1,2], ac:'AC1' },

  { id:'famille', icon:'👨‍👩‍👧', zh:'家庭與人際', fr:'La famille',
    exam:'口說 Parlez-moi de votre famille 是老師課堂實測過的考官指令句',
    topics:['family-possessives','possessives','pronoms-toniques'],
    lessons:[2,3], ac:'AC2' },

  { id:'decrire-qqn', icon:'🧍', zh:'描述一個人', fr:'Décrire quelqu\'un',
    exam:'寫作描述題與口說第二部分；比較級在這裡最常用',
    topics:['physical-description','character-adjectives','vocab-apparence','vocab-caractere','adjective-agreement','adjective-position','comparaison','vocab-sens'],
    lessons:[10,25,26] },

  { id:'logement', icon:'🏠', zh:'租屋與住家', fr:'Se loger',
    exam:'DELF A2 閱讀最愛出租屋廣告；口說也常問你住哪、住什麼樣的地方',
    topics:['vocab-logement','vocab-housing','vocab-annonces','vocab-meubles','vocab-quartier','prepositions-lieu2','qui-que'],
    lessons:[11,23,24,25], ac:'AC9' },

  { id:'courses', icon:'🛒', zh:'購物與商店', fr:'Faire les courses',
    exam:'⭐ DELF A2 口說第三部分 dialogue simulé 最常抽到的情境（附道具假鈔那個）',
    topics:['vocab-shopping','vocab-clothing-size','articles','demonstrative-adj','intensite','voici-voila','vocab-tech-objects'],
    lessons:[4,5,6,7,8], ac:'AC10' },

  { id:'restaurant', icon:'🍽', zh:'餐廳與飲食', fr:'Au restaurant',
    exam:'dialogue simulé 的第二大情境；點餐、問價錢、結帳的整套流程',
    topics:['vocab-alimentation','likes-hobbies-sports'],
    lessons:[13], ac:'AC6' },

  { id:'se-deplacer', icon:'🚇', zh:'問路與交通', fr:'Se déplacer',
    exam:'聽力題常見（車站廣播、問路對話）；命令式在這裡最自然',
    topics:['preposition-place-transport','vocab-places-city','imperative-mood'],
    lessons:[4,6,7,11] },

  { id:'sante', icon:'🏥', zh:'看醫生與身體', fr:'Chez le médecin',
    exam:'口說情境卡與聽力（藥局對話）；建議句型 il faut / devoir 的主場',
    topics:['body-health','ilfaut-devoir','giving-advice','interdiction-demande'],
    lessons:[12,13], ac:'AC11' },

  { id:'rendez-vous', icon:'📅', zh:'約時間與邀約', fr:'Proposer un rendez-vous',
    exam:'⭐ 口說協商情境＋寫作 tâche 1（回覆邀約的訊息）都考這個',
    topics:['social-invitations','numbers-dates-heure','pouvoir-vouloir'],
    lessons:[1,6,9,19], ac:'AC14' },

  { id:'travail', icon:'💼', zh:'工作與職業', fr:'Le travail',
    exam:'口說高頻話題；TEF 議論題常出「遠端工作贊不贊成」這類',
    topics:['metier-travail-vocab','vocab-parcours-vie','duree','qui-que','connectors-pour-parceque'],
    lessons:[16,18], ac:'AC3' },

  { id:'etudes', icon:'🎓', zh:'學業與大學', fr:'Les études',
    exam:'自我介紹的延伸；COD 代名詞在這課的課文出現',
    topics:['universite-vocab','cod-pronouns'],
    lessons:[15], ac:'AC4' },

  { id:'meteo', icon:'⛅', zh:'天氣與季節', fr:'La météo',
    exam:'小型對話與聽力常見；il fait / il y a 兩套系統別混',
    topics:['vocab-meteo','vocab-weather-season'],
    lessons:[7,8,22] },

  { id:'vacances', icon:'✈️', zh:'假期與旅行', fr:'Les vacances',
    exam:'⭐ 口說最常問的過去經驗題——講假期＝考 passé composé 的自然場合',
    topics:['vocab-vacances','reservation-hotel','preposition-country','vocab-nature'],
    lessons:[13,14], ac:'AC7' },

  { id:'loisirs', icon:'🎨', zh:'休閒與運動', fr:'Les loisirs',
    exam:'口說高頻話題；頻率副詞（souvent / de temps en temps）在這裡用得最多',
    topics:['vocab-loisirs','vocab-sport-gym','vocab-sport-activities','likes-hobbies-sports','frequency-adverbs','household-chores','daily-routine-vocab'],
    lessons:[9,10,13,19], ac:'AC5' },

  { id:'passe', icon:'🕰', zh:'講過去的事與回憶', fr:'Raconter au passé',
    exam:'⭐ 四場考試都要——口說講經驗、寫作講事件、閱讀聽力都在講過去',
    topics:['passe-compose','imparfait','vocab-souvenirs','passe-recent','duree'],
    lessons:[11,15,17,20,21] },

  { id:'opinion', icon:'🗣', zh:'表達意見與反應', fr:'Donner son avis',
    exam:'⭐ TEF/DELF 口說第二部分與寫作 tâche 2 的核心；沒有這個過不了 B2',
    topics:['connectors-pour-parceque','cest-il-est','condition-si','tout-chaque'],
    lessons:[25,26], ac:'AC13' },

  { id:'canada', icon:'🍁', zh:'加拿大與移民動機', fr:'Le Canada',
    exam:'⭐⭐ 這是你考試的理由，考官一定會問「為什麼是加拿大」——沒有任何觀光課會教這題',
    topics:['vocab-parcours-vie'],
    lessons:[18], ac:'AC8' },
];
if (typeof module !== 'undefined') module.exports = { SITUATIONS };
