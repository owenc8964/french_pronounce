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

/* ═══════════════════════════════════════════════════════════════
   5. 買衣服（婚禮的服裝）
   台詞來源：課本 Édito A1 p.78 聽力逐字稿（店員↔一對夫妻）。
   本場景的核心對照：**faire du 40（衣服尺寸）vs chausser du 45（鞋號）**——
   同樣是「幾號」，法文用兩個不同動詞，這是課本刻意設計的陷阱。
   ═══════════════════════════════════════════════════════════════ */
{
  id: 'vetements',
  icon: '👗',
  zh: '買衣服（婚禮）',
  fr: 'Acheter des vêtements',
  exam: '⭐ dialogue simulé 常抽到的購物情境；尺寸、顏色、價錢一次到齊',
  src: '課本 p.78 聽力逐字稿＋筆記第4、8課',
  roles: { client: '🙋 你是顧客', vendeur: '🧑‍💼 你是店員' },
  speakers: { client: 'Le client', vendeur: 'Le vendeur' },
  roleHints: { client: '要說出場合、款式、尺寸——比買麵包多好幾層', vendeur: '店員要問對問題：款式→顏色→尺寸→加賣' },
  checklist: ['打招呼＋說來意', '選款式', '講尺寸', '鞋子', '問價錢', '付款告別'],
  start: 'w1',
  nodes: {
    w1: { speaker:'vendeur', line:'Bonjour, messieurs-dames.', zh:'先生女士們，您好。',
          src:'課本 p.78', note:'一對客人進門，店員用複數稱呼', next:'w2' },

    w2: { speaker:'client', tip:'說明你們來買什麼、為了什麼場合', chk:'打招呼＋說來意', choices:[
      { fr:'Bonjour, monsieur. Mon mari et moi, nous cherchons des vêtements pour un mariage.', zh:'您好先生。我先生跟我在找參加婚禮的衣服。', tag:'good', src:'課本 p.78',
        note:'✅ <b>chercher</b>＝在找。一句話講完「誰」＋「找什麼」＋「什麼場合」，店員才推薦得動', next:'w3' },
      { fr:'Bonjour, monsieur. Notre neveu va se marier début juin.', zh:'您好先生。我們的姪子六月初要結婚。', tag:'ok', src:'課本 p.78',
        note:'資訊是對的（近未來 va se marier），但你沒說要買什麼——店員還得再問一次', next:'w3' },
      { fr:'Vous cherchez quelque chose ?', zh:'您在找什麼嗎？', tag:'bad', src:'課本 p.78',
        note:'⚠️ 這是<b>店員</b>的招呼語', next:'w3' },
    ]},

    w3: { speaker:'vendeur', tip:'你是店員。婚禮＝正式場合，該推薦什麼？', choices:[
      { fr:'Des vêtements élégants alors… un costume pour monsieur et pour vous, madame, vous préférez une robe longue ou un pantalon avec une veste ?', zh:'那就是正式服裝囉…先生穿西裝，那女士您比較喜歡長洋裝還是長褲配外套？', tag:'good', src:'課本 p.78',
        note:'✅ 課本原句。店員的標準動作：<b>先確認場合，再給二選一</b>——給選項比開放式問句好回答', next:'w4' },
      { fr:'Vous cherchez quelque chose ?', zh:'您在找什麼嗎？', tag:'ok', src:'課本 p.78',
        note:'客人剛剛已經講了。這句是給一進門還沒開口的客人用的', next:'w4' },
      { fr:'Moi, je fais du 44.', zh:'我穿44號。', tag:'bad', src:'課本 p.78',
        note:'⚠️ 客人的台詞', next:'w4' },
    ]},

    w4: { speaker:'client', tip:'⭐ 分岔：先挑太太的洋裝，還是先挑先生的西裝？', chk:'選款式', choices:[
      { fr:"Les robes longues, je trouve ça joli et c'est à la mode.", zh:'長洋裝，我覺得好看而且很流行。', tag:'good', src:'課本 p.78',
        note:'✅ <b>je trouve ça + 形容詞</b>＝我覺得這樣…；<b>à la mode</b>＝流行的', next:'w5a' },
      { fr:"Au printemps, je n'aime pas porter des vêtements gris. Alors, un costume beige ou bleu, s'il vous plaît.", zh:'春天我不喜歡穿灰色的衣服。那就米色或藍色的西裝，麻煩您。', tag:'good', src:'課本 p.78',
        note:'✅ 先講理由再講結論——考試最愛聽這種「有理由的選擇」', next:'w5b' },
      { fr:'Vous préférez quelle couleur ?', zh:'您比較喜歡什麼顏色？', tag:'bad', src:'課本 p.78',
        note:'⚠️ 店員才是問顏色的人', next:'w5a' },
    ]},

    /* ── 洋裝線 ── */
    w5a: { speaker:'vendeur', tip:'款式定了，接下來要問什麼？', choices:[
      { fr:"D'accord. Vous faites quelle taille ?", zh:'好的。您穿幾號？', tag:'good', src:'課本 p.78',
        note:'✅ 衣服尺寸用 <b>faire du + 數字</b>', next:'w6a' },
      { fr:'Et moi, je fais du 40.', zh:'那我穿40號。', tag:'bad', src:'課本 p.78',
        note:'⚠️ 客人的台詞', next:'w6a' },
    ]},

    w6a: { speaker:'client', tip:'講尺寸', chk:'講尺寸', choices:[
      { fr:'Et moi, je fais du 40.', zh:'那我穿40號。', tag:'good', src:'課本 p.78',
        note:'✅ 衣服：<b>je fais du 40</b>', next:'w9' },
      { fr:'Je chausse du 45.', zh:'我穿45號鞋。', tag:'bad', src:'課本 p.78',
        note:'⚠️ <b>chausser</b> 專門講鞋號。衣服要用 faire du——這組是課本故意設計的對照', next:'w9' },
    ]},

    /* ── 西裝線 ── */
    w5b: { speaker:'vendeur', tip:'客人要西裝。顏色還沒定', choices:[
      { fr:'Et vous, monsieur, vous préférez un costume gris, bleu ou beige ?', zh:'那您呢先生，比較喜歡灰色、藍色還是米色的西裝？', tag:'good', src:'課本 p.78',
        note:'✅ 三選一，客人好答', next:'w6b' },
      { fr:"Au printemps, je n'aime pas porter des vêtements gris.", zh:'春天我不喜歡穿灰色的衣服。', tag:'bad', src:'課本 p.78',
        note:'⚠️ 客人的台詞', next:'w6b' },
    ]},

    w6b: { speaker:'vendeur', tip:'顏色講定了，換問尺寸', choices:[
      { fr:"D'accord. Vous faites quelle taille ?", zh:'好的。您穿幾號？', tag:'good', src:'課本 p.78',
        note:'✅ 衣服尺寸用 faire du', next:'w7b' },
      { fr:'Vous chaussez du combien ?', zh:'您穿幾號鞋？', tag:'ok', src:'課本 p.78',
        note:'問法沒錯，但現在還在講西裝——<b>chausser 是鞋子專用</b>', next:'w7b' },
    ]},

    w7b: { speaker:'client', tip:'講尺寸', chk:'講尺寸', choices:[
      { fr:'Moi, je fais du 44.', zh:'我穿44號。', tag:'good', src:'課本 p.78',
        note:'✅ 衣服：je fais du 44', next:'w9' },
      { fr:'Je chausse du 45.', zh:'我穿45號鞋。', tag:'bad', src:'課本 p.78',
        note:'⚠️ 那是鞋號。衣服用 faire du', next:'w9' },
    ]},

    /* ── 合流：加賣鞋子 ── */
    w9: { speaker:'vendeur', tip:'成交前再加賣一樣東西', choices:[
      { fr:'Très bien. Ah ! Monsieur, nous vendons aussi des chaussures avec les costumes.', zh:'很好。啊！先生，我們西裝也搭配鞋子。', tag:'good', src:'課本 p.78',
        note:'✅ 課本原句：法國店員的加賣話術', next:'w10' },
      { fr:'Vous préférez quelle couleur ?', zh:'您比較喜歡什麼顏色？', tag:'ok', src:'課本 p.78',
        note:'顏色前面已經問過了', next:'w10' },
    ]},

    w10: { speaker:'client', tip:'要不要順便買鞋？', chk:'鞋子', choices:[
      { fr:"Parfait ! Des chaussures noires, s'il vous plaît.", zh:'太好了！黑鞋子，麻煩您。', tag:'good', src:'課本 p.78',
        note:'✅ 顏色形容詞放名詞<b>後面</b>：chaussures noires（第4課規則）', next:'w11' },
      { fr:'Combien je vous dois ?', zh:'我該付您多少？', tag:'ok', src:'課本 p.60',
        note:'直接跳到結帳也行，但你放掉了鞋子這一段練習', next:'w13' },
    ]},

    w11: { speaker:'vendeur', tip:'⚠️ 鞋號跟衣服尺寸不同動詞', choices:[
      { fr:'Vous chaussez du combien ?', zh:'您穿幾號鞋？', tag:'good', src:'課本 p.78',
        note:'✅ 鞋子用 <b>chausser</b>（chaussure＝鞋，同一家族）', next:'w12' },
      { fr:'Vous faites quelle taille ?', zh:'您穿幾號？', tag:'ok', src:'課本 p.78',
        note:'聽得懂，但講鞋子時法國人一律用 chausser', next:'w12' },
    ]},

    w12: { speaker:'client', tip:'報鞋號', chk:'鞋子', choices:[
      { fr:'Je chausse du 45.', zh:'我穿45號鞋。', tag:'good', src:'課本 p.78',
        note:'✅ 對上了：faire du（衣服）／chausser du（鞋）', next:'w13' },
      { fr:'Moi, je fais du 44.', zh:'我穿44號。', tag:'bad', src:'課本 p.78',
        note:'⚠️ 那是衣服尺寸', next:'w13' },
    ]},

    w13: { speaker:'client', tip:'問總共多少錢', chk:'問價錢', choices:[
      { fr:'Combien je vous dois ?', zh:'我該付您多少？', tag:'good', src:'課本 p.60',
        note:'✅ 字面是「我欠您多少」——結帳時最道地的問法', next:'w14' },
      { fr:'Ça coûte combien ?', zh:'多少錢？', tag:'ok', src:'筆記第4課',
        note:'也對，只是比較像在問某一件商品的單價', next:'w14' },
    ]},

    w14: { speaker:'vendeur', tip:'收錢', choices:[
      { fr:'Vous payez comment ?', zh:'您怎麼付款？', tag:'good', src:'筆記第4課',
        note:'✅ 跟麵包店同一套流程', next:'w15' },
      { fr:'Par carte bancaire.', zh:'刷卡。', tag:'bad', src:'筆記第4課',
        note:'⚠️ 客人的回答', next:'w15' },
    ]},

    w15: { speaker:'client', tip:'付款＋收尾', chk:'付款告別', choices:[
      { fr:'Par carte bancaire.', zh:'刷卡。', tag:'good', src:'筆記第4課',
        note:'✅', next:'w16' },
      { fr:'En espèces.', zh:'付現金。', tag:'good', src:'筆記第4課',
        note:'✅', next:'w16' },
    ]},

    w16: { speaker:'vendeur', line:'Bonne journée !', zh:'祝您有美好的一天！', src:'筆記第1課',
           note:'', next:'w17' },

    w17: { speaker:'client', tip:'收尾', chk:'付款告別', choices:[
      { fr:'Au revoir !', zh:'再見！', tag:'good', src:'筆記第1課', note:'✅', next:'end' },
      { fr:'Bonne journée !', zh:'祝你有美好的一天！', tag:'good', src:'筆記第1課', note:'✅', next:'end' },
      { fr:'À demain !', zh:'明天見！', tag:'bad', src:'筆記第1課',
        note:'⚠️ 你又不是明天還要來買一次西裝', next:'end' },
    ]},

    end: { speaker:'system', line:'—— 對話結束 ——', zh:'', src:'' },
  }
},

