/* verbs_full.js — 動詞變位總覽的資料層（2026-08-22 新增）
 *
 * 設計原則：**只存「要記的」，其餘一律推導出來。**
 * 法文所有時態只從四個詞幹長出來，這份檔案就照這個結構存：
 *   ① 原形／futur 詞幹 → futur simple、conditionnel
 *   ② 現在式 nous     → imparfait、participe présent、subjonctif 的 nous/vous
 *   ③ 現在式 ils      → subjonctif 的 je/tu/il/ils
 *   ④ 過去分詞        → passé composé、plus-que-parfait、futur antérieur、conditionnel passé、subjonctif passé
 * 不規則到無法推導的（être 的 imparfait、9 個動詞的 subjonctif、命令式特例）才另外存。
 *
 * 每個動詞只手寫：présent 六格、futur 詞幹、過去分詞、助動詞、passé simple 詞幹＋型，
 * 加上真的不規則的 subj / impératif。其餘 40 幾格全部由 conjugate() 算出來。
 */

const PERSONS = ['je', 'tu', 'il', 'nous', 'vous', 'ils'];

/* ── 字尾表（這些是「你已經會的東西」，全部動詞共用）── */
const END = {
  imparfait:   ['ais', 'ais', 'ait', 'ions', 'iez', 'aient'],
  futur:       ['ai', 'as', 'a', 'ons', 'ez', 'ont'],
  conditionnel:['ais', 'ais', 'ait', 'ions', 'iez', 'aient'],   // ＝ imparfait 的字尾
  subj:        ['e', 'es', 'e', 'ions', 'iez', 'ent'],
  ps_a:        ['ai', 'as', 'a', 'âmes', 'âtes', 'èrent'],       // passé simple -er
  ps_i:        ['is', 'is', 'it', 'îmes', 'îtes', 'irent'],
  ps_u:        ['us', 'us', 'ut', 'ûmes', 'ûtes', 'urent'],
  ps_in:       ['ins', 'ins', 'int', 'înmes', 'întes', 'inrent'], // venir/tenir family
};

/* ── 動詞資料 ──
 * pres  : 現在式六格（不含主詞）
 * fut   : futur simple／conditionnel 的詞幹（含最後那個 r）
 * pp    : 過去分詞
 * aux   : 'avoir' | 'être'
 * ps    : [詞幹, 型]  型 = a|i|u|in（passé simple，B2 只要看得懂）
 * subj  : 不規則的 subjonctif 六格（省略＝用 ils 詞幹推導）
 * imper : 不規則的命令式 [tu, nous, vous]（省略＝用現在式推導）
 * imp   : 不規則的 imparfait 詞幹（只有 être）
 * impf／psf : imparfait／passé simple 六格直接存（只用在 -ger／-cer 的拼字例外）
 */
