/* ============================================================
   ⚠️ 劇透草稿：town.html 主線第三章「河對岸」（2026-10-29）
   ⛔ 還沒接進 town.html。設定全貌：drafts/STORY_BIBLE_v2_2026-10-29.md
   格式仿照 town.html 的 CH2（scene／fr／gloss／ask／opts／a／topic／why／hint），另加：
     lessons：french_notes.html 的 lesson-N（出處逐條寫在每句上面的註解）
     sceneAlt：同一格因為「走哪條路拿到」而換的旁白（只有第 2 格有）
     skipHint：這格被跳過時，之後的畫面補一句中文轉述（跳過的人不會卡關）
   ⚠️ 三句法文是原創，照無限城例外；只用 french_notes.html 已學句型與詞彙。
   ⚠️ 每一格選項只有一個對（已逐格檢查，理由寫在 why）。

   ── 這章怎麼玩 ──────────────────────────────
   解鎖：S.ch2done（第二章結尾玩家以為「鐘被搬上船往下游去了」）
   ① ⛵ 碼頭（口說群島的木碼頭，橋東邊、南岸，不用修橋）遇到 Margot → CH3[0]
   ② 拿到「鐘的碎片」——兩條路，走哪條都可以（⭐ 跳過合法：不用兩條都走）：
        A. 🏝 口說群島走完一座島（那座島每一個地標都看過）→ 島邊的沙灘撿到
        B. 🎣 河邊聽力答對 CH3_PATHS.fishNeed 題（從第三章開始算）→ 網子撈到
      拿到的那一刻跳 CH3[1]（碎片上的刻字）
   ③ 拿碎片去 ⚒ 鐵匠鋪 → CH3[2] → ch3End()
   每格都有「↷ 晚點再問」（關掉、回來從沒答完的那格接）和「⏭ 這題跳過」（不計分、不記錯，直接往下走）。
   ============================================================ */

