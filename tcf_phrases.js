/* 📎 模考查字的片語表（2026-11-13，規格 PRD_vocab_bank.md「片語」段）
   Owen：「avoir lieu／se tourner les pouces／en train de 這類片語，一個字一個字查認不出來」
   - 用途：mock.html 點兩下查字時，認出這個字落在哪個片語裡 → 彈窗最上面多一條「📎 片語」
   - ⚠️ 這裡的中文是「查字輔助」（像字典），不是要 Owen 背的句子；要背的原句一律取自題庫原文
   - 清單來源：先列常見片語，再用 tools/exam_phrases.js 拿 88 套模考的原文／逐字稿（spaCy 原形）去數，
     只留題庫裡真的出現過的（11-13：184 條，出現最多的是 il y a 462 題、il faut、plus de、parce que）
   - 比對用「原形」：每個片語寫成原形序列（p），沒寫 p 就由顯示形自動轉
     · SE＝反身代名詞位置（se／me／te／nous／vous 都算）
     · 中間可以夾否定、副詞、助動詞（n'a pas lieu／s'est rendu compte／a déjà eu lieu）
     · ⛔ 不跨標點（句號、逗號…）
   ⛔ 改這張表之後跑 node tools/exam_phrases.js，看每條的出現次數＋抽樣句子 */
