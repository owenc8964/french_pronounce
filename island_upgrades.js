/* ============================================================
   island_upgrades.js — 口說島的升級版（2026-10-23）
   ------------------------------------------------------------
   Owen：「如果加上口說寫作的思維訓練你會怎麼做」「同一句話 A2 B1 B2 C1 的口說寫作方法」→「用口說島好了，③（自己改寫）等之後再做」
   ⭐ 用途：「🔧 升級版用了哪一招？」辨識題（咖啡館）。招式定義與課本例句在 upgrade_moves.js
   ⭐ 規則（memory feedback_personal_content_authenticity，10-23 補充）：島的想法／故事是 Owen 的，把島升到 B1／B2＝「分級」，可以做；
      ⛔ 不加新的經歷、意見、例子——需要的原因或細節都取自同一座島他自己講過的句子（base2）
   ⭐ 只用偶數位置的句子（ref 的數字是偶數）；奇數位置留給之後 Owen 自己改寫（③），改完再跟這種版本對照
   欄位：{ ref:'AC島:句', base:島原句, base2?:同島用到的另一句, up:升級版, move:upgrade_moves 的 id, zh }
   ============================================================ */
var ISLAND_UPGRADES = [
  { ref:'AC1:4',  base:'J\'habite à Banqiao, près de Taipei, dans un immeuble.', up:'J\'habite dans un immeuble qui se trouve à Banqiao, près de Taipei.', move:'b1-rel-qui-que', zh:'我住在一棟位於台北附近板橋的大樓。' },
  { ref:'AC1:8',  base:'Je prends des cours, et j\'utilise aussi Duolingo et l\'IA.', up:'J\'apprends en prenant des cours, mais aussi en utilisant Duolingo et l\'IA.', move:'b1-gerondif', zh:'我靠上課學，也靠 Duolingo 和 AI。' },
  { ref:'AC2:0',  base:'Je vis avec ma femme Lauryn et notre fille Jolie.', base2:'Elle est très aventurière.', up:'Je vis avec ma femme Lauryn et notre fille Jolie, qui est très aventurière.', move:'b1-rel-qui-que', zh:'我跟太太 Lauryn 和很愛冒險的女兒 Jolie 一起住。' },
  { ref:'AC4:0',  base:'J\'ai étudié à TMU, en médecine dentaire.', up:'C\'est à TMU que j\'ai étudié la médecine dentaire.', move:'b1-mise-en-relief', zh:'我是在北醫念牙醫的。' },
  { ref:'AC6:4',  base:'Parfois, ma femme cuisine pour nous.', up:'Parfois, c\'est ma femme qui cuisine pour nous.', move:'b1-mise-en-relief', zh:'有時候是我太太煮給我們吃。' },
  { ref:'AC7:8',  base:'En ville, je prépare tout, parce que je veux tout voir.', up:'En ville, je veux tout voir, c\'est pourquoi je prépare tout.', move:'b1-consequence', zh:'在城市裡我什麼都想看，所以我會事先準備好一切。' },
  { ref:'AC8:0',  base:'Je veux partir au Canada avec ma famille.', up:'J\'aimerais partir au Canada avec ma famille.', move:'b1-cond-poli', zh:'我很想跟家人一起去加拿大。' },
  { ref:'AC8:8',  base:'C\'est pour ça que je veux offrir un autre environnement à ma fille.', up:'Je veux partir au Canada pour que ma fille ait un autre environnement.', move:'b1-but', zh:'我想去加拿大，讓女兒有不一樣的環境。' },
  { ref:'AC8:10', base:'Taïwan est de plus en plus chaud, et avec le réchauffement climatique, ce sera pire.', up:'À cause du réchauffement climatique, Taïwan est de plus en plus chaud, et ce sera pire.', move:'b1-grace-a', zh:'因為全球暖化，台灣越來越熱，而且會更糟。' },
  { ref:'AC9:0',  base:'J\'habite dans un appartement.', base2:'Une chambre, c\'est pour ma fille, mais elle dort avec nous.', up:'J\'habite dans un appartement qui a une chambre pour ma fille, mais elle dort avec nous.', move:'b1-rel-qui-que', zh:'我住的公寓有一間女兒的房間，不過她跟我們一起睡。' },
  { ref:'AC10:0', base:'J\'achète souvent sur Coupang.', base2:'Je ne fais pas souvent les magasins.', up:'J\'achète souvent sur Coupang, alors je ne fais pas souvent les magasins.', move:'b1-consequence', zh:'我常在 Coupang 買東西，所以不常逛街。' },
  { ref:'AC11:8', base:'Dentiste, on est penché toute la journée.', up:'En travaillant comme dentiste, on est penché toute la journée.', move:'b1-gerondif', zh:'當牙醫的話，一整天都在彎著身體。' },
  { ref:'AC12:2', base:'J\'utilise Insight Timer pour ma méditation.', up:'J\'utilise Insight Timer pour méditer.', move:'b1-but', zh:'我用 Insight Timer 來冥想。' },
  { ref:'AC13:0', base:'J\'apporte ma propre boîte pour le déjeuner.', base2:'Je pense que c\'est important de ne pas utiliser trop de produits jetables.', up:'J\'apporte ma propre boîte pour le déjeuner, parce que je pense qu\'il est important de ne pas utiliser trop de produits jetables.', move:'a2-parce-que', zh:'我自己帶便當盒，因為我覺得少用一次性用品很重要。' },
  { ref:'AC13:4', base:'Je pense que c\'est important de ne pas utiliser trop de produits jetables.', up:'Je pense qu\'il faut qu\'on utilise moins de produits jetables.', move:'b2-subj-jugement', zh:'我覺得我們應該少用一次性用品。' },
  { ref:'AC15:0', base:'J\'ai commencé le français en mai 2026.', up:'J\'apprends le français depuis mai 2026.', move:'b1-duree', zh:'我從 2026 年 5 月開始學法文。' },
  { ref:'AC7:0',  base:'Non, je ne suis jamais allé au Canada.', up:'Non, je n\'y suis jamais allé.', move:'b1-y-en', zh:'沒有，我從來沒去過（那裡）。' }
];
