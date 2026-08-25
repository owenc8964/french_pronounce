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
  lvl: 'A1',
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
  lvl: 'A1',
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
          src:'筆記第17課', note:'考官一開口就是這句。課本 p.166 的官方範例也是它',
          alts:[{ fr:'Bonjour ! Vous vous appelez comment ?', zh:'您好！您叫什麼名字？',
                  src:'DELF A1 官方考官文件',
                  note:'⚠️ 同一個問題的<b>另一種問法</b>——疑問詞丟到句尾是口語的問法，考官兩種都會用' }],
          next:'e2' },

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
      { fr:"Votre nom, comment ça s'écrit ?", zh:'您的姓怎麼拼？', tag:'good', src:'DELF A1 官方考官文件',
        note:'✅ 官方考官文件列的問法——<b>先把主題丟出來再問</b>，法文很愛這個結構', next:'e4' },
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
      { fr:'Est-ce que vous avez des enfants ?', zh:'您有小孩嗎？', tag:'good', src:'DELF A1 官方考官文件',
        note:'✅ 官方文件示範「situation familiale 卡」可以怎麼問。<b>Est-ce que</b> 開頭是最保險的問句結構', next:'e12' },
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
      { fr:'Vous avez des enfants ? Quel âge ont-ils ?', zh:'您有小孩嗎？他們幾歲？', tag:'good', src:'DELF A1 官方考官文件',
        note:'✅ 官方考官文件的連問——<b>考官會一次丟兩題</b>，你要兩題都答到', next:'e12' },
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
      { fr:"Parlez-moi d'une journée habituelle.", zh:'跟我講講您平常的一天。', tag:'good', src:'DELF A1 官方考官文件',
        note:'✅ <b>開放題</b>比問句難——考官不給結構，你要自己從起床講到晚上', next:'e14' },
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
      { fr:'Qu\'est-ce que vous faites le samedi et le dimanche ?', zh:'您週六跟週日做什麼？', tag:'good', src:'DELF A1 官方考官文件',
        note:'✅ 官方問法的完整版。<b>le samedi</b>＝每個星期六（定冠詞＋星期＝習慣）', next:'e21' },
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
  lvl: 'A1',
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
  lvl: 'A1',
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
  lvl: 'A1',
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
  lvl: 'A1',
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
  lvl: 'A1',
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
  lvl: 'A1',
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

/* ═══════════════════════════════════════════════════════════════
   ⬇⬇ 以下四個是 **A2 課本**（Édito A2）的逐字稿——Owen 現在的真實程度。
      前面八個大多來自 A1，句子短、資訊少；A2 這批開始出現
      「請對方推薦」「問這道菜是什麼」「問租金含不含水電」這種**要協商的對話**，
      也就是 DELF A2 口說第三部分真正的難度。
   ⚠️ A2 Cahier（`EditoA2 2022 Cahier .pdf`）是掃描檔，抽不到文字，這批只用了 A2 課本。
   ═══════════════════════════════════════════════════════════════ */

/* 9. 藥局（A2 課本 p.102「Chez la pharmacienne」）
   跟第 8 個場景「看醫生」是一組：醫生那邊是 A1 的簡單問診，
   藥師這邊是 A2——你要**自己描述症狀、聽懂建議、還會被推薦偏方**。 */
{
  id: 'pharmacie',
  lvl: 'A2',
  icon: '💊',
  zh: '藥局買成藥',
  fr: 'Chez la pharmacienne',
  exam: '⭐ A2 口說情境卡高頻；聽力也常考（listening.html 就有藥局真人音檔）',
  src: '課本 A2 p.102 逐字稿＋筆記第12、13課',
  roles: { client: '🙋 你是客人', pharmacienne: '💊 你是藥師' },
  speakers: { client: 'M. Rousseau', pharmacienne: 'La pharmacienne' },
  roleHints: { client: '法國看醫生要等，小病先進藥局——這場比看醫生更常用', pharmacienne: '藥師要問到足夠資訊才敢給藥：喉嚨、咳嗽、發燒一路問下去' },
  checklist: ['說出不舒服', '描述症狀', '回答追問', '聽懂建議', '付款告別'],
  start: 'ph1',
  nodes: {
    ph1: { speaker:'pharmacienne', line:'Bonjour monsieur Rousseau. Qu\'est-ce que je peux faire pour vous ?',
           zh:'Rousseau 先生您好。有什麼我可以幫您的嗎？', src:'課本 A2 p.102',
           note:'<b>Qu\'est-ce que je peux faire pour vous ?</b> 是服務業的萬用開場，比「您要什麼」客氣得多', next:'ph2' },

    ph2: { speaker:'client', tip:'說出你不舒服', chk:'說出不舒服', choices:[
      { fr:'Bonjour, voilà je suis un peu patraque en ce moment.', zh:'您好，是這樣的，我最近有點不舒服。', tag:'good', src:'課本 A2 p.102',
        note:'✅ <b>patraque</b>＝不太舒服（口語，講不出具體病名時最好用）；<b>voilà</b> 在句首＝「是這樣的」，法國人開場的緩衝詞', next:'ph3' },
      { fr:'Bonjour !', zh:'您好！', tag:'ok', src:'筆記第1課',
        note:'禮貌有了，但藥師還不知道你哪裡不舒服', next:'ph3' },
      { fr:'Qu\'est-ce que je peux faire pour vous ?', zh:'有什麼我可以幫您的嗎？', tag:'bad', src:'課本 A2 p.102',
        note:'⚠️ 那是<b>藥師</b>的台詞', next:'ph3' },
    ]},

    ph3: { speaker:'pharmacienne', tip:'你是藥師。先問清楚是什麼問題', choices:[
      { fr:'Qu\'est-ce qui ne va pas ?', zh:'哪裡不舒服？', tag:'good', src:'課本 A2 p.102',
        note:'✅ 字面是「什麼東西不對勁」——比 Qu\'est-ce que vous avez ? 更關心人', next:'ph4' },
      { fr:'Je me sens fatigué.', zh:'我覺得很累。', tag:'bad', src:'課本 A2 p.102',
        note:'⚠️ 客人的答案', next:'ph4' },
    ]},

    ph4: { speaker:'client', tip:'⭐ 分岔：好好描述症狀，還是直接說你要能緩解的東西？', chk:'描述症狀', choices:[
      { fr:'Je me sens fatigué. J\'ai le nez bouché, j\'ai mal à la tête.', zh:'我覺得很累。我鼻塞、頭痛。', tag:'good', src:'課本 A2 p.102',
        note:'✅ 三個症狀一次講完。<b>avoir le nez bouché</b>＝鼻塞（bouché＝被塞住的）；se sentir + 形容詞＝覺得…', next:'ph5' },
      { fr:'J\'ai rendez-vous après-demain mais j\'aimerais quelque chose qui me soulage un peu.', zh:'我後天有預約，但我想要能稍微緩解的東西。', tag:'ok', src:'課本 A2 p.102',
        note:'句子很漂亮（<b>j\'aimerais</b>＝條件式的「我想要」，比 je veux 客氣），但你還沒說哪裡不舒服，藥師沒辦法給藥', next:'ph6' },
    ]},

    ph5: { speaker:'pharmacienne', line:'Oui, vous n\'avez pas très bonne mine. On dirait que vous avez un gros rhume. Vous avez consulté votre médecin ?',
           zh:'嗯，您氣色不太好。看起來像是重感冒。您看過醫生了嗎？', src:'課本 A2 p.102',
           note:'<b>avoir bonne mine</b>＝氣色好；<b>On dirait que…</b>＝看起來像是…（超好用的推測句型）', next:'ph6' },

    ph6: { speaker:'client', tip:'講你的處理進度，並說出你要什麼', chk:'說出不舒服', choices:[
      { fr:'J\'ai rendez-vous après-demain mais j\'aimerais quelque chose qui me soulage un peu.', zh:'我後天有預約，但我想要能稍微緩解的東西。', tag:'good', src:'課本 A2 p.102',
        note:'✅ 「已經約了醫生＋現在先要緩解」——這正是進藥局的標準理由。<b>soulager</b>＝緩解', next:'ph7' },
      { fr:'Non. Ça non.', zh:'沒有，那倒是沒有。', tag:'ok', src:'課本 A2 p.102',
        note:'只回答了「沒看醫生」，沒說你要什麼——藥師會多問一輪', next:'ph7' },
    ]},

    ph7: { speaker:'pharmacienne', tip:'⭐ 分岔：先問喉嚨，還是先問咳嗽？', choices:[
      { fr:'Vous avez mal à la gorge aussi ?', zh:'您喉嚨也痛嗎？', tag:'good', src:'課本 A2 p.102',
        note:'✅ <b>avoir mal à la gorge</b>——à + la 不縮合（只有 à+le→au、à+les→aux）', next:'ph8g' },
      { fr:'Et vous toussez ?', zh:'那您會咳嗽嗎？', tag:'good', src:'課本 A2 p.102',
        note:'✅ tousser 的 vous 形是 toussez', next:'ph8t' },
      { fr:'Oui, quand je mange et quand je bois.', zh:'會，吃東西跟喝東西的時候。', tag:'bad', src:'課本 A2 p.102',
        note:'⚠️ 客人的答案', next:'ph8g' },
    ]},

    ph8g: { speaker:'client', tip:'回答喉嚨的問題', chk:'回答追問', choices:[
      { fr:'Oui, quand je mange et quand je bois.', zh:'會，吃東西跟喝東西的時候。', tag:'good', src:'課本 A2 p.102',
        note:'✅ 不只答「會」，還講<b>什麼時候</b>會痛——這一句就把 A1 跟 A2 分開了', next:'ph9' },
      { fr:'Un peu, mais pas beaucoup.', zh:'一點點，但不嚴重。', tag:'bad', src:'課本 A2 p.102',
        note:'⚠️ 那是回答「會不會咳嗽」的', next:'ph9' },
    ]},

    ph8t: { speaker:'client', tip:'回答咳嗽的問題', chk:'回答追問', choices:[
      { fr:'Un peu, mais pas beaucoup.', zh:'一點點，但不嚴重。', tag:'good', src:'課本 A2 p.102',
        note:'✅ <b>un peu, mais pas beaucoup</b>＝有但不嚴重，法國人很愛這樣修飾', next:'ph9' },
      { fr:'Oui, quand je mange et quand je bois.', zh:'會，吃東西跟喝東西的時候。', tag:'bad', src:'課本 A2 p.102',
        note:'⚠️ 那是回答喉嚨痛的', next:'ph9' },
    ]},

    ph9: { speaker:'pharmacienne', tip:'還有一個一定要問的', choices:[
      { fr:'Et vous avez de la fièvre ?', zh:'那您有發燒嗎？', tag:'good', src:'課本 A2 p.102',
        note:'✅ 發燒是「要不要轉診」的判斷點，藥師一定會問。<b>de la</b> fièvre（不定量冠詞）', next:'ph10' },
      { fr:'Non. Ça non.', zh:'沒有，那倒是沒有。', tag:'bad', src:'課本 A2 p.102',
        note:'⚠️ 客人的答案', next:'ph10' },
    ]},

    ph10: { speaker:'client', tip:'回答發燒', chk:'回答追問', choices:[
      { fr:'Non. Ça non.', zh:'沒有，那倒是沒有。', tag:'good', src:'課本 A2 p.102',
        note:'✅ <b>Ça non.</b>＝「那倒是沒有」，比只說 non 生動', next:'ph11' },
      { fr:'Oui, j\'ai 39.', zh:'有，39度。', tag:'ok', src:'課本 A1 p.117',
        note:'也是正確的答法（A1 課本那段）；但 39 度藥師會叫你直接去看醫生', next:'ph11' },
    ]},

    ph11: { speaker:'pharmacienne', line:'D\'accord. Avant votre rendez-vous chez le médecin, je vous propose un sirop pour la toux et des gouttes pour le nez à l\'eucalyptus.',
            zh:'好的。在您看醫生之前，我建議您咳嗽糖漿跟尤加利的鼻滴劑。', src:'課本 A2 p.102',
            note:'<b>je vous propose…</b>＝我建議您…（藥師/服務業給建議的標準句）；<b>chez le médecin</b>＝在醫生那裡（chez + 人）', next:'ph12' },

    ph12: { speaker:'client', tip:'接受建議', chk:'聽懂建議', choices:[
      { fr:'Très bien.', zh:'很好。', tag:'good', src:'筆記第5課',
        note:'✅ 簡短接受', next:'ph13' },
      { fr:'Merci du conseil.', zh:'謝謝你的建議。', tag:'ok', src:'課本 A2 p.102',
        note:'這句留到最後她給偏方時再用，效果更好', next:'ph13' },
    ]},

    ph13: { speaker:'pharmacienne', tip:'法國藥師還會給居家偏方', choices:[
      { fr:'Vous avez du thym chez vous ?', zh:'您家裡有百里香嗎？', tag:'good', src:'課本 A2 p.102',
        note:'✅ 這是法國藥局很真實的一幕：先賣藥，再教你用香草。<b>chez vous</b>＝在您家', next:'ph14' },
      { fr:'Oui, je crois.', zh:'應該有吧。', tag:'bad', src:'課本 A2 p.102',
        note:'⚠️ 客人的答案', next:'ph14' },
    ]},

    ph14: { speaker:'client', tip:'回答', chk:'回答追問', choices:[
      { fr:'Oui, je crois.', zh:'應該有吧。', tag:'good', src:'課本 A2 p.102',
        note:'✅ <b>je crois</b>＝我想是（不確定時的緩衝），比硬答 oui 誠實', next:'ph15' },
      { fr:'Non. Ça non.', zh:'沒有，那倒是沒有。', tag:'good', src:'課本 A2 p.102',
        note:'✅ 沒有就說沒有', next:'ph15' },
    ]},

    ph15: { speaker:'pharmacienne', line:'Eh bien préparez-vous des infusions de thym avec du miel. Ça vous fera le plus grand bien.',
            zh:'那就給自己泡百里香加蜂蜜的花草茶。這對您非常有幫助。', src:'課本 A2 p.102',
            note:'<b>préparez-vous</b>＝反身動詞的命令式（幫自己準備）；<b>Ça vous fera le plus grand bien</b>＝這對您很有好處', next:'ph16' },

    ph16: { speaker:'client', tip:'她給了額外的建議', chk:'聽懂建議', choices:[
      { fr:'Merci du conseil.', zh:'謝謝你的建議。', tag:'good', src:'課本 A2 p.102',
        note:'✅ <b>merci de + 名詞</b>＝謝謝某件事。人家多給了東西就要多回一句', next:'ph17' },
      { fr:'Très bien.', zh:'很好。', tag:'ok', src:'筆記第5課',
        note:'可以，但她剛給了你不用錢的偏方，值得一句 merci', next:'ph17' },
    ]},

    ph17: { speaker:'pharmacienne', tip:'結帳', choices:[
      { fr:'Ça fera 12 euros 50.', zh:'總共12歐50。', tag:'good', src:'課本 A2 p.102',
        note:'✅ <b>Ça fera…</b>（未來式）是結帳的固定講法，比 ça coûte 更自然', next:'ph18' },
      { fr:'Voilà.', zh:'給您。', tag:'bad', src:'課本 A2 p.102',
        note:'⚠️ 那是客人遞錢時說的', next:'ph18' },
    ]},

    ph18: { speaker:'client', tip:'付錢', chk:'付款告別', choices:[
      { fr:'Voilà.', zh:'給您。', tag:'good', src:'課本 A2 p.102',
        note:'✅ 遞東西給人就一個字：<b>Voilà.</b>', next:'ph19' },
      { fr:'Par carte bancaire.', zh:'刷卡。', tag:'good', src:'筆記第4課',
        note:'✅ 也可以，講付款方式', next:'ph19' },
    ]},

    ph19: { speaker:'pharmacienne', line:'Merci, bonne journée.', zh:'謝謝，祝您有美好的一天。', src:'課本 A2 p.102',
            note:'', next:'ph20' },

    ph20: { speaker:'client', tip:'收尾', chk:'付款告別', choices:[
      { fr:'Au revoir.', zh:'再見。', tag:'good', src:'課本 A2 p.102',
        note:'✅ 課本原句', next:'end' },
      { fr:'Bonne journée !', zh:'祝你有美好的一天！', tag:'good', src:'筆記第1課',
        note:'✅ 回敬同一句也很自然', next:'end' },
      { fr:'À demain !', zh:'明天見！', tag:'bad', src:'筆記第1課',
        note:'⚠️ 你明天又不會再來藥局', next:'end' },
    ]},

    end: { speaker:'system', line:'—— 對話結束 ——', zh:'', src:'' },
  }
},

