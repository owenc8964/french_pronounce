/* ============================================================
   🎤 考場島（2026-11-24 Owen：「我現在要準備啦 那些都一起放進來」→ 選「方法＋詞彙＋題目（不放範文）」「放遊戲裡的口說島」）
   內容來源：
     ・第三題：《口語3備考寶典》的方法（1.2 維度化思考、組織論證、1.3 段落銜接詞）＋每一類的詞彙＋目錄 152 題；另併入 pack3 題庫 → exam_t3_data.js
     ・第二題：《口語2備考寶典》第 1 章（三種問句、疑問詞、開場 ABC、結尾、通用問題角度、自然回應）＋ banque de sujets 的情境 → exam_t2_sits.js
   ⛔ 不放範文（寶典作者自己也不建議背別人的模板）。法文句子都是寶典原句；寶典寫錯的地方改成標準法文並在卡上標出原文（來源三層：標準法文＞課本＞逐字稿）
   ⚠️ 寶典作者寫明題目「來自公開網路資源，不代表真實考題」→ 練思路用，不是押題
   做法：沿用口說群島的畫布引擎（town.html 的 isle*），這支檔包住幾個函式，遇到 ISLE.id==='EXAM' 走考場島自己的流程
   紀錄（都會同步）：clb7_exam_known 跳過／降低出現（物件＋last）、clb7_exam_done 講過、clb7_exam_dims 每題選的維度、clb7_exam_mine 我會這樣講
   ============================================================ */