var CH3 = [
  /* ── 第 1 格：碼頭，Margot ──────────────────────────────
     fr：On n'entend plus la cloche depuis dix ans.
     文法點：
       ・depuis＋一段時間＝從那時候到現在還是這樣（la continuité）
         —— lesson-45 主文法「時間指示詞三類」表（#16647 J'habite à Toulouse depuis deux ans.）；第一次學在 lesson-16（#4691／#4961 à／il y a／depuis 三分）
       ・ne … plus＝不再 —— lesson-18（#5426）
       ・整句骨架幾乎等於 lesson-33 #11976 Je ne regarde plus la télévision depuis dix ans…（Owen 自己組過的句子）
       ・on＝大家 —— lesson-9 #2889 On n'aime pas ça.（on n' 的省音同型）；On n'a pas trouvé de lit. lesson-11 #3312
       ・entendre 聽到 —— lesson-21 #6246、#6484（on entendait le chant des oiseaux）
       ・la cloche：⚠️ 筆記和課本都沒有（research/2026-10-22_劇本法文複核.md 已查）→ gloss 一定要寫（③-24 的教訓：每一格都寫，不靠前一格）
     why 裡的對照句：
       ・on a entendu la cloche il y a dix ans —— il y a＝…之前，一次結束的動作：lesson-45 表（#16643 一帶 Il est parti il y a dix minutes.）、lesson-11 #3315、lesson-17 #5186
       ・on entendra la cloche dans dix ans —— dans＝…之後：lesson-45 #16643 Il reviendra dans deux jours.
       ⭐ ②-21 的教訓：對照句只換「時間詞」，不去碰別的時態搭配；futur 只跟 dans 配，沒有跟 si 混用
     👂 聲音：on n'entend 跟 on entend 唸起來一樣（n' 被連音吃掉），否定要靠後面的 plus 聽出來 → 寫在 hint
     選項唯一性：① depuis＝持續到現在 ✓；② 是 il y a（一次）✗；③ 是 dans（未來）✗ */
  { scene:'碼頭邊，一個女人在補一艘舊船——是 Margot，她剛回到鎮上。你問她有沒有看過一艘載著鐘的船往下游去，她抬頭看了看鐘樓：',
    fr:'On n\'entend plus la cloche depuis dix ans.',
    gloss:'la cloche 鐘・entendre 聽到・ne … plus 不再・depuis 從…起（到現在）',
    ask:'Margot 的意思是——',
    opts:['十年來都沒人聽到鐘聲，到現在還是','十年前，大家聽到過一次鐘聲','再過十年，才會聽到鐘聲'], a:0, topic:'duree', lessons:[45, 16, 18, 33],
    why:'depuis＋一段時間＝從那時候一直到現在都還是這樣；ne … plus＝不再。十年前發生一次會用 il y a：on a entendu la cloche il y a dix ans；十年後會用 dans：on entendra la cloche dans dix ans。',
    hint:'看 <span class="fr">depuis</span>：從那時候「一直到現在」。（<span class="fr">n\'</span> 唸起來聽不到，否定靠後面的 <span class="fr">plus</span>）',
    skipHint:'Margot 說，鎮上已經十年沒聽到鐘聲了。' },

  /* ── 第 2 格：鐘的碎片（兩條路拿到，同一塊碎片）──────────────────
     fr：Pour ceux qui reviennent.（碎片邊緣的刻字；格式呼應第一章鑰匙上的 « Pour la cloche. »）
     文法點：
       ・ceux qui＝「…的那些人」，陽性複數，泛指一群人 —— lesson-38 主文法（#14139 Ceux qui ne font pas assez attention au soleil.、#14140、#14184 課本原句）
       ・celui／celle qui＝單數（why 的對照）—— lesson-38 #14181 celle qui est partie…、#14207 c'est celui qui est blanc et bleu
       ・revenir 的 ils 形 reviennent —— lesson-21 #6362 Elles reviennent du Sénégal ?
       ・pour＋人＝給…的 —— 第一章已上線的 « Pour la cloche. » 同格式（pour 是 A1 基本介系詞，未逐課查證首次出現）
     why 裡的對照句：celui qui revient／celle qui revient（lesson-38）、ceux qui partent（partir：lesson-17 起的 passé composé 動詞，ils partent 現在式未逐課查證）
     👂 聲音：ceux [sø] 跟 eux 很像（lesson-38 #14410 老師提醒）；reviennent [ʁəvjɛn] ≠ revient [ʁəvjɛ̃]——複數兩處都聽得出來
     選項唯一性：① 複數＋回來 ✓；② 單數 ✗（要 celui／celle）；③ 離開 ✗（要 partent）
     ⭐ 伏筆（第二部才收）：鐘本來是為「所有回來的人」響的；麵包師傅等的只有「某一個人」——選項 ② 就是他的心事，但題目本身只考文法、不騙人 */
  { scene:'你在島的另一頭、浪打上來的沙灘上，撿到一塊沉甸甸的金屬。邊緣刻著一行字：',
    sceneAlt:{ isle:'你在島的另一頭、浪打上來的沙灘上，撿到一塊沉甸甸的金屬。邊緣刻著一行字：',
               river:'收網的時候，網子裡卡著一塊沉甸甸的金屬。邊緣刻著一行字：' },
    fr:'Pour ceux qui reviennent.',
    gloss:'la cloche 鐘・ceux qui …的那些人・revenir 回來（ils reviennent）',
    ask:'這行字是寫給誰的？',
    opts:['所有回來的人（不只一個）','某一個回來的人','所有離開的人'], a:0, topic:'pronoms-demonstratifs', lessons:[38, 21],
    why:'ceux＝「那些人」，是複數；寫給一個人會是 celui qui revient（男）／celle qui revient（女）。離開是 partir：ceux qui partent。',
    hint:'看 <span class="fr">ceux</span> 跟 <span class="fr">reviennent</span>：兩個都是複數；revenir＝回來。',
    skipHint:'碎片上刻的字，是寫給所有回來的人的。' },

  /* ── 第 3 格：鐵匠鋪 ──────────────────────────────
     fr：Si tu trouves les autres morceaux, je ferai une nouvelle cloche.
     文法點：
       ・si＋現在式＋未來式＝預測一個還沒發生、不一定會發生的結果 —— lesson-28 主文法①（#9299 一帶 Fonctionnement 表、#9323 Si tu gagnes le concours, ton invention deviendra célèbre.）
       ・si vs quand（不一定 vs 一定）—— lesson-28「本課最容易錯的一格」（#9314 Quand tu auras 18 ans, je t'achèterai un ordinateur.、#9346）
       ・faire 的未來式 je ferai —— lesson-27 #9012（fer- 字根）
       ・une nouvelle＋陰性名詞 —— lesson-8 #2445 une nouvelle voiture
       ・un morceau 一塊 —— lesson-29 #9908 en petits morceaux（生字等級：學過但不常用 → gloss 寫）
       ・trouver 找到 —— lesson-11 #3312 On n'a pas trouvé de lit.
       ・les autres —— lesson-5 #1585、lesson-26 #8235
     why 裡的對照句：
       ・Quand tu trouveras les autres morceaux, je ferai… —— quand＋未來＋未來（lesson-28 #9314 同型）
       ・j'ai fait une nouvelle cloche —— passé composé（lesson-17）
       ⭐ ②-21 的教訓：si 後面一律現在式，⛔ 不寫 si＋imparfait／si＋futur 的對照；why 只拿「si↔quand」「futur↔passé composé」兩組合法的對照
     選項唯一性：① si＝不一定 ✓；② 一定會 → 要 quand＋futur ✗；③ 已經打好 → 要 passé composé ✗ */
  { scene:'鐵匠把碎片翻過來敲了一下，聲音又細又亮：「是鐘的，沒錯。」他看著碎片碎掉的那一邊，說：',
    fr:'Si tu trouves les autres morceaux, je ferai une nouvelle cloche.',
    gloss:'la cloche 鐘・un morceau 一塊・je ferai（faire 的未來式）',
    ask:'鐵匠確定你找得到其他碎片嗎？',
    opts:['不確定——他說的是「要是你找得到」','確定——他知道你一定會找到','他已經把新的鐘打好了'], a:0, topic:'condition-si', lessons:[28, 27, 8, 29],
    why:'si＝如果（不一定會發生）：si＋現在式（trouves），結果用未來式（ferai）。確定會發生要用 quand＋未來式：quand tu trouveras les autres morceaux…；已經打好會說 j\'ai fait une nouvelle cloche。',
    hint:'看開頭的 <span class="fr">si</span>：「要是」——還不一定。<span class="fr">ferai</span> 是未來式，還沒打。',
    skipHint:'鐵匠說：要是找得到其他碎片，他就打一口新的鐘。' }
];