(function (root) {
  var PH = [
    /* ── 動詞片語 ── */
    ['avoir lieu', '舉行；發生'],
    ['avoir besoin de', '需要'],
    ['avoir envie de', '想要（做）'],
    ['avoir l\'air', '看起來（好像）'],
    ['avoir du mal à', '很難…；…有困難', 'avoir de le mal à'],
    ['avoir de la chance', '運氣好', 'avoir de le chance'],
    ['avoir raison', '（說得）對'],
    ['avoir tort', '（說得）不對；錯了'],
    ['avoir peur de', '害怕'],
    ['avoir l\'habitude de', '習慣（做）'],
    ['avoir l\'occasion de', '有機會（做）'],
    ['avoir le temps de', '有時間（做）'],
    ['avoir l\'intention de', '打算'],
    ['avoir mal à', '…痛'],
    ['être en train de', '正在（做）'],
    ['en train de', '正在（做）'],
    ['venir de', '剛剛（做了）；來自'],
    ['être d\'accord', '同意'],
    ['être en retard', '遲到'],
    ['être à l\'heure', '準時', 'être à le heure'],
    ['être à l\'origine de', '是…的起源；造成…', 'être à le origine de'],
    ['faire partie de', '是…的一部分；屬於'],
    ['faire attention à', '注意；小心'],
    ['faire la queue', '排隊', 'faire le queue'],
    ['faire face à', '面對'],
    ['faire appel à', '求助於；找（某人）來'],
    ['faire des économies', '存錢；省錢', 'faire un économie'],
    ['faire du bien', '對…有好處；讓人舒服', 'faire de le bien'],
    ['faire confiance à', '信任'],
    ['mettre en place', '設立；實施'],
    ['mettre en valeur', '凸顯；突顯價值'],
    ['mettre fin à', '結束；終止'],
    ['mettre en œuvre', '實施；執行'],
    ['prendre en compte', '考慮進去'],
    ['prendre en charge', '負責；承擔（費用）'],
    ['prendre part à', '參加'],
    ['prendre soin de', '照顧'],
    ['prendre rendez-vous', '預約', 'prendre rendez-vous'],
    ['prendre conscience de', '意識到'],
    ['tenir compte de', '考慮到'],
    ['rendre visite à', '拜訪（某人）'],
    ['valoir la peine', '值得', 'valoir le peine'],
    ['il vaut mieux', '最好（還是）…', 'il valoir mieux'],
    ['il s\'agit de', '是關於…；指的是…', 'il SE agir de'],
    ['s\'agir de', '是關於…；指的是…', 'SE agir de'],
    ['il y a', '有…；（接時間）…以前', 'il y avoir'],
    ['il faut', '必須；需要', 'il falloir'],
    ['il paraît que', '聽說', 'il paraître que'],
    ['se rendre compte', '意識到；發覺', 'SE rendre compte'],
    ['se tourner les pouces', '閒著沒事做（直譯：轉大拇指）', 'SE tourner le pouce'],
    ['se mettre à', '開始（做）', 'SE mettre à'],
    ['se mettre d\'accord', '達成共識', 'SE mettre de accord'],
    ['se passer', '發生；進行', 'SE passer'],
    ['se passer de', '不用…也行；省掉', 'SE passer de'],
    ['se trouver', '位於；處在', 'SE trouver'],
    ['se rendre à', '前往', 'SE rendre à'],
    ['se servir de', '使用', 'SE servir de'],
    ['s\'occuper de', '負責；照顧', 'SE occuper de'],
    ['se souvenir de', '記得', 'SE souvenir de'],
    ['se sentir', '感覺（自己）', 'SE sentir'],
    ['se déplacer', '移動；出門（往來）', 'SE déplacer'],
    ['se tromper', '弄錯', 'SE tromper'],
    ['se plaindre', '抱怨', 'SE plaindre'],
    ['s\'inscrire', '報名；註冊', 'SE inscrire'],
    ['s\'intéresser à', '對…有興趣', 'SE intéresser à'],
    ['se retrouver', '（又）聚在一起；結果落得…', 'SE retrouver'],
    ['ça te dit de', '你想不想…？（邀約）', 'ça te dire de'],
    ['s\'il vous plaît', '請', 'se il vous plaire'],
    ['s\'il te plaît', '請', 'se il te plaire'],
    ['qu\'est-ce que', '（問句開頭）什麼', 'que être ce que'],
    ['qu\'est-ce qui', '（問句開頭，當主詞）什麼', 'que être ce qui'],
    ['est-ce que', '（是非問句開頭，不用翻）', 'être ce que'],
    ['c\'est-à-dire', '也就是說', 'ce être à dire'],
    ['ne … que', '只（有）', 'ne ONE que'],
    /* ── 連接、轉折 ── */
    ['parce que', '因為'],
    ['alors que', '然而；正當…的時候'],
    ['tandis que', '而；然而'],
    ['bien que', '雖然（後接虛擬式）'],
    ['pour que', '為了讓（後接虛擬式）'],
    ['afin de', '為了（做）'],
    ['afin que', '為了讓（後接虛擬式）'],
    ['même si', '即使'],
    ['dès que', '一…就…'],
    ['depuis que', '自從'],
    ['avant de', '在（做）…之前'],
    ['à condition de', '只要…；條件是…'],
    ['à condition que', '只要…；條件是…（後接虛擬式）'],
    ['d\'autant plus que', '更何況；尤其因為', 'de autant plus que'],
    ['à cause de', '因為（壞事）'],
    ['grâce à', '多虧；靠著'],
    ['au lieu de', '而不是；代替', 'à le lieu de'],
    ['à la place de', '代替', 'à le place de'],
    ['en tant que', '作為'],
    ['en fonction de', '依照；視…而定'],
    ['par rapport à', '相對於；關於'],
    ['à propos de', '關於'],
    ['au sujet de', '關於', 'à le sujet de'],
    ['en ce qui concerne', '至於；就…而言', 'en ce qui concerner'],
    ['au niveau de', '在…方面；在…層級', 'à le niveau de'],
    ['dans le cadre de', '在…的範圍內；作為…的一部分'],
    ['au sein de', '在…內部', 'à le sein de'],
    ['au cours de', '在…期間', 'à le cours de'],
    ['au bout de', '…之後；在…盡頭', 'à le bout de'],
    ['au fil de', '隨著（時間）', 'à le fil de'],
    ['tout au long de', '在…整段期間', 'tout à le long de'],
    ['à partir de', '從…開始'],
    ['jusqu\'à', '直到', 'jusque à'],
    ['près de', '在…附近；將近'],
    ['loin de', '離…很遠；遠遠不'],
    ['à côté de', '在…旁邊'],
    ['en face de', '在…對面'],
    ['au bord de', '在…邊上', 'à le bord de'],
    ['autour de', '在…周圍；大約'],
    ['à l\'étranger', '在國外', 'à le étranger'],
    ['en ligne', '線上'],
    ['la plupart de', '大部分的', 'le plupart de'],
    ['la plupart du temps', '大部分時候', 'le plupart de le temps'],
    ['plus de', '超過；更多的'],
    ['moins de', '不到；更少的'],
    ['beaucoup de', '很多的'],
    ['un peu de', '一點點的'],
    ['pas mal de', '不少的'],
    ['plein de', '很多的（口語）'],
    ['un grand nombre de', '大量的'],
    ['une trentaine de', '三十個左右的', 'un trentaine de'],
    ['une dizaine de', '十個左右的', 'un dizaine de'],
    ['une vingtaine de', '二十個左右的', 'un vingtaine de'],
    ['une centaine de', '一百個左右的', 'un centaine de'],
    /* ── 副詞片語、口語 ── */
    ['de plus en plus', '越來越'],
    ['de moins en moins', '越來越少'],
    ['tout à fait', '完全；沒錯'],
    ['pas du tout', '一點也不', 'pas de le tout'],
    ['tout de suite', '馬上'],
    ['tout à coup', '突然'],
    ['tout le monde', '大家'],
    ['à la fois', '同時', 'à le fois'],
    ['en même temps', '同時'],
    ['en fait', '其實'],
    ['en effet', '的確；因為'],
    ['par exemple', '例如'],
    ['par contre', '相反地；可是'],
    ['en revanche', '相反地'],
    ['au contraire', '相反地', 'à le contraire'],
    ['d\'ailleurs', '而且；順帶一提', 'de ailleurs'],
    ['d\'abord', '首先', 'de abord'],
    ['tout d\'abord', '首先', 'tout de abord'],
    ['en plus', '而且；另外'],
    ['en plus de', '除了…之外還'],
    ['de toute façon', '反正；無論如何', 'de tout façon'],
    ['en tout cas', '無論如何'],
    ['quand même', '還是；畢竟；真是的'],
    ['bien sûr', '當然'],
    ['d\'accord', '好；同意', 'de accord'],
    ['au moins', '至少', 'à le moins'],
    ['du moins', '至少；起碼', 'de le moins'],
    ['à peine', '幾乎不；剛剛'],
    ['peu à peu', '漸漸地'],
    ['de temps en temps', '偶爾'],
    ['de nouveau', '再次', 0, /^de nouveau$/i],
    ['à nouveau', '再次'],
    ['sans doute', '大概；想必'],
    ['en général', '一般來說'],
    ['en particulier', '尤其'],
    ['en moyenne', '平均'],
    ['à l\'avance', '事先', 'à le avance'],
    ['en avance', '提早'],
    ['en retard', '遲到；落後'],
    ['au début', '一開始', 'à le début'],
    ['à la fin', '最後', 'à le fin'],
    ['à la fin de', '在…的最後', 'à le fin de'],
    ['pour la première fois', '第一次', 'pour le premier fois'],
    ['un peu', '一點；有點'],
    ['un petit peu', '一點點'],
    ['n\'importe quel', '隨便哪個', 'ne importer quel'],
    ['à tout à l\'heure', '待會見', 'à tout à le heure'],
    ['tout à l\'heure', '待會；剛才', 'tout à le heure'],
    ['à bientôt', '再見；回頭見'],
    ['ça dépend', '看情況', 'ça dépendre'],
    ['ça va', '還好；好嗎', 'ça aller'],
    ['quelque chose', '某件事；什麼東西'],
    ['ne … rien', '什麼都沒', 'ne ONE rien'],
    ['ne … jamais', '從來沒有', 'ne ONE jamais'],
    ['ne … plus', '不再', 'ne ONE plus'],
    ['ne … personne', '沒有人', 'ne ONE personne']
  ];

  var ELI = { c: 'ce', qu: 'que', j: 'je', l: 'le', s: 'se', m: 'me', t: 'te', n: 'ne', d: 'de', jusqu: 'jusque', lorsqu: 'lorsque', puisqu: 'puisque' };
  var MAPW = { la: 'le', les: 'le', une: 'un', au: ['à', 'le'], aux: ['à', 'le'], du: ['de', 'le'], sa: 'son', ses: 'son', ma: 'mon', mes: 'mon', ta: 'ton', tes: 'ton', nos: 'notre', vos: 'votre', leurs: 'leur' };
  var REFL = { se: 1, me: 1, te: 1, nous: 1, vous: 1 };
  var NEG = { pas: 1, plus: 1, jamais: 1, rien: 1, personne: 1, point: 1, guère: 1 };
  var QUE_GLUE = { ce: 1, parce: 1, alors: 1, bien: 1, pour: 1, afin: 1, tandis: 1, 'dès': 1, depuis: 1, sorte: 1, avant: 1, 'après': 1, pendant: 1, 'même': 1, moins: 1, autant: 1, tant: 1, si: 1, aussi: 1, ainsi: 1, tel: 1, autre: 1, lors: 1 };
  /* 片語中間可以夾的字：否定、常見副詞、y／en（il n'y a pas、il y en a）；助動詞（詞性 AUX）另外放行 */
  var SKIP = { ne: 1, pas: 1, plus: 1, jamais: 1, rien: 1, 'déjà': 1, bien: 1, vraiment: 1, toujours: 1, encore: 1, aussi: 1, souvent: 1, 'même': 1, en: 1, y: 1 };
  /* w＝字面（du／au／aux 在 spaCy 是一個字，原形只剩 de／à，這裡拆回「de le」「à le」，跟 de la／à la 對齊） */
  var CONTR = { du: 'de', au: 'à', aux: 'à' };
  function normLemma(l, w, pos) {
    w = String(w || '').toLowerCase();
    if (CONTR[w] || (w === 'des' && pos === 'ADP')) return [CONTR[w] || 'de', 'le'];
    l = String(l || '').toLowerCase().replace(/’/g, '\'').replace(/^-+/, '');
    if (/'$/.test(l)) { var b = l.slice(0, -1); return [ELI[b] || b]; }
    var m = MAPW[l]; if (m) return [].concat(m);
    if (l === '-t' || l === 't') return [];
    return [l];
  }
  function patOf(e) {
    if (e[2]) return e[2].split(' ');
    var out = [];
    e[0].toLowerCase().replace(/’/g, '\'').split(/\s+|(?<=')/).filter(Boolean).forEach(function (w) { out = out.concat(normLemma(w)); });
    return out;
  }
  var LIST = PH.map(function (e, i) { return { id: i, fr: e[0], zh: e[1], p: patOf(e), sf: e[3] || null }; });
  /* 第一個字當索引，比對快一點 */
  var BY = {};
  LIST.forEach(function (e) { var k = e.p[0] === 'SE' ? '@SE' : e.p[0]; (BY[k] = BY[k] || []).push(e); });

  /* toks：[{l: 原形, p: 詞性, gap: 跟前一個字之間的文字}]
     回傳 [{id, i0, i1}]（i0..i1 是 toks 的索引，含頭尾） */
  function match(toks) {
    var flat = [];                                   /* 展開成原形序列，記住來自哪個字 */
    toks.forEach(function (t, i) {
      var ls = normLemma(t.l, t.w, t.p), brk = i > 0 && /[.?!;:,«»"()–—…]/.test(t.gap || '');   /* ⚠️ 換行不算斷：逐字稿是 PDF 換行 */
      ls.forEach(function (l, j) { flat.push({ l: l, i: i, aux: t.p === 'AUX', brk: brk && j === 0 }); });
    });
    var hits = [], seen = {};
    for (var s = 0; s < flat.length; s++) {
      var f = flat[s], cands = (BY[f.l] || []).concat(isRefl(s) ? (BY['@SE'] || []) : []);
      cands.forEach(function (e) {
        var k = s, skips = 0, ok = true;
        for (var pi = 0; pi < e.p.length; pi++) {
          var want = e.p[pi];
          if (pi > 0) {
            k++;
            /* 跳過可以夾的字（否定、副詞、助動詞；不跨標點、最多 3 個） */
            while (want !== 'ONE' && k < flat.length && !flat[k].brk && !eq(k, want) && (SKIP[flat[k].l] || flat[k].aux) && skips < 3) { k++; skips++; }
            if (k >= flat.length || flat[k].brk) { ok = false; break; }
          }
          if (want === 'ONE') {                       /* ne … que 這類：中間至少夾一個字（動詞） */
            if (pi === 0) { ok = false; break; }
            /* ⛔ 中間夾了別的否定詞（ne … pas … que＝不認為…）不算；que 前面是 ce／parce 這類（ce que、parce que）也不算 */
            var nx = e.p[pi + 1], g = 0;
            while (k < flat.length && !flat[k].brk && flat[k].l !== nx && g < 4 && !NEG[flat[k].l]) { k++; g++; }
            if (k >= flat.length || flat[k].brk || flat[k].l !== nx || g < 1) { ok = false; break; }
            if (nx === 'que' && QUE_GLUE[flat[k - 1].l]) { ok = false; break; }
            pi++; continue;
          }
          if (!eq(k, want)) { ok = false; break; }
        }
        if (!ok) return;
        var i0 = f.i, i1 = flat[k].i, key = e.id + ':' + i0;
        if (seen[key]) return; seen[key] = 1;
        hits.push({ id: e.id, i0: i0, i1: i1 });   /* 字面限制（sf）在 matchTok 檢查，這裡沒有原文 */
      });
    }
    /* 被更長的片語完全包住、意思又是它的一部分的（en train de ⊂ être en train de；s'agir de ⊂ il s'agit de）拿掉 */
    return hits.filter(function (h) {
      return !hits.some(function (o) { return o !== h && o.i0 <= h.i0 && o.i1 >= h.i1 && (o.i1 - o.i0) > (h.i1 - h.i0) &&
        LIST[o.id].p.join(' ').indexOf(LIST[h.id].p.join(' ')) >= 0; });
    });
    function eq(k, want) { return want === 'SE' ? isRefl(k) : flat[k].l === want; }
    /* 反身位置：se 一定算；me／te／nous／vous 要前面是對應的主詞（je me、tu te、nous nous、vous vous），
       不然「il me trouve」「vous passez」會被誤認成 se trouver／se passer */
    function isRefl(k) {
      var l = flat[k].l; if (l === 'se') return true; if (!REFL[l]) return false;
      var b = k - 1; while (b >= 0 && flat[b].l === 'ne' && !flat[b + 1].brk) b--;
      return b >= 0 && !flat[b + 1].brk && flat[b].l === { me: 'je', te: 'tu', nous: 'nous', vous: 'vous' }[l];
    }
  }
  /* mock.html 的 tok 格式：[起, 迄, 原形, 詞性, 形態]，原形空白＝跟字面一樣 */
  function matchTok(text, tok) {
    var prev = 0;
    var toks = tok.map(function (t) { var w = text.slice(t[0], t[1]), o = { l: t[2] || w, w: w, p: t[3], gap: text.slice(prev, t[0]) }; prev = Math.max(prev, t[1]); return o; });
    return match(toks).filter(function (h) { var e = LIST[h.id]; return !e.sf || e.sf.test(text.slice(tok[h.i0][0], tok[h.i1][1]).replace(/\s+/g, ' ')); });
  }
  var API = { LIST: LIST, match: match, matchTok: matchTok, normLemma: normLemma };
  if (typeof module !== 'undefined' && module.exports) module.exports = API; else root.TCF_PHRASES = API;
})(this);