/* 10. 加勒比餐廳（A2 課本 p.92「Dans un restaurant antillais」）
   跟第 4 個場景「餐廳點餐」（A1）是同一個情境的**升級版**：
   A1 只要說得出「我想要牛排」；A2 要能**問這道菜是什麼、辣不辣、請服務生推薦、選配菜、
   還要處理「甜點只剩一份」這種突發狀況**。 */
{
  id: 'restaurant-a2',
  lvl: 'A2',
  icon: '🌴',
  zh: '餐廳進階（問菜色／請推薦）',
  fr: 'Dans un restaurant antillais',
  exam: '⭐⭐ A2 口說第三部分的難度就在這裡：不是點餐，是**跟服務生協商**',
  src: '課本 A2 p.92 逐字稿',
  roles: { client: '🙋 你是客人', serveur: '🧑‍🍳 你是服務生' },
  speakers: { client: 'Le client', serveur: 'Le serveur' },
  roleHints: { client: '不認識的菜要敢問；問完再決定才不會踩雷', serveur: '服務生要解釋菜色、給建議、還要處理缺貨' },
  checklist: ['點前菜', '問菜色或請推薦', '選配菜', '評價餐點', '點甜點', '處理突發狀況'],
  start: 'q1',
  nodes: {
    q1: { speaker:'serveur', line:'Vous avez choisi ?', zh:'您們選好了嗎？', src:'課本 A2 p.92',
          note:'法國服務生來點餐的第一句，幾乎不會變', next:'q2' },

    q2: { speaker:'client', tip:'點前菜。有特殊要求現在講', chk:'點前菜', choices:[
      { fr:'En entrée, je voudrais des samossas au thon.', zh:'前菜我想要鮪魚咖哩角。', tag:'good', src:'課本 A2 p.92',
        note:'✅ <b>En entrée / En plat / En dessert</b>＝「當作前菜／主菜／甜點」，點整套時的分段講法', next:'q3' },
      { fr:'Et pour moi, une salade tropicale, sans avocat si possible.', zh:'我要熱帶沙拉，可以的話不要酪梨。', tag:'good', src:'課本 A2 p.92',
        note:'✅ <b>sans… si possible</b>＝「可以的話不要…」——提要求最不失禮的包裝，過敏或不吃某樣東西都用它', next:'q3' },
      { fr:'Et après… on ne sait pas encore. Quel est le plat du jour ?', zh:'然後…我們還沒決定。今日主菜是什麼？', tag:'ok', src:'課本 A2 p.92',
        note:'可以，但你跳過了前菜——服務生會不知道要不要先出東西', next:'q4' },
    ]},

    q3: { speaker:'serveur', tip:'記下來', choices:[
      { fr:'C\'est noté.', zh:'記下來了。', tag:'good', src:'課本 A2 p.92',
        note:'✅ <b>C\'est noté.</b> 服務業萬用：記下來了／收到', next:'q4' },
      { fr:'Vous avez choisi ?', zh:'您們選好了嗎？', tag:'ok', src:'課本 A2 p.92',
        note:'他剛剛才點完前菜，再問一次會讓客人以為你沒聽到', next:'q4' },
    ]},

    q4: { speaker:'client', tip:'⭐ 分岔：自己問今日主菜，還是直接請服務生推薦？', chk:'問菜色或請推薦', choices:[
      { fr:'Et après… on ne sait pas encore. Quel est le plat du jour ?', zh:'然後…我們還沒決定。今日主菜是什麼？', tag:'good', src:'課本 A2 p.92',
        note:'✅ 承認還沒決定不丟臉——<b>on ne sait pas encore</b> 給自己爭取時間', next:'q5a' },
      { fr:'Qu\'est-ce que vous me conseillez ?', zh:'您推薦我什麼？', tag:'good', src:'課本 A2 p.92',
        note:'✅ <b>conseiller</b>＝建議。這一句是 A2 口說的高分句：把球丟給對方，你只要聽懂再回應', next:'q5b' },
    ]},

    /* ── 問今日主菜 ── */
    q5a: { speaker:'serveur', line:'C\'est un steak de dorade à la sauce maracuja.', zh:'是鯛魚排佐百香果醬。',
           src:'課本 A2 p.92', note:'<b>à la sauce…</b>＝佐…醬（菜名的固定結構）', next:'q6a' },

    q6a: { speaker:'client', tip:'聽到沒聽過的東西，你要問還是要賭？', choices:[
      { fr:'La sauce maracuja, qu\'est-ce que c\'est ? C\'est épicé ?', zh:'百香果醬是什麼？會辣嗎？', tag:'good', src:'課本 A2 p.92',
        note:'✅ <b>…, qu\'est-ce que c\'est ?</b> 是把名詞丟在前面再問——口語最順的問法。不懂就問，這是考試在看的「溝通策略」', next:'q7a' },
      { fr:'Très bien. Je vais prendre ça.', zh:'很好，我就點那個。', tag:'ok', src:'課本 A2 p.92',
        note:'沒問就點，可能踩到不吃的東西——而且你放掉了一次練「問問題」的機會', next:'q9' },
    ]},

    q7a: { speaker:'serveur', tip:'解釋這道醬', choices:[
      { fr:'C\'est une sauce aux fruits de la passion avec du beurre. Ce n\'est pas pimenté, c\'est très doux.', zh:'是百香果加奶油做的醬。不辣，很溫和。', tag:'good', src:'課本 A2 p.92',
        note:'✅ <b>épicé</b>（有香料的）vs <b>pimenté</b>（有辣椒的辣）——法文分得比中文細；<b>doux</b>＝溫和不刺激', next:'q8a' },
      { fr:'Qu\'est-ce que vous me conseillez ?', zh:'您推薦我什麼？', tag:'bad', src:'課本 A2 p.92',
        note:'⚠️ 客人才會這樣問', next:'q8a' },
    ]},

    q8a: { speaker:'client', tip:'決定', chk:'問菜色或請推薦', choices:[
      { fr:'Très bien. Je vais prendre ça.', zh:'很好，我就點那個。', tag:'good', src:'課本 A2 p.92',
        note:'✅ <b>Je vais prendre…</b>（近未來）是點餐最常用的動詞，比 je voudrais 更像決定好了', next:'q9' },
      { fr:'Alors je me laisse tenter par un colombo.', zh:'那我就試試看 colombo 好了。', tag:'ok', src:'課本 A2 p.92',
        note:'句子很漂亮，但 colombo 是另一道菜——你剛剛問的是鯛魚', next:'q9' },
    ]},

    /* ── 請服務生推薦 ── */
    q5b: { speaker:'serveur', tip:'客人請你推薦。給建議要有條件跟理由', choices:[
      { fr:'Si vous aimez la viande, je vous conseille le colombo. C\'est la spécialité de la maison.', zh:'如果您喜歡肉，我推薦 colombo。這是本店招牌。', tag:'good', src:'課本 A2 p.92',
        note:'✅ <b>Si + 現在式, je vous conseille…</b>——第25課的條件句用在真實情境；<b>la spécialité de la maison</b>＝招牌菜', next:'q6b' },
      { fr:'Qu\'est-ce que vous me conseillez ?', zh:'您推薦我什麼？', tag:'bad', src:'課本 A2 p.92',
        note:'⚠️ 你是被問的那一方', next:'q6b' },
    ]},

    q6b: { speaker:'client', tip:'接受推薦', chk:'問菜色或請推薦', choices:[
      { fr:'Alors je me laisse tenter par un colombo.', zh:'那我就試試看 colombo 好了。', tag:'good', src:'課本 A2 p.92',
        note:'✅ <b>se laisser tenter par…</b>＝「被…誘惑到、那就試試看」——超道地，接受推薦時講這句服務生會眼睛一亮', next:'q9' },
      { fr:'Très bien. Je vais prendre ça.', zh:'很好，我就點那個。', tag:'good', src:'課本 A2 p.92',
        note:'✅ 直接一點也完全可以', next:'q9' },
    ]},

    /* ── 合流：配菜 ── */
    q9: { speaker:'serveur', tip:'主菜定了，還有配菜要選', choices:[
      { fr:'Comme accompagnement, vous préférez du riz ou de la salade ?', zh:'配菜您要飯還是沙拉？', tag:'good', src:'課本 A2 p.92',
        note:'✅ <b>Comme accompagnement</b>＝當作配菜（comme＝作為）；二選一給客人最好答', next:'q10' },
      { fr:'De la salade, ça ira très bien.', zh:'沙拉就很好了。', tag:'bad', src:'課本 A2 p.92',
        note:'⚠️ 客人的答案', next:'q10' },
    ]},

    q10: { speaker:'client', tip:'選配菜', chk:'選配菜', choices:[
      { fr:'De la salade, ça ira très bien.', zh:'沙拉就很好了。', tag:'good', src:'課本 A2 p.92',
        note:'✅ <b>ça ira</b>（aller 的未來式）＝「這樣就可以了」，很輕鬆的接受法', next:'q11' },
      { fr:'De la salade, ça ira très bien. Et une carafe d\'eau, s\'il vous plaît.', zh:'沙拉就很好了。再一壺水，麻煩您。', tag:'good', src:'課本 A2 p.92＋筆記第5課',
        note:'✅ 順便把水點掉——法國餐廳的自來水免費，不講就會被送要錢的瓶裝水', next:'q11' },
    ]},

    q11: { speaker:'serveur', tip:'（吃完了）問客人滿不滿意', choices:[
      { fr:'Ça vous a plu ?', zh:'您喜歡嗎？', tag:'good', src:'課本 A2 p.92',
        note:'✅ <b>plaire</b> 的 passé composé：字面是「這個讓您喜歡了嗎」——法文說「喜歡」常常是東西當主詞', next:'q12' },
      { fr:'Oui, c\'était très bon !', zh:'很喜歡，很好吃！', tag:'bad', src:'課本 A2 p.92',
        note:'⚠️ 客人的答案', next:'q12' },
    ]},

    q12: { speaker:'client', tip:'給評價', chk:'評價餐點', choices:[
      { fr:'Oui, c\'était très bon !', zh:'很喜歡，很好吃！', tag:'good', src:'課本 A2 p.92',
        note:'✅ 用 <b>c\'était</b>（imparfait）——飯已經吃完了，講過去的感受。這一格是 A1 跟 A2 的分水嶺', next:'q13' },
      { fr:'C\'est délicieux !', zh:'太美味了！', tag:'ok', src:'筆記第5課',
        note:'還在吃的時候講這句最好；吃完了要用 c\'était', next:'q13' },
    ]},

    q13: { speaker:'serveur', tip:'推甜點', choices:[
      { fr:'Vous prendrez des desserts ?', zh:'您們要甜點嗎？', tag:'good', src:'課本 A2 p.92',
        note:'✅ <b>prendrez</b> 是 futur simple——服務生問「等一下要不要」很自然用未來式', next:'q14' },
      { fr:'C\'est quoi le tourment d\'amour ?', zh:'tourment d\'amour 是什麼？', tag:'bad', src:'課本 A2 p.92',
        note:'⚠️ 客人才會問菜名', next:'q14' },
    ]},

    q14: { speaker:'client', tip:'菜單上有個沒看過的甜點', chk:'點甜點', choices:[
      { fr:'Oui. C\'est quoi le tourment d\'amour ?', zh:'好。tourment d\'amour 是什麼？', tag:'good', src:'課本 A2 p.92',
        note:'✅ <b>C\'est quoi…?</b> 是 Qu\'est-ce que c\'est 的口語版，講話時更常用', next:'q15' },
      { fr:'De la salade, ça ira très bien.', zh:'沙拉就很好了。', tag:'bad', src:'課本 A2 p.92',
        note:'⚠️ 那是剛剛選配菜的答案', next:'q15' },
    ]},

    q15: { speaker:'serveur', line:'C\'est un gâteau à la noix de coco.', zh:'是一種椰子蛋糕。', src:'課本 A2 p.92',
           note:'<b>à la noix de coco</b>＝椰子口味的（à la + 材料＝口味）', next:'q16' },

    q16: { speaker:'client', tip:'決定要不要', choices:[
      { fr:'Super, je vais goûter ça.', zh:'太好了，我來嚐嚐看。', tag:'good', src:'課本 A2 p.92',
        note:'✅ <b>goûter</b>＝嚐嚐看（跟 manger 不同：goûter 帶著好奇）', next:'q17' },
      { fr:'Moi aussi.', zh:'我也是。', tag:'good', src:'課本 A2 p.92',
        note:'✅ 同桌的人跟進就這一句', next:'q17' },
    ]},

    q17: { speaker:'serveur', tip:'⚠️ 只剩一份了，你要怎麼講', choices:[
      { fr:'Ah, euh désolé, il ne m\'en reste qu\'un.', zh:'啊，呃抱歉，我只剩一份了。', tag:'good', src:'課本 A2 p.92',
        note:'✅ 這句擠了三個文法：<b>en</b>（代替 des tourments）、<b>il me reste</b>（我還剩下）、<b>ne… que</b>（只有）。壞消息要先 désolé', next:'q18' },
      { fr:'C\'est noté.', zh:'記下來了。', tag:'bad', src:'課本 A2 p.92',
        note:'⚠️ 你明明沒東西可以出，還說記下來，等一下會出事', next:'q19' },
    ]},

    q18: { speaker:'client', tip:'突發狀況。怎麼化解？', chk:'處理突發狀況', choices:[
      { fr:'C\'est pas grave, on le partagera.', zh:'沒關係，我們分著吃。', tag:'good', src:'課本 A2 p.92',
        note:'✅ <b>C\'est pas grave</b>＝沒關係（口語省略 ne）；<b>partagera</b> 是未來式。遇到問題還能提出解法＝口說高分', next:'q19' },
      { fr:'Ah, euh désolé, il ne m\'en reste qu\'un.', zh:'啊，呃抱歉，我只剩一份了。', tag:'bad', src:'課本 A2 p.92',
        note:'⚠️ 那是服務生剛講的', next:'q19' },
    ]},

    q19: { speaker:'serveur', line:'Ça marche. Je vous l\'apporte.', zh:'沒問題。我幫您送過來。', src:'課本 A2 p.92',
           note:'<b>Ça marche.</b> 這裡是「沒問題／就這麼辦」；<b>Je vous l\'apporte</b> 兩個代名詞連用（vous＝給您、l\'＝那個東西）', next:'end' },

    end: { speaker:'system', line:'—— 對話結束 ——', zh:'', src:'' },
  }
},

