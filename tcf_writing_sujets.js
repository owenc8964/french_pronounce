/* ============================================================
   tcf_writing_sujets.js — TCF Canada 寫作真題題庫（三 tâche）
   ------------------------------------------------------------
   2026-09-05 建立。給 tcf_writing.html 讀。

   ⭐ 這個檔是「燃料層」。上一輪做口說 T1 的教訓是「工具沒有燃料等於空的」；
     寫作剛好相反——燃料多到滿出來，⭐ 瓶頸是「燃料是髒的、而且機器讀不到」。
     這個檔就是把髒燃料洗乾淨、變成機器讀得到的形式。

   資料來源（⛔ 全部是真題，沒有任何一句是 Claude 寫的）：
     assets/tcf/_analyse/TCF_sujets_ecriture.txt      （OCR 純文字）
     assets/tcf/pack3/_analyse/ecrit_T1_sujets.json   （另一批 T1）

   ⚠️⚠️ 校對規則（依專案鐵律「來源三層優先序：標準法文 ＞ 課本 ＞ 逐字稿」）：
     OCR 產物等同逐字稿——**是線索不是判準**。所以：
     ✅ 可以修辨識錯、缺重音、文法配合錯、清浮水印
     ⛔ 不准改寫句子、不准補完斷掉的文件、不准改題目要求的內容
     ⭐⭐ **每一處改動都記在 ocr_fix，一處一筆，附 why。**
        說不出「原文那裡是辨識錯誤」的改動，一律還原回原文。
     → tools/check_tcf_writing.js 會把 ocr_fix 反推回去比對原檔，**改了沒記一定抓到**。
        （對照 t1_stock.js 的子序列比對：那邊只准刪字，這邊准修但要留痕。）

   ⛔ id 是永久門牌，一經指定不重編（同 codex.js 規則，Owen 靠位置記憶）。

   欄位：
     T1/T2  id / fr / zh / theme / ocr_fix[] / src / note?
     T3     id / theme / doc1 / doc2 / doc1_pos / doc2_pos / zh / intro / tronque[] / ocr_fix[] / src
            note?      資料品質提醒（漏字、原文破碎）——⭐ 讓 Owen 知道讀不通不是他的問題
            quality?   'faible' = 原文是考生手寫筆記，⛔ 只當議題用，不當法文範本

   ⚠️ tronque 的判準不是印象，是量出來的：原始 OCR 每份文件有 598–600 字元硬上限，
     達上限者必定被截斷。⛔ 斷了就標，**不准自己續寫補完**。
   ============================================================ */