/* ── 兩條路的條件（數字待 Owen 拍板，見 STORY_BIBLE_v2 §7）── */
var CH3_PATHS = {
  fishNeed: 4,      /* B 路：第三章開始後，🎣 河邊聽力「答對」幾題撈到碎片（一個釣點 2 竿 → 約跑 2–3 個釣點）。⛔ 答錯不扣、不歸零 */
  isle: 'all-seen'  /* A 路：任一座島，palRoom(I) 每個單位 pst(ref).seen 都有（自我介紹島走全島；還沒蓋好的島走房間版也算） */
};

/* ── 章末（第 3 格答完或跳過後）── */
var CH3_END = {
  recap: '鐘不是整口被載走的——它碎了，碎片順著河漂到下游的島上。<br>可是，一口鐘怎麼會碎成這樣？',
  /* 鉤子（⚠️ 可選，待 Owen 拍板；不是題目，不計分）
     fr：Elle n'est jamais revenue.
     文法點：ne … jamais＋passé composé（être 助動詞、revenue 跟 elle 配合加 -e）
       —— ne … jamais：lesson-6 #1910；être＋accord／jamais＋passé composé：lesson-28 #9380 où vous n'êtes jamais allé(e)、lesson-45 #16708 Vous n'êtes jamais venus avant ?
       ⚠️ 這句的文法點（jamais、être 的配合）跟第二章重複，所以只放在鉤子、不出題
     ⭐ 雙關伏筆：玩家此時會以為 elle＝la cloche（第二章的習慣）；第二部揭曉是麵包師傅的女兒。字面上兩種都成立，⛔ 不要在這裡解釋 */
  hookScene: '你回到碼頭。Margot 看著碎片上的字，看了很久才開口：',
  hookFr: 'Elle n\'est jamais revenue.',
  hookGloss: 'revenir 回來（être 當助動詞 → elle est revenue）・ne … jamais 從來沒有',
  after: 'Margot 留在碼頭了——鎮上又多了一個人。',
  gold: 40,
  next: '下一章：🔒 第四章「重鑄」製作中'
};