const VERBS_FULL = [
  { inf:'être', zh:'是', grp:'核心', lvl:'A1', aux:'avoir', pp:'été', fut:'ser',
    pres:['suis','es','est','sommes','êtes','sont'], imp:'ét', ppr:'étant', ps:['f','u'],
    subj:['sois','sois','soit','soyons','soyez','soient'], imper:['sois','soyons','soyez'],
    note:'唯一 imparfait 詞幹不從 nous 來的動詞（ét-，不是 somm-）' },

  { inf:'avoir', zh:'有', grp:'核心', lvl:'A1', aux:'avoir', pp:'eu', fut:'aur',
    pres:['ai','as','a','avons','avez','ont'], ppr:'ayant', ps:['e','u'],
    subj:['aie','aies','ait','ayons','ayez','aient'], imper:['aie','ayons','ayez'],
    note:'pp 是 eu，唸起來只有一個 [y] 音，e 不發音' },

  { inf:'faire', zh:'做', grp:'核心', lvl:'A1', aux:'avoir', pp:'fait', fut:'fer',
    pres:['fais','fais','fait','faisons','faites','font'], ps:['f','i'],
    subj:['fasse','fasses','fasse','fassions','fassiez','fassent'],
    note:'vous faites／ils font 兩格是背的；futur 詞幹 fer- 不是 fair-' },

  { inf:'aller', zh:'去', grp:'核心', lvl:'A1', aux:'être', pp:'allé', fut:'ir',
    pres:['vais','vas','va','allons','allez','vont'], ps:['all','a'],
    subj:['aille','ailles','aille','allions','alliez','aillent'], imper:['va','allons','allez'],
    note:'唯一 futur 詞幹跟原形完全無關的動詞（ir-）；tu 的命令式沒有 s（va）' },

  { inf:'pouvoir', zh:'能夠', grp:'核心', lvl:'A1', aux:'avoir', pp:'pu', fut:'pourr',
    pres:['peux','peux','peut','pouvons','pouvez','peuvent'], ps:['p','u'],
    subj:['puisse','puisses','puisse','puissions','puissiez','puissent'], imper:[],
    note:'沒有命令式（沒辦法叫別人「能夠」）' },

  { inf:'devoir', zh:'必須／欠', grp:'核心', lvl:'A1', aux:'avoir', pp:'dû', fut:'devr',
    pres:['dois','dois','doit','devons','devez','doivent'], ps:['d','u'],
    note:'⚠️ 過去分詞 dû 帶帽子（跟冠詞 du 區分），陰性/複數就不帶：due／dus／dues' },

  { inf:'vouloir', zh:'想要', grp:'核心', lvl:'A1', aux:'avoir', pp:'voulu', fut:'voudr',
    pres:['veux','veux','veut','voulons','voulez','veulent'], ps:['voul','u'],
    subj:['veuille','veuilles','veuille','voulions','vouliez','veuillent'],
    imper:['veuille','voulons','veuillez'],
    note:'veuillez ＝ 公文/正式的「請」（Veuillez patienter.）' },

  { inf:'venir', zh:'來', grp:'核心', lvl:'A1', aux:'être', pp:'venu', fut:'viendr',
    pres:['viens','viens','vient','venons','venez','viennent'], ps:['v','in'],
    note:'passé simple 走特殊的 -ins 型（je vins）；tenir 整族同型' },

  { inf:'prendre', zh:'拿／搭（車）', grp:'核心', lvl:'A1', aux:'avoir', pp:'pris', fut:'prendr',
    pres:['prends','prends','prend','prenons','prenez','prennent'], ps:['pr','i'],
    note:'nous prenons 只有一個 n、ils prennent 兩個 n——subjonctif 也跟著分成兩組' },

  { inf:'savoir', zh:'知道／會（技能）', grp:'高頻不規則', lvl:'A2', aux:'avoir', pp:'su', fut:'saur',
    pres:['sais','sais','sait','savons','savez','savent'], ppr:'sachant', ps:['s','u'],
    subj:['sache','saches','sache','sachions','sachiez','sachent'], imper:['sache','sachons','sachez'],
    note:'savoir ＝ 學會的技能／知道事實；connaître ＝ 認識人事物（📍 codex 有對比）' },

  { inf:'voir', zh:'看見', grp:'高頻不規則', lvl:'A2', aux:'avoir', pp:'vu', fut:'verr',
    pres:['vois','vois','voit','voyons','voyez','voient'], ps:['v','i'],
    subj:['voie','voies','voie','voyions','voyiez','voient'],
    note:'nous voyions（subj/imparfait）有兩個 i——y ＋ 字尾的 i，唸得出來' },

  { inf:'dire', zh:'說', grp:'高頻不規則', lvl:'A2', aux:'avoir', pp:'dit', fut:'dir',
    pres:['dis','dis','dit','disons','dites','disent'], ps:['d','i'],
    note:'vous dites（不是 disez）——全法文只有 être/faire/dire 三個動詞的 vous 不是 -ez' },

  { inf:'mettre', zh:'放／穿上', grp:'高頻不規則', lvl:'A2', aux:'avoir', pp:'mis', fut:'mettr',
    pres:['mets','mets','met','mettons','mettez','mettent'], ps:['m','i'],
    note:'il met 不加 t（字根本來就以 t 結尾）' },

  { inf:'partir', zh:'出發、離開', grp:'高頻不規則', lvl:'A2', aux:'être', pp:'parti', fut:'partir',
    pres:['pars','pars','part','partons','partez','partent'], ps:['part','i'],
    note:'⚠️ 不是第二組 -ir（沒有 -iss-）：nous partons 不是 partissons' },

  { inf:'sortir', zh:'出去', grp:'高頻不規則', lvl:'A2', aux:'être', pp:'sorti', fut:'sortir',
    pres:['sors','sors','sort','sortons','sortez','sortent'], ps:['sort','i'],
    note:'跟 partir 同型。⚠️ 有受詞時助動詞改用 avoir：j\'ai sorti la poubelle（我把垃圾拿出去）' },

  { inf:'écrire', zh:'寫', grp:'高頻不規則', lvl:'A2', aux:'avoir', pp:'écrit', fut:'écrir',
    pres:['écris','écris','écrit','écrivons','écrivez','écrivent'], ps:['écriv','i'],
    note:'nous 以下多一個 v——imparfait 因此是 j\'écrivais' },

  { inf:'lire', zh:'讀', grp:'高頻不規則', lvl:'A2', aux:'avoir', pp:'lu', fut:'lir',
    pres:['lis','lis','lit','lisons','lisez','lisent'], ps:['l','u'],
    note:'nous 以下多一個 s（lisons）' },

  { inf:'boire', zh:'喝', grp:'高頻不規則', lvl:'A2', aux:'avoir', pp:'bu', fut:'boir',
    pres:['bois','bois','boit','buvons','buvez','boivent'], ps:['b','u'],
    subj:['boive','boives','boive','buvions','buviez','boivent'],
    note:'三個字根：boi-（單數）／buv-（nous, vous）／boiv-（ils）——subjonctif 正好照這個分' },

  { inf:'connaître', zh:'認識', grp:'高頻不規則', lvl:'A2', aux:'avoir', pp:'connu', fut:'connaîtr',
    pres:['connais','connais','connaît','connaissons','connaissez','connaissent'], ps:['conn','u'],
    note:'⚠️ il connaît 的 i 帶帽子（在 t 前面才有）' },

  { inf:'devenir', zh:'變成', grp:'高頻不規則', lvl:'A2', aux:'être', pp:'devenu', fut:'deviendr',
    pres:['deviens','deviens','devient','devenons','devenez','deviennent'], ps:['dev','in'],
    note:'跟 venir 完全同型，只是前面加 de-（futur deviendr-、pp devenu、助動詞 être）。第27課：les robots deviendront indispensables' },

  /* ⚠️ 無人稱動詞（imperso:true）：只有 il 這一格是真的存在的。
   * 資料裡其餘五格一律填 null，推導引擎會把算出來的形式遮成 null，
   * 頁面顯示「—」——絕對不要讓它印出 je faux／nous pleuvons 這種不存在的形式。 */
  { inf:'falloir', zh:'必須（無人稱）', grp:'無人稱', lvl:'A2', aux:'avoir', pp:'fallu', fut:'faudr',
    imperso:true, ppr:null, imper:[],
    pres:[null,null,'faut',null,null,null], imp:'fall', ps:['fall','u'],
    subj:[null,null,'faille',null,null,null],
    note:'⚠️ 只有 il 一格：il faut → il faudra（第27課）／il fallait／il a fallu／qu\'il faille。沒有命令式，也沒有現在分詞' },

  { inf:'pleuvoir', zh:'下雨（無人稱）', grp:'無人稱', lvl:'A2', aux:'avoir', pp:'plu', fut:'pleuvr',
    imperso:true, ppr:'pleuvant', imper:[],
    pres:[null,null,'pleut',null,null,null], imp:'pleuv', ps:['pl','u'],
    subj:[null,null,'pleuve',null,null,null],
    note:'⚠️ 只有 il 一格：il pleut → il pleuvra（第27課）／il pleuvait／il a plu／qu\'il pleuve。⚠️ pp 是 plu，跟 plaire 的 pp 同形' },

  { inf:'attendre', zh:'等（-re 規則動詞的樣本）', grp:'規則樣本', lvl:'A1', aux:'avoir', pp:'attendu', fut:'attendr',
    pres:['attends','attends','attend','attendons','attendez','attendent'], ps:['attend','i'],
    note:'第三組 -re 的規則型：字根 attend- ＋ -s/-s/-∅/-ons/-ez/-ent。同型：descendre, répondre, vendre, entendre' },

  { inf:'parler', zh:'說話（-er 規則動詞的樣本）', grp:'規則樣本', lvl:'A1', aux:'avoir', pp:'parlé', fut:'parler',
    pres:['parle','parles','parle','parlons','parlez','parlent'], ps:['parl','a'],
    imper:['parle','parlons','parlez'],
    note:'90% 的動詞是這一型。⚠️ tu 的命令式要去掉 s：Parle !（不是 Parles !）' },

  { inf:'finir', zh:'結束（第二組 -ir 的樣本）', grp:'規則樣本', lvl:'A2', aux:'avoir', pp:'fini', fut:'finir',
    pres:['finis','finis','finit','finissons','finissez','finissent'], ps:['fin','i'],
    note:'第二組的招牌是 nous 以下多出來的 -iss-，imparfait 也跟著有：je finissais。同型：choisir, réussir, grandir' },

  /* ── 2026-11-25 補：Lucas 學習資料「動詞變位」表裡有、這份還沒有的 24 個 ──
   * ⚠️ Lucas 原表的變位錯很多，這裡一律照標準法文寫（不是抄他的表）。
   * impf／psf ＝ 拼字例外時直接存六格（manger／déplacer：g、c 在 a、o 前面要變 ge、ç，所以 mangeais 但 mangions）。
   * 反身動詞（se lever、s'appeler、s'ennuyer）存原形本身；反身用法助動詞改 être，寫在 note。 */
  { inf:'perdre', zh:'失去、輸（同 attendre 型）', grp:'規則樣本', lvl:'A2', aux:'avoir', pp:'perdu', fut:'perdr',
    pres:['perds','perds','perd','perdons','perdez','perdent'], ps:['perd','i'],
    note:'跟 attendre 完全同型：字根 perd- ＋ -s/-s/-∅/-ons/-ez/-ent' },

  { inf:'rendre', zh:'歸還；使變得（同 attendre 型）', grp:'規則樣本', lvl:'A2', aux:'avoir', pp:'rendu', fut:'rendr',
    pres:['rends','rends','rend','rendons','rendez','rendent'], ps:['rend','i'],
    note:'規則 -re 型。rendre ＋ 形容詞＝使…變得：rendre qn heureux；rendre visite à qn＝拜訪某人' },

  { inf:'agrandir', zh:'擴大（同 finir 型）', grp:'規則樣本', lvl:'B1', aux:'avoir', pp:'agrandi', fut:'agrandir',
    pres:['agrandis','agrandis','agrandit','agrandissons','agrandissez','agrandissent'], ps:['agrand','i'],
    note:'第二組，跟 finir 同型：nous 以下多 -iss-（nous agrandissons、j\'agrandissais）' },

  { inf:'manger', zh:'吃', grp:'-er 拼字會變', lvl:'A1', aux:'avoir', pp:'mangé', fut:'manger',
    pres:['mange','manges','mange','mangeons','mangez','mangent'], ps:['mange','a'],
    impf:['mangeais','mangeais','mangeait','mangions','mangiez','mangeaient'],
    psf:['mangeai','mangeas','mangea','mangeâmes','mangeâtes','mangèrent'],
    note:'⚠️ g 在 a、o 前面要寫成 ge 才維持 [ʒ] 音：nous mangeons、je mangeais，但 nous mangions（i 前面不用 e）。-ger 動詞都這樣（voyager, changer, partager）' },

  { inf:'déplacer', zh:'移動、搬動（se déplacer 移動、出行）', grp:'-er 拼字會變', lvl:'B1', aux:'avoir', pp:'déplacé', fut:'déplacer',
    pres:['déplace','déplaces','déplace','déplaçons','déplacez','déplacent'], ps:['déplaç','a'],
    impf:['déplaçais','déplaçais','déplaçait','déplacions','déplaciez','déplaçaient'],
    psf:['déplaçai','déplaças','déplaça','déplaçâmes','déplaçâtes','déplacèrent'],
    note:'⚠️ c 在 a、o 前面要寫成 ç 才維持 [s] 音：nous déplaçons、je déplaçais，但 nous déplacions。-cer 動詞都這樣（commencer, placer）。反身 se déplacer 用 être' },

  { inf:'acheter', zh:'買', grp:'-er 拼字會變', lvl:'A1', aux:'avoir', pp:'acheté', fut:'achèter',
    pres:['achète','achètes','achète','achetons','achetez','achètent'], ps:['achet','a'],
    note:'⚠️ 字尾不發音的格（je／tu／il／ils）e 變 è：j\'achète，但 nous achetons。未來詞幹也是 è：j\'achèterai' },

  { inf:'lever', zh:'舉起（se lever 起床、站起來）', grp:'-er 拼字會變', lvl:'A2', aux:'avoir', pp:'levé', fut:'lèver',
    pres:['lève','lèves','lève','levons','levez','lèvent'], ps:['lev','a'],
    note:'跟 acheter 同型（e → è）。⭐ 最常用的是反身 se lever：je me lève・nous nous levons・je me suis levé(e)（反身用 être）・命令式 Lève-toi !' },

  { inf:'compléter', zh:'補全、填寫', grp:'-er 拼字會變', lvl:'A2', aux:'avoir', pp:'complété', fut:'compléter',
    pres:['complète','complètes','complète','complétons','complétez','complètent'], ps:['complét','a'],
    note:'é 在字尾不發音的格變 è：je complète，但 nous complétons。未來式傳統寫 je compléterai；1990 拼字改革後也接受 je complèterai' },

  { inf:'appeler', zh:'叫、打電話（s\'appeler 名叫）', grp:'-er 拼字會變', lvl:'A1', aux:'avoir', pp:'appelé', fut:'appeller',
    pres:['appelle','appelles','appelle','appelons','appelez','appellent'], ps:['appel','a'],
    note:'⚠️ 字尾不發音的格 l 變 ll：j\'appelle，但 nous appelons；未來 j\'appellerai。反身 s\'appeler：je m\'appelle・je me suis appelé(e)' },

  { inf:'rappeler', zh:'再打電話；提醒（se rappeler 記得）', grp:'-er 拼字會變', lvl:'A2', aux:'avoir', pp:'rappelé', fut:'rappeller',
    pres:['rappelle','rappelles','rappelle','rappelons','rappelez','rappellent'], ps:['rappel','a'],
    note:'跟 appeler 完全同型（re- ＋ appeler）：je rappelle・nous rappelons・je rappellerai' },

  { inf:'envoyer', zh:'寄、送出', grp:'-er 拼字會變', lvl:'A2', aux:'avoir', pp:'envoyé', fut:'enverr',
    pres:['envoie','envoies','envoie','envoyons','envoyez','envoient'], ps:['envoy','a'],
    note:'y 在字尾不發音的格變 i：j\'envoie，nous envoyons。⚠️ 未來詞幹是例外 enverr-（j\'enverrai），不是 envoier-' },

  { inf:'payer', zh:'付錢', grp:'-er 拼字會變', lvl:'A2', aux:'avoir', pp:'payé', fut:'paier',
    pres:['paie','paies','paie','payons','payez','paient'], ps:['pay','a'],
    note:'-ayer 兩種寫法都對：je paie／je paye、je paierai／je payerai（這裡列 paie 型）。nous payons、nous payions 一律是 y' },

  { inf:'ennuyer', zh:'使厭煩（s\'ennuyer 覺得無聊）', grp:'-er 拼字會變', lvl:'B1', aux:'avoir', pp:'ennuyé', fut:'ennuier',
    pres:['ennuie','ennuies','ennuie','ennuyons','ennuyez','ennuient'], ps:['ennuy','a'],
    note:'-uyer 的 y 在字尾不發音的格一定變 i：j\'ennuie、j\'ennuierai。⭐ 常用反身 s\'ennuyer：je m\'ennuie・je me suis ennuyé(e)' },

  { inf:'offrir', zh:'送（禮）、提供', grp:'其他不規則', lvl:'A2', aux:'avoir', pp:'offert', fut:'offrir',
    pres:['offre','offres','offre','offrons','offrez','offrent'], ps:['offr','i'],
    imper:['offre','offrons','offrez'],
    note:'⚠️ -ir 但現在式字尾像 -er（j\'offre、tu offres），命令式也沒有 s：Offre !。過去分詞 offert 要背。同型：ouvrir → ouvert' },

  { inf:'accueillir', zh:'接待、迎接', grp:'其他不規則', lvl:'B1', aux:'avoir', pp:'accueilli', fut:'accueiller',
    pres:['accueille','accueilles','accueille','accueillons','accueillez','accueillent'], ps:['accueill','i'],
    imper:['accueille','accueillons','accueillez'],
    note:'⚠️ -ir 但現在式字尾像 -er（j\'accueille），未來詞幹也像 -er：j\'accueillerai。過去分詞照 -ir：accueilli' },

  { inf:'servir', zh:'服務、端上；servir à 用來', grp:'其他不規則', lvl:'A2', aux:'avoir', pp:'servi', fut:'servir',
    pres:['sers','sers','sert','servons','servez','servent'], ps:['serv','i'],
    note:'跟 partir 同型：單數掉尾巴子音（je sers・nous servons）' },

  { inf:'suivre', zh:'跟隨；修（課）', grp:'其他不規則', lvl:'A2', aux:'avoir', pp:'suivi', fut:'suivr',
    pres:['suis','suis','suit','suivons','suivez','suivent'], ps:['suiv','i'],
    note:'⚠️ je suis 跟 être 的 je suis 同形，靠上下文分。單數掉 v：je suis・nous suivons。suivre un cours＝修課' },

  { inf:'recevoir', zh:'收到、接待', grp:'其他不規則', lvl:'A2', aux:'avoir', pp:'reçu', fut:'recevr',
    pres:['reçois','reçois','reçoit','recevons','recevez','reçoivent'], ps:['reç','u'],
    note:'靴子型：單數和 ils 是 reçoi-／reçoiv-，nous／vous 是 recev-。⚠️ c 在 o、u 前面要寫 ç：reçois、reçu' },

  { inf:'valoir', zh:'值得（il vaut mieux 最好…）', grp:'其他不規則', lvl:'B1', aux:'avoir', pp:'valu', fut:'vaudr',
    pres:['vaux','vaux','vaut','valons','valez','valent'], ps:['val','u'],
    subj:['vaille','vailles','vaille','valions','valiez','vaillent'],
    note:'最常見的是無人稱 il vaut mieux ＋ 原形／que ＋ 虛擬式（最好…）。未來 il vaudra mieux、條件式 il vaudrait mieux。虛擬式不規則：qu\'il vaille' },

  { inf:'paraître', zh:'看起來、似乎；出版', grp:'其他不規則', lvl:'B1', aux:'avoir', pp:'paru', fut:'paraîtr',
    pres:['parais','parais','paraît','paraissons','paraissez','paraissent'], ps:['par','u'],
    note:'跟 connaître 同型：nous 多 -ss-、il paraît 的 i 帶帽子。Il paraît que…＝聽說…' },

  { inf:'plaire', zh:'討人喜歡（ça me plaît 我喜歡）', grp:'其他不規則', lvl:'A2', aux:'avoir', pp:'plu', fut:'plair',
    pres:['plais','plais','plaît','plaisons','plaisez','plaisent'], ps:['pl','u'],
    note:'⭐ s\'il vous plaît 就是這個動詞。il plaît 的 i 帶帽子。⚠️ 過去分詞 plu 跟 pleuvoir 的 plu 同形' },

  { inf:'rire', zh:'笑', grp:'其他不規則', lvl:'A2', aux:'avoir', pp:'ri', fut:'rir',
    pres:['ris','ris','rit','rions','riez','rient'], ps:['r','i'],
    note:'⚠️ imparfait／虛擬式的 nous、vous 有兩個 i：nous riions、vous riiez（字根 ri- ＋ 字尾 -ions）。同型：sourire' },

  { inf:'éteindre', zh:'關掉（燈、電器）、熄滅', grp:'其他不規則', lvl:'B1', aux:'avoir', pp:'éteint', fut:'éteindr',
    pres:['éteins','éteins','éteint','éteignons','éteignez','éteignent'], ps:['éteign','i'],
    note:'-eindre 型：單數 éteins，nous 以下變 éteign-（nous éteignons、j\'éteignais）。過去分詞 éteint。同型：peindre, craindre（-aindre）' },

  { inf:'réduire', zh:'減少、降低', grp:'其他不規則', lvl:'B1', aux:'avoir', pp:'réduit', fut:'réduir',
    pres:['réduis','réduis','réduit','réduisons','réduisez','réduisent'], ps:['réduis','i'],
    note:'-uire 型：nous 以下多一個 s（réduisons），過去分詞 réduit。同型：conduire, produire, construire' },
];

