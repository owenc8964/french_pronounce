// ── 題庫 ─────────────────────────────────────────────────────
const BANK = [
  // 動詞填空 ── être
  { lesson:1, topic:'etre-avoir', type:'fill', q:'Je _____ (être) taïwanais.',          hint:'être 現在式', a:'Je suis taïwanais|suis', aNote:'être → je suis' },
  { lesson:1, topic:'etre-avoir', type:'fill', q:'Tu _____ (être) français ?',           hint:'être 現在式', a:'Tu es français|es', aNote:'être → tu es' },
  { lesson:1, topic:'etre-avoir', type:'fill', q:'Elle _____ (être) coréenne.',          hint:'être 現在式', a:'Elle est coréenne|est', aNote:'être → il/elle est' },
  { lesson:1, topic:'etre-avoir', type:'fill', q:'Nous _____ (être) canadiens.',         hint:'être 現在式', a:'Nous sommes canadiens|sommes', aNote:'être → nous sommes' },
  { lesson:1, topic:'etre-avoir', type:'fill', q:'Vous _____ (être) professeur ?',       hint:'être 現在式', a:'Vous êtes professeur|êtes', aNote:'être → vous êtes' },
  { lesson:1, topic:'etre-avoir', type:'fill', q:'Ils _____ (être) italiens.',           hint:'être 現在式', a:'Ils sont italiens|sont', aNote:'être → ils/elles sont' },
  // 動詞填空 ── avoir
  { lesson:1, topic:'etre-avoir', type:'fill', q:"J'_____ (avoir) 25 ans.",              hint:'avoir 現在式（年齡）', a:"J'ai 25 ans|ai", aNote:"avoir → j'ai　⚠️ 年齡用 avoir 不用 être" },
  { lesson:1, topic:'etre-avoir', type:'fill', q:'Tu _____ (avoir) des enfants ?',       hint:'avoir 現在式', a:'Tu as des enfants|as', aNote:'avoir → tu as' },
  { lesson:1, topic:'etre-avoir', type:'fill', q:'Elle _____ (avoir) onze mois.',        hint:'avoir 現在式', a:'Elle a onze mois|a', aNote:'avoir → il/elle a' },
  { lesson:1, topic:'etre-avoir', type:'fill', q:'Nous _____ (avoir) un chien.',         hint:'avoir 現在式', a:'Nous avons un chien|avons', aNote:'avoir → nous avons' },
  { lesson:1, topic:'etre-avoir', type:'fill', q:'Vous _____ (avoir) quel âge ?',        hint:'avoir 現在式', a:'Vous avez quel âge|avez', aNote:'avoir → vous avez' },
  { lesson:1, topic:'etre-avoir', type:'fill', q:'Ils _____ (avoir) une voiture.',       hint:'avoir 現在式', a:'Ils ont une voiture|ont', aNote:'avoir → ils/elles ont' },
  // 動詞填空 ── s'appeler
  { lesson:1, topic:'reflexive-verbs', type:'fill', q:"Je _____ (s'appeler) Owen.",           hint:'反身動詞', a:"Je m'appelle Owen|m'appelle", aNote:"je me appelle → je m'appelle（母音縮寫）" },
  { lesson:1, topic:'reflexive-verbs', type:'fill', q:"Tu _____ (s'appeler) comment ?",       hint:'反身動詞', a:"Tu t'appelles comment|t'appelles", aNote:"s'appeler → tu t'appelles" },
  { lesson:1, topic:'reflexive-verbs', type:'fill', q:"Elle _____ (s'appeler) Marie.",        hint:'反身動詞', a:"Elle s'appelle Marie|s'appelle", aNote:"s'appeler → il/elle s'appelle" },
  { lesson:1, topic:'reflexive-verbs', type:'fill', q:"Nous _____ (s'appeler) les Martin.",   hint:'反身動詞', a:'Nous nous appelons les Martin|nous appelons', aNote:"s'appeler → nous nous appelons" },
  // 動詞填空 ── aimer
  { lesson:1, topic:'er-verbs', type:'fill', q:"J'_____ (aimer) le français.",         hint:'規則 -ER 動詞', a:"J'aime le français|aime", aNote:"-ER 動詞：je → e（j'aime）" },
  { lesson:1, topic:'er-verbs', type:'fill', q:'Tu _____ (aimer) la musique ?',        hint:'規則 -ER 動詞', a:'Tu aimes la musique|aimes', aNote:'aimer → tu aimes' },
  { lesson:1, topic:'er-verbs', type:'fill', q:'Nous _____ (aimer) voyager.',          hint:'規則 -ER 動詞', a:'Nous aimons voyager|aimons', aNote:'aimer → nous aimons' },
  { lesson:1, topic:'er-verbs', type:'fill', q:'Ils _____ (aimer) le sport.',          hint:'規則 -ER 動詞（字尾 -ent 不發音）', a:'Ils aiment le sport|aiment', aNote:'aimer → ils aiment（-ent 不發音）' },
  // 翻譯
  { lesson:1, topic:'etre-avoir', type:'trans', q:'我是台灣人。（男）',           hint:'nationality masc.', a:'Je suis taïwanais.', aNote:'⚠️ <b>法文的國籍不大寫</b>——英文寫 Taiwanese 要大寫，法文 taïwanais 一律小寫，只有國名和城市名才大寫。國籍直接接在 être 後面，不加冠詞。', askClaude:true },
  { lesson:1, topic:'etre-avoir', type:'trans', q:'我是台灣人。（女）',           hint:'nationality fem.', a:'Je suis taïwanaise.', aNote:'陰性加 <b>-e</b>：taïwanais → taïwanaise，字尾的 s 這時候才發音。⚠️ 一樣不大寫。（同組：français/française、japonais/japonaise）', askClaude:true },
  { lesson:1, topic:'greetings-politeness', type:'trans', q:'你好嗎？（對朋友）',           hint:'informal', a:'Ça va ?|Tu vas bien ?', aNote:'兩種都可以', askClaude:true },
  { lesson:1, topic:'greetings-politeness', type:'trans', q:'您好嗎？（正式）',             hint:'formal', a:'Vous allez bien ?', aNote:'正式版用動詞 <b>aller</b>：Vous allez bien ?；朋友之間才是 Ça va ? / Tu vas bien ?。⚠️ 整組要一起記：<b>Bonjour ＋ vous allez bien ?</b>（vous）／<b>Salut ＋ ça va ?</b>（tu），開頭選錯後面也會跟著錯。', askClaude:true },
  { lesson:1, topic:'negation', type:'trans', q:'我聽不懂。',                   hint:'négation ne…pas', a:'Je ne comprends pas.', aNote:'ne + 動詞 + pas', askClaude:true },
  { lesson:1, topic:'greetings-politeness', type:'trans', q:'可以再說一次嗎？（正式）',     hint:'', a:"Vous pouvez répéter s'il vous plaît ?|Vous pouvez répéter, s'il vous plaît ?", aNote:'課堂求救三句組：<b>Vous pouvez répéter, s\'il vous plaît ?</b>（正式）／Tu peux répéter ?（朋友）／Je ne comprends pas.（我聽不懂）。pouvoir 後面直接接原形 répéter。', askClaude:true },
  { lesson:1, topic:'greetings-politeness', type:'trans', q:'對不起，我遲到了。',            hint:'', a:'Excusez-moi, je suis en retard.', aNote:'⚠️ 中文「了」≠ passé composé！法文用現在式 je suis en retard（我現在是遲到的狀態）', askClaude:true },
  { lesson:1, topic:'greetings-politeness', type:'trans', q:'這怎麼拼？',                   hint:'', a:"Comment ça s'écrit ?", aNote:'s\'écrit 來自代動詞 s\'écrire（被寫成…）。⚠️ 這句是 <b>DELF 口說第2部分 Prénom 卡的標準問句</b>，老師課堂也一直用——考試跟日常都超高頻。', askClaude:true },
  { lesson:1, topic:'daily-routine-vocab', type:'trans', q:'祝你有美好的一天！（道別時）', hint:'不是打招呼，是道別', a:'Bonne journée !|Bonne journée', aNote:'Bonjour 打招呼 ≠ Bonne journée 道別', askClaude:true },
  { lesson:1, topic:'numbers-dates-heure', type:'trans', q:'我的生日是6月4日。',           hint:'le + 數字 + 月份', a:"Mon anniversaire, c'est le 4 juin.", aNote:'日期公式：<b>le ＋ 數字 ＋ 月份</b>，數字用一般基數（4＝quatre）。⚠️ 只有 1 號用序數 <b>le premier</b>（Le premier mai, c\'est la fête du Travail.）。月份不大寫。', askClaude:true },
  { lesson:1, topic:'numbers-dates-heure', type:'trans', q:'5月1日是勞動節。',             hint:'1號的例外說法', a:"Le premier mai, c'est la fête du Travail.", aNote:'1號說 premier，不說 un', askClaude:true },
  { lesson:1, topic:'numbers-dates-heure', type:'trans', q:"Demain, c'est mercredi.",       hint:'fr → zh', a:'明天是星期三。|明天是星期三', aNote:'星期前面<b>不加冠詞</b>＝講「這一次的星期三」；加了 le（le mercredi）就變成「每週三」＝tous les mercredis。⚠️ 星期和月份在法文都不大寫。', askClaude:true },
  { lesson:1, topic:'negation', type:'trans', q:"Je n'ai pas d'enfant.",         hint:'否定句 fr → zh', a:"我沒有小孩。|我沒有孩子。|我沒有小孩|我沒有孩子", aNote:"ne…pas + un/une → de/d'", askClaude:true },
  // 陰陽性
  { lesson:1, topic:'adjective-agreement', type:'gender', q:'français → 女性形？',         hint:'+ e', a:'française', aNote:'尾音 s 開始發音' },
  { lesson:1, topic:'adjective-agreement', type:'gender', q:'coréen → 女性形？',            hint:'子音雙寫', a:'coréenne', aNote:'-éen → + ne，雙寫 n' },
  { lesson:1, topic:'adjective-agreement', type:'gender', q:'italien → 女性形？',           hint:'子音雙寫', a:'italienne', aNote:'-ien → + ne' },
  { lesson:1, topic:'adjective-agreement', type:'gender', q:'canadien → 女性形？',          hint:'子音雙寫', a:'canadienne', aNote:'-ien → + ne' },
  { lesson:1, topic:'adjective-agreement', type:'gender', q:'grec → 女性形？',              hint:'例外', a:'grecque', aNote:'例外：+ que' },
  { lesson:1, topic:'adjective-agreement', type:'gender', q:'turc → 女性形？',              hint:'例外', a:'turque', aNote:'例外：+ que' },
  { lesson:1, topic:'adjective-agreement', type:'gender', q:'belge → 女性形？',             hint:'已是 e 結尾', a:'belge', aNote:'不變' },
  { lesson:1, topic:'adjective-agreement', type:'gender', q:'américain → 女性形？',         hint:'+ e', a:'américaine', aNote:'鼻音 -ain 變 -aine' },
  { lesson:1, topic:'adjective-agreement', type:'gender', q:'japonais → 女性形？',          hint:'+ e', a:'japonaise', aNote:'' },
  // 判斷
  { lesson:1, topic:'greetings-politeness', type:'choose', q:'見到不認識的人，問好用 tu 還是 vous？',  hint:'', a:'vous', aNote:'陌生人、長輩、正式場合', opts:['tu','vous'] },
  { lesson:1, topic:'greetings-politeness', type:'choose', q:'對朋友問好，用 tu 還是 vous？',          hint:'', a:'tu', aNote:'朋友、家人、小孩', opts:['tu','vous'] },
  { lesson:1, topic:'etre-avoir', type:'choose', q:'「我25歲」用 être 還是 avoir？',         hint:'年齡', a:'avoir', aNote:"J'ai 25 ans. 法文年齡說「擁有」幾年", opts:['être','avoir'] },
  { lesson:1, topic:'numbers-dates-heure', type:'choose', q:'「1號」的特殊說法是？',                  hint:'序數', a:'le premier|premier', aNote:'只有1號用 premier，其他用數字', opts:['le un','le premier','le numéro','le ordinal'] },
  { lesson:1, topic:'adjective-agreement', type:'choose', q:'法文國籍要大寫嗎？',                     hint:'', a:'不用|不大寫|non|no', aNote:'國籍形容詞小寫，只有國家名稱大寫', opts:['要大寫','不用'] },
  { lesson:1, topic:'numbers-dates-heure', type:'choose', q:'mercredi 來自哪顆行星？',                hint:'拉丁文', a:'水星|mercure|Mercure', aNote:'mercredi ← Mercure（水星）', opts:['金星','水星','木星','火星'] },
  { lesson:1, topic:'numbers-dates-heure', type:'choose', q:'lundi 來自什麼？',                       hint:'拉丁文', a:'月亮|lune', aNote:'lundi ← luna（月亮）', opts:['太陽','月亮','火星','土星'] },
  { lesson:1, topic:'negation', type:'choose', q:'否定句的結構是？',                       hint:'ne…', a:'ne...pas|ne … pas|ne pas', aNote:"ne + 動詞 + pas，母音前 ne → n'", opts:['ne...pas','non...pas','ne...non','pas...ne'] },

  // ── 第2課：冠詞、介詞、habiter ──────────────────────────────────
  { lesson:2, topic:'er-verbs', type:'fill', q:'J\'_____ à Taipei. (habiter)',                    zh:'我住在台北。', hint:'je + habiter', a:'J\'habite à Taipei.|habite', aNote:'habiter → j\'habite（字尾加 e，je → j\' 因母音）' },
  { lesson:2, topic:'er-verbs', type:'fill', q:'Tu _____ dans quelle ville ? (habiter)',           zh:'你住在哪個城市？', hint:'tu + habiter', a:'Tu habites dans quelle ville ?|habites', aNote:'tu habites（字尾加 -es）' },
  { lesson:2, topic:'er-verbs', type:'fill', q:'On _____ dans un appartement. (habiter)',          hint:'on → 同 il/elle 變位', a:'On habite dans un appartement.|habite', aNote:'on → habite（同 il/elle）' },
  { lesson:2, topic:'er-verbs', type:'fill', q:'Nous _____ à Lyon. (habiter)',                     zh:'我們住在里昂。', hint:'nous + habiter', a:'Nous habitons à Lyon.|habitons', aNote:'nous habitons（字尾加 -ons）' },
  { lesson:2, topic:'articles', type:'fill', q:'J\'aime _____ musique. (定冠詞)',                  hint:'musique 是陰性', a:'J\'aime la musique.|la', aNote:'la musique（陰性）' },
  { lesson:2, topic:'articles', type:'fill', q:'J\'aime _____ sport. (定冠詞)',                   hint:'sport 是陽性', a:'J\'aime le sport.|le', aNote:'le sport（陽性）' },
  { lesson:2, topic:'articles', type:'fill', q:'Il y a _____ chiens dehors. (不定冠詞複數)',       hint:'複數不定冠詞', a:'Il y a des chiens dehors.|des', aNote:'des = 複數不定冠詞「一些」' },
  { lesson:2, topic:'preposition-country', type:'fill', q:'Je vais _____ France. (介詞)',                     hint:'la France → ?', a:'Je vais en France.|en', aNote:'陰性/字尾 -e 國家 → en' },
  { lesson:2, topic:'preposition-country', type:'fill', q:'Il habite _____ Canada. (介詞)',                   hint:'le Canada → ?', a:'Il habite au Canada.|au', aNote:'陽性國家 → au（= à + le）' },
  { lesson:2, topic:'preposition-country', type:'fill', q:'Elle est née _____ États-Unis. (介詞)',            hint:'les États-Unis → ?', a:'Elle est née aux États-Unis.|aux', aNote:'複數國家 → aux（= à + les）' },

  { lesson:2, topic:'question-words', type:'trans', q:'你住在哪個城市？',                               hint:'habiter / quelle / ville', a:'Tu habites dans quelle ville ?|Tu habites quelle ville ?', aNote:'quelle（陰性）隨 ville（f）', askClaude:true },
  { lesson:2, topic:'articles', type:'trans', q:'我住在台北的一間公寓。',                          hint:'habiter / appartement / à', a:'J\'habite dans un appartement à Taipei.', aNote:'un appartement（陽性不定冠詞）', askClaude:true },
  { lesson:2, topic:'on-vs-nous', type:'trans', q:'我們住在里昂。（口語，用 on）',                   hint:'on + habiter', a:'On habite à Lyon.', aNote:'on = nous 口語版，動詞同 il/elle', askClaude:true },
  { lesson:2, topic:'articles', type:'trans', q:'我喜歡音樂和電影。',                              hint:'la musique / le cinéma', a:'J\'aime la musique et le cinéma.', aNote:'定冠詞 la/le', askClaude:true },
  { lesson:2, topic:'question-words', type:'trans', q:'你喜歡什麼音樂？',                               hint:'quelle + musique', a:'Tu aimes quelle musique ?', aNote:'quelle（陰性）隨 musique（f）', askClaude:true },
  { lesson:2, topic:'preposition-country', type:'trans', q:'她去法國，他去加拿大。',                          hint:'en / au', a:'Elle va en France, il va au Canada.', aNote:'France（陰性）→ en；Canada（陽性）→ au', askClaude:true },

  { lesson:2, topic:'adjective-agreement', type:'gender', q:'sport → 陽性 or 陰性？冠詞是？',                hint:'字尾為子音', a:'陽性 → le sport', aNote:'le sport（m）' },
  { lesson:2, topic:'adjective-agreement', type:'gender', q:'musique → 陽性 or 陰性？冠詞是？',              hint:'字尾為 -e', a:'陰性 → la musique', aNote:'la musique（f）' },
  { lesson:2, topic:'adjective-agreement', type:'gender', q:'art → 陽性 or 陰性？冠詞是？',                  hint:'母音開頭', a:'陽性 → l\'art', aNote:'l\'art（m），母音開頭用 l\'，但本身陽性' },
  { lesson:2, topic:'adjective-agreement', type:'gender', q:'histoire → 陽性 or 陰性？冠詞是？',             hint:'字尾 -e，母音開頭', a:'陰性 → l\'histoire', aNote:'l\'histoire（f），母音開頭用 l\'' },
  { lesson:2, topic:'adjective-agreement', type:'gender', q:'café → 陽性 or 陰性？冠詞是？',                 hint:'-é 結尾≠陰性 -e', a:'陽性 → le café', aNote:'le café（m），帶重音的 -é 不算陰性字尾 -e' },

  { lesson:2, topic:'vocab-places-city', type:'choose', q:'librairie 和 bibliothèque，哪個是「圖書館」？', hint:'faux ami（假朋友）', a:'bibliothèque', aNote:'librairie = 書店；bibliothèque = 圖書館', opts:['librairie','bibliothèque'] },
  { lesson:2, topic:'on-vs-nous', type:'choose', q:'「on」在口語中等於哪個主詞？', hint:'動詞變位同 il/elle', a:'nous', aNote:'On habite = Nous habitons，但動詞是 habite 不是 habitons', opts:['tu','nous','vous','ils'] },
  { lesson:2, topic:'preposition-country', type:'choose', q:'以下哪個介詞 + 國家組合是正確的？', hint:'注意陽陰複數', a:'au Canada / en France / aux États-Unis', aNote:'le Canada → au；la France → en；les États-Unis → aux', opts:['au Canada / en France / aux États-Unis','en Canada / à France / au États-Unis','à Canada / en France / au États-Unis','au Canada / à France / au États-Unis'] },
  { lesson:2, topic:'preposition-country', type:'choose', q:'「台灣」要用哪個介詞？',                hint:'島嶼無性別', a:'à Taiwan', aNote:'台灣被視為島嶼/城市，無明確性別，用 à（同城市）', opts:['à Taiwan','en Taiwan','au Taiwan','aux Taïwan'] },
  { lesson:2, topic:'numbers-dates-heure', type:'choose', q:'法文電話號碼 06 89 34 72 51 怎麼念？',           hint:'兩位兩位念', a:'zéro six, quatre-vingt-neuf, trente-quatre, soixante-douze, cinquante et un', aNote:'法文電話號碼兩位兩位念' },

  // ── 第2課補充：疑問詞、parler、國家性別 ──────────────────────────
  { lesson:2, topic:'er-verbs', type:'fill', q:'Je _____ chinois, taïwanais et anglais. (parler)', zh:'我會說中文、台語和英文。', hint:'je + parler', a:'Je parle chinois, taïwanais et anglais.|parle', aNote:'parler → je parle（語言前不加冠詞）' },
  { lesson:2, topic:'er-verbs', type:'fill', q:'Tu _____ quelle langue ? (parler)',                 zh:'你說哪種語言？', hint:'tu + parler', a:'Tu parles quelle langue ?|parles', aNote:'tu parles' },
  { lesson:2, topic:'er-verbs', type:'fill', q:'Il _____ français et espagnol. (parler)',           zh:'他會說法文和西班牙文。', hint:'il + parler', a:'Il parle français et espagnol.|parle', aNote:'il parle（同 je）' },
  { lesson:2, topic:'er-verbs', type:'fill', q:'Vous _____ anglais ? (parler)',                     zh:'你們會說英文嗎？', hint:'vous + parler', a:'Vous parlez anglais ?|parlez', aNote:'vous parlez（字尾 -ez）' },
  { lesson:2, topic:'preposition-country', type:'fill', q:'Je vais _____ Mexique. (介詞)',                     hint:'le Mexique → 陽性，但字尾 -e！', a:'Je vais au Mexique.|au', aNote:'le Mexique = 例外！字尾 -e 但陽性 → au' },

  { lesson:2, topic:'question-words', type:'trans', q:'你說幾種語言？',                                   hint:'Combien / parler / langue', a:'Combien de langues tu parles ?|Tu parles combien de langues ?', aNote:'Combien de + 名詞', askClaude:true },
  { lesson:2, topic:'question-words', type:'trans', q:'為什麼你喜歡法文？因為很好玩！',                   hint:'Pourquoi / parce que / sympa', a:'Pourquoi tu aimes le français ? Parce que c\'est sympa !', aNote:'Pourquoi → Parce que（因為）', askClaude:true },
  { lesson:2, topic:'question-words', type:'trans', q:'她是哪裡人？她是義大利人。',                       hint:'Qui / d\'où / italienne', a:'Elle est d\'où ? Elle est italienne.', aNote:'D\'où es-tu ? = 你是哪裡人？', askClaude:true },
  { lesson:2, topic:'negation', type:'trans', q:'我說中文，不說西班牙文。',                          hint:'parler / ne...pas', a:'Je parle chinois, je ne parle pas espagnol.', aNote:'語言前不加冠詞；否定 ne...pas', askClaude:true },

  { lesson:2, topic:'preposition-country', type:'gender', q:'France → 陰性 or 陽性？用哪個介詞去那裡？',      hint:'字尾 -e', a:'陰性 → en France', aNote:'la France（字尾 -e）→ en' },
  { lesson:2, topic:'preposition-country', type:'gender', q:'Canada → 陰性 or 陽性？用哪個介詞去那裡？',      hint:'字尾子音', a:'陽性 → au Canada', aNote:'le Canada（字尾 -a）→ au' },
  { lesson:2, topic:'preposition-country', type:'gender', q:'Mexique → 陰性 or 陽性？用哪個介詞去那裡？',     hint:'⚠️ 例外！字尾 -e 但…', a:'陽性例外 → au Mexique', aNote:'le Mexique = 例外，字尾 -e 卻是陽性 → au' },
  { lesson:2, topic:'preposition-country', type:'gender', q:'États-Unis → 單數 or 複數？用哪個介詞去那裡？', hint:'les + 複數', a:'複數 → aux États-Unis', aNote:'les États-Unis（複數）→ aux' },

  { lesson:2, topic:'question-words', type:'choose', q:'「為什麼」用哪個疑問詞？',           hint:'Why', a:'Pourquoi', aNote:'Pourquoi ? = Why? 回答用 Parce que...', opts:['Qui','Où','Comment','Pourquoi'] },
  { lesson:2, topic:'articles', type:'choose', q:'以下哪句「parler + 語言」用法正確？',             hint:'語言前不加冠詞', a:'Je parle français.|Je parle le français.', aNote:'兩句都對！parler + 語言可加冠詞也可不加（但 aimer le français 要加）', opts:['Je parle français.','Je parle le français.','Je parle de français.','Je parle en français.'] },
  { lesson:2, topic:'question-words', type:'choose', q:'Qui / Où / Comment / Combien / Pourquoi，哪個問「在哪裡」？', hint:'Where', a:'Où', aNote:'Où = Where；Qui = Who；Comment = How；Combien = How much/many；Pourquoi = Why', opts:['Qui','Où','Comment','Pourquoi'] },
  { lesson:2, topic:'numbers-dates-heure', type:'choose', q:'71 和 81，哪個有「et」？',               hint:'soixante + onze', a:'71 有 et，81 沒有|71（soixante et onze）有 et；81（quatre-vingt-un）沒有', aNote:'21-71 的個位為 1 用 et；80 之後完全不用 et', opts:['71 有 et，81 沒有','81 有 et，71 沒有','兩個都有 et','兩個都沒有 et'] },

  // ── 第3課 ──────────────────────────────────────────────
  // fill × 6
  { lesson:3, topic:'articles', type:'fill', q:'J\'habite dans _____ appartement avec une amie.', zh:'我跟一個朋友（女）住在一間公寓。', hint:'un/une/le/la/l\'', a:'un', aNote:'appartement 是陽性，且是「眾多公寓之一」，用不定冠詞 un' },
  { lesson:3, topic:'articles', type:'fill', q:'Tu es à _____ université à Paris ?',              zh:'你在巴黎念大學嗎？', hint:'un/une/le/la/l\'', a:'l\'', aNote:'université 是陰性且母音開頭，定冠詞縮寫成 l\'' },
  { lesson:3, topic:'er-verbs', type:'fill', q:'Nous _____ dans la piscine tous les matins.',     hint:'nager，nous 那格', a:'nageons', aNote:'nager：nous nageons（加 e 保持 /ʒ/ 音，否則 nagon- 會變硬音）' },
  { lesson:3, topic:'family-possessives', type:'fill', q:'Mon frère est marié. _____ femme est fleuriste.', zh:'我哥哥結婚了。他的太太是花店老闆。', hint:'his = ?', a:'Sa', aNote:'femme 是陰性，主詞是 mon frère（il）→ sa femme' },
  { lesson:3, topic:'family-possessives', type:'fill', q:'_____ neveux adorent les enfants de Clara.',      hint:'his = ? + 複數', a:'Ses', aNote:'ses = his/her，複數名詞前用 ses' },
  { lesson:3, topic:'possessives', type:'fill', q:'C\'est _____ amie Sophia.',                       hint:'mon/ma/mes，注意母音', a:'mon', aNote:'amie 雖是陰性但以母音 a 開頭，避免連音用 mon（不用 ma）' },

  // trans × 5
  { lesson:3, topic:'likes-hobbies-sports', type:'trans', q:'我超愛電影，但我討厭滑雪。',          hint:'adorer / détester + skier', a:'J\'adore le cinéma, mais je déteste skier.', aNote:'adorer = 超愛（比 aimer 強）；détester + 動詞原形直接接', askClaude:true },
  { lesson:3, topic:'likes-hobbies-sports', type:'trans', q:'我游泳不太行。',                       hint:'Je ne suis pas...', a:'Je ne suis pas fort(e) en natation.', aNote:'fort(e) en + 運動名詞，表示「某方面不擅長」', askClaude:true },
  { lesson:3, topic:'family-possessives', type:'trans', q:'我弟弟已婚，他有兩個孩子。',          hint:'marié / il a', a:'Mon frère est marié. Il a deux enfants.', aNote:'<b>être marié(e)</b>（已婚）／célibataire（單身）講的是狀態，所以用 être；<b>se marier</b> 才是「結婚」這個動作。⚠️ 「有幾個小孩」用 avoir：il a deux enfants。', askClaude:true },
  { lesson:3, topic:'family-possessives', type:'trans', q:'我們的朋友 Robin 和 Aya 會來。',      hint:'nos amis', a:'Nos amis Robin et Aya arrivent.|Nos amis Robin et Aya viennent.', aNote:'複數用 nos（notre 的複數）', askClaude:true },
  { lesson:3, topic:'negation', type:'trans', q:'你妹妹有小孩嗎？沒有，她沒有孩子。', hint:'Ta sœur / elle n\'a pas...', a:'Ta sœur a des enfants ? Non, elle n\'a pas d\'enfant.', aNote:'否定句 pas de / pas d\'（不說 pas des）', askClaude:true },

  // gender × 5（職業變化）
  { lesson:3, topic:'adjective-agreement', type:'gender', q:'coiffeur → 女性形？',       hint:'-eur → ?', a:'coiffeuse', aNote:'-eur 結尾職業 → -euse（coiffeur 是美髮師）' },
  { lesson:3, topic:'adjective-agreement', type:'gender', q:'acteur → 女性形？',         hint:'-teur → ?', a:'actrice', aNote:'-teur 結尾 → -trice（注意不是 acteure）' },
  { lesson:3, topic:'adjective-agreement', type:'gender', q:'informaticien → 女性形？',  hint:'-ien → ?', a:'informaticienne', aNote:'-ien → -ienne（加 ne，類似 italien→italienne）' },
  { lesson:3, topic:'adjective-agreement', type:'gender', q:'infirmier → 女性形？',      hint:'-er → ?', a:'infirmière', aNote:'-er → -ère（加重音符，護理師）' },
  { lesson:3, topic:'adjective-agreement', type:'gender', q:'facteur → 女性形？',        hint:'-teur → ?', a:'factrice', aNote:'-teur → -trice（郵差，與 acteur 同規則）' },

  // choose × 5
  { lesson:3, topic:'likes-hobbies-sports', type:'choose', q:'「打籃球」用哪個說法？',     hint:'jouer / faire', a:'jouer au basket|faire du basket', aNote:'兩個都對！jouer à（球類遊戲）和 faire de（所有運動）都可用', opts:['jouer au basket','faire du basket','jouer du basket','faire au basket'] },
  { lesson:3, topic:'possessives', type:'choose', q:'「ma amie」為什麼錯？正確寫法？', hint:'母音開頭', a:'mon amie', aNote:'ma amie 兩個母音碰撞，改用 mon amie（不是 m\'amie）', opts:['mon amie',"m'amie",'ma amie','mone amie'] },
  { lesson:3, topic:'adjective-agreement', type:'choose', q:'son / sa / ses，哪個填入空格？「_____ enfants jouent ici.」', hint:'enfants 是複數', a:'Ses|ses', aNote:'複數名詞前用 ses（不管陰陽性）', opts:['son','sa','ses'] },
  { lesson:3, topic:'er-verbs', type:'choose', q:'「nous nageons」vs「nous nagons」，哪個正確？', hint:'g + o 的發音', a:'nous nageons', aNote:'g+o 會變硬音，加 e 後 ge+ons 維持 /ʒ/；同規則：mangeons、voyageons', opts:['nous nageons','nous nagons'] },
  { lesson:3, topic:'vocab-places-city', type:'choose', q:'la mer / la mère / le maire，哪個是「市長」？', hint:'政治人物', a:'le/la maire|maire', aNote:'mer = 海；mère = 母親；maire = 市長。三個發音相同！', opts:['la mer','la mère','le/la maire'] },

  // ── 第4課：顏色 · 食物 · 購物介係詞 · acheter/payer ──
  { lesson:4, topic:'preposition-place-transport', type:'fill',   q:'J\'_____ des légumes au marché.  (acheter)',     hint:'je 單數 → è',          a:'achète',          aNote:'acheter：je → j\'achète（e → è 在單數）' },
  { lesson:4, topic:'vocab-shopping', type:'fill',   q:'Nous _____ un panier par semaine.  (acheter)',   zh:'我們每週買一籃菜（蔬果箱）。', hint:'nous → achetons',      a:'achetons',        aNote:'acheter：nous → achetons（去掉 è，還原 e）' },
  { lesson:4, topic:'vocab-shopping', type:'fill',   q:'Ils _____ le pain à la boulangerie.  (acheter)', zh:'他們在麵包店買麵包。', hint:'ils → ent + accent',   a:'achètent',        aNote:'acheter：ils → achètent（-ent 不發音，但 è 有音）' },
  { lesson:4, topic:'vocab-shopping', type:'fill',   q:'Je _____ par carte.  (payer)',                   zh:'我用卡付款。', hint:'paie ou paye',         a:'paie|paye',       aNote:'payer：je paie / je paye 兩種都正確（-ayer 動詞）' },
  { lesson:4, topic:'vocab-shopping', type:'fill',   q:'Nous _____ en espèces.  (payer)',                zh:'我們用現金付款。', hint:'nous → payons',        a:'payons',          aNote:'payer：nous → payons（保留 y）' },
  { lesson:4, topic:'irregular-verbs-3rd-group', type:'fill',   q:'Je vais _____ les courses.  (faire)',            zh:'我要去買菜、採購。', hint:'aller + infinitif',    a:'faire',           aNote:'近未來：aller + infinitif；je vais faire = 我要去做' },
  { lesson:4, topic:'preposition-place-transport', type:'fill',   q:'Pour acheter la viande, on va _____ boucherie.', zh:'要買肉的話，就去肉店。', hint:'à + la',               a:'à la',            aNote:'boucherie（f, lieu）→ à la boucherie' },
  { lesson:4, topic:'preposition-place-transport', type:'fill',   q:'Le week-end, les Français vont _____ marché.',   zh:'週末法國人會去市場。', hint:'à + le = ?',           a:'au',              aNote:'marché（m）→ au marché（à + le = au）' },
  { lesson:4, topic:'preposition-place-transport', type:'fill',   q:'Pour le poisson, je vais _____ poissonnier.',    zh:'要買魚的話，我會去魚販那裡。', hint:'chez + personne',      a:'chez le',         aNote:'poissonnier = 人 → chez le poissonnier（chez + personne）' },
  { lesson:4, topic:'vocab-shopping', type:'fill',   q:'Je paie _____ caisses automatiques.',            zh:'我在自助結帳機付款。', hint:'à + les = ?',          a:'aux',             aNote:'caisses（pl）→ aux caisses（à + les = aux）' },

  { lesson:4, topic:'pouvoir-vouloir', type:'trans',  q:'我想要一條法棍，謝謝。',         hint:'voudrais / s\'il vous plaît', a:'Je voudrais une baguette, s\'il vous plaît.', aNote:'je voudrais = conditionnel，比 je veux 有禮貌；baguette = 法棍', askClaude:true },
  { lesson:4, topic:'question-words', type:'trans',  q:'這個多少錢？',                   hint:'coûte / combien',            a:'Combien ça coûte ? | Ça coûte combien ?', aNote:'兩種語序都正確；coûter = 花費（只用 il/elle/ça）', askClaude:true },
  { lesson:4, topic:'vocab-shopping', type:'trans',  q:'您怎麼付款？刷卡還是現金？',      hint:'comment / carte / espèces',  a:'Vous payez comment ? Par carte ou en espèces ?', aNote:'en espèces = 付現；par carte = 刷卡', askClaude:true },
  { lesson:4, topic:'vocab-shopping', type:'trans',  q:'我要去買東西。（近未來）',         hint:'aller + infinitif',          a:'Je vais faire les courses.', aNote:'近未來：je vais + faire；les courses = 買東西（食物類）', askClaude:true },
  { lesson:4, topic:'vocab-shopping', type:'trans',  q:'就這樣了，謝謝。',               hint:'ce sera tout',               a:'Ce sera tout, merci.', aNote:'Ce sera tout = 就這樣，常用於結帳時', askClaude:true },

  { lesson:4, topic:'adjective-agreement', type:'gender', q:'un polo _____  (vert)',                hint:'陽性單數',             a:'vert',      aNote:'polo（m, sg）→ vert（基本形）' },
  { lesson:4, topic:'adjective-agreement', type:'gender', q:'une robe _____  (vert)',               hint:'陰性單數',             a:'verte',     aNote:'robe（f）→ verte（加 e）' },
  { lesson:4, topic:'adjective-agreement', type:'gender', q:'des chaussures _____  (blanc)',        hint:'陰性複數，例外！',      a:'blanches',  aNote:'chaussures（f, pl）→ blanches；blanc → blanche（-c → -che 例外）' },
  { lesson:4, topic:'adjective-agreement', type:'gender', q:'un t-shirt _____  (orange)',           hint:'水果名，不變！',        a:'orange',    aNote:'orange：水果名兼顏色 → 不分陰陽，不加 s/e；un t-shirt orange' },
  { lesson:4, topic:'adjective-agreement', type:'gender', q:'des bottes _____  (marron)',           hint:'水果名，不變！',        a:'marron',    aNote:'marron：栗子兼顏色 → 不加 s/e；des bottes marron' },
  { lesson:4, topic:'adjective-agreement', type:'gender', q:'une robe _____  (violet)',             hint:'-et → -ette',          a:'violette',  aNote:'violet → violette（-et → -ette，子音重複）' },
  { lesson:4, topic:'adjective-agreement', type:'gender', q:'des fleurs _____  (bleu)',             hint:'陰性複數',             a:'bleues',    aNote:'fleurs（f, pl）→ bleues（加 es）' },

  { lesson:4, topic:'preposition-place-transport', type:'choose', q:'去魚店可以說哪兩種？',                 hint:'lieu vs personne',     a:'à la poissonnerie|chez le poissonnier', aNote:'chez = 後面跟人；à la = 後面跟地方，兩種說法都可', opts:['à la poissonnerie','chez le poissonnier','au poissonnerie','chez la poissonnerie'] },
  { lesson:4, topic:'vocab-shopping', type:'choose', q:'「Je _____ du poisson. (acheter)」填哪個？',  hint:'je 單數',       a:'achète',    aNote:'acheter je → achète（e → è 在 je/tu/il/ils）', opts:['achète','achetes','achetons','achetez'] },
  { lesson:4, topic:'articles', type:'choose', q:'「我要一瓶橄欖油」的正確法文？',       hint:'de + 量詞',            a:"une bouteille d'huile d'olive", aNote:"數量詞後加 de（去冠詞）：une bouteille de + 名詞；huile 以母音開頭 → d'", opts:["une bouteille d'huile d'olive","une bouteille de huile d'olive","une bouteille d'huile olive","un bouteille d'huile d'olive"] },
  { lesson:4, topic:'vocab-shopping', type:'choose', q:'carte bleue 在法國是什麼？',           hint:'不是信用卡',            a:'簽帳卡（debit card）|簽帳卡', aNote:'carte bleue / carte bancaire = 簽帳卡，法國刷卡為主，少用現金', opts:['信用卡（credit card）','簽帳卡（debit card）','預付卡（prepaid）','交通卡（transit）'] },

  // ── 作業本補充：Unité 1 — 國籍形容詞 ──
  { lesson:1, topic:'adjective-agreement', type:'gender', q:'suisse → 女性形？',       hint:'注意：不變！', a:'suisse',       aNote:'suisse 男女同形（la Suisse 瑞士）' },
  { lesson:1, topic:'adjective-agreement', type:'gender', q:'congolais → 女性形？',    hint:'-ais → ?',     a:'congolaise',   aNote:'-ais → -aise（du Congo）' },
  { lesson:1, topic:'adjective-agreement', type:'gender', q:'tunisien → 女性形？',     hint:'-ien → ?',     a:'tunisienne',   aNote:'-ien → -ienne（de Tunisie）' },
  { lesson:1, topic:'adjective-agreement', type:'gender', q:'sénégalais → 女性形？',   hint:'-ais → ?',     a:'sénégalaise',  aNote:'-ais → -aise（du Sénégal）' },
  { lesson:1, topic:'adjective-agreement', type:'gender', q:'allemand → 女性形？',     hint:'+e',           a:'allemande',    aNote:'-and → -ande（d 開始發音）' },
  { lesson:1, topic:'adjective-agreement', type:'gender', q:'argentin → 女性形？',     hint:'+e',           a:'argentine',    aNote:'-in → -ine（de Argentine）' },
  { lesson:1, topic:'adjective-agreement', type:'gender', q:'espagnol → 女性形？',     hint:'+e',           a:'espagnole',    aNote:'-ol → -ole（d\'Espagne）' },
  { lesson:1, topic:'adjective-agreement', type:'gender', q:'polonais → 女性形？',     hint:'-ais → ?',     a:'polonaise',    aNote:'-ais → -aise（de Pologne）' },

  // ── 作業本補充：Unité 1 — quel/quelle/quels/quelles ──
  { lesson:1, topic:'question-words', type:'fill', q:'Tu habites à _____ adresse ? (quel)',    hint:'adresse = 陰性',      a:'quelle',   aNote:'adresse（f, sg）→ quelle' },
  { lesson:1, topic:'question-words', type:'fill', q:'Vous aimez _____ artistes ? (quel)',     hint:'artistes = 複陽',     a:'quels',    aNote:'artistes（m, pl）→ quels' },
  { lesson:1, topic:'question-words', type:'fill', q:'_____ langues tu parles ? (quel)',       hint:'langues = 複陰',      a:'Quelles',  aNote:'langues（f, pl）→ quelles' },
  { lesson:1, topic:'numbers-dates-heure', type:'fill', q:'_____ est la date de naissance ? (quel)', hint:'date = 陰性',        a:'Quelle',   aNote:'date（f, sg）→ quelle（問陰性單數）' },
  { lesson:1, topic:'question-words', type:'choose', q:'「你住在哪個城市？」中 quel 要變成？', hint:'ville = 陰性',        a:'quelle',   aNote:'ville（f）→ quelle ville（陰性單數）', opts:['quel','quelle','quels','quelles'] },

  // ── 作業本補充：Unité 2 — -er 動詞 ──
  { lesson:2, topic:'er-verbs', type:'fill', q:'Elle _____ la radio chaque matin. (écouter)',       zh:'她每天早上聽廣播。', hint:'elle + -er', a:'écoute',    aNote:'écouter → elle écoute' },
  { lesson:2, topic:'er-verbs', type:'fill', q:'Vous _____ des films français ? (regarder)',         zh:'你們看法國電影嗎？', hint:'vous + -er', a:'regardez',  aNote:'regarder → vous regardez（-ez）' },
  { lesson:2, topic:'er-verbs', type:'fill', q:'Les amis _____ le ski. (détester)',                  zh:'朋友們討厭滑雪。', hint:'ils + -er',  a:'détestent', aNote:'détester → ils détestent（-ent 不發音）' },
  { lesson:2, topic:'er-verbs', type:'fill', q:'Je _____ le dimanche au parc. (marcher)',            zh:'我星期天在公園散步。', hint:'je + -er',   a:'marche',    aNote:'marcher → je marche' },

  // ── 作業本補充：Unité 2 — 所有格 notre/nos/votre/vos/leur/leurs ──
  { lesson:2, topic:'family-possessives', type:'fill', q:'Nous avons trois enfants. Ce sont _____ enfants.',   hint:'our + 複數', a:'nos',    aNote:'nous → nos（複數）；單數用 notre' },
  { lesson:2, topic:'family-possessives', type:'fill', q:'Vous avez deux filles. Ce sont _____ filles.',       hint:'your + 複數',a:'vos',    aNote:'vous → vos（複數）；單數用 votre' },
  { lesson:2, topic:'possessives', type:'fill', q:'Elles ont des amis. Ce sont _____ amis.',            hint:'their + 複數',a:'leurs',  aNote:'ils/elles → leurs（複數）；單數用 leur' },
  { lesson:2, topic:'on-vs-nous', type:'fill', q:'On a un appartement. C\'est _____ appartement.',     hint:'our + 單數', a:'notre',  aNote:'nous/on → notre（單數）；複數用 nos' },
  { lesson:2, topic:'family-possessives', type:'choose', q:'leur / leurs：「Ce sont _____ enfants.」填哪個？',  hint:'enfants 複數', a:'leurs', aNote:'leur（單數）vs leurs（複數）跟名詞的單複數走', opts:['leur','leurs'] },

  // ── 作業本補充：Unité 2 — 職業陰陽 ──
  { lesson:2, topic:'adjective-agreement', type:'gender', q:'professeur → 女性形？', hint:'加 e', a:'professeure', aNote:'professeur → professeure（直接加 e，不是 euse）' },
  { lesson:2, topic:'adjective-agreement', type:'gender', q:'étudiant → 女性形？',   hint:'+e',   a:'étudiante',   aNote:'étudiant → étudiante（+e）' },

  // ── 作業本補充：Unité 3 — 部分冠詞填空 ──
  { lesson:3, topic:'articles', type:'fill', q:'Nous mangeons _____ viande au restaurant.',  hint:'viande = 陰性，非特定量',  a:'de la',  aNote:'viande（f）→ de la viande（部分冠詞）' },
  { lesson:3, topic:'articles', type:'fill', q:'Tu commandes _____ eau, s\'il te plaît ?',   hint:'eau = 陰性，母音開頭',     a:"de l'",  aNote:"eau（f, 母音）→ de l'eau" },
  { lesson:3, topic:'articles', type:'fill', q:'Je mange beaucoup _____ pâtes.',             zh:'我吃很多義大利麵。', hint:'beaucoup de + ?',          a:'de',     aNote:'beaucoup de + 名詞（de 不加冠詞）' },
  { lesson:3, topic:'articles', type:'fill', q:'Il y a un peu _____ sel dans la soupe.',     zh:'湯裡有一點鹽。', hint:'un peu de + ?',            a:'de',     aNote:'un peu de + 名詞（de 不加冠詞）' },
  { lesson:3, topic:'articles', type:'fill', q:'Jean-Pierre aime les pâtes, il mange beaucoup _____ pâtes.', zh:'Jean-Pierre 喜歡義大利麵，他吃很多義大利麵。', hint:'beaucoup', a:'de',  aNote:'量詞後直接接 de（不用冠詞）：beaucoup de pâtes' },

  // ── 作業本補充：Unité 4 — c\'est / il est / elle est ──
  { lesson:4, topic:'cest-il-est', type:'choose', q:'「_____ un touriste」填 C\'est 還是 Il est？',      hint:'後有冠詞 un', a:"C'est",  aNote:"C'est + un/une/des + nom；Il est + adjectif 或職業（不加冠詞）", opts:["C'est",'Il est'] },
  { lesson:4, topic:'cest-il-est', type:'choose', q:'「_____ allemand.」填 C\'est 還是 Il est？',        hint:'後有形容詞', a:'Il est', aNote:"Il est + adjectif（不加冠詞）；C'est + article + nom", opts:["C'est",'Il est'] },
  { lesson:4, topic:'cest-il-est', type:'fill',   q:'Rouen ? _____ une ville française.',                hint:"c'est + 冠詞 + nom", a:"C'est", aNote:"C'est + une ville（有冠詞 → c'est）" },
  { lesson:4, topic:'cest-il-est', type:'fill',   q:'L\'artiste s\'appelle Snek et _____ grenoblois.',   hint:'形容詞，無冠詞', a:'il est', aNote:"il est + adjectif（直接形容詞，不加冠詞）" },
  { lesson:4, topic:'cest-il-est', type:'trans',  q:'巴黎是法國的一個城市。',  hint:"C'est / une", a:"Paris, c'est une ville française.", aNote:"C'est + article + nom；Paris（專有名詞）通常放主語", askClaude:true },

  // ── 作業本補充：Unité 4 — 頻率副詞 ──
  { lesson:4, topic:'frequency-adverbs', type:'choose', q:'souvent / toujours / jamais，哪個是「總是」？', hint:'always', a:'toujours', aNote:'toujours = always；souvent = often；jamais（ne...jamais）= never', opts:['souvent','toujours','jamais'] },
  { lesson:4, topic:'negation', type:'fill',   q:'On ne va _____ au musée le mardi.',               zh:'我們星期二從不去博物館。', hint:'never',  a:'jamais',   aNote:'ne...jamais = never（jamais 放動詞後面）' },
  { lesson:4, topic:'frequency-adverbs', type:'fill',   q:'Jonathan va à la bibliothèque lundi, mardi et mercredi. Il y va _____ .', zh:'Jonathan 星期一、二、三都去圖書館，他總是去。', hint:'always', a:'toujours', aNote:'三天都去 = toujours（always）' },
  { lesson:4, topic:'negation', type:'trans',  q:'我從不去看展覽。',  hint:'ne...jamais',  a:'Je ne vais jamais aux expositions.', aNote:'ne...jamais + lieu：aux expositions（à + les）', askClaude:true },

  // ── 作業本補充：Unité 4 — 交通方式介系詞 ──
  { lesson:4, topic:'preposition-place-transport', type:'choose', q:'「騎腳踏車」用哪個介系詞？',          hint:'非機動交通', a:'à vélo',   aNote:'非機動：à pied / à vélo / à trottinette；機動：en bus / en voiture / en train', opts:['à vélo','en vélo','de vélo','par vélo'] },
  { lesson:4, topic:'preposition-place-transport', type:'choose', q:'「步行」用哪個介系詞？',              hint:'no vehicle', a:'à pied',   aNote:'à pied = on foot（步行）', opts:['à pied','en pied','de pied','par pied'] },
  { lesson:4, topic:'preposition-place-transport', type:'fill',   q:'Je vais à l\'école _____ bus.',       hint:'機動交通',   a:'en',       aNote:'en + 機動交通：en bus / en voiture / en métro / en train' },
  { lesson:4, topic:'preposition-place-transport', type:'choose', q:'en bus / en vélo / à vélo，哪個用法正確？', hint:'vélo 用哪個介系詞', a:'à vélo', aNote:'vélo（非機動）→ à vélo；機動車輛用 en', opts:['en bus','en vélo','à vélo','de vélo'] },

  // ── 第5課：商店 · 不定冠詞 · 餐廳 · -ir 動詞 · faire ──

  // fill：-ir 動詞變位
  { lesson:5, topic:'ir-re-verbs', type:'fill', q:'Tu _____ le dessert. (choisir)',               zh:'你選甜點。', hint:'tu → -is',         a:'choisis',      aNote:'choisir：tu → choisis（-ir 動詞，tu 去 -ir 加 -is）' },
  { lesson:5, topic:'ir-re-verbs', type:'fill', q:'Il _____ son repas. (choisir)',                zh:'他選他的餐點。', hint:'il → -it',         a:'choisit',      aNote:'choisir：il → choisit（加 -it）' },
  { lesson:5, topic:'ir-re-verbs', type:'fill', q:'Nous _____ le menu. (choisir)',               zh:'我們選菜單（套餐）。', hint:'nous → -issons',   a:'choisissons',  aNote:'choisir：nous → choisissons（加 -iss- 是 -ir 動詞特徵）' },
  { lesson:5, topic:'ir-re-verbs', type:'fill', q:'Vous _____ une formule ? (choisir)',          zh:'你們選一個套餐嗎？', hint:'vous → -issez',    a:'choisissez',   aNote:'choisir：vous → choisissez' },
  { lesson:5, topic:'ir-re-verbs', type:'fill', q:'Ils _____ le plat du jour. (choisir)',        zh:'他們選今日特餐。', hint:'ils → -issent',    a:'choisissent',  aNote:'choisir：ils → choisissent' },
  { lesson:5, topic:'ir-re-verbs', type:'fill', q:'Je _____ mon assiette. (finir)',              zh:'我把我的盤子吃完。', hint:'je → -is',         a:'finis',        aNote:'finir：je → finis（-ir 動詞，je 去 -ir 加 -is）' },
  { lesson:5, topic:'ir-re-verbs', type:'fill', q:'Nous _____ le dessert. (finir)',              zh:'我們吃完甜點。', hint:'nous → -issons',   a:'finissons',    aNote:'finir：nous → finissons' },
  { lesson:5, topic:'ir-re-verbs', type:'fill', q:'Elles ne _____ pas leur assiette. (finir)',   zh:'她們沒有把盤子吃完。', hint:'elles → -issent',  a:'finissent',    aNote:'finir：elles → finissent' },

  // fill：faire + manger
  { lesson:5, topic:'irregular-verbs-3rd-group', type:'fill', q:'Vous _____ la cuisine ce soir ? (faire)',     zh:'你們今晚煮飯嗎？', hint:'vous = faites !',  a:'faites',       aNote:'faire：vous → faites（不規則，非 *faisez）' },
  { lesson:5, topic:'irregular-verbs-3rd-group', type:'fill', q:'Nous _____ les courses samedi. (faire)',      zh:'我們星期六去買菜。', hint:'nous → faisons',   a:'faisons',      aNote:'faire：nous → faisons' },
  { lesson:5, topic:'irregular-verbs-3rd-group', type:'fill', q:'Ils _____ du sport. (faire)',                 zh:'他們做運動。', hint:'ils → font',       a:'font',         aNote:'faire：ils → font（不規則）' },
  { lesson:5, topic:'er-verbs', type:'fill', q:'Nous _____ au restaurant. (manger)',          zh:'我們在餐廳吃飯。', hint:'nous → -geons !',  a:'mangeons',     aNote:'manger：nous → mangeons（保留 e，防止 g 硬音）' },

  // fill：不定冠詞
  { lesson:5, topic:'articles', type:'fill', q:'Je mange _____ poisson. (不定量，陽性)',      hint:'de + le = ?',      a:'du',           aNote:'du = de + le；poisson（m）→ du poisson（不確定數量）' },
  { lesson:5, topic:'articles', type:'fill', q:'Elle mange _____ viande. (不定量，陰性)',     hint:'de la',            a:'de la',        aNote:'viande（f）→ de la viande（不定量冠詞）' },
  { lesson:5, topic:'articles', type:'fill', q:'Il boit _____ eau. (不定量，母音)',           hint:'de l\'',           a:'de l\'',       aNote:'eau 以母音開頭 → de l\'eau（縮音）' },
  { lesson:5, topic:'articles', type:'fill', q:'Je mange _____ pâtes. (不定量，複數)',        hint:'des',              a:'des',          aNote:'pâtes（f, pl）→ des pâtes（不定量複數）' },
  { lesson:5, topic:'articles', type:'fill', q:'Je ne mange pas _____ viande. (否定)',        hint:'否定句冠詞變化',   a:'de',           aNote:'否定句：pas de + 名詞（du/de la/des 全換成 de）' },
  { lesson:5, topic:'articles', type:'fill', q:'Il n\'y a pas _____ dessert. (否定)',         hint:'否定冠詞',         a:'de',           aNote:'否定句 → pas de dessert（不管原冠詞是什麼）' },

  // trans：餐廳點餐
  { lesson:5, topic:'vocab-shopping', type:'trans', q:'今日主菜是什麼？',                            hint:'plat du jour / quel', a:'Quel est le plat du jour ?', aNote:'quel（m, sg）+ est + le plat du jour', askClaude:true },
  { lesson:5, topic:'vocab-shopping', type:'trans', q:'我要白汁小牛肉。（口語點餐）',                hint:'Pour moi',            a:'Pour moi, la blanquette de veau.', aNote:'Pour moi = 給我；口語點餐不用動詞', askClaude:true },
  { lesson:5, topic:'vocab-shopping', type:'trans', q:'請給我帳單。',                                hint:'l\'addition',         a:'L\'addition, s\'il vous plaît.', aNote:'l\'addition（f）= 帳單；正式場合用 s\'il vous plaît', askClaude:true },
  { lesson:5, topic:'vocab-shopping', type:'trans', q:'請給我一壺自來水。',                          hint:'carafe / plaît',      a:'Une carafe d\'eau, s\'il vous plaît.', aNote:'carafe d\'eau = 自來水（免費）；d\' = de + eau（縮音）', askClaude:true },
  { lesson:5, topic:'ir-re-verbs', type:'trans', q:'你們選前菜還是甜點？（-ir 動詞 vous）',      hint:'choisir / ou',        a:'Vous choisissez une entrée ou un dessert ?', aNote:'choisir → vous choisissez；ou = 或', askClaude:true },
  { lesson:5, topic:'irregular-verbs-3rd-group', type:'trans', q:'他們在做購物。（faire）',                     hint:'ils / les courses',   a:'Ils font les courses.', aNote:'faire → ils font；faire les courses = 買日常食物', askClaude:true },

  // gender：餐廳詞彙
  { lesson:5, topic:'adjective-agreement', type:'gender', q:'_____ addition (l\' / le / la)',            hint:'結帳',               a:'l\'',          aNote:'addition（f）→ l\'addition（母音開頭縮音）' },
  { lesson:5, topic:'adjective-agreement', type:'gender', q:'_____ assiette (l\' / le / la)',            hint:'盤子',               a:'l\'',          aNote:'assiette（f）→ l\'assiette（母音開頭縮音）' },
  { lesson:5, topic:'adjective-agreement', type:'gender', q:'_____ fourchette (le / la)',                hint:'叉子',               a:'la',           aNote:'fourchette（f）→ la fourchette' },
  { lesson:5, topic:'adjective-agreement', type:'gender', q:'_____ couteau (le / la)',                   hint:'刀子',               a:'le',           aNote:'couteau（m）→ le couteau' },
  { lesson:5, topic:'adjective-agreement', type:'gender', q:'_____ formule (le / la)',                   hint:'套餐',               a:'la',           aNote:'formule（f）→ la formule' },
  { lesson:5, topic:'adjective-agreement', type:'gender', q:'_____ plat (le / la)',                      hint:'主菜',               a:'le',           aNote:'plat（m）→ le plat' },
  { lesson:5, topic:'adjective-agreement', type:'gender', q:'_____ entrée (le / la)',                    hint:'前菜',               a:'l\'',          aNote:'entrée（f）→ l\'entrée（母音開頭）' },

  // choose：不定冠詞規則 / 餐廳
  { lesson:5, topic:'articles', type:'choose', q:'「我不吃魚」否定句的冠詞用哪個？',          hint:'否定 → de',          a:'Je ne mange pas de poisson.', aNote:'否定句：pas de（不管 poisson 陽性，不用 du）', opts:['Je ne mange pas du poisson.','Je ne mange pas de poisson.','Je ne mange pas d\'un poisson.','Je ne mange pas poisson.'] },
  { lesson:5, topic:'vocab-shopping', type:'choose', q:'以下哪句描述 à la carte 正確？',           hint:'vs formule/menu',    a:'單點，每道菜分開計費', aNote:'à la carte = 單點；formule = 2道套餐；menu = 3道套餐', opts:['單點，每道菜分開計費','2道套餐固定價格','3道套餐固定價格','廚師推薦套餐'] },
  { lesson:5, topic:'vocab-shopping', type:'choose', q:'法國免費自來水怎麼點？',                    hint:'carafe vs bouteille', a:"Une carafe d'eau, s'il vous plaît.", aNote:"carafe d'eau = 自來水（免費）；bouteille d'eau = 瓶裝水（收費）", opts:["Une carafe d'eau, s'il vous plaît.","Une bouteille d'eau, s'il vous plaît.","De l'eau plate, s'il vous plaît.",'L\'eau du robinet, s\'il vous plaît.'] },
  { lesson:5, topic:'vocab-shopping', type:'choose', q:'牛排「à point」是幾分熟？',                hint:'bleu→saignant→?→bien cuit', a:'五分熟', aNote:'bleu（極生）→ saignant（三分）→ à point（五分）→ bien cuit（全熟）', opts:['三分熟','五分熟','七分熟','全熟'] },
  { lesson:5, topic:'ir-re-verbs', type:'choose', q:'以下哪個 -ir 動詞 nous 形正確？',          hint:'-issons',            a:'nous choisissons', aNote:'choisir → nous choisissons（加 -iss-；非 *choisisons 或 *choisonnes）', opts:['nous choisisons','nous choisissons','nous choissions','nous choisonnes'] },
  { lesson:5, topic:'irregular-verbs-3rd-group', type:'choose', q:'faire 的 vous 形是？',                     hint:'不規則！',           a:'vous faites', aNote:'faire：vous → faites（不規則，不是 *faisez）', opts:['vous faisez','vous faites','vous fairez','vous faire'] },
  { lesson:5, topic:'irregular-verbs-3rd-group', type:'choose', q:'aller 的 ils 形是？',                      hint:'不規則',             a:'ils vont', aNote:'aller → ils vont（不規則；非 *ils allent）', opts:['ils allent','ils vont','ils allons','ils allez'] },

  // ── Leçon 6：時間・城市・否定・命令句 ──────────────────────────

  // fill × 6
  { lesson:6, topic:'numbers-dates-heure', type:'fill', q:"Il est _____ heure et demie. (1:30)",         hint:'heure 是陰性',              a:"Il est une heure et demie.|une heure et demie|une", aNote:"heure 是陰性 → une（不是 un）" },
  { lesson:6, topic:'imperative-mood', type:'fill', q:"_____ dans le bus ! (monter, vous)",           hint:'impératif vous = 去掉主詞',  a:"Montez dans le bus !|Montez",        aNote:'monter → vous montez → Montez（impératif）' },
  { lesson:6, topic:'vocab-shopping', type:'fill', q:"N'_____ pas de tickets ! (acheter, vous)",     zh:'不要買票！（對「您/你們」的否定命令句）', hint:'impératif négatif',          a:"N'achetez pas de tickets !|achetez", aNote:"impératif 否定：Ne + verbe + pas；-ER vous → -ez" },
  { lesson:6, topic:'negation', type:'fill', q:"Je ne connais _____ à Paris.",                 zh:'我在巴黎誰都不認識。', hint:'nobody = ?',                 a:"Je ne connais personne à Paris.|personne", aNote:'ne...personne = 不認識任何人（personne 放動詞後）' },
  { lesson:6, topic:'negation', type:'fill', q:"Il ne fait _____ de sport. (no more)",         zh:'他不再運動了。', hint:'no more / no longer',        a:"Il ne fait plus de sport.|plus",      aNote:"ne...plus = 不再；ne...rien = 什麼都沒；ne...personne = 沒有任何人" },
  { lesson:6, topic:'preposition-place-transport', type:'fill', q:"La gare n'est pas _____ de chez moi.",         zh:'車站離我家不遠。', hint:'opposite of près',           a:"La gare n'est pas loin de chez moi.|loin", aNote:'loin（遠）vs près（近）；搭配 loin de / près de + 地點' },

  // trans × 5
  { lesson:6, topic:'numbers-dates-heure', type:'trans', q:'幾點了？',                                    hint:'quelle / heure / être',      a:'Quelle heure est-il ?',                    aNote:'問時間的固定句型，回答用 <b>Il est ＋ 時間</b>。⚠️ heure 是<b>陰性</b>——une heure（不是 un heure），所以問句用 quelle 不用 quel。', askClaude:true },
  { lesson:6, topic:'numbers-dates-heure', type:'trans', q:'現在是一點半。',                              hint:'une heure / et demie',       a:'Il est une heure et demie.',               aNote:'heure 陰性 → une heure（不是 un）', askClaude:true },
  { lesson:6, topic:'negation', type:'trans', q:'我從不去劇院。',                              hint:'ne...jamais / théâtre',      a:'Je ne vais jamais au théâtre.',            aNote:'jamais 緊接動詞後，ne 在動詞前', askClaude:true },
  { lesson:6, topic:'imperative-mood', type:'trans', q:'搭地鐵去！（命令句，對 vous）',               hint:'impératif / prendre',        a:'Prenez le métro !',                        aNote:'prendre → vous prenez → Prenez（不規則）', askClaude:true },
  { lesson:6, topic:'articles', type:'trans', q:'市政廳離市中心不遠。',                        hint:'mairie / loin / centre-ville', a:"La mairie n'est pas loin du centre-ville.", aNote:"loin de + le → loin du（縮合冠詞）", askClaude:true },

  // choose × 5
  { lesson:6, topic:'numbers-dates-heure', type:'choose', q:'「heure」是陰性還是陽性？',                  hint:'une ou un ?',                a:'陰性',    aNote:'une heure（不是 *un heure）；例外：midi / minuit 是陽性', opts:['陽性（un heure）','陰性（une heure）'] },
  { lesson:6, topic:'numbers-dates-heure', type:'choose', q:'正午 12:00 pm 用法文怎麼說？',               hint:'不說 douze heures',          a:'midi',    aNote:'midi = 正午（pm）；minuit = 午夜（am）；兩者皆陽性', opts:['midi','minuit','douze heures','demi-journée'] },
  { lesson:6, topic:'voici-voila', type:'choose', q:'voici vs voilà，哪個表示「這裡是⋯」？',      hint:'ici = here',                 a:'voici',   aNote:"voici（ici=這裡）= here is；voilà（là=那裡）= there is，也作感嘆 voilà !", opts:['voilà','voici'] },
  { lesson:6, topic:'imperative-mood', type:'choose', q:'être 的 impératif tu 形是？',                hint:'不規則，不是 es',             a:'Sois',    aNote:'être impératif：Sois / Soyons / Soyez（完全不規則）', opts:['Es','Sois','Étais','Être'] },
  { lesson:6, topic:'imperative-mood', type:'choose', q:'-ER 動詞 impératif tu 形字尾為？',           hint:'比現在式少一個字母',          a:'-e',      aNote:'Tu regardes → Regarde !（-ER 動詞 tu 形去掉 s）；非 -ER 動詞保留 s', opts:['-es','-e','-ez','-ons'] },

  // ══════════════════════════════════════════════════════
  // 第 7 課：交通・連接詞・服裝・動詞三組
  // 來源：Unité 4 p.46-48 + Unité 5 p.55-66
  // ══════════════════════════════════════════════════════

  // ── 連接詞 pour / parce que / mais / avec / sans（PDF p.47）──
  { lesson:7, topic:'connectors-pour-parceque', type:'choose', q:'「為了遠距離移動，汽車很方便，_____ 不環保。」空格填什麼？', hint:'轉折', a:'mais', aNote:'mais = 但是（表轉折）；這裡不是原因，而是對比', opts:['parce que','mais','pour','avec'] },
  { lesson:7, topic:'connectors-pour-parceque', type:'choose', q:'「我們喜歡市中心，_____ 沒有汽車。」空格填？',              hint:'因為', a:'parce qu\'', aNote:"parce qu'（母音前縮寫）表原因；sans voitures = 無汽車（沒冠詞）", opts:['pour','sans','parce qu\'','mais'] },
  { lesson:7, topic:'connectors-pour-parceque', type:'choose', q:'「_____ 上學，我們不騎滑板車。」空格填？',                  hint:'目的 + 動詞原形', a:'Pour', aNote:'pour + 動詞原形 = 為了做某事；後接目標', opts:['Parce que','Pour','Mais','Sans'] },
  { lesson:7, topic:'connectors-pour-parceque', type:'choose', q:'「我不走路去大學，_____ 太遠了。」空格填？',               hint:'因為', a:'parce que', aNote:'parce que 表原因（接完整句子）；pour 接動詞原形', opts:['pour','sans','mais','parce que'] },
  { lesson:7, topic:'possessives', type:'fill',   q:'「他帶著妻子去上班。」Avec _____ femme, il va au travail. (所有格)', hint:'他的 = ?', a:'sa|sa femme', aNote:'femme（f）→ sa（他/她的，陰性）' },
  { lesson:7, topic:'articles', type:'fill',   q:'「我沒有車去大學。」Je vais à l\'université _____ voiture.', hint:'沒有 + 名詞', a:'sans|sans voiture', aNote:"sans + 名詞（不加冠詞）= without；sans voiture（不是 sans une voiture）" },

  // ── 交通工具（PDF p.48）──
  { lesson:7, topic:'preposition-place-transport', type:'choose', q:'步行怎麼說？',           hint:'à + ?', a:'à pied',       aNote:'非機動 → 介詞 à：à pied / à vélo / à trottinette', opts:['en pied','à pied','en marche','au pied'] },
  { lesson:7, topic:'preposition-place-transport', type:'choose', q:'騎腳踏車怎麼說？',       hint:'à + ?', a:'à vélo',       aNote:'à vélo（非機動用 à）；en voiture（機動用 en）', opts:['en vélo','à vélo','avec vélo','par vélo'] },
  { lesson:7, topic:'preposition-place-transport', type:'choose', q:'搭地鐵怎麼說？',         hint:'en + ?', a:'en métro',    aNote:'機動交通工具用 en：en bus / en métro / en voiture / en train', opts:['à métro','en métro','par métro','au métro'] },
  { lesson:7, topic:'preposition-place-transport', type:'choose', q:'共乘（carpooling）法文是？', hint:'co- = 共', a:'le covoiturage', aNote:'covoiturage = carpooling；可以 mixer les moyens de transport（混搭）', opts:['le partage','le covoiturage','le transport commun','le carpooling'] },
  { lesson:7, topic:'preposition-place-transport', type:'fill',   q:'公車站或地鐵站的兩種說法：l\'_____ 和 la _____', hint:'stop / station', a:'arrêt|station|arrêt et la station', aNote:"l'arrêt de bus / la station de métro，兩者都指「站」" },
  { lesson:7, topic:'preposition-place-transport', type:'fill',   q:'「從這裡一直到那裡。」D\'ici _____ là-bas.',              hint:'until / up to', a:"jusqu'à|jusqu'à là-bas", aNote:"jusqu'à = until/up to；接母音 → jusqu'au（jusqu'à + le）" },

  // ── 大數字（PDF p.48）──
  { lesson:7, topic:'numbers-dates-heure', type:'choose', q:'2 222 000 法文怎麼說？', hint:'deux millions...', a:'deux millions deux cent vingt-deux mille', aNote:'million 複數加 s；mille 永遠不加 s', opts:['deux million deux cent vingt-deux mille','deux millions deux cent vingt-deux mille','deux millions deux cents vingt-deux mille','deux milliard deux cent vingt-deux mille'] },
  { lesson:7, topic:'numbers-dates-heure', type:'choose', q:'mille 複數要加 s 嗎？', hint:'規則例外', a:'不加 s，mille 不變', aNote:'mille 永遠不加 s（例外）；million/milliard 複數加 s', opts:['加 s → milles','不加 s，mille 不變','視情況加 s','跟 cent 一樣'] },

  // ── 形容詞性數一致（PDF p.55）──
  { lesson:7, topic:'vocab-clothing-size', type:'choose', q:'Tu portes une robe _____ （elegant 陰性）',  hint:'robe = f', a:'élégante', aNote:'élégant → 陰性加 -e → élégante；robe（f）要配陰性形容詞', opts:['élégant','élégants','élégante','élégantes'] },
  { lesson:7, topic:'adjective-agreement', type:'choose', q:'Vous vendez des chaussures _____ （noir）',  hint:'chaussures = f.pl.', a:'noires', aNote:'noir → 陰性 noire → 複數陰性 noires；chaussures 是陰性複數', opts:['noir','noirs','noire','noires'] },
  { lesson:7, topic:'adjective-agreement', type:'choose', q:'Il vend son costume _____ （gris）',         hint:'costume = m', a:'gris', aNote:'gris 陽性單數結尾已是 s，不再加 s（gris → gris）；陰性才是 grise', opts:['gris','grise','grises','grisé'] },
  { lesson:7, topic:'vocab-weather-season', type:'fill',   q:'En été, elle porte des jupes _____ （court）et des t-shirts _____ （simple）.', hint:'陰性複數', a:'courtes, simples|courtes|simples', aNote:'court → 陰性 courte → 複數 courtes；simple → 陰性不變 → 複數 simples' },

  // ── 形容詞位置（PDF p.58）──
  { lesson:7, topic:'adjective-position', type:'choose', q:'「一件優雅的西裝」形容詞 élégant 放在名詞哪邊？', hint:'BAGS 以外的形容詞', a:'後面：un costume élégant', aNote:'顏色、形狀、材質等描述性形容詞放名詞後；BAGS（beau/grand/bon/vieux）等放前', opts:['前面：un élégant costume','後面：un costume élégant'] },
  { lesson:7, topic:'adjective-position', type:'choose', q:'「一件美麗的裙子」形容詞 jolie 放在名詞哪邊？', hint:'joli 是 BAGS 類', a:'前面：une jolie jupe', aNote:'joli/beau/grand/bon/vieux/nouveau/petit 等放名詞前', opts:['前面：une jolie jupe','後面：une jupe jolie'] },

  // ── 指示形容詞 ce/cet/cette/ces（PDF p.59）──
  { lesson:7, topic:'vocab-tech-objects', type:'choose', q:'「這個手機殼」：_____ coque de téléphone（coque = f）', hint:'陰性', a:'Cette', aNote:'cette = 陰性單數；ce = 陽性子音；cet = 陽性母音/h；ces = 複數', opts:['Ce','Cet','Cette','Ces'] },
  { lesson:7, topic:'demonstrative-adj', type:'choose', q:'「這個手機殼」：_____ étui（étui = m，母音開頭）',       hint:'陽性母音開頭', a:'Cet', aNote:"cet 用在陽性單數母音或 h 開頭的名詞（發音連讀）：cet étui、cet homme", opts:['Ce','Cet','Cette','Ces'] },
  { lesson:7, topic:'adjective-agreement', type:'choose', q:'「這些耳機」：_____ écouteurs（複數）',                   hint:'複數不分性別', a:'Ces', aNote:'ces = 所有複數（不分陰陽性）', opts:['Ce','Cet','Cette','Ces'] },
  { lesson:7, topic:'demonstrative-adj', type:'fill',   q:'「這件大衣」_____ manteau（manteau = m，子音開頭）',      hint:'陽性子音', a:'Ce|Ce manteau', aNote:'ce = 陽性單數子音開頭；cet = 陽性單數母音/h 開頭' },

  // ── 材質介詞 en（課堂）──
  { lesson:7, topic:'vocab-clothing-size', type:'choose', q:'「皮革材質」怎麼說？',  hint:'en + matière', a:'en cuir',   aNote:'材質固定用 en：en cuir（皮）/ en coton（棉）/ en laine（羊毛）/ en or（金）', opts:['de cuir','avec cuir','en cuir','du cuir'] },
  { lesson:7, topic:'vocab-clothing-size', type:'choose', q:'「羊毛材質」怎麼說？',  hint:'wool',         a:'en laine',  aNote:'en laine = in wool；laine（f）= 羊毛', opts:['en laine','en coton','en cuir','en soie'] },
  { lesson:7, topic:'vocab-shopping', type:'choose', q:'argent 的兩個意思是？', hint:'銀 / 錢',     a:'錢 + 銀（silver）', aNote:'argent = money（錢）也 = silver（銀）；因為古硬幣都是銀製的！', opts:['錢 + 金（gold）','錢 + 銀（silver）','銀 + 銅','錢 + 銅'] },

  // ── vendre 動詞變位（課堂）──
  { lesson:7, topic:'ir-re-verbs', type:'fill',   q:'je _____ （vendre）',          hint:'第三組', a:'vends', aNote:'vendre：je vends / tu vends / il vend / nous vendons / vous vendez / ils vendent' },
  { lesson:7, topic:'ir-re-verbs', type:'fill',   q:'nous _____ （vendre）',        hint:'加 -ons', a:'vendons', aNote:'vendre nous → vendons（規則）' },
  { lesson:7, topic:'ir-re-verbs', type:'fill',   q:'ils _____ （vendre）',         zh:'他們賣。（vendre 的 ils 變位）', hint:'-ent', a:'vendent', aNote:'vendre ils → vendent（注意 d 後直接加 -ent）' },

  // ── mettre 動詞變位（課堂）──
  { lesson:7, topic:'ir-re-verbs', type:'fill',   q:'je _____ （mettre）',          hint:'tt 或 t？', a:'mets', aNote:"mettre：je mets / tu mets / il met（單 t）/ nous mettons / vous mettez / ils mettent（雙 tt）" },
  { lesson:7, topic:'ir-re-verbs', type:'fill',   q:'nous _____ （mettre）',        hint:'⚠️ 雙 tt', a:'mettons', aNote:'nous mettons（tt）；vous mettez（tt）；ils mettent（tt）— 複數全部雙 t！' },
  { lesson:7, topic:'ir-re-verbs', type:'choose', q:'mettre 的 il 形是？',           hint:'單 t',    a:'il met', aNote:'je/tu/il → 單 t：mets/mets/met；nous/vous/ils → 雙 tt', opts:['il mets','il met','il mett','il mette'] },
  { lesson:7, topic:'ir-re-verbs', type:'choose', q:'「我把手機放進包包。」用哪個動詞？', hint:'放入', a:'mettre', aNote:'mettre = 放（put）也 = 穿上（put on）；porter 強調「穿著」的狀態', opts:['porter','mettre','prendre','avoir'] },

  // ── 動詞三組（課堂）──
  { lesson:7, topic:'ir-re-verbs', type:'choose', q:'finir 屬於第幾組動詞？',          hint:'-IR', a:'第二組', aNote:'第二組 = -IR 結尾（finir / choisir / partir）；nous → finissons（加 -iss-）', opts:['第一組','第二組','第三組'] },
  { lesson:7, topic:'ir-re-verbs', type:'choose', q:'vendre 屬於第幾組動詞？',         hint:'-RE 結尾', a:'第三組', aNote:'第三組 = 不規則（-RE/-OIR/avoir/être⋯）；需個別記', opts:['第一組','第二組','第三組'] },
  { lesson:7, topic:'irregular-verbs-3rd-group', type:'choose', q:'aller 屬於第幾組動詞？',          hint:'字尾像第一組但…', a:'第三組（不規則）', aNote:'aller 雖以 -ER 結尾，卻是不規則動詞（第三組）：vais/vas/va/allons/allez/vont', opts:['第一組','第二組','第三組（不規則）'] },
  { lesson:7, topic:'pouvoir-vouloir', type:'choose', q:'pouvoir 屬於第幾組？',            hint:'-OIR', a:'第三組', aNote:'pouvoir / vouloir / savoir → -OIR 結尾，都是第三組不規則', opts:['第一組','第二組','第三組'] },

  // ── 服裝詞彙（PDF p.57 + 課堂）──
  { lesson:7, topic:'vocab-clothing-size', type:'choose', q:'運動鞋法文是？',      hint:'sports shoes', a:'des baskets', aNote:'baskets = 運動鞋（複數）；chaussures = 鞋子（通稱）', opts:['des bottes','des baskets','des sandales','des talons'] },
  { lesson:7, topic:'vocab-clothing-size', type:'choose', q:'毛衣法文是？',        hint:'sweater / pullover', a:'un pull', aNote:'un pull = 毛衣；un manteau = 大衣；une veste = 夾克', opts:['un manteau','un pull','une veste','un gilet'] },
  { lesson:7, topic:'vocab-clothing-size', type:'choose', q:'手提包法文是？',      hint:'handbag', a:'un sac à main', aNote:'sac à main（手提包）；sac à dos = 背包', opts:['un sac à dos','un sac à main','une valise','un porte-monnaie'] },
  { lesson:7, topic:'vocab-clothing-size', type:'fill',   q:'「全新的」法文：_____ / _____ （陽性 / 陰性）', hint:'new', a:'neuf, neuve|neuf|neuve', aNote:'neuf（m）/ neuve（f）= 全新的；二手 = d\'occasion' },
  { lesson:7, topic:'vocab-clothing-size', type:'choose', q:'「二手的」法文是？',  hint:"d'occasion", a:"d'occasion", aNote:"d'occasion = used / second-hand；neuf/neuve = brand new", opts:["d'occasion","de seconde","d'utilisation","de vieille"] },

  // ── 尺碼問法（課堂）──
  { lesson:7, topic:'vocab-clothing-size', type:'choose', q:'「你穿幾號（衣服）？」怎麼問？', hint:'faire', a:'Tu fais quelle taille ?', aNote:'taille = 尺碼；Tu fais du S/M/L/XL — 動詞用 faire（不是 avoir）', opts:['Tu as quelle taille ?','Tu fais quelle taille ?','Tu portes quelle taille ?','Tu mets quelle taille ?'] },
  { lesson:7, topic:'question-words', type:'choose', q:'「你穿幾號鞋？」怎麼問？',       hint:'chausser', a:'Tu chausses combien ?', aNote:'chausser = to wear shoes（鞋的尺碼動詞）；Tu chausses du 42', opts:['Tu fais combien de chaussures ?','Tu portes quel numéro ?','Tu chausses combien ?','Tu mets quel pied ?'] },
  { lesson:7, topic:'question-words', type:'fill',   q:'「我 180 公分。」Je _____ 1m80.',  hint:'faire', a:'fais|Je fais 1m80', aNote:'身高也用 faire：Je fais 1m80 / Tu fais combien ？' },

  // ── 時尚表達（課堂）──
  { lesson:7, topic:'vocab-clothing-size', type:'choose', q:'「這很流行 / trendy」法文是？', hint:'tendance', a:"C'est à la mode. / C'est tendance.", aNote:"à la mode = tendance = trendy；Ce n'est pas à la mode = not trendy", opts:["C'est beau.","C'est à la mode. / C'est tendance.","C'est parfait.","C'est moderne."] },
  { lesson:7, topic:'vocab-clothing-size', type:'choose', q:'「Il me plaît」這句話是誰在喜歡誰？', hint:'主詞是物', a:'「物」讓「我」喜歡（it pleases me）', aNote:'plaire 結構：il me plaît = it pleases me；主詞 il = 那件物，me = 我。非「我喜歡它」的語序', opts:['我喜歡它（je 是主詞）','「物」讓「我」喜歡（it pleases me）','我們互相喜歡','它不喜歡我'] },
  { lesson:7, topic:'vocab-clothing-size', type:'fill',   q:'「這件衣服穿在我身上很適合。」Il me _____ bien.', hint:'look good on me', a:'va|va bien', aNote:'il me va bien = it looks good on me（aller = to suit/fit）' },

  // ── 翻譯練習（課堂句型）──
  { lesson:7, topic:'preposition-country', type:'trans', q:'為了去加拿大，我學法文。',                      hint:'pour / apprendre / français',  a:'Pour aller au Canada, j\'apprends le français.',          aNote:'pour + 動詞原形 = 目的；aller（不規則）', askClaude:true },
  { lesson:7, topic:'preposition-place-transport', type:'trans', q:'我開車上班，因為太遠了。',                      hint:'parce que / loin',             a:'Je prends ma voiture pour aller au travail parce que c\'est loin.', aNote:'parce que 接完整句子；pour 接動詞原形', askClaude:true },
  { lesson:7, topic:'connectors-pour-parceque', type:'trans', q:'週末我不用車。',                                hint:'le week-end / sans',           a:'Le week-end, je fais sans la voiture.',                   aNote:'faire sans = to do without；le week-end 放句首', askClaude:true },
  { lesson:7, topic:'adjective-agreement', type:'trans', q:'她賣黑色和藍色的洋裝。',                        hint:'vendre / robe / noir / bleu',  a:'Elle vend des robes noires et bleues.',                   aNote:'形容詞配合名詞性數：robe（f.pl）→ noires/bleues（後置）', askClaude:true },
  { lesson:7, topic:'question-words', type:'trans', q:'這件皮夾克多少錢？',                            hint:'veste en cuir / coûter',       a:'Combien coûte cette veste en cuir ?',                     aNote:'cette（陰性）+ veste（f）；en cuir = 皮革材質', askClaude:true },
  { lesson:7, topic:'vocab-clothing-size', type:'trans', q:'我喜歡這件洋裝，它穿在我身上很適合。',          hint:'plaire / aller bien',          a:'Cette robe me plaît, elle me va bien.',                   aNote:'me plaît（我喜歡）；me va bien（穿起來合身）', askClaude:true },
  { lesson:7, topic:'vocab-clothing-size', type:'trans', q:'你穿幾號？我穿 L。',                            hint:'taille / faire',               a:'Tu fais quelle taille ? Je fais du L.',                   aNote:'faire du S/M/L/XL（尺碼用 faire + du）', askClaude:true },

  // ══════════════════ 第8課 ══════════════════
  // ── 形容詞位置 ──
  { lesson:8, topic:'adjective-position', type:'choose', q:'下列哪個形容詞通常放在名詞「前面」？', hint:'短・常見', a:'grand', aNote:'petit/grand/bon/beau/joli/nouveau/vieux/jeune/gros 放前面，其餘大多後置', opts:['bleu','grand','français','connecté'] },
  { lesson:8, topic:'adjective-position', type:'choose', q:'下列哪個形容詞放在名詞「後面」？', hint:'顏色/國籍/材質一定後置', a:'noire', aNote:'顏色、國籍、材質、形狀類形容詞一律後置', opts:['petit','beau','noire','joli'] },
  { lesson:8, topic:'adjective-position', type:'fill',   q:'一台新電腦（母音開頭，nouveau 要變形）：un _____ ordinateur', hint:'nouveau → 母音前變形', a:'nouvel', aNote:'nouveau 在母音/啞音h開頭的陽性名詞前變 nouvel' },
  { lesson:8, topic:'adjective-position', type:'fill',   q:'一個美男子（bel/belle 特殊用法）：un _____ homme', hint:'beau → 母音前變形', a:'bel', aNote:'beau 在母音/啞音h開頭的陽性名詞前變 bel；homme 的 h 不發音視為母音開頭' },
  { lesson:8, topic:'adjective-position', type:'fill',   q:'一輛新車（陰性）：une _____ voiture', hint:'nouveau 陰性形', a:'nouvelle', aNote:'nouveau 陰性永遠是 nouvelle' },
  { lesson:8, topic:'adjective-position', type:'fill',   q:'一些漂亮的物品（複數，注意冠詞）：_____ beaux objets', hint:'des → ? （形容詞在前）', a:'de', aNote:'形容詞放在複數名詞前面時，des 要變成 de：de beaux objets' },
  { lesson:8, topic:'adjective-agreement', type:'gender', q:'beau 的陰性形是？', hint:'特殊變化', a:'belle', aNote:'beau → belle（陰性），複數陽性 beaux' },
  { lesson:8, topic:'adjective-agreement', type:'gender', q:'nouveau 的陽性複數形是？', hint:'X結尾', a:'nouveaux', aNote:'nouveau 複數加 x：nouveaux' },

  // ── 服飾/配件/材質補充 ──
  { lesson:8, topic:'vocab-clothing-size', type:'fill',   q:'雨衣（口語簡稱）：l\'imper_____able / l\'imper', hint:'imper+', a:'méable', aNote:'imperméable = 防水的，口語簡稱 imper' },
  { lesson:8, topic:'vocab-clothing-size', type:'choose', q:'「珠寶」bijou 的複數是？', hint:'不規則複數', a:'bijoux', aNote:'bijou 複數加 x：les bijoux（規律：-ou 結尾常加 x）', opts:['bijous','bijoux','bijoues','bijou'] },
  { lesson:8, topic:'vocab-clothing-size', type:'choose', q:'「太陽眼鏡」怎麼說？', hint:'soleil', a:'les lunettes de soleil', aNote:'lunettes（眼鏡，恆複數）+ de soleil', opts:['les lunettes de soleil','les lunettes de pluie','le parasol','la casquette'] },
  { lesson:8, topic:'vocab-clothing-size', type:'fill',   q:'雨傘 le para_____（防雨）', hint:'para + pluie', a:'pluie', aNote:'parapluie = para（against）+ pluie（雨）；parasol = 防太陽' },
  { lesson:8, topic:'vocab-clothing-size', type:'trans',  q:'她穿藍色的襯衫。', hint:'porter / chemise / bleu', a:'Elle porte une chemise bleue.', aNote:'chemise（f）→ bleue 陰性配合', askClaude:true },
  { lesson:8, topic:'vocab-clothing-size', type:'trans',  q:'這個皮革背包很漂亮。', hint:'sac à dos / en cuir / beau', a:'Ce sac à dos en cuir est beau.', aNote:'sac à dos（陽性，子音開頭）→ ce；beau 放後面當補語不用變位置規則', askClaude:true },

  // ── 尺碼 ──
  { lesson:8, topic:'question-words', type:'fill',   q:'你穿幾號鞋？Tu _____ combien ?', hint:'chausser', a:'chausses', aNote:'chausser = 穿鞋尺碼專用動詞；衣服尺碼用 faire' },
  { lesson:8, topic:'question-words', type:'choose', q:'問衣服尺碼用哪個動詞？', hint:'faire vs chausser', a:'faire', aNote:'Tu fais quelle taille ?（衣服）vs Tu chausses combien ?（鞋子）', opts:['faire','chausser','porter','mettre'] },

  // ── 天氣 ──
  { lesson:8, topic:'vocab-weather-season', type:'fill',   q:'天氣很冷：Il _____ froid.', hint:'faire', a:'fait', aNote:'il fait + 形容詞/度數：天氣描述固定用 faire' },
  { lesson:8, topic:'vocab-weather-season', type:'fill',   q:'下雪了：Il _____.', hint:'neiger', a:'neige', aNote:'neiger 只有 il 這個形（無人稱動詞）' },
  { lesson:8, topic:'vocab-weather-season', type:'fill',   q:'有風：Il y a du _____.', hint:'vent', a:'vent', aNote:'il y a + du/de la + 名詞（風、太陽、霧都用這個結構）' },
  { lesson:8, topic:'vocab-weather-season', type:'choose', q:'「天氣不好」最口語的說法？', hint:'moche', a:'Il fait moche.', aNote:'moche = 不好看/差，口語常用來說天氣差', opts:['Il fait moche.','Il fait beau.','Il y a du soleil.','Il fait chaud.'] },
  { lesson:8, topic:'vocab-weather-season', type:'fill',   q:'在春天：_____ printemps', hint:'例外', a:'au', aNote:'其他季節用 en（en hiver/été/automne），春天例外用 au printemps' },
  { lesson:8, topic:'vocab-weather-season', type:'fill',   q:'在一月：_____ janvier', hint:'月份固定用法', a:'en', aNote:'月份前一律用 en' },
  { lesson:8, topic:'vocab-weather-season', type:'trans',  q:'聖誕節在十二月。', hint:'Noël / en', a:'Noël, c\'est en décembre.', aNote:'月份用 en；年份也用 en（en 2025）', askClaude:true },
  { lesson:8, topic:'futur-proche', type:'trans',  q:'明天天氣會很冷，會下雪。', hint:'futur proche / il va', a:'Demain, il va faire froid, il va neiger.', aNote:'天氣的未來式也用 futur proche：il va + infinitif', askClaude:true },

  // ── Futur proche ──
  { lesson:8, topic:'futur-proche', type:'fill',   q:'明晚我要把洋裝做完：Demain soir, je _____ finir la robe.', hint:'aller 現在式', a:'vais', aNote:'futur proche = aller（現在）+ infinitif；je → vais' },
  { lesson:8, topic:'futur-proche', type:'fill',   q:'冬天會很難過：L\'hiver _____ être difficile.', hint:'aller 現在式 il/elle', a:'va', aNote:'il/elle/on → va' },
  { lesson:8, topic:'futur-proche', type:'fill',   q:'下星期我們要織一件毛衣：La semaine prochaine, nous _____ tricoter un pull.', hint:'aller 現在式 nous', a:'allons', aNote:'nous → allons' },
  { lesson:8, topic:'futur-proche', type:'fill',   q:'你們將要學習：Vous _____ apprendre.', hint:'aller 現在式 vous', a:'allez', aNote:'vous → allez' },
  { lesson:8, topic:'futur-proche', type:'fill',   q:'她們會很開心：Mes filles _____ être contentes.', hint:'aller 現在式 ils/elles', a:'vont', aNote:'ils/elles → vont' },
  { lesson:8, topic:'futur-proche', type:'choose', q:'futur proche 的結構是？', hint:'兩個動詞', a:'aller（現在）+ 動詞原形', aNote:'第二個動詞不變位，永遠用原形', opts:['aller（現在）+ 動詞原形','aller（過去）+ 過去分詞','venir + de + 原形','être + 過去分詞'] },
  { lesson:8, topic:'futur-proche', type:'trans',  q:'我明天要去買菜。', hint:'faire les courses / futur proche', a:'Je vais faire les courses demain.', aNote:'futur proche + demain 確定是明天而非現在馬上', askClaude:true },

  // ── venir ──
  { lesson:8, topic:'irregular-verbs-3rd-group', type:'fill',   q:'venir 變位：il _____', hint:'venir il/elle', a:'vient', aNote:'venir：je viens/tu viens/il vient/nous venons/vous venez/ils viennent' },
  { lesson:8, topic:'irregular-verbs-3rd-group', type:'fill',   q:'venir 變位：ils _____', hint:'venir ils/elles，雙n', a:'viennent', aNote:'ils/elles viennent（雙 n，不規則）' },
  { lesson:8, topic:'irregular-verbs-3rd-group', type:'fill',   q:'歡迎大家來（廣告用語）：Venez _____ !', hint:'很多人', a:'nombreux', aNote:'venez nombreux = welcome everyone，字面「來得眾多」' },

  // ── ce/cet/cette/ces ──
  { lesson:8, topic:'vocab-tech-objects', type:'fill',   q:'這台電腦（母音開頭）：_____ ordinateur', hint:'ce → 母音前變形', a:'cet', aNote:'ce 在母音/啞音h開頭的陽性名詞前變 cet' },
  { lesson:8, topic:'demonstrative-adj', type:'fill',   q:'這個行李箱（陰性）：_____ valise', hint:'cette', a:'cette', aNote:'陰性單數一律用 cette' },
  { lesson:8, topic:'vocab-tech-objects', type:'fill',   q:'這些手機是 iPhone：_____ téléphones sont des iPhones.', hint:'複數', a:'ces', aNote:'複數不分陰陽，一律用 ces' },
  { lesson:8, topic:'adjective-agreement', type:'gender', q:'ce 在陰性單數時要變成？', hint:'cette', a:'cette', aNote:'ce（陽性）→ cette（陰性）→ ces（複數）' },
  { lesson:8, topic:'demonstrative-adj', type:'choose', q:'為什麼 la tour Eiffel 不能說 cette tour Eiffel？', hint:'唯一性', a:'因為鐵塔只有一座，已經唯一確定，不需要從多個中指出特定一個', aNote:'cette 用在「有多個同類東西，要指出特定一個」的情境', opts:['因為鐵塔只有一座，已經唯一確定，不需要從多個中指出特定一個','因為 tour 是陽性','因為 Eiffel 是專有名詞不能加任何冠詞','文法上沒有差別，兩者皆可'] },

  // ── 科技物品 + Ça sert à quoi ──
  { lesson:8, topic:'vocab-tech-objects', type:'choose', q:'「藍牙喇叭」une enceinte Bluetooth，enceinte 是？', hint:'不是耳機', a:'喇叭/音響', aNote:'enceinte = speaker（音響），不是耳機（écouteurs）', opts:['耳機','喇叭/音響','手錶','行動電源'] },
  { lesson:8, topic:'vocab-tech-objects', type:'fill',   q:'行動電源（口語）：la batterie _____', hint:'externe', a:'externe', aNote:'batterie externe = power bank' },
  { lesson:8, topic:'vocab-tech-objects', type:'fill',   q:'「這是做什麼用的？」：Ça sert à _____ ?', hint:'quoi', a:'quoi', aNote:'Ça sert à quoi ? = À quoi ça sert ?（兩種語序皆可）' },
  { lesson:8, topic:'vocab-tech-objects', type:'trans',  q:'這是用來打電話的。', hint:'sert à + 原形', a:'Ça sert à téléphoner.', aNote:'sert à + 動詞原形 = 用來做…', askClaude:true },
  { lesson:8, topic:'reflexive-verbs', type:'trans',  q:'這支智能手錶是用來定位的。', hint:'montre connectée / se repérer', a:'Cette montre connectée sert à se repérer.', aNote:'se repérer = 自己找到方向/定位（反身動詞）', askClaude:true },
  { lesson:8, topic:'reflexive-verbs', type:'choose', q:'connecter 與 se connecter 的差別？', hint:'反身動詞', a:'connecter = 連接某物；se connecter = 自己上線/登入', aNote:'加 se 表示動作回到自己身上，類似 appeler vs s\'appeler', opts:['沒有差別','connecter = 連接某物；se connecter = 自己上線/登入','se connecter 是過去式','connecter 才是對的，se connecter 是錯的'] },

  // ── 反身動詞：日常作息 ──
  { lesson:8, topic:'reflexive-verbs', type:'fill',   q:'我醒來：Je _____ réveille.', hint:'se réveiller', a:'me', aNote:'反身代詞配合主詞：je me / tu te / il se' },
  { lesson:8, topic:'reflexive-verbs', type:'fill',   q:'我洗澡：Je me _____.', hint:'doucher', a:'douche', aNote:'se doucher = 洗澡（je me douche）' },
  { lesson:8, topic:'reflexive-verbs', type:'fill',   q:'我化妝：Je me _____.', hint:'maquiller', a:'maquille', aNote:'se maquiller = 化妝' },
  { lesson:8, topic:'reflexive-verbs', type:'fill',   q:'我整理頭髮：Je me _____.', hint:'coiffer', a:'coiffe', aNote:'se coiffer = 整理頭髮' },
  { lesson:8, topic:'reflexive-verbs', type:'trans',  q:'我每天早上8點醒來，洗澡，然後穿衣服。', hint:'se réveiller / se doucher / s\'habiller', a:'Je me réveille à 8h, je me douche, et je m\'habille.', aNote:'三個反身動詞依序排列，主詞都是 je → me', askClaude:true },

  // ══════════════════ 第9課 ══════════════════
  // ── une journée vs un jour ──
  { lesson:9, topic:'daily-routine-vocab', type:'choose', q:'「祝你有美好的一天」要說？', hint:'journée', a:'Bonne journée !', aNote:'bonjour 只是「嗨」；bonne journée 才是祝福語', opts:['Bonjour !','Bonne journée !','Bon jour !','Bonne nuit !'] },
  { lesson:9, topic:'adjective-agreement', type:'choose', q:'journée 跟 jour 的差別？', hint:'醒著 vs 24小時', a:'journée = 白天醒著的時間；jour = 24小時的一天', aNote:'journée 強調「過的這段時光」', opts:['journée = 白天醒著的時間；jour = 24小時的一天','兩個完全一樣','jour 才有陰陽性','journée 專指晚上'] },

  // ── 反身動詞現在式 + 否定句 ──
  { lesson:9, topic:'reflexive-verbs', type:'fill',   q:'s\'habiller 變位：tu _____', hint:'母音開頭縮寫', a:"t'habilles", aNote:'te + habilles → 母音前縮寫成 t\'habilles' },
  { lesson:9, topic:'reflexive-verbs', type:'fill',   q:'s\'habiller 變位：nous _____', hint:'nous 不縮寫', a:'nous habillons', aNote:'nous/vous 接母音開頭動詞不縮寫' },
  { lesson:9, topic:'reflexive-verbs', type:'fill',   q:'否定句「我沒有在7點醒來」：Je _____ me réveille pas à 7h.', hint:'ne 放哪裡', a:'ne', aNote:'ne 放在反身代詞「前面」：je ne me réveille pas' },
  { lesson:9, topic:'reflexive-verbs', type:'choose', q:'反身動詞否定句的 ne 要放在哪裡？', hint:'je [ne] me [verbe] pas', a:'反身代詞的前面', aNote:'je ne me réveille pas（不是 je me ne réveille pas）', opts:['反身代詞的前面','反身代詞的後面','句子最後','verbe 後面，pas 前面'] },
  { lesson:9, topic:'reflexive-verbs', type:'trans',  q:'你幾點起床？我6點起床。', hint:'se réveiller', a:'Tu te réveilles à quelle heure ? Je me réveille à 6h.', aNote:'se réveiller 現在式：je me réveille / tu te réveilles', askClaude:true },

  // ── 起床/睡覺系列辨析 ──
  { lesson:9, topic:'reflexive-verbs', type:'choose', q:'「上床躺下」（還沒睡著）法文是？', hint:'進入床的動作', a:'se coucher', aNote:'se coucher = 躺下進入床；不一定馬上睡著', opts:['se coucher','se lever','dormir','s\'endormir'] },
  { lesson:9, topic:'reflexive-verbs', type:'choose', q:'「入睡」（從醒著到睡著的那一刻）法文是？', hint:'瞬間動作', a:"s'endormir", aNote:"s'endormir = 入睡的瞬間；dormir = 睡著的狀態", opts:["s'endormir",'se coucher','se lever','se réveiller'] },
  { lesson:9, topic:'reflexive-verbs', type:'trans',  q:'我22點上床，但3點才睡著。', hint:'se coucher / s\'endormir', a:"Je me couche à 22h, mais je m'endors à 3h.", aNote:"se coucher（上床）≠ s'endormir（睡著）— 中間在失眠", askClaude:true },
  { lesson:9, topic:'daily-routine-vocab', type:'fill',   q:'失眠：faire des _____', hint:'insomnie', a:'insomnies', aNote:'faire des insomnies = 失眠' },

  // ── 一天作息閱讀詞彙 ──
  { lesson:9, topic:'daily-routine-vocab', type:'fill',   q:'提問（不能說 demander des questions）：_____ des questions', hint:'poser', a:'poser', aNote:'poser des questions = 發問；demander = 請求某人做事' },
  { lesson:9, topic:'daily-routine-vocab', type:'choose', q:'法文 interview 通常用在哪種情境？', hint:'記者', a:'記者採訪', aNote:'法文 interview 只用在記者採訪，求職面試不用這個字', opts:['記者採訪','求職面試','法庭審問','醫生問診'] },
  { lesson:9, topic:'daily-routine-vocab', type:'fill',   q:'洗碗：faire la _____', hint:'vaisselle', a:'vaisselle', aNote:'vaisselle = 餐具總稱；faire la vaisselle = 洗碗' },
  { lesson:9, topic:'daily-routine-vocab', type:'fill',   q:'慢跑：faire du _____', hint:'jogging', a:'jogging', aNote:'faire du jogging = 慢跑' },
  { lesson:9, topic:'daily-routine-vocab', type:'choose', q:'「DIY手工修繕」法文怎麼說？', hint:'bricoler', a:'le bricolage', aNote:'bricolage = DIY手工修繕（名詞），bricoler = 動詞', opts:['le bricolage','la cuisine','la vaisselle','le jogging'] },
  { lesson:9, topic:'daily-routine-vocab', type:'choose', q:'電視在口語中通常怎麼簡稱？', hint:'télé', a:'la télé', aNote:'télévision 太正式，口語幾乎都說 la télé', opts:['la télé','la TV','le télé','la vision'] },
  { lesson:9, topic:'daily-routine-vocab', type:'trans',  q:'她停止工作然後回家。', hint:'arrêter de / rentrer', a:'Elle arrête de travailler et elle rentre à la maison.', aNote:'arrêter de + 原形動詞', askClaude:true },

  // ── on vs nous ──
  { lesson:9, topic:'on-vs-nous', type:'choose', q:'「沒人知道他叫什麼名字」要用 on 還是 nous？', hint:'泛指大眾', a:'on', aNote:'on 可以泛指「沒有人、大家」，nous 只能指「你和我」這群特定人', opts:['on','nous','vous','ils'] },
  { lesson:9, topic:'on-vs-nous', type:'fill',   q:'on 的動詞變位形式跟誰一樣？', hint:'第三人稱單數', a:'il/elle', aNote:'on 永遠用 il/elle 的變位形式：on va, on fait, on est' },
  { lesson:9, topic:'on-vs-nous', type:'trans',  q:'我們今晚要去看電影嗎？（口語）', hint:'on', a:'On va au cinéma ce soir ?', aNote:'口語中 on 常直接取代 nous，更自然親切', askClaude:true },

  // ── pouvoir vs vouloir ──
  { lesson:9, topic:'pouvoir-vouloir', type:'fill',   q:'pouvoir 變位：nous _____', hint:'pouvons', a:'pouvons', aNote:'pouvoir：je peux/tu peux/il peut/nous pouvons/vous pouvez/ils peuvent' },
  { lesson:9, topic:'pouvoir-vouloir', type:'fill',   q:'vouloir 變位：ils _____', hint:'veulent', a:'veulent', aNote:'vouloir：je veux/tu veux/il veut/nous voulons/vous voulez/ils veulent' },
  { lesson:9, topic:'pouvoir-vouloir', type:'choose', q:'「Tu veux aller au théâtre ?」這句問的是什麼？', hint:'意願 vs 可行性', a:'問你想不想去（已知你能去）', aNote:'vouloir 問意願；pouvoir 問可行性（有沒有空、有沒有錢）', opts:['問你想不想去（已知你能去）','問你能不能去（已知你想去）','問你去過沒有','問你喜歡誰'] },
  { lesson:9, topic:'pouvoir-vouloir', type:'choose', q:'「Tu peux aller au théâtre ?」這句問的是什麼？', hint:'意願 vs 可行性', a:'問你能不能去（已知你想去）', aNote:'pouvoir 問可行性；vouloir 問意願', opts:['問你想不想去（已知你能去）','問你能不能去（已知你想去）','問你去過沒有','問你喜歡誰'] },
  { lesson:9, topic:'pouvoir-vouloir', type:'fill',   q:'「我不想」（另一種說法，用 envie）：Je n\'ai pas _____.', hint:'envie', a:'envie', aNote:'avoir envie de = 想要；je n\'ai pas envie = 我不想' },
  { lesson:9, topic:'pouvoir-vouloir', type:'trans',  q:'我可以做這件事。', hint:'pouvoir / le', a:'Je peux le faire.', aNote:'le = 那件事，代替前面提過的東西', askClaude:true },

  // ── 邀約句型 ──
  { lesson:9, topic:'social-invitations', type:'choose', q:'「你有興趣嗎？」最口語的問法？', hint:'ça', a:'Ça te dit ?', aNote:'ça（這件事）+ te（對你）+ dit（説，引申為吸引）', opts:['Ça te dit ?','Tu es content ?','Tu aimes ?','C\'est toi ?'] },
  { lesson:9, topic:'pouvoir-vouloir', type:'choose', q:'接受邀約最自然的回答是？', hint:'plaisir', a:'Avec plaisir !', aNote:'D\'accord ! / Pourquoi pas ! / Avec plaisir ! 都是接受邀約的常見說法', opts:['Avec plaisir !','Je suis désolé(e).','Je n\'ai pas envie.','Je ne peux pas.'] },
  { lesson:9, topic:'pouvoir-vouloir', type:'choose', q:'拒絕邀約並表達歉意要說？', hint:'désolé', a:'Je ne peux pas, je suis désolé(e).', aNote:'désolé(e) = 抱歉的（陰性加 e）', opts:['Je ne peux pas, je suis désolé(e).','Avec plaisir !','D\'accord !','Pourquoi pas !'] },
  { lesson:9, topic:'pouvoir-vouloir', type:'trans',  q:'你想去劇院嗎？— 好啊！', hint:'vouloir / D\'accord', a:'Tu veux aller au théâtre ? — D\'accord !', aNote:'theatre 邀約句型 + 接受', askClaude:true },

  // ── 頻率副詞 ──
  { lesson:9, topic:'frequency-adverbs', type:'choose', q:'頻率副詞「從不」到「總是」的正確排序？', hint:'jamais → toujours', a:'jamais < rarement < parfois < souvent < toujours', aNote:'從不 < 很少 < 有時候 < 常常 < 總是', opts:['jamais < rarement < parfois < souvent < toujours','toujours < souvent < parfois < rarement < jamais','parfois < jamais < souvent < rarement < toujours','souvent < toujours < jamais < rarement < parfois'] },
  { lesson:9, topic:'frequency-adverbs', type:'fill',   q:'我很少去劇院：Je vais _____ au théâtre.', hint:'rarement', a:'rarement', aNote:'rarement（很少）放在動詞後面' },
  { lesson:9, topic:'frequency-adverbs', type:'choose', q:'頻率副詞 jamais/rarement/parfois/souvent 一般放在句子的哪裡？', hint:'位置規則', a:'動詞後面', aNote:'這幾個頻率副詞放在動詞後面；le jeudi / tous les jeudis 則放句首或句尾', opts:['動詞後面','動詞前面','句子最前面','句子最後面，不能在其他位置'] },
  { lesson:9, topic:'frequency-adverbs', type:'choose', q:'「le jeudi」與「tous les jeudis」意思上的關係？', hint:'相同 vs 不同', a:'意思完全相同，都表示「每個星期四」', aNote:'le + 星期（單數）＝ tous les + 星期（複數），都是「每週固定」的意思', opts:['意思完全相同，都表示「每個星期四」','le jeudi 只指某一個星期四','tous les jeudis 比較少發生','兩者文法不同，意思也不同'] },
  { lesson:9, topic:'frequency-adverbs', type:'choose', q:'沒有冠詞的「jeudi」（無 le）是什麼意思？', hint:'特定 vs 固定', a:'只指某一個特定的星期四', aNote:'jeudi（無冠詞）＝ 某一次星期四；le jeudi ＝ 每週固定的星期四', opts:['只指某一個特定的星期四','每個星期四','從不會發生','跟 le jeudi 一樣'] },
  { lesson:9, topic:'frequency-adverbs', type:'trans',  q:'我們每週二、週日都有法文課。', hint:'le mardi et le dimanche', a:'On a cours de français le mardi et le dimanche.', aNote:'le + 星期 = 每週固定；等於 tous les mardis et tous les dimanches', askClaude:true },

  // ══════════════════ 🧩 句型框架庫（來自 Duolingo 113 張錯題截圖分析，5大誤區）══════════════════
  // lesson:0 = 不屬於特定課堂，對應筆記的「🧩 句型框架庫」(#frame-lib)
  // ── 誤區1：冠詞選擇（音樂/不可數液體最常錯）──
  { lesson:0, topic:'articles', type:'fill',   q:"J'écoute _____ jazz. (du/le/la)", hint:'音樂類用部分冠詞', a:'du', aNote:'Duolingo常見錯誤：音樂類（du jazz/du rock）用部分冠詞 du，不是 le/la' },
  { lesson:0, topic:'articles', type:'trans',  q:'我喝牛奶。', hint:'不可數液體', a:'Je bois du lait.', aNote:'lait（不可數液體）→ du lait（部分冠詞）；Duolingo錯題常漏掉或選錯冠詞', askClaude:true },
  { lesson:0, topic:'articles', type:'choose', q:'聽音樂類型（爵士、搖滾⋯）的冠詞通常用哪個？', hint:'部分冠詞', a:'du（部分冠詞）', aNote:'écouter du jazz / du rock / de la musique classique，音樂類大多用部分冠詞', opts:['du（部分冠詞）','le（定冠詞）','un（不定冠詞）','沒有冠詞'] },

  // ── 誤區2：動詞變位（tu es / je viens / elle veut 易混淆）──
  { lesson:0, topic:'etre-avoir', type:'fill',   q:'Tu _____ content ? (être，常見錯寫成 tu est)', hint:'être tu形', a:'es', aNote:"Duolingo常見錯誤：tu est（×）→ tu es（✓），être 的 tu 形沒有 t" },
  { lesson:0, topic:'irregular-verbs-3rd-group', type:'fill', q:'Je _____ de Taïwan. (venir，常見錯寫成 je vient)', hint:'venir je形', a:'viens', aNote:'Duolingo常見錯誤：je vient（×）→ je viens（✓），venir je/tu 形是 viens 不是 vient' },
  { lesson:0, topic:'pouvoir-vouloir', type:'fill', q:'Elle _____ partir. (vouloir，常見錯寫成 elle veux)', hint:'vouloir elle形', a:'veut', aNote:'Duolingo常見錯誤：elle veux（×）→ elle veut（✓），vouloir 的 il/elle 形是 veut 不是 veux（veux 是 je/tu 形）' },

  // ── 誤區3：介詞 à + 地點（常漏掉 à）──
  { lesson:0, topic:'preposition-place-transport', type:'fill', q:'On va _____ piscine. (常漏掉 à)', hint:'aller + à la', a:'à la', aNote:'Duolingo常見錯誤：On va la piscine（×，漏掉à）→ On va à la piscine（✓）' },
  { lesson:0, topic:'preposition-place-transport', type:'trans', q:'我們去游泳池。', hint:'aller + à la piscine', a:'On va à la piscine.', aNote:'「去某地」結構永遠是 aller + à/au/à la/chez + 地點，à 不能省略', askClaude:true },
  { lesson:0, topic:'preposition-place-transport', type:'choose', q:'「去某地」aller 後面一定要接什麼？', hint:'à 不能省略', a:'à / au / à la / chez + 地點', aNote:'Duolingo常見錯誤就是漏掉這個 à；aller 後面不能直接接地點名詞', opts:['à / au / à la / chez + 地點','直接接地點，不用介詞','de + 地點','en + 地點（所有地點都用en）'] },

  // ── 誤區4：ce / cet / cette / ces（陽性母音開頭常忘記用 cet）──
  { lesson:0, topic:'demonstrative-adj', type:'fill', q:'_____ animal (常見錯寫成 le animal)', hint:'母音開頭陽性', a:'cet', aNote:"Duolingo常見錯誤：le animal（×）→ l'animal 或 cet animal（✓），陽性母音開頭名詞要連音" },
  { lesson:0, topic:'demonstrative-adj', type:'choose', q:'「le animal」為什麼是錯的？', hint:'母音開頭連音', a:"animal 是母音開頭的陽性名詞，定冠詞要變成 l'，指示詞要變成 cet", aNote:"母音/啞音h開頭的陽性單數名詞，不論定冠詞或指示詞都要切換成連音形式：l'animal / cet animal", opts:["animal 是母音開頭的陽性名詞，定冠詞要變成 l'，指示詞要變成 cet",'animal 其實是陰性名詞','le 在任何情況都不能加在動物名詞前','這句其實是對的'] },
  { lesson:0, topic:'demonstrative-adj', type:'fill', q:'_____ hôtel (母音/啞音h開頭)', hint:'cet', a:'cet', aNote:'hôtel 的 h 不發音，視為母音開頭 → cet hôtel' },

  // ── 誤區5：avoir vs être 感受句（人的感受用 avoir，物的狀態用 être）──
  { lesson:0, topic:'etre-avoir', type:'fill', q:'他覺得熱。Il _____ chaud. (常見錯寫成 il est chaud)', hint:'人的感受用avoir', a:'a', aNote:'Duolingo常見錯誤：il est chaud（物是熱的）vs il a chaud（人覺得熱）混用，人的感受要用 avoir' },
  { lesson:0, topic:'etre-avoir', type:'choose', q:'「il est chaud」跟「il a chaud」差別？', hint:'物 vs 人', a:'il est chaud=物是熱的；il a chaud=人覺得熱', aNote:'人的感受幾乎都用 avoir：avoir faim/froid/chaud/peur/besoin de', opts:['il est chaud=物是熱的；il a chaud=人覺得熱','兩句意思完全一樣','il a chaud 才是正確說法，il est chaud 永遠是錯的','只有 il est chaud 正確'] },
  { lesson:0, topic:'etre-avoir', type:'trans', q:'我餓了。', hint:'avoir + faim', a:'J\'ai faim.', aNote:'感受句用 avoir：j\'ai faim/froid/chaud/peur/besoin de', askClaude:true },

  // ══════════════════ 第10課：家事動詞 ══════════════════
  { lesson:10, topic:'household-chores', type:'choose', q:'「買菜購物」怎麼說？', hint:'複數！', a:'faire les courses', aNote:'les courses（複數）= 日常購物/買菜；le cours = 課堂；une course = 比賽', opts:['faire les courses','faire les cours','faire du shopping','faire une course'] },
  { lesson:10, topic:'household-chores', type:'fill',   q:'打掃家裡：faire _____ ménage', hint:'定冠詞', a:'le', aNote:'faire le ménage = 打掃整個家；ménage 是陽性名詞 → le ménage' },
  { lesson:10, topic:'household-chores', type:'fill',   q:'洗碗：faire _____ vaisselle', hint:'定冠詞', a:'la', aNote:'faire la vaisselle = 洗碗；vaisselle 是陰性名詞 → la vaisselle' },
  { lesson:10, topic:'household-chores', type:'fill',   q:'洗衣服：faire _____ lessive', hint:'不定冠詞陰性', a:'une', aNote:'faire une lessive = 洗一次衣服（有限次數，所以用 une）' },
  { lesson:10, topic:'household-chores', type:'choose', q:'「做 DIY・修繕」可以用哪個動詞替代 faire du bricolage？', hint:'同字根', a:'bricoler', aNote:'faire du bricolage ↔ bricoler，兩個都對；課，jardinage ↔ jardiner，cuisine ↔ cuisiner', opts:['bricoler','cuisiner','jardiner','ménager'] },
  { lesson:10, topic:'household-chores', type:'choose', q:'「faire les courses」和「faire une course」意思不同，區別是？', hint:'複數 vs 單數', a:'les courses（複數）= 買菜；une course（單數）= 比賽', aNote:'⚠️ 這是很常見的陷阱：複數 courses 跟單數 course 意思完全不一樣', opts:['les courses（複數）= 買菜；une course（單數）= 比賽','les courses = 一次採購；une course = 多次採購','兩個意思一樣，都是購物','courses 是口語，course 是書面語'] },
  { lesson:10, topic:'household-chores', type:'fill',   q:'洗衣機的法文：la _____ à laver', hint:'機器', a:'machine', aNote:'la machine à laver = 洗衣機（預設是洗衣，le lave-linge 也可以）；le lave-vaisselle = 洗碗機' },
  { lesson:10, topic:'household-chores', type:'trans',  q:'他做飯，我洗碗。', hint:'cuisiner / faire la vaisselle', a:'Il fait la cuisine, je fais la vaisselle.', aNote:'faire la cuisine 或 cuisiner 都可以表達做飯', askClaude:true },
  { lesson:10, topic:'household-chores', type:'choose', q:'哪一個家事「不能」用簡單動詞（如 jardiner）替代，只能用 faire + 名詞？', hint:'無對應動詞', a:'faire la vaisselle', aNote:'vaisselle 沒有對應的動詞形式；bricolage→bricoler、jardinage→jardiner、cuisine→cuisiner', opts:['faire la vaisselle','faire du jardinage','faire du bricolage','faire la cuisine'] },
  { lesson:10, topic:'household-chores', type:'trans',  q:'週末我做園藝。', hint:'jardinage', a:'Le week-end, je fais du jardinage.', aNote:'faire du jardinage 或 jardiner 都可以', askClaude:true },

  // ══════════════════ 第10課：Passé récent ══════════════════
  { lesson:10, topic:'passe-recent', type:'fill',   q:'「剛剛做了…」的句型結構是？', hint:'venir de + ___', a:'infinitif', aNote:'Passé récent = venir de + 原形動詞（infinitif）；要變位的是 venir，後面動詞原形不變' },
  { lesson:10, topic:'passe-recent', type:'fill',   q:'Je _____ de finir. (venir，我剛剛結束)', hint:'venir je形', a:'viens', aNote:'venir 的 je/tu 形都是 viens；passé récent = je viens de + infinitif' },
  { lesson:10, topic:'passe-recent', type:'fill',   q:'Il _____ de partir. (venir，他剛走)', hint:'venir il形', a:'vient', aNote:'venir 的 il/elle 形是 vient（注意拼法：t 結尾，不發音）' },
  { lesson:10, topic:'passe-recent', type:'fill',   q:'Nous _____ d\'arriver. (venir，我們剛到)', hint:'venir nous形', a:'venons', aNote:'venir nous形 = venons；注意 de 在母音前縮寫成 d\'' },
  { lesson:10, topic:'passe-recent', type:'choose', q:'「我剛做完洗碗」的正確說法？', hint:'venir de', a:'Je viens de faire la vaisselle.', aNote:'venir de + infinitif；faire 是原形不變，只有 venir 需要變位', opts:['Je viens de faire la vaisselle.','J\'ai fait la vaisselle.','Je fais la vaisselle.','Je vais faire la vaisselle.'] },
  { lesson:10, topic:'passe-recent', type:'choose', q:'「venir de」和「aller + infinitif」分別表示什麼時間概念？', hint:'剛才 vs 馬上', a:'venir de = 剛才（passé）；aller + inf = 即將（futur）', aNote:'三種近未/近過去：Je viens de faire（剛做完）/ Je fais（現在做）/ Je vais faire（要去做）', opts:['venir de = 剛才（passé）；aller + inf = 即將（futur）','venir de = 即將；aller + inf = 剛才','兩個都是未來式','兩個都是過去式'] },
  { lesson:10, topic:'passe-recent', type:'fill',   q:'她剛開始：Elle vient _____ commencer.', hint:'de + inf', a:'de', aNote:'venir de + infinitif；母音前：de → d\'（elle vient d\'arriver）' },
  { lesson:10, topic:'passe-recent', type:'trans',  q:'他們剛買票。', hint:'venir de + acheter', a:'Ils viennent d\'acheter des places.', aNote:'venir ils形 = viennent；des places = 票（電影票/音樂廳票）', askClaude:true },
  { lesson:10, topic:'passe-recent', type:'trans',  q:'我剛發現一部新影集。', hint:'venir de + découvrir', a:'Je viens de découvrir une nouvelle série.', aNote:'découvrir 不規則動詞；série = 影集（séries Netflix…）', askClaude:true },
  { lesson:10, topic:'passe-recent', type:'choose', q:'「Vous venez de finir ?」是問什麼？', hint:'時態', a:'你們剛結束了嗎？', aNote:'passé récent 疑問句，用語調（句末升調）或 est-ce que 就可以表達問句', opts:['你們剛結束了嗎？','你們要去結束嗎？','你們正在結束嗎？','你們結束過了嗎？'] },

  // ══════════════════ 第10課：外貌描述 ══════════════════
  { lesson:10, topic:'physical-description', type:'choose', q:'頭髮是紅色要用哪個詞？', hint:'不是 rouge！', a:'roux / rousse', aNote:'頭髮紅色 = roux（陽）/ rousse（陰）；rouge 是一般紅色（口紅、蘋果），不用在頭髮上', opts:['roux / rousse','rouge / rouge','rouge / rosse','roux / rouge'] },
  { lesson:10, topic:'physical-description', type:'choose', q:'眼睛是棕色要用哪個詞？', hint:'不是 brun！', a:'marron', aNote:'眼睛棕色 = marron（不變詞，不加 s）；brun 用於頭髮棕色；marron 對眼睛和物品', opts:['marron','brun','brune','châtain'] },
  { lesson:10, topic:'physical-description', type:'choose', q:'頭髮是棕色要用哪個詞？', hint:'不是 marron！', a:'brun / brune', aNote:'頭髮棕色 = brun（陽）/ brune（陰）；marron 用於眼睛和物品，頭髮要用 brun', opts:['brun / brune','marron','châtain','blond'] },
  { lesson:10, topic:'physical-description', type:'fill',   q:'「禿頭」：il est _____', hint:'chauve', a:'chauve', aNote:'chauve = 禿頭（陽陰同形）；être chauve，不用 avoir' },
  { lesson:10, topic:'physical-description', type:'choose', q:'「他有鬍子」（整臉）怎麼說？', hint:'avoir', a:'il a la barbe / il est barbu', aNote:'la barbe = 鬍子（整臉）；la moustache = 唇上方的小鬍子；也可說 il est barbu（有鬍子的）', opts:['il a la barbe / il est barbu','il est barbe','il a barbu','il fait la barbe'] },
  { lesson:10, topic:'physical-description', type:'fill',   q:'「他看起來很壯」：Il a l\'air _____.', hint:'形容詞', a:'fort', aNote:'avoir l\'air + adj = 看起來像（不確定）；比 il est fort（他確實很壯）語氣更軟' },
  { lesson:10, topic:'physical-description', type:'choose', q:'cheveux（頭髮）是陽性還是陰性？變形容詞時要注意什麼？', hint:'性數配合', a:'陽性複數，形容詞配陽性複數形', aNote:'les cheveux bruns（不是 brunes）；cheveux 固定是陽性複數，形容詞要配陽性複數', opts:['陽性複數，形容詞配陽性複數形','陰性複數，形容詞配陰性複數形','陽性單數，形容詞配陽性單數形','視情況而定'] },
  { lesson:10, topic:'physical-description', type:'choose', q:'「marron」作為顏色詞時，複數形是什麼？', hint:'不變詞', a:'marron（不變，不加 s）', aNote:'marron / orange / châtain 等「從物品借來的顏色詞」是不變詞（invariable），不加 s 或 e', opts:['marron（不變，不加 s）','marrons（加 s）','marronne（加 e）','marronnes（加 es）'] },
  { lesson:10, topic:'physical-description', type:'trans',  q:'她有長的捲曲棕色頭髮。', hint:'longs / frisés / bruns', a:'Elle a les cheveux longs, frisés et bruns.', aNote:'cheveux 是陽性複數 → longs, frisés, bruns（全部陽性複數形）', askClaude:true },

  // ══════════════════ 第10課：性格形容詞 ══════════════════
  { lesson:10, topic:'character-adjectives', type:'choose', q:'「gentil」的陰性形式？', hint:'雙寫 l', a:'gentille', aNote:'gentil → gentille（雙寫 l 再加 e）；méchant → méchante（普通加 e）', opts:['gentille','gentile','gentile','gentils'] },
  { lesson:10, topic:'character-adjectives', type:'fill',   q:'「courageux」的陰性形式？', hint:'-eux → -euse', a:'courageuse', aNote:'-eux → -euse 規則：courageux→courageuse, généreux→généreuse, sérieux→sérieuse' },
  { lesson:10, topic:'character-adjectives', type:'choose', q:'「il est gentil」和「il est généreux」有什麼差別？', hint:'個性 vs 行動', a:'gentil = 善良個性；généreux = 行動上常為別人做事', aNote:'gentil 強調個性特質；généreux 強調常付出、慷慨的具體行為表現', opts:['gentil = 善良個性；généreux = 行動上常為別人做事','兩個完全同義可互換','gentil = 外向；généreux = 內向','généreux 比 gentil 更正面'] },
  { lesson:10, topic:'character-adjectives', type:'fill',   q:'「她很幽默好笑」：Elle est _____.', hint:'不分陰陽', a:'drôle', aNote:'drôle = 有趣、好笑，陽陰同形（不變化）；sociable, dynamique, calme 也是同形' },
  { lesson:10, topic:'character-adjectives', type:'choose', q:'「comme」在比較句裡的意思？', hint:'比較', a:'像、就像（like）', aNote:'comme = like；Il est né en 1998, comme moi.（他1998年生，跟我一樣）；bleu comme le ciel（藍得像天空）', opts:['像、就像（like）','因為（because）','所以（so）','但是（but）'] },
  { lesson:10, topic:'character-adjectives', type:'choose', q:'「assez」有兩個意思，分別是？', hint:'足夠 / 相當', a:'① 足夠（enough）② 相當・挺（pretty/quite）', aNote:'Il a assez dormi.（他睡夠了）vs Il est assez grand.（他挺高的）——依上下文判斷', opts:['① 足夠（enough）② 相當・挺（pretty/quite）','① 太（too much）② 一點點（a little）','① 從不 ② 總是','只有一個意思：足夠'] },
  { lesson:10, topic:'character-adjectives', type:'trans',  q:'她很認真，跟我完全不一樣。', hint:'sérieuse / comme', a:'Elle est sérieuse, pas comme moi.', aNote:'pas comme moi = 不像我；comme 也可以用在否定：pas comme + 名詞', askClaude:true },

  // ══════════════════════════════════════════════════════════════
  // 第11課：住房・Passé composé・介系詞・COD・Pronoms toniques
  // ══════════════════════════════════════════════════════════════

  // ── Pronoms toniques ─────────────────────────────────────────
  { lesson:11, topic:'pronoms-toniques', type:'fill',   q:'il → 重讀代詞是？',                  hint:'⚠️ 不是 il', a:'lui', aNote:'il → lui（常見錯誤：不是 il）；elle 和一般代詞相同' },
  { lesson:11, topic:'pronoms-toniques', type:'fill',   q:'ils → 重讀代詞是？',                  hint:'⚠️ 不是 ils', a:'eux', aNote:'ils → eux（常見錯誤：不是 ils）；elles 和一般代詞相同' },
  { lesson:11, topic:'pronoms-toniques', type:'fill',   q:'「在他家」：chez _____',              hint:'il → ?', a:'lui', aNote:'chez lui = 在他家；chez + pronom tonique' },
  { lesson:11, topic:'pronoms-toniques', type:'fill',   q:'「在他們家」：chez _____',            hint:'ils → ?', a:'eux', aNote:'chez eux = 在他們家' },
  { lesson:11, topic:'pronoms-toniques', type:'choose', q:'「我嘛，我很愛喝咖啡」強調句型？',   hint:'重讀代詞放句首', a:'Moi, j\'adore le café.', aNote:'強調主詞：Moi, j\'adore / Toi, tu aimes…，重讀代詞放句首再接正常主詞+動詞', opts:['Moi, j\'adore le café.','Je moi adore le café.','Il moi, j\'adore le café.','Lui, j\'adore le café.'] },
  { lesson:11, topic:'pronoms-toniques', type:'choose', q:'「和我一樣」怎麼說？',                hint:'比較 / comme', a:'comme moi', aNote:'comme + pronom tonique；pas comme moi = 不像我', opts:['comme moi','comme je','avec moi','pour moi'] },
  { lesson:11, topic:'pronoms-toniques', type:'trans',  q:'我喜歡咖啡，你呢？', hint:'et toi', a:'J\'aime le café, et toi ?', aNote:'et toi ? = 你呢？（強調對方）', askClaude:true },
  { lesson:11, topic:'pronoms-toniques', type:'trans',  q:'他在他家工作。', hint:'chez lui', a:'Il travaille chez lui.', aNote:'chez lui = 在他自己家（pronom tonique）', askClaude:true },

  // ── Déménager vs Emménager ───────────────────────────────────
  { lesson:11, topic:'vocab-housing', type:'choose', q:'「搬出舊家」用哪個動詞？', hint:'dé- 前綴 = 離開', a:'déménager', aNote:'déménager = 搬出（move out）；emménager = 搬入（move in）；順序：先 dé- 再 em-', opts:['déménager','emménager','aménager','ménager'] },
  { lesson:11, topic:'vocab-housing', type:'choose', q:'「搬進新公寓」用哪個動詞？', hint:'em- 前綴 = 進入', a:'emménager', aNote:'emménager = 搬入（move in）；On emménage dans le nouvel appartement.', opts:['déménager','emménager','partir','arriver'] },
  { lesson:11, topic:'vocab-housing', type:'fill',   q:'他們十天前搬家了：Ils ont déménagé _____ dix jours.', hint:'「…前」的表達', a:'il y a', aNote:'il y a + 時間 = …前；il y a 10 jours（10天前）/ il y a une semaine（一週前）' },

  // ── Les pièces et l'équipement ───────────────────────────────
  { lesson:11, topic:'vocab-housing', type:'choose', q:'chambre 和 pièce 有什麼差別？', hint:'泛指 vs 臥室', a:'chambre = 臥室；pièce = 泛指任何房間', aNote:'pièce 是泛稱（any room）；chambre 特指臥室；Il y a 4 pièces 指4個房間（含廚房）', opts:['chambre = 臥室；pièce = 泛指任何房間','兩個完全同義','pièce = 臥室；chambre = 廚房','chambre 只用在飯店'] },
  { lesson:11, topic:'vocab-housing', type:'choose', q:'salon + salle à manger 合一稱為？', hint:'起居室', a:'le séjour', aNote:'le séjour = 客廳和餐廳合一的起居室（open-plan living）', opts:['le séjour','la salle','le salon','la chambre'] },
  { lesson:11, topic:'vocab-housing', type:'fill',   q:'「閣樓」怎麼說？（vide-_____ = 跳蚤市集）', hint:'堆雜物的地方', a:'grenier', aNote:'le grenier = 閣樓；vide-grenier（清空閣樓）= 法國的車庫拍賣文化' },
  { lesson:11, topic:'vocab-housing', type:'fill',   q:'「冰箱」的口語俗稱（品牌名轉通用詞）：le _____', hint:'不是 réfrigérateur', a:'frigo', aNote:'le frigo = 冰箱（réfrigérateur 的口語縮寫；和英文的 fridge 同字根）' },
  { lesson:11, topic:'vocab-housing', type:'choose', q:'「問住房坪數」怎麼說？', hint:'surface / m²', a:'Quelle est la surface ?', aNote:'Quelle est la surface ? → La maison fait 100 m²（100平方公尺 ≈ 30坪）', opts:['Quelle est la surface ?','Combien d\'étages ?','C\'est grand comment ?','Quelle est la taille ?'] },
  { lesson:11, topic:'vocab-housing', type:'trans',  q:'浴室在哪裡？', hint:'salle de bain', a:'Où est la salle de bain ?', aNote:'la salle de bain = 浴室（bain = 浴缸）', askClaude:true },

  // ── L'immeuble ───────────────────────────────────────────────
  { lesson:11, topic:'vocab-housing', type:'choose', q:'ascenseur、couloir、escalier、hall 有什麼共同點？', hint:'公共空間', a:'都是 parties communes（公共區域）', aNote:'公寓的 parties communes = 所有住戶共用的空間（電梯、走廊、樓梯、大廳）', opts:['都是 parties communes（公共區域）','都在室外','都屬於私人空間','都是廚房設備'] },
  { lesson:11, topic:'vocab-housing', type:'fill',   q:'「腳踏車停放室」：le local à _____', hint:'véhicule à pédales', a:'vélos', aNote:'le local à vélos = 腳踏車停放室；le local à poubelles = 垃圾房' },
  { lesson:11, topic:'vocab-housing', type:'trans',  q:'請尊重你的鄰居！', hint:'Respectez / voisins', a:'Respectez vos voisins !', aNote:'voisin(e) = 鄰居；Respectez（vous 命令式）', askClaude:true },

  // ── Interdiction / Demande ───────────────────────────────────
  { lesson:11, topic:'interdiction-demande', type:'choose', q:'「禁止吸菸」哪個說法是錯的？', hint:'三種正確格式', a:'Pas fumer.', aNote:'正確：Défense de fumer. / Interdiction de fumer. / Il est interdit de fumer.；Ne pas fumer. 也對（Ne pas + infinitif）', opts:['Défense de fumer.','Il est interdit de fumer.','Pas fumer.','Ne pas fumer.'] },
  { lesson:11, topic:'interdiction-demande', type:'fill',   q:'「請關門」（禮貌請求）：Merci _____ fermer la porte d\'entrée.', hint:'Merci + ?', a:'de', aNote:'Merci de + infinitif = 禮貌請求；Prière de + infinitif 也是同類句型' },
  { lesson:11, topic:'interdiction-demande', type:'choose', q:'「Prière de trier vos déchets.」是什麼意思？', hint:'trier = 分類；déchets = 垃圾', a:'請做好垃圾分類。', aNote:'Prière de + infinitif = 禮貌請求；trier = 分類；déchets = 垃圾', opts:['請做好垃圾分類。','禁止丟垃圾。','禁止在此停留。','請保持安靜。'] },
  { lesson:11, topic:'interdiction-demande', type:'fill',   q:'「禁止在草坪上走」：_____ de marcher sur la pelouse.', hint:'名詞式禁止', a:'Défense', aNote:'Défense de + infinitif = 禁止；pelouse = 草坪' },
  { lesson:11, topic:'interdiction-demande', type:'trans',  q:'提前為噪音道歉。', hint:'Pardon d\'avance / bruit', a:'Pardon d\'avance pour le bruit.', aNote:'d\'avance = 提前；pour le bruit = 為了噪音；也可說 Désolé(e) pour le bruit.', askClaude:true },

  // ── Passé composé ────────────────────────────────────────────
  { lesson:11, topic:'passe-compose', type:'fill',   q:'trouver → 過去分詞是？', hint:'-ER 動詞規則', a:'trouvé', aNote:'-ER 動詞：去掉 -er，加 -é → trouver → trouvé' },
  { lesson:11, topic:'passe-compose', type:'fill',   q:'acheter → 過去分詞是？', hint:'-ER 動詞規則', a:'acheté', aNote:'acheter → acheté（-er → -é）' },
  { lesson:11, topic:'passe-compose', type:'fill',   q:'déménager → 過去分詞是？', hint:'-ER 動詞規則', a:'déménagé', aNote:'déménager → déménagé（-er → -é）' },
  { lesson:11, topic:'passe-compose', type:'fill',   q:'「你們找到家具了嗎？」：Vous _____ trouvé des meubles ?', hint:'avoir 現在式（vous）', a:'avez', aNote:'passé composé = avoir（現在式）+ participe passé；vous → avez' },
  { lesson:11, topic:'passe-compose', type:'fill',   q:'「我們10天前搬家了」：On _____ déménagé il y a 10 jours.', hint:'avoir 現在式（on）', a:'a', aNote:'on → il/elle/on → a；On a déménagé il y a 10 jours.' },
  { lesson:11, topic:'passe-compose', type:'fill',   q:'「我們沒找到床」：On n\'_____ pas trouvé de lit.', hint:'否定：ne…pas 包住 avoir', a:'a', aNote:'否定：n\' + avoir + pas + participe passé；母音前 ne → n\'' },
  { lesson:11, topic:'passe-compose', type:'choose', q:'Passé composé 否定句，ne 和 pas 放在哪裡？', hint:'包住 avoir', a:'ne 在 avoir 前，pas 在 avoir 後（participe passé 前）', aNote:'On n\'a pas trouvé = ne + a + pas + trouvé；⚠️ ne → n\' 因為 avoir 以母音開頭', opts:['ne 在 avoir 前，pas 在 avoir 後（participe passé 前）','ne 和 pas 包住整個句子','ne 在 participe passé 前，pas 在後','pas 在動詞最後'] },
  { lesson:11, topic:'passe-compose', type:'fill',   q:'「他們買了一個衣櫃」：Ils _____ acheté une armoire.', hint:'avoir（ils）', a:'ont', aNote:'ils/elles → ont；Ils ont acheté une armoire.' },
  { lesson:11, topic:'passe-compose', type:'trans',  q:'我買了一張床和兩張扶手椅。', hint:'avoir + acheté', a:'J\'ai acheté un lit et deux fauteuils.', aNote:'j\'ai acheté（passé composé）；⚠️ fauteuil（m）= 扶手椅', askClaude:true },
  { lesson:11, topic:'passe-compose', type:'trans',  q:'他們沒有裝潢公寓。', hint:'décorer / négation', a:'Ils n\'ont pas décoré l\'appartement.|Ils n\'ont pas décoré leur appartement.', aNote:'n\' + ont + pas + décoré；décorer → décoré', askClaude:true },
  { lesson:11, topic:'passe-compose', type:'trans',  q:'你忘記關門了。', hint:'oublier / porte', a:'Tu as oublié de fermer la porte.', aNote:'✅ 這是 passé composé（過去式）：tu as oublié；oublier de + infinitif = 忘記做…；oublier → oublié', askClaude:true },

  // ── Prépositions de lieu (2) ─────────────────────────────────
  { lesson:11, topic:'prepositions-lieu2', type:'choose', q:'「在沙發旁邊」怎麼說？', hint:'côté', a:'à côté du canapé', aNote:'à côté de + le = à côté du；⚠️ de + le = du', opts:['à côté du canapé','à côté le canapé','à côté de canapé','au côté du canapé'] },
  { lesson:11, topic:'prepositions-lieu2', type:'fill',   q:'「在窗戶右邊」：à droite _____ la fenêtre', hint:'de + la = ?', a:'de', aNote:'à droite de la fenêtre（la 不縮寫，de la 保持原樣）；à côté du（de + le）、à côté des（de + les）' },
  { lesson:11, topic:'prepositions-lieu2', type:'fill',   q:'「在兩張椅子之間」：_____ les deux chaises', hint:'between', a:'entre', aNote:'entre = 在…之間（between）；entre 後接名詞不需要 de' },
  { lesson:11, topic:'prepositions-lieu2', type:'fill',   q:'「在沙發對面」：en face _____ canapé', hint:'de + le = ?', a:'du', aNote:'en face de + le = en face du；de + le = du' },
  { lesson:11, topic:'prepositions-lieu2', type:'choose', q:'「de + les」縮寫成？', hint:'縮寫規則', a:'des', aNote:'de + le = du；de + les = des；de + la 和 de + l\' 不縮寫', opts:['des','les','aux','du'] },
  { lesson:11, topic:'prepositions-lieu2', type:'trans',  q:'花瓶在電視旁邊。', hint:'à côté de', a:'Le vase est à côté de la télé.|Le vase est à côté de la télévision.', aNote:'à côté de + la télé（陰性，不縮寫）', askClaude:true },
  { lesson:11, topic:'prepositions-lieu2', type:'trans',  q:'把地毯放在桌子下面。', hint:'mettre / sous', a:'Je place le tapis sous la table.|Mets le tapis sous la table.', aNote:'sous = 在…下面；place/mets = 放', askClaude:true },

  // ── Les pronoms COD ──────────────────────────────────────────
  { lesson:11, topic:'cod-pronouns', type:'choose', q:'「Je connais Sophie.」用 COD 代替 Sophie：', hint:'Sophie 是陰性', a:'Je la connais.', aNote:'Sophie（陰性單數）→ la；COD 放在動詞前', opts:['Je la connais.','Je le connais.','Je lui connais.','Je les connais.'] },
  { lesson:11, topic:'cod-pronouns', type:'choose', q:'「J\'adore ce film.」用 COD 代替 ce film：', hint:'film 是陽性，但注意母音', a:'Je l\'adore.', aNote:'ce film（陽性）→ le，但後接母音開頭動詞 adore → 縮寫成 l\'；Je l\'adore.', opts:['Je l\'adore.','Je le adore.','Je la adore.','Je lui adore.'] },
  { lesson:11, topic:'cod-pronouns', type:'fill',   q:'「Il aime ses voisins.」→ Il _____ aime.', hint:'voisins = 複數', a:'les', aNote:'ses voisins（複數）→ les；les 放在動詞前：Il les aime.' },
  { lesson:11, topic:'cod-pronouns', type:'fill',   q:'COD 否定句：「我不認識她」：Je ne _____ connais pas.', hint:'COD 放哪裡', a:'la', aNote:'否定：ne + COD + 動詞 + pas；Je ne la connais pas.（la 在動詞前，ne…pas 包住動詞）' },
  { lesson:11, topic:'cod-pronouns', type:'choose', q:'COD 和 COI 最大的差別？', hint:'介系詞', a:'COD = 直接受詞（無介系詞）；COI = 間接受詞（有 à）', aNote:'COD：J\'aime Sophie → Je la aime；COI：Je parle à Sophie → 後續課程學', opts:['COD = 直接受詞（無介系詞）；COI = 間接受詞（有 à）','COD 用在人；COI 用在物','COD 放動詞後；COI 放動詞前','兩個意思完全相同'] },
  { lesson:11, topic:'cod-pronouns', type:'trans',  q:'你認識 Marc 和 Lydia 嗎？— 我有點認識他們。', hint:'les / un peu', a:'Tu connais Marc et Lydia ? — Je les connais un peu.', aNote:'Marc et Lydia（複數）→ les；un peu = 有點、一些', askClaude:true },
  { lesson:11, topic:'cod-pronouns', type:'trans',  q:'我很愛這個街區，我覺得它很宜人。', hint:'le / trouver / agréable', a:'J\'adore ce quartier, je le trouve très agréable.', aNote:'ce quartier（陽性）→ le；trouver + adj. = 覺得…（le trouve agréable）', askClaude:true },

  // ── Les meubles ──────────────────────────────────────────────
  { lesson:11, topic:'vocab-housing', type:'fill',   q:'「沙發」：un _____', hint:'French borrow word', a:'canapé', aNote:'un canapé = 沙發；un fauteuil = 扶手椅（有扶手的單人椅）' },
  { lesson:11, topic:'vocab-housing', type:'choose', q:'canapé 和 fauteuil 的差別？', hint:'人數 / 形狀', a:'canapé = 多人沙發；fauteuil = 單人扶手椅', aNote:'canapé（複數人坐）vs fauteuil（單人有扶手椅）；法文客廳通常有 un canapé + deux fauteuils', opts:['canapé = 多人沙發；fauteuil = 單人扶手椅','兩個都是單人椅','canapé = 臥室用；fauteuil = 客廳用','fauteuil = 沙發；canapé = 椅子'] },
  { lesson:11, topic:'vocab-housing', type:'fill',   q:'「衣櫃」：une _____', hint:'garde-robe 的替代說法', a:'armoire', aNote:'une armoire = 衣櫃；un bureau = 書桌；une table basse = 茶几' },

  // ════════ 第12課：En forme ! ════════

  // ── 身體部位 ──────────────────────────────────────────────
  { lesson:12, topic:'body-health', type:'fill',   q:'背部：le _____', hint:'常說 j\'ai mal au...', a:'dos', aNote:'le dos = 背部；j\'ai mal au dos = 背痛（dos 是陽性 → au）' },
  { lesson:12, topic:'body-health', type:'fill',   q:'膝蓋：le _____', hint:'複數 les genoux', a:'genou', aNote:'le genou = 膝蓋；j\'ai mal au genou = 膝蓋痛' },
  { lesson:12, topic:'body-health', type:'fill',   q:'喉嚨：la _____', hint:'j\'ai mal à la...', a:'gorge', aNote:'la gorge = 喉嚨；j\'ai mal à la gorge = 喉嚨痛' },
  { lesson:12, topic:'body-health', type:'fill',   q:'眼睛（複數）：les _____', hint:'不規則複數', a:'yeux', aNote:'l\'œil → les yeux（不規則複數！）；j\'ai mal aux yeux' },
  { lesson:12, topic:'body-health', type:'fill',   q:'耳朵：l\'_____ (f.)', hint:'陰性名詞', a:'oreille', aNote:'l\'oreille（陰性）；j\'ai mal à l\'oreille = 耳朵痛' },
  { lesson:12, topic:'body-health', type:'choose', q:'「我頭痛」正確說法是？', hint:'tête 是陰性', a:'J\'ai mal à la tête.', aNote:'tête = la tête（陰性）→ à la tête；au = à + le，à la 不縮合', opts:['J\'ai mal à la tête.','J\'ai mal au tête.','Je suis mal à la tête.','J\'ai douleur à la tête.'] },
  { lesson:12, topic:'body-health', type:'choose', q:'「我背痛」正確說法是？', hint:'dos 是陽性', a:'J\'ai mal au dos.', aNote:'dos = le dos（陽性）→ au dos（à + le = au）', opts:['J\'ai mal au dos.','J\'ai mal à le dos.','J\'ai mal à la dos.','Je suis mal au dos.'] },
  { lesson:12, topic:'body-health', type:'fill',   q:'「我牙痛」：J\'ai mal _____ dents.', hint:'dents = les dents（複數）', a:'aux', aNote:'les dents（複數）→ à + les = aux；J\'ai mal aux dents.' },
  { lesson:12, topic:'body-health', type:'trans',  q:'我膝蓋痛。', hint:'genou = 陽性', a:'J\'ai mal au genou.', aNote:'genou（陽性）→ au genou', askClaude:true },
  { lesson:12, topic:'body-health', type:'trans',  q:'她喉嚨痛和頭痛。', hint:'gorge + tête', a:'Elle a mal à la gorge et à la tête.', aNote:'gorge（陰性）→ à la gorge；tête（陰性）→ à la tête', askClaude:true },

  // ── 健康詞彙 ──────────────────────────────────────────────
  { lesson:12, topic:'body-health', type:'choose', q:'「流感」法文是？', hint:'比 rhume 嚴重，會發燒', a:'la grippe', aNote:'la grippe = 流感（發燒）；un rhume = 普通感冒（流鼻水）；兩個不同！', opts:['la grippe','le rhume','la toux','la fièvre'] },
  { lesson:12, topic:'body-health', type:'choose', q:'un rhume 和 la grippe 的差別？', hint:'嚴重程度', a:'rhume = 輕微感冒；grippe = 流感（發燒）', aNote:'rhume 是輕微的，grippe 是嚴重的，grippe 通常伴隨 la fièvre（發燒）', opts:['rhume = 輕微感冒；grippe = 流感（發燒）','兩個都是流感的說法','rhume 是發燒；grippe 是咳嗽','沒有差別，可以互換'] },
  { lesson:12, topic:'body-health', type:'fill',   q:'咳嗽（動詞）：_____', hint:'la toux 是名詞', a:'tousser', aNote:'tousser = 咳嗽（動詞）；la toux = 咳嗽（名詞）；éternuer = 打噴嚏' },
  { lesson:12, topic:'body-health', type:'fill',   q:'「我發燒了」：J\'ai de la _____', hint:'體溫升高', a:'fièvre', aNote:'la fièvre = 發燒；J\'ai 39°C. 也可以直接說體溫' },
  { lesson:12, topic:'body-health', type:'choose', q:'去看醫生，醫生問你「Qu\'est-ce qui vous arrive ?」是什麼意思？', hint:'arrive 這裡不是「到達」', a:'你怎麼了？發生什麼事了？', aNote:'Qu\'est-ce qui vous arrive ? = What happened to you? 是醫生問診的標準問法', opts:['你怎麼了？發生什麼事了？','你什麼時候到的？','你住在哪裡？','你叫什麼名字？'] },
  { lesson:12, topic:'body-health', type:'fill',   q:'線上看診：la _____', hint:'télé + consultation', a:'téléconsultation', aNote:'téléconsultation = 線上看診；visite à domicile = 醫生到府看診（相反）' },
  { lesson:12, topic:'body-health', type:'choose', q:'「prendre rendez-vous」的意思是？', hint:'常見的日常動作', a:'預約（約時間）', aNote:'prendre rendez-vous = to make an appointment；Je vais prendre rendez-vous chez le médecin.', opts:['預約（約時間）','拿藥','去醫院','量體重'] },

  // ── 情緒表達 ──────────────────────────────────────────────
  { lesson:12, topic:'body-health', type:'choose', q:'「我感覺很好（身體狀態）」正確說法？', hint:'se sentir vs sentir', a:'Je me sens bien.', aNote:'se sentir = to feel；me sens = 反身動詞；sentir seul = 聞到；「je sens bien」= 我聞起來很香，意思完全不同！', opts:['Je me sens bien.','Je sens bien.','Je me son bien.','Je suis sens bien.'] },
  { lesson:12, topic:'body-health', type:'fill',   q:'「我精力充沛」：Je suis en pleine _____', hint:'aussi: être en forme', a:'forme', aNote:'être en (pleine) forme = 精力充沛；en forme 也可以表示「身材好」' },
  { lesson:12, topic:'body-health', type:'choose', q:'heureux 和 malheureux 的關係？', hint:'mal- 這個前綴', a:'malheureux = mal + heureux，是 heureux 的反義詞（不快樂）', aNote:'mal- 是否定前綴（如 malade = mal + ade）；heureux = 快樂；malheureux = 不快樂', opts:['malheureux = mal + heureux，是 heureux 的反義詞（不快樂）','兩個意思一樣，都是快樂','malheureux 表示生病','malheureux 是 heureux 的複數'] },
  { lesson:12, topic:'body-health', type:'trans',  q:'我很擔心，我感覺不太好。', hint:'inquiet + se sentir', a:'Je suis inquiet et je ne me sens pas bien.', aNote:'inquiet（男）/ inquiète（女）；se sentir：否定 = je ne me sens pas', askClaude:true },

  // ── Passé composé (2) — 不規則動詞 ──────────────────────────
  { lesson:12, topic:'passe-compose', type:'fill',   q:'lire → passé composé（j\'ai…）：J\'ai _____ des articles.', hint:'lire 是不規則動詞', a:'lu', aNote:'lire → lu（不規則）；J\'ai lu des articles = 我讀了一些文章' },
  { lesson:12, topic:'passe-compose', type:'fill',   q:'faire → passé composé：J\'ai _____ des recherches.', hint:'faire 是最常見的不規則', a:'fait', aNote:'faire → fait；J\'ai fait des recherches = 我做了一些調查' },
  { lesson:12, topic:'passe-compose', type:'fill',   q:'apprendre → passé composé：J\'ai _____ à respirer.', hint:'appris 還是apprendu？', a:'appris', aNote:'apprendre → appris（不規則）；J\'ai appris à respirer = 我學會了呼吸' },
  { lesson:12, topic:'passe-compose', type:'fill',   q:'pouvoir → passé composé：J\'ai _____ recommencer.', hint:'pouvoir 的過去分詞只有 2 個字母', a:'pu', aNote:'pouvoir → pu；J\'ai pu recommencer = 我能夠重新開始' },
  { lesson:12, topic:'passe-compose', type:'fill',   q:'vouloir → passé composé：Je n\'ai pas _____ prendre de médicaments.', hint:'vouloir 的過去分詞', a:'voulu', aNote:'vouloir → voulu；Je n\'ai pas voulu = 我不想要（過去）' },
  { lesson:12, topic:'passe-compose', type:'fill',   q:'avoir → passé composé：J\'ai _____ mal au dos l\'année dernière.', hint:'avoir 的 participe passé', a:'eu', aNote:'avoir → eu；J\'ai eu mal au dos = 我之前背痛過　⚠️ eu 讀音像「u」' },
  { lesson:12, topic:'passe-compose', type:'fill',   q:'être → passé composé：J\'ai _____ fatigué.', hint:'être 用 avoir 做助動詞！', a:'été', aNote:'être → été；⚠️ être 的 passé composé 用 avoir（不是 être）：J\'ai été = I was/have been' },
  { lesson:12, topic:'passe-compose', type:'choose', q:'下列哪個動詞 passé composé 用 être（不是 avoir）？', hint:'移動方向的動詞', a:'aller', aNote:'aller 用 être：je suis allé(e)；其他三個都用 avoir', opts:['aller','lire','faire','avoir'] },
  { lesson:12, topic:'passe-compose', type:'choose', q:'「我（女）去了醫生那裡」正確說法？', hint:'aller 用 être，女性要加 e', a:'Je suis allée chez le médecin.', aNote:'aller → être；女性：allée（加 e）；男性：allé（不加）', opts:['Je suis allée chez le médecin.','J\'ai allé chez le médecin.','Je suis allé chez le médecin.','J\'ai été chez le médecin.'] },
  { lesson:12, topic:'passe-compose', type:'choose', q:'為什麼 se lever 的 passé composé 用 être？', hint:'se 動詞的規則', a:'所有 se（反身）動詞都用 être', aNote:'規則：所有反身動詞（se + 動詞）都用 être；je me suis levé(e)、il s\'est levé', opts:['所有 se（反身）動詞都用 être','se lever 是移動動詞','se lever 是不規則動詞','沒有規則，要背'] },
  { lesson:12, topic:'passe-compose', type:'fill',   q:'「她（女）沒有睡好」：Elle n\'a pas _____ cette nuit.', hint:'dormir → IR 動詞', a:'dormi', aNote:'dormir（IR 動詞）→ dormi；用 avoir；Elle n\'a pas dormi = 她昨晚沒睡' },
  { lesson:12, topic:'passe-compose', type:'trans',  q:'我去了藥局，我買了一些維他命 C。', hint:'aller（être）+ acheter（avoir）', a:'Je suis allé(e) à la pharmacie, j\'ai acheté de la vitamine C.', aNote:'aller → je suis allé(e)（être）；acheter → j\'ai acheté（avoir，ER 動詞）', askClaude:true },
  { lesson:12, topic:'passe-compose', type:'trans',  q:'他去看了專科醫生，做了一些運動。', hint:'aller + faire', a:'Il est allé voir un médecin spécialiste. Il a fait des exercices.', aNote:'aller（être）：il est allé；faire（avoir）：il a fait', askClaude:true },

  // ── Pronom y ──────────────────────────────────────────────
  { lesson:12, topic:'pronom-y', type:'fill',   q:'「Je vais à l\'hôpital.」→ J\'_____ vais.', hint:'y 替換地點', a:'y', aNote:'y 替換「à + 地點」；放在動詞前：J\'y vais.' },
  { lesson:12, topic:'pronom-y', type:'fill',   q:'「Elle travaille à la pharmacie.」→ Elle _____ travaille.', hint:'y 放哪裡', a:'y', aNote:'y 放在動詞前；Elle y travaille.' },
  { lesson:12, topic:'pronom-y', type:'fill',   q:'y 的否定句：「我不去那裡」：Je n\'_____ vais pas.', hint:'y 在 ne…pas 裡面', a:'y', aNote:'否定：ne + y + 動詞 + pas；Je n\'y vais pas.（y 夾在 ne 和動詞之間）' },
  { lesson:12, topic:'pronom-y', type:'choose', q:'y 可以替換哪種詞語？', hint:'不是人，不是物品', a:'地點（à / dans / en + 地點）', aNote:'y = 地點代名詞；le/la/les = 人或物品；y remplace un complément de lieu', opts:['地點（à / dans / en + 地點）','人名','物品','時間'] },
  { lesson:12, topic:'pronom-y', type:'choose', q:'「Tu vas au travail à quelle heure ? — J\'_____ vais à 8h.」', hint:'au travail = 地點', a:'y', aNote:'au travail 是地點 → y；J\'y vais à 8h.（y 替換 au travail）', opts:['y','le','la','lui'] },
  { lesson:12, topic:'pronom-y', type:'trans',  q:'你在醫院工作嗎？— 是的，我在那裡工作五天。', hint:'y 替換 à l\'hôpital', a:'Tu travailles à l\'hôpital ? — Oui, j\'y travaille cinq jours par semaine.', aNote:'à l\'hôpital → y；j\'y travaille（y 在動詞前）', askClaude:true },

  // ── 第13課：Sport & bien-être・Il faut vs Devoir・Alimentation・Vacances ──
  // 健身房詞彙
  { lesson:13, topic:'vocab-sport-gym', type:'choose', q:'salle de sport 和 gymnase 的差別？', hint:'一個是健身，一個是體操', a:'salle de sport = 健身房；gymnase = 體操場', aNote:'gymnase 是做 gymnastique 的地方；一般說「去健身」用 salle de sport', opts:['salle de sport = 健身房；gymnase = 體操場','兩者意思完全相同','gymnase = 健身房；salle de sport = 體操場','salle de sport 是學校用，gymnase 是商業用'] },
  { lesson:13, topic:'vocab-sport-gym', type:'choose', q:'appareil 在健身房語境中是什麼意思？', hint:'cf. appareil photo', a:'健身器材（機器）', aNote:'appareil = 機器裝置；appareil photo = 相機；appareil de sport = 健身器材', opts:['健身器材（機器）','教練','更衣室','飲料機'] },
  { lesson:13, topic:'vocab-sport-gym', type:'choose', q:'allumer 的反義詞是？', hint:'開 vs 關', a:'éteindre', aNote:'allumer = 開（電器）；éteindre = 關（電器）；Il faut éteindre les appareils après l\'utilisation.', opts:['éteindre','fermer','sortir','partir'] },
  { lesson:13, topic:'vocab-sport-gym', type:'trans', q:'使用完器材後要清潔。', hint:'nettoyer / après l\'utilisation', a:'Il faut nettoyer les appareils après l\'utilisation.', aNote:'nettoyer = 清潔；après l\'utilisation = 使用後；il faut = 必須', askClaude:true },
  { lesson:13, topic:'vocab-sport-gym', type:'choose', q:'進三溫暖必須穿什麼？', hint:'maillot de…', a:'un maillot de bain', aNote:'maillot de bain = 泳衣；serviette de bain = 浴巾（放器材上用）', opts:['un maillot de bain','une serviette de bain','un manteau','des chaussures de sport'] },
  { lesson:13, topic:'vocab-sport-gym', type:'gender', q:'vestiaire（更衣室）→ 陰性 or 陽性？', hint:'le / la ?', a:'陽性 → le vestiaire', aNote:'le vestiaire（m）；la douche（f）；la serviette（f）；le sauna（m）' },

  // Il faut vs Devoir
  { lesson:13, topic:'ilfaut-devoir', type:'choose', q:'Il faut 和 il doit 最主要的差別是？', hint:'通則 vs 個人', a:'il faut = 通則建議（針對所有人）；il doit = 某人的具體義務', aNote:'Il faut faire du sport = 大家都應該；Il doit faire du sport = 他（因健康狀況）必須', opts:['il faut = 通則建議（針對所有人）；il doit = 某人的具體義務','兩者意思完全相同','il faut 比較強烈','il doit 是過去式'] },
  { lesson:13, topic:'ilfaut-devoir', type:'fill', q:'devoir 變位：vous _____ faire du sport.', hint:'devez / dois / doit', a:'devez', aNote:'devoir：je dois / tu dois / il doit / nous devons / vous devez / ils doivent' },
  { lesson:13, topic:'ilfaut-devoir', type:'fill', q:'devoir 變位：ils _____ manger équilibré.', hint:'doivent', a:'doivent', aNote:'ils/elles doivent（注意拼法，不是 doives）' },
  { lesson:13, topic:'ilfaut-devoir', type:'choose', q:'falloir（il faut）的過去式 passé composé 是？', hint:'il + avoir + participe passé', a:'il a fallu', aNote:'falloir → il a fallu（passé composé）；imparfait = il fallait；永遠只有 il，不說 j\'ai fallu', opts:['il a fallu','j\'ai fallu','il est fallu','ils ont fallu'] },
  { lesson:13, topic:'ilfaut-devoir', type:'choose', q:'「當時必須等待」用哪個時態和句型？', hint:'imparfait de falloir', a:'Il fallait attendre.', aNote:'imparfait de falloir = il fallait；passé composé = il a fallu', opts:['Il fallait attendre.','Il faut attendre.','Il a fallu attend.','Je fallais attendre.'] },
  { lesson:13, topic:'ilfaut-devoir', type:'trans', q:'他必須喝兩公升的水（個人義務）。', hint:'devoir / litre', a:'Il doit boire deux litres d\'eau par jour.|Il doit boire 2 litres d\'eau par jour.', aNote:'個人義務 → il doit；il faut 是通則（大家都要）', askClaude:true },

  // 給建議的三種方式
  { lesson:13, topic:'giving-advice', type:'choose', q:'用命令式給建議和用 il faut 給建議，語氣差別是？', hint:'直接 vs 通則', a:'命令式較直接（針對對方）；il faut 是通則（針對所有人）', aNote:'Fais du sport！= 你去做（直接）；Il faut faire du sport = 大家都要做（通則）', opts:['命令式較直接（針對對方）；il faut 是通則（針對所有人）','兩者完全一樣','il faut 比命令式更強烈','命令式是過去式'] },
  { lesson:13, topic:'giving-advice', type:'trans', q:'你可以騎腳踏車（建議）。（tu）', hint:'pouvoir + vélo', a:'Tu peux faire du vélo.', aNote:'給建議用 pouvoir：tu peux + infinitif；若強制才用 devoir', askClaude:true },
  { lesson:13, topic:'giving-advice', type:'choose', q:'以下哪句是「建議」而非「義務」？', hint:'pouvoir vs devoir', a:'Vous pouvez pratiquer le yoga.', aNote:'pouvoir = 可以（建議）；devoir = 必須（義務）；il faut 視語境可兩用', opts:['Vous pouvez pratiquer le yoga.','Vous devez pratiquer le yoga.','Il faut faire ça.','Tu dois manger sain.'] },

  // 運動詞彙
  { lesson:13, topic:'vocab-sport-activities', type:'choose', q:'la course à pied 是什麼運動？', hint:'pied = 腳', a:'跑步', aNote:'course = 賽跑/奔跑；course à pied = 用腳跑步 = jogging；course 也可指賽車（course automobile）', opts:['跑步','游泳','騎車','跳繩'] },
  { lesson:13, topic:'vocab-sport-activities', type:'choose', q:'la musculation 是什麼運動？', hint:'muscles', a:'重訓（肌力訓練）', aNote:'musculation 來自 muscle；salle de musculation = 重訓室', opts:['重訓（肌力訓練）','游泳','體操','柔道'] },
  { lesson:13, topic:'vocab-sport-activities', type:'trans', q:'多動對你的健康有好處。', hint:'bouger / santé', a:'Bougez plus pour votre santé.|Pour votre santé, bougez plus !', aNote:'bouger = 動；法國政府廣告語：Pour votre santé, bougez plus !', askClaude:true },

  // 飲食詞彙
  { lesson:13, topic:'vocab-alimentation', type:'choose', q:'alimentation équilibrée 和 alimentation saine 的關係是？', hint:'均衡 vs 健康', a:'意思相近，均衡飲食即為健康飲食', aNote:'équilibré = 均衡；saine = 健康；兩者在飲食語境中幾乎同義', opts:['意思相近，均衡飲食即為健康飲食','完全不同意思','équilibré 比 saine 更嚴格','saine 是形容人，équilibré 形容食物'] },
  { lesson:13, topic:'vocab-alimentation', type:'choose', q:'le saumon（鮭魚）在飲食上屬於哪一類？', hint:'課本說 attention…', a:'aliment gras（油脂類）', aNote:'Le saumon est un aliment gras. 雖然是健康脂肪（omega-3），但仍算 gras', opts:['aliment gras（油脂類）','aliment sucré（甜食類）','aliment salé（鹹食類）','aliment sans calorie'] },
  { lesson:13, topic:'vocab-alimentation', type:'fill', q:'「균衡飲食」法文：une alimentation _____.', hint:'以 é 結尾的形容詞', a:'équilibrée', aNote:'équilibré → 陰性 équilibrée（alimentation 是陰性）' },
  { lesson:13, topic:'vocab-alimentation', type:'choose', q:'以下哪個形容詞描述「甜食」？', hint:'sucre → ?', a:'sucré(e)', aNote:'sucre = 糖；sucré = 甜的；gras = 油膩的；salé = 鹹的', opts:['sucré(e)','gras(se)','salé(e)','équilibré(e)'] },

  // 假期詞彙
  { lesson:13, topic:'vocab-vacances', type:'choose', q:'hébergement 是什麼意思？', hint:'un endroit où dormir', a:'住宿（泛指所有可住的地方）', aNote:'hébergement = 住宿；logement = 住所；location = 租屋；chambre d\'hôte = 民宿', opts:['住宿（泛指所有可住的地方）','交通工具','行程表','機票'] },
  { lesson:13, topic:'vocab-vacances', type:'choose', q:'parasol 和 parapluie 的差別？', hint:'soleil vs pluie', a:'parasol = 遮陽傘；parapluie = 雨傘', aNote:'para- = 防；sol = 太陽（soleil）；pluie = 雨；課本插圖：忘了帶 parasol！', opts:['parasol = 遮陽傘；parapluie = 雨傘','parasol = 雨傘；parapluie = 遮陽傘','兩者相同','parasol 是室內用'] },
  { lesson:13, topic:'vocab-vacances', type:'choose', q:'chambre d\'hôte 和 hôtel 的差別？', hint:'hôte = 主人', a:'chambre d\'hôte 是住在主人家裡的房間（民宿）', aNote:'hôte = 主人；chambre d\'hôte = 主人提供的房間 = B&B/民宿；hôtel = 一般旅館', opts:['chambre d\'hôte 是住在主人家裡的房間（民宿）','完全相同','chambre d\'hôte 比較貴','hôtel 是給朋友住的'] },
  { lesson:13, topic:'vocab-vacances', type:'trans', q:'我們忘了帶陽傘！', hint:'oublier / parasol / passé composé', a:'On a oublié le parasol !', aNote:'✅ 這是 passé composé：on a oublié；parasol = 遮陽傘（≠ parapluie 雨傘）', askClaude:true },
  { lesson:13, topic:'vocab-vacances', type:'choose', q:'l\'échange de maison（換屋）的優點是？', hint:'gratuit + confortable', a:'免費且和租屋一樣舒適', aNote:'Les logements sont aussi confortables que des locations, mais ils sont gratuits.', opts:['免費且和租屋一樣舒適','比旅館貴但更自由','需要付費但比較安全','只適合短期（1-2天）'] },

  // ── 第13課補充（自動優化 2026-07-01）──────────────────────────────

  // social-invitations（邀約用語）
  { lesson:9, topic:'social-invitations', type:'fill', q:'On va au cinéma ce soir. Tu _____ ?（venir）', zh:'我們今晚要去看電影，你要來嗎？', hint:'tu + venir', a:'Tu viens|viens', aNote:'venir → tu viens（不規則，常見邀約句）' },
  { lesson:9, topic:'social-invitations', type:'trans', q:'你想來嗎？（口語）', hint:'Ça te dit ?', a:'Ça te dit ?', aNote:"ça te dit ? = 你感興趣嗎？最自然的邀約問句", askClaude:true },
  { lesson:9, topic:'social-invitations', type:'choose', q:'婉拒邀約最客氣的說法是？', hint:'désolé(e)', a:'Je suis désolé(e), je ne peux pas.', aNote:'désolé(e) 先表歉意，再說無法赴約，是最禮貌的拒絕方式', opts:["Je suis désolé(e), je ne peux pas.",'Non.','Je ne veux pas.','Je suis occupé.'] },
  { lesson:9, topic:'social-invitations', type:'choose', q:'接受邀約說「沒問題」最常用哪句？', hint:'不是 oui', a:'Avec plaisir !|D\'accord !|Pourquoi pas !', aNote:"Avec plaisir ! / D'accord ! / Pourquoi pas ! 三種都可以接受邀約", opts:["Avec plaisir !",'Oui, je sais.','C\'est vrai.','Je comprends.'] },
  { lesson:9, topic:'social-invitations', type:'trans', q:'我們去咖啡廳吧！（建議，使用 on）', hint:'On y va ?', a:'On va au café ?|On y va ?', aNote:'On va + 地點 或 On y va ? 都是口語建議句', askClaude:true },
  { lesson:9, topic:'social-invitations', type:'fill', q:'Tu _____ venir à la fête ? (pouvoir)', zh:'你能來派對嗎？', hint:'tu + pouvoir', a:'Tu peux venir à la fête ?|peux', aNote:'pouvoir → tu peux（邀約詢問是否能來）' },
  { lesson:9, topic:'social-invitations', type:'choose', q:'「週末你有空嗎？」的法文是？', hint:'libre / week-end', a:'Tu es libre ce week-end ?', aNote:'être libre = 有空；ce week-end = 這個週末', opts:['Tu es libre ce week-end ?','Tu as du temps libre ?','Tu veux le week-end ?','C\'est le week-end ?'] },
  { lesson:9, topic:'social-invitations', type:'trans', q:'要不要一起吃晚飯？（on）', hint:'On + dîner + ensemble', a:'On dîne ensemble ?', aNote:'On + présent 用疑問語調可以是邀約', askClaude:true },
  { lesson:9, topic:'social-invitations', type:'choose', q:'「à bientôt」表達的是？', hint:'prochaine fois', a:'下次見', aNote:'à bientôt = see you soon；à demain = 明天見；au revoir = 再見（較正式）', opts:['下次見','謝謝','對不起','怎麼了'] },

  // imperative-mood 補充（命令式）
  { lesson:6, topic:'imperative-mood', type:'fill', q:'_____ tes devoirs ! (faire, tu)', hint:'-ER 去 s；faire 不規則', a:'Fais tes devoirs !|Fais', aNote:'faire 命令式：Fais（tu）/ Faisons / Faites（vous）——完全不規則，不加 s' },
  { lesson:6, topic:'imperative-mood', type:'fill', q:'_____ à la maison ! (rester, vous)', hint:'vous 命令式 = 現在式去掉主詞', a:'Restez à la maison !|Restez', aNote:'rester → vous restez → Restez !（-ER 動詞 vous 形）' },
  { lesson:6, topic:'imperative-mood', type:'fill', q:'_____ du sport ! (faire, nous)', hint:'nous 命令式', a:'Faisons du sport !|Faisons', aNote:'faire → nous faisons → Faisons !（不規則 faire，nous 形照現在式）' },
  { lesson:6, topic:'imperative-mood', type:'choose', q:'avoir 的命令式 tu 形是？', hint:'完全不規則', a:'Aie', aNote:'avoir 命令式：Aie（tu）/ Ayons / Ayez（vous）——完全不規則', opts:['Aie','As','Ayé','Avez'] },
  { lesson:6, topic:'imperative-mood', type:'trans', q:'不要緊張！（對 tu）', hint:'ne…pas + stresser', a:'Ne te stresse pas !', aNote:'se stresser = 緊張（反身動詞）；命令式否定：Ne + te + stresse + pas', askClaude:true },
  { lesson:6, topic:'imperative-mood', type:'choose', q:'「Venez ici !」是命令誰？', hint:'ici = 這裡', a:'vous（多人或正式一人）', aNote:'Venez = venir 的 vous 命令式；tu 形是 Viens；nous 形是 Venons', opts:['vous（多人或正式一人）','tu（單數非正式）','nous（包含說話者）','on（非正式我們）'] },

  // giving-advice 補充（給建議）
  { lesson:13, topic:'giving-advice', type:'fill', q:'Je te _____ de faire du sport. (conseiller)', zh:'我建議你做運動。', hint:'conseiller → je te conseille', a:'Je te conseille de faire du sport.|conseille', aNote:'conseiller + de + infinitif：我建議你做運動' },
  { lesson:13, topic:'giving-advice', type:'trans', q:'你應該多睡覺。（devoir）', hint:'tu + devoir + dormir', a:'Tu devrais dormir plus.', aNote:'devrais = devoir 條件式（更委婉的建議，比 tu dois 溫和）', askClaude:true },
  { lesson:13, topic:'giving-advice', type:'fill', q:'Il _____ faire du sport tous les jours. (falloir)', zh:'每天都要做運動。（提出建議/規定）', hint:'falloir → il faut', a:'Il faut faire du sport tous les jours.|faut', aNote:'il faut + infinitif = 必須/需要（通則性建議）' },
  { lesson:13, topic:'giving-advice', type:'choose', q:'哪句建議語氣最強（接近命令）？', hint:'devoir vs pouvoir vs conseiller', a:'Tu dois manger des légumes.', aNote:'devoir = 必須（最強）；pouvoir = 可以（建議）；Je te conseille = 我建議（最柔和）', opts:['Tu dois manger des légumes.','Tu peux manger des légumes.','Je te conseille de manger des légumes.','Il faudrait manger des légumes.'] },

  // vocab-alimentation 補充（飲食詞彙）
  { lesson:13, topic:'vocab-alimentation', type:'choose', q:'「manger équilibré」是什麼意思？', hint:'équilibré = 均衡', a:'吃得均衡（各類食物都攝取）', aNote:'manger équilibré = 吃均衡飲食；≠ manger léger（吃清淡）≠ manger peu（少吃）', opts:['吃得均衡（各類食物都攝取）','只吃蔬菜','少量多餐','不吃油脂'] },
  { lesson:13, topic:'vocab-alimentation', type:'fill', q:'Il faut éviter les aliments _____. (gras)', hint:'複數陽性形容詞', a:'Il faut éviter les aliments gras.|gras', aNote:'gras（m sg）→ gras（m pl 不加 s，已以 -s 結尾）；陰性 grasse' },
  { lesson:13, topic:'vocab-alimentation', type:'trans', q:'你要多喝水。', hint:'boire / eau / devoir', a:'Tu dois boire plus d\'eau.', aNote:"boire = 喝（不規則）；de l'eau = 水（帶部分冠詞）", askClaude:true },
  { lesson:13, topic:'vocab-alimentation', type:'choose', q:'以下哪個是「蛋白質」類食物？', hint:'protéine', a:'le poulet（雞肉）', aNote:'poulet / viande / poisson / légumineuses 都是蛋白質來源；saumon 是 gras（脂肪類）', opts:['le poulet（雞肉）','le sucre','le beurre','les pâtes'] },

  // ═══ 第14課：比較級 ═══
  { lesson:14, topic:'comparaison', type:'fill', q:'Le camping est _____ cher que l\'hôtel.（露營比旅館便宜）', hint:'劣等比較', a:'moins', aNote:'moins + 形容詞 + que = 比較不…' },
  { lesson:14, topic:'comparaison', type:'fill', q:'La voiture est _____ confortable que le train.（汽車比火車更舒服）', hint:'優等比較', a:'plus', aNote:'plus + 形容詞 + que' },
  { lesson:14, topic:'comparaison', type:'fill', q:'Mon van est _____ pratique que le van de Léo.（一樣實用）', hint:'等同比較', a:'aussi', aNote:'aussi + 形容詞 + que = 和…一樣' },
  { lesson:14, topic:'comparaison', type:'fill', q:'J\'aime le café, mais le thé est _____.（更好）', hint:'bon 的比較級，不能用 plus', a:'meilleur', aNote:'bon → meilleur；❌ plus bon（跟英文不說 more good 一樣）' },
  { lesson:14, topic:'comparaison', type:'fill', q:'Ce film est _____ que le livre.（更糟）', hint:'mauvais 的比較級', a:'pire', aNote:'mauvais → pire；❌ plus mauvais' },
  { lesson:14, topic:'comparaison', type:'choose', q:'「這間旅館離市中心近很多」的「近很多」怎麼說？', hint:'程度修飾', a:'beaucoup plus proche', aNote:'beaucoup plus = 多很多；un peu plus = 多一點', opts:['beaucoup plus proche','très plus proche','beaucoup proche','plus beaucoup proche'] },
  { lesson:14, topic:'comparaison', type:'choose', q:'形容「舊旅館（物品）」用哪個字？', hint:'人和物用的字不同', a:'ancien', aNote:'物品用 neuf/ancien；人用 jeune/vieux', opts:['ancien','vieux','jeune','âgé'] },
  { lesson:14, topic:'comparaison', type:'trans', q:'我比我姊姊年輕。', hint:'jeune', a:'Je suis plus jeune que ma sœur.', aNote:'plus jeune（人用 jeune，不用 neuf）', askClaude:true },
  { lesson:14, topic:'comparaison', type:'trans', q:'腳踏車比飛機更環保。', hint:'écologique', a:'Le vélo est plus écologique que l\'avion.', aNote:'形容詞的比較級<b>夾在中間</b>：plus ＋ 形容詞 ＋ que。écologique 陰陽同形不用變。（第25課把這條擴充成「詞類決定寫法」：動詞放後面、名詞前面要加 de。）', askClaude:true },
  { lesson:14, topic:'comparaison', type:'fill', q:'Les vacances à la mer sont aussi _____ que les vacances à la montagne.（一樣宜人，注意配合）', hint:'agréable ＋ 複數配合', a:'agréables', aNote:'形容詞跟主詞 les vacances（陰性複數）配合 → agréables' },

  // ═══ 第14課：來源介系詞 de/du/des/d' ═══
  { lesson:14, topic:'preposition-country', type:'fill', q:'Je reviens _____ Danemark.（陽性國家）', hint:'de + le = ?', a:'du', aNote:'陽性國家用 du（= de + le）' },
  { lesson:14, topic:'preposition-country', type:'fill', q:'J\'arrive _____ Nouvelle-Zélande.（陰性國家）', hint:'陰性直接用', a:'de', aNote:'陰性國家：la 拿掉直接 de（不說 de la France）' },
  { lesson:14, topic:'preposition-country', type:'fill', q:'Nathan vient _____ États-Unis.（複數國家）', hint:'de + les = ?', a:'des', aNote:'des = de + les（縮合冠詞），跟複數 un/une/des 的 des 不同身分！' },
  { lesson:14, topic:'preposition-country', type:'fill', q:'Yvonne vient _____ Irlande.（母音開頭）', hint:'a e i o u 前', a:"d'", aNote:"de/du → d' devant 母音：d'Irlande、d'Irak、d'Amsterdam" },
  { lesson:14, topic:'preposition-country', type:'fill', q:'Je viens _____ Taïwan.', hint:'台灣的特殊規則', a:'de', aNote:'台灣不加冠詞，跟城市同規則（不說 le Taïwan）→ 直接 de' },
  { lesson:14, topic:'preposition-country', type:'fill', q:'Je reviens _____ Copenhague.（城市）', hint:'城市規則', a:'de', aNote:'城市一律 de（母音開頭才 d\'）' },
  { lesson:14, topic:'preposition-country', type:'choose', q:'Saïda et Franck reviennent ___ Maroc.', hint:'Maroc 陽性', a:'du', aNote:'le Maroc 陽性 → du', opts:['du','de','des',"d'"] },
  { lesson:14, topic:'preposition-country', type:'choose', q:'Michel vient ___ Pays-Bas.', hint:'Pays-Bas 複數', a:'des', aNote:'les Pays-Bas（荷蘭，複數）→ des', opts:['des','du','de',"d'"] },
  { lesson:14, topic:'preposition-country', type:'trans', q:'她從希臘來。', hint:'la Grèce 陰性', a:'Elle vient de Grèce.|Elle arrive de Grèce.', aNote:'陰性國家 la 拿掉 → de Grèce', askClaude:true },

  // ═══ 第14課：passé composé avec être（性數配合）═══
  { lesson:14, topic:'passe-compose', type:'fill', q:'Elle est _____ (arriver) à la plage.', hint:'être 助動詞＋陰性配合', a:'arrivée', aNote:'être 當助動詞 → 分詞跟主詞配合：elle → arrivée（+e）' },
  { lesson:14, topic:'passe-compose', type:'fill', q:'Elles sont _____ (partir) où cet été ?', hint:'全女性複數', a:'parties', aNote:'elles（全女性複數）→ parties（+es）' },
  { lesson:14, topic:'passe-compose', type:'fill', q:'Il est _____ (rentrer) de vacances hier.', hint:'陽性單數', a:'rentré', aNote:'il → rentré（不加 e）；rentrer de = 從…回來' },
  { lesson:14, topic:'passe-compose', type:'fill', q:'L\'année dernière, nous sommes _____ (aller) à Nice.（我們＝你和你太太）', hint:'一男一女的 nous', a:'allés', aNote:'混合性別 → 用陽性複數 allés（有一個男生就不加 e）' },
  { lesson:14, topic:'passe-compose', type:'fill', q:'Gustave Courbet est _____ (naître) en Franche-Comté.', hint:'naître 的分詞', a:'né', aNote:'naître → né（出生）；il est né = he was born' },
  { lesson:14, topic:'passe-compose', type:'fill', q:'Claude Monet est _____ (mourir) à Giverny.', hint:'mourir 的分詞', a:'mort', aNote:'mourir → mort（過世）；naître 和 mourir 都用 être' },
  { lesson:14, topic:'passe-compose', type:'choose', q:'哪一句的性數配合是「錯」的？', hint:'être 家族才要配合', a:'Elle est sorti hier soir.', aNote:'elle → sortie（要加 e）；其他三句都正確', opts:['Elle est sorti hier soir.','Ils sont sortis ensemble.','Elle est sortie hier soir.','Il est sorti ce matin.'] },
  { lesson:14, topic:'passe-compose', type:'fill', q:'Elle est arrivée au Kazakhstan _____ trois jours.（三天前）', hint:'「…之前」的說法', a:'il y a', aNote:'il y a + 時間 = …前（ago）；il y a trois jours = 三天前' },
  { lesson:14, topic:'passe-compose', type:'trans', q:'摩洛哥打敗了荷蘭。', hint:'battre 用 avoir', a:'Le Maroc a battu les Pays-Bas.', aNote:'battre → battu；一般動詞用 avoir，分詞不用配合', askClaude:true },

  // ═══ 第14課：訂房 ═══
  { lesson:14, topic:'reservation-hotel', type:'trans', q:'我想訂一間房，7月5日到7月11日，兩個大人一個小孩。', hint:'du... au... / pour', a:'Je voudrais réserver une chambre du 5 juillet au 11 juillet pour deux adultes et un enfant.|Je voudrais réserver une chambre du 5 au 11 juillet pour deux adultes et un enfant.', aNote:'課堂上自己組出來的句子！du X au Y = 從X日到Y日', askClaude:true },
  { lesson:14, topic:'reservation-hotel', type:'trans', q:'早餐有含嗎？', hint:'compris', a:'Est-ce que le petit déjeuner est compris ?|Le petit déjeuner est compris ?', aNote:'compris 是分詞當形容詞（= included），不是動詞變位', askClaude:true },
  { lesson:14, topic:'reservation-hotel', type:'trans', q:'可以帶寵物嗎？（寵物被接受嗎）', hint:'acceptés', a:'Est-ce que les animaux sont acceptés ?|Les animaux sont acceptés ?', aNote:'les animaux（複數）→ acceptés', askClaude:true },
  { lesson:14, topic:'reservation-hotel', type:'choose', q:'法文 email 的結尾敬語是？', hint:'老師每封信都寫', a:'Cordialement', aNote:'Cordialement = Best regards；正式 email 標配', opts:['Cordialement','Bonjour','Au revoir','Merci beaucoup'] },
  { lesson:14, topic:'reservation-hotel', type:'choose', q:'「青年旅館」的法文是？', hint:'jeunesse = 年輕', a:"l'auberge de jeunesse", aNote:'auberge = 小旅店；jeunesse = 青年', opts:["l'auberge de jeunesse","l'hôtel de jeunesse","la maison de jeunesse","le camping de jeunesse"] },
  { lesson:14, topic:'reservation-hotel', type:'choose', q:'「度假租屋（租一週的那種）」是？', hint:'⚠️ 假朋友', a:'la location de vacances', aNote:'location = 租（不是英文的地點 location！）', opts:['la location de vacances','le logement de vacances','la position de vacances','la place de vacances'] },

  // ═══ 第14課：度假詞彙＋quelque ═══
  { lesson:14, topic:'vocab-vacances', type:'choose', q:'On dort sous une tente dans cet hébergement.——這是哪種住宿？', hint:'sous = 在…下', a:'un camping', aNote:'tente（帳篷）→ camping', opts:['un camping','une ferme','une location','un hôtel'] },
  { lesson:14, topic:'vocab-vacances', type:'choose', q:'C\'est une maison avec des animaux à la campagne.——這是？', hint:'有動物的', a:'une ferme', aNote:'ferme = 農場（wwoofing 就在這裡工作）', opts:['une ferme','un camping','une auberge','un village'] },
  { lesson:14, topic:'vocab-vacances', type:'fill', q:'Vivez _____ heures extraordinaires !（度過「幾個」小時）', hint:'quelque 家族', a:'quelques', aNote:'quelques + 複數名詞 = 一些；quelqu\'un = 某人；quelque chose = 某事' },
  { lesson:14, topic:'vocab-vacances', type:'fill', q:'_____ (choisir, vous) la micro-aventure !（命令式）', hint:'-IR 動詞 vous 命令式', a:'Choisissez', aNote:'choisir：nous choisissons / vous choisissez（-ss- 出現在複數）' },
  { lesson:14, topic:'vocab-vacances', type:'choose', q:'「Taipei est très animé」的 animé 是什麼意思？', hint:'不是動畫！', a:'熱鬧的', aNote:'animé = 熱鬧、有活力（≠ 英文 anime）', opts:['熱鬧的','有動畫的','安靜的','古老的'] },
  { lesson:14, topic:'vocab-vacances', type:'choose', q:'bronzer 是什麼意思？', hint:'bronze 是一種顏色', a:'曬黑、做日光浴', aNote:'bronze 古銅色 → bronzer 變成古銅色 = 曬黑', opts:['曬黑、做日光浴','游泳','擦防曬','戴銅手環'] },
  { lesson:14, topic:'vocab-vacances', type:'fill', q:'Je ne connais _____ Monet.（我「只」認識莫內）', hint:'ne... que', a:'que', aNote:'ne... que = 只（老師課堂原句：Je ne connais que Monet）' },
  { lesson:14, topic:'vocab-vacances', type:'trans', q:'這是一個健行的完美地點。', hint:'endroit', a:'C\'est un endroit parfait pour la randonnée.', aNote:'un endroit = 地點；la randonnée = 健行', askClaude:true },

  // ═══ 第15課：imparfait 無人稱動詞 ═══
  { lesson:15, topic:'imparfait', type:'fill', q:'Aujourd\'hui il fait beau, hier il _____ (faire) mauvais.', zh:'今天天氣很好，昨天天氣不好。', hint:'imparfait', a:'faisait', aNote:'présent nous faisons → 去掉ons → fais- → il faisait' },
  { lesson:15, topic:'imparfait', type:'fill', q:'Aujourd\'hui il y a du soleil, hier il y _____ (avoir) des nuages.', zh:'今天有太陽，昨天有雲。', hint:'imparfait', a:'avait', aNote:'nous avons → av- → il y avait' },
  { lesson:15, topic:'imparfait', type:'fill', q:'C\'est très bien maintenant, hier _____ (être) aussi très intéressant.', hint:'être 不規則', a:'c\'était', aNote:'être 唯一不規則，字根是 ét-（不是從 nous 變位去找）' },
  { lesson:15, topic:'imparfait', type:'choose', q:'imparfait 主要用來做什麼？', hint:'', a:'描述過去的狀態/背景', aNote:'跟passé composé（完成的動作）不同，imparfait描述沒有明確起訖點的狀態', opts:['敘述一個已完成的動作','描述過去的狀態/背景','表達未來的計畫'] },
  { lesson:15, topic:'imparfait', type:'choose', q:'être 的 imparfait 字根是？', hint:'唯一例外', a:'ét-', aNote:'j\'étais, tu étais, il était……其他動詞都從présent的nous變位找字根', opts:['fais-','av-','ét-'] },
  { lesson:15, topic:'imparfait', type:'trans', q:'那時天氣不好。', hint:'il faisait', a:'Il faisait mauvais.', aNote:'三個無人稱動詞之一：天氣用 <b>faire</b>，il fait → <b>il faisait</b>。課本練習就是把今天翻成昨天：Aujourd\'hui, il fait beau. → Hier, il faisait mauvais.⚠️ il fait 專講天氣，整體感覺要用 c\'est／c\'était（Hier, c\'était calme.）。', askClaude:true },
  { lesson:15, topic:'imparfait', type:'trans', q:'那時有雲。', hint:'il y avait', a:'Il y avait des nuages.', aNote:'「有」的 imparfait：il y a → <b>il y avait</b>（字根從 nous avons 來，av-）。⚠️ 天氣有兩套系統別混：<b>il fait ＋ 形容詞</b>（beau／mauvais／chaud）、<b>il y a ＋ 部分冠詞</b>（du soleil／des nuages／du vent）。', askClaude:true },
  { lesson:15, topic:'imparfait', type:'choose', q:'「il fait froid」和「c\'était froid」哪個是形容天氣？', hint:'', a:'il fait froid', aNote:'il fait 專門形容天氣，c\'est是一般描述，兩者不能互換', opts:['il fait froid','c\'était froid','兩個都可以'] },

  // ═══ 第15課：passé composé être/avoir 複習 ═══
  { lesson:15, topic:'passe-compose', type:'choose', q:'Il ___ (naître) en 1990.', hint:'naître 用哪個助動詞', a:'est né', aNote:'naître 是19個être動詞之一', opts:['a né','est né'] },
  { lesson:15, topic:'passe-compose', type:'choose', q:'Elle ___ (voir) des animaux.', hint:'voir 不是移動動詞', a:'a vu', aNote:'voir 用 avoir——不是「做了什麼像旅行的事」就用être，要看動詞本身在不在être清單裡', opts:['a vu','est vue'] },
  { lesson:15, topic:'passe-compose', type:'choose', q:'Vous ___ (prendre) des photos.', hint:'prendre 不是移動動詞', a:'avez pris', aNote:'prendre 用 avoir', opts:['avez pris','êtes pris'] },

  // ═══ 第15課：COD代名詞 me/te/nous/vous（延續cod-pronouns topic）═══
  { lesson:15, topic:'cod-pronouns', type:'fill', q:'Le droit _____ (intéresser, moi) beaucoup.', zh:'法律讓我很感興趣。', hint:'COD me → m\'', a:'m\'intéresse', aNote:'me 在母音前縮寫成 m\'' },
  { lesson:15, topic:'cod-pronouns', type:'trans', q:'我懂你。', hint:'COD te', a:'Je te comprends.', aNote:'COD 代名詞 me／te／nous／vous 取代句中的「人」，位置固定在<b>動詞前面</b>——是 Je te comprends，不是 Je comprends te。⚠️ 母音或啞音 h 前要縮寫成 m\'／t\'（Le droit m\'intéresse.）。', askClaude:true },
  { lesson:15, topic:'cod-pronouns', type:'choose', q:'COD代名詞（me/te/nous/vous/le/la/les）放在動詞的前面還是後面？', hint:'', a:'前面', aNote:'跟英文相反：Tu m\'aides（你幫我），不是Tu aides moi', opts:['前面','後面'] },
  { lesson:15, topic:'cod-pronouns', type:'fill', q:'Tu _____ (aider, moi) à faire cet exercice ?', zh:'你可以幫我做這個練習嗎？', hint:'COD me', a:'m\'aides', aNote:'aider qqn 直接接受詞，me→m\'' },

  // ═══ 第15課：自然詞彙 ═══
  { lesson:15, topic:'vocab-nature', type:'trans', q:'田野', hint:'', a:'le champ', aNote:'<b>陽性：le champ</b>。屬於 à la campagne（鄉間）那一組：le champ／la ferme（農場）／la prairie（草原）。⚠️ 別跟 <b>le chemin</b>（小路）搞混，只差一個字母。', askClaude:true },
  { lesson:15, topic:'vocab-nature', type:'trans', q:'森林', hint:'', a:'la forêt', aNote:'<b>陰性：la forêt</b>。自然地點這組要連詞性一起背：le champ（m）／le chemin（m）／<b>la forêt（f）</b>／le lac（m）／la plage（f）／la rivière（f）。', askClaude:true },
  { lesson:15, topic:'vocab-nature', type:'trans', q:'潛水', hint:'faire de la...', a:'faire de la plongée', aNote:'活動用 <b>faire ＋ de la／du</b>，不是單獨一個動詞：faire de la plongée（plonger＝潛入）、faire du bateau（划船）、faire une randonnée à cheval（騎馬健行）。整塊記，不要每次重組。', askClaude:true },
  { lesson:15, topic:'vocab-nature', type:'choose', q:'「戲水、泡水」怎麼說？', hint:'反身動詞', a:'se baigner', aNote:'se baigner dans les Calanques', opts:['se baigner','bronzer','plonger','pique-niquer'] },

  // ═══ 第15課：大學詞彙 ═══
  { lesson:15, topic:'universite-vocab', type:'trans', q:'大學餐廳', hint:'口語簡稱resto U', a:'le restaurant universitaire|le resto U', aNote:'口語一律簡稱 <b>le resto U</b>（課文：Le resto U n\'est pas cher.）。⚠️ 跟第16課公司的 <b>le restaurant d\'entreprise</b> 是不同概念——後者只有大公司才有。', askClaude:true },
  { lesson:15, topic:'universite-vocab', type:'trans', q:'系辦、行政處', hint:'', a:'le secrétariat', aNote:'<b>陽性：le secrétariat</b>，指大學的系辦／行政處。課文用法：demandez au secrétariat de votre future université＝問你未來大學的系辦。', askClaude:true },
  { lesson:15, topic:'universite-vocab', type:'choose', q:'法國「licence」（學士）要讀幾年？', hint:'', a:'3年', aNote:'licence 3年、master 5年、doctorat 8年', opts:['2年','3年','4年'] },
  { lesson:15, topic:'universite-vocab', type:'trans', q:'旁聽一堂課', hint:'assister à... en amphi', a:'assister à un cours', aNote:'amphi = 階梯教室', askClaude:true },

  // ── 第16課：durée（pendant/longtemps/toujours/depuis） ──
  { lesson:16, topic:'duree', type:'choose', q:'哪個詞只問「時間長不長」，跟現在有沒有繼續無關？', hint:'', a:'longtemps', aNote:'longtemps純粹講長度；toujours才是專講現在還在做', opts:['longtemps','toujours','pendant'] },
  { lesson:16, topic:'duree', type:'choose', q:'toujours 表示「還在繼續」時，動詞要用什麼時態？', hint:'', a:'現在式', aNote:'Je suis toujours à l\'université（不能用passé composé）', opts:['現在式','passé composé','futur proche'] },
  { lesson:16, topic:'duree', type:'fill', q:"Pierre a étudié le droit _____ deux ans, mais maintenant il étudie le commerce.", hint:'明確期間+已結束', a:'pendant', aNote:'pendant + 名詞 = 明確算得出來的期間' },
  { lesson:16, topic:'duree', type:'fill', q:"Nous avons _____ le statut étudiant.", hint:'現在還保有', a:'toujours', aNote:'toujours + 現在式 = 還在繼續' },
  { lesson:16, topic:'duree', type:'choose', q:'「Je suis dentiste depuis douze ans.」意思是？', hint:'', a:'從12年前當牙醫到現在', aNote:'depuis = 從那時持續到現在', opts:['從12年前當牙醫到現在','12年前當過牙醫，現在不是了','12年後會當牙醫'] },
  { lesson:16, topic:'duree', type:'choose', q:'「il y a deux ans」是什麼意思？', hint:'', a:'兩年前（動作已結束）', aNote:'跟「à deux ans」（在兩歲時）、「depuis deux ans」（持續兩年到現在）不同', opts:['兩年前（動作已結束）','在兩歲的時候','持續兩年到現在'] },
  { lesson:16, topic:'duree', type:'trans', q:'我贊成遠端工作，因為很方便。', hint:'être pour + parce que', a:'Je suis pour le télétravail parce que c\'est pratique.', aNote:'表態句型：<b>être pour／être contre ＋ 名詞</b>（不是動詞原形），後面用 parce que 接理由。反面直接對照：Je suis contre le télétravail parce que je n\'aime pas travailler à la maison.', askClaude:true },
  { lesson:16, topic:'duree', type:'trans', q:'這是學業中的一個空檔。', hint:'pendant', a:'C\'est une pause pendant les études.', aNote:'<b>pendant ＋ 名詞</b>＝有限、算得出來的一段時間。⚠️ 三個 durée 分工完全不同：pendant（一段）／<b>longtemps</b>（很久，放動詞後：La césure dure longtemps ?）／<b>toujours</b>（過去開始、現在還在繼續）。', askClaude:true },
  { lesson:16, topic:'duree', type:'fill', q:"J'habite à Lyon _____ trois ans.", zh:'我住在里昂三年了（現在還住著）。', hint:'從過去持續到現在→動詞用現在式', a:'depuis', aNote:'depuis = 開口的括號，起點在過去、還連著現在' },
  { lesson:16, topic:'duree', type:'fill', q:"Je suis arrivée en France _____ deux ans.", zh:'我兩歲時抵達法國。', hint:'在幾歲時', a:'à', aNote:'à + 年紀 = 在幾歲時（不是depuis也不是il y a）' },
  { lesson:16, topic:'duree', type:'fill', q:"Ils ont déménagé _____ dix jours.", zh:'他們十天前搬家了。', hint:'ago，動作已結束', a:'il y a', aNote:'il y a + 時長 = 過去某個時間點，跟depuis方向相反' },
  { lesson:16, topic:'duree', type:'trans', q:'她在那家公司工作了三年（已經離職了）。', hint:'pendant，動作已結束', a:'Elle a travaillé pendant trois ans dans cette entreprise.', aNote:'pendant = 閉合的括號，一段已結束的期間', askClaude:true },
  { lesson:16, topic:'duree', type:'fill', q:'Ça dure _____ ?', zh:'這要花很久嗎？（只問長短，跟現在有沒有繼續無關）', hint:'', a:'longtemps', aNote:'longtemps 純粹講長度，不像toujours隱含「還在繼續」' },
  { lesson:16, topic:'duree', type:'trans', q:'他一直都很樂觀，即使失敗了也是。', hint:'toujours + 現在式', a:'Il est toujours optimiste, même après un échec.', aNote:'toujours 表示現在還在繼續的狀態，動詞用現在式', askClaude:true },
  { lesson:16, topic:'duree', type:'trans', q:'我十年前搬到台北。', hint:'il y a + 時長', a:"J'ai déménagé à Taipei il y a dix ans.", aNote:'il y a = 距今…前，動作已結束', askClaude:true },

  // ── 第16課：qui / que 關係代詞 ──
  { lesson:16, topic:'qui-que', type:'choose', q:'La France est un pays ___ change.', hint:'change的主詞是「pays」', a:'qui', aNote:'qui取代主詞，後面直接接動詞', opts:['qui','que'] },
  { lesson:16, topic:'qui-que', type:'choose', q:"C'est un métier ___ j'adore.", hint:'j\'adore的受詞是「métier」', a:'que', aNote:'que取代受詞（COD），後面接主詞+動詞', opts:['qui','que'] },
  { lesson:16, topic:'qui-que', type:'choose', q:"J'ai des collègues ___ sont sympathiques.", hint:'', a:'qui', aNote:'qui + 動詞（qui本身當主詞）', opts:['qui','que'] },
  { lesson:16, topic:'qui-que', type:'choose', q:"C'est une entreprise ___ nous connaissons bien.", hint:'', a:'que', aNote:'que + 主詞(nous) + 動詞', opts:['qui','que'] },
  { lesson:16, topic:'qui-que', type:'fill', q:"J'ai un métier _____ il adore.", hint:'que 在母音前要縮寫', a:"qu'", aNote:"que → qu' 在母音/啞音h前；qui 永遠不縮寫" },
  { lesson:16, topic:'qui-que', type:'choose', q:'qui 遇到母音開頭的字（如 il, elle）要不要縮寫？', hint:'', a:'不用，qui永遠不縮寫', aNote:'只有que會縮寫成qu\'，qui不會', opts:['不用，qui永遠不縮寫','要縮寫成qu\''] },
  { lesson:16, topic:'qui-que', type:'trans', q:'我的工作很有趣。（用qui合併成一句）', hint:'J\'ai un travail. Ce travail est intéressant.', a:"J'ai un travail qui est intéressant.", aNote:'<b>qui 取代主詞</b>，所以後面<b>直接接動詞</b>（qui est）。判斷方法：把句子拆回兩句，看被取代的字在第二句當主詞還是受詞。⚠️ qui 永遠不縮寫，就算後面接母音也一樣寫 qui。', askClaude:true },
  { lesson:16, topic:'qui-que', type:'trans', q:'我有很喜歡的同事。（用que合併成一句）', hint:'J\'ai des collègues. J\'aime beaucoup ces collègues.', a:"J'ai des collègues que j'aime beaucoup.", aNote:'<b>que 取代受詞（COD）</b>，所以後面要接<b>主詞＋動詞</b>（que j\'aime）——句子還需要它自己的主詞。⚠️ que 在母音或啞音 h 前要縮寫成 qu\'（un métier qu\'il adore）。', askClaude:true },

  // ── 第16課：l'intensité（un peu/assez/très/beaucoup/trop） ──
  { lesson:16, topic:'intensite', type:'choose', q:'très 修飾什麼？', hint:'', a:'形容詞', aNote:'très只能接形容詞，beaucoup只能接動詞', opts:['形容詞','動詞','名詞'] },
  { lesson:16, topic:'intensite', type:'choose', q:'beaucoup 修飾什麼？', hint:'', a:'動詞', aNote:'Je travaille beaucoup（不能說je travaille très）', opts:['形容詞','動詞','名詞'] },
  { lesson:16, topic:'intensite', type:'fill', q:'Je suis _____ content ! (+++)', hint:'content是形容詞', a:'très', aNote:'très + 形容詞' },
  { lesson:16, topic:'intensite', type:'fill', q:'Tu travailles _____ cette semaine ! (+++)', hint:'travailles是動詞', a:'beaucoup', aNote:'beaucoup + 動詞' },
  { lesson:16, topic:'intensite', type:'choose', q:'「trop」通常帶什麼語感？', hint:'', a:'負面（超過該有的量，暗示想改變）', aNote:'Je suis trop fatigué暗示累到想改變狀況；très fatigué只是描述程度', opts:['負面（超過該有的量，暗示想改變）','完全中性','只能用在好事上'] },

  // ── 第16課：職場詞彙 ──
  { lesson:16, topic:'metier-travail-vocab', type:'trans', q:'合約', hint:'', a:'le contrat', aNote:'<b>陽性：le contrat</b>，搭配動詞 <b>signer un contrat</b>（簽合約）。同組工作條件詞：les horaires（上班時段）／le salaire（薪水）／la pause-déjeuner（午休）。', askClaude:true },
  { lesson:16, topic:'metier-travail-vocab', type:'trans', q:'薪水', hint:'', a:'le salaire', aNote:'<b>陽性：le salaire</b>。⚠️ 法國通常只有<b>午休</b>這一個正式休息時段（la pause-déjeuner），咖啡、菸的小休息不寫進合約裡——這是台法職場的實際差異。', askClaude:true },
  { lesson:16, topic:'metier-travail-vocab', type:'trans', q:'遠端工作', hint:'faire du...', a:'le télétravail|faire du télétravail', aNote:'名詞是 <b>le télétravail</b>，講「做這件事」要說 <b>faire du télétravail</b>（也可以直接說 télétravailler，非正式但大家都懂）。', askClaude:true },
  { lesson:16, topic:'metier-travail-vocab', type:'choose', q:'法文的「mail」是什麼意思？', hint:'跟英文不一樣', a:'email', aNote:'法文mail/courriel=email；實體信件是le courrier，是個假朋友', opts:['email','實體信件','包裹'] },
  { lesson:16, topic:'metier-travail-vocab', type:'trans', q:'肉販', hint:'', a:'le boucher|la bouchère', aNote:'商店與商人成對記：la boucherie（肉店）→ <b>le boucher／la bouchère</b>（肉販）。⚠️ 去「店」用 <b>à la</b> boucherie，去「人」那裡用 <b>chez</b> le boucher。', askClaude:true },

  // ── 第 17 課：A2 passé composé 完整版（助動詞二分/不規則分詞/il y a vs dans/depuis vs pendant）──
  { lesson:17, topic:'passe-compose', type:'fill', q:"J'ai _____ un message. (recevoir)", zh:'我收到一則訊息。', hint:'c+u 要小尾巴', a:'reçu', aNote:'recevoir → reçu（ç 只在 u 前）' },
  { lesson:17, topic:'passe-compose', type:'fill', q:"J'ai _____ mon diplôme l'année dernière. (obtenir)", zh:'我去年拿到文憑。', hint:'tenir → tenu', a:'obtenu', aNote:'obtenir → obtenu（跟 tenir/venir 同家族）' },
  { lesson:17, topic:'passe-compose', type:'fill', q:'Hier, Mbappé a _____ un but. (mettre)', zh:'昨天姆巴佩進了一球。', hint:'雙t不見了', a:'mis', aNote:'mettre → mis；mettre un but＝進球' },
  { lesson:17, topic:'passe-compose', type:'fill', q:"Tu as _____ le roman de Gaël Faye ? (lire)", zh:'你讀了 Gaël Faye 的小說嗎？', hint:'一個音節', a:'lu', aNote:'lire → lu' },
  { lesson:17, topic:'passe-compose', type:'fill', q:"J'ai _____ à Taïwan pendant cinq ans. (vivre)", zh:'我在台灣住過五年（已結束）。', hint:'vécu', a:'vécu', aNote:'vivre → vécu；pendant＝閉合的一段' },
  { lesson:17, topic:'passe-compose', type:'fill', q:'Elle est _____ à Paris en 1900. (naître)', zh:'她1900年生於巴黎。', hint:'être家族，主詞陰性', a:'née', aNote:'naître → né；配 être 要跟主詞配合 +e' },
  { lesson:17, topic:'passe-compose', type:'fill', q:"J'ai _____ mon magasin il y a deux ans. (ouvrir)", zh:'我兩年前開了我的店。', hint:'-ert 結尾', a:'ouvert', aNote:'ouvrir → ouvert；c\'est ouvert（開著）是形容詞不是PC' },
  { lesson:17, topic:'passe-compose', type:'choose', q:'「Ils _____ mariés il y a deux ans.」空格填什麼？', hint:'反身動詞的助動詞', a:'se sont', aNote:'反身動詞一律配 être：ils se sont mariés（分詞+s）', opts:['se sont','s\'ont','sont','ont'] },
  { lesson:17, topic:'passe-compose', type:'choose', q:'下列哪個動詞的 passé composé 用 avoir？', hint:'17個être動詞之外', a:'vivre', aNote:'vivre→j\'ai vécu 用avoir；venir/mourir/rester 都在17個être動詞清單裡', opts:['vivre','venir','mourir','rester'] },
  { lesson:17, topic:'passe-compose', type:'fill', q:"Tu as reçu mon message ? — Non, je ne _____ ai pas reçu.", zh:'收到我的訊息了嗎？——沒有，我沒收到它。', hint:'COD代名詞縮寫', a:"l'", aNote:'COD 放助動詞前：je ne l\'ai pas reçu（ne + l\' + ai + pas）' },
  { lesson:17, topic:'duree', type:'choose', q:'「我一年後要去台灣（還沒發生）」用哪個？', hint:'跟英文 in 同邏輯', a:'dans un an', aNote:'dans＝未來的…之後；il y a＝過去的…之前', opts:['dans un an','il y a un an','depuis un an','pendant un an'] },
  { lesson:17, topic:'duree', type:'fill', q:'Ma fille est née _____ un an.', zh:'我女兒一年前出生。', hint:'ago', a:'il y a', aNote:'il y a + 時長＝距今…前（動作已結束）' },
  { lesson:17, topic:'duree', type:'choose', q:'「Je _____ à Taïwan depuis cinq ans.」空格填什麼？', hint:'depuis 的時態鐵律', a:'vis', aNote:'depuis＝持續到現在→配現在式：je vis；已結束的五年才說 j\'ai vécu pendant cinq ans', opts:['vis','ai vécu','vivais','vivre'] },
  { lesson:17, topic:'passe-compose', type:'trans', q:'我笑死了。（口語）', hint:'MDR 的全寫', a:'Je suis mort de rire.|Je suis morte de rire.', aNote:'mort de + 名詞＝…死了；訊息縮寫 MDR', askClaude:true },

  // ── 課文《Une histoire d'amour comme au cinéma》改編題（真實課文句子，avoir/être/反身/否定四種情境）──
  { lesson:17, topic:'passe-compose', type:'fill', q:'Leïla Bekhti _____ (raconter) sa rencontre avec son mari.', zh:'Leïla Bekhti 講述了她與丈夫相遇的故事。', hint:'-er動詞規則分詞', a:'a raconté', aNote:'raconter → raconté（avoir，不配合）' },
  { lesson:17, topic:'passe-compose', type:'fill', q:'Les deux acteurs _____ (faire) connaissance en 2008.', zh:'這兩位演員在2008年認識彼此。', hint:'faire → fait', a:'ont fait', aNote:'faire connaissance＝結識（固定搭配）' },
  { lesson:17, topic:'passe-compose', type:'fill', q:'Immédiatement, il y _____ (avoir) une connexion entre eux.', zh:'兩人立刻產生了連結。', hint:'avoir → eu', a:'a eu', aNote:'il y a（有）的passé composé：il y a eu' },
  { lesson:17, topic:'passe-compose', type:'fill', q:'Ils _____ (choisir) de rester professionnels.', zh:'他們選擇保持專業。', hint:'-ir規則動詞', a:'ont choisi', aNote:'choisir → choisi（avoir）' },
  { lesson:17, topic:'passe-compose', type:'choose', q:'「Ils _____ mariés deux ans après leur rencontre.」空格填什麼？', hint:'反身動詞助動詞', a:'se sont', aNote:'反身動詞一律配être：ils se sont mariés（分詞+s跟主詞配合）', opts:['se sont','ont','se ont','sont'] },
  { lesson:17, topic:'passe-compose', type:'fill', q:'Encore une fois, ils _____ (prendre) leur temps.', zh:'他們又再一次慢慢來。', hint:'prendre → pris', a:'ont pris', aNote:'prendre son temps＝慢慢來（固定搭配）' },
  { lesson:17, topic:'passe-compose', type:'fill', q:'Leur premier enfant Souleymane _____ (naître) en 2017.', zh:'他們的第一個孩子2017年出生。', hint:'être家族，陽性主詞', a:'est né', aNote:'naître配être；enfant是陽性，né不加e' },
  { lesson:17, topic:'passe-compose', type:'fill', q:'Ils _____ (accueillir) une petite fille en 2020.', zh:'他們在2020年迎來一個女兒。', hint:'accueillir → accueilli', a:'ont accueilli', aNote:'accueillir un enfant比avoir un enfant更文學/正式' },
  { lesson:17, topic:'passe-compose', type:'fill', q:'Ils _____ (ne pas vouloir) dire son prénom aux médias.', zh:'他們不願意向媒體透露孩子的名字。', hint:'否定PC：ne+助動詞+pas+分詞', a:"n'ont pas voulu", aNote:'vouloir → voulu；否定包住助動詞ont' },
  { lesson:17, topic:'passe-compose', type:'fill', q:'Tahar Rahim _____ (déclarer) dans une interview avec le magazine Elle.', zh:'Tahar Rahim 在《Elle》雜誌的專訪中表示。', hint:'-er動詞規則分詞', a:'a déclaré', aNote:'déclarer → déclaré（avoir）' },

  // ── 第18課：Parcours de vie 詞彙＋否定句完整版 ──
  { lesson:18, topic:'vocab-parcours-vie', type:'trans', q:'我五年前搬家了，現在我安頓下來了。', hint:'déménager / s\'installer', a:"J'ai déménagé il y a cinq ans, maintenant je suis installé(e).", aNote:'déménager接著才s\'installer，兩個動作有先後', askClaude:true },
  { lesson:18, topic:'vocab-parcours-vie', type:'choose', q:'「我對他一見鍾情」怎麼說？', hint:'coup de foudre 還是 tomber amoureux', a:"J'ai eu un coup de foudre pour lui.", aNote:'coup de foudre＝瞬間；tomber amoureux可以是慢慢發生', opts:["J'ai eu un coup de foudre pour lui.","Je suis tombé amoureux pendant longtemps.","J'ai un conjoint pour lui.","Je connais une connaissance de lui."] },
  { lesson:18, topic:'vocab-parcours-vie', type:'fill', q:'Elle cherche du travail, mais elle ne l\'a pas encore _____ .', zh:'她在找工作，但還沒找到。', hint:'find（已完成）', a:'trouvé', aNote:'chercher＝找（過程）；trouver＝找到（結果）' },
  { lesson:18, topic:'vocab-parcours-vie', type:'choose', q:'寫書的人叫作？', hint:'跟寫歌/寫劇本的人分開', a:'un écrivain', aNote:'écrivain寫書、compositeur寫歌、scénariste寫電影劇本', opts:['un écrivain','un compositeur','un scénariste','un interprète'] },
  { lesson:18, topic:'vocab-parcours-vie', type:'fill', q:'Elle est chanteuse, il est _____ . (musicien的陰性形不用，這裡要chanteur的陽性搭檔)', zh:'她是女歌手，他是男歌手。', hint:'chanteur的陰性是chanteuse（例外）', a:'chanteur', aNote:'chanteur→chanteuse是-eur/-euse例外，不是一般的-teur/-trice' },
  { lesson:18, topic:'vocab-parcours-vie', type:'trans', q:'她離婚了，現在單身。', hint:'divorcer / célibataire', a:'Elle a divorcé, maintenant elle est célibataire.', aNote:'divorcer專指已婚者；沒結婚分手要用se séparer', askClaude:true },
  { lesson:18, topic:'likes-hobbies-sports', type:'choose', q:'「這完全不是我的菜」法文怎麼說最道地？', hint:'比 je n\'aime pas 更強烈的口語說法', a:"Ce n'est pas du tout mon truc.", aNote:'mon truc是mon chose的口語替代；ce n\'est pas du tout＝完全不是', opts:["Ce n'est pas du tout mon truc.","J'aime bien ça beaucoup.","C'est ma passion complètement.","Je suis fan de ça pas."] },
  { lesson:18, topic:'likes-hobbies-sports', type:'fill', q:"J'aime _____ sortir. (比 j'aime 弱一點的說法)", zh:'我還蠻喜歡出門的。', hint:'aime + 一個字＝比較保留', a:'bien', aNote:'j\'aime bien比j\'aime弱，不是「很喜歡」的意思，這是常見誤會' },
  { lesson:18, topic:'negation', type:'choose', q:'「Personne」當句子的主詞時，位置放在哪裡？', hint:'跟一般主詞規則一樣', a:'動詞前面（跟ne一起）', aNote:'Personne n\'est là.——當主詞時放最前面；當受詞（COD）才放動詞/分詞後面', opts:['動詞前面（跟ne一起）','動詞後面','句尾','分詞後面'] },
  { lesson:18, topic:'negation', type:'fill', q:"Je n'ai rencontré _____ à la fête. (nobody, PC)", zh:'我在派對上誰都沒遇到。', hint:'personne在PC裡的位置是例外', a:'personne', aNote:'personne當COD時放在分詞後面（Je n\'ai rencontré personne），不像pas/rien夾在中間' },
  { lesson:18, topic:'negation', type:'choose', q:'「Il n'+"'"+'a rien mangé.」中，rien放在哪兩個字中間？', hint:'跟pas同一個位置規則', a:'助動詞和過去分詞之間', aNote:'pas/plus/rien/jamais在PC裡都夾在助動詞和分詞中間；只有personne是例外放分詞後', opts:['助動詞和過去分詞之間','分詞和受詞之間','主詞和助動詞之間','句尾'] },
  { lesson:18, topic:'negation', type:'fill', q:'Il a encore gagné une compétition. → Il n\'a _____ gagné de compétition.', zh:'他又贏了一場比賽。→他沒有再贏得比賽了。', hint:'狀態改變的否定：encore→?', a:'plus', aNote:'encore（再次發生）↔ ne...plus（不再發生），是「狀態改變」這組的否定' },
  { lesson:18, topic:'negation', type:'fill', q:'Nous avons déjà vu ce film. → Nous n\'avons _____ vu ce film.', zh:'我們已經看過這部電影。→我們從沒看過這部電影。', hint:'時間頻率的否定：déjà→?', a:'jamais', aNote:'déjà（已經）↔ ne...jamais（從未），時間頻率這組的否定' },
  { lesson:18, topic:'negation', type:'trans', q:'她從沒做過攀岩。', hint:'ne...jamais + PC', a:"Elle n'a jamais fait de l'escalade.", aNote:'jamais夾在助動詞a和分詞fait中間', askClaude:true },
  { lesson:18, topic:'negation', type:'choose', q:'否定詞 "plus"（不再）跟肯定詞 "plus"（更多）唸法差在哪？', hint:'發音警報：s 的有無', a:'否定s不發音，肯定s要發音', aNote:'ne...plus的s是靜音的；plus de、moins/plus比較級的plus要發s音——同拼字兩種意思兩種發音', opts:['否定s不發音，肯定s要發音','否定s要發音，肯定s不發音','兩者都發音','兩者都不發音'] },
  { lesson:18, topic:'negation', type:'trans', q:'他們沒有邀請任何人來婚禮。', hint:'personne當COD', a:"Ils n'ont invité personne à leur mariage.", aNote:'invité tout le monde → invité personne，personne放分詞後', askClaude:true },

  // ── 第19課：Les loisirs詞彙＋indicateurs de temps複習＋passé composé/négation總複習 ──
  { lesson:19, topic:'vocab-loisirs', type:'choose', q:'「一項水上站立划槳運動」怎麼說？', hint:'不要只講一半', a:'le stand-up paddle', aNote:'le paddle單獨講是球拍運動，水上活動一定要講全stand-up paddle', opts:['le stand-up paddle','le paddle','le canoë','la randonnée'] },
  { lesson:19, topic:'vocab-loisirs', type:'fill', q:"Je suis _____ de football, je regarde tous les matchs. (熱衷、很有研究)", zh:'我對足球很有研究，每場比賽都看。', hint:'être ___ de + 名詞', a:'amateur', aNote:'être amateur de + 名詞＝真心熱衷且懂很多，不是「業餘」的意思' },
  { lesson:19, topic:'vocab-loisirs', type:'choose', q:'「visiter」後面可以接哪個？', hint:'一定接地方', a:'un musée', aNote:'visiter接地點（un musée/une exposition）；看電影/表演要用voir', opts:['un musée','un film','un spectacle','une série'] },
  { lesson:19, topic:'vocab-loisirs', type:'fill', q:'Nous allons _____ une pièce de théâtre ce soir. (看，不是visiter)', zh:'我們今晚要去看一齣戲。', hint:'voir', a:'voir', aNote:'表演/戲劇/電影用voir，不用visiter' },
  { lesson:19, topic:'vocab-loisirs', type:'trans', q:'我週末喜歡做園藝跟畫畫。', hint:'jardiner / peindre', a:'Le week-end, j\'aime jardiner et peindre.', aNote:'aimer 後面接<b>動詞原形</b>。這兩個活動各有兩種說法：jardiner ＝ faire du jardinage、peindre ＝ faire un tableau／une peinture。', askClaude:true },
  { lesson:19, topic:'duree', type:'choose', q:'「Mon frère est aux Francofolies _____ mardi.」（從週二一直到現在還在）', hint:'還在繼續', a:'depuis', aNote:'depuis＝持續到現在，配現在式être', opts:['depuis','il y a','pendant','dans'] },
  { lesson:19, topic:'duree', type:'choose', q:'「Hier, nous avons fait du canoë _____ quatre heures.」（一段明確期間，已結束）', hint:'', a:'pendant', aNote:'pendant + 時長＝明確的一段期間', opts:['pendant','il y a','depuis','à'] },
  { lesson:19, topic:'duree', type:'fill', q:"J'ai déjà fait cette randonnée _____ deux ans. (兩年前做過，已結束)", zh:'我兩年前做過這趟健行了。', hint:'ago', a:'il y a', aNote:'il y a + 時長＝過去某個時間點，動作已結束' },
  { lesson:19, topic:'passe-compose', type:'fill', q:'Mon cousin _____ (faire) du hip-hop hier.', zh:'我表弟昨天跳了街舞。', hint:'faire → fait（avoir）', a:'a fait', aNote:'faire恆用avoir，分詞fait不隨主詞變化' },
  { lesson:19, topic:'passe-compose', type:'fill', q:'Les enfants _____ (jouer) aux jeux vidéo hier soir.', zh:'孩子們昨晚打了電動。', hint:'jouer → joué（avoir）', a:'ont joué', aNote:'jouer是規則-er動詞，avoir+joué' },
  { lesson:19, topic:'passe-compose', type:'fill', q:'Marie _____ (naître) au Sénégal.', zh:'瑪麗在塞內加爾出生。', hint:'être家族，陰性主詞', a:'est née', aNote:'naître配être，Marie是陰性要加e：née' },
  { lesson:19, topic:'passe-compose', type:'choose', q:'「Nous _____ à l\'accrobranche.」（我們去了樹頂繩索探險）空格填什麼？', hint:'aller配être', a:'sommes allé(e)s', aNote:'aller配être，nous分詞要加s（陰性再加e）', opts:['sommes allé(e)s','avons allé','sommes aller','avons été'] },
  { lesson:19, topic:'passe-compose', type:'fill', q:'Julie et Simon _____ (se marier) en 2020.', zh:'茱莉和西蒙在2020年結婚了。', hint:'反身動詞恆配être', a:'se sont mariés', aNote:'反身動詞一律être，分詞+s跟主詞（複數）配合' },
  { lesson:19, topic:'negation', type:'trans', q:'我的小孩不再踢足球了。（重組：plus/foot/mes/jouent/ne/enfants/au）', hint:'ne...plus', a:'Mes enfants ne jouent plus au foot.', aNote:'ne...plus夾住變位動詞jouent', askClaude:true },
  { lesson:19, topic:'negation', type:'trans', q:'博物館裡沒有人。（重組：dans/le/il/personne/n\'/a/y/musée）', hint:'il n\'y a personne', a:"Il n'y a personne dans le musée.", aNote:'personne當受詞放動詞後', askClaude:true },
  { lesson:19, topic:'negation', type:'trans', q:'這個週末我們什麼都沒做。（重組：week-end/nous/rien/n\'/ce/avons/fait）', hint:'ne...rien + PC', a:"Nous n'avons rien fait ce week-end.", aNote:'rien夾在avons和fait中間', askClaude:true },
  { lesson:19, topic:'negation', type:'trans', q:'我從沒去過馬戲團。（重組：suis/allé/jamais/cirque/au/je/ne）', hint:'ne...jamais + PC', a:"Je ne suis jamais allé au cirque.", aNote:'aller配être，jamais夾在suis和allé中間', askClaude:true },
  { lesson:19, topic:'adjective-position', type:'choose', q:'「我為了累積新經驗」空格該填哪個？「pour faire _____ expériences nouvelles」', hint:'des還是de？形容詞在後', a:'des', aNote:'expériences nouvelles（形容詞在後）維持des；但de nouvelles expériences（形容詞在前）des要縮成de', opts:['des','de',"d'",'les'] },
  { lesson:19, topic:'adjective-position', type:'fill', q:"J'ai décidé de faire _____ nouvelles expériences. (形容詞在前)", zh:'我決定要累積新的經驗。', hint:'形容詞放名詞前，des要縮', a:'de', aNote:'de nouvelles expériences：nouvelles放在expériences前面，des→de' },
  { lesson:19, topic:'social-invitations', type:'choose', q:'邀約被拒後，對方要說「那就這樣說定了」，最自然的說法？', hint:'口語，字面「它走」', a:'Ça marche.', aNote:'ça marche＝成交/說定了，口語常用', opts:['Ça marche.','Ça fonctionne.','C\'est vrai.','Ça y est.'] },
  { lesson:19, topic:'social-invitations', type:'trans', q:'抱歉，但我不行，我有一個工作會議。', hint:'Je m\'excuse / rendez-vous de travail', a:"Je m'excuse, mais je ne peux pas, j'ai un rendez-vous de travail.", aNote:'老師示範的婉拒公式：<b>Je m\'excuse, mais je ne peux pas</b> ＋ 理由。接受則是 Ça marche !／Ça me va !／Avec plaisir !。（Ça marche 字面是「它走」，＝說定了。）', askClaude:true },

  // ═══ 第20課：Je me souviens（imparfait 完整變位 ＋ 回憶詞彙）═══
  { lesson:20, topic:'imparfait', type:'fill', q:'imparfait 的字根要從哪個形式去找？présent 的 _____ 形去掉 -ons。', zh:'（規則題）', hint:'不是原形', a:'nous', aNote:'nous finissons → finiss- → je finissais；砍原形會得到錯的字根（fini- ❌）' },
  { lesson:20, topic:'imparfait', type:'fill', q:'Quand j\'étais petit, je _____ (finir) toujours mes devoirs avant le dîner.', zh:'我小時候總是在晚餐前寫完功課。', hint:'nous finissons → ?', a:'finissais', aNote:'nous finissons → finiss- → je finissais（不是 finais）' },
  { lesson:20, topic:'imparfait', type:'fill', q:'À cette époque, j\'_____ (écrire) tous les jours.', zh:'那時候我每天寫東西。', hint:'nous écrivons → ?', a:'écrivais', aNote:'nous écrivons → écriv- → j\'écrivais；字根有 v 沒有 r' },
  { lesson:20, topic:'imparfait', type:'fill', q:'Chaque semaine, nous _____ (étudier) ensemble.', zh:'我們每週一起讀書。', hint:'⚠️ 雙 i', a:'étudiions', aNote:'字根 étudi- ＋ 字尾 -ions ＝ étudiions，兩個 i 都要寫（présent 是 nous étudions）' },
  { lesson:20, topic:'imparfait', type:'fill', q:'Avant, elle _____ (prendre) des photos de tout.', zh:'以前她什麼都拍照。', hint:'nous prenons → ?', a:'prenait', aNote:'nous prenons → pren- → elle prenait' },

  // ═══ 第21課：Le souvenir（les pronoms y et en ＋ 五感詞彙）═══
  { lesson:21, topic:'pronoms-y-en', type:'choose', q:'要取代「從那個地方（回來）」，用 y 還是 en？', hint:'從＝de', a:'en', aNote:'原句介係詞是 de/du/de la/des → 一律用 en。y 是「在／去那裡」（à, sur, sous, dans）', opts:['y','en'] },
  { lesson:21, topic:'pronoms-y-en', type:'fill', q:'Le climat est agréable sur cette île ? — Oui, il _____ est très agréable.', zh:'這島上氣候好嗎？——對，那裡氣候很好。', hint:'sur cette île → ?', a:'y', aNote:'sur ＋ 地點 → y；位置在主詞和動詞之間（il y est）' },
  { lesson:21, topic:'pronoms-y-en', type:'fill', q:'Tu reviens de la plage ? — Oui, j\'_____ reviens à l\'instant.', zh:'你從海灘回來？——對，我剛從那裡回來。', hint:'de la plage → ?', a:'en', aNote:'de ＋ 地點 → en；à l\'instant＝剛剛' },
  { lesson:21, topic:'pronoms-y-en', type:'fill', q:'Il est parti du chalet à quelle heure ? — Il _____ est parti à 6 h.', zh:'他幾點從木屋離開？——他6點從那裡離開。', hint:'du chalet → ?', a:'en', aNote:'du＝de+le → en；⚠️ passé composé 裡 en 放在助動詞 est 前面' },
  { lesson:21, topic:'pronoms-y-en', type:'fill', q:'Mon sac est dans la roulotte ? — Non, il n\'_____ est pas !', zh:'我的包在篷車裡嗎？——不，它不在那裡！', hint:'dans la roulotte → ?', a:'y', aNote:'dans ＋ 地點 → y；否定時 ne 縮成 n\' 黏在 y 前面' },
  { lesson:21, topic:'pronoms-y-en', type:'fill', q:'Tu vas souvent à la montagne ? — Oui, j\'_____ vais souvent.', zh:'你常去山上嗎？——對，我常去那裡。', hint:'à la montagne → ?', a:'y', aNote:'à ＋ 地點 → y' },
  { lesson:21, topic:'pronoms-y-en', type:'fill', q:'Vous avez dormi sous la tente ? — Non, on n\'_____ a pas dormi.', zh:'你們睡帳篷嗎？——沒有，我們沒睡那裡。', hint:'sous la tente → ?', a:'y', aNote:'sous ＋ 地點 → y；⚠️ 否定＋PC 的順序：on n\' + y + a + pas + dormi' },
  { lesson:21, topic:'pronoms-y-en', type:'fill', q:'Elles reviennent du Sénégal ? — Oui, elles _____ reviennent.', zh:'她們從塞內加爾回來嗎？——對。', hint:'du Sénégal → ?', a:'en', aNote:'du ＋ 國家 → en' },
  { lesson:21, topic:'pronoms-y-en', type:'fill', q:'Il part en Australie. Il _____ va avec sa sœur.', zh:'他要去澳洲。他跟他姊姊一起去那裡。', hint:'去＝?', a:'y', aNote:'en Australie 這裡的 en 是「去某國」的介係詞（＝à la），不是代名詞 → 代名詞用 y' },
  { lesson:21, topic:'pronoms-y-en', type:'fill', q:'Nous adorons le bord de mer. Nous nous _____ baladons tous les soirs.', zh:'我們超愛海邊。我們每天傍晚在那裡散步。', hint:'au bord de mer＝地點', a:'y', aNote:'le bord＝邊（地點）→ y；反身動詞時順序是 nous nous y baladons' },
  { lesson:21, topic:'pronoms-y-en', type:'fill', q:'Tu es sortie de l\'aéroport ? — Non, je n\'_____ suis pas sortie.', zh:'你出機場了嗎？——沒有，我還沒從那裡出來。', hint:'sortir de → ?', a:'en', aNote:'沿用原句的 sortir de → en。但如果改答「我還在那裡」就變成 j\'y suis encore（用 y）——取決於你怎麼造回答句' },
  { lesson:21, topic:'pronoms-y-en', type:'choose', q:'passé composé 裡 y／en 要放在哪裡？', hint:'', a:'助動詞前面', aNote:'Il en est parti ✅ ／ Il est en parti ❌。否定則是 ne + y/en + 助動詞 + pas + 分詞：on n\'y a pas dormi', opts:['助動詞前面','過去分詞前面','句子最後'] },
  { lesson:21, topic:'pronoms-y-en', type:'trans', q:'我很常在那裡散步。（se promener）', hint:'y 的位置', a:'Je m\'y promène très souvent.', aNote:'反身代名詞 me → m\'，接著 y，再接動詞', askClaude:true },

  { lesson:21, topic:'vocab-sens', type:'choose', q:'「我看了一部電影」要用 voir 還是 regarder？', hint:'刻意專注看', a:'regarder', aNote:'regarder＝專注地看（電影、電視）；voir＝眼睛接收到（J\'ai vu des oiseaux 我看到一些鳥）', opts:['voir','regarder'] },
  { lesson:21, topic:'vocab-sens', type:'fill', q:'五感中的「聽覺」，法文是 l\'_____（f.）。', zh:'（感官名稱）', hint:'唸起來像 oui', a:'ouïe', aNote:'l\'ouïe＝聽覺；動詞是 entendre（聽到）／écouter（專注聽）' },
  { lesson:21, topic:'vocab-sens', type:'fill', q:'五感中的「嗅覺」，法文是 l\'_____（m.）。', zh:'（感官名稱）', hint:'不是 odeur', a:'odorat', aNote:'⚠️ l\'odorat＝嗅覺（能力）；l\'odeur＝氣味（聞到的東西），兩個不同' },
  { lesson:21, topic:'vocab-sens', type:'choose', q:'「嚐嚐看」這個動作用哪個字？', hint:'', a:'goûter', aNote:'goûter 是動詞（去嚐）；le goût 和 la saveur 是名詞（味道）', opts:['le goût','la saveur','goûter'] },
  { lesson:21, topic:'vocab-sens', type:'fill', q:'法國人說「這下不妙了」會講：Ça sent _____.', zh:'（字面是「聞起來很臭」，實際講預感）', hint:'bon 的反義', a:'mauvais', aNote:'ça sent mauvais 字面是難聞，口語用來講不好的預感；sentir 也能講感覺：Je sens que ce n\'est pas bon' },
  { lesson:21, topic:'vocab-sens', type:'fill', q:'鳥鳴：le chant des _____.', zh:'鳥鳴聲', hint:'', a:'oiseaux', aNote:'le chant＝鳴叫、歌聲（來自 chanter）；un oiseau → des oiseaux' },

  { lesson:21, topic:'vocab-souvenirs', type:'choose', q:'la jeunesse 指的是哪個年齡帶？', hint:'比青春期大', a:'約20-25歲', aNote:'l\'enfance＝童年；l\'adolescence＝青春期；la jeunesse＝年輕時期（約20-25歲）。三個不能互換', opts:['童年','青春期','約20-25歲'] },
  { lesson:21, topic:'vocab-souvenirs', type:'choose', q:'un souvenir inoubliable 一定是好的回憶嗎？', hint:'in-＋oubliable', a:'不一定，好壞都可以', aNote:'inoubliable＝忘不掉的。好到難忘、爛到難忘都能用——課本雖列在正面欄，實際是中性的', opts:['一定是好的','不一定，好壞都可以','一定是壞的'] },
  { lesson:21, topic:'vocab-souvenirs', type:'fill', q:'生日快樂！Joyeux _____ !', zh:'生日快樂！', hint:'', a:'anniversaire', aNote:'Joyeux anniversaire ! 或 Bon anniversaire !（兩種都對）' },
  { lesson:21, topic:'vocab-souvenirs', type:'fill', q:'un souvenir de _____：假期的回憶。', zh:'假期回憶', hint:'恆複數', a:'vacances', aNote:'les vacances 永遠複數；其他組合：d\'enfance／d\'école／de famille／de jeunesse' },
  { lesson:21, topic:'vocab-souvenirs', type:'fill', q:'課文說某個景色「讓人一輩子忘不了」：des paysages qui vous marquent à _____.', zh:'永遠地', hint:'jamais 單用是「從不」', a:'jamais', aNote:'à jamais＝永遠地；marquer qqn＝在某人心裡刻下印記（不是「標記」）' },

  { lesson:21, topic:'imparfait', type:'fill', q:'（整段轉 imparfait）Gabriel _____ (vouloir) devenir chanteur.', zh:'Gabriel（那時）想成為歌手。', hint:'nous voulons → ?', a:'voulait', aNote:'nous voulons → voul- → il voulait' },
  { lesson:21, topic:'imparfait', type:'fill', q:'Avec les membres de son groupe, ils _____ (espérer) devenir célèbres.', zh:'他跟樂團成員們希望成名。', hint:'⚠️ 主詞是 ils', a:'espéraient', aNote:'-er 動詞直接砍；⚠️ 主詞是 ils（樂團全體）不是 il，所以字尾是 -aient' },
  { lesson:21, topic:'imparfait', type:'fill', q:'Il _____ (faire) de petits concerts.', zh:'他（那時）辦小型演唱會。', hint:'nous faisons → ?', a:'faisait', aNote:'nous faisons → fais- → il faisait（拼 fai- 但唸 /fə/）' },

  // ═══ 易混淆詞對（跨課收割，08-03 新增）═══
  // 來源：各課筆記的對比框與糾錯摘要。這是21課累積下來出現頻率最高的錯誤類型。
  { lesson:4,  topic:'paires-confusables', type:'choose', q:'「我去醫生那裡」——Je vais _____ le médecin.', hint:'後面接的是「人」', a:'chez', aNote:'chez ＋ 人（chez le médecin, chez moi）；à la ＋ 地方（à la pharmacie）。判斷標準是後面接人還是地點', opts:['chez','à la'] },
  { lesson:6,  topic:'paires-confusables', type:'choose', q:'「騎腳踏車」是 à vélo 還是 en vélo？', hint:'有沒有引擎', a:'à vélo', aNote:'à ＋ 非機動（à pied, à vélo, à trottinette）；en ＋ 機動（en bus, en métro, en train）。腳踏車靠人力，所以是 à', opts:['à vélo','en vélo'] },
  { lesson:6,  topic:'paires-confusables', type:'choose', q:'「搭地鐵」用哪個介係詞？_____ métro', hint:'有引擎', a:'en', aNote:'en ＋ 機動交通工具。你是「在裡面」被載，所以用 en', opts:['à','en'] },
  { lesson:9,  topic:'paires-confusables', type:'choose', q:'假朋友陷阱：「書店」是 la librairie 還是 la bibliothèque？', hint:'別被英文 library 騙', a:'la librairie', aNote:'⚠️ 經典假朋友：la librairie＝書店（買書）；la bibliothèque＝圖書館（借書）。長得像 library 的那個反而是書店', opts:['la librairie','la bibliothèque'] },
  { lesson:14, topic:'paires-confusables', type:'choose', q:'「這家的菜比較好」——La cuisine est _____ ici.', hint:'bon 的比較級是特殊的', a:'meilleure', aNote:'❌ plus bonne ✅ meilleure。bon → meilleur(e) 是特殊比較級，跟英文 good → better 同邏輯，不能加 plus', opts:['plus bonne','meilleure'] },
  { lesson:14, topic:'paires-confusables', type:'choose', q:'「更糟」的法文是？', hint:'mauvais 也是特殊比較級', a:'pire', aNote:'❌ plus mauvais ✅ pire。跟 bon→meilleur 同一組例外（英文 bad → worse）', opts:['plus mauvais','pire'] },
  { lesson:14, topic:'paires-confusables', type:'choose', q:'「我來自美國」——Je viens _____ États-Unis.', hint:'de + les = ?', a:'des', aNote:'des 這裡是 de + les 的縮合（跟 du = de + le 同家族），不是「不定冠詞複數」的那個 des。兩個 des 長一樣但來歷完全不同', opts:['de les','des'] },
  { lesson:14, topic:'paires-confusables', type:'choose', q:'「我來自法國」——Je viens _____ France.', hint:'陰性國家', a:'de', aNote:'陰性國家的 la 直接拿掉：la France → de France（不說 de la France）。台灣則跟城市一樣處理：de Taïwan', opts:['de la','de'] },
  { lesson:14, topic:'paires-confusables', type:'choose', q:'「曬黑」這個動作用哪個字？', hint:'一個是顏色一個是動作', a:'bronzer', aNote:'le bronze＝古銅色（名詞）；bronzer＝曬黑、做日光浴（動詞）。變成那個顏色的動作是 bronzer', opts:['le bronze','bronzer'] },
  { lesson:14, topic:'paires-confusables', type:'choose', q:'假朋友：法文的 la location 是什麼意思？', hint:'不是英文的 location', a:'租賃', aNote:'⚠️ la location＝租（行為），不是英文的「地點」！une location de vacances＝度假租屋。「地點」是 le lieu / l\'endroit', opts:['地點','租賃'] },
  { lesson:18, topic:'paires-confusables', type:'choose', q:'「我認識他，但只是點頭之交」——後半句的「點頭之交」用哪個字？', hint:'一個動詞一個名詞', a:'une connaissance', aNote:'connaître＝認識（動詞）；une connaissance＝點頭之交（名詞，比 ami 淡的關係，只是「知道這個人」）', opts:['connaître','une connaissance'] },
  { lesson:18, topic:'paires-confusables', type:'choose', q:'「一見鍾情」（瞬間被雷打到）用哪個說法？', hint:'速度感不同', a:'avoir un coup de foudre', aNote:'coup de foudre＝一見鍾情（foudre＝閃電，瞬間）；tomber amoureux 可以是慢慢愛上。兩者速度感不同', opts:['tomber amoureux','avoir un coup de foudre'] },
  { lesson:18, topic:'paires-confusables', type:'choose', q:'一對沒結婚的情侶分手了，用哪個動詞？', hint:'有沒有法律關係', a:'se séparer', aNote:'se séparer 適用任何伴侶關係（不一定結婚）；divorcer 專指法律上的離婚', opts:['se séparer','divorcer'] },
  { lesson:18, topic:'paires-confusables', type:'choose', q:'搬進新家之後「把家安頓好」用哪個動詞？', hint:'兩個動作一前一後', a:"s'installer", aNote:'先 déménager（搬家）再 s\'installer（安頓下來）——兩個動作一前一後，不是同義詞', opts:['déménager',"s'installer"] },
  { lesson:18, topic:'paires-confusables', type:'choose', q:'「他依然在打拳」（習慣持續）——Il fait _____ de la boxe.', hint:'持續 vs 重複', a:'toujours', aNote:'toujours 強調「持續狀態」（依然）；encore 強調「重複發生」（又一次）。Il a encore gagné.＝他又贏了一次', opts:['encore','toujours'] },
  { lesson:18, topic:'paires-confusables', type:'choose', q:'「他不再打拳了」（以前有，現在停了）用哪個否定？', hint:'有過然後停 vs 從來沒有', a:'ne...plus', aNote:'ne...plus＝習慣的終結（曾經做過現在停了）；ne...jamais＝從未發生過。語意方向完全不同', opts:['ne...plus','ne...jamais'] },
  { lesson:18, topic:'paires-confusables', type:'choose', q:'「我在找工作」（還沒找到）用哪個動詞？', hint:'找到了沒', a:'chercher du travail', aNote:'chercher du travail＝還在找（沒找到）；trouver du travail＝已經找到了。這兩個在履歷和面試講錯意思差很多', opts:['chercher du travail','trouver du travail'] },
  { lesson:19, topic:'paires-confusables', type:'choose', q:'「參觀博物館」用 visiter 還是 voir？', hint:'後面接地方還是內容', a:'visiter', aNote:'visiter ＋ 地點（un musée, une exposition, un monument）；voir ＋ 作品/表演。博物館是地方 → visiter', opts:['visiter','voir'] },
  { lesson:19, topic:'paires-confusables', type:'choose', q:'「看一場戲」用 visiter 還是 voir？', hint:'戲是地方還是內容', a:'voir', aNote:'voir ＋ 你「看」的內容（un film, un spectacle, une pièce de théâtre）。表演不是地方，所以不能用 visiter', opts:['visiter','voir'] },
  { lesson:19, topic:'paires-confusables', type:'choose', q:'「我對足球很有研究」——Je suis amateur _____ football.', hint:'加不加 de 意思不同', a:'de', aNote:'être amateur de ＋ 名詞＝對某事很熱衷很懂（稱讚）；單講 Je suis amateur.＝我是業餘的（不靠這個賺錢）。差一個 de 意思完全不同', opts:['de','（不加）'] },
  { lesson:19, topic:'paires-confusables', type:'choose', q:'「我騎腳踏車（當運動習慣）」——Je fais _____ vélo.', hint:'泛指還是一次', a:'du', aNote:'faire du vélo＝泛指這項運動（不可數）；faire une randonnée à vélo＝具體的一趟行程（可數，可以加時長）', opts:['du','une randonnée à'] },
  { lesson:19, topic:'paires-confusables', type:'choose', q:'站在板子上划槳的水上運動，法文全名是？', hint:'省略關鍵字會變別的運動', a:'le stand-up paddle', aNote:'⚠️ le paddle 單獨講是一種球拍運動（類似網球）；le stand-up paddle 才是站板划槳。不能只講 paddle', opts:['le paddle','le stand-up paddle'] },
  { lesson:19, topic:'paires-confusables', type:'choose', q:'「教練」是哪一個？', hint:'一個是動作一個是人', a:"l'entraîneur", aNote:'entraîner＝訓練（動詞）；l\'entraîneur＝訓練者、教練（人）。字尾 -eur 常表示「做這件事的人」', opts:['entraîner',"l'entraîneur"] },
  { lesson:20, topic:'paires-confusables', type:'choose', q:'「我記得我奶奶」——Je me souviens _____ ma grand-mère.', hint:'se souvenir 一定要接什麼', a:'de', aNote:'se souvenir DE（一定要 de）；se rappeler 直接接受詞不加 de。兩個意思一樣但接法相反', opts:['de','（不加）'] },
  { lesson:20, topic:'paires-confusables', type:'choose', q:'「我記得那些炸糕」——Je me rappelle _____ les beignets.', hint:'se rappeler 要不要 de', a:'（不加）', aNote:'se rappeler 直接接受詞，多加 de 反而是錯的。跟 se souvenir de 剛好相反', opts:['de','（不加）'] },
  { lesson:20, topic:'paires-confusables', type:'choose', q:'「我以前常常弄丟卡」——這句該用哪個時態？', hint:'習慣還是單次', a:'imparfait（je perdais）', aNote:'souvent＝重複的習慣 → imparfait。J\'ai perdu ma carte（PC）是「弄丟了一次」的單一事件', opts:['imparfait（je perdais）','passé composé（j\'ai perdu）'] },
  { lesson:20, topic:'paires-confusables', type:'choose', q:'課文裡的 souvenir（回憶）是名詞還是動詞？', hint:'動詞長什麼樣', a:'名詞', aNote:'un souvenir＝回憶／紀念品（名詞）；動詞是 se souvenir，一定帶反身代名詞（je me souviens）。看有沒有 me/te/se 就能分辨', opts:['名詞','動詞'] },
  { lesson:20, topic:'paires-confusables', type:'choose', q:'「說一個故事」用哪個動詞？', hint:'有情節的', a:'raconter', aNote:'dire＝說出一句話；parler de＝談論某主題；raconter＝敘述有情節的東西（故事、回憶）。三個都是「說」但用途不同', opts:['dire','parler','raconter'] },
  { lesson:21, topic:'paires-confusables', type:'choose', q:'「我看了一部電影」用 voir 還是 regarder？', hint:'刻意專注', a:'regarder', aNote:'regarder＝刻意盯著看、專注在上面（電影一定用這個）；voir＝眼睛接收到了，不是刻意的（J\'ai vu des oiseaux）', opts:['voir','regarder'] },
  { lesson:21, topic:'paires-confusables', type:'choose', q:'「我（不經意）看到一些鳥」用 voir 還是 regarder？', hint:'有眼睛就會看到', a:'voir', aNote:'voir＝被動接收到影像；regarder＝主動專注。同樣的邏輯也適用聽覺：entendre（聽到）vs écouter（專注聽）', opts:['voir','regarder'] },
  { lesson:21, topic:'paires-confusables', type:'choose', q:'「聽到聲音」（不是刻意去聽）用哪個動詞？', hint:'跟 voir 同邏輯', a:'entendre', aNote:'entendre＝聽到（被動，對應 voir）；écouter＝專注地聽（主動，對應 regarder）', opts:['entendre','écouter'] },
  { lesson:21, topic:'paires-confusables', type:'choose', q:'「嚐一口看看」這個動作用哪個字？', hint:'名詞還是動詞', a:'goûter', aNote:'le goût／la saveur＝味道（名詞，兩個都可用）；goûter＝去嚐（動詞）。英文 taste 一個字兼兩用，法文要分開', opts:['le goût','la saveur','goûter'] },
  { lesson:21, topic:'paires-confusables', type:'choose', q:'「你是日本人嗎？（你來自日本）」——Tu _____ du Japon ?', hint:'出身 vs 剛回來', a:'viens', aNote:'venir de＝出身自哪裡；revenir de＝去了一趟又回來。老師說這個講錯會鬧笑話', opts:['viens','reviens'] },
  { lesson:21, topic:'paires-confusables', type:'choose', q:'「你剛從日本玩回來嗎？」——Tu _____ du Japon ?', hint:'去了一趟', a:'reviens', aNote:'revenir de＝去了一趟又回來（老師的例子：每次回法國，je reviens de Taïwan）', opts:['viens','reviens'] },
  { lesson:21, topic:'paires-confusables', type:'choose', q:'一個外國人來台灣玩完要走了，用哪個動詞？', hint:'本來就不是這裡的人', a:'repartir', aNote:'如果那個人本來就不是那裡的人（來玩、出差），走的時候用 repartir（來過又走）；從自己的地方出發才用 partir', opts:['partir','repartir'] },
  { lesson:21, topic:'paires-confusables', type:'choose', q:'「嗅覺」這個感官叫什麼？', hint:'不是聞到的東西', a:"l'odorat", aNote:'⚠️ l\'odorat＝嗅覺（能力，五感之一）；l\'odeur＝氣味（聞到的東西）。感官名稱 vs 感官接收到的東西', opts:["l'odorat","l'odeur"] },
  { lesson:21, topic:'paires-confusables', type:'choose', q:'講回憶時的 ça me marque 是什麼意思？', hint:'不是「標記」', a:'刻在我腦子裡、忘不掉', aNote:'⚠️ marquer (qqn)＝在某人心裡留下深刻印記，不是「標記」。marquer à jamais＝一輩子忘不了', opts:['做個記號','刻在我腦子裡、忘不掉'] },
  { lesson:21, topic:'paires-confusables', type:'choose', q:'On en revient enchanté ! 這裡的 enchanté 是什麼意思？', hint:'不是打招呼那個', a:'陶醉、非常開心', aNote:'⚠️ enchanté 兩義：初次見面時＝「幸會」；其他場合＝陶醉、非常開心。這句是後者', opts:['幸會','陶醉、非常開心'] },
  { lesson:21, topic:'paires-confusables', type:'choose', q:'la jeunesse 指的是哪個年齡帶？', hint:'比青春期大', a:'約20-25歲', aNote:'l\'enfance＝童年；l\'adolescence＝青春期；la jeunesse＝年輕時期（約20-25歲）。三個不能互換', opts:['童年','青春期','約20-25歲'] },
  { lesson:21, topic:'paires-confusables', type:'choose', q:'「生日快樂」用 heureux 還是 joyeux？', hint:'固定搭配', a:'Joyeux anniversaire', aNote:'固定說法是 Joyeux anniversaire !（或 Bon anniversaire !）。heureux 偏「幸福」（狀態），joyeux 偏「歡樂」（氣氛），兩者反義都是 triste', opts:['Heureux anniversaire','Joyeux anniversaire'] },
  { lesson:21, topic:'paires-confusables', type:'choose', q:'法國人說 Ça sent mauvais. 在講什麼？', hint:'不一定真的有味道', a:'（口語）事情不妙', aNote:'字面是「聞起來很臭」，但口語常用來講不好的預感。同一個 sentir 也能講感覺：Je sens que ce n\'est pas bon', opts:['真的有臭味','（口語）事情不妙','兩個意思都有'] },

  // ═══ 第22課：Quel temps fait-il ?（天氣詞彙 ＋ la place de l'adjectif）═══
  { lesson:22, topic:'vocab-meteo', type:'fill', q:'問天氣的標準句：_____ temps fait-il ?', zh:'天氣怎麼樣？', hint:'疑問形容詞', a:'Quel', aNote:'Quel temps fait-il ? 回答一律用 Il fait…（Il fait beau / mauvais / chaud / froid）' },
  { lesson:22, topic:'vocab-meteo', type:'choose', q:'「太熱而且持續太久」（熱浪）的法文是？', hint:'不是單純的熱', a:'la canicule', aNote:'la canicule＝熱浪（太熱＋持續太久，英文 heat wave）；la chaleur 只是單純的「熱」', opts:['la chaleur','la canicule'] },
  { lesson:22, topic:'vocab-meteo', type:'choose', q:'「18–20度，舒服的涼爽」用哪個字？', hint:'不是冷', a:'la fraîcheur', aNote:'la fraîcheur＝舒服的涼；le froid＝真的冷（可能0度）。課本例句：L\'été, je cherche la fraîcheur !', opts:['le froid','la fraîcheur'] },
  { lesson:22, topic:'vocab-meteo', type:'choose', q:'狗害怕的那個天氣現象（整場雷雨）是？', hint:'不是那個聲音', a:"l'orage", aNote:'l\'orage＝整場雷雨（天氣現象）；le tonnerre＝雷聲本身。課本例句：La météo annonce des orages. Rentre le chien !', opts:["l'orage",'le tonnerre'] },
  { lesson:22, topic:'vocab-meteo', type:'choose', q:'Je n\'ai pas le temps. 這裡的 temps 是什麼意思？', hint:'一字兩義', a:'時間', aNote:'⚠️ le temps 兼「時間」與「天氣」：Quel temps fait-il ?＝天氣如何；Je n\'ai pas le temps＝我沒時間。靠句型分辨', opts:['時間','天氣'] },
  { lesson:22, topic:'vocab-meteo', type:'choose', q:'講「長期氣候」用哪個字？', hint:'不是當下天氣', a:'le climat', aNote:'le climat＝長期氣候；la météo＝當下天氣／預報', opts:['le climat','la météo'] },
  { lesson:22, topic:'vocab-meteo', type:'fill', q:'風速每小時80公里：Le vent _____ à 80 kilomètres par heure.', zh:'風以時速80公里吹著。', hint:'吹', a:'souffle', aNote:'souffler＝吹（風）。老師補充：台灣颱風可到 130 km/h' },
  { lesson:22, topic:'vocab-meteo', type:'fill', q:'退潮時：à marée _____（漲潮是 à marée haute）', zh:'退潮時', hint:'haute 的反義', a:'basse', aNote:'la marée＝潮汐；à marée basse（退潮）≠ à marée haute（漲潮）' },
  { lesson:22, topic:'vocab-meteo', type:'fill', q:'海邊那種會偷吃東西的鳥：la _____', zh:'海鷗', hint:'', a:'mouette', aNote:'la mouette＝海鷗（seagull）' },
  { lesson:22, topic:'vocab-meteo', type:'choose', q:'岩岸地形（不一定有沙灘）叫什麼？', hint:'跟 plage 不同', a:'la côte', aNote:'la côte＝海岸（老師說明：可能是岩岸，不一定有沙）；la plage＝有沙的海灘', opts:['la côte','la plage'] },
  { lesson:22, topic:'vocab-meteo', type:'fill', q:'慣用語：閒聊、聊無關緊要的事＝parler de la pluie et du _____ temps.', zh:'（字面「聊雨和好天氣」）', hint:'beau', a:'beau', aNote:'parler de la pluie et du beau temps＝閒聊。跟中文「聊天氣」的社交功能一模一樣' },
  { lesson:22, topic:'vocab-meteo', type:'fill', q:'「我每天都做這件事」：Je fais ça _____ quotidien.', zh:'我每天都做這件事。', hint:'介係詞', a:'au', aNote:'au quotidien＝日常地、每天。整組：quotidien／hebdomadaire（每週）／mensuel（每月）／annuel（每年）' },
  { lesson:22, topic:'vocab-meteo', type:'fill', q:'「我一年有10天假」：J\'ai 10 jours de _____ par an.', zh:'我一年有10天假。', hint:'跟工作綁定的假', a:'congé', aNote:'les congés＝有薪假；prendre des congés＝請假；Je suis en congé.＝我在休假中' },
  { lesson:22, topic:'vocab-meteo', type:'choose', q:'une dépense incontournable 是什麼意思？', hint:'contourner＝繞過', a:'躲不掉的開銷', aNote:'contourner＝繞過 → in-contournable＝繞不過去的、必然的。課文說買紀念品就是這種開銷', opts:['可以省下的開銷','躲不掉的開銷'] },

  { lesson:22, topic:'adjective-position', type:'fill', q:'「一家好的法式餐廳」：un _____ restaurant _____（bon / français）', zh:'一家好的法式餐廳', hint:'短的在前、國籍在後', a:'bon / français', aNote:'un bon restaurant français：短形容詞（bon）在名詞前，國籍（français）在名詞後，名詞夾中間。這是考題最愛的組合' },
  { lesson:22, topic:'adjective-position', type:'choose', q:'「一座西班牙小島」正確的是？', hint:'petit 短、espagnol 國籍', a:'une petite île espagnole', aNote:'短形容詞 petite 在前、國籍 espagnole 在後。⚠️ 兩個形容詞都要配陰性', opts:['une petite île espagnole','une espagnole île petite','une île petite espagnole'] },
  { lesson:22, topic:'adjective-position', type:'choose', q:'「一些白色大船」正確的是？', hint:'gros 短、blanc 顏色', a:'de gros bateaux blancs', aNote:'gros（短）在前 → des 縮成 de；blancs（顏色）在後，陽性複數配 s。⚠️ 不是 blanches（那是陰性）', opts:['des gros bateaux blancs','de gros bateaux blancs','de gros blancs bateaux'] },
  { lesson:22, topic:'adjective-position', type:'choose', q:'顏色形容詞放名詞的哪一邊？', hint:'', a:'一律放後面', aNote:'國籍、顏色、形狀三類一律放名詞後面（客觀分類）。只有短的主觀評價形容詞（bon/gros/grand/petit/vieux/beau/joli）放前面', opts:['一律放前面','一律放後面','看情況'] },
  { lesson:22, topic:'adjective-position', type:'fill', q:'「一些極好的香料」：_____ excellentes épices（注意冠詞）', zh:'一些極好的香料', hint:'形容詞在前＋母音開頭', a:"d'", aNote:'形容詞放複數名詞前 → des 變 de；excellentes 是母音開頭 → 再縮成 d\'。⚠️ épice 是陰性，所以 excellentes 要加 es' },
  { lesson:22, topic:'adjective-position', type:'fill', q:'「一些漂亮的草編鞋」：_____ jolies espadrilles', zh:'一些漂亮的草編鞋', hint:'形容詞在前', a:'de', aNote:'de jolies espadrilles：joli 放名詞前 → des 縮成 de' },
  { lesson:22, topic:'adjective-position', type:'choose', q:'J\'utilise mon propre mug. 是什麼意思？', hint:'propre 在名詞前', a:'我用我自己的杯子', aNote:'⚠️ propre 在名詞前＝「自己的」；在名詞後＝「乾淨的」。位置改變意思，這是最常見的一個', opts:['我用我自己的杯子','我用一個乾淨的杯子'] },
  { lesson:22, topic:'adjective-position', type:'choose', q:'J\'utilise un mug propre. 是什麼意思？', hint:'propre 在名詞後', a:'我用一個乾淨的杯子', aNote:'propre 在名詞後＝乾淨的（le mug n\'est pas sale）。跟 mon propre mug（我自己的）剛好相反', opts:['我用我自己的杯子','我用一個乾淨的杯子'] },
  { lesson:22, topic:'adjective-position', type:'choose', q:'把本來該放後面的形容詞刻意移到前面，是為了什麼？', hint:'課本 Remarque', a:'表示強調、更有感情', aNote:'Les boutiques incroyables（中性描述）→ Les incroyables boutiques !（超誇張的那些店！）。移到前面句子更有表現力', opts:['文法要求','表示強調、更有感情','沒有差別'] },
  { lesson:22, topic:'adjective-position', type:'fill', q:'「一件漂亮的彩色襯衫」：une belle chemise _____（colorée）', zh:'一件漂亮的彩色襯衫', hint:'顏色類放哪', a:'colorée', aNote:'belle（短、主觀）在前；colorée（顏色類）在後，且配陰性 e' },
  { lesson:20, topic:'imparfait', type:'fill', q:'Le matin, je _____ (manger) mes tartines avec de la confiture.', zh:'早上我吃抹果醬的麵包。', hint:'g 後面接 a 要加料', a:'mangeais', aNote:'mange- + ais：g 後面接 a 要補一個 e 保住 /ʒ/ 音' },
  { lesson:20, topic:'imparfait', type:'fill', q:'Nous _____ (manger) souvent chez ma grand-mère.', zh:'我們以前常在奶奶家吃飯。', hint:'nous 的字尾是 i 開頭', a:'mangions', aNote:'字尾 -ions 的 i 本來就讓 g 唸軟音，所以 nous/vous 不加 e（mangeions ❌）' },
  { lesson:20, topic:'imparfait', type:'fill', q:'Pour son travail, il se _____ (déplacer) beaucoup.', zh:'因為工作，他以前常常到處跑。', hint:'c 後面接 a 要加尾巴', a:'déplaçait', aNote:'c + a 會唸 /k/，所以寫 ç：il se déplaçait；但 nous nous déplacions 不用 ç' },
  { lesson:20, topic:'imparfait', type:'fill', q:'Quand ils _____ (être) jeunes, ils voyageaient de temps en temps.', zh:'他們年輕時偶爾會去旅行。', hint:'唯一不規則字根', a:'étaient', aNote:'être 的字根是 ét-（不能從 nous sommes 推），j\'étais / ils étaient' },
  { lesson:20, topic:'imparfait', type:'choose', q:'下列哪一個 imparfait 拼錯了？', hint:'想一下 faire 的 nous 形', a:'je ferais', aNote:'faire → nous faisons → fais- → je faisais（je ferais 是條件式，帶 r 音的是未來/條件，不是 imparfait）', opts:['je ferais','je faisais','j\'avais','j\'allais'] },
  { lesson:20, topic:'imparfait', type:'choose', q:'imparfait 的 je / tu / il / ils 四個字尾（-ais/-ais/-ait/-aient）發音如何？', hint:'', a:'四個完全同音', aNote:'都唸 /ɛ/，聽力只能靠主詞分辨人稱；只有 nous(-ions)/vous(-iez) 多一個 i 音', opts:['四個完全同音','只有 ils 不同','四個都不同','只有 je 跟 tu 同音'] },
  { lesson:20, topic:'imparfait', type:'choose', q:'「我以前吃很多，但30歲之後我變胖了」正確的時態組合是？', hint:'習慣 vs 一次性事件', a:'Je mangeais beaucoup, mais après 30 ans, j\'ai grossi.', aNote:'吃很多＝長期習慣（imparfait）；變胖＝發生一次的改變（passé composé）。同一段話兩個時態並存是常態', opts:['Je mangeais beaucoup, mais après 30 ans, j\'ai grossi.','J\'ai mangé beaucoup, mais après 30 ans, je grossissais.','Je mangeais beaucoup, mais après 30 ans, je grossissais.','J\'ai mangé beaucoup, mais après 30 ans, j\'ai grossi.'] },
  { lesson:20, topic:'imparfait', type:'choose', q:'哪一個時間副詞「不會」自然搭配 imparfait？', hint:'一次性 vs 習慣', a:'un jour', aNote:'souvent / tous les jours / à cette époque 都是習慣或背景 → imparfait；un jour（有一天）指單一事件 → passé composé', opts:['un jour','souvent','tous les jours','à cette époque'] },
  { lesson:20, topic:'imparfait', type:'fill', q:'Aujourd\'hui je fais du sport. Avant, je ne _____ (faire) rien.', zh:'我現在有運動。以前我什麼都不做。', hint:'faire 的 imparfait', a:'faisais', aNote:'拼 fai- 但唸 /fə/（fe-zè），是拼寫騙人的常用字' },
  { lesson:20, topic:'imparfait', type:'trans', q:'那時候我住在史特拉斯堡。', hint:'À cette époque / habiter', a:"À cette époque, j'habitais à Strasbourg.", aNote:'<b>à cette époque</b>＝那個時候，講一段人生時期而不是一個時間點，它就是 imparfait 的路標。⚠️ 時間副詞決定時態：souvent／toujours／tous les jours／avant／quand j\'étais petit → imparfait；hier／un jour／soudain → passé composé。', askClaude:true },
  { lesson:20, topic:'imparfait', type:'trans', q:'晚上我們躺在草地上看星星。', hint:'Le soir / allongés dans l\'herbe / regarder les étoiles', a:"Le soir, allongés dans l'herbe, on regardait les étoiles.", aNote:'典型的「背景描述」→ imparfait（on regardait）。<b>allongé(e)</b>＝平躺，是四種姿勢之一：assis(e)（坐）／debout（站，<b>永遠不變化</b>）／couché(e)／allongé(e)。', askClaude:true },
  { lesson:20, topic:'vocab-souvenirs', type:'fill', q:'Je me souviens _____ ma grand-mère.', zh:'我記得我奶奶。', hint:'se souvenir 後面一定要接什麼？', a:'de', aNote:'se souvenir DE quelque chose；但 se rappeler 直接接受詞不加 de（je me rappelle ma grand-mère）' },
  { lesson:20, topic:'vocab-souvenirs', type:'choose', q:'哪一句是錯的？', hint:'兩個動詞的介系詞不一樣', a:'Je me rappelle de ce jour.', aNote:'se rappeler 直接接受詞（je me rappelle ce jour）；要用 de 的是 se souvenir', opts:['Je me rappelle de ce jour.','Je me rappelle ce jour.','Je me souviens de ce jour.','Je me souviens de mon enfance.'] },
  { lesson:20, topic:'vocab-souvenirs', type:'choose', q:'「講述我的回憶」用哪個動詞？', hint:'有情節的才用它', a:'raconter mes souvenirs', aNote:'dire＝說出一句話；parler de＝談論；raconter＝敘述有情節的內容（故事、回憶）', opts:['raconter mes souvenirs','dire mes souvenirs','répondre mes souvenirs','sourire mes souvenirs'] },
  { lesson:20, topic:'vocab-souvenirs', type:'fill', q:'Ces mots sont _____ dans ma mémoire. (刻著、永遠忘不了)', zh:'這些話刻在我的記憶裡。', hint:'graver 的過去分詞', a:'gravés', aNote:'graver＝刻；gravé dans ma mémoire 是固定說法，配 mots（陽性複數）要加 s' },
  { lesson:20, topic:'vocab-souvenirs', type:'choose', q:'la mémoire 跟 un souvenir 的差別是？', hint:'裝置 vs 內容', a:'mémoire 是記憶力/記憶空間，souvenir 是一則則具體回憶', aNote:'dans ma mémoire＝在我記憶裡；un souvenir 也可以指紀念品（因為紀念品就是一段回憶）', opts:['mémoire 是記憶力/記憶空間，souvenir 是一則則具體回憶','完全同義可互換','mémoire 是口語，souvenir 是書面','souvenir 只能指紀念品'] },
  { lesson:20, topic:'vocab-souvenirs', type:'choose', q:'「我最糟的假期回憶」正確說法？', hint:'最高級要有所有格或冠詞', a:'mon plus mauvais souvenir de vacances', aNote:'mauvais＝壞的；加上 mon plus / le plus 才是最高級「最糟的」', opts:['mon plus mauvais souvenir de vacances','mon mauvais souvenir de vacances','mon souvenir plus mauvais de vacances','le mauvais souvenir de vacances'] },
  { lesson:20, topic:'vocab-souvenirs', type:'choose', q:'看到流星時法國人會說什麼？', hint:'跟中文一樣', a:'Fais un vœu !', aNote:'une étoile filante＝流星；faire un vœu＝許願', opts:['Fais un vœu !','Fais une étoile !','Bonne chance !','Souriez !'] },
  { lesson:20, topic:'vocab-souvenirs', type:'fill', q:'Elle mangeait une _____ de confiture le matin. (塗醬的麵包片)', zh:'她早上吃抹果醬的麵包片。', hint:'t____e', a:'tartine', aNote:'tartine 預設就是「麵包＋抹的東西」：tartine de beurre / de fromage' },
  { lesson:20, topic:'vocab-souvenirs', type:'choose', q:'「C\'est ma madeleine de Proust.」是什麼意思？', hint:'不是在講蛋糕', a:'這東西讓我瞬間回到童年', aNote:'出自作家 Marcel Proust；任何喚回童年記憶的東西（物品、歌、氣味）都可以這樣說', opts:['這東西讓我瞬間回到童年','這是我最愛的甜點','這是我做的蛋糕','這件事我完全忘了'] },
  { lesson:20, topic:'vocab-souvenirs', type:'trans', q:'我很依戀這個地方。', hint:'être attaché à', a:'Je suis très attaché à cet endroit.', aNote:'<b>être attaché(e) à</b>＝依戀、捨不得，對地方對人都能用（je suis très attachée à cet endroit／à lui）。同組回憶詞：gravé dans ma mémoire（刻在我記憶裡）、replonger dans mon enfance（一頭栽回童年）。', askClaude:true },
  // ═══ 第23課：Le logement et la location ═══════════════════
  { lesson:23, topic:'vocab-logement', type:'choose', q:'課文標題 comment trouver un toit 的 toit 本義是？', hint:'房子的最上面', a:'屋頂', aNote:'un toit＝屋頂，引申成「住的地方」（跟中文「有片瓦遮頭」同一個比喻）。課本標題：Étudiants : comment trouver un toit ?', opts:['屋頂','房租','房東','鑰匙'] },
  { lesson:23, topic:'vocab-logement', type:'choose', q:'整棟大樓叫什麼？（不是你住的那一戶）', hint:'一整棟', a:"l'immeuble", aNote:"l'immeuble＝整棟大樓；l'appartement＝其中一戶。老師的句子：un appartement dans un immeuble", opts:["l'immeuble","l'appartement",'le studio','la pièce'] },
  { lesson:23, topic:'vocab-logement', type:'choose', q:'床、廚房全在同一個空間、沒有隔間的住處叫？', hint:'一房到底', a:'le studio', aNote:'le studio＝套房（一個空間全包）。T1／T2 才有隔出來的房間', opts:['le studio',"l'immeuble",'la résidence','le foyer'] },
  { lesson:23, topic:'vocab-logement', type:'choose', q:'法文說 un T2（兩房），這個「2」包含廚房和浴室嗎？', hint:'老師特別解釋過', a:'不包含', aNote:'⚠️ 法文數 pièces 不算廚房與衛浴（每間房子都有，不構成差別）。un T2＝un séjour + une chambre', opts:['不包含','包含廚房不含浴室','兩個都包含','只包含浴室'] },
  { lesson:23, topic:'vocab-logement', type:'choose', q:'電梯裡的 RDC 是哪一層？', hint:'貼著路面那層', a:'一樓（地面層）', aNote:'le rez-de-chaussée＝一樓。老師拆字：rez＝靠近、chaussée＝路面。法國的 premier étage 是台灣的二樓', opts:['一樓（地面層）','二樓','地下一樓','頂樓'] },
  { lesson:23, topic:'vocab-logement', type:'choose', q:'廣告寫 au quatrième étage，換算成台灣是幾樓？', hint:'法國從 rez-de-chaussée 開始算', a:'五樓', aNote:'⚠️ 法國 premier étage＝台灣二樓，所以 quatrième étage＝台灣五樓。課本那則廣告還註明 sans ascenseur（沒電梯）', opts:['五樓','四樓','三樓','六樓'] },
  { lesson:23, topic:'vocab-logement', type:'choose', q:'屋頂底下、通常拿來堆東西的那層叫？', hint:'不是地下室', a:'le grenier', aNote:'le grenier＝閣樓（屋頂下）；la cave / le sous-sol＝地下室。課本廣告：aménagé dans un ancien grenier', opts:['le grenier','la cave','le sous-sol','le couloir'] },
  { lesson:23, topic:'vocab-logement', type:'choose', q:'meublé 是什麼意思？', hint:'看字根 meuble', a:'附家具的', aNote:'un meuble＝家具 → meublé＝附家具的。課本：18 chambres et studios meublés', opts:['附家具的','翻新的','明亮的','可入住的'] },
  { lesson:23, topic:'vocab-logement', type:'choose', q:'租屋廣告寫 disponible，意思是？', hint:'⚠️ 不是免費', a:'可入住的（available）', aNote:'⚠️ disponible＝available（有空、可入住）；gratuit 才是免費。這兩個很容易混', opts:['可入住的（available）','免費的','便宜的','翻新的'] },
  { lesson:23, topic:'vocab-logement', type:'choose', q:'rénové 和 aménagé 的差別是？', hint:'本來是不是住人的地方', a:'rénové 是舊翻新；aménagé 是本來不住人改成能住', aNote:'⚠️ 老師花了一段講：Magnifique T2 rénové（本來就是公寓，翻新）／Aménagé dans un ancien grenier（本來是閣樓，改建）', opts:['rénové 是舊翻新；aménagé 是本來不住人改成能住','兩個完全同義','rénové 比較貴','aménagé 是拆掉重建'] },
  { lesson:23, topic:'vocab-logement', type:'choose', q:'Cette maison neuve. 這裡的 neuve 是什麼意思？', hint:'不是數字 9', a:'全新的（沒被用過）', aNote:'⚠️ neuf/neuve＝全新、從沒人用過；nouveau/nouvelle＝新的（對我而言新，不代表沒人用過）。le nouvel iPhone 是後者', opts:['全新的（沒被用過）','第九個','新的（但可能有人用過）','老舊的'] },
  { lesson:23, topic:'vocab-logement', type:'choose', q:'580 € par mois charges comprises. 的 charges comprises 是？', hint:'comprendre 的另一個意思', a:'已含水電網等雜費', aNote:'⚠️ comprendre 除了「理解」還有「包含」。les charges＝管理費/雜費；comprises＝已包含。這是看租屋廣告必抓的一句', opts:['已含水電網等雜費','不含雜費','押金已付','含家具'] },
  { lesson:23, topic:'vocab-logement', type:'choose', q:'colocation 和 cohabitation 的差別？', hint:'房子是誰的', a:'colocation 是各付各的合租；cohabitation 是住進別人家', aNote:'⚠️ 老師特別區分：co-locataire 都是房客、地位平等；cohabitation intergénérationnelle 是年輕人住進長輩家，用陪伴與小幫忙換低租金', opts:['colocation 是各付各的合租；cohabitation 是住進別人家','完全同義','cohabitation 比較貴','colocation 只能跟朋友'] },
  { lesson:23, topic:'vocab-logement', type:'choose', q:'房東和房客分別是？', hint:'同字根 location', a:'propriétaire 是房東、locataire 是房客', aNote:'la location＝租的那個房子；le locataire＝租的那個人；le propriétaire＝產權人。le loyer＝房租', opts:['propriétaire 是房東、locataire 是房客','locataire 是房東、propriétaire 是房客','兩個都是房東','兩個都是房客'] },
  { lesson:23, topic:'vocab-logement', type:'choose', q:'講「空間很暗」用哪個字？', hint:'不是講顏色', a:'sombre', aNote:'⚠️ 老師一次講四個：顏色用 clair≠foncé（vert clair／vert foncé）；空間用 clair≠sombre。l\'ombre＝影子，sombre 就是被 ombre 蓋滿', opts:['sombre','foncé',"l'ombre",'faible'] },
  { lesson:23, topic:'vocab-logement', type:'fill', q:'廚房家電齊全：une cuisine _____.', zh:'一間配備齊全的廚房。', hint:'équiper 的過去分詞當形容詞', a:'équipée', aNote:'équipé(e)＝配備齊全的。陰性 cuisine 要配合成 équipée' },
  { lesson:23, topic:'vocab-logement', type:'fill', q:'面積的單位：Studio de 33 _____.', zh:'33 平方公尺的套房。', hint:'m² 怎麼唸', a:'mètres carrés', aNote:'le mètre carré (m²)＝平方公尺；la superficie＝面積。老師：台灣一坪約 3–4 平方公尺' },
  { lesson:23, topic:'vocab-logement', type:'fill', q:'法文沒有單一個字對應英文 cheap，可以說 pas cher 或 _____.', zh:'便宜的', hint:'跟巴黎一間百貨同名', a:'bon marché', aNote:'bon marché＝便宜。巴黎有間百貨公司就叫 Le Bon Marché' },
  { lesson:23, topic:'vocab-logement', type:'trans', q:'我跟兩個室友分租一間公寓。', hint:'partager / colocataires', a:'Je partage un appartement avec deux colocataires.', aNote:'⚠️ 老師特別分「事」跟「人」：<b>la colocation</b> 是合租這件事、<b>le/la colocataire</b> 是室友這個人；同理 <b>location</b>（租的那個房子）vs <b>locataire</b>（租的那個人）。', askClaude:true },

  // 關係代名詞（擴充既有 qui-que topic，本課加入 où）
  { lesson:23, topic:'qui-que', type:'choose', q:'Regarde cette annonce _____ je viens de lire !', hint:'後面是主詞 je', a:'que', aNote:'que 後面先出現新主詞（je）→ 它代替受詞。原句：je viens de lire cette annonce', opts:['que','qui','où'] },
  { lesson:23, topic:'qui-que', type:'choose', q:"C'est la chambre _____ coûte 650 euros ?", hint:'後面直接是動詞', a:'qui', aNote:'qui 後面直接接動詞（coûte）→ 它代替主詞。原句：la chambre coûte 650 euros', opts:['qui','que','où'] },
  { lesson:23, topic:'qui-que', type:'choose', q:'Il y a un garage _____ vous pouvez garer votre voiture.', hint:'停車的「地方」', a:'où', aNote:'où 代替地點補語。原句：vous pouvez garer votre voiture dans le garage。動詞 garer＝停車', opts:['où','que','qui'] },
  { lesson:23, topic:'qui-que', type:'choose', q:"Mon frère vit dans l'appartement _____ j'habitais avant.", hint:'住「在」那裡', a:'où', aNote:'où 代替地點。原句：j\'habitais dans cet appartement（有介詞＋地點 → où）', opts:['où','que','qui'] },
  { lesson:23, topic:'qui-que', type:'choose', q:'Le salon est la pièce _____ je préfère.', hint:'⚠️ 老師的英文測試法', a:'que', aNote:'⚠️ 最容易錯的一題。翻成英文是 which I prefer 不是 where I prefer → que。若寫成 où je préfère dormir（我偏好睡覺的地方）才是 où', opts:['que','où','qui'] },
  { lesson:23, topic:'qui-que', type:'choose', q:'Ma sœur vit dans un studio _____ mes parents ont acheté.', hint:'買的是「那間房」', a:'que', aNote:'⚠️ 同一個陷阱：買的是那間套房＝受詞 → que。不是 où my parents bought。判準永遠是子句缺主詞還是缺受詞', opts:['que','où','qui'] },
  { lesson:23, topic:'qui-que', type:'choose', q:'Les colocataires sont des personnes _____ partagent un appartement.', hint:'後面是動詞', a:'qui', aNote:'partagent 是動詞 → qui。課本 Entraînement 原題', opts:['qui','que','où'] },
  { lesson:23, topic:'qui-que', type:'choose', q:'Il vit dans un foyer _____ aime beaucoup.', hint:'que 碰母音會怎樣', a:"qu'il", aNote:"que + il → qu'il（母音前縮寫）。⚠️ qui 永遠不縮寫，所以看到 qu'il 就知道是 que 不是 qui", opts:["qu'il",'qui','où il'] },
  { lesson:23, topic:'qui-que', type:'fill', q:'Voici la chambre _____ je dors.', zh:'這就是我睡的房間。', hint:'拆回兩句看有沒有介詞', a:'où', aNote:'拆回兩句：Voici la chambre. + Je dors dans la chambre. → 有「介詞＋地點」→ où' },
  { lesson:23, topic:'qui-que', type:'fill', q:'Je loue un studio _____ est dans une ferme.', zh:'我租一間在農場裡的套房。', hint:'後面是 est', a:'qui', aNote:'後面直接接動詞 est → qui。ferme＝農場' },
  { lesson:23, topic:'qui-que', type:'choose', q:'關係代名詞 qui 和 que 的判斷口訣是？', hint:'看子句缺什麼', a:'後面直接接動詞用 qui；後面先出現主詞用 que', aNote:'⚠️ 根本原因：qui 是主格（自己當子句主詞）、que 是受格（子句另有主詞）。這是拉丁文格變化留下的活化石。詳見記憶宮殿 3-5-1 / 3-5-2', opts:['後面直接接動詞用 qui；後面先出現主詞用 que','指人用 qui、指物用 que','qui 用在肯定句、que 用在否定句','看先行詞的陰陽性'] },
  { lesson:23, topic:'qui-que', type:'trans', q:'這就是我住的地方。', hint:'endroit / où', a:"Ça, c'est l'endroit où j'habite.", aNote:'<b>où</b> 取代的是地點：拆回兩句是 j\'habite <b>dans</b> cet endroit——有介詞＋地點就用 où。⚠️ 老師強調不是每個「的」都用 où：Ma chambre est la pièce <b>que</b> je préfère.（受詞用 que）。endroit＝地方，比 lieu 更口語。', askClaude:true },

  // ══ 第24課：DELF A2 閱讀實戰 ══════════════════════════════
  // 解題法（Owen 明講：解題方法在專攻考試的課程中很重要，要跟文法詞彙同等對待）
  { lesson:24, topic:'strategie-lecture', type:'choose', q:'拿到閱讀題，老師說的「第一鐵律」是什麼？', hint:'先做哪一件事', a:'先讀題目，再回文件找答案', aNote:'⭐⭐⭐ 老師原話：the number one rule is to read the question first。先讀題目才知道要找什麼；先讀文章＝浪費時間又記不住', opts:['先讀題目，再回文件找答案','先把文件從頭讀懂','先查不認識的單字','先看有幾分'] },
  { lesson:24, topic:'strategie-lecture', type:'choose', q:'「找資訊」題型（時刻表、廣告）動手第一步該做什麼？', hint:'拿筆做記號', a:'把所有數字圈起來', aNote:'Entourez tous les chiffres. ①型題目全靠數字：heure／âge／tarif／date／numéro。先圈起來，眼睛就不用重找', opts:['把所有數字圈起來','把動詞畫底線','把不懂的字抄下來','先數有幾份文件'] },
  { lesson:24, topic:'strategie-lecture', type:'choose', q:'課本要你每份文件抓幾個關鍵字？', hint:'repérez les mots-clés', a:'三個', aNote:'Repérez les mots-clés (trois par document). 一份文件抓三個：什麼活動／什麼時候／叫什麼名字。其餘看不懂不影響作答', opts:['三個','一個','全部生字','五個'] },
  { lesson:24, topic:'strategie-lecture', type:'choose', q:'配對題碰到一份完全看不懂的文件，老師的做法是？', hint:'不要停在同一題', a:'先跳過去做別的，最後用刪去法回頭解決', aNote:'⭐ 今天實際示範：patinoire 那份不認識 patin，先做完 escalade→Peter，剩下的自然對上。配對題文件數比人多／少，本來就要靠刪去法', opts:['先跳過去做別的，最後用刪去法回頭解決','停下來把每個字查清楚','隨便猜一個就過','從第一個字開始逐字翻譯'] },
  { lesson:24, topic:'strategie-lecture', type:'choose', q:'課本的 Si vous ne connaissez pas un mot, ne vous inquiétez pas 後面接什麼建議？', hint:'grâce à', a:'Essayez de comprendre grâce aux autres mots.', aNote:'不認識某個字不要慌，用旁邊的字去猜。grâce à＝多虧了、靠著', opts:['Essayez de comprendre grâce aux autres mots.','Cherchez dans le dictionnaire.','Ne répondez pas à la question.','Lisez le texte encore dix fois.'] },
  { lesson:24, topic:'strategie-lecture', type:'choose', q:'老師說 A2 這場閱讀的得分標準是？', hint:'資訊都在紙上', a:'要拿滿分，不能出錯', aNote:'Vous ne devez pas faire d\'erreurs. 答案全部寫在文件上，沒有推理也沒有言外之意——錯了就是「沒找到」或「看錯字」', opts:['要拿滿分，不能出錯','錯一半算正常','只要猜對一題就好','這場不計分'] },
  { lesson:24, topic:'strategie-lecture', type:'choose', q:'DELF A2 閱讀第④種題型（6 份廣告配 6–8 個人）的正確解法是？', hint:'課本 PRÊT POUR L\'EXAMEN', a:'在不同文件之間互相比較，找對得上的那個字', aNote:'Faire des associations entre les divers documents. 配對是比較出來的，不是一份一份獨立判斷。每個人的描述裡都藏一個詞根線索：grimper→escalade、sports d\'hiver→patinoire', opts:['在不同文件之間互相比較，找對得上的那個字','照順序一對一配下去','把每份文件完整翻譯再決定','看哪份最長就配給第一個人'] },
  { lesson:24, topic:'strategie-lecture', type:'choose', q:'DELF A2 的四場考試（épreuves）分別是？', hint:'理解兩場、產出兩場', a:'compréhension orale / écrite ＋ production écrite / orale', aNote:'一場叫 une épreuve（⚠️ 不是 expérience）。理解＝compréhension，產出＝production；orale＝口語，écrite＝書面', opts:['compréhension orale / écrite ＋ production écrite / orale','lecture / écriture / grammaire / vocabulaire','A1 / A2 / B1 / B2','listening / speaking 兩場而已'] },
  { lesson:24, topic:'strategie-lecture', type:'choose', q:'新版 DELF A2 閱讀的作答方式是？', hint:'老師說改版了', a:'全部是選擇題（cochez la bonne réponse）', aNote:'老師：Now is only multiple choice，以前要自己寫句子，新版三選一打勾。cocher＝打勾', opts:['全部是選擇題（cochez la bonne réponse）','要自己寫完整句子','口頭回答','寫一篇短文'] },
  { lesson:24, topic:'strategie-lecture', type:'choose', q:'明信片題型裡，文章出現了 parents 這個字，問「她住在誰家」時要小心什麼？', hint:'今天踩過的陷阱', a:'她住的是 parents 的「朋友」家，字有出現不等於是答案', aNote:'⚠️ chez des amis de mes parents＝住在父母的朋友家，不是 dans sa famille。三個選項通常都用文章裡出現過的字，要看它在句子裡扮演什麼角色', opts:['她住的是 parents 的「朋友」家，字有出現不等於是答案','看到 parents 就選「住家人家」','三個選項都對','這題沒有答案'] },

  // 考試指令動詞
  { lesson:24, topic:'vocab-consignes', type:'choose', q:'Entourez tous les chiffres. 這句指令要你做什麼？', hint:'tour＝圈', a:'把所有數字圈起來', aNote:'entourer 來自 tour（圈、繞一圈）→ 畫一圈把它圍住。⚠️ 今天卡過這個字', opts:['把所有數字圈起來','把數字刪掉','把數字唸出來','把數字加起來'] },
  { lesson:24, topic:'vocab-consignes', type:'choose', q:'Repérez les mots-clés. 的 repérer 是什麼意思？', hint:'不是修理', a:'找出、定位', aNote:'⚠️ repérer（找出）≠ réparer（修理）。repérer＝在一堆東西裡把它認出來', opts:['找出、定位','修理','重複','取代'] },
  { lesson:24, topic:'vocab-consignes', type:'choose', q:'Associez chaque document à la personne correspondante. 要你做什麼？', hint:'④型題', a:'把每份文件跟對應的人配對', aNote:'associer A à B＝把 A 跟 B 配對；correspondant(e)＝對應的', opts:['把每份文件跟對應的人配對','把文件按順序排好','把文件唸出來','選出最長的文件'] },
  { lesson:24, topic:'vocab-consignes', type:'choose', q:'Cochez la bonne réponse. 的 cocher 是？', hint:'新版全用這個', a:'打勾', aNote:'cocher＝打勾。新版 DELF A2 閱讀全部是打勾的選擇題', opts:['打勾','擦掉','抄寫','朗讀'] },
  { lesson:24, topic:'vocab-consignes', type:'choose', q:'課本章名 S\'ENTRAÎNER 和 SE PRÉPARER 差在哪？', hint:'老師特別分過', a:'s\'entraîner＝實際下去練題；se préparer＝先學方法打底', aNote:'un entraîneur＝教練（同字根）。課本先 SE PRÉPARER 教你怎麼看文件，再 S\'ENTRAÎNER 讓你做仿真題', opts:['s\'entraîner＝實際下去練題；se préparer＝先學方法打底','兩個完全同義','s\'entraîner 是考試、se préparer 是上課','s\'entraîner 是寫作、se préparer 是口說'] },
  { lesson:24, topic:'vocab-consignes', type:'choose', q:'Complétez le tableau. 的 tableau 在這裡是？', hint:'一字多義', a:'表格', aNote:'le tableau 同時是「表格」「畫作」「黑板」。考試指令裡幾乎都是表格', opts:['表格','畫作','黑板','桌子'] },
  { lesson:24, topic:'vocab-consignes', type:'fill', q:'_____ aux questions.（請回答問題）', hint:'répondre 的命令式 vous 形，別忘了介詞', a:'Répondez', aNote:'répondre <b>à</b> qqch → répondez aux questions（à+les＝aux）。指令幾乎都是命令式 vous 形（-ez 結尾）' },
  { lesson:24, topic:'vocab-consignes', type:'choose', q:'une épreuve、un exercice、une activité 三個字在課本裡分別指？', hint:'由大到小', a:'épreuve＝一場考試／exercice＝仿真題／activité＝暖身練習', aNote:'⚠️ épreuve 不是「經驗」（那是 expérience）。DELF 有四場 épreuves', opts:['épreuve＝一場考試／exercice＝仿真題／activité＝暖身練習','三個完全同義','épreuve＝經驗／exercice＝運動／activité＝活動','épreuve＝考卷／exercice＝答案／activité＝分數'] },

  // 時刻兩套說法
  { lesson:24, topic:'numbers-dates-heure', type:'choose', q:'13 h 45 的口語說法是？', hint:'差一刻到兩點', a:'deux heures moins le quart', aNote:'⚠️ 今天糾正過：le quart＝15分鐘、la demie＝30分鐘，兩個不能混。官方版說法是 treize heures quarante-cinq', opts:['deux heures moins le quart','deux heures moins et demie','une heure et demie','deux heures et quart'] },
  { lesson:24, topic:'numbers-dates-heure', type:'choose', q:'13 h 30 要怎麼說？', hint:'老師：到半點就不要用 moins', a:'une heure et demie', aNote:'⚠️⚠️ 老師的鐵律：<b>到了半點就不能用 moins</b>。半點只能用 et demie（往前加），過半之後才改成 moins（moins vingt／moins le quart／moins dix）', opts:['une heure et demie','deux heures moins trente','deux heures moins la demie','une heure moins demie'] },
  { lesson:24, topic:'numbers-dates-heure', type:'choose', q:'什麼時候用 et（et quart / et demie）、什麼時候用 moins？', hint:'以半點為界', a:'過半點之前用 et，過半之後改看下一個整點差多少用 moins；半點本身算 et 那邊', aNote:'⭐ 這樣想就不用每次重算。半點是分界線本身，所以它屬於 et 那一邊', opts:['過半點之前用 et，過半之後改看下一個整點差多少用 moins；半點本身算 et 那邊','隨便哪個都可以','上午用 et、下午用 moins','正式場合用 et、口語用 moins'] },
  { lesson:24, topic:'numbers-dates-heure', type:'choose', q:'考卷、電視節目表、車票上的時間用哪一套說法？', hint:'兩套系統', a:'官方版：24 小時制，直接唸數字（treize heures quarante-cinq）', aNote:'⭐ 兩套都要會：題目寫官方版，老師講話時用口語版。看得懂官方版才找得到答案，聽得懂口語版才聽得懂問題', opts:['官方版：24 小時制，直接唸數字（treize heures quarante-cinq）','口語版：12 小時制加 et quart / moins le quart','兩套都不用','用英文說'] },
  { lesson:24, topic:'numbers-dates-heure', type:'choose', q:'100 歐元的正確說法是？', hint:'今天多加了一個字', a:'cent euros', aNote:'⚠️ 法文的 cent 和 mille 前面都<b>不加 un</b>。180＝cent quatre-vingts', opts:['cent euros','un cent euros','une cent euros','un centaine euros'] },
  { lesson:24, topic:'numbers-dates-heure', type:'fill', q:'15 € par mois，一年是多少？用法文寫出數字：_____ euros par an.', hint:'15×12', a:'cent quatre-vingts|180', aNote:'15×12＝180＝cent quatre-vingts。⭐ 廣告題比價前一定要換成同一個單位' },

  // 廣告與文件詞彙
  { lesson:24, topic:'vocab-annonces', type:'choose', q:'à partir de 8 ans 是什麼意思？', hint:'partir 在這裡不是「離開」', a:'8 歲以上（從 8 歲起）', aNote:'⚠️ 今天卡過。à partir de＝從…起（英文 from），年齡、日期、價格都能用：à partir de 899 €＝899 歐起', opts:['8 歲以上（從 8 歲起）','8 歲以下','剛好 8 歲','8 個人以上'] },
  { lesson:24, topic:'vocab-annonces', type:'choose', q:'un trimestre 和 un semestre 差在哪？', hint:'tri- 和 semi-', a:'trimestre＝一季（一年四個）；semestre＝半年（一年兩個）', aNote:'⚠️ 今天搞反過。tri-＝三個月 → 一年四個 trimestre，但<b>法國的學校一年只跑三個</b>（第四季放假）；台灣學校是 semestre 制', opts:['trimestre＝一季（一年四個）；semestre＝半年（一年兩個）','trimestre＝半年；semestre＝一季','兩個都是半年','trimestre＝一個月；semestre＝一年'] },
  { lesson:24, topic:'vocab-annonces', type:'choose', q:'廣告寫 tout compris 和 hors transport，各是什麼意思？', hint:'一個包含、一個排除', a:'tout compris＝全部包含；hors transport＝不含交通', aNote:'tout compris 的 compris 來自 comprendre（包含），跟第23課的 charges comprises 同一個字。hors＝在…之外', opts:['tout compris＝全部包含；hors transport＝不含交通','tout compris＝含交通；hors transport＝全包','兩個意思一樣','tout compris＝很貴；hors transport＝很便宜'] },
  { lesson:24, topic:'vocab-annonces', type:'choose', q:'Quel est le séjour le moins cher ? 在問什麼？', hint:'廣告題必考', a:'哪個行程最便宜', aNote:'le moins cher＝最便宜的。⚠️ 各家寫的週期不同（par an／par mois／par trimestre），不換成同一個單位就比不出來——這才是這題真正在考的', opts:['哪個行程最便宜','哪個行程最貴','哪個行程最久','哪個行程最累'] },
  { lesson:24, topic:'vocab-annonces', type:'choose', q:'un séjour 在旅遊廣告裡是什麼意思？', hint:'第23課學過另一個意思', a:'行程、一段停留', aNote:'⚠️ 同字兩義：第23課的 le séjour 是「客廳」，旅遊廣告裡是「行程」。來自 séjourner（停留）', opts:['行程、一段停留','客廳','旅館','機票'] },
  { lesson:24, topic:'vocab-annonces', type:'choose', q:'廣告寫 la patinoire，是什麼運動的場地？', hint:'今天答錯的那題', a:'溜冰（sports d\'hiver）', aNote:'⚠️ patin＝冰刀鞋 → patiner＝溜冰 → patinoire＝溜冰場。屬於冬季運動，關鍵字還有 glisser（滑）', opts:['溜冰（sports d\'hiver）','攀岩','游泳','自行車'] },
  { lesson:24, topic:'vocab-annonces', type:'choose', q:'「Peter adore la montagne et grimper」該配哪一份廣告？', hint:'找詞根對得上的字', a:'En route pour les sommets（escalade sans corde）', aNote:'⭐ grimper（動詞：爬）對上 escalade（名詞：攀岩），sommet＝山頂。配對題就是找那一個對得上的字，不是讀懂整份廣告', opts:['En route pour les sommets（escalade sans corde）','Chaussez vos patins（patinoire）','Jetez-vous à l\'eau（nager）','Vive les sensations fortes（vélodrome）'] },
  { lesson:24, topic:'vocab-annonces', type:'choose', q:'餐廳廣告寫 peut accueillir plus de 20 personnes，accueillir 是？', hint:'跟 accueil 同字根', a:'容納、接待', aNote:'⭐ 人數多的關鍵字。l\'accueil＝櫃台／服務處（inscription à l\'accueil＝在櫃台報名）', opts:['容納、接待','拒絕','關門','外送'] },
  { lesson:24, topic:'vocab-annonces', type:'choose', q:'un lieu pour goûter avec ses enfants 的 goûter 是什麼意思？', hint:'老師特別停下來講', a:'下午茶（約四點吃的那一餐）', aNote:'⚠️ goûter 當動詞是「品嘗」，加冠詞的 <b>le goûter</b> 是法國小孩放學後約四點吃的點心。判斷靠上下文有沒有小孩、時間', opts:['下午茶（約四點吃的那一餐）','品嘗菜色','煮飯','買菜'] },
  { lesson:24, topic:'vocab-annonces', type:'choose', q:'le monde entier 和 tout le monde 差在哪？', hint:'差一個 tout', a:'le monde entier＝全世界；tout le monde＝每個人', aNote:'⚠️ 餐廳廣告 des plats du monde entier＝來自全世界的菜。差一個字意思差很多', opts:['le monde entier＝全世界；tout le monde＝每個人','兩個一樣','le monde entier＝每個人；tout le monde＝全世界','都是指法國'] },
  { lesson:24, topic:'vocab-annonces', type:'choose', q:'素食者（végétarienne）一定不能配哪一份餐廳廣告？', hint:'看食材', a:'des plats à base de viande', aNote:'⭐ à base de＝以…為基底。看到 viande（肉）就直接排除——這是刪去法最好用的地方', opts:['des plats à base de viande','une cuisine méditerranéenne','un endroit sympa pour goûter','une connexion à Internet gratuite'] },
  { lesson:24, topic:'vocab-annonces', type:'fill', q:'廣告寫 Départ possible _____ 21/02 _____ 13/03（可出發日期從2/21到3/13）', hint:'從…到…的介詞組', a:'du|au|du...au', aNote:'du 21/02 au 13/03。⭐ 「你某某日期有空可以選哪個」就是在考這一行' },
  // ══ 第25課：比較級・si 條件句・家具與街區 ══════════════
  { lesson:25, topic:'comparaison', type:'choose', q:'比較「動詞」時，同等級（一樣多）要用哪個字？', hint:'不是 aussi', a:'autant', aNote:'⚠️ 動詞與名詞的同等用 <b>autant</b>；aussi 只配副詞與形容詞。Les jeunes déménagent autant que les personnes âgées.', opts:['autant','aussi','même','pareil'] },
  { lesson:25, topic:'comparaison', type:'fill', q:'Il y a _____ chambres que dans notre maison.（房間數一樣多）', hint:'名詞比較別忘了介詞', a:'autant de', aNote:'名詞前一定要加 <b>de</b>：plus de／moins de／autant de。因為那是在講數量，跟 beaucoup de 同一條規則' },
  { lesson:25, topic:'comparaison', type:'choose', q:'比較形容詞時，比較詞放哪裡？', hint:'看課本例句', a:'夾在中間：moins ＋ 形容詞 ＋ que', aNote:'La chambre de Tom est <b>moins grande que</b> la chambre d\'Anna。副詞也一樣夾中間', opts:['夾在中間：moins ＋ 形容詞 ＋ que','放句尾','放句首','放動詞後面'] },
  { lesson:25, topic:'comparaison', type:'choose', q:'比較「動詞」時，比較詞放哪裡？', hint:'跟形容詞不一樣', a:'動詞先出現，比較詞跟在後面', aNote:'Les jeunes <b>déménagent moins que</b> les personnes âgées。動詞沒辦法被夾住，所以只能跟在後面', opts:['動詞先出現，比較詞跟在後面','夾在動詞中間','放句首','跟形容詞一樣夾中間'] },
  { lesson:25, topic:'comparaison', type:'fill', q:'bon 的「優等比較級」是？（⛔ 不是 plus bon）', hint:'不規則', a:'meilleur|meilleure', aNote:'bon → <b>meilleur</b>（形容詞，要配合性數）。Mon four n\'est pas très bon, je dois acheter un meilleur four.' },
  { lesson:25, topic:'comparaison', type:'fill', q:'bien 的「優等比較級」是？（⛔ 不是 plus bien）', hint:'不規則', a:'mieux', aNote:'bien → <b>mieux</b>（副詞，不變）。On vit bien en ville, mais on vit mieux à la campagne.' },
  { lesson:25, topic:'comparaison', type:'choose', q:'J\'aime _____ ce quartier.（我更喜歡這一區）', hint:'aimer 是什麼詞類', a:'mieux', aNote:'⚠️ aimer 是<b>動詞</b> → 配副詞 mieux。meilleur 是形容詞，只能修飾名詞。課本 Entraînement 有考這題', opts:['mieux','meilleur','meilleure','plus bon'] },
  { lesson:25, topic:'comparaison', type:'choose', q:'mauvais 和 mal 的優等比較級是？', hint:'兩個共用', a:'pire（也可以說 plus mauvais / plus mal）', aNote:'mauvais → pire／plus mauvais；mal → pire／plus mal。兩個都可以，不像 bon/bien 只有一種', opts:['pire（也可以說 plus mauvais / plus mal）','只能說 plus mauvais，pire 是錯的','meilleur','moins bon'] },
  { lesson:25, topic:'comparaison', type:'choose', q:'不規則比較級只有哪一格不規則？', hint:'三個等級裡', a:'只有「優等」那一格', aNote:'⭐ moins bon／aussi bon、moins bien／aussi bien 全部照原形放。真正要背的只有 meilleur／mieux／pire', opts:['只有「優等」那一格','三格都不規則','只有「劣等」','只有「同等」'] },
  { lesson:25, topic:'comparaison', type:'choose', q:'bon 跟 bien 怎麼分？', hint:'老師花最久講這組', a:'bon 講東西品質與食物；bien 講感覺與活動', aNote:'C\'est bon !（好吃）／Je me sens bien.（我感覺很好）。⛔ 不能說 je me sens bon', opts:['bon 講東西品質與食物；bien 講感覺與活動','完全同義','bon 是形容詞、bien 是名詞','bon 用在人、bien 用在物'] },
  { lesson:25, topic:'comparaison', type:'choose', q:'把這三個排出強度高低：j\'aime／j\'aime bien／j\'aime beaucoup', hint:'反直覺', a:'j\'aime bien ＜ j\'aime ＜ j\'aime beaucoup', aNote:'⚠️ 加了 bien 反而<b>變弱</b>（喜歡，但沒到愛）。老師特別提醒這點違反直覺', opts:['j\'aime bien ＜ j\'aime ＜ j\'aime beaucoup','j\'aime ＜ j\'aime bien ＜ j\'aime beaucoup','三個一樣強','j\'aime beaucoup ＜ j\'aime ＜ j\'aime bien'] },
  { lesson:25, topic:'comparaison', type:'choose', q:'Tant pis ! 是什麼意思？它保留了什麼古語？', hint:'老師講過的慣用語', a:'「算了」——保留了古比較級 pis', aNote:'古早的比較級 <b>pis</b> 現在只活在這個慣用語裡，其他地方一律用 pire', opts:['「算了」——保留了古比較級 pis','「太好了」','「更糟」','「一樣」'] },
  { lesson:25, topic:'comparaison', type:'trans', q:'房間數跟我們家一樣多。', hint:'autant de ... que', a:'Il y a autant de chambres que dans notre maison.', aNote:'名詞的同等比較有兩個陷阱：①用 <b>autant</b> 不是 aussi——aussi 只配形容詞與副詞；②名詞前一定要加 <b>de</b>（plus de／moins de／autant de），跟 beaucoup de 同一條規則。', askClaude:true },

  { lesson:25, topic:'condition-si', type:'choose', q:'si 條件句裡，「條件」那半用什麼時態？', hint:'A2 只有一種', a:'現在式', aNote:'⚠️ si 之後永遠不用未來式。「如果明天下雨」是 s\'il pleut demain，不是 s\'il pleuvra', opts:['現在式','未來式','未完成式','命令式'] },
  { lesson:25, topic:'condition-si', type:'choose', q:'「結果」那半可以用哪兩種？', hint:'課本 Formation 表', a:'現在式（陳述常態）或命令式（語氣更強）', aNote:'Si je veux lire, je vais à la bibliothèque.（常態）／Si tu es malade, va à la pharmacie !（勸告）', opts:['現在式（陳述常態）或命令式（語氣更強）','只能用現在式','只能用未來式','現在式或未完成式'] },
  { lesson:25, topic:'condition-si', type:'fill', q:'_____ pleut, on peut aller au Centre de la BD.（如果下雨）', hint:'si 碰到 il 會怎樣', a:"S'il|s'il", aNote:'si ＋ il → <b>s\'il</b>。因為 si 和 il 都是 i 開頭唸不順，純粹是發音問題不是文法' },
  { lesson:25, topic:'condition-si', type:'choose', q:'si 在哪些字前面會縮寫成 s\'？', hint:'比你想的少', a:'只有 il 和 ils', aNote:'⚠️⚠️ si on、si elle、si tu 都<b>不</b>縮寫。老師說很多法國人自己也會寫錯成 si il', opts:['只有 il 和 ils','所有母音開頭的字','il、elle、on 都會','ils 和 elles'] },
  { lesson:25, topic:'condition-si', type:'choose', q:'Si tu es malade, va à la pharmacie ! 的 va 是什麼語氣？為什麼比較強？', hint:'沒有主詞', a:'命令式——沒有主詞，直接把動作丟給對方', aNote:'對照 Si tu es malade, tu vas à la pharmacie（陳述）。命令式讓它變成勸告或指示', opts:['命令式——沒有主詞，直接把動作丟給對方','未來式','條件式','虛擬式'] },
  { lesson:25, topic:'condition-si', type:'fill', q:'Si tes voisins sont bruyants, _____ d\'appartement !（就換公寓吧，changer 的 tu 命令式）', hint:'-ER 動詞的 tu 命令式要去掉 s', a:'change', aNote:'-ER 動詞的 tu 命令式去掉字尾 s：tu changes → change !' },
  { lesson:25, topic:'condition-si', type:'trans', q:'如果你有空，可以來我家一趟。', hint:'si / disponible / passer', a:'Si tu es disponible, tu peux passer chez moi.', aNote:'<b>si ＋ 現在式，結果也用現在式</b>。⚠️ si 只在 il／ils 前面縮寫（S\'il fait très chaud, on met la clim.），<b>si tu／si on／si elle 都不縮</b>。passer＝順道過去一趟，不是久留。', askClaude:true },

  { lesson:25, topic:'vocab-meubles', type:'choose', q:'沙發有三種說法，是哪三個？', hint:'課本方框', a:'le canapé = le sofa = le divan', aNote:'⭐ 三個同義，老師說 canapé 最常用。另有 le canapé-lit＝沙發床', opts:['le canapé = le sofa = le divan','le fauteuil = la chaise = le tabouret','le placard = l\'étagère = le rangement','le lit = la couette = le coussin'] },
  { lesson:25, topic:'vocab-meubles', type:'choose', q:'l\'étagère（層架）跟哪個字同字根？', hint:'因為它有很多層', a:'l\'étage（樓層）', aNote:'⭐ 架子有很多「層」，就像大樓有很多「樓」。第23課學過 étage', opts:["l'étage（樓層）",'la table（桌子）',"l'étoile（星星）",'le tabouret（凳子）'] },
  { lesson:25, topic:'vocab-meubles', type:'choose', q:'On dort avec pour ne pas avoir froid la nuit. 說的是哪一樣？', hint:'課本 Exercice 3', a:'la couette（羽絨被）', aNote:'其他三題：le frigo（放肉起司果汁）、le four（做蛋糕）、le lave-linge（洗衣服）', opts:['la couette（羽絨被）','le rideau（窗簾）','le coussin（抱枕）','le placard（櫥櫃）'] },
  { lesson:25, topic:'vocab-meubles', type:'choose', q:'le coussin 跟 le cousin 差在哪？', hint:'發音跟意思都差', a:'coussin＝抱枕[s音]；cousin＝表堂兄弟[z音]', aNote:'⚠️ 兩個 s 才是抱枕。單一個 s 夾在母音之間會唸成 [z]', opts:['coussin＝抱枕[s音]；cousin＝表堂兄弟[z音]','完全同義','coussin 是人、cousin 是物','只差在陰陽性'] },
  { lesson:25, topic:'vocab-meubles', type:'fill', q:'家電的統稱是 les appareils _____（電＋家用）', hint:'électro + ménager', a:'électroménagers|électroménager', aNote:'⚠️ ménager 來自 le ménage——第23課的 faire le ménage（打掃）同字根' },
  { lesson:25, topic:'vocab-meubles', type:'choose', q:'洗衣機有兩種說法，是？', hint:'課本方框', a:'le lave-linge = la machine à laver', aNote:'le linge＝衣物布品；laver＝洗。洗碗機是 le lave-vaisselle', opts:['le lave-linge = la machine à laver','le lave-vaisselle = le lavabo',"l'évier = le lavabo",'le frigo = le four'] },
  { lesson:25, topic:'vocab-meubles', type:'choose', q:'l\'évier 跟 le lavabo 差在哪？', hint:'在不同房間', a:'évier 在廚房、lavabo 在浴室', aNote:'兩個都是水槽，差在位置', opts:['évier 在廚房、lavabo 在浴室','évier 在浴室、lavabo 在廚房','完全同義','évier 是浴缸'] },
  { lesson:25, topic:'vocab-meubles', type:'choose', q:'冷氣的口語說法是？', hint:'完整字很長', a:'la clim（climatisation 的簡稱）', aNote:'暖氣是 le chauffage（來自 chaud）。S\'il fait froid, on met le chauffage.', opts:['la clim（climatisation 的簡稱）','le chauffage','le climat','le froid'] },

  { lesson:25, topic:'vocab-quartier', type:'choose', q:'animé(e) 的同義詞是？（課本 Associez les synonymes）', hint:'有生命的', a:'vivant(e)', aNote:'⭐ 兩個都是「熱鬧、有活力」。老師補充反面：<b>mourant</b>（正在沒落的）', opts:['vivant(e)','tranquille','ancien(ne)','chic'] },
  { lesson:25, topic:'vocab-quartier', type:'choose', q:'老師說 populaire 有兩個意思，是哪兩個？', hint:'他說「這個字我們之前看過」', a:'①受歡迎的 ②平民的、不貴的', aNote:'⚠️ un endroit populaire＝平價的地方，不是「很紅的地方」。對照 chic＝高級的（也就是貴）', opts:['①受歡迎的 ②平民的、不貴的','①受歡迎的 ②高級的','①人多的 ②安靜的','只有「受歡迎」一個意思'] },
  { lesson:25, topic:'vocab-quartier', type:'choose', q:'les espaces verts 一定是公園嗎？', hint:'老師特別澄清', a:'不一定，一小塊有草有樹的地方也算', aNote:'⭐ le parc 才是真正的大公園。espaces verts 也是一種職業（修剪綠地）', opts:['不一定，一小塊有草有樹的地方也算','一定要是公園','一定要有遊樂設施','只有市政府管的才算'] },
  { lesson:25, topic:'vocab-quartier', type:'choose', q:'un quartier commerçant 的反面通常是？', hint:'老師舉的對照', a:'un quartier calme', aNote:'commerçant＝商店多的（也就是熱鬧）。un commerçant 當名詞是「店主」', opts:['un quartier calme','un quartier chic','un quartier historique','un quartier populaire'] },
  { lesson:25, topic:'vocab-quartier', type:'choose', q:'老師說法國市中心「de plus en plus mourants」是什麼意思？', hint:'vivant 的反面', a:'越來越沒落——小店一間間關掉', aNote:'mourant＝正在死去的（但還沒死）。因為大家都去大賣場，市中心小商家撐不住', opts:['越來越沒落——小店一間間關掉','越來越熱鬧','越來越貴','越來越安靜舒適'] },
  { lesson:25, topic:'vocab-quartier', type:'choose', q:'別人問 Ça va ? 時回 Tranquille 是什麼意思？', hint:'老師教的口語', a:'還行、很chill', aNote:'tranquille＝安靜的、悠閒的。也可以說 je suis tranquille（我很自在）', opts:['還行、很chill','我很忙','我不太好','我很吵'] },
  { lesson:25, topic:'vocab-quartier', type:'choose', q:'表達失望的三個說法是？', hint:'課本 Pour exprimer sa déception', a:'Zut ! / Mince ! / C\'est dommage.', aNote:'⚠️ zut 和 mince 都是 <b>merde</b> 的委婉版。mince 另一個意思是「瘦的」', opts:["Zut ! / Mince ! / C'est dommage.","Courage ! / Ça va aller. / C'est pas grave.","C'est vrai ! / C'est ça. / C'est clair !",'Bien ! / Bon ! / Mieux !'] },
  { lesson:25, topic:'vocab-quartier', type:'choose', q:'口語的 T\'inquiète. 是什麼意思？為什麼奇怪？', hint:'字面跟意思相反', a:'「別擔心」——ne 和 pas 都被省略，字面看起來卻像肯定', aNote:'完整是 Ne t\'inquiète pas → 口語 T\'inquiète pas → 更口語 T\'inquiète。⚠️ 寫作文不能這樣寫', opts:['「別擔心」——ne 和 pas 都被省略，字面看起來卻像肯定','「你擔心吧」','「我很擔心」','「別煩我」'] },
  { lesson:25, topic:'vocab-quartier', type:'choose', q:'Ça m\'arrange. 是什麼意思？', hint:'約時間時很好用', a:'這樣對我方便', aNote:'⭐ 否定：Ça ne m\'arrange pas。<b>si ça t\'arrange</b>＝如果你方便的話', opts:['這樣對我方便','這樣我很生氣','幫我整理一下','這樣比較貴'] },
  { lesson:25, topic:'vocab-quartier', type:'trans', q:'會沒事的，別擔心。', hint:'兩句安慰語連用', a:"Ça va aller, t'inquiète.", aNote:'兩句安慰語常連在一起用。Ça va aller 字面是「事情會走下去」；<b>T\'inquiète</b> 是 Ne t\'inquiète pas 的超口語版，ne 和 pas 都省掉——⚠️ 字面看起來像肯定「你擔心」，意思仍然是別擔心。老師：口語很多人這樣講，<b>但寫作文不能這樣寫</b>。', askClaude:true },

  // ── 第26課（A2・比較的第二層／tout vs chaque／外貌／性格）──
  { lesson:26, topic:'comparaison', type:'choose', q:'要說「他的鼻子跟他爸一樣」，用哪個結構？', hint:'名詞＋相似', a:'le même nez que', aNote:'⭐ 講<b>相似</b>用 <b>le／la／les même(s) ＋ 名詞 ＋ que</b>：Il a le même nez que son père.', opts:['le même nez que','aussi nez que','autant de nez que','pareil nez que'] },
  { lesson:26, topic:'comparaison', type:'fill', q:'Elle a _____ yeux que sa sœur.（跟姊姊一樣的眼睛）', hint:'yeux 是複數', a:'les mêmes', aNote:'même 要跟名詞配合：le même／la même／<b>les mêmes</b>。yeux 是複數所以加 s' },
  { lesson:26, topic:'comparaison', type:'fill', q:'Il achète _____ vêtements que moi.（跟我一樣多的衣服）', hint:'數量相等＋名詞', a:'autant de', aNote:'⭐ 數量相等＋名詞＝<b>autant de</b>。跟第25課同一條規則：講數量就會冒出 de' },
  { lesson:26, topic:'comparaison', type:'choose', q:'Il s\'intéresse ...... à la mode qu\'au sport.（一樣有興趣）', hint:'s\'intéresser 是什麼詞類？', a:'autant', aNote:'⭐ <b>動詞</b>比較用 autant，而且放在<b>動詞後面</b>。aussi 只配形容詞與副詞', opts:['autant','aussi','le même','pareil'] },
  { lesson:26, topic:'comparaison', type:'choose', q:'Mathieu n\'est pas ...... grand que son père.', hint:'grand 是什麼詞類？', a:'aussi', aNote:'grand 是<b>形容詞</b> → aussi。課本 Entraînement 2 的 a', opts:['aussi','autant','autant de','même'] },
  { lesson:26, topic:'comparaison', type:'choose', q:'Ils parlent ...... l\'un que l\'autre.', hint:'parler 是什麼詞類？', a:'autant', aNote:'parler 是<b>動詞</b> → autant。⭐ <b>l\'un que l\'autre</b>＝不指名的比較：兩個人一樣多話', opts:['autant','aussi','autant de','pareils'] },
  { lesson:26, topic:'comparaison', type:'choose', q:'Je ne fais pas ...... de sport que ma sœur.', hint:'後面已經有 de 了', a:'autant', aNote:'⚠️ 後面是<b>名詞</b> sport → autant de。這題的陷阱是 de 已經印在題目裡，看到 de 就要想到 autant', opts:['autant','aussi','même','pareil'] },
  { lesson:26, topic:'comparaison', type:'trans', q:'這兩件洋裝一樣。', hint:'pareil 要配合', a:'Ces deux robes sont pareilles.', aNote:'⭐ <b>pareil</b> 是形容詞＝égal、identique，<b>要跟名詞配合性數</b>：robes 陰性複數 → pareilles。⚠️ pareil 後面<b>不接 que</b>' },
  { lesson:26, topic:'comparaison', type:'choose', q:'pareil 跟 le même 最大的差別是？', hint:'看句子結構', a:'pareil 後面不接 que，le même 要接 que', aNote:'<b>Ces deux robes sont pareilles.</b>（不接 que）／<b>Il a le même nez que son père.</b>（要接 que）。兩個都要跟名詞配合', opts:['pareil 後面不接 que，le même 要接 que','pareil 不用配合性數','le même 只能講人','兩個完全一樣沒差別'] },
  { lesson:26, topic:'comparaison', type:'fill', q:'Il a _____ visage rond que Bonaparte.（跟波拿巴一樣的圓臉）', hint:'課文B的句子', a:'le même', aNote:'visage 是陽性單數 → le même。這句就是課本把兩篇課文排在一起的原因' },
  { lesson:26, topic:'comparaison', type:'choose', q:'「Il ne ressemble plus autant qu\'avant à l\'empereur.」是什麼意思？', hint:'三個東西疊在一起', a:'他不再像以前那麼像皇帝了', aNote:'⭐ <b>ne … plus</b>（不再）＋ <b>autant que</b>（一樣多）＋ <b>avant</b>（以前）。三層疊起來的句子，考試常見', opts:['他不再像以前那麼像皇帝了','他比以前更像皇帝','他從來都不像皇帝','他跟皇帝一樣老'] },
  { lesson:26, topic:'comparaison', type:'choose', q:'課文說替身「aussi grand que l\'empereur」，但拿破崙其實很矮。為什麼不說 aussi petit ？', hint:'語氣問題', a:'aussi petit que 聽起來失禮，aussi grand que 只表示「一樣高」', aNote:'⚠️ 老師特別講的語用：比較身高一律用 <b>aussi grand que</b>，它不預設「高」，只表示身高相同。<b>à 2 cm près</b>＝誤差2公分', opts:['aussi petit que 聽起來失禮，aussi grand que 只表示「一樣高」','文法上不能用 petit','petit 沒有比較級','因為替身比較高'] },

  { lesson:26, topic:'tout-chaque', type:'choose', q:'chaque 後面接單數還是複數？', hint:'永遠只有一種', a:'永遠接單數，而且 chaque 本身不變化', aNote:'⭐ <b>Chaque qualité peut cacher un défaut.</b> 就算在講很多優點，chaque 後面永遠單數', opts:['永遠接單數，而且 chaque 本身不變化','接複數','看名詞陰陽性決定','兩種都可以'] },
  { lesson:26, topic:'tout-chaque', type:'fill', q:'_____ le monde a des défauts.（每個人都有缺點）', hint:'le monde 陽性單數', a:'Tout', aNote:'le monde 是陽性單數 → tout。<b>tout le monde</b>＝大家（動詞用單數：a 不是 ont）' },
  { lesson:26, topic:'tout-chaque', type:'fill', q:'_____ les qualités ont un opposé positif.（所有優點都有正面的另一面）', hint:'une qualité 是陰性', a:'Toutes', aNote:'qualité 陰性複數 → <b>toutes</b>。tout 要跟名詞配合性數' },
  { lesson:26, topic:'tout-chaque', type:'fill', q:'Nous avons passé _____ l\'heure à parler.（我們整整講了一小時）', hint:'une heure 是陰性單數', a:'toute', aNote:'heure 陰性單數 → toute。⭐ <b>passer ＋ 時間 ＋ à ＋ 原形</b>＝花時間做某事' },
  { lesson:26, topic:'tout-chaque', type:'fill', q:'Le coach donne _____ ces conseils sur son site.（教練把所有建議都放在網站上）', hint:'un conseil 是陽性', a:'tous', aNote:'conseil 陽性複數 → tous。⚠️ tout 跟 tous <b>唸起來一樣</b>，只能靠後面的名詞判斷怎麼寫' },
  { lesson:26, topic:'tout-chaque', type:'choose', q:'「Tout va bien.」的 tout 為什麼不變化？', hint:'它在這裡不是限定詞', a:'它是中性代名詞＝toutes les choses（所有東西）', aNote:'⭐ 第三種用法：tout 當<b>中性代名詞</b>時永遠寫 t-o-u-t，不跟任何東西配合。同型：Tout ira bien.（一切都會好的）', opts:['它是中性代名詞＝toutes les choses（所有東西）','因為 aller 是不規則動詞','因為後面沒有名詞就不用變','這是例外要硬背'] },
  { lesson:26, topic:'tout-chaque', type:'choose', q:'「我每三個月買一次衣服」怎麼說？', hint:'每隔多久一次', a:'tous les trois mois', aNote:'⭐ <b>tous les ＋ 數字 ＋ 時間</b>＝每隔多久一次。⚠️ 這個結構不能換成 chaque', opts:['tous les trois mois','chaque trois mois','tout les trois mois','toute les trois mois'] },
  { lesson:26, topic:'tout-chaque', type:'trans', q:'我每天煮飯。', hint:'兩種說法都對', a:'Je cuisine tous les jours.|Je cuisine chaque jour.', aNote:'⭐ 這個情況 <b>tous les jours ＝ chaque jour</b>，兩個都對。差別只在 chaque 後面要單數' },
  { lesson:26, topic:'tout-chaque', type:'choose', q:'「我對家裡每個人都會稱讚」——為什麼不能說 chaque famille ？', hint:'老師當堂糾正的', a:'chaque famille 是「每個家庭」，要說 chaque membre de ma famille', aNote:'⚠️ chaque 是<b>一個一個</b>看，所以要指到「人」這個單位：<b>Je fais des compliments à chaque membre de ma famille.</b>', opts:['chaque famille 是「每個家庭」，要說 chaque membre de ma famille','因為 famille 是陰性','因為要用 toute la famille 才對','chaque 不能放句尾'] },
  { lesson:26, topic:'tout-chaque', type:'fill', q:'Je vais voir ma famille _____ les semaines.（我每週去看家人）', hint:'une semaine 是陰性', a:'toutes', aNote:'semaine 陰性複數 → toutes les semaines ＝ chaque semaine' },

  { lesson:26, topic:'vocab-apparence', type:'choose', q:'chauve 跟 dégarni 差在哪？', hint:'頭髮還剩多少', a:'chauve 是全禿或剃光，dégarni 是頂上稀疏、兩側還有', aNote:'⚠️ 老師特地分開這兩個字。課文的 Franck Samson 是 <b>barbu et dégarni</b>（有鬍子、頭髮稀疏）', opts:['chauve 是全禿或剃光，dégarni 是頂上稀疏、兩側還有','完全一樣','chauve 講女生，dégarni 講男生','dégarni 是染髮'] },
  { lesson:26, topic:'vocab-apparence', type:'choose', q:'sec 跟 mince 的差別？', hint:'Owen 當堂問的', a:'mince 是細瘦；sec 是沒有多餘脂肪，可以同時很壯', aNote:'⭐ 證據就是 <b>musclé et sec</b> 這組能並存。課本把兩者畫等號，但老師說不完全一樣', opts:['mince 是細瘦；sec 是沒有多餘脂肪，可以同時很壯','完全一樣','sec 是形容頭髮','mince 只能講女生'] },
  { lesson:26, topic:'vocab-apparence', type:'choose', q:'要問對方穿幾號，法文怎麼問？', hint:'老師給的固定問法', a:'Tu fais quelle taille ?', aNote:'⭐ 回答只要說 <b>Je fais du 44.</b>——不用重複 taille', opts:['Tu fais quelle taille ?','Tu es quelle taille ?','Quelle est ta grande ?','Tu mesures quelle taille de vêtement ?'] },
  { lesson:26, topic:'vocab-apparence', type:'fill', q:'Il _____ 1,55 m.（他身高155公分）', hint:'身高用哪個動詞', a:'mesure', aNote:'身高用 <b>mesurer</b>，唸 un mètre cinquante-cinq。⚠️ 不是 il est 1,55 m' },
  { lesson:26, topic:'vocab-apparence', type:'choose', q:'avoir bonne mine 是什麼意思？', hint:'mine 指的是臉', a:'氣色好、看起來狀態不錯', aNote:'⭐ <b>la mine</b>＝臉色。反面 <b>avoir mauvaise mine</b>＝氣色差，看得出來有狀況', opts:['氣色好、看起來狀態不錯','身材好','心情好但很累','長得好看'] },
  { lesson:26, topic:'vocab-apparence', type:'choose', q:'「Le vêtement te rend beau.」跟「Tu rends le vêtement beau.」差在哪？', hint:'誰是主詞', a:'第一句是衣服讓你好看，第二句是你讓衣服好看', aNote:'⭐⭐ 老師特地示範的反向。<b>rendre ＋ 形容詞</b>＝使…變得…，<b>主詞決定誰讓誰變好看</b>', opts:['第一句是衣服讓你好看，第二句是你讓衣服好看','完全一樣','第二句文法錯誤','第一句是過去式'] },
  { lesson:26, topic:'vocab-apparence', type:'trans', q:'他對自己不自在。', hint:'整塊表達', a:'Il ne se sent pas bien dans sa peau.', aNote:'⭐ <b>se sentir bien dans sa peau</b>＝字面「在自己的皮膚裡感覺舒服」＝自我接納。整塊記，不要拆開翻' },
  { lesson:26, topic:'vocab-apparence', type:'choose', q:'les canons de beauté 是什麼？', hint:'課文A的字', a:'審美標準', aNote:'＝<b>les critères de beauté</b>，兩個說法一樣。canon 在這裡不是「大砲」', opts:['審美標準','美容產品','模特兒的身高','時尚雜誌'] },

  { lesson:26, topic:'vocab-caractere', type:'choose', q:'une qualité 的相反詞是？', hint:'課本標題就有', a:'un défaut', aNote:'⭐ 課本標題 <b>Les qualités de vos défauts</b>＝你的缺點裡的優點。另一組講法：un point fort ↔ un point faible', opts:['un défaut','une force','un tact','un désordre'] },
  { lesson:26, topic:'vocab-caractere', type:'choose', q:'sans gêne 是什麼意思？', hint:'gêner＝打擾', a:'沒分寸、不介意打擾別人', aNote:'⚠️ <b>gêner</b>＝打擾 → sans gêne＝完全不在意會不會打擾到人。是負面的', opts:['沒分寸、不介意打擾別人','很害羞','很大方','不緊張'] },
  { lesson:26, topic:'vocab-caractere', type:'choose', q:'supporter 在法文是什麼意思？', hint:'不是英文那個意思', a:'忍受', aNote:'⚠️ 假朋友：法文 <b>supporter</b>＝忍受（Vous ne supportez pas le bazar ?），不是英文的 support（支持）', opts:['忍受','支持','支撐重量','贊助'] },
  { lesson:26, topic:'vocab-caractere', type:'choose', q:'le bazar 在課文裡是什麼意思？', hint:'跟 désordre 同一組', a:'一團亂', aNote:'老師：這個字來自那種很雜亂的市集，後來拿來指「亂七八糟」。同組：<b>le désordre</b>（亂）↔ l\'ordre（秩序）', opts:['一團亂','市場','便宜貨','吵鬧聲'] },
  { lesson:26, topic:'vocab-caractere', type:'fill', q:'Vous êtes quelqu\'un _____ discret et réfléchi.（你是個低調又深思熟慮的人）', hint:'quelqu\'un 後面接形容詞要加什麼', a:'de', aNote:'⚠️ <b>quelqu\'un de ＋ 形容詞</b>，中間一定要 de。réfléchi（想清楚才說）是 spontané（直接反應）的相反' },
  { lesson:26, topic:'vocab-caractere', type:'trans', q:'你可以信賴我。', hint:'compter sur', a:'Tu peux compter sur moi.', aNote:'⭐ <b>compter sur qqn</b>＝依靠、信賴某人。課文：On peut compter sur votre prudence et votre tact.' },
  { lesson:26, topic:'vocab-caractere', type:'choose', q:'「Ça vous fait gagner un temps fou.」的 gagner 為什麼是「贏」？', hint:'法文的說法習慣', a:'法文說「贏時間」不說「省時間」', aNote:'⭐ <b>gagner du temps</b>＝省時間。<b>un temps fou</b>＝超多時間（fou 字面是瘋狂）', opts:['法文說「贏時間」不說「省時間」','因為是比賽','gagner 在這裡是賺錢','這是打錯字'] },
  { lesson:26, topic:'vocab-caractere', type:'choose', q:'être doué pour 是什麼意思？', hint:'課文形容外向的人', a:'有…的天分', aNote:'⭐ Vous êtes doué(e) pour la communication.＝你有溝通的天分。老師岔題講法國球員 Doué 的姓就是這個字', opts:['有…的天分','為…付出','適合…的工作','喜歡…'] },
  { lesson:26, topic:'vocab-caractere', type:'choose', q:'課文C的主張是什麼？', hint:'全文一句話', a:'每個缺點換個角度看都是優點', aNote:'⭐ <b>Chaque faiblesse est aussi une force.</b>⚠️ 這裡的 aussi ＝「也」，不是比較級的 aussi', opts:['每個缺點換個角度看都是優點','完美的人才會成功','缺點要努力改掉','性格是天生的'] },
];
// ── ID 函數 ──
function qId(q) {
  // Stable ID from question text (first 30 chars, base64-ish)
  return 'q_' + q.q.slice(0, 30).replace(/[^a-zA-Z0-9一-鿿]/g, '_');
}

// ── ⚡ 快速測驗題庫（247 題：動詞 · 所有格 · 冠詞 · 形容詞一致 · 國籍 · 介係詞 · 單複數 · 顏色 · 進階）────
const AGREE_BANK = [
  // ── être（10）──
  { q:'Je ___ taïwanais.',           opts:['suis','es','est','sont'],           a:'suis',   note:'être : je → suis' },
  { q:'Tu ___ étudiant(e) ?',        opts:['suis','es','est','sommes'],         a:'es',     note:'être : tu → es' },
  { q:'Elle ___ professeure.',       opts:['suis','es','est','sont'],           a:'est',    note:'être : il/elle → est' },
  { q:'Nous ___ à Taipei.',          opts:['sommes','êtes','sont','suis'],      a:'sommes', note:'être : nous → sommes' },
  { q:'Ils ___ canadiens.',          opts:['est','sont','sommes','êtes'],       a:'sont',   note:'être : ils/elles → sont' },
  { q:'Vous ___ professeurs ?',      opts:['est','sont','êtes','sommes'],       a:'êtes',   note:'être : vous → êtes' },
  { q:'On ___ en retard.',           opts:['suis','es','est','sommes'],         a:'est',    note:'on → même conjugaison que il/elle → est' },
  { q:'Il ___ médecin.',             opts:['suis','es','est','sont'],           a:'est',    note:'être : il → est' },
  { q:'Elles ___ françaises.',       opts:['est','sont','sommes','êtes'],       a:'sont',   note:'être : elles → sont' },
  { q:'Ma sœur ___ coiffeuse.',      opts:['suis','es','est','sont'],           a:'est',    note:'ma sœur = elle → est' },

  // ── avoir（10）──
  { q:"J'___ 25 ans.",               opts:['ai','as','a','avons'],              a:'ai',     note:"avoir : j'ai（年齡用 avoir，不用 être）" },
  { q:'Elle ___ deux enfants.',      opts:['ai','as','a','ont'],                a:'a',      note:'avoir : il/elle → a' },
  { q:'Vous ___ quel âge ?',         opts:['avons','avez','ont','as'],          a:'avez',   note:'avoir : vous → avez' },
  { q:'Nous ___ faim.',              opts:['ai','as','avons','ont'],             a:'avons',  note:'avoir : nous → avons（avoir faim = 餓）' },
  { q:'Tu ___ soif ?',               opts:['ai','as','a','avons'],              a:'as',     note:'avoir : tu → as（avoir soif = 渴）' },
  { q:"J'___ froid.",                opts:['ai','as','a','avons'],              a:'ai',     note:"avoir : j'ai（avoir froid = 冷）" },
  { q:'Il ___ un frère.',            opts:['ai','as','a','ont'],                a:'a',      note:'avoir : il → a' },
  { q:'Elles ___ une voiture rouge.',opts:['ai','as','a','ont'],                a:'ont',    note:'avoir : elles → ont' },
  { q:"On ___ besoin d'aide.",       opts:['ai','as','a','avons'],              a:'a',      note:'on → même forme que il/elle → a' },
  { q:'Ils ___ beaucoup de travail.',opts:['avons','avez','ont','as'],          a:'ont',    note:'avoir : ils → ont' },

  // ── -er 動詞（20）──
  { q:'Il ___ à Paris.  (habiter)',          opts:['habite','habites','habitons','habitez'],    a:'habite',    note:'habiter : il → habite' },
  { q:'Nous ___ ensemble.  (manger)',        opts:['mangons','mangeons','mangez','mangent'],    a:'mangeons',  note:'manger : nous → mangeons（加 e 保持 /ʒ/ 軟音）' },
  { q:'Elles ___ le français.  (parler)',    opts:['parle','parles','parlons','parlent'],       a:'parlent',   note:'parler : elles → parlent（-ent 不發音）' },
  { q:'Tu ___ à la piscine ?  (nager)',      opts:['nageons','nages','nagez','nage'],           a:'nages',     note:'nager : tu → nages' },
  { q:'Vous ___ le tennis ?  (aimer)',       opts:['aime','aimes','aimez','aiment'],            a:'aimez',     note:'aimer : vous → aimez' },
  { q:'Elle ___ les chats.  (aimer)',        opts:['aime','aimes','aimons','aiment'],           a:'aime',      note:'aimer : elle → aime' },
  { q:'Ils ___ la pizza.  (aimer)',          opts:['aime','aimes','aimons','aiment'],           a:'aiment',    note:'aimer : ils → aiment（-ent 不發音）' },
  { q:'Je ___ le français.  (parler)',       opts:['parle','parles','parlons','parlez'],        a:'parle',     note:'parler : je → parle' },
  { q:'Nous ___ trop vite.  (parler)',       opts:['parle','parles','parlons','parlez'],        a:'parlons',   note:'parler : nous → parlons' },
  { q:'Vous ___ à Montréal ?  (habiter)',    opts:['habite','habites','habitons','habitez'],    a:'habitez',   note:'habiter : vous → habitez' },
  { q:'Je ___ un film.  (regarder)',         opts:['regarde','regardes','regardons','regardent'],a:'regarde',   note:'regarder : je → regarde' },
  { q:'Ils ___ la télé.  (regarder)',        opts:['regarde','regardes','regardons','regardent'],a:'regardent', note:'regarder : ils → regardent（-ent 不發音）' },
  { q:'Vous ___ ici ?  (manger)',            opts:['mange','manges','mangeons','mangez'],       a:'mangez',    note:'manger : vous → mangez' },
  { q:'Je ___ tous les jours.  (nager)',     opts:['nageons','nages','nagez','nage'],           a:'nage',      note:'nager : je → nage' },
  { q:'Je ___ à Taipei.  (travailler)',      opts:['travaille','travailles','travaillons','travaillez'], a:'travaille',   note:'travailler : je → travaille' },
  { q:'Tu ___ où ?  (travailler)',           opts:['travaille','travailles','travaillons','travaillez'], a:'travailles',  note:'travailler : tu → travailles' },
  { q:'Nous ___ ensemble.  (travailler)',    opts:['travaille','travailles','travaillons','travaillez'], a:'travaillons', note:'travailler : nous → travaillons' },
  { q:"J'___ la radio.  (écouter)",          opts:['écoute','écoutes','écoutons','écoutent'],   a:'écoute',    note:"écouter : j'écoute（母音 → j'）" },
  { q:'Ils ___ de la musique.  (écouter)',   opts:['écoute','écoutes','écoutons','écoutent'],   a:'écoutent',  note:'écouter : ils → écoutent' },
  { q:'Je ___ un appartement.  (chercher)',  opts:['cherche','cherches','cherchons','cherchez'],a:'cherche',   note:'chercher : je → cherche' },

  // ── 所有格形容詞（20）──
  { q:"C'est ___ ami.  （他的）",           opts:['son','sa','ses','mon'],          a:'son',   note:'ami（m）→ son ami' },
  { q:"C'est ___ amie.  （他的）",          opts:['son','sa','ses','ma'],           a:'son',   note:'⚠️ amie 以母音開頭 → son amie（不用 sa！）' },
  { q:'___ sœurs arrivent.  （他的）',      opts:['Son','Sa','Ses','Mon'],          a:'Ses',   note:'sœurs 複數 → ses（複數不分陰陽）' },
  { q:'Tu aimes ___ travail ?  （你的）',   opts:['ton','ta','tes','son'],          a:'ton',   note:'travail（m）→ ton travail' },
  { q:'___ amis sont sympas.  （我們的）',  opts:['Notre','Nos','Son','Leur'],      a:'Nos',   note:'amis 複數 → nos（notre = 單數）' },
  { q:"___ mère est gentille.  （你的）",   opts:['Ton','Ta','Tes','Sa'],           a:'Ta',    note:'mère（f）→ ta mère' },
  { q:"C'est ___ vélo.  （我的 m）",        opts:['mon','ma','mes','son'],          a:'mon',   note:'vélo（m）→ mon vélo' },
  { q:"C'est ___ voiture.  （我的 f）",     opts:['mon','ma','mes','son'],          a:'ma',    note:'voiture（f）→ ma voiture' },
  { q:"Ce sont ___ livres.  （我的 pl）",   opts:['mon','ma','mes','ses'],          a:'mes',   note:'livres 複數 → mes livres' },
  { q:"C'est ___ père.  （你的 m）",        opts:['ton','ta','tes','son'],          a:'ton',   note:'père（m）→ ton père' },
  { q:"Ce sont ___ amis.  （你的 pl）",     opts:['ton','ta','tes','ses'],          a:'tes',   note:'amis 複數 → tes amis' },
  { q:"C'est ___ chien.  （他/她的 m）",    opts:['son','sa','ses','mon'],          a:'son',   note:'chien（m）→ son chien' },
  { q:"C'est ___ maison.  （他/她的 f）",   opts:['son','sa','ses','ma'],           a:'sa',    note:'maison（f，不以母音開頭）→ sa maison' },
  { q:"C'est ___ appartement.  （我們的）", opts:['Notre','Nos','Leur','Son'],      a:'Notre', note:'appartement 單數 → notre（不是 nos）' },
  { q:"C'est ___ voiture.  （你們的 f）",   opts:['votre','vos','notre','nos'],     a:'votre', note:'voiture 單數 → votre' },
  { q:"Ce sont ___ affaires.  （你們的 pl）",opts:['votre','vos','notre','nos'],    a:'vos',   note:'affaires 複數 → vos affaires' },
  { q:"C'est ___ chat.  （他們的 sg）",     opts:['leur','leurs','son','ses'],      a:'leur',  note:'chat 單數 → leur chat（leur 不加 s）' },
  { q:"Ce sont ___ enfants.  （他們的 pl）",opts:['leur','leurs','son','ses'],      a:'leurs', note:'enfants 複數 → leurs enfants（加 s）' },
  { q:"C'est ___ école.  （我的 f+母音）",  opts:['mon','ma','mes','son'],          a:'mon',   note:'école（f）以母音開頭 → mon école（和 mon amie 同規則）' },
  { q:"___ frère s'appelle Paul.  （他的）",opts:['Son','Sa','Ses','Mon'],          a:'Son',   note:'frère（m）→ Son frère' },

  // ── 冠詞（13）──
  { q:"J'aime ___ musique.",         opts:['le','la',"l'",'les'],           a:'la',    note:'musique（f）→ la musique' },
  { q:"C'est ___ hôpital.",          opts:['un','une','le','la'],           a:'un',    note:'hôpital（m）→ un hôpital' },
  { q:'Je vais ___ France.',         opts:['en','au','à','aux'],            a:'en',    note:'France（陰性）→ en France' },
  { q:'Il habite ___ Canada.',       opts:['en','au','à','aux'],            a:'au',    note:'Canada（陽性）→ au Canada' },
  { q:"Je n'ai pas ___ voiture.",    opts:['un','une','de','des'],          a:'de',    note:"否定句：un/une/des → de/d'" },
  { q:"J'aime ___ cinéma.",          opts:['le','la',"l'",'les'],           a:'le',    note:'cinéma（m）→ le cinéma' },
  { q:"C'est ___ université.",       opts:['un','une','le','la'],           a:'une',   note:'université（f）→ une université' },
  { q:'Elle va ___ Japon.',          opts:['en','au','à','aux'],            a:'au',    note:'Japon（m）→ au Japon' },
  { q:'Tu vas ___ États-Unis ?',     opts:['en','au','à','aux'],            a:'aux',   note:'États-Unis（複數）→ aux États-Unis' },
  { q:'Je mange ___ pain.',          opts:['le','du','de la',"de l'"],      a:'du',    note:'pain（m）→ du pain（du = de + le，部分冠詞）' },
  { q:"Elle boit ___ eau.",          opts:['la',"de l'",'du',"l'"],         a:"de l'", note:"eau（f, 母音）→ de l'eau（部分冠詞）" },
  { q:'Il a ___ voitures.',          opts:['les','des','de','une'],         a:'des',   note:'voitures 複數不定 → des voitures' },
  { q:"Je n'ai pas ___ frères.",     opts:['de','des','les','un'],          a:'de',    note:"否定句：pas de + 名詞（不用 des）" },

  // ── 形容詞性數一致（15）──
  { q:'Elle est ___.  (français)',            opts:['français','française','françaises','de France'],  a:'française',  note:'elle → 陰性 → française' },
  { q:'Ils sont ___.  (canadien)',            opts:['canadien','canadienne','canadiens','canadiennes'],a:'canadiens',  note:'ils → 陽性複數 → canadiens' },
  { q:'Ce sont des actrices ___.  (français)',opts:['français','française','françaises','de France'],  a:'françaises', note:'actrices 陰性複數 → françaises' },
  { q:'Il est ___.  (français)',              opts:['français','française','françaises','de France'],  a:'français',   note:'il → 陽性單數 → français（不變）' },
  { q:'Mon père est ___.  (grand)',           opts:['grand','grande','grands','grandes'],              a:'grand',      note:'père（m, sg）→ grand（基本形）' },
  { q:'Ma mère est ___.  (grand)',            opts:['grand','grande','grands','grandes'],              a:'grande',     note:'mère（f, sg）→ grande（加 e）' },
  { q:'Mes frères sont ___.  (petit)',        opts:['petit','petite','petits','petites'],              a:'petits',     note:'frères（m, pl）→ petits（加 s）' },
  { q:'Mes sœurs sont ___.  (petit)',         opts:['petit','petite','petits','petites'],              a:'petites',    note:'sœurs（f, pl）→ petites（加 es）' },
  { q:'Il est très ___.  (intelligent)',      opts:['intelligent','intelligente','intelligents','intelligentes'],a:'intelligent',   note:'il → 陽性 → intelligent' },
  { q:'Elle est très ___.  (intelligent)',    opts:['intelligent','intelligente','intelligents','intelligentes'],a:'intelligente',  note:'elle → 陰性 → intelligente' },
  { q:'Il est ___.  (beau)',                  opts:['beau','belle','beaux','belles'],                 a:'beau',       note:'beau（m, sg）；複數是 beaux' },
  { q:'Elle est ___.  (beau)',                opts:['beau','belle','beaux','belles'],                 a:'belle',      note:'beau → belle（陰性例外）' },
  { q:'Il est ___.  (italien)',               opts:['italien','italienne','italiens','italiennes'],    a:'italien',    note:'il → 陽性 → italien' },
  { q:'Elle est ___.  (italien)',             opts:['italien','italienne','italiens','italiennes'],    a:'italienne',  note:'elle → 陰性 → italienne（-ien → -ienne）' },
  { q:'Ils sont très ___.  (sympa)',          opts:['sympa','sympas','sympathique','sympaths'],        a:'sympas',     note:'sympa 不分陰陽，複數加 s → sympas' },

  // ── 運動（2）──
  { q:'Je joue ___ tennis.',   opts:['au','du','à la','de'],   a:'au', note:'jouer à + le → au tennis' },
  { q:'Elle fait ___ vélo.',   opts:['du','au','de la','le'],  a:'du', note:'faire de + le → du vélo' },

  // ── 職業陰陽性（2）──
  { q:'Mon frère est ___.  (infirmier)', opts:['infirmier','infirmière','infirmiers','infirmières'], a:'infirmier', note:'frère（m）→ 陽性職業 infirmier' },
  { q:'Ma sœur est ___.  (acteur)',      opts:['acteur','acteure','actrice','actrices'],             a:'actrice',   note:'-teur → -trice（女性）；ma sœur = elle' },

  // ── 🔥 進階挑戰（15）──
  { q:'「她的哥哥是廚師。」\n___ est cuisinier.',
    opts:['Son frère','Sa frère','Son sœur','Ses frères'],
    a:'Son frère', hard:true,
    note:'frère（m）→ son frère；cuisinier = 陽性 → 確認主詞是男性' },
  { q:'「我們的女兒很聰明。」\nNotre ___ est intelligente.',
    opts:['fils','fille','filles','garçon'],
    a:'fille', hard:true,
    note:'intelligente 陰性 → 主詞是女性 → fille；notre = 單數（不是 nos）' },
  { q:'「他的朋友（女）來了。」\n___ est arrivée.',
    opts:['Son ami','Son amie','Sa amie','Ses amies'],
    a:'Son amie', hard:true,
    note:'⚠️ amie 以母音開頭 → son amie（不用 sa）；arrivée = 陰性確認是女性' },
  { q:'「我的姐妹們是護士。」\nMes sœurs sont ___.',
    opts:['infirmier','infirmière','infirmiers','infirmières'],
    a:'infirmières', hard:true,
    note:'sœurs = 陰性複數 → infirmières；推理：陰性 + 複數 → -ières' },
  { q:'「你的哥哥是演員嗎？」\nTon frère est ___ ?',
    opts:['acteur','actrice','acteurs','actrices'],
    a:'acteur', hard:true,
    note:'frère（m）→ acteur（陽性）；-teur → -trice 只用於女性' },
  { q:'「她是美髮師。」\nElle est ___.',
    opts:['coiffeur','coiffeuse','coiffeurs','coiffeuses'],
    a:'coiffeuse', hard:true,
    note:'elle → 陰性職業；coiffeur（m）→ coiffeuse（f）：-eur → -euse' },
  { q:'「我的女朋友是資訊工程師。」\nMon amie est ___.',
    opts:['informaticien','informaticienne','informaticiens','informaticiennes'],
    a:'informaticienne', hard:true,
    note:'amie（f）→ informaticienne；-ien → -ienne（同 italian → italienne）' },
  { q:'「她的兩個女兒是義大利人。」\nSes deux filles sont ___.',
    opts:['italien','italienne','italiens','italiennes'],
    a:'italiennes', hard:true,
    note:'filles = 陰性複數 → italiennes；推理：女兒→陰性，兩個→複數' },
  { q:'「我的鄰居（女）是郵差。」\nMa voisine est ___.',
    opts:['facteur','factrice','facteurs','factrices'],
    a:'factrice', hard:true,
    note:'voisine（f）→ factrice；facteur → factrice（-teur → -trice，同 acteur）' },
  { q:'「我們的孩子們都是台灣人。」\nNos enfants sont ___.',
    opts:['taïwanais','taïwanaise','taïwanaises','taïwanaiss'],
    a:'taïwanais', hard:true,
    note:'enfants 混合性別複數 → 陽性複數 taïwanais（不加 e）' },
  { q:'「我們的兒子是資訊工程師。」\nNotre ___ est informaticien.',
    opts:['fille','fils','enfant','garçon'],
    a:'fils', hard:true,
    note:'informaticien = 陽性 → 主詞是男性 → fils（兒子）；notre = 單數' },
  { q:'「她的媽媽是美髮師。」\nSa mère est ___.',
    opts:['coiffeur','coiffeuse','coiffeurs','coiffeuses'],
    a:'coiffeuse', hard:true,
    note:'mère（f）→ 陰性職業；coiffeur → coiffeuse（-eur → -euse）' },
  { q:'「你的朋友（男）是郵差。」\nTon ___ est facteur.',
    opts:['ami','amie','amis','amies'],
    a:'ami', hard:true,
    note:'facteur = 陽性職業 → 主詞是男性 → ami（m）；ton + 母音 → ton ami' },
  { q:'「她的同事（女）是老師。」\nSa collègue est ___.',
    opts:['professeur','professeure','professeurs','professeures'],
    a:'professeure', hard:true,
    note:'collègue（f）→ 陰性老師 → professeure（法語認可的現代女性形）' },
  { q:'「你們的女兒們是護士。」\nVos ___ sont infirmières.',
    opts:['fils','fille','filles','enfants'],
    a:'filles', hard:true,
    note:'infirmières = 陰性複數 → 主詞是女性複數 → filles；vos = 複數所有格' },

  // ── 🔗 情境推理（Nina/Théo 對話，人稱連鎖）──
  { q:"Nina parle de son frère.\n« ___ femme est très gentille. »",
    opts:['son','sa','ses','ma'], a:'sa', chain:true,
    note:'son frère = il → sa femme（他的妻子；femme = f → sa）' },
  { q:"Théo parle de sa cousine Clara.\n« ___ fils s'appelle Raphaël. »",
    opts:['son','sa','ses','leur'], a:'son', chain:true,
    note:'fils（m）→ son fils（Clara 的兒子；即使 Clara 是女性，fils 是陽性 → son）' },
  { q:"Théo parle de sa cousine Clara.\n« ___ fille adore les animaux. »",
    opts:['son','sa','ses','leur'], a:'sa', chain:true,
    note:'fille（f，不以母音開頭）→ sa fille（Clara 的女兒）' },
  { q:"Nina parle de son neveu et sa nièce.\n« ___ adorent les enfants de Clara. »",
    opts:['Il','Elle','Ils','Elles'], a:'Ils', chain:true,
    note:'neveu（m）+ nièce（f）= 混合複數 → ils（陽性複數）' },
  { q:"Nina demande à Théo :\n« ___ cousine Clara est libre ? »",
    opts:['Mon','Ma','Ton','Ta'], a:'Ta', chain:true,
    note:'Nina 問 Théo → 用「你的」→ ton/ta；cousine（f）→ ta cousine' },
  { q:"Théo parle de Sofia et son mari.\n« ___ enfants sont adorables. »",
    opts:['Son','Sa','Ses','Leurs'], a:'Leurs', chain:true,
    note:'Sofia + son mari = deux personnes → leurs enfants（他們的）' },
  { q:"Théo parle de Nessim.\n« ___ est célibataire. »",
    opts:['Il','Elle','Ils','Elles'], a:'Il', chain:true,
    note:'Nessim = homme → il est célibataire' },
  { q:"M. Bertoli a un petit-fils de 2 mois.\n« ___ petit-fils est adorable ! »",
    opts:['Son','Sa','Ses','Leur'], a:'Son', chain:true,
    note:'petit-fils（m）→ son petit-fils（M. Bertoli 的孫子）' },
  { q:"Théo explique qu'il n'a pas de frères.\n« Je suis ___ unique. »",
    opts:['fils','fille','garçon','enfant'], a:'fils', chain:true,
    note:'Théo = homme → fils unique（不是 fille unique）' },
  { q:"Nina parle de son frère.\n« Chez ___, ils sont quatre. »",
    opts:['moi','lui','elle','eux'], a:'lui', chain:true,
    note:'son frère = il → chez lui（在他家）' },
  { q:"Théo parle de ses grands-parents.\n« ___ sont importants pour moi. »",
    opts:['Il','Elle','Ils','Elles'], a:'Ils', chain:true,
    note:'grands-parents（複數，混合性別）→ ils' },
  { q:"Théo parle de son oncle Paul.\n« ___ est le mari de ma tante Olivia. »",
    opts:['Il','Elle','Ils','Elles'], a:'Il', chain:true,
    note:'mon oncle Paul = homme → il' },

  // ── 🌍 國籍形容詞 — 陰陽變化（Unité 1）──
  { q:'Elle est ___.  (suédois)',          opts:['suédois','suédoise','suédoises','suédoisement'],      a:'suédoise',    note:'suédois → suédoise（加 e，-s 不發音）' },
  { q:'Elle est ___.  (grec)',             opts:['grec','grecque','grecque','grecs'],                   a:'grecque',     note:'⚠️ grec → grecque（-c → -que，不規則！）' },
  { q:'Elle est ___.  (japonais)',         opts:['japonais','japonaise','japonaises','japonaisant'],    a:'japonaise',   note:'japonais → japonaise（加 e）' },
  { q:'Elle est ___.  (tunisien)',         opts:['tunisien','tunisienne','tunisiennes','tunisiens'],    a:'tunisienne',  note:'tunisien → tunisienne（-ien → -ienne，同 italienne）' },
  { q:'Elle est ___.  (colombien)',        opts:['colombien','colombienne','colombiens','colombiennes'],a:'colombienne', note:'colombien → colombienne（-ien → -ienne）' },
  { q:'Elle est ___.  (turc)',             opts:['turc','turque','turcs','turques'],                    a:'turque',      note:'⚠️ turc → turque（-c → -que，不規則！同 grec）' },
  { q:'Elle est ___.  (anglais)',          opts:['anglais','anglaise','anglaises','anglaisement'],      a:'anglaise',    note:'anglais → anglaise（加 e）' },
  { q:'Elle est ___.  (espagnol)',         opts:['espagnol','espagnole','espagnols','espagnoles'],      a:'espagnole',   note:'espagnol → espagnole（加 e）' },
  { q:'Elle est ___.  (allemand)',         opts:['allemand','allemande','allemands','allemandes'],      a:'allemande',   note:'allemand → allemande（加 e）' },
  { q:'Elle est ___.  (marocain)',         opts:['marocain','marocaine','marocains','marocaines'],      a:'marocaine',   note:'marocain → marocaine（加 e）' },
  { q:'Elle est ___.  (argentin)',         opts:['argentin','argentine','argentins','argentines'],      a:'argentine',   note:'argentin → argentine（加 e）' },
  { q:'Il/Elle est ___.  (belge)',         opts:['belge','belgien','belgienne','belgiane'],             a:'belge',       note:'belge：陰陽同形，男女不變（不規則例外）' },
  { q:'Elle est ___.  (sénégalais)',       opts:['sénégalais','sénégalaise','sénégalaises','sénégalaisement'], a:'sénégalaise', note:'sénégalais → sénégalaise（加 e）' },
  { q:'Elle est ___.  (coréen)',           opts:['coréen','coréenne','coréens','coréennes'],            a:'coréenne',    note:'coréen → coréenne（-en → -enne，雙 n）' },

  // ── 🌍 國籍 — 複數（陽性複數 / 陰性複數）──
  { q:'Ils sont ___.  (suédois)',          opts:['suédois','suédoise','suédoisent','suédoises'],        a:'suédois',     note:'suédois（以 -s 結尾）→ 陽性複數不變' },
  { q:'Ils sont ___.  (japonais)',         opts:['japonais','japonaise','japonaisant','japonaises'],    a:'japonais',    note:'japonais（以 -s 結尾）→ 陽性複數不變' },
  { q:'Elles sont ___.  (espagnol)',       opts:['espagnol','espagnole','espagnols','espagnoles'],      a:'espagnoles',  note:'espagnoles：陰性複數 → +es' },
  { q:'Elles sont ___.  (allemand)',       opts:['allemand','allemande','allemands','allemandes'],      a:'allemandes',  note:'allemandes：陰性複數 → +es' },
  { q:'Ils sont ___.  (tunisien)',         opts:['tunisien','tunisienne','tunisiens','tunisiennes'],    a:'tunisiens',   note:'tunisiens：陽性複數 → +s（-ien → -iens）' },
  { q:'Elles sont ___.  (colombien)',      opts:['colombien','colombienne','colombiens','colombiennes'],a:'colombiennes',note:'colombiennes：陰性複數 → -ienne + s' },

  // ── ✈️ Prépositions + pays（Unité 1）──
  { q:'Elle habite ___ Russie.',           opts:['en','au','à','aux'],  a:'en',  note:'Russie（陰性國名）→ en Russie' },
  { q:'Il est né ___ Portugal.',           opts:['en','au','à','aux'],  a:'au',  note:'Portugal（陽性）→ au Portugal（à + le）' },
  { q:'Elle habite ___ Pays-Bas.',         opts:['en','au','à','aux'],  a:'aux', note:'Pays-Bas（複數）→ aux Pays-Bas（à + les）' },
  { q:'Il habite ___ Chine.',              opts:['en','au','à','aux'],  a:'en',  note:'Chine（陰性）→ en Chine' },
  { q:'Il est né ___ Sénégal.',            opts:['en','au','à','aux'],  a:'au',  note:'Sénégal（陽性）→ au Sénégal' },
  { q:'Elle est née ___ Argentine.',       opts:['en','au','à','aux'],  a:'en',  note:'Argentine（陰性）→ en Argentine' },
  { q:'Il habite ___ Allemagne.',          opts:['en','au','à','aux'],  a:'en',  note:'Allemagne（陰性）→ en Allemagne' },
  { q:'Elle est née ___ Belgique.',        opts:['en','au','à','aux'],  a:'en',  note:'Belgique（陰性）→ en Belgique' },
  { q:'Il habite ___ Vietnam.',            opts:['en','au','à','aux'],  a:'au',  note:'Vietnam（陽性）→ au Vietnam' },
  { q:'Il est né ___ Tunisie.',            opts:['en','au','à','aux'],  a:'en',  note:'Tunisie（陰性）→ en Tunisie' },
  { q:'Il habite ___ Maroc.',              opts:['en','au','à','aux'],  a:'au',  note:'Maroc（陽性）→ au Maroc' },
  { q:'Elle habite ___ Corée.',            opts:['en','au','à','aux'],  a:'en',  note:'Corée（陰性）→ en Corée' },

  // ── 📰 Articles définis — le/la/l'/les（Unité 1-2）──
  { q:"J'aime ___ art.",                   opts:['le','la',"l'",'les'], a:"l'",  note:"art（m, 母音 a）→ l'art" },
  { q:'Il aime ___ sport.',                opts:['le','la',"l'",'les'], a:'le',  note:'sport（m）→ le sport' },
  { q:"Elle adore ___ histoire.",          opts:['le','la',"l'",'les'], a:"l'",  note:"histoire（f, h muet + 母音）→ l'histoire" },
  { q:'Ils aiment ___ langues.',           opts:['le','la',"l'",'les'], a:'les', note:'langues（複數）→ les langues' },
  { q:'Tu aimes ___ danse ?',              opts:['le','la',"l'",'les'], a:'la',  note:'danse（f）→ la danse' },
  { q:"J'adore ___ café.",                 opts:['le','la',"l'",'les'], a:'le',  note:'café（m）→ le café（aimer + défini = goût général）' },
  { q:"Elle aime ___ Espagne.",            opts:['le','la',"l'",'les'], a:"l'",  note:"Espagne（f, 母音 E）→ l'Espagne" },
  { q:"Il aime ___ Algérie.",              opts:['le','la',"l'",'les'], a:"l'",  note:"Algérie（f, 母音 A）→ l'Algérie" },
  { q:"Tu aimes ___ géographie ?",        opts:['le','la',"l'",'les'], a:'la',  note:'géographie（f）→ la géographie' },
  { q:"C'est ___ langue de Paul.",         opts:['le','la',"l'",'les'], a:'la',  note:'langue（f）→ la langue' },

  // ── 🥖 Articles partitifs — du/de la/de l'/des（Unité 3）──
  { q:'Je mange ___ poisson.',             opts:['du','de la',"de l'",'des'],  a:'du',     note:'poisson（m）→ du poisson（de + le）' },
  { q:'Il y a ___ beurre ?',              opts:['du','de la',"de l'",'des'],  a:'du',     note:'beurre（m）→ du beurre' },
  { q:'Nous mangeons ___ pâtes.',          opts:['du','de la',"de l'",'des'],  a:'des',    note:'pâtes（複數）→ des pâtes' },
  { q:'Je voudrais ___ café.',             opts:['du','de la',"de l'",'des'],  a:'du',     note:'café（m）→ du café（部分冠詞）' },
  { q:'Tu veux ___ fromage ?',             opts:['du','de la',"de l'",'des'],  a:'du',     note:'fromage（m）→ du fromage' },
  { q:'Il y a ___ légumes ?',             opts:['du','de la',"de l'",'des'],  a:'des',    note:'légumes（複數）→ des légumes' },
  { q:"J'achète ___ huile d'olive.",       opts:['du','de la',"de l'",'des'],  a:"de l'",  note:"huile（f, 母音 h muet）→ de l'huile" },
  { q:'Vous mangez ___ viande ?',          opts:['du','de la',"de l'",'des'],  a:'de la',  note:'viande（f）→ de la viande' },
  { q:'Elle boit ___ thé.',               opts:['du','de la',"de l'",'des'],  a:'du',     note:'thé（m）→ du thé' },
  { q:'Il mange ___ glace.',              opts:['du','de la',"de l'",'des'],  a:'de la',  note:'glace（f）→ de la glace' },

  // ── 🔢 Singulier / Pluriel（Unité 3）──
  { q:"J'aime les ___.  (fruit)",          opts:['fruit','fruits','de fruits','du fruit'],              a:'fruits',      note:'les + 名詞 → 複數：fruits（加 s）' },
  { q:'Tu achètes trois ___.  (croissant)',opts:['croissant','croissants','des croissant','de croissant'], a:'croissants', note:'trois → 複數：croissants（加 s）' },
  { q:"J'achète deux ___ de pommes.  (kilo)", opts:['kilo','kilos','kilots','de kilo'],               a:'kilos',       note:'deux → 複數：kilos（加 s）' },
  { q:"Il y a une ___ ici.  (boulangerie)", opts:['boulangerie','boulangeries','boulangerise','boulangeriement'], a:'boulangerie', note:'une → 單數：boulangerie（不加 s）' },
  { q:'Il y a trois ___ dans mon quartier.  (épicerie)', opts:['épicerie','épiceries','épiceriement','épiceriest'], a:'épiceries', note:'trois → 複數：épiceries（加 s）' },
  { q:'Je mange deux ___.  (œuf)',         opts:['œuf','œufs','des œuf','de œuf'],                     a:'œufs',        note:'deux → 複數：œufs（加 s；注意 f 不發音）' },
  { q:'Il y a un ___ dans ma rue.  (poissonnier)', opts:['poissonnier','poissonniers','poissonniere','poissonnieur'], a:'poissonnier', note:'un → 單數：poissonnier（不加 s）' },
  { q:"J'achète des ___ au marché.  (tomate)", opts:['tomate','tomates','tomâte','tomatez'],           a:'tomates',     note:'des → 複數：tomates（加 s）' },

  // ── 🟢 Verbes en -ir — choisir / finir（Unité 3）──
  { q:'Je ___ le plat.  (choisir)',        opts:['choisis','choisit','choisissons','choisissez'],       a:'choisis',     note:'choisir : je → choisis（-is）' },
  { q:'Tu ___ le dessert ?  (choisir)',    opts:['choisis','choisit','choisissons','choisissent'],      a:'choisis',     note:'choisir : tu → choisis（-is，同 je）' },
  { q:'Il ___ le restaurant.  (choisir)', opts:['choisis','choisit','choisissons','choisissent'],      a:'choisit',     note:'choisir : il → choisit（-it，加 t）' },
  { q:'Nous ___ le menu.  (choisir)',      opts:['choisis','choisit','choisissons','choisissez'],       a:'choisissons', note:'choisir : nous → choisissons（-issons）' },
  { q:"Vous ___ l'entrée ?  (choisir)",   opts:['choisis','choisit','choisissons','choisissez'],       a:'choisissez',  note:'choisir : vous → choisissez（-issez）' },
  { q:'Ils ___ un menu végétarien.  (choisir)', opts:['choisis','choisit','choisissons','choisissent'], a:'choisissent', note:'choisir : ils → choisissent（-issent）' },
  { q:'Je ___ mon assiette.  (finir)',     opts:['finis','finit','finissons','finissez'],               a:'finis',       note:'finir : je → finis（-is）' },
  { q:'Elle ___ le café.  (finir)',        opts:['finis','finit','finissons','finissent'],              a:'finit',       note:'finir : elle → finit（-it，加 t）' },
  { q:'Vous ___ la salade ?  (finir)',     opts:['finis','finit','finissons','finissez'],               a:'finissez',    note:'finir : vous → finissez（-issez）' },
  { q:'Ils ne ___ pas leur assiette.  (finir)', opts:['finis','finit','finissons','finissent'],        a:'finissent',   note:'finir : ils → finissent（-issent）' },
  { q:'Nous ___ les courses.  (finir)',    opts:['finis','finit','finissons','finissez'],               a:'finissons',   note:'finir : nous → finissons（-issons）' },

  // ── 🚶 Verbe aller（Unité 3）──
  { q:'Je ___ au marché.  (aller)',        opts:['vais','vas','va','allons'],   a:'vais',    note:'aller : je → vais（完全不規則！）' },
  { q:'Tu ___ à la boulangerie ?  (aller)', opts:['vais','vas','va','vont'],   a:'vas',     note:'aller : tu → vas（不規則）' },
  { q:'Elle ___ chez le boucher.  (aller)', opts:['vais','vas','va','allons'],  a:'va',     note:'aller : il/elle → va（不規則）' },
  { q:'Nous ___ au supermarché.  (aller)', opts:['vais','allons','allez','vont'], a:'allons', note:'aller : nous → allons（規則部分）' },
  { q:'Ils ___ aux caisses.  (aller)',     opts:['va','allons','allez','vont'],  a:'vont',   note:'aller : ils → vont（不規則）' },
  { q:'Vous ___ où ?  (aller)',            opts:['vais','allons','allez','vont'], a:'allez',  note:'aller : vous → allez（規則部分）' },
  { q:"On ___ à l'épicerie.  (aller)",    opts:['vais','vas','va','allons'],   a:'va',      note:'on → 等同 il/elle → va' },
  { q:'Mon fils ___ chez le boulanger.  (aller)', opts:['vais','vas','va','vont'], a:'va',  note:'mon fils = il → va' },

  // ── 🏪 Prépositions de lieu — chez/à/au（Unité 3）──
  { q:'Je vais ___ boulangerie.',          opts:['chez la','à la','au',"à l'"],  a:'à la',   note:'boulangerie（f, lieu）→ à la boulangerie' },
  { q:'On va ___ marché.',                 opts:['chez le','à la','au','aux'],   a:'au',     note:'marché（m, lieu）→ au marché（à + le）' },
  { q:'Je vais ___ fromagère.',            opts:['chez la','à la','au','chez le'], a:'chez la', note:'fromagère = 人（商人）→ chez la fromagère' },
  { q:"Tu vas ___ épicerie bio ?",         opts:["chez l'","à l'",'au','à la'],  a:"à l'",   note:"épicerie（f, 母音）→ à l'épicerie" },
  { q:'Je paie ___ caisses.',              opts:['chez les','à la','aux','au'],   a:'aux',    note:'caisses（複數）→ aux caisses（à + les）' },
  { q:'On achète le pain ___ boulanger.',  opts:['chez le','à la','au','à le'],  a:'chez le', note:'boulanger = 人 → chez le boulanger' },
  { q:'Vous faites vos courses ___ supermarché ?', opts:['chez le','à la','au','aux'], a:'au', note:'supermarché（m, lieu）→ au supermarché' },
  { q:"Il va ___ épicière.",               opts:["chez l'","à l'",'au','chez le'], a:"chez l'", note:"épicière = 人（f, 母音）→ chez l'épicière" },

  // ── ❓ Quel/Quelle/Quels/Quelles（Unité 1）──
  { q:'___ âge vous avez ?',              opts:['Quel','Quelle','Quels','Quelles'], a:'Quel',    note:'âge（m, sg）→ Quel（陽性單數）' },
  { q:'___ est votre adresse ?',           opts:['Quel','Quelle','Quels','Quelles'], a:'Quelle',  note:'adresse（f）→ Quelle（陰性單數）' },
  { q:'___ langues vous parlez ?',         opts:['Quel','Quelle','Quels','Quelles'], a:'Quelles', note:'langues（f, pl）→ Quelles（陰性複數）' },
  { q:'___ est votre nationalité ?',       opts:['Quel','Quelle','Quels','Quelles'], a:'Quelle',  note:'nationalité（f）→ Quelle（陰性單數）' },
  { q:'___ sport vous pratiquez ?',        opts:['Quel','Quelle','Quels','Quelles'], a:'Quel',    note:'sport（m, sg）→ Quel（陽性單數）' },
  { q:'___ artistes tu aimes ?',           opts:['Quel','Quelle','Quels','Quelles'], a:'Quels',   note:'artistes（m, pl）→ Quels（陽性複數）' },
  { q:'Dans ___ pays tu habites ?',        opts:['quel','quelle','quels','quelles'], a:'quel',    note:'pays（m）→ quel pays（陽性單數）' },
  { q:'___ villes de France tu aimes ?',   opts:['Quel','Quelle','Quels','Quelles'], a:'Quelles', note:'villes（f, pl）→ Quelles（陰性複數）' },
  { q:'Tu habites dans ___ quartier ?',    opts:['quel','quelle','quels','quelles'], a:'quel',    note:'quartier（m）→ quel quartier（陽性單數）' },

  // ── 👔 Professions — 陰陽性（Unité 2 補充）──
  { q:'Ma sœur est ___.  (étudiant)',      opts:['étudiant','étudiante','étudiants','étudiantes'],     a:'étudiante',   note:'sœur（f）→ étudiante（加 e）' },
  { q:'Mon frère est ___.  (étudiant)',    opts:['étudiant','étudiante','étudiants','étudiantes'],     a:'étudiant',    note:'frère（m）→ étudiant（基本形）' },
  { q:'Ma cousine est ___.  (fleuriste)',  opts:['fleuriste','fleuristesse','fleuristeur','fleuristière'], a:'fleuriste', note:'fleuriste：陰陽同形，不需加 e' },
  { q:'Mon oncle est ___.  (fleuriste)',   opts:['fleuriste','fleuriste femme','fleuristeur','fleuriston'], a:'fleuriste', note:'fleuriste：陰陽同形，男女都用 fleuriste' },
  { q:'Ma tante est ___.  (professeur)',   opts:['professeur','professeure','professeuse','professeuse'], a:'professeure', note:'tante（f）→ professeure（法語認可的現代女性形）' },
  { q:'Mon médecin est une femme.\nElle est ___.', opts:['médecin','médecine','médicin','médecine'],  a:'médecin',     note:'médecin：陰陽同形，女醫生也說 médecin（不變）' },

  // ── 🎨 Couleurs — 陰陽/複數一致（Unité 4）──
  { q:'un polo ___  (vert)',                opts:['vert','verte','verts','vertes'],                   a:'vert',      note:'polo（m, sg）→ vert（基本形）' },
  { q:'une robe ___  (vert)',               opts:['vert','verte','verts','vertes'],                   a:'verte',     note:'robe（f, sg）→ verte（加 e）' },
  { q:'des polos ___  (vert)',              opts:['vert','verte','verts','vertes'],                   a:'verts',     note:'polos（m, pl）→ verts（加 s）' },
  { q:'des robes ___  (vert)',              opts:['vert','verte','verts','vertes'],                   a:'vertes',    note:'robes（f, pl）→ vertes（加 es）' },
  { q:'un sac ___  (bleu)',                 opts:['bleu','bleue','bleus','bleues'],                   a:'bleu',      note:'sac（m, sg）→ bleu（基本形）' },
  { q:'une veste ___  (bleu)',              opts:['bleu','bleue','bleus','bleues'],                   a:'bleue',     note:'veste（f, sg）→ bleue（加 e）' },
  { q:'des chaussures ___  (bleu)',         opts:['bleu','bleue','bleus','bleues'],                   a:'bleues',    note:'chaussures（f, pl）→ bleues（加 es）' },
  { q:'une chemise ___  (blanc)',           opts:['blanc','blanche','blancs','blanches'],              a:'blanche',   note:'⚠️ blanc → blanche（-c → -che，例外！）' },
  { q:'des chemises ___  (blanc)',          opts:['blanc','blanche','blancs','blanches'],              a:'blanches',  note:'chemises（f, pl）→ blanches（-c → -che + s）' },
  { q:'un t-shirt ___  (orange)',           opts:['orange','orangée','oranges','orangée'],             a:'orange',    note:'⚠️ orange：水果名兼顏色 → 不分陰陽，不加 s/e（invariable）' },
  { q:'des jupes ___  (orange)',            opts:['orange','orangées','oranges','orangée'],            a:'orange',    note:'⚠️ des jupes orange（不加 s！orange = invariable）' },
  { q:'un sac ___  (marron)',               opts:['marron','marronne','marrons','marron'],             a:'marron',    note:'⚠️ marron：栗子兼顏色 → invariable（不加 s/e）' },
  { q:'des bottes ___  (marron)',           opts:['marron','marronnes','marrons','marronne'],          a:'marron',    note:'⚠️ des bottes marron（不加 s！marron = invariable）' },
  { q:'une robe ___  (violet)',             opts:['violet','violette','violets','violettes'],          a:'violette',  note:'violet → violette（-et → -ette，子音重複）' },
  { q:'des fleurs ___  (violet)',           opts:['violet','violette','violets','violettes'],          a:'violettes', note:'fleurs（f, pl）→ violettes（-ette + s）' },
  { q:'un manteau ___  (gris)',             opts:['gris','grise','gris','grises'],                    a:'gris',      note:'manteau（m）→ gris（以 -s 結尾，陽性單數不變）' },
  { q:'une veste ___  (gris)',              opts:['gris','grise','griss','grises'],                   a:'grise',     note:'veste（f）→ grise（加 e）' },
  { q:'C\'est ___ voiture.  (blanc)',       opts:['blanc','blanche','blancs','blanches'],              a:'blanche',   note:'voiture（f）→ blanche（blanc 的陰性例外）' },

  // ── 🔗 情境推理（補充 — 購物 / 家庭延伸）──
  { q:"Théo parle de son ami Nessim.\n« Nessim va ___ marché tous les dimanches. »",
    opts:['au','à la','chez le','aux'], a:'au', chain:true,
    note:'marché（m, lieu）→ au marché（à + le）' },
  { q:"Nina fait les courses.\n« Elle achète le pain ___ boulangerie. »",
    opts:['à la','au','chez la',"à l'"], a:'à la', chain:true,
    note:'boulangerie（f, lieu）→ à la boulangerie' },
  { q:"Sofia et son mari préparent le dîner.\n« ___ cuisinent ensemble. »",
    opts:['Il','Elle','Ils','Elles'], a:'Ils', chain:true,
    note:'Sofia（f）+ son mari（m）= couple mixte → ils（混合複數用陽性）' },
  { q:"Théo parle de sa tante Olivia.\n« ___ est professeure à l'université. »",
    opts:['Il','Elle','Ils','Elles'], a:'Elle', chain:true,
    note:'sa tante Olivia = femme → elle est professeure' },
  { q:"Nina parle de son neveu.\n« ___ a 8 ans. »",
    opts:['Il','Elle','Ils','Elles'], a:'Il', chain:true,
    note:'neveu = garçon → il（男性單數）' },
  { q:"Nina parle de ses parents.\n« ___ habitent chez mon frère. »",
    opts:['Il','Elle','Ils','Elles'], a:'Ils', chain:true,
    note:'mes parents（père + mère = couple）→ ils（混合複數）' },
  { q:"Théo parle du petit-fils de M. Bertoli.\n« ___ a seulement 2 mois ! »",
    opts:['Il','Elle','Ils','Elles'], a:'Il', chain:true,
    note:'le petit-fils = garçon → il' },
  { q:"Nina parle de son frère.\n« À la maison, ___ sont quatre : lui, sa femme et ses deux enfants. »",
    opts:['ils','elles','il','on'], a:'ils', chain:true,
    note:'lui（m）+ sa femme（f）+ enfants = groupe mixte → ils（只要有一個男性就用 ils）' },
];

// ── AGREE_BANK topic 標記（按出現順序對應 count）──────────────────
const AGREE_TOPIC_RANGES = [
  { count:10, topic:'etre-avoir' },
  { count:10, topic:'etre-avoir' },
  { count:20, topic:'er-verbs' },
  { count:20, topic:'possessives' },
  { count:13, topic:'articles' },
  { count:15, topic:'adjective-agreement' },
  { count: 2, topic:'likes-hobbies-sports' },
  { count: 2, topic:'adjective-agreement' },
  { count:15, topic:'family-possessives' },
  { count:12, topic:'family-possessives' },
  { count:14, topic:'adjective-agreement' },
  { count: 6, topic:'adjective-agreement' },
  { count:12, topic:'preposition-country' },
  { count:10, topic:'articles' },
  { count:10, topic:'articles' },
  { count: 8, topic:'articles' },
  { count:11, topic:'ir-re-verbs' },
  { count: 8, topic:'irregular-verbs-3rd-group' },
  { count: 8, topic:'preposition-place-transport' },
  { count: 9, topic:'question-words' },
  { count: 6, topic:'adjective-agreement' },
  { count:18, topic:'adjective-agreement' },
  { count: 8, topic:'preposition-place-transport' },
];
(function() {
  let i = 0;
  AGREE_TOPIC_RANGES.forEach(r => {
    for (let n = 0; n < r.count; n++) {
      if (AGREE_BANK[i]) AGREE_BANK[i].topic = r.topic;
      i++;
    }
  });
})();

function drillQId(q) {
  return 'dq_' + q.q.slice(0,25).replace(/[^a-zA-Z0-9一-鿿]/g,'_');
}