(function(){
if(typeof ISLE_SCENES==='undefined') return;
var css=document.createElement('style'); css.textContent='ul.phr{list-style:none;margin:4px 0;padding:0} ul.phr li{margin:6px 0;line-height:1.35} ul.phr .fr{color:#fff3c0} ul.phr .spk{margin-left:2px} #exMine{width:100%;box-sizing:border-box}'; document.head.appendChild(css);

/* ---------- 七類題目（寶典第 2–8 章）＋每類詞彙（取自寶典的詞彙表與範文裡標了中文的詞；中文轉繁體、改成台灣用語） ---------- */
var EXAM_ZONES={
  tech:{em:'📱', name:'科技與媒體', fr:'Technologies, réseaux et médias', vocab:[
    ['les réseaux sociaux','社群媒體'],['une messagerie instantanée','即時通訊（LINE、WhatsApp）'],['les données personnelles','個人資料'],['la fracture numérique','數位落差'],
    ['la surcharge d’information','資訊過載'],['le besoin de déconnexion','需要斷網、數位排毒'],['l’addiction, la dépendance','成癮、依賴'],['se comparer aux autres','跟別人比較'],
    ['le cyber-harcèlement','網路霸凌'],['l’arnaque en ligne','網路詐騙'],['l’intelligence artificielle (IA)','人工智慧'],['être à l’aise avec le numérique','很會用數位工具']]},
  rel:{em:'👪', name:'家庭、關係與教育', fr:'Relations, éducation et apprentissage', vocab:[
    ['élargir ses horizons','開闊眼界'],['le respect des différences','尊重差異'],['l’écoute active','用心傾聽'],['entretenir le lien','維持聯繫'],
    ['le sentiment d’appartenance','歸屬感'],['la pression familiale / sociale','家庭／社會壓力'],['les valeurs traditionnelles','傳統價值觀'],['transmettre ses expériences','傳承經驗'],
    ['l’épanouissement personnel','個人的成長與充實'],['une pression scolaire excessive','過大的課業壓力'],['la confiance en soi','自信'],['apprendre sur le terrain','從實作中學']]},
  work:{em:'💼', name:'工作', fr:'Travail', vocab:[
    ['le bien-être des employés','員工的身心健康'],['la qualité de vie au travail','職場生活品質'],['l’épuisement professionnel (le burn-out)','職業倦怠'],['la reconnaissance','被肯定'],
    ['la motivation','工作動力'],['le télétravail','遠距工作'],['la flexibilité des horaires','工時彈性'],['le trajet domicile-travail','通勤路程'],
    ['la cohésion d’équipe','團隊凝聚力'],['la formation continue','在職進修'],['le marché du travail','就業市場'],['la rémunération','薪酬']]},
  cult:{em:'🌍', name:'文化與移民', fr:'Culture et immigration', vocab:[
    ['le pays d’accueil','移入的國家'],['s’intégrer','融入'],['s’adapter à…','適應……'],['la barrière linguistique','語言隔閡'],
    ['le choc culturel','文化衝擊'],['les codes culturels','文化上的潛規則'],['garder son identité','保有自己的身分認同'],['se sentir chez soi','有家的感覺'],
    ['l’ouverture d’esprit','心胸開放'],['élargir ses horizons','開闊眼界'],['les traditions','傳統'],['le mode de vie','生活方式']]},
  sante:{em:'🥗', name:'健康、飲食與生活', fr:'Santé, alimentation et mode de vie', vocab:[
    ['une alimentation saine et équilibrée','健康均衡的飲食'],['les aliments transformés','加工食品'],['prévenir les maladies chroniques','預防慢性病'],['l’activité physique régulière','規律運動'],
    ['la gestion du stress','壓力管理'],['les effets secondaires','副作用'],['l’automédication','自己買藥吃'],['prévenir plutôt que guérir','預防勝於治療'],
    ['prendre soin de soi','照顧自己'],['la chirurgie esthétique','整形手術'],['le regard des autres','別人的眼光'],['la qualité du sommeil','睡眠品質']]},
  env:{em:'🌱', name:'環境、交通與動物', fr:'Environnement, transport et développement', vocab:[
    ['la pollution','汙染'],['la qualité de l’air','空氣品質'],['l’empreinte carbone','碳足跡'],['les énergies renouvelables','再生能源'],
    ['le tri des déchets','垃圾分類'],['la surconsommation','過度消費'],['le gaspillage','浪費'],['la biodiversité','生物多樣性'],
    ['les transports en commun','大眾運輸'],['les embouteillages','塞車'],['les animaux de compagnie','寵物'],['le bien-être animal','動物福利']]},
  soc:{em:'⚖️', name:'政治與社會', fr:'Politique, société et justice', vocab:[
    ['les inégalités','不平等'],['la justice sociale','社會正義'],['l’égalité','平等'],['la liberté d’expression','言論自由'],
    ['les citoyens','公民'],['l’engagement','投入、參與'],['s’engager dans une association','投入協會'],['le bénévolat','志工服務'],
    ['la solidarité','團結互助'],['les personnes en difficulté','弱勢、有困難的人'],['les plus vulnérables','最脆弱的族群'],['la cohésion sociale','社會凝聚力']]}
};
var EXAM_ZORDER=['tech','rel','work','cult','sante','env','soc'];

/* ---------- 方法卡 ---------- */
/* 寶典 1.2 Q1 維度化思考 表 1：幾乎每題都能套的六個維度（「集裝箱」）＋常用子題 */
var EXAM_DIMS=[
  ['eco','💶','Économie / efficacité','經濟與效率',[['la productivité','生產力、效率'],['la gestion du temps','時間管理'],['le coût de la vie','生活成本'],['la création d’emplois','創造就業'],['la croissance économique','經濟成長'],['le soutien à l’industrie locale','支持在地產業']]],
  ['cul','📚','Culture / éducation','文化與教育',[['l’accès à la culture','接觸文化的機會'],['l’ouverture d’esprit / la diversité','開放、多元'],['l’apprentissage et la motivation','學習與動機'],['le développement personnel','自我成長']]],
  ['pol','🏛️','Politique / justice','政治與社會正義',[['l’égalité / les inégalités','公平／不平等'],['la liberté individuelle','個人自由'],['la réglementation / la sécurité','法規管制與安全'],['la responsabilité de l’État','政府的責任']]],
  ['soc','🤝','Société','人際與社會',[['les relations humaines / l’amitié','人際關係、友誼'],['la communication interpersonnelle','面對面溝通'],['le respect / les valeurs partagées','尊重與共同價值'],['l’intégration sociale / l’isolement','融入社會／孤立']]],
  ['env','🌱','Environnement','環境與永續',[['la pollution','汙染（空氣、水、噪音）'],['le changement climatique','氣候變遷'],['la biodiversité','生物多樣性'],['la surconsommation / le gaspillage','過度消費與浪費'],['l’exploitation des ressources limitées','有限資源的過度開發']]],
  ['san','🩺','Santé','身心健康',[['le stress / l’anxiété','壓力與焦慮'],['l’addiction','成癮（網路、甜食…）'],['les problèmes physiques','身體問題（視力、肥胖、缺乏運動）'],['le sommeil et le bien-être','睡眠與身心狀態']]]
];
function dimById(k){ return EXAM_DIMS.filter(function(d){ return d[0]===k; })[0]; }
function frList(L){ return '<ul class="phr">'+L.map(function(x){ return '<li><span class="fr">'+esc(x[0])+'</span> '+spk(x[0])+(x[1]?'<div class="muted">'+esc(x[1])+'</div>':'')+'</li>'; }).join('')+'</ul>'; }
function fixNote(t){ return '<div class="muted" style="font-size:.78em;margin-top:4px">✏️ 跟寶典不一樣的地方：'+esc(t)+'</div>'; }

var EXAM_CARDS={
  dims:{t:'🧭 維度化思考（第三題）', h:function(){
    return '<div class="story">考官念完題目幾乎沒有準備時間。寶典的解法：平常就準備幾個固定的「集裝箱」（維度），考場上花幾秒判斷「這題從哪 2–3 個維度講最自然」，再從裡面挑一個具體的子題往下講。</div>'+
      '<div class="muted">考場上可以先講一句爭取時間，例如 <span class="fr">C’est une question intéressante…</span>，同時在腦中掃一遍下面六個維度。</div>'+
      EXAM_DIMS.map(function(d){ return '<details class="movecard"><summary>'+d[1]+' <b>'+esc(d[3])+'</b> <small class="muted fr">'+esc(d[2])+'</small></summary>'+frList(d[4])+'</details>'; }).join('')+
      '<div class="muted" style="margin-top:8px">寶典建議的練法：拿題目清單隨便抽，在每題後面寫上打算用的維度，養成固定的回答方向。→ 考場島每一題都可以點維度，會記下來。</div>'; }},
  arg:{t:'🎬 組織論證：遠景→特寫→拉遠（第三題）', h:function(){
    return '<div class="story">寶典把一段論證比喻成拍影片：</div>'+
      '<ol style="margin:6px 0 0 1.2em;padding:0;line-height:1.7">'+
      '<li>🔭 <b>遠景</b>：你怎麼看這個題目 <small class="muted fr">niveau global — l’idée principale</small></li>'+
      '<li>🔎 <b>拉近</b>：為什麼這麼想 <small class="muted fr">niveau intermédiaire — l’explication</small></li>'+
      '<li>📸 <b>特寫</b>：身邊的例子、以前跟現在比、跟別人比 <small class="muted fr">niveau concret — un exemple ou une comparaison</small></li>'+
      '<li>🔭 <b>拉遠收尾</b>：回到主張 <small class="muted fr">retour au global — la conclusion</small></li></ol>'+
      '<div class="dexhead">想到的點太小怎麼辦？</div><div class="muted">像「不用通勤」這種點只是中間層。問自己一句 <span class="fr">Et alors ?</span>（那又怎樣？），把它往上提到一個維度：<br>'+
      '不用通勤 → 少了焦慮和疲勞（🩺 健康）／省下交通費（💶 經濟）／少排碳（🌱 環境）／多陪家人（🤝 人際）。<br>同一個點，可以從不同維度解釋。</div>'+
      '<div class="dexhead">開頭</div><div class="muted">寶典作者喜歡在第一段直接點出要講的 2–3 個維度；也可以只說有好幾個原因（<span class="fr">plusieurs raisons</span>），後面再展開。</div>'+
      '<div class="muted" style="margin-top:6px">寶典的原則：<span class="fr">mieux vaut être clair, fluide et structuré que trop compliqué.</span>（清楚、流暢、有結構，比講得很複雜重要）</div>'; }},
  conn:{t:'🔗 段落銜接詞（第三題）', h:function(){
    var G=[['開頭：說出看法',[['C’est une question qui mérite réflexion.','這是一個值得思考的問題。'],['C’est une question intéressante. Pour répondre, je vais commencer par…','這個問題很有意思。我先從……講起。'],['Aujourd’hui, le thème de… est très présent dans notre société.','現在……這個主題在社會上很常見。'],['À mon avis, c’est un sujet complexe, mais je pense que…','我覺得這個題目很複雜，但我認為……'],['Pour ma part, je pense que…','就我來說，我認為……'],['Il me semble que…','我覺得……']]],
      ['順序',[['d’abord / premièrement','首先'],['ensuite / deuxièmement','其次'],['puis / après cela','然後'],['enfin / finalement','最後']]],
      ['補充',[['de plus / en outre / par ailleurs','此外'],['également / aussi','也']]],
      ['轉折',[['mais / cependant / toutefois','但是'],['néanmoins / en revanche','然而、相反地'],['malgré cela','儘管如此']]],
      ['因果',[['parce que / car / puisque','因為'],['donc / c’est pourquoi / par conséquent','所以'],['grâce à','多虧（好的原因）'],['à cause de','因為（壞的原因）']]],
      ['好處和壞處',[['être bénéfique à / favoriser / contribuer à / améliorer','對……有益／促進／有助於／改善'],['être nuisible à / causer / poser problème / nuire à','對……有害／造成／帶來問題／損害']]],
      ['舉例',[['Par exemple…','例如……'],['Prenons l’exemple de…','舉……為例'],['C’est le cas notamment de…','……尤其是這種情況']]],
      ['結尾',[['En résumé / En conclusion / Pour conclure','總之'],['Pour finir / Pour terminer','最後'],['Voilà ce que je pense sur ce sujet.','這就是我對這個題目的看法。'],['La question reste ouverte.','這個問題還沒有定論。']]]];
    return G.map(function(g){ return '<div class="dexhead">'+esc(g[0])+'</div>'+frList(g[1]); }).join(''); }},
  ask:{t:'❓ 三種問句＋疑問詞（第二題）', h:function(){
    return '<div class="story">第二題考的是「看情境問問題」：2 分鐘準備（可以寫大綱），3 分 30 秒跟考官對話，寶典建議準備 10–15 個問題。</div>'+
      '<div class="dexhead">是非問句（答 oui／non）</div>'+
      '<div class="muted">好處：考官照你的框架走，答案短、比較聽得懂。缺點：用太多考官會答得很短，你要一直想下一題 → 跟開放問句混著用。</div>'+
      '<details class="movecard" open><summary><b>① 語調上揚</b> <small class="muted">口語最常用</small></summary>'+frList([['Les prix sont compris ?','價格都含了嗎？'],['Si je veux une cabine avec vue sur l’océan, c’est possible ?','如果我想要看得到海的艙房，可以嗎？']])+'</details>'+
      '<details class="movecard"><summary><b>② Est-ce que＋直述句</b> <small class="muted">日常最常用</small></summary>'+frList([['Est-ce qu’on peut réserver directement avec vous ?','可以直接跟你們訂嗎？'],['Est-ce qu’il y a des activités pour les enfants ?','有給小孩的活動嗎？']])+'</details>'+
      '<details class="movecard"><summary><b>③ 倒裝</b> <small class="muted">比較正式</small></summary>'+frList([['Pouvez-vous me dire les horaires ?','可以告訴我時間嗎？'],['Puis-je payer en plusieurs fois ?','可以分期付嗎？（je peux 倒裝要變成 puis-je）'],['Faut-il réserver à l’avance ?','要先預約嗎？'],['Y a-t-il des réductions pour les étudiants ?','學生有折扣嗎？（動詞母音結尾，中間加 -t-）'],['Le bateau est-il accessible aux personnes à mobilité réduite ?','行動不便的人可以上船嗎？（主詞是名詞：名詞放前面，後面再倒裝代名詞）']])+'</details>'+
      '<div class="dexhead">開放問句（要對方給資訊）</div>'+frList([['Quel est le prix de l’appartement ?','公寓多少錢？'],['Quels sont les moyens de transport disponibles ?','有哪些交通工具可以搭？'],['À quelle heure est-ce que ton enfant se couche d’habitude ?','你的小孩通常幾點睡？'],['Qui contrôle l’ouverture des portes ?','誰負責開關門？（問人：qui）'],['Qu’est-ce qui contrôle l’ouverture des portes ?','什麼東西控制開關門？（問東西當主詞：qu’est-ce qui）'],['Qu’est-ce que tu regardes ?','你在看什麼？（問東西當受詞：qu’est-ce que）'],['Que se passe-t-il en cas de mauvais temps ?','天氣不好的話怎麼辦？'],['Où se trouve le musée ?','博物館在哪裡？'],['Combien coûte une croisière d’une semaine ?','一週的郵輪多少錢？'],['Comment se passe la réservation ?','預訂的流程是怎樣？']])+
      '<div class="dexhead">順著考官的回答追問</div><div class="muted">例：租房子，考官說在市中心 → <span class="fr">Ce n’est pas trop bruyant ?</span>（不會太吵嗎？）⛔ 不要完全不回應、一題接一題乾問，會像在背稿。</div>'+
      fixNote('寶典把 À quelle heure 那句寫成 à quelle heure est-ce que ton enfant a l’habitude de se coucher（可以，但比較長）；Comment se déroule le processus de réservation 簡化成 Comment se passe la réservation；其他句子拼字錯的（regards、Combine、Ou se trouve）已改正。'); }},
  open:{t:'👋 開場 ABC＋結尾（第二題）', h:function(){
    return '<div class="story">開場＝A 打招呼（＋背景）＋B 說你的興趣或目的＋C 請對方幫忙。開得順，後面比較不緊張。</div>'+
      '<div class="dexhead">⚠️ 先看對方是誰</div><div class="muted">不認識的人（機構人員、店員、新環境的鄰居或同事）→ 用 <b>vous</b>；朋友 → 用 <b>tu</b>。</div>'+
      '<details class="movecard" open><summary><b>不認識的人 → vous</b></summary>'+
        '<div class="muted">A 背景</div>'+frList([['Bonjour, je suis nouveau / nouvelle dans le quartier.','你好，我剛搬來這一區。'],['Bonjour ! Je viens d’arriver au Canada.','你好！我剛到加拿大。'],['Bonjour, je viens d’emménager dans l’immeuble.','你好，我剛搬進這棟大樓。'],['Bonjour, on m’a dit que vous…','你好，我聽說您……']])+
        '<div class="muted">B 興趣／目的</div>'+frList([['Je suis intéressé(e) par votre annonce.','我對你們的廣告有興趣。'],['Ça m’intéresse beaucoup.','我很有興趣。'],['Je voudrais… / J’aimerais…','我想要……'],['Je cherche des idées pour…','我在找……的點子。']])+
        '<div class="muted">C 請對方幫忙</div>'+frList([['J’aimerais vous poser quelques questions.','我想問您幾個問題。'],['Vous pouvez m’en dire plus ?','可以多跟我說一些嗎？'],['Pourriez-vous me donner plus d’informations sur… ?','可以給我更多……的資訊嗎？'],['Je voudrais en savoir plus sur…','我想多了解……']])+'</details>'+
      '<details class="movecard"><summary><b>朋友 → tu</b> <small class="muted">多半是問他過去的經歷或經驗，時態比較多變</small></summary>'+
        '<div class="muted">A 打招呼＋點出題目</div>'+frList([['Salut ! On m’a dit que tu avais changé de poste.','嗨！聽說你換職位了。（avais changé＝愈過去式）'],['Salut ! J’ai vu ton blog.','嗨！我看到你的部落格了。'],['Salut ! J’ai appris que tu pratiques un sport depuis longtemps.','嗨！聽說你運動很久了。']])+
        '<div class="muted">B 好奇／興趣</div>'+frList([['Ça s’est bien passé ?','還順利嗎？'],['C’était comment ?','怎麼樣？'],['Ça a l’air sympa !','看起來很不錯！'],['Félicitations !','恭喜！']])+
        '<div class="muted">C 請他幫忙</div>'+frList([['Tu peux m’en dire plus ?','可以多說一點嗎？'],['Tu pourrais me donner quelques conseils ?','可以給我一些建議嗎？'],['Tu pourrais m’expliquer comment ça fonctionne ?','可以跟我說是怎麼運作的嗎？']])+'</details>'+
      '<div class="dexhead">結尾</div>'+frList([['Merci beaucoup pour toutes ces informations !','謝謝你告訴我這麼多！'],['Je vais réfléchir (et en parler avec…).','我會想一想（再跟……討論）。'],['Je vais réfléchir et probablement m’inscrire bientôt.','我會考慮，應該很快就會報名。']])+
      fixNote('寶典寫 J’aimerais bien de vous poser quelque questions → 標準是 J’aimerais vous poser quelques questions；Comment s’est passé ? → Comment ça s’est passé ?；tu va faire → tu vas faire；寶典說「針對過往經歷用未完成過去式 tu avais…」，但 tu avais changé 其實是愈過去式。'); }},
  angles:{t:'🧰 通用問題角度＋人設（第二題）', h:function(){
    return '<div class="story">寶典：大部分題目都會碰到商品、服務或活動，下面這幾個角度幾乎每題都問得到。先熟 2–3 種問法就好，熟了再加。</div>'+
      EXAM_ANGLES.map(function(a){ return '<details class="movecard"><summary>'+a[0]+' <b>'+esc(a[1])+'</b></summary>'+frList(a[2])+'</details>'; }).join('')+
      '<div class="dexhead">固定一個人設</div><div class="muted">寶典建議平常就固定幾個人設，考場上自然會多出問題：家庭（<span class="fr">seul(e)／en couple／en famille avec des enfants</span>）、寵物、有沒有駕照、新移民（<span class="fr">les nouveaux arrivants</span>）、過敏（<span class="fr">être allergique à…</span>）、吃素、住市中心（<span class="fr">en centre-ville</span>）或郊區（<span class="fr">en banlieue</span>）。用你自己真實的情況最好記。</div>'; }},
  react:{t:'😊 自然回應（第二題）', h:function(){
    return '<div class="story">考官回答完，先回一句再問下一題，對話才自然。寶典說 CLB7 至少要會基本和簡單版。</div>'+
      '<div class="dexhead">謝謝、很好</div>'+frList([['Merci beaucoup !',''],['C’est parfait !',''],['Super, merci !',''],['Très bien !',''],['C’est une excellente idée.','好主意。'],['Ça me semble parfait.','聽起來很完美。'],['C’est génial !','太棒了！']])+
      '<div class="dexhead">可惜、了解</div>'+frList([['C’est dommage.','真可惜。'],['Ah, je comprends.','啊，我懂了。'],['D’accord, tant pis.','好吧，那算了。'],['C’est un peu décevant.','有點失望。']])+
      '<div class="dexhead">進階</div>'+frList([['Merci beaucoup, je ne savais pas, c’est vraiment utile.','謝謝，我之前不知道，真的很有用。'],['C’est vraiment dommage, mais je comprends.','真的很可惜，但我了解。'],['C’est exactement ce dont j’avais besoin.','這正是我需要的。']])+
      fixNote('寶典寫 je ne savais pas cela → 口語通常只說 je ne savais pas。'); }}
};
/* 寶典 第 1 章四「常用人設與通用問題」：時間、空間、錢、特殊情況與售後（取原句，拼字錯的已改） */
var EXAM_ANGLES=[
  ['⏰','時間',[['Quels sont les horaires d’ouverture ?','營業時間是幾點到幾點？'],['À partir de quelle heure le musée est-il ouvert ?','博物館幾點開始開？'],['Jusqu’à quelle heure fonctionne le métro ?','捷運開到幾點？'],['Combien de temps dure la visite guidée ?','導覽多久？'],['Est-ce que la bibliothèque est ouverte les jours fériés ?','圖書館國定假日有開嗎？']]],
  ['📍','地點和交通',[['Où se trouve ce parc ?','這個公園在哪裡？'],['Est-ce qu’il y a une école près d’ici ?','附近有學校嗎？'],['Comment peut-on aller à… ?','怎麼去……？'],['Y a-t-il une station de métro à proximité ?','附近有捷運站嗎？'],['Où peut-on se garer gratuitement ?','哪裡可以免費停車？']]],
  ['💶','錢',[['Combien ça coûte ?','多少錢？'],['Quel est le prix de… ?','……的價格是多少？'],['Y a-t-il des réductions pour les étudiants ?','學生有折扣嗎？'],['C’est payant ou gratuit ?','要錢還是免費？'],['Est-ce que je peux payer par carte bancaire ?','可以刷卡嗎？']]],
  ['👨‍👩‍👧','特殊需求（人）',[['Avez-vous un service de garde d’enfants pendant la visite ?','參觀的時候有托兒服務嗎？'],['Est-ce que vous avez un lit bébé ?','有嬰兒床嗎？'],['Y a-t-il des rampes d’accès pour les fauteuils roulants ?','有輪椅坡道嗎？'],['Proposez-vous des menus végétariens ou sans gluten ?','有素食或無麩質的菜單嗎？'],['Est-ce qu’il y a un guide qui parle anglais ?','有會說英文的導遊嗎？']]],
  ['🌧️','天氣和突發狀況',[['Que se passe-t-il si le temps est mauvais pendant l’excursion ?','出遊時天氣不好怎麼辦？'],['Comment gérez-vous les annulations en cas de mauvais temps ?','天氣不好取消的話怎麼處理？']]],
  ['📜','規定和售後',[['Quelle est votre politique de remboursement ?','退款規定是什麼？'],['Est-ce que je peux annuler ma réservation sans frais ?','可以免費取消預訂嗎？'],['Puis-je modifier ma réservation ?','可以改預訂嗎？'],['Comment faire une réclamation en cas de problème ?','有問題的話怎麼申訴？']]],
  ['🧩','內容（要配合題目準備）',[['Quels services proposez-vous ?','你們提供哪些服務？'],['Quelles activités sont disponibles ?','有哪些活動可以參加？']]]
];
/* 考官追問：只用寶典裡出現過的問法（Et alors ? 出自 1.2；Pourquoi ? 出自題目；Par exemple 出自 1.3） */
var EXAM_FOLLOW=[['Pourquoi ?','為什麼？→ 補一個理由'],['Par exemple ?','例如呢？→ 給一個身邊的例子（📸 特寫）'],['Et alors ?','那又怎樣？→ 把這個點往上提到一個維度']];

/* ---------- 小工具 ---------- */
function LS(k, d){ try{ var v=JSON.parse(localStorage.getItem(k)); return v==null?d:v; }catch(e){ return d; } }
function LSset(k, v){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){} }
function bump(k, id){ var o=LS(k,{}), r=o[id]||{n:0}; r.n++; r.last=Date.now(); o[id]=r; LSset(k,o); }
function shuf(a){ a=a.slice(); for(var i=a.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)), t=a[i]; a[i]=a[j]; a[j]=t; } return a; }
/* 挑題：最近 3 天跳過的放最後（⛔ 不刪，只是少出現）；講過次數少的優先；同分隨機 */
function pickFrom(list, idOf){
  var kn=LS('clb7_exam_known',{}), dn=LS('clb7_exam_done',{}), now=Date.now();
  var w=function(x){ var id=idOf(x), k=kn[id], d=dn[id]; return (k&&now-k.last<3*86400000?100:0) + (k?k.n*3:0) + (d?d.n:0) + Math.random(); };
  return list.map(function(x){ return {x:x, w:w(x)}; }).sort(function(a,b){ return a.w-b.w; })[0].x;
}
var timerH=null;
function stopTimer(){ if(timerH){ clearInterval(timerH); timerH=null; } }
function fmt(s){ s=Math.max(0,Math.round(s)); return Math.floor(s/60)+':'+('0'+s%60).slice(-2); }
function mineBlock(ref, q){
  return '<details class="minebox"><summary class="muted">✍️ 我會這樣講（記下來，我之後只幫你修語法）</summary><textarea class="fill" id="exMine" rows="3" lang="fr" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="用你自己的話寫你剛剛講的重點，講錯沒關係"></textarea>'+
    '<button class="btn" id="exMineGo" data-ref="'+esc(ref)+'" data-q="'+esc(q)+'">記下來</button><div class="muted" id="exMineOk" style="font-size:.8em"></div></details>';
}
sheet.addEventListener('click', function(e){ var b=e.target.closest && e.target.closest('#exMineGo'); if(!b) return; e.stopPropagation();
  var v=String((document.getElementById('exMine')||{}).value||'').trim(); if(!v) return;
  var a=LS('clb7_exam_mine',[]); a.push({ts:Date.now(), ref:b.dataset.ref, q:b.dataset.q, mine:v}); LSset('clb7_exam_mine', a.slice(-300));
  document.getElementById('exMineOk').textContent='✓ 記下了'; document.getElementById('exMine').value=''; });
