/* ============================================================
   upgrade_moves.js — 口說寫作「升級招式」資料（草稿）
   ------------------------------------------------------------
   用途：遊戲的「招式卡」與「這句用了哪一招？」辨識題。
         一句簡單的話，可以用哪一招升級到 B1／B2。
   來源：assets/.textbook_cache.txt（Édito A1／A2／B1、Communication essentielle A2）。
   ⛔ 例句一律出自課本原文，沒有任何自創法文。
      OCR 只做「最小修正」：補回被吃掉的空格、ffi／fi 連字（如 difficile）、
      把 OCR 的 « 1 » 箭頭寫成 → 。其餘逐字照課本。
   欄位：
     lvl    這招能把句子升到哪一級（'A2'基本／'B1'／'B2'）
     taught true＝Owen 已學過（A2 全部＋B1 Unité 1＝p.11–24）；
            false＝來源在 B1 Unité 2 以後（B1 p.25 起）還沒上到
     gram   gram_rules.js 的文法點 id（無對應填 null）
     codex  codex.js 的座標（無對應填 null）
     pattern 可偵測這招的 JS 正規式「字串」（保守、可能誤報；做不到填 null）
             用法：new RegExp(m.pattern, 'i').test(句子)
     examples[].src 一律是「cache 的 PDF 頁碼」＝課本印刷頁碼（A1／A2／B1 實測相同）
   已知缺口（課本例句不足或被雙欄 OCR 切碎，未收）：certes…mais（B1 p.147、p.177 各只有 1 句）、
     également／mais aussi 補充（B1 p.146 只有 2 句乾淨）、名詞化 nominalisation（只有詞對沒有句子）。
   例句皆已用腳本逐句對回快取原文（忽略空白、OCR 私用字元與 ﬁ 連字）全數通過。
   ⚠️ 若 gram_rules 與「Owen 已學」不一致（例如 plus-que-parfait 在 gram_rules 仍 unlocked:false，
     但 B1 p.21 在 Unité 1 內），以此檔 taught 為準並請人工確認。
   ============================================================ */
