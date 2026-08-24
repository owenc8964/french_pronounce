/* scenes.js — 情境角色扮演的劇本（2026-08-24 新增，08-25 擴到 4 個場景）
 *
 * Owen 的原話：「我進麵包店 然後我有幾種講話的選擇，或是我其實也可以選我自己是店員，很像RPG」。
 * 這正好就是 **DELF A2 口說第三部分 dialogue simulé** 的格式：抽情境、角色扮演、附道具假鈔。
 * 老師課堂實測過的套路是固定的：打招呼 → 問價錢 → 決定買什麼 → 付款 → 道謝告別，
 * 而且**禮貌用語本身就是給分點**。所以這裡的「選錯」多半不是文法錯，是**語域錯**。
 *
 * ⚠️ 教材鐵律：每一句法文都必須逐字出自**課堂筆記或課本原文**。
 *    來源有兩個（08-25 起）：`french_notes.html`（老師講過的、Owen 自己的答案）
 *    ＋ `assets/*.pdf` 的 Édito A1 課本／Cahier（**聽力逐字稿**在課本最後面，
 *    服務生、朋友邀約那些「對手台詞」筆記沒收，只有課本有）。
 *    `src` 欄位記錄出處；兩邊都沒有的句子**一律不編**（寧可劇本短一點）。
 *    唯一例外：**刻意的誘答選項**（例如筆記明講會失禮的 je veux）標 `constructed:true`，
 *    它們永遠只出現在 tag:'bad'／'ok' 且附警告，不會被當成正確教材。
 *    檢查器 `tools/check_scenes.js` 會把這些逐條列出來，不讓它們隱形。
 *
 * 節點格式：
 *   { speaker:'客', line, zh, note?, src, chk?, next }               ← 對方自動說的台詞
 *   { speaker:…, tip?, chk?, choices:[{fr, zh, tag, note, src, next}] } ← 玩家要選的
 *   tag：good＝最自然／ok＝可以但不是最好／bad＝筆記明講會失禮或不對
 *   chk：走到這個節點就算完成 checklist 的哪一項（**分岔劇本靠這個算「你這條路漏了什麼」**）
 *   next：⭐ 不同選項可以指向不同節點＝**劇情分岔**（08-25 Owen 要求：「可以考慮開 fork 讓學習更多元」）
 *
 * 場景層欄位：
 *   roles      選角按鈕的中文說明｜speakers 對話泡泡上的法文角色名（純法語模式看到的是這個）
 *   roleHints  選角時那一行小字（每個場景不一樣，不要再寫死在 roleplay.html 裡）
 *   checklist  這個情境的固定套路，跟節點的 chk 對得上
 */
