/* scenes.js — 情境角色扮演的劇本（2026-08-24 新增）
 *
 * Owen 的原話：「我進麵包店 然後我有幾種講話的選擇，或是我其實也可以選我自己是店員，很像RPG」。
 * 這正好就是 **DELF A2 口說第三部分 dialogue simulé** 的格式：抽情境、角色扮演、附道具假鈔。
 * 老師課堂實測過的套路是固定的：打招呼 → 問價錢 → 決定買什麼 → 付款 → 道謝告別，
 * 而且**禮貌用語本身就是給分點**。所以這裡的「選錯」多半不是文法錯，是**語域錯**。
 *
 * ⚠️ 教材鐵律：每一句法文都必須逐字出自 french_notes.html。
 *    `src` 欄位記錄出處課次；筆記裡沒有的句子**一律不編**（寧可劇本短一點）。
 *    唯一例外：**刻意的誘答選項**（例如筆記明講會失禮的 je veux）標 `constructed:true`，
 *    它們永遠只出現在 tag:'bad'／'ok' 且附警告，不會被當成正確教材。
 *    檢查器 `tools/check_scenes.js` 會把這些逐條列出來，不讓它們隱形。
 *
 * 節點格式：
 *   { speaker:'vendeur'|'client', line, zh, note?, src, next }        ← 對方自動說的台詞
 *   { speaker:..., choices:[{fr, zh, tag:'good'|'ok'|'bad', note, src, next}] } ← 玩家要選的
 *   tag：good＝最自然／ok＝可以但不是最好／bad＝筆記明講會失禮或不對
 */