/* ============================================================
   接進 town.html 的草圖（⛔ 這裡只是樣子，名稱照 town.html 現有的；接的時候逐行對）
   狀態：S.ch3 = { step:0..3, frag:'isle'|'river'|null, fish:0, skip:{} }；完成 S.ch3done=1
   ============================================================ */
function ch3St(){ S.ch3 = S.ch3 || { step:0, frag:null, fish:0, skip:{} }; return S.ch3; }

/* A 路：任一座島全部地標都看過 */
function ch3IsleDone(){
  return isles().some(function(I){ var u = palRoom(I); return u.length && u.every(function(g){ return pst(g.ref).seen; }); });
}

/* B 路：在 fishSpot 的兩個 rec(...) 後面各加一行 → if(ok===true) ch3Fish(); */
function ch3Fish(){
  if(!S.ch2done || S.ch3done) return;
  var c = ch3St(); if(c.step < 1 || c.frag) return;           /* 先在碼頭見過 Margot 才開始算 */
  c.fish++; save();
  if(c.fish >= CH3_PATHS.fishNeed){ c.frag = 'river'; save(); /* 釣點的 sheet 關掉後再跳 */ setTimeout(function(){ ch3Talk(1); }, 400); }
}

/* 第 2 格的觸發點：isleExit()（離開島）與 archOpen()（打開群島）都檢查一次 */
function ch3CheckIsle(){
  if(!S.ch2done || S.ch3done) return;
  var c = ch3St(); if(c.step < 1 || c.frag) return;
  if(ch3IsleDone()){ c.frag = 'isle'; save(); ch3Talk(1); }
}

/* 對話：照 ch2Talk 的寫法；多一顆「⏭ 這題跳過」（不計分、不記錯、直接往下） */
function ch3Talk(step){
  var c = ch3St(), T = CH3[step], t0 = Date.now(), tried = false;
  var scene = (T.sceneAlt && c.frag) ? T.sceneAlt[c.frag] : T.scene;
  openSheet('<h3>⛵ 第三章・河對岸 <small>'+(step+1)+'／3</small></h3><div class="story">'+scene+'</div><div class="clue">'+esc(T.fr)+' '+spk(T.fr)+'</div><div class="muted">'+esc(T.gloss)+'</div>'+
    '<div class="qtext">'+esc(T.ask)+'</div><div class="opts">'+T.opts.map(function(o,i){ return '<button data-i="'+i+'" style="font-family:inherit">'+esc(o)+'</button>'; }).join('')+'</div><div class="fb" id="fb"></div>'+
    '<div class="row2"><button class="btn ghost" id="later">↷ 晚點再問</button><button class="btn ghost" id="skip">⏭ 這題跳過</button><span id="slot"></span></div>', true);
  speak(T.fr);
  var done = false;
  function next(){ c.step = Math.max(c.step, step + 1); save();
    if(step === 0){ closeSheet(); toast('去河對岸找找看：🏝 口說群島，或 🎣 河邊'); return; }
    if(step === 1){ closeSheet(); toast('把碎片拿去 ⚒ 鐵匠鋪'); return; }
    ch3End(); }
  sheet.querySelectorAll('.opts button').forEach(function(b){ b.onclick = function(){
    if(done) return; var i = +b.dataset.i, ok = i === T.a;
    if(!tried){ tried = true; rec('q', {topic:T.topic, _i:'ch3-'+step, q:T.fr+'　'+T.ask, aNote:T.why, a:T.opts[T.a], say:T.fr}, ok, Date.now()-t0, {chosen:T.opts[i], right:T.opts[T.a], where:'⛵ 第三章'}); }
    if(!ok){ b.classList.add('no'); document.getElementById('fb').innerHTML = '🔎 '+T.hint; return; }
    done = true; b.classList.add('ok');
    document.getElementById('fb').innerHTML = '✓ 看穿了。<div>🔎 '+esc(T.why)+'</div>';
    document.getElementById('later').style.visibility = 'hidden'; document.getElementById('skip').style.visibility = 'hidden';
    document.getElementById('slot').outerHTML = '<button class="btn main" id="go">繼續</button>';
    document.getElementById('go').onclick = next;
  }; });
  document.getElementById('later').onclick = function(){ if(done) return; closeSheet(); };
  /* ⏭ 跳過：GameLog 記 null（rec 遇到 ok===null 只記 log、不進複習／錯題）；skipHint 之後的畫面會用到 */
  document.getElementById('skip').onclick = function(){ if(done) return; done = true;
    if(!tried) rec('q', {topic:T.topic, _i:'ch3-'+step, q:T.fr+'　'+T.ask, aNote:T.why, a:T.opts[T.a], say:T.fr}, null, Date.now()-t0, {where:'⛵ 第三章'});
    c.skip[step] = 1; save(); next(); };
}