/* 11. 看房／合租（A2 課本 p.43「Je suis intéressé par votre annonce」）
   DELF A2 閱讀最愛出租屋廣告，這一場是「看完廣告打電話」的下一步。
   問坪數、格局、吵不吵、租金、含不含水電——每一個都是實際會用到的問題。 */
{
  id: 'logement',
  lvl: 'A2',
  icon: '🏠',
  zh: '看房子／問租屋',
  fr: 'Je suis intéressé par votre annonce',
  exam: '⭐ A2 閱讀最常出租屋廣告；口說也會要你「打電話問一則廣告」',
  src: '課本 A2 p.43 逐字稿＋筆記第11、23、24課',
  roles: { locataire: '🙋 你是想租的人', proprietaire: '🔑 你是房東' },
  speakers: { locataire: 'Thomas', proprietaire: 'La propriétaire' },
  roleHints: { locataire: '問對問題才不會租到雷——坪數、格局、噪音、租金、含不含', proprietaire: '房東要把物件講清楚，還要把人約來看房' },
  checklist: ['說來意', '問坪數格局', '問租金', '問含不含', '約看房'],
  start: 'lo1',
  nodes: {
    lo1: { speaker:'locataire', tip:'打電話來問廣告', chk:'說來意', choices:[
      { fr:'Bonjour, je suis intéressé par votre annonce de coliving à Marseille.', zh:'您好，我對您在馬賽的合租廣告有興趣。', tag:'good', src:'課本 A2 p.43',
        note:'✅ <b>être intéressé par…</b>＝對…有興趣（介係詞是 par，不是 pour）。一句話講完你是誰、為什麼打來', next:'lo2' },
      { fr:'Bonjour !', zh:'您好！', tag:'ok', src:'筆記第1課',
        note:'電話裡只說 Bonjour，對方要多問一輪才知道你要幹嘛', next:'lo2' },
      { fr:'Vous avez déjà fait du coliving ?', zh:'您做過合租嗎？', tag:'bad', src:'課本 A2 p.43',
        note:'⚠️ 那是<b>房東</b>問你的', next:'lo2' },
    ]},

    lo2: { speaker:'proprietaire', tip:'先了解一下對方', choices:[
      { fr:'Bonjour ! Vous avez déjà fait du coliving ?', zh:'您好！您以前住過合租嗎？', tag:'good', src:'課本 A2 p.43',
        note:'✅ <b>déjà</b> ＋ passé composé＝「曾經…過嗎」', next:'lo3' },
      { fr:'Non, mais j\'aime bien l\'idée.', zh:'沒有，但我滿喜歡這個想法。', tag:'bad', src:'課本 A2 p.43',
        note:'⚠️ 那是來電者的答案', next:'lo3' },
    ]},

    lo3: { speaker:'locataire', tip:'回答＋開始問物件', chk:'問坪數格局', choices:[
      { fr:'Non, mais j\'aime bien l\'idée. Je vois sur l\'annonce que la résidence a 18 chambres et studios. C\'est grand ! Quelle est sa superficie ?', zh:'沒有，但我滿喜歡這個想法。我在廣告上看到這棟有18間房跟套房。很大！總面積多少？', tag:'good', src:'課本 A2 p.43',
        note:'✅ 回答＋<b>引用廣告內容</b>＋提問。<b>Je vois sur l\'annonce que…</b> 是很好用的開場（表示你有做功課）；superficie＝面積', next:'lo4' },
      { fr:'Comment elle est organisée ?', zh:'它格局怎麼安排？', tag:'ok', src:'課本 A2 p.43',
        note:'好問題，但你沒回答她剛問的「有沒有住過合租」', next:'lo5' },
    ]},

    lo4: { speaker:'proprietaire', tip:'回答面積', choices:[
      { fr:'Elle fait 760 m².', zh:'760平方公尺。', tag:'good', src:'課本 A2 p.43',
        note:'✅ 講面積用 <b>faire</b>：Elle fait 760 m²（跟講尺寸的 je fais du 40 同一個動詞）', next:'lo5' },
      { fr:'Quelle est sa superficie ?', zh:'總面積多少？', tag:'bad', src:'課本 A2 p.43',
        note:'⚠️ 你是回答的那一方', next:'lo5' },
    ]},

    lo5: { speaker:'locataire', tip:'⭐ 分岔：先問格局，還是直接問租金？', chk:'問坪數格局', choices:[
      { fr:'Comment elle est organisée ?', zh:'它格局怎麼安排？', tag:'good', src:'課本 A2 p.43',
        note:'✅ 先搞懂空間怎麼分，才問得出下一個問題（吵不吵）', next:'lo6' },
      { fr:'D\'accord. Quel est le montant du loyer ?', zh:'好的。租金多少？', tag:'ok', src:'課本 A2 p.43',
        note:'直接問錢也行，但你會漏掉「這房子長什麼樣」這一整段練習', next:'lo9' },
    ]},

    lo6: { speaker:'proprietaire', line:'Au rez-de-chaussée, il y a les espaces communs, avec un grand couloir qui sépare le salon qui fait salle à manger et les cuisines.',
           zh:'一樓是公共空間，有一條大走廊把兼作餐廳的客廳跟廚房隔開。', src:'課本 A2 p.43',
           note:'<b>le rez-de-chaussée</b>＝一樓（法國的「一樓」是 premier étage＝我們的二樓）；<b>qui</b> 關係代名詞連續用兩次（第23課）', next:'lo7' },

    lo7: { speaker:'locataire', tip:'公共空間在樓下——你會擔心什麼？', choices:[
      { fr:'Et c\'est pas trop bruyant ?', zh:'那會不會太吵？', tag:'good', src:'課本 A2 p.43',
        note:'✅ 合租最該問的一題。<b>bruyant</b>＝吵的；口語否定省略 ne（c\'est pas）', next:'lo8' },
      { fr:'D\'accord. Quel est le montant du loyer ?', zh:'好的。租金多少？', tag:'ok', src:'課本 A2 p.43',
        note:'跳過噪音問題——這是搬進去以後最容易後悔的一項', next:'lo9' },
    ]},

    lo8: { speaker:'proprietaire', line:'Non, parce que les chambres sont au premier et au deuxième étages.',
           zh:'不會，因為房間都在二樓跟三樓。', src:'課本 A2 p.43',
           note:'<b>parce que</b> 給理由——房東回答「不會吵」一定要附理由才有說服力', next:'lo9' },

    lo9: { speaker:'locataire', tip:'該問錢了', chk:'問租金', choices:[
      { fr:'D\'accord. Quel est le montant du loyer ?', zh:'好的。租金多少？', tag:'good', src:'課本 A2 p.43',
        note:'✅ <b>le montant du loyer</b>＝租金金額（montant＝金額，帳單、報價都用它）', next:'lo10' },
      { fr:'Est-ce que ça inclut les charges ?', zh:'這有含管理費／水電嗎？', tag:'ok', src:'課本 A2 p.43',
        note:'順序反了——你還不知道租金是多少，就先問含不含', next:'lo11' },
    ]},

    lo10: { speaker:'proprietaire', tip:'報價', choices:[
      { fr:'Les chambres sont à 650 euros par mois et les studios à 1090.', zh:'房間一個月650歐，套房1090。', tag:'good', src:'課本 A2 p.43',
        note:'✅ <b>être à + 價錢</b>＝賣／租多少錢；<b>par mois</b>＝每月', next:'lo11' },
      { fr:'Quel est le montant du loyer ?', zh:'租金多少？', tag:'bad', src:'課本 A2 p.43',
        note:'⚠️ 你是房東，是報價的人', next:'lo11' },
    ]},

    lo11: { speaker:'locataire', tip:'法國租屋一定要問的一句', chk:'問含不含', choices:[
      { fr:'Est-ce que ça inclut les charges ?', zh:'這有含管理費／水電嗎？', tag:'good', src:'課本 A2 p.43',
        note:'✅ <b>les charges</b> 在法國租屋＝水電瓦斯管理等雜費。沒問清楚，帳單會多一大筆', next:'lo12' },
      { fr:'Parfait, quand est-ce que je peux venir visiter ?', zh:'太好了，我什麼時候可以去看房？', tag:'ok', src:'課本 A2 p.43',
        note:'太快了——還沒問含不含就要去看房，去了才發現超出預算', next:'lo13' },
    ]},

    lo12: { speaker:'proprietaire', line:'Oui, toutes les charges : l\'eau, l\'électricité, le gaz et le chauffage, mais aussi l\'abonnement à Internet, l\'assurance et le ménage.',
            zh:'有，全部雜費都含：水、電、瓦斯、暖氣，還有網路、保險跟打掃。', src:'課本 A2 p.43',
            note:'一整串生活帳單詞彙都在這句：<b>le chauffage</b>（暖氣）、<b>l\'abonnement</b>（訂閱／月租）、<b>l\'assurance</b>（保險）、<b>le ménage</b>（打掃）', next:'lo13' },

    lo13: { speaker:'locataire', tip:'資訊問完了，怎麼收？', chk:'約看房', choices:[
      { fr:'Parfait, quand est-ce que je peux venir visiter ?', zh:'太好了，我什麼時候可以去看房？', tag:'good', src:'課本 A2 p.43',
        note:'✅ <b>visiter</b> 看房（visiter 接地方，看戲要用 voir——第19課的區分）。電話的目的就是約到這一步', next:'lo14' },
      { fr:'C\'est noté. À demain !', zh:'記下來了。明天見！', tag:'bad', src:'課本 A2 p.43',
        note:'⚠️ 你們還沒約時間，怎麼會明天見', next:'lo14' },
    ]},

    lo14: { speaker:'proprietaire', tip:'給一個具體時間跟地址', choices:[
      { fr:'Demain à 14 heures ? La maison est au 26 rue des Roses.', zh:'明天下午兩點？房子在玫瑰街26號。', tag:'good', src:'課本 A2 p.43',
        note:'✅ 時間＋地址一次給完。地址用 <b>au + 號碼 + 街名</b>', next:'lo15' },
      { fr:'Parfait, quand est-ce que je peux venir visiter ?', zh:'太好了，我什麼時候可以去看房？', tag:'bad', src:'課本 A2 p.43',
        note:'⚠️ 你是<b>安排時間</b>的那一方，不是問時間的人', next:'lo15' },
    ]},

    lo15: { speaker:'locataire', tip:'收尾', chk:'約看房', choices:[
      { fr:'C\'est noté. À demain !', zh:'記下來了。明天見！', tag:'good', src:'課本 A2 p.43',
        note:'✅ 這次<b>真的</b>是明天見——À demain 用對地方了', next:'end' },
      { fr:'Merci. À bientôt !', zh:'謝謝。回頭見！', tag:'ok', src:'課本 A1 Unité 6',
        note:'不算錯，但你們明天就要見面，講 À demain 更精準', next:'end' },
    ]},

    end: { speaker:'system', line:'—— 對話結束 ——', zh:'', src:'' },
  }
},