var UPGRADE_MOVES = [

/* ───────── A2：基本招（先把話接起來） ───────── */

{ id:'a2-parce-que', lvl:'A2',
  name:'用 parce que 補上原因',
  fr:'parce que / parce qu’',
  how:'說完一件事，接 parce que 加一句理由，話就不再只有單句。',
  gram:'cause-consequence', codex:'8-4-2', taught:true,
  pattern:'\\bparce (que|qu[’\'])',
  examples:[
    { fr:'Je suis très fatigué parce que je travaille beaucoup.', zh:'我很累，因為我工作很多。', src:'Édito A1 p.152' },
    { fr:'Une maison, c’est mieux qu’un appartement parce que c’est plus grand.', zh:'房子比公寓好，因為比較大。', src:'Édito A2 p.53' },
    { fr:'Je me dépêche parce que je suis déjà en retard.', zh:'我很趕，因為我已經遲到了。', src:'Communication essentielle A2 p.125' },
    { fr:'Au début, c’était difficile parce que je ne connaissais personne.', zh:'一開始很難，因為我誰都不認識。', src:'Édito B1 p.18' }
  ] },

{ id:'a2-mais', lvl:'A2',
  name:'用 mais 加一個轉折',
  fr:'mais',
  how:'先說優點或事實，再用 mais 補一個但書，句子就有兩面。',
  gram:null, codex:'8-4-1', taught:true,
  pattern:'\\bmais\\b',
  examples:[
    { fr:'La machine fonctionne bien, mais la notice d’utilisation n’est pas assez détaillée.', zh:'機器運作良好，但使用說明不夠詳細。', src:'Communication essentielle A2 p.17' },
    { fr:'Je suis arrivée il y a 3 mois, mais je connais bien l’entreprise.', zh:'我三個月前才到，但我很熟這家公司。', src:'Communication essentielle A2 p.152' },
    { fr:'On vit bien en ville, mais on vit mieux à la campagne.', zh:'住城市不錯，但住鄉下更好。', src:'Édito A2 p.47' },
    { fr:'Ce logement est dans le centre, mais dans une rue calme.', zh:'這住處在市中心，但在安靜的街上。', src:'Édito A2 p.53' }
  ] },

{ id:'a2-puis-du-coup', lvl:'A2',
  name:'用 un jour／puis／du coup 串起動作',
  fr:'Un jour… / Puis… / Du coup…',
  how:'講經過時，用時間詞和 puis、du coup 一件接一件，不要每句都從頭開始。',
  gram:'passe', codex:'5-3-3', taught:true,
  pattern:'\\b(puis|du coup|un jour|tout à coup|soudain)\\b',
  examples:[
    { fr:'Un jour, ils ont déménagé.', zh:'有一天，他們搬家了。', src:'Édito B1 p.13' },
    { fr:'Du coup, je n’y suis jamais retourné.', zh:'結果，我再也沒回去過。', src:'Édito B1 p.13' },
    { fr:'Puis un jour, mon oncle a changé de travail et ils ont déménagé à Marseille.', zh:'後來有一天，我叔叔換了工作，他們搬到馬賽。', src:'Édito B1 p.14' },
    { fr:'Puis mon grand-oncle commence à rire et tout le monde fait comme lui.', zh:'然後我舅公開始笑，大家也跟著笑。', src:'Édito B1 p.14' }
  ] },

{ id:'a2-pc-imparfait', lvl:'A2',
  name:'imparfait 鋪背景，passé composé 推劇情',
  fr:'imparfait + passé composé (quand…)',
  how:'背景和持續的狀態用 imparfait，突然發生的事用 passé composé，常搭 quand。',
  gram:'imparfait', codex:'5-3-3', taught:true,
  pattern:'\\b\\w+(ais|ait|aient|ions|iez)\\b[^.!?]*\\b(quand|et|mais)\\b[^.!?]*\\b(a|ont|est|sont|ai|suis|avons) \\w+',
  examples:[
    { fr:'Il était en route vers le Mexique quand il a eu l’idée de créer cette plateforme de voyageurs en van.', zh:'他在前往墨西哥的路上，想到要建這個露營車旅人平台。', src:'Édito A2 p.142' },
    { fr:'Je lisais tranquillement quand ma fille et mon gendre sont arrivés.', zh:'我正安靜看書時，女兒和女婿到了。', src:'Édito B1 p.14' },
    { fr:'Avant, ils m’envoyaient des photos sur mon téléphone et je ne les voyais pas bien.', zh:'以前他們傳照片到我手機，我看不清楚。', src:'Édito B1 p.14' },
    { fr:'Quand j’étais petit, j’allais souvent dans le Val de Loire.', zh:'我小時候常去羅亞爾河谷。', src:'Édito B1 p.14' }
  ] },

{ id:'a2-avis', lvl:'A2',
  name:'用 je pense que／je trouve que 亮出意見',
  fr:'Je pense que… / Je trouve que… / À mon avis…',
  how:'不要只陳述事實，先說「我認為」再接一句完整的看法。',
  gram:'opinions', codex:null, taught:true,
  pattern:'(^|\\W)(je pense que|je trouve que|je crois que|à mon avis|il me semble que)(\\W|$)',
  examples:[
    { fr:'À mon avis, il faut appeler les secours.', zh:'依我看，必須叫救援。', src:'Édito A2 p.107' },
    { fr:'Je trouve que ce texte est…', zh:'我覺得這篇文章……', src:'Édito A2 p.179' },
    { fr:'Je pense que ce roman, c’est une excellente idée parce que…', zh:'我認為這本小說是個很棒的點子，因為……', src:'Édito A2 p.179' },
    { fr:'Je pense que c’est un plus.', zh:'我認為這是加分。', src:'Édito B1 p.118' }
  ] },

{ id:'a2-si-present', lvl:'A2',
  name:'用 si＋現在式 給條件',
  fr:'Si + présent, présent / impératif',
  how:'si 後面接現在式說條件，後半句用現在式或命令式給結果或建議。',
  gram:'condition-si', codex:'6-6-2', taught:true,
  pattern:'\\b[Ss]i (je|j[’\']|tu|il|elle|on|nous|vous|ils|elles)\\b|\\b[Ss][’\'](il|ils)\\b',
  examples:[
    { fr:'S’il pleut, on peut aller au Centre de la BD.', zh:'如果下雨，我們可以去漫畫中心。', src:'Édito A2 p.51' },
    { fr:'Si tu es disponible, tu peux passer chez moi.', zh:'如果你有空，可以來我家。', src:'Édito A2 p.51' },
    { fr:'Si vous voyez un chat noir, contactez-moi !', zh:'如果你們看到黑貓，請聯絡我！', src:'Édito A2 p.51' },
    { fr:'Si tu es malade, va à la pharmacie !', zh:'如果你不舒服，去藥局！', src:'Édito A2 p.51' }
  ] },

/* ───────── B1 ───────── */

{ id:'b1-rel-qui-que', lvl:'B1',
  name:'用 qui／que 把兩句併成一句',
  fr:'Les pronoms relatifs qui / que',
  how:'重複的名詞用 qui（當主詞）或 que（當受詞）接起來，一句講完。',
  gram:'relatifs', codex:'3-5-1', taught:true,
  pattern:'\\b(qui|que)\\b|\\bqu[’\']',
  examples:[
    { fr:'C’est un spectacle qui dure 1 h 30.', zh:'這是一場長達一個半小時的表演。', src:'Communication essentielle A2 p.62' },
    { fr:'C’est une fête que nous organisons en fin d’année.', zh:'這是我們年底舉辦的慶祝會。', src:'Communication essentielle A2 p.60' },
    { fr:'Les parents tiennent les stands de jeux qu’on propose aux enfants.', zh:'家長負責看管給孩子玩的遊戲攤位。', src:'Communication essentielle A2 p.62' },
    { fr:'C’est une opportunité pour les jeunes qui habitent dans des villes éloignées.', zh:'這對住在遠方城市的年輕人是個機會。', src:'Édito B1 p.104' }
  ] },

{ id:'b1-rel-ou-dont', lvl:'B1',
  name:'用 où／dont 補充地點、時間、de 的內容',
  fr:'Les pronoms relatifs où / dont',
  how:'地點與時間用 où，帶 de 的補充（…的）用 dont，句子更緊實。',
  gram:'relatifs', codex:'3-5-3', taught:false,
  pattern:'(^|\\W)(où|dont)(\\W|$)',
  examples:[
    { fr:'Il y a des salles de cours où les étudiants peuvent travailler.', zh:'有學生可以用功的教室。', src:'Édito B1 p.104' },
    { fr:'Le jour où j’ai commencé le stage, j’ai pu mettre en application la théorie.', zh:'實習開始那天，我就能把理論付諸實踐。', src:'Édito B1 p.104' },
    { fr:'C’est une école dont les enseignants sont des universitaires.', zh:'這所學校的老師都是大學學者。', src:'Édito B1 p.104' },
    { fr:'J’envisage de faire un autre stage dans une entreprise dont ils m’ont parlé.', zh:'我打算去他們跟我提過的公司再實習一次。', src:'Édito B1 p.104' }
  ] },

{ id:'b1-grace-a', lvl:'B1',
  name:'用 grâce à／à cause de 說原因',
  fr:'grâce à / à cause de',
  how:'原因是名詞時，好的用 grâce à、壞的用 à cause de，比 parce que 精簡。',
  gram:'cause-consequence', codex:'8-4-4', taught:true,
  pattern:'(^|\\W)(grâce (à|au|aux)|à cause (de|d[’\']|du|des))',
  examples:[
    { fr:'À cause d’Internet, la presse papier a des difficultés.', zh:'因為網路，紙本報紙陷入困難。', src:'Édito A2 p.114' },
    { fr:'Je suis toujours informée grâce aux réseaux sociaux.', zh:'多虧社群網路，我隨時都有消息。', src:'Édito A2 p.114' },
    { fr:'Grâce à Twitch, les médias classiques essaient de toucher un public plus jeune et plus connecté.', zh:'多虧 Twitch，傳統媒體想接觸更年輕的觀眾。', src:'Édito A2 p.114' },
    { fr:'Je (ne) peux pas regarder le journal télé, à cause des images qui sont souvent horribles.', zh:'我不能看電視新聞，因為畫面常常很可怕。', src:'Édito A2 p.114' }
  ] },

{ id:'b1-comme-puisque', lvl:'B1',
  name:'用 comme／puisque／étant donné 開頭說原因',
  fr:'comme / puisque / étant donné que',
  how:'原因放句首：comme 是一般原因，puisque 是對方也知道的原因。',
  gram:'cause-consequence', codex:'8-4-3', taught:false,
  pattern:'(^|[.!?] ?)Comme |\\b[Pp]uisque\\b|(^|\\W)[Éé]tant donné|\\ben raison d',
  examples:[
    { fr:'Comme il est malade, il est suivi par un médecin.', zh:'因為他生病，有醫生在照顧他。', src:'Édito B1 p.51' },
    { fr:'Puisque tu es là, viens m’aider.', zh:'既然你在這裡，來幫我。', src:'Édito B1 p.51' },
    { fr:'Étant donné ses ventes de disques, Jul doit être très riche.', zh:'考慮到他的唱片銷量，Jul 一定很有錢。', src:'Édito B1 p.51' },
    { fr:'Les artistes sont en retard en raison d’un problème de transport.', zh:'藝術家因交通問題遲到。', src:'Édito B1 p.51' }
  ] },

{ id:'b1-consequence', lvl:'B1',
  name:'用 alors／c’est pourquoi 說結果',
  fr:'alors / c’est pourquoi / tellement… que',
  how:'先講原因，再用 alors（口語）或 c’est pourquoi（書面）帶出結果。',
  gram:'cause-consequence', codex:'8-4-4', taught:true,
  pattern:'\\b(alors|c[’\']est pourquoi|c[’\']est pour cela que|donc|tellement .{1,25} que)\\b',
  examples:[
    { fr:'J’adore l’actualité et la BD, alors je me suis abonné à La Revue Dessinée.', zh:'我愛時事和漫畫，所以訂閱了《La Revue Dessinée》。', src:'Édito A2 p.114' },
    { fr:'Les articles sont trop longs, c’est pourquoi je ne lis que les titres.', zh:'文章太長，所以我只看標題。', src:'Édito A2 p.114' },
    { fr:'Tu reçois les nouvelles sur ton téléphone, alors tu n’as pas besoin de les chercher.', zh:'新聞傳到你手機，所以你不用去找。', src:'Édito A2 p.114' }
  ] },

{ id:'b1-gerondif', lvl:'B1',
  name:'用 en＋-ant 同時說方法或同時動作',
  fr:'Le gérondif (en + verbe-ant)',
  how:'兩個動作同時發生，或說「靠什麼方式」，用 en＋現在分詞，不用拆兩句。',
  gram:'gerondif', codex:'6-5-1', taught:true,
  pattern:'\\ben ([^\\s]+ant)(\\W|$)',
  examples:[
    { fr:'Elles cuisinent en écoutant de la musique.', zh:'她們邊聽音樂邊做菜。', src:'Édito A2 p.131' },
    { fr:'Les grands magasins s’adaptent à cette pratique en vendant des kits.', zh:'大賣場靠賣材料包來配合這種風氣。', src:'Édito A2 p.131' },
    { fr:'Il travaille en chantant.', zh:'他邊工作邊唱歌。', src:'Édito A2 p.131' },
    { fr:'On peut mieux consommer en achetant moins d’objets neufs.', zh:'少買新東西，就能更好地消費。', src:'Édito A2 p.131' }
  ] },

{ id:'b1-but', lvl:'B1',
  name:'用 pour／pour que 說目的',
  fr:'pour + infinitif / pour que + subjonctif',
  how:'主詞相同用 pour＋原形；主詞不同改 pour que＋虛擬式。',
  gram:'expression-but', codex:'8-4-2', taught:true,
  pattern:'\\bpour (que|qu[’\'])|\\bpour (ne pas )?(se |s[’\'])?[^\\s]+(er|ir|re)(\\W|$)',
  examples:[
    { fr:'Pour se protéger, les animaux ont des comportements surprenants.', zh:'為了保護自己，動物有令人驚訝的行為。', src:'Édito A2 p.173' },
    { fr:'Pour que votre chat se sente bien, éloignez la gamelle du bol d’eau !', zh:'為了讓貓咪安心，把食盆放離水碗遠一點！', src:'Édito A2 p.173' },
    { fr:'La poule crie pour que ses camarades sachent qu’il y a un danger.', zh:'母雞叫，好讓同伴知道有危險。', src:'Édito A2 p.173' },
    { fr:'J’ai quitté mon job pour devenir humoriste.', zh:'我辭掉工作，為了當搞笑藝人。', src:'Édito B1 p.109' }
  ] },

{ id:'b1-cond-poli', lvl:'B1',
  name:'用條件式說得更客氣、更委婉',
  fr:'Le conditionnel (demande, souhait, conseil)',
  how:'請求、願望、建議改用條件式（pourrais、aimerais、devrais），語氣更有禮。',
  gram:'conditionnel', codex:'6-2-1', taught:true,
  pattern:'\\b\\w+(rais|rait|rions|riez|raient)\\b',
  examples:[
    { fr:'Tu pourrais me donner plus d’informations s’il te plaît ?', zh:'可以請你多給我一些資訊嗎？', src:'Édito A2 p.128' },
    { fr:'J’aimerais arrêter d’acheter du matériel de sport.', zh:'我想不再買運動器材。', src:'Édito A2 p.128' },
    { fr:'Tu devrais refaire tes photos !', zh:'你應該重拍你的照片！', src:'Édito A2 p.128' },
    { fr:'Ça te dirait d’en discuter ?', zh:'你想不想聊聊這件事？', src:'Édito A2 p.128' }
  ] },

{ id:'b1-comparaison', lvl:'B1',
  name:'用比較說出差別',
  fr:'plus / moins / aussi / autant… que',
  how:'不只說「好」，用 plus、moins、autant 或 meilleur 比出高低。',
  gram:'comparaison', codex:'2-3-1', taught:true,
  pattern:'\\b(plus|moins|aussi|autant|meilleur\\w*|mieux|pire)\\b',
  examples:[
    { fr:'On sort plus qu’avant !', zh:'我們比以前更常出門！', src:'Édito A2 p.47' },
    { fr:'On a autant de pièces que dans notre ancien appartement.', zh:'房間數和舊公寓一樣多。', src:'Édito A2 p.47' },
    { fr:'Mon four n’est pas très bon, je dois acheter un meilleur four.', zh:'我的烤箱不太好，我得買台更好的。', src:'Édito A2 p.47' },
    { fr:'On a un meilleur cadre de vie.', zh:'我們有更好的生活環境。', src:'Édito A2 p.47' }
  ] },

{ id:'b1-y-en', lvl:'B1',
  name:'用 y／en 取代重複的地點或事物',
  fr:'Les pronoms y et en',
  how:'前面提過的地點或「à／de＋事物」，用 y 或 en 代替，避免重複。',
  gram:'pronoms-y-en', codex:'3-4-5', taught:true,
  pattern:'\\b[jmnstl][’\'](y|en)\\b|\\bon (y|en)\\b|\\b(y|en) est\\b',
  examples:[
    { fr:'On y trouve des endroits calmes et magiques.', zh:'那裡有安靜又神奇的地方。', src:'Édito A2 p.33' },
    { fr:'Le climat y est agréable.', zh:'那裡氣候宜人。', src:'Édito A2 p.33' },
    { fr:'J’y ai bien réfléchi.', zh:'我仔細想過了。', src:'Édito A2 p.163' },
    { fr:'Oui, j’en reviens à l’instant.', zh:'對，我剛從那裡回來。', src:'Édito A2 p.33' }
  ] },

{ id:'b1-duree', lvl:'B1',
  name:'用 il y a／depuis／pendant 精準說時間',
  fr:'il y a / depuis / ça fait… que / pendant / en',
  how:'用對時間詞：il y a 是多久前，depuis 是從那時到現在，pendant 是一段期間。',
  gram:'duree-temps', codex:'9-4-1', taught:true,
  pattern:'(\\bil y a \\w+ (an|ans|jours?|semaines?|mois|minutes?|heures?)|\\bdepuis|(^|\\W)ça fait .{1,20} que|\\bpendant)',
  examples:[
    { fr:'Il y a deux ans, j’ai décidé de changer de vie.', zh:'兩年前，我決定改變人生。', src:'Édito B1 p.19' },
    { fr:'Ça fait deux ans que j’ai un petit compagnon à quatre pattes.', zh:'我養了一隻四腳小夥伴兩年了。', src:'Édito B1 p.19' },
    { fr:'Elle a couru cinq kilomètres en 34 minutes.', zh:'她三十四分鐘跑了五公里。', src:'Édito B1 p.19' },
    { fr:'Dans deux ou trois semaines, vous aurez quelques numéros de plus.', zh:'兩三週後，你們會多幾期。', src:'Édito B1 p.19' }
  ] },

{ id:'b1-plus-que-parfait', lvl:'B1',
  name:'用 plus-que-parfait 說「更早之前」',
  fr:'Le plus-que-parfait',
  how:'要交代比過去某事更早發生的事，用 avait／était＋過去分詞。',
  gram:'pluperfect', codex:'5-4-1', taught:true,
  pattern:'(^|\\W)(avais|avait|avions|aviez|avaient|étais|était|étions|étiez|étaient)( [^\\s]+)? ([^\\s]+(é|és|ée|ées|i|is|ie|u|us|ue)|dit|fait|mis|pris|ouvert|écrit)(\\W|$)',
  examples:[
    { fr:'J’ai lu le livre que tu m’avais conseillé.', zh:'我讀了你推薦給我的那本書。', src:'Édito B1 p.21' },
    { fr:'Vous n’étiez jamais venus avant ce soir ?', zh:'你們在今晚之前從沒來過？', src:'Édito B1 p.21' },
    { fr:'Ils s’étaient parlé.', zh:'他們之前談過話。', src:'Édito B1 p.21' },
    { fr:'Il y en avait qui pleuraient parce qu’ils n’avaient pas encore retrouvé leurs mamans et leurs papas.', zh:'有些孩子在哭，因為還沒找到爸爸媽媽。', src:'Édito B1 p.88' }
  ] },

{ id:'b1-discours-rapporte', lvl:'B1',
  name:'用 dire que／demander si 轉述別人的話',
  fr:'Le discours rapporté',
  how:'轉述別人的話：dire que＋句子；問句改成 demander si／pourquoi…。',
  gram:'discours-rapporte', codex:'7-6-1', taught:true,
  pattern:'\\b(dit|disent|dis|demande|demandent|explique|répond|répondent|annonce|affirme|veut savoir|se demande|se demandent) (que|qu[’\']|si|s[’\']|pourquoi|comment|ce que|ce qui|où|quand)',
  examples:[
    { fr:'Ils disent que c’est plus facile d’avoir un CV d’une page.', zh:'他們說履歷只寫一頁比較容易。', src:'Édito A2 p.159' },
    { fr:'Je me demande comment écrire le premier message.', zh:'我在想第一則訊息怎麼寫。', src:'Édito A2 p.159' },
    { fr:'Elle se demande si le CV est utile.', zh:'她在想履歷有沒有用。', src:'Édito A2 p.159' },
    { fr:'Ils se demandent ce qui est important dans un CV.', zh:'他們在想履歷裡什麼最重要。', src:'Édito A2 p.159' }
  ] },

{ id:'b1-mise-en-relief', lvl:'B1',
  name:'用 c’est…qui／que 強調重點',
  fr:'C’est… qui / C’est… que',
  how:'想強調的那個詞放在 c’est 後面，再接 qui（主詞）或 que（受詞）。',
  gram:'mise-en-relief', codex:'7-4-1', taught:true,
  pattern:'\\b[Cc][’\']est .{1,30}\\b(qui|que|qu[’\'])|\\bCe sont .{1,30}\\b(qui|que|qu[’\'])',
  examples:[
    { fr:'C’est un prof qui a changé ma vie.', zh:'是一位老師改變了我的人生。', src:'Édito A2 p.156' },
    { fr:'C’est une expérience que je ne regrette pas.', zh:'這是我不後悔的經驗。', src:'Édito A2 p.156' },
    { fr:'Ce sont eux qui m’ont permis d’avancer.', zh:'是他們讓我得以前進。', src:'Édito A2 p.156' },
    { fr:'C’est ce qui me plaît ici.', zh:'這正是我喜歡這裡的原因。', src:'Édito A2 p.156' }
  ] },


{ id:'b1-avis-ouvreur', lvl:'B1',
  name:'換個說法開場：selon moi／personnellement',
  fr:'Pour exprimer son opinion',
  how:'不要每次都 je pense que，輪流用 selon moi、à mon avis、personnellement 開頭。',
  gram:'opinions', codex:null, taught:false,
  pattern:'\\b(pour moi|à mon avis|d[’\']après moi|selon moi|personnellement|en ce qui me concerne)\\b',
  examples:[
    { fr:'Pour moi…', zh:'對我來說……', src:'Édito B1 p.44' },
    { fr:'D’après moi…', zh:'依我看……', src:'Édito B1 p.44' },
    { fr:'Selon moi…', zh:'依我之見……', src:'Édito B1 p.44' },
    { fr:'Personnellement…', zh:'就我個人而言……', src:'Édito B1 p.44' },
    { fr:'Il me semble que c’est une aide précieuse pour les habitants.', zh:'我覺得這對居民是很寶貴的幫助。', src:'Édito B1 p.117' }
  ] },




/* ───────── B2 ───────── */

{ id:'b2-concession', lvl:'B2',
  name:'讓步：bien que／même si／malgré',
  fr:'La concession : bien que, même si, malgré, pourtant',
  how:'承認一個不利事實，卻仍堅持立場：bien que＋虛擬式、même si＋直陳式。',
  gram:'connecteurs', codex:'8-4-3', taught:false,
  pattern:'\\b(bien qu|même s|malgré|pourtant)',
  examples:[
    { fr:'Bien qu’Internet permette d’économiser du papier, son impact écologique reste important.', zh:'雖然網路能省紙，它的生態影響仍然很大。', src:'Édito B1 p.125' },
    { fr:'Bien que cela ne soit pas passionnant, il est grand temps de faire un ménage de printemps dans vos téléphones.', zh:'雖然不有趣，但該替手機大掃除了。', src:'Édito B1 p.125' },
    { fr:'Même s’il sait très bien qu’il faut nettoyer ses données, il ne le fait jamais.', zh:'即使他很清楚該清理資料，卻從不做。', src:'Édito B1 p.125' },
    { fr:'Même si on ne s’en rend pas compte, nos fichiers prennent de la place.', zh:'即使沒察覺，我們的檔案佔了空間。', src:'Édito B1 p.125' },
    { fr:'Malgré la pollution causée par Internet, le nombre d’internautes continue d’augmenter.', zh:'儘管網路造成污染，網路使用者仍持續增加。', src:'Édito B1 p.125' }
  ] },

{ id:'b2-opposition', lvl:'B2',
  name:'對比：en revanche／tandis que／contrairement à',
  fr:'L’opposition : en revanche, par contre, tandis que, contrairement à',
  how:'兩件事對照時，用 en revanche、tandis que 把差異擺在一起。',
  gram:'connecteurs', codex:'8-4-3', taught:false,
  pattern:'\\b(en revanche|par contre|tandis que|contrairement à|alors que|au contraire|à l[’\']inverse de)\\b',
  examples:[
    { fr:'Certains font beaucoup d’efforts pour changer leurs habitudes tandis que d’autres n’en font aucun !', zh:'有些人很努力改習慣，另一些人完全不做。', src:'Édito B1 p.125' },
    { fr:'Contrairement à mes amis, je nettoie souvent mes données sur mon ordinateur.', zh:'和朋友不同，我常清理電腦裡的資料。', src:'Édito B1 p.125' },
    { fr:'Tu ne tries pas tes photos. En revanche, tu effaces toujours ton historique de navigation.', zh:'你不整理照片，但總是刪瀏覽紀錄。', src:'Édito B1 p.125' },
    { fr:'Elle aime bien trier ses photos. Par contre, elle déteste faire le tri dans ses applications.', zh:'她喜歡整理照片，但討厭整理應用程式。', src:'Édito B1 p.125' }
  ] },

{ id:'b2-subj-jugement', lvl:'B2',
  name:'il faut que／c’est bien que＋虛擬式',
  fr:'Il faut que / Il est important que / C’est bien que + subjonctif',
  how:'表達必要或價值判斷（重要、正常、很好）時，que 後面接虛擬式。',
  gram:'subjonctif', codex:'6-3-1', taught:true,
  pattern:'(^|\\W)(il faut qu|il est important qu|c[’\']est (très )?(bien|normal) qu|il ne faut pas qu)',
  examples:[
    { fr:'Il faut qu’on accompagne ces publics.', zh:'我們必須陪伴這些族群。', src:'Édito A2 p.117' },
    { fr:'Il est important que les réseaux sociaux s’adaptent aux différents publics.', zh:'社群網路必須適應不同的受眾，這很重要。', src:'Édito A2 p.117' },
    { fr:'C’est normal qu’on soit sur les réseaux sociaux, nous aussi !', zh:'我們也在社群網路上，這很正常！', src:'Édito A2 p.117' },
    { fr:'C’est très bien que les personnes âgées soient plus connectées.', zh:'長者更常上網，這很好。', src:'Édito A2 p.117' }
  ] },

{ id:'b2-certitude-doute', lvl:'B2',
  name:'分清確定與懷疑：je suis sûr que／je doute que',
  fr:'Certitude (indicatif) / doute (subjonctif)',
  how:'確定、很可能後接直陳式；懷疑或只是可能，que 後改虛擬式。',
  gram:'subjonctif', codex:'6-3-3', taught:false,
  pattern:'(^|\\W)(je suis (sûr|certain|convaincu)(e)? que|il est probable que|je doute que|il est possible que|je ne suis pas (sûr|certain)(e)? que|il me semble que)',
  examples:[
    { fr:'Je suis sûr que les adhésions vont continuer d’augmenter !', zh:'我確定會員數會繼續增加！', src:'Édito B1 p.118' },
    { fr:'Il est probable que ce réseau va avoir beaucoup de succès.', zh:'這個網絡很可能大受歡迎。', src:'Édito B1 p.118' },
    { fr:'Je doute qu’ils le fassent très longtemps !', zh:'我懷疑他們不會做太久！', src:'Édito B1 p.118' },
    { fr:'Il me semble que c’est une aide très précieuse pour les habitants.', zh:'我覺得這對居民是很寶貴的幫助。', src:'Édito B1 p.118' }
  ] },

{ id:'b2-afin-que', lvl:'B2',
  name:'目的的書面說法：afin de／afin que',
  fr:'afin de / afin que / mon objectif, c’est de',
  how:'比 pour 更正式：afin de＋原形、afin que＋虛擬式，也可說 mon objectif, c’est de。',
  gram:'expression-but', codex:null, taught:false,
  pattern:'\\b(afin (de|d[’\']|que|qu[’\'])|mon objectif,? c[’\']est)\\b',
  examples:[
    { fr:'Les Français espèrent gagner en liberté afin de mieux concilier leur vie professionnelle et privée.', zh:'法國人希望多些自由，更能兼顧工作與私生活。', src:'Édito B1 p.109' },
    { fr:'Mon objectif c’est d’avoir une heure de spectacle.', zh:'我的目標是做出一小時的表演。', src:'Édito B1 p.109' },
    { fr:'Nous faisons un bilan avec le stagiaire afin qu’il nous dise ce qu’il a ressenti.', zh:'我們與實習生檢討，讓他說出感受。', src:'Édito B1 p.109' },
    { fr:'Elle s’est reconvertie pour que/afin que sa famille vive mieux.', zh:'她轉職，好讓家人過得更好。', src:'Édito B1 p.109' }
  ] },

{ id:'b2-passif', lvl:'B2',
  name:'用被動式強調結果或做的人',
  fr:'La forme passive (être + participe passé + par)',
  how:'把受影響的人事物放前面當主詞：être＋過去分詞，必要時加 par 說明誰做的。',
  gram:'passive', codex:'6-4-1', taught:true,
  pattern:'(est|sont|a été|ai été|ont été|sera|seront|était|étaient) [^\\s]+(é|ée|és|ées|i|ie|is|ies|u|ue|us|ues) [^.!?]*\\bpar\\b',
  examples:[
    { fr:'Le site a été créé par Chantal Perdigau.', zh:'這個網站由 Chantal Perdigau 創立。', src:'Édito A2 p.177' },
    { fr:'J’ai été contactée par Alexandre.', zh:'Alexandre 聯絡了我。', src:'Édito A2 p.177' },
    { fr:'Mon jardin est cultivé par une personne compétente.', zh:'我的花園由一位內行人照料。', src:'Édito A2 p.177' },
    { fr:'La méthode est développée par un botaniste.', zh:'這個方法由一位植物學家發展。', src:'Édito A2 p.177' }
  ] },

{ id:'b2-cond-incertain', lvl:'B2',
  name:'用條件式表示「據說／未證實」',
  fr:'Le conditionnel et l’information incertaine',
  how:'報導沒查證的消息時用條件式（aurait、auraient＋過去分詞），暗示「據傳」。',
  gram:'cond-passe', codex:'6-2-3', taught:false,
  pattern:'(^|\\W)(aurait|auraient|serait|seraient|devrait|devraient)( déjà)? ([^\\s]+(é|és|i|is|u|us)|eu|été|fait|dit|pu|dû|pouvoir)(\\W|$)',
  examples:[
    { fr:'Le chanteur aurait eu un accident.', zh:'據說歌手出了意外。', src:'Édito B1 p.155' },
    { fr:'De grandes marques auraient déjà acheté des parcelles virtuelles.', zh:'據傳大品牌已買下虛擬地塊。', src:'Édito B1 p.155' },
    { fr:'Un enfant de 8 ans aurait gagné des milliers d’euros grâce au métavers.', zh:'據說一個八歲孩子靠元宇宙賺了數千歐元。', src:'Édito B1 p.155' },
    { fr:'À terme, on devrait pouvoir y accéder depuis n’importe quel ordinateur.', zh:'長遠來看，應該能從任何電腦進入。', src:'Édito B1 p.155' }
  ] },

{ id:'b2-hypothese', lvl:'B2',
  name:'假設：si＋imparfait，結果用條件式',
  fr:'Si + imparfait, conditionnel présent',
  how:'說不太可能或想像的事：si 後接 imparfait，後半句用條件式。',
  gram:'condition-si', codex:'6-6-1', taught:false,
  pattern:'\\b[Ss]i (j[’\']|je |tu |il |elle |on |nous |vous |ils |elles )(\\w+ )?\\w*(ais|ait|ions|iez|aient)\\b',
  examples:[
    { fr:'Si j’obtenais ce job, je pourrais financer mes études.', zh:'如果我得到這份工作，就能支付學費。', src:'Édito B1 p.134' },
    { fr:'Si vous deviez embaucher quelqu’un pour ce poste, quelles qualités rechercheriez-vous ?', zh:'若您要為這職位聘人，會找哪些特質？', src:'Édito B1 p.134' },
    { fr:'Seriez-vous prêt à déménager si nous vous proposions un poste à l’étranger ?', zh:'若我們提供國外職位，您願意搬家嗎？', src:'Édito B1 p.134' },
    { fr:'Avec des ailes, je pourrais voler.', zh:'有了翅膀，我就能飛。', src:'Édito B1 p.44' }
  ] },


{ id:'b2-double-pronom', lvl:'B2',
  name:'兩個代名詞連用：le lui／les leur／lui en',
  fr:'La double pronominalisation',
  how:'同時代替「物」和「人」：第三人稱先放 COD（le／la／les）再放 COI（lui／leur）。',
  gram:'pron-avances', codex:null, taught:false,
  pattern:'\\b(le|la|les) (lui|leur)\\b|\\blui en\\b|\\b(le|la|les)-(lui|leur)\\b',
  examples:[
    { fr:'Vous le lui donneriez le temps d’une élection ?', zh:'您願意在一次選舉的時間裡把它給他嗎？', src:'Édito B1 p.185' },
    { fr:'Je les leur prête.', zh:'我把它們借給他們。', src:'Édito B1 p.185' },
    { fr:'Je lui en achète.', zh:'我買一些給他。', src:'Édito B1 p.185' },
    { fr:'Dis-le-leur.', zh:'告訴他們。', src:'Édito B1 p.185' }
  ] }

];