function flagBtn(ctx){ return '<button class="btn ghost" id="exFlag" data-ctx="'+esc(ctx)+'" title="回報問題">🚩</button>'; }
sheet.addEventListener('click', function(e){ var b=e.target.closest && e.target.closest('#exFlag'); if(!b) return; e.stopPropagation();
  var t=prompt('這一題有什麼問題？（中文翻錯、法文怪怪的、題目重複…）'); if(!t||!t.trim()) return;
  if(window.GameLog) GameLog.report({src:'town', kind:'考場島', ref:'exam', q:b.dataset.ctx, a:'', pick:''}, t.trim()); toast('🚩 收到了，謝謝'); });

/* ---------- 第三題一站 ---------- */
function examT3(z, q){
  stopTimer();
  var Z=EXAM_ZONES[z], pool=EXAM_T3.filter(function(x){ return x.z===z; }); if(!pool.length) return;
  q=q||pickFrom(pool, function(x){ return x.id; });
  var dims=LS('clb7_exam_dims',{})[q.id]||[], show=false, zh=false;
  function paint(){
    var h='<h3>'+pix(Z.em,26)+' '+esc(Z.name)+' <small>第三題・表達看法</small></h3>'+
      '<div class="story">🦉 考官念題目。<b>先只用聽的</b>，聽不懂再看字。</div>'+
      '<div class="row2" style="margin:4px 0"><button class="btn" id="exSay">🔊 再念一次</button><button class="btn ghost" id="exShow">'+(show?'🙈 收起題目':'👀 看題目')+'</button><button class="btn ghost" id="exZh">'+(zh?'收起中文':'🀄 中文')+'</button></div>'+
      (show?'<div class="clue fr">'+esc(q.fr)+'</div>'+(q.note?fixNote(q.note):''):'')+
      (zh?'<div class="muted">'+(q.zh?esc(q.zh):'題目大意：'+esc(q.t||''))+'</div>':'')+
      '<div class="dexhead">🧭 準備：這題你要從哪 2–3 個維度講？</div><div class="opts" id="exDims" style="flex-direction:row;flex-wrap:wrap">'+
      EXAM_DIMS.map(function(d){ var on=dims.indexOf(d[0])>=0; return '<button data-dim="'+d[0]+'" class="'+(on?'ok':'')+'" style="flex:1 1 30%">'+d[1]+' '+esc(d[3])+'</button>'; }).join('')+'</div>'+
      (dims.length?'<div class="muted" style="font-size:.8em">'+dims.map(function(k){ var d=dimById(k); return d[1]+' '+d[4].slice(0,3).map(function(s){ return s[1]; }).join('、'); }).join('<br>')+'</div>':'')+
      '<details class="movecard"><summary>📦 這一類常用的詞</summary>'+frList(Z.vocab)+'</details>'+
      '<details class="movecard"><summary>🎬 怎麼排：遠景→拉近→特寫→拉遠</summary><div class="muted">① 你怎麼看 ② 為什麼 ③ 一個例子或比較 ④ 回到主張。每個維度走一輪。</div></details>'+
      '<div class="row2"><button class="btn ghost" id="exSkip">⏭ 這題跳過</button>'+flagBtn('🎤 考場島 '+Z.name+'｜'+q.id+'｜'+q.fr)+'<button class="btn main" id="exGo">🎙 開始講（4:30）</button></div>'+
      '<div class="row2"><button class="btn ghost" id="exOther">🔀 同一類換一題</button><button class="btn ghost" id="exBack">回島上</button></div>';
    openSheet(h, true);
    document.getElementById('exSay').onclick=function(){ speak(q.fr); };
    document.getElementById('exShow').onclick=function(){ show=!show; paint(); };
    document.getElementById('exZh').onclick=function(){ zh=!zh; paint(); };
    sheet.querySelectorAll('[data-dim]').forEach(function(b){ b.onclick=function(){ var k=b.dataset.dim, i=dims.indexOf(k); if(i>=0) dims.splice(i,1); else dims.push(k);
      var all=LS('clb7_exam_dims',{}); if(dims.length) all[q.id]=dims.slice(); else delete all[q.id]; LSset('clb7_exam_dims', all); paint(); }; });
    document.getElementById('exSkip').onclick=function(){ bump('clb7_exam_known', q.id); if(window.GameLog) GameLog.answer(null,{kind:'🎤 考場島', ref:'exam:'+q.id}); examT3(z); };
    document.getElementById('exOther').onclick=function(){ examT3(z); };
    document.getElementById('exBack').onclick=function(){ stopTimer(); closeSheet(); };
    document.getElementById('exGo').onclick=talk;
  }
  function talk(){
    var t0=Date.now(), T=270, asked=[], fu=shuf(EXAM_FOLLOW);
    var h='<h3>🎙 講吧 <small>'+pix(Z.em,20)+' '+esc(Z.name)+'</small></h3>'+
      '<div style="text-align:center;font-size:2.6em;font-variant-numeric:tabular-nums;color:#fff3c0" id="exClock">4:30</div>'+
      '<div class="muted" style="text-align:center">講出聲音最好。⛔ 不用講滿也沒關係，講到一個段落就可以停。</div>'+
      (show?'<div class="muted fr" style="margin-top:6px">'+esc(q.fr)+'</div>':'<div class="row2"><button class="btn ghost" id="exPeek">👀 忘記題目了</button></div>')+
      (dims.length?'<div class="story">你選的維度：'+dims.map(function(k){ var d=dimById(k); return d[1]+' '+esc(d[3]); }).join('　')+'</div>':'')+
      '<div class="muted">每個維度：🔭 看法 → 🔎 為什麼 → 📸 例子 → 🔭 收回來</div>'+
      '<div id="exFu"></div>'+
      '<div class="row2"><button class="btn ghost" id="exAsk">🦉 考官追問一句</button><button class="btn main" id="exEnd">講完了</button></div>';
    openSheet(h, true); speak(q.fr);
    var pk=document.getElementById('exPeek'); if(pk) pk.onclick=function(){ pk.outerHTML='<div class="muted fr">'+esc(q.fr)+'</div>'; };
    document.getElementById('exAsk').onclick=function(){ var f=fu[asked.length%fu.length]; asked.push(f[0]); speak(f[0]);
      document.getElementById('exFu').innerHTML='<div class="clue fr">🦉 '+esc(f[0])+' '+spk(f[0])+'</div><div class="muted">'+esc(f[1])+'</div>'; };
    var fuAt=Math.round(110+Math.random()*60), fuDone=false;
    timerH=setInterval(function(){ var el=document.getElementById('exClock'); if(!el){ stopTimer(); return; } var left=T-(Date.now()-t0)/1000;
      el.textContent=fmt(left); if(!fuDone && T-left>=fuAt){ fuDone=true; var b=document.getElementById('exAsk'); if(b) b.click(); }
      if(left<=0){ el.textContent='0:00'; el.style.color='#8fc3ff'; stopTimer(); toast('⏱ 4 分 30 秒到了'); } }, 250);
    document.getElementById('exEnd').onclick=function(){ stopTimer(); done(Math.round((Date.now()-t0)/1000)); };
  }
  function done(sec){
    bump('clb7_exam_done', q.id);
    if(window.GameLog){ GameLog.event('exam_t3'); GameLog.answer(true,{kind:'🎤 考場島', topic:'exam-t3-'+z, ref:'exam:'+q.id, ms:sec*1000, q:q.fr, a:'', pick:''}); }
    S.gold=(S.gold||0)+3; save(); if(typeof hud==='function') hud();
    openSheet('<h3>👍 講完了 <small>'+fmt(sec)+'</small></h3><div class="muted fr">'+esc(q.fr)+'</div>'+
      '<div class="story">回想一下：每個維度有沒有走到 📸 例子？最後有沒有收回主張？</div>'+
      mineBlock('t3:'+q.id, q.fr)+
      '<div class="row2"><button class="btn ghost" id="exAgain">同一題再講一次</button><button class="btn" id="exNext">同一類下一題</button><button class="btn main" id="exBack">回島上</button></div>', true);
    document.getElementById('exAgain').onclick=function(){ examT3(z, q); };
    document.getElementById('exNext').onclick=function(){ examT3(z); };
    document.getElementById('exBack').onclick=closeSheet;
  }
  paint(); speak(q.fr);
}

