/* ============================================================
   writing_tasks.js — 依課出題的寫作題庫（A1階段，第1–16課）
   ------------------------------------------------------------
   設計依據（2026-07-12 Owen 定案）：「每天寫2句」要憑空發揮創意，
   自然不會寫 → 改成依今天念的課出題：情境任務＋指定材料（該課
   句型/詞彙）＋3-4句下限。材料就是答案的骨架，把空填滿就是一篇。
   評分用 RUBRICS.md 的 A2 尺（任務完成/可理解/動詞/名詞組）。
   ⚠️ 新課教到時照第七項連動補2題（維護方式同 sentences.js 人工精選）。
   欄位：lesson / id / title / task(情境，中文) / use(指定材料，至少用上全部)
        / frame(下筆順序提示) — 都是「給材料」不是「考創意」。
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
];