/* ── 推導引擎 ──────────────────────────────────────────────
 * 這裡每一行都對應頁面上半部講的那條規則。改規則＝改這裡，不是改資料。 */

function vowelStart(w) { return /^[aeiouâàéèêîïôûùüh]/i.test(w); }

// 主詞＋動詞（處理 je → j'）
function withSubj(i, form) {
  const s = PERSONS[i];
  if (s === 'je' && vowelStart(form)) return "j'" + form;
  return s + ' ' + form;
}

// que ＋ 主詞：母音開頭要縮寫（que il → qu'il、que j'aie 不縮 que）
function withSubjQue(i, form) {
  const phrase = withSubj(i, form);
  return (vowelStart(phrase) ? "qu'" : 'que ') + phrase;
}

// 頁面統一用這個：依時態決定要不要加 que
function display(tense, i, form) {
  if (form == null) return '—';                 // 無人稱動詞不存在的人稱
  return tense.pre ? withSubjQue(i, form) : withSubj(i, form);
}

function stemNous(v)  { return v.pres[3].replace(/ons$/, ''); }   // 現在式 nous 去掉 -ons
function stemIls(v)   { return v.pres[5].replace(/ent$/, ''); }   // 現在式 ils 去掉 -ent

function conjSimple(stem, endings) { return endings.map(e => stem + e); }

