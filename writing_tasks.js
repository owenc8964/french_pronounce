/* ============================================================
   writing_tasks.js — 依課出題的寫作題庫（第1–21課）
   ------------------------------------------------------------
   設計依據（2026-07-12 Owen 定案）：「每天寫2句」要憑空發揮創意，
   自然不會寫 → 改成依今天念的課出題：情境任務＋指定材料（該課
   句型/詞彙）＋3-4句下限。材料就是答案的骨架，把空填滿就是一篇。
   評分用 RUBRICS.md 的 A2 尺（任務完成/可理解/動詞/名詞組）。
   ⚠️ 新課教到時照第七項連動補2題（維護方式同 sentences.js 人工精選）。
   欄位：lesson / id / title / task(情境，中文) / use(指定材料，至少用上全部)
        / frame(下筆順序提示) — 都是「給材料」不是「考創意」。
   ⭐ 2026-08-03 題型升級（第18課起）：除了「指定材料」再加「指定篇章結構」——
   frame 欄以 ⭐ 開頭者會強制要求用時序/轉折/因果連接詞把句子串成段落。
   理由：舊題型只到「寫幾個正確的句子」（項目層），但 B1→B2 考的是把想法
   串起來的能力（篇章層）。見 PLAN_2026-08.md 的 A-5／A-6。
   ============================================================ */