/* 12. 旅行社電話（A2 課本 p.141「Allô, j'écoute !」）
   跟第 7 個場景「打電話訂房」是一組，但難度高一階：
   訂房是回答對方的問題；這一場是**你要一路主動問**（住宿、機票含不含、餐食、最佳季節）。 */
{
  id: 'agence',
  lvl: 'A2',
  icon: '✈️',
  zh: '打電話問旅行社',
  fr: 'Le monde en voyages',
  exam: '⭐ A2 口說「向對方取得資訊」的原型題；TEF 口說 Section A 就是這個形態',
  src: '課本 A2 p.141 逐字稿',
  roles: { client: '🙋 你是客人', agent: '📞 你是旅行社' },
  speakers: { client: 'Joan', agent: 'Florence' },
  roleHints: { client: '這一場考的是「你會不會問」——問不出資訊就訂不了行程', agent: '旅行社要把行程、住宿、機票、餐食一項一項講清楚' },
  checklist: ['說來意', '問住宿', '問機票餐食', '問最佳季節', '講日期', '收尾'],
  start: 'ag1',
  nodes: {
    ag1: { speaker:'agent', line:'Le monde en voyages, bonjour ! Florence à votre écoute.',
           zh:'環球旅遊您好！我是 Florence，為您服務。', src:'課本 A2 p.141',
           note:'<b>公司名＋bonjour＋名字 à votre écoute</b>——法國公司接電話的完整三段式', next:'ag2' },

    ag2: { speaker:'client', tip:'講清楚你要什麼', chk:'說來意', choices:[
      { fr:'Bonjour, j\'aimerais faire un voyage au Vietnam avec ma femme et je voudrais avoir des renseignements, s\'il vous plaît.', zh:'您好，我想跟太太去越南旅行，想請教一些資訊。', tag:'good', src:'課本 A2 p.141',
        note:'✅ <b>j\'aimerais</b>＋<b>je voudrais</b> 兩個條件式連用＝非常客氣；<b>des renseignements</b>＝（複數）資訊、諮詢', next:'ag3' },
      { fr:'Bonjour !', zh:'您好！', tag:'ok', src:'筆記第1課',
        note:'電話裡最貴的就是沉默——一次把來意講完', next:'ag3' },
      { fr:'Florence à votre écoute.', zh:'我是 Florence，為您服務。', tag:'bad', src:'課本 A2 p.141',
        note:'⚠️ 那是接電話那一方的台詞', next:'ag3' },
    ]},

    ag3: { speaker:'agent', tip:'接住需求', choices:[
      { fr:'Oui, bien sûr. Il y a un circuit qui vous intéresse ?', zh:'好的，當然。有哪個行程您有興趣嗎？', tag:'good', src:'課本 A2 p.141',
        note:'✅ <b>un circuit</b>＝套裝行程；<b>qui vous intéresse</b> 關係子句（第23課的 qui）', next:'ag4' },
      { fr:'Et les repas sont compris ?', zh:'餐食有含嗎？', tag:'bad', src:'課本 A2 p.141',
        note:'⚠️ 客人才問這個', next:'ag4' },
    ]},

    ag4: { speaker:'client', tip:'⭐ 分岔：先問住哪裡，還是先問機票？', chk:'問住宿', choices:[
      { fr:'Et vous pouvez me donner des précisions sur l\'hébergement ?', zh:'您可以給我住宿方面的細節嗎？', tag:'good', src:'課本 A2 p.141',
        note:'✅ <b>des précisions sur…</b>＝關於…的細節；<b>l\'hébergement</b>＝住宿（比 hôtel 廣，含民宿）', next:'ag5' },
      { fr:'Et est-ce que les vols sont inclus dans le prix du voyage ?', zh:'機票有含在旅費裡嗎？', tag:'good', src:'課本 A2 p.141',
        note:'✅ 先問錢的範圍也很聰明。<b>inclus dans</b>＝包含在…裡面', next:'ag7' },
    ]},

    ag5: { speaker:'agent', line:'Alors, nous proposons à nos clients de dormir chez l\'habitant.',
           zh:'我們讓客人住在當地人家裡。', src:'課本 A2 p.141',
           note:'<b>chez l\'habitant</b>＝住當地民家（chez + 人）——法國旅遊業的固定說法', next:'ag6' },

    ag6: { speaker:'client', tip:'住宿問完了，下一個', chk:'問機票餐食', choices:[
      { fr:'Super ! Et est-ce que les vols sont inclus dans le prix du voyage ?', zh:'太好了！那機票有含在旅費裡嗎？', tag:'good', src:'課本 A2 p.141',
        note:'✅ 先給一個反應（Super !）再問下一題，對話才不像審問', next:'ag7' },
      { fr:'Et les repas sont compris ?', zh:'餐食有含嗎？', tag:'ok', src:'課本 A2 p.141',
        note:'也可以，只是機票通常是最大一筆，先問比較重要', next:'ag9' },
    ]},

    ag7: { speaker:'agent', tip:'回答機票', choices:[
      { fr:'Oui, nous nous occupons de vos billets.', zh:'有的，機票由我們處理。', tag:'good', src:'課本 A2 p.141',
        note:'✅ <b>s\'occuper de…</b>＝負責處理…（反身動詞，nous nous occupons 兩個 nous 都要）', next:'ag8' },
      { fr:'Et est-ce que les vols sont inclus dans le prix du voyage ?', zh:'機票有含在旅費裡嗎？', tag:'bad', src:'課本 A2 p.141',
        note:'⚠️ 你是回答的那一方', next:'ag8' },
    ]},

    ag8: { speaker:'client', tip:'再確認一項花費', chk:'問機票餐食', choices:[
      { fr:'Et les repas sont compris ?', zh:'餐食有含嗎？', tag:'good', src:'課本 A2 p.141',
        note:'✅ <b>compris</b>＝包含（跟訂房那場的 le petit déjeuner est compris 同一個字）', next:'ag9' },
      { fr:'Très bien. Quelle est la meilleure période pour visiter le Vietnam ?', zh:'很好。什麼時候是去越南最好的季節？', tag:'ok', src:'課本 A2 p.141',
        note:'好問題，但你還沒問完錢的部分', next:'ag10' },
    ]},

    ag9: { speaker:'agent', line:'Juste le petit déjeuner. Nous ne proposons pas de pension complète, ni de demi-pension.',
           zh:'只含早餐。我們沒有全食宿，也沒有半食宿。', src:'課本 A2 p.141',
           note:'<b>pension complète</b>＝三餐全包／<b>demi-pension</b>＝含早餐＋一餐。<b>ne… pas… ni…</b>＝既不…也不…', next:'ag10' },

    ag10: { speaker:'client', tip:'還有一個很實際的問題', chk:'問最佳季節', choices:[
      { fr:'Très bien. Quelle est la meilleure période pour visiter le Vietnam ?', zh:'很好。什麼時候是去越南最好的季節？', tag:'good', src:'課本 A2 p.141',
        note:'✅ <b>la meilleure</b>＝bon 的最高級（不是 la plus bonne）——第25、26課的比較級用在這裡', next:'ag11' },
      { fr:'C\'est parfait ! On voulait partir du 15 au 26 septembre.', zh:'太好了！我們本來想9月15到26號去。', tag:'ok', src:'課本 A2 p.141',
        note:'你直接講日期了，但還沒問她哪個季節適合——萬一撞到雨季呢', next:'ag12' },
    ]},

    ag11: { speaker:'agent', line:'En mars, avril et de septembre à novembre.', zh:'三月、四月，還有九月到十一月。',
            src:'課本 A2 p.141', note:'<b>en + 月份</b>＝在某月；<b>de… à…</b>＝從…到…', next:'ag12' },

    ag12: { speaker:'client', tip:'講你想去的日期', chk:'講日期', choices:[
      { fr:'C\'est parfait ! On voulait partir du 15 au 26 septembre.', zh:'太好了！我們本來想9月15到26號去。', tag:'good', src:'課本 A2 p.141',
        note:'✅ <b>on voulait</b>（imparfait）＝「我們本來是想…」——用未完成式講計畫比較婉轉，留給對方調整空間', next:'ag13' },
      { fr:'Du 18 au 23 août.', zh:'8月18到23號。', tag:'ok', src:'課本 A1 p.131',
        note:'日期講法正確，但她剛說最佳季節不含八月——你沒有把聽到的資訊用上', next:'ag13' },
    ]},

    ag13: { speaker:'agent', tip:'收尾：告訴客人接下來會發生什麼', choices:[
      { fr:'C\'est noté. Je vous envoie un devis et je vous rappelle dans 48 heures pour finaliser le voyage.', zh:'記下來了。我寄報價單給您，48小時內再打給您敲定行程。', tag:'good', src:'課本 A2 p.141',
        note:'✅ <b>un devis</b>＝報價單；<b>dans 48 heures</b>＝48小時之內（dans 指未來，跟 il y a 相反——第17課）', next:'ag14' },
      { fr:'Merci beaucoup !', zh:'非常感謝！', tag:'bad', src:'課本 A2 p.141',
        note:'⚠️ 道謝的是客人；你還沒告訴他接下來怎麼進行', next:'ag14' },
    ]},

    ag14: { speaker:'client', tip:'掛電話', chk:'收尾', choices:[
      { fr:'Parfait ! Merci beaucoup !', zh:'太好了！非常感謝！', tag:'good', src:'課本 A2 p.141',
        note:'✅ 課本原句收尾', next:'ag15' },
      { fr:'C\'est noté.', zh:'記下來了。', tag:'ok', src:'課本 A2 p.141',
        note:'可以，但對方剛答應寄報價單，值得一句謝謝', next:'ag15' },
    ]},

    ag15: { speaker:'agent', line:'Avec plaisir !', zh:'很樂意為您服務！', src:'課本 A2 p.141',
            note:'<b>Avec plaisir</b> 在這裡＝「不客氣、樂意之至」，比 de rien 熱情', next:'end' },

    end: { speaker:'system', line:'—— 對話結束 ——', zh:'', src:'' },
  }
},

/* 13. 鄰居／報修（A1 課本 p.112 逐字稿）
   這一場沒有店員也沒有考官，是**兩個陌生鄰居**——語域練習最好的場景：
   要糾正對方（抽菸）又不能撕破臉，然後轉頭還要開口求助（找水電工）。 */
{
  id: 'voisin',
  lvl: 'A1',
  icon: '🏢',
  zh: '鄰居規勸＋報修',
  fr: 'Respectez le règlement',
  exam: '⭐ 口說「處理小衝突」與「請求協助」兩種功能一次練到；A2 寫作也常出投訴/請求訊息',
  src: '課本 A1 p.112 逐字稿＋筆記第11、24課',
  roles: { ancien: '🧍 你是老住戶', nouveau: '📦 你是新搬來的' },
  speakers: { ancien: 'Clément Dupré', nouveau: 'Michel Barbier' },
  roleHints: { ancien: '要糾正對方又不能失禮——法文靠 Excusez-moi 跟 s\'il vous plaît 化解', nouveau: '被糾正怎麼收、然後怎麼開口求助' },
  checklist: ['規勸對方', '接受並道歉', '自我介紹', '開口求助', '拿到聯絡人'],
  start: 'y1',
  nodes: {
    y1: { speaker:'ancien', tip:'有人在公共區域抽電子菸。你要開口', chk:'規勸對方', choices:[
      { fr:"Excusez-moi, monsieur, c'est interdit de fumer dans les parties communes de l'immeuble.", zh:'不好意思先生，大樓公共區域禁止吸菸。', tag:'good', src:'課本 A1 p.112',
        note:'✅ <b>Excusez-moi</b> 開頭讓糾正變成提醒；<b>il est interdit de + 原形</b>＝禁止做…（第11課的禁止句型）', next:'y2' },
      { fr:'Je ne fume pas, je vapote.', zh:'我沒抽菸，我抽電子菸。', tag:'bad', src:'課本 A1 p.112',
        note:'⚠️ 那是<b>被糾正的人</b>講的', next:'y2' },
    ]},

    y2: { speaker:'nouveau', tip:'你抽的是電子菸，不是菸', choices:[
      { fr:'Je ne fume pas, je vapote.', zh:'我沒抽菸，我抽電子菸。', tag:'good', src:'課本 A1 p.112',
        note:'✅ <b>vapoter</b>＝抽電子菸（vapeur 蒸氣來的新字）', next:'y3' },
      { fr:"D'accord. Désolé.", zh:'好的，抱歉。', tag:'ok', src:'課本 A1 p.112',
        note:'直接道歉也可以，但你放棄了解釋的機會', next:'y5' },
    ]},

    y3: { speaker:'ancien', tip:'他在鑽漏洞。堅持但保持禮貌', chk:'規勸對方', choices:[
      { fr:"Fumer ou vapoter, c'est la même chose. Respectez le règlement, s'il vous plaît.", zh:'抽菸還是抽電子菸，都一樣。請遵守規約。', tag:'good', src:'課本 A1 p.112',
        note:'✅ <b>原形動詞當主詞</b>（Fumer ou vapoter…）；命令式＋s\'il vous plaît＝堅定但不失禮', next:'y4' },
      { fr:'Merci pour votre compréhension.', zh:'謝謝您的體諒。', tag:'ok', src:'課本 A1 p.112',
        note:'這句是對方讓步之後才說的——他還沒答應你就先謝，會顯得心虛', next:'y4' },
    ]},

    y4: { speaker:'nouveau', tip:'認了', chk:'接受並道歉', choices:[
      { fr:"D'accord. Désolé.", zh:'好的，抱歉。', tag:'good', src:'課本 A1 p.112',
        note:'✅ 兩個字結束爭執。法國人吵架也常常這樣收', next:'y5' },
      { fr:'Je ne fume pas, je vapote.', zh:'我沒抽菸，我抽電子菸。', tag:'bad', src:'課本 A1 p.112',
        note:'⚠️ 對方已經說「一樣」了，再堅持一次就是找架吵', next:'y5' },
    ]},

    y5: { speaker:'ancien', tip:'化解之後，順便認識一下', chk:'自我介紹', choices:[
      { fr:'Merci pour votre compréhension. Vous êtes notre nouveau voisin ?', zh:'謝謝您的體諒。您是我們的新鄰居嗎？', tag:'good', src:'課本 A1 p.112',
        note:'✅ 先謝再攀談——<b>把衝突轉成認識</b>，這一步是這段對話最漂亮的地方', next:'y6' },
      { fr:'Oui. Michel Barbier.', zh:'是的，我是 Michel Barbier。', tag:'bad', src:'課本 A1 p.112',
        note:'⚠️ 那是新鄰居的回答', next:'y6' },
    ]},

    y6: { speaker:'nouveau', tip:'報上名字', chk:'自我介紹', choices:[
      { fr:'Oui. Michel Barbier.', zh:'是的，我是 Michel Barbier。', tag:'good', src:'課本 A1 p.112',
        note:'✅ 法國人自我介紹常常只講名字，不用整句', next:'y7' },
      { fr:"Enchanté. Moi, c'est Clément Dupré.", zh:'幸會。我是 Clément Dupré。', tag:'bad', src:'課本 A1 p.112',
        note:'⚠️ 那是對方的名字', next:'y7' },
    ]},

    y7: { speaker:'ancien', line:"Enchanté. Moi, c'est Clément Dupré.", zh:'幸會。我是 Clément Dupré。',
          src:'課本 A1 p.112', note:'<b>Moi, c\'est + 名字</b> 是自我介紹最口語的說法（比 je m\'appelle 輕鬆）', next:'y8' },

    y8: { speaker:'nouveau', tip:'⭐ 分岔：先預告你要問事情，還是直接問？', chk:'開口求助', choices:[
      { fr:'Au fait, je voudrais vous demander quelque chose.', zh:'對了，我想請問您一件事。', tag:'good', src:'課本 A1 p.112',
        note:'✅ <b>Au fait</b>＝對了（想到就插話）；先預告再問，對方比較不會覺得突然', next:'y9' },
      { fr:"J'ai une fuite d'eau. Vous avez le numéro de téléphone d'un bon plombier dans le quartier ?", zh:'我家漏水。您有這一區好的水電工的電話嗎？', tag:'ok', src:'課本 A1 p.112',
        note:'直接問也行，只是剛認識就開口求助，加一句緩衝會更自然', next:'y11' },
    ]},

    y9: { speaker:'ancien', line:'Oui, quoi ?', zh:'好啊，什麼事？', src:'課本 A1 p.112',
          note:'<b>Oui, quoi ?</b>＝「什麼事？」——口語到不能再口語', next:'y10' },

    y10: { speaker:'nouveau', tip:'講出你的問題', chk:'開口求助', choices:[
      { fr:"J'ai une fuite d'eau. Vous avez le numéro de téléphone d'un bon plombier dans le quartier ?", zh:'我家漏水。您有這一區好的水電工的電話嗎？', tag:'good', src:'課本 A1 p.112',
        note:'✅ <b>une fuite d\'eau</b>＝漏水；<b>un plombier</b>＝水電工。先講問題再提要求，對方才知道你要幹嘛', next:'y11' },
      { fr:'Oui, quoi ?', zh:'什麼事？', tag:'bad', src:'課本 A1 p.112',
        note:'⚠️ 那是被問的人講的', next:'y11' },
    ]},

    y11: { speaker:'ancien', tip:'給他一個人選', chk:'拿到聯絡人', choices:[
      { fr:'Oui, pour les réparations, vous pouvez appeler monsieur Bernard ! Il les fait très bien.', zh:'有，修東西您可以打給 Bernard 先生！他修得很好。', tag:'good', src:'課本 A1 p.112',
        note:'✅ <b>les réparations</b>＝維修；<b>Il les fait très bien</b> 的 les 代替 les réparations（COD 代名詞，第15課）', next:'y12' },
      { fr:"J'ai une fuite d'eau.", zh:'我家漏水。', tag:'bad', src:'課本 A1 p.112',
        note:'⚠️ 漏水的是對方，不是你', next:'y12' },
    ]},

    y12: { speaker:'nouveau', tip:'還有第二件事要問嗎？', choices:[
      { fr:"Merci. Et j'ai aussi un problème avec une porte, elle ne ferme pas bien, vous connaissez un serrurier pour la réparer ?", zh:'謝謝。我還有一扇門有問題，關不太起來，您認識鎖匠可以修嗎？', tag:'good', src:'課本 A1 p.112',
        note:'✅ 一次問完比分兩次打擾好。<b>un serrurier</b>＝鎖匠；<b>la réparer</b> 的 la 代替 la porte', next:'y13' },
      { fr:"Merci, c'est gentil.", zh:'謝謝，您人真好。', tag:'ok', src:'課本 A1 p.112',
        note:'可以收了，但你還有一扇壞掉的門沒解決', next:'end' },
    ]},

    y13: { speaker:'ancien', tip:'再給一個人選', chk:'拿到聯絡人', choices:[
      { fr:'Bien sûr ! Monsieur Leroy.', zh:'當然！Leroy 先生。', tag:'good', src:'課本 A1 p.112',
        note:'✅ 幫得上忙就爽快答應——<b>Bien sûr</b> 是法國人最常用的「當然」', next:'y14' },
      { fr:"Merci, c'est gentil.", zh:'謝謝，您人真好。', tag:'bad', src:'課本 A1 p.112',
        note:'⚠️ 道謝的是求助的那一方', next:'y14' },
    ]},

    y14: { speaker:'nouveau', tip:'收尾', choices:[
      { fr:"Merci, c'est gentil.", zh:'謝謝，您人真好。', tag:'good', src:'課本 A1 p.112',
        note:'✅ <b>c\'est gentil</b>＝你人真好，法國人受人幫忙的標準回應', next:'end' },
      { fr:'Merci pour votre compréhension.', zh:'謝謝您的體諒。', tag:'ok', src:'課本 A1 p.112',
        note:'那句是用在「請對方讓步」之後，這裡他是<b>幫了你</b>，用 c\'est gentil 才對', next:'end' },
    ]},

    end: { speaker:'system', line:'—— 對話結束 ——', zh:'', src:'' },
  }
},