function ch3End(){
  if(!S.ch3done){ S.ch3done = 1; S.gold += CH3_END.gold; save(); hud(); }
  var c = ch3St(), miss = [0,1,2].filter(function(i){ return c.skip[i]; }).map(function(i){ return CH3[i].skipHint; });
  openSheet('<h3>⛵ 第三章完</h3>'+(miss.length ? '<div class="muted">'+miss.join('<br>')+'</div>' : '')+
    '<div class="story">'+CH3_END.recap+'<br><br>'+CH3_END.hookScene+'<span class="fr">« '+esc(CH3_END.hookFr)+' »</span> '+spk(CH3_END.hookFr)+'<br>'+CH3_END.after+'</div>'+
    '<div class="muted">'+esc(CH3_END.hookGloss)+'<br>+'+CH3_END.gold+' 🪙　'+CH3_END.next+'</div><div class="row2"><span></span><button class="btn main" id="ok">好</button></div>');
  document.getElementById('ok').onclick = closeSheet;
}

/* storyChapters() 第三章那一列（取代 {t:'第三章・河對岸', soon:1}）：
   {t:'第三章・河對岸', steps:[['去 ⛵ 碼頭', (S.ch3&&S.ch3.step>=1)||!!S.ch3done],
                               ['找到鐘的碎片（🏝 走完一座島，或 🎣 河邊）', !!(S.ch3&&S.ch3.frag)||!!S.ch3done],
                               ['拿去 ⚒ 鐵匠鋪', !!S.ch3done]]}
   ⛔ 不顯示 fish 的「x／4」（不秀分母）

   questInfo()（接在 if(!S.ch2done) 那行後面）：
   if(!S.ch3done){ var c3=ch3St();
     if(c3.step<1) return {t:'第三章：去 <b>⛵ 碼頭</b>看看那艘船', to:{x:24.5,y:10.5}};
     if(!c3.frag) return {t:'第三章：去河對岸找鐘的碎片——🏝 口說群島，或 🎣 河邊', to:{x:24.5,y:10.5}};
     return {t:'第三章：拿碎片去 <b>⚒ 鐵匠鋪</b>', to:door('forge')}; }

   觸發：
   ・碼頭（CH.kind==='palace'）：S.ch2done && ch3St().step<1 → 先 ch3Talk(0)，關掉後才 archOpen()
   ・碎片：ch3CheckIsle()（isleExit／archOpen）、ch3Fish()（fishSpot 的 rec 後）
   ・鐵匠（CH.kind==='forge' 或 openLot('forge')）：ch3St().frag && step===2 → 先 ch3Talk(2)
   ・ch2End 的「🔒 第三章「河對岸」製作中」改成「下一章：去 ⛵ 碼頭」
   ============================================================ */

if (typeof module !== 'undefined') module.exports = { CH3: CH3, CH3_PATHS: CH3_PATHS, CH3_END: CH3_END };