function imparfait(v) {
  if (v.impf) return v.impf.slice();            // 拼字例外（manger／déplacer）直接存六格
  return conjSimple(v.imp || stemNous(v), END.imparfait);
}
function futur(v)        { return conjSimple(v.fut, END.futur); }
function conditionnel(v) { return conjSimple(v.fut, END.conditionnel); }

function subjonctif(v) {
  if (v.subj) return v.subj.slice();
  const ils = stemIls(v), imp = imparfait(v);
  return [ils + 'e', ils + 'es', ils + 'e', imp[3], imp[4], ils + 'ent'];
}

function passeSimple(v) {
  if (v.psf) return v.psf.slice();
  const [stem, type] = v.ps;
  return conjSimple(stem, END['ps_' + type]);
}

function participePresent(v) {
  if (v.imperso) return v.ppr;                  // null ＝ 這個動詞沒有現在分詞（falloir）
  /* ⚠️ 2026-10-01 修：只有三個不規則——être → étant、avoir → ayant、savoir → sachant
     （之前直接套 nous 詞幹，頁面上印出 sommesant／avant／savant）。gram_rules 的 gérondif 也是這三個 */
  if (v.ppr) return v.ppr;
  return stemNous(v) + 'ant';
}

// 複合時態：助動詞的某個時態 ＋ 過去分詞
const AUX = {
  avoir: VERBS_FULL.find(x => x.inf === 'avoir'),
  être:  VERBS_FULL.find(x => x.inf === 'être'),
};
function auxForms(v, tense) {
  const a = AUX[v.aux];
  if (tense === 'present')      return a.pres.slice();
  if (tense === 'imparfait')    return imparfait(a);
  if (tense === 'futur')        return futur(a);
  if (tense === 'conditionnel') return conditionnel(a);
  if (tense === 'subj')         return subjonctif(a);
  throw new Error('unknown aux tense ' + tense);
}
// être 動詞的過去分詞要跟主詞配合，每個人稱標法不同
const AGREE = ['(e)', '(e)', '', '(e)s', '(e)(s)', 's'];
function compose(v, tense) {
  const aux = auxForms(v, tense);
  return aux.map((f, i) => f + ' ' + v.pp + (v.aux === 'être' ? AGREE[i] : ''));
}

