/* ============================================================
   exam_items.js — 考試樣式的「理解型」題（2026-10-23）
   ------------------------------------------------------------
   Owen：「這種題目（課本挖空）是課本常見的，主要練語感跟寫作，正式的考試反而題目不會這樣出。」「題目用這樣設計我是覺得 ok」
   ⭐ TCF Canada 沒有單獨的文法科：文法是透過聽讀理解間接考 → 這裡的題目是「靠文法抓到意思」
   ⭐ 已核准的例外（CLAUDE.md 內容鐵律 1）：理解測驗的短文與題幹可原創，詞彙句型對齊已學（A1–A2）
   ⭐ 介面純法文（memory feedback_french_only_ui）：問題與選項法文；zh（整句中文）與 why（原因）只在答錯時出現
   題型：time＝時間判斷（時態辨識）｜neg＝否定陷阱（ne…que／plus／jamais／rien／personne）｜hypo＝真的還是假設（si＋現在式／未完成式、條件式）
   欄位：{ id, type, fr, stmt?(neg 用的待判斷敘述), ans(選項索引), zh, why, focus(對應重點) }
   ============================================================ */
var EXAM_TYPES = {
  time: { q: 'Quand est-ce que ça se passe ?', opts: ['C\'est déjà fait.', 'Maintenant, ou d\'habitude.', 'Plus tard.', 'Avant, c\'était une situation ou une habitude.'], label: '⏳ 時間判斷' },
  neg:  { q: 'Vrai, faux, ou on ne sait pas ?', opts: ['Vrai', 'Faux', 'On ne sait pas'], label: '🚫 否定陷阱' },
  hypo: { q: 'Cette situation est…', opts: ['réelle : c\'est un fait.', 'possible : si ça arrive, ça va se passer.', 'imaginée ou souhaitée : ce n\'est pas la réalité.'], label: '💭 真的還是假設' }
};
var EXAM_ITEMS = [
  /* ---------- ⏳ 時間判斷：0 已經做了（複合過去／剛剛）1 現在或習慣（現在式）2 之後（未來／近未來）3 過去的狀態或習慣（未完成式） ---------- */
  { id:'t01', type:'time', fr:'Je suis allé au marché ce matin.', ans:0, zh:'我今天早上去了市場。', why:'suis allé＝複合過去式：已經完成的一件事', focus:'pc' },
  { id:'t02', type:'time', fr:'Elle travaillait dans une banque quand elle était jeune.', ans:3, zh:'她年輕的時候在銀行工作。', why:'travaillait／était＝未完成式：過去一段時間的狀態', focus:'imp' },
  { id:'t03', type:'time', fr:'Nous partirons en vacances le mois prochain.', ans:2, zh:'我們下個月去度假。', why:'partirons＝簡單未來式（partir → partir-）', focus:'fut' },
  { id:'t04', type:'time', fr:'On va manger au restaurant ce soir.', ans:2, zh:'我們今晚要去餐廳吃飯。', why:'va manger＝近未來式（aller＋原形）', focus:'fut' },
  { id:'t05', type:'time', fr:'Il vient de rentrer du travail.', ans:0, zh:'他剛下班回到家。', why:'vient de＋原形＝剛剛做完（不是「來」）', focus:'pc' },
  { id:'t06', type:'time', fr:'Le samedi, je fais les courses avec ma fille.', ans:1, zh:'星期六我會跟女兒去買東西。', why:'le samedi（每個星期六）＋現在式＝習慣', focus:'pres' },
  { id:'t07', type:'time', fr:'Quand j\'étais petit, je jouais au foot tous les jours.', ans:3, zh:'我小時候每天踢足球。', why:'jouais＋tous les jours＝未完成式：過去的習慣', focus:'imp' },
  { id:'t08', type:'time', fr:'J\'ai déjà lu ce livre.', ans:0, zh:'我已經讀過這本書了。', why:'ai lu＝複合過去式；déjà 也提示「已經」', focus:'pc' },
  { id:'t09', type:'time', fr:'Ils habitaient à Lyon avant de venir à Paris.', ans:3, zh:'他們來巴黎以前住在里昂。', why:'habitaient＝未完成式：過去持續的狀態', focus:'imp' },
  { id:'t10', type:'time', fr:'Je prendrai le train de huit heures.', ans:2, zh:'我會搭八點的火車。', why:'prendrai＝簡單未來式（prendre → prendr-）', focus:'fut' },
  { id:'t11', type:'time', fr:'Elle est en train de préparer le dîner.', ans:1, zh:'她正在準備晚餐。', why:'être en train de＝正在做', focus:'pres' },
  { id:'t12', type:'time', fr:'Nous avons visité le musée hier.', ans:0, zh:'我們昨天參觀了博物館。', why:'avons visité＝複合過去式；hier（昨天）', focus:'pc' },
  { id:'t13', type:'time', fr:'Il faisait beau et les enfants jouaient dans le parc.', ans:3, zh:'那時天氣很好，孩子們在公園裡玩。', why:'faisait／jouaient＝未完成式：描述當時的背景', focus:'imp' },
  { id:'t14', type:'time', fr:'Je vais appeler le médecin demain matin.', ans:2, zh:'我明天早上要打電話給醫生。', why:'vais appeler＝近未來式', focus:'fut' },
  { id:'t15', type:'time', fr:'Mon frère est né en 1990.', ans:0, zh:'我哥哥 1990 年出生。', why:'est né＝複合過去式（naître 用 être）', focus:'pc' },
  { id:'t16', type:'time', fr:'D\'habitude, elle prend le bus pour aller au travail.', ans:1, zh:'她平常搭公車上班。', why:'d\'habitude＋現在式＝現在的習慣', focus:'pres' },
  { id:'t17', type:'time', fr:'Vous viendrez à la fête samedi ?', ans:2, zh:'你們星期六會來派對嗎？', why:'viendrez＝簡單未來式（venir → viendr-）', focus:'fut' },
  { id:'t18', type:'time', fr:'Ils se sont mariés il y a deux ans.', ans:0, zh:'他們兩年前結婚了。', why:'se sont mariés＝複合過去式；il y a＝「…以前」', focus:'pc' },
  { id:'t19', type:'time', fr:'Avant, on n\'avait pas de téléphone portable.', ans:3, zh:'以前我們沒有手機。', why:'avant＋avait（未完成式）＝過去的狀況', focus:'imp' },
  { id:'t20', type:'time', fr:'Je cherche un appartement près de la gare.', ans:1, zh:'我在找車站附近的公寓。', why:'cherche＝現在式：現在正在進行', focus:'pres' },
  { id:'t21', type:'time', fr:'Il pleuvra probablement demain.', ans:2, zh:'明天大概會下雨。', why:'pleuvra＝簡單未來式（pleuvoir → pleuvr-）', focus:'fut' },
  { id:'t22', type:'time', fr:'Elle vient d\'acheter une nouvelle voiture.', ans:0, zh:'她剛買了一輛新車。', why:'vient de＋原形＝剛剛做完', focus:'pc' },
  { id:'t23', type:'time', fr:'À cette époque, je ne parlais pas français.', ans:3, zh:'那時候我不會說法文。', why:'à cette époque＋未完成式＝過去那段時間的狀態', focus:'imp' },
  { id:'t24', type:'time', fr:'On se lève tôt tous les matins.', ans:1, zh:'我們每天早上都很早起。', why:'tous les matins＋現在式＝現在的習慣', focus:'pres' },

  /* ---------- 🚫 否定陷阱：0 Vrai 1 Faux 2 On ne sait pas ---------- */
  { id:'n01', type:'neg', fr:'Il ne mange que des légumes.', stmt:'Il mange de la viande.', ans:1, zh:'他只吃蔬菜。', why:'ne … que＝「只有」，不是「不吃」——所以他只吃蔬菜、不吃肉', focus:'neg' },
  { id:'n02', type:'neg', fr:'Elle ne travaille plus à la banque.', stmt:'Elle travaille à la banque maintenant.', ans:1, zh:'她已經不在銀行工作了。', why:'ne … plus＝「不再」：以前有，現在沒有', focus:'neg' },
  { id:'n03', type:'neg', fr:'Je n\'ai jamais pris l\'avion.', stmt:'Il a déjà voyagé en avion.', ans:1, zh:'我從來沒搭過飛機。', why:'ne … jamais＝「從來沒有」', focus:'neg' },
  { id:'n04', type:'neg', fr:'Il n\'y a plus de pain.', stmt:'Il reste du pain.', ans:1, zh:'麵包沒了。', why:'il n\'y a plus de＝「已經沒有了」', focus:'neg' },
  { id:'n05', type:'neg', fr:'Nous ne sortons que le week-end.', stmt:'Ils sortent le samedi ou le dimanche.', ans:0, zh:'我們只在週末出門。', why:'ne … que le week-end＝「只在週末」——所以週末會出門', focus:'neg' },
  { id:'n06', type:'neg', fr:'Elle ne boit pas de café le soir.', stmt:'Elle boit du café le matin.', ans:2, zh:'她晚上不喝咖啡。', why:'句子只說「晚上不喝」，早上喝不喝沒提到 → 不知道', focus:'neg' },
  { id:'n07', type:'neg', fr:'Je ne connais personne dans cette ville.', stmt:'Il a des amis dans cette ville.', ans:1, zh:'我在這個城市誰都不認識。', why:'ne … personne＝「沒有任何人」', focus:'neg' },
  { id:'n08', type:'neg', fr:'Il n\'a rien mangé ce matin.', stmt:'Il a pris son petit déjeuner.', ans:1, zh:'他今天早上什麼都沒吃。', why:'ne … rien＝「什麼都沒有」', focus:'neg' },
  { id:'n09', type:'neg', fr:'Le magasin n\'ouvre qu\'à dix heures.', stmt:'On peut faire des courses dans ce magasin à neuf heures.', ans:1, zh:'這家店十點才開門。', why:'ne … qu\'à dix heures＝「直到十點才」——九點還沒開', focus:'neg' },
  { id:'n10', type:'neg', fr:'Elle ne regarde jamais la télé.', stmt:'Elle regarde parfois la télé.', ans:1, zh:'她從來不看電視。', why:'jamais（從不）跟 parfois（有時）相反', focus:'neg' },
  { id:'n11', type:'neg', fr:'Mon fils ne fume plus.', stmt:'Avant, son fils fumait.', ans:0, zh:'我兒子已經不抽菸了。', why:'ne … plus＝「不再」，代表以前有抽 → 對', focus:'neg' },
  { id:'n12', type:'neg', fr:'Nous n\'avons pas encore visité le musée.', stmt:'Ils ont visité le musée.', ans:1, zh:'我們還沒參觀博物館。', why:'pas encore＝「還沒」', focus:'neg' },
  { id:'n13', type:'neg', fr:'Il ne parle à personne au bureau.', stmt:'Il parle avec ses collègues.', ans:1, zh:'他在辦公室不跟任何人說話。', why:'ne … à personne＝「不跟任何人」', focus:'neg' },
  { id:'n14', type:'neg', fr:'Ce train ne s\'arrête qu\'à Lyon.', stmt:'Le train s\'arrête à Dijon.', ans:1, zh:'這班火車只停里昂。', why:'ne … qu\'à Lyon＝「只停里昂」，其他站都不停', focus:'neg' },
  { id:'n15', type:'neg', fr:'Je ne travaille pas le lundi.', stmt:'Il travaille le mardi.', ans:2, zh:'我星期一不上班。', why:'只說星期一不上班，星期二沒提到 → 不知道', focus:'neg' },
  { id:'n16', type:'neg', fr:'Il n\'est jamais en retard.', stmt:'Il arrive toujours à l\'heure.', ans:0, zh:'他從來不遲到。', why:'從不遲到＝總是準時 → 對', focus:'neg' },
  { id:'n17', type:'neg', fr:'Je n\'ai que dix minutes pour manger.', stmt:'Il a beaucoup de temps pour manger.', ans:1, zh:'我只有十分鐘吃飯。', why:'ne … que dix minutes＝「只有十分鐘」，很趕', focus:'neg' },

  /* ---------- 💭 真的還是假設：0 réelle 1 possible（si＋現在式）2 imaginée（si＋未完成式＋條件式／願望） ---------- */
  { id:'h01', type:'hypo', fr:'Si j\'avais le temps, je partirais en voyage.', ans:2, zh:'如果我有時間，我會去旅行。', why:'si＋未完成式（avais）＋條件式（partirais）＝現在其實沒時間，是想像', focus:'cond' },
  { id:'h02', type:'hypo', fr:'S\'il pleut demain, on restera à la maison.', ans:1, zh:'如果明天下雨，我們就待在家。', why:'si＋現在式（pleut）＋未來式（restera）＝有可能發生的條件', focus:'cond' },
  { id:'h03', type:'hypo', fr:'Si j\'étais riche, j\'achèterais une maison au bord de la mer.', ans:2, zh:'如果我很有錢，我會買一棟海邊的房子。', why:'si＋未完成式（étais）＋條件式＝不是事實的想像', focus:'cond' },
  { id:'h04', type:'hypo', fr:'Comme il pleut, on reste à la maison.', ans:0, zh:'因為在下雨，我們待在家。', why:'comme＝「因為」，不是「如果」：正在下雨是事實', focus:'cond' },
  { id:'h05', type:'hypo', fr:'Si tu veux, je peux t\'aider.', ans:1, zh:'如果你想要，我可以幫你。', why:'si＋現在式＝看你要不要，有可能', focus:'cond' },
  { id:'h06', type:'hypo', fr:'Si elle parlait français, elle travaillerait au Canada.', ans:2, zh:'如果她會說法文，她就會在加拿大工作。', why:'si＋未完成式＋條件式＝她其實不會說法文', focus:'cond' },
  { id:'h07', type:'hypo', fr:'Il est malade, donc il ne vient pas.', ans:0, zh:'他生病了，所以不來。', why:'沒有 si、沒有條件式：生病是事實', focus:'cond' },
  { id:'h08', type:'hypo', fr:'Si vous arrivez avant huit heures, vous aurez une place.', ans:1, zh:'如果你們八點前到，就會有位子。', why:'si＋現在式＋未來式＝有可能的條件', focus:'cond' },
  { id:'h09', type:'hypo', fr:'À ta place, je prendrais le train.', ans:2, zh:'如果我是你，我會搭火車。', why:'à ta place（如果我是你）＋條件式＝想像的建議', focus:'cond' },
  { id:'h10', type:'hypo', fr:'J\'aimerais habiter à Montréal.', ans:2, zh:'我很想住在蒙特婁。', why:'j\'aimerais＝條件式表示願望：現在還沒住在那裡', focus:'cond' },
  { id:'h11', type:'hypo', fr:'Si on avait une voiture, on irait à la campagne.', ans:2, zh:'如果我們有車，我們就會去鄉下。', why:'si＋未完成式＋條件式＝其實沒有車', focus:'cond' },
  { id:'h12', type:'hypo', fr:'Quand il fait beau, nous allons au parc.', ans:0, zh:'天氣好的時候，我們會去公園。', why:'quand＝「每當」：講的是真實的習慣，不是假設', focus:'cond' },
  { id:'h13', type:'hypo', fr:'Si tu finis tes devoirs, tu pourras sortir.', ans:1, zh:'如果你寫完功課，就可以出去。', why:'si＋現在式＋未來式＝有可能的條件', focus:'cond' },
  { id:'h14', type:'hypo', fr:'Elle a trouvé un travail parce qu\'elle parle trois langues.', ans:0, zh:'她找到了工作，因為她會說三種語言。', why:'parce que＝「因為」：事實', focus:'cond' },
  { id:'h15', type:'hypo', fr:'S\'il y avait moins de voitures, l\'air serait plus propre.', ans:2, zh:'如果車子少一點，空氣就會比較乾淨。', why:'si＋未完成式（avait）＋條件式（serait）＝現在車子其實很多', focus:'cond' },
  { id:'h16', type:'hypo', fr:'Si le magasin est ouvert, j\'achèterai du pain.', ans:1, zh:'如果店有開，我會買麵包。', why:'si＋現在式＋未來式＝要看店有沒有開', focus:'cond' }
];