/* 14. 銀行問開戶（A1 課本 p.114）
   很短，但它是**行政法文**的縮影：一問一答、對方報條件、你要追問「還缺什麼」。
   移民加拿大之後這種對話會天天遇到。 */
{
  id: 'banque',
  lvl: 'A1',
  icon: '🏦',
  zh: '銀行問開戶',
  fr: 'Ouvrir un compte',
  exam: '⭐ 行政情境（TEF 口說 Section A 的典型：向機構取得資訊）',
  src: '課本 A1 p.114 逐字稿',
  roles: { client: '🙋 你是來問的人', employee: '🏦 你是行員' },
  speakers: { client: "L'homme", employee: "L'employée" },
  roleHints: { client: '幫朋友問事情——這是很真實的情境，也考「代第三人稱問」', employee: '行員要把條件一項一項講清楚' },
  checklist: ['說來意', '回答條件', '追問還缺什麼', '道謝'],
  start: 'k1',
  nodes: {
    k1: { speaker:'employee', line:'Banque du Nord, bonjour !', zh:'北方銀行您好！', src:'課本 A1 p.114',
          note:'機構接電話：<b>單位名＋bonjour</b>', next:'k2' },

    k2: { speaker:'client', tip:'講清楚你要問什麼、幫誰問', chk:'說來意', choices:[
      { fr:"Bonjour, madame. Je voudrais avoir des informations pour un ami japonais. Il veut ouvrir un compte dans votre banque.", zh:'您好女士。我想幫一位日本朋友問資訊。他想在貴行開戶。', tag:'good', src:'課本 A1 p.114',
        note:'✅ <b>pour un ami</b>＝幫朋友問；<b>ouvrir un compte</b>＝開戶。第三人稱 il veut，不是 je veux', next:'k3' },
      { fr:'Bonjour, madame.', zh:'您好女士。', tag:'ok', src:'課本 A1 p.114',
        note:'電話裡只打招呼，對方只能再問一次「有什麼事嗎」', next:'k3' },
      { fr:'Banque du Nord, bonjour !', zh:'北方銀行您好！', tag:'bad', src:'課本 A1 p.114',
        note:'⚠️ 那是行員接電話的台詞', next:'k3' },
    ]},

    k3: { speaker:'employee', tip:'開戶第一個條件是什麼？先確認', choices:[
      { fr:'Il habite en France ?', zh:'他住在法國嗎？', tag:'good', src:'課本 A1 p.114',
        note:'✅ 口語問句：<b>直述句＋問號語調</b>，不用倒裝也不用 est-ce que', next:'k4' },
      { fr:"Et une pièce d'identité.", zh:'還有身分證件。', tag:'bad', src:'課本 A1 p.114',
        note:'⚠️ 順序錯了，這是最後才補的條件', next:'k4' },
    ]},

    k4: { speaker:'client', tip:'回答', chk:'回答條件', choices:[
      { fr:'Oui.', zh:'是的。', tag:'good', src:'課本 A1 p.114',
        note:'✅ 是非題就短答，不用整句', next:'k5' },
      { fr:"C'est tout ?", zh:'這樣就好了嗎？', tag:'bad', src:'課本 A1 p.114',
        note:'⚠️ 對方在問你問題，先回答再追問', next:'k5' },
    ]},

    k5: { speaker:'employee', line:"Il doit avoir un justificatif de domicile. Une facture d'électricité ou de téléphone, par exemple.",
          zh:'他要有居住證明。例如電費單或電話帳單。', src:'課本 A1 p.114',
          note:'<b>devoir + 原形</b>＝必須；<b>un justificatif de domicile</b>＝居住證明（法國辦任何事都要這個）', next:'k6' },

    k6: { speaker:'client', tip:'只要這樣嗎？', chk:'追問還缺什麼', choices:[
      { fr:"C'est tout ?", zh:'這樣就好了嗎？', tag:'good', src:'課本 A1 p.114',
        note:'✅ 兩個字問完「還缺什麼」——辦行政手續一定要問這句，不然白跑一趟', next:'k7' },
      { fr:'Merci beaucoup !', zh:'非常感謝！', tag:'ok', src:'課本 A1 p.114',
        note:'你就這樣掛了？行員還有一項沒講', next:'end' },
    ]},

    k7: { speaker:'employee', tip:'還有一項', choices:[
      { fr:"Et une pièce d'identité.", zh:'還有身分證件。', tag:'good', src:'課本 A1 p.114',
        note:'✅ <b>une pièce d\'identité</b>＝身分證件（護照、身分證都算）', next:'k8' },
      { fr:"C'est tout ?", zh:'這樣就好了嗎？', tag:'bad', src:'課本 A1 p.114',
        note:'⚠️ 那是客人問的', next:'k8' },
    ]},

    k8: { speaker:'client', tip:'收尾', chk:'道謝', choices:[
      { fr:'Merci beaucoup !', zh:'非常感謝！', tag:'good', src:'課本 A1 p.114',
        note:'✅ 拿到完整答案再道謝', next:'end' },
      { fr:"Merci, c'est gentil.", zh:'謝謝，您人真好。', tag:'ok', src:'課本 A1 p.112',
        note:'對機構人員用 c\'est gentil 有點太熟；merci beaucoup 剛好', next:'end' },
    ]},

    end: { speaker:'system', line:'—— 對話結束 ——', zh:'', src:'' },
  }
},