const SCENES = [
{
  id: 'boulangerie',
  icon: '🥖',
  zh: '麵包店買法棍',
  fr: 'À la boulangerie',
  exam: '⭐ DELF A1/A2 口說第三部分 dialogue simulé 的官方題目就是這個（課本 p.166）',
  src: '筆記第1、4、5課',
  roles: { client: '🙋 你是顧客', vendeur: '🧑‍🍳 你是店員' },
  speakers: { client: 'Le client', vendeur: 'La boulangère' },
  roleHints: { client: '你要開口買東西——考試最常抽到的那一邊', vendeur: '換位思考：聽懂店員在問什麼，反而更難' },
  checklist: ['打招呼', '說出要買什麼', '問價錢', '付款', '道謝告別'],
  start: 'n1',
  nodes: {
    n1: { speaker:'vendeur', line:'Bonjour !', zh:'您好！', src:'筆記第1課',
          note:'⚠️ 法國店員一定先開口打招呼——你沒回就等於失禮', next:'n2' },

    n2: { speaker:'client', tip:'先回招呼。注意這是店員不是朋友', chk:'打招呼', choices:[
      { fr:'Bonjour !', zh:'您好！', tag:'good', src:'筆記第1課',
        note:'✅ 對陌生人／店員用 Bonjour，這是進店的基本動作', next:'n3' },
      { fr:'Salut !', zh:'嗨！', tag:'bad', src:'筆記第1課',
        note:'⚠️ Salut 只對朋友、家人、小孩用。對店員說太隨便了', next:'n3' },
      { fr:'Bonsoir !', zh:'晚上好！', tag:'ok', src:'筆記第1課',
        note:'時間對就沒問題——Bonsoir 是晚上用的。白天要用 Bonjour', next:'n3' },
    ]},

    n3: { speaker:'vendeur', tip:'你是店員，該問下一位了。⚠️ 別拿顧客的台詞來用', choices:[
      { fr:"C'est à qui ?", zh:'輪到誰了？', tag:'good', src:'筆記第4課',
        note:'✅ 商店裡很常聽到——店員問下一位是誰', next:'n4' },
      { fr:"Je voudrais une baguette, s'il vous plaît.", zh:'我想要一條法棍，謝謝。', tag:'bad', src:'筆記第4課',
        note:'⚠️ 這是<b>顧客</b>的台詞。演店員時聽到這句是要「接」，不是要「說」', next:'n4' },
      { fr:'Ça coûte combien ?', zh:'多少錢？', tag:'bad', src:'筆記第4課',
        note:'⚠️ 問價錢的是顧客。店員是<b>回答</b>價錢的人', next:'n4' },
    ]},

    n4: { speaker:'client', tip:'說出你要買什麼。禮貌程度是給分點', chk:'說出要買什麼', choices:[
      { fr:"Je voudrais une baguette, s'il vous plaît.", zh:'我想要一條法棍，謝謝。', tag:'good', src:'筆記第4課',
        note:'✅ <b>je voudrais</b> 是 vouloir 的條件式，比 je veux 客氣得多；再加 s\'il vous plaît 是雙重禮貌', next:'n5' },
      { fr:'Je veux une baguette.', zh:'我要一條法棍。', tag:'bad', src:'筆記第4課', constructed:true,
        note:'⚠️ 筆記明講：<b>je veux 給人命令感</b>。去商店餐廳一律用 je voudrais', next:'n5' },
      { fr:'Une baguette !', zh:'一條法棍！', tag:'ok', src:'筆記第4課', constructed:true,
        note:'聽得懂，但沒有禮貌用語＝口說考試少拿分', next:'n5' },
    ]},

    n5: { speaker:'vendeur', tip:'顧客說完要買什麼了，確認一下還要不要別的', choices:[
      { fr:'Ce sera tout ?', zh:'就這樣嗎？', tag:'good', src:'筆記第4課',
        note:'✅ 店員確認的固定問法', next:'n6' },
      { fr:'Oui, ce sera tout.', zh:'是的，就這樣。', tag:'bad', src:'筆記第4課',
        note:'⚠️ 差一個字就換了角色——<b>Ce sera tout ?</b> 是店員問，<b>Oui, ce sera tout.</b> 是顧客答', next:'n6' },
    ]},

    n6: { speaker:'client', tip:'先確認就這樣，順便問價錢', chk:'問價錢', choices:[
      { fr:'Oui, ce sera tout. Ça coûte combien ?', zh:'是的，就這樣。多少錢？', tag:'good', src:'筆記第4課',
        note:'✅ 兩步併一步：確認＋問價。<b>問價錢是老師說的固定套路之一</b>', next:'n7' },
      { fr:'Oui, ce sera tout. Combien coûte une baguette ?', zh:'是的，就這樣。一條法棍多少錢？', tag:'good', src:'筆記第4課',
        note:'✅ 完整版問法，一樣正確', next:'n7' },
      { fr:'Oui.', zh:'是。', tag:'ok', src:'筆記第4課',
        note:'可以，但你漏了「問價錢」這個給分步驟', next:'n7' },
    ]},

    n7: { speaker:'vendeur', tip:'顧客問價錢了，回答他', choices:[
      { fr:'Elle coûte 1 euro.', zh:'一歐元。', tag:'good', src:'筆記第4課',
        note:'✅ 用 <b>elle</b> 因為 baguette 是陰性——法文連價錢都要配合性別', next:'n8' },
      { fr:'Combien coûte une baguette ?', zh:'一條法棍多少錢？', tag:'bad', src:'筆記第4課',
        note:'⚠️ 你把問題丟回去了。店員是<b>報價</b>的那一方', next:'n8' },
    ]},

    n8: { speaker:'vendeur', tip:'收錢之前要問什麼？', choices:[
      { fr:'Vous payez comment ?', zh:'您怎麼付款？', tag:'good', src:'筆記第4課',
        note:'✅ 法國店員的標準問法', next:'n9' },
      { fr:'Par carte bancaire.', zh:'刷卡。', tag:'bad', src:'筆記第4課',
        note:'⚠️ 這是<b>顧客</b>的回答。店員問方式、顧客選方式', next:'n9' },
    ]},

    n9: { speaker:'client', tip:'選一種付款方式', chk:'付款', choices:[
      { fr:'Par carte bancaire.', zh:'刷卡。', tag:'good', src:'筆記第4課',
        note:'✅ 法國幾乎都刷卡。carte bancaire／carte bleue 都是<b>簽帳卡</b>，不是信用卡', next:'n10' },
      { fr:'En espèces.', zh:'付現金。', tag:'good', src:'筆記第4課',
        note:'✅ 也對，只是法國人現在很少用現金', next:'n10' },
    ]},

    n10: { speaker:'vendeur', line:'Bonne journée !', zh:'祝您有美好的一天！', src:'筆記第1課',
           note:'⚠️ <b>Bonne journée 說了就等於再見</b>，不用再補一句 au revoir', next:'n11' },

    n11: { speaker:'client', tip:'收尾。這一步也算分', chk:'道謝告別', choices:[
      { fr:'Bonne journée !', zh:'祝你有美好的一天！', tag:'good', src:'筆記第1課',
        note:'✅ 對方說什麼你就回什麼，最自然', next:'end' },
      { fr:'Au revoir !', zh:'再見！', tag:'good', src:'筆記第1課',
        note:'✅ 標準道別，也完全可以', next:'end' },
      { fr:'À demain !', zh:'明天見！', tag:'bad', src:'筆記第1課',
        note:'⚠️ À demain 是「明天還會見到」才說——你又不是明天一定會再來', next:'end' },
    ]},

    end: { speaker:'system', line:'—— 對話結束 ——', zh:'', src:'' },
  }
},

/* ═══════════════════════════════════════════════════════════════
   2. 自我介紹（DELF 口說第一部分 entretien dirigé）
   台詞來源：筆記第17課「口說實測劇本」——老師當場問的題、Owen 自己的正確答案。
   ⚠️ 誘答不是亂編的：n14/n16/n18 的 bad 選項是**他當天真的講錯的三句**
      （第17課糾錯摘要：je me lever／je mange un café／je vais revenir），
      在這裡當誘答比重講一次規則有用——這是自動化缺口，不是概念缺口。
   ═══════════════════════════════════════════════════════════════ */
{
  id: 'entretien',
  icon: '🎤',
  zh: '口說考試第一部分',
  fr: "L'entretien dirigé",
  exam: '⭐⭐ DELF/TEF 口說第一部分必考：考官問你本人、家庭、工作、日常（1分鐘，沒有準備時間）',
  src: '筆記第17課（老師實測題＋你自己的答案）',
  roles: { candidat: '🙋 你是考生', examinateur: '🧑‍⚖️ 你是考官' },
  speakers: { candidat: 'Le candidat', examinateur: "L'examinateur" },
  roleHints: { candidat: '把自己的答案講到反射——這一部分沒有準備時間', examinateur: '反過來當考官：先聽懂問題，才知道人家在問什麼' },
  checklist: ['回招呼＋報名字', '拼出名字', '國籍／家鄉', '職業', '家庭狀況', '日常作息'],
  start: 'e1',
  nodes: {
    e1: { speaker:'examinateur', line:'Bonjour ! Comment vous vous appelez ?', zh:'您好！您叫什麼名字？',
          src:'筆記第17課', note:'考官一開口就是這句。課本 p.166 的官方範例也是它', next:'e2' },

    e2: { speaker:'candidat', tip:'回招呼＋報名字。禮貌用語是給分點', chk:'回招呼＋報名字', choices:[
      { fr:"Bonjour ! Je m'appelle Owen.", zh:'您好！我叫 Owen。', tag:'good', src:'筆記第17課',
        note:'✅ 先回招呼再回答——考官在聽的第一件事就是這個', next:'e3' },
      { fr:"Je m'appelle Owen.", zh:'我叫 Owen。', tag:'ok', src:'筆記第17課',
        note:'答案對，但你漏了回招呼。口說評分表上「禮貌用語」是獨立的一格', next:'e3' },
      { fr:"Salut ! Je m'appelle Owen.", zh:'嗨！我叫 Owen。', tag:'bad', src:'筆記第17課',
        note:'⚠️ 對考官說 Salut＝語域錯。Salut 只對朋友、家人、小孩', next:'e3' },
    ]},

    e3: { speaker:'examinateur', tip:'你是考官。他報了名字，下一個標準動作是什麼？', choices:[
      { fr:"Comment ça s'écrit ?", zh:'怎麼拼？', tag:'good', src:'筆記第17課',
        note:'✅ 老師說這句「考試跟日常都超高頻」，Prénom 卡一定會問到', next:'e4' },
      { fr:"Je m'appelle Owen.", zh:'我叫 Owen。', tag:'bad', src:'筆記第17課',
        note:'⚠️ 這是<b>考生</b>的台詞。考官是問的那一方', next:'e4' },
      { fr:'Vous habitez où ?', zh:'您住哪裡？', tag:'ok', src:'筆記第17課',
        note:'也是真考題（Adresse 卡），只是名字還沒拼完就跳走了', next:'e4' },
    ]},

    e4: { speaker:'candidat', tip:'把名字拼出來', chk:'拼出名字', choices:[
      { fr:"Ça s'écrit O-W-E-N.", zh:'拼作 O-W-E-N。', tag:'good', src:'筆記第17課',
        note:'✅ 字母要唸得出來——這是唯一沒辦法靠文法救的一題', next:'e5' },
      { fr:"Comment ça s'écrit ?", zh:'怎麼拼？', tag:'bad', src:'筆記第17課',
        note:'⚠️ 你把問題丟回去給考官了', next:'e5' },
    ]},

    e5: { speaker:'examinateur', tip:'繼續問身分資料', choices:[
      { fr:'Quelle est votre nationalité ?', zh:'您的國籍是？', tag:'good', src:'筆記第17課',
        note:'✅ 課本 p.166 官方範例列的兩題之一', next:'e6' },
      { fr:"Quelle est votre ville d'origine ?", zh:'您來自哪個城市？', tag:'good', src:'筆記第17課',
        note:'✅ 也是老師實問過的題目', next:'e6' },
      { fr:'Je suis taïwanais.', zh:'我是台灣人。', tag:'bad', src:'筆記第17課',
        note:'⚠️ 這是考生的答案', next:'e6' },
    ]},

    e6: { speaker:'candidat', tip:'回答國籍或家鄉', chk:'國籍／家鄉', choices:[
      { fr:'Je suis taïwanais.', zh:'我是台灣人。', tag:'good', src:'筆記第17課',
        note:'✅ 國籍形容詞不大寫：taïwanais', next:'e7' },
      { fr:'Je viens de Keelung.', zh:'我來自基隆。', tag:'good', src:'筆記第17課',
        note:'✅ 城市前面不加冠詞，直接 de + 城市名', next:'e7' },
      { fr:'Je suis dentiste.', zh:'我是牙醫。', tag:'bad', src:'筆記第17課',
        note:'⚠️ 答非所問。考試最常見的失分不是文法，是<b>沒聽懂問題</b>', next:'e7' },
    ]},

    e7: { speaker:'examinateur', tip:'問工作', choices:[
      { fr:'Quelle est votre profession ?', zh:'您的職業是？', tag:'good', src:'筆記第17課',
        note:'✅ 標準問法', next:'e8' },
      { fr:'Vous avez une voiture ?', zh:'您有車嗎？', tag:'ok', src:'筆記第17課',
        note:'這是<b>第2部分</b>字卡（Voiture）的問句。第1部分問的是你本人的基本資料', next:'e8' },
    ]},

    e8: { speaker:'candidat', tip:'回答職業。想想怎麼多拿一點分', chk:'職業', choices:[
      { fr:"Je suis dentiste. J'aime mon travail parce que j'aide les gens.", zh:'我是牙醫。我愛我的工作，因為我幫助人。', tag:'good', src:'筆記第17課',
        note:'✅ 多給一句理由＝多一次展示 parce que 的機會。考官問一句你答兩句，分數在這裡', next:'e9' },
      { fr:'Je suis dentiste.', zh:'我是牙醫。', tag:'ok', src:'筆記第17課',
        note:'對，但太短。考官會再追問，你等於把難度交給對方決定', next:'e9' },
    ]},

    e9: { speaker:'examinateur', tip:'⭐ 分岔：直接問婚姻狀況，還是用考官的萬用指令句？', choices:[
      { fr:'Vous êtes marié ?', zh:'您結婚了嗎？', tag:'good', src:'筆記第17課',
        note:'✅ 封閉式問句，考生好接', next:'e10' },
      { fr:'Parlez-moi de votre famille.', zh:'跟我聊聊您的家庭。', tag:'good', src:'筆記第17課',
        note:'✅ 老師示範過的考官指令句型 <b>Parlez-moi de…</b>——這種開放題才是真正的難點', next:'e12' },
      { fr:'Oui, je suis marié.', zh:'是的，我結婚了。', tag:'bad', src:'筆記第17課',
        note:'⚠️ 考生的答案', next:'e10' },
    ]},

    e10: { speaker:'candidat', tip:'回答婚姻狀況', chk:'家庭狀況', choices:[
      { fr:'Oui, je suis marié.', zh:'是的，我結婚了。', tag:'good', src:'筆記第17課',
        note:'✅ 簡短正確', next:'e11' },
      { fr:'Pas encore.', zh:'還沒。', tag:'ok', src:'筆記第17課',
        note:'這句本身很好用（Vous avez des enfants ? — Pas encore. 比 non 自然），但它不是你的真實狀況', next:'e11' },
    ]},

    e11: { speaker:'examinateur', tip:'順著家庭問下去', choices:[
      { fr:'Vous avez des enfants ?', zh:'您有小孩嗎？', tag:'good', src:'筆記第17課',
        note:'✅ 課本 p.166 官方範例就是拿 situation familiale 卡問這句', next:'e12' },
      { fr:"Oui, j'ai un enfant, une fille.", zh:'有，我有一個小孩，一個女兒。', tag:'bad', src:'筆記第17課',
        note:'⚠️ 考生的答案', next:'e12' },
    ]},

    e12: { speaker:'candidat', tip:'講你的家庭。⚠️ 先回答問題，再補充', chk:'家庭狀況', choices:[
      { fr:"Oui, j'ai un enfant, une fille. Elle a un an.", zh:'有，我有一個小孩，一個女兒。她一歲。', tag:'good', src:'筆記第17課',
        note:'✅ 回答＋主動補年齡。老師說你當時主動問出 Elle a quel âge ?，就是要這種效果', next:'e13' },
      { fr:"J'ai une grande sœur. Elle habite à Hsinchu. Elle est ingénieure.", zh:'我有一個姊姊。她住新竹。她是工程師。', tag:'good', src:'筆記第17課',
        note:'✅ 三句一組，資訊量剛好。注意陰性形 <b>ingénieure</b>', next:'e13' },
      { fr:'Ma fille est née il y a un an.', zh:'我女兒一年前出生。', tag:'ok', src:'筆記第17課',
        note:'il y a 用得漂亮，但考官問的是「有沒有」——先答 oui 再講細節', next:'e13' },
    ]},

    e13: { speaker:'examinateur', tip:'轉到日常作息', choices:[
      { fr:'Vous vous levez à quelle heure ?', zh:'您幾點起床？', tag:'good', src:'筆記第17課',
        note:'✅ 反身動詞現在式——這題在考你 je me lève', next:'e14' },
      { fr:'Je me lève à six heures.', zh:'我六點起床。', tag:'bad', src:'筆記第17課',
        note:'⚠️ 考生的答案', next:'e14' },
    ]},

    e14: { speaker:'candidat', tip:'回答幾點起床', chk:'日常作息', choices:[
      { fr:'Je me lève à six heures.', zh:'我六點起床。', tag:'good', src:'筆記第17課',
        note:'✅ 被問現在式就用現在式答', next:'e15' },
      { fr:'Je me lever à six heures.', zh:'（錯）我六點起床。', tag:'bad', src:'筆記第17課',
        note:'⚠️ <b>這是你上課真的講錯的那一句</b>（第17課糾錯摘要）。反身動詞要變位：je me <b>lève</b>，不是原形', next:'e15' },
    ]},

    e15: { speaker:'examinateur', tip:'繼續問日常', choices:[
      { fr:'Qu\'est-ce que vous mangez pour le petit déjeuner ?', zh:'您早餐吃什麼？', tag:'good', src:'筆記第17課',
        note:'✅ 這題有陷阱：問 manger，但你的答案是「喝」', next:'e16' },
      { fr:'Vous rentrez à quelle heure ?', zh:'您幾點回家？', tag:'good', src:'筆記第17課',
        note:'✅ 回家固定用 rentrer', next:'e18' },
    ]},

    e16: { speaker:'candidat', tip:'你早餐不吃東西，只喝拿鐵', choices:[
      { fr:'Je ne mange rien, je bois un café au lait.', zh:'我什麼都不吃，我喝一杯拿鐵。', tag:'good', src:'筆記第17課',
        note:'✅ 喝的東西配 <b>boire</b>。ne… rien 的完整包法也一起練到了', next:'e17' },
      { fr:'Je mange un café au lait.', zh:'（錯）我吃一杯拿鐵。', tag:'bad', src:'筆記第17課',
        note:'⚠️ <b>你上課講過這句</b>（第17課糾錯摘要）。中文「吃早餐」害的——manger 是吃，咖啡要用 boire', next:'e17' },
    ]},

    e17: { speaker:'examinateur', tip:'問回家時間', choices:[
      { fr:'Vous rentrez à quelle heure ?', zh:'您幾點回家？', tag:'good', src:'筆記第17課',
        note:'✅', next:'e18' },
      { fr:'Je rentre à dix-huit heures.', zh:'我18點回家。', tag:'bad', src:'筆記第17課',
        note:'⚠️ 考生的答案', next:'e18' },
    ]},

    e18: { speaker:'candidat', tip:'回答幾點回家', chk:'日常作息', choices:[
      { fr:'Je rentre à dix-huit heures.', zh:'我18點回家。', tag:'good', src:'筆記第17課',
        note:'✅ 時間用 24 小時制唸出來，dix-huit heures', next:'e19' },
      { fr:'Je vais revenir à 18 heures.', zh:'（錯）我會在18點回來。', tag:'bad', src:'筆記第17課',
        note:'⚠️ <b>你上課講過這句</b>（第17課糾錯摘要）。revenir＝回到說話的地方，回家一律 <b>rentrer</b>；而且問習慣要用現在式，不是近未來', next:'e19' },
    ]},

    e19: { speaker:'examinateur', tip:'⭐ 分岔：問晚上，還是問週末？', choices:[
      { fr:"Qu'est-ce que vous faites le soir ?", zh:'您晚上做什麼？', tag:'good', src:'筆記第17課',
        note:'✅', next:'e20' },
      { fr:'Et le week-end ?', zh:'那週末呢？', tag:'good', src:'筆記第17課',
        note:'✅ 考官很愛用這種省略問句往下追', next:'e21' },
    ]},

    e20: { speaker:'candidat', tip:'晚上你陪女兒', choices:[
      { fr:'Je joue avec ma fille.', zh:'我陪女兒玩。', tag:'good', src:'筆記第17課',
        note:'✅ 短而真實。真實的內容比華麗的句子好講', next:'e21' },
      { fr:'Je fais du yoga avec ma femme.', zh:'我跟太太做瑜伽。', tag:'ok', src:'筆記第17課',
        note:'句子沒問題，但那是你週末做的事——考試講真話比較好接下去', next:'e21' },
    ]},

    e21: { speaker:'candidat', tip:'講週末', chk:'日常作息', choices:[
      { fr:'Je travaille le samedi. Je fais du yoga avec ma femme.', zh:'我週六上班。我跟太太做瑜伽。', tag:'good', src:'筆記第17課',
        note:'✅ <b>le samedi</b>＝每個星期六（定冠詞＋星期＝習慣）；faire 後面固定 du/de la', next:'end' },
      { fr:'Je travaille le samedi.', zh:'我週六上班。', tag:'ok', src:'筆記第17課',
        note:'對，但只講工作太乾。加一句休閒活動，考官才有東西可以追問', next:'end' },
    ]},

    end: { speaker:'system', line:'—— 對話結束 ——', zh:'', src:'' },
  }
},

/* ═══════════════════════════════════════════════════════════════
   3. 約時間與邀約（三條分岔：答應／改提議／有事）
   台詞來源：課本 Édito A1 Unité 6 的兩段聽力逐字稿（Thomas↔Florian、Thomas↔Perrine）
             ＋筆記第9、19課的提議/接受/婉拒三欄表。
   ⭐ 這是第一個真正「選擇會改變劇情」的場景——n4 三個選項通往三條不同的路。
   ═══════════════════════════════════════════════════════════════ */
{
  id: 'rendez-vous',
  icon: '📅',
  zh: '約朋友出門',
  fr: 'Proposer une sortie',
  exam: '⭐ 口說協商情境＋寫作 tâche 1（回覆邀約訊息）都考這個；A2 口說第三部分也常抽到',
  src: '課本 Unité 6 聽力逐字稿＋筆記第9、19課',
  roles: { thomas: '📣 你是提議的人（Thomas）', perrine: '🙋 你是被邀的人（Perrine）' },
  speakers: { thomas: 'Thomas', perrine: 'Perrine' },
  roleHints: { thomas: '你要開口約人、被拒絕之後還要接得下去', perrine: '你可以答應、可以改提議、也可以說有事——三條路都走得通' },
  checklist: ['打招呼', '提議活動', '回應提議', '喬時間', '說定收尾'],
  start: 'v1',
  nodes: {
    v1: { speaker:'thomas', line:"Allô, Perrine, c'est Thomas.", zh:'喂，Perrine，我是 Thomas。',
          src:'課本 Unité 6', note:'法文打電話報自己名字用 <b>c\'est + 名字</b>，不是 je suis', next:'v2' },

    v2: { speaker:'perrine', tip:'接電話。這次是朋友，不是店員', chk:'打招呼', choices:[
      { fr:'Salut Thomas !', zh:'嗨 Thomas！', tag:'good', src:'課本 Unité 6',
        note:'✅ 朋友之間就是 Salut——跟麵包店那一課剛好相反，<b>語域要看對象</b>', next:'v3' },
      { fr:'Bonjour !', zh:'您好！', tag:'ok', src:'筆記第1課',
        note:'不算錯，但對熟朋友有點客套', next:'v3' },
    ]},

    v3: { speaker:'thomas', tip:'提議今晚的活動', chk:'提議活動', choices:[
      { fr:"Qu'est-ce que tu fais ce soir ? Tu veux aller au théâtre ?", zh:'你今晚做什麼？你想去看戲嗎？', tag:'good', src:'課本 Unité 6',
        note:'✅ 先問行程再提議，對方比較好回。<b>veux</b>＝問意願', next:'v4' },
      { fr:'Tu es libre ce soir ? On va au théâtre ?', zh:'你今晚有空嗎？我們去看戲？', tag:'good', src:'課本 Unité 6',
        note:'✅ 課本另一段對話的講法，一樣自然。on 在口語裡就是 nous', next:'v4' },
      { fr:'Tu peux aller au théâtre ?', zh:'你能去看戲嗎？', tag:'bad', src:'筆記第9課',
        note:'⚠️ 筆記明講：<b>peux 是問「能不能」</b>（有沒有空、有沒有錢），問「想不想」要用 <b>veux</b>', next:'v4' },
    ]},

    v4: { speaker:'perrine', tip:'⭐ 這一步決定劇情走哪條路：答應／不想去／有別的事', chk:'回應提議', choices:[
      { fr:'Avec plaisir !', zh:'很樂意！', tag:'good', src:'筆記第9課',
        note:'✅ 接受邀約最漂亮的一句 → 接下來要喬時間', next:'a1' },
      { fr:"Bof. On va souvent au théâtre. Je n'ai pas envie.", zh:'唉。我們常去劇院。我不想去。', tag:'ok', src:'課本 Unité 6',
        note:'課本的 Perrine 就是這樣講的——朋友之間可以，但 <b>Je n\'ai pas envie</b> 很直接，對不熟的人會傷人 → 接下來你要負責提替代方案', next:'b1' },
      { fr:'Je ne peux pas, je suis désolé. Je vais au concert de Boulevard des airs.', zh:'我不行，抱歉。我要去 Boulevard des airs 的演唱會。', tag:'good', src:'課本 Unité 6＋筆記第9課',
        note:'✅ 婉拒的標準結構：<b>不行＋道歉＋理由</b>。只講「不行」對方會尷尬', next:'c1' },
    ]},

    /* ── A：答應了，開始喬時間 ── */
    a1: { speaker:'thomas', tip:'她答應了。現在要把時間地點講死', chk:'喬時間', choices:[
      { fr:'On se retrouve chez moi à 19h ?', zh:'我們19點在我家碰面？', tag:'good', src:'筆記第19課',
        note:'✅ <b>se retrouver</b>＝碰面。給出具體時間地點，對話才收得掉', next:'a2' },
      { fr:'Tu es libre ?', zh:'你有空嗎？', tag:'ok', src:'筆記第19課',
        note:'她已經答應了，再問一次有空沒空是繞路——要給時間', next:'a2' },
      { fr:'Avec plaisir !', zh:'很樂意！', tag:'bad', src:'筆記第9課',
        note:'⚠️ 這是<b>被邀那一方</b>的台詞', next:'a2' },
    ]},

    a2: { speaker:'perrine', tip:'確認時間', choices:[
      { fr:'Ça marche !', zh:'說定了！', tag:'good', src:'筆記第19課',
        note:'✅ <b>ça marche</b> 字面是「它走」，口語＝成交、說定了', next:'a3' },
      { fr:'Ça me va !', zh:'我可以！', tag:'good', src:'筆記第19課',
        note:'✅ 同義，也很自然', next:'a3' },
      { fr:'Ça fonctionne.', zh:'它運作正常。', tag:'bad', src:'筆記第19課',
        note:'⚠️ 老師特別糾正過：<b>約定用 marche，機器用 fonctionne</b>。這句像在說「這台機器沒壞」', next:'a3' },
    ]},

    a3: { speaker:'thomas', tip:'收尾。今晚要見面，該說哪一句？', chk:'說定收尾', choices:[
      { fr:"D'accord, ça marche. À ce soir !", zh:'好，說定了。晚點見！', tag:'good', src:'筆記第19課',
        note:'✅ 老師示範對話的收尾原句。<b>À + 時間</b>＝下次見面的時間點', next:'end' },
      { fr:'À demain !', zh:'明天見！', tag:'bad', src:'筆記第1課',
        note:'⚠️ 你們約的是<b>今晚</b>。à demain 是明天才會見到', next:'end' },
      { fr:'Bonne soirée !', zh:'祝你有個愉快的夜晚！', tag:'ok', src:'課本 Unité 6',
        note:'這句是「祝你今晚愉快」＝我們今晚<b>不會</b>見面。跟你剛約好的事互相矛盾', next:'end' },
    ]},

    /* ── B：她不想去劇院，換一個活動 ── */
    b1: { speaker:'thomas', tip:'被打槍了。不要僵在那裡——把球丟回去', choices:[
      { fr:"Qu'est-ce que tu veux faire ?", zh:'那你想做什麼？', tag:'good', src:'課本 Unité 6',
        note:'✅ 課本的 Thomas 就是這樣救場的：不爭辯，改問對方要什麼', next:'b2' },
      { fr:"Je n'ai pas envie.", zh:'我不想。', tag:'bad', src:'筆記第9課',
        note:'⚠️ 那是<b>她</b>剛講的話', next:'b2' },
    ]},

    b2: { speaker:'perrine', tip:'換你提議。有什麼別的活動？', chk:'提議活動', choices:[
      { fr:'Il y a une exposition sur Brancusi. Ça te dit ?', zh:'有一個 Brancusi 的展覽。你有興趣嗎？', tag:'good', src:'課本 Unité 6',
        note:'✅ <b>Il y a…＋Ça te dit ?</b> 是提議的萬用組合：先給資訊，再問意願', next:'b3' },
      { fr:'Je ne sais pas.', zh:'我不知道。', tag:'ok', src:'筆記第16課',
        note:'誠實，但對話會卡死——拒絕了就要負責提替代方案', next:'b3' },
      { fr:'Ça vous dit ?', zh:'您有興趣嗎？', tag:'ok', src:'筆記第9課',
        note:'vous 是禮貌版，對長輩／不熟的人用。對朋友要 <b>ça te dit</b>', next:'b3' },
    ]},

    b3: { speaker:'thomas', tip:'接受她的提議，順便確認開不開', choices:[
      { fr:"Pourquoi pas ! C'est ouvert ce soir ?", zh:'有何不可！今晚有開嗎？', tag:'good', src:'筆記第9課＋課本 Unité 6',
        note:'✅ 接受＋主動確認細節。<b>Pourquoi pas</b> 是「不排斥」型的答應', next:'b4' },
      { fr:"D'accord !", zh:'好！', tag:'ok', src:'筆記第9課',
        note:'答應了，但沒確認展覽開不開——晚上撲空的就是你', next:'b4' },
    ]},

    b4: { speaker:'perrine', line:"Le jeudi, c'est ouvert jusqu'à 23 heures.", zh:'每週四開到23點。',
          src:'課本 Unité 6', note:'<b>le jeudi</b>＝每個星期四（定冠詞＋星期＝固定習慣），不是「這個星期四」', next:'b5' },

    b5: { speaker:'thomas', tip:'把時間地點定下來', chk:'喬時間', choices:[
      { fr:"Super ! On se retrouve à l'exposition à 19 heures ?", zh:'太好了！我們19點在展覽現場碰面？', tag:'good', src:'課本 Unité 6',
        note:'✅ 課本原句。地點＋時間一次講完', next:'b6' },
      { fr:'Ça te va ?', zh:'你可以嗎？', tag:'ok', src:'筆記第19課',
        note:'問了，但沒說要約幾點——對方沒東西可以確認', next:'b6' },
    ]},

    b6: { speaker:'perrine', tip:'說定', chk:'說定收尾', choices:[
      { fr:"D'accord, à ce soir !", zh:'好，晚點見！', tag:'good', src:'課本 Unité 6',
        note:'✅ 課本原句收尾', next:'end' },
      { fr:'Ça marche !', zh:'說定了！', tag:'good', src:'筆記第19課',
        note:'✅ 一樣可以', next:'end' },
    ]},

    /* ── C：她有別的事（課本 Thomas↔Florian 那一段） ── */
    c1: { speaker:'thomas', tip:'她有別的節目。要不要試著一起去？', choices:[
      { fr:'Super, je peux venir avec toi ?', zh:'太好了，我可以跟你一起去嗎？', tag:'good', src:'課本 Unité 6',
        note:'✅ 課本原句。被拒絕之後<b>還能接下去</b>，這才是口說考試在看的東西', next:'c2' },
      { fr:'Bonne soirée !', zh:'祝你有個愉快的夜晚！', tag:'ok', src:'課本 Unité 6',
        note:'禮貌，但你一句話就把對話結束了——考試會覺得你「撐不滿時間」', next:'c4' },
      { fr:'Ça te dit ?', zh:'你有興趣嗎？', tag:'bad', src:'筆記第9課',
        note:'⚠️ 她已經拒絕了，再問一次「有沒有興趣」等於沒在聽', next:'c2' },
    ]},

    c2: { speaker:'perrine', tip:'演唱會票早就賣完了', choices:[
      { fr:'Malheureusement non. Leurs concerts sont toujours complets.', zh:'很可惜不行。他們的演唱會總是滿的。', tag:'good', src:'課本 Unité 6',
        note:'✅ <b>Malheureusement</b>（很可惜）讓「不行」聽起來不像關門', next:'c3' },
      { fr:"Ce n'est pas possible.", zh:'這不可能。', tag:'ok', src:'筆記第19課',
        note:'正確的婉拒句，但沒給理由，聽起來比較硬', next:'c3' },
    ]},

    c3: { speaker:'thomas', tip:'還有沒有別的辦法？', choices:[
      { fr:'Il y a parfois des places au dernier moment. Je regarde sur Internet.', zh:'有時候最後一刻會有票。我上網看看。', tag:'good', src:'課本 Unité 6',
        note:'✅ 課本原句。<b>parfois</b>（有時候）是第9課的頻率副詞，放在動詞後面', next:'c4' },
      { fr:'Bonne idée. Tu trouves ?', zh:'好主意。你找得到嗎？', tag:'bad', src:'課本 Unité 6',
        note:'⚠️ 這是<b>對方</b>回應你之後才說的話，順序顛倒了', next:'c4' },
    ]},

    c4: { speaker:'perrine', tip:'收尾。今晚你們不會見面', chk:'說定收尾', choices:[
      { fr:'Bonne soirée !', zh:'祝你有個愉快的夜晚！', tag:'good', src:'課本 Unité 6',
        note:'✅ 今晚各過各的，就用 Bonne soirée 收', next:'end' },
      { fr:'Merci. À bientôt !', zh:'謝謝。回頭見！', tag:'good', src:'課本 Unité 6',
        note:'✅ <b>À bientôt</b>＝沒有講定日期的「再見」，這裡剛好', next:'end' },
      { fr:'À ce soir !', zh:'晚點見！', tag:'bad', src:'筆記第19課',
        note:'⚠️ 今晚見不到面了。<b>À + 時間</b>是承諾，不能亂用', next:'end' },
    ]},

    end: { speaker:'system', line:'—— 對話結束 ——', zh:'', src:'' },
  }
},

/* ═══════════════════════════════════════════════════════════════
   4. 餐廳點餐（三條分岔：先問今日主菜／直接點燉小牛肉／點牛排要問熟度）
   台詞來源：課本 Édito A1 p.54「Au restaurant」聽力逐字稿（服務生全部的台詞都在這）
             ＋ Cahier p.36 的餐廳對話 ＋ 筆記第5課點餐句型。
   ⚠️ 牛排熟度那一步只有 tip、沒有服務生台詞——因為筆記與課本都只給了
      bleu/saignant/à point/bien cuit 四個詞，沒有問熟度的完整句子，不自己編。
   ═══════════════════════════════════════════════════════════════ */
{
  id: 'restaurant',
  icon: '🍽',
  zh: '餐廳點餐',
  fr: 'Au restaurant',
  exam: '⭐ dialogue simulé 的第二大情境：點餐、要水、評價、結帳一整套',
  src: '課本 p.54 聽力逐字稿＋Cahier p.36＋筆記第5課',
  roles: { client: '🙋 你是客人', serveur: '🧑‍🍳 你是服務生' },
  speakers: { client: 'Le client', serveur: 'Le serveur' },
  roleHints: { client: '從進門到結帳走一遍——考試抽到餐廳就是這條路', serveur: '服務生的句子筆記幾乎沒收，全部來自課本聽力逐字稿' },
  checklist: ['打招呼', '點餐', '要一壺水', '評價餐點', '要帳單', '付款告別'],
  start: 'r1',
  nodes: {
    r1: { speaker:'serveur', line:'Messieurs-dames, bonjour.', zh:'先生女士們，您好。',
          src:'課本 p.54', note:'法國服務生的標準開場。<b>Messieurs-dames</b> 是一整桌人的稱呼', next:'r2' },

    r2: { speaker:'client', tip:'回招呼', chk:'打招呼', choices:[
      { fr:'Bonjour !', zh:'您好！', tag:'good', src:'筆記第1課',
        note:'✅ 進餐廳第一件事，跟麵包店一樣', next:'r3' },
      { fr:'Salut !', zh:'嗨！', tag:'bad', src:'筆記第1課',
        note:'⚠️ 對服務生用 Salut 太隨便', next:'r3' },
      { fr:'Bonsoir !', zh:'晚上好！', tag:'ok', src:'筆記第1課',
        note:'晚餐時段完全正確；中午就要用 Bonjour', next:'r3' },
    ]},

    r3: { speaker:'serveur', tip:'你是服務生。該問點什麼了', choices:[
      { fr:"Alors… Qu'est-ce que vous choisissez ?", zh:'那麼…您們選什麼？', tag:'good', src:'課本 p.54',
        note:'✅ 課本原句。<b>choisir</b> 是第5課的 -ir 動詞：vous choisissez', next:'r4' },
      { fr:'Quel est le plat du jour ?', zh:'今日主菜是什麼？', tag:'bad', src:'筆記第5課',
        note:'⚠️ 這是<b>客人</b>問的。服務生是回答今日主菜的人', next:'r4' },
      { fr:'Je voudrais le steak-frites.', zh:'我想要牛排薯條。', tag:'bad', src:'筆記第5課',
        note:'⚠️ 客人的台詞', next:'r4' },
    ]},

    r4: { speaker:'client', tip:'⭐ 分岔：先問今日主菜／直接點燉小牛肉／點牛排（會被問熟度）', chk:'點餐', choices:[
      { fr:'Quel est le plat du jour ?', zh:'今日主菜是什麼？', tag:'good', src:'筆記第5課',
        note:'✅ 先問今日主菜是法國餐廳的標準動作——通常最新鮮也最便宜', next:'p1' },
      { fr:'Je voudrais de la blanquette de veau avec du riz.', zh:'我想要白汁小牛肉配飯。', tag:'good', src:'課本 p.54',
        note:'✅ 課本原句。<b>de la</b> blanquette／<b>du</b> riz 是第5課的不定量冠詞', next:'r6' },
      { fr:'Un steak-frites !', zh:'一份牛排薯條！', tag:'ok', src:'課本 p.54',
        note:'課本裡是小孩 Charlie 這樣講的。大人對服務生講，最好補上 je voudrais 跟 s\'il vous plaît', next:'s1' },
      { fr:'Je veux un steak-frites.', zh:'我要一份牛排薯條。', tag:'bad', src:'筆記第4課', constructed:true,
        note:'⚠️ <b>je veux 給人命令感</b>（第4課明講）。餐廳一律 je voudrais', next:'s1' },
    ]},

    /* ── P：先問今日主菜 ── */
    p1: { speaker:'serveur', tip:'客人問今日主菜。回答他', choices:[
      { fr:'On a de la blanquette de veau.', zh:'我們有白汁小牛肉。', tag:'good', src:'筆記第5課',
        note:'✅ <b>de la</b>＝不確定的量。這是法國家常菜的代表', next:'p2' },
      { fr:"Il n'y a pas de dessert aujourd'hui.", zh:'今天沒有甜點。', tag:'ok', src:'筆記第5課',
        note:'句子本身很漂亮（否定句 des→de），但客人問的是主菜', next:'p2' },
    ]},

    p2: { speaker:'client', tip:'決定要點什麼', chk:'點餐', choices:[
      { fr:'Je voudrais de la blanquette de veau avec du riz.', zh:'我想要白汁小牛肉配飯。', tag:'good', src:'課本 p.54',
        note:'✅ 課本原句', next:'r6' },
      { fr:'Pour moi, la blanquette de veau.', zh:'我要白汁小牛肉。', tag:'good', src:'筆記第5課',
        note:'✅ 口語版點餐：<b>Pour moi, …</b>，一桌人輪流點的時候最常用', next:'r6' },
      { fr:'Je ne mange pas de viande.', zh:'我不吃肉。', tag:'ok', src:'筆記第5課',
        note:'吃素的話這句正確（否定 de），但你沒有說要點什麼', next:'r6' },
    ]},

    /* ── S：點了牛排，要決定熟度 ── */
    s1: { speaker:'client', tip:'法國點牛排一定會被問幾分熟。⚠️ 筆記只給了四個詞，沒有完整問句，所以這裡不編服務生的台詞', chk:'點餐', choices:[
      { fr:'à point', zh:'五分熟', tag:'good', src:'筆記第5課',
        note:'✅ 法國最推薦的熟度，字面是「剛剛好」', next:'r6' },
      { fr:'saignant', zh:'三分熟', tag:'good', src:'筆記第5課',
        note:'✅ 字面是「帶血的」（sang＝血），法國人很常點', next:'r6' },
      { fr:'bien cuit', zh:'全熟', tag:'ok', src:'筆記第5課',
        note:'講得出來就沒問題，只是法國廚師會覺得可惜', next:'r6' },
      { fr:'bleu', zh:'極生（幾乎生的）', tag:'ok', src:'筆記第5課',
        note:'字面是「藍的」——真的幾乎沒煮。確定要再點', next:'r6' },
    ]},

    /* ── 三條路在這裡合流 ── */
    r6: { speaker:'serveur', tip:'菜好了，端上桌', choices:[
      { fr:'Très bien. Et voilà vos plats, messieurs-dames.', zh:'好的。這是您們的餐點，先生女士們。', tag:'good', src:'課本 p.54',
        note:'✅ 課本原句。<b>voilà</b>＝「這就是」，上菜、遞東西都用它', next:'r7' },
      { fr:'Bonne dégustation !', zh:'請慢用！', tag:'good', src:'筆記第5課',
        note:'✅ 比 bon appétit 更精緻的說法，餐廳服務生常用', next:'r7' },
      { fr:'Merci.', zh:'謝謝。', tag:'bad', src:'課本 p.54',
        note:'⚠️ 上菜的時候道謝的是<b>客人</b>', next:'r7' },
    ]},

    r7: { speaker:'client', tip:'法國餐廳的自來水是免費的，記得要', chk:'要一壺水', choices:[
      { fr:"Une carafe d'eau, s'il vous plaît.", zh:'請給我一壺水。', tag:'good', src:'筆記第5課',
        note:'✅ <b>carafe d\'eau</b>＝免費的自來水壺。不講就會被送上要錢的瓶裝水', next:'r8' },
      { fr:"Je commande de l'eau.", zh:'我點水。', tag:'ok', src:'筆記第5課',
        note:'文法對（de l\' 是母音開頭的不定量冠詞），但沒有人這樣跟服務生講話', next:'r8' },
    ]},

    r8: { speaker:'serveur', tip:'送水過去', choices:[
      { fr:"Oui, bien sûr. Voici la carafe d'eau et trois verres.", zh:'好的，當然。這是水壺跟三個杯子。', tag:'good', src:'課本 p.54',
        note:'✅ 課本原句。<b>voici</b>（這裡這個）vs <b>voilà</b>（那裡那個），遞東西兩個都通', next:'r9' },
      { fr:'Avec plaisir !', zh:'很樂意！', tag:'good', src:'筆記第5課',
        note:'✅ 服務生答應客人要求的固定回應', next:'r9' },
    ]},

    r9: { speaker:'client', tip:'吃完了，講一句感想', chk:'評價餐點', choices:[
      { fr:"C'est délicieux !", zh:'太美味了！', tag:'good', src:'筆記第5課',
        note:'✅ 比 c\'est bon 更用力，法國人聽了會很開心', next:'r10' },
      { fr:"C'est pas mal.", zh:'還不錯。', tag:'ok', src:'筆記第5課',
        note:'口語縮略（省略了 ne），意思是「還可以」——對廚師來說有點冷淡', next:'r10' },
      { fr:"C'est mauvais.", zh:'不好吃。', tag:'bad', src:'筆記第5課',
        note:'⚠️ 當面直說難吃非常失禮。真的不喜歡，法國人會說 c\'est pas mal 就好', next:'r10' },
    ]},

    r10: { speaker:'client', tip:'要結帳了', chk:'要帳單', choices:[
      { fr:"L'addition, s'il vous plaît.", zh:'請給我帳單。', tag:'good', src:'筆記第5課',
        note:'✅ 結帳的固定講法。法國要主動要帳單，服務生不會自己送過來', next:'r11' },
      { fr:'Ça coûte combien ?', zh:'多少錢？', tag:'ok', src:'筆記第4課',
        note:'那是商店問單價用的。餐廳要的是<b>整張帳單</b> l\'addition', next:'r11' },
    ]},

    r11: { speaker:'serveur', tip:'客人要結帳', choices:[
      { fr:"Alors, un riz au lait, un café, un thé et l'addition. Et voilà !", zh:'那麼，一份牛奶米布丁、一杯咖啡、一杯茶跟帳單。這就是了！', tag:'good', src:'課本 p.54',
        note:'✅ 課本原句：服務生會把整桌點的東西複誦一遍再給帳單', next:'r12' },
      { fr:'Vous payez comment ?', zh:'您怎麼付款？', tag:'good', src:'筆記第4課',
        note:'✅ 問付款方式', next:'r12' },
      { fr:"Oui, l'addition, s'il vous plaît.", zh:'好，請給我帳單。', tag:'bad', src:'課本 p.36',
        note:'⚠️ 客人的台詞', next:'r12' },
    ]},

    r12: { speaker:'client', tip:'付錢', chk:'付款告別', choices:[
      { fr:'Par carte bancaire.', zh:'刷卡。', tag:'good', src:'筆記第4課',
        note:'✅ 法國餐廳幾乎都刷卡', next:'r13' },
      { fr:'En espèces.', zh:'付現金。', tag:'good', src:'筆記第4課',
        note:'✅ 也可以，只是越來越少見', next:'r13' },
    ]},

    r13: { speaker:'serveur', line:'Bonne journée !', zh:'祝您有美好的一天！', src:'筆記第1課',
           note:'<b>Bonne journée 說了就等於再見</b>', next:'r14' },

    r14: { speaker:'client', tip:'收尾', chk:'付款告別', choices:[
      { fr:'Au revoir !', zh:'再見！', tag:'good', src:'筆記第1課',
        note:'✅ 標準道別', next:'end' },
      { fr:'Bonne journée !', zh:'祝你有美好的一天！', tag:'good', src:'筆記第1課',
        note:'✅ 對方說什麼你就回什麼', next:'end' },
      { fr:'À demain !', zh:'明天見！', tag:'bad', src:'筆記第1課',
        note:'⚠️ 除非你明天真的還會來', next:'end' },
    ]},

    end: { speaker:'system', line:'—— 對話結束 ——', zh:'', src:'' },
  }
},
];
if (typeof module !== 'undefined') module.exports = { SCENES };