/* ═══════════════════════════════════════════════════════════════
   6. 街上問路（找 les Arènes）
   台詞來源：課本 Édito A1 p.71 聽力逐字稿（Vanessa & Sébastien 攔路人問路）
             ＋課本 p.66「Pour demander/indiquer le chemin」句型框。
   ⭐ 分岔：路人可以叫你走路過去，也可以叫你搭公車——兩條路要問的問題完全不同。
   ═══════════════════════════════════════════════════════════════ */
{
  id: 'chemin',
  icon: '🚇',
  zh: '街上問路',
  fr: 'Demander le chemin',
  exam: '⭐ 聽力最常見的題型（聽方向指令找地點）；口說情境卡也有問路',
  src: '課本 p.66、p.71＋筆記第6、11課',
  roles: { touriste: '🙋 你是問路的人', passant: '🧍 你是被問的路人' },
  speakers: { touriste: 'Le touriste', passant: 'Le monsieur' },
  roleHints: { touriste: '攔人要先 Excusez-moi，這是能不能問到路的關鍵', passant: '換你發指令——命令式（impératif）整段都在這裡' },
  checklist: ['攔住人', '說出要找什麼', '拿到方向', '確認細節', '道謝'],
  start: 'c1',
  nodes: {
    c1: { speaker:'touriste', tip:'先把人攔下來', chk:'攔住人', choices:[
      { fr:'Excusez-moi, monsieur.', zh:'不好意思，先生。', tag:'good', src:'課本 p.71',
        note:'✅ 法國人攔路一定先 <b>Excusez-moi</b>／Pardon——直接開口問會被當作沒禮貌', next:'c2' },
      { fr:'Bonjour !', zh:'您好！', tag:'ok', src:'筆記第1課',
        note:'不算錯，但陌生人在走路，沒有 excusez-moi 攔不住他', next:'c2' },
      { fr:'Oui ?', zh:'什麼事？', tag:'bad', src:'課本 p.71',
        note:'⚠️ 那是<b>被攔下來的人</b>回的話', next:'c2' },
    ]},

    c2: { speaker:'passant', line:'Oui ?', zh:'什麼事？', src:'課本 p.71',
          note:'路人停下來了。接下來 10 秒決定你問不問得到', next:'c3' },

    c3: { speaker:'touriste', tip:'說出你要找的地方', chk:'說出要找什麼', choices:[
      { fr:'On cherche les Arènes.', zh:'我們在找圓形競技場。', tag:'good', src:'課本 p.71',
        note:'✅ <b>on</b> 在口語就是 nous。chercher 直接接地點，不用介係詞', next:'c4' },
      { fr:"Où est l'arrêt de bus, s'il vous plaît ?", zh:'請問公車站在哪裡？', tag:'good', src:'課本 p.66',
        note:'✅ 標準問法。<b>Où est… s\'il vous plaît ?</b> 是問路萬用句', next:'c4' },
      { fr:"C'est loin d'ici ?", zh:'離這裡遠嗎？', tag:'ok', src:'課本 p.71',
        note:'你還沒說要找什麼，對方不知道你在問哪裡遠不遠', next:'c4' },
    ]},

    c4: { speaker:'passant', tip:'⭐ 分岔：叫他走路過去，還是叫他搭公車？', choices:[
      { fr:"Ce n'est pas loin !", zh:'不遠！', tag:'good', src:'課本 p.71',
        note:'✅ 走路可到 → 接下來你要給他走路的方向', next:'d1' },
      { fr:"L'arrêt de bus n'est pas loin.", zh:'公車站不遠。', tag:'good', src:'課本 p.71',
        note:'✅ 建議搭公車 → 接下來要講站牌位置跟路線', next:'b1' },
      { fr:'On cherche les Arènes.', zh:'我們在找圓形競技場。', tag:'bad', src:'課本 p.71',
        note:'⚠️ 那是<b>問路的人</b>說的', next:'d1' },
    ]},

    /* ── 走路線 ── */
    d1: { speaker:'touriste', tip:'確認一下距離', choices:[
      { fr:"C'est loin d'ici ?", zh:'離這裡遠嗎？', tag:'good', src:'課本 p.71',
        note:'✅ 走之前先確認距離，很自然', next:'d2' },
      { fr:'Merci, monsieur !', zh:'謝謝先生！', tag:'ok', src:'課本 p.71',
        note:'太早道謝了——你還沒拿到任何方向', next:'d2' },
    ]},

    d2: { speaker:'passant', tip:'給方向。命令式（impératif）沒有主詞', chk:'拿到方向', choices:[
      { fr:'Prenez la première rue à droite et continuez tout droit sur 100 mètres.', zh:'走第一條街右轉，然後直走100公尺。', tag:'good', src:'課本 p.71',
        note:'✅ 課本原句。<b>Prenez / Continuez</b> 都是命令式 vous 形，直接動詞開頭不放主詞', next:'d3' },
      { fr:'Continuez tout droit.', zh:'一直直走。', tag:'ok', src:'課本 p.66',
        note:'正確但太簡略——對方會不知道要走多遠、在哪轉', next:'d3' },
      { fr:"Où est l'arrêt de bus, s'il vous plaît ?", zh:'請問公車站在哪裡？', tag:'bad', src:'課本 p.66',
        note:'⚠️ 你是被問的人，不是問人的人', next:'d3' },
    ]},

    d3: { speaker:'touriste', tip:'收尾', chk:'道謝', choices:[
      { fr:'Merci, monsieur !', zh:'謝謝先生！', tag:'good', src:'課本 p.71',
        note:'✅ 拿到路了，道謝收尾', next:'end' },
      { fr:"C'est quelle ligne ?", zh:'是哪一線？', tag:'bad', src:'課本 p.71',
        note:'⚠️ 你是用走的，沒有「線」可以問', next:'end' },
    ]},

    /* ── 公車線 ── */
    b1: { speaker:'touriste', tip:'決定改搭公車，問站牌在哪', choices:[
      { fr:"On continue en bus, non ? Où est l'arrêt de bus, s'il vous plaît ?", zh:'我們改搭公車好嗎？請問公車站在哪裡？', tag:'good', src:'課本 p.71＋p.66',
        note:'✅ 先跟同伴確認再問路人。<b>en bus</b>＝搭公車（交通工具用 en，走路才是 à pied）', next:'b2' },
      { fr:"Où est l'arrêt de bus, s'il vous plaît ?", zh:'請問公車站在哪裡？', tag:'good', src:'課本 p.66',
        note:'✅ 直接問也完全可以', next:'b2' },
    ]},

    b2: { speaker:'passant', tip:'給站牌位置', chk:'拿到方向', choices:[
      { fr:"Prenez la première rue à droite et continuez tout droit sur 100 mètres. L'arrêt est juste là.", zh:'走第一條街右轉，直走100公尺。站牌就在那裡。', tag:'good', src:'課本 p.71',
        note:'✅ 課本原句。<b>juste là</b>＝就在那邊', next:'b3' },
      { fr:'Tournez à droite.', zh:'右轉。', tag:'ok', src:'課本 p.66',
        note:'對，但太少資訊——問路的人還是會迷路', next:'b3' },
      { fr:"C'est quelle ligne ?", zh:'是哪一線？', tag:'bad', src:'課本 p.71',
        note:'⚠️ 問路線的是乘客', next:'b3' },
    ]},

    b3: { speaker:'touriste', tip:'還缺一個關鍵資訊', chk:'確認細節', choices:[
      { fr:"C'est quelle ligne ?", zh:'是哪一線？', tag:'good', src:'課本 p.71',
        note:'✅ 找到站牌還不夠，要知道搭哪一線——這一步最常被漏掉', next:'b4' },
      { fr:'Merci, monsieur !', zh:'謝謝先生！', tag:'ok', src:'課本 p.71',
        note:'禮貌，但你還不知道要搭哪一班車', next:'b5' },
    ]},

    b4: { speaker:'passant', line:"C'est la ligne 1.", zh:'1號線。', src:'課本 p.71',
          note:'<b>la ligne 1</b>＝1號線', next:'b5' },

    b5: { speaker:'touriste', tip:'收尾', chk:'道謝', choices:[
      { fr:'Merci, monsieur !', zh:'謝謝先生！', tag:'good', src:'課本 p.71',
        note:'✅ 對陌生人道謝要帶稱謂（monsieur／madame），比只說 merci 有禮貌', next:'end' },
      { fr:'Allons acheter des tickets !', zh:'我們去買票吧！', tag:'ok', src:'課本 p.71',
        note:'這句是對<b>同伴</b>說的（命令式 nous 形），不是對路人。你忘了道謝', next:'end' },
    ]},

    end: { speaker:'system', line:'—— 對話結束 ——', zh:'', src:'' },
  }
},