/* 15. 機場遇到朋友（A1 課本 p.132 逐字稿）
   ⭐ 這一場整段都是 passé composé——**口說第二部分「講你的假期」的原型**。
   跟前面所有場景不同：這裡沒有店員也沒有服務，就是兩個人交換經驗，
   而「交換」正是重點：你講完要把問題丟回去，對話才活得下去。 */
{
  id: 'aeroport',
  lvl: 'A1',
  icon: '✈️',
  zh: '機場遇到朋友聊假期',
  fr: "À l'aéroport",
  exam: '⭐⭐ 口說第二部分「講一次旅行/經驗」就是這個——整段 passé composé',
  src: '課本 A1 p.132 逐字稿',
  roles: { loic: '🙋 你是 Loïc', marina: '🧳 你是剛回國的 Marina' },
  speakers: { loic: 'Loïc', marina: 'Marina' },
  roleHints: { loic: '你要一直問下去——問句用完對話就死了', marina: '你要講你做過什麼，而且講完要把問題丟回去' },
  checklist: ['打招呼', '問對方從哪回來', '講你做了什麼', '把問題丟回去', '道別'],
  start: 'z1',
  nodes: {
    z1: { speaker:'loic', tip:'在機場撞見朋友', chk:'打招呼', choices:[
      { fr:"Tiens ! Salut Marina ! Qu'est-ce que tu fais à l'aéroport ?", zh:'咦！嗨 Marina！你在機場做什麼？', tag:'good', src:'課本 A1 p.132',
        note:'✅ <b>Tiens !</b>＝「咦、欸」（意外遇到的驚訝詞），法國人超常用', next:'z2' },
      { fr:'Je rentre de vacances !', zh:'我度假回來！', tag:'bad', src:'課本 A1 p.132',
        note:'⚠️ 那是對方的回答', next:'z2' },
    ]},

    z2: { speaker:'marina', tip:'你剛從國外回來', choices:[
      { fr:'Je rentre de vacances !', zh:'我度假回來！', tag:'good', src:'課本 A1 p.132',
        note:'✅ <b>rentrer de + 地方/事件</b>＝從…回來', next:'z3' },
      { fr:"J'arrive de Nouvelle-Zélande.", zh:'我從紐西蘭來。', tag:'good', src:'課本 A1 p.132',
        note:'✅ 直接講國家也可以。<b>de + 陰性國家</b>不加冠詞', next:'z3' },
    ]},

    z3: { speaker:'loic', tip:'繼續問下去', chk:'問對方從哪回來', choices:[
      { fr:"Tu arrives d'où ?", zh:'你從哪裡來？', tag:'good', src:'課本 A1 p.132',
        note:'✅ <b>d\'où</b>＝從哪裡（疑問詞放句尾是口語問法）', next:'z4' },
      { fr:'Génial ! Qu\'est-ce que tu as fait ?', zh:'太棒了！你做了什麼？', tag:'good', src:'課本 A1 p.132',
        note:'✅ 直接跳到「做了什麼」也很自然——<b>tu as fait</b> 是 passé composé', next:'z5' },
    ]},

    z4: { speaker:'marina', tip:'講你從哪回來', choices:[
      { fr:"J'arrive de Nouvelle-Zélande.", zh:'我從紐西蘭來。', tag:'good', src:'課本 A1 p.132',
        note:'✅ arriver de＝從…抵達', next:'z5' },
      { fr:'Je reviens du Danemark, de Copenhague.', zh:'我從丹麥、哥本哈根回來。', tag:'ok', src:'課本 A1 p.132',
        note:'句子沒問題，但那是<b>Loïc</b> 等一下要講的行程', next:'z5' },
    ]},

    z5: { speaker:'loic', tip:'問她做了什麼', choices:[
      { fr:"Génial ! Qu'est-ce que tu as fait ?", zh:'太棒了！你做了什麼？', tag:'good', src:'課本 A1 p.132',
        note:'✅ 這一句打開整段 passé composé——考試問「講講你的假期」就是這句', next:'z6' },
      { fr:'Tu as aimé ?', zh:'你喜歡嗎？', tag:'ok', src:'課本 A1 p.132',
        note:'太早了——她還沒講做了什麼，你就先問感想', next:'z7' },
    ]},

    z6: { speaker:'marina', tip:'⭐ 分岔：細講做了什麼，還是只給感想？', chk:'講你做了什麼', choices:[
      { fr:"Beaucoup de choses ! J'ai fait de la randonnée. J'ai visité des villes et des musées. J'ai vu des amis.", zh:'很多事！我去健行。我參觀了城市跟博物館。我見了朋友。', tag:'good', src:'課本 A1 p.132',
        note:'✅ <b>三個 passé composé 連發</b>——考試要的就是這種「一口氣講三件事」。visiter 接地方、voir 接人（第19課的區分）', next:'z7' },
      { fr:"Oui, j'ai adoré. C'est vraiment un pays génial.", zh:'嗯，我超愛。真的是個很棒的國家。', tag:'ok', src:'課本 A1 p.132',
        note:'感想很好，但你**沒講做了什麼**——考官會覺得你在閃避 passé composé', next:'z8' },
    ]},

    z7: { speaker:'loic', tip:'追問細節', choices:[
      { fr:'Tu as des amis en Nouvelle-Zélande ?', zh:'你在紐西蘭有朋友？', tag:'good', src:'課本 A1 p.132',
        note:'✅ 抓對方講到的一個點追問——這是讓對話延長最好用的技巧', next:'z8' },
      { fr:'Tu as aimé ?', zh:'你喜歡嗎？', tag:'good', src:'課本 A1 p.132',
        note:'✅ 問感想，接下來她會給評價', next:'z8' },
    ]},

    z8: { speaker:'marina', tip:'給評價', choices:[
      { fr:"Oui, j'ai adoré. C'est vraiment un pays génial.", zh:'嗯，我超愛。真的是個很棒的國家。', tag:'good', src:'課本 A1 p.132',
        note:'✅ <b>j\'ai adoré</b>（PC）講當時的感受；<b>c\'est</b>（現在式）講這個國家本來就是這樣', next:'z9' },
      { fr:'Oui, beaucoup.', zh:'嗯，很多。', tag:'ok', src:'課本 A1 p.132',
        note:'那是回答「有沒有拍照」的', next:'z9' },
    ]},

    z9: { speaker:'loic', tip:'再問一個', choices:[
      { fr:'Tu as pris des photos ?', zh:'你有拍照嗎？', tag:'good', src:'課本 A1 p.132',
        note:'✅ <b>prendre</b> 的過去分詞是 pris（第17課不規則表）', next:'z10' },
      { fr:'Je reviens du Danemark, de Copenhague.', zh:'我從丹麥、哥本哈根回來。', tag:'bad', src:'課本 A1 p.132',
        note:'⚠️ 她還沒問你，太急著講自己了', next:'z10' },
    ]},

    z10: { speaker:'marina', tip:'⚠️ 回答完，記得把問題丟回去', chk:'把問題丟回去', choices:[
      { fr:"Oui, beaucoup. Et toi, qu'est-ce que tu fais à l'aéroport ?", zh:'有，很多。那你呢，你在機場做什麼？', tag:'good', src:'課本 A1 p.132',
        note:'✅ <b>Et toi… ?</b>＝把球丟回去。口說考試最怕你只回答不提問，這一句直接救場', next:'z11' },
      { fr:'Oui, beaucoup.', zh:'有，很多。', tag:'ok', src:'課本 A1 p.132',
        note:'答完就停——對方要一直想新問題，對話會越來越乾', next:'z11' },
    ]},

    z11: { speaker:'loic', tip:'換你講你的行程', choices:[
      { fr:'Je reviens du Danemark, de Copenhague.', zh:'我從丹麥、哥本哈根回來。', tag:'good', src:'課本 A1 p.132',
        note:'✅ <b>revenir de + le Danemark → du</b>（陽性國家縮合）；後面補城市名不加冠詞', next:'z12' },
      { fr:'Je rentre de vacances !', zh:'我度假回來！', tag:'ok', src:'課本 A1 p.132',
        note:'可以，但她剛講了具體國家，你也講具體一點對話才會接下去', next:'z12' },
    ]},

    z12: { speaker:'marina', tip:'你沒去過那裡', choices:[
      { fr:'Je ne connais pas Copenhague.', zh:'我沒去過哥本哈根。', tag:'good', src:'課本 A1 p.132',
        note:'✅ <b>connaître</b>＝認識/去過（地方用 connaître，不是 savoir）', next:'z13' },
      { fr:'Tu as aimé ?', zh:'你喜歡嗎？', tag:'ok', src:'課本 A1 p.132',
        note:'也可以問，但講「我沒去過」會讓對方更想介紹', next:'z13' },
    ]},

    z13: { speaker:'loic', tip:'推薦一下', choices:[
      { fr:"C'est très sympa et très animé. Il y a beaucoup de cafés et de restaurants. Tu dois y aller !", zh:'那裡很棒又很熱鬧。有很多咖啡館跟餐廳。你一定要去！', tag:'good', src:'課本 A1 p.132',
        note:'✅ <b>animé</b>＝熱鬧；<b>Tu dois y aller</b> 的 <b>y</b> 代替「去那個地方」（第21課的 y）', next:'z14' },
      { fr:'Je ne connais pas Copenhague.', zh:'我沒去過哥本哈根。', tag:'bad', src:'課本 A1 p.132',
        note:'⚠️ 你才剛從那裡回來', next:'z14' },
    ]},

    z14: { speaker:'marina', tip:'你很累了，該收了', chk:'道別', choices:[
      { fr:"Ah oui, mais pas aujourd'hui ! J'ai fait 25 heures d'avion et je suis fatiguée. Je vais rentrer chez moi.", zh:'好啊，但不是今天！我坐了25小時飛機，很累。我要回家了。', tag:'good', src:'課本 A1 p.132',
        note:'✅ 婉轉收尾：接受提議＋給理由＋說明下一步。⚠️ 課本這個角色是女生所以 <b>fatiguée</b>，男生講要去掉字尾的 e', next:'z15' },
      { fr:'Je ne connais pas Copenhague.', zh:'我沒去過哥本哈根。', tag:'bad', src:'課本 A1 p.132',
        note:'⚠️ 剛剛講過了', next:'z15' },
    ]},

    z15: { speaker:'loic', tip:'道別', chk:'道別', choices:[
      { fr:'Ok, à la prochaine !', zh:'好，下次見！', tag:'good', src:'課本 A1 p.132',
        note:'✅ <b>À la prochaine</b>＝下次見（沒有講定時間，比 à demain 安全）', next:'end' },
      { fr:'À demain !', zh:'明天見！', tag:'bad', src:'筆記第1課',
        note:'⚠️ 你們又沒約明天', next:'end' },
    ]},

    end: { speaker:'system', line:'—— 對話結束 ——', zh:'', src:'' },
  }
},

/* ═══════════════════════════════════════════════════════════════
   ⬇⬇ 以下三個來自 **DELF A2 全真題本**（Le DELF A2 100% réussite）與 A2 練習本。
      這兩本是掃描檔，08-25 用 tools/ocr_pdf.py（macOS 內建 Vision OCR）才讀進來。
      ⚠️ OCR 一定有錯字，所以這批的每一句都額外用眼睛校過一次法文正確性，
         不是只靠檢查器過關就算數。
   ⭐ 16、17 兩場是**官方示範對答**——不是課本的情境對話，是考試書直接寫給考生看的
      「這一題該怎麼答」，等於把評分標準攤開來。
   ═══════════════════════════════════════════════════════════════ */