/* ---------- 第二題櫃台 ---------- */
function examT2(cat, sit){
  stopTimer();
  var pool=EXAM_T2_SITS.map(function(s,i){ return {i:i, c:s[0], fr:s[1], zh:s[2]}; }).filter(function(s){ return !cat || s.c===cat; });
  sit=sit||pickFrom(pool, function(x){ return 't2:'+x.i; });
  var id='t2:'+sit.i, tu=/\bami/i.test(sit.fr) && !/^Je (travaille|suis (agent|professeur|propriétaire|la secrétaire|l’assistante|le gardien|responsable|parent))/i.test(sit.fr);   /* 朋友→tu；工作人員、鄰居、同事→vous（寶典：新環境的鄰居同事算不認識的人） */
  var show=false, picked={};
  function paint(){
    var h='<h3>🛎️ 第二題櫃台 <small>'+esc(EXAM_T2_CATS[sit.c]||'')+'</small></h3>'+
      '<div class="story">🦉 考官念情境，你要扮演發問的人。'+(tu?'對方是<b>朋友 → 用 tu</b>':'對方<b>不熟或是工作人員 → 用 vous</b>')+'</div>'+
      '<div class="row2" style="margin:4px 0"><button class="btn" id="exSay">🔊 再念一次</button><button class="btn ghost" id="exShow">'+(show?'🙈 收起':'👀 看情境')+'</button></div>'+
      (show?'<div class="clue fr">'+esc(sit.fr)+'</div>':'')+'<div class="muted">情境大意：'+esc(sit.zh)+'</div>'+
      '<div class="dexhead">🧰 準備（考試有 2 分鐘）：這題你要問哪些角度？</div><div class="opts" style="flex-direction:row;flex-wrap:wrap">'+
      EXAM_ANGLES.map(function(a,i){ return '<button data-ang="'+i+'" class="'+(picked[i]?'ok':'')+'" style="flex:1 1 30%">'+a[0]+' '+esc(a[1])+'</button>'; }).join('')+'</div>'+
      Object.keys(picked).map(function(i){ var a=EXAM_ANGLES[i]; return '<details class="movecard"><summary>'+a[0]+' '+esc(a[1])+' 的問法</summary>'+frList(a[2])+'</details>'; }).join('')+
      '<details class="movecard"><summary>👋 開場和結尾</summary><div class="muted">A 打招呼（＋背景）→ B 你的興趣或目的 → C 請對方幫忙。完整句子在碼頭告示牌的「開場 ABC」。</div>'+
        frList(tu?[['Salut ! J’ai entendu dire que…',''],['Tu peux m’en dire plus ?',''],['Merci beaucoup pour toutes ces informations !','']]:[['Bonjour, je viens d’arriver au Canada.',''],['J’aimerais vous poser quelques questions.',''],['Merci beaucoup pour toutes ces informations !','']])+'</details>'+
      '<div class="row2"><button class="btn ghost" id="exSkip">⏭ 這題跳過</button>'+flagBtn('🛎️ 考場島 第二題｜'+sit.fr)+'<button class="btn main" id="exGo">🎙 開始問（3:30）</button></div>'+
      '<div class="row2"><button class="btn ghost" id="exCat">換類別</button><button class="btn ghost" id="exOther">🔀 換一個情境</button><button class="btn ghost" id="exBack">回島上</button></div>';
    openSheet(h, true);
    document.getElementById('exSay').onclick=function(){ speak(sit.fr); };
    document.getElementById('exShow').onclick=function(){ show=!show; paint(); };
    sheet.querySelectorAll('[data-ang]').forEach(function(b){ b.onclick=function(){ var i=b.dataset.ang; if(picked[i]) delete picked[i]; else picked[i]=1; paint(); }; });
    document.getElementById('exSkip').onclick=function(){ bump('clb7_exam_known', id); if(window.GameLog) GameLog.answer(null,{kind:'🛎️ 考場島', ref:'exam:'+id}); examT2(cat); };
    document.getElementById('exOther').onclick=function(){ examT2(cat); };
    document.getElementById('exCat').onclick=catPick;
    document.getElementById('exBack').onclick=function(){ stopTimer(); closeSheet(); };
    document.getElementById('exGo').onclick=talk;
  }
  function catPick(){
    openSheet('<h3>🛎️ 選一類情境</h3><div class="opts">'+Object.keys(EXAM_T2_CATS).map(function(k){ return '<button data-c="'+k+'">'+esc(EXAM_T2_CATS[k])+'</button>'; }).join('')+'<button data-c="">🎲 不分類，隨便抽</button></div>', true);
    sheet.querySelectorAll('[data-c]').forEach(function(b){ b.onclick=function(){ examT2(b.dataset.c||null); }; });
  }
  function talk(){
    var t0=Date.now(), T=210, n=0;
    openSheet('<h3>🎙 問吧 <small>'+esc(sit.zh)+'</small></h3>'+
      '<div style="text-align:center;font-size:2.6em;font-variant-numeric:tabular-nums;color:#fff3c0" id="exClock">3:30</div>'+
      '<div class="muted" style="text-align:center">每問一題就按一下 ➕。考官回答後先回一句（<span class="fr">D’accord ! / C’est parfait !</span>）再問下一題。</div>'+
      '<div style="text-align:center;margin:10px 0"><button class="btn main" id="exPlus" style="font-size:1.3em">➕ 問了一題</button> <span id="exN" class="muted"></span></div>'+
      '<div class="muted">角度：'+(Object.keys(picked).length?Object.keys(picked).map(function(i){ return EXAM_ANGLES[i][0]+' '+esc(EXAM_ANGLES[i][1]); }).join('　'):EXAM_ANGLES.map(function(a){ return a[0]; }).join(' '))+'</div>'+
      '<div class="row2"><span></span><button class="btn main" id="exEnd">問完了</button></div>', true);
    speak(sit.fr);
    document.getElementById('exPlus').onclick=function(){ n++; document.getElementById('exN').textContent='已經問了 '+n+' 題'; };
    timerH=setInterval(function(){ var el=document.getElementById('exClock'); if(!el){ stopTimer(); return; } var left=T-(Date.now()-t0)/1000; el.textContent=fmt(left);
      if(left<=0){ el.textContent='0:00'; el.style.color='#8fc3ff'; stopTimer(); toast('⏱ 3 分 30 秒到了'); } }, 250);
    document.getElementById('exEnd').onclick=function(){ stopTimer(); done(Math.round((Date.now()-t0)/1000), n); };
  }
  function done(sec, n){
    bump('clb7_exam_done', id);
    if(window.GameLog){ GameLog.event('exam_t2'); GameLog.answer(true,{kind:'🛎️ 考場島', topic:'exam-t2-'+sit.c, ref:'exam:'+id, ms:sec*1000, q:sit.fr, a:String(n), pick:''}); }
    S.gold=(S.gold||0)+3; save(); if(typeof hud==='function') hud();
    openSheet('<h3>👍 問完了 <small>'+fmt(sec)+(n?'・'+n+' 題':'')+'</small></h3><div class="muted">'+esc(sit.zh)+'</div>'+
      '<div class="story">回想一下：有沒有哪個角度一直卡住、想不出問法？下次先點那個角度看問法。</div>'+
      mineBlock(id, sit.fr)+
      '<div class="row2"><button class="btn ghost" id="exAgain">同一個情境再問一次</button><button class="btn" id="exNext">下一個情境</button><button class="btn main" id="exBack">回島上</button></div>', true);
    document.getElementById('exAgain').onclick=function(){ examT2(cat, sit); };
    document.getElementById('exNext').onclick=function(){ examT2(cat); };
    document.getElementById('exBack').onclick=closeSheet;
  }
  paint(); speak(sit.fr);
}