/* ═══════════════════════════════════════════════════════════════
   7. 打電話訂房
   台詞來源：課本 Édito A1 p.131 聽力逐字稿（Hôtel Atlantique 完整訂房對話）。
   這一段是課本裡資訊密度最高的對話：日期、人數、房型、比較級、價錢、拼名字全部到齊。
   ⭐ 分岔：先問價錢再選房，或直接用比較級選便宜的那一種。
   ═══════════════════════════════════════════════════════════════ */
{
  id: 'hotel',
  icon: '🏨',
  zh: '打電話訂房',
  fr: 'Réserver une chambre',
  exam: '⭐ A2 口說情境卡與聽力常考；寫作 tâche 1 也常要你寫訂房訊息',
  src: '課本 p.131 聽力逐字稿＋筆記第14、25課',
  roles: { touriste: '🙋 你是旅客', receptionniste: '🛎 你是櫃檯' },
  speakers: { touriste: 'Le touriste', receptionniste: 'La réceptionniste' },
  roleHints: { touriste: '電話裡看不到對方，所有資訊都得靠講清楚', receptionniste: '櫃檯要照順序問：日期→人數→房型→細節' },
  checklist: ['說來意', '講日期', '講人數', '選房型', '問細節', '報名字拼字'],
  start: 'h1',
  nodes: {
    h1: { speaker:'receptionniste', line:"Hôtel Atlantique, j'écoute !", zh:'大西洋飯店，您好（我在聽）！',
          src:'課本 p.131', note:'法國飯店接電話的固定開場：<b>店名＋j\'écoute</b>', next:'h2' },

    h2: { speaker:'touriste', tip:'講清楚你要做什麼', chk:'說來意', choices:[
      { fr:'Bonjour, madame. Je voudrais réserver une chambre dans votre hôtel pour les vacances.', zh:'您好女士。我想在貴飯店訂一間房間度假。', tag:'good', src:'課本 p.131',
        note:'✅ <b>je voudrais + 原形</b>＝我想要（做某事），電話訂房的標準開場', next:'h3' },
      { fr:'Bonjour, madame.', zh:'您好女士。', tag:'ok', src:'課本 p.131',
        note:'禮貌有了，但對方不知道你打來做什麼——電話裡沉默成本很高', next:'h3' },
      { fr:"Hôtel Atlantique, j'écoute !", zh:'大西洋飯店，您好！', tag:'bad', src:'課本 p.131',
        note:'⚠️ 那是接電話那一方講的', next:'h3' },
    ]},

    h3: { speaker:'receptionniste', tip:'第一件要確認的事', choices:[
      { fr:'Oui, bien sûr ! À quelles dates ?', zh:'好的，當然！哪幾天呢？', tag:'good', src:'課本 p.131',
        note:'✅ <b>À quelles dates ?</b>＝哪幾號（複數，因為是一段期間）', next:'h4' },
      { fr:'Du 18 au 23 août.', zh:'8月18日到23日。', tag:'bad', src:'課本 p.131',
        note:'⚠️ 客人的答案', next:'h4' },
    ]},

    h4: { speaker:'touriste', tip:'講日期', chk:'講日期', choices:[
      { fr:'Du 18 au 23 août.', zh:'8月18日到23日。', tag:'good', src:'課本 p.131',
        note:'✅ 一段期間用 <b>du… au…</b>（從…到…）', next:'h5' },
      { fr:'Combien elles coûtent ?', zh:'它們多少錢？', tag:'ok', src:'課本 p.131',
        note:'先問價錢也不是不行，但櫃檯還沒辦法報價——她連你要住哪幾天都不知道', next:'h5' },
    ]},

    h5: { speaker:'receptionniste', tip:'接著問什麼？', choices:[
      { fr:"C'est pour combien de personnes ?", zh:'幾個人呢？', tag:'good', src:'課本 p.131',
        note:'✅ <b>combien de + 名詞</b>＝多少個…', next:'h6' },
      { fr:'Nous sommes deux adultes, un enfant et un bébé.', zh:'我們是兩個大人、一個小孩跟一個嬰兒。', tag:'bad', src:'課本 p.131',
        note:'⚠️ 客人的答案', next:'h6' },
    ]},

    h6: { speaker:'touriste', tip:'講人數', chk:'講人數', choices:[
      { fr:'Nous sommes deux adultes, un enfant et un bébé.', zh:'我們是兩個大人、一個小孩跟一個嬰兒。', tag:'good', src:'課本 p.131',
        note:'✅ 人數用 <b>nous sommes + 數字</b>，不是 nous avons', next:'h7' },
      { fr:'Oui, c\'est parfait.', zh:'好，太完美了。', tag:'ok', src:'課本 p.131',
        note:'答非所問——這句是用來確認對方提議的', next:'h7' },
    ]},

    h7: { speaker:'receptionniste', tip:'依人數推薦房型', choices:[
      { fr:'Vous souhaitez une chambre familiale ?', zh:'您想要家庭房嗎？', tag:'good', src:'課本 p.131',
        note:'✅ <b>souhaiter</b>＝希望／想要，比 vouloir 正式，服務業常用', next:'h8' },
      { fr:'Vous voulez une chambre avec vue sur la mer ou une chambre avec vue sur rue ?', zh:'您要海景房還是面街的房間？', tag:'ok', src:'課本 p.131',
        note:'順序跳掉了——先確定房型（幾張床），再問景觀', next:'h9' },
    ]},

    h8: { speaker:'touriste', tip:'回應房型建議', chk:'選房型', choices:[
      { fr:"Oui, c'est parfait.", zh:'好，太完美了。', tag:'good', src:'課本 p.131',
        note:'✅ 接受對方提議最短的一句', next:'h9' },
      { fr:'Combien elles coûtent ?', zh:'它們多少錢？', tag:'ok', src:'課本 p.131',
        note:'可以問，但先答應房型對話比較順', next:'h9' },
    ]},

    h9: { speaker:'receptionniste', line:'Vous voulez une chambre avec vue sur la mer ou une chambre avec vue sur rue ?',
          zh:'您要海景房還是面街的房間？', src:'課本 p.131',
          note:'<b>avec vue sur…</b>＝面向…的景觀', next:'h10' },

    h10: { speaker:'touriste', tip:'⭐ 分岔：先問價錢，還是直接用比較級選？', chk:'選房型', choices:[
      { fr:'Combien elles coûtent ?', zh:'它們多少錢？', tag:'good', src:'課本 p.131',
        note:'✅ 先問價錢再決定——<b>elles</b> 指 les chambres（陰性複數）', next:'h11' },
      { fr:'Je vais prendre une chambre avec vue sur rue, elles sont moins chères que les chambres avec vue sur la mer.', zh:'我要面街的房間，它們比海景房便宜。', tag:'good', src:'課本 p.131',
        note:'✅ 直接用<b>比較級 moins… que…</b>講出理由——第25課的文法用在真實情境', next:'h13' },
    ]},

    h11: { speaker:'receptionniste', tip:'報兩種房價', choices:[
      { fr:'Les chambres avec vue sur la mer sont à 170 euros la nuit, et les chambres avec vue sur rue sont à 140 euros la nuit.', zh:'海景房一晚170歐，面街的房間一晚140歐。', tag:'good', src:'課本 p.131',
        note:'✅ <b>à + 價錢 + la nuit</b>＝一晚多少錢', next:'h12' },
      { fr:'Combien elles coûtent ?', zh:'它們多少錢？', tag:'bad', src:'課本 p.131',
        note:'⚠️ 你是報價的那一方', next:'h12' },
    ]},

    h12: { speaker:'touriste', tip:'選一種，並說出理由', chk:'選房型', choices:[
      { fr:'Je vais prendre une chambre avec vue sur rue, elles sont moins chères que les chambres avec vue sur la mer.', zh:'我要面街的房間，它們比海景房便宜。', tag:'good', src:'課本 p.131',
        note:'✅ <b>moins cher que</b>＝比…便宜。選擇＋理由，考試最愛', next:'h13' },
      { fr:"Oui, c'est parfait.", zh:'好，太完美了。', tag:'ok', src:'課本 p.131',
        note:'櫃檯不知道你選了哪一種——兩個價錢她剛講了兩個房型', next:'h13' },
    ]},

    h13: { speaker:'touriste', tip:'訂房前該問的細節', chk:'問細節', choices:[
      { fr:'Le petit déjeuner est compris ?', zh:'早餐有含嗎？', tag:'good', src:'課本 p.131',
        note:'✅ <b>compris</b>＝包含在內。訂房必問的一句', next:'h14' },
      { fr:'Et il y a un parking privé ?', zh:'有私人停車場嗎？', tag:'good', src:'課本 p.131',
        note:'✅ 開車去的話這句必問', next:'h15' },
      { fr:"Je ne connais pas la région, qu'est-ce qu'on peut faire ?", zh:'我不熟這個地區，可以做些什麼？', tag:'ok', src:'課本 p.131',
        note:'很好的問題，但訂房還沒定案——先把房間確定再聊行程', next:'h16' },
    ]},

    h14: { speaker:'receptionniste', line:"Non, c'est 7,50 euros par jour et par personne.",
           zh:'沒有，一人一天7.5歐。', src:'課本 p.131',
           note:'<b>par jour et par personne</b>＝每人每天', next:'h15' },

    h15: { speaker:'receptionniste', tip:'回答停車問題', choices:[
      { fr:"Non, mais il y a un parking public à côté de l'hôtel.", zh:'沒有，但飯店旁邊有公共停車場。', tag:'good', src:'課本 p.131',
        note:'✅ 沒有也要給替代方案——<b>à côté de</b>＝在…旁邊', next:'h16' },
      { fr:'La mer est à 10 minutes à pied.', zh:'海邊走路10分鐘。', tag:'ok', src:'課本 p.131',
        note:'資訊很好，但客人問的是停車', next:'h16' },
    ]},

    h16: { speaker:'touriste', tip:'拍板訂下去', choices:[
      { fr: "D'accord, alors je réserve une chambre.", zh:'好，那我訂一間房。', tag:'good', src:'課本 p.131',
        note:'✅ <b>alors</b>＝那麼（做決定的連接詞）', next:'h17' },
      { fr: "Oui, c'est parfait.", zh:'好，太完美了。', tag:'ok', src:'課本 p.131',
        note:'櫃檯還在等你說「要訂」——電話裡要講得比面對面更明確', next:'h17' },
    ]},

    h17: { speaker:'receptionniste', tip:'訂房最後一件事', choices:[
      { fr: "À quel nom s'il vous plaît ?", zh:'請問訂位大名？', tag:'good', src:'課本 p.131',
        note:'✅ <b>à quel nom</b>＝用誰的名字訂', next:'h18' },
      { fr: "D'accord, alors je réserve une chambre.", zh:'好，那我訂一間房。', tag:'bad', src:'課本 p.131',
        note:'⚠️ 客人的台詞', next:'h18' },
    ]},

    h18: { speaker:'touriste', tip:'⚠️ 電話裡報名字一定要拼——這就是口說考試第一部分那一題', chk:'報名字拼字', choices:[
      { fr: "Je m'appelle Owen. Ça s'écrit O-W-E-N.", zh:'我叫 Owen，拼作 O-W-E-N。', tag:'good', src:'筆記第17課',
        note:'✅ 不用等對方問就主動拼——電話裡對方看不到你，這是唯一保險的做法', next:'h19' },
      { fr: "Je m'appelle Owen.", zh:'我叫 Owen。', tag:'ok', src:'筆記第17課',
        note:'對方一定會再問 Comment ça s\'écrit ?，等於多一輪', next:'h19' },
    ]},

    h19: { speaker:'receptionniste', line:"C'est noté ! Bonne journée, monsieur !", zh:'記下來了！祝您有美好的一天，先生！',
           src:'課本 p.131', note:'<b>C\'est noté</b>＝記下來了，服務業高頻', next:'h20' },

    h20: { speaker:'touriste', tip:'掛電話', choices:[
      { fr:'Merci. À bientôt !', zh:'謝謝。回頭見！', tag:'good', src:'課本 Unité 6',
        note:'✅ 之後會再見面（你要去住），<b>À bientôt</b> 剛好', next:'end' },
      { fr:'Bonne journée !', zh:'祝你有美好的一天！', tag:'good', src:'筆記第1課',
        note:'✅ 對方說什麼你就回什麼', next:'end' },
      { fr:'À demain !', zh:'明天見！', tag:'bad', src:'筆記第1課',
        note:'⚠️ 你是8月18日才到，不是明天', next:'end' },
    ]},

    end: { speaker:'system', line:'—— 對話結束 ——', zh:'', src:'' },
  }
},