const WRITING_TASKS = [
  // ── 第1課：打招呼・自我介紹・數字日期 ──
  { lesson:1, id:'W1a', title:'群組自我介紹', task:'你剛加入一個法語學習 LINE 群組，寫 3-4 句自我介紹。',
    use:["Je m'appelle …", "J'ai … ans", 'Je suis taïwanais'], frame:'打招呼 → 名字 → 年齡 → 國籍' },
  { lesson:1, id:'W1b', title:'生日邀請', task:'跟朋友說你的生日是哪天、幾歲，邀他有空見面。',
    use:["Mon anniversaire, c'est le …", "J'ai … ans", 'Ça va ?'], frame:'問好 → 生日日期 → 歲數 → 一句邀約' },

  // ── 第2課：住哪・說什麼語言・國家 ──
  { lesson:2, id:'W2a', title:'介紹住處與語言', task:'跟新認識的法國網友說你住哪、說哪些語言、正在學什麼。',
    use:["J'habite à …", 'Je parle …', "J'apprends le français"], frame:'住哪 → 會的語言 → 正在學法文' },
  { lesson:2, id:'W2b', title:'介紹一個朋友', task:'介紹一位外國朋友：他是哪國人、住哪個城市、說什麼語言。',
    use:['Il/Elle habite à …', 'Il/Elle parle …', 'Il/Elle est + 國籍'], frame:'誰 → 國籍 → 城市 → 語言' },

  // ── 第3課：家人・喜好 ──
  { lesson:3, id:'W3a', title:'介紹家人', task:'跟語伴介紹你的家人：有幾個人、他們是誰、其中一位做什麼工作。',
    use:['ma famille', 'mon frère / ma sœur / mes parents', 'Il/Elle est + 職業'], frame:'幾個人 → 是誰 → 挑一位講職業' },
  { lesson:3, id:'W3b', title:'說喜好', task:'寫 3-4 句你喜歡和討厭的活動。',
    use:["J'aime …", 'Je déteste …', 'Je préfère …'], frame:'喜歡兩個 → 討厭一個 → 最喜歡哪個' },

  // ── 第4課：吃的・買東西・去哪買 ──
  { lesson:4, id:'W4a', title:'採買清單訊息', task:'留言給室友：你要去市場，說你要買什麼（至少三樣）、在哪裡買。',
    use:['Je vais au marché / à la boulangerie', "J'achète …", 'du / de la / des'], frame:'去哪 → 買什麼三樣（部分冠詞） → 一句收尾' },
  { lesson:4, id:'W4b', title:'早餐描述', task:'描述你的早餐吃什麼喝什麼。',
    use:['Je mange …', 'Je bois …', "J'aime le/la …"], frame:'吃 → 喝 → 最喜歡哪樣' },

  // ── 第5課：餐廳點餐・數量 ──
  { lesson:5, id:'W5a', title:'跟朋友約吃飯', task:'訊息約朋友去餐廳：想吃什麼、你都點什麼。',
    use:['On va au restaurant ?', 'Je choisis …', 'Je finis mon assiette'], frame:'邀約 → 想點的菜 → 一句玩笑收尾' },
  { lesson:5, id:'W5b', title:'食量描述', task:'寫你平常吃多吃少：什麼吃很多、什麼吃一點、什麼不吃。',
    use:['beaucoup de …', 'un peu de …', 'Je ne mange pas de …'], frame:'很多 → 一點 → 不吃（注意變de）' },

  // ── 第6課：交通・時間・否定 ──
  { lesson:6, id:'W6a', title:'說明通勤', task:'跟同事說你怎麼上班/上學：搭什麼、幾點出門、要多久。',
    use:['Je vais au travail en …', 'à … heures', "C'est près de / loin de chez moi"], frame:'交通工具 → 出門時間 → 遠近' },
  { lesson:6, id:'W6b', title:'描述習慣（含否定）', task:'寫你的週間習慣：常做什麼、從不做什麼。',
    use:['Je … toujours', 'Je ne … jamais', 'le lundi / le week-end'], frame:'總是做的 → 從不做的 → 週末做的' },

  // ── 第7課：衣服・尺寸 ──
  { lesson:7, id:'W7a', title:'今天穿什麼', task:'跟朋友描述你今天的穿搭（至少三件），一件是新的。',
    use:['Je porte …', 'un/une … + 顏色', 'Il/Elle est neuf/neuve'], frame:'三件衣物＋顏色 → 哪件是新的' },
  { lesson:7, id:'W7b', title:'買衣服訊息', task:'你在店裡試衣服，傳訊息問朋友意見：試了什麼、合不合身。',
    use:["J'essaie …", 'Ça me va bien / Ça ne me va pas', "C'est trop grand/petit"], frame:'試什麼 → 合身嗎 → 買不買' },

  // ── 第8課：天氣・近未來 ──
  { lesson:8, id:'W8a', title:'週末計畫', task:'跟朋友說你這週末要做什麼（用近未來，至少三件事）。',
    use:['Je vais + 原形', 'samedi / dimanche', 'avec …'], frame:'週六做什麼 → 週日做什麼 → 邀他一起' },
  { lesson:8, id:'W8b', title:'天氣回報', task:'家人問台北天氣，回 3-4 句：今天天氣、明天會怎樣、該帶什麼。',
    use:['Il fait … / Il pleut', 'Demain, il va …', 'ce parapluie / ce manteau'], frame:'今天 → 明天（近未來） → 建議帶的東西（指示詞）' },

  // ── 第9課：日常作息・邀約 ──
  { lesson:9, id:'W9a', title:'描述作息', task:'寫你平日的一天：幾點醒、盥洗、幾點睡（反身動詞至少三個）。',
    use:['Je me réveille à …', 'Je me douche', 'Je me couche à …'], frame:'早上 → 白天一件事 → 晚上' },
  { lesson:9, id:'W9b', title:'回覆邀約', task:'朋友約你看電影，回訊息：想去但今晚不行，提議別的時間。',
    use:['Je veux bien mais …', 'Je ne peux pas ce soir', 'Tu peux + 時間 ?'], frame:'想去 → 不行的原因 → 提議新時間' },

  // ── 第10課：家事・剛剛做完・外表個性 ──
  { lesson:10, id:'W10a', title:'家事回報', task:'室友出門了，留言說你剛做完哪些家事、還剩什麼沒做。',
    use:['Je viens de + 原形', 'faire le ménage / la vaisselle / la lessive', 'et toi ?'], frame:'剛做完兩件（passé récent） → 剩一件 → 丟回給他' },
  { lesson:10, id:'W10b', title:'描述一個人', task:'跟朋友描述你的新同事：外表兩句、個性兩句。',
    use:['Il/Elle est + 外表', 'Il/Elle a l\'air + 形容詞', '個性形容詞（drôle / sympa / sérieux…）'], frame:'外表 → 看起來如何 → 個性' },

  // ── 第11課：搬家・過去式・家具位置 ──
  { lesson:11, id:'W11a', title:'搬家近況', task:'跟朋友報告搬家：多久前搬的、買了什麼家具、還缺什麼。',
    use:['On a déménagé il y a …', "J'ai acheté …", "Je n'ai pas trouvé de …"], frame:'何時搬（il y a） → 買了什麼（PC） → 還缺什麼（否定de）' },
  { lesson:11, id:'W11b', title:'描述房間', task:'描述你的房間：哪些家具、各在什麼位置（方位詞至少兩個）。',
    use:['Il y a …', 'à droite de / à gauche de / en face de', 'entre … et …'], frame:'有什麼 → 位置一 → 位置二' },

  // ── 第12課：身體・看醫生 ──
  { lesson:12, id:'W12a', title:'請病假訊息', task:'傳訊息給老師/同事請假：哪裡不舒服、要去看醫生。',
    use:["J'ai mal à la/au …", 'Je suis fatigué(e)', 'Je vais chez le médecin'], frame:'哪裡痛 → 整體狀態 → 要去看醫生' },
  { lesson:12, id:'W12b', title:'關心朋友', task:'朋友生病了，寫 3-4 句關心：問狀況、給一個簡單建議。',
    use:['Ça va ?', 'Tu as mal à … ?', 'Tu dois + 原形'], frame:'問候 → 問哪裡不舒服 → 建議' },

  // ── 第13課：運動飲食・建議 ──
  { lesson:13, id:'W13a', title:'給朋友健康建議', task:'朋友說他很累，給他 3-4 句建議（三種給建議句型各用一次）。',
    use:['Il faut + 原形', 'Tu dois + 原形', 'Je te conseille de + 原形'], frame:'必須睡飽 → 該做運動 → 我建議你…' },
  { lesson:13, id:'W13b', title:'自己的運動習慣', task:'寫你的運動與飲食習慣：做什麼運動、多常做、吃得健不健康。',
    use:['Je fais du/de la …', 'une fois par semaine / souvent', 'Je mange …'], frame:'什麼運動 → 頻率 → 飲食一句' },

  // ── 第14課：度假・比較 ──
  { lesson:14, id:'W14a', title:'訂房訊息', task:'寫給民宿的訂房訊息：幾月幾日到幾日、幾個人、問早餐。',
    use:['Je voudrais réserver …', 'du … au …', 'Le petit déjeuner est compris ?'], frame:'訂什麼 → 日期區間 → 幾人 → 問早餐' },
  { lesson:14, id:'W14b', title:'比較兩個地方', task:'比較山上和海邊（或兩個城市）哪個度假好，給你的結論。',
    use:['plus … que', 'moins … que', "C'est meilleur"], frame:'A比B好的點 → B比A差的點 → 結論' },

  // ── 第15課：過去描述・大學學業 ──
  { lesson:15, id:'W15a', title:'昨天 vs 今天', task:'寫昨天和今天的對比：昨天天氣/狀態如何、今天如何（imparfait 三兄弟）。',
    use:['Hier, il faisait …', 'il y avait …', "c'était …"], frame:'昨天天氣 → 昨天狀態 → 今天對比' },
  { lesson:15, id:'W15b', title:'介紹學業', task:'跟法國筆友說你以前念什麼、現在的工作與正在學的東西。',
    use:["J'ai étudié …", 'Je suis + 職業', "J'apprends le français depuis …"], frame:'以前念的 → 現在做的 → 學法文多久了' },

  // ── 第16課：工作・時間長度・表態 ──
  { lesson:16, id:'W16a', title:'描述工作', task:'描述你的工作：做多久了、在哪工作、平常做哪些事。',
    use:['Je travaille … depuis …', 'au bureau / à la clinique', 'écrire des mails / voir des patients'], frame:'做多久（depuis+現在式！） → 地點 → 兩件日常任務' },
  { lesson:16, id:'W16b', title:'遠距工作表態', task:'用 3-4 句表態：你支持還是反對遠距工作，為什麼（一個理由就好）。',
    use:['Je suis pour / contre le télétravail', 'parce que …', "c'est un travail que j'aime"], frame:'立場 → 理由（parce que） → 用 qui/que 加一句' },

  // ── 第17課（A2・passé composé——進入 A2 階段，任務升級成 TCF tâche 1 形態：40-60字訊息）──
  { lesson:17, id:'W17a', title:'週末做了什麼（給朋友的訊息）', task:'朋友問你週末過得如何。回一則 40-60 字的訊息：說三件你做過的事（passé composé，至少一個不規則分詞、至少一個 être 動詞）。',
    use:["J'ai + 分詞", 'Je suis allé(e) / resté(e) …', 'Et toi ?'], frame:'招呼一句 → 三件事（PC） → 丟回給對方' },
  { lesson:17, id:'W17b', title:'報告一件最近的大事', task:'寫 40-60 字跟法國筆友報告一件你人生最近的事（開店/搬家/小孩出生/拿到證照…），說它是多久以前發生的、之後到現在如何。',
    use:['il y a + 時長', "J'ai … / Je suis …（PC）", 'depuis + 現在式'], frame:'什麼事（PC） → 多久前（il y a） → 持續到現在的狀態（depuis+現在式）' },

  // ── 第18課（Parcours de vie ＋ la négation 完整版）
  //    ⚠️ 從這裡開始題型升級：除了「指定材料」，再加「指定篇章結構」——
  //    強制使用時序/轉折連接詞，訓練把句子串成段落的能力（見 PLAN_2026-08.md A-5）。
  { lesson:18, id:'W18a', title:'我的人生歷程（時序連接詞）', task:'寫 60-80 字介紹你的人生歷程：三到四個階段（求學/工作/搬家/成家…）。',
    use:['d\'abord', 'ensuite / puis', 'enfin', 'passé composé'], frame:'⭐ 必須用連接詞串起來：D\'abord, j\'ai … → Ensuite, … → Puis, … → Enfin, aujourd\'hui …（不要寫成沒有連接詞的流水句）' },
  { lesson:18, id:'W18b', title:'我沒做過／不再做的事', task:'寫 50-60 字講三件事：一件你從來沒做過的、一件你已經不做了的、一件你現在還在做的。',
    use:['ne … jamais', 'ne … plus', 'toujours / encore'], frame:'⭐ 三種否定＋轉折連接詞：從沒做過（ne...jamais） → 但是（mais）曾經做現在停了（ne...plus） → 相反地（en revanche）現在還在做的' },

  // ── 第19課（Les loisirs ＋ 時間指示詞 ＋ 邀約）
  { lesson:19, id:'W19a', title:'邀朋友出去（訊息）', task:'寫一則 40-60 字的訊息邀法國朋友週末一起做某個活動：說活動是什麼、時間地點、為什麼推薦。',
    use:['Ça te dit de …', 'On pourrait …', 'parce que'], frame:'招呼 → 提議（Ça te dit de…） → 時間地點 → 一個理由（parce que） → 問對方意見' },
  { lesson:19, id:'W19b', title:'我的休閒習慣（時間表達）', task:'寫 60-80 字描述一項你的休閒活動：多久前開始、做了多久、現在還做不做。',
    use:['il y a + 時長（開始）', 'pendant + 時長（持續期間）', 'depuis + 現在式（到現在）'], frame:'⭐ 三個時間詞各用一次：什麼時候開始（il y a） → 做了多久（pendant） → 現在還在做（depuis + 現在式）' },

  // ── 第20課（Je me souviens ＋ imparfait 完整變位）
  //    W20a 直接對應課本的 Production écrite → DELF 題型（描述一段回憶，50字以上）
  { lesson:20, id:'W20a', title:'一段快樂的回憶（DELF 題型）', task:'描述一段快樂的回憶：當時幾歲、在哪裡、跟誰、常做什麼（60-80 字）。⚠️ 整段都在描述過去的場景與習慣，所以幾乎全部用 imparfait。',
    use:["Quand j'étais petit(e)", 'imparfait（至少 5 個不同動詞）', 'chaque jour / souvent / de temps en temps'], frame:'⭐ 開場定位（Quand j\'étais petit(e), j\'avais … ans） → 地點與人（c\'était / il y avait） → 常做的事（imparfait ＋ 頻率副詞） → 收尾感受' },
  { lesson:20, id:'W20b', title:'以前 vs 現在（兩個時態並存）', task:'寫 60-80 字對比「以前」跟「現在」：一個你以前常做但後來改變的習慣，說改變是什麼時候發生的。',
    use:['Avant, je … （imparfait）', 'mais un jour, j\'ai … （passé composé）', 'Aujourd\'hui, je … （現在式）'], frame:'⭐ 三個時態各司其職：以前的習慣（imparfait） → 但是發生了一件事（mais ＋ PC，單次事件） → 所以現在（donc ＋ 現在式）' },

  // ── 第21課（Le souvenir ＋ pronoms y/en ＋ 五感）
  { lesson:21, id:'W21a', title:'一個讓你難忘的地方', task:'寫 80-100 字介紹一個你去過、印象深刻的地方：在哪、去過幾次、當時聽到聞到看到什麼、為什麼忘不了。',
    use:['y（至少一次）', 'en（至少一次）', '五感詞彙（l\'odeur / le bruit / la vue）', 'marquer à jamais'], frame:'⭐ 仿課文結構：這是什麼地方 → 我什麼時候去的（J\'y suis allé…） → 那裡有什麼（on y trouve…） → 感官細節（l\'odeur de… / le bruit de…） → 收尾（Ce paysage m\'a marqué à jamais）' },
  { lesson:21, id:'W21b', title:'推薦一個地方（說服型）', task:'寫 80-100 字推薦台灣的一個地方給法國朋友：為什麼值得去、去了會體驗到什麼、給一個實用建議。',
    use:['C\'est un endroit qui …', 'on y trouve / on en revient …', 'Que demander de plus ?', '祈使句給建議'], frame:'⭐ 論證結構：先下結論（值得去） → 兩個理由（d\'abord… ensuite…） → 讓步（C\'est un peu touristique, mais…） → 實用建議（祈使句：Mettez… / Faites…）' },

  // ── 第22課（la météo ＋ la place de l'adjectif）
  { lesson:22, id:'W22a', title:'從台灣寄一張明信片（tâche 1）', task:'寫 50-70 字的訊息給法國朋友：今天台灣的天氣如何、你因為天氣做了什麼／不能做什麼。⚠️ 天氣一律用 il fait / il y a / il pleut 這種無人稱句起手。',
    use:['Quel temps fait-il ? 的回答形式（Il fait…）', 'la canicule 或 la fraîcheur（不是只用 chaud / froid）', 'La météo annonce…', '至少一個放在名詞前的短形容詞'],
    frame:'⭐ 開場問候 → 今天的天氣（Il fait… / Il y a…） → 因此做了什麼（donc / alors） → 預報明天（La météo annonce…） → 收尾（À bientôt !）' },
  { lesson:22, id:'W22b', title:'一次因為天氣而難忘的假期', task:'寫 80-100 字：一次天氣影響了你行程的旅行。⚠️ 這題是形容詞位置的練習場——每一個名詞都要帶形容詞，並自己判斷放前面還是後面。',
    use:['短形容詞在前（un bon restaurant / de jolies… / de gros…）', '⚠️ 形容詞放複數名詞前 → des 要縮成 de', '顏色與國籍形容詞放名詞後', 'passé composé ＋ imparfait 並用'],
    frame:'⭐ 什麼時候去哪裡（passé composé） → 當時的天氣與背景（imparfait） → 發生了什麼（passé composé） → 收尾感受' },

  // ── 第23課（le logement ＋ pronoms relatifs qui / que / où）
  { lesson:23, id:'W23a', title:'回覆一則租屋廣告（tâche 1）', task:'你在網路上看到一間套房的廣告。寫 50-70 字的訊息給房東：你是誰、想租哪一間、問兩個問題（租金含什麼、可不可以看房）。',
    use:['Je cherche un studio qui…', 'le loyer / charges comprises', '… mètres carrés', 'Est-ce que…? 兩個問句'],
    frame:'⭐ 自我介紹一句 → 我要租哪一間（用 qui／que 指出是哪一則廣告） → 問題一（租金） → 問題二（看房時間） → 客氣收尾（Merci d\'avance.）' },
  { lesson:23, id:'W23b', title:'介紹你現在住的地方', task:'寫 80-100 字介紹你住的房子：哪一間房間你最喜歡、為什麼、跟誰一起住。⚠️ 每一句都要想清楚該用 qui、que 還是 où——這題就是為了逼你選。',
    use:['qui（子句缺主詞）至少一次', 'que（子句缺受詞）至少一次', 'où（地點）至少一次', 'Je trouve que…'],
    frame:'⭐ 這是什麼樣的房子（C\'est un appartement qui…） → 我最喜歡的房間（La pièce que je préfère, c\'est…） → 在那裡我做什麼（C\'est là où je…） → 跟誰住 → 收尾評價（Je trouve que…）' },

  // ── 第24課（DELF A2 閱讀實戰 ＋ 考試指令 ＋ 時刻 ＋ 活動廣告）
  { lesson:24, id:'W24a', title:'約朋友一起報名一個活動（tâche 1）', task:'你看到一則活動廣告（烹飪工作坊、健身房、球隊…任選）。寫 50-70 字的訊息約朋友一起去：活動幾點開始、多少錢、為什麼你想去。',
    use:['À quelle heure…? 或 Ça commence à…', '時刻的兩套說法（14h／deux heures de l\'après-midi）', 'le moins cher / la moins chère', 'Ça te dit ?'],
    frame:'⭐ 我發現了什麼（J\'ai trouvé…） → 時間與價格（兩個數字都要寫出來） → 為什麼值得去 → 邀請並問對方（Ça te dit ?）' },
  { lesson:24, id:'W24b', title:'把老師的解題法寫成給自己的備忘', task:'寫 60-80 字，用命令式寫下你考閱讀時要照做的五個步驟（就是老師課堂上給的那五條）。⚠️ 這篇是「寫給自己看的規則」，所以整篇用 vous 或 tu 的命令式。',
    use:['命令式（至少四個不同動詞）', 'Lisez d\'abord…', 'Essayez de ＋ 原形', 'Il faut ＋ 原形'],
    frame:'⭐ 步驟一 → 步驟二 → 步驟三 →（用 d\'abord / ensuite / puis / enfin 串起來） → 最後一句安慰自己（C\'est normal de…）' },

  // ── 第25課（la comparaison ＋ la condition si ＋ 家具與街區）
  { lesson:25, id:'W25a', title:'兩個住處二選一（比較級的練習場）', task:'寫 80-100 字比較兩個住的地方（例如市區的套房 vs 郊區的公寓）：房間數、租金、生活便利度，最後說你選哪一個。⚠️ 名詞、形容詞、動詞的比較寫法不一樣，三種都要出現。',
    use:['形容詞比較：plus / moins ＋ 形容詞 ＋ que', '名詞比較：autant de ＋ 名詞 ＋ que', '動詞比較：動詞 ＋ plus / moins que', '⚠️ bien → mieux（動詞）、bon → meilleur（形容詞）'],
    frame:'⭐ 先擺出兩個選項 → 比房間（名詞比較） → 比價格（形容詞比較） → 比生活（動詞比較，用 on vit mieux…） → 結論（J\'aime mieux… parce que…）' },
  { lesson:25, id:'W25b', title:'給要搬來台灣的朋友的四個建議（tâche 1）', task:'寫 50-70 字：朋友要搬來你住的城市，給他三到四個實用建議。⚠️ 每個建議都要用一個 si 句包起來（現在式 ＋ 命令式）。',
    use:['si ＋ 現在式 ＋ 命令式（至少兩次）', '⚠️ s\'il（只在 il 前面縮寫）', '街區形容詞（animé / tranquille / commerçant…）', 'Ça va aller, t\'inquiète.'],
    frame:'⭐ 開場（Tu vas adorer…） → 建議一（Si tu…, ＋命令式） → 建議二（Si…） → 建議三（S\'il fait…） → 收尾安慰對方' },

  // ── 第26課（le même que／pareil／autant de ＋ tout vs chaque ＋ 外貌與性格）
  { lesson:26, id:'W26a', title:'描述一個你很熟的人（外貌＋性格）', task:'寫 80-100 字描述一個你很熟的人：長相像家裡的誰、性格有什麼優點跟缺點。⚠️ 講「像」不能只用 comme——名詞用 le même … que，形容詞用 pareil。',
    use:['le / la / les même(s) ＋ 名詞 ＋ que', 'autant de ＋ 名詞 ＋ que', 'chaque ＋ 單數名詞（永遠不變化）', '至少一個優點與一個缺點（qualité / défaut）'],
    frame:'⭐ 這個人是誰 → 長相（Il a le même … que…） → 性格優點 → 但也有缺點（mais…） → 收尾用課本那句精神（Chaque qualité peut cacher un défaut.）' },
  { lesson:26, id:'W26b', title:'我為什麼信任這個人（tout / chaque 的練習場）', task:'寫 60-80 字說明你為什麼信任某個人。⚠️ 這題專攻 tout 跟 chaque 的分工：tout 要跟名詞配合（tout/toute/tous/toutes），chaque 永遠不變化＋單數。',
    use:['tous les / toutes les ＋ 複數名詞', 'chaque ＋ 單數名詞', 'compter sur quelqu\'un', 'se sentir bien dans sa peau'],
    frame:'⭐ 這個人是誰 → 他每一次都怎麼做（chaque fois que…） → 我喜歡他的所有哪些面向（tous les aspects…） → 結論（Je peux compter sur lui / elle.）' },

  // ── 第27課（pronoms possessifs ＋ futur simple ＋ 科技）
  { lesson:27, id:'W27a', title:'借東西給同事的訊息（tâche 1）', task:'同事的電腦（或相機、手機）壞了。寫 50-70 字的訊息：說你的可以借他、什麼時候拿、要注意什麼。⚠️ 一旦講過那個東西，之後就用所有格代名詞，不要一直重複名詞。',
    use:['le mien / la mienne（至少一次）', 'le tien / la tienne 或 le sien / la sienne', 'être en panne / réparer / fonctionner', '未來式至少一次'],
    frame:'⭐ 我聽說了（J\'ai appris que ton … est en panne.） → 借你我的（Prends le mien.） → 什麼時候怎麼拿（未來式） → 注意事項 → 收尾' },
  { lesson:27, id:'W27b', title:'2050 年的一天（未來式全篇）', task:'寫 80-100 字描述 2050 年你普通的一天：早上怎麼移動、工作怎麼做、晚上做什麼。⚠️ 全篇未來式，而且要出現至少三個不規則字根。',
    use:['未來式不規則字根三個以上（aur- / ser- / fer- / ir- / verr- / saur- / pourr- / voudr- / viendr-）', 'il y aura ＋ ce sera（兩塊整組用）', '所有格代名詞至少一次（le mien / le sien…）', '科技詞彙（robot / hologramme / tablette / autonome…）'],
    frame:'⭐ 開場定位（En 2050, ma vie ne sera pas la même.） → 早上 → 工作 → 晚上 → 收尾提問或評價（Est-ce que … sera meilleur que le nôtre ?）' },
  // ── 第28課（si 條件句三式 ＋ si vs quand ＋ le pronom on ＋ 電話與網路詞彙）
  { lesson:28, id:'W28a', title:'給朋友的四個建議（DELF A2 tâche 1）', task:'你的朋友說他每天花太多時間在手機上。寫 60-80 字的訊息給他，給三到四個具體建議。⚠️ 仿課本 wikiHow 那篇的寫法：每個建議都用一個 si 句包起來。',
    use:['si ＋ 現在式 ＋ 命令式（至少兩次）', 'si ＋ 現在式 ＋ 未來式（至少一次）', 'essayer de ＋ 原形', '本課科技詞彙（appli / réseaux sociaux / éteindre）'],
    frame:'⭐ 開場點題（Tu passes trop de temps sur ton portable ?） → 建議一（Si tu…, ＋ 命令式） → 建議二（Si tu…, ＋ 命令式） → 預測好處（Si tu fais ça une semaine, tu…＋未來式） → 收尾鼓勵' },
  { lesson:28, id:'W28b', title:'我的十年後（si 與 quand 並用）', task:'寫 80-100 字：十年後你的生活會是什麼樣子？⚠️ 至少要有一件「一定會發生」的事（用 quand ＋ 未來 ＋ 未來）跟一件「不一定會發生」的事（用 si）——這兩個的對比就是本課的重點。',
    use:['quand ＋ 未來式 ＋ 未來式（至少一次）', 'si ＋ 現在式 ＋ 未來式（至少一次）', 'on（至少一次，並且說得出它是哪一種意思）', 'J\'espère que ＋ 未來式'],
    frame:'⭐⭐ 先確定的事（Quand j\'aurai … ans, je …） → 再不確定的事（Si tout se passe bien, je …） → 一句通則（Quand on …, on est …＝les gens） → 收尾期望（J\'espère que …＋未來式）' },

  // ── 第29課（le pronom en 數量版 ＋ 義務與禁止 ＋ 食材與食譜）
  { lesson:29, id:'W29a', title:'我家的餐桌規矩（義務與禁止）', task:'寫 60-80 字介紹你家吃飯的規矩：三件一定要做的、兩件不可以做的。⚠️ 仿課本 Dupon／Pondu 那一題的寫法，義務跟禁止的說法要換著用，不要一路 il faut 到底。',
    use:['il faut ＋ 原形（至少一次）', 'il est interdit de／il est défendu de（至少一次）', 'vous ne devez pas ＋ 原形', '一個反身動詞的命令式（Lavez-vous…／Brosse-toi…）'],
    frame:'⭐ 開場定位（Chez moi, pendant les repas…） → 三件義務（換三種說法） → 兩件禁止 → 收尾一句命令式' },
  { lesson:29, id:'W29b', title:'寫一份食譜（en ＋ 食譜動詞）', task:'寫 80-100 字，把一道你會做的菜寫成食譜：先列材料（含量詞），再寫五個步驟。⚠️ 材料清單裡至少要用 en 回答兩次（例如「洋蔥嗎？我放一把」），步驟一律用命令式（vous 形）。',
    use:['en ＋ 量詞或數字（至少兩次）', '量詞（une pincée de／une botte de／un bouquet de…）', '食譜動詞（préchauffer／mélanger／verser／faire cuire／servir）', 'faire cuire（⚠️ 不能只寫 cuire）'],
    frame:'⭐ 材料（Pour 4 personnes : …） → 自問自答用 en（Des oignons ? J\'en mets une botte.） → 五個步驟（全部命令式） → 收尾（Servez tiède avec…）' },
];