/* ---------- 碼頭告示牌：方法卡 ---------- */
function examBoard(){
  stopTimer(); S.examBoardSeen=1; save();
  var L=[['dims','arg','conn'],['ask','open','angles','react']];
  openSheet('<h3>🪧 考場島・方法告示牌</h3>'+
    '<div class="story">這座島練的是考試的口說第二題、第三題：<br>🛎️ 碼頭旁的櫃台＝第二題（看情境問問題）<br>島上七區＝第三題七大類（聽題目、選維度、講 4 分半）。</div>'+
    '<div class="dexhead">🎤 第三題：表達看法</div><div class="opts">'+L[0].map(function(k){ return '<button data-card="'+k+'">'+esc(EXAM_CARDS[k].t)+'</button>'; }).join('')+'</div>'+
    '<div class="dexhead">🛎️ 第二題：問問題</div><div class="opts">'+L[1].map(function(k){ return '<button data-card="'+k+'">'+esc(EXAM_CARDS[k].t)+'</button>'; }).join('')+'</div>'+
    '<div class="muted" style="font-size:.8em;margin-top:8px">⚠️ 寶典作者寫明：題目來自公開的網路資源，不代表真實考題。拿來練思路和問法，不是押題。⛔ 這裡不放範文。</div>'+
    '<div class="row2"><span></span><button class="btn main" id="bdok">出發</button></div>', true);
  sheet.querySelectorAll('[data-card]').forEach(function(b){ b.onclick=function(){ var C=EXAM_CARDS[b.dataset.card];
    openSheet('<h3>'+esc(C.t)+'</h3>'+C.h()+'<div class="row2"><button class="btn ghost" id="cdB">回告示牌</button><button class="btn main" id="cdX">關閉</button></div>', true);
    document.getElementById('cdB').onclick=examBoard; document.getElementById('cdX').onclick=closeSheet; }; });
  document.getElementById('bdok').onclick=function(){ ISLE.boardAway=0; closeSheet(); };
}
/* 🦉 島主＝考官 */
function examHost(){
  var H=ISLE.host; if(!H) return; H.met=true; S.isleHost=S.isleHost||{}; S.isleHost.EXAM=1; save();
  var b0=document.getElementById('ibub'); if(b0) b0.remove();
  openSheet('<h3>'+pix(H.em,28)+' '+esc(H.name)+'</h3><div class="story">我是考官。走到哪一區，我就出那一類的題目；也可以直接叫我隨便出一題。</div>'+
    '<div class="opts"><button id="hT3">🎲 第三題：隨便一類出一題</button><button id="hT2">🛎️ 第二題：抽一個情境</button><button id="hBd">🪧 看方法告示牌</button><button id="hBye">👋 先自己逛</button></div>', true);
  document.getElementById('hT3').onclick=function(){ examT3(EXAM_ZORDER[Math.floor(Math.random()*EXAM_ZORDER.length)]); };
  document.getElementById('hT2').onclick=function(){ examT2(null); };
  document.getElementById('hBd').onclick=examBoard;
  document.getElementById('hBye').onclick=closeSheet;
}
function examOpen(g){ var b=document.getElementById('ibub'); if(b) b.remove(); if(g.exam==='t2') examT2(null); else examT3(g.exam); }