/* ═══════════════════════════════════════════════════════════════
   8. 看醫生
   台詞來源：課本 Édito A1 p.117 的兩段聽力逐字稿（Dialogue 1 感冒／Dialogue 2 膝蓋痛）。
   ⭐ 分岔就是課本的兩段對話：你要演哪一種病人，決定醫生問你什麼。
   ⚠️ 這個場景對 Owen 有雙重意義：他是牙醫，「醫療對話」是他本行的法文版本。
   ═══════════════════════════════════════════════════════════════ */
{
  id: 'medecin',
  icon: '🏥',
  zh: '看醫生',
  fr: 'Chez le médecin',
  exam: '⭐ 口說情境卡與聽力常考；avoir mal à + 身體部位是必考結構',
  src: '課本 p.117 聽力逐字稿（兩段）＋筆記第12、13課',
  roles: { patient: '🙋 你是病人', docteure: '🩺 你是醫生' },
  speakers: { patient: 'Le patient', docteure: 'La docteure' },
  roleHints: { patient: '講清楚哪裡痛、從什麼時候開始——考試就考這兩件事', docteure: '醫生要一路追問：睡得好嗎、發燒嗎、咳嗽嗎、吃藥了嗎' },
  checklist: ['打招呼', '說出症狀', '回答追問', '聽懂處方', '結束看診'],
  start: 'm1',
  nodes: {
    m1: { speaker:'patient', tip:'進診間打招呼。法國人會加上職稱', chk:'打招呼', choices:[
      { fr:'Bonjour docteure.', zh:'醫生您好。', tag:'good', src:'課本 p.117',
        note:'✅ 法國人跟醫生、老師、律師講話會<b>把職稱當稱謂用</b>。女醫生是 docteure', next:'m2' },
      { fr:'Bonjour !', zh:'您好！', tag:'ok', src:'筆記第1課',
        note:'不算錯，但加上 docteure 更得體', next:'m2' },
      { fr:'Bonjour, monsieur !', zh:'先生您好！', tag:'bad', src:'課本 p.117',
        note:'⚠️ 對方是女醫生，而且這句是<b>醫生對你</b>說的稱呼', next:'m2' },
    ]},

    m2: { speaker:'docteure', line:"Bonjour, monsieur ! Qu'est-ce qui vous arrive ?", zh:'先生您好！您怎麼了？',
          src:'課本 p.117', note:'<b>Qu\'est-ce qui vous arrive ?</b>＝您怎麼了（字面：什麼事情發生在您身上）', next:'m3' },

    m3: { speaker:'patient', tip:'⭐ 分岔：你今天是感冒，還是運動受傷？', chk:'說出症狀', choices:[
      { fr: "Eh bien… J'ai un rhume, j'ai mal à la gorge et à la tête. Ça a commencé hier.", zh:'嗯…我感冒了，喉嚨痛、頭痛。昨天開始的。', tag:'good', src:'課本 p.117',
        note:'✅ 三件事一次講完：病名＋部位＋<b>從什麼時候開始</b>。avoir mal à + 部位（à la gorge / à la tête）', next:'r1' },
      { fr: "J'ai fait un footing il y a deux jours et j'ai eu mal au genou.", zh:'我兩天前去慢跑，然後膝蓋痛。', tag:'good', src:'課本 p.117',
        note:'✅ 用 passé composé 講經過＋<b>il y a deux jours</b>（兩天前）。mal au genou（陽性→au）', next:'g1' },
      { fr: "Qu'est-ce qui vous arrive ?", zh:'您怎麼了？', tag:'bad', src:'課本 p.117',
        note:'⚠️ 醫生的台詞', next:'r1' },
    ]},

    /* ── 感冒線 ── */
    r1: { speaker:'docteure', tip:'醫生開始追問', choices:[
      { fr:'Et vous avez passé une bonne nuit ?', zh:'那您昨晚睡得好嗎？', tag:'good', src:'課本 p.117',
        note:'✅ <b>passer une bonne nuit</b>＝睡了一個好覺', next:'r2' },
      { fr:"Ben, j'ai dormi dix heures !", zh:'呃，我睡了十小時！', tag:'bad', src:'課本 p.117',
        note:'⚠️ 病人的答案', next:'r2' },
    ]},

    r2: { speaker:'patient', tip:'回答睡得如何', chk:'回答追問', choices:[
      { fr: "Ben, j'ai dormi dix heures ! J'ai eu de la fièvre cette nuit…", zh:'呃，我睡了十小時！我昨晚發燒了…', tag:'good', src:'課本 p.117',
        note:'✅ 主動多講一個症狀。<b>avoir de la fièvre</b>＝發燒（不定量冠詞）', next:'r3' },
      { fr:'Un peu.', zh:'一點點。', tag:'ok', src:'課本 p.117',
        note:'太短了。看診時資訊給得越少，醫生越難判斷', next:'r3' },
    ]},

    r3: { speaker:'docteure', tip:'追問發燒', choices:[
      { fr:'Et vous avez encore de la fièvre ce matin ?', zh:'那您今天早上還有發燒嗎？', tag:'good', src:'課本 p.117',
        note:'✅ <b>encore</b>＝還（持續中）', next:'r4' },
      { fr:'Est-ce que vous avez mal aux oreilles ?', zh:'您耳朵會痛嗎？', tag:'good', src:'課本 p.117',
        note:'✅ 也是課本裡醫生問的。<b>aux oreilles</b>（複數→aux）', next:'r5' },
    ]},

    r4: { speaker:'patient', tip:'回答體溫', chk:'回答追問', choices:[
      { fr:"Oui, j'ai 39.", zh:'有，39度。', tag:'good', src:'課本 p.117',
        note:'✅ 講體溫直接 <b>j\'ai + 數字</b>，不用說 degrés 也聽得懂', next:'r5' },
      { fr:'Non.', zh:'沒有。', tag:'ok', src:'課本 p.117',
        note:'如果真的退燒了就這樣答；但你剛說昨晚發燒，醫生會想確認數字', next:'r5' },
    ]},

    r5: { speaker:'docteure', tip:'再確認一個症狀', choices:[
      { fr:'Vous toussez ?', zh:'您有咳嗽嗎？', tag:'good', src:'課本 p.117',
        note:'✅ <b>tousser</b>＝咳嗽（la toux＝咳嗽這個名詞）', next:'r6' },
      { fr:'Un peu.', zh:'一點點。', tag:'bad', src:'課本 p.117',
        note:'⚠️ 病人的答案', next:'r6' },
    ]},

    r6: { speaker:'patient', tip:'回答咳嗽', chk:'回答追問', choices:[
      { fr:'Un peu.', zh:'一點點。', tag:'good', src:'課本 p.117',
        note:'✅ 這種一問一答就該短——不是每題都要講長', next:'r7' },
      { fr:'Non.', zh:'沒有。', tag:'good', src:'課本 p.117',
        note:'✅ 沒有就說沒有', next:'r7' },
    ]},

    r7: { speaker:'docteure', tip:'開藥前最後一問', choices:[
      { fr:'Et vous avez pris des médicaments ?', zh:'那您有吃藥了嗎？', tag:'good', src:'課本 p.117',
        note:'✅ prendre 的過去分詞是 <b>pris</b>（第17課不規則分詞表）', next:'r8' },
      { fr:'Vous êtes souvent malade ?', zh:'您常生病嗎？', tag:'ok', src:'課本 p.117',
        note:'課本後面才問這句——先確認吃過什麼藥比較急', next:'r8' },
    ]},

    r8: { speaker:'patient', tip:'回答有沒有吃藥', chk:'回答追問', choices:[
      { fr:'Non.', zh:'沒有。', tag:'good', src:'課本 p.117',
        note:'✅', next:'r9' },
      { fr:'Je bois un litre par jour.', zh:'我一天喝一公升。', tag:'bad', src:'課本 p.117',
        note:'⚠️ 那是回答「喝多少水」的', next:'r9' },
    ]},

    r9: { speaker:'docteure', line:'Alors, vous allez prendre du paracétamol, du sirop pour la toux et un médicament pour le rhume. Vous buvez beaucoup d\'eau ?',
          zh:'那您要吃普拿疼、咳嗽糖漿跟一個感冒藥。您水喝得多嗎？', src:'課本 p.117',
          note:'處方全部用 <b>du / un</b> 不定量冠詞；<b>vous allez prendre</b> 是近未來', next:'r10' },

    r10: { speaker:'patient', tip:'回答喝水量', chk:'聽懂處方', choices:[
      { fr:'Je bois un litre par jour.', zh:'我一天喝一公升。', tag:'good', src:'課本 p.117',
        note:'✅ <b>par jour</b>＝每天。boire 的 je 形是 bois（第17課糾正過你的那個動詞）', next:'r11' },
      { fr:'Un peu.', zh:'一點點。', tag:'ok', src:'課本 p.117',
        note:'醫生要的是數字，這樣她沒辦法給建議', next:'r11' },
    ]},

    r11: { speaker:'docteure', tip:'給最後的建議', chk:'結束看診', choices:[
      { fr:'Buvez 1,5 litre par jour, minimum. C\'est important.', zh:'每天至少喝1.5公升。這很重要。', tag:'good', src:'課本 p.117',
        note:'✅ <b>Buvez</b> 是命令式——醫生給指令的標準語氣', next:'end' },
      { fr:'Je bois un litre par jour.', zh:'我一天喝一公升。', tag:'bad', src:'課本 p.117',
        note:'⚠️ 病人的台詞', next:'end' },
    ]},

    /* ── 膝蓋線 ── */
    g1: { speaker:'docteure', tip:'先問現在的狀況', choices:[
      { fr:'Et vous vous sentez comment aujourd\'hui ?', zh:'那您今天覺得怎麼樣？', tag:'good', src:'課本 p.117',
        note:'✅ <b>se sentir</b>（反身動詞）＝覺得（身體狀態）', next:'g2' },
      { fr:'Vous toussez ?', zh:'您有咳嗽嗎？', tag:'ok', src:'課本 p.117',
        note:'他是膝蓋痛，不是感冒——問診要跟著症狀走', next:'g2' },
    ]},

    g2: { speaker:'docteure', tip:'講評這個運動', choices:[
      { fr:'Ah ! La course à pied… Vous avez choisi un sport difficile pour les genoux !', zh:'啊！跑步…您選了一個對膝蓋很吃力的運動！', tag:'good', src:'課本 p.117',
        note:'✅ <b>la course à pied</b>＝跑步這項運動（faire un footing＝去跑一次）', next:'g3' },
      { fr:'Vous pesez combien ?', zh:'您體重多少？', tag:'ok', src:'課本 p.117',
        note:'醫生確實會問，但先回應他講的事再問數據比較自然', next:'g3' },
    ]},

    g3: { speaker:'docteure', tip:'問身體數據', choices:[
      { fr:'Vous pesez combien ?', zh:'您體重多少？', tag:'good', src:'課本 p.117',
        note:'✅ <b>peser</b>＝重…（動詞，不用 avoir）', next:'g4' },
      { fr:'Je pèse 60 kg.', zh:'我60公斤。', tag:'bad', src:'課本 p.117',
        note:'⚠️ 病人的答案', next:'g4' },
    ]},

    g4: { speaker:'patient', tip:'報體重', chk:'回答追問', choices:[
      { fr:'Je pèse 60 kg.', zh:'我60公斤。', tag:'good', src:'筆記第12課',
        note:'✅ <b>je pèse</b>（peser 的 e→è 變化，跟 acheter 同一組）', next:'g5' },
      { fr:'Oui.', zh:'是。', tag:'bad', src:'課本 p.117',
        note:'⚠️ 這是問數字的問題，不是 oui/non 問句', next:'g5' },
    ]},

    g5: { speaker:'docteure', tip:'再問一項', choices:[
      { fr:'Et quelle est votre taille ?', zh:'那您身高多少？', tag:'good', src:'課本 p.117',
        note:'✅ <b>taille</b> 一詞兩用：買衣服是「尺寸」，看醫生是「身高」', next:'g6' },
      { fr:"D'accord… Et vous avez de bonnes baskets ?", zh:'好…那您有好的運動鞋嗎？', tag:'good', src:'課本 p.117',
        note:'✅ 跑步問鞋子很合理。<b>de</b> bonnes baskets——形容詞放前面時 des 要縮成 de（第19課）', next:'g7' },
    ]},

    g6: { speaker:'docteure', tip:'問裝備', choices:[
      { fr: "D'accord… Et vous avez de bonnes baskets ?", zh:'好…那您有好的運動鞋嗎？', tag:'good', src:'課本 p.117',
        note:'✅ 注意 <b>de bonnes</b> 不是 des bonnes', next:'g7' },
      { fr:'Vous pesez combien ?', zh:'您體重多少？', tag:'bad', src:'課本 p.117',
        note:'⚠️ 剛剛問過了', next:'g7' },
    ]},

    g7: { speaker:'patient', tip:'回答', chk:'回答追問', choices:[
      { fr:'Oui.', zh:'有。', tag:'good', src:'筆記第1課',
        note:'✅ 是非題就短答', next:'g8' },
      { fr:'Non.', zh:'沒有。', tag:'good', src:'筆記第1課',
        note:'✅ 也可以——醫生會叫你去買', next:'g8' },
    ]},

    g8: { speaker:'docteure', line:'Bon, vous allez passer une radio du genou.', zh:'好，您要去照一下膝蓋的X光。',
          src:'課本 p.117', chk:'聽懂處方', note:'<b>passer une radio</b>＝去照X光（passer＝接受某項檢查）', next:'g9' },

    g9: { speaker:'patient', tip:'接受醫囑，結束看診', chk:'結束看診', choices:[
      { fr:"D'accord, docteure.", zh:'好的，醫生。', tag:'good', src:'課本 p.117',
        note:'✅ 回話帶上職稱，跟開場的 Bonjour docteure 對稱', next:'end' },
      { fr:'Un peu.', zh:'一點點。', tag:'bad', src:'課本 p.117',
        note:'⚠️ 答非所問——醫生在下指令，不是在問症狀', next:'end' },
    ]},

    end: { speaker:'system', line:'—— 對話結束 ——', zh:'', src:'' },
  }
},
];
if (typeof module !== 'undefined') module.exports = { SCENES };