/* 16. 約朋友一起運動（DELF A2 全真題本 p.114-115 的官方示範 interaction）
   考試形態：Exercice en interaction，考官演你的朋友，**要用 tu**。
   這一場的重點不是單字，是**連接詞**——官方示範裡塞滿了 car / donc / alors /
   parce que / grâce à，這正是 A2 拿分的關鍵：句子要串起來，不能一句一句丟。 */
{
  id: 'sport',
  lvl: 'A2',
  icon: '🎾',
  zh: '約朋友一起運動',
  fr: 'Faire du sport avec un ami',
  exam: '⭐⭐ DELF A2 口說第三部分的**官方示範對答**（真題本 p.114）——考官演你朋友，全程 tu',
  src: 'DELF A2 真題本 p.114-115（官方示範）',
  roles: { moi: '🙋 你是提議的人（考生）', ami: '🎽 你是朋友（考官演的）' },
  speakers: { moi: 'Le candidat', ami: "L'examinateur" },
  roleHints: { moi: '朋友之間用 tu；重點是把句子用連接詞串起來，不要一句一句丟', ami: '你要有意見、要能拒絕、要提替代方案——考生才有東西可以接' },
  checklist: ['打招呼', '提議一起運動', '講各自喜歡的運動', '喬時間', '約地點', '分工收尾'],
  start: 's1',
  nodes: {
    s1: { speaker:'moi', tip:'對朋友打招呼。⚠️ 這一題是 tu，不是 vous', chk:'打招呼', choices:[
      { fr:'Salut ! Comment ça va ?', zh:'嗨！你好嗎？', tag:'good', src:'DELF A2 真題本 p.114',
        note:'✅ 官方示範的第一句。<b>Salut</b>＋<b>ça va</b>＝朋友之間；考官會照著你選的語域回你', next:'s2' },
      { fr:'Bonjour !', zh:'您好！', tag:'ok', src:'筆記第1課',
        note:'不算錯，但題目說對方是「你的朋友」——太正式會被看成沒讀懂角色設定', next:'s2' },
    ]},

    s2: { speaker:'ami', line:'Ça va très bien et toi ?', zh:'我很好，你呢？', src:'DELF A2 真題本 p.114',
          note:'<b>et toi ?</b>——把問題丟回來。這一來一回是暖身，不要在這裡卡住', next:'s3' },

    s3: { speaker:'moi', tip:'講出你的提議。⭐ 這一句決定考官接得順不順', chk:'提議一起運動', choices:[
      { fr:'Dis-moi, je cherche quelqu\'un pour faire du sport avec moi. Est-ce que ça te dirait que nous fassions une activité sportive ensemble ?', zh:'跟你說，我在找人一起運動。你有沒有興趣我們一起做個運動？', tag:'good', src:'DELF A2 真題本 p.114',
        note:'✅ 官方示範句。<b>Dis-moi</b>＝「跟你說」（開話題的緩衝）；<b>ça te dirait que…</b> 是很高級的提議句型，A2 講得出來就加分', next:'s4' },
      { fr:'Ça te dit ?', zh:'你有興趣嗎？', tag:'ok', src:'筆記第9課',
        note:'句子沒錯，但你還沒說「什麼事」——對方只能反問「什麼有興趣？」，等於浪費一輪', next:'s4' },
    ]},

    s4: { speaker:'ami', tip:'你是朋友。答應，而且要給理由', choices:[
      { fr:'En effet, c\'est une super idée car j\'ai un peu grossi et je voudrais perdre mes kilos.', zh:'的確，這是個好主意，因為我有點變胖了，想減掉幾公斤。', tag:'good', src:'DELF A2 真題本 p.114',
        note:'✅ <b>En effet</b>＝的確；<b>car</b>＝因為（比 parce que 書面一點）。答應＋理由，對話才有內容往下接', next:'s5' },
      { fr:'Avec plaisir !', zh:'很樂意！', tag:'ok', src:'筆記第9課',
        note:'答應了，但沒有任何資訊——考試對話會很快乾掉', next:'s5' },
    ]},

    s5: { speaker:'moi', tip:'呼應對方的理由，順便問他喜歡什麼運動', choices:[
      { fr:'Super, moi j\'ai besoin de faire du sport pour être en meilleure forme. Bon, alors, qu\'est-ce que tu aimes comme sports ?', zh:'太好了，我也需要運動來讓自己狀態更好。那你喜歡什麼運動？', tag:'good', src:'DELF A2 真題本 p.114',
        note:'✅ <b>avoir besoin de + 原形</b>＝需要做…；<b>pour + 原形</b>＝為了…（目的）。先呼應對方再提問，這是 A2 對話的節奏', next:'s6' },
      { fr:'Bon, alors, qu\'est-ce que tu aimes comme sports ?', zh:'那你喜歡什麼運動？', tag:'ok', src:'DELF A2 真題本 p.114',
        note:'問得對，但你跳過了「我也是」——對話變成單向訪問', next:'s6' },
    ]},

    s6: { speaker:'ami', line:'Alors, j\'aime beaucoup la natation et le tennis. Et toi ?',
          zh:'嗯，我很喜歡游泳跟網球。你呢？', src:'DELF A2 真題本 p.114',
          note:'運動用<b>定冠詞</b>：j\'aime <b>la</b> natation（喜歡整件事）；跟 faire <b>de la</b> natation 不同', next:'s7' },

    s7: { speaker:'moi', tip:'找出共同點', chk:'講各自喜歡的運動', choices:[
      { fr:'Moi aussi, j\'aime le tennis.', zh:'我也是，我喜歡網球。', tag:'good', src:'DELF A2 真題本 p.114',
        note:'✅ <b>Moi aussi</b>＝我也是（肯定句的附和；否定句要用 moi non plus）', next:'s8' },
      { fr:'Je ne sais pas.', zh:'我不知道。', tag:'ok', src:'筆記第16課',
        note:'誠實但幫不上忙——考試要的是「一起找出共識」，這句會把球又踢回去', next:'s8' },
    ]},

    s8: { speaker:'ami', tip:'確認共同點，並提出可行方案', choices:[
      { fr:'Ah, tu aimes le tennis aussi ? Bon, c\'est bien, on aime ce sport tous les deux. Donc on pourrait essayer d\'en faire ensemble.', zh:'啊，你也喜歡網球？那太好了，我們兩個都喜歡這個運動。所以我們可以試試看一起打。', tag:'good', src:'DELF A2 真題本 p.114',
        note:'✅ <b>tous les deux</b>＝兩個人都；<b>on pourrait</b>（條件式）＝我們可以…（提議時比 on peut 婉轉）；<b>en</b> 代替 du tennis', next:'s9' },
      { fr:'Moi aussi, j\'aime le tennis.', zh:'我也是，我喜歡網球。', tag:'bad', src:'DELF A2 真題本 p.114',
        note:'⚠️ 那是對方剛講的', next:'s9' },
    ]},

    s9: { speaker:'ami', line:'On peut jouer gratuitement à l\'université, il y a plusieurs cours en accès libre.',
          zh:'我們可以在大學免費打，有好幾個球場開放自由使用。', src:'DELF A2 真題本 p.114',
          note:'<b>gratuitement</b>＝免費地；<b>en accès libre</b>＝開放自由使用。提方案時附上「為什麼可行」', next:'s10' },

    s10: { speaker:'ami', tip:'開始喬時間', choices:[
      { fr:'Alors quand es-tu disponible ? Quel jour ?', zh:'那你什麼時候有空？哪一天？', tag:'good', src:'DELF A2 真題本 p.114',
        note:'✅ <b>disponible</b>＝有空的（比 libre 正式一點）。先問哪一天再問幾點，順序清楚', next:'s11' },
      { fr:'Le mercredi, je suis libre, et toi ?', zh:'我星期三有空，你呢？', tag:'bad', src:'DELF A2 真題本 p.114',
        note:'⚠️ 那是被問的人回答的', next:'s11' },
    ]},

    s11: { speaker:'moi', tip:'講你哪天有空', chk:'喬時間', choices:[
      { fr:'Le mercredi, je suis libre, et toi ?', zh:'我星期三有空，你呢？', tag:'good', src:'DELF A2 真題本 p.114',
        note:'✅ <b>le mercredi</b>＝每個星期三（定冠詞＋星期＝固定）；講完加 <b>et toi ?</b> 把球丟回去', next:'s12' },
      { fr:'L\'après-midi quand tu veux.', zh:'下午你什麼時候都可以。', tag:'ok', src:'DELF A2 真題本 p.114',
        note:'他問的是「哪一天」，你答了時段——順序亂掉，對方還要再問一次', next:'s12' },
    ]},

    s12: { speaker:'ami', tip:'⭐ 分岔：星期三你不行（要協商），還是直接配合？', choices:[
      { fr:'Le mercredi ? Non, plutôt le samedi parce que le mercredi j\'ai cours toute la journée.', zh:'星期三？不行，星期六比較好，因為星期三我整天有課。', tag:'good', src:'DELF A2 真題本 p.114',
        note:'✅ <b>拒絕＋替代方案＋理由</b>三件一組。<b>plutôt</b>＝比較傾向…；這一步才是考試真正在看的「協商」', next:'s13' },
      { fr:'L\'après-midi quand tu veux.', zh:'下午你什麼時候都可以。', tag:'good', src:'DELF A2 真題本 p.114',
        note:'✅ 直接配合也可以——這條路比較短，但你就少練到一次「被拒絕之後怎麼接」', next:'s14' },
    ]},

    s13: { speaker:'moi', tip:'被改期了。接受並推進到幾點', chk:'喬時間', choices:[
      { fr:'OK, ça me va aussi. Vers quelle heure ?', zh:'好，我也可以。大概幾點？', tag:'good', src:'DELF A2 真題本 p.114',
        note:'✅ <b>ça me va</b>＝我可以；<b>vers + 時間</b>＝大約幾點。接受之後<b>馬上推進下一個細節</b>，不要停', next:'s14' },
      { fr:'Le mercredi, je suis libre, et toi ?', zh:'我星期三有空，你呢？', tag:'bad', src:'DELF A2 真題本 p.114',
        note:'⚠️ 他剛說星期三不行——沒聽懂對方的拒絕是考試最傷的失分', next:'s14' },
    ]},

    s14: { speaker:'moi', tip:'把時間講死', chk:'喬時間', choices:[
      { fr:'Vers 14 h ?', zh:'大概兩點？', tag:'good', src:'DELF A2 真題本 p.114',
        note:'✅ 給一個<b>具體數字</b>讓對方確認——這比「你決定就好」有效率得多', next:'s15' },
      { fr:'OK, ça me va aussi. Vers quelle heure ?', zh:'好，我也可以。大概幾點？', tag:'ok', src:'DELF A2 真題本 p.114',
        note:'他已經說「下午你隨意」，再問一次幾點就是把決定推回去', next:'s15' },
    ]},

    s15: { speaker:'ami', tip:'確認時間並把約定固定下來', choices:[
      { fr:'Oui c\'est très bien, 14 h. Oui, on se donne rendez-vous tous les samedis pour jouer au tennis ?', zh:'好，兩點很好。那我們每個星期六約打網球？', tag:'good', src:'DELF A2 真題本 p.114',
        note:'✅ <b>se donner rendez-vous</b>＝互相約時間；<b>tous les samedis</b>＝每個星期六。把單次變成常態，這是加分的收尾', next:'s16' },
      { fr:'Vers 14 h ?', zh:'大概兩點？', tag:'bad', src:'DELF A2 真題本 p.114',
        note:'⚠️ 那是對方剛提的時間', next:'s16' },
    ]},

    s16: { speaker:'moi', tip:'還有一件事沒講定', chk:'約地點', choices:[
      { fr:'Oui, oui. On se retrouve au gymnase de l\'université ?', zh:'好好。我們在大學體育館碰面？', tag:'good', src:'DELF A2 真題本 p.114',
        note:'✅ 時間講定了還要講<b>地點</b>——考官會看你有沒有把「所有細節」處理完', next:'s17' },
      { fr:'Ça marche !', zh:'說定了！', tag:'ok', src:'筆記第19課',
        note:'太早收了，你們還沒講在哪裡碰面', next:'s18' },
    ]},

    s17: { speaker:'ami', line:'D\'accord, devant le gymnase, très bien... J\'espère que je vais perdre du poids grâce au tennis.',
           zh:'好，體育館前面，很好…希望我可以靠打網球瘦下來。', src:'DELF A2 真題本 p.114',
           note:'<b>grâce à</b>＝多虧了…（正面的「因為」；負面要用 à cause de）；<b>perdre du poids</b>＝減重', next:'s18' },

    s18: { speaker:'moi', tip:'收尾。⚠️ 記得處理裝備這種實際細節', chk:'分工收尾', choices:[
      { fr:'Oui, tu vas voir, ça va marcher. Mais avant, il faut que j\'aille acheter un peu de matériel car je n\'ai pas de raquette.', zh:'會的，你看著吧，一定行。不過在那之前我得先去買點裝備，因為我沒有球拍。', tag:'good', src:'DELF A2 真題本 p.114',
        note:'✅ 官方示範收尾。<b>il faut que + 虛擬式</b>（j\'aille）是 B1 的東西，A2 聽得懂就好；重點是<b>主動提出還缺什麼</b>', next:'s19' },
      { fr:'Oui, tu vas voir, ça va marcher.', zh:'會的，你看著吧，一定行。', tag:'ok', src:'DELF A2 真題本 p.114',
        note:'可以，但少了「我還缺球拍」這種實際細節——考官給分看的就是這些', next:'s19' },
    ]},

    s19: { speaker:'ami', tip:'分工並道別', chk:'分工收尾', choices:[
      { fr:'Ok, c\'est moi qui m\'occupe des balles. À samedi alors !', zh:'好，球我來準備。那就星期六見！', tag:'good', src:'DELF A2 真題本 p.114',
        note:'✅ <b>c\'est moi qui…</b>＝由我來…（強調句）；<b>s\'occuper de</b>＝負責。約定＋分工＋道別，一句收完', next:'end' },
      { fr:'À demain !', zh:'明天見！', tag:'bad', src:'筆記第1課',
        note:'⚠️ 你們約的是星期六', next:'end' },
    ]},

    end: { speaker:'system', line:'—— 對話結束 ——', zh:'', src:'' },
  }
},

/* 17. 買 T 恤送朋友（DELF A2 全真題本 p.111-112 的官方示範）
   ⭐ 這一場的誘答**全部是官方寫的**——真題本用選擇題的形式，
      每一題給三個答案讓考生挑，錯的兩個都是「聽起來像法文但答錯問題」。
   所以這一場練的不是禮貌，是**有沒有真的聽懂對方在問什麼**：
   問 taille 你答體重、問顏色你答大小、問預算你答年齡——這才是真實的失分點。 */
{
  id: 'tshirt',
  lvl: 'A2',
  icon: '👕',
  zh: '買 T 恤送朋友',
  fr: 'Achat de vêtements',
  exam: '⭐⭐ DELF A2 口說第三部分官方示範題（真題本 p.111）——誘答是官方寫的',
  src: 'DELF A2 真題本 p.111-112（官方示範）',
  roles: { client: '🙋 你是顧客', vendeur: '🧑‍💼 你是店員' },
  speakers: { client: 'Le client', vendeur: 'Le vendeur' },
  roleHints: { client: '每一格的錯誤選項都是官方誘答——考的是你有沒有聽懂問題', vendeur: '店員要一步一步問到足夠資訊：對象→尺寸→顏色→預算' },
  checklist: ['說出要買什麼', '講對象與尺寸', '選顏色', '講預算', '問價錢', '付款'],
  start: 't1',
  nodes: {
    t1: { speaker:'vendeur', line:'Bonjour, je peux vous aider ?', zh:'您好，需要幫忙嗎？', src:'DELF A2 真題本 p.111',
          note:'法國店員的標準開場。<b>Je peux vous aider ?</b> 比「您要什麼」客氣', next:'t2' },

    t2: { speaker:'client', tip:'講出你要買什麼、要送誰', chk:'說出要買什麼', choices:[
      { fr:'Oui, je voudrais acheter un tee-shirt pour un ami.', zh:'是的，我想買一件T恤送朋友。', tag:'good', src:'DELF A2 真題本 p.111',
        note:'✅ <b>je voudrais + 原形</b>＝我想要（做某事）；<b>pour un ami</b> 直接說明用途，店員好推薦', next:'t3' },
      { fr:'Oui, je voudrais réserver une chambre double.', zh:'是的，我想訂一間雙人房。', tag:'bad', src:'DELF A2 真題本 p.111',
        note:'⚠️ <b>官方誘答</b>：句子完全正確，但那是<b>飯店</b>的台詞。考試最常見的失分不是文法，是答錯場合', next:'t3' },
      { fr:'Oui, je voudrais me rendre à Paris.', zh:'是的，我想去巴黎。', tag:'bad', src:'DELF A2 真題本 p.111',
        note:'⚠️ <b>官方誘答</b>：se rendre à＝前往（車站買票才用）。在服飾店講這句，店員會愣住', next:'t3' },
    ]},

    t3: { speaker:'vendeur', tip:'先確認送誰', choices:[
      { fr:'C\'est pour un homme ou une femme ?', zh:'是要送男生還是女生？', tag:'good', src:'DELF A2 真題本 p.111',
        note:'✅ 二選一問句，客人最好答', next:'t4' },
      { fr:'Un homme.', zh:'男生。', tag:'bad', src:'DELF A2 真題本 p.111',
        note:'⚠️ 那是顧客的答案', next:'t4' },
    ]},

    t4: { speaker:'client', tip:'回答對象', chk:'講對象與尺寸', choices:[
      { fr:'Un homme.', zh:'男生。', tag:'good', src:'DELF A2 真題本 p.111',
        note:'✅ 這種二選一就短答，不用整句', next:'t5' },
      { fr:'Un petit garçon.', zh:'一個小男孩。', tag:'ok', src:'DELF A2 真題本 p.111',
        note:'文法對，但你要送的是「朋友」——除非你朋友是小孩，不然店員會拿錯尺寸給你', next:'t5' },
    ]},

    t5: { speaker:'vendeur', line:'Quelle est sa taille ?', zh:'他的尺寸／身高是多少？', src:'DELF A2 真題本 p.111',
          note:'⚠️ <b>taille</b> 一詞兩用：買衣服＝尺碼、看醫生＝身高。這一題兩種答法都通，但<b>不能答體重或年份</b>', next:'t6' },

    t6: { speaker:'client', tip:'⚠️ 這一格是全場最容易掉的：他問的是 taille', chk:'講對象與尺寸', choices:[
      { fr:'Il mesure 1,80 m.', zh:'他身高1米80。', tag:'good', src:'DELF A2 真題本 p.111',
        note:'✅ <b>mesurer</b>＝身高多少（不用 avoir）。講身高讓店員自己換算尺碼，是很自然的答法', next:'t7' },
      { fr:'Il pèse 65 kilos.', zh:'他65公斤。', tag:'bad', src:'DELF A2 真題本 p.111',
        note:'⚠️ <b>官方誘答</b>：peser＝體重。問的是 taille 不是 poids——同一組身體數據，答錯一個就露餡', next:'t7' },
      { fr:'Il est né en 1986.', zh:'他1986年出生。', tag:'bad', src:'DELF A2 真題本 p.111',
        note:'⚠️ <b>官方誘答</b>：那是出生年。三個選項都是「關於他的數字」，只有一個回答了問題', next:'t7' },
    ]},

    t7: { speaker:'vendeur', line:'Je vous propose de prendre une taille M.', zh:'我建議您拿 M 號。',
          src:'DELF A2 真題本 p.111', note:'<b>proposer de + 原形</b>＝建議做…（店員給建議的標準句）', next:'t8' },

    t8: { speaker:'client', tip:'接受店員的建議', choices:[
      { fr:'D\'accord. Je vous fais confiance.', zh:'好的，我相信您。', tag:'good', src:'DELF A2 真題本 p.111',
        note:'✅ <b>faire confiance à qqn</b>＝信任某人。接受專業建議還補一句客氣話，這是拿分的細節', next:'t9' },
      { fr:'Ok, ce n\'est pas important.', zh:'好，這不重要。', tag:'ok', src:'DELF A2 真題本 p.111',
        note:'聽起來很敷衍——你要買禮物，卻說尺寸不重要', next:'t9' },
      { fr:'Non, je ne suis pas d\'accord.', zh:'不，我不同意。', tag:'bad', src:'DELF A2 真題本 p.111',
        note:'⚠️ <b>官方誘答</b>：拒絕沒有問題，但**沒給理由**的否定在服務場合非常生硬', next:'t9' },
    ]},

    t9: { speaker:'vendeur', tip:'尺寸定了，問顏色', choices:[
      { fr:'Quelle couleur préférez-vous ?', zh:'您比較喜歡什麼顏色？', tag:'good', src:'DELF A2 真題本 p.111',
        note:'✅ <b>préférer</b>＝比較喜歡；quelle 配陰性的 couleur', next:'t10' },
      { fr:'Je voudrais quelque chose de bleu.', zh:'我想要藍色的。', tag:'bad', src:'DELF A2 真題本 p.111',
        note:'⚠️ 那是顧客的答案', next:'t10' },
    ]},

    t10: { speaker:'client', tip:'選顏色', chk:'選顏色', choices:[
      { fr:'Je voudrais quelque chose de bleu.', zh:'我想要藍色的。', tag:'good', src:'DELF A2 真題本 p.111',
        note:'✅ <b>quelque chose de + 陽性形容詞</b>＝某個…的東西（de 後面永遠用陽性單數）', next:'t11' },
      { fr:'Je voudrais quelque chose de petit.', zh:'我想要小的。', tag:'bad', src:'DELF A2 真題本 p.111',
        note:'⚠️ <b>官方誘答</b>：句型一模一樣，只換一個形容詞——但他問的是顏色不是大小', next:'t11' },
      { fr:'Je veux deux places pour adulte.', zh:'我要兩張成人票。', tag:'bad', src:'DELF A2 真題本 p.111',
        note:'⚠️ <b>官方誘答</b>：那是電影院／劇場的台詞，而且 je veux 太生硬', next:'t11' },
    ]},

    t11: { speaker:'vendeur', tip:'問預算——法國店員真的會問', choices:[
      { fr:'Et au niveau du prix, quel est votre budget ?', zh:'那價格方面，您的預算是多少？', tag:'good', src:'DELF A2 真題本 p.111',
        note:'✅ <b>au niveau de…</b>＝在…方面（很好用的轉話題結構）', next:'t12' },
      { fr:'Environ 30 euros.', zh:'大約30歐。', tag:'bad', src:'DELF A2 真題本 p.111',
        note:'⚠️ 那是顧客的答案', next:'t12' },
    ]},

    t12: { speaker:'client', tip:'講預算', chk:'講預算', choices:[
      { fr:'Environ 30 euros.', zh:'大約30歐。', tag:'good', src:'DELF A2 真題本 p.111',
        note:'✅ <b>environ</b>＝大約。給一個範圍讓店員好推薦', next:'t13' },
      { fr:'Environ 23 ans.', zh:'大約23歲。', tag:'bad', src:'DELF A2 真題本 p.111',
        note:'⚠️ <b>官方誘答</b>：同一個句型換單位。問錢答年齡——聽力沒抓到 prix / budget 就會這樣', next:'t13' },
      { fr:'Environ 2 kilos.', zh:'大約2公斤。', tag:'bad', src:'DELF A2 真題本 p.111',
        note:'⚠️ <b>官方誘答</b>：買 T 恤不會用公斤計價', next:'t13' },
    ]},

    t13: { speaker:'vendeur', line:'Alors, je peux vous proposer ce modèle en M qui existe en bleu.',
           zh:'那我可以推薦您這個 M 號的款式，有藍色的。', src:'DELF A2 真題本 p.111',
           note:'<b>ce modèle</b>＝這個款式；<b>qui existe en bleu</b>＝有出藍色（關係代名詞 qui＋existe en + 顏色）', next:'t14' },

    t14: { speaker:'client', tip:'還缺一個資訊沒問到', chk:'問價錢', choices:[
      { fr:'Quel est son prix ?', zh:'它多少錢？', tag:'good', src:'DELF A2 真題本 p.111',
        note:'✅ 尺寸跟顏色他都講了，只剩價錢。<b>問價錢是評分表上的一格</b>，不能漏', next:'t15' },
      { fr:'Quelle est la taille ?', zh:'尺寸是多少？', tag:'bad', src:'DELF A2 真題本 p.111',
        note:'⚠️ <b>官方誘答</b>：他剛說了 en M——重複問等於沒在聽', next:'t15' },
      { fr:'Il est de quelle couleur ?', zh:'它是什麼顏色？', tag:'bad', src:'DELF A2 真題本 p.111',
        note:'⚠️ <b>官方誘答</b>：他剛說了 en bleu', next:'t15' },
    ]},

    t15: { speaker:'vendeur', tip:'報價並問付款方式', choices:[
      { fr:'Est-ce que vous voulez un paquet cadeau ? Comment allez-vous payer ?', zh:'您需要禮物包裝嗎？您要怎麼付款？', tag:'good', src:'DELF A2 真題本 p.111',
        note:'✅ <b>un paquet cadeau</b>＝禮物包裝（送禮一定會被問）；<b>Comment allez-vous payer ?</b> 是近未來的問法', next:'t16' },
      { fr:'Quel est son prix ?', zh:'它多少錢？', tag:'bad', src:'DELF A2 真題本 p.111',
        note:'⚠️ 你是報價的那一方', next:'t16' },
    ]},

    t16: { speaker:'client', tip:'兩個問題一起回答', chk:'付款', choices:[
      { fr:'Oui, je vais régler en espèces.', zh:'好，我付現金。', tag:'good', src:'DELF A2 真題本 p.111',
        note:'✅ <b>régler</b>＝結帳付款（比 payer 正式）；一句同時回答「要包裝」＋「怎麼付」', next:'end' },
      { fr:'Oui, je voudrais un sac.', zh:'好，我想要一個袋子。', tag:'ok', src:'DELF A2 真題本 p.111',
        note:'回答了包裝，但沒回答付款方式——店員還要再問一次', next:'end' },
      { fr:'Oui, je vais revenir demain.', zh:'好，我明天再來。', tag:'bad', src:'DELF A2 真題本 p.111',
        note:'⚠️ <b>官方誘答</b>：你都選好了卻說明天再來，整段交易白做。考試會被判「沒有完成任務」', next:'end' },
    ]},

    end: { speaker:'system', line:'—— 對話結束 ——', zh:'', src:'' },
  }
},