/* ---------- 地形：沿用自我介紹島的島形和步道；八站＝櫃台＋七類 ---------- */
ISLE_SCENES.EXAM={ name:'考場島', exam:true, W:26, H:35,
  blobs:[[12.5,17,10.3,14.6],[7,25,5.5,5],[19,10,5,5],[13,5,6,4]],
  zones:[ {name:'🛎️ 第二題櫃台', y0:25.5, y1:99, tint:'#8cc06a'}, {name:'🎤 第三題・生活與工作', y0:15, y1:25.5, tint:'#7fbf5f'}, {name:'🎤 第三題・社會與世界', y0:-9, y1:15, tint:'#93b8a4'} ],
  path:[[13,32.2],[13,29.2],[11,28],[7.5,27],[5.2,24.6],[6,21.2],[13,21],[20,21],[20.4,17],[19.5,15],[13,15],[6,15],[5.6,11],[7,9],[13,8.6],[18.5,9],[18,6],[13,4.4]],
  dock:[13,30.4,33.6], tablet:{x:13,y:18.1}, board:{x:14.8, y:29.4}, boardLab:'方法告示牌', tabletLab:'🦉 考官出題', outline:[],
  deco:[['🌴',3.2,28.6],['🌴',20.2,25.4],['🌴',3.0,18.4],['🌴',22.6,13.0],['🌳',16.6,25.8],['🌸',14.6,24.4],['🪨',22.0,19.2],['🌳',8.2,18.4],['🌳',17.4,18.6],['🌲',9.2,5.4],['🌲',17.6,4.0],['🪨',5.8,7.0],['🌸',11.0,11.6],['🌳',16.6,12.0]],
  st:[ ['t2','🛎️','🦉','第二題櫃台',[9.6,26.6]], ['tech','📱','','科技與媒體',[4.6,23.0]], ['rel','👪','','家庭、關係與教育',[10.2,22.2]], ['work','💼','','工作',[19.2,20.0]],
       ['cult','🌍','','文化與移民',[18.4,16.0]], ['sante','🥗','','健康、飲食與生活',[8.2,16.0]], ['env','🌱','','環境、交通與動物',[9.0,9.8]], ['soc','⚖️','','政治與社會',[15.0,9.8]] ] };