const SCENES = [
{
  id: 'boulangerie',
  icon: '🥖',
  zh: '麵包店買法棍',
  fr: 'À la boulangerie',
  exam: '⭐ DELF A2 口說第三部分 dialogue simulé 最常抽到的情境',
  src: '第1、4、5課',
  roles: { client: '🙋 你是顧客', vendeur: '🧑‍🍳 你是店員' },
  checklist: ['打招呼', '說出要買什麼', '問價錢', '付款', '道謝告別'],
  start: 'n1',
  nodes: {
    n1: { speaker:'vendeur', line:'Bonjour !', zh:'您好！', src:'第1課',
          note:'⚠️ 法國店員一定先開口打招呼——你沒回就等於失禮', next:'n2' },

    n2: { speaker:'client', tip:'先回招呼。注意這是店員不是朋友', choices:[
      { fr:'Bonjour !', zh:'您好！', tag:'good', src:'第1課',
        note:'✅ 對陌生人／店員用 Bonjour，這是進店的基本動作', next:'n3' },
      { fr:'Salut !', zh:'嗨！', tag:'bad', src:'第1課',
        note:'⚠️ Salut 只對朋友、家人、小孩用。對店員說太隨便了', next:'n3' },
      { fr:'Bonsoir !', zh:'晚上好！', tag:'ok', src:'第1課',
        note:'時間對就沒問題——Bonsoir 是晚上用的。白天要用 Bonjour', next:'n3' },
    ]},

    n3: { speaker:'vendeur', tip:'你是店員，該問下一位了。⚠️ 別拿顧客的台詞來用', choices:[
      { fr:"C'est à qui ?", zh:'輪到誰了？', tag:'good', src:'第4課',
        note:'✅ 商店裡很常聽到——店員問下一位是誰', next:'n4' },
      { fr:"Je voudrais une baguette, s'il vous plaît.", zh:'我想要一條法棍，謝謝。', tag:'bad', src:'第4課',
        note:'⚠️ 這是<b>顧客</b>的台詞。演店員時聽到這句是要「接」，不是要「說」', next:'n4' },
      { fr:'Ça coûte combien ?', zh:'多少錢？', tag:'bad', src:'第4課',
        note:'⚠️ 問價錢的是顧客。店員是<b>回答</b>價錢的人', next:'n4' },
    ]},

    n4: { speaker:'client', tip:'說出你要買什麼。禮貌程度是給分點', choices:[
      { fr:"Je voudrais une baguette, s'il vous plaît.", zh:'我想要一條法棍，謝謝。', tag:'good', src:'第4課',
        note:'✅ <b>je voudrais</b> 是 vouloir 的條件式，比 je veux 客氣得多；再加 s\'il vous plaît 是雙重禮貌', next:'n5' },
      { fr:'Je veux une baguette.', zh:'我要一條法棍。', tag:'bad', src:'第4課', constructed:true,
        note:'⚠️ 筆記明講：<b>je veux 給人命令感</b>。去商店餐廳一律用 je voudrais', next:'n5' },
      { fr:'Une baguette !', zh:'一條法棍！', tag:'ok', src:'第4課', constructed:true,
        note:'聽得懂，但沒有禮貌用語＝口說考試少拿分', next:'n5' },
    ]},

    n5: { speaker:'vendeur', tip:'顧客說完要買什麼了，確認一下還要不要別的', choices:[
      { fr:'Ce sera tout ?', zh:'就這樣嗎？', tag:'good', src:'第4課',
        note:'✅ 店員確認的固定問法', next:'n6' },
      { fr:'Oui, ce sera tout.', zh:'是的，就這樣。', tag:'bad', src:'第4課',
        note:'⚠️ 差一個字就換了角色——<b>Ce sera tout ?</b> 是店員問，<b>Oui, ce sera tout.</b> 是顧客答', next:'n6' },
    ]},

    n6: { speaker:'client', tip:'先確認就這樣，順便問價錢', choices:[
      { fr:'Oui, ce sera tout. Ça coûte combien ?', zh:'是的，就這樣。多少錢？', tag:'good', src:'第4課',
        note:'✅ 兩步併一步：確認＋問價。<b>問價錢是老師說的固定套路之一</b>', next:'n7' },
      { fr:'Oui, ce sera tout. Combien coûte une baguette ?', zh:'是的，就這樣。一條法棍多少錢？', tag:'good', src:'第4課',
        note:'✅ 完整版問法，一樣正確', next:'n7' },
      { fr:'Oui.', zh:'是。', tag:'ok', src:'第4課',
        note:'可以，但你漏了「問價錢」這個給分步驟', next:'n7' },
    ]},

    n7: { speaker:'vendeur', tip:'顧客問價錢了，回答他', choices:[
      { fr:'Elle coûte 1 euro.', zh:'一歐元。', tag:'good', src:'第4課',
        note:'✅ 用 <b>elle</b> 因為 baguette 是陰性——法文連價錢都要配合性別', next:'n8' },
      { fr:'Combien coûte une baguette ?', zh:'一條法棍多少錢？', tag:'bad', src:'第4課',
        note:'⚠️ 你把問題丟回去了。店員是<b>報價</b>的那一方', next:'n8' },
    ]},

    n8: { speaker:'vendeur', tip:'收錢之前要問什麼？', choices:[
      { fr:'Vous payez comment ?', zh:'您怎麼付款？', tag:'good', src:'第4課',
        note:'✅ 法國店員的標準問法', next:'n9' },
      { fr:'Par carte bancaire.', zh:'刷卡。', tag:'bad', src:'第4課',
        note:'⚠️ 這是<b>顧客</b>的回答。店員問方式、顧客選方式', next:'n9' },
    ]},

    n9: { speaker:'client', tip:'選一種付款方式', choices:[
      { fr:'Par carte bancaire.', zh:'刷卡。', tag:'good', src:'第4課',
        note:'✅ 法國幾乎都刷卡。carte bancaire／carte bleue 都是<b>簽帳卡</b>，不是信用卡', next:'n10' },
      { fr:'En espèces.', zh:'付現金。', tag:'good', src:'第4課',
        note:'✅ 也對，只是法國人現在很少用現金', next:'n10' },
    ]},

    n10: { speaker:'vendeur', line:'Bonne journée !', zh:'祝您有美好的一天！', src:'第1課',
           note:'⚠️ <b>Bonne journée 說了就等於再見</b>，不用再補一句 au revoir', next:'n11' },

    n11: { speaker:'client', tip:'收尾。這一步也算分', choices:[
      { fr:'Bonne journée !', zh:'祝你有美好的一天！', tag:'good', src:'第1課',
        note:'✅ 對方說什麼你就回什麼，最自然', next:'end' },
      { fr:'Au revoir !', zh:'再見！', tag:'good', src:'第1課',
        note:'✅ 標準道別，也完全可以', next:'end' },
      { fr:'À demain !', zh:'明天見！', tag:'bad', src:'第1課',
        note:'⚠️ À demain 是「明天還會見到」才說——你又不是明天一定會再來', next:'end' },
    ]},

    end: { speaker:'system', line:'—— 對話結束 ——', zh:'', src:'' },
  }
},
];
if (typeof module !== 'undefined') module.exports = { SCENES };