function imperatif(v) {
  if (v.imper) return v.imper.slice();          // 空陣列＝沒有命令式
  let tu = v.pres[1];
  if (/er$/.test(v.inf) || v.inf === 'aller') tu = tu.replace(/es$/, 'e');
  return [tu, v.pres[3], v.pres[4]];
}

/* 一次算出一個動詞的全部形式。
 * 回傳陣列，每項 = { id, name, fr, lvl, cx（codex座標）, forms（6格）或 single, how（怎麼長出來的）} */
function conjugate(v) {
  const out = [];
  const push = (o) => out.push(o);

  push({ id:'present', name:'現在式', fr:'présent', lvl:'A1', cx:'5-1-1',
    forms: v.pres, how:'要記的（四個詞幹的來源就在這一列）' });

  push({ id:'passe-compose', name:'複合過去式', fr:'passé composé', lvl:'A2', cx:'5-2-1',
    forms: compose(v, 'present'),
    how:`助動詞 ${v.aux} 現在式 ＋ 過去分詞 ${v.pp}` + (v.aux === 'être' ? '（要跟主詞配合陰陽單複）' : '') });

  push({ id:'imparfait', name:'未完成過去式', fr:'imparfait', lvl:'A2', cx:'5-3-1',
    forms: imparfait(v),
    how: v.impf ? `現在式 nous「${v.pres[3]}」去掉 -ons ＋ 字尾；⚠️ 拼字：${v.pres[3].includes('ç') ? 'ç' : 'ge'} 只留在 a、o 前面（${v.impf[0]}，但 ${v.impf[3]}）`
       : v.imp ? `⚠️ 例外詞幹 ${v.imp}-（不是從 nous 來）＋ -ais/-ais/-ait/-ions/-iez/-aient`
               : `現在式 nous「${v.pres[3]}」去掉 -ons ＝ ${stemNous(v)}- ＋ -ais/-ais/-ait/-ions/-iez/-aient` });

  push({ id:'futur-proche', name:'近未來', fr:'futur proche', lvl:'A1', cx:'5-5-1',
    forms: VERBS_FULL.find(x => x.inf === 'aller').pres.map(f => f + ' ' + v.inf),
    how:'aller 現在式 ＋ 原形（A1–B1 講未來最常用這個）' });

  push({ id:'passe-recent', name:'剛剛過去', fr:'passé récent', lvl:'A2', cx:'5-6-1',
    forms: VERBS_FULL.find(x => x.inf === 'venir').pres
             .map(f => f + (vowelStart(v.inf) ? " d'" : ' de ') + v.inf),
    how:'venir de ＋ 原形（剛剛做完）' });

  push({ id:'futur-simple', name:'簡單未來式', fr:'futur simple', lvl:'B1', cx:'5-5-2',
    forms: futur(v),
    how:`futur 詞幹 ${v.fut}- ＋ ai/as/a/ons/ez/ont（就是 avoir 的現在式）` });

  push({ id:'conditionnel', name:'條件式現在', fr:'conditionnel présent', lvl:'A2', cx:'6-2-1',
    forms: conditionnel(v),
    how:`同一個 futur 詞幹 ${v.fut}- ＋ imparfait 的字尾——所以會了 futur 就等於會了條件式` });

  push({ id:'subjonctif', name:'虛擬式現在', fr:'subjonctif présent', lvl:'B1', cx:'6-3-1',
    forms: subjonctif(v), pre: true,
    how: v.subj ? '⚠️ 不規則，這六格要記'
               : `現在式 ils「${v.pres[5]}」去掉 -ent ＝ ${stemIls(v)}- ＋ e/es/e/ent；nous 和 vous 直接借 imparfait` });

  push({ id:'plus-que-parfait', name:'愈過去式', fr:'plus-que-parfait', lvl:'B1', cx:'5-4-1',
    forms: compose(v, 'imparfait'), how:`助動詞 ${v.aux} 的 imparfait ＋ ${v.pp}（過去的更過去）` });

  push({ id:'futur-anterieur', name:'先未來式', fr:'futur antérieur', lvl:'B2', cx:'5-5-3',
    forms: compose(v, 'futur'), how:`助動詞 ${v.aux} 的 futur ＋ ${v.pp}（在未來某時點之前已完成）` });

  push({ id:'conditionnel-passe', name:'條件式過去', fr:'conditionnel passé', lvl:'B2', cx:'6-2-3',
    forms: compose(v, 'conditionnel'), how:`助動詞 ${v.aux} 的條件式 ＋ ${v.pp}（早知道就…）` });

  push({ id:'subjonctif-passe', name:'虛擬式過去', fr:'subjonctif passé', lvl:'B2', cx:'6-3-3',
    forms: compose(v, 'subj'), pre: true, how:`助動詞 ${v.aux} 的虛擬式 ＋ ${v.pp}` });

  push({ id:'passe-simple', name:'簡單過去式（只要看得懂）', fr:'passé simple', lvl:'B2', cx:'5-7-1',
    forms: passeSimple(v), how:'書面敘事專用，口說與寫作都不會用到——認得出來就好' });

  // ⚠️ 無人稱動詞：詞幹推導出來的六格裡，只有 il 那一格真的存在，其餘遮成 null
  if (v.imperso) out.forEach(t => { t.forms = t.forms.map((f, i) => (i === 2 ? f : null)); });

  return out;
}