/* 18. 打電話改訂房（A2 練習本 p.112）
   跟第 7 場「打電話訂房」（A1）成對：那一場是**訂**，這一場是**改**。
   改訂單比訂房難——你要先報上原本的訂位，再一項一項講哪裡要改。 */
{
  id: 'hotel-modif',
  lvl: 'A2',
  icon: '📞',
  zh: '打電話改訂房',
  fr: 'Modifier une réservation',
  exam: '⭐ A2 口說情境卡（處理問題型）；寫作 tâche 1 也常出「寫信改訂單」',
  src: 'A2 練習本 p.112（OCR）',
  roles: { client: '🙋 你是客人', receptionniste: '🛎 你是櫃檯' },
  speakers: { client: 'Le client', receptionniste: 'La réceptionniste' },
  roleHints: { client: '先報原訂位，再一項一項講要改什麼——順序錯了對方會聽不懂', receptionniste: '櫃檯要一邊改一邊複誦確認' },
  checklist: ['報上原訂位', '改房型', '改日期', '確認晚數', '講餐食', '收尾'],
  start: 'x1',
  nodes: {
    x1: { speaker:'receptionniste', line:'Hôtel Solis, bonjour !', zh:'Solis 飯店您好！', src:'A2 練習本 p.112',
          note:'飯店接電話：<b>店名＋bonjour</b>', next:'x2' },

    x2: { speaker:'client', tip:'先讓對方找到你的訂位', chk:'報上原訂位', choices:[
      { fr:'Bonjour, madame. J\'ai réservé une chambre au nom de Norin.', zh:'您好女士。我用 Norin 的名字訂了一間房。', tag:'good', src:'A2 練習本 p.112',
        note:'✅ <b>au nom de + 名字</b>＝用…的名字（訂位、掛號都用這個）。先報訂位對方才查得到', next:'x3' },
      { fr:'Bonjour, madame.', zh:'您好女士。', tag:'ok', src:'課本 A1 p.131',
        note:'電話裡要一次講完來意，不然對方只能反問', next:'x3' },
      { fr:'Hôtel Solis, bonjour !', zh:'Solis 飯店您好！', tag:'bad', src:'A2 練習本 p.112',
        note:'⚠️ 那是接電話的人講的', next:'x3' },
    ]},

    x3: { speaker:'receptionniste', tip:'查到訂位了，複誦一次', choices:[
      { fr:'Oui, monsieur Norin. Une chambre simple du 15 au 18 mars.', zh:'是的，Norin 先生。3月15到18日，一間單人房。', tag:'good', src:'A2 練習本 p.112',
        note:'✅ <b>複誦訂位內容</b>是服務業的必備動作，也讓客人知道要改哪裡。une chambre simple＝單人房', next:'x4' },
      { fr:'J\'ai réservé une chambre au nom de Norin.', zh:'我用 Norin 的名字訂了一間房。', tag:'bad', src:'A2 練習本 p.112',
        note:'⚠️ 那是客人的台詞', next:'x4' },
    ]},

    x4: { speaker:'client', tip:'⭐ 分岔：先改房型，還是先改日期？', chk:'改房型', choices:[
      { fr:'Voilà... Je souhaite faire un changement parce que je viens avec ma femme.', zh:'是這樣的…我想做個變更，因為我太太會一起來。', tag:'good', src:'A2 練習本 p.112',
        note:'✅ <b>souhaiter</b>＝希望（比 vouloir 客氣）；<b>faire un changement</b>＝做變更。先講「要改」再講「為什麼」', next:'x5' },
      { fr:'Et puis, nous arrivons le 16 mars, pas le 15.', zh:'還有，我們是3月16號到，不是15號。', tag:'good', src:'A2 練習本 p.112',
        note:'✅ 直接改日期也可以——但這條路你就不會練到「改房型」那一段', next:'x7' },
    ]},

    x5: { speaker:'receptionniste', tip:'客人多一個人，怎麼處理？', choices:[
      { fr:'D\'accord. Nous avons une chambre double pour vous.', zh:'好的。我們有雙人房可以給您。', tag:'good', src:'A2 練習本 p.112',
        note:'✅ 直接給解法，不要只說「好」。<b>une chambre double</b>＝雙人房', next:'x6' },
      { fr:'Je souhaite faire un changement parce que je viens avec ma femme.', zh:'我想做個變更，因為我太太會一起來。', tag:'bad', src:'A2 練習本 p.112',
        note:'⚠️ 那是客人的台詞', next:'x6' },
    ]},

    x6: { speaker:'client', tip:'還有一件事要改', chk:'改日期', choices:[
      { fr:'Et puis, nous arrivons le 16 mars, pas le 15.', zh:'還有，我們是3月16號到，不是15號。', tag:'good', src:'A2 練習本 p.112',
        note:'✅ <b>Et puis</b>＝還有（接續下一件事）；<b>A, pas B</b> 是最清楚的更正說法', next:'x7' },
      { fr:'Oui, c\'est ça.', zh:'對，就是這樣。', tag:'ok', src:'A2 練習本 p.112',
        note:'對方還沒問你確認什麼——這句要留到她複誦之後', next:'x7' },
    ]},

    x7: { speaker:'receptionniste', tip:'日期改了，晚數也跟著變。確認一下', chk:'確認晚數', choices:[
      { fr:'Alors, vous passerez 2 nuits chez nous ?', zh:'那您會在我們這裡住2晚？', tag:'good', src:'A2 練習本 p.112',
        note:'✅ <b>passer + 時間 + chez</b>＝在某處待多久；<b>passerez</b> 是簡單未來式。自己算出晚數再確認＝專業', next:'x8' },
      { fr:'Oui, c\'est ça.', zh:'對，就是這樣。', tag:'bad', src:'A2 練習本 p.112',
        note:'⚠️ 那是客人確認用的', next:'x8' },
    ]},

    x8: { speaker:'client', tip:'確認', chk:'確認晚數', choices:[
      { fr:'Oui, c\'est ça.', zh:'對，就是這樣。', tag:'good', src:'A2 練習本 p.112',
        note:'✅ <b>C\'est ça</b>＝就是這樣（確認對方理解正確，超高頻）', next:'x9' },
      { fr:'Je ne sais pas...', zh:'我不知道…', tag:'ok', src:'筆記第16課',
        note:'她只是幫你算晚數，這個你自己知道——該回答的時候別含糊', next:'x9' },
    ]},

    x9: { speaker:'receptionniste', tip:'順便問餐食', choices:[
      { fr:'C\'est noté, monsieur. Vous prenez les repas à l\'hôtel ? La demi-pension, la pension complète ?', zh:'記下來了，先生。您要在飯店用餐嗎？半食宿還是全食宿？', tag:'good', src:'A2 練習本 p.112',
        note:'✅ <b>la demi-pension</b>（含早餐＋一餐）／<b>la pension complète</b>（三餐全包）——訂房必考的兩個字', next:'x10' },
      { fr:'Le petit déjeuner est compris dans le prix de la chambre.', zh:'早餐含在房價裡。', tag:'ok', src:'A2 練習本 p.112',
        note:'資訊是對的，但你還沒問他要不要在飯店用餐就先講了', next:'x10' },
    ]},

    x10: { speaker:'client', tip:'你只要早餐', chk:'講餐食', choices:[
      { fr:'Je ne sais pas... Non, seulement le petit déjeuner.', zh:'我不知道…不用，只要早餐就好。', tag:'good', src:'A2 練習本 p.112',
        note:'✅ <b>seulement</b>＝只要。先猶豫再決定很真實，考試不用假裝什麼都知道', next:'x11' },
      { fr:'Le petit déjeuner est compris dans le prix de la chambre.', zh:'早餐含在房價裡。', tag:'bad', src:'A2 練習本 p.112',
        note:'⚠️ 那是櫃檯要告訴你的資訊', next:'x11' },
    ]},

    x11: { speaker:'receptionniste', line:'Le petit déjeuner est compris dans le prix de la chambre.',
           zh:'早餐含在房價裡。', src:'A2 練習本 p.112',
           note:'<b>compris dans</b>＝包含在…裡（跟訂房那場的 le petit déjeuner est compris 同一個字）', next:'x12' },

    x12: { speaker:'client', tip:'收尾', chk:'收尾', choices:[
      { fr:'Parfait, merci. À bientôt.', zh:'太好了，謝謝。回頭見。', tag:'good', src:'A2 練習本 p.112',
        note:'✅ <b>À bientôt</b>＝之後會見到（你就要去住了），用得剛好', next:'end' },
      { fr:'À demain !', zh:'明天見！', tag:'bad', src:'筆記第1課',
        note:'⚠️ 你是3月16號才到', next:'end' },
    ]},

    end: { speaker:'system', line:'—— 對話結束 ——', zh:'', src:'' },
  }
},
];
if (typeof module !== 'undefined') module.exports = { SCENES };