const TCF_WRITING_SUJETS = {
 "meta": {
  "built": "2026-09-05",
  "src": [
   "assets/tcf/_analyse/TCF_sujets_ecriture.txt",
   "assets/tcf/pack3/_analyse/ecrit_T1_sujets.json"
  ],
  "spec": {
   "t1": {
    "min": 60,
    "max": 120,
    "mins": "10–15",
    "forme": "message à un(e) ami(e)"
   },
   "t2": {
    "min": 120,
    "max": 150,
    "mins": "20–25",
    "forme": "article de blog / courrier / note"
   },
   "t3": {
    "min": 120,
    "max": 180,
    "mins": "20–25",
    "forme": "2 documents opposés + prise de position",
    "p1": [
     40,
     60
    ],
    "p2": [
     80,
     120
    ]
   }
  },
  "total_min": 60
 },
 "t1": [
  {
   "id": "W-T1-01",
   "fr": "Vous participez à un évènement sportif dans votre ville, vous allez envoyer un message à vos amis pour les inviter en indiquant la date, le lieu, les activités",
   "zh": "你參加你所在城市的一場體育活動。你要寫訊息給朋友們邀請他們，並說明日期、地點、活動內容。",
   "theme": "sport",
   "ocr_fix": [],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:9"
  },
  {
   "id": "W-T1-02",
   "fr": "Votre ami veut se mettre au sport. Vous lui envoyez un message pour lui conseiller une salle de sport située dans votre quartier (localisation, prix, type d’activités, etc…)",
   "zh": "你朋友想開始運動。寫訊息推薦一間位於你住的社區的健身房（位置、價格、活動種類等）。",
   "theme": "sport",
   "ocr_fix": [
    {
     "from": "situé",
     "to": "située",
     "why": "文法配合：salle de sport 為陰性單數，過去分詞當形容詞須配合"
    }
   ],
   "src": "assets/tcf/pack3/_analyse/ecrit_T1_sujets.json:108, assets/tcf/_analyse/TCF_sujets_ecriture.txt:11"
  },
  {
   "id": "W-T1-03",
   "fr": "Vous avez décidé de pratiquer un sport. Vous proposez à votre ami(e) d'aller avec vous. Vous lui envoyez un message avec les informations utiles (lieu, les équipements, les activités.)",
   "zh": "你決定開始做一項運動，並邀請朋友和你一起去。寫訊息給他，附上有用的資訊（地點、器材設備、活動內容）。",
   "theme": "sport",
   "ocr_fix": [
    {
     "from": "activites",
     "to": "activités",
     "why": "OCR 漏掉重音符號"
    }
   ],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:13, assets/tcf/pack3/_analyse/ecrit_T1_sujets.json:156"
  },
  {
   "id": "W-T1-04",
   "fr": "Vous faites du sport dans un club. Vous venez de remporter une compétition. Vous écrivez un courriel à vos amis pour leur raconter cet évènement sportif et annoncer votre réussite sportive.",
   "zh": "你在一個俱樂部運動，剛贏得一場比賽。寫電子郵件給朋友們，敘述這場賽事並宣布你的勝利。",
   "theme": "sport",
   "ocr_fix": [
    {
     "from": "une compétition vous écrivez",
     "to": "une compétition. Vous écrivez",
     "why": "OCR 漏掉兩句之間的句點（pack3 同題此處有句點）"
    }
   ],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:15, assets/tcf/pack3/_analyse/ecrit_T1_sujets.json:144"
  },
  {
   "id": "W-T1-05",
   "fr": "Vous invitez un(e) ami(e) pour une semaine de festival de cinéma organisée dans votre ville. Vous lui envoyez un message avec toutes les informations nécessaires (le programme, le tarif, les horaires, la date, le lieu...)",
   "zh": "你邀請一位朋友來參加你所在城市舉辦的電影節週。寫訊息告訴他所有必要資訊（節目表、票價、場次時間、日期、地點……）。",
   "theme": "culture",
   "ocr_fix": [],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:17, assets/tcf/pack3/_analyse/ecrit_T1_sujets.json:40"
  },
  {
   "id": "W-T1-06",
   "fr": "Vous envoyez un message pour inviter vos amis à visiter un lieu touristique que vous aimez dans votre ville. Vous leur donnez toutes les informations nécessaires (activités, hébergement, date, lieu)",
   "zh": "寫訊息邀請朋友們去參觀你城市裡你喜歡的一個觀光景點，並提供所有必要資訊（活動、住宿、日期、地點）。",
   "theme": "voyage",
   "ocr_fix": [
    {
     "from": "dans votre ville Vous leur donnez",
     "to": "dans votre ville. Vous leur donnez",
     "why": "OCR 漏掉兩句之間的句點"
    }
   ],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:19"
  },
  {
   "id": "W-T1-07",
   "fr": "Vous devez passer une journée dans un parc de loisirs avec votre ami, écrivez-lui un message pour décrire la sortie (horaires, transport, billet, les activités)",
   "zh": "你要和朋友去遊樂園玩一天。寫訊息給他描述這次出遊（時間、交通、門票、活動）。",
   "theme": "loisirs",
   "ocr_fix": [
    {
     "from": "écrivez lui",
     "to": "écrivez-lui",
     "why": "命令式後接受詞代名詞須用連字號，OCR 漏掉"
    }
   ],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:21, assets/tcf/pack3/_analyse/ecrit_T1_sujets.json:116"
  },
  {
   "id": "W-T1-08",
   "fr": "Vous allez fêter votre anniversaire. Vos amis vous demandent ce que vous souhaitez comme cadeaux. Vous voulez des vêtements. Vous leur écrivez un message pour leur décrire les vêtements que vous aimeriez recevoir (60 mots minimum/120 mots maximum)",
   "zh": "你要慶生，朋友問你想要什麼禮物。你想要衣服。寫訊息向他們描述你希望收到的衣服（60字以上／120字以內）。",
   "theme": "fête",
   "ocr_fix": [
    {
     "from": "des vêtements Vous leur écrivez",
     "to": "des vêtements. Vous leur écrivez",
     "why": "OCR 漏掉兩句之間的句點（pack3 同題此處有句點）"
    }
   ],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:23, assets/tcf/pack3/_analyse/ecrit_T1_sujets.json:64"
  },
  {
   "id": "W-T1-09",
   "fr": "Vous souhaitez fêter votre anniversaire dans un restaurant. Écrivez un courriel pour inviter vos amis. Vous leur donnez toutes les informations nécessaires (lieu, date ; horaires, menus, prix) et vous leur demandez une réponse.",
   "zh": "你想在餐廳慶生。寫電子郵件邀請朋友，提供所有必要資訊（地點、日期、時間、菜單、價格），並請他們回覆。",
   "theme": "fête",
   "ocr_fix": [
    {
     "from": "vois amis",
     "to": "vos amis",
     "why": "OCR 辨識錯：vois 應為所有格 vos"
    }
   ],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:25, assets/tcf/pack3/_analyse/ecrit_T1_sujets.json:44"
  },
  {
   "id": "W-T1-10",
   "fr": "Vous organisez une fête, écrivez à vos amis pour vous aider à l'organiser. 60 mots minimum/120 mots maximum",
   "zh": "你要辦一場派對。寫信請朋友們幫你一起籌辦（60字以上／120字以內）。",
   "theme": "fête",
   "ocr_fix": [
    {
     "from": "ou mois minimum o mors maximum",
     "to": "60 mots minimum/120 mots maximum",
     "why": "亂碼字數標記，依 T1 規格（60–120 mots）還原"
    }
   ],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:27"
  },
  {
   "id": "W-T1-11",
   "fr": "Vous avez lu une annonce sur un site internet qui propose l'aide aux personnes qui souhaitent apprendre le français et les aider à trouver des personnes avec lesquelles elles peuvent pratiquer le français et qui leur permettront d'améliorer leur niveau. Envoyez un email pour répondre à cette annonce tout en vous présentant et en expliquant pourquoi",
   "zh": "你在某網站上看到一則啟事：他們協助想學法文的人，幫他們找到可以一起練習法文、讓他們提升程度的夥伴。寫電子郵件回覆這則啟事，同時自我介紹並說明原因。",
   "theme": "éducation",
   "ocr_fix": [],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:29"
  },
  {
   "id": "W-T1-12",
   "fr": "Vous voulez communiquer avec quelqu'un en français en toute convivialité. Vous écrivez un courriel à cette adresse(...) pour qu'on vous propose quelqu'un (centre d'intérêt, présentez vous...) (60 mots minimum/120 mots maximum)",
   "zh": "你想找人輕鬆地用法文交流。寫電子郵件到這個地址（……），請對方替你介紹一個人（興趣、自我介紹……）（60字以上／120字以內）。",
   "theme": "éducation",
   "ocr_fix": [],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:31, assets/tcf/pack3/_analyse/ecrit_T1_sujets.json:180"
  },
  {
   "id": "W-T1-13",
   "fr": "Vous vous êtes récemment installé dans cette ville, et il vous est demandé de vous présenter et décrire ensuite tous vos lieux préférés au sein de cette ville",
   "zh": "你最近搬到這座城市。題目要求你自我介紹，接著描述你在這座城市裡所有最喜歡的地方。",
   "theme": "ville",
   "ocr_fix": [
    {
     "from": " CANADA",
     "to": "",
     "why": "題目正文外的來源標記（浮水印），非題目內容"
    }
   ],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:33"
  },
  {
   "id": "W-T1-14",
   "fr": "Vous voulez organiser une visite culturelle dans votre ville. Vous envoyez un message pour inviter vos amis. Vous leur donnez toutes les informations nécessaires (les activités, la date, le lieu...)",
   "zh": "你想在你的城市辦一次文化參訪。寫訊息邀請朋友們，並提供所有必要資訊（活動、日期、地點……）。",
   "theme": "culture",
   "ocr_fix": [],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:35, assets/tcf/pack3/_analyse/ecrit_T1_sujets.json:36"
  },
  {
   "id": "W-T1-15",
   "fr": "Votre ami Mehdi vient de s'installer dans votre ville et il a besoin d'aide concernant les transports. Répondez-lui en lui donnant les informations (types de transport, abonnement, prix...)",
   "zh": "你朋友 Mehdi 剛搬到你的城市，需要交通方面的協助。回訊息給他，提供資訊（交通工具種類、月票／定期票、價格……）。",
   "theme": "ville",
   "ocr_fix": [
    {
     "from": "prix...))",
     "to": "prix...)",
     "why": "OCR 多打一個右括號，前面只有一個左括號"
    }
   ],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:37, assets/tcf/pack3/_analyse/ecrit_T1_sujets.json:4"
  },
  {
   "id": "W-T1-16",
   "fr": "Vous avez déménagé dans une nouvelle ville depuis un mois. Vous écrivez un courriel à votre Leo pour lui donner de vos nouvelles! Vous devez lui décrire : ( l'appartement, le quartier, la ville, les activités...)",
   "zh": "你搬到新城市已經一個月。寫電子郵件給 Leo 報近況，必須描述：公寓、社區、城市、活動……。",
   "theme": "ville",
   "ocr_fix": [
    {
     "from": " CANADA",
     "to": "",
     "why": "題目正文外的來源標記（浮水印），非題目內容"
    }
   ],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:39, assets/tcf/pack3/_analyse/ecrit_T1_sujets.json:184",
   "note": "⚠️ 原文寫 à votre Leo，兩個來源都缺 ami，依規則不補字。"
  },
  {
   "id": "W-T1-17",
   "fr": "Vous avez récemment déménagé dans une nouvelle ville. Invitez votre amie à venir passer les vacances chez vous. (60 mots minimum/120 mots maximum)",
   "zh": "你最近搬到一座新城市。邀請你的朋友來你這裡度假（60字以上／120字以內）。",
   "theme": "ville",
   "ocr_fix": [
    {
     "from": "(ou mots minimum/izo mots maximum)",
     "to": "(60 mots minimum/120 mots maximum)",
     "why": "亂碼字數標記，依 T1 規格（60–120 mots）還原"
    }
   ],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:41"
  },
  {
   "id": "W-T1-18",
   "fr": "Vous répondez à votre ami Bernard. Dans votre message, vous décrivez un marché de votre quartier que vous aimez bien (lieu, horaires, produits, etc.)",
   "zh": "你回覆朋友 Bernard。在訊息裡描述你很喜歡的、你們社區的一個市場（地點、營業時間、賣的東西等）。",
   "theme": "alimentation",
   "ocr_fix": [],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:43, assets/tcf/pack3/_analyse/ecrit_T1_sujets.json:28"
  },
  {
   "id": "W-T1-19",
   "fr": "Votre ami(e) va passer ses vacances dans votre pays. Écrivez-lui un message pour lui proposer des places à visiter (monuments, ville, etc.)",
   "zh": "你的朋友要來你的國家度假。寫訊息向他推薦可以參觀的地方（古蹟、城市等）。",
   "theme": "voyage",
   "ocr_fix": [],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:45, assets/tcf/pack3/_analyse/ecrit_T1_sujets.json:20"
  },
  {
   "id": "W-T1-20",
   "fr": "Vous avez passé un week-end à la campagne. Écrivez un message à votre ami(e) pour lui décrire ce qui s'est passé. (60 mots minimum/120 mots maximum)",
   "zh": "你在鄉下度過一個週末。寫訊息向朋友描述發生了什麼事（60字以上／120字以內）。",
   "theme": "loisirs",
   "ocr_fix": [],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:47"
  },
  {
   "id": "W-T1-21",
   "fr": "Vous partez en vacances avec des amis. Vous avez trouvé un hôtel. Vous écrivez un message à vos amis pour décrire cet hôtel (localisation, prix, équipement, etc.) vous leur proposez de réserver cet hôtel.",
   "zh": "你要和朋友們去度假，你找到了一家旅館。寫訊息向朋友們描述這家旅館（位置、價格、設備等），並提議訂下這家旅館。",
   "theme": "voyage",
   "ocr_fix": [
    {
     "from": "Vous portez en vacances",
     "to": "Vous partez en vacances",
     "why": "OCR 辨識錯（a→o）：partir en vacances 才通，porter 在此不成句"
    }
   ],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:49"
  },
  {
   "id": "W-T1-22",
   "fr": "Vous avez trouvé un hôtel pour Matthias. Vous lui écrivez un courriel. Dans ce message vous décrivez l’hôtel et vous lui donnez toutes les informations utiles (situation, tarif…).",
   "zh": "你替 Matthias 找到一家旅館。寫電子郵件給他，描述這家旅館並提供所有有用的資訊（位置、價錢……）。",
   "theme": "voyage",
   "ocr_fix": [],
   "src": "assets/tcf/pack3/_analyse/ecrit_T1_sujets.json:16, assets/tcf/_analyse/TCF_sujets_ecriture.txt:51"
  },
  {
   "id": "W-T1-23",
   "fr": "Vous partez en voyage et vous laissez votre appartement à un ami qui veut venir rester chez vous pendant vos vacances. Vous lui envoyez un message pour décrire votre appartement (immeuble, logement, accès…).",
   "zh": "你要出門旅行，把公寓留給一位想在你度假期間住進來的朋友。寫訊息描述你的公寓（大樓、住處本身、如何進出……）。",
   "theme": "logement",
   "ocr_fix": [
    {
     "from": "chez-vous",
     "to": "chez vous",
     "why": "介系詞 chez + 重讀代名詞不用連字號（連字號只出現在名詞 un chez-soi）"
    }
   ],
   "src": "assets/tcf/pack3/_analyse/ecrit_T1_sujets.json:104, assets/tcf/_analyse/TCF_sujets_ecriture.txt:53, assets/tcf/_analyse/TCF_sujets_ecriture.txt:55"
  },
  {
   "id": "W-T1-24",
   "fr": "Votre ami Cédric a accepté de garder votre maison et jardin pendant vos vacances. Écrivez un message pour lui dire ce qu'il doit faire.",
   "zh": "你朋友 Cédric 答應在你度假期間幫你看家和照顧花園。寫訊息告訴他該做哪些事。",
   "theme": "logement",
   "ocr_fix": [],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:57, assets/tcf/pack3/_analyse/ecrit_T1_sujets.json:100"
  },
  {
   "id": "W-T1-25",
   "fr": "Vous voulez changer la décoration de votre appartement (peinture, meubles, objets). Vous écrivez un message à un(e) ami(e). Vous lui décrivez votre projet et vous lui demandez de vous aider.",
   "zh": "你想改變公寓的裝潢（油漆、家具、擺設）。寫訊息給一位朋友，描述你的計畫並請他幫忙。",
   "theme": "logement",
   "ocr_fix": [
    {
     "from": "un messagecaun(e) ami(e)",
     "to": "un message à un(e) ami(e)",
     "why": "OCR 把 à 誤認成 ca 並與前後字黏在一起（écrire un message à quelqu'un）"
    }
   ],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:59"
  },
  {
   "id": "W-T1-26",
   "fr": "Vous êtes locataire d’un appartement trop grand pour vous. Écrivez une annonce dans un journal pour chercher un colocataire. Il faut mentionner : la superficie, caractère du colocataire, prix, etc.",
   "zh": "你租的公寓對你來說太大。在報紙上寫一則啟事找室友，必須提到：坪數／面積、室友的個性、租金等。",
   "theme": "logement",
   "ocr_fix": [
    {
     "from": "mentionner ;",
     "to": "mentionner :",
     "why": "OCR 把冒號誤認為分號：後面接的是列舉項目"
    },
    {
     "from": "etc).",
     "to": "etc.",
     "why": "OCR 多出一個沒有對應左括號的右括號，並漏掉 etc. 的縮寫句點"
    },
    {
     "from": "LOUER : CHAMBRE DANS APPARTEMENT SPACIEUX À Je propose une chambre dans un appartement spacieux situé…（其後約 60 字範文與夾雜的頁碼 33）",
     "to": "",
     "why": "原檔在題目後直接接了範文答案與頁碼，非題目內容"
    }
   ],
   "src": "assets/tcf/pack3/_analyse/ecrit_T1_sujets.json:124, assets/tcf/_analyse/TCF_sujets_ecriture.txt:61"
  },
  {
   "id": "W-T1-27",
   "fr": "Vous avez mis en ligne une annonce pour la location de votre appartement. Écrivez un courriel à une personne intéressée pour lui donner les informations sur l'appartement et le quartier.",
   "zh": "你在網路上刊登了公寓出租啟事。寫電子郵件給一位有興趣的人，提供公寓和社區的相關資訊。",
   "theme": "logement",
   "ocr_fix": [],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:63"
  },
  {
   "id": "W-T1-28",
   "fr": "Vous allez bientôt déménager. Écrivez un message à votre ami(e) pour demander son aide en fournissant les informations (date, lieu, transports, etc.).",
   "zh": "你快要搬家了。寫訊息給朋友請他幫忙，並提供資訊（日期、地點、交通等）。",
   "theme": "logement",
   "ocr_fix": [],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:65, assets/tcf/pack3/_analyse/ecrit_T1_sujets.json:88"
  },
  {
   "id": "W-T1-29",
   "fr": "Vous avez trouvé un nouveau travail. Vous écrivez à votre amie francophone pour lui annoncer la bonne nouvelle. Vous décrivez votre poste, vos collègues et votre lieu de travail.",
   "zh": "你找到了新工作。寫信給你說法語的朋友宣布這個好消息，描述你的職位、同事和工作地點。",
   "theme": "travail",
   "ocr_fix": [
    {
     "from": "votre amie Francophone",
     "to": "votre amie francophone",
     "why": "francophone 在此是形容詞，法文形容詞不大寫；OCR 誤判首字母大寫"
    }
   ],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:67"
  },
  {
   "id": "W-T1-30",
   "fr": "Vous avez invité votre ami Cédric à votre mariage au Château de Chombony et il vous a répondu qu'il ne connait pas ce château. Décrivez à votre ami (lieu, localisation, transports, etc.).",
   "zh": "你邀請朋友 Cédric 參加你在 Chombony 城堡舉辦的婚禮，他回覆說他不認識這座城堡。向他描述（場地、位置、交通等）。",
   "theme": "famille",
   "ocr_fix": [],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:69, assets/tcf/pack3/_analyse/ecrit_T1_sujets.json:8"
  },
  {
   "id": "W-T1-31",
   "fr": "Vous répondez à votre amie Barbara. Vous décrivez le lieu (parc, jardin, terrasse, etc.)",
   "zh": "你回覆朋友 Barbara。描述那個地點（公園、花園、露台等）。",
   "theme": "loisirs",
   "ocr_fix": [],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:71, assets/tcf/pack3/_analyse/ecrit_T1_sujets.json:112"
  },
  {
   "id": "W-T1-32",
   "fr": "Vous avez un vélo à vendre. Vous écrivez un courriel pour décrire votre vélo et proposer un prix. Vous lui donnez un rendez-vous pour essayer le vélo. (60 mots minimum/120 mots maximum)",
   "zh": "你有一台腳踏車要賣。寫電子郵件描述這台腳踏車並開出價格，並約對方見面試騎（60字以上／120字以內）。",
   "theme": "argent",
   "ocr_fix": [],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:73, assets/tcf/_analyse/TCF_sujets_ecriture.txt:75, assets/tcf/pack3/_analyse/ecrit_T1_sujets.json:208"
  },
  {
   "id": "W-T1-33",
   "fr": "Vous avez commandé un objet sur Internet et après réception du colis, vous constatez que l'objet est cassé. Rédigez un e-mail au service clientèle pour signaler le problème, décrivez le dommage de l'objet et précisez ce que vous attendez comme solution. 60 mots minimum/120 mots maximum",
   "zh": "你在網路上訂了一件商品，收到包裹後發現東西壞了。寫電子郵件給客服說明問題、描述損壞情形，並指出你期待什麼樣的解決方式（60字以上／120字以內）。",
   "theme": "argent",
   "ocr_fix": [
    {
     "from": "hu mois minimum U mois maximum",
     "to": "60 mots minimum/120 mots maximum",
     "why": "亂碼字數標記，依 T1 規格（60–120 mots）還原"
    }
   ],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:77"
  },
  {
   "id": "W-T1-34",
   "fr": "Vous avez reçu un message d'un ami Alex qui vous demande des nouvelles de votre nouvelle université. Vous lui répondez en décrivant brièvement votre environnement universitaire. 60 mots minimum 120 mots maximum",
   "zh": "你收到朋友 Alex 的訊息，他問你新大學的近況。回信給他，簡短描述你的大學環境（60字以上／120字以內）。",
   "theme": "éducation",
   "ocr_fix": [
    {
     "from": "Vous lui répondre",
     "to": "Vous lui répondez",
     "why": "文法：主詞 vous 後須用變位動詞，不能用原形 répondre"
    }
   ],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:79"
  },
  {
   "id": "W-T1-35",
   "fr": "Vous voulez fêter votre anniversaire et les amis veulent vous apporter des cadeaux. Écrivez-leur un message pour leur dire le type de cadeaux que vous aimeriez recevoir.",
   "zh": "你想慶生，朋友們想送你禮物。寫訊息告訴他們你希望收到哪一類的禮物。",
   "theme": "fête",
   "ocr_fix": [
    {
     "from": "Chers amis, Je suis touché(e) par votre intention de me faire des cadeaux pour mon anniversaire…（其後約 50 字範文）",
     "to": "",
     "why": "原檔在題目後直接接了範文答案，非題目內容"
    }
   ],
   "src": "assets/tcf/pack3/_analyse/ecrit_T1_sujets.json:68"
  },
  {
   "id": "W-T1-36",
   "fr": "Vous terminez un séjour professionnel dans un pays étranger et vous souhaitez fêter votre départ. Vous écrivez un courriel à vos collègues pour les inviter au restaurant. Vous décrivez votre projet et donnez les informations nécessaires (adresse, date, heure, etc.)",
   "zh": "你在國外的工作派駐即將結束，想辦一場歡送會。寫電子郵件邀請同事們到餐廳，描述你的計畫並提供必要資訊（地址、日期、時間等）。",
   "theme": "fête",
   "ocr_fix": [
    {
     "from": "un couriel",
     "to": "un courriel",
     "why": "OCR 漏一個 r：courriel"
    },
    {
     "from": "pour les invités au restaurant",
     "to": "pour les inviter au restaurant",
     "why": "文法：pour 後須接原形動詞，invités（過去分詞）為辨識／拼寫錯誤"
    },
    {
     "from": "(adresse, date heure etc.)",
     "to": "(adresse, date, heure, etc.)",
     "why": "OCR 漏掉列舉項目之間的逗號"
    },
    {
     "from": "Chers collègues, Après un séjour enrichissant dans ce pays étranger…（其後約 60 字範文）",
     "to": "",
     "why": "原檔在題目後直接接了範文答案，非題目內容"
    }
   ],
   "src": "assets/tcf/pack3/_analyse/ecrit_T1_sujets.json:80, assets/tcf/pack3/_analyse/ecrit_T1_sujets.json:84"
  },
  {
   "id": "W-T1-37",
   "fr": "Vous allez déménager. Des amis ont accepté de vous aider. Vous leur écrivez un message collectif pour leur expliquer comment le déménagement va se passer (lieux, horaires, durée, trajet, tâches à faire, etc.)",
   "zh": "你要搬家，朋友們答應幫忙。寫一封群發訊息向他們說明搬家會怎麼進行（地點、時間、要花多久、路線、要做的工作等）。",
   "theme": "logement",
   "ocr_fix": [
    {
     "from": "Chers amis, Je voulais vous remercier du fond du c ur pour votre aide précieuse…（其後約 60 字範文）",
     "to": "",
     "why": "原檔在題目後直接接了範文答案，非題目內容"
    }
   ],
   "src": "assets/tcf/pack3/_analyse/ecrit_T1_sujets.json:92"
  },
  {
   "id": "W-T1-38",
   "fr": "Vous voulez partir en week-end avec vos amis le mois prochain. Vous leur écrivez un message pour décrire votre projet (lieu, transport, activités, etc.)",
   "zh": "你想下個月和朋友們去度週末。寫訊息向他們描述你的計畫（地點、交通、活動等）。",
   "theme": "voyage",
   "ocr_fix": [],
   "src": "assets/tcf/pack3/_analyse/ecrit_T1_sujets.json:120"
  },
  {
   "id": "W-T1-39",
   "fr": "Vous allez déménager à Nice, en France. Vous écrivez un message sur le site d’une agence immobilière. Vous donnez les informations nécessaires (superficie, budget, nombre de pièces, etc.).",
   "zh": "你要搬到法國尼斯。在一家房仲網站上留言，提供必要資訊（面積、預算、房間數等）。",
   "theme": "logement",
   "ocr_fix": [
    {
     "from": "etc).",
     "to": "etc.).",
     "why": "OCR 漏掉 etc. 的縮寫句點"
    }
   ],
   "src": "assets/tcf/pack3/_analyse/ecrit_T1_sujets.json:140"
  },
  {
   "id": "W-T1-40",
   "fr": "Vous voulez passer un week-end avec vos amis et faire du sport. Vous leur écrivez une lettre pour proposer ça en citant (date, lieu, programme.).",
   "zh": "你想和朋友們過一個做運動的週末。寫信提出這個建議，並列出（日期、地點、活動安排）。",
   "theme": "sport",
   "ocr_fix": [],
   "src": "assets/tcf/pack3/_analyse/ecrit_T1_sujets.json:160"
  },
  {
   "id": "W-T1-41",
   "fr": "Vous répondez à votre amie Camille. Dans votre message vous décrivez votre activité sportive et vous donnez des informations utiles (lieu, durée, prix, etc.).",
   "zh": "你回覆朋友 Camille。在訊息裡描述你做的運動，並提供有用的資訊（地點、時間長度、費用等）。",
   "theme": "sport",
   "ocr_fix": [],
   "src": "assets/tcf/pack3/_analyse/ecrit_T1_sujets.json:164"
  },
  {
   "id": "W-T1-42",
   "fr": "Vous êtes nouveaux dans une université. Décrivez à vos amis comment cela se passe avec (les profs, autres étudiants, les activités et autres)",
   "zh": "你是大學新生。向朋友們描述現在的情況（老師、其他學生、活動等等）。",
   "theme": "éducation",
   "ocr_fix": [
    {
     "from": "( les prof,autres étudiants, les activités et autres )",
     "to": "(les profs, autres étudiants, les activités et autres)",
     "why": "OCR：les 後的名詞漏掉複數 s、逗號後漏空格、括號內外多餘空格"
    }
   ],
   "src": "assets/tcf/pack3/_analyse/ecrit_T1_sujets.json:192",
   "note": "⚠️ 原文寫 nouveaux（複數），TCF 的 vous 通常是單數，但無法確認原題，依規則不改。"
  },
  {
   "id": "W-T1-43",
   "fr": "Vous avez fini le déménagement de votre entreprise. Écrivez à Lucas pour lui parler de vos nouveaux locaux (lieu, dimension, équipements…)",
   "zh": "你公司的搬遷完成了。寫信給 Lucas 談談新的辦公場地（地點、大小、設備……）。",
   "theme": "travail",
   "ocr_fix": [
    {
     "from": "Écrivez a Lucas",
     "to": "Écrivez à Lucas",
     "why": "漏掉重音符號：介系詞 à，不是動詞 a"
    },
    {
     "from": "( lieu, dimension, Équipements…)",
     "to": "(lieu, dimension, équipements…)",
     "why": "OCR：左括號後多餘空格、列舉項目誤判為大寫（同列其他項目皆小寫）"
    }
   ],
   "src": "assets/tcf/pack3/_analyse/ecrit_T1_sujets.json:196"
  },
  {
   "id": "W-T1-44",
   "fr": "Vous répondez à votre ami Ali. Dans votre message, vous décrivez votre nouveau travail (lieu, collègues, etc.) et vous donnez vos impressions.",
   "zh": "你回覆朋友 Ali。在訊息裡描述你的新工作（地點、同事等），並說出你的感想。",
   "theme": "travail",
   "ocr_fix": [],
   "src": "assets/tcf/pack3/_analyse/ecrit_T1_sujets.json:200"
  },
  {
   "id": "W-T1-45",
   "fr": "Vous avez effectué un travail temporaire en été. Vous écrivez un message à vos amis pour leur raconter ce que vous avez fait.",
   "zh": "你在夏天做了一份臨時工作。寫訊息給朋友們，敘述你做了些什麼。",
   "theme": "travail",
   "ocr_fix": [
    {
     "from": "effectuéun",
     "to": "effectué un",
     "why": "OCR 漏掉兩字之間的空格"
    }
   ],
   "src": "assets/tcf/pack3/_analyse/ecrit_T1_sujets.json:204"
  }
 ],
 "t2": [
  {
   "id": "W-T2-01",
   "fr": "Vous avez assisté à une soirée écologique pour protéger la planète qui avait lieu dans votre université. Racontez-la dans votre blog et racontez pourquoi vous l'avez aimée.",
   "zh": "你參加了在你大學舉辦的一場「保護地球」環保晚會。在部落格上敘述這場活動，並說明你為什麼喜歡它。",
   "theme": "écologie",
   "ocr_fix": [],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:85"
  },
  {
   "id": "W-T2-02",
   "fr": "Vous avez passé un cours en cuisine, vous allez décrire vos souvenirs dans un blog ou bien article en indiquant les détails.",
   "zh": "你上了一堂烹飪課。你要在部落格或文章中描述你的回憶，並寫出細節。",
   "theme": "alimentation",
   "ocr_fix": [],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:87"
  },
  {
   "id": "W-T2-03",
   "fr": "Vous avez quitté la ville afin de vous installer en campagne. Sur votre blog, vous expliquez pourquoi vous avez fait ce choix et vous présentez les avantages de votre nouvelle vie.",
   "zh": "你離開城市搬到鄉下。在部落格上說明你為什麼做這個選擇，並介紹新生活的好處。",
   "theme": "ville",
   "ocr_fix": [
    {
     "from": "en compagne",
     "to": "en campagne",
     "why": "OCR 辨識錯（a↔o）：s'installer en campagne（鄉下），compagne 是「女伴」不合文意"
    }
   ],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:89"
  },
  {
   "id": "W-T2-04",
   "fr": "Vous avez décidé de faire une activité sportive, décrire et encourager les autres à la pratique (Sur votre blog racontez que vous avez commencé un nouveau sport et vous voulez inciter les autres à s'y mettre)",
   "zh": "你決定開始一項運動。描述它並鼓勵其他人也去做（在部落格上敘述你開始了一項新運動，並想鼓動其他人一起投入）。",
   "theme": "sport",
   "ocr_fix": [
    {
     "from": "à s'y mettres e",
     "to": "à s'y mettre)",
     "why": "à 後須用原形 mettre（mettres 非法文形式）；句末孤立的 e 是右括號的辨識錯誤（前文有未閉合的左括號）"
    }
   ],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:91"
  },
  {
   "id": "W-T2-05",
   "fr": "Vous avez passé des vacances au Canada par le biais d'une agence de voyage. Écrivez un commentaire pour raconter votre expérience que vous avez vécue durant ce voyage. (120 mots minimum/150 mots maximum)",
   "zh": "你透過旅行社去加拿大度假。寫一則評論，敘述你在這趟旅程中的經歷（120字以上／150字以內）。",
   "theme": "voyage",
   "ocr_fix": [],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:93"
  },
  {
   "id": "W-T2-06",
   "fr": "Vous avez participé au nettoyage d'un site touristique au Canada (plage, montagne, forêt...) racontez votre expérience et donnez votre point de vue sur la protection de l'environnement",
   "zh": "你參加了加拿大某個觀光景點（海灘、山區、森林……）的清潔活動。敘述你的經驗，並說出你對環境保護的看法。",
   "theme": "écologie",
   "ocr_fix": [
    {
     "from": "(plage montagne, forêt ..)",
     "to": "(plage, montagne, forêt...)",
     "why": "OCR 漏掉列舉的第一個逗號；省略號少一點且前面多一個空格"
    }
   ],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:95"
  },
  {
   "id": "W-T2-07",
   "fr": "Vous êtes parti(e) en vacances avec une agence de tourisme. Vous écrivez un message sur son site Internet, dans la rubrique Commentaires, pour raconter votre séjour et ce que vous en avez pensé.",
   "zh": "你透過旅行社去度假。在該旅行社網站的「評論」區留言，敘述你的旅程以及你的感想。",
   "theme": "voyage",
   "ocr_fix": [],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:97"
  },
  {
   "id": "W-T2-08",
   "fr": "Vous écrivez un message sur son site Internet, dans la rubrique Commentaires, pour raconter votre séjour et ce que vous en avez pensé.",
   "zh": "你在該網站的「評論」區留言，敘述你的旅程以及你的感想。",
   "theme": "voyage",
   "ocr_fix": [],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:99"
  },
  {
   "id": "W-T2-09",
   "fr": "Vous avez reçu un message d'un(e) ami(e) qui a décidé de passer, en janvier, deux semaines de vacances dans votre pays avec son ami(e). Vous lui écrivez un email pour lui proposer des activités à faire dès son arrivée (sites touristiques, plats traditionnels à déguster..etc)",
   "zh": "你收到一位朋友的訊息，他決定一月和另一位朋友來你的國家度假兩週。寫電子郵件建議他一到就可以做的活動（觀光景點、要品嚐的傳統菜餚……等）。",
   "theme": "voyage",
   "ocr_fix": [
    {
     "from": "votre paysavec son ami(e)",
     "to": "votre pays avec son ami(e)",
     "why": "OCR 漏掉兩字之間的空格"
    }
   ],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:101"
  },
  {
   "id": "W-T2-10",
   "fr": "Vous avez accueilli un étudiant étranger chez vous pendant une semaine, écrivez sur votre blog pour raconter ce qui vous a intéressé et ce qui vous a le plus impressionné dans cette expérience.",
   "zh": "你家接待了一位外國學生一星期。在部落格上寫文章，敘述這次經驗中讓你感興趣的事、以及最讓你印象深刻的事。",
   "theme": "culture",
   "ocr_fix": [],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:103"
  },
  {
   "id": "W-T2-11",
   "fr": "Votre école de musique cherche un local pour organiser la fête de fin d'année. Vous envoyez un message dipection pour leur dire que vous avez trouvé un local idéal",
   "zh": "你的音樂學校在找場地辦年終晚會。你寄訊息（此處原檔 OCR 損毀，收件對象疑為「校方／管理處」）告訴他們你找到了理想的場地。",
   "theme": "culture",
   "ocr_fix": [
    {
     "from": "un messe dipection",
     "to": "un message dipection",
     "why": "OCR：un messe（陽性冠詞配陰性名詞）不成句，應為 message；後面的 dipection 仍是損毀字串，依規定不擅自補完"
    }
   ],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:105",
   "note": "⚠️ 原文有一處 OCR 漏字（messe dipection…，疑為 à la direction），依規則不補字。⭐ 讀不通不是你的問題。"
  },
  {
   "id": "W-T2-12",
   "fr": "Vous allez participer à un concours du meilleur article rédigé. Dans un blog, décrivez un anniversaire ou une fête traditionnelle à laquelle vous avez participé",
   "zh": "你要參加最佳文章比賽。在部落格上描述你參加過的一場生日會或一個傳統節慶。",
   "theme": "fête",
   "ocr_fix": [],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:107"
  },
  {
   "id": "W-T2-13",
   "fr": "Vous avez assisté à une fête qui vous a profondément marquée. Sur votre blog, racontez cet évènement et dites pourquoi vous l'avez aimé.",
   "zh": "你參加了一場讓你深受觸動的慶典。在部落格上敘述這場活動，並說明你為什麼喜歡它。",
   "theme": "fête",
   "ocr_fix": [
    {
     "from": "profondément marque",
     "to": "profondément marquée",
     "why": "漏重音＋過去分詞配合：先行詞 fête（陰性）是前置直接受詞，助動詞 avoir 時須配合"
    }
   ],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:109"
  },
  {
   "id": "W-T2-14",
   "fr": "Vous avez assisté à une fête de voisins du quartier, écrivez un blog pour montrer pourquoi vous avez aimé cette fête.",
   "zh": "你參加了社區的鄰居聚會。寫一篇部落格文章說明你為什麼喜歡這場聚會。",
   "theme": "fête",
   "ocr_fix": [],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:111"
  },
  {
   "id": "W-T2-15",
   "fr": "Vous avez assisté à une fête traditionnelle dans votre pays où à l'étranger. Racontez-la dans votre blog et dites pourquoi vous l'avez aimée. 120 mots minimum/150 mots maximum",
   "zh": "你參加了在你的國家或國外的一場傳統節慶。在部落格上敘述它，並說明你為什麼喜歡它（120字以上／150字以內）。",
   "theme": "fête",
   "ocr_fix": [
    {
     "from": "Racontez la",
     "to": "Racontez-la",
     "why": "命令式後接受詞代名詞須用連字號，OCR 漏掉"
    },
    {
     "from": "zo mots minimum su mots maximum",
     "to": "120 mots minimum/150 mots maximum",
     "why": "亂碼字數標記，依 T2 規格（120–150 mots）還原"
    }
   ],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:113"
  },
  {
   "id": "W-T2-16",
   "fr": "Vous avez assisté à un festival qui vous a déplu. Dans un blog racontez à vos amis cette expérience.",
   "zh": "你參加了一場你不喜歡的音樂節／慶典。在部落格上向朋友敘述這次經驗。",
   "theme": "culture",
   "ocr_fix": [
    {
     "from": " TOT",
     "to": "",
     "why": "題目正文外的殘留字串（掃描雜訊），非題目內容"
    }
   ],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:115"
  },
  {
   "id": "W-T2-17",
   "fr": "Vous venez d'assister au concert de votre artiste préféré. Vous écrivez un article sur votre blog personnel, pour partager cette expérience et inciter vos amis et les autres à assister à son prochain concert.",
   "zh": "你剛看完你最喜歡的歌手／藝人的演唱會。在個人部落格寫一篇文章分享這次經驗，並鼓動朋友和其他人去看他的下一場演唱會。",
   "theme": "culture",
   "ocr_fix": [],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:117"
  },
  {
   "id": "W-T2-18",
   "fr": "Vous écrivez un article sur votre blog personnel, pour partager cette expérience et inciter vos amis et les autres à assister à son prochain concert.",
   "zh": "你在個人部落格寫一篇文章分享這次經驗，並鼓動朋友和其他人去看他的下一場演唱會。",
   "theme": "culture",
   "ocr_fix": [],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:119"
  },
  {
   "id": "W-T2-19",
   "fr": "Vous participez à un jeu-concours pour gagner un billet pour deux personnes dans une des villes de votre choix: décrivez dans un blog la vie de votre artiste préféré.",
   "zh": "你參加抽獎比賽，可以贏得兩人前往你所選城市的機票。在部落格上描述你最喜歡的藝人的生平。",
   "theme": "culture",
   "ocr_fix": [
    {
     "from": " Vous aimez une personne célèbre ou non par ses actions. Écrivez dans votre blog personnel en précisant l'action que cette personne a faite et dites pourquoi vous l'adorez.",
     "to": "",
     "why": "這兩句與第 20 題（原檔第 123 行）完全相同，是 OCR 串行把隔壁題目的文字混進本題"
    }
   ],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:121"
  },
  {
   "id": "W-T2-20",
   "fr": "Vous aimez une personne célèbre ou non par ses actions. Écrivez dans votre blog personnel en précisant l'action que cette personne a faite et dites pourquoi vous l'adorez.",
   "zh": "你因為某個人（名人或非名人）做過的事而欣賞他。在個人部落格上寫下這個人做了什麼，並說明你為什麼崇拜他。",
   "theme": "culture",
   "ocr_fix": [],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:123"
  },
  {
   "id": "W-T2-21",
   "fr": "Vous avez visité une exposition de votre artiste préféré. Rédigez un article exprimant votre expérience lors de la visite. Décrivez ce que vous avez vu et vos impressions.",
   "zh": "你參觀了你最喜歡的藝術家的展覽。寫一篇文章表達你參觀時的經驗，描述你看到了什麼以及你的感受。",
   "theme": "culture",
   "ocr_fix": [
    {
     "from": " L'exposition de Oscar-Claude Monet, mon artiste préféré, a été une expérience inoubliable qui a surpassé toutes mes attentes. Dès l'entrée, j'étais enveloppé par",
     "to": "",
     "why": "原檔在題目後接了範文答案（且斷在句中），非題目內容"
    }
   ],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:125"
  },
  {
   "id": "W-T2-22",
   "fr": "Vous avez participé à cet événement. Vous écrivez à vos amis pour raconter votre expérience et vous donnez votre opinion sur cette journée.",
   "zh": "你參加了這場活動。寫信給朋友敘述你的經驗，並說出你對這一天的看法。",
   "theme": "fête",
   "ocr_fix": [
    {
     "from": " « école De Musique !",
     "to": "",
     "why": "題目附圖／海報上的標題文字被 OCR 混進正文，非題目內容"
    }
   ],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:127"
  },
  {
   "id": "W-T2-23",
   "fr": "Vous envoyez un courriel à vos amis pour leur raconter comment vous avez passé votre première semaine de votre nouveau boulot.",
   "zh": "寫電子郵件給朋友們，敘述你新工作的第一週是怎麼過的。",
   "theme": "travail",
   "ocr_fix": [],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:129"
  },
  {
   "id": "W-T2-24",
   "fr": "Vous avez participé à un concours de cuisine. Sur votre blog, vous écrivez un court article pour raconter cette journée. Vous expliquez pourquoi vous avez aimé ou pourquoi vous n'avez pas aimé cette expérience.",
   "zh": "你參加了一場廚藝比賽。在部落格上寫一篇短文敘述這一天，並說明你喜歡或不喜歡這次經驗的原因。",
   "theme": "alimentation",
   "ocr_fix": [],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:131"
  },
  {
   "id": "W-T2-25",
   "fr": "Vous avez participé à une émission télévisée. Racontez cette expérience sur votre blog.",
   "zh": "你參加了一個電視節目。在部落格上敘述這次經驗。",
   "theme": "culture",
   "ocr_fix": [],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:133"
  },
  {
   "id": "W-T2-26",
   "fr": "Vous avez participé à un événement dans votre quartier sous le thème « une semaine sans voiture ». Sur votre blog, écrivez un article pour raconter cette expérience.",
   "zh": "你參加了社區裡以「一週不開車」為主題的活動。在部落格上寫一篇文章敘述這次經驗。",
   "theme": "écologie",
   "ocr_fix": [
    {
     "from": "sans voiture \"",
     "to": "sans voiture »",
     "why": "法文引號成對：開頭是 «，結尾應為 »，OCR 誤判成英文雙引號"
    },
    {
     "from": "cette ex- périence",
     "to": "cette expérience",
     "why": "OCR 把原文換行斷字的連字號留在字中"
    }
   ],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:135"
  },
  {
   "id": "W-T2-27",
   "fr": "Vous travaillez dans une association qui aide les personnes âgées. Rédigez un article de blog pour raconter vos expériences et convaincre d'autres personnes de rejoindre l'association. 120 mots minimum/150 mots maximum",
   "zh": "你在一個幫助年長者的協會工作。寫一篇部落格文章敘述你的經驗，並說服其他人加入這個協會（120字以上／150字以內）。",
   "theme": "bénévolat",
   "ocr_fix": [
    {
     "from": "qui aidents les personnes âgées",
     "to": "qui aide les personnes âgées",
     "why": "aidents 非法文形式；先行詞 association 為單數，動詞應為 aide"
    },
    {
     "from": "Rédigez un un article",
     "to": "Rédigez un article",
     "why": "OCR 重複了冠詞 un"
    },
    {
     "from": "20 mots minimum/su mots maximumi",
     "to": "120 mots minimum/150 mots maximum",
     "why": "亂碼字數標記，依 T2 規格（120–150 mots）還原"
    }
   ],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:137"
  },
  {
   "id": "W-T2-28",
   "fr": "Vous faites partie d'une association de quartier qui propose des activités aux enfants (aide aux devoirs, sorties, jeux, etc.) Sur votre site internet, vous racontez votre expérience et vous expliquez pourquoi ce type d'association est utile.",
   "zh": "你參加了一個社區協會，為孩子們提供活動（作業輔導、外出、遊戲等）。在協會網站上敘述你的經驗，並說明這類協會為什麼有用。",
   "theme": "bénévolat",
   "ocr_fix": [],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:139"
  },
  {
   "id": "W-T2-29",
   "fr": "Vous avez participé à une brocante (achat/vente de produits d'occasion) dans votre ville. Sur votre blog personnel, racontez pourquoi vous avez aimé cette activité.",
   "zh": "你參加了你所在城市的一場二手市集（買賣二手商品）。在個人部落格上敘述你為什麼喜歡這個活動。",
   "theme": "argent",
   "ocr_fix": [],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:141"
  },
  {
   "id": "W-T2-30",
   "fr": "Vous avez passé une soirée dans un restaurant dans votre ville. Décrivez ce que vous avez aimé le plus.",
   "zh": "你在你城市的一家餐廳度過一個晚上。描述你最喜歡的部分。",
   "theme": "alimentation",
   "ocr_fix": [],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:143"
  },
  {
   "id": "W-T2-31",
   "fr": "Vous avez participé à la semaine du goût dans votre ville. Racontez ce que vous avez aimé le plus.",
   "zh": "你參加了你城市的「美食週」。敘述你最喜歡的部分。",
   "theme": "alimentation",
   "ocr_fix": [],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:145"
  },
  {
   "id": "W-T2-32",
   "fr": "Vous êtes parti(e) travailler à l'étranger. Vous envoyez un message à vos amis pour raconter cette nouvelle expérience professionnelle. Vous expliquez ce que vous avez le plus aimé.",
   "zh": "你到國外工作。寫訊息給朋友們敘述這次新的職場經驗，並說明你最喜歡的部分。",
   "theme": "travail",
   "ocr_fix": [
    {
     "from": " écrivez un message à vos amis pour leur parler de votre expérience professionnelle à l'étranger",
     "to": "",
     "why": "這段與第 33 題（原檔第 149 行）相同，是 OCR 串行把隔壁題目的文字混進本題"
    }
   ],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:147"
  },
  {
   "id": "W-T2-33",
   "fr": "Vous expliquez ce que vous avez le plus aimé. Écrivez un message à vos amis pour leur parler de votre expérience professionnelle à l'étranger (120 mots minimum/150 mots maximum)",
   "zh": "說明你最喜歡的部分。寫訊息給朋友們，談談你在國外的工作經驗（120字以上／150字以內）。",
   "theme": "travail",
   "ocr_fix": [
    {
     "from": "aimé. écrivez",
     "to": "aimé. Écrivez",
     "why": "句首字母須大寫，OCR 誤判"
    },
    {
     "from": "(zo mots minimum/iso mots maximum)",
     "to": "(120 mots minimum/150 mots maximum)",
     "why": "亂碼字數標記，依 T2 規格（120–150 mots）還原"
    }
   ],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:149"
  },
  {
   "id": "W-T2-34",
   "fr": "Vous avez lu ce message sur un site internet : Je suis étudiante et je vais partir étudier un an à l'étranger. Mais, j'ai un peu peur. Qui a déjà fait cela ? Justine.",
   "zh": "你在某網站上看到這則訊息：「我是學生，我要出國唸一年書，但我有點害怕。有誰做過這件事嗎？Justine」。",
   "theme": "éducation",
   "ocr_fix": [],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:151"
  },
  {
   "id": "W-T2-35",
   "fr": "Vous avez participé à un échange scolaire dans une école à l'étranger. Racontez à vos amis ce que vous avez aimé (120 mots minimum/150 mots maximum)",
   "zh": "你參加了到國外學校的交換活動。向朋友們敘述你喜歡的地方（120字以上／150字以內）。",
   "theme": "éducation",
   "ocr_fix": [],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:153"
  },
  {
   "id": "W-T2-36",
   "fr": "Vous avez fait des études pendant 6 mois à l'étranger. Dans un forum, rédigez un article à vos amis pour leur raconter cette expérience.",
   "zh": "你在國外唸了六個月書。在論壇上寫一篇文章給朋友們，敘述這次經驗。",
   "theme": "éducation",
   "ocr_fix": [],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:155"
  },
  {
   "id": "W-T2-37",
   "fr": "Vous venez de commencer les cours à l'université à Montréal, écrivez un message à votre ami pour lui raconter votre première semaine à l'université.",
   "zh": "你剛在蒙特婁的大學開學。寫訊息給朋友，敘述你在大學的第一週。",
   "theme": "éducation",
   "ocr_fix": [
    {
     "from": " Chère Estelle, Je voulais te donner des nouvelles de ma première semaine à l'université à Montréal !",
     "to": "",
     "why": "原檔在題目後接了範文答案的開頭，非題目內容"
    }
   ],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:157"
  },
  {
   "id": "W-T2-38",
   "fr": "Vous êtes allés voir un spectacle (film, pièce de théâtre, concert, etc.) avec des amis. Vous l'avez aimé. Sur votre blog, vous racontez votre soirée et vous expliquez pourquoi vous avez aimé le spectacle. (120 mots minimum/150 mots maximum)",
   "zh": "你和朋友們去看了一場表演（電影、話劇、演唱會等），而且很喜歡。在部落格上敘述那個晚上，並說明你為什麼喜歡這場表演（120字以上／150字以內）。",
   "theme": "culture",
   "ocr_fix": [],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:159"
  },
  {
   "id": "W-T2-39",
   "fr": "Votre école vous a chargé d'organiser une journée spéciale pour accueillir les nouveaux étudiants francophones. Vous rédigez un courriel destiné à ces étudiants dans lequel vous donnez tous les détails pour le bon déroulement de cette journée.",
   "zh": "學校交給你籌辦一個迎接法語系新生的特別日。寫一封電子郵件給這些學生，提供這一天順利進行所需的所有細節。",
   "theme": "éducation",
   "ocr_fix": [],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:161"
  },
  {
   "id": "W-T2-40",
   "fr": "Vous avez lu sur un forum un débat concernant les formations en ligne. Écrivez un message en décrivant votre expérience (cours de langue, formation professionnelle, etc.). Donnez votre avis sur ce que vous avez aimé et ce que vous n'en avez pas",
   "zh": "你在論壇上看到一場關於線上課程的討論。寫一則訊息描述你的經驗（語言課、職業訓練等），並說出你喜歡什麼、不喜歡什麼（原文句尾在此處斷掉）。",
   "theme": "éducation",
   "ocr_fix": [],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:163"
  },
  {
   "id": "W-T2-41",
   "fr": "Dans votre blog, racontez votre expérience de l'apprentissage d'une langue étrangère (vous écrivez sur un forum internet en racontant votre expérience en apprenant une langue étrangère).",
   "zh": "在部落格上敘述你學一門外語的經驗（你在網路論壇上敘述自己學外語的經歷）。",
   "theme": "éducation",
   "ocr_fix": [
    {
     "from": "blog, Racontez",
     "to": "blog, racontez",
     "why": "逗號後為同一句，動詞不應大寫，OCR 誤判"
    }
   ],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:165"
  },
  {
   "id": "W-T2-42",
   "fr": "Vous avez décidé de ne plus utiliser les réseaux sociaux (twitter Instagram Facebook et autres). Écrivez un message à vos amis en citant les raisons derrière cette décision.",
   "zh": "你決定不再使用社群網站（Twitter、Instagram、Facebook 等等）。寫訊息給朋友們，列出你做這個決定的理由。",
   "theme": "technologie",
   "ocr_fix": [],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:167"
  },
  {
   "id": "W-T2-43",
   "fr": "Vous avez lu cette annonce Vous écrivez un article pour les lecteurs du site www.manger-international.com Vous expliquez comment mangent les habitants de votre pays et vous indiquez quelles habitudes vous plaisent ou vous déplaisent, et pourquoi",
   "zh": "你看到這則啟事。為 www.manger-international.com 網站的讀者寫一篇文章，說明你們國家的人怎麼吃，並指出哪些飲食習慣你喜歡、哪些你不喜歡，以及原因。",
   "theme": "alimentation",
   "ocr_fix": [
    {
     "from": "www.manger- international.com",
     "to": "www.manger-international.com",
     "why": "OCR 因原文換行，在網址的連字號後多插了一個空格"
    }
   ],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:169"
  },
  {
   "id": "W-T2-44",
   "fr": "Vous avez participé à une compétition sportive, écrivez un article (blog, magazines, etc.) (lieux, date, organisation). (120 mots minimum/150 mots maximum)",
   "zh": "你參加了一場運動比賽。寫一篇文章（部落格、雜誌等），內容包含地點、日期、賽事安排（120字以上／150字以內）。",
   "theme": "sport",
   "ocr_fix": [
    {
     "from": "(blog, magazines, etc)",
     "to": "(blog, magazines, etc.)",
     "why": "OCR 漏掉 etc. 的縮寫句點"
    },
    {
     "from": "(120 mots minimum/150 mots maximum",
     "to": "(120 mots minimum/150 mots maximum)",
     "why": "字數標記的右括號被 OCR 吃掉"
    }
   ],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:171"
  },
  {
   "id": "W-T2-45",
   "fr": "Vous avez participé à un cours de sport dans une salle. Écrivez un article de blog parlant de cette expérience et en exprimant également votre avis par rapport à cette salle. (120 mots minimum/150 mots maximum)",
   "zh": "你在健身房上了一堂運動課。寫一篇部落格文章談這次經驗，同時表達你對這家健身房的看法（120字以上／150字以內）。",
   "theme": "sport",
   "ocr_fix": [
    {
     "from": "(I20 mots minımum/i50 mots maximum)",
     "to": "(120 mots minimum/150 mots maximum)",
     "why": "亂碼字數標記（I→1、ı→i、i50→150），依 T2 規格還原"
    }
   ],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:173"
  },
  {
   "id": "W-T2-46",
   "fr": "Vous avez visité une ville que vous ne connaissiez pas. Vous avez envie de partager votre découverte. Vous postez un message sur un site Internet dédié aux voyages. Racontez votre expérience et expliquez ce qui vous a plu et ce qui vous a déplu dans la ville. (120 mots minimum/150 mots maximum)",
   "zh": "你參觀了一座你原本不認識的城市，想分享這個發現。在一個旅遊網站上發文，敘述你的經驗，並說明這座城市裡你喜歡什麼、不喜歡什麼（120字以上／150字以內）。",
   "theme": "voyage",
   "ocr_fix": [
    {
     "from": "(120 mots minimum/150 mots maximum",
     "to": "(120 mots minimum/150 mots maximum)",
     "why": "字數標記的右括號被 OCR 吃掉"
    }
   ],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:175"
  },
  {
   "id": "W-T2-47",
   "fr": "Vous postez un message sur un site Internet dédié aux voyages. Racontez votre expérience et expliquez ce qui vous a plu et ce qui vous a déplu dans la ville. (120 mots minimum/150 mots maximum)",
   "zh": "你在一個旅遊網站上發文，敘述你的經驗，並說明這座城市裡你喜歡什麼、不喜歡什麼（120字以上／150字以內）。",
   "theme": "voyage",
   "ocr_fix": [
    {
     "from": "(120 mots minimum/150 mots maximum",
     "to": "(120 mots minimum/150 mots maximum)",
     "why": "字數標記的右括號被 OCR 吃掉"
    }
   ],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:177"
  },
  {
   "id": "W-T2-48",
   "fr": "Vous avez passé une journée à la campagne avec vos amis. À votre retour, vous écrivez un message sur votre forum pour raconter à vos amis comment cette journée s'est passée. Vous expliquez ce que vous avez aimé (activités, lieu, animaux, etc...). (120 mots minimum/150 mots maximum)",
   "zh": "你和朋友們在鄉下度過一天。回來後你在論壇上寫訊息，向朋友敘述這一天是怎麼過的，並說明你喜歡什麼（活動、地點、動物等等）（120字以上／150字以內）。",
   "theme": "loisirs",
   "ocr_fix": [],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:179"
  }
 ],
 "t3": [
  {
   "id": "W-T3-01",
   "theme": "jeux vidéo",
   "doc1": "Les enfants, jusqu'à l'âge de l'adolescence, jouent d'une manière régulière aux jeux vidéo et à force, ils peuvent développer des pensées négatives et des comportements agressifs. En effet, une étude récente, menée sur des enfants âgés de 9 à 18 ans jouant fréquemment aux jeux vidéo, a révélé que le fait de jouer à des jeux de violence augmente considérablement un comportement agressif. Et selon Diego Gentil, ce phénomène est inévitable quel que soit le degré de vigilance des parents!",
   "doc2": "On parle tout le temps des effets négatifs des jeux vidéo, mais ces derniers peuvent également avoir quelques avantages pour le fonctionnement du cerveau et pour la santé d'une manière générale. Si on prend, par exemple, leur apport pour le cerveau, les jeux vidéo permettent d'améliorer plusieurs fonctions cognitives telles que l'amélioration de la concentration, de la réaction et de la capacité d'analyse. Ceci peut paraître évident, dans la mesure où lorsqu'on y joue, on doit toujours trouver des solutions à des situations plus ou moins complexes (surtout pour les jeux de stratégie). Même les",
   "intro": null,
   "doc1_pos": "反對電玩：引研究指出 9–18 歲常玩暴力遊戲的孩子攻擊行為明顯增加，且家長再怎麼盯也擋不住",
   "doc2_pos": "替電玩辯護：玩遊戲能改善專注力、反應與分析能力，策略型遊戲更是不斷在逼人解題",
   "zh": "電玩對孩子是害還是益？",
   "tronque": [
    "doc2"
   ],
   "ocr_fix": [
    {
     "doc": "doc1",
     "from": "des pensée négatives",
     "to": "des pensées négatives",
     "why": "accord：des + 名詞須複數，OCR 漏掉 s"
    },
    {
     "doc": "doc1",
     "from": "quelque soit",
     "to": "quel que soit",
     "why": "正確拼法為 quel que soit（que 引導讓步），quelque soit 是常見誤拼"
    },
    {
     "doc": "doc2",
     "from": "capacité d'analysé",
     "to": "capacité d'analyse",
     "why": "名詞 analyse 被誤辨識為過去分詞 analysé"
    },
    {
     "doc": "doc2",
     "from": "plus au moins complexe",
     "to": "plus ou moins complexes",
     "why": "固定副詞片語是 plus ou moins（au 為辨識錯）；形容詞須與 situations 複數配合"
    }
   ],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:186"
  },
  {
   "id": "W-T3-02",
   "theme": "éducation",
   "doc1": "Le port de l'uniforme développe un sentiment d'appartenance à son établissement, et à la communauté des élèves. Il nourrit chez le jeune le sens du collectif et engendre souvent la fierté d'appartenir à son établissement. De plus, il réduit la discrimination basée sur le style ou sur la classe sociale de l'élève. En effet, l'uniforme permet aux parents d'économiser beaucoup d'argent, ce ne sont pas tous les parents griffés ou de marques populaires. La mise en place d'un code vestimentaire réduit donc les différences entre les classes sociales.",
   "doc2": "Le port de l'uniforme étouffe et écrase la personnalité des garçons. Ils ne peuvent pas s'habiller comme ils le veulent, en aucune circonstance. De l'autre côté de l'échelle (chez les pros) il y a des gens qui préfèreraient, pour eux-mêmes et leurs enfants, avoir la possibilité de s'exprimer à travers l'habillement, en décidant eux-mêmes ce qu'ils porteront chaque jour. Ainsi, avec un uniforme, les jeunes qui aiment s'exprimer à travers",
   "intro": null,
   "doc1_pos": "支持制服：培養對學校的歸屬感與集體意識，還能淡化穿著造成的階級差異、替家長省錢",
   "doc2_pos": "反對制服：壓抑個人特質，剝奪年輕人每天自己決定穿什麼、用衣著表達自我的權利",
   "zh": "學生該不該穿制服？",
   "tronque": [
    "doc2"
   ],
   "ocr_fix": [
    {
     "doc": "doc2",
     "from": "reussir-tcfcanada.com ",
     "to": "",
     "why": "網站浮水印混進正文"
    },
    {
     "doc": "doc2",
     "from": "l'habillement, en décidant eux-mêmes ce qu'ils porteront chaque jour. Ainsi, avec un uniforme, les jeunes qui aiment s'exprimer à travers l'habillement, en décidant eux-mêmes ce qu'ils porteront chaque jour. Ainsi, avec un uniforme, les jeunes qui aiment s'exprimer à travers",
     "to": "l'habillement, en décidant eux-mêmes ce qu'ils porteront chaque jour. Ainsi, avec un uniforme, les jeunes qui aiment s'exprimer à travers",
     "why": "OCR 掃描重疊：同一段文字完整重複了兩次，刪掉重複的那一次"
    }
   ],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:191",
   "note": "⚠️ DOCUMENT 1 有一處 OCR 漏字（ce ne sont pas tous les parents griffés…），依規則不補字。⭐ 讀不通不是你的問題。"
  },
  {
   "id": "W-T3-03",
   "theme": "technologie",
   "doc1": "Les objets intelligents rendent notre quotidien plus pratique. Ce sont des appareils qui peuvent être contrôlés à distance par un téléphone ou Internet, comme le chauffage ou les systèmes de sécurité de la maison. Par ailleurs, des objets tels que les montres ou bracelets connectés suivent nos activités et nous motivent à faire plus d'exercice, en mesurant par exemple nos pas. Leur utilité est particulièrement notable dans le domaine de la santé. Certains objets agissent comme un assistant santé, nous rappelant les rendez-vous médicaux ou la prise de nos médicaments.",
   "doc2": "On estime qu'il y aurait 50 milliards d'objets intelligents dans le monde, tels que des alarmes, des téléviseurs, des caméras de surveillance, des volets ou des détecteurs de fumée, entre autres. Avec cette expansion, la question de la sécurité devient cruciale. En effet, un hacker pourrait prendre le contrôle de ces appareils en quelques minutes. Par exemple, un cambrioleur pourrait, grâce aux caméras de surveillance connectées, vérifier si les habitants sont absents avant de commettre un cambriolage. Il est même possible d'accéder au système connecté d'une voiture et de la contrôler à dist",
   "intro": null,
   "doc1_pos": "挺智慧物聯：可遠端控制暖氣與保全、手環記錄運動量，在健康提醒（回診、吃藥）上尤其實用",
   "doc2_pos": "警告資安風險：全球約 500 億台設備，駭客幾分鐘就能接管，小偷可透過連網監視器確認家中沒人",
   "zh": "智慧聯網物品是便利還是資安風險？",
   "tronque": [
    "doc2"
   ],
   "ocr_fix": [],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:196"
  },
  {
   "id": "W-T3-04",
   "theme": "alimentation",
   "doc1": "Aïcha, une jeune célibataire de 28 ans, préfère dîner à l'extérieur plutôt que de manger seule à la maison. Elle apprécie la possibilité de sortir à tout moment à Lyon et de partager des repas conviviaux avec ses amis, ce qui est impossible dans son petit appartement. Elle note aussi que peu de gens de sa génération prennent le temps de cuisiner.",
   "doc2": "Laura, une mère de famille de 45 ans, explique que manger au restaurant est souvent trop coûteux pour elle. Bien qu'elle aimerait parfois éviter la cuisine, le budget familial l'empêche. Elle critique également la qualité des plats au restaurant et préfère savoir exactement ce qu'elle mange en préparant les repas chez elle.",
   "intro": "De nos jours, le choix entre manger à l'extérieur ou chez soi fait l'objet d'un débat passionné au sein de notre société. Certains trouvent que dîner au restaurant permet de partager des moments conviviaux et d'échapper à la solitude, tandis que d'autres expriment des rét",
   "doc1_pos": "28 歲單身的 Aïcha 挺外食：小公寓裡一個人吃飯太孤單，出去吃能隨時和朋友聚餐，同輩也少有人下廚",
   "doc2_pos": "45 歲媽媽 Laura 挺在家煮：上餐廳對家庭預算太貴，外面菜色品質也可疑，自己煮才清楚吃進什麼",
   "zh": "在外用餐 vs 在家開伙",
   "tronque": [
    "intro"
   ],
   "ocr_fix": [],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:201"
  },
  {
   "id": "W-T3-05",
   "theme": "technologie",
   "doc1": "Les enfants de l'école primaire peuvent utiliser la technologie pour trouver des vidéos sur les sujets qu'ils ont étudiés à l'école ou pour jouer à des jeux qui améliorent leur aisance en mathématiques, leur compréhension de la lecture ou leurs compétences en dactylographie.",
   "doc2": "Les nouvelles technologies encouragent les enfants à être sédentaires. C'est une préoccupation majeure pour les parents. Cela ne mène à aucun jeu libre créatif, à aucune interaction sociale face à face, conduisant à aucun effort physique! Pourquoi ne pas essayer certaines de ces activités amusantes pour encourager vos enfants à ranger leurs appareils ?",
   "intro": "Le sujet de l'utilisation des nouvelles technologies par les enfants est au cœur d'un débat passionné dans notre société. Les partisans de cette pratique soutiennent qu'elle favorise le développement scolaire des enfants, alors que les opposan",
   "doc1_pos": "支持：孩子能找課堂主題的影片，也能玩提升數學、閱讀理解與打字能力的遊戲",
   "doc2_pos": "反對：3C 讓孩子久坐，沒有自由創造的遊戲、沒有面對面互動、也沒有任何身體活動",
   "zh": "小學生該不該用 3C 學習？",
   "tronque": [
    "intro"
   ],
   "ocr_fix": [],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:206"
  },
  {
   "id": "W-T3-06",
   "theme": "art",
   "doc1": "Le graffiti est un art à part entière qu'il faut faire connaître et démocratiser parce qu'il y a beaucoup de préjugés.",
   "doc2": "On ne peut pas tout se permettre. Mettre de la peinture sans autorisation, c'est illégal. Ça vous plairait, qu'on repeigne votre maison ! Alice benjamin. Les gens qui n'ont jamais tenu une bombe ou un marqueur ne pourront jamais savoir....",
   "intro": "Le sujet de l'art dans les rues est au cœur d'un débat passionné dans notre société. Les partisans de cette pratique soutiennent que le graffiti est une forme d'expression artistique qui mérite d'être reconnue et exposée, alors que les opposants expriment leur réticence en affirmant que cette forme d'art est souvent illégale et peut endommager les propriét",
   "doc1_pos": "挺塗鴉：它是完整的一門藝術，該被推廣與認識，因為外界對它的偏見太多",
   "doc2_pos": "反對：未經同意就噴漆是違法的——換成自己家被重新粉刷就不會覺得高興",
   "zh": "街頭塗鴉是藝術還是破壞？",
   "tronque": [
    "intro"
   ],
   "ocr_fix": [],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:211"
  },
  {
   "id": "W-T3-07",
   "theme": "alimentation",
   "doc1": "Jean qui vit à la campagne favorise l'achat des produits alimentaires directement à la ferme pour la bonne qualité quitte à payer un peu plus cher.",
   "doc2": "Camille qui vit dans la ville préfère faire ses courses au supermarché pour la variété qu'il propose et pour les prix abordables.",
   "intro": "Le choix entre faire ses courses chez les producteurs locaux ou dans des supermarchés plus grands fait l'objet d'un débat animé dans notre société contemporaine. Certains avancent que les producteurs de proximité proposent des produits de meilleure qualité, tandis que d'autres privilégient les supermarchés en raison de leurs prix attractifs et de leur vaste sélection de produits. Dans ce débat, il est essentiel de rappeler qu'en achetant des produits locaux, les c",
   "doc1_pos": "住鄉下的 Jean 挺產地直購：為了好品質，貴一點也願意付",
   "doc2_pos": "住城市的 Camille 挺超市：選擇多樣、價格親民",
   "zh": "向產地小農買 vs 上超市買",
   "tronque": [
    "intro"
   ],
   "ocr_fix": [
    {
     "doc": "doc1",
     "from": "vit à la compagne",
     "to": "vit à la campagne",
     "why": "campagne（鄉下）被誤辨識為 compagne（女伴），與 Jean 的對照組（住城市）語意才通"
    }
   ],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:216"
  },
  {
   "id": "W-T3-08",
   "theme": "animaux",
   "doc1": "\"Je suis de ceux qui n'arrivent pas à comprendre comment l'on peut prendre du plaisir à tuer des animaux. Je suis de ceux qui n'arrivent pas à comprendre comment on peut prétendre aimer la nature alors qu'on la détruit\" scala zeans",
   "doc2": "\"Les gens chassent pour différentes raisons : la subsistance, le commerce, la conservation et l'aménagement de la faune, la protection de la propriété, l'exercice, le loisir et le prestige.\" David. Journaliste de la Frm",
   "intro": "La justifiabilité de la chasse d'animaux fait l'objet d'un débat passionné au sein de notre société contemporaine. Les partisans de cette activité avancent diverses raisons pour justifier la chasse, tandis que les opposants considèrent cette pratique comme une cruauté envers les animaux. Dans ce débat, il est essentiel de rappeler que les populations d'animaux sauvages peuven",
   "doc1_pos": "反對打獵：無法理解怎麼能以殺害動物為樂，也無法接受一邊說愛自然一邊摧毀它",
   "doc2_pos": "為打獵辯護：狩獵背後有多種理由——生計、商業、野生動物保育與族群管理、護產、運動、休閒與名聲",
   "zh": "打獵正當嗎？",
   "tronque": [
    "intro"
   ],
   "ocr_fix": [
    {
     "doc": "doc2",
     "from": "la conversation et l'aménagement de la faune",
     "to": "la conservation et l'aménagement de la faune",
     "why": "conservation de la faune 是固定搭配；conversation 與 faune 語意不通，屬辨識錯"
    }
   ],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:221"
  },
  {
   "id": "W-T3-09",
   "theme": "lecture",
   "doc1": "Avec l'avancée technologique et les produits high-tech qui envahissent de plus en plus notre quotidien, nos enfants oublient la lecture et s'intéressent davantage aux jeux vidéo, aux sports, à la musique... Contrairement à nous les adultes, dont beaucoup d'entre nous ont lu des milliers de pages, la génération actuelle est toujours occupée par les réseaux sociaux et le gaming ou prennent du plaisir à pratiquer du sport qui attirent davantage de jeunes grâce aux stars internationales du football, du tennis, de l'athlétisme... alors avec tout ça, pourquoi devons-nous forcer les enfants à lire",
   "doc2": "L'amour de la lecture se transmet de génération en génération bien que, ces dernières années, on ne trouve plus beaucoup de bouquins entre les mains des enfants, laissant la place aux smartphones et aux tablettes. En apprenant à lire régulièrement, l'enfant acquiert le langage plus aisément tout en développant sa capacité d'audition et de concentration. De plus, et pour prendre du plaisir ensemble, les parents peuvent consacrer quotidiennement 10 minutes à leurs enfants pour lire des bouquins; une activité qui renforcera à coup sûr la complicité parent/enfant.",
   "intro": null,
   "doc1_pos": "質疑逼孩子讀書：科技產品當道，這代小孩被社群、電玩與運動明星吸走，何必硬要他們讀",
   "doc2_pos": "力挺閱讀：規律閱讀讓孩子更快習得語言、培養聽力與專注，每天 10 分鐘親子共讀還能增進感情",
   "zh": "還需要逼孩子閱讀嗎？",
   "tronque": [
    "doc1"
   ],
   "ocr_fix": [
    {
     "doc": "doc1",
     "from": "beaucoup d'entre-nous",
     "to": "beaucoup d'entre nous",
     "why": "entre nous 不加連字號"
    },
    {
     "doc": "doc2",
     "from": "parent/enfant. LL La question",
     "to": "parent/enfant. La question",
     "why": "LL 為掃描雜訊"
    },
    {
     "from": "La question de savoir s'il e",
     "to": "",
     "why": "引導語被 OCR 字元上限截斷，只剩碎片無資訊，移除以免誤導；原文保留在此欄"
    }
   ],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:226"
  },
  {
   "id": "W-T3-10",
   "theme": "logement",
   "doc1": "Les avantages penser à l'avenir, avoir les vêtements propres être en confort surtout que les argents n'est pas tjrs suffisante, Vivre avec ses parents pendant la période des études permet aux jeunes d'économiser les frais de logement, des plats faits maison et une certaine stabilité psychique, teste les adolescents qui vivent avec leurs parents lui permettent d'économiser son argent pour des projets de vie(il paye pas ni le loyer ni la nourriture) (pour ne pas payer le loyer qui coûte chers, le ménage est fait, les vêtements est propres).. favorise que les jeunes vivent avec leurs parents av",
   "doc2": "Les inconvénients manque de liberté, Vivre seuls leur permet d'être indépendant, les adolescents qui vivent Avec leurs parents s'ennuient car leurs parents décident à leur place et se sont toujours de pondant des parents [...] un avis d'un certain monsieur qui à 25 et il a perdu son job, donc il était dans l'obligation de rentrer vivre avec ses parents, et maintenant il a perdu son espace d'intimité ... contre la vie des jeunes avec leurs parent, un témoignage d'un jeune qui considère revenir chez ses parents c'est avoir revenir en arrière.",
   "intro": "La question de savoir s'il est convenable de viv",
   "doc1_pos": "支持住家裡：省房租與伙食、衣服有人洗，能把錢存下來做人生規劃，心理上也比較穩定",
   "doc2_pos": "反對住家裡：沒有自由，父母替你做決定；一位 25 歲失業搬回家的人失去了私人空間，等於人生倒退",
   "zh": "念書階段的年輕人該住家裡還是搬出去？",
   "tronque": [
    "doc1",
    "intro"
   ],
   "ocr_fix": [
    {
     "doc": "doc1",
     "from": "Vivre avec ces parents pendant",
     "to": "Vivre avec ses parents pendant",
     "why": "此處需所有格 ses，ces（指示詞）為同音辨識錯"
    },
    {
     "doc": "doc2",
     "from": "rentrer vivre avec ces parents",
     "to": "rentrer vivre avec ses parents",
     "why": "同上：需所有格 ses"
    },
    {
     "doc": "doc2",
     "from": "revenir chez ces parents",
     "to": "revenir chez ses parents",
     "why": "同上：需所有格 ses"
    },
    {
     "doc": "doc2",
     "from": "d'intimitée",
     "to": "d'intimité",
     "why": "intimité 字尾無 e，OCR 多字"
    },
    {
     "doc": "doc2",
     "from": "en arrières",
     "to": "en arrière",
     "why": "revenir en arrière 為固定片語，不加 s"
    },
    {
     "doc": "doc2",
     "from": "savoir s' il est",
     "to": "savoir s'il est",
     "why": "省音 s'il 被 OCR 拆成 s' il"
    }
   ],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:231",
   "quality": "faible",
   "note": "⚠️ 原文是考生手寫筆記型（tjrs、語法破碎），不是乾淨文章。⭐ 只當議題用，⛔ 不要當法文範本讀。"
  },
  {
   "id": "W-T3-11",
   "theme": "transport",
   "doc1": "Quand on parle de vélo, on pense systématiquement à deux choses : sport et loisir. On oublie souvent que c'est avant tout un mode de déplacement personnel et professionnel. En ville, c'est un moyen de transport rapide et déstressant puisqu'il permet d'éviter les interminables embouteillages aux heures de pointe. Se rendre au travail tout en faisant du sport, histoire de joindre l'utile à l'agréable.",
   "doc2": "Avec tous les accidents de la route observés annuellement, sortir son vélo pour se déplacer avec en ville peut être très dangereux. En effet, avec la densité importante de véhicules, le non-respect du Code de la route et le manque de pistes cyclables, pratiquer du vélo en zone urbaine présente de vrais risques d'accident. De plus, faire du vélo de nos jours, c'est s'exposer à des gaz d'échappement toxiques et nocifs pour la santé humaine (notamment le monoxyde de carbone...).",
   "intro": "La question de savoir si faire du vélo pour se déplacer en ville est bénéfique suscite un débat animé au sein de notr",
   "doc1_pos": "挺單車通勤：它不只是運動休閒，更是快速又紓壓的交通工具，能避開尖峰塞車還順便運動",
   "doc2_pos": "反對：車流密集、不守交通規則、自行車道不足，事故風險高，還得吸一氧化碳等有毒廢氣",
   "zh": "在城市裡騎腳踏車好不好？",
   "tronque": [
    "intro"
   ],
   "ocr_fix": [],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:236"
  },
  {
   "id": "W-T3-12",
   "theme": "transport",
   "doc1": "Le vélo évoque instinctivement deux aspects : le sport et les loisirs. Pourtant, il est fréquent d'oublier qu'il constitue avant tout un moyen de déplacement quotidien, tant pour les trajets personnels que professionnels. En milieu urbain, il se révèle non seulement rapide, mais aussi apaisant, offrant une échappatoire au trafic saturé aux heures de pointe. Une solution idéale pour allier activité physique et déplacements utiles, mêlant ainsi efficacité et plaisir.",
   "doc2": "Circuler à vélo en milieu urbain comporte des risques non négligeables, comme en témoignent les accidents routiers recensés chaque année. La concentration élevée de véhicules, les manquements aux règles de circulation et l'insuffisance des infrastructures cyclables créent un environnement dangereux pour les usagers. À ces dangers s'ajoute l'exposition quotidienne aux polluants atmosphériques, tels que le monoxyde de carbone, dont les effets toxiques sur la santé sont avérés. Ainsi, le cyclisme en ville soulève une double problématique : sécuritaire et sanitaire.",
   "intro": null,
   "doc1_pos": "挺單車：它首先是日常與通勤的交通工具，市區裡既快又能避開尖峰車潮，兼顧運動與效率",
   "doc2_pos": "反對：車多、違規多、車道不足構成危險環境，再加上長期吸入一氧化碳，是安全與健康的雙重問題",
   "zh": "在城市裡騎腳踏車好不好？（改寫版）",
   "tronque": [],
   "ocr_fix": [
    {
     "from": "De nos jours, le cyclisme en",
     "to": "",
     "why": "引導語被 OCR 字元上限截斷，只剩碎片無資訊，移除以免誤導；原文保留在此欄"
    }
   ],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:241"
  },
  {
   "id": "W-T3-13",
   "theme": "éducation",
   "doc1": "Les raisons qui poussent les parents à opter pour la scolarisation à domicile sont nombreuses. Elle donne la possibilité d'adopter une pédagogie plus individualisée. On peut passer plus de temps sur les points sur lesquels l'enfant bute ou lui proposer, à l'occasion, des jeux éducatifs. L'enfant gère son apprentissage à son rythme, il creuse les sujets qui le passionnent et ne subit pas la pression des autres élèves qui peuvent avancer plus ou moins vite que lui. Autre avantage de l'instruction en famille, une évolution différente. Avec l'école à la maison, pas de notes qui peuvent parfois ê",
   "doc2": "Le choix de la scolarisation à domicile représente un véritable défi et donc, quelques inconvénients à prendre en compte avant de se lancer. La scolarisation à domicile nécessite beaucoup de temps, une bonne organisation et elle a aussi un coût. Tout le matériel, les livres, les manuels, et les sorties sont à la charge des familles, et l'un des deux parents est souvent amené à mettre entre parenthèses son emploi. Au total, l'école à domicile coûte généralement plus cher qu'une scolarisation dans le public. De plus, l'enfant ne côtoie pas de camarades au quotidien, car l'école à domici",
   "intro": null,
   "doc1_pos": "挺在家自學：教法能個別化，孩子照自己節奏學、深入有興趣的主題，不必承受同儕比較與分數壓力",
   "doc2_pos": "指出代價：耗時、要高度組織，教材與外出全自費，常需一方家長停職，總花費高於公立，孩子也缺乏同儕日常相處",
   "zh": "在家自學（scolarisation à domicile）好嗎？",
   "tronque": [
    "doc1",
    "doc2"
   ],
   "ocr_fix": [
    {
     "doc": "doc1",
     "from": "plus au moins vite",
     "to": "plus ou moins vite",
     "why": "固定片語為 plus ou moins（au 為辨識錯）"
    },
    {
     "doc": "doc2",
     "from": "CANADA Le choix de la scolarisation",
     "to": "Le choix de la scolarisation",
     "why": "CANADA 為頁眉浮水印混進正文"
    }
   ],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:246"
  },
  {
   "id": "W-T3-14",
   "theme": "travail",
   "doc1": "La sieste au travail peut avoir de nombreux avantages pour les employés et les entreprises. En permettant aux travailleurs de faire une petite sieste, cela peut aider à augmenter leur productivité et à améliorer leur santé et leur bien-être. Les siestes courtes peuvent aider à améliorer la vigilance et la concentration, réduire les niveaux de stress et améliorer l'humeur. En outre, la pratique de la sieste peut aider à réduire les coûts pour les employeurs en diminuant les coûts liés à la fatigue et aux accidents du travail. Il est donc important pour les entreprises de considérer les avanta",
   "doc2": "Malgré les nombreux avantages de la sieste au travail, il peut être difficile pour toutes les entreprises de mettre en place des lits et des salles dédiées à cette pratique. Cela peut être dû à des contraintes financières ou logistiques, ou encore à des politiques de travail strictes qui ne permettent pas aux employés de faire des siestes pendant les heures de travail. En outre, certains travailleurs peuvent ne pas se sentir à l'aise de faire une sieste au travail, ce qui peut limiter l'adoption de cette pratique. Il est donc important pour les entreprises de considérer les avantages et les",
   "intro": null,
   "doc1_pos": "支持職場午睡：能提升生產力與健康，短睡改善警覺、專注、減壓與情緒，也降低疲勞與工安事故成本",
   "doc2_pos": "潑冷水：不是每間公司設得起午睡床與空間，財務、場地或工時規定都是限制，有些員工自己也不自在",
   "zh": "公司該不該讓員工午睡？",
   "tronque": [
    "doc1",
    "doc2"
   ],
   "ocr_fix": [],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:251"
  },
  {
   "id": "W-T3-15",
   "theme": "ville",
   "doc1": "À mon avis, le fait de vivre en ville, cela vous donne la possibilité de vous divertir de plusieurs manières ; comme aller au cinéma, déjeuner dans un restaurant faire du shopping... Tout est à côté, vous n'avez pas besoin de parcourir plusieurs kilomètres pour prendre un taxi ( si le trajet est un peu long) et vous aurez à disposition tout ce dont vous désirez. Même les amoureux des évènements culturels sont servis ; musée, théâtre, opéra... tout y est !",
   "doc2": "Dernièrement, j'ai décidé de quitter la ville pour vivre à la campagne, car j'avais vraiment besoin de me rapprocher de la nature et de profiter du calme. Désormais, au lieu de partir quotidiennement au bar du coin ou au restaurant, j'invite des amis à boire un verre dans la terrasse de ma maison ou j'organise de temps en temps un barbecue dans mon jardin. Un autre détail d'importance m'a encouragé à prendre cette décision ; c'est la disponibilité des logements avec des prix largement inférieurs à ceux proposés en ville. Avec mon budget actuel, j'ai une grande maison avec terrasse et jardin",
   "intro": null,
   "doc1_pos": "挺城市：娛樂選擇多，電影、餐廳、購物都在旁邊，博物館、劇院、歌劇院也一應俱全",
   "doc2_pos": "挺鄉下：為接近自然與安靜而搬離城市，改在自家露臺、花園招待朋友，房價又遠低於城市",
   "zh": "住城市還是住鄉下？",
   "tronque": [
    "doc2"
   ],
   "ocr_fix": [
    {
     "doc": "doc2",
     "from": "proposés en villes",
     "to": "proposés en ville",
     "why": "en ville 為固定用法，不用複數"
    }
   ],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:256"
  },
  {
   "id": "W-T3-16",
   "theme": "famille",
   "doc1": "Une étude menée par le Centre de recherche sur la parentalité de l'Université de Toronto en juin dernier a révélé que la majorité des parents adoptent des approches plus bienveillantes envers leurs enfants qu'auparavant. Cette étude a examiné un échantillon représentatif de mille familles dans différentes régions du pays et a montré que les parents encouragent une communication ouverte avec leurs enfants et adoptent des approches moins autoritaires.",
   "doc2": "Un article d'opinion paru dans un magazine populaire en mars 2023 présente des témoignages de parents qui ont recours à des méthodes de discipline plus strictes, telles que des privations de liberté, des punitions corporelles et des critiques constantes. Certains parents estiment que ces approches sont nécessaires pour aider leurs enfants à développer leur responsabilité et leur discipline dans un monde de plus en plus compétitif. Cependant, de nombreux experts en éducation considèrent ces méthodes comme inappropriées et préconisent des approches plus positives et coopératives pour guider le",
   "intro": null,
   "doc1_pos": "引研究說父母變溫和：多倫多大學調查一千個家庭，發現多數父母鼓勵開放溝通、較少採威權方式",
   "doc2_pos": "呈現嚴格派：有父母採禁足、體罰與不斷批評，認為競爭社會需要如此培養責任與紀律，但多數教育專家認為不當",
   "zh": "現代父母該寬鬆還是嚴格？",
   "tronque": [
    "doc2"
   ],
   "ocr_fix": [],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:261"
  },
  {
   "id": "W-T3-17",
   "theme": "famille",
   "doc1": "Je vais bientôt avoir 22 ans et j'habite toujours chez mes parents. Mon père et ma mère restent autoritaires avec moi, même si je suis majeure. Quand j'étais mineure, je n'avais pas le droit de dormir dehors, ni même de dépasser 21h lorsque je sortais avec des amies. Maintenant, peu de choses ont changé ; certes, j'ai le droit de veiller plus tard la nuit, mais ma mère ne cesse de m'appeler sur mon téléphone portable jusqu'à ce que je sois de retour.",
   "doc2": "Les parents ont parfois peur d'être trop sévères avec leurs enfants. Ils craignent, qu'à cause d'un excès d'autorité, leurs enfants ne s'épanouissent pas et manquent plus tard de personnalité. Même si les parents acceptent, par amour, tout ce que leurs enfants demandent, cela pourrait avoir des effets négatifs lorsqu'ils passent à l'âge adulte. En effet, pour vivre en communauté, il y a certaines règles à respecter.",
   "intro": "La question de la sévérité des parents envers les enfants est un sujet complexe qui soulève de nombreux débats. Certains ressentent les contraintes des règles parentales autorit",
   "doc1_pos": "快 22 歲的女兒抱怨：即使已成年，父母仍威權管束，晚歸母親就不停打電話直到她回家",
   "doc2_pos": "替嚴格說話：怕太嚴而事事順著孩子，反而在他們成年後出問題，因為群體生活本來就有規則要守",
   "zh": "父母該不該嚴格管教？",
   "tronque": [
    "intro"
   ],
   "ocr_fix": [
    {
     "doc": "doc2",
     "from": "tout ce dont leurs enfants demandent",
     "to": "tout ce que leurs enfants demandent",
     "why": "demander qqch 為直接及物，關係代名詞須用 que 而非 dont"
    }
   ],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:266"
  },
  {
   "id": "W-T3-18",
   "theme": "consommation",
   "doc1": "Il est aujourd'hui possible de fabriquer soi-même tout type de produits à la maison: des shampooings, des savons, des crèmes, du maquillage mais aussi des produits d'entretien pour faire le ménage. C'est formidable car on peut ainsi contrôler leur composition. Il est préférable de sélectionner des ingrédients et des parfums naturels qui ne contiennent pas d'éléments chimiques. Par ailleurs, la fabrication maison permet de réduire les emballages et donc les déchets. N'hésitez plus: fabriquez vos propres produits.",
   "doc2": "Vous préférez fabriquer vous même votre savon au lieu de l'acheter ? Attention il y a des risques pour la santé si vous ne choisissez pas les bons ingrédients ou si les règles d'hygiène ne sont pas respectées. Ainsi, avant de vous lancer, il est nécessaire de bien se renseigner et de suivre les règles strictes de fabrication et de conservation. De plus, même si ces produits coûtent moins cher et représentent une économie d'argent du quotidien, la fabrication maison prend souvent beaucoup de temps",
   "intro": "Produits Maison : Une Alternative Intéressante ou une Contrainte ?",
   "doc1_pos": "力挺自己做：從洗髮精到清潔劑都能自製，成分可控、能選天然原料，還減少包裝與垃圾",
   "doc2_pos": "提出風險：原料選錯或衛生沒做好會傷身，得先弄清製作與保存規則；雖然省錢，但自製很花時間",
   "zh": "自製居家用品（洗髮精、肥皂、清潔劑）好不好？",
   "tronque": [],
   "ocr_fix": [
    {
     "doc": "doc1",
     "from": "permet de reduire",
     "to": "permet de réduire",
     "why": "漏掉 é"
    },
    {
     "doc": "doc1",
     "from": "les emballages etadonc les déchets",
     "to": "les emballages et donc les déchets",
     "why": "et donc 被 OCR 黏成 etadonc"
    },
    {
     "doc": "doc1",
     "from": "vos propres produits. + e CANADA",
     "to": "vos propres produits.",
     "why": "「+ e CANADA」為浮水印與掃描雜訊"
    },
    {
     "doc": "doc2",
     "from": "les bons ingredients",
     "to": "les bons ingrédients",
     "why": "漏掉 é"
    },
    {
     "doc": "doc2",
     "from": "De plas, méme si",
     "to": "De plus, même si",
     "why": "plas/méme 為 plus/même 的辨識錯（a/u、é/ê 混淆）"
    },
    {
     "doc": "doc2",
     "from": "une economie d'argent du quatidien",
     "to": "une économie d'argent du quotidien",
     "why": "economie 漏 é；quatidien 為 quotidien 的辨識錯"
    },
    {
     "doc": "doc2",
     "from": "la fabrication mason",
     "to": "la fabrication maison",
     "why": "mason 為 maison 的辨識錯（漏 i）"
    }
   ],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:271"
  },
  {
   "id": "W-T3-19",
   "theme": "consommation",
   "doc1": "Préparer ses produits biologiques à la maison offre un contrôle total sur leur composition, garantissant des solutions saines et adaptées. Cette pratique permet aussi de limiter l'usage de plastique grâce à des emballages réutilisables. Elle représente une alternative économique et enrichissante qui favorise un mode de vie plus responsable et écologique.",
   "doc2": "La production de produits biologiques maison n'est pas sans inconvénients. Une erreur dans la formulation peut altérer leur efficacité ou provoquer des réactions indésirables. De plus, rassembler et préparer les ingrédients peut être fastidieux. L'absence de certification garantit moins de sécurité et favorise le risque de contamination bactérienne en cas de mauvaise conservation. Enfin, l'investissement de départ pour des ingrédients de qualité peut être un obstacle pour certains.",
   "intro": "Le débat sur les produits faits maison versus ceux achetés en magasin fait l'objet passionné au sein de notre s",
   "doc1_pos": "支持自製：成分完全可控、健康又客製，可用可重複容器減少塑膠，經濟又環保",
   "doc2_pos": "反對：配方失誤會失效或引起不良反應，備料繁瑣；沒有認證、保存不當有細菌污染風險，優質原料的初期投資也是門檻",
   "zh": "自製有機保養／清潔用品值得嗎？",
   "tronque": [
    "intro"
   ],
   "ocr_fix": [],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:276",
   "note": "⚠️ intro 有一處漏字（fait l'objet passionné，應為 fait l'objet d'un débat passionné），依規則不補字。"
  },
  {
   "id": "W-T3-20",
   "theme": "éducation",
   "doc1": "À la rentrée, le nombre d'élèves inscrits dans des écoles privées a augmenté en France. Le succès des établissements privés n'est pas directement lié aux bons résultats scolaires de leurs élèves. C'est la réputation de ces lieux qui explique un tel enthousiasme. Aux yeux de nombreux parents, les élèves y sont mieux encadrés, mieux surveillés et les professeurs sont plus présents. Les parents sont aussi rassurés parce que les classes sont homogènes: elles accueillent généralement des élèves de milieux sociaux favorisés. En effet, les études dans ces établissements sont payantes, ce qui n'est",
   "doc2": "Dans les collèges privés, il y a peu d'élèves de milieux sociaux défavorisés. Comme les études dans ces établissements sont payantes, certaines catégories de population en sont exclues. Ce système qui oppose écoles publiques et écoles privées ne facilite pas la mixité sociale. Ainsi, les élèves du privé ont rarement l'occasion de rencontrer d'autres jeunes issus de milieux sociaux moins favorisés qu'eux et inversement. Ce modèle scolaire reproduit les inégalités sociales et renforce le sentiment d'exclusion de certains jeunes.",
   "intro": "Faut-il choisir une école privée ou publique ?",
   "doc1_pos": "解釋私校為何搶手：靠的不是成績而是名聲——家長認為管得嚴、老師在場多，且班級同質、多為優渥家庭",
   "doc2_pos": "批評私校：學費把弱勢排除在外，阻礙社會混合，複製既有不平等並加深部分年輕人的排斥感",
   "zh": "該選私立還是公立學校？",
   "tronque": [
    "doc1"
   ],
   "ocr_fix": [],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:281"
  },
  {
   "id": "W-T3-21",
   "theme": "éducation",
   "doc1": "Les écoles privées connaissent une augmentation du nombre d'inscriptions en France lors de chaque rentrée scolaire. Leur attractivité ne repose pas seulement sur la réussite académique, mais aussi sur leur renommée. Beaucoup de parents estiment que leurs enfants y sont mieux encadrés et bénéficient d'un suivi plus rigoureux. Ces établissements, accessibles moyennant des frais de scolarité, regroupent principalement des élèves de milieux favorisés, ce qui représente un critère important pour certaines familles.",
   "doc2": "Dans les établissements privés, la présence d'élèves issus de milieux défavorisés est limitée. En raison des coûts de scolarité, ces écoles ne sont pas accessibles à toutes les familles, ce qui accentue la séparation avec les écoles publiques. Cette situation empêche la mixité sociale et prive les élèves de rencontres enrichissantes avec des jeunes d'horizons divers. Ce modèle éducatif perpétue ainsi les inégalités et renforce le sentiment d'exclusion.",
   "intro": "Les débats autour de l'éducation privée versus publique en France fait l'objet d'un débat passionné. D'une part, les partisans des écoles pri",
   "doc1_pos": "說明私校吸引力：靠名聲與更嚴密的照管，學費門檻讓學生多來自優渥家庭，這對某些家長反而是加分",
   "doc2_pos": "批評：學費讓弱勢進不去，加深與公校的隔離，剝奪學生與不同背景同儕相處的機會，延續不平等",
   "zh": "私立 vs 公立學校（改寫版）",
   "tronque": [
    "intro"
   ],
   "ocr_fix": [
    {
     "doc": "doc1",
     "from": "pour certaines familles. CANADA",
     "to": "pour certaines familles.",
     "why": "CANADA 為頁眉浮水印"
    }
   ],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:286"
  },
  {
   "id": "W-T3-22",
   "theme": "logement",
   "doc1": "La vie en colocation offre de nombreux avantages. Partager un logement avec d'autres personnes permet de réduire les dépenses, que ce soit le loyer, les factures ou les frais généraux. De plus, cela favorise les interactions sociales et les échanges culturels. Vivre avec des colocataires permet de rencontrer des individus de différents horizons, de nouer des amitiés et de partager des expériences enrichissantes.",
   "doc2": "La colocation peut cependant présenter des défis. Les différences de personnalité et de mode de vie entre les colocataires peuvent entraîner des tensions. La gestion des responsabilités et des tâches ménagères peut également être source de conflits. De plus, la colocation peut limiter l'intimité et l'espace personnel. Il est important d'établir une communication ouverte et respectueuse, ainsi que des règles de vie commune, pour favoriser une cohabitation harmonieuse.",
   "intro": "La vie en colocation fait l'objet d'un débat passionné au sein de notre société. D'un côté, elle permet de réduire les coûts d",
   "doc1_pos": "挺合租：房租、帳單與雜費都能分攤，還能認識不同背景的人、交朋友、做文化交流",
   "doc2_pos": "指出困難：個性與生活習慣差異造成摩擦，家務分工易起衝突，隱私與個人空間也受限",
   "zh": "合租（colocation）好不好？",
   "tronque": [
    "intro"
   ],
   "ocr_fix": [],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:291"
  },
  {
   "id": "W-T3-23",
   "theme": "logement",
   "doc1": "Vivre avec d'autres personnes demande d'avoir une bonne entente et de respecter certaines règles. Il n'est pas toujours possible d'écouter sa musique préférée à volume élevé, d'inviter tous ses amis pour faire la fête ou de laisser de la vaisselle sale dans la cuisine. Chaque individu a des habitudes susceptibles d'irriter les autres. C'est pourquoi il est essentiel d'établir des règles de vie en communauté et de les respecter mutuellement. Il est important de communiquer avec ses colocataires chaque fois qu'un problème survient. L'organisation et la discussion sont les clés d'une colocati",
   "doc2": "Être adulte et vivre en colocation ? C'est un choix qui permet d'accéder facilement à un logement plus spacieux et économique. Il est vrai que vous n'aurez qu'une chambre pour vous et que vous devrez partager la cuisine, le salon et la salle de bain. Toutefois, une colocation peut inclure une maison avec jardin ou un grand appartement en centre-ville ! De plus, en partageant le loyer et les charges avec vos colocataires, vous réduirez considérablement vos dépenses par rapport à un appartement individuel. Alors que vous n'aurez qu'une chambre pour vous et que vous devrez partager les espaces",
   "intro": null,
   "doc1_pos": "強調合租要守規矩：不能大聲放音樂、隨意找朋友開趴或留髒碗，必須訂共同生活規則並隨時溝通",
   "doc2_pos": "推薦成人合租：能住到更大更便宜的房子（帶花園的透天或市中心大公寓），分攤房租雜費省很多",
   "zh": "合租：要守的規矩 vs 能得到的好處",
   "tronque": [
    "doc1",
    "doc2"
   ],
   "ocr_fix": [
    {
     "doc": "doc1",
     "from": "II n'est pas toujours possible",
     "to": "Il n'est pas toujours possible",
     "why": "大寫 I 被辨識成兩個大寫 I"
    },
    {
     "doc": "doc1",
     "from": "des règles de vie en | communauté",
     "to": "des règles de vie en communauté",
     "why": "「|」為掃描產生的直線雜訊"
    }
   ],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:296"
  },
  {
   "id": "W-T3-24",
   "theme": "solidarité",
   "doc1": "Marie, 58 ans: J'ai pris l'habitude, depuis des années maintenant, de donner un peu de mon temps et de mon argent afin d'aider les personnes vivant dans la précarité extrême, surtout ceux qui vivent sans abri en période hivernale. Pour moi, c'est un devoir d'aider et de contribuer afin que ces personnes puissent vivre le plus normalement possible. En assistant des pauvres ou des associations, on se sent utile au sein d'une société qui devient de plus en plus impitoyable.",
   "doc2": "Paul, 63 ans: Pour aider les personnes vivant dans la précarité, on doit s'investir davantage dans des associations caritatives. Personnellement, c'est ce que je fais, je suis bénévole dans une association située dans mon quartier. Elle a pour principal but, aider les sans-abris à trouver un logement et un travail afin qu'ils vivent le plus normalement possible. Cette action est plus bénéfique à long terme car elle permet de les rendre autonomes.",
   "intro": "La question de l'aide aux personnes pauvres engendre des approches variées et complémentaires. D'un côté, certains choisissent de donner de leur te",
   "doc1_pos": "58 歲 Marie 採直接援助：多年固定拿出時間與金錢幫助極貧與冬天露宿的人，覺得這是義務也讓自己有用",
   "doc2_pos": "63 歲 Paul 主張投入組織：他在社區協會當志工幫街友找住處與工作，認為讓他們自立長期更有效",
   "zh": "幫助貧困者：直接給錢時間 vs 投入公益組織",
   "tronque": [
    "intro"
   ],
   "ocr_fix": [
    {
     "doc": "doc1",
     "from": "Pour our moi",
     "to": "Pour moi",
     "why": "OCR 重複片段 our"
    },
    {
     "doc": "doc1",
     "from": "vivre le ou des normalement possible",
     "to": "vivre le plus normalement possible",
     "why": "原句為 le plus normalement possible（同組 DOCUMENT 2 出現同一片語可佐證），ou des 為辨識錯"
    },
    {
     "doc": "doc2",
     "from": "Paul 63, ans:",
     "to": "Paul, 63 ans:",
     "why": "逗號被 OCR 移位（對照 DOCUMENT 1 的「Marie, 58 ans:」）"
    }
   ],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:301"
  },
  {
   "id": "W-T3-25",
   "theme": "cuisine",
   "doc1": "Les amateurs ont fait des recettes réussies, mais ils manquent toujours des compétences et des techniques, c'est pourquoi la formation et l'expérience sont nécessaires pour être un vrai cuisinier.",
   "doc2": "Il parle des cuisiniers qui ont appris le métier de cuisiniers sur internet et qui ont le buzz sur les réseaux sociaux il raconte aussi l'histoire d'une amatrice qui est devenue professionnelle et qui a rédigé plusieurs livres sur la cuisine pour les amateurs de cuisine à la maison.",
   "intro": "Le débat entre cuisinier amateur et professionnel fait l'objet d'un débat passionné au sein de notre société. D'une part, aux amateurs, il manque souvent des compétences techniques avancées, ce qui souligne l'importance de la formation et de l'expérience pour devenir un véritable professionnel de la cuisine. D'au",
   "doc1_pos": "挺專業訓練：業餘者做得出成功的菜，但缺技術與能力，要成為真正的廚師仍需訓練與經驗",
   "doc2_pos": "挺自學業餘者：有人靠網路學廚藝在社群爆紅，還有業餘者轉專業並出版多本家庭料理書",
   "zh": "業餘廚師 vs 受過訓練的專業廚師",
   "tronque": [
    "intro"
   ],
   "ocr_fix": [
    {
     "doc": "doc1",
     "from": "des compétences et des technique",
     "to": "des compétences et des techniques",
     "why": "des + 名詞須複數"
    },
    {
     "doc": "doc1",
     "from": "c'est pourquoi la formations",
     "to": "c'est pourquoi la formation",
     "why": "定冠詞 la 為單數，formations 多出 s"
    }
   ],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:306"
  },
  {
   "id": "W-T3-26",
   "theme": "santé",
   "doc1": "\"Je suis en faveur des distributeurs de boissons dans les lycées. Premièrement, ils offrent une commodité supplémentaire pour les élèves, notamment pour ceux qui n'ont pas le temps de passer à la cafétéria pendant les pauses. Deuxièmement, s'ils sont bien gérés, ces distributeurs peuvent offrir une gamme de boissons saines, comme de l'eau, du jus de fruits pur et des boissons aux fruits sans sucre ajouté. Ces distributeurs peuvent être une source de revenus supplémentaire pour l'école, qui peut être réinvestie dans l'amélioration des infrastructures ou des programmes scolaires.\"",
   "doc2": "\"Je suis contre l'installation de distributeurs de boissons dans les lycées. Ma principale préoccupation est liée à la santé des élèves. Malheureusement, beaucoup de ces distributeurs sont remplis de boissons sucrées et de sodas qui contribuent à l'obésité infantile et à d'autres problèmes de santé comme le diabète. Même les jus de fruits, qui peuvent sembler sains, contiennent souvent beaucoup de sucre. Les écoles devraient être des lieux qui encouragent des habitudes alimentaires saines et je crains que la présence de ces distributeurs n'encourage une consommation excessive de boissons suc",
   "intro": null,
   "doc1_pos": "贊成裝：對來不及去餐廳的學生很方便，管理得好可提供水與無糖果汁，收入還能回饋校內設施與課程",
   "doc2_pos": "反對裝：機器多半塞滿含糖飲料與汽水，助長兒童肥胖與糖尿病，連果汁含糖量都高，學校該鼓勵健康飲食",
   "zh": "高中該不該裝飲料販賣機？",
   "tronque": [
    "doc2"
   ],
   "ocr_fix": [],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:311"
  },
  {
   "id": "W-T3-27",
   "theme": "écologie",
   "doc1": "Chaque année, des millions de tonnes de plastiques sont déversées dans les océans, où elles s'accumulent et se fragmentent en petits morceaux. Ces déchets plastiques ont des effets désastreux sur la faune et la flore marines, qui les ingèrent. Les plastiques menacent ainsi la santé des écosystèmes marins, mais aussi la nôtre, car ils peuvent remonter dans la chaîne alimentaire. Il est urgent de réduire notre consommation de plastiques et de les éliminer à la source, avant qu'ils n'atteignent les océans.",
   "doc2": "Le plastique est un matériau indispensable dans le domaine de la santé. Il permet de fabriquer des dispositifs médicaux, tels que des seringues, des cathéters, des prothèses, des implants, des pansements, etc. Ces dispositifs sont souvent jetables, résistants, et adaptés aux besoins des patients. Le plastique contribue ainsi à la prévention des infections, à la réduction des douleurs, à l'amélioration de la qualité de vie, et à la sauvegarde de nombreuses vies. Il est donc un allié de la médecine, qui apporte des solutions innovantes et efficaces.",
   "intro": "L'utilisation du plastique fait l'objet d'un",
   "doc1_pos": "主張源頭減塑：每年數百萬噸塑膠流入海洋碎成微粒，被海洋生物吃下，再沿食物鏈回到人身上",
   "doc2_pos": "為塑膠辯護：醫療上不可或缺，注射器、導管、義肢、植入物與敷料都靠它，能防感染、減痛並救命",
   "zh": "塑膠：該從源頭淘汰還是不可或缺？",
   "tronque": [
    "intro"
   ],
   "ocr_fix": [
    {
     "doc": "doc1",
     "from": "II est urgent",
     "to": "Il est urgent",
     "why": "大寫 I 被辨識成兩個大寫 I"
    }
   ],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:316"
  },
  {
   "id": "W-T3-28",
   "theme": "travail",
   "doc1": "Grâce à la livraison en entreprise, les employés bénéficieront d'un gain de temps notable. Il n'est plus question d'aller sortir loin du lieu de travail pour trouver de quoi manger. En complément, l'argent et l'énergie économisée permettent d'être encore plus efficace au travail. Sans pour autant mettre fin à une session importante liée au travail, le repas sera déjà prêt et pourra attendre la fin d'une conférence, d'une réunion ou d'un rendez-vous. Il s'agit d'une véritable solution dédiée aux entreprises ayant une activité intense et qui requiert la présence continue de leurs employés. Et",
   "doc2": "Cette pratique révèle souvent des inconvénients à cause de sa notoriété montante. Certains jours, il arrive que les responsables de livraisons peuvent être envahis par un grand nombre de livraisons à faire et cela risque de générer des perturbations liées au stress de l'attente. De même pour les employés, une trop longue heure de travail peut causer un état de fatigue si ce dernier ne quitte pas son bureau pour le repas. Dans tous les cas, il est recommandé de toujours marquer des temps de pause lors des durs labeurs.",
   "intro": "La livraison des repas au bureau est une pratique de plus en plus répand",
   "doc1_pos": "支持公司外送：員工不必跑遠找吃的，省時省錢省力，會議一結束餐點已備妥，適合高強度、需員工常駐的公司",
   "doc2_pos": "提醒缺點：外送量暴增時等待與壓力造成混亂；員工不離開座位吃飯、工時又長會更疲勞，該固定休息",
   "zh": "公司叫外送到辦公室好嗎？",
   "tronque": [
    "doc1",
    "intro"
   ],
   "ocr_fix": [
    {
     "doc": "doc2",
     "from": "si ce dernier ne quittera pas son bureau",
     "to": "si ce dernier ne quitte pas son bureau",
     "why": "si 引導的條件從句不能用簡單未來式"
    }
   ],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:321"
  },
  {
   "id": "W-T3-29",
   "theme": "lecture",
   "doc1": "Depuis plusieurs années maintenant, de nombreux lecteurs ont décidé de remplacer la bibliothèque traditionnelle par des livres numériques. Selon eux, l'avantage est avant tout économique. D'une part, le livre numérique permet d'économiser du papier, d'autre part la version numérique d'un livre est généralement moins chère que la version papier. Les livres numériques ont un autre avantage : ils permettent une ouverture sur le monde pour les personnes en situation de handicap. Certaines options, comme la possibilité d'augmenter la taille des lettres, facilitent la lecture pour les personnes ma",
   "doc2": "Le livre numérique remplacera-t-il le livre papier ? « Non », répondront la plupart des lecteurs. Le livre papier est un beau support. Quel plaisir de le prêter aux gens qu'on aime ou de l'offrir en glissant un petit mot dedans ! Le livre papier a une histoire, l'odeur du neuf ou de l'ancien... Il transmet beaucoup d'émotions alors que le livre numérique a un côté un peu impersonnel. De plus, les livres numériques demandent de posséder un minimum de connaissances en informatique, ce qui peut être une difficulté pour certaines personnes.",
   "intro": "Le choix entre le livre papier et le livre numérique es",
   "doc1_pos": "挺電子書：省紙又比紙本便宜，還能放大字體，對視障等身心障礙者是通往世界的窗口",
   "doc2_pos": "挺紙本書：可借可送、能夾張字條，有氣味與歷史、能傳遞情感；電子書較無人情味，也要求一定的電腦能力",
   "zh": "電子書 vs 紙本書",
   "tronque": [
    "doc1",
    "intro"
   ],
   "ocr_fix": [
    {
     "doc": "doc2",
     "from": "le livre numérique à un côté",
     "to": "le livre numérique a un côté",
     "why": "動詞 avoir 的 a 被誤加重音成介系詞 à"
    }
   ],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:326"
  },
  {
   "id": "W-T3-30",
   "theme": "travail",
   "doc1": "Venir au bureau avec son animal de compagnie, c'est à la mode. L'intérêt de cette présence ? C'est simple: diminuer le stress des employés. La présence d'un chien ou d'un chat change l'ambiance générale d'une entreprise : elle réduit les tensions entre collègues, ce qui n'est pas négligeable car chaque année, l'État français dépense entre 2 et 3 milliards d'euros pour soigner les salariés malades du stress. Selon une enquête, un quart des employés pensent aussi que la présence des animaux permet d'être plus motivé au travail.",
   "doc2": "« Dans l'entreprise où je travaille, les employés sont autorisés à venir avec leur animal de compagnie, chat ou chien. Personnellement, cela me dérange. Je ne suis pas très à l'aise avec les animaux, qui peuvent avoir des comportements imprévisibles. D'autre part, je trouve que cela peut poser des problèmes de santé. Que faire si un employé est allergique aux chats ? Sera-t-il obligé de rester enfermé dans son bureau? Et puis c'est aussi une source de distraction. Mes collègues et moi ne serons pas plus productifs grâce à un chien ou un chat ! »",
   "intro": "L'introduction des animaux de compagnie sur le",
   "doc1_pos": "支持帶寵物：能降低員工壓力、緩和同事間緊張（法國每年為壓力病症花 20–30 億歐元），四分之一員工也覺得更有動力",
   "doc2_pos": "當事人反對：自己怕動物、動物行為難預測；同事對貓過敏怎麼辦，還會分心，並不會因此更有生產力",
   "zh": "可以帶寵物上班嗎？",
   "tronque": [
    "intro"
   ],
   "ocr_fix": [],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:331"
  },
  {
   "id": "W-T3-31",
   "theme": "travail",
   "doc1": "On parle de l'inutilité de la photo sur le cv tant que ce qui est important sont les diplômes requis et l'expérience professionnelle. Les employeurs n'aiment pas avoir des photos, une étude montre que c'est une perte de temps. La photo sur un cv ne doit pas être obligatoire car elle peut influencer les employeurs, certains employeurs peuvent choisir un candidat en se basant sur sa couleur (une sorte de discrimination).",
   "doc2": "Christophe adhère à l'idée que la présence d'une photo sur le CV ne sera pas un critère de sélection mais elle est indispensable pour quelques métiers tels qu'une hôtesse d'accueil, la photo est nécessaire, elle donne une idée sur le candidat et certains employeurs veulent voir la photo pour décider pour ou contre un candidat.",
   "intro": "Les avis sur l'inclusion de photos dans les CV sont partagés. D'une part, certains estiment que les photos sur les CV sont inutiles et peuvent même conduire à des discriminations, car elles permettent aux employeurs de potentiellement évaluer les candidats sur des critè",
   "doc1_pos": "反對放照片：重點是學歷與經歷，雇主也不愛看，照片還可能造成以膚色取人的歧視",
   "doc2_pos": "有條件支持：照片不該當篩選標準，但像接待人員這類職務有必要，能讓雇主對應徵者先有概念",
   "zh": "履歷該不該放照片？",
   "tronque": [
    "intro"
   ],
   "ocr_fix": [
    {
     "doc": "doc1",
     "from": "ne doit pas etre obligatoire",
     "to": "ne doit pas être obligatoire",
     "why": "漏掉 ê"
    },
    {
     "doc": "doc2",
     "from": "métiers tel que une hôtesse",
     "to": "métiers tels qu'une hôtesse",
     "why": "tel 須與 métiers（陽性複數）配合；que 後接母音須省音為 qu'"
    },
    {
     "doc": "doc2",
     "from": "la photo est nécessaire, il donne une idée",
     "to": "la photo est nécessaire, elle donne une idée",
     "why": "主詞是 la photo（陰性），代名詞須用 elle"
    },
    {
     "doc": "doc2",
     "from": "certaines employeurs",
     "to": "certains employeurs",
     "why": "employeur 為陽性名詞，限定詞須用 certains"
    }
   ],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:336"
  },
  {
   "id": "W-T3-32",
   "theme": "travail",
   "doc1": "Les amitiés entre collègues au travail peuvent être extrêmement bénéfiques. Elles favorisent un climat de travail agréable et une ambiance positive au sein de l'équipe. Avoir des amis parmi ses collègues permet de renforcer les liens professionnels et de créer un sentiment de camaraderie. Cela peut contribuer à une meilleure communication, une collaboration plus étroite et une résolution plus efficace des problèmes. De plus, partager des moments de convivialité en dehors du travail, comme des déjeuners ou des activités après le bureau peut renforcer les liens et créer une dynamique de groupe",
   "doc2": "Il est important de trouver un équilibre entre amitié et professionnalisme au travail. Les amitiés excessivement proches peuvent parfois créer des tensions ou des conflits lorsque des décisions professionnelles doivent être prises. De plus, les amitiés exclusives entre certains collègues peuvent exclure les autres membres de l'équipe, ce qui peut nuire à la cohésion et à la collaboration. Il est essentiel de maintenir des limites claires et de veiller à ce que les amitiés ne compromettent pas le professionnalisme, la hiérarchie ou la productivité au sein de l'organisation.",
   "intro": null,
   "doc1_pos": "支持職場友誼：營造愉快氛圍與團隊情誼，改善溝通與協作、更有效解決問題，下班聚餐也能凝聚團隊",
   "doc2_pos": "主張要有界線：太親近會在做決策時造成張力，小圈圈排擠其他成員，必須守住專業、層級與生產力",
   "zh": "同事之間該不該做朋友？",
   "tronque": [
    "doc1"
   ],
   "ocr_fix": [
    {
     "from": "La question des re",
     "to": "",
     "why": "引導語被 OCR 字元上限截斷，只剩碎片無資訊，移除以免誤導；原文保留在此欄"
    }
   ],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:341"
  },
  {
   "id": "W-T3-33",
   "theme": "travail",
   "doc1": "Nous avons installé, dans votre entreprise, des bureaux réglables qui montent et descendent, ceci pour permettre aux employés de choisir la position qui leur convient le mieux pour travailler. Les employés sont satisfaits et disent qu'ils sont plus productifs et plus efficaces lors des négociations au téléphone par exemple. Même le climat social est plus convivial et la communication verbale entre collègues s'est renforcée. « Lorie, responsable ».",
   "doc2": "De nos jours, les entreprises veulent toujours plus de productivité et d'efficacité, et les employés passent plus de temps sur les lieux de travail. Les entreprises cherchent toujours des moyens ou astuces pour convaincre leurs employés de travailler plus et qu'elles pensent à leur santé. Moi, ce qui m'importe c'est de faire mon job sur mon temps de travail réel sans être obligé de faire des rallonges en heures supplémentaires. « Florian, ingénieur ».",
   "intro": "La question du bien-être des employés fait l'objet d'un débat passionné au sein de notre société. Certains personnes met en avant les avantage",
   "doc1_pos": "主管 Lorie 正面看待升降桌：員工能選最舒服的姿勢、自認更有效率，氣氛與同事間口語溝通也變好",
   "doc2_pos": "工程師 Florian 質疑：企業真正要的是產能，這些手法只是要員工做更多；他只想在正常工時內做完、不加班",
   "zh": "公司改善辦公環境，是為員工還是為產能？",
   "tronque": [
    "intro"
   ],
   "ocr_fix": [],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:346"
  },
  {
   "id": "W-T3-34",
   "theme": "logement",
   "doc1": "La location courte durée offre flexibilité et commodité pour les voyageurs. Elle permet de louer un logement pour une période de temps limitée, que ce soit pour des vacances ou un déplacement professionnel. Cela permet aux voyageurs de profiter d'un hébergement confortable avec des équipements adaptés à leurs besoins, tout en évitant les engagements à long terme.",
   "doc2": "La location courte durée peut parfois être coûteuse, en particulier dans les zones touristiques. De plus, la disponibilité peut être limitée, surtout pendant les périodes de forte demande. Il est donc important de planifier et de réserver à l'avance pour obtenir les meilleurs résultats.",
   "intro": "La question de la location courte durée fait l'objet d'un débat passionné au sein de notre société. Certains pensent que la location courte durée offre une flexibilité et une commodité significatives pour les voyageurs. Tandis que d'autres soulignent que cette forme de location peut être coûteuse, particulièr",
   "doc1_pos": "挺短租：對旅客彈性又方便，度假或出差都能租到設備齊全的住處，不必長期綁約",
   "doc2_pos": "潑冷水：觀光區短租很貴，旺季房源也有限，必須提早規劃與預訂",
   "zh": "短期租屋好不好？",
   "tronque": [
    "intro"
   ],
   "ocr_fix": [],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:351"
  },
  {
   "id": "W-T3-35",
   "theme": "médias",
   "doc1": "La télévision est un outil de communication et de divertissement largement répandu dans notre société moderne. Son influence est incontestable, tant sur les individus que sur la culture en général. Elle permet de diffuser des informations, d'offrir des divertissements variés et de favoriser la diffusion de la culture. La télévision est présente dans de nombreux foyers et constitue une source d'information et de divertissement accessibles à tous. Grâce à sa portée et à sa capacité à toucher un large public, la télévision joue un rôle important dans la transmission des connaissances et la sens",
   "doc2": "La télévision peut également présenter certains inconvénients. Les émissions télévisées peuvent parfois véhiculer des stéréotypes, des préjugés et des valeurs discutables. De plus, le temps passé devant la télévision peut réduire le temps consacré à d'autres activités plus enrichissantes, telles que la lecture, les interactions sociales ou la pratique d'un sport. Il est important de faire preuve de discernement et de réguler l'exposition à la télévision, en particulier pour les enfants, afin de préserver un équilibre sain entre les différentes formes d'apprentissage et de divertissement.",
   "intro": null,
   "doc1_pos": "肯定電視：傳播資訊、提供多元娛樂並推廣文化，普及且人人可及，在知識傳遞上角色重要",
   "doc2_pos": "指出弊端：節目可能傳播刻板印象、偏見與可議的價值觀，也排擠閱讀、社交與運動的時間，兒童尤其需要節制",
   "zh": "電視的影響是好是壞？",
   "tronque": [
    "doc1"
   ],
   "ocr_fix": [
    {
     "from": "La",
     "to": "",
     "why": "引導語被 OCR 字元上限截斷，只剩碎片無資訊，移除以免誤導；原文保留在此欄"
    }
   ],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:356"
  },
  {
   "id": "W-T3-36",
   "theme": "travail",
   "doc1": "Maman d'une petite fille, Anna témoigne : « Lorsque je travaillais 5 jours par semaine, j'utilisais mon temps de repos pour faire des tâches ménagères : rangement, nettoyage, lessives, etc. Je devais aussi faire les courses le samedi, au moment où il y a le plus de monde! Maintenant, j'ai plus de temps libre. Je profite de ma fille et je peux faire des activités qui me plaisent. Je ne voudrais pas travailler de nouveau 5 jours par semaine. »",
   "doc2": "Jack, 45 ans, donne son avis : « La réduction du temps de travail hebdomadaire n'est pas une bonne idée. La quantité de travail ne diminue pas, et le nombre de réunions non plus. On doit donc tout faire plus vite ! Selon moi, cette organisation du temps de travail est beaucoup plus fatigante. La réduction du temps de travail peut avoir des conséquences très négatives. »",
   "intro": "La question de la réduction du temps de travail hebdomadaire fait l'objet d'un débat passionné au sein de notre société. Certains, pensent que cela améliore significativement la qualité de vie, en permettant une meilleure ges",
   "doc1_pos": "有小孩的 Anna 支持：以前休假日都在做家事與人擠人採買，現在有時間陪女兒與做喜歡的事，不想回到一週五天",
   "doc2_pos": "45 歲的 Jack 反對：工作量與會議並不會變少，只是被迫做更快，這種安排其實更累、後果很負面",
   "zh": "該不該縮短每週工時？",
   "tronque": [
    "intro"
   ],
   "ocr_fix": [],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:361"
  },
  {
   "id": "W-T3-37",
   "theme": "sport",
   "doc1": "Yannick: D'après moi, l'État devrait organiser de grands événements sportifs comme les Jeux Olympiques, la Coupe du Monde ou la Coupe d'Afrique. Ces compétitions sont des occasions uniques de mettre en valeur notre culture et d'attirer l'attention du monde entier. Elles favorisent aussi l'économie en créant des emplois et en modernisant les infrastructures, ce qui profite à long terme à toute la population.",
   "doc2": "Karim : Il faut dire que ces grands événements sportifs représentent des dépenses considérables pour l'État. Au lieu d'investir dans des compétitions coûteuses, je pense que les fonds publics devraient être prioritairement alloués à des secteurs essentiels comme la santé et l'éducation. De plus, de nombreux pays ayant accueilli ces événements se sont retrouvés endettés, sans bénéfices réels pour leurs citoyens.",
   "intro": "La question de l'organisation de grands événements sportifs par l'État suscite un débat passionné. Certains voient ces événements comme des opportunités pour valoriser la culture et s",
   "doc1_pos": "Yannick 支持：奧運、世界盃能展現本國文化、吸引世界目光，還能創造就業、更新基礎建設，長期利國",
   "doc2_pos": "Karim 反對：花費龐大，公共經費該優先給醫療與教育；許多主辦國最後負債，人民沒真正得利",
   "zh": "國家該不該辦大型運動賽事？",
   "tronque": [
    "intro"
   ],
   "ocr_fix": [],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:366"
  },
  {
   "id": "W-T3-38",
   "theme": "animaux",
   "doc1": "Le texte affirme que les zoos ont beaucoup d'avantages, même pour les animaux en voie de disparition, les animaux sont bien soignés dans les zoos. Les études montrent que le nombre de reproduction a augmenté grâce aux zoos et ils peuvent sauver la vie des animaux.",
   "doc2": "Le texte a montré qu'il ne faut pas mettre les animaux sauvages dans les zoos parce que ce n'est pas leur environnement. C'est une prison pour eux. On trouve des ours polaires dans un zoo dont la température est de 15 degrés. Les animaux ont besoin de la nature et de la liberté.",
   "intro": "La question des parcs zoologiques fait l'objet d'un débat passionné au sein de notre société. Certains pensent que les zoos offrent de nombreux avantages, notamment pour les animaux en voie de disparition, en les soignant bien et en augmentant leur taux de reproduction. Tandis que d'autres soutiennent que mettre des a",
   "doc1_pos": "支持動物園：對瀕危物種有益，動物受到良好照顧，研究顯示繁殖數量因動物園而增加，能救牠們的命",
   "doc2_pos": "反對動物園：那不是野生動物該待的環境，等同監獄（例如北極熊被養在 15 度的園區），動物需要自然與自由",
   "zh": "動物園該存在嗎？",
   "tronque": [
    "intro"
   ],
   "ocr_fix": [
    {
     "doc": "doc1",
     "from": "le texte affirme",
     "to": "Le texte affirme",
     "why": "句首須大寫"
    },
    {
     "doc": "doc1",
     "from": "les animaux en la voie de disparition",
     "to": "les animaux en voie de disparition",
     "why": "en voie de disparition 為固定片語，不加 la"
    },
    {
     "doc": "doc1",
     "from": "les animaux sont bien soignées",
     "to": "les animaux sont bien soignés",
     "why": "animaux 為陽性複數，過去分詞須用 soignés"
    },
    {
     "doc": "doc2",
     "from": "le texte a montré",
     "to": "Le texte a montré",
     "why": "句首須大寫"
    },
    {
     "doc": "doc2",
     "from": "C'est un prison",
     "to": "C'est une prison",
     "why": "prison 為陰性名詞"
    }
   ],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:371"
  },
  {
   "id": "W-T3-39",
   "theme": "voyage",
   "doc1": "Voyager en solo, c'est aussi avoir l'opportunité de faire le point, de réfléchir, de se retrouver seul avec soi-même. Sans être sans arrêt sollicité par vos collègues, vos amis ou votre famille, vous pourrez faire le plein de temps pour vous et entamer une importante introspection",
   "doc2": "Tous les voyageurs solos ont déjà rencontré quelques difficultés liées à leur situation. Le premier problème, c'est bien sûr la solitude. Car même si votre route sera semée de rencontres multiples, ces dernières seront généralement éphémères, et le poids moral de cette succession de rencontres et d'adieux peut rapidement devenir un fardeau.",
   "intro": "De nos jours, la façon de voyager fait l'objet d'un débat passionné au sein de notre société. Certains trouvent que voyager seul représente un véritable gain de temps et de liberté, tandis que d'autres expriment des réticences, affirmant que les voyageurs",
   "doc1_pos": "挺獨旅：能沉澱、思考、與自己獨處，不被同事朋友家人打斷，有完整時間做深度自省",
   "doc2_pos": "指出難處：最大問題是孤獨，路上雖有很多相遇但都短暫，一再相聚又告別的心理重量很快變成負擔",
   "zh": "一個人旅行好嗎？",
   "tronque": [
    "intro"
   ],
   "ocr_fix": [
    {
     "doc": "doc1",
     "from": "importante introspection CANADA",
     "to": "importante introspection",
     "why": "CANADA 為頁眉浮水印"
    }
   ],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:376"
  },
  {
   "id": "W-T3-40",
   "theme": "alimentation",
   "doc1": "Le végétarisme offre plusieurs bénéfices. Il contribue d'abord à une meilleure santé en réduisant les risques de maladies, telles que les problèmes cardiaques, grâce à la consommation de fruits et de légumes. En outre, il joue un rôle dans la protection de l'environnement en réduisant la pollution liée à la production de viande. Enfin, il permet de respecter les animaux, un principe de plus en plus soutenu par les Européens.",
   "doc2": "Le végétarisme ne convient pas à tout le monde. Certaines personnes ont besoin de viande pour obtenir des nutriments essentiels, comme le fer et les protéines. De plus, les habitudes alimentaires traditionnelles en Europe incluent souvent la viande, ce qui rend ce changement difficile. Enfin, adopter un régime végétarien peut demander plus de temps et de connaissances pour équilibrer",
   "intro": "La question de savoir si le végétarisme est une solution adaptée à tous suscite un débat passionné au sein de notre société. Certains soutiennent que le végétarisme présente de nombreux avantages, tel que la pro",
   "doc1_pos": "挺素食：多吃蔬果能降低心臟病等疾病風險，減少肉品生產的污染以護環境，也體現對動物的尊重",
   "doc2_pos": "反對一體適用：有些人需要肉類補鐵與蛋白質，歐洲傳統飲食本來就常含肉不易改，素食還得花更多時間與知識才能均衡",
   "zh": "素食適合所有人嗎？",
   "tronque": [
    "doc2",
    "intro"
   ],
   "ocr_fix": [],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:381"
  },
  {
   "id": "W-T3-41",
   "theme": "sécurité",
   "doc1": "Avec l'essor des caméras dans les villes, la vidéosurveillance devient de plus en plus courante. Les Français y sont majoritairement favorables, y voyant un moyen d'améliorer la sécurité. Un sondage révèle que 75 % d'entre eux approuvent son déploiement. Toutefois, ils acceptent cette surveillance uniquement dans les lieux publics: rues, magasins, transports en commun. En revanche, ils sont opposés à l'idée d'être observés par leur employeur. En France, la surveillance au travail reste très limitée.",
   "doc2": "D'après plusieurs enquêtes, la vidéosurveillance est onéreuse et son efficacité contestée. Comme les caméras sont visibles, elles ne permettent pas d'empêcher efficacement les délits tels que les vols, les violences urbaines ou la consommation de drogues. De surcroît, leur gestion est complexe : une étude menée en Allemagne indique qu'il faut mobiliser jusqu'à sept personnes pour exploiter les images provenant d'une seule caméra.",
   "intro": "La question de savoir si les caméras de surveillance sont utiles ou excessives suscite un débat passionné au sein de notre société. Certains soutiennent que la vidé",
   "doc1_pos": "呈現民意支持面：法國人 75% 贊成裝設、認為能提升治安，但僅限公共場所；反對被雇主監看，職場監控在法國仍很有限",
   "doc2_pos": "質疑效果：造價高昂、成效受質疑，攝影機顯眼反而擋不住偷竊、暴力與吸毒；管理複雜，德國研究指一台攝影機的影像需動用多達七人",
   "zh": "路口監視器是有用還是過度？",
   "tronque": [
    "intro"
   ],
   "ocr_fix": [],
   "src": "assets/tcf/_analyse/TCF_sujets_ecriture.txt:386"
  }
 ]
};

if (typeof module !== "undefined") module.exports = { TCF_WRITING_SUJETS };