function nonFinite(v) {
  return [
    { name:'原形',       fr:'infinitif',          form: v.inf },
    { name:'過去分詞',   fr:'participe passé',    form: v.pp + (v.aux === 'être' ? '（要配合主詞：' + v.pp + '／' + v.pp + 'e／' + v.pp + 's／' + v.pp + 'es）' : '') },
    { name:'現在分詞',   fr:'participe présent',  form: participePresent(v) || '（這個動詞沒有現在分詞）' },
    { name:'命令式',     fr:'impératif',          form: imperatif(v).length ? imperatif(v).join('！／') + '！' : '（這個動詞沒有命令式）' },
  ];
}

// 四個詞幹面板：頁面上半要 Owen 記的就只有這些。
// ⚠️ 不規則的動詞不要硬套規則詞幹（être 的 imparfait 不是 somm-，subjonctif 也不是 sont-），
//    那樣會教錯——這種情況直接顯示真正的來源並標例外。
function stems(v) {
  return [
    { key:'futur 詞幹',
      val: v.fut + '-',
      out:'→ futur simple、conditionnel（兩個時態共用同一個詞幹）' },

    { key:'imparfait 詞幹',
      val: (v.imp || stemNous(v)) + '-',
      out: v.imp
        ? `⚠️ 例外：不是從現在式 nous（${v.pres[3] || '這個動詞沒有 nous'}）來的，這個要單獨記`
        : `現在式 nous「${v.pres[3]}」去掉 -ons → imparfait、現在分詞、subjonctif 的 nous／vous` },

    { key:'subjonctif 詞幹',
      val: v.subj ? '不規則' : stemIls(v) + '-',
      out: v.subj
        ? (v.imperso ? `⚠️ 無人稱：只有 qu'il ${v.subj[2]}` : `⚠️ 六格要記：que je ${v.subj[0]}／que nous ${v.subj[3]}`)
        : `現在式 ils「${v.pres[5]}」去掉 -ent → subjonctif 的 je／tu／il／ils` },

    { key:'過去分詞',
      val: v.pp,
      out:'→ 全部複合時態（passé composé、plus-que-parfait、先未來、條件式過去、虛擬式過去）'
           + (v.aux === 'être' ? '。助動詞是 être，要跟主詞配合陰陽單複' : '') },
  ];
}

