/* ============================================================
   ⚠️ 劇透草稿：town.html 主線第二～四章（2026-10-15）
   ⛔ 還沒接進 town.html。大綱與每句的文法出處見 STORY_BIBLE.md。
   欄位跟 town.html 第一章的 CLUE_TXT 一樣（scene／fr／gloss／ask／opts／a／why／wrong），
   另加：topic（對得上 questions.js）、lessons（french_notes.html 的 lesson-N）。
   章末推理 boss：opts[a] 是正解；wrongWhy[i] 是選錯第 i 個時的提示（指回哪張線索）；
   skipHint[clueId]：那張線索被跳過時，推理畫面補的中文轉述（讓跳過的人也推得出來）。
   x／y 座標留 null，接地圖時再定（W=40, H=38）。
   ============================================================ */
var STORY_CH2_4 = [
  {
    ch: 2,
    title: '第二章・誰搬得動一口鐘',
    region: '東邊的湖（新區域）',
    build: { key: 'boathouse', name: '⛵ Margot 的船屋', cost: { fish: 3, obj: 3, gold: 40 } },
    unlock: '第一章 solved ＋ 🍞 麵包店已蓋好',
    opening: '鐘樓裡空蕩蕩的，地上有兩道很深的拖痕，一路拖到東邊的湖。一個人不可能搬得動這口鐘。',
    question: '那麼重的一口鐘，是誰搬走的？搬去哪裡了？',
    clues: {
      c4: { x: null, y: null, where: '湖岸', topic: 'pronoms-demonstratifs', lessons: [38, 17],
        scene: '湖岸上，Margot 的車和 Margot 的船並排停著。你問釣魚的 Gaston 那一晚用哪一個載鐘，他用下巴指了指：',
        fr: 'Ils ont pris celui-là.',
        gloss: 'prendre 拿（過去分詞 pris）',
        ask: '他們載鐘用的是哪一個？',
        opts: ['🚤 le bateau de Margot（Margot 的船）', '🚗 la voiture de Margot（Margot 的車）'], a: 0,
        why: 'celui 是陽性單數 → le bateau。車 la voiture 是陰性，會說 celle-là。',
        wrong: '你把 Margot 的車從裡到外翻了一遍，只翻出一袋硬掉的麵包。' },
      c5: { x: null, y: null, where: '麵包店', topic: 'pronoms-cod-coi', lessons: [31, 34],
        scene: '麵包店的櫃檯下壓著 Bernard 的小本子，那一夜只寫了一行。',
        fr: 'Je leur ai demandé de m\'aider.',
        gloss: 'aider 幫忙（m\'aider＝幫我）',
        ask: '那一夜 Bernard 找了幾個人幫忙？',
        opts: ['不只一個人', '只有一個人'], a: 0,
        why: 'leur＝「對他們」，複數的人；只找一個人會寫 je lui ai demandé。',
        wrong: '你以為他只找了一個幫手，滿鎮只問 Margot——她聳聳肩，叫你去問她弟弟。' },
      c6: { x: null, y: null, where: 'Margot 家門口', topic: 'qui-que', lessons: [16, 23, 38],
        scene: 'Paul 在門口劈柴，你問他那一夜的事。他還沒開口，Margot 從窗戶探出頭替他回答：',
        fr: 'C\'est Paul que Bernard a appelé cette nuit-là.',
        gloss: 'cette nuit-là 那一夜',
        ask: '那一夜是誰打給誰？',
        opts: ['Bernard 打給 Paul', 'Paul 打給 Bernard'], a: 0,
        why: 'que 後面是 Bernard a appelé → 打電話的是 Bernard，Paul 是被打的。Paul 打的話會說 C\'est Paul qui a appelé Bernard。',
        wrong: '你跑去問 Paul 為什麼半夜吵醒 Bernard，Paul 一臉冤枉：「是他吵醒我的！」' }
    },
    boss: {
      where: '⛵ 船屋',
      recap: ['Ils ont pris celui-là.', 'Je leur ai demandé de m\'aider.', 'C\'est Paul que Bernard a appelé…'],
      ask: '所以，鐘是怎麼不見的？',
      opts: [
        'Bernard 半夜打給 Paul，找了 Paul 和 Margot 一起，用 Margot 的船把鐘運進湖裡',
        'Bernard 一個人開 Margot 的車，把鐘載走',
        'Paul 半夜打給 Bernard 求救，兩個人用車把鐘藏起來'
      ], a: 0,
      wrongWhy: {
        1: '再看紙條二跟一：<span class="fr">leur</span> 是複數——他找了不只一個人；<span class="fr">celui-là</span> 是陽性，是船不是車。',
        2: '再看紙條三跟一：<span class="fr">que Bernard a appelé</span>——打電話的是 Bernard；<span class="fr">celui-là</span> 是船。'
      },
      skipHint: {
        c4: 'Gaston 指的是湖上的那艘船。',
        c5: 'Bernard 的本子上說，他找了好幾個人幫忙。',
        c6: 'Margot 說，那晚是 Bernard 打給 Paul 的。'
      },
      reveal: '你划著 Margot 的船到湖中央。湖水很清，鐘就躺在湖底，好好的。',
      hook: '那天半夜，湖底傳來一聲鐘響。——<b>可是湖底沒有人。</b>',
      gold: 40
    }
  },

  {
    ch: 3,
    title: '第三章・午夜的鐘聲',
    region: '湖岸夜晚＋山坡上的 Élise 家',
    build: { key: 'elise', name: '🏠 Élise 的家', cost: { obj: 4, ore: 2, gold: 50 } },
    unlock: '第二章 solved',
    opening: 'Bernard 第一次開口叫住你：「你聽到了，對吧？」他打開這扇一年沒開的門。',
    question: '湖底沒有人，鐘為什麼會響？是誰在敲？',
    clues: {
      c7: { x: null, y: null, where: 'Élise 的家', topic: 'expression-but', lessons: [41, 34, 17],
        scene: 'Élise 的桌上全是灰，只有一張紙是新的。Bernard 終於承認是他做的：',
        fr: 'J\'ai mis la cloche dans le lac pour qu\'Élise l\'entende.',
        gloss: 'la cloche 鐘・entendre 聽見（虛擬式 qu\'elle entende）',
        ask: 'Bernard 把鐘沉進湖裡，是要讓誰聽見？',
        opts: ['Élise', '他自己'], a: 0,
        why: 'pour que 後面換了主詞（Élise）——聽的人不是他。要是為了自己聽，會說 pour l\'entendre。',
        wrong: '你以為他只是想自己半夜聽鐘聲，還勸他早點睡——他看了你一眼，沒說話。' },
      c8: { x: null, y: null, where: '湖岸的石頭', topic: 'pronoms-possessifs', lessons: [27], night: true,
        scene: '湖邊石頭上放著一條圍巾和一頂帽子，都是乾的。你問 Bernard 有沒有 Élise 的，他拿起其中一樣：',
        fr: 'Oui. C\'est la sienne.',
        gloss: 'une écharpe 圍巾・un chapeau 帽子',
        ask: 'Bernard 拿起來的是哪一樣？',
        opts: ['🧣 l\'écharpe（圍巾）', '🎩 le chapeau（帽子）'], a: 0,
        why: 'la sienne 是陰性 → une écharpe。帽子 le chapeau 是陽性，會說 le sien。',
        wrong: '你把帽子捧給 Bernard，他搖搖頭：「這是 Gaston 的。他每次釣魚都忘記帶走。」' },
      c9: { x: null, y: null, where: '⛵ 船屋', topic: 'conditionnel-present', lessons: [36, 25, 18, 26],
        scene: 'Margot 坐在船屋門口看著湖，說得很慢，像在說給自己聽：',
        fr: 'Si personne n\'était en bas, la cloche ne sonnerait pas.',
        gloss: 'en bas 在下面・sonner（鐘）響',
        ask: 'Margot 的意思是——',
        opts: ['她相信湖底真的有人', '她覺得湖底沒有人', '她在說：以後鐘不會再響了'], a: 0,
        why: 'sonnerait 是 conditionnel：「要是下面沒人，鐘就不會響」是跟事實相反的假設——可是鐘響了 → 下面有人。說未來會用 ne sonnera pas。',
        wrong: '你以為 Margot 在說下面沒人，轉身要走——她拉住你的袖子，指著湖面上一圈一圈的水波。' }
    },
    boss: {
      where: '湖岸',
      recap: ['…pour qu\'Élise l\'entende.', 'C\'est la sienne.', 'Si personne n\'était en bas, la cloche ne sonnerait pas.'],
      ask: '半夜在湖底敲鐘的，是誰？',
      opts: [
        'Élise 還在——她在下面敲鐘，告訴哥哥她聽到了',
        '下面沒有人，是湖水把鐘推響的',
        'Bernard 沉鐘是為了自己聽；石頭上那頂帽子是 Élise 留下的'
      ], a: 0,
      wrongWhy: {
        1: '再看紙條三：<span class="fr">sonnerait</span> 是跟事實相反的假設——Margot 相信下面有人。',
        2: '再看紙條一跟二：<span class="fr">pour qu\'Élise l\'entende</span> 是為了讓 Élise 聽；<span class="fr">la sienne</span> 是陰性，她的是圍巾。'
      },
      skipHint: {
        c7: 'Bernard 說，他沉鐘是為了讓 Élise 聽見。',
        c8: '石頭上那條圍巾是 Élise 的。',
        c9: 'Margot 說過，她相信下面有人。'
      },
      reveal: 'Bernard 把圍巾貼在臉上，一句話也說不出來。圍巾的流蘇上沾著一層黑色的粉——跟舊礦坑的石頭一樣黑。',
      hook: '你想起第一章那本泡過水的日記，是在<b>礦坑深處</b>撿到的。湖底跟舊礦坑是通的——<b>Élise 在礦坑裡。</b>',
      gold: 50, gift: '🏮 提燈（第四章進礦坑深處要用）'
    }
  },

  {
    ch: 4,
    title: '第四章・霧的下面',
    region: '⛏ 舊礦坑深處（新區域）',
    build: { key: 'clocher', name: '🔔 鐘樓', cost: { ore: 6, obj: 4, fish: 2, gold: 80 }, note: '章末推理在鐘樓蓋好後觸發' },
    unlock: '第三章 solved ＋ 有 🏮 提燈 ＋ 買過 ⛏ 好十字鎬',
    opening: '提燈照到的地方，牆上有粉筆字，字跡跟 Bernard 本子上的很像，但比較秀氣。霧在腳邊慢慢流。',
    question: 'Élise 在礦坑裡——她為什麼回不了家？要怎麼帶她回來？',
    clues: {
      c10: { x: null, y: null, where: '礦坑深處入口', topic: 'restriction-ne-que', lessons: [30, 21],
        scene: '最上面那一行粉筆字，寫得很大：',
        fr: 'Je ne remonte que la nuit.',
        gloss: 'remonter 回到上面',
        ask: '寫字的人是說——',
        opts: ['她只在晚上上去', '她晚上不上去'], a: 0,
        why: 'ne … que＝「只有」，que 後面就是唯一的時間：la nuit。晚上不上去會寫 je ne remonte pas la nuit。',
        wrong: '你以為她晚上從不上去，白天在湖邊等了一整天——只等到 Gaston 來釣魚。' },
      c11: { x: null, y: null, where: '被水沖過的牆', topic: 'pronom-y', lessons: [40],
        scene: '下一行被水沖糊了，前面那個字看不清楚，只剩後半句。Paul 舉著燈讀了兩遍：',
        fr: '…, j\'y pense chaque nuit.',
        gloss: 'penser à 想著',
        ask: '被沖掉的那個字，比較可能是——',
        opts: ['🔔 La cloche（鐘）', '👨 Bernard（哥哥）'], a: 0,
        why: 'y 只能代替「à＋東西」；想的是哥哥會寫 je pense à lui。',
        wrong: '你跑回去跟 Bernard 說她每晚都在想他，他眼睛紅了一整天——後來你才看懂，她寫的是鐘。' },
      c12: { x: null, y: null, where: '最深處', topic: 'discours-rapporte', lessons: [39, 31],
        scene: 'Paul 在最深處等你，臉色發白：霧裡有人跟他說話，看不見人，只聽得到聲音——是 Élise。',
        fr: 'Elle me demande si la cloche est dans le clocher.',
        gloss: 'le clocher 鐘樓',
        ask: 'Élise 跟 Paul 說的是——',
        opts: ['她在問：鐘是不是在鐘樓裡', '她在說：鐘已經在鐘樓裡了'], a: 0,
        why: 'demander si＝問「是不是」。要是她在說鐘在鐘樓，會轉述成 elle dit que la cloche est dans le clocher。',
        wrong: 'Paul 以為她說鐘已經回去了，鬆了一口氣想走——你一把拉住他：她是在問，不是在說。' }
    },
    boss: {
      where: '🔔 鐘樓（蓋好後）',
      recap: ['Je ne remonte que la nuit.', '…, j\'y pense chaque nuit.', 'Elle me demande si la cloche est dans le clocher.'],
      ask: 'Élise 為什麼回不了家？要怎麼帶她回來？',
      opts: [
        '她只在夜裡上來找路，心裡惦著鐘、一直在問鐘回鐘樓了沒——把鐘撈上來掛回鐘樓，讓鐘聲從高處帶她回家',
        '她晚上從不上來，每天想的是哥哥——要 Bernard 自己下礦坑去接她',
        '她說鐘已經回到鐘樓了，問題不在鐘——要去別的地方找她'
      ], a: 0,
      wrongWhy: {
        1: '再看紙條一跟二：<span class="fr">ne … que la nuit</span>＝只在晚上上來；<span class="fr">j\'y pense</span> 的 y 是東西，不是人。',
        2: '再看紙條三：<span class="fr">elle me demande si…</span>——她是在問，不是在說。'
      },
      skipHint: {
        c10: '牆上寫著：她只在晚上上來。',
        c11: '牆上那行字，她每晚想著的是一樣東西，不是一個人。',
        c12: 'Paul 說，Élise 是在問他鐘在不在鐘樓。'
      },
      reveal: '四個人划著 Margot 的船，把鐘從湖底拉上來，掛回鐘樓。午夜，Bernard 敲下一年來的第一聲——霧往後退了一步，橋上亮起一盞提燈。Élise 頭髮濕的、手很冷，在笑：霧裡看不見路，只有從高處來的鐘聲聽得出方向。',
      hookFr: 'Je ne suis pas seule en bas.',
      hookGloss: 'seul(e) 一個人・en bas 在下面',
      hook: 'Élise 回頭看著霧。這些年從 Val-Brume「搬走」的人——他們沒有走遠。<b>第一幕完。</b>',
      gold: 80
    }
  }
];
if (typeof module !== 'undefined') module.exports = STORY_CH2_4;