ISLE_HOSTS.EXAM=['🦉','考官 Hibou'];
ARCH_ICON.EXAM='🎤';

/* ---------- 包住島引擎的函式 ---------- */
var _units=isleUnits;
isleUnits=function(id){ var sc=isleSpec(id); if(!sc||!sc.exam) return _units(id);
  return sc.st.map(function(s,i){ return {n:i+1, exam:s[0], em:s[1], prop:s[2], lab:s[3], x:s[4][0], y:s[4][1], ref:'EXAM:'+s[0], s:{fr:'', zh:s[3], key:s[0], part:''}, R:{name:sc.name}}; }); };
var _visit=storyIsleVisit;
storyIsleVisit=function(id){ if(id==='EXAM') return; return _visit.apply(this, arguments); };   /* 考場島不算第三章「走完一座島」 */
var _board=isleBoard;
isleBoard=function(){ if(ISLE.id!=='EXAM') return _board(); if(ISLE.examSkipAuto){ ISLE.examSkipAuto=false; return; } examBoard(); };   /* 上島自動打開只有第一次；之後走回告示牌旁才打開 */
var _host=isleHostTalk;
isleHostTalk=function(){ if(ISLE.id!=='EXAM') return _host(); examHost(); };
var _enter=isleEnter;
isleEnter=function(id){ ISLE.examSkipAuto= id==='EXAM' && !!S.examBoardSeen; _enter(id); if(id!=='EXAM') return;
  ['izh','ilist','irun','ijoint'].forEach(function(k){ var e=document.getElementById(k); if(e) e.style.display='none'; });
  var nav=ihud.querySelector('.inav'); if(nav){ var b=document.createElement('button'); b.id='iexam'; b.textContent='🎲 抽一題'; b.onclick=function(){ if(!busy) examHost(); }; nav.insertBefore(b, document.getElementById('inext')); }
  var r=document.getElementById('irail'); if(r) r.style.display='none';
  var h=document.getElementById('ihint'); if(h) h.textContent='⛵ 靠岸了。🛎️ 碼頭旁是第二題櫃台；往上走七區是第三題七大類。走到地標旁點一下就出題，🦉 考官也可以直接出題。';
  document.getElementById('iflag').onclick=function(){ if(window.GameLog) GameLog.quickReport('town','🎤 考場島'); };
};
var _rail=isleRailPaint;
isleRailPaint=function(){ if(ISLE.id==='EXAM') return; return _rail(); };
var _bubble=isleBubble;
isleBubble=function(ox,oy,ts,d){ if(ISLE.id!=='EXAM') return _bubble(ox,oy,ts,d);
  var b=document.getElementById('ibub'), g=ISLE.near;
  if(!g || ISLE.still<.3 || busy){ if(b) b.remove(); return; }
  if(!b){ b=document.createElement('div'); b.id='ibub'; b.className='ibub'; document.body.appendChild(b); }
  if(b.dataset.sig!==g.ref){
    var Z=EXAM_ZONES[g.exam], n=g.exam==='t2'?EXAM_T2_SITS.length:EXAM_T3.filter(function(x){ return x.z===g.exam; }).length;
    b.innerHTML='<div class="muted" style="font-size:.78em">第 '+g.n+' 站・'+(g.exam==='t2'?'第二題・看情境問問題':'第三題・表達看法')+'</div>'+
      '<div style="color:#fff3c0;font-size:1.05em">'+esc(g.lab)+(Z?' <small class="fr" style="opacity:.75">'+esc(Z.fr)+'</small>':'')+'</div>'+
      '<div class="muted" style="font-size:.78em">這裡有 '+n+' 個'+(g.exam==='t2'?'情境':'題目')+'・點我出一題</div>'+
      '<div class="ilink">'+(g.n>1?'<button data-act="prev">◀</button>':'')+'<span></span>'+(g.n<ISLE.units.length?'<button data-act="next">下一站 ▶</button>':'')+'</div>';
    b.dataset.sig=g.ref;
    b.onclick=function(e){ var t=e.target.closest && e.target.closest('[data-act]'); if(t){ e.stopPropagation(); b.remove(); return isleStep(t.dataset.act==='prev'?-1:1); } examOpen(g); };
  }
  var X=(ox+g.x*ts)/d, Y=(oy+g.y*ts)/d; b.style.left=Math.max(8, Math.min(innerWidth-b.offsetWidth-8, X-b.offsetWidth/2))+'px'; b.style.top=Math.max(64, Y-ts/d*1.6-b.offsetHeight)+'px';
};
var _tap=isleTap;
isleTap=function(cx, cy){ if(ISLE.id!=='EXAM') return _tap(cx, cy);
  var V=ISLE.view; if(!V || busy) return;
  var wx=(cx*V.d-V.ox)/V.ts, wy=(cy*V.d-V.oy)/V.ts, sc=isleSpec('EXAM'), best=null, bd=1.1;
  ISLE.units.forEach(function(g){ var dd=Math.min(Math.hypot(g.x-wx, g.y-wy), Math.hypot(g.x-wx, g.y-.6-wy)); if(dd<bd){ bd=dd; best=g; } });
  if(ISLE.host && Math.hypot(ISLE.host.x-wx, ISLE.host.y-.4-wy)<.8) return examHost();
  if(best && best===ISLE.near && !ISLE.auto) return examOpen(best);
  if(best) return isleGo(best);
  if(Math.hypot(sc.board.x-wx, sc.board.y-.5-wy)<1) return examBoard();
  if(Math.hypot(sc.tablet.x-wx, sc.tablet.y-.5-wy)<1) return examHost();
};
/* 群島總覽：在海上多一座「考場島」（不在 15 座口說島的固定位置裡，放右下角） */
var _arch=archOpen;
archOpen=function(){ _arch(); var A=ihud.querySelector('.arch'); if(!A) return;
  var b=document.createElement('button'); b.className='aisle live'; b.style.left='86%'; b.style.top='84%';
  b.innerHTML='<span class="ablob" style="border-radius:48% 52% 44% 56%">'+pix('🎤',26)+'</span><span class="aname">考場島<small>第二、三題</small></span>';
  b.onclick=function(){ isleEnter('EXAM'); }; A.appendChild(b); };
var _exit=isleExit;
isleExit=function(){ stopTimer(); return _exit.apply(this, arguments); };
window.ExamIsle={t3:examT3, t2:examT2, board:examBoard};
})();