/* ── 給反射衝刺用的形式（verb_sprint.html）────────────────────
 * 跟 conjugate() 的差別只有一個：être 動詞的複合時態要把「陰陽單複都算對」
 * 展開成 a|b 的多解格式（衝刺是用打字比對的，不能只接受一種）。
 * ⚠️ 這裡是 verb_sprint 唯一的資料來源——以後要加時態只要改 conjugate()，
 *    衝刺頁自己就會跟上，不用再手動維護第二份變位表。 */
const COMPOUND = ['passe-compose', 'plus-que-parfait', 'futur-anterieur',
                  'conditionnel-passe', 'subjonctif-passe'];

function drillForms(v, tenseId) {
  const t = conjugate(v).find(x => x.id === tenseId);
  if (!t) return null;
  if (v.aux !== 'être' || !COMPOUND.includes(tenseId)) return t.forms.slice();
  // 重新組：助動詞 ＋ 過去分詞的各種配合寫法
  const aux = auxForms(v, tenseId === 'passe-compose' ? 'present'
                        : tenseId === 'plus-que-parfait' ? 'imparfait'
                        : tenseId === 'futur-anterieur' ? 'futur'
                        : tenseId === 'conditionnel-passe' ? 'conditionnel' : 'subj');
  const variants = [
    [v.pp, v.pp + 'e'],                                   // je
    [v.pp, v.pp + 'e'],                                   // tu
    [v.pp, v.pp + 'e'],                                   // il / elle（elle était allée，課本 B1 p.21）
    [v.pp + 's', v.pp + 'es'],                            // nous
    [v.pp, v.pp + 'e', v.pp + 's', v.pp + 'es'],          // vous
    [v.pp + 's', v.pp + 'es'],                            // ils
  ];
  return aux.map((a, i) => variants[i].map(pp => a + ' ' + pp).join('|'));
}

if (typeof module !== 'undefined') {
  module.exports = { VERBS_FULL, PERSONS, conjugate, drillForms, nonFinite, stems, withSubj, withSubjQue, display, imparfait, futur, conditionnel, subjonctif, passeSimple, imperatif, participePresent };
}
