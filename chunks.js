// 卡片庫 — 自動從 french_notes.html 抽取（phrase-list + 詞彙表，逐列解析）
// 新課筆記加入後要重跑抽取腳本（見 HANDOFF「複習卡系統」）
const CHUNKS = [
 {
  "id": "L1_Bonjour___Bonsoir",
  "lesson": 1,
  "fr": "Bonjour / Bonsoir",
  "zh": "你好（白天）／晚上好",
  "note": ""
 },
 {
  "id": "L1_Salut__",
  "lesson": 1,
  "fr": "Salut !",
  "zh": "嗨！（朋友之間）",
  "note": ""
 },
 {
  "id": "L1__a_va_____Tu_vas_bien__",
  "lesson": 1,
  "fr": "Ça va ? / Tu vas bien ?",
  "zh": "你好嗎？",
  "note": ""
 },
 {
  "id": "L1_Vous_allez_bien__",
  "lesson": 1,
  "fr": "Vous allez bien ?",
  "zh": "您好嗎？（正式）",
  "note": ""
 },
 {
  "id": "L1_Oui__ça_va__merci__Et_to",
  "lesson": 1,
  "fr": "Oui, ça va, merci. Et toi ?",
  "zh": "好，謝謝。你呢？",
  "note": ""
 },
 {
  "id": "L1_Très_bien__merci__Et_vou",
  "lesson": 1,
  "fr": "Très bien, merci. Et vous ?",
  "zh": "很好，謝謝。您呢？（正式）",
  "note": ""
 },
 {
  "id": "L1_Au_revoir_____bientôt",
  "lesson": 1,
  "fr": "Au revoir / À bientôt",
  "zh": "再見／待會見",
  "note": ""
 },
 {
  "id": "L1___demain_____lundi",
  "lesson": 1,
  "fr": "À demain / À lundi",
  "zh": "明天見／星期一見",
  "note": ""
 },
 {
  "id": "L1___plus_____plus_tard",
  "lesson": 1,
  "fr": "À plus / À plus tard",
  "zh": "之後見（不指定時間）／待會見（當天）",
  "note": ""
 },
 {
  "id": "L1_Ciao",
  "lesson": 1,
  "fr": "Ciao",
  "zh": "義大利語借詞，法國人說再見常用",
  "note": ""
 },
 {
  "id": "L1_Bonne_journée__",
  "lesson": 1,
  "fr": "Bonne journée !",
  "zh": "祝你有美好的一天！（對話結束時說，等於 goodbye）",
  "note": ""
 },
 {
  "id": "L1_Bonne_soirée___Bonne_nui",
  "lesson": 1,
  "fr": "Bonne soirée / Bonne nuit",
  "zh": "晚上愉快／晚安",
  "note": ""
 },
 {
  "id": "L1_Comment_ça_s'écrit__",
  "lesson": 1,
  "fr": "Comment ça s'écrit ?",
  "zh": "這怎麼拼／寫？",
  "note": ""
 },
 {
  "id": "L1_Vous_pouvez_répéter__s'i",
  "lesson": 1,
  "fr": "Vous pouvez répéter, s'il vous plaît ?",
  "zh": "可以再說一次嗎？（正式）",
  "note": ""
 },
 {
  "id": "L1_Tu_peux_répéter__",
  "lesson": 1,
  "fr": "Tu peux répéter ?",
  "zh": "可以再說一次嗎？（朋友）",
  "note": ""
 },
 {
  "id": "L1_Je_ne_comprends_pas_",
  "lesson": 1,
  "fr": "Je ne comprends pas.",
  "zh": "我聽不懂。",
  "note": ""
 },
 {
  "id": "L1_Comment_on_dit__en_franç",
  "lesson": 1,
  "fr": "Comment on dit… en français ?",
  "zh": "……用法文怎麼說？",
  "note": ""
 },
 {
  "id": "L1_Excusez_moi__je_suis_en_",
  "lesson": 1,
  "fr": "Excusez-moi, je suis en retard.",
  "zh": "對不起，我遲到了。",
  "note": ""
 },
 {
  "id": "L1_S'il_vous_plaît___S'il_t",
  "lesson": 1,
  "fr": "S'il vous plaît / S'il te plaît",
  "zh": "請（正式／朋友）",
  "note": ""
 },
 {
  "id": "L1_Pardon____Excusez_moi___",
  "lesson": 1,
  "fr": "Pardon. / Excusez-moi. / Excuse-moi.",
  "zh": "不好意思 / 對不起（正式／朋友）",
  "note": ""
 },
 {
  "id": "L1_Je___Moi",
  "lesson": 1,
  "fr": "Je → Moi",
  "zh": "我（強調）",
  "note": ""
 },
 {
  "id": "L1_Tu___Toi",
  "lesson": 1,
  "fr": "Tu → Toi",
  "zh": "你（強調）",
  "note": ""
 },
 {
  "id": "L1_Vous___Vous",
  "lesson": 1,
  "fr": "Vous → Vous",
  "zh": "您／你們（不變）",
  "note": ""
 },
 {
  "id": "L1_Je_suis_taïwanais___taïw",
  "lesson": 1,
  "fr": "Je suis taïwanais / taïwanaise.",
  "zh": "我是台灣人。（男／女）",
  "note": ""
 },
 {
  "id": "L1_Tu_es_français__",
  "lesson": 1,
  "fr": "Tu es français ?",
  "zh": "你是法國人嗎？",
  "note": ""
 },
 {
  "id": "L1_Non__je_suis_suisse_",
  "lesson": 1,
  "fr": "Non, je suis suisse.",
  "zh": "不，我是瑞士人。",
  "note": ""
 },
 {
  "id": "L1_Elle_s'appelle_Jolie__El",
  "lesson": 1,
  "fr": "Elle s'appelle Jolie. Elle est japonaise.",
  "zh": "她叫 Jolie，她是日本人。",
  "note": ""
 },
 {
  "id": "L1_Nous_sommes_taïwanais___",
  "lesson": 1,
  "fr": "Nous sommes taïwanais / taïwanaises.",
  "zh": "我們是台灣人。（複數男／女）",
  "note": ""
 },
 {
  "id": "L1_Aujourd'hui__c'est_le_ma",
  "lesson": 1,
  "fr": "Aujourd'hui, c'est le mardi 12 mai 2026.",
  "zh": "今天是2026年5月12日，星期二。",
  "note": ""
 },
 {
  "id": "L1_Demain__c'est_mercredi_",
  "lesson": 1,
  "fr": "Demain, c'est mercredi.",
  "zh": "明天是星期三。",
  "note": ""
 },
 {
  "id": "L1_Mon_anniversaire__c'est_",
  "lesson": 1,
  "fr": "Mon anniversaire, c'est le 4 juin.",
  "zh": "我的生日是6月4日。",
  "note": ""
 },
 {
  "id": "L1_La_fête_nationale__c'est",
  "lesson": 1,
  "fr": "La fête nationale, c'est le 14 juillet.",
  "zh": "法國國慶日是7月14日。",
  "note": ""
 },
 {
  "id": "L1_Le_premier_mai__c'est_la",
  "lesson": 1,
  "fr": "Le premier mai, c'est la fête du Travail.",
  "zh": "5月1日是勞動節。",
  "note": ""
 },
 {
  "id": "L2_le_sport",
  "lesson": 2,
  "fr": "le sport",
  "zh": "運動（陽性）",
  "note": ""
 },
 {
  "id": "L2_le_cinéma",
  "lesson": 2,
  "fr": "le cinéma",
  "zh": "電影（陽性）",
  "note": ""
 },
 {
  "id": "L2_le_café",
  "lesson": 2,
  "fr": "le café",
  "zh": "咖啡（陽性，-é 非一般陰性 -e）",
  "note": ""
 },
 {
  "id": "L2_la_musique",
  "lesson": 2,
  "fr": "la musique",
  "zh": "音樂（陰性）",
  "note": ""
 },
 {
  "id": "L2_la_ville",
  "lesson": 2,
  "fr": "la ville",
  "zh": "城市（陰性）",
  "note": ""
 },
 {
  "id": "L2_l'histoire",
  "lesson": 2,
  "fr": "l'histoire",
  "zh": "歷史（陰性，母音開頭）",
  "note": ""
 },
 {
  "id": "L2_l'art",
  "lesson": 2,
  "fr": "l'art",
  "zh": "藝術（陽性，母音開頭）",
  "note": ""
 },
 {
  "id": "L2_les_amis",
  "lesson": 2,
  "fr": "les amis",
  "zh": "朋友們（複數）",
  "note": ""
 },
 {
  "id": "L2_un_appartement",
  "lesson": 2,
  "fr": "un appartement",
  "zh": "一間公寓",
  "note": ""
 },
 {
  "id": "L2_une_ville",
  "lesson": 2,
  "fr": "une ville",
  "zh": "一座城市",
  "note": ""
 },
 {
  "id": "L2_des_amis",
  "lesson": 2,
  "fr": "des amis",
  "zh": "一些朋友",
  "note": ""
 },
 {
  "id": "L2_le_chien",
  "lesson": 2,
  "fr": "le chien",
  "zh": "那隻狗（特定，彼此知道是哪隻）",
  "note": ""
 },
 {
  "id": "L2_un_chien",
  "lesson": 2,
  "fr": "un chien",
  "zh": "一隻狗（泛指）",
  "note": ""
 },
 {
  "id": "L2_en_France___en_Italie___",
  "lesson": 2,
  "fr": "en France / en Italie / en Chine",
  "zh": "在／去法國、義大利、中國（陰性）",
  "note": ""
 },
 {
  "id": "L2_au_Canada___au_Mexique__",
  "lesson": 2,
  "fr": "au Canada / au Mexique / au Brésil",
  "zh": "在／去加拿大、墨西哥、巴西（陽性）",
  "note": ""
 },
 {
  "id": "L2_aux__tats_Unis___aux_Pay",
  "lesson": 2,
  "fr": "aux États-Unis / aux Pays-Bas",
  "zh": "在／去美國、荷蘭（複數）",
  "note": ""
 },
 {
  "id": "L2_à_Paris___à_Lyon___à_Tai",
  "lesson": 2,
  "fr": "à Paris / à Lyon / à Taipei",
  "zh": "在／去巴黎、里昂、台北（城市）",
  "note": ""
 },
 {
  "id": "L2_à_Taiwan",
  "lesson": 2,
  "fr": "à Taiwan",
  "zh": "在／去台灣（例外：島嶼，無性別）",
  "note": ""
 },
 {
  "id": "L2_Tu_habites_dans_quelle_v",
  "lesson": 2,
  "fr": "Tu habites dans quelle ville ?",
  "zh": "你住在哪個城市？",
  "note": ""
 },
 {
  "id": "L2_Tu_parles_quelle_langue_",
  "lesson": 2,
  "fr": "Tu parles quelle langue ?",
  "zh": "你說什麼語言？",
  "note": ""
 },
 {
  "id": "L2_Quel_âge_as_tu__",
  "lesson": 2,
  "fr": "Quel âge as-tu ?",
  "zh": "你幾歲？",
  "note": ""
 },
 {
  "id": "L2_Tu_aimes_quelle_musique_",
  "lesson": 2,
  "fr": "Tu aimes quelle musique ?",
  "zh": "你喜歡什麼音樂？",
  "note": ""
 },
 {
  "id": "L2_l'art__m_",
  "lesson": 2,
  "fr": "l'art (m)",
  "zh": "藝術",
  "note": ""
 },
 {
  "id": "L2_le_cinéma__m_",
  "lesson": 2,
  "fr": "le cinéma (m)",
  "zh": "電影",
  "note": ""
 },
 {
  "id": "L2_la_musique__f_",
  "lesson": 2,
  "fr": "la musique (f)",
  "zh": "音樂",
  "note": ""
 },
 {
  "id": "L2_le_sport__m_",
  "lesson": 2,
  "fr": "le sport (m)",
  "zh": "運動",
  "note": ""
 },
 {
  "id": "L2_les_langues__f_pl_",
  "lesson": 2,
  "fr": "les langues (f.pl)",
  "zh": "語言",
  "note": ""
 },
 {
  "id": "L2_la_bande_dessinée__f_",
  "lesson": 2,
  "fr": "la bande dessinée (f)",
  "zh": "法式漫畫（BD）",
  "note": ""
 },
 {
  "id": "L2_la_librairie__f_",
  "lesson": 2,
  "fr": "la librairie (f)",
  "zh": "書店 ⚠️（不是圖書館！）",
  "note": ""
 },
 {
  "id": "L2_la_bibliothèque__f_",
  "lesson": 2,
  "fr": "la bibliothèque (f)",
  "zh": "圖書館",
  "note": ""
 },
 {
  "id": "L2_la_rue__f_",
  "lesson": 2,
  "fr": "la rue (f)",
  "zh": "街道",
  "note": ""
 },
 {
  "id": "L2_le_quartier__m_",
  "lesson": 2,
  "fr": "le quartier (m)",
  "zh": "街區、社區",
  "note": ""
 },
 {
  "id": "L2_sympa",
  "lesson": 2,
  "fr": "sympa",
  "zh": "不錯、友善（sympathique 的縮寫，口語）",
  "note": ""
 },
 {
  "id": "L2_Emma",
  "lesson": 2,
  "fr": "Emma",
  "zh": "雙 m 要念清楚 [ɛ-ma]，不能輕音帶過",
  "note": ""
 },
 {
  "id": "L2_les_z'_tats_Unis",
  "lesson": 2,
  "fr": "les z'États-Unis",
  "zh": "liaison：les 的 s 遇母音開頭要連音，不能分開念",
  "note": ""
 },
 {
  "id": "L2_Sénégalais___Sénégalaise",
  "lesson": 2,
  "fr": "Sénégalais / Sénégalaise",
  "zh": "[se-ne-ga-lɛ/lɛz]，記憶：「賽內街」",
  "note": ""
 },
 {
  "id": "L2_quatre_vingts",
  "lesson": 2,
  "fr": "quatre-vingts",
  "zh": "[katʁə.vɛ̃]，老師確認這是難點，多練習",
  "note": ""
 },
 {
  "id": "L2_J'aime_aller_en_France_",
  "lesson": 2,
  "fr": "J'aime aller en France.",
  "zh": "兩動詞連用：第一個變位，第二個用原形不變（aller 不加 s/e）",
  "note": ""
 },
 {
  "id": "L2_On_habite_à_Lyon_",
  "lesson": 2,
  "fr": "On habite à Lyon.",
  "zh": "on = nous（口語），但動詞變位同 il/elle → habite，不是 habitons",
  "note": ""
 },
 {
  "id": "L2_quel___quelle___quels___",
  "lesson": 2,
  "fr": "quel / quelle / quels / quelles",
  "zh": "四種寫法發音完全相同 [kɛl]，依名詞性別與單複數選",
  "note": ""
 },
 {
  "id": "L2_la_librairie___library",
  "lesson": 2,
  "fr": "la librairie ≠ library",
  "zh": "假朋友！librairie = 書店；圖書館 = bibliothèque",
  "note": ""
 },
 {
  "id": "L2_______quatre_virgule_hui",
  "lesson": 2,
  "fr": "4,8 → quatre virgule huit",
  "zh": "法文小數用 virgule（逗號），不用 point（句點）",
  "note": ""
 },
 {
  "id": "L2_______________",
  "lesson": 2,
  "fr": "06 89 34 72 51",
  "zh": "電話號碼兩位兩位念，念成一位一位對方會聽不懂",
  "note": ""
 },
 {
  "id": "L2_septante___huitante___no",
  "lesson": 2,
  "fr": "septante / huitante / nonante",
  "zh": "比利時/瑞士的 70/80/90，比法國規律，考試不考但聽得懂即可",
  "note": ""
 },
 {
  "id": "L2_Qui__",
  "lesson": 2,
  "fr": "Qui ?",
  "zh": "誰？Who?",
  "note": ""
 },
 {
  "id": "L2_Où__",
  "lesson": 2,
  "fr": "Où ?",
  "zh": "在哪裡？Where?",
  "note": ""
 },
 {
  "id": "L2_Pourquoi__",
  "lesson": 2,
  "fr": "Pourquoi ?",
  "zh": "為什麼？Why? → 回答用 parce que（因為）",
  "note": ""
 },
 {
  "id": "L2_Comment__",
  "lesson": 2,
  "fr": "Comment ?",
  "zh": "怎麼？How?",
  "note": ""
 },
 {
  "id": "L2_Combien__",
  "lesson": 2,
  "fr": "Combien ?",
  "zh": "多少（數量）？How many / How much?",
  "note": ""
 },
 {
  "id": "L2_Qu'est_ce_que__",
  "lesson": 2,
  "fr": "Qu'est-ce que ?",
  "zh": "什麼？What?（主詞後接動詞）",
  "note": ""
 },
 {
  "id": "L2_Quel___Quelle__",
  "lesson": 2,
  "fr": "Quel / Quelle ?",
  "zh": "哪個？（接名詞，隨性別變化）→ 見第2課冠詞區塊",
  "note": ""
 },
 {
  "id": "L2_Qui_est_ce_____C'est_qui",
  "lesson": 2,
  "fr": "Qui est-ce ? / C'est qui ?",
  "zh": "這是誰？",
  "note": ""
 },
 {
  "id": "L2_Tu_habites_où__",
  "lesson": 2,
  "fr": "Tu habites où ?",
  "zh": "你住在哪裡？",
  "note": ""
 },
 {
  "id": "L2_Pourquoi_tu_aimes_le_spo",
  "lesson": 2,
  "fr": "Pourquoi tu aimes le sport ?",
  "zh": "你為什麼喜歡運動？",
  "note": ""
 },
 {
  "id": "L2_Parce_que_c'est_sympa__",
  "lesson": 2,
  "fr": "Parce que c'est sympa !",
  "zh": "因為很好玩！",
  "note": ""
 },
 {
  "id": "L2_Combien_de_langues_tu_pa",
  "lesson": 2,
  "fr": "Combien de langues tu parles ?",
  "zh": "你說幾種語言？",
  "note": ""
 },
 {
  "id": "L2_la_France__l'Italie__la_",
  "lesson": 2,
  "fr": "la France, l'Italie, la Suisse, la Chine",
  "zh": "字尾 -e → 陰性（en）",
  "note": ""
 },
 {
  "id": "L2_le_Canada__le_Brésil__le",
  "lesson": 2,
  "fr": "le Canada, le Brésil, le Japon",
  "zh": "字尾子音 → 陽性（au）",
  "note": ""
 },
 {
  "id": "L2_le_Mexique",
  "lesson": 2,
  "fr": "le Mexique",
  "zh": "⚠️ 例外：字尾 -e 但陽性 → au Mexique",
  "note": ""
 },
 {
  "id": "L2_les__tats_Unis__les_Pays",
  "lesson": 2,
  "fr": "les États-Unis, les Pays-Bas, les Philippines",
  "zh": "複數 → aux",
  "note": ""
 },
 {
  "id": "L2_Taiwan__Chypre",
  "lesson": 2,
  "fr": "Taiwan, Chypre",
  "zh": "島嶼無性別 → à Taiwan（同城市）",
  "note": ""
 },
 {
  "id": "L2_Je_parle_chinois__taïwan",
  "lesson": 2,
  "fr": "Je parle chinois, taïwanais et anglais.",
  "zh": "我說中文、台語和英文。",
  "note": ""
 },
 {
  "id": "L2_Il_parle_français_et_esp",
  "lesson": 2,
  "fr": "Il parle français et espagnol.",
  "zh": "他說法文和西班牙文。",
  "note": ""
 },
 {
  "id": "L2_Je_m'appelle_Emma__je_su",
  "lesson": 2,
  "fr": "Je m'appelle Emma, je suis brésilienne et j'aime le cinéma.",
  "zh": "我叫 Emma，我是巴西人，我喜歡電影。",
  "note": ""
 },
 {
  "id": "L2_Elle_s'appelle_Sanae__el",
  "lesson": 2,
  "fr": "Elle s'appelle Sanae, elle est japonaise et elle aime l'art.",
  "zh": "她叫 Sanae，她是日本人，她喜歡藝術。",
  "note": ""
 },
 {
  "id": "L2_Tu_es_chinois_et_tu_aime",
  "lesson": 2,
  "fr": "Tu es chinois et tu aimes le sport.",
  "zh": "你是中國人，你喜歡運動。",
  "note": ""
 },
 {
  "id": "L2_Il_est_suisse_et_il_aime",
  "lesson": 2,
  "fr": "Il est suisse et il aime les langues.",
  "zh": "他是瑞士人，他喜歡語言。",
  "note": ""
 },
 {
  "id": "L2_Je_suis_sénégalaise_et_j",
  "lesson": 2,
  "fr": "Je suis sénégalaise et j'aime la musique.",
  "zh": "我是塞內加爾人，我喜歡音樂。",
  "note": ""
 },
 {
  "id": "L3_l'appartement__m__",
  "lesson": 3,
  "fr": "l'appartement (m.)",
  "zh": "公寓",
  "note": ""
 },
 {
  "id": "L3_la_maison",
  "lesson": 3,
  "fr": "la maison",
  "zh": "房子（獨棟）",
  "note": ""
 },
 {
  "id": "L3_la_mer",
  "lesson": 3,
  "fr": "la mer",
  "zh": "海（非大洋）",
  "note": ""
 },
 {
  "id": "L3_la_plage",
  "lesson": 3,
  "fr": "la plage",
  "zh": "沙灘",
  "note": ""
 },
 {
  "id": "L3_le_quartier",
  "lesson": 3,
  "fr": "le quartier",
  "zh": "街區、鄰里",
  "note": ""
 },
 {
  "id": "L3_la_rue",
  "lesson": 3,
  "fr": "la rue",
  "zh": "街道",
  "note": ""
 },
 {
  "id": "L3_l'université__f__",
  "lesson": 3,
  "fr": "l'université (f.)",
  "zh": "大學",
  "note": ""
 },
 {
  "id": "L3_le_colocataire___la_colo",
  "lesson": 3,
  "fr": "le colocataire / la colocataire",
  "zh": "室友（共租）",
  "note": ""
 },
 {
  "id": "L3_le_locataire___la_locata",
  "lesson": 3,
  "fr": "le locataire / la locataire",
  "zh": "房客（租屋者）",
  "note": ""
 },
 {
  "id": "L3_J'adore_le_cinéma____",
  "lesson": 3,
  "fr": "J'adore le cinéma. ❤❤",
  "zh": "我超愛電影（最強）",
  "note": ""
 },
 {
  "id": "L3_J'aime_le_sport___",
  "lesson": 3,
  "fr": "J'aime le sport. ❤",
  "zh": "我喜歡運動",
  "note": ""
 },
 {
  "id": "L3_Je_n'aime_pas_la_danse_",
  "lesson": 3,
  "fr": "Je n'aime pas la danse.",
  "zh": "我不喜歡跳舞",
  "note": ""
 },
 {
  "id": "L3_Je_n'adore_pas_",
  "lesson": 3,
  "fr": "Je n'adore pas.",
  "zh": "我不是很愛（還可以接受）",
  "note": ""
 },
 {
  "id": "L3_Elle_déteste_skier____",
  "lesson": 3,
  "fr": "Elle déteste skier. ✗✗",
  "zh": "她討厭滑雪（最強厭惡）",
  "note": ""
 },
 {
  "id": "L3_Je_ne_suis_pas_fort_e__e",
  "lesson": 3,
  "fr": "Je ne suis pas fort(e) en natation.",
  "zh": "我游泳不太行",
  "note": ""
 },
 {
  "id": "L3_la_danse___danser",
  "lesson": 3,
  "fr": "la danse / danser",
  "zh": "舞蹈／跳舞",
  "note": ""
 },
 {
  "id": "L3_la_natation___nager",
  "lesson": 3,
  "fr": "la natation / nager",
  "zh": "游泳（名詞／動詞）",
  "note": ""
 },
 {
  "id": "L3_le_ski___skier",
  "lesson": 3,
  "fr": "le ski / skier",
  "zh": "滑雪（名詞／動詞）",
  "note": ""
 },
 {
  "id": "L3_la_marche___marcher",
  "lesson": 3,
  "fr": "la marche / marcher",
  "zh": "步行（名詞／動詞）",
  "note": ""
 },
 {
  "id": "L3_le_basket___le_foot",
  "lesson": 3,
  "fr": "le basket / le foot",
  "zh": "籃球／足球",
  "note": ""
 },
 {
  "id": "L3_la_guitare",
  "lesson": 3,
  "fr": "la guitare",
  "zh": "吉他（f.）",
  "note": ""
 },
 {
  "id": "L3_le_piano",
  "lesson": 3,
  "fr": "le piano",
  "zh": "鋼琴（m.）",
  "note": ""
 },
 {
  "id": "L3_le_violon",
  "lesson": 3,
  "fr": "le violon",
  "zh": "小提琴（m.）",
  "note": ""
 },
 {
  "id": "L3_le_tambour",
  "lesson": 3,
  "fr": "le tambour",
  "zh": "鼓（m.）",
  "note": ""
 },
 {
  "id": "L3_la_batterie",
  "lesson": 3,
  "fr": "la batterie",
  "zh": "爵士鼓組（f.）",
  "note": ""
 },
 {
  "id": "L3_la_place__de_cinéma_",
  "lesson": 3,
  "fr": "la place (de cinéma)",
  "zh": "電影票（一張位子）",
  "note": ""
 },
 {
  "id": "L3_les_grands_parents",
  "lesson": 3,
  "fr": "les grands-parents",
  "zh": "祖父母／外祖父母",
  "note": ""
 },
 {
  "id": "L3_la_grand_mère__mamie_",
  "lesson": 3,
  "fr": "la grand-mère (mamie)",
  "zh": "奶奶／外婆（mamie 暱稱）",
  "note": ""
 },
 {
  "id": "L3_le_grand_père__papi_",
  "lesson": 3,
  "fr": "le grand-père (papi)",
  "zh": "爺爺／外公（papi 暱稱）",
  "note": ""
 },
 {
  "id": "L3_la_mère__maman_",
  "lesson": 3,
  "fr": "la mère (maman)",
  "zh": "媽媽（maman 直接稱呼時用）",
  "note": ""
 },
 {
  "id": "L3_le_père__papa_",
  "lesson": 3,
  "fr": "le père (papa)",
  "zh": "爸爸（papa 直接稱呼時用）",
  "note": ""
 },
 {
  "id": "L3_le_fils___la_fille",
  "lesson": 3,
  "fr": "le fils / la fille",
  "zh": "兒子／女兒",
  "note": ""
 },
 {
  "id": "L3_le_fils_unique___la_fill",
  "lesson": 3,
  "fr": "le fils unique / la fille unique",
  "zh": "獨生子／獨生女",
  "note": ""
 },
 {
  "id": "L3_le_frère___la_s_ur",
  "lesson": 3,
  "fr": "le frère / la sœur",
  "zh": "兄弟／姐妹",
  "note": ""
 },
 {
  "id": "L3_les_petits_enfants",
  "lesson": 3,
  "fr": "les petits-enfants",
  "zh": "孫子女",
  "note": ""
 },
 {
  "id": "L3_le_petit_fils___la_petit",
  "lesson": 3,
  "fr": "le petit-fils / la petite-fille",
  "zh": "孫子／孫女",
  "note": ""
 },
 {
  "id": "L3_l'oncle__m_____la_tante",
  "lesson": 3,
  "fr": "l'oncle (m.) / la tante",
  "zh": "伯叔舅（通用）／姑阿姨（通用）",
  "note": ""
 },
 {
  "id": "L3_le_cousin___la_cousine",
  "lesson": 3,
  "fr": "le cousin / la cousine",
  "zh": "表兄弟／表姐妹（不分父系母系）",
  "note": ""
 },
 {
  "id": "L3_le_neveu___la_nièce",
  "lesson": 3,
  "fr": "le neveu / la nièce",
  "zh": "姪子／姪女（兄弟姐妹之子女）",
  "note": ""
 },
 {
  "id": "L3_le_mari___la_femme",
  "lesson": 3,
  "fr": "le mari / la femme",
  "zh": "丈夫／妻子（femme 也是「女人」）",
  "note": ""
 },
 {
  "id": "L3_la_belle_mère___le_beau_",
  "lesson": 3,
  "fr": "la belle-mère / le beau-père",
  "zh": "婆婆∕岳母 ／ 公公∕岳父",
  "note": ""
 },
 {
  "id": "L3_la_belle_s_ur___le_beau_",
  "lesson": 3,
  "fr": "la belle-sœur / le beau-frère",
  "zh": "嫂嫂∕弟媳∕大姑等 ／ 大伯∕小叔等",
  "note": ""
 },
 {
  "id": "L3_être_marié_e____célibata",
  "lesson": 3,
  "fr": "être marié(e) / célibataire",
  "zh": "已婚／單身",
  "note": ""
 },
 {
  "id": "L3_mon_frère__sa_femme_et_s",
  "lesson": 3,
  "fr": "mon frère, sa femme et ses enfants",
  "zh": "我弟弟、他的太太和他的孩子們",
  "note": ""
 },
 {
  "id": "L3_Sophia_et_son_mari",
  "lesson": 3,
  "fr": "Sophia et son mari",
  "zh": "Sophia 和她的丈夫",
  "note": ""
 },
 {
  "id": "L3_nos_amis_Robin_et_Aya",
  "lesson": 3,
  "fr": "nos amis Robin et Aya",
  "zh": "我們的朋友 Robin 和 Aya",
  "note": ""
 },
 {
  "id": "L3_l'ami_de_mon_père",
  "lesson": 3,
  "fr": "l'ami de mon père",
  "zh": "我爸爸的朋友（de = 的）",
  "note": ""
 },
 {
  "id": "L3_J'ai_un_oncle__Il_a____a",
  "lesson": 3,
  "fr": "J'ai un oncle. Il a 48 ans.",
  "zh": "我有一個叔叔，他48歲",
  "note": ""
 },
 {
  "id": "L3_Ses_neveux_adorent_les_e",
  "lesson": 3,
  "fr": "Ses neveux adorent les enfants de Clara.",
  "zh": "他的姪子們很喜歡Clara的孩子",
  "note": ""
 },
 {
  "id": "L3_Notre_fille_déteste_le_s",
  "lesson": 3,
  "fr": "Notre fille déteste le sport.",
  "zh": "我們的女兒討厭運動",
  "note": ""
 },
 {
  "id": "L3_acteur___actrice",
  "lesson": 3,
  "fr": "acteur / actrice",
  "zh": "演員",
  "note": ""
 },
 {
  "id": "L3_coiffeur___coiffeuse",
  "lesson": 3,
  "fr": "coiffeur / coiffeuse",
  "zh": "美髮師",
  "note": ""
 },
 {
  "id": "L3_traducteur___traductrice",
  "lesson": 3,
  "fr": "traducteur / traductrice",
  "zh": "翻譯",
  "note": ""
 },
 {
  "id": "L3_facteur___factrice",
  "lesson": 3,
  "fr": "facteur / factrice",
  "zh": "郵差",
  "note": ""
 },
 {
  "id": "L3_informaticien___informat",
  "lesson": 3,
  "fr": "informaticien / informaticienne",
  "zh": "資訊人員",
  "note": ""
 },
 {
  "id": "L3_infirmier___infirmière",
  "lesson": 3,
  "fr": "infirmier / infirmière",
  "zh": "護理師",
  "note": ""
 },
 {
  "id": "L3_étudiant___étudiante",
  "lesson": 3,
  "fr": "étudiant / étudiante",
  "zh": "學生",
  "note": ""
 },
 {
  "id": "L3_professeur___professeure",
  "lesson": 3,
  "fr": "professeur / professeure",
  "zh": "老師",
  "note": ""
 },
 {
  "id": "L3_fleuriste",
  "lesson": 3,
  "fr": "fleuriste",
  "zh": "花店老闆（陰陽同形）",
  "note": ""
 },
 {
  "id": "L3_le_marché",
  "lesson": 3,
  "fr": "le marché",
  "zh": "市場",
  "note": ""
 },
 {
  "id": "L3_le_supermarché",
  "lesson": 3,
  "fr": "le supermarché",
  "zh": "超市（super = 大型）",
  "note": ""
 },
 {
  "id": "L3_l'hypermarché",
  "lesson": 3,
  "fr": "l'hypermarché",
  "zh": "大賣場（hyper = 超大型）",
  "note": ""
 },
 {
  "id": "L3_Je_prépare_la_liste_des_",
  "lesson": 3,
  "fr": "Je prépare la liste des invités pour notre mariage.",
  "zh": "我在準備我們婚禮的賓客名單。",
  "note": ""
 },
 {
  "id": "L3_J'invite_mes_parents__ma",
  "lesson": 3,
  "fr": "J'invite mes parents, ma grand-mère.",
  "zh": "我邀請我的父母、我的奶奶。",
  "note": ""
 },
 {
  "id": "L3_Mon_frère__sa_femme_et_s",
  "lesson": 3,
  "fr": "Mon frère, sa femme et ses enfants.",
  "zh": "我弟弟、他的妻子和他的孩子們。",
  "note": ""
 },
 {
  "id": "L3_Nos_amis_Robin_et_Aya_",
  "lesson": 3,
  "fr": "Nos amis Robin et Aya.",
  "zh": "我們的朋友 Robin 和 Aya。",
  "note": ""
 },
 {
  "id": "L3_Monsieur_Bertoli__l'ami_",
  "lesson": 3,
  "fr": "Monsieur Bertoli, l'ami de mon père.",
  "zh": "Bertoli 先生，我爸爸的朋友。",
  "note": ""
 },
 {
  "id": "L3_Son_petit_fils_a_deux_mo",
  "lesson": 3,
  "fr": "Son petit-fils a deux mois.",
  "zh": "他的孫子兩個月大。",
  "note": ""
 },
 {
  "id": "L3__e",
  "lesson": 3,
  "fr": "-e",
  "zh": "-e（不變）",
  "note": "fleuriste"
 },
 {
  "id": "L4_célibataire",
  "lesson": 4,
  "fr": "célibataire",
  "zh": "單身（官方文件用語，不等於「沒有伴侶」）",
  "note": ""
 },
 {
  "id": "L4_en_couple",
  "lesson": 4,
  "fr": "en couple",
  "zh": "有伴侶（口語）",
  "note": ""
 },
 {
  "id": "L4_se_marier",
  "lesson": 4,
  "fr": "se marier",
  "zh": "結婚（動詞）",
  "note": ""
 },
 {
  "id": "L4_le_mariage",
  "lesson": 4,
  "fr": "le mariage",
  "zh": "婚禮 / 婚姻（名詞）",
  "note": ""
 },
 {
  "id": "L4_le_mari___la_femme",
  "lesson": 4,
  "fr": "le mari / la femme",
  "zh": "丈夫 / 妻子（婚後稱謂）",
  "note": ""
 },
 {
  "id": "L4_le_marié___la_mariée",
  "lesson": 4,
  "fr": "le marié / la mariée",
  "zh": "新郎 / 新娘（婚禮當天）",
  "note": ""
 },
 {
  "id": "L4_le_petit_ami___la_petite",
  "lesson": 4,
  "fr": "le petit ami / la petite amie",
  "zh": "男友 / 女友",
  "note": ""
 },
 {
  "id": "L4_le_petit_copain___la_pet",
  "lesson": 4,
  "fr": "le petit copain / la petite copine",
  "zh": "男友 / 女友（口語，同義）",
  "note": ""
 },
 {
  "id": "L4_le_collège___collégien__",
  "lesson": 4,
  "fr": "le collège → collégien / collégienne",
  "zh": "國中（約12–15歲）",
  "note": ""
 },
 {
  "id": "L4_le_lycée___lycéen___lycé",
  "lesson": 4,
  "fr": "le lycée → lycéen / lycéenne",
  "zh": "高中（約15–18歲）",
  "note": ""
 },
 {
  "id": "L4_l'université___étudiant_",
  "lesson": 4,
  "fr": "l'université → étudiant / étudiante",
  "zh": "大學生",
  "note": ""
 },
 {
  "id": "L4_la_boulangerie___le_boul",
  "lesson": 4,
  "fr": "la boulangerie / le boulanger, la boulangère",
  "zh": "麵包店 / 麵包師",
  "note": ""
 },
 {
  "id": "L4_la_boucherie___le_bouche",
  "lesson": 4,
  "fr": "la boucherie / le boucher, la bouchère",
  "zh": "肉店 / 肉販",
  "note": ""
 },
 {
  "id": "L4_la_fromagerie___le_froma",
  "lesson": 4,
  "fr": "la fromagerie / le fromager, la fromagère",
  "zh": "起司店 / 起司師",
  "note": ""
 },
 {
  "id": "L4_la_poissonnerie___le_poi",
  "lesson": 4,
  "fr": "la poissonnerie / le poissonnier, la poissonnière",
  "zh": "魚店 / 魚販",
  "note": ""
 },
 {
  "id": "L4_l'épicerie__f_____l'épic",
  "lesson": 4,
  "fr": "l'épicerie (f.) / l'épicier, l'épicière",
  "zh": "雜貨店 / 雜貨商",
  "note": ""
 },
 {
  "id": "L4_le_marché",
  "lesson": 4,
  "fr": "le marché",
  "zh": "市場（週末去市場買新鮮食材）",
  "note": ""
 },
 {
  "id": "L4_le_supermarché",
  "lesson": 4,
  "fr": "le supermarché",
  "zh": "超市",
  "note": ""
 },
 {
  "id": "L4_les_caisses_automatiques",
  "lesson": 4,
  "fr": "les caisses automatiques (f.pl.)",
  "zh": "自動結帳機",
  "note": ""
 },
 {
  "id": "L4_les_céréales__f_pl_____l",
  "lesson": 4,
  "fr": "les céréales (f.pl.) : la farine, les pâtes (f.pl.), le riz",
  "zh": "穀物：麵粉、義大利麵、米飯",
  "note": ""
 },
 {
  "id": "L4_l'huile_d'olive__f__",
  "lesson": 4,
  "fr": "l'huile d'olive (f.)",
  "zh": "橄欖油",
  "note": ""
 },
 {
  "id": "L4_l'_uf__m_____des__ufs",
  "lesson": 4,
  "fr": "l'œuf (m.) → des œufs",
  "zh": "雞蛋（複數：des œufs）",
  "note": ""
 },
 {
  "id": "L4_le_poisson___le_poulet__",
  "lesson": 4,
  "fr": "le poisson / le poulet / la viande",
  "zh": "魚 / 雞肉 / 肉類",
  "note": ""
 },
 {
  "id": "L4_une_boîte_de_thon",
  "lesson": 4,
  "fr": "une boîte de thon",
  "zh": "一罐鮪魚",
  "note": ""
 },
 {
  "id": "L4_une_bouteille_de_jus_de_",
  "lesson": 4,
  "fr": "une bouteille de jus de pommes",
  "zh": "一瓶蘋果汁（de = 由…做成）",
  "note": ""
 },
 {
  "id": "L4_un_kilo_de_pommes",
  "lesson": 4,
  "fr": "un kilo de pommes",
  "zh": "一公斤蘋果",
  "note": ""
 },
 {
  "id": "L4_un_panier_de_légumes",
  "lesson": 4,
  "fr": "un panier de légumes",
  "zh": "一籃蔬菜",
  "note": ""
 },
 {
  "id": "L4_un_paquet_de_pâtes",
  "lesson": 4,
  "fr": "un paquet de pâtes",
  "zh": "一包義大利麵",
  "note": ""
 },
 {
  "id": "L4_un_pot_de_crème",
  "lesson": 4,
  "fr": "un pot de crème",
  "zh": "一罐鮮奶油",
  "note": ""
 },
 {
  "id": "L4_Je_voudrais_une_baguette",
  "lesson": 4,
  "fr": "Je voudrais une baguette, s'il vous plaît.",
  "zh": "我想要一條法棍，謝謝。（voudrais = vouloir 的條件式，比 je veux 有禮貌）",
  "note": ""
 },
 {
  "id": "L4_C'est_à_qui__",
  "lesson": 4,
  "fr": "C'est à qui ?",
  "zh": "輪到誰了？（商店常用）",
  "note": ""
 },
 {
  "id": "L4_Ce_sera_tout__",
  "lesson": 4,
  "fr": "Ce sera tout ?",
  "zh": "就這樣嗎？（店員問顧客）",
  "note": ""
 },
 {
  "id": "L4_Oui__ce_sera_tout_",
  "lesson": 4,
  "fr": "Oui, ce sera tout.",
  "zh": "是的，就這樣。",
  "note": ""
 },
 {
  "id": "L4_Vous_payez_comment__",
  "lesson": 4,
  "fr": "Vous payez comment ?",
  "zh": "您怎麼付款？",
  "note": ""
 },
 {
  "id": "L4_Par_carte_bancaire_",
  "lesson": 4,
  "fr": "Par carte bancaire.",
  "zh": "刷卡。（carte bleue = 簽帳卡，非信用卡）",
  "note": ""
 },
 {
  "id": "L4_En_espèces_",
  "lesson": 4,
  "fr": "En espèces.",
  "zh": "付現金。",
  "note": ""
 },
 {
  "id": "L4_Combien_coûte_une_baguet",
  "lesson": 4,
  "fr": "Combien coûte une baguette ? / Ça coûte combien ?",
  "zh": "一條法棍多少錢？",
  "note": ""
 },
 {
  "id": "L4_Elle_coûte___euro_____a_",
  "lesson": 4,
  "fr": "Elle coûte 1 euro. / Ça coûte 1 euro.",
  "zh": "它賣一歐元。",
  "note": ""
 },
 {
  "id": "L4___________seize_euros_qu",
  "lesson": 4,
  "fr": "16,90 € = seize euros quatre-vingt-dix",
  "zh": "金額讀法：單位放在中間（seize euros quatre-vingt-dix）",
  "note": ""
 },
 {
  "id": "L5_la_viande__f__",
  "lesson": 5,
  "fr": "la viande (f.)",
  "zh": "肉",
  "note": ""
 },
 {
  "id": "L5_le_poisson__m__",
  "lesson": 5,
  "fr": "le poisson (m.)",
  "zh": "魚",
  "note": ""
 },
 {
  "id": "L5_le_fromage__m__",
  "lesson": 5,
  "fr": "le fromage (m.)",
  "zh": "起司",
  "note": ""
 },
 {
  "id": "L5_le_pain__m__",
  "lesson": 5,
  "fr": "le pain (m.)",
  "zh": "麵包",
  "note": ""
 },
 {
  "id": "L5_les_légumes__m_pl__",
  "lesson": 5,
  "fr": "les légumes (m.pl.)",
  "zh": "蔬菜",
  "note": ""
 },
 {
  "id": "L5_les_fruits__m_pl__",
  "lesson": 5,
  "fr": "les fruits (m.pl.)",
  "zh": "水果",
  "note": ""
 },
 {
  "id": "L5_les_pâtes__f_pl__",
  "lesson": 5,
  "fr": "les pâtes (f.pl.)",
  "zh": "義大利麵 / 麵食",
  "note": ""
 },
 {
  "id": "L5_le_riz__m__",
  "lesson": 5,
  "fr": "le riz (m.)",
  "zh": "米飯",
  "note": ""
 },
 {
  "id": "L5_l'huile__f__",
  "lesson": 5,
  "fr": "l'huile (f.)",
  "zh": "油",
  "note": ""
 },
 {
  "id": "L5_les__ufs__m_pl__",
  "lesson": 5,
  "fr": "les œufs (m.pl.)",
  "zh": "雞蛋",
  "note": ""
 },
 {
  "id": "L5_la_farine__f__",
  "lesson": 5,
  "fr": "la farine (f.)",
  "zh": "麵粉",
  "note": ""
 },
 {
  "id": "L5_le_beurre__m__",
  "lesson": 5,
  "fr": "le beurre (m.)",
  "zh": "奶油",
  "note": ""
 },
 {
  "id": "L5_Je_commande_de_l'eau_",
  "lesson": 5,
  "fr": "Je commande de l'eau.",
  "zh": "我點水。",
  "note": ""
 },
 {
  "id": "L5_Je_mange_du_pain_avec_du",
  "lesson": 5,
  "fr": "Je mange du pain avec du beurre.",
  "zh": "我吃麵包配奶油。",
  "note": ""
 },
 {
  "id": "L5_On_a_de_la_blanquette_de",
  "lesson": 5,
  "fr": "On a de la blanquette de veau.",
  "zh": "我們有白汁小牛肉。",
  "note": ""
 },
 {
  "id": "L5_Je_ne_mange_pas_de_viand",
  "lesson": 5,
  "fr": "Je ne mange pas de viande.",
  "zh": "我不吃肉。",
  "note": ""
 },
 {
  "id": "L5_Il_n'y_a_pas_de_dessert_",
  "lesson": 5,
  "fr": "Il n'y a pas de dessert aujourd'hui.",
  "zh": "今天沒有甜點。",
  "note": ""
 },
 {
  "id": "L5_l'entrée__f__",
  "lesson": 5,
  "fr": "l'entrée (f.)",
  "zh": "前菜",
  "note": ""
 },
 {
  "id": "L5_le_plat__du_jour___m__",
  "lesson": 5,
  "fr": "le plat (du jour) (m.)",
  "zh": "主菜（今日主菜）",
  "note": ""
 },
 {
  "id": "L5_le_dessert__m__",
  "lesson": 5,
  "fr": "le dessert (m.)",
  "zh": "甜點",
  "note": ""
 },
 {
  "id": "L5_la_formule__f__",
  "lesson": 5,
  "fr": "la formule (f.)",
  "zh": "套餐",
  "note": ""
 },
 {
  "id": "L5_l'addition__f__",
  "lesson": 5,
  "fr": "l'addition (f.)",
  "zh": "帳單",
  "note": ""
 },
 {
  "id": "L5_le_sel__m_____le_poivre_",
  "lesson": 5,
  "fr": "le sel (m.) / le poivre (m.)",
  "zh": "鹽 / 胡椒",
  "note": ""
 },
 {
  "id": "L5_la_carafe_d'eau",
  "lesson": 5,
  "fr": "la carafe d'eau",
  "zh": "一壺自來水（法國免費）",
  "note": ""
 },
 {
  "id": "L5_sur_place___à_emporter",
  "lesson": 5,
  "fr": "sur place / à emporter",
  "zh": "內用 / 外帶",
  "note": ""
 },
 {
  "id": "L5_la_blanquette_de_veau",
  "lesson": 5,
  "fr": "la blanquette de veau",
  "zh": "白汁小牛肉（法國家常菜）",
  "note": ""
 },
 {
  "id": "L5_le_steak_frites",
  "lesson": 5,
  "fr": "le steak-frites",
  "zh": "牛排配薯條",
  "note": ""
 },
 {
  "id": "L5_le_croque_monsieur_végét",
  "lesson": 5,
  "fr": "le croque-monsieur végétarien",
  "zh": "素版烤熱三明治",
  "note": ""
 },
 {
  "id": "L5_le_magret_de_canard",
  "lesson": 5,
  "fr": "le magret de canard",
  "zh": "鴨胸肉",
  "note": ""
 },
 {
  "id": "L5_la_quiche",
  "lesson": 5,
  "fr": "la quiche",
  "zh": "法式鹹派",
  "note": ""
 },
 {
  "id": "L5_le_gâteau_mousse_au_choc",
  "lesson": 5,
  "fr": "le gâteau mousse au chocolat",
  "zh": "巧克力慕斯蛋糕",
  "note": ""
 },
 {
  "id": "L5_la_glace",
  "lesson": 5,
  "fr": "la glace",
  "zh": "冰淇淋",
  "note": ""
 },
 {
  "id": "L5_le_riz_au_lait",
  "lesson": 5,
  "fr": "le riz au lait",
  "zh": "牛奶米布丁",
  "note": ""
 },
 {
  "id": "L5_la_tarte_aux_pommes",
  "lesson": 5,
  "fr": "la tarte aux pommes",
  "zh": "蘋果塔",
  "note": ""
 },
 {
  "id": "L5_le_café_crème",
  "lesson": 5,
  "fr": "le café crème",
  "zh": "加奶咖啡（類似拿鐵）",
  "note": ""
 },
 {
  "id": "L5_Quel_est_le_plat_du_jour",
  "lesson": 5,
  "fr": "Quel est le plat du jour ?",
  "zh": "今日主菜是什麼？",
  "note": ""
 },
 {
  "id": "L5_Je_voudrais_le_steak_fri",
  "lesson": 5,
  "fr": "Je voudrais le steak-frites.",
  "zh": "我想要牛排薯條。（正式點餐）",
  "note": ""
 },
 {
  "id": "L5_Pour_moi__la_blanquette_",
  "lesson": 5,
  "fr": "Pour moi, la blanquette de veau.",
  "zh": "我要白汁小牛肉。（口語）",
  "note": ""
 },
 {
  "id": "L5_Une_formule_entrée_plat_",
  "lesson": 5,
  "fr": "Une formule entrée/plat, s'il vous plaît.",
  "zh": "請給我前菜+主菜套餐。",
  "note": ""
 },
 {
  "id": "L5_L'addition__s'il_vous_pl",
  "lesson": 5,
  "fr": "L'addition, s'il vous plaît.",
  "zh": "請給我帳單。",
  "note": ""
 },
 {
  "id": "L5_Une_carafe_d'eau__s'il_v",
  "lesson": 5,
  "fr": "Une carafe d'eau, s'il vous plaît.",
  "zh": "請給我一壺水。（免費）",
  "note": ""
 },
 {
  "id": "L5_Avec_plaisir__",
  "lesson": 5,
  "fr": "Avec plaisir !",
  "zh": "很樂意！（服務員回應）",
  "note": ""
 },
 {
  "id": "L5_Bonne_dégustation__",
  "lesson": 5,
  "fr": "Bonne dégustation !",
  "zh": "請慢用！（比 bon appétit 更精緻）",
  "note": ""
 },
 {
  "id": "L5_C'est_bon__",
  "lesson": 5,
  "fr": "C'est bon !",
  "zh": "好吃！",
  "note": ""
 },
 {
  "id": "L5_C'est_délicieux__",
  "lesson": 5,
  "fr": "C'est délicieux !",
  "zh": "太美味了！",
  "note": ""
 },
 {
  "id": "L5_C'est_mauvais_",
  "lesson": 5,
  "fr": "C'est mauvais.",
  "zh": "不好吃。",
  "note": ""
 },
 {
  "id": "L5_C'est_pas_mal_",
  "lesson": 5,
  "fr": "C'est pas mal.",
  "zh": "還不錯。（口語縮略）",
  "note": ""
 },
 {
  "id": "L5_l'assiette__f__",
  "lesson": 5,
  "fr": "l'assiette (f.)",
  "zh": "盤子",
  "note": ""
 },
 {
  "id": "L5_la_fourchette__f__",
  "lesson": 5,
  "fr": "la fourchette (f.)",
  "zh": "叉子",
  "note": ""
 },
 {
  "id": "L5_le_couteau__m__",
  "lesson": 5,
  "fr": "le couteau (m.)",
  "zh": "刀子",
  "note": ""
 },
 {
  "id": "L5_la_cuillère__f__",
  "lesson": 5,
  "fr": "la cuillère (f.)",
  "zh": "湯匙",
  "note": ""
 },
 {
  "id": "L5_le_verre__m__",
  "lesson": 5,
  "fr": "le verre (m.)",
  "zh": "玻璃杯",
  "note": ""
 },
 {
  "id": "L5_la_carafe__f__",
  "lesson": 5,
  "fr": "la carafe (f.)",
  "zh": "水壺 / 玻璃瓶",
  "note": ""
 },
 {
  "id": "L5_faire_les_courses",
  "lesson": 5,
  "fr": "faire les courses",
  "zh": "購物（買食物日用品）",
  "note": ""
 },
 {
  "id": "L5_faire_la_cuisine",
  "lesson": 5,
  "fr": "faire la cuisine",
  "zh": "做飯",
  "note": ""
 },
 {
  "id": "L5_faire_du_sport",
  "lesson": 5,
  "fr": "faire du sport",
  "zh": "運動",
  "note": ""
 },
 {
  "id": "L5_Qu'est_ce_que_tu_fais__",
  "lesson": 5,
  "fr": "Qu'est-ce que tu fais ?",
  "zh": "你在做什麼？",
  "note": ""
 },
 {
  "id": "L5_Ils_ont_des_enfants_",
  "lesson": 5,
  "fr": "Ils ont des enfants.",
  "zh": "他們有孩子。（avoir）",
  "note": ""
 },
 {
  "id": "L5_Ils_sont_professeurs_",
  "lesson": 5,
  "fr": "Ils sont professeurs.",
  "zh": "他們是老師。（être）",
  "note": ""
 },
 {
  "id": "L5_Ils_vont_au_marché_",
  "lesson": 5,
  "fr": "Ils vont au marché.",
  "zh": "他們去市場。（aller）",
  "note": ""
 },
 {
  "id": "L5_Ils_font_la_cuisine_",
  "lesson": 5,
  "fr": "Ils font la cuisine.",
  "zh": "他們做飯。（faire）",
  "note": ""
 },
 {
  "id": "L5_la_boulangerie",
  "lesson": 5,
  "fr": "la boulangerie",
  "zh": "麵包・甜點",
  "note": "麵包・甜點"
 },
 {
  "id": "L5_la_boucherie",
  "lesson": 5,
  "fr": "la boucherie",
  "zh": "肉類",
  "note": "肉類"
 },
 {
  "id": "L5_l'épicerie",
  "lesson": 5,
  "fr": "l'épicerie",
  "zh": "雜貨（蔬果、罐頭…）",
  "note": "雜貨（蔬果、罐頭…）"
 },
 {
  "id": "L5_la_poissonnerie",
  "lesson": 5,
  "fr": "la poissonnerie",
  "zh": "魚・海鮮",
  "note": "魚・海鮮"
 },
 {
  "id": "L5_la_fromagerie",
  "lesson": 5,
  "fr": "la fromagerie",
  "zh": "起司",
  "note": "起司"
 },
 {
  "id": "L5_la_pâtisserie",
  "lesson": 5,
  "fr": "la pâtisserie",
  "zh": "蛋糕・甜點",
  "note": "蛋糕・甜點"
 },
 {
  "id": "L6_midi",
  "lesson": 6,
  "fr": "midi",
  "zh": "正午 12:00 pm（陽性）",
  "note": ""
 },
 {
  "id": "L6_minuit",
  "lesson": 6,
  "fr": "minuit",
  "zh": "午夜 12:00 am（陽性）",
  "note": ""
 },
 {
  "id": "L6_du_matin",
  "lesson": 6,
  "fr": "du matin",
  "zh": "早上（8h du matin）",
  "note": ""
 },
 {
  "id": "L6_de_l'après_midi",
  "lesson": 6,
  "fr": "de l'après-midi",
  "zh": "下午（4h de l'après-midi）",
  "note": ""
 },
 {
  "id": "L6_du_soir",
  "lesson": 6,
  "fr": "du soir",
  "zh": "晚上（8h du soir）",
  "note": ""
 },
 {
  "id": "L6_le_centre_ville",
  "lesson": 6,
  "fr": "le centre-ville",
  "zh": "市中心",
  "note": ""
 },
 {
  "id": "L6_la_banlieue",
  "lesson": 6,
  "fr": "la banlieue",
  "zh": "郊區（非市中心）",
  "note": ""
 },
 {
  "id": "L6_le_quartier",
  "lesson": 6,
  "fr": "le quartier",
  "zh": "街區、社區",
  "note": ""
 },
 {
  "id": "L6_la_rue",
  "lesson": 6,
  "fr": "la rue",
  "zh": "街（一般道路）",
  "note": ""
 },
 {
  "id": "L6_l'avenue__f__",
  "lesson": 6,
  "fr": "l'avenue (f.)",
  "zh": "大道（有商店＋行人）",
  "note": ""
 },
 {
  "id": "L6_le_boulevard",
  "lesson": 6,
  "fr": "le boulevard",
  "zh": "林蔭大道（以車為主）",
  "note": ""
 },
 {
  "id": "L6_le_chemin",
  "lesson": 6,
  "fr": "le chemin",
  "zh": "小路",
  "note": ""
 },
 {
  "id": "L6_le_carrefour",
  "lesson": 6,
  "fr": "le carrefour",
  "zh": "十字路口（也是家樂福！）",
  "note": ""
 },
 {
  "id": "L6_le_quai",
  "lesson": 6,
  "fr": "le quai",
  "zh": "河岸邊、碼頭",
  "note": ""
 },
 {
  "id": "L6_le_pont",
  "lesson": 6,
  "fr": "le pont",
  "zh": "橋",
  "note": ""
 },
 {
  "id": "L6_la_place",
  "lesson": 6,
  "fr": "la place",
  "zh": "廣場（開放空間）",
  "note": ""
 },
 {
  "id": "L6_le_fleuve",
  "lesson": 6,
  "fr": "le fleuve",
  "zh": "大河（流入海的）",
  "note": ""
 },
 {
  "id": "L6_la_mairie",
  "lesson": 6,
  "fr": "la mairie",
  "zh": "市政廳（前面有法國國旗）",
  "note": ""
 },
 {
  "id": "L6_la_gare",
  "lesson": 6,
  "fr": "la gare",
  "zh": "火車站",
  "note": ""
 },
 {
  "id": "L6_le_commissariat",
  "lesson": 6,
  "fr": "le commissariat",
  "zh": "警察局",
  "note": ""
 },
 {
  "id": "L6_la_banque",
  "lesson": 6,
  "fr": "la banque",
  "zh": "銀行",
  "note": ""
 },
 {
  "id": "L6_la_bibliothèque",
  "lesson": 6,
  "fr": "la bibliothèque",
  "zh": "圖書館（非 librairie = 書店）",
  "note": ""
 },
 {
  "id": "L6_l'église__f__",
  "lesson": 6,
  "fr": "l'église (f.)",
  "zh": "教堂",
  "note": ""
 },
 {
  "id": "L6_la_cathédrale",
  "lesson": 6,
  "fr": "la cathédrale",
  "zh": "大教堂",
  "note": ""
 },
 {
  "id": "L6_la_fontaine",
  "lesson": 6,
  "fr": "la fontaine",
  "zh": "噴泉",
  "note": ""
 },
 {
  "id": "L6_le_musée",
  "lesson": 6,
  "fr": "le musée",
  "zh": "博物館",
  "note": ""
 },
 {
  "id": "L6_le_parc___le_jardin",
  "lesson": 6,
  "fr": "le parc / le jardin",
  "zh": "公園 / 花園",
  "note": ""
 },
 {
  "id": "L6_la_poste",
  "lesson": 6,
  "fr": "la poste",
  "zh": "郵局",
  "note": ""
 },
 {
  "id": "L6_le_théâtre",
  "lesson": 6,
  "fr": "le théâtre",
  "zh": "劇院（cinéma = 電影院）",
  "note": ""
 },
 {
  "id": "L6_le_kiosque__à_journaux_",
  "lesson": 6,
  "fr": "le kiosque (à journaux)",
  "zh": "報亭",
  "note": ""
 },
 {
  "id": "L6_l'école__f__",
  "lesson": 6,
  "fr": "l'école (f.)",
  "zh": "學校",
  "note": ""
 },
 {
  "id": "L6_voici",
  "lesson": 6,
  "fr": "voici",
  "zh": "這裡是⋯（ici = 這裡，手邊的）",
  "note": ""
 },
 {
  "id": "L6_voilà",
  "lesson": 6,
  "fr": "voilà",
  "zh": "那裡是⋯ / 瞧！（là = 那裡，也用來介紹某人）",
  "note": ""
 },
 {
  "id": "L6_près_de_chez_moi",
  "lesson": 6,
  "fr": "près de chez moi",
  "zh": "在我家附近",
  "note": ""
 },
 {
  "id": "L6_loin_du_centre",
  "lesson": 6,
  "fr": "loin du centre",
  "zh": "離市中心很遠",
  "note": ""
 },
 {
  "id": "L6_Il_n'est_pas_loin_",
  "lesson": 6,
  "fr": "Il n'est pas loin.",
  "zh": "不遠。（pas loin ≈ près）",
  "note": ""
 },
 {
  "id": "L6_les_transports_en_commun",
  "lesson": 6,
  "fr": "les transports en commun (m.)",
  "zh": "大眾交通工具",
  "note": ""
 },
 {
  "id": "L6_le_covoiturage",
  "lesson": 6,
  "fr": "le covoiturage",
  "zh": "共乘（carpooling）",
  "note": ""
 },
 {
  "id": "L6_gratuit___gratuite",
  "lesson": 6,
  "fr": "gratuit / gratuite",
  "zh": "免費的",
  "note": ""
 },
 {
  "id": "L6_se_déplacer",
  "lesson": 6,
  "fr": "se déplacer",
  "zh": "移動、出行",
  "note": ""
 },
 {
  "id": "L6_économiser_de_l'argent",
  "lesson": 6,
  "fr": "économiser de l'argent",
  "zh": "省錢",
  "note": ""
 },
 {
  "id": "L6_Prenez_le_métro__",
  "lesson": 6,
  "fr": "Prenez le métro !",
  "zh": "搭地鐵去！",
  "note": ""
 },
 {
  "id": "L6_Montez_dans_le_bus_",
  "lesson": 6,
  "fr": "Montez dans le bus.",
  "zh": "上公車。",
  "note": ""
 },
 {
  "id": "L6_Descendez_à_l'arrêt_Répu",
  "lesson": 6,
  "fr": "Descendez à l'arrêt République.",
  "zh": "在共和廣場站下車。",
  "note": ""
 },
 {
  "id": "L6_N'achetez_pas_de_tickets",
  "lesson": 6,
  "fr": "N'achetez pas de tickets.",
  "zh": "不用買票。（否定命令）",
  "note": ""
 },
 {
  "id": "L6_Regarde_sur_ton_téléphon",
  "lesson": 6,
  "fr": "Regarde sur ton téléphone.",
  "zh": "看你的手機。（tu 形）",
  "note": ""
 },
 {
  "id": "L6_Sois_sympa__",
  "lesson": 6,
  "fr": "Sois sympa !",
  "zh": "友善一點！（être tu）",
  "note": ""
 },
 {
  "id": "L6_Ayez_confiance__",
  "lesson": 6,
  "fr": "Ayez confiance !",
  "zh": "要有信心！（avoir vous）",
  "note": ""
 },
 {
  "id": "L6_____etc_",
  "lesson": 6,
  "fr": ":10 etc.",
  "zh": "直接加分鐘",
  "note": "Il est deux heures dix."
 },
 {
  "id": "L6_toujours",
  "lesson": 6,
  "fr": "toujours",
  "zh": "總是 always",
  "note": "Je vais toujours au musée."
 },
 {
  "id": "L6_souvent",
  "lesson": 6,
  "fr": "souvent",
  "zh": "常常 often",
  "note": "Je vais souvent au musée."
 },
 {
  "id": "L6_déjà",
  "lesson": 6,
  "fr": "déjà",
  "zh": "已經 already",
  "note": "Nous avons déjà vu ce film."
 },
 {
  "id": "L6_jamais",
  "lesson": 6,
  "fr": "jamais",
  "zh": "從不 never",
  "note": "Je ne vais jamais au théâtre."
 },
 {
  "id": "L6_ne_____jamais",
  "lesson": 6,
  "fr": "ne ... jamais",
  "zh": "從不",
  "note": "Je ne vais jamais au cinéma."
 },
 {
  "id": "L6_ne_____rien",
  "lesson": 6,
  "fr": "ne ... rien",
  "zh": "什麼都不",
  "note": "Elle ne boit rien."
 },
 {
  "id": "L6_ne_____personne",
  "lesson": 6,
  "fr": "ne ... personne",
  "zh": "沒有任何人",
  "note": "Je ne connais personne ici."
 },
 {
  "id": "L6_ne_____plus",
  "lesson": 6,
  "fr": "ne ... plus",
  "zh": "不再（已停止）",
  "note": "Il ne fait plus de sport."
 },
 {
  "id": "L7_se_déplacer",
  "lesson": 7,
  "fr": "se déplacer",
  "zh": "移動、出行（反身動詞）",
  "note": ""
 },
 {
  "id": "L7_l'arrêt__m_____la_statio",
  "lesson": 7,
  "fr": "l'arrêt (m.) / la station",
  "zh": "（公車）站 / （地鐵）站，意思相同",
  "note": ""
 },
 {
  "id": "L7_la_ligne",
  "lesson": 7,
  "fr": "la ligne",
  "zh": "路線（ex. la ligne bleue）",
  "note": ""
 },
 {
  "id": "L7_l'itinéraire__m__",
  "lesson": 7,
  "fr": "l'itinéraire (m.)",
  "zh": "路線圖、行程路徑",
  "note": ""
 },
 {
  "id": "L7_la_carte_de_transport",
  "lesson": 7,
  "fr": "la carte de transport",
  "zh": "交通卡（悠遊卡）",
  "note": ""
 },
 {
  "id": "L7_le_ticket___le_jeton",
  "lesson": 7,
  "fr": "le ticket / le jeton",
  "zh": "票 / 代幣（台灣地鐵用 jeton）",
  "note": ""
 },
 {
  "id": "L7_louer_une_voiture",
  "lesson": 7,
  "fr": "louer une voiture",
  "zh": "租車（louer = to rent）",
  "note": ""
 },
 {
  "id": "L7_monter_dans_le_bus",
  "lesson": 7,
  "fr": "monter dans le bus",
  "zh": "上公車",
  "note": ""
 },
 {
  "id": "L7_d'ici_jusqu'à_là_bas",
  "lesson": 7,
  "fr": "d'ici jusqu'à là-bas",
  "zh": "從這裡一直到那裡",
  "note": ""
 },
 {
  "id": "L7_Pour_aller_au_travail__j",
  "lesson": 7,
  "fr": "Pour aller au travail, je prends ma voiture.",
  "zh": "去上班我開車。",
  "note": ""
 },
 {
  "id": "L7_Ma_famille_n'utilise_que",
  "lesson": 7,
  "fr": "Ma famille n'utilise que les transports en commun.",
  "zh": "我家只用大眾交通。",
  "note": ""
 },
 {
  "id": "L7_Au_Japon__on_va_louer_un",
  "lesson": 7,
  "fr": "Au Japon, on va louer une voiture.",
  "zh": "在日本我們要租車。",
  "note": ""
 },
 {
  "id": "L7_Ne_prends_pas_la_voiture",
  "lesson": 7,
  "fr": "Ne prends pas la voiture.",
  "zh": "不要開車。（否定命令 tu）",
  "note": ""
 },
 {
  "id": "L7_La_semaine__j'utilise_le",
  "lesson": 7,
  "fr": "La semaine, j'utilise les transports en commun.",
  "zh": "工作日我搭大眾交通。",
  "note": ""
 },
 {
  "id": "L7_Le_week_end__je_prends_m",
  "lesson": 7,
  "fr": "Le week-end, je prends ma voiture.",
  "zh": "週末我開車。",
  "note": ""
 },
 {
  "id": "L7_un_jean__m__",
  "lesson": 7,
  "fr": "un jean (m.)",
  "zh": "牛仔褲（複數 des jeans）",
  "note": ""
 },
 {
  "id": "L7_une_jupe__f__",
  "lesson": 7,
  "fr": "une jupe (f.)",
  "zh": "裙子",
  "note": ""
 },
 {
  "id": "L7_une_robe__f__",
  "lesson": 7,
  "fr": "une robe (f.)",
  "zh": "洋裝",
  "note": ""
 },
 {
  "id": "L7_un_t_shirt__m__",
  "lesson": 7,
  "fr": "un t-shirt (m.)",
  "zh": "T恤",
  "note": ""
 },
 {
  "id": "L7_une_chemise__f__",
  "lesson": 7,
  "fr": "une chemise (f.)",
  "zh": "（男）襯衫",
  "note": ""
 },
 {
  "id": "L7_un_short__m__",
  "lesson": 7,
  "fr": "un short (m.)",
  "zh": "短褲",
  "note": ""
 },
 {
  "id": "L7_un_pull__m__",
  "lesson": 7,
  "fr": "un pull (m.)",
  "zh": "毛衣、厚上衣（sweater）",
  "note": ""
 },
 {
  "id": "L7_un_pantalon__m__",
  "lesson": 7,
  "fr": "un pantalon (m.)",
  "zh": "長褲",
  "note": ""
 },
 {
  "id": "L7_une_veste__f__",
  "lesson": 7,
  "fr": "une veste (f.)",
  "zh": "外套、夾克",
  "note": ""
 },
 {
  "id": "L7_un_costume__m__",
  "lesson": 7,
  "fr": "un costume (m.)",
  "zh": "西裝",
  "note": ""
 },
 {
  "id": "L7_des_baskets__f_pl__",
  "lesson": 7,
  "fr": "des baskets (f.pl.)",
  "zh": "運動鞋（sports shoes）",
  "note": ""
 },
 {
  "id": "L7_des_chaussures__f_pl__",
  "lesson": 7,
  "fr": "des chaussures (f.pl.)",
  "zh": "鞋子",
  "note": ""
 },
 {
  "id": "L7_une_ceinture__f__",
  "lesson": 7,
  "fr": "une ceinture (f.)",
  "zh": "皮帶",
  "note": ""
 },
 {
  "id": "L7_des_lunettes_de_soleil__",
  "lesson": 7,
  "fr": "des lunettes de soleil (f.pl.)",
  "zh": "太陽眼鏡",
  "note": ""
 },
 {
  "id": "L7_un_sac_à_main__m__",
  "lesson": 7,
  "fr": "un sac à main (m.)",
  "zh": "手提包（handbag）",
  "note": ""
 },
 {
  "id": "L7_des_bijoux__m_pl__",
  "lesson": 7,
  "fr": "des bijoux (m.pl.)",
  "zh": "首飾、珠寶（jewellery）",
  "note": ""
 },
 {
  "id": "L7_neuf___neuve",
  "lesson": 7,
  "fr": "neuf / neuve",
  "zh": "全新的（new）",
  "note": ""
 },
 {
  "id": "L7_d'occasion",
  "lesson": 7,
  "fr": "d'occasion",
  "zh": "二手的（used）",
  "note": ""
 },
 {
  "id": "L7_le_prix",
  "lesson": 7,
  "fr": "le prix",
  "zh": "價格（combien ça coûte ?）",
  "note": ""
 },
 {
  "id": "L7_cher___chère",
  "lesson": 7,
  "fr": "cher / chère",
  "zh": "貴",
  "note": ""
 },
 {
  "id": "L7_pas_cher___bon_marché",
  "lesson": 7,
  "fr": "pas cher / bon marché",
  "zh": "便宜（法語沒有「便宜」一字，說「不貴」或「好市場」）",
  "note": ""
 },
 {
  "id": "L7_une_bonne_affaire",
  "lesson": 7,
  "fr": "une bonne affaire",
  "zh": "划算、好買賣（good deal）",
  "note": ""
 },
 {
  "id": "L7_les_affaires__f_pl__",
  "lesson": 7,
  "fr": "les affaires (f.pl.)",
  "zh": "東西（mes affaires = my things）也可指「生意」：un homme d'affaires = 商人",
  "note": ""
 },
 {
  "id": "L7_Tu_fais_quelle_taille__",
  "lesson": 7,
  "fr": "Tu fais quelle taille ?",
  "zh": "你穿幾號？（衣服）",
  "note": ""
 },
 {
  "id": "L7_Je_fais_du_S___M___L___X",
  "lesson": 7,
  "fr": "Je fais du S / M / L / XL.",
  "zh": "我穿 S / M / L / XL。",
  "note": ""
 },
 {
  "id": "L7_Tu_fais_du____",
  "lesson": 7,
  "fr": "Tu fais du 38.",
  "zh": "你穿 38 號。（褲子褲頭尺寸）",
  "note": ""
 },
 {
  "id": "L7_Tu_chausses_combien__",
  "lesson": 7,
  "fr": "Tu chausses combien ?",
  "zh": "你穿幾號鞋？",
  "note": ""
 },
 {
  "id": "L7_Je_chausse_du____",
  "lesson": 7,
  "fr": "Je chausse du 42.",
  "zh": "我穿 42 號鞋。",
  "note": ""
 },
 {
  "id": "L7_Tu_fais_combien__",
  "lesson": 7,
  "fr": "Tu fais combien ?",
  "zh": "你幾公分？（身高）",
  "note": ""
 },
 {
  "id": "L7_Je_fais__m___",
  "lesson": 7,
  "fr": "Je fais 1m80.",
  "zh": "我 180 公分。",
  "note": ""
 },
 {
  "id": "L7_C'est_à_la_mode____C'est",
  "lesson": 7,
  "fr": "C'est à la mode. / C'est tendance.",
  "zh": "這很流行。（= trendy）",
  "note": ""
 },
 {
  "id": "L7_Ce_n'est_pas_à_la_mode_",
  "lesson": 7,
  "fr": "Ce n'est pas à la mode.",
  "zh": "這不流行了。",
  "note": ""
 },
 {
  "id": "L7_Il___Elle_me_plaît_",
  "lesson": 7,
  "fr": "Il / Elle me plaît.",
  "zh": "我喜歡它。（plaire = to please；主詞是「物」！）",
  "note": ""
 },
 {
  "id": "L7_Je_trouve_ça_joli_e__",
  "lesson": 7,
  "fr": "Je trouve ça joli(e).",
  "zh": "我覺得這很好看。",
  "note": ""
 },
 {
  "id": "L7_Il_me_va_bien_",
  "lesson": 7,
  "fr": "Il me va bien.",
  "zh": "這件穿起來很適合我。（look good on me）",
  "note": ""
 },
 {
  "id": "L7_Il_adore_la_mode_",
  "lesson": 7,
  "fr": "Il adore la mode.",
  "zh": "他很愛時尚。",
  "note": ""
 },
 {
  "id": "L7_mille",
  "lesson": 7,
  "fr": "mille",
  "zh": "1 000（注意：不加 s）",
  "note": ""
 },
 {
  "id": "L7_un_million___deux_millio",
  "lesson": 7,
  "fr": "un million / deux millions",
  "zh": "1 000 000（複數加 s）",
  "note": ""
 },
 {
  "id": "L7_un_milliard___deux_milli",
  "lesson": 7,
  "fr": "un milliard / deux milliards",
  "zh": "1 000 000 000（複數加 s）",
  "note": ""
 },
 {
  "id": "L7_parce_que___parce_qu'",
  "lesson": 7,
  "fr": "parce que / parce qu'",
  "zh": "原因（因為）",
  "note": "Parce que c'est pratique."
 },
 {
  "id": "L7_mais",
  "lesson": 7,
  "fr": "mais",
  "zh": "轉折（但是）",
  "note": "Mais ça coûte cher."
 },
 {
  "id": "L7_avec",
  "lesson": 7,
  "fr": "avec",
  "zh": "伴隨（和、帶著）",
  "note": "Avec mon mari."
 },
 {
  "id": "L7_la_semaine___en_semaine",
  "lesson": 7,
  "fr": "la semaine / en semaine",
  "zh": "工作日",
  "note": "週一～週五（5天）"
 },
 {
  "id": "L7_le_week_end",
  "lesson": 7,
  "fr": "le week-end",
  "zh": "週末",
  "note": "週六、週日（2天）"
 },
 {
  "id": "L7_une_semaine",
  "lesson": 7,
  "fr": "une semaine",
  "zh": "一整週",
  "note": "7天"
 },
 {
  "id": "L8_un_beau_sac_à_dos",
  "lesson": 8,
  "fr": "un beau sac à dos",
  "zh": "一個漂亮的背包（子音開頭，用 beau）",
  "note": ""
 },
 {
  "id": "L8_un_bel_immeuble",
  "lesson": 8,
  "fr": "un bel immeuble",
  "zh": "一棟漂亮的建築（母音開頭，beau → bel）",
  "note": ""
 },
 {
  "id": "L8_un_bel_homme",
  "lesson": 8,
  "fr": "un bel homme",
  "zh": "一個美男子（h 不發音，視為母音開頭）",
  "note": ""
 },
 {
  "id": "L8_un_nouvel_ordinateur",
  "lesson": 8,
  "fr": "un nouvel ordinateur",
  "zh": "一台新電腦（母音開頭，nouveau → nouvel）",
  "note": ""
 },
 {
  "id": "L8_une_nouvelle_voiture",
  "lesson": 8,
  "fr": "une nouvelle voiture",
  "zh": "一輛新車（陰性 nouvelle）",
  "note": ""
 },
 {
  "id": "L8_de_beaux_objets",
  "lesson": 8,
  "fr": "de beaux objets",
  "zh": "一些漂亮的物品（複數 beaux；des → de，因為形容詞在前）",
  "note": ""
 },
 {
  "id": "L8_la_chemise___le_t_shirt_",
  "lesson": 8,
  "fr": "la chemise / le t-shirt / le pull",
  "zh": "襯衫 / T恤 / 毛衣",
  "note": ""
 },
 {
  "id": "L8_le_pantalon___le_jean___",
  "lesson": 8,
  "fr": "le pantalon / le jean / la jupe",
  "zh": "長褲 / 牛仔褲 / 裙子",
  "note": ""
 },
 {
  "id": "L8_le_gilet___le_manteau",
  "lesson": 8,
  "fr": "le gilet / le manteau",
  "zh": "背心、針織外套 / 大衣",
  "note": ""
 },
 {
  "id": "L8_l'imperméable__m_____l'i",
  "lesson": 8,
  "fr": "l'imperméable (m.) / l'imper",
  "zh": "雨衣（口語簡稱 imper）",
  "note": ""
 },
 {
  "id": "L8_le_costume",
  "lesson": 8,
  "fr": "le costume",
  "zh": "整套西裝（外套+褲子）",
  "note": ""
 },
 {
  "id": "L8_la_robe__courte_",
  "lesson": 8,
  "fr": "la robe (courte)",
  "zh": "（短）洋裝；注意 court 陰性加 -e，t 才發音",
  "note": ""
 },
 {
  "id": "L8_le_bijou___les_bijoux",
  "lesson": 8,
  "fr": "le bijou / les bijoux",
  "zh": "珠寶（複數不規則：-x）",
  "note": ""
 },
 {
  "id": "L8_la_ceinture___le_chapeau",
  "lesson": 8,
  "fr": "la ceinture / le chapeau / la casquette",
  "zh": "腰帶 / 帽子 / 鴨舌帽",
  "note": ""
 },
 {
  "id": "L8_les_chaussures__f_____le",
  "lesson": 8,
  "fr": "les chaussures (f.) / les baskets / les bottes",
  "zh": "鞋子 / 運動鞋 / 靴子",
  "note": ""
 },
 {
  "id": "L8_la_cravate___les_lunette",
  "lesson": 8,
  "fr": "la cravate / les lunettes de soleil",
  "zh": "領帶 / 太陽眼鏡",
  "note": ""
 },
 {
  "id": "L8_le_parapluie___le_paraso",
  "lesson": 8,
  "fr": "le parapluie / le parasol",
  "zh": "雨傘（防雨 para+pluie） / 陽傘（防太陽 para+soleil）",
  "note": ""
 },
 {
  "id": "L8_le_sac_à_main___le_sac_à",
  "lesson": 8,
  "fr": "le sac à main / le sac à dos",
  "zh": "手提包（女用） / 背包",
  "note": ""
 },
 {
  "id": "L8_blanc_blanche__bleu__gri",
  "lesson": 8,
  "fr": "blanc/blanche, bleu, gris/grise, jaune",
  "zh": "白、藍、灰、黃",
  "note": ""
 },
 {
  "id": "L8_marron__noir_noire__rose",
  "lesson": 8,
  "fr": "marron, noir/noire, rose, rouge, vert/verte, orange",
  "zh": "棕、黑、粉、紅、綠、橘",
  "note": ""
 },
 {
  "id": "L8_rouge___jaune___orange__",
  "lesson": 8,
  "fr": "rouge + jaune = orange ; bleu + jaune = vert",
  "zh": "調色口訣",
  "note": ""
 },
 {
  "id": "L8_en_coton___en_laine___en",
  "lesson": 8,
  "fr": "en coton / en laine / en soie",
  "zh": "棉 / 羊毛 / 絲",
  "note": ""
 },
 {
  "id": "L8_en_cuir___en_jean___en_l",
  "lesson": 8,
  "fr": "en cuir / en jean / en lin",
  "zh": "皮革 / 牛仔布 / 麻（夏天材質）",
  "note": ""
 },
 {
  "id": "L8_Tu_fais_quelle_taille__",
  "lesson": 8,
  "fr": "Tu fais quelle taille ?",
  "zh": "你穿幾號？（衣服尺碼）",
  "note": ""
 },
 {
  "id": "L8_Je_fais_du_S___M___L___X",
  "lesson": 8,
  "fr": "Je fais du S / M / L / XL.",
  "zh": "我穿 S / M / L / XL。",
  "note": ""
 },
 {
  "id": "L8_Tu_chausses_combien__",
  "lesson": 8,
  "fr": "Tu chausses combien ?",
  "zh": "你穿幾號鞋？（chausser = 穿鞋）",
  "note": ""
 },
 {
  "id": "L8_Je_chausse_du____",
  "lesson": 8,
  "fr": "Je chausse du 42.",
  "zh": "我穿 42 號鞋。",
  "note": ""
 },
 {
  "id": "L8_mon_tour_de_taille___mon",
  "lesson": 8,
  "fr": "mon tour de taille / mon tour de poitrine",
  "zh": "我的腰圍 / 我的胸圍（tour = 一圈）",
  "note": ""
 },
 {
  "id": "L8_la_pointure",
  "lesson": 8,
  "fr": "la pointure",
  "zh": "鞋子尺碼專用字（taille 是衣服尺碼）",
  "note": ""
 },
 {
  "id": "L8_Il_fait_beau____Il_y_a_d",
  "lesson": 8,
  "fr": "Il fait beau. / Il y a du soleil.",
  "zh": "天氣好。/ 有太陽。",
  "note": ""
 },
 {
  "id": "L8_Il_fait_mauvais____Il_fa",
  "lesson": 8,
  "fr": "Il fait mauvais. / Il fait moche.",
  "zh": "天氣不好。（moche 較口語）",
  "note": ""
 },
 {
  "id": "L8_Il_fait_chaud____Il_fait",
  "lesson": 8,
  "fr": "Il fait chaud. / Il fait froid.",
  "zh": "天氣熱。 / 天氣冷。",
  "note": ""
 },
 {
  "id": "L8_Il_pleut____Il_neige_",
  "lesson": 8,
  "fr": "Il pleut. / Il neige.",
  "zh": "下雨。 / 下雪。",
  "note": ""
 },
 {
  "id": "L8_Il_y_a_du_vent____Il_y_a",
  "lesson": 8,
  "fr": "Il y a du vent. / Il y a du brouillard.",
  "zh": "有風。 / 有霧。",
  "note": ""
 },
 {
  "id": "L8_Il_fait____degrés____Il_",
  "lesson": 8,
  "fr": "Il fait 30 degrés. / Il fait -10°C.",
  "zh": "氣溫 30 度。/ 零下 10 度。",
  "note": ""
 },
 {
  "id": "L8_en_hiver__en_été__en_aut",
  "lesson": 8,
  "fr": "en hiver, en été, en automne",
  "zh": "在冬天、夏天、秋天（用 en）",
  "note": ""
 },
 {
  "id": "L8_au_printemps",
  "lesson": 8,
  "fr": "au printemps",
  "zh": "在春天（例外用 au，因為 printemps 發音關係）",
  "note": ""
 },
 {
  "id": "L8_en_janvier__en_avril__en",
  "lesson": 8,
  "fr": "en janvier, en avril, en juillet…",
  "zh": "月份前一律用 en",
  "note": ""
 },
 {
  "id": "L8_début_septembre___mi_sep",
  "lesson": 8,
  "fr": "début septembre / mi-septembre / fin septembre",
  "zh": "九月初 / 九月中 / 九月底",
  "note": ""
 },
 {
  "id": "L8_Noël__c'est_en_décembre_",
  "lesson": 8,
  "fr": "Noël, c'est en décembre.",
  "zh": "聖誕節在十二月。（年份也用 en：en 2025）",
  "note": ""
 },
 {
  "id": "L8_Demain_soir__je_vais_fin",
  "lesson": 8,
  "fr": "Demain soir, je vais finir la robe.",
  "zh": "明晚我要把洋裝做完。",
  "note": ""
 },
 {
  "id": "L8_L'hiver_va_être_difficil",
  "lesson": 8,
  "fr": "L'hiver va être difficile.",
  "zh": "冬天會很難過。",
  "note": ""
 },
 {
  "id": "L8_La_semaine_prochaine__no",
  "lesson": 8,
  "fr": "La semaine prochaine, nous allons tricoter un pull.",
  "zh": "下星期我們要織一件毛衣。",
  "note": ""
 },
 {
  "id": "L8_Mes_filles_vont_être_con",
  "lesson": 8,
  "fr": "Mes filles vont être contentes.",
  "zh": "我女兒們會很開心。",
  "note": ""
 },
 {
  "id": "L8_Venez_nombreux__",
  "lesson": 8,
  "fr": "Venez nombreux !",
  "zh": "歡迎所有人來！（nombreux = 很多人，廣告用語）",
  "note": ""
 },
 {
  "id": "L8_ce_téléphone",
  "lesson": 8,
  "fr": "ce téléphone",
  "zh": "這支手機（子音開頭，陽性單數）",
  "note": ""
 },
 {
  "id": "L8_cet_ordinateur",
  "lesson": 8,
  "fr": "cet ordinateur",
  "zh": "這台電腦（母音開頭，ce → cet）",
  "note": ""
 },
 {
  "id": "L8_cette_valise",
  "lesson": 8,
  "fr": "cette valise",
  "zh": "這個行李箱（陰性單數）",
  "note": ""
 },
 {
  "id": "L8_ces_téléphones_sont_des_",
  "lesson": 8,
  "fr": "ces téléphones sont des iPhones.",
  "zh": "這些手機是 iPhone。（複數 ces，不分陰陽）",
  "note": ""
 },
 {
  "id": "L8_le_téléphone__portable__",
  "lesson": 8,
  "fr": "le téléphone (portable) / le smartphone",
  "zh": "（手機）/ 智慧型手機",
  "note": ""
 },
 {
  "id": "L8_la_montre_connectée",
  "lesson": 8,
  "fr": "la montre connectée",
  "zh": "智能手錶（connecté = 連網的）",
  "note": ""
 },
 {
  "id": "L8_l'ordinateur__portable__",
  "lesson": 8,
  "fr": "l'ordinateur (portable) / la tablette",
  "zh": "（筆記型）電腦 / 平板",
  "note": ""
 },
 {
  "id": "L8_les_écouteurs_sans_fil",
  "lesson": 8,
  "fr": "les écouteurs sans fil",
  "zh": "無線耳機",
  "note": ""
 },
 {
  "id": "L8_une_enceinte__Bluetooth_",
  "lesson": 8,
  "fr": "une enceinte (Bluetooth)",
  "zh": "（藍牙）喇叭（不是耳機！是音響）",
  "note": ""
 },
 {
  "id": "L8_la_batterie_externe",
  "lesson": 8,
  "fr": "la batterie externe",
  "zh": "行動電源（口語也說 power bank）",
  "note": ""
 },
 {
  "id": "L8_le_porte_clés___le_porte",
  "lesson": 8,
  "fr": "le porte-clés / le portefeuille",
  "zh": "鑰匙圈 / 錢包",
  "note": ""
 },
 {
  "id": "L8_le_cadre_photo___l'étui",
  "lesson": 8,
  "fr": "le cadre photo / l'étui",
  "zh": "相框 / （眼鏡等的）盒子・套",
  "note": ""
 },
 {
  "id": "L8_la_valise",
  "lesson": 8,
  "fr": "la valise",
  "zh": "行李箱",
  "note": ""
 },
 {
  "id": "L8_carré_e____rond_e____rec",
  "lesson": 8,
  "fr": "carré(e) / rond(e) / rectangulaire",
  "zh": "方形 / 圓形 / 長方形",
  "note": ""
 },
 {
  "id": "L8_léger_légère___lourd_e_",
  "lesson": 8,
  "fr": "léger/légère / lourd(e)",
  "zh": "輕的 / 重的",
  "note": ""
 },
 {
  "id": "L8_le_poids___la_taille",
  "lesson": 8,
  "fr": "le poids / la taille",
  "zh": "重量 / 大小尺寸",
  "note": ""
 },
 {
  "id": "L8__a_sert_à_quoi_______quo",
  "lesson": 8,
  "fr": "Ça sert à quoi ? / À quoi ça sert ?",
  "zh": "這是做什麼用的？（兩種語序都可以）",
  "note": ""
 },
 {
  "id": "L8__a_sert_à_téléphoner_",
  "lesson": 8,
  "fr": "Ça sert à téléphoner.",
  "zh": "這是用來打電話的。（sert à + 原形動詞）",
  "note": ""
 },
 {
  "id": "L8__a_sert_à_écouter_de_la_",
  "lesson": 8,
  "fr": "Ça sert à écouter de la musique.",
  "zh": "這是用來聽音樂的。",
  "note": ""
 },
 {
  "id": "L8__a_sert_à_se_repérer____",
  "lesson": 8,
  "fr": "Ça sert à se repérer. / Ça sert à se connecter.",
  "zh": "這是用來定位的。/ 用來連網的。",
  "note": ""
 },
 {
  "id": "L8_se_réveiller",
  "lesson": 8,
  "fr": "se réveiller",
  "zh": "醒來（je me réveille）",
  "note": ""
 },
 {
  "id": "L8_se_lever",
  "lesson": 8,
  "fr": "se lever",
  "zh": "起床（je me lève）",
  "note": ""
 },
 {
  "id": "L8_se_doucher",
  "lesson": 8,
  "fr": "se doucher",
  "zh": "洗澡（je me douche）",
  "note": ""
 },
 {
  "id": "L8_s'habiller___mettre_des_",
  "lesson": 8,
  "fr": "s'habiller / mettre des vêtements",
  "zh": "穿衣服（je m'habille / je mets des vêtements）",
  "note": ""
 },
 {
  "id": "L8_se_coiffer",
  "lesson": 8,
  "fr": "se coiffer",
  "zh": "整理頭髮（je me coiffe）",
  "note": ""
 },
 {
  "id": "L8_se_maquiller",
  "lesson": 8,
  "fr": "se maquiller",
  "zh": "化妝（je me maquille）",
  "note": ""
 },
 {
  "id": "L8_prendre_le_petit_déjeune",
  "lesson": 8,
  "fr": "prendre le petit déjeuner",
  "zh": "吃早餐（不是反身動詞）",
  "note": ""
 },
 {
  "id": "L8_se_coucher",
  "lesson": 8,
  "fr": "se coucher",
  "zh": "上床睡覺（je me couche）",
  "note": ""
 },
 {
  "id": "L9_un_jour",
  "lesson": 9,
  "fr": "un jour",
  "zh": "一天（24小時的概念）",
  "note": ""
 },
 {
  "id": "L9_une_journée",
  "lesson": 9,
  "fr": "une journée",
  "zh": "白天醒著的時間（不含睡覺）",
  "note": ""
 },
 {
  "id": "L9_Bonne_journée__",
  "lesson": 9,
  "fr": "Bonne journée !",
  "zh": "祝你有美好的一天！（不是 bonjour，bonjour 只是「嗨」）",
  "note": ""
 },
 {
  "id": "L9_se_lever",
  "lesson": 9,
  "fr": "se lever",
  "zh": "起床、下床（離開床的動作）",
  "note": ""
 },
 {
  "id": "L9_se_coucher",
  "lesson": 9,
  "fr": "se coucher",
  "zh": "上床、躺下準備睡（進入床的動作，不一定馬上睡著）",
  "note": ""
 },
 {
  "id": "L9_dormir",
  "lesson": 9,
  "fr": "dormir",
  "zh": "睡覺（睡著的狀態）",
  "note": ""
 },
 {
  "id": "L9_s'endormir",
  "lesson": 9,
  "fr": "s'endormir",
  "zh": "入睡（從醒著進入睡著的那個瞬間）",
  "note": ""
 },
 {
  "id": "L9_se_réveiller",
  "lesson": 9,
  "fr": "se réveiller",
  "zh": "醒來（睜開眼睛）",
  "note": ""
 },
 {
  "id": "L9_se_brosser_les_dents",
  "lesson": 9,
  "fr": "se brosser les dents",
  "zh": "刷牙",
  "note": ""
 },
 {
  "id": "L9_se_raser",
  "lesson": 9,
  "fr": "se raser",
  "zh": "刮鬍子",
  "note": ""
 },
 {
  "id": "L9_faire_des_insomnies___l'",
  "lesson": 9,
  "fr": "faire des insomnies / l'insomnie",
  "zh": "失眠",
  "note": ""
 },
 {
  "id": "L9_se_promener",
  "lesson": 9,
  "fr": "se promener",
  "zh": "散步",
  "note": ""
 },
 {
  "id": "L9_s'organiser",
  "lesson": 9,
  "fr": "s'organiser",
  "zh": "安排自己（的事情）",
  "note": ""
 },
 {
  "id": "L9_une_émission",
  "lesson": 9,
  "fr": "une émission",
  "zh": "（電視/廣播）節目",
  "note": ""
 },
 {
  "id": "L9_un_e__collègue",
  "lesson": 9,
  "fr": "un(e) collègue",
  "zh": "同事",
  "note": ""
 },
 {
  "id": "L9_une_compétition__sportiv",
  "lesson": 9,
  "fr": "une compétition (sportive)",
  "zh": "（體育）競賽",
  "note": ""
 },
 {
  "id": "L9_interviewer___une_interv",
  "lesson": 9,
  "fr": "interviewer / une interview",
  "zh": "採訪（法文 interview 只用在記者採訪，不用於求職面試）",
  "note": ""
 },
 {
  "id": "L9_poser_des_questions",
  "lesson": 9,
  "fr": "poser des questions",
  "zh": "提問（不能說 demander des questions）",
  "note": ""
 },
 {
  "id": "L9_filmer",
  "lesson": 9,
  "fr": "filmer",
  "zh": "錄影、拍攝",
  "note": ""
 },
 {
  "id": "L9_discuter___une_discussio",
  "lesson": 9,
  "fr": "discuter / une discussion",
  "zh": "聊、討論（法文比英文 discuss 輕鬆，可以只是閒聊）",
  "note": ""
 },
 {
  "id": "L9_arrêter_de_travailler",
  "lesson": 9,
  "fr": "arrêter de travailler",
  "zh": "停止工作（arrêter de + 原形）",
  "note": ""
 },
 {
  "id": "L9_rentrer__à_la_maison_",
  "lesson": 9,
  "fr": "rentrer (à la maison)",
  "zh": "回家",
  "note": ""
 },
 {
  "id": "L9_surfer_sur_internet",
  "lesson": 9,
  "fr": "surfer sur internet",
  "zh": "上網瀏覽",
  "note": ""
 },
 {
  "id": "L9_le_bricolage___bricoler",
  "lesson": 9,
  "fr": "le bricolage / bricoler",
  "zh": "DIY手工修繕 / 做手工修繕",
  "note": ""
 },
 {
  "id": "L9_faire_la_cuisine",
  "lesson": 9,
  "fr": "faire la cuisine",
  "zh": "做飯",
  "note": ""
 },
 {
  "id": "L9_faire_la_vaisselle",
  "lesson": 9,
  "fr": "faire la vaisselle",
  "zh": "洗碗（vaisselle = 所有餐具的總稱）",
  "note": ""
 },
 {
  "id": "L9_faire_la_table",
  "lesson": 9,
  "fr": "faire la table",
  "zh": "擺餐桌（把 vaisselle 放上桌準備用餐）",
  "note": ""
 },
 {
  "id": "L9_faire_du_jogging",
  "lesson": 9,
  "fr": "faire du jogging",
  "zh": "慢跑",
  "note": ""
 },
 {
  "id": "L9_un_film_policier",
  "lesson": 9,
  "fr": "un film policier",
  "zh": "警匪片",
  "note": ""
 },
 {
  "id": "L9_On_ne_sait_pas_comment_i",
  "lesson": 9,
  "fr": "On ne sait pas comment il s'appelle.",
  "zh": "沒人知道他叫什麼名字。（on = 沒有人特定指稱、泛指大眾）",
  "note": ""
 },
 {
  "id": "L9_Les_Français_n'aiment_pa",
  "lesson": 9,
  "fr": "Les Français n'aiment pas ça. / On n'aime pas ça.",
  "zh": "法國人不喜歡這個。（on 可指某個群體，包含說話者自己）",
  "note": ""
 },
 {
  "id": "L9_On_va_au_cinéma_ce_soir_",
  "lesson": 9,
  "fr": "On va au cinéma ce soir ?",
  "zh": "我們今晚要去看電影嗎？（口語中 on 常直接取代 nous，更自然親切）",
  "note": ""
 },
 {
  "id": "L9_Je_peux_le_faire_",
  "lesson": 9,
  "fr": "Je peux le faire.",
  "zh": "我可以做這件事。（le = 那件事，代替前面提過的東西）",
  "note": ""
 },
 {
  "id": "L9_Je_ne_peux_pas_",
  "lesson": 9,
  "fr": "Je ne peux pas.",
  "zh": "我不能。（沒辦法、沒空）",
  "note": ""
 },
 {
  "id": "L9_Je_ne_veux_pas____Je_n'a",
  "lesson": 9,
  "fr": "Je ne veux pas. / Je n'ai pas envie.",
  "zh": "我不想。（envie = 想做的慾望，n'avoir pas envie = 不想做）",
  "note": ""
 },
 {
  "id": "L9__a_te_dit__",
  "lesson": 9,
  "fr": "Ça te dit ?",
  "zh": "你有興趣嗎？（ça = 這件事，te = 對你來說；更口語的問法）",
  "note": ""
 },
 {
  "id": "L9__a_lui_dit__",
  "lesson": 9,
  "fr": "Ça lui dit ?",
  "zh": "他/她有興趣嗎？（lui = 他/她，間接受詞代名詞）",
  "note": ""
 },
 {
  "id": "L9_le_jeudi",
  "lesson": 9,
  "fr": "le jeudi",
  "zh": "每個星期四（單數定冠詞 + 星期 = 固定每週這天，不是只說某一個星期四）",
  "note": ""
 },
 {
  "id": "L9_tous_les_jeudis",
  "lesson": 9,
  "fr": "tous les jeudis",
  "zh": "每個星期四（複數，意思和 le jeudi 完全相同）",
  "note": ""
 },
 {
  "id": "L9_jeudi",
  "lesson": 9,
  "fr": "jeudi",
  "zh": "星期四（沒有冠詞 = 只指某一個特定的星期四）",
  "note": ""
 },
 {
  "id": "L10_Qu'est_ce_que_tu_viens_d",
  "lesson": 10,
  "fr": "Qu'est-ce que tu viens de dire ?",
  "zh": "你剛說什麼？",
  "note": ""
 },
 {
  "id": "L10_Elle_vient_de_commencer_",
  "lesson": 10,
  "fr": "Elle vient de commencer, donc elle est encore là.",
  "zh": "她剛開始，所以她還在。",
  "note": ""
 },
 {
  "id": "L10_faire_du_bricolage",
  "lesson": 10,
  "fr": "faire du bricolage",
  "zh": "做 DIY、修繕",
  "note": "bricoler"
 },
 {
  "id": "L10_faire_les_courses",
  "lesson": 10,
  "fr": "faire les courses",
  "zh": "買菜、購物（食品）",
  "note": "—（⚠️ 複數！）"
 },
 {
  "id": "L10_faire_la_cuisine___faire",
  "lesson": 10,
  "fr": "faire la cuisine / faire à manger",
  "zh": "煮飯",
  "note": "cuisiner"
 },
 {
  "id": "L10_faire_du_jardinage",
  "lesson": 10,
  "fr": "faire du jardinage",
  "zh": "園藝",
  "note": "jardiner"
 },
 {
  "id": "L10_faire_une_lessive",
  "lesson": 10,
  "fr": "faire une lessive",
  "zh": "洗衣服",
  "note": "—"
 },
 {
  "id": "L10_faire_la_vaisselle",
  "lesson": 10,
  "fr": "faire la vaisselle",
  "zh": "洗碗",
  "note": "—"
 },
 {
  "id": "L10_faire_le_ménage",
  "lesson": 10,
  "fr": "faire le ménage",
  "zh": "打掃家裡",
  "note": "—"
 },
 {
  "id": "L10_faire_du_dessin___dessin",
  "lesson": 10,
  "fr": "faire du dessin / dessiner",
  "zh": "畫畫",
  "note": "aller à un cours de dessin = 去上畫畫課"
 },
 {
  "id": "L10_se_promener___se_balader",
  "lesson": 10,
  "fr": "se promener / se balader",
  "zh": "散步",
  "note": "promener qqn = 帶某人/寵物去走走"
 },
 {
  "id": "L10_faire_des_sorties___sort",
  "lesson": 10,
  "fr": "faire des sorties / sortir",
  "zh": "出去玩、與朋友外出",
  "note": "Elle fait beaucoup de sorties avec ses amis"
 },
 {
  "id": "L10_écouter_de_la_musique___",
  "lesson": 10,
  "fr": "écouter de la musique / la radio",
  "zh": "聽音樂/廣播",
  "note": ""
 },
 {
  "id": "L10_faire_du_jogging___du_sp",
  "lesson": 10,
  "fr": "faire du jogging / du sport",
  "zh": "跑步、運動",
  "note": ""
 },
 {
  "id": "L10_jouer_à_un_jeu_vidéo",
  "lesson": 10,
  "fr": "jouer à un jeu vidéo",
  "zh": "打電動",
  "note": "jouer = 玩，jeu = 遊戲（同字根）"
 },
 {
  "id": "L10_jouer_à_des_jeux_de_soci",
  "lesson": 10,
  "fr": "jouer à des jeux de société",
  "zh": "玩桌遊",
  "note": "Monopoly、棋類…"
 },
 {
  "id": "L10_lire",
  "lesson": 10,
  "fr": "lire",
  "zh": "看書",
  "note": ""
 },
 {
  "id": "L10_regarder_la_télé___un_fi",
  "lesson": 10,
  "fr": "regarder la télé / un film",
  "zh": "看電視/電影",
  "note": "télévision → la télé（口語縮寫）"
 },
 {
  "id": "L10_surfer_sur_internet",
  "lesson": 10,
  "fr": "surfer sur internet",
  "zh": "上網",
  "note": ""
 },
 {
  "id": "L10_voir_des_amis___sa_famil",
  "lesson": 10,
  "fr": "voir des amis / sa famille",
  "zh": "見朋友/家人",
  "note": ""
 },
 {
  "id": "L11_Vous_avez_trouvé_des_meu",
  "lesson": 11,
  "fr": "Vous avez trouvé des meubles ?",
  "zh": "你們找到家具了嗎？",
  "note": ""
 },
 {
  "id": "L11_On_n'a_pas_trouvé_de_lit",
  "lesson": 11,
  "fr": "On n'a pas trouvé de lit, mais on a trouvé deux fauteuils.",
  "zh": "我們沒找到床，但找到兩張扶手椅。",
  "note": ""
 },
 {
  "id": "L11_Ils_ont_déménagé_il_y_a_",
  "lesson": 11,
  "fr": "Ils ont déménagé il y a dix jours.",
  "zh": "他們十天前搬家了。",
  "note": ""
 },
 {
  "id": "L11_Tu_connais_Marc_et_Lydia",
  "lesson": 11,
  "fr": "Tu connais Marc et Lydia ? — Je les connais un peu.",
  "zh": "你認識 Marc 和 Lydia 嗎？— 我有點認識他們。",
  "note": ""
 },
 {
  "id": "L11_J'adore_ce_quartier__je_",
  "lesson": 11,
  "fr": "J'adore ce quartier, je le trouve très agréable.",
  "zh": "我很愛這個街區，我覺得它很宜人。",
  "note": ""
 },
 {
  "id": "L11_Tu_as_vu_Sophie_____Non_",
  "lesson": 11,
  "fr": "Tu as vu Sophie ? — Non, je ne l'ai pas vue.",
  "zh": "你有看到 Sophie 嗎？— 沒，我沒看到她。",
  "note": ""
 },
 {
  "id": "L11_déménager",
  "lesson": 11,
  "fr": "déménager",
  "zh": "搬出（move out）",
  "note": "On a déménagé il y a 10 jours."
 },
 {
  "id": "L11_emménager",
  "lesson": 11,
  "fr": "emménager",
  "zh": "搬入（move in）",
  "note": "On emménage dans le nouvel appartement."
 },
 {
  "id": "L11_la_chambre",
  "lesson": 11,
  "fr": "la chambre",
  "zh": "臥室",
  "note": "⚠️ chambre = 臥室；pièce = 泛指任何房間"
 },
 {
  "id": "L11_la_salle_de_bain",
  "lesson": 11,
  "fr": "la salle de bain",
  "zh": "浴室",
  "note": "bain = 浴缸；se baigner = 泡澡／游泳"
 },
 {
  "id": "L11_la_cuisine",
  "lesson": 11,
  "fr": "la cuisine",
  "zh": "廚房",
  "note": ""
 },
 {
  "id": "L11_le_salon",
  "lesson": 11,
  "fr": "le salon",
  "zh": "客廳",
  "note": ""
 },
 {
  "id": "L11_la_salle_à_manger",
  "lesson": 11,
  "fr": "la salle à manger",
  "zh": "餐廳",
  "note": ""
 },
 {
  "id": "L11_le_séjour",
  "lesson": 11,
  "fr": "le séjour",
  "zh": "起居室",
  "note": "salon + salle à manger 合一 = le séjour"
 },
 {
  "id": "L11_le_grenier",
  "lesson": 11,
  "fr": "le grenier",
  "zh": "閣樓",
  "note": "法國人堆雜物的地方 → vide-grenier"
 },
 {
  "id": "L11_la_terrasse",
  "lesson": 11,
  "fr": "la terrasse",
  "zh": "露台",
  "note": "法國人愛在 terrasse 喝咖啡、吃飯"
 },
 {
  "id": "L11_le_jardin",
  "lesson": 11,
  "fr": "le jardin",
  "zh": "花園",
  "note": ""
 },
 {
  "id": "L11_le_frigo",
  "lesson": 11,
  "fr": "le frigo",
  "zh": "冰箱",
  "note": "réfrigérateur 的俗稱（品牌名轉通用詞，同 renard 取代 goupil）"
 },
 {
  "id": "L11_le_four_à_micro_ondes",
  "lesson": 11,
  "fr": "le four à micro-ondes",
  "zh": "微波爐",
  "note": "也說 le micro-ondes；four 單獨用 = 烤箱"
 },
 {
  "id": "L11_le_lave_linge",
  "lesson": 11,
  "fr": "le lave-linge",
  "zh": "洗衣機",
  "note": "linge = 待洗的衣物（dirty laundry）"
 },
 {
  "id": "L11_le_lave_vaisselle",
  "lesson": 11,
  "fr": "le lave-vaisselle",
  "zh": "洗碗機",
  "note": "法國家庭幾乎都有"
 },
 {
  "id": "L11_la_cuisinière",
  "lesson": 11,
  "fr": "la cuisinière",
  "zh": "瓦斯爐／電磁爐",
  "note": ""
 },
 {
  "id": "L11_j'ai",
  "lesson": 11,
  "fr": "j'ai",
  "zh": "-ER → 去掉 -er 加 -é",
  "note": "j'ai trouvé"
 },
 {
  "id": "L11_à_gauche__de_",
  "lesson": 11,
  "fr": "à gauche (de)",
  "zh": "在…左邊",
  "note": "à gauche du canapé"
 },
 {
  "id": "L11_à_droite__de_",
  "lesson": 11,
  "fr": "à droite (de)",
  "zh": "在…右邊",
  "note": "à droite de la fenêtre"
 },
 {
  "id": "L11_sur",
  "lesson": 11,
  "fr": "sur",
  "zh": "在…上面",
  "note": "sur la table"
 },
 {
  "id": "L11_sous",
  "lesson": 11,
  "fr": "sous",
  "zh": "在…下面",
  "note": "sous la chaise"
 },
 {
  "id": "L11_devant",
  "lesson": 11,
  "fr": "devant",
  "zh": "在…前面",
  "note": "devant le canapé"
 },
 {
  "id": "L11_derrière",
  "lesson": 11,
  "fr": "derrière",
  "zh": "在…後面",
  "note": "Je place la table derrière le canapé."
 },
 {
  "id": "L11_à_côté__de_",
  "lesson": 11,
  "fr": "à côté (de)",
  "zh": "在…旁邊",
  "note": "à côté des fenêtres"
 },
 {
  "id": "L11_en_face__de_",
  "lesson": 11,
  "fr": "en face (de)",
  "zh": "在…對面",
  "note": "en face du canapé"
 },
 {
  "id": "L11_entre",
  "lesson": 11,
  "fr": "entre",
  "zh": "在…之間",
  "note": "entre les deux chaises"
 },
 {
  "id": "L11_l'appartement__m__",
  "lesson": 11,
  "fr": "l'appartement (m.)",
  "zh": "公寓",
  "note": ""
 },
 {
  "id": "L11_l'ascenseur__m__",
  "lesson": 11,
  "fr": "l'ascenseur (m.)",
  "zh": "電梯",
  "note": "parties communes（公共區域）"
 },
 {
  "id": "L11_le_couloir",
  "lesson": 11,
  "fr": "le couloir",
  "zh": "走廊",
  "note": "parties communes"
 },
 {
  "id": "L11_l'escalier__m__",
  "lesson": 11,
  "fr": "l'escalier (m.)",
  "zh": "樓梯",
  "note": "parties communes"
 },
 {
  "id": "L11_le_hall",
  "lesson": 11,
  "fr": "le hall",
  "zh": "大廳入口",
  "note": "parties communes"
 },
 {
  "id": "L11_le_balcon",
  "lesson": 11,
  "fr": "le balcon",
  "zh": "陽台",
  "note": ""
 },
 {
  "id": "L11_le_local_à_poubelles",
  "lesson": 11,
  "fr": "le local à poubelles",
  "zh": "垃圾房",
  "note": ""
 },
 {
  "id": "L11_le_local_à_vélos",
  "lesson": 11,
  "fr": "le local à vélos",
  "zh": "腳踏車停放室",
  "note": ""
 },
 {
  "id": "L11_la_pelouse",
  "lesson": 11,
  "fr": "la pelouse",
  "zh": "草坪",
  "note": "Défense de marcher sur la pelouse."
 },
 {
  "id": "L11_la_résidence",
  "lesson": 11,
  "fr": "la résidence",
  "zh": "住宅社區",
  "note": ""
 },
 {
  "id": "L11_le_la_voisin_e_",
  "lesson": 11,
  "fr": "le/la voisin(e)",
  "zh": "鄰居",
  "note": "Respectez vos voisins !"
 },
 {
  "id": "L11_les_meubles__m_pl__",
  "lesson": 11,
  "fr": "les meubles (m.pl.)",
  "zh": "家具（總稱）",
  "note": "Vous avez trouvé des meubles ?"
 },
 {
  "id": "L11_un_lit",
  "lesson": 11,
  "fr": "un lit",
  "zh": "床",
  "note": "On n'a pas trouvé de lit."
 },
 {
  "id": "L11_un_canapé",
  "lesson": 11,
  "fr": "un canapé",
  "zh": "沙發",
  "note": "Je place la table derrière le canapé."
 },
 {
  "id": "L11_un_fauteuil",
  "lesson": 11,
  "fr": "un fauteuil",
  "zh": "扶手椅",
  "note": "On a trouvé deux fauteuils pas chers."
 },
 {
  "id": "L11_une_armoire",
  "lesson": 11,
  "fr": "une armoire",
  "zh": "衣櫃",
  "note": "On cherche aussi une armoire."
 },
 {
  "id": "L11_un_bureau",
  "lesson": 11,
  "fr": "un bureau",
  "zh": "書桌",
  "note": ""
 },
 {
  "id": "L11_une_table_basse",
  "lesson": 11,
  "fr": "une table basse",
  "zh": "茶几",
  "note": ""
 },
 {
  "id": "L11_des_objets_de_décoration",
  "lesson": 11,
  "fr": "des objets de décoration",
  "zh": "裝飾物品",
  "note": ""
 },
 {
  "id": "L12_le_bras",
  "lesson": 12,
  "fr": "le bras",
  "zh": "手臂",
  "note": ""
 },
 {
  "id": "L12_le_dos",
  "lesson": 12,
  "fr": "le dos",
  "zh": "背部",
  "note": "j'ai mal au dos = 背痛"
 },
 {
  "id": "L12_le_genou",
  "lesson": 12,
  "fr": "le genou",
  "zh": "膝蓋",
  "note": "複數：les genoux"
 },
 {
  "id": "L12_la_gorge",
  "lesson": 12,
  "fr": "la gorge",
  "zh": "喉嚨",
  "note": "j'ai mal à la gorge = 喉嚨痛"
 },
 {
  "id": "L12_la_jambe",
  "lesson": 12,
  "fr": "la jambe",
  "zh": "腿",
  "note": ""
 },
 {
  "id": "L12_la_main",
  "lesson": 12,
  "fr": "la main",
  "zh": "手",
  "note": ""
 },
 {
  "id": "L12_le_pied",
  "lesson": 12,
  "fr": "le pied",
  "zh": "腳",
  "note": ""
 },
 {
  "id": "L12_la_tête",
  "lesson": 12,
  "fr": "la tête",
  "zh": "頭",
  "note": ""
 },
 {
  "id": "L12_le_ventre",
  "lesson": 12,
  "fr": "le ventre",
  "zh": "肚子",
  "note": ""
 },
 {
  "id": "L12_la_bouche",
  "lesson": 12,
  "fr": "la bouche",
  "zh": "嘴巴",
  "note": ""
 },
 {
  "id": "L12_la_dent___les_dents",
  "lesson": 12,
  "fr": "la dent / les dents",
  "zh": "牙齒",
  "note": "le dentiste = 牙醫"
 },
 {
  "id": "L12_le_nez",
  "lesson": 12,
  "fr": "le nez",
  "zh": "鼻子",
  "note": ""
 },
 {
  "id": "L12_l'_il__m_____les_yeux",
  "lesson": 12,
  "fr": "l'œil (m.) / les yeux",
  "zh": "眼睛",
  "note": "⚠️ 不規則複數：œil → yeux"
 },
 {
  "id": "L12_l'oreille__f__",
  "lesson": 12,
  "fr": "l'oreille (f.)",
  "zh": "耳朵",
  "note": ""
 },
 {
  "id": "L12_la_fièvre",
  "lesson": 12,
  "fr": "la fièvre",
  "zh": "發燒",
  "note": "J'ai 39°C."
 },
 {
  "id": "L12_la_grippe",
  "lesson": 12,
  "fr": "la grippe",
  "zh": "流感",
  "note": "比 rhume 嚴重，會發燒"
 },
 {
  "id": "L12_un_rhume",
  "lesson": 12,
  "fr": "un rhume",
  "zh": "感冒（輕微）",
  "note": "流鼻水、輕微不適"
 },
 {
  "id": "L12_tousser___la_toux",
  "lesson": 12,
  "fr": "tousser / la toux",
  "zh": "咳嗽 / 咳嗽（名詞）",
  "note": ""
 },
 {
  "id": "L12_éternuer",
  "lesson": 12,
  "fr": "éternuer",
  "zh": "打噴嚏",
  "note": ""
 },
 {
  "id": "L12_malade",
  "lesson": 12,
  "fr": "malade",
  "zh": "生病的",
  "note": "Je suis malade."
 },
 {
  "id": "L12_l'hôpital__m__",
  "lesson": 12,
  "fr": "l'hôpital (m.)",
  "zh": "醫院",
  "note": "Je suis allé à l'hôpital."
 },
 {
  "id": "L12_la_pharmacie",
  "lesson": 12,
  "fr": "la pharmacie",
  "zh": "藥局",
  "note": ""
 },
 {
  "id": "L12_le_paracétamol",
  "lesson": 12,
  "fr": "le paracétamol",
  "zh": "普拿疼",
  "note": ""
 },
 {
  "id": "L12_le_sirop",
  "lesson": 12,
  "fr": "le sirop",
  "zh": "糖漿（止咳藥）",
  "note": ""
 },
 {
  "id": "L12_la_radio",
  "lesson": 12,
  "fr": "la radio",
  "zh": "X 光",
  "note": ""
 },
 {
  "id": "L12_la_vitamine_C",
  "lesson": 12,
  "fr": "la vitamine C",
  "zh": "維他命 C",
  "note": ""
 },
 {
  "id": "L12_la_visite_à_domicile",
  "lesson": 12,
  "fr": "la visite à domicile",
  "zh": "醫生到府看診",
  "note": "↔ téléconsultation（線上看診）"
 },
 {
  "id": "L12_le_médecin___le_docteur",
  "lesson": 12,
  "fr": "le médecin / le docteur",
  "zh": "醫生",
  "note": "chez mon médecin = 去看醫生"
 },
 {
  "id": "L12_le_dentiste",
  "lesson": 12,
  "fr": "le dentiste",
  "zh": "牙醫",
  "note": "médecin spécialiste des dents"
 },
 {
  "id": "L12_l'infirmier___l'infirmiè",
  "lesson": 12,
  "fr": "l'infirmier / l'infirmière",
  "zh": "護士（男/女）",
  "note": ""
 },
 {
  "id": "L12_le_pharmacien___la_pharm",
  "lesson": 12,
  "fr": "le pharmacien / la pharmacienne",
  "zh": "藥師（男/女）",
  "note": ""
 },
 {
  "id": "L13_la_salle_de_sport",
  "lesson": 13,
  "fr": "la salle de sport",
  "zh": "健身房",
  "note": "(f) ≠ gymnase（體操場/學校體育館）"
 },
 {
  "id": "L13_le_gymnase",
  "lesson": 13,
  "fr": "le gymnase",
  "zh": "體育館（體操）",
  "note": "(m) 做 gymnastique 的地方"
 },
 {
  "id": "L13_l'appareil__de_sport_",
  "lesson": 13,
  "fr": "l'appareil (de sport)",
  "zh": "健身器材",
  "note": "(m) appareil = 機器裝置（cf. appareil photo = 相機）"
 },
 {
  "id": "L13_le_vestiaire",
  "lesson": 13,
  "fr": "le vestiaire",
  "zh": "更衣室",
  "note": "(m) "
 },
 {
  "id": "L13_la_douche",
  "lesson": 13,
  "fr": "la douche",
  "zh": "淋浴",
  "note": "(f) prendre une douche = 洗澡"
 },
 {
  "id": "L13_le_sauna",
  "lesson": 13,
  "fr": "le sauna",
  "zh": "三溫暖",
  "note": "(m) "
 },
 {
  "id": "L13_la_serviette_de_bain",
  "lesson": 13,
  "fr": "la serviette de bain",
  "zh": "浴巾",
  "note": "(f) 放在器材上用"
 },
 {
  "id": "L13_le_maillot_de_bain",
  "lesson": 13,
  "fr": "le maillot de bain",
  "zh": "泳衣",
  "note": "(m) 進三溫暖必穿"
 },
 {
  "id": "L13_le_coach___l'entraîneur",
  "lesson": 13,
  "fr": "le coach / l'entraîneur",
  "zh": "教練",
  "note": "(m) entraîner = 訓練；entraîneur = 訓練者"
 },
 {
  "id": "L13_le_professeur_particulie",
  "lesson": 13,
  "fr": "le professeur particulier",
  "zh": "私人教練／家教",
  "note": "(m) particulier = 一對一的人"
 },
 {
  "id": "L13_le_certificat_médical",
  "lesson": 13,
  "fr": "le certificat médical",
  "zh": "醫療證明",
  "note": "(m) 入會前有時需要"
 },
 {
  "id": "L13_allumer",
  "lesson": 13,
  "fr": "allumer",
  "zh": "開（電器）",
  "note": "allumer ≠ éteindre（關）"
 },
 {
  "id": "L13_éteindre",
  "lesson": 13,
  "fr": "éteindre",
  "zh": "關（電器）",
  "note": "éteindre son téléphone = 關手機"
 },
 {
  "id": "L13_nettoyer",
  "lesson": 13,
  "fr": "nettoyer",
  "zh": "清潔、擦乾淨",
  "note": "après l'utilisation（使用後清潔器材）"
 },
 {
  "id": "L13_Pouvoir___inf_",
  "lesson": 13,
  "fr": "Pouvoir + inf.",
  "zh": "較婉轉，是建議",
  "note": "較婉轉，是建議"
 },
 {
  "id": "L13_Il_faut___inf_",
  "lesson": 13,
  "fr": "Il faut + inf.",
  "zh": "一般通則，針對所有人",
  "note": "一般通則，針對所有人"
 },
 {
  "id": "L13_la_corde_à_sauter",
  "lesson": 13,
  "fr": "la corde à sauter",
  "zh": "跳繩",
  "note": "100–150 kcal / 20 min"
 },
 {
  "id": "L13_la_marche_rapide",
  "lesson": 13,
  "fr": "la marche rapide",
  "zh": "快走",
  "note": "150–300 kcal / 30 min"
 },
 {
  "id": "L13_le_yoga",
  "lesson": 13,
  "fr": "le yoga",
  "zh": "瑜伽",
  "note": "150–300 kcal / 1h"
 },
 {
  "id": "L13_faire_de_la_trottinette",
  "lesson": 13,
  "fr": "faire de la trottinette",
  "zh": "騎滑板車",
  "note": "150–300 kcal"
 },
 {
  "id": "L13_jardiner",
  "lesson": 13,
  "fr": "jardiner",
  "zh": "園藝",
  "note": "300–450 kcal / 1h30"
 },
 {
  "id": "L13_la_natation",
  "lesson": 13,
  "fr": "la natation",
  "zh": "游泳",
  "note": "300–450 kcal / 30 min"
 },
 {
  "id": "L13_la_course_à_pied",
  "lesson": 13,
  "fr": "la course à pied",
  "zh": "跑步",
  "note": "+450 kcal / 30 min"
 },
 {
  "id": "L13_le_judo",
  "lesson": 13,
  "fr": "le judo",
  "zh": "柔道",
  "note": "+450 kcal"
 },
 {
  "id": "L13_le_rugby",
  "lesson": 13,
  "fr": "le rugby",
  "zh": "橄欖球",
  "note": "+450 kcal / match"
 },
 {
  "id": "L13_le_tennis",
  "lesson": 13,
  "fr": "le tennis",
  "zh": "網球",
  "note": "+450 kcal / 1h30"
 },
 {
  "id": "L13_la_musculation",
  "lesson": 13,
  "fr": "la musculation",
  "zh": "重訓",
  "note": "+450 kcal / 1h30"
 },
 {
  "id": "L13_la_gymnastique",
  "lesson": 13,
  "fr": "la gymnastique",
  "zh": "體操",
  "note": "300–450 kcal / 1h30"
 },
 {
  "id": "L13_le_volley__le_volley_bal",
  "lesson": 13,
  "fr": "le volley (le volley-ball)",
  "zh": "排球",
  "note": "+450 kcal"
 },
 {
  "id": "L13_l'alimentation_saine",
  "lesson": 13,
  "fr": "l'alimentation saine",
  "zh": "健康飲食",
  "note": "(f) avoir une alimentation saine"
 },
 {
  "id": "L13_équilibré_e_",
  "lesson": 13,
  "fr": "équilibré(e)",
  "zh": "均衡的",
  "note": "(adj) une alimentation équilibrée（= saine）"
 },
 {
  "id": "L13_gras___grasse",
  "lesson": 13,
  "fr": "gras / grasse",
  "zh": "油脂多的",
  "note": "(adj) Le saumon est un aliment gras."
 },
 {
  "id": "L13_salé_e_",
  "lesson": 13,
  "fr": "salé(e)",
  "zh": "鹹的",
  "note": "(adj) les aliments salés（鹹食）"
 },
 {
  "id": "L13_sucré_e_",
  "lesson": 13,
  "fr": "sucré(e)",
  "zh": "甜的",
  "note": "(adj) les aliments sucrés（甜食）"
 },
 {
  "id": "L13_l'huile",
  "lesson": 13,
  "fr": "l'huile",
  "zh": "食用油",
  "note": "(f) huile d'olive（橄欖油）"
 },
 {
  "id": "L13_la_calorie___kcal",
  "lesson": 13,
  "fr": "la calorie / kcal",
  "zh": "卡路里",
  "note": "(f) beaucoup de calories dans les sucrés"
 },
 {
  "id": "L13_le_produit",
  "lesson": 13,
  "fr": "le produit",
  "zh": "食品/產品",
  "note": "(m) produits gras, salés, sucrés"
 },
 {
  "id": "L13_le_saumon",
  "lesson": 13,
  "fr": "le saumon",
  "zh": "鮭魚",
  "note": "(m) aliment gras mais bon pour la santé"
 },
 {
  "id": "L13_le_chocolat_noir",
  "lesson": 13,
  "fr": "le chocolat noir",
  "zh": "黑巧克力",
  "note": "(m) bon pour la santé mais beaucoup de calories"
 },
 {
  "id": "L13_les_vacances",
  "lesson": 13,
  "fr": "les vacances",
  "zh": "假期",
  "note": "(f pl) 永遠複數；Bonnes vacances !"
 },
 {
  "id": "L13_l'hébergement",
  "lesson": 13,
  "fr": "l'hébergement",
  "zh": "住宿（泛指）",
  "note": "(m) un endroit où dormir"
 },
 {
  "id": "L13_le_logement",
  "lesson": 13,
  "fr": "le logement",
  "zh": "住所/住處",
  "note": "(m) logement = place to live"
 },
 {
  "id": "L13_la_location",
  "lesson": 13,
  "fr": "la location",
  "zh": "租屋/租借",
  "note": "(f) louer = 租；location = 租的東西"
 },
 {
  "id": "L13_la_chambre_d'hôte",
  "lesson": 13,
  "fr": "la chambre d'hôte",
  "zh": "民宿（主人同住）",
  "note": "(f) hôte = 主人；住在別人家裡的房間"
 },
 {
  "id": "L13_l'échange_de_maison",
  "lesson": 13,
  "fr": "l'échange de maison",
  "zh": "換屋度假",
  "note": "(m) 互換住所，gratuit（免費）"
 },
 {
  "id": "L13_le_camping",
  "lesson": 13,
  "fr": "le camping",
  "zh": "露營",
  "note": "(m) dormir sous une tente"
 },
 {
  "id": "L13_la_tente",
  "lesson": 13,
  "fr": "la tente",
  "zh": "帳篷",
  "note": "(f) "
 },
 {
  "id": "L13_le_van",
  "lesson": 13,
  "fr": "le van",
  "zh": "廂型車（車旅）",
  "note": "(m) voyage en van = 車旅"
 },
 {
  "id": "L13_le_parasol",
  "lesson": 13,
  "fr": "le parasol",
  "zh": "陽傘（遮陽）",
  "note": "(m) ≠ parapluie（雨傘）"
 },
 {
  "id": "L13_parapluie",
  "lesson": 13,
  "fr": "parapluie",
  "zh": "雨傘",
  "note": "(m) para- = 防；pluie = 雨"
 },
 {
  "id": "L13_la_météo",
  "lesson": 13,
  "fr": "la météo",
  "zh": "天氣（預報）",
  "note": "(f) La météo peut être un problème."
 },
 {
  "id": "L13_peut_être",
  "lesson": 13,
  "fr": "peut-être",
  "zh": "也許、可能",
  "note": "(adv) ⚠️ peut-être 是一個詞，≠ peut être（能夠是）"
 },
 {
  "id": "L13_gratuit_e_",
  "lesson": 13,
  "fr": "gratuit(e)",
  "zh": "免費的",
  "note": "(adj) Les logements sont gratuits. （換屋）"
 },
 {
  "id": "L13_écologique",
  "lesson": 13,
  "fr": "écologique",
  "zh": "環保的",
  "note": "(adj) plus écologique que l'avion"
 },
 {
  "id": "L13_indépendant_e_",
  "lesson": 13,
  "fr": "indépendant(e)",
  "zh": "自由/獨立的",
  "note": "(adj) être indépendant avec un van"
 },
 {
  "id": "L14_quelqu'un",
  "lesson": 14,
  "fr": "quelqu'un",
  "zh": "某人",
  "note": ""
 },
 {
  "id": "L14_quelque_chose",
  "lesson": 14,
  "fr": "quelque chose",
  "zh": "某事、某東西",
  "note": ""
 },
 {
  "id": "L14_Est_ce_que_le_petit_déje",
  "lesson": 14,
  "fr": "Est-ce que le petit déjeuner est compris ?",
  "zh": "早餐有含嗎？",
  "note": ""
 },
 {
  "id": "L14_Est_ce_que_les_animaux_s",
  "lesson": 14,
  "fr": "Est-ce que les animaux sont acceptés ?",
  "zh": "可以帶寵物嗎？",
  "note": ""
 },
 {
  "id": "L14_Est_ce_qu'il_y_a_un_park",
  "lesson": 14,
  "fr": "Est-ce qu'il y a un parking pour les voitures ?",
  "zh": "有停車場嗎？",
  "note": ""
 },
 {
  "id": "L14_J'arrive_le____et_je_par",
  "lesson": 14,
  "fr": "J'arrive le 25 et je pars le 28.",
  "zh": "我 25 號到、28 號走。",
  "note": ""
 },
 {
  "id": "L14_bon___meilleur__que_",
  "lesson": 14,
  "fr": "bon → meilleur (que)",
  "zh": "好 → 更好",
  "note": "❌ plus bon ✅ La cuisine est meilleure au « Bistrot de la mer » que « Chez Albert »."
 },
 {
  "id": "L14_mauvais___pire__que_",
  "lesson": 14,
  "fr": "mauvais → pire (que)",
  "zh": "壞 → 更壞",
  "note": "❌ plus mauvais ✅ pire"
 },
 {
  "id": "L14_J'aime_le_café__mais_le_",
  "lesson": 14,
  "fr": "J'aime le café, mais le thé est meilleur.",
  "zh": "我喜歡咖啡，但茶更好。",
  "note": ""
 },
 {
  "id": "L14_de_la___de",
  "lesson": 14,
  "fr": "Je viens de France.",
  "zh": "我來自法國。（陰性國家：de la 要縮成 de，不說 de la France）",
  "note": "同樣規則：la Chine → je viens de Chine"
 },
 {
  "id": "L14_de_du___d'_devant_a__e__",
  "lesson": 14,
  "fr": "de/du → d' devant a, e, i, o, u",
  "zh": "母音前縮寫",
  "note": "d'Irlande、d'Irak、d'Amsterdam"
 },
 {
  "id": "L14_Je_viens_de_Taïwan_",
  "lesson": 14,
  "fr": "Je viens de Taïwan.",
  "zh": "我來自台灣。（國名不加冠詞，跟城市一樣處理）",
  "note": "我們不說 le Taïwan，就像不說 le Bordeaux"
 },
 {
  "id": "L14_Il_est_sorti____Elle_est",
  "lesson": 14,
  "fr": "Il est sorti. / Elle est sortie.",
  "zh": "他出去了／她出去了",
  "note": "陰性 +e"
 },
 {
  "id": "L14_Ils_sont_sortis____Elles",
  "lesson": 14,
  "fr": "Ils sont sortis. / Elles sont sorties.",
  "zh": "他們／她們出去了",
  "note": "複數 +s；全女性 +es"
 },
 {
  "id": "L14_nous_sommes_allé_e_s",
  "lesson": 14,
  "fr": "nous sommes allé(e)s",
  "zh": "我們去了",
  "note": "nous 是誰決定加不加 e：一男九女也算「有男」→ 不加 e；全女才加"
 },
 {
  "id": "L14_C'est_un_pays_génial__",
  "lesson": 14,
  "fr": "C'est un pays génial !",
  "zh": "這國家超讚！",
  "note": ""
 },
 {
  "id": "L14_C'est_magnifique__",
  "lesson": 14,
  "fr": "C'est magnifique !",
  "zh": "太美了！",
  "note": "L'Islande est magnifique."
 },
 {
  "id": "L14_Les_gens_sont_gentils_",
  "lesson": 14,
  "fr": "Les gens sont gentils.",
  "zh": "人很友善",
  "note": "les gens = 泛指人們"
 },
 {
  "id": "L14_C'est_sympa_et_animé_",
  "lesson": 14,
  "fr": "C'est sympa et animé.",
  "zh": "很棒又熱鬧",
  "note": "animé = 熱鬧（≠ 英文 anime 動畫！）Taipei est très animé."
 },
 {
  "id": "L14_Alors__le_wwoofing__qu'e",
  "lesson": 14,
  "fr": "Alors, le wwoofing, qu'est-ce que c'est ?",
  "zh": "那麼，wwoofing 是什麼？",
  "note": "Alors + qu'est-ce que c'est = 開啟話題萬用組"
 },
 {
  "id": "L14__a_va__",
  "lesson": 14,
  "fr": "Ça va ?",
  "zh": "（課堂上）這樣懂嗎？",
  "note": "不只是問好——老師確認理解的口頭禪"
 },
 {
  "id": "L14_On_peut_passer_ça_",
  "lesson": 14,
  "fr": "On peut passer ça.",
  "zh": "這個我們可以跳過",
  "note": ""
 },
 {
  "id": "L14_Je_vais_te_montrer_",
  "lesson": 14,
  "fr": "Je vais te montrer.",
  "zh": "我示範給你看",
  "note": ""
 },
 {
  "id": "L14_C'est_pareil_",
  "lesson": 14,
  "fr": "C'est pareil.",
  "zh": "一樣的意思",
  "note": "allé 和 parti 差在哪？C'est pareil."
 },
 {
  "id": "L14_Je_ne_connais_pas_non_pl",
  "lesson": 14,
  "fr": "Je ne connais pas non plus.",
  "zh": "我也不認識",
  "note": "non plus = 否定句的「也」（肯定句用 aussi）"
 },
 {
  "id": "L14_Je_ne_connais_que_Monet_",
  "lesson": 14,
  "fr": "Je ne connais que Monet.",
  "zh": "我只認識莫內",
  "note": "⭐ ne... que = 只——超好用句型"
 },
 {
  "id": "L14_Non__je_ne_crois_pas_",
  "lesson": 14,
  "fr": "Non, je ne crois pas.",
  "zh": "不，我不這麼認為",
  "note": ""
 },
 {
  "id": "L14_C'est_à_côté_de_l'Espagn",
  "lesson": 14,
  "fr": "C'est à côté de l'Espagne.",
  "zh": "在西班牙旁邊",
  "note": ""
 },
 {
  "id": "L14_C'est_près_de_où_je_vis_",
  "lesson": 14,
  "fr": "C'est près de où je vis.",
  "zh": "離我住的地方很近",
  "note": ""
 },
 {
  "id": "L14_Je_t'envoie_ça_sur_AirDr",
  "lesson": 14,
  "fr": "Je t'envoie ça sur AirDrop.",
  "zh": "我用 AirDrop 傳給你",
  "note": "envoyer qqch à qqn 的現代日常版"
 },
 {
  "id": "L14_Tu_peux_dire___",
  "lesson": 14,
  "fr": "Tu peux dire...",
  "zh": "你可以說...",
  "note": ""
 },
 {
  "id": "L14___la_semaine_prochaine__",
  "lesson": 14,
  "fr": "À la semaine prochaine !",
  "zh": "下週見！",
  "note": ""
 },
 {
  "id": "L14_meilleur___plus_bon",
  "lesson": 14,
  "fr": "meilleur ≠ plus bon",
  "zh": "差點說出 plus bon",
  "note": "跟英文不說 more good 一樣；只有 bon→meilleur、mauvais→pire 兩個例外"
 },
 {
  "id": "L14_le_wwoofing",
  "lesson": 14,
  "fr": "le wwoofing",
  "zh": "農場志工換宿",
  "note": "(m) 工作 4 小時/天換免費食宿"
 },
 {
  "id": "L14_la_micro_aventure",
  "lesson": 14,
  "fr": "la micro-aventure",
  "zh": "微探險",
  "note": "(f) près de chez vous 的小冒險"
 },
 {
  "id": "L14_l'argent",
  "lesson": 14,
  "fr": "l'argent",
  "zh": "錢",
  "note": "(m) ⚠️ 也是「銀」——古時用銀當錢；en argent = 銀製的"
 },
 {
  "id": "L14_biologique",
  "lesson": 14,
  "fr": "biologique",
  "zh": "有機的",
  "note": "(adj) une ferme biologique 有機農場；≠ 英文 biological"
 },
 {
  "id": "L14_gratuit___gratuitement",
  "lesson": 14,
  "fr": "gratuit / gratuitement",
  "zh": "免費的／免費地",
  "note": "(adj) c'est gratuit（形容詞）；manger gratuitement（副詞）"
 },
 {
  "id": "L14_courageux___courageuse",
  "lesson": 14,
  "fr": "courageux / courageuse",
  "zh": "勇敢的",
  "note": "(adj) -eux → -euse"
 },
 {
  "id": "L14_l'aventure",
  "lesson": 14,
  "fr": "l'aventure",
  "zh": "冒險",
  "note": "(f) vous adorez l'aventure ?"
 },
 {
  "id": "L14_une_expérience",
  "lesson": 14,
  "fr": "une expérience",
  "zh": "體驗、經驗",
  "note": "(f) faites une expérience différente"
 },
 {
  "id": "L14_un_igloo",
  "lesson": 14,
  "fr": "un igloo",
  "zh": "冰屋",
  "note": "(m) nuit dans un igloo（微探險例子）"
 },
 {
  "id": "L14_extraordinaire",
  "lesson": 14,
  "fr": "extraordinaire",
  "zh": "非凡的",
  "note": "(adj) vivez quelques heures extraordinaires !"
 },
 {
  "id": "L14_offrir__à_qqn_",
  "lesson": 14,
  "fr": "offrir (à qqn)",
  "zh": "送（給某人）",
  "note": "on lui a offert une journée = 我們送了他一天（COI）"
 },
 {
  "id": "L14_une_journée",
  "lesson": 14,
  "fr": "une journée",
  "zh": "一整天",
  "note": "(f) une journée au circuit du Mans"
 },
 {
  "id": "L14_la_campagne",
  "lesson": 14,
  "fr": "la campagne",
  "zh": "鄉下",
  "note": "(f) à la campagne；⚠️ 不是 champagne（香檳）！"
 },
 {
  "id": "L14_l'île",
  "lesson": 14,
  "fr": "l'île",
  "zh": "島",
  "note": "(f) Taïwan est une île"
 },
 {
  "id": "L14_la_mer",
  "lesson": 14,
  "fr": "la mer",
  "zh": "海",
  "note": "(f) à la mer"
 },
 {
  "id": "L14_la_montagne",
  "lesson": 14,
  "fr": "la montagne",
  "zh": "山",
  "note": "(f) à la montagne"
 },
 {
  "id": "L14_le_village",
  "lesson": 14,
  "fr": "le village",
  "zh": "村莊",
  "note": "(m) visiter un village traditionnel"
 },
 {
  "id": "L14_l'hébergement",
  "lesson": 14,
  "fr": "l'hébergement",
  "zh": "住宿（總稱）",
  "note": "(m) 可以睡覺的地方的統稱"
 },
 {
  "id": "L14_le_camping",
  "lesson": 14,
  "fr": "le camping",
  "zh": "露營／露營區",
  "note": "(m) 野營帳篷或 camping de vacances（有 mobil-home 的營地）"
 },
 {
  "id": "L14_la_tente",
  "lesson": 14,
  "fr": "la tente",
  "zh": "帳篷",
  "note": "(f) on dort sous une tente（睡「在帳篷下」）"
 },
 {
  "id": "L14_la_chambre_d'hôtes",
  "lesson": 14,
  "fr": "la chambre d'hôtes",
  "zh": "民宿（含主人）",
  "note": "(f) une chambre avec des personnes = 跟屋主住"
 },
 {
  "id": "L14_l'échange_d'appartements",
  "lesson": 14,
  "fr": "l'échange d'appartements",
  "zh": "換屋",
  "note": "(m) échange de maisons 同理；上一課看過"
 },
 {
  "id": "L14_la_ferme",
  "lesson": 14,
  "fr": "la ferme",
  "zh": "農場",
  "note": "(f) une maison avec des animaux à la campagne"
 },
 {
  "id": "L14_la_location__de_vacances",
  "lesson": 14,
  "fr": "la location (de vacances)",
  "zh": "度假租屋",
  "note": "(f) ⚠️ location = 租，不是英文 location！租一週；長租一年也叫 location"
 },
 {
  "id": "L14_le_logement",
  "lesson": 14,
  "fr": "le logement",
  "zh": "住所",
  "note": "(m) housing 總稱；location 是租的行為"
 },
 {
  "id": "L14_l'auberge_de_jeunesse",
  "lesson": 14,
  "fr": "l'auberge de jeunesse",
  "zh": "青年旅館",
  "note": "(f) jeunesse = 年輕；多人一室（老師在里昂住過兩週）"
 },
 {
  "id": "L14_l'avion___l'aéroport",
  "lesson": 14,
  "fr": "l'avion → l'aéroport",
  "zh": "飛機 → 機場",
  "note": "(m) 🔊 a-é-ro-port 四個音節，不是英文 air-port"
 },
 {
  "id": "L14_le_van",
  "lesson": 14,
  "fr": "le van",
  "zh": "廂型車",
  "note": "(m) 跟英文一樣"
 },
 {
  "id": "L14_se_baigner",
  "lesson": 14,
  "fr": "se baigner",
  "zh": "玩水、泡水",
  "note": "反身動詞"
 },
 {
  "id": "L14_bronzer",
  "lesson": 14,
  "fr": "bronzer",
  "zh": "曬黑、日光浴",
  "note": "bronze 是古銅色 → bronzer = 變成這個顏色"
 },
 {
  "id": "L14_faire_de_la_randonnée",
  "lesson": 14,
  "fr": "faire de la randonnée",
  "zh": "健行",
  "note": "= hiking"
 },
 {
  "id": "L14_faire_du_surf",
  "lesson": 14,
  "fr": "faire du surf",
  "zh": "衝浪",
  "note": ""
 },
 {
  "id": "L14_goûter_la_cuisine_locale",
  "lesson": 14,
  "fr": "goûter la cuisine locale",
  "zh": "品嚐當地菜",
  "note": "goûter = 品嚐（動詞）"
 },
 {
  "id": "L14_le_goûter",
  "lesson": 14,
  "fr": "le goûter",
  "zh": "下午點心",
  "note": "(m) 🇫🇷 法國小孩四點的點心時間；因為晚餐吃很晚（19h30–20h）"
 },
 {
  "id": "L14_prendre_des_photos",
  "lesson": 14,
  "fr": "prendre des photos",
  "zh": "拍照",
  "note": ""
 },
 {
  "id": "L14_l'arrivée___le_départ",
  "lesson": 14,
  "fr": "l'arrivée / le départ",
  "zh": "抵達／離開",
  "note": "(f) date d'arrivée、date de départ"
 },
 {
  "id": "L14_la_chambre_simple___doub",
  "lesson": 14,
  "fr": "la chambre simple / double / familiale",
  "zh": "單人房／雙人房／家庭房",
  "note": "(f) "
 },
 {
  "id": "L14_le_lit_simple___double__",
  "lesson": 14,
  "fr": "le lit simple / double / bébé",
  "zh": "單人床／雙人床／嬰兒床",
  "note": "(m) "
 },
 {
  "id": "L14_le_petit_déjeuner_est_co",
  "lesson": 14,
  "fr": "le petit déjeuner est compris",
  "zh": "早餐含在內",
  "note": "compris = inclus；是分詞當形容詞，不是動詞變位！"
 },
 {
  "id": "L14_les_animaux_sont_accepté",
  "lesson": 14,
  "fr": "les animaux sont acceptés",
  "zh": "接受寵物",
  "note": "同上：accepté 分詞當形容詞"
 },
 {
  "id": "L14_le_parking_privé___publi",
  "lesson": 14,
  "fr": "le parking privé / public",
  "zh": "私人／公共停車場",
  "note": "(m) une école privée / publique 同一組字（法國人偏好公立學校）"
 },
 {
  "id": "L14_un_adulte___un_enfant",
  "lesson": 14,
  "fr": "un adulte / un enfant",
  "zh": "成人／小孩",
  "note": "(m) 幾歲算 enfant 每家標準不同，要確認"
 },
 {
  "id": "L14_du___au____juillet",
  "lesson": 14,
  "fr": "du 5 au 11 juillet",
  "zh": "7月5日到11日",
  "note": "du... au... = from... to..."
 },
 {
  "id": "L14_à_quelle_date__",
  "lesson": 14,
  "fr": "à quelle date ?",
  "zh": "什麼日期？",
  "note": "問訂房日期"
 },
 {
  "id": "L14_proche",
  "lesson": 14,
  "fr": "proche",
  "zh": "近的",
  "note": "(adj) = près；beaucoup plus proche 近很多"
 },
 {
  "id": "L14_neuf___ancien",
  "lesson": 14,
  "fr": "neuf / ancien",
  "zh": "新的／舊的（物）",
  "note": "(adj) ⚠️ 物品用 neuf/ancien"
 },
 {
  "id": "L14_jeune___vieux",
  "lesson": 14,
  "fr": "jeune / vieux",
  "zh": "年輕的／老的（人）",
  "note": "(adj) ⚠️ 人用 jeune/vieux——Je suis plus jeune que ma sœur."
 },
 {
  "id": "L14_celui___celle",
  "lesson": 14,
  "fr": "celui / celle",
  "zh": "那個（the one）",
  "note": "(m) celui-là = that one；比較兩家旅館時用"
 },
 {
  "id": "L14_la_proximité",
  "lesson": 14,
  "fr": "la proximité",
  "zh": "距離、鄰近程度",
  "note": "(f) proximité du centre-ville 900 m"
 },
 {
  "id": "L14_le_bâtiment",
  "lesson": 14,
  "fr": "le bâtiment",
  "zh": "建築物",
  "note": "(m) beauté du bâtiment 建築美感"
 },
 {
  "id": "L14_l'année_de_construction",
  "lesson": 14,
  "fr": "l'année de construction",
  "zh": "建造年份",
  "note": "(f) 1965"
 },
 {
  "id": "L14_écologique",
  "lesson": 14,
  "fr": "écologique",
  "zh": "環保的",
  "note": "(adj) Le vélo est plus écologique que l'avion."
 },
 {
  "id": "L14_agréable",
  "lesson": 14,
  "fr": "agréable",
  "zh": "宜人的、舒服的",
  "note": "(adj) Les vacances à la mer sont aussi agréables que..."
 },
 {
  "id": "L14_Il_est_rentré_de_Taïwan_",
  "lesson": 14,
  "fr": "Il est rentré de Taïwan.",
  "zh": "他從台灣回來了",
  "note": "rentrer de + 地方"
 },
 {
  "id": "L14_Elles_sont_parties_où_ce",
  "lesson": 14,
  "fr": "Elles sont parties où cet été ?",
  "zh": "她們今年夏天去了哪？",
  "note": "過去式（已經出發了）；parties 全女性 +es"
 },
 {
  "id": "L14_Elle_est_arrivée_à_la_pl",
  "lesson": 14,
  "fr": "Elle est arrivée à la plage.",
  "zh": "她到海灘了",
  "note": "arrivée +e"
 },
 {
  "id": "L14_il_y_a_trois_jours",
  "lesson": 14,
  "fr": "il y a trois jours",
  "zh": "三天前",
  "note": "⭐ il y a + 時間 = ...之前；Elle est arrivée au Kazakhstan il y a trois jours."
 },
 {
  "id": "L14_l'année_dernière___proch",
  "lesson": 14,
  "fr": "l'année dernière / prochaine",
  "zh": "去年／明年",
  "note": "dernière 上一個、prochaine 下一個；À la semaine prochaine ! 下週見"
 },
 {
  "id": "L14_une_région",
  "lesson": 14,
  "fr": "une région",
  "zh": "地區（法國行政區）",
  "note": "(f) en + région：en Bretagne, en Provence, en Normandie"
 },
 {
  "id": "L14_un_endroit",
  "lesson": 14,
  "fr": "un endroit",
  "zh": "地點、地方",
  "note": "(m) C'est un endroit parfait pour la randonnée."
 },
 {
  "id": "L14_un_champ",
  "lesson": 14,
  "fr": "un champ",
  "zh": "田野",
  "note": "(m) des champs（Cézanne 的畫）"
 },
 {
  "id": "L14_une_rivière",
  "lesson": 14,
  "fr": "une rivière",
  "zh": "河",
  "note": "(f) Courbet 的畫裡有"
 },
 {
  "id": "L14_l'herbe",
  "lesson": 14,
  "fr": "l'herbe",
  "zh": "草",
  "note": "(f) de l'herbe verte"
 },
 {
  "id": "L14_un_chemin",
  "lesson": 14,
  "fr": "un chemin",
  "zh": "小路",
  "note": "(m) Monet 的畫裡有"
 },
 {
  "id": "L14_un_lac",
  "lesson": 14,
  "fr": "un lac",
  "zh": "湖",
  "note": "(m) un lac dans le bois de Boulogne"
 },
 {
  "id": "L14_un_canard",
  "lesson": 14,
  "fr": "un canard",
  "zh": "鴨子",
  "note": "(m) il y a aussi deux canards"
 },
 {
  "id": "L14_faire_du_bateau",
  "lesson": 14,
  "fr": "faire du bateau",
  "zh": "划船",
  "note": "Deux femmes font du bateau."
 },
 {
  "id": "L14_se_promener",
  "lesson": 14,
  "fr": "se promener",
  "zh": "散步",
  "note": "agréable pour se promener"
 },
 {
  "id": "L14_un_an___une_année",
  "lesson": 14,
  "fr": "un an / une année",
  "zh": "年",
  "note": "(m) 數字用 an（un an）；強調期間用 année（plusieurs années）"
 },
 {
  "id": "L14__gne_____campagne__monta",
  "lesson": 14,
  "fr": "-gne [ɲ]：campagne, montagne",
  "zh": "唸成了 champagne",
  "note": "軟鼻音「涅」，一點點就好；campagne（鄉下）≠ champagne（香檳）是兩個字！"
 },
 {
  "id": "L14_ville__vil_",
  "lesson": 14,
  "fr": "ville [vil]",
  "zh": "套用 -ille = [ij] 規則",
  "note": "⚠️ ville、village 是例外，L 要發出來；famille、travaille 才唸 [ij]"
 },
 {
  "id": "L14_aéroport",
  "lesson": 14,
  "fr": "aéroport",
  "zh": "唸成英文 air-port",
  "note": "法文四個音節：a-é-ro-port"
 },
 {
  "id": "L15_Salut___Bonjour",
  "lesson": 15,
  "fr": "Salut / Bonjour",
  "zh": "嗨／你好（明信片開頭）",
  "note": ""
 },
 {
  "id": "L15_Cher_______",
  "lesson": 15,
  "fr": "Cher + 男生名字",
  "zh": "親愛的...（陽性）",
  "note": ""
 },
 {
  "id": "L15_Ch_re_______",
  "lesson": 15,
  "fr": "Chère + 女生名字",
  "zh": "親愛的...（陰性）",
  "note": ""
 },
 {
  "id": "L15___bient_t__",
  "lesson": 15,
  "fr": "À bientôt !",
  "zh": "再會！（明信片結尾）",
  "note": ""
 },
 {
  "id": "L15_Bisous___Je_t_embrasse",
  "lesson": 15,
  "fr": "Bisous / Je t'embrasse",
  "zh": "親一個／抱你（信末用語）",
  "note": ""
 },
 {
  "id": "L15_Je_suis_en_vacances_chez",
  "lesson": 15,
  "fr": "Je suis en vacances chez des amis à Marseille. C'est génial !",
  "zh": "我在馬賽朋友家度假，超讚的！",
  "note": ""
 },
 {
  "id": "L15_Je_vais___la_plage__je_m",
  "lesson": 15,
  "fr": "Je vais à la plage, je me baigne dans les Calanques et je bronze !",
  "zh": "我去海灘，在Calanques峽灣戲水、曬太陽！",
  "note": ""
 },
 {
  "id": "L15_Hier__il_ne_faisait_pas_",
  "lesson": 15,
  "fr": "Hier, il ne faisait pas beau. Il y avait des nuages.",
  "zh": "昨天天氣不好，有雲。",
  "note": ""
 },
 {
  "id": "L15_Ce_n_est_pas_normal___Ma",
  "lesson": 15,
  "fr": "Ce n'est pas normal à Marseille !",
  "zh": "這在馬賽不正常！",
  "note": ""
 },
 {
  "id": "L15_Alors__j_ai_visit__le_Mu",
  "lesson": 15,
  "fr": "Alors, j'ai visité le Mucem. C'était très intéressant !",
  "zh": "於是我去參觀了Mucem博物館，很有趣！",
  "note": ""
 },
 {
  "id": "L15_Aujourd_hui__j_ai_pris_l",
  "lesson": 15,
  "fr": "Aujourd'hui, j'ai pris le bateau.",
  "zh": "今天我搭了船。",
  "note": ""
 },
 {
  "id": "L15_J_ai_visit__le_ch_teau_d",
  "lesson": 15,
  "fr": "J'ai visité le château d'If.",
  "zh": "我參觀了伊夫堡。",
  "note": ""
 },
 {
  "id": "L15_Il_se_trouve_sur_une__le",
  "lesson": 15,
  "fr": "Il se trouve sur une île à 4 kilomètres de Marseille.",
  "zh": "它位於離馬賽4公里的一座島上。",
  "note": "se trouver = 位於"
 },
 {
  "id": "L15_Et_demain__je_vais_faire",
  "lesson": 15,
  "fr": "Et demain, je vais faire une randonnée à cheval avec mes amis pour découvrir la Provence.",
  "zh": "明天我要跟朋友騎馬健行探索普羅旺斯。",
  "note": ""
 },
 {
  "id": "L15_On_va_pique_niquer__je_s",
  "lesson": 15,
  "fr": "On va pique-niquer, je suis très contente !",
  "zh": "我們要野餐，我好開心！",
  "note": ""
 },
 {
  "id": "L15_il_fait___il_faisait",
  "lesson": 15,
  "fr": "il fait → il faisait",
  "zh": "天氣（présent → imparfait）",
  "note": ""
 },
 {
  "id": "L15_il_y_a___il_y_avait",
  "lesson": 15,
  "fr": "il y a → il y avait",
  "zh": "有（présent → imparfait）",
  "note": ""
 },
 {
  "id": "L15_c_est___c__tait",
  "lesson": 15,
  "fr": "c'est → c'était",
  "zh": "是（présent → imparfait）",
  "note": ""
 },
 {
  "id": "L15_Hier__il_faisait_mauvais",
  "lesson": 15,
  "fr": "Hier, il faisait mauvais.",
  "zh": "昨天天氣不好（imparfait）",
  "note": ""
 },
 {
  "id": "L15_Hier__il_y_avait_des_nua",
  "lesson": 15,
  "fr": "Hier, il y avait des nuages.",
  "zh": "昨天有雲（imparfait）",
  "note": ""
 },
 {
  "id": "L15_Hier__il_faisait_froid_",
  "lesson": 15,
  "fr": "Hier, il faisait froid.",
  "zh": "昨天天氣冷（imparfait）",
  "note": ""
 },
 {
  "id": "L15_Hier__c__tait_calme_",
  "lesson": 15,
  "fr": "Hier, c'était calme.",
  "zh": "昨天很平靜（imparfait）",
  "note": ""
 },
 {
  "id": "L15_Tu_es_parti___la_Martini",
  "lesson": 15,
  "fr": "Tu es parti à la Martinique.",
  "zh": "你去了馬提尼克島（partir用être）",
  "note": ""
 },
 {
  "id": "L15_Nous_avons_fait_du_surf_",
  "lesson": 15,
  "fr": "Nous avons fait du surf.",
  "zh": "我們去衝浪了（faire用avoir）",
  "note": ""
 },
 {
  "id": "L15_Il_est_n__en_Franche_Com",
  "lesson": 15,
  "fr": "Il est né en Franche-Comté.",
  "zh": "他在弗朗什-孔泰出生（naître用être）",
  "note": ""
 },
 {
  "id": "L15_Je_suis_sorti_tous_les_s",
  "lesson": 15,
  "fr": "Je suis sorti tous les soirs !",
  "zh": "我每晚都出去！（sortir用être）",
  "note": ""
 },
 {
  "id": "L15_Elle_a_vu_des_animaux_",
  "lesson": 15,
  "fr": "Elle a vu des animaux.",
  "zh": "她看到了動物（voir用avoir）",
  "note": ""
 },
 {
  "id": "L15_Vous_avez_pris_des_photo",
  "lesson": 15,
  "fr": "Vous avez pris des photos.",
  "zh": "你們拍了照片（prendre用avoir）",
  "note": ""
 },
 {
  "id": "L15_le_champ",
  "lesson": 15,
  "fr": "le champ",
  "zh": "田野",
  "note": ""
 },
 {
  "id": "L15_le_chemin",
  "lesson": 15,
  "fr": "le chemin",
  "zh": "小路",
  "note": ""
 },
 {
  "id": "L15_la_for_t",
  "lesson": 15,
  "fr": "la forêt",
  "zh": "森林",
  "note": ""
 },
 {
  "id": "L15_le_lac",
  "lesson": 15,
  "fr": "le lac",
  "zh": "湖",
  "note": ""
 },
 {
  "id": "L15_la_plage",
  "lesson": 15,
  "fr": "la plage",
  "zh": "海灘",
  "note": ""
 },
 {
  "id": "L15_la_rivi_re",
  "lesson": 15,
  "fr": "la rivière",
  "zh": "河",
  "note": ""
 },
 {
  "id": "L15_l_arbre",
  "lesson": 15,
  "fr": "l'arbre",
  "zh": "樹",
  "note": ""
 },
 {
  "id": "L15_la_fleur",
  "lesson": 15,
  "fr": "la fleur",
  "zh": "花",
  "note": ""
 },
 {
  "id": "L15_l_herbe",
  "lesson": 15,
  "fr": "l'herbe",
  "zh": "草",
  "note": ""
 },
 {
  "id": "L15_la_plante",
  "lesson": 15,
  "fr": "la plante",
  "zh": "植物",
  "note": ""
 },
 {
  "id": "L15_le_canard",
  "lesson": 15,
  "fr": "le canard",
  "zh": "鴨子",
  "note": ""
 },
 {
  "id": "L15_le_chat",
  "lesson": 15,
  "fr": "le chat",
  "zh": "貓",
  "note": ""
 },
 {
  "id": "L15_le_cheval",
  "lesson": 15,
  "fr": "le cheval",
  "zh": "馬",
  "note": ""
 },
 {
  "id": "L15_le_chien",
  "lesson": 15,
  "fr": "le chien",
  "zh": "狗",
  "note": ""
 },
 {
  "id": "L15_le_lapin",
  "lesson": 15,
  "fr": "le lapin",
  "zh": "兔子",
  "note": ""
 },
 {
  "id": "L15_l_oiseau",
  "lesson": 15,
  "fr": "l'oiseau",
  "zh": "鳥",
  "note": ""
 },
 {
  "id": "L15_le_poisson",
  "lesson": 15,
  "fr": "le poisson",
  "zh": "魚",
  "note": ""
 },
 {
  "id": "L15_la_poule",
  "lesson": 15,
  "fr": "la poule",
  "zh": "母雞",
  "note": ""
 },
 {
  "id": "L15_la_vache",
  "lesson": 15,
  "fr": "la vache",
  "zh": "母牛",
  "note": ""
 },
 {
  "id": "L15_faire_du_bateau",
  "lesson": 15,
  "fr": "faire du bateau",
  "zh": "划船",
  "note": ""
 },
 {
  "id": "L15_faire_de_la_plong_e",
  "lesson": 15,
  "fr": "faire de la plongée",
  "zh": "潛水",
  "note": ""
 },
 {
  "id": "L15_pique_niquer",
  "lesson": 15,
  "fr": "pique-niquer",
  "zh": "野餐",
  "note": "je pique-nique, tu pique-niques…（規則動詞）"
 },
 {
  "id": "L15_faire_une_randonn_e___ch",
  "lesson": 15,
  "fr": "faire une randonnée à cheval",
  "zh": "騎馬健行",
  "note": ""
 },
 {
  "id": "L15_se_baigner",
  "lesson": 15,
  "fr": "se baigner",
  "zh": "戲水、泡水",
  "note": "se baigner dans les Calanques"
 },
 {
  "id": "L15_bronzer",
  "lesson": 15,
  "fr": "bronzer",
  "zh": "曬太陽、曬黑",
  "note": "⚠️ 不是「bronze」（銅色/材質名詞），bronzer 是動詞"
 },
 {
  "id": "L15_le_b_uf",
  "lesson": 15,
  "fr": "le bœuf",
  "zh": "牛肉",
  "note": "對應動物 ox/cow，英文肉名 beef"
 },
 {
  "id": "L15_le_mouton",
  "lesson": 15,
  "fr": "le mouton",
  "zh": "羊肉",
  "note": "對應動物 sheep，英文肉名 mutton"
 },
 {
  "id": "L15_le_porc",
  "lesson": 15,
  "fr": "le porc",
  "zh": "豬肉",
  "note": "對應動物 pig，英文肉名 pork"
 },
 {
  "id": "L15_le_veau",
  "lesson": 15,
  "fr": "le veau",
  "zh": "小牛肉",
  "note": "對應動物 calf，英文肉名 veal"
 },
 {
  "id": "L15_l__tudiant_ambassadeur",
  "lesson": 15,
  "fr": "l'étudiant ambassadeur",
  "zh": "學生大使",
  "note": ""
 },
 {
  "id": "L15_les__tudes_sup_rieures",
  "lesson": 15,
  "fr": "les études supérieures",
  "zh": "高等教育",
  "note": "= université"
 },
 {
  "id": "L15_la_formation",
  "lesson": 15,
  "fr": "la formation",
  "zh": "學程、科系",
  "note": ""
 },
 {
  "id": "L15__changer_sur_la_vie__tud",
  "lesson": 15,
  "fr": "échanger sur la vie étudiante",
  "zh": "交流學生生活",
  "note": ""
 },
 {
  "id": "L15_poser_une_question",
  "lesson": 15,
  "fr": "poser une question",
  "zh": "提問",
  "note": ""
 },
 {
  "id": "L15_assister___un_cours__en_",
  "lesson": 15,
  "fr": "assister à un cours (en amphi)",
  "zh": "旁聽一堂課（在大講堂）",
  "note": "amphi = amphithéâtre"
 },
 {
  "id": "L15_visiter_le_campus",
  "lesson": 15,
  "fr": "visiter le campus",
  "zh": "參觀校園",
  "note": ""
 },
 {
  "id": "L15_interroger",
  "lesson": 15,
  "fr": "interroger",
  "zh": "詢問、提問",
  "note": "= poser des questions"
 },
 {
  "id": "L15_un_sujet",
  "lesson": 15,
  "fr": "un sujet",
  "zh": "主題",
  "note": ""
 },
 {
  "id": "L15_un_m_tier",
  "lesson": 15,
  "fr": "un métier",
  "zh": "職業",
  "note": ""
 },
 {
  "id": "L15_le_restaurant_universita",
  "lesson": 15,
  "fr": "le restaurant universitaire",
  "zh": "大學餐廳",
  "note": "口語簡稱 le resto U"
 },
 {
  "id": "L15_le_secr_tariat",
  "lesson": 15,
  "fr": "le secrétariat",
  "zh": "（大學）系辦、行政處",
  "note": ""
 },
 {
  "id": "L15_Parcoursup",
  "lesson": 15,
  "fr": "Parcoursup",
  "zh": "法國大學選校系統",
  "note": "線上申請大學用"
 },
 {
  "id": "L15_Les_futurs__tudiants_nou",
  "lesson": 15,
  "fr": "Les futurs étudiants nous interrogent sur beaucoup de sujets.",
  "zh": "未來的學生會問我們很多主題的問題。",
  "note": ""
 },
 {
  "id": "L15_Quels_m_tiers_on_peut_fa",
  "lesson": 15,
  "fr": "Quels métiers on peut faire après ces études ?",
  "zh": "讀完這個科系可以做什麼工作？",
  "note": ""
 },
 {
  "id": "L15_Combien_il_y_a_d_heures_",
  "lesson": 15,
  "fr": "Combien il y a d'heures de cours par semaine ?",
  "zh": "一週有幾小時的課？",
  "note": ""
 },
 {
  "id": "L15_Comment_est_le_restauran",
  "lesson": 15,
  "fr": "Comment est le restaurant universitaire ?",
  "zh": "大學餐廳怎麼樣？",
  "note": ""
 },
 {
  "id": "L15_Nous_avons_parl__des_cou",
  "lesson": 15,
  "fr": "Nous avons parlé des cours et de l'université. C'était très intéressant.",
  "zh": "我們聊了課程和大學的事，很有趣。",
  "note": ""
 },
 {
  "id": "L15_Pour_contacter_les__tudi",
  "lesson": 15,
  "fr": "Pour contacter les étudiants ambassadeurs, allez sur Parcoursup ou demandez au secrétariat de votre future université.",
  "zh": "要聯絡學生大使，上Parcoursup網站，或問你未來大學的系辦。",
  "note": ""
 },
 {
  "id": "L15_J__tudie_le_droit_",
  "lesson": 15,
  "fr": "J'étudie le droit.",
  "zh": "我讀法律系。",
  "note": ""
 },
 {
  "id": "L15_J__tudie_l_anatomie_",
  "lesson": 15,
  "fr": "J'étudie l'anatomie.",
  "zh": "我讀解剖學。",
  "note": ""
 },
 {
  "id": "L15_Je_suis__tudiant_e__en_l",
  "lesson": 15,
  "fr": "Je suis étudiant(e) en licence/master d'économie.",
  "zh": "我是經濟系學士生/碩士生。",
  "note": ""
 },
 {
  "id": "L15_Je_suis_en_quatri_me_ann",
  "lesson": 15,
  "fr": "Je suis en quatrième année.",
  "zh": "我大四了。",
  "note": ""
 },
 {
  "id": "L15_J_ai_eu_ma_licence_l_ann",
  "lesson": 15,
  "fr": "J'ai eu ma licence l'année dernière.",
  "zh": "我去年拿到學士學位。",
  "note": ""
 },
 {
  "id": "L15_Les_cours_sont_excellent",
  "lesson": 15,
  "fr": "Les cours sont excellents.",
  "zh": "課程很棒。",
  "note": ""
 },
 {
  "id": "L15_L_universit____La_biblio",
  "lesson": 15,
  "fr": "L'université / La bibliothèque est agréable.",
  "zh": "學校／圖書館很舒適。",
  "note": ""
 },
 {
  "id": "L15_Le_resto_U_n_est_pas_che",
  "lesson": 15,
  "fr": "Le resto U n'est pas cher.",
  "zh": "大學餐廳不貴。",
  "note": ""
 },
 {
  "id": "L15_Le_droit_m_int_resse_",
  "lesson": 15,
  "fr": "Le droit m'intéresse.",
  "zh": "法律讓我感興趣",
  "note": "COD代名詞 m'"
 },
 {
  "id": "L15_Je_te_comprends_",
  "lesson": 15,
  "fr": "Je te comprends.",
  "zh": "我懂你",
  "note": "COD代名詞 te"
 },
 {
  "id": "L15_Ils_vous__coutent_",
  "lesson": 15,
  "fr": "Ils vous écoutent.",
  "zh": "他們聽你們說",
  "note": "COD代名詞 vous"
 },
 {
  "id": "L15_Tu_m_aides___faire_cet_e",
  "lesson": 15,
  "fr": "Tu m'aides à faire cet exercice ?",
  "zh": "你可以幫我做這個練習嗎？",
  "note": "COD代名詞 m'"
 },
 {
  "id": "L16_C_est_une_pause_pendant_",
  "lesson": 16,
  "fr": "C'est une pause pendant les études.",
  "zh": "這是學業中的一個空檔",
  "note": "pendant + 明確期間"
 },
 {
  "id": "L16_La_c_sure_dure_longtemps",
  "lesson": 16,
  "fr": "La césure dure longtemps ?",
  "zh": "空檔年持續很久嗎？",
  "note": "longtemps 只問長短，跟現在有沒有繼續無關"
 },
 {
  "id": "L16_Nous_avons_toujours_le_s",
  "lesson": 16,
  "fr": "Nous avons toujours le statut étudiant.",
  "zh": "我們現在還保有學生身份",
  "note": "toujours + 現在式 = 還在繼續"
 },
 {
  "id": "L16_Je_suis_arriv_e_en_Franc",
  "lesson": 16,
  "fr": "Je suis arrivée en France à deux ans.",
  "zh": "我兩歲的時候到法國",
  "note": "à + 年紀 = 時間點"
 },
 {
  "id": "L16_Je_suis_arriv_e_en_Franc_2",
  "lesson": 16,
  "fr": "Je suis arrivée en France il y a deux ans.",
  "zh": "我兩年前到法國",
  "note": "il y a = 距今多久，動作已結束"
 },
 {
  "id": "L16_Je_suis_dentiste_depuis_",
  "lesson": 16,
  "fr": "Je suis dentiste depuis douze ans.",
  "zh": "我當牙醫師已經12年了",
  "note": "depuis = 從那時到現在，狀態持續"
 },
 {
  "id": "L16_le_dipl_me",
  "lesson": 16,
  "fr": "le diplôme",
  "zh": "學位、畢業證書",
  "note": ""
 },
 {
  "id": "L16_l_enseignant_e_",
  "lesson": 16,
  "fr": "l'enseignant(e)",
  "zh": "教師",
  "note": "跟 le professeur 同義，較中性正式"
 },
 {
  "id": "L16_l__tudiant_e_",
  "lesson": 16,
  "fr": "l'étudiant(e)",
  "zh": "大學生",
  "note": ""
 },
 {
  "id": "L16__tudier",
  "lesson": 16,
  "fr": "étudier",
  "zh": "學習、研讀",
  "note": ""
 },
 {
  "id": "L16_faire_des__tudes",
  "lesson": 16,
  "fr": "faire des études",
  "zh": "唸書、就學",
  "note": "= étudier"
 },
 {
  "id": "L16_faire_un_stage",
  "lesson": 16,
  "fr": "faire un stage",
  "zh": "實習",
  "note": "un stagiaire = 實習生"
 },
 {
  "id": "L16_s_inscrire____",
  "lesson": 16,
  "fr": "s'inscrire (à)",
  "zh": "報名、註冊",
  "note": "je me suis inscrit(e) à..."
 },
 {
  "id": "L16_la_note",
  "lesson": 16,
  "fr": "la note",
  "zh": "成績、分數",
  "note": "法國滿分20分，不是100分"
 },
 {
  "id": "L16_le_commerce",
  "lesson": 16,
  "fr": "le commerce",
  "zh": "商業",
  "note": ""
 },
 {
  "id": "L16_le_droit",
  "lesson": 16,
  "fr": "le droit",
  "zh": "法律",
  "note": "⚠️ 別跟 drôle（好笑的）搞混"
 },
 {
  "id": "L16_l__conomie",
  "lesson": 16,
  "fr": "l'économie",
  "zh": "經濟",
  "note": ""
 },
 {
  "id": "L16_l_informatique",
  "lesson": 16,
  "fr": "l'informatique",
  "zh": "資訊工程",
  "note": ""
 },
 {
  "id": "L16_les_langues",
  "lesson": 16,
  "fr": "les langues",
  "zh": "外語（研究語言本身）",
  "note": ""
 },
 {
  "id": "L16_les_lettres",
  "lesson": 16,
  "fr": "les lettres",
  "zh": "文學",
  "note": "跟 langues 不同科系"
 },
 {
  "id": "L16_les_math_matiques__les_m",
  "lesson": 16,
  "fr": "les mathématiques (les maths)",
  "zh": "數學",
  "note": ""
 },
 {
  "id": "L16_les_sciences",
  "lesson": 16,
  "fr": "les sciences",
  "zh": "科學",
  "note": ""
 },
 {
  "id": "L16_La_France_est_un_pays_qu",
  "lesson": 16,
  "fr": "La France est un pays qui change.",
  "zh": "法國是個一直在變的國家",
  "note": "qui 取代主詞"
 },
 {
  "id": "L16_C_est_un_m_tier_que_j_ad",
  "lesson": 16,
  "fr": "C'est un métier que j'adore.",
  "zh": "這是我熱愛的職業",
  "note": "que 取代受詞（COD）"
 },
 {
  "id": "L16_J_ai_un_travail_qui_est_",
  "lesson": 16,
  "fr": "J'ai un travail qui est intéressant.",
  "zh": "我的工作很有趣",
  "note": "qui + 動詞（qui當主詞）"
 },
 {
  "id": "L16_J_ai_des_coll_gues_que_j",
  "lesson": 16,
  "fr": "J'ai des collègues que j'aime beaucoup.",
  "zh": "我有很喜歡的同事",
  "note": "que + 主詞 + 動詞"
 },
 {
  "id": "L16_Je_suis_com_dienne_et_da",
  "lesson": 16,
  "fr": "Je suis comédienne et danseuse. En France ou à l'étranger, je change souvent de ville pour mon travail.",
  "zh": "我是女演員兼舞者。在法國或國外，我常為了工作換城市。",
  "note": "Elsa"
 },
 {
  "id": "L16_C_est_un_m_tier_que_j_ad_2",
  "lesson": 16,
  "fr": "C'est un métier que j'adore mais, parfois, c'est difficile : j'ai un rythme très différent du rythme des autres Français.",
  "zh": "這是我熱愛的職業，但有時很難：我的作息跟其他法國人很不一樣。",
  "note": ""
 },
 {
  "id": "L16_Je_suis_n_e_en_Alg_rie_e",
  "lesson": 16,
  "fr": "Je suis née en Algérie et je suis arrivée en France à deux ans. Je suis informaticienne.",
  "zh": "我在阿爾及利亞出生，兩歲時到法國。我是資訊工程師。",
  "note": "Hana"
 },
 {
  "id": "L16_La_France_est_un_pays_qu_2",
  "lesson": 16,
  "fr": "La France est un pays qui change mais qui garde aussi ses traditions.",
  "zh": "法國是個一直在變、但也保留傳統的國家。",
  "note": ""
 },
 {
  "id": "L16_Je_travaille_comme_chauf",
  "lesson": 16,
  "fr": "Je travaille comme chauffeur. J'ai créé mon entreprise de transport de personnes.",
  "zh": "我當司機。我創立了自己的載客運輸公司。",
  "note": "Cyril"
 },
 {
  "id": "L16__tre_ind_pendant__c_est_",
  "lesson": 16,
  "fr": "Être indépendant, c'est une chose que j'aime. Je n'ai pas de chef, pas de directeur. Je rêve de développer cette entreprise !",
  "zh": "獨立工作是我喜歡的事。我沒有老闆、沒有主管。我夢想把這間公司做大！",
  "note": ""
 },
 {
  "id": "L16_le_bureau",
  "lesson": 16,
  "fr": "le bureau",
  "zh": "辦公室",
  "note": ""
 },
 {
  "id": "L16_le_poste",
  "lesson": 16,
  "fr": "le poste",
  "zh": "職位／辦公桌位子",
  "note": "⚠️ 雙重意思"
 },
 {
  "id": "L16_le_contrat",
  "lesson": 16,
  "fr": "le contrat",
  "zh": "合約",
  "note": "signer un contrat"
 },
 {
  "id": "L16_les_horaires",
  "lesson": 16,
  "fr": "les horaires",
  "zh": "上班時段",
  "note": ""
 },
 {
  "id": "L16_la_machine___caf_",
  "lesson": 16,
  "fr": "la machine à café",
  "zh": "咖啡機",
  "note": ""
 },
 {
  "id": "L16_la_pause_d_jeuner",
  "lesson": 16,
  "fr": "la pause-déjeuner",
  "zh": "午休",
  "note": "法國通常只有一個正式休息時段"
 },
 {
  "id": "L16_le_restaurant_d_entrepri",
  "lesson": 16,
  "fr": "le restaurant d'entreprise",
  "zh": "公司餐廳",
  "note": "只有大公司才有"
 },
 {
  "id": "L16_le_salaire",
  "lesson": 16,
  "fr": "le salaire",
  "zh": "薪水",
  "note": ""
 },
 {
  "id": "L16_le_t_l_travail___faire_d",
  "lesson": 16,
  "fr": "le télétravail / faire du télétravail",
  "zh": "遠端工作",
  "note": "動詞可說 télétravailler（非正式）"
 },
 {
  "id": "L16_l_agriculteur___l_agricu",
  "lesson": 16,
  "fr": "l'agriculteur / l'agricultrice",
  "zh": "農夫",
  "note": ""
 },
 {
  "id": "L16_l_artiste__m__f__",
  "lesson": 16,
  "fr": "l'artiste (m./f.)",
  "zh": "藝術家",
  "note": ""
 },
 {
  "id": "L16_le_boucher___la_bouch_re",
  "lesson": 16,
  "fr": "le boucher / la bouchère",
  "zh": "肉販",
  "note": ""
 },
 {
  "id": "L16_le_chauffeur",
  "lesson": 16,
  "fr": "le chauffeur",
  "zh": "司機",
  "note": ""
 },
 {
  "id": "L16_le_com_dien___la_com_die",
  "lesson": 16,
  "fr": "le comédien / la comédienne",
  "zh": "演員（不限電影，脫口秀也算）",
  "note": ""
 },
 {
  "id": "L16_le_danseur___la_danseuse",
  "lesson": 16,
  "fr": "le danseur / la danseuse",
  "zh": "舞者",
  "note": ""
 },
 {
  "id": "L16_le_la_journaliste",
  "lesson": 16,
  "fr": "le/la journaliste",
  "zh": "記者",
  "note": ""
 },
 {
  "id": "L16_le_la_libraire",
  "lesson": 16,
  "fr": "le/la libraire",
  "zh": "書店店員",
  "note": ""
 },
 {
  "id": "L16_le_la_photographe",
  "lesson": 16,
  "fr": "le/la photographe",
  "zh": "攝影師",
  "note": ""
 },
 {
  "id": "L16_le_policier___la_polici_",
  "lesson": 16,
  "fr": "le policier / la policière",
  "zh": "警察",
  "note": ""
 },
 {
  "id": "L16_communiquer",
  "lesson": 16,
  "fr": "communiquer",
  "zh": "溝通",
  "note": ""
 },
 {
  "id": "L16__crire_un_mail",
  "lesson": 16,
  "fr": "écrire un mail",
  "zh": "寫信/寫email",
  "note": ""
 },
 {
  "id": "L16_lire_un_rapport",
  "lesson": 16,
  "fr": "lire un rapport",
  "zh": "讀報告",
  "note": ""
 },
 {
  "id": "L16_s_organiser",
  "lesson": 16,
  "fr": "s'organiser",
  "zh": "安排自己的工作/行程",
  "note": ""
 },
 {
  "id": "L16_pr_parer_une_r_union",
  "lesson": 16,
  "fr": "préparer une réunion",
  "zh": "準備會議",
  "note": ""
 },
 {
  "id": "L16_travailler_sur_un_dossie",
  "lesson": 16,
  "fr": "travailler sur un dossier",
  "zh": "處理一份文件/案子",
  "note": ""
 },
 {
  "id": "L16_le_mail___le_courriel",
  "lesson": 16,
  "fr": "le mail / le courriel",
  "zh": "email",
  "note": "實體信件是 le courrier（假朋友）"
 },
 {
  "id": "L16_l_ordinateur__portable_",
  "lesson": 16,
  "fr": "l'ordinateur (portable)",
  "zh": "（筆記型）電腦",
  "note": ""
 },
 {
  "id": "L16_le_t_l_phone___le_smartp",
  "lesson": 16,
  "fr": "le téléphone / le smartphone",
  "zh": "電話/智慧型手機",
  "note": ""
 },
 {
  "id": "L16_la_visioconf_rence",
  "lesson": 16,
  "fr": "la visioconférence",
  "zh": "視訊會議",
  "note": ""
 },
 {
  "id": "L16_le_chef___la_cheffe",
  "lesson": 16,
  "fr": "le chef / la cheffe",
  "zh": "主管",
  "note": ""
 },
 {
  "id": "L16_le_la_coll_gue",
  "lesson": 16,
  "fr": "le/la collègue",
  "zh": "同事",
  "note": ""
 },
 {
  "id": "L16_le_directeur___la_direct",
  "lesson": 16,
  "fr": "le directeur / la directrice",
  "zh": "總監、負責整間公司的人",
  "note": ""
 },
 {
  "id": "L16_l__quipe__f__",
  "lesson": 16,
  "fr": "l'équipe (f.)",
  "zh": "團隊",
  "note": ""
 },
 {
  "id": "L16_le_la_responsable",
  "lesson": 16,
  "fr": "le/la responsable",
  "zh": "主管、負責人",
  "note": ""
 },
 {
  "id": "L16_Je_travaille_beaucoup_",
  "lesson": 16,
  "fr": "Je travaille beaucoup.",
  "zh": "我工作很多",
  "note": "beaucoup 修飾動詞"
 },
 {
  "id": "L16_Je_suis_tr_s_content_",
  "lesson": 16,
  "fr": "Je suis très content.",
  "zh": "我很開心",
  "note": "très 修飾形容詞"
 },
 {
  "id": "L16_Je_suis_trop_fatigu__",
  "lesson": 16,
  "fr": "Je suis trop fatigué.",
  "zh": "我太累了",
  "note": "trop 帶負面意味，暗示想改變狀況"
 },
 {
  "id": "L16_C_est_trop_bien__",
  "lesson": 16,
  "fr": "C'est trop bien !",
  "zh": "這太好了！",
  "note": "口語中trop有時反而加強正面語氣"
 },
 {
  "id": "L16_Je_suis_pour_le_t_l_trav",
  "lesson": 16,
  "fr": "Je suis pour le télétravail parce que c'est pratique.",
  "zh": "我贊成遠端工作，因為很方便。",
  "note": ""
 },
 {
  "id": "L16_Je_suis_contre_le_t_l_tr",
  "lesson": 16,
  "fr": "Je suis contre le télétravail parce que je n'aime pas travailler à la maison.",
  "zh": "我反對遠端工作，因為我不喜歡在家工作。",
  "note": ""
 },
 {
  "id": "L16_Mon_patron_est_contre_le",
  "lesson": 16,
  "fr": "Mon patron est contre le télétravail.",
  "zh": "我老闆反對遠端工作。",
  "note": "patron = 老闆"
 },
 {
  "id": "L16__a_ne_veut_pas_dire___",
  "lesson": 16,
  "fr": "Ça ne veut pas dire...",
  "zh": "這不代表......",
  "note": "澄清誤解時的開頭"
 },
 {
  "id": "L16_Tu_comprends_tout_de_sui",
  "lesson": 16,
  "fr": "Tu comprends tout de suite ?",
  "zh": "你馬上就懂了？",
  "note": ""
 },
 {
  "id": "L16_On_va_voir_le_prochain_",
  "lesson": 16,
  "fr": "On va voir le prochain.",
  "zh": "我們來看下一個。",
  "note": ""
 },
 {
  "id": "L16_Est_ce_que_toi__tu____",
  "lesson": 16,
  "fr": "Est-ce que toi, tu...?",
  "zh": "那你呢，你......？",
  "note": "換人提問的起手式"
 },
 {
  "id": "L16_Tout___fait_",
  "lesson": 16,
  "fr": "Tout à fait.",
  "zh": "完全正確、沒錯。",
  "note": ""
 },
 {
  "id": "L16__a__on_va_voir_l__",
  "lesson": 16,
  "fr": "Ça, on va voir là.",
  "zh": "這個我們接下來會看到。",
  "note": ""
 },
 {
  "id": "L16_Je_ne_sais_pas_si_c_est_",
  "lesson": 16,
  "fr": "Je ne sais pas si c'est un mot officiel, mais tout le monde comprend.",
  "zh": "我不知道這是不是正式的字，但大家都聽得懂。",
  "note": ""
 },
 {
  "id": "L17_avoir___eu",
  "lesson": 17,
  "fr": "avoir → eu",
  "zh": "過去分詞：有",
  "note": "J'ai eu"
 },
 {
  "id": "L17_devoir___dû",
  "lesson": 17,
  "fr": "devoir → dû",
  "zh": "過去分詞：必須（我當時不得不）",
  "note": "J'ai dû partir."
 },
 {
  "id": "L17_dire___dit",
  "lesson": 17,
  "fr": "dire → dit",
  "zh": "過去分詞：說",
  "note": "J'ai dit"
 },
 {
  "id": "L17_écrire___écrit",
  "lesson": 17,
  "fr": "écrire → écrit",
  "zh": "過去分詞：寫",
  "note": "J'ai écrit"
 },
 {
  "id": "L17_être___été",
  "lesson": 17,
  "fr": "être → été",
  "zh": "過去分詞：是（j'ai été＝我去過/當過一次）",
  "note": "J'ai été au lac une fois."
 },
 {
  "id": "L17_faire___fait",
  "lesson": 17,
  "fr": "faire → fait",
  "zh": "過去分詞：做",
  "note": "J'ai fait"
 },
 {
  "id": "L17_mettre___mis",
  "lesson": 17,
  "fr": "mettre → mis",
  "zh": "過去分詞：放（也＝進球）",
  "note": "Mbappé a mis un but."
 },
 {
  "id": "L17_naître___né",
  "lesson": 17,
  "fr": "naître → né",
  "zh": "過去分詞：出生（配être要配合）",
  "note": "Elle est née."
 },
 {
  "id": "L17_mourir___mort",
  "lesson": 17,
  "fr": "mourir → mort",
  "zh": "過去分詞：死（配être）",
  "note": "Il est mort hier."
 },
 {
  "id": "L17_ouvrir___ouvert",
  "lesson": 17,
  "fr": "ouvrir → ouvert",
  "zh": "過去分詞：開",
  "note": "J'ai ouvert la porte."
 },
 {
  "id": "L17_prendre___pris",
  "lesson": 17,
  "fr": "prendre → pris",
  "zh": "過去分詞：拿/搭",
  "note": "J'ai pris le métro."
 },
 {
  "id": "L17_recevoir___reçu",
  "lesson": 17,
  "fr": "recevoir → reçu",
  "zh": "過去分詞：收到（c+u要ç）",
  "note": "J'ai reçu un message."
 },
 {
  "id": "L17_tenir___tenu___obtenir__",
  "lesson": 17,
  "fr": "tenir → tenu / obtenir → obtenu",
  "zh": "過去分詞：握住/取得",
  "note": "J'ai obtenu mon diplôme."
 },
 {
  "id": "L17_venir___venu___devenir__",
  "lesson": 17,
  "fr": "venir → venu / devenir → devenu",
  "zh": "過去分詞：來/變成（配être）",
  "note": "Il est venu."
 },
 {
  "id": "L17_vivre___vécu",
  "lesson": 17,
  "fr": "vivre → vécu",
  "zh": "過去分詞：住/活",
  "note": "J'ai vécu à Taïwan pendant cinq ans."
 },
 {
  "id": "L17_lire___lu",
  "lesson": 17,
  "fr": "lire → lu",
  "zh": "過去分詞：讀（一個音節，不是li-u）",
  "note": "Tu as lu le roman ?"
 },
 {
  "id": "L17_perdre___perdu",
  "lesson": 17,
  "fr": "perdre → perdu",
  "zh": "過去分詞：丟失",
  "note": "J'ai perdu"
 },
 {
  "id": "L17_vouloir___voulu",
  "lesson": 17,
  "fr": "vouloir → voulu",
  "zh": "過去分詞：想要",
  "note": "J'ai voulu"
 },
 {
  "id": "L17_voir___vu",
  "lesson": 17,
  "fr": "voir → vu",
  "zh": "過去分詞：看見",
  "note": "J'ai vu"
 },
 {
  "id": "L17_Ils_se_sont_mariés_il_y_",
  "lesson": 17,
  "fr": "Ils se sont mariés il y a deux ans.",
  "zh": "他們兩年前結婚了",
  "note": "反身動詞配être，分詞+s"
 },
 {
  "id": "L17_Je_me_suis_installée_à_L",
  "lesson": 17,
  "fr": "Je me suis installée à Lyon.",
  "zh": "我（女）在里昂安頓下來了",
  "note": "反身動詞PC，陰性+e"
 },
 {
  "id": "L17_Je_suis_tombée_amoureuse",
  "lesson": 17,
  "fr": "Je suis tombée amoureuse de la France.",
  "zh": "我（女）愛上了法國",
  "note": "tomber amoureux de 固定搭配"
 },
 {
  "id": "L17_Ma_fille_est_née_il_y_a_",
  "lesson": 17,
  "fr": "Ma fille est née il y a un an.",
  "zh": "我女兒一年前出生",
  "note": "il y a＝距今…前"
 },
 {
  "id": "L17_J_ai_ouvert_mon_magasin_",
  "lesson": 17,
  "fr": "J'ai ouvert mon magasin il y a deux ans.",
  "zh": "我兩年前開了店",
  "note": "c'est ouvert（開著）是形容詞不是PC"
 },
 {
  "id": "L17_Je_ne_l_ai_pas_reçu_",
  "lesson": 17,
  "fr": "Je ne l'ai pas reçu.",
  "zh": "我沒收到它",
  "note": "COD代名詞夾在ne和ai中間"
 },
 {
  "id": "L17_Je_ne_l_ai_pas_mangé_",
  "lesson": 17,
  "fr": "Je ne l'ai pas mangé.",
  "zh": "我沒吃它",
  "note": "COD+PC否定的完整包法"
 },
 {
  "id": "L17_Je_vis_à_Taïwan_depuis_c",
  "lesson": 17,
  "fr": "Je vis à Taïwan depuis cinq ans.",
  "zh": "我住台灣五年了（還住著）",
  "note": "depuis＋現在式"
 },
 {
  "id": "L17_J_ai_vécu_à_Taïwan_penda",
  "lesson": 17,
  "fr": "J'ai vécu à Taïwan pendant cinq ans.",
  "zh": "我在台灣住過五年（已結束）",
  "note": "pendant＋PC"
 },
 {
  "id": "L17_dans_un_an",
  "lesson": 17,
  "fr": "dans un an",
  "zh": "一年後（還沒發生）",
  "note": "跟英文in one year同邏輯；il y a un an＝一年前"
 },
 {
  "id": "L17_l_année_dernière",
  "lesson": 17,
  "fr": "l'année dernière",
  "zh": "去年",
  "note": "la semaine dernière＝上週，同模式"
 },
 {
  "id": "L17_Je_suis_mort_de_rire_",
  "lesson": 17,
  "fr": "Je suis mort de rire.",
  "zh": "我笑死了（MDR）",
  "note": "mort de + 名詞＝…死了；口語"
 },
 {
  "id": "L17_Je_suis_mort_de_froid_",
  "lesson": 17,
  "fr": "Je suis mort de froid.",
  "zh": "我冷死了",
  "note": "同 mort de 系列"
 },
 {
  "id": "L17_Pas_encore_",
  "lesson": 17,
  "fr": "Pas encore.",
  "zh": "還沒",
  "note": "encore＝再/還；pas encore＝not yet"
 },
 {
  "id": "L17_J_ai_tenu_deux_ans_",
  "lesson": 17,
  "fr": "J'ai tenu deux ans.",
  "zh": "我撐了兩年",
  "note": "tenir＝握住，也＝撐住（工作）"
 },
 {
  "id": "L17_la_marque",
  "lesson": 17,
  "fr": "la marque",
  "zh": "品牌",
  "note": "Quelle marque de téléphone ?（DELF字卡高頻）"
 },
 {
  "id": "L17_le_numéro_de_téléphone",
  "lesson": 17,
  "fr": "le numéro de téléphone",
  "zh": "電話號碼",
  "note": "Quel est votre numéro de téléphone ?"
 },
 {
  "id": "L17_une_action_ponctuelle",
  "lesson": 17,
  "fr": "une action ponctuelle",
  "zh": "一次性的動作（課本對PC用途的定義）",
  "note": "PC=講過去有起訖的動作"
 },
 {
  "id": "L17_Comment_ça_s_écrit__",
  "lesson": 17,
  "fr": "Comment ça s'écrit ?",
  "zh": "怎麼拼？",
  "note": "DELF口說第一部分必考"
 },
 {
  "id": "L17_Je_viens_de_Keelung_",
  "lesson": 17,
  "fr": "Je viens de Keelung.",
  "zh": "我來自基隆（ville d'origine的答法）",
  "note": "venir de + 城市"
 },
 {
  "id": "L17_au_vingt_et_unième_étage",
  "lesson": 17,
  "fr": "au vingt-et-unième étage",
  "zh": "在21樓",
  "note": "樓層用序數：vingt-et-unième"
 },
 {
  "id": "L17_le_coup_de_foudre",
  "lesson": 17,
  "fr": "le coup de foudre",
  "zh": "一見鐘情",
  "note": "字面：閃電打到；課文《Une histoire d'amour》註解：amour immédiat, à la première vue"
 },
 {
  "id": "L17_faire_connaissance",
  "lesson": 17,
  "fr": "faire connaissance",
  "zh": "認識、結識",
  "note": "faire的固定搭配，不是connaître"
 },
 {
  "id": "L17_prendre_son_temps",
  "lesson": 17,
  "fr": "prendre son temps",
  "zh": "慢慢來、不急",
  "note": "課文《Une histoire d'amour》貫穿全文的主題句，出現兩次"
 },
 {
  "id": "L17_agrandir_la_famille",
  "lesson": 17,
  "fr": "agrandir la famille",
  "zh": "擴大家庭",
  "note": "生小孩的委婉說法"
 },
 {
  "id": "L17_accueillir_un_enfant",
  "lesson": 17,
  "fr": "accueillir un enfant",
  "zh": "迎接一個孩子",
  "note": "比 avoir un enfant 更文學/正式"
 },
 {
  "id": "L18_avoir_un_coup_de_foudre_",
  "lesson": 18,
  "fr": "avoir un coup de foudre pour quelqu'un",
  "zh": "對某人一見鍾情",
  "note": "coup＝重擊；跟coup de soleil（曬傷）、coup de poing（一拳）同構詞"
 },
 {
  "id": "L18_déménager_puis_s_instal",
  "lesson": 18,
  "fr": "déménager, puis s'installer",
  "zh": "先搬家，再安頓下來",
  "note": "兩個動作一前一後"
 },
 {
  "id": "L18_être_célibataire_ou_en_c",
  "lesson": 18,
  "fr": "être célibataire ou en couple",
  "zh": "單身或穩定交往中",
  "note": ""
 },
 {
  "id": "L18_faire_connaissance",
  "lesson": 18,
  "fr": "faire connaissance",
  "zh": "認識、結識",
  "note": "faire的固定搭配，不是connaître"
 },
 {
  "id": "L18_se_faire_des_ami_e_s",
  "lesson": 18,
  "fr": "se faire des ami(e)s",
  "zh": "交朋友",
  "note": ""
 },
 {
  "id": "L18_se_marier_avec_quelqu_un",
  "lesson": 18,
  "fr": "se marier avec quelqu'un",
  "zh": "跟某人結婚",
  "note": ""
 },
 {
  "id": "L18_se_séparer_de_quelqu_un",
  "lesson": 18,
  "fr": "se séparer de quelqu'un",
  "zh": "跟某人分手",
  "note": "適用任何伴侶關係，不限已婚"
 },
 {
  "id": "L18_tomber_amoureux_amoureu",
  "lesson": 18,
  "fr": "tomber amoureux, amoureuse de quelqu'un",
  "zh": "愛上某人",
  "note": "可以是慢慢發生，跟coup de foudre的「瞬間」對比"
 },
 {
  "id": "L18_une_connaissance_pas_un",
  "lesson": 18,
  "fr": "une connaissance, pas un ami",
  "zh": "點頭之交，不是朋友",
  "note": "connaître（認識，動詞）≠ une connaissance（點頭之交，名詞）"
 },
 {
  "id": "L18_le_conjoint_la_conjoint",
  "lesson": 18,
  "fr": "le conjoint, la conjointe",
  "zh": "同居伴侶",
  "note": "不用結婚也能這樣稱呼"
 },
 {
  "id": "L18_le_marié_la_mariée",
  "lesson": 18,
  "fr": "le marié, la mariée",
  "zh": "新郎、新娘",
  "note": "只在結婚當天用，婚後改叫le mari/la femme"
 },
 {
  "id": "L18_c_est_la_plus_belle_renc",
  "lesson": 18,
  "fr": "c'est la plus belle rencontre",
  "zh": "這是最美的相遇",
  "note": "la rencontre可以加形容詞"
 },
 {
  "id": "L18_chercher_du_travail",
  "lesson": 18,
  "fr": "chercher du travail",
  "zh": "找工作（還沒找到）",
  "note": "trouver du travail才是已經找到"
 },
 {
  "id": "L18_obtenir_un_diplôme",
  "lesson": 18,
  "fr": "obtenir un diplôme",
  "zh": "取得文憑",
  "note": "tenir握住→obtenir取得，同一字根"
 },
 {
  "id": "L18_travailler_dans_une_entr",
  "lesson": 18,
  "fr": "travailler dans une entreprise",
  "zh": "在企業工作",
  "note": "醫生/牙醫診所不叫entreprise，叫cabinet"
 },
 {
  "id": "L18_un_cabinet_dentaire",
  "lesson": 18,
  "fr": "un cabinet dentaire",
  "zh": "牙醫診所",
  "note": "醫療診所固定用cabinet，不用entreprise"
 },
 {
  "id": "L18_un_e_écrivain_e_",
  "lesson": 18,
  "fr": "un(e) écrivain(e)",
  "zh": "作家（寫書）",
  "note": "跟寫歌的compositeur、寫劇本的scénariste分開"
 },
 {
  "id": "L18_un_compositeur_une_comp",
  "lesson": 18,
  "fr": "un compositeur, une compositrice",
  "zh": "作曲家（寫歌）",
  "note": "-teur→-trice規則變化"
 },
 {
  "id": "L18_un_chanteur_une_chanteu",
  "lesson": 18,
  "fr": "un chanteur, une chanteuse",
  "zh": "歌手",
  "note": "⚠️例外：-teur→-teuse，不是-trice"
 },
 {
  "id": "L18_un_e_scénariste",
  "lesson": 18,
  "fr": "un(e) scénariste",
  "zh": "編劇",
  "note": "寫電影劇本 scénario 的人"
 },
 {
  "id": "L18_profiter_de_l_eau_fraîch",
  "lesson": 18,
  "fr": "profiter de l'eau fraîche",
  "zh": "享受清涼的水",
  "note": ""
 },
 {
  "id": "L18_faire_une_balade_sur_une",
  "lesson": 18,
  "fr": "faire une balade sur une rivière",
  "zh": "在河上隨意划行、閒晃",
  "note": "balade＝promenade的同義字"
 },
 {
  "id": "L18_un_bon_moyen_de_rester_e",
  "lesson": 18,
  "fr": "un bon moyen de rester en bonne santé",
  "zh": "保持健康的好方法",
  "note": "moyen＝manière的近義字"
 },
 {
  "id": "L18_en_plein_air",
  "lesson": 18,
  "fr": "en plein air",
  "zh": "戶外",
  "note": "對比en intérieur（室內）"
 },
 {
  "id": "L18_permettre_aux_plus_petit",
  "lesson": 18,
  "fr": "permettre aux plus petits de monter sans problème",
  "zh": "讓小小孩也能順利往上爬",
  "note": "les plus petits＝相對大人而言的小孩；monter比escalader廣義"
 },
 {
  "id": "L18_Vous_n_avez_rien_oublié_",
  "lesson": 18,
  "fr": "Vous n'avez rien oublié ?",
  "zh": "你什麼都沒忘吧？",
  "note": "法文反著問：你沒忘記什麼——不是英文式「你忘了什麼嗎」"
 },
 {
  "id": "L18_Ce_n_est_pas_du_tout_mon",
  "lesson": 18,
  "fr": "Ce n'est pas du tout mon truc.",
  "zh": "這完全不是我的菜",
  "note": "mon truc是mon chose的口語替代字"
 },
 {
  "id": "L18_Ma_passion_c_est_les_je",
  "lesson": 18,
  "fr": "Ma passion, c'est les jeux vidéo.",
  "zh": "我的熱情所在是電玩",
  "note": "強調真心熱愛的固定句型 Ma passion, c'est..."
 },
 {
  "id": "L18_J_aime_bien_sortir_",
  "lesson": 18,
  "fr": "J'aime bien sortir.",
  "zh": "我還蠻喜歡出門的",
  "note": "j'aime bien比j'aime弱，不是「很喜歡」"
 },
 {
  "id": "L18_Je_ne_connais_personne_i",
  "lesson": 18,
  "fr": "Je ne connais personne ici.",
  "zh": "我在這裡誰都不認識",
  "note": "personne當COD，放動詞後"
 },
 {
  "id": "L18_Je_n_ai_rencontré_person",
  "lesson": 18,
  "fr": "Je n'ai rencontré personne.",
  "zh": "我沒遇到任何人",
  "note": "PC裡personne是例外，放分詞後面（不是夾在中間）"
 },
 {
  "id": "L18_Personne_n_est_là_",
  "lesson": 18,
  "fr": "Personne n'est là.",
  "zh": "沒有人在這裡",
  "note": "personne當主詞時放在最前面，跟一般主詞規則一樣"
 },
 {
  "id": "L18_Il_ne_fait_plus_de_boxe_",
  "lesson": 18,
  "fr": "Il ne fait plus de boxe.",
  "zh": "他不再打拳了",
  "note": "ne...plus＝狀態改變（曾經做過，現在停了）"
 },
 {
  "id": "L18_Elle_n_a_jamais_fait_de_",
  "lesson": 18,
  "fr": "Elle n'a jamais fait de l'escalade.",
  "zh": "她從沒做過攀岩",
  "note": "jamais夾在助動詞a和分詞fait中間"
 },
 {
  "id": "L18_Il_n_y_a_plus_de_pain_",
  "lesson": 18,
  "fr": "Il n'y a plus de pain.",
  "zh": "麵包沒了",
  "note": "否定的plus，s不發音，跟肯定「更多」的plus發音不同"
 },
 {
  "id": "L19_faire_une_balade",
  "lesson": 19,
  "fr": "faire une balade",
  "zh": "散步、隨意閒晃",
  "note": "＝une promenade"
 },
 {
  "id": "L19_faire_une_visite_guidée",
  "lesson": 19,
  "fr": "faire une visite guidée",
  "zh": "參加一個有導覽的參觀行程",
  "note": ""
 },
 {
  "id": "L19_visiter_une_exposition",
  "lesson": 19,
  "fr": "visiter une exposition",
  "zh": "參觀展覽",
  "note": "visiter一定接地點"
 },
 {
  "id": "L19_voir_une_pièce_de_théâtr",
  "lesson": 19,
  "fr": "voir une pièce de théâtre",
  "zh": "看一齣戲",
  "note": "表演/戲劇用voir不用visiter"
 },
 {
  "id": "L19_l_accrobranche",
  "lesson": 19,
  "fr": "l'accrobranche",
  "zh": "樹頂繩索探險",
  "note": ""
 },
 {
  "id": "L19_être_amateur_de_football",
  "lesson": 19,
  "fr": "être amateur de football",
  "zh": "對足球很有研究、很熱衷",
  "note": "être amateur de + 名詞≠單講amateur（業餘）"
 },
 {
  "id": "L19_faire_une_compétition_de",
  "lesson": 19,
  "fr": "faire une compétition de vélo",
  "zh": "參加一場自行車比賽",
  "note": "une compétition讓活動變可數"
 },
 {
  "id": "L19_faire_une_randonnée_à_vé",
  "lesson": 19,
  "fr": "faire une randonnée à vélo de trois heures",
  "zh": "騎一趟三小時的腳踏車行程",
  "note": "跟faire du vélo（泛指不可數）對比"
 },
 {
  "id": "L19_jouer_aux_jeux_vidéo",
  "lesson": 19,
  "fr": "jouer aux jeux vidéo",
  "zh": "打電動",
  "note": "jouer à + 遊戲"
 },
 {
  "id": "L19_faire_un_tableau",
  "lesson": 19,
  "fr": "faire un tableau",
  "zh": "畫一幅畫",
  "note": "tableau＝一幅畫的實體"
 },
 {
  "id": "L19_Ça_te_dit_",
  "lesson": 19,
  "fr": "Ça te dit ?",
  "zh": "你有興趣嗎？",
  "note": "邀約常用句"
 },
 {
  "id": "L19_On_se_retrouve_chez_moi_",
  "lesson": 19,
  "fr": "On se retrouve chez moi à 19h ?",
  "zh": "我們19點在我家碰面好嗎？",
  "note": ""
 },
 {
  "id": "L19_Ça_marche_",
  "lesson": 19,
  "fr": "Ça marche !",
  "zh": "成交！說定了！",
  "note": "口語，字面「它走」"
 },
 {
  "id": "L19_Je_m_excuse_mais_je_ne_",
  "lesson": 19,
  "fr": "Je m'excuse, mais je ne peux pas.",
  "zh": "抱歉，但我不行。",
  "note": "婉拒邀約的完整句"
 },
 {
  "id": "L19_Ce_n_est_pas_possible_",
  "lesson": 19,
  "fr": "Ce n'est pas possible.",
  "zh": "沒辦法、不可能。",
  "note": "婉拒用語"
 },
 {
  "id": "L19_J_ai_fait_ma_première_co",
  "lesson": 19,
  "fr": "J'ai fait ma première compétition il y a onze ans.",
  "zh": "我十一年前參加了第一場比賽。",
  "note": "il y a + 時長＝過去…前"
 },
 {
  "id": "L19_Pendant_deux_semaines_j",
  "lesson": 19,
  "fr": "Pendant deux semaines, j'ai fait la connaissance de beaucoup d'athlètes.",
  "zh": "這兩週我認識了很多選手。",
  "note": "pendant＝明確的一段期間"
 },
 {
  "id": "L19_Les_places_sont_en_vente",
  "lesson": 19,
  "fr": "Les places sont en vente depuis hier.",
  "zh": "票昨天開始賣了（現在還在賣）。",
  "note": "depuis＝持續到現在"
 },
 {
  "id": "L19_de_nouvelles_expériences",
  "lesson": 19,
  "fr": "de nouvelles expériences",
  "zh": "新的經驗",
  "note": "形容詞放名詞前面，des要縮成de"
 },
 {
  "id": "L19_Je_l_ai_fait_moi_même_",
  "lesson": 19,
  "fr": "Je l'ai fait moi-même.",
  "zh": "我自己做的。",
  "note": "moi-même＝我自己"
 },
 {
  "id": "L19_Ta_fille_a_les_mêmes_yeu",
  "lesson": 19,
  "fr": "Ta fille a les mêmes yeux que toi.",
  "zh": "你女兒的眼睛跟你一樣。",
  "note": "les mêmes + 名詞＝相同的"
 },
 {
  "id": "L19_même_si_nous_venons_de_p",
  "lesson": 19,
  "fr": "même si nous venons de pays différents",
  "zh": "即使我們來自不同的國家",
  "note": "même si＝即使（讓步連接詞）"
 },
 {
  "id": "L19_le_nouvel_entraîneur",
  "lesson": 19,
  "fr": "le nouvel entraîneur",
  "zh": "新教練",
  "note": "entraîneur名詞≠entraîner動詞"
 },
 {
  "id": "L19_médaille_d_or_d_argent_",
  "lesson": 19,
  "fr": "médaille d'or, d'argent, de bronze",
  "zh": "金牌、銀牌、銅牌",
  "note": "argent也有「銀」的意思"
 },
 {
  "id": "L20_se_souvenir_de",
  "lesson": 20,
  "fr": "se souvenir de",
  "zh": "記得、想起",
  "note": "反身動詞，後面一定接 de：je me souviens de ce jour"
 },
 {
  "id": "L20_se_rappeler",
  "lesson": 20,
  "fr": "se rappeler",
  "zh": "記得、想起",
  "note": "意思跟 se souvenir 一樣，但直接接受詞、不加 de"
 },
 {
  "id": "L20_un_souvenir",
  "lesson": 20,
  "fr": "un souvenir",
  "zh": "回憶；紀念品",
  "note": "兩個意思同一個字——紀念品就是「一段回憶」"
 },
 {
  "id": "L20_la_mémoire",
  "lesson": 20,
  "fr": "la mémoire",
  "zh": "記憶（力）",
  "note": "腦內裝置；souvenir 是裝在裡面的一則則內容"
 },
 {
  "id": "L20_l_enfance",
  "lesson": 20,
  "fr": "l'enfance",
  "zh": "童年",
  "note": "replonger dans mon enfance＝一頭栽回童年"
 },
 {
  "id": "L20_oublier",
  "lesson": 20,
  "fr": "oublier",
  "zh": "忘記",
  "note": "impossible de les oublier＝不可能忘掉"
 },
 {
  "id": "L20_graver",
  "lesson": 20,
  "fr": "graver",
  "zh": "刻（在…上）",
  "note": "gravé dans ma mémoire＝刻在我記憶裡"
 },
 {
  "id": "L20_être_attaché_e_à",
  "lesson": 20,
  "fr": "être attaché(e) à",
  "zh": "依戀、捨不得",
  "note": "可對地方也可對人：attaché à cet endroit / à lui"
 },
 {
  "id": "L20_mon_plus_mauvais_souveni",
  "lesson": 20,
  "fr": "mon plus mauvais souvenir",
  "zh": "我最糟的回憶",
  "note": "⚠️ mauvais＝壞的，要加 le/mon plus 才是最高級"
 },
 {
  "id": "L20_dire",
  "lesson": 20,
  "fr": "dire",
  "zh": "說（說出一句話）",
  "note": "dire quelque chose à quelqu'un"
 },
 {
  "id": "L20_parler_de",
  "lesson": 20,
  "fr": "parler de",
  "zh": "談論、講到",
  "note": "je vais vous parler de ma maison"
 },
 {
  "id": "L20_raconter",
  "lesson": 20,
  "fr": "raconter",
  "zh": "敘述、講故事",
  "note": "有情節的才用 raconter：raconter mes souvenirs"
 },
 {
  "id": "L20_répondre_à",
  "lesson": 20,
  "fr": "répondre à",
  "zh": "回答",
  "note": "考卷高頻：Répondez en français."
 },
 {
  "id": "L20_sourire",
  "lesson": 20,
  "fr": "sourire",
  "zh": "微笑",
  "note": "Souriez !＝笑一個！（跟 rire 笑出聲不同）"
 },
 {
  "id": "L20_replonger_dans",
  "lesson": 20,
  "fr": "replonger dans",
  "zh": "再次一頭栽進…",
  "note": "plonger＝潛入，re- 是再一次"
 },
 {
  "id": "L20_tenir_la_main",
  "lesson": 20,
  "fr": "tenir la main",
  "zh": "牽手",
  "note": "je lui tenais la main＝我牽著她的手"
 },
 {
  "id": "L20_tremper",
  "lesson": 20,
  "fr": "tremper",
  "zh": "浸、泡",
  "note": "tremper sa tartine dans le café"
 },
 {
  "id": "L20_goûter",
  "lesson": 20,
  "fr": "goûter",
  "zh": "嚐一口",
  "note": "juste pour goûter＝只是嚐嚐看"
 },
 {
  "id": "L20_se_déplacer",
  "lesson": 20,
  "fr": "se déplacer",
  "zh": "移動、往來奔波",
  "note": "不只搬家：je me déplace souvent pour mon travail"
 },
 {
  "id": "L20_la_saveur",
  "lesson": 20,
  "fr": "la saveur",
  "zh": "風味、滋味",
  "note": "不限食物，任何品味到的味道；Saveurs de Corse"
 },
 {
  "id": "L20_l_odeur",
  "lesson": 20,
  "fr": "l'odeur",
  "zh": "氣味（中性）",
  "note": "好聞難聞都能用"
 },
 {
  "id": "L20_le_parfum",
  "lesson": 20,
  "fr": "le parfum",
  "zh": "香味；香水",
  "note": "不只是香水！le parfum des fleurs＝花香"
 },
 {
  "id": "L20_sentir",
  "lesson": 20,
  "fr": "sentir",
  "zh": "聞起來；聞",
  "note": "ça sentait bon＝（當時）聞起來好香"
 },
 {
  "id": "L20_culinaire",
  "lesson": 20,
  "fr": "culinaire",
  "zh": "烹飪的、跟吃有關的",
  "note": "des souvenirs culinaires＝關於吃的回憶"
 },
 {
  "id": "L20_délicieux_délicieuse",
  "lesson": 20,
  "fr": "délicieux, délicieuse",
  "zh": "美味的"
 },
 {
  "id": "L20_la_confiture",
  "lesson": 20,
  "fr": "la confiture",
  "zh": "果醬",
  "note": "本課出現最多次的字"
 },
 {
  "id": "L20_la_figue",
  "lesson": 20,
  "fr": "la figue",
  "zh": "無花果"
 },
 {
  "id": "L20_l_abricot",
  "lesson": 20,
  "fr": "l'abricot",
  "zh": "杏桃"
 },
 {
  "id": "L20_la_clémentine",
  "lesson": 20,
  "fr": "la clémentine",
  "zh": "小柑橘",
  "note": "也是女生名字"
 },
 {
  "id": "L20_la_tartine",
  "lesson": 20,
  "fr": "la tartine",
  "zh": "塗醬麵包片",
  "note": "預設是「麵包＋抹的東西」：tartine de confiture/de beurre"
 },
 {
  "id": "L20_le_beurre",
  "lesson": 20,
  "fr": "le beurre",
  "zh": "奶油"
 },
 {
  "id": "L20_le_beignet",
  "lesson": 20,
  "fr": "le beignet",
  "zh": "炸糕、甜甜圈類點心",
  "note": "科西嘉叫 frappes，老師家鄉叫 merveilles"
 },
 {
  "id": "L20_la_madeleine",
  "lesson": 20,
  "fr": "la madeleine",
  "zh": "瑪德蓮蛋糕",
  "note": "貝殼形小蛋糕，也是本課關鍵文化詞"
 },
 {
  "id": "L20_le_café_au_lait",
  "lesson": 20,
  "fr": "le café au lait",
  "zh": "咖啡歐蕾",
  "note": "法國人早餐會把麵包泡進去"
 },
 {
  "id": "L20_assis_e_",
  "lesson": 20,
  "fr": "assis(e)",
  "zh": "坐著",
  "note": "on adorait manger assis＝我們超愛坐著吃"
 },
 {
  "id": "L20_debout",
  "lesson": 20,
  "fr": "debout",
  "zh": "站著",
  "note": "不變化，永遠是 debout"
 },
 {
  "id": "L20_couché_e_",
  "lesson": 20,
  "fr": "couché(e)",
  "zh": "躺著、睡下",
  "note": "來自 se coucher（就寢）"
 },
 {
  "id": "L20_allongé_e_",
  "lesson": 20,
  "fr": "allongé(e)",
  "zh": "躺著、平躺",
  "note": "allongés dans l'herbe＝躺在草地上"
 },
 {
  "id": "L20_la_maison_familiale",
  "lesson": 20,
  "fr": "la maison familiale",
  "zh": "老家、家族的房子",
  "note": "familial(e) 是形容詞"
 },
 {
  "id": "L20_la_cheminée",
  "lesson": 20,
  "fr": "la cheminée",
  "zh": "壁爐；煙囪",
  "note": "跟英文 chimney 同源"
 },
 {
  "id": "L20_le_feu",
  "lesson": 20,
  "fr": "le feu",
  "zh": "火",
  "note": "第14課學過 un feu de forêt"
 },
 {
  "id": "L20_le_jardin",
  "lesson": 20,
  "fr": "le jardin",
  "zh": "花園、院子"
 },
 {
  "id": "L20_l_herbe",
  "lesson": 20,
  "fr": "l'herbe",
  "zh": "草、草地"
 },
 {
  "id": "L20_humide",
  "lesson": 20,
  "fr": "humide",
  "zh": "潮濕的"
 },
 {
  "id": "L20_une_étoile",
  "lesson": 20,
  "fr": "une étoile",
  "zh": "星星",
  "note": "跟西班牙文 estrella 同源（拉丁文 stella）"
 },
 {
  "id": "L20_la_Grande_Ourse",
  "lesson": 20,
  "fr": "la Grande Ourse",
  "zh": "大熊座（北斗七星）",
  "note": "ours＝熊，所以是「大熊」"
 },
 {
  "id": "L20_une_étoile_filante",
  "lesson": 20,
  "fr": "une étoile filante",
  "zh": "流星",
  "note": "filer＝飛快移動"
 },
 {
  "id": "L20_faire_un_v_u",
  "lesson": 20,
  "fr": "faire un vœu",
  "zh": "許願",
  "note": "看到流星要說：Fais un vœu !"
 },
 {
  "id": "L20_le_printemps",
  "lesson": 20,
  "fr": "le printemps",
  "zh": "春天",
  "note": "au printemps；其他季節用 en"
 },
 {
  "id": "L20_à_cette_époque",
  "lesson": 20,
  "fr": "à cette époque",
  "zh": "那個時候",
  "note": "講一段人生時期，配 imparfait"
 },
 {
  "id": "L20_chaque_jour_tous_les_j",
  "lesson": 20,
  "fr": "chaque jour ＝ tous les jours",
  "zh": "每天",
  "note": "chaque 不變化、後面接單數"
 },
 {
  "id": "L20_de_temps_en_temps",
  "lesson": 20,
  "fr": "de temps en temps",
  "zh": "偶爾、時不時",
  "note": "老師說超好用，也可拿來謙虛"
 },
 {
  "id": "L20_parfois",
  "lesson": 20,
  "fr": "parfois",
  "zh": "有時候",
  "note": "parfois＋imparfait＝重複發生的習慣"
 },
 {
  "id": "L20_d_abord",
  "lesson": 20,
  "fr": "d'abord",
  "zh": "首先",
  "note": "講故事的開場路標"
 },
 {
  "id": "L20_encore_aujourd_hui",
  "lesson": 20,
  "fr": "encore aujourd'hui",
  "zh": "直到今天仍然",
  "note": "encore 這裡不是「再一次」"
 },
 {
  "id": "L20_quand_j_étais_petit_e_",
  "lesson": 20,
  "fr": "quand j'étais petit(e)",
  "zh": "當我小時候",
  "note": "口說寫作萬用開場，必背"
 },
 {
  "id": "L20_nous_faisons_je_faisai",
  "lesson": 20,
  "fr": "nous faisons → je faisais",
  "zh": "faire 的 imparfait",
  "note": "⚠️ 拼 fai- 但唸 /fə/，法文少數拼寫騙人的常用字"
 },
 {
  "id": "L20_nous_finissons_je_fini",
  "lesson": 20,
  "fr": "nous finissons → je finissais",
  "zh": "finir 的 imparfait",
  "note": "⚠️ 不能砍原形！-ir 動詞的 nous 形多了 -iss-"
 },
 {
  "id": "L20_nous_écrivons_j_écriva",
  "lesson": 20,
  "fr": "nous écrivons → j'écrivais",
  "zh": "écrire 的 imparfait",
  "note": "⚠️ écri- 是錯的，要用 nous 形裡的 v"
 },
 {
  "id": "L20_nous_sommes_j_étais",
  "lesson": 20,
  "fr": "nous sommes ❌ → j'étais",
  "zh": "être 的 imparfait（唯一例外）",
  "note": "字根 ét-，不從 nous 形推"
 },
 {
  "id": "L20_nous_étudions_nous_étu",
  "lesson": 20,
  "fr": "nous étudions → nous étudiions",
  "zh": "étudier 的 imparfait",
  "note": "⚠️ 雙 i：字根 étudi-＋字尾 -ions"
 },
 {
  "id": "L20_je_mangeais_nous_mangi",
  "lesson": 20,
  "fr": "je mangeais / nous mangions",
  "zh": "manger 的 imparfait",
  "note": "字尾 a 開頭要補 e；字尾 i 開頭不用"
 },
 {
  "id": "L20_je_déplaçais_nous_dépl",
  "lesson": 20,
  "fr": "je déplaçais / nous déplacions",
  "zh": "déplacer 的 imparfait",
  "note": "c 遇 a 要加尾巴變 ç；遇 i 不用"
 },
 {
  "id": "L20_Souriez_",
  "lesson": 20,
  "fr": "Souriez !",
  "zh": "笑一個！",
  "note": "拍照時的固定說法"
 },
 {
  "id": "L20_Sans_hésiter_",
  "lesson": 20,
  "fr": "Sans hésiter.",
  "zh": "毫不猶豫。",
  "note": "Ma préférée, sans hésiter, c'est la figue."
 },
 {
  "id": "L20_Bon_d_accord_",
  "lesson": 20,
  "fr": "Bon, d'accord.",
  "zh": "好吧，那好。",
  "note": "⚠️ 句首的 bon 是「勉強接受」的語氣詞，不會單獨說"
 },
 {
  "id": "L20_Juste_pour_goûter_",
  "lesson": 20,
  "fr": "Juste pour goûter.",
  "zh": "只是嚐一口而已。",
  "note": "juste＝只是"
 },
 {
  "id": "L20_Fais_un_v_u_",
  "lesson": 20,
  "fr": "Fais un vœu !",
  "zh": "快許願！",
  "note": "看到流星的反應，跟中文一樣"
 },
 {
  "id": "L20_Ça_me_replonge_dans_mon_",
  "lesson": 20,
  "fr": "Ça me replonge dans mon enfance.",
  "zh": "這讓我一下子回到童年。",
  "note": "看到懷舊的東西就可以用"
 },
 {
  "id": "L20_C_est_ma_madeleine_de_Pr",
  "lesson": 20,
  "fr": "C'est ma madeleine de Proust.",
  "zh": "這是我的普魯斯特瑪德蓮。",
  "note": "指任何會瞬間喚回童年的東西（物品/歌/顏色/氣味）"
 },
 {
  "id": "L21_la_vue",
  "lesson": 21,
  "fr": "la vue",
  "zh": "視覺；景色",
  "note": "五感之一；也指「景色」：une vue magnifique"
 },
 {
  "id": "L21_l_odorat",
  "lesson": 21,
  "fr": "l'odorat",
  "zh": "嗅覺",
  "note": "⚠️ 跟 l'odeur（氣味）不同：odorat 是能力，odeur 是聞到的東西"
 },
 {
  "id": "L21_le_goût",
  "lesson": 21,
  "fr": "le goût",
  "zh": "味覺；味道",
  "note": "名詞；「去嚐」是動詞 goûter"
 },
 {
  "id": "L21_le_toucher",
  "lesson": 21,
  "fr": "le toucher",
  "zh": "觸覺",
  "note": "五感之一"
 },
 {
  "id": "L21_l_ouïe",
  "lesson": 21,
  "fr": "l'ouïe",
  "zh": "聽覺",
  "note": "唸 /wi/（像 oui）；動詞是 entendre／écouter"
 },
 {
  "id": "L21_voir",
  "lesson": 21,
  "fr": "voir",
  "zh": "看到（被動、非刻意）",
  "note": "J'ai vu des oiseaux＝我看到一些鳥"
 },
 {
  "id": "L21_regarder",
  "lesson": 21,
  "fr": "regarder",
  "zh": "看（刻意、專注）",
  "note": "⚠️ 電影一定用 regarder：J'ai regardé un film"
 },
 {
  "id": "L21_entendre",
  "lesson": 21,
  "fr": "entendre",
  "zh": "聽到（被動）",
  "note": "跟 voir 同邏輯"
 },
 {
  "id": "L21_écouter",
  "lesson": 21,
  "fr": "écouter",
  "zh": "聽（專注）",
  "note": "跟 regarder 同邏輯"
 },
 {
  "id": "L21_le_bruit",
  "lesson": 21,
  "fr": "le bruit",
  "zh": "聲音、噪音",
  "note": "中性偏負面"
 },
 {
  "id": "L21_le_chant_des_oiseaux",
  "lesson": 21,
  "fr": "le chant des oiseaux",
  "zh": "鳥鳴",
  "note": "le chant＝鳴叫、歌聲（來自 chanter）"
 },
 {
  "id": "L21_sentir_bon_sentir_mauv",
  "lesson": 21,
  "fr": "sentir bon ≠ sentir mauvais",
  "zh": "聞起來香／難聞",
  "note": "⚠️ 後面接 bon/mauvais 不變化"
 },
 {
  "id": "L21_Ça_sent_mauvais_",
  "lesson": 21,
  "fr": "Ça sent mauvais.",
  "zh": "（口語）這下不妙了。",
  "note": "字面是「聞起來很臭」，實際用來講不好的預感"
 },
 {
  "id": "L21_l_album_photos",
  "lesson": 21,
  "fr": "l'album photos",
  "zh": "相簿",
  "note": "⚠️ photos 恆用複數"
 },
 {
  "id": "L21_développer_des_photos",
  "lesson": 21,
  "fr": "développer des photos",
  "zh": "沖洗照片",
  "note": "développer 這裡不是「發展」"
 },
 {
  "id": "L21_un_souvenir_d_enfance",
  "lesson": 21,
  "fr": "un souvenir d'enfance",
  "zh": "童年回憶"
 },
 {
  "id": "L21_un_souvenir_d_adolescenc",
  "lesson": 21,
  "fr": "un souvenir d'adolescence",
  "zh": "青少年時期的回憶"
 },
 {
  "id": "L21_un_souvenir_de_jeunesse",
  "lesson": 21,
  "fr": "un souvenir de jeunesse",
  "zh": "年輕時的回憶",
  "note": "⚠️ la jeunesse 約 20–25 歲，不是童年"
 },
 {
  "id": "L21_un_souvenir_d_école",
  "lesson": 21,
  "fr": "un souvenir d'école",
  "zh": "學校的回憶"
 },
 {
  "id": "L21_un_souvenir_de_famille",
  "lesson": 21,
  "fr": "un souvenir de famille",
  "zh": "家庭回憶"
 },
 {
  "id": "L21_un_souvenir_de_vacances",
  "lesson": 21,
  "fr": "un souvenir de vacances",
  "zh": "假期回憶",
  "note": "vacances 恆複數"
 },
 {
  "id": "L21_l_adolescence",
  "lesson": 21,
  "fr": "l'adolescence",
  "zh": "青春期"
 },
 {
  "id": "L21_la_jeunesse",
  "lesson": 21,
  "fr": "la jeunesse",
  "zh": "年輕時期（約20-25歲）",
  "note": "⚠️ 比 adolescence 大，別翻成童年"
 },
 {
  "id": "L21_agréable",
  "lesson": 21,
  "fr": "agréable",
  "zh": "愉快的"
 },
 {
  "id": "L21_joyeux_joyeuse",
  "lesson": 21,
  "fr": "joyeux, joyeuse",
  "zh": "歡樂的",
  "note": "Joyeux anniversaire !＝生日快樂"
 },
 {
  "id": "L21_heureux_heureuse",
  "lesson": 21,
  "fr": "heureux, heureuse",
  "zh": "幸福的、開心的",
  "note": "反義是 triste"
 },
 {
  "id": "L21_triste",
  "lesson": 21,
  "fr": "triste",
  "zh": "悲傷的",
  "note": "heureux／joyeux 的反義"
 },
 {
  "id": "L21_inoubliable",
  "lesson": 21,
  "fr": "inoubliable",
  "zh": "難忘的",
  "note": "⚠️ 中性：好到難忘、爛到難忘都能用"
 },
 {
  "id": "L21_Joyeux_anniversaire_",
  "lesson": 21,
  "fr": "Joyeux anniversaire !",
  "zh": "生日快樂！",
  "note": "也可以說 Bon anniversaire !"
 },
 {
  "id": "L21_y_à_sur_sous_dan",
  "lesson": 21,
  "fr": "y ＝ à / sur / sous / dans ＋ 地點",
  "zh": "y＝在那裡／去那裡",
  "note": "看到 à, sur, sous, dans 就用 y"
 },
 {
  "id": "L21_en_de_du_de_la_d",
  "lesson": 21,
  "fr": "en ＝ de / du / de la / des ＋ 地點",
  "zh": "en＝從那裡",
  "note": "看到 de 開頭就用 en"
 },
 {
  "id": "L21_J_y_vais_souvent_",
  "lesson": 21,
  "fr": "J'y vais souvent.",
  "zh": "我常去那裡。",
  "note": "y 夾在主詞和動詞之間"
 },
 {
  "id": "L21_Oui_j_en_reviens_à_l_in",
  "lesson": 21,
  "fr": "Oui, j'en reviens à l'instant.",
  "zh": "對，我剛從那裡回來。",
  "note": "à l'instant＝剛剛"
 },
 {
  "id": "L21_Il_en_est_parti_à_six_he",
  "lesson": 21,
  "fr": "Il en est parti à six heures.",
  "zh": "他六點從那裡離開。",
  "note": "⚠️ passé composé 裡 y/en 放助動詞前面"
 },
 {
  "id": "L21_Non_on_n_y_a_pas_dormi_",
  "lesson": 21,
  "fr": "Non, on n'y a pas dormi.",
  "zh": "不，我們沒在那裡睡。",
  "note": "否定＋PC：n'＋y＋助動詞＋pas＋分詞"
 },
 {
  "id": "L21_Je_m_y_promène_très_souv",
  "lesson": 21,
  "fr": "Je m'y promène très souvent.",
  "zh": "我很常在那裡散步。",
  "note": "反身動詞：me→m'，再接 y"
 },
 {
  "id": "L21_J_y_suis_encore_",
  "lesson": 21,
  "fr": "J'y suis encore.",
  "zh": "我還在那裡。",
  "note": "跟 je n'en suis pas sorti 是同一題的兩種答法"
 },
 {
  "id": "L21_là_bas",
  "lesson": 21,
  "fr": "là-bas",
  "zh": "那裡（較遠）",
  "note": "可以代替 y：Je vais là-bas ＝ J'y vais"
 },
 {
  "id": "L21_ici",
  "lesson": 21,
  "fr": "ici",
  "zh": "這裡（離說話者近）",
  "note": "跟 là-bas 相對"
 },
 {
  "id": "L21_venir_de",
  "lesson": 21,
  "fr": "venir de",
  "zh": "來自（出身）",
  "note": "⚠️ Tu viens du Japon ?＝你是日本來的嗎"
 },
 {
  "id": "L21_revenir_de",
  "lesson": 21,
  "fr": "revenir de",
  "zh": "從…回來（去了一趟）",
  "note": "⚠️ Tu reviens du Japon ?＝你剛從日本回來嗎"
 },
 {
  "id": "L21_repartir",
  "lesson": 21,
  "fr": "repartir",
  "zh": "再次離開（來過一趟又走）",
  "note": "本來就不是那裡的人，走時用 repartir"
 },
 {
  "id": "L21_redescendre",
  "lesson": 21,
  "fr": "redescendre",
  "zh": "（上去之後）再下來",
  "note": "re-＝再一次"
 },
 {
  "id": "L21_remonter",
  "lesson": 21,
  "fr": "remonter",
  "zh": "再上去一次"
 },
 {
  "id": "L21_le_paysage",
  "lesson": 21,
  "fr": "le paysage",
  "zh": "風景、景色",
  "note": "本課關鍵字"
 },
 {
  "id": "L21_marquer_quelqu_un",
  "lesson": 21,
  "fr": "marquer quelqu'un",
  "zh": "在某人心裡留下深刻印記",
  "note": "⚠️ 不是「標記」：ça me marque＝我忘不掉"
 },
 {
  "id": "L21_à_jamais",
  "lesson": 21,
  "fr": "à jamais",
  "zh": "永遠地",
  "note": "marquer à jamais＝一輩子忘不了"
 },
 {
  "id": "L21_en_pleine_nature",
  "lesson": 21,
  "fr": "en pleine nature",
  "zh": "在大自然裡"
 },
 {
  "id": "L21_touristique",
  "lesson": 21,
  "fr": "touristique",
  "zh": "觀光的、遊客多的"
 },
 {
  "id": "L21_magique",
  "lesson": 21,
  "fr": "magique",
  "zh": "神奇的"
 },
 {
  "id": "L21_une_grande_variété_de",
  "lesson": 21,
  "fr": "une grande variété de",
  "zh": "非常多樣的…",
  "note": "la variété＝多樣性"
 },
 {
  "id": "L21_classé_au_patrimoine_mon",
  "lesson": 21,
  "fr": "classé au patrimoine mondial de l'UNESCO",
  "zh": "列入UNESCO世界遺產",
  "note": "le patrimoine＝遺產"
 },
 {
  "id": "L21_sublime",
  "lesson": 21,
  "fr": "sublime",
  "zh": "絕美的",
  "note": "比 magnifique 更強"
 },
 {
  "id": "L21_le_sommet",
  "lesson": 21,
  "fr": "le sommet",
  "zh": "山頂"
 },
 {
  "id": "L21_l_intérieur_de_l_île",
  "lesson": 21,
  "fr": "l'intérieur de l'île",
  "zh": "島的內陸"
 },
 {
  "id": "L21_la_barrière_de_corail",
  "lesson": 21,
  "fr": "la barrière de corail",
  "zh": "珊瑚礁",
  "note": "le corail＝珊瑚"
 },
 {
  "id": "L21_le_silence",
  "lesson": 21,
  "fr": "le silence",
  "zh": "寂靜"
 },
 {
  "id": "L21_s_évader",
  "lesson": 21,
  "fr": "s'évader",
  "zh": "逃離日常、放空",
  "note": "原意是越獄，引申為度假式抽離"
 },
 {
  "id": "L21_faire_l_ascension_de",
  "lesson": 21,
  "fr": "faire l'ascension de",
  "zh": "攀登…",
  "note": "l'ascension＝登頂"
 },
 {
  "id": "L21_enchanté_e_",
  "lesson": 21,
  "fr": "enchanté(e)",
  "zh": "陶醉的；幸會",
  "note": "⚠️ 兩義：課文是「非常開心」，初次見面才是「幸會」"
 },
 {
  "id": "L21_Que_demander_de_plus_",
  "lesson": 21,
  "fr": "Que demander de plus ?",
  "zh": "夫復何求？",
  "note": "已經很完美時的固定說法"
 },
 {
  "id": "L21_au_bord_de_la_mer",
  "lesson": 21,
  "fr": "au bord de la mer",
  "zh": "在海邊",
  "note": "le bord＝邊（Bordeaux 就是 bord de l'eau 來的）"
 },
 {
  "id": "L21_espérer",
  "lesson": 21,
  "fr": "espérer",
  "zh": "希望",
  "note": "名詞是 l'espoir；-er 動詞"
 },
 {
  "id": "L15_On_va_revenir_au_passé_c",
  "lesson": 15,
  "fr": "On va revenir au passé composé.",
  "zh": "我們回到passé composé。",
  "note": "🎙老師課堂口語"
 },
 {
  "id": "L15_Ça_va_C_est_bon_",
  "lesson": 15,
  "fr": "Ça va ? C'est bon ?",
  "zh": "懂了嗎？可以嗎？（確認理解口頭禪）",
  "note": "🎙老師課堂口語"
 },
 {
  "id": "L15_Vous_voyez_",
  "lesson": 15,
  "fr": "Vous voyez ?",
  "zh": "你們看到了嗎？（懂了嗎）",
  "note": "🎙老師課堂口語"
 },
 {
  "id": "L15_Vous_connaissez_les_stea",
  "lesson": 15,
  "fr": "Vous connaissez les steaks frites ?",
  "zh": "你們知道牛排薯條這道菜嗎？",
  "note": "🎙老師課堂口語"
 },
 {
  "id": "L15_C_est_à_toi_",
  "lesson": 15,
  "fr": "C'est à toi !",
  "zh": "輪到你了！",
  "note": "🎙老師課堂口語"
 },
 {
  "id": "L15_Je_ne_vous_comprends_pas",
  "lesson": 15,
  "fr": "Je ne vous comprends pas.",
  "zh": "我聽不懂你們（說的）。",
  "note": "🎙老師課堂口語"
 },
 {
  "id": "L15_Au_fait_",
  "lesson": 15,
  "fr": "Au fait !",
  "zh": "對了、順帶一提！",
  "note": "🎙老師課堂口語"
 },
 {
  "id": "L17_C_est_un_truc_",
  "lesson": 17,
  "fr": "C'est un truc.",
  "zh": "這是個小訣竅／小玩意（truc＝萬用的「東西」）",
  "note": "🎙老師課堂口語"
 },
 {
  "id": "L17_Ah_non_je_ne_vais_pas_t",
  "lesson": 17,
  "fr": "Ah non, je ne vais pas te dire.",
  "zh": "啊不，我不告訴你（賣關子）",
  "note": "🎙老師課堂口語"
 },
 {
  "id": "L17_Parlez_moi_de_votre_fami",
  "lesson": 17,
  "fr": "Parlez-moi de votre famille.",
  "zh": "跟我聊聊您的家庭（考官指令句型 Parlez-moi de...）",
  "note": "🎙老師課堂口語"
 },
 {
  "id": "L17_Ou_toute_autre_question_",
  "lesson": 17,
  "fr": "Ou toute autre question adaptée au niveau A1.",
  "zh": "或任何適合A1程度的其他問題（考官文件用語）",
  "note": "🎙老師課堂口語"
 },
 {
  "id": "L18_Ma_s_ur_et_son_mari_ont_",
  "lesson": 18,
  "fr": "Ma sœur et son mari ont eu un enfant l'année dernière.",
  "zh": "我姊姊和她先生去年生了一個小孩（l'année dernière＝去年；année是陰性，配dernière）",
  "note": "🎙老師課堂口語"
 },
 {
  "id": "L18_Ils_sont_tombés_amoureux",
  "lesson": 18,
  "fr": "Ils sont tombés amoureux en 2019.",
  "zh": "他們2019年墜入愛河（tomber配être，注意這裡跟avoir un coup de foudre不同，用的是tomber）",
  "note": "🎙老師課堂口語"
 },
 {
  "id": "L18_Je_vais_me_marier_l_an_p",
  "lesson": 18,
  "fr": "Je vais me marier l'an prochain.",
  "zh": "我明年要結婚（futur proche反身動詞：vais me marier，不是vais marier）",
  "note": "🎙老師課堂口語"
 },
 {
  "id": "L18_Elle_n_est_pas_célibatai",
  "lesson": 18,
  "fr": "Elle n'est pas célibataire, elle vit en couple.",
  "zh": "她不是單身，她穩定交往中（vivre：je vis, tu vis, il vit, nous vivons——單數三個人稱都是S結尾）",
  "note": "🎙老師課堂口語"
 },
 {
  "id": "L18_Je_me_suis_installé_e_à",
  "lesson": 18,
  "fr": "Je me suis installé(e) à Taipei il y a cinq ans.",
  "zh": "我五年前在台北定居下來（s'installer的passé composé）",
  "note": "🎙老師課堂口語"
 },
 {
  "id": "L18_Tu_préfères_vendredi_ou_",
  "lesson": 18,
  "fr": "Tu préfères vendredi ou dimanche ?",
  "zh": "你比較想約週五還是週日？（排下次上課常聽到的問法）",
  "note": "🎙老師課堂口語"
 },
 {
  "id": "L18_On_peut_arrêter_là_",
  "lesson": 18,
  "fr": "On peut arrêter là.",
  "zh": "我們可以在這裡先停（下課用語）",
  "note": "🎙老師課堂口語"
 },
 {
  "id": "L19_Le_nouvel_entraîneur_c_",
  "lesson": 19,
  "fr": "Le nouvel entraîneur, c'est Zidane.",
  "zh": "新教練是席丹（entraîneur名詞＝教練，entraîner動詞＝訓練/教練別人）",
  "note": "🎙老師課堂口語"
 },
 {
  "id": "L19_Ça_marche__2",
  "lesson": 19,
  "fr": "Ça marche.",
  "zh": "成交、說定了（口語，字面「它走」，等同ça me va）",
  "note": "🎙老師課堂口語"
 },
 {
  "id": "L19_Ça_fonctionne_",
  "lesson": 19,
  "fr": "Ça fonctionne.",
  "zh": "它（機器/東西）運作正常——形容「物品」用fonctionne比marche更準確",
  "note": "🎙老師課堂口語"
 },
 {
  "id": "L20_Tu_vois_Là_c_est_la_G",
  "lesson": 20,
  "fr": "Tu vois ? Là, c'est la Grande Ourse.",
  "zh": "你看到嗎？那邊，那是大熊座。",
  "note": "指東西給人看的口語起手式｜🎙老師課堂口語"
 },
 {
  "id": "L20_Oh_une_étoile_filante_",
  "lesson": 20,
  "fr": "Oh, une étoile filante ! Fais un vœu !",
  "zh": "喔，流星！快許願！",
  "note": "跟中文一模一樣的反應｜🎙老師課堂口語"
 },
 {
  "id": "L20_C_est_quoi_parfois_",
  "lesson": 20,
  "fr": "C'est quoi, parfois ?",
  "zh": "parfois 是什麼意思？",
  "note": "老師抽問的固定句型，也可以反過來自己問：C'est quoi, « saveur » ?｜🎙老師課堂口語"
 },
 {
  "id": "L20_Est_ce_que_tu_partais_en",
  "lesson": 20,
  "fr": "Est-ce que tu partais en vacances avec tes parents quand tu étais petit ?",
  "zh": "你小時候會跟父母去度假嗎？",
  "note": "整句就是 imparfait 的實戰示範，也是口說考試會被問的題型｜🎙老師課堂口語"
 },
 {
  "id": "L20_Ce_n_est_pas_très_loin_",
  "lesson": 20,
  "fr": "Ce n'est pas très loin.",
  "zh": "不算太遠。",
  "note": "🎙老師課堂口語"
 },
 {
  "id": "L21_On_peut_essayer_ensemble",
  "lesson": 21,
  "fr": "On peut essayer ensemble.",
  "zh": "我們可以一起試試看。",
  "note": "課堂帶練習的起手式｜🎙老師課堂口語"
 },
 {
  "id": "L21_D_abord_je_le_lis_au_pr",
  "lesson": 21,
  "fr": "D'abord, je le lis au présent. Et après, tu essayes de le mettre à l'imparfait.",
  "zh": "我先用現在式唸一遍，然後你試著把它改成未完成式。",
  "note": "mettre à＝把…改成（某個時態）｜🎙老師課堂口語"
 },
 {
  "id": "L21_Tu_l_as_fait_ou_non_",
  "lesson": 21,
  "fr": "Tu l'as fait ou non ?",
  "zh": "你做了沒？",
  "note": "問作業的固定句｜🎙老師課堂口語"
 },
 {
  "id": "L21_On_est_bon_",
  "lesson": 21,
  "fr": "On est bon ?",
  "zh": "我們 OK 了嗎？／都懂了嗎？",
  "note": "課堂確認用語，比 Vous comprenez ? 口語｜🎙老師課堂口語"
 },
 {
  "id": "L21_Il_n_y_a_pas_besoin_de_c",
  "lesson": 21,
  "fr": "Il n'y a pas besoin de chercher.",
  "zh": "不需要去找。",
  "note": "講 être 不用找 nous 形時說的｜🎙老師課堂口語"
 },
 {
  "id": "L21_On_n_en_revient_pas_",
  "lesson": 21,
  "fr": "On n'en revient pas.",
  "zh": "（延伸）我們無法相信。",
  "note": "跟課文的 on en revient enchanté 同結構，但這句是固定用法「難以置信」｜🎙老師課堂口語"
 },
 {
  "id": "L22_Quel_temps_fait_il_",
  "lesson": 22,
  "fr": "Quel temps fait-il ?",
  "zh": "天氣怎麼樣？",
  "note": "標準問法；回答一律用 Il fait…"
 },
 {
  "id": "L22_Il_fait_beau_Il_fait_",
  "lesson": 22,
  "fr": "Il fait beau. / Il fait mauvais.",
  "zh": "天氣好／天氣不好",
  "note": "⚠️ 下雨下雪例外：Il pleut. / Il neige."
 },
 {
  "id": "L22_le_temps",
  "lesson": 22,
  "fr": "le temps",
  "zh": "天氣；時間",
  "note": "⚠️ 一字兩義：Quel temps fait-il ?（天氣）／Je n'ai pas le temps（時間）"
 },
 {
  "id": "L22_la_canicule",
  "lesson": 22,
  "fr": "la canicule",
  "zh": "熱浪",
  "note": "⚠️ 太熱＋持續太久才叫 canicule（heat wave），不是單純的熱"
 },
 {
  "id": "L22_la_chaleur",
  "lesson": 22,
  "fr": "la chaleur",
  "zh": "熱、高溫",
  "note": "單純的熱，程度沒有 canicule 強"
 },
 {
  "id": "L22_la_fraîcheur",
  "lesson": 22,
  "fr": "la fraîcheur",
  "zh": "涼爽",
  "note": "⚠️ 不是冷！18-20度那種舒服的涼；froid 才是冷"
 },
 {
  "id": "L22_le_ciel_bleu_le_ciel_g",
  "lesson": 22,
  "fr": "le ciel bleu / le ciel gris",
  "zh": "藍天／灰濛濛的天空",
  "note": "un temps gris＝陰天"
 },
 {
  "id": "L22_le_climat",
  "lesson": 22,
  "fr": "le climat",
  "zh": "氣候",
  "note": "⚠️ climat＝長期氣候；météo＝當下天氣"
 },
 {
  "id": "L22_l_orage",
  "lesson": 22,
  "fr": "l'orage",
  "zh": "暴風雨、雷雨",
  "note": "⚠️ 整個天氣現象；雷聲是 le tonnerre"
 },
 {
  "id": "L22_le_tonnerre",
  "lesson": 22,
  "fr": "le tonnerre",
  "zh": "雷（聲）",
  "note": "打雷那個聲音"
 },
 {
  "id": "L22_la_pluie_il_pleut",
  "lesson": 22,
  "fr": "la pluie / il pleut",
  "zh": "雨／下雨"
 },
 {
  "id": "L22_le_soleil",
  "lesson": 22,
  "fr": "le soleil",
  "zh": "太陽",
  "note": "il fait du soleil＝出太陽"
 },
 {
  "id": "L22_la_température_les_degr",
  "lesson": 22,
  "fr": "la température (les degrés)",
  "zh": "溫度（度數）",
  "note": "Il fait 30 degrés."
 },
 {
  "id": "L22_un_temps_humide_un_tem",
  "lesson": 22,
  "fr": "un temps humide ≠ un temps sec",
  "zh": "潮濕的天氣／乾燥的天氣",
  "note": "sec 的陰性是 sèche"
 },
 {
  "id": "L22_le_vent_souffler",
  "lesson": 22,
  "fr": "le vent / souffler",
  "zh": "風／吹",
  "note": "Le vent souffle à 80 km/h."
 },
 {
  "id": "L22_La_météo_annonce_des_ora",
  "lesson": 22,
  "fr": "La météo annonce des orages.",
  "zh": "氣象預報說有雷雨。",
  "note": "annoncer＝預報"
 },
 {
  "id": "L22_à_marée_basse_à_marée_",
  "lesson": 22,
  "fr": "à marée basse ≠ à marée haute",
  "zh": "退潮時／漲潮時",
  "note": "la marée＝潮汐"
 },
 {
  "id": "L22_la_côte",
  "lesson": 22,
  "fr": "la côte",
  "zh": "海岸",
  "note": "⚠️ 可能是岩岸，不一定有沙灘（跟 plage 不同）"
 },
 {
  "id": "L22_la_dune",
  "lesson": 22,
  "fr": "la dune",
  "zh": "沙丘",
  "note": "法國最有名的是 la dune du Pilat（歐洲最高）"
 },
 {
  "id": "L22_la_mouette",
  "lesson": 22,
  "fr": "la mouette",
  "zh": "海鷗"
 },
 {
  "id": "L22_le_port",
  "lesson": 22,
  "fr": "le port",
  "zh": "港口"
 },
 {
  "id": "L22_le_sable",
  "lesson": 22,
  "fr": "le sable",
  "zh": "沙"
 },
 {
  "id": "L22_la_prairie",
  "lesson": 22,
  "fr": "la prairie",
  "zh": "草原、牧草地",
  "note": "à la campagne"
 },
 {
  "id": "L22_le_chalet",
  "lesson": 22,
  "fr": "le chalet",
  "zh": "木屋",
  "note": "à la montagne"
 },
 {
  "id": "L22_un_bon_restaurant_frança",
  "lesson": 22,
  "fr": "un bon restaurant français",
  "zh": "一家好的法式餐廳",
  "note": "⭐ 短形容詞在前、國籍在後，名詞夾中間"
 },
 {
  "id": "L22_une_petite_île_espagnole",
  "lesson": 22,
  "fr": "une petite île espagnole",
  "zh": "一座西班牙小島",
  "note": "⭐ petite 在前、espagnole（國籍）在後，兩個都配陰性"
 },
 {
  "id": "L22_de_gros_bateaux_blancs",
  "lesson": 22,
  "fr": "de gros bateaux blancs",
  "zh": "一些白色大船",
  "note": "⭐ gros 在前→des變de；blancs（顏色）在後配陽性複數"
 },
 {
  "id": "L22_de_jolies_espadrilles",
  "lesson": 22,
  "fr": "de jolies espadrilles",
  "zh": "一些漂亮的草編鞋",
  "note": "⭐ 形容詞放複數名詞前 → des 縮成 de"
 },
 {
  "id": "L22_d_excellentes_épices",
  "lesson": 22,
  "fr": "d'excellentes épices",
  "zh": "一些極好的香料",
  "note": "⭐ 母音前再縮成 d'；épice 陰性所以 excellentes 加 es"
 },
 {
  "id": "L22_mon_propre_mug",
  "lesson": 22,
  "fr": "mon propre mug",
  "zh": "我自己的杯子",
  "note": "⚠️ propre 在名詞前＝「自己的」"
 },
 {
  "id": "L22_un_mug_propre",
  "lesson": 22,
  "fr": "un mug propre",
  "zh": "一個乾淨的杯子",
  "note": "⚠️ propre 在名詞後＝「乾淨的」"
 },
 {
  "id": "L22_Les_incroyables_boutique",
  "lesson": 22,
  "fr": "Les incroyables boutiques !",
  "zh": "那些超誇張的店！",
  "note": "本該在後的形容詞刻意提前＝強調，句子更有感情"
 },
 {
  "id": "L22_au_quotidien",
  "lesson": 22,
  "fr": "au quotidien",
  "zh": "日常地、每天",
  "note": "Je fais ça au quotidien."
 },
 {
  "id": "L22_quotidien_hebdomadaire",
  "lesson": 22,
  "fr": "quotidien / hebdomadaire / mensuel / annuel",
  "zh": "每日／每週／每月／每年的",
  "note": "一整組一起記"
 },
 {
  "id": "L22_la_pause",
  "lesson": 22,
  "fr": "la pause",
  "zh": "休息時間",
  "note": "la pause déjeuner／la pause café"
 },
 {
  "id": "L22_selon_une_étude",
  "lesson": 22,
  "fr": "selon une étude",
  "zh": "根據一項研究",
  "note": "寫作引述句型"
 },
 {
  "id": "L22_universel_le_",
  "lesson": 22,
  "fr": "universel(le)",
  "zh": "普世的、人人都懂的"
 },
 {
  "id": "L22_entrer_en_contact_avec",
  "lesson": 22,
  "fr": "entrer en contact avec",
  "zh": "跟…建立連結"
 },
 {
  "id": "L22_les_personnes_âgées",
  "lesson": 22,
  "fr": "les personnes âgées",
  "zh": "長者",
  "note": "âgé＝年長的"
 },
 {
  "id": "L22_le_bulletin_météo",
  "lesson": 22,
  "fr": "le bulletin météo",
  "zh": "氣象預報（節目）"
 },
 {
  "id": "L22_prévoir_les_prévisions",
  "lesson": 22,
  "fr": "prévoir / les prévisions",
  "zh": "預測／預報"
 },
 {
  "id": "L22_être_accro_à",
  "lesson": 22,
  "fr": "être accro à",
  "zh": "離不開、上癮",
  "note": "口語"
 },
 {
  "id": "L22_ramener",
  "lesson": 22,
  "fr": "ramener",
  "zh": "帶回來",
  "note": "ramener des souvenirs＝帶紀念品回來"
 },
 {
  "id": "L22_prolonger",
  "lesson": 22,
  "fr": "prolonger",
  "zh": "延長",
  "note": "prolonger la période des congés"
 },
 {
  "id": "L22_les_congés",
  "lesson": 22,
  "fr": "les congés",
  "zh": "（有薪）假期",
  "note": "Je suis en congé.／prendre des congés＝請假"
 },
 {
  "id": "L22_prendre_des_congés",
  "lesson": 22,
  "fr": "prendre des congés",
  "zh": "請假、休假",
  "note": "J'ai 10 jours de congé par an."
 },
 {
  "id": "L22_une_dépense",
  "lesson": 22,
  "fr": "une dépense",
  "zh": "開銷、花費",
  "note": "動詞 dépenser＝花錢"
 },
 {
  "id": "L22_incontournable",
  "lesson": 22,
  "fr": "incontournable",
  "zh": "躲不掉的、必經的",
  "note": "contourner＝繞過 → in-contournable"
 },
 {
  "id": "L22_un_montant_moyen",
  "lesson": 22,
  "fr": "un montant moyen",
  "zh": "平均金額",
  "note": "montant ≒ prix；moyen＝平均的"
 },
 {
  "id": "L22_opter_pour",
  "lesson": 22,
  "fr": "opter pour",
  "zh": "選擇",
  "note": "＝choisir，比較正式"
 },
 {
  "id": "L22_un_globe_trotteur",
  "lesson": 22,
  "fr": "un globe-trotteur",
  "zh": "環球旅人"
 },
 {
  "id": "L22_les_espadrilles",
  "lesson": 22,
  "fr": "les espadrilles",
  "zh": "草編鞋",
  "note": "巴斯克地區的特產"
 },
 {
  "id": "L22_les_épices",
  "lesson": 22,
  "fr": "les épices",
  "zh": "香料",
  "note": "une épice（陰性）"
 },
 {
  "id": "L22_la_marinière",
  "lesson": 22,
  "fr": "la marinière",
  "zh": "（法式）橫條衫",
  "note": "來自 le marin（水手）"
 },
 {
  "id": "L22_un_produit_local",
  "lesson": 22,
  "fr": "un produit local",
  "zh": "在地產品"
 },
 {
  "id": "L22_en_forme_de",
  "lesson": 22,
  "fr": "en forme de",
  "zh": "…造型的",
  "note": "un magnet en forme de Statue de la Liberté"
 },
 {
  "id": "L22_parler_de_la_pluie_et_du",
  "lesson": 22,
  "fr": "parler de la pluie et du beau temps",
  "zh": "閒聊、聊無關緊要的事",
  "note": "⭐ 超實用慣用語，字面是「聊雨和好天氣」"
 },
 {
  "id": "L22_hexagonal_e_",
  "lesson": 22,
  "fr": "hexagonal(e)",
  "zh": "法國（本土）的",
  "note": "因為法國本土形狀像六邊形（l'Hexagone）"
 },
 {
  "id": "L22_le_Pays_basque",
  "lesson": 22,
  "fr": "le Pays basque",
  "zh": "巴斯克地區",
  "note": "橫跨法西邊界，不是國家；有自己的語言與旗幟"
 },
 {
  "id": "L22_un_restaurant_gastronomi",
  "lesson": 22,
  "fr": "un restaurant gastronomique / étoilé",
  "zh": "米其林星級餐廳",
  "note": "étoile＝星星 → étoilé＝有星星的"
 },
 {
  "id": "L22_un_ciel_étoilé",
  "lesson": 22,
  "fr": "un ciel étoilé",
  "zh": "滿天星斗的夜空",
  "note": "同一個 étoilé 用在天空"
 },
 {
  "id": "L22_l_armée_de_terre_l_arm",
  "lesson": 22,
  "fr": "l'armée de terre / l'armée de l'air / la marine",
  "zh": "陸軍／空軍／海軍",
  "note": "老師的妹妹是 météorologue dans la marine"
 },
 {
  "id": "L22_ravi_e_de_te_rencontrer",
  "lesson": 22,
  "fr": "ravi(e) de te rencontrer",
  "zh": "很高興認識你",
  "note": "＝Enchanté；ravi＝非常開心"
 },
 {
  "id": "L22_Il_bise_",
  "lesson": 22,
  "fr": "Il bise !",
  "zh": "好冷！（比利時說法）",
  "note": "bise＝寒風"
 },
 {
  "id": "L22_Il_neigeote_",
  "lesson": 22,
  "fr": "Il neigeote !",
  "zh": "下小雪（瑞士、加拿大說法）",
  "note": "⚠️ 法國本土不這樣說，因為雪下得少"
 },
 {
  "id": "L22_Rentre_le_chien_il_va_a",
  "lesson": 22,
  "fr": "Rentre le chien, il va avoir peur.",
  "zh": "把狗帶進來，牠會害怕。",
  "note": "rentrer 這裡是及物「把…帶進來」"
 },
 {
  "id": "L23_un_toit",
  "lesson": 23,
  "fr": "un toit",
  "zh": "屋頂 → 引申「住的地方」",
  "note": "課文標題 comment trouver un toit＝怎麼找到住的地方"
 },
 {
  "id": "L23_l_immeuble",
  "lesson": 23,
  "fr": "l'immeuble",
  "zh": "大樓（整棟）",
  "note": "⚠️ 跟 appartement 差在整棟 vs 一戶：un appartement dans un immeuble"
 },
 {
  "id": "L23_le_studio",
  "lesson": 23,
  "fr": "le studio",
  "zh": "套房（一房到底）",
  "note": "床、廚房全在同一個空間，沒有隔間"
 },
 {
  "id": "L23_le_T1_le_T2",
  "lesson": 23,
  "fr": "le T1 / le T2",
  "zh": "一房／兩房",
  "note": "T＝type、F＝famille；⚠️ 數字不含廚房與衛浴"
 },
 {
  "id": "L23_un_T2_un_séjour_une_",
  "lesson": 23,
  "fr": "un T2 = un séjour + une chambre",
  "zh": "一個客廳＋一個房間",
  "note": "法文數 pièces 不算廚房、不算衛浴——那兩個每間都有"
 },
 {
  "id": "L23_la_résidence_universitai",
  "lesson": 23,
  "fr": "la résidence universitaire",
  "zh": "大學宿舍",
  "note": "課文：法國只有 12% 學生住這裡"
 },
 {
  "id": "L23_le_foyer",
  "lesson": 23,
  "fr": "le foyer",
  "zh": "青年公寓；收容之家",
  "note": "foyer de jeunes travailleurs 收 16–30 歲"
 },
 {
  "id": "L23_Loue_appartement_deux_pi",
  "lesson": 23,
  "fr": "Loue appartement deux pièces.",
  "zh": "出租兩房公寓。",
  "note": "課本廣告原句；裡面其實還有 cuisine、salle de bain、balcon"
 },
 {
  "id": "L23_la_pièce",
  "lesson": 23,
  "fr": "la pièce",
  "zh": "房間（計數單位）",
  "note": "算「幾房」用它：une grande pièce principale"
 },
 {
  "id": "L23_la_salle_d_eau",
  "lesson": 23,
  "fr": "la salle d'eau",
  "zh": "浴室（＝la salle de bain）",
  "note": "兩個字同義，salle de bain 更常用；老師記法：最需要水的那間"
 },
 {
  "id": "L23_une_cuisine_américaine",
  "lesson": 23,
  "fr": "une cuisine américaine",
  "zh": "開放式廚房",
  "note": "對著客廳或飯廳的那種"
 },
 {
  "id": "L23_un_coin_bureau",
  "lesson": 23,
  "fr": "un coin bureau",
  "zh": "書桌角落",
  "note": "coin＝角落"
 },
 {
  "id": "L23_la_véranda",
  "lesson": 23,
  "fr": "la véranda",
  "zh": "玻璃陽光房",
  "note": "在裡面又像在外面，通常有屋頂但看得到外面"
 },
 {
  "id": "L23_la_buanderie",
  "lesson": 23,
  "fr": "la buanderie",
  "zh": "洗衣間",
  "note": "放洗衣機、晾衣服的房間"
 },
 {
  "id": "L23_le_rez_de_chaussée",
  "lesson": 23,
  "fr": "le rez-de-chaussée",
  "zh": "一樓（地面層）",
  "note": "⚠️ 電梯按鈕寫 RDC；chaussée＝路面 → 貼著路面那層"
 },
 {
  "id": "L23_l_étage",
  "lesson": 23,
  "fr": "l'étage",
  "zh": "樓層（樓上）",
  "note": "⚠️ 法文 premier étage＝台灣二樓；au quatrième étage＝台灣五樓"
 },
 {
  "id": "L23_la_cave_le_sous_sol",
  "lesson": 23,
  "fr": "la cave / le sous-sol",
  "zh": "地下室",
  "note": "sol＝地面，sous-sol＝地面之下；電梯上寫 SS1、SS2"
 },
 {
  "id": "L23_le_garage",
  "lesson": 23,
  "fr": "le garage",
  "zh": "車庫",
  "note": "動詞 garer＝停車；⚠️ 有牆有門才叫 garage，露天的叫 un parking"
 },
 {
  "id": "L23_sans_ascenseur",
  "lesson": 23,
  "fr": "sans ascenseur",
  "zh": "沒有電梯",
  "note": "租屋廣告常見，代表要爬樓梯"
 },
 {
  "id": "L23_une_annonce",
  "lesson": 23,
  "fr": "une annonce",
  "zh": "啟事、廣告",
  "note": "任何張貼給人看的都算：annonce de travail（徵人）／annonce de location（招租）"
 },
 {
  "id": "L23_ancien_ne_neuf_neuve",
  "lesson": 23,
  "fr": "ancien(ne) ≠ neuf, neuve",
  "zh": "老舊的 ≠ 全新的",
  "note": "租屋廣告的固定對照組"
 },
 {
  "id": "L23_calme_bruyant_e_",
  "lesson": 23,
  "fr": "calme ≠ bruyant(e)",
  "zh": "安靜的 ≠ 吵的",
  "note": "bruit＝噪音 → bruyant"
 },
 {
  "id": "L23_clair_e_sombre",
  "lesson": 23,
  "fr": "clair(e) ≠ sombre",
  "zh": "明亮的 ≠ 昏暗的",
  "note": "講空間用這組：un studio très clair"
 },
 {
  "id": "L23_clair_foncé",
  "lesson": 23,
  "fr": "clair ≠ foncé",
  "zh": "淺 ≠ 深",
  "note": "講顏色用這組：vert clair（淺綠）／vert foncé（深綠）"
 },
 {
  "id": "L23_l_ombre",
  "lesson": 23,
  "fr": "l'ombre",
  "zh": "影子",
  "note": "mon ombre＝我的影子；sombre 就是「被 ombre 蓋滿」＝暗"
 },
 {
  "id": "L23_disponible",
  "lesson": 23,
  "fr": "disponible",
  "zh": "可入住的、有空的",
  "note": "⚠️ 不是 gratuit（免費）！是英文的 available"
 },
 {
  "id": "L23_équipé_e_",
  "lesson": 23,
  "fr": "équipé(e)",
  "zh": "配備齊全的",
  "note": "une cuisine équipée＝廚房家電都有"
 },
 {
  "id": "L23_meublé_e_",
  "lesson": 23,
  "fr": "meublé(e)",
  "zh": "附家具的",
  "note": "⚠️ 來自 un meuble（家具）"
 },
 {
  "id": "L23_rénové_e_",
  "lesson": 23,
  "fr": "rénové(e)",
  "zh": "翻新的",
  "note": "本來就是住的地方，只是舊了 → 弄新。Magnifique T2 rénové"
 },
 {
  "id": "L23_aménagé_e_",
  "lesson": 23,
  "fr": "aménagé(e)",
  "zh": "改建成可住的",
  "note": "本來不是住的地方（閣樓、農舍）→ 改成能住。同字根：déménager 搬走／le ménage 打掃"
 },
 {
  "id": "L23_la_superficie",
  "lesson": 23,
  "fr": "la superficie",
  "zh": "面積",
  "note": "單位是 le mètre carré (m²)；台灣一坪約 3–4 平方公尺"
 },
 {
  "id": "L23_bon_marché_pas_cher",
  "lesson": 23,
  "fr": "bon marché / pas cher",
  "zh": "便宜的",
  "note": "⚠️ 法文沒有單一個字對應英文 cheap"
 },
 {
  "id": "L23_neuf_nouveau",
  "lesson": 23,
  "fr": "neuf ≠ nouveau",
  "zh": "全新的（沒人用過）≠ 新的（對我而言是新的）",
  "note": "Cette maison neuve（從沒人住過）／le nouvel iPhone（新款，不代表沒人用過）"
 },
 {
  "id": "L23_le_loyer",
  "lesson": 23,
  "fr": "le loyer",
  "zh": "房租",
  "note": "⚠️ 同字根：louer（租）／location（租的房子）／locataire（房客）"
 },
 {
  "id": "L23_les_charges",
  "lesson": 23,
  "fr": "les charges",
  "zh": "管理費（水電網等雜費）",
  "note": "⚠️ charges comprises＝含雜費，租屋廣告必看的一句"
 },
 {
  "id": "L23_les_frais",
  "lesson": 23,
  "fr": "les frais",
  "zh": "費用",
  "note": "⚠️ 一字兩義：frais 當形容詞是「新鮮的」（les fruits frais）"
 },
 {
  "id": "L23_l_abonnement_à_Internet",
  "lesson": 23,
  "fr": "l'abonnement à Internet",
  "zh": "網路月租",
  "note": "abonnement＝訂閱、月租"
 },
 {
  "id": "L23_l_assurance",
  "lesson": 23,
  "fr": "l'assurance",
  "zh": "保險",
  "note": "法國租屋強制要保"
 },
 {
  "id": "L23_le_chauffage",
  "lesson": 23,
  "fr": "le chauffage",
  "zh": "暖氣",
  "note": "⚠️ 來自 chaud（熱）／chauffer（加熱）"
 },
 {
  "id": "L23_un_ménage",
  "lesson": 23,
  "fr": "un ménage",
  "zh": "一戶人家",
  "note": "⚠️ 同一個字：faire le ménage＝打掃（第10課）；un ménage＝一戶人家"
 },
 {
  "id": "L23_580_par_mois_charges_c",
  "lesson": 23,
  "fr": "580 € par mois charges comprises.",
  "zh": "每月 580 歐，含水電網等雜費。",
  "note": "comprendre 除了「理解」還有「包含」"
 },
 {
  "id": "L23_le_la_propriétaire",
  "lesson": 23,
  "fr": "le / la propriétaire",
  "zh": "房東（產權人）",
  "note": "propriété＝財產"
 },
 {
  "id": "L23_le_la_locataire",
  "lesson": 23,
  "fr": "le / la locataire",
  "zh": "房客",
  "note": "⚠️ location 是「租的那個房子」，locataire 是「租的那個人」"
 },
 {
  "id": "L23_la_colocation",
  "lesson": 23,
  "fr": "la colocation",
  "zh": "合租",
  "note": "大家一起租同一戶，每個人付自己那份，地位平等"
 },
 {
  "id": "L23_le_la_colocataire",
  "lesson": 23,
  "fr": "le / la colocataire",
  "zh": "室友",
  "note": "課文：可能是朋友，也可能是完全不認識的人"
 },
 {
  "id": "L23_la_cohabitation_intergén",
  "lesson": 23,
  "fr": "la cohabitation intergénérationnelle",
  "zh": "（跨世代）同住",
  "note": "⚠️ 你住進別人的家；inter＝之間、génération＝世代"
 },
 {
  "id": "L23_vivre_seul_e_en_coupl",
  "lesson": 23,
  "fr": "vivre seul(e) / en couple / en colocation",
  "zh": "獨居／跟伴侶住／合租",
  "note": "課文開頭的三種統計分類"
 },
 {
  "id": "L23_une_chambre_gratuite_ou_",
  "lesson": 23,
  "fr": "une chambre gratuite ou à faible loyer",
  "zh": "免費或低租金的房間",
  "note": "⚠️ faible 本義是「虛弱」，這裡是「低」"
 },
 {
  "id": "L23_J_habite_dans_une_maison",
  "lesson": 23,
  "fr": "J'habite dans une maison qui est grande.",
  "zh": "我住在一間很大的房子。",
  "note": "qui 代替主詞，後面直接接動詞（= La maison est grande.）"
 },
 {
  "id": "L23_Je_vis_dans_une_maison_q",
  "lesson": 23,
  "fr": "Je vis dans une maison que j'aime beaucoup.",
  "zh": "我住在一間我很喜歡的房子。",
  "note": "que 代替直接受詞，後面先出現新主詞（= J'aime beaucoup la maison.）"
 },
 {
  "id": "L23_Je_loue_la_maison_où_j_h",
  "lesson": 23,
  "fr": "Je loue la maison où j'habite.",
  "zh": "我租我住的那間房子。",
  "note": "où 代替地點補語"
 },
 {
  "id": "L23_qu_il_qu_elle_qu_on",
  "lesson": 23,
  "fr": "qu'il / qu'elle / qu'on",
  "zh": "que 在母音前的縮寫",
  "note": "⚠️ qui 永遠不縮寫；唸起來 qu'il [kil] vs qui [ki]"
 },
 {
  "id": "L23_le_jour_où_nous_nous_som",
  "lesson": 23,
  "fr": "le jour où nous nous sommes rencontrés",
  "zh": "我們相遇的那一天",
  "note": "où 也可以接時間；⚠️ quand 不是關係代名詞"
 },
 {
  "id": "L23_des_offres_qui_mettent_e",
  "lesson": 23,
  "fr": "des offres qui mettent en contact propriétaires et futurs locataires",
  "zh": "把房東和未來房客牽上線的訊息",
  "note": "qui 後面直接是動詞 mettent"
 },
 {
  "id": "L23_des_personnes_que_vous_n",
  "lesson": 23,
  "fr": "des personnes que vous ne connaissez pas",
  "zh": "你不認識的那些人",
  "note": "que 後面先出現主詞 vous"
 },
 {
  "id": "L23_Je_loue_un_studio_qui_es",
  "lesson": 23,
  "fr": "Je loue un studio qui est dans une ferme.",
  "zh": "我租一間在農場裡的套房。",
  "note": "後面是動詞 est → qui"
 },
 {
  "id": "L23_Le_salon_est_la_pièce_qu",
  "lesson": 23,
  "fr": "Le salon est la pièce que je préfère.",
  "zh": "客廳是我最喜歡的房間。",
  "note": "⚠️ 是 que 不是 où：英文是 which I prefer，不是 where I prefer"
 },
 {
  "id": "L23_Les_résidences_universit",
  "lesson": 23,
  "fr": "Les résidences universitaires sont des lieux où on trouve beaucoup d'étudiants.",
  "zh": "大學宿舍是能找到很多學生的地方。",
  "note": "lieux＝地點 → où"
 },
 {
  "id": "L23_Les_colocataires_sont_de",
  "lesson": 23,
  "fr": "Les colocataires sont des personnes qui partagent un appartement.",
  "zh": "室友是分租同一間公寓的人。",
  "note": "後面是動詞 partagent → qui"
 },
 {
  "id": "L23_Voici_la_chambre_où_je_d",
  "lesson": 23,
  "fr": "Voici la chambre où je dors.",
  "zh": "這就是我睡的房間。",
  "note": "拆回兩句：Je dors dans la chambre → 介詞＋地點 → où"
 },
 {
  "id": "L23_Il_vit_dans_un_foyer_qu_",
  "lesson": 23,
  "fr": "Il vit dans un foyer qu'il aime beaucoup.",
  "zh": "他住在一間他很喜歡的青年公寓。",
  "note": "que + il → qu'il（縮寫）"
 },
 {
  "id": "L23_Mon_propriétaire_est_un_",
  "lesson": 23,
  "fr": "Mon propriétaire est un homme que j'aime beaucoup.",
  "zh": "我房東是個我很喜歡的人。",
  "note": "J'aime beaucoup mon propriétaire → 受詞 → que"
 },
 {
  "id": "L23_Ma_s_ur_vit_dans_un_stud",
  "lesson": 23,
  "fr": "Ma sœur vit dans un studio que mes parents ont acheté l'année dernière.",
  "zh": "我姊住在一間我爸媽去年買的套房。",
  "note": "⚠️ 買的是那間房（受詞）→ que，不是 où"
 },
 {
  "id": "L23_un_bel_immeuble_ancien",
  "lesson": 23,
  "fr": "un bel immeuble ancien",
  "zh": "一棟漂亮的老大樓",
  "note": "母音前 beau → bel；發音跟 belle 一樣，拼字是陽性"
 },
 {
  "id": "L23_le_nouvel_iPhone",
  "lesson": 23,
  "fr": "le nouvel iPhone",
  "zh": "新款 iPhone",
  "note": "母音前 nouveau → nouvel"
 },
 {
  "id": "L23_un_vieil_appartement",
  "lesson": 23,
  "fr": "un vieil appartement",
  "zh": "一間老公寓",
  "note": "母音前 vieux → vieil"
 },
 {
  "id": "L23_des_bons_plans",
  "lesson": 23,
  "fr": "des bons plans",
  "zh": "好門路、優惠情報",
  "note": "課文：找便宜租屋的門路"
 },
 {
  "id": "L23_mettre_en_contact",
  "lesson": 23,
  "fr": "mettre en contact",
  "zh": "牽線、讓雙方接上頭",
  "note": "des offres qui mettent en contact propriétaires et locataires"
 },
 {
  "id": "L23_à_l_extérieur_de_la_vill",
  "lesson": 23,
  "fr": "à l'extérieur de la ville",
  "zh": "在市區外面",
  "note": "課文：往市區外面找比較便宜"
 },
 {
  "id": "L23_en_échange_de",
  "lesson": 23,
  "fr": "en échange de",
  "zh": "作為交換",
  "note": "en échange de votre présence＝交換條件是你人在那裡"
 },
 {
  "id": "L23_le_courrier",
  "lesson": 23,
  "fr": "le courrier",
  "zh": "信件（實體的）",
  "note": "s'occuper du courrier＝處理信件"
 },
 {
  "id": "L23_s_occuper_de",
  "lesson": 23,
  "fr": "s'occuper de",
  "zh": "處理、照顧",
  "note": "s'occuper des plantes＝照顧植物"
 },
 {
  "id": "L23_Studio_de_33_m_à_louer_",
  "lesson": 23,
  "fr": "Studio de 33 m² à louer dans un quartier calme.",
  "zh": "33 平方公尺套房出租，位於安靜的社區。",
  "note": "廣告 ⓐ"
 },
 {
  "id": "L23_Aménagé_dans_un_ancien_g",
  "lesson": 23,
  "fr": "Aménagé dans un ancien grenier, au quatrième étage sans ascenseur.",
  "zh": "由舊閣樓改建，位於（法式）四樓、沒有電梯。",
  "note": "廣告 ⓐ；quatrième étage＝台灣五樓"
 },
 {
  "id": "L23_Il_comprend_une_chambre_",
  "lesson": 23,
  "fr": "Il comprend une chambre avec un coin bureau, un séjour et un balcon.",
  "zh": "它包含一間附書桌角的臥室、一個客廳和一個陽台。",
  "note": "⚠️ comprendre 這裡是「包含」不是「理解」"
 },
 {
  "id": "L23_Située_à_proximité_du_po",
  "lesson": 23,
  "fr": "Située à proximité du port, cette maison neuve propose 18 chambres meublées.",
  "zh": "位於港口附近，這棟全新的房子提供 18 間附家具的房間。",
  "note": "à proximité de＝在…附近"
 },
 {
  "id": "L23_les_espaces_communs",
  "lesson": 23,
  "fr": "les espaces communs",
  "zh": "公共空間",
  "note": "coliving 的公共廚房、客廳、花園"
 },
 {
  "id": "L23_Ça_se_passe_bien_Ça_s",
  "lesson": 23,
  "fr": "Ça se passe bien. / Ça se passe mal.",
  "zh": "（事情）進行得順利／很糟。",
  "note": "🎙課文也用了 une colocation qui se passe bien"
 },
 {
  "id": "L23_Aujourd_hui_ça_va_mieux",
  "lesson": 23,
  "fr": "Aujourd'hui, ça va mieux.",
  "zh": "今天好一點了。",
  "note": "🎙mieux＝比較好（bien 的比較級）"
 },
 {
  "id": "L23_Est_ce_que_tu_trouves_qu",
  "lesson": 23,
  "fr": "Est-ce que tu trouves que ta maison est confortable ?",
  "zh": "你覺得你家舒適嗎？",
  "note": "🎙trouver que＝覺得（比 penser que 更口語）"
 },
 {
  "id": "L23_Je_viens_de_lire_cette_a",
  "lesson": 23,
  "fr": "Je viens de lire cette annonce.",
  "zh": "我剛讀了這則廣告。",
  "note": "🎙venir de＋原形＝剛剛做完（第20課 passé récent）"
 },
 {
  "id": "L23_Je_ne_les_connaissais_pa",
  "lesson": 23,
  "fr": "Je ne les connaissais pas, mais ils sont devenus des amis.",
  "zh": "我本來不認識他們，但後來變成朋友了。",
  "note": "🎙devenir 用 être 當助動詞（跟 venir 同家族），分詞跟主詞一致：ils sont devenu<b>s</b>。⚠️ 老師課堂原話是「c'est devenu des amis」——口語裡 c'est 接複數極常見，但那是口語中和，寫出來會被改。依來源優先序（標準法文＞課本＞逐字稿）採標準式。"
 },
 {
  "id": "L23_C_est_le_seul_problème_",
  "lesson": 23,
  "fr": "C'est le seul problème.",
  "zh": "那是唯一的問題。",
  "note": "🎙seul＝唯一的（放名詞前）"
 },
 {
  "id": "L23_Tu_es_l_étudiant_que_je_",
  "lesson": 23,
  "fr": "Tu es l'étudiant que je préfère.",
  "zh": "你是我最喜歡的學生。",
  "note": "🎙老師示範 que 的日常用法，說法國人一天講很多次"
 },
 {
  "id": "L23_Ça_c_est_l_endroit_où_j",
  "lesson": 23,
  "fr": "Ça, c'est l'endroit où j'habite.",
  "zh": "這就是我住的地方。",
  "note": "🎙endroit＝地方（跟 lieu 同義，更口語）"
 },
 {
  "id": "L23_On_n_a_pas_besoin_d_appr",
  "lesson": 23,
  "fr": "On n'a pas besoin d'apprendre ça, on va juste lire.",
  "zh": "這個不用背，我們只要讀過去就好。",
  "note": "🎙老師篩選重點時的固定說法"
 },
 {
  "id": "L24_une_épreuve",
  "lesson": 24,
  "fr": "une épreuve",
  "zh": "一場考試、一個測驗項目",
  "note": "⚠️ 不是「經驗」（那是 expérience）。DELF 有四場 épreuves"
 },
 {
  "id": "L24_la_compréhension_écrite",
  "lesson": 24,
  "fr": "la compréhension écrite",
  "zh": "閱讀理解",
  "note": "compréhension＝理解／production＝產出；écrite＝書面／orale＝口語"
 },
 {
  "id": "L24_la_production_orale",
  "lesson": 24,
  "fr": "la production orale",
  "zh": "口說產出",
  "note": "四場考試之一"
 },
 {
  "id": "L24_Lisez_d_abord_les_questi",
  "lesson": 24,
  "fr": "Lisez d'abord les questions.",
  "zh": "先讀題目。",
  "note": "⭐⭐⭐ 老師的第一鐵律：先看題目才知道要去文件哪裡找"
 },
 {
  "id": "L24_Entourez_tous_les_chiffr",
  "lesson": 24,
  "fr": "Entourez tous les chiffres.",
  "zh": "把所有數字圈起來。",
  "note": "找資訊題全靠數字：heure／âge／tarif／date"
 },
 {
  "id": "L24_Repérez_les_mots_clés_",
  "lesson": 24,
  "fr": "Repérez les mots-clés.",
  "zh": "找出關鍵字。",
  "note": "每份文件只抓三個：什麼活動／什麼時候／叫什麼名字"
 },
 {
  "id": "L24_Essayez_de_comprendre_gr",
  "lesson": 24,
  "fr": "Essayez de comprendre grâce aux autres mots.",
  "zh": "試著靠其他字去理解。",
  "note": "課本原句前半：Si vous ne connaissez pas un mot, ne vous inquiétez pas"
 },
 {
  "id": "L24_grâce_à",
  "lesson": 24,
  "fr": "grâce à",
  "zh": "多虧了、靠著",
  "note": "grâce aux autres mots＝靠旁邊的字"
 },
 {
  "id": "L24_Éliminez_ce_qui_est_sûre",
  "lesson": 24,
  "fr": "Éliminez ce qui est sûrement faux.",
  "zh": "先把確定不是的刪掉。",
  "note": "配對題文件數跟人數不一樣，一定有用不到的 → 刪去法"
 },
 {
  "id": "L24_Faire_des_associations_e",
  "lesson": 24,
  "fr": "Faire des associations entre les documents.",
  "zh": "在不同文件之間建立連結。",
  "note": "課本 PRÊT POUR L'EXAMEN：配對是比較出來的，不是一份一份獨立判斷"
 },
 {
  "id": "L24_entourer",
  "lesson": 24,
  "fr": "entourer",
  "zh": "圈起來",
  "note": "⚠️ 來自 tour（圈、繞一圈）→ 畫一圈把它圍住"
 },
 {
  "id": "L24_repérer",
  "lesson": 24,
  "fr": "repérer",
  "zh": "找出、定位",
  "note": "⚠️ 不是 réparer（修理）。在一堆東西裡把它認出來"
 },
 {
  "id": "L24_associer_A_à_B",
  "lesson": 24,
  "fr": "associer A à B",
  "zh": "把 A 跟 B 配對",
  "note": "配對題的固定指令：Associez chaque document à la personne correspondante"
 },
 {
  "id": "L24_cocher",
  "lesson": 24,
  "fr": "cocher",
  "zh": "打勾",
  "note": "新版 DELF A2 閱讀全部是打勾的選擇題"
 },
 {
  "id": "L24_Complétez_le_tableau_",
  "lesson": 24,
  "fr": "Complétez le tableau.",
  "zh": "請填表。",
  "note": "le tableau＝表格（也是「畫作」「黑板」）"
 },
 {
  "id": "L24_Observez_les_documents_",
  "lesson": 24,
  "fr": "Observez les documents.",
  "zh": "請看這些文件。",
  "note": "用在圖表、時刻表這種要用看的文件"
 },
 {
  "id": "L24_s_entraîner",
  "lesson": 24,
  "fr": "s'entraîner",
  "zh": "訓練、操練",
  "note": "課本章名。同字根 un entraîneur＝教練"
 },
 {
  "id": "L24_se_préparer",
  "lesson": 24,
  "fr": "se préparer",
  "zh": "準備",
  "note": "⚠️ 跟 s'entraîner 分工：préparer 是學方法，entraîner 是實際下去練"
 },
 {
  "id": "L24_treize_heures_quarante_c",
  "lesson": 24,
  "fr": "treize heures quarante-cinq",
  "zh": "13:45（官方說法）",
  "note": "考卷、電視表、車票用這套：24 小時制直接唸數字"
 },
 {
  "id": "L24_deux_heures_moins_le_qua",
  "lesson": 24,
  "fr": "deux heures moins le quart",
  "zh": "差一刻兩點（＝13:45）",
  "note": "⚠️ le quart＝15分鐘。口語版說法"
 },
 {
  "id": "L24_une_heure_et_demie",
  "lesson": 24,
  "fr": "une heure et demie",
  "zh": "一點半",
  "note": "⚠️⚠️ 老師：到半點就不能用 moins，一律 et demie"
 },
 {
  "id": "L24_deux_heures_et_quart",
  "lesson": 24,
  "fr": "deux heures et quart",
  "zh": "兩點十五分",
  "note": "過半之前用 et（et quart／et demie），過半之後才改 moins"
 },
 {
  "id": "L24_à_partir_de",
  "lesson": 24,
  "fr": "à partir de",
  "zh": "從…起（起跳）",
  "note": "⚠️ à partir de 8 ans＝8 歲以上；à partir de 899 €＝899 歐起"
 },
 {
  "id": "L24_par_an_par_mois_par_",
  "lesson": 24,
  "fr": "par an / par mois / par trimestre",
  "zh": "每年／每月／每季",
  "note": "⭐ 比價前一定要換成同一個單位"
 },
 {
  "id": "L24_un_trimestre",
  "lesson": 24,
  "fr": "un trimestre",
  "zh": "一季（三個月）",
  "note": "tri-＝三 → 一年四個。⚠️ 但法國的學校一年只跑三個 trimestre"
 },
 {
  "id": "L24_un_semestre",
  "lesson": 24,
  "fr": "un semestre",
  "zh": "一學期（半年）",
  "note": "semi-＝半 → 一年兩個。台灣的學校是這種"
 },
 {
  "id": "L24_le_moins_cher",
  "lesson": 24,
  "fr": "le moins cher",
  "zh": "最便宜的",
  "note": "⭐ 廣告題必考：Quel est le séjour le moins cher ?"
 },
 {
  "id": "L24_tout_compris",
  "lesson": 24,
  "fr": "tout compris",
  "zh": "全部包含",
  "note": "跟第23課的 charges comprises 同一個 comprendre＝包含"
 },
 {
  "id": "L24_hors_transport",
  "lesson": 24,
  "fr": "hors transport",
  "zh": "不含交通",
  "note": "⚠️ hors＝在…之外。跟 tout compris 相反"
 },
 {
  "id": "L24_cent_quatre_vingts",
  "lesson": 24,
  "fr": "cent quatre-vingts",
  "zh": "180",
  "note": "⚠️ 100 是 cent，<b>不說 un cent</b>（mille 也一樣不加 un）"
 },
 {
  "id": "L24_la_chaîne",
  "lesson": 24,
  "fr": "la chaîne",
  "zh": "頻道",
  "note": "⚠️ 也是「鏈子」。Quelle chaîne propose… ?＝哪一台有…"
 },
 {
  "id": "L24_un_téléfilm",
  "lesson": 24,
  "fr": "un téléfilm",
  "zh": "電視電影",
  "note": "為電視拍的單集電影，跟 série（影集）不同"
 },
 {
  "id": "L24_un_magazine_littéraire",
  "lesson": 24,
  "fr": "un magazine littéraire",
  "zh": "文學節目",
  "note": "⚠️ magazine 在節目表裡是「專題節目」不是雜誌"
 },
 {
  "id": "L24_proposer",
  "lesson": 24,
  "fr": "proposer",
  "zh": "提供（讓人選）",
  "note": "⭐ 把選項擺出來讓對方挑，跟英文 propose 一樣"
 },
 {
  "id": "L24_la_patinoire",
  "lesson": 24,
  "fr": "la patinoire",
  "zh": "溜冰場",
  "note": "⚠️ 今天答錯的那題。patin（冰刀）→ patiner → patinoire"
 },
 {
  "id": "L24_chausser_ses_patins",
  "lesson": 24,
  "fr": "chausser ses patins",
  "zh": "穿上冰刀鞋",
  "note": "chausser＝穿（鞋）；la chaussure＝鞋子"
 },
 {
  "id": "L24_glisser",
  "lesson": 24,
  "fr": "glisser",
  "zh": "滑",
  "note": "⭐ 判斷「冬季運動 les sports d'hiver」的關鍵字"
 },
 {
  "id": "L24_les_sports_d_hiver",
  "lesson": 24,
  "fr": "les sports d'hiver",
  "zh": "冬季運動",
  "note": "⭐ 配對題的分類詞"
 },
 {
  "id": "L24_l_escalade",
  "lesson": 24,
  "fr": "l'escalade",
  "zh": "攀岩",
  "note": "⭐ 對應「grimper（爬）」——配對題就是找對得上的那個字"
 },
 {
  "id": "L24_grimper",
  "lesson": 24,
  "fr": "grimper",
  "zh": "攀爬",
  "note": "Peter adore la montagne et grimper → 對上 escalade"
 },
 {
  "id": "L24_sans_corde_une_paroi_",
  "lesson": 24,
  "fr": "sans corde / une paroi / un tapis",
  "zh": "不用繩子／岩壁／墊子",
  "note": "三個字湊起來就知道是室內抱石攀岩"
 },
 {
  "id": "L24_la_randonnée",
  "lesson": 24,
  "fr": "la randonnée",
  "zh": "健行",
  "note": "可以在山上也可以在鄉間：randonnée dans la campagne"
 },
 {
  "id": "L24_le_vélodrome",
  "lesson": 24,
  "fr": "le vélodrome",
  "zh": "自行車場",
  "note": "-drome＝場地（跟 aérodrome 同構）"
 },
 {
  "id": "L24_se_déplacer_à_vélo",
  "lesson": 24,
  "fr": "se déplacer à vélo",
  "zh": "騎腳踏車移動",
  "note": "Manuel se déplace toujours à vélo＝他到哪都騎車"
 },
 {
  "id": "L24_foncer",
  "lesson": 24,
  "fr": "foncer",
  "zh": "衝、飆",
  "note": "Foncez au vélodrome !＝衝去自行車場吧！"
 },
 {
  "id": "L24_les_sensations_fortes",
  "lesson": 24,
  "fr": "les sensations fortes",
  "zh": "強烈刺激",
  "note": "⭐ 廣告在講刺激型運動的固定說法"
 },
 {
  "id": "L24_nager_en_extérieur",
  "lesson": 24,
  "fr": "nager en extérieur",
  "zh": "在戶外游泳",
  "note": "⭐ 對應 rivières et lacs（野泳），不是泳池"
 },
 {
  "id": "L24_les_sports_automobiles",
  "lesson": 24,
  "fr": "les sports automobiles",
  "zh": "賽車運動",
  "note": "automobile＝汽車（moto 才是機車）"
 },
 {
  "id": "L24_accueillir",
  "lesson": 24,
  "fr": "accueillir",
  "zh": "容納、接待",
  "note": "⭐ peut accueillir plus de 20 personnes＝人數多的關鍵字。同字根 l'accueil＝櫃台"
 },
 {
  "id": "L24_une_cuisine_régionale",
  "lesson": 24,
  "fr": "une cuisine régionale",
  "zh": "地方菜",
  "note": "對照 des plats étrangers（外國菜）"
 },
 {
  "id": "L24_des_plats_étrangers",
  "lesson": 24,
  "fr": "des plats étrangers",
  "zh": "外國菜",
  "note": "跟 du monde entier（全世界的）指同一件事"
 },
 {
  "id": "L24_le_monde_entier",
  "lesson": 24,
  "fr": "le monde entier",
  "zh": "全世界",
  "note": "⚠️ 別跟 tout le monde（大家、每個人）搞混"
 },
 {
  "id": "L24_à_base_de_viande",
  "lesson": 24,
  "fr": "à base de viande",
  "zh": "以肉為基底的",
  "note": "⭐ 素食者那題的排除線索：看到 viande 直接刪掉"
 },
 {
  "id": "L24_végétarien_ne_",
  "lesson": 24,
  "fr": "végétarien(ne)",
  "zh": "素食的（人）"
 },
 {
  "id": "L24_la_cuisine_méditerranéen",
  "lesson": 24,
  "fr": "la cuisine méditerranéenne",
  "zh": "地中海料理",
  "note": "la Méditerranée＝地中海"
 },
 {
  "id": "L24_assister_à_un_spectacle",
  "lesson": 24,
  "fr": "assister à un spectacle",
  "zh": "觀賞表演",
  "note": "un spectacle de danse＝舞蹈表演"
 },
 {
  "id": "L24_chaleureux_chaleureuse",
  "lesson": 24,
  "fr": "chaleureux / chaleureuse",
  "zh": "熱情的、溫馨的",
  "note": "來自 chaleur（熱，第22課）→ 形容氣氛"
 },
 {
  "id": "L24_en_plein_centre_ville",
  "lesson": 24,
  "fr": "en plein centre-ville",
  "zh": "就在市中心",
  "note": "en plein＝正在…的正中央（en pleine nature＝在大自然裡）"
 },
 {
  "id": "L24_un_lieu_pour_goûter_avec",
  "lesson": 24,
  "fr": "un lieu pour goûter avec ses enfants",
  "zh": "可以帶小孩吃下午茶的地方",
  "note": "⚠️ 這裡的 goûter 是下午茶不是品嘗——判斷靠 avec ses enfants"
 },
 {
  "id": "L24_un_séjour",
  "lesson": 24,
  "fr": "un séjour",
  "zh": "行程、一段停留",
  "note": "⚠️ 同字兩義：第23課的 le séjour 是「客廳」"
 },
 {
  "id": "L24_Départ_possible_du_21_02",
  "lesson": 24,
  "fr": "Départ possible du 21/02 au 13/03.",
  "zh": "可出發日期：2/21～3/13。",
  "note": "⭐ 「你某段時間有空能選哪個」就是在考這一行"
 },
 {
  "id": "L24_les_raquettes_à_neige",
  "lesson": 24,
  "fr": "les raquettes à neige",
  "zh": "雪鞋",
  "note": "raquette 也是球拍——形狀像所以共用一個字"
 },
 {
  "id": "L24_le_ski_de_randonnée_nord",
  "lesson": 24,
  "fr": "le ski de randonnée nordique",
  "zh": "北歐式越野滑雪",
  "note": "⭐ 「想滑雪」那題的唯一線索"
 },
 {
  "id": "L24_les_chiens_de_traîneau",
  "lesson": 24,
  "fr": "les chiens de traîneau",
  "zh": "狗拉雪橇"
 },
 {
  "id": "L24_l_intensité_physique",
  "lesson": 24,
  "fr": "l'intensité physique",
  "zh": "體力強度",
  "note": "廣告用方格數表示"
 },
 {
  "id": "L24_un_film_historique",
  "lesson": 24,
  "fr": "un film historique",
  "zh": "歷史片",
  "note": "其他類型：une comédie（喜劇）、un drame（劇情片）"
 },
 {
  "id": "L24_réalisé_par_",
  "lesson": 24,
  "fr": "réalisé par…",
  "zh": "由…執導",
  "note": "le réalisateur＝導演；Avec… 後面接演員"
 },
 {
  "id": "L24_une_visite_guidée",
  "lesson": 24,
  "fr": "une visite guidée",
  "zh": "導覽參觀",
  "note": "visite guidée en français＝法語導覽"
 },
 {
  "id": "L24_l_inscription_obligatoir",
  "lesson": 24,
  "fr": "l'inscription obligatoire",
  "zh": "必須報名",
  "note": "s'inscrire＝報名；obligatoire＝強制的。à l'accueil＝在櫃台"
 },
 {
  "id": "L24_la_guerre",
  "lesson": 24,
  "fr": "la guerre",
  "zh": "戰爭",
  "note": "⚠️ 今天問過。C'est la guerre.＝那是戰爭時期"
 },
 {
  "id": "L24_un_général_l_armée",
  "lesson": 24,
  "fr": "un général / l'armée",
  "zh": "將軍／軍隊",
  "note": "De Gaulle 是 jeune général"
 },
 {
  "id": "L24_les_coulisses",
  "lesson": 24,
  "fr": "les coulisses",
  "zh": "幕後",
  "note": "vivre les coulisses＝體驗幕後"
 },
 {
  "id": "L24_les_artisans",
  "lesson": 24,
  "fr": "les artisans",
  "zh": "職人、手工業者",
  "note": "Parcours gourmand 那份文件的關鍵字"
 },
 {
  "id": "L24_un_stage_professionnel",
  "lesson": 24,
  "fr": "un stage professionnel",
  "zh": "實習",
  "note": "faire un stage＝去實習；un(e) stagiaire＝實習生"
 },
 {
  "id": "L24_une_exposition",
  "lesson": 24,
  "fr": "une exposition",
  "zh": "展覽",
  "note": "⭐ 選項會寫成 musée（博物館）"
 },
 {
  "id": "L24_Comment_vas_tu_",
  "lesson": 24,
  "fr": "Comment vas-tu ?",
  "zh": "你好嗎？",
  "note": "⭐ 私人信件的開場固定句，另一句是 J'espère que tu vas bien"
 },
 {
  "id": "L24_Bises_Je_t_embrasse",
  "lesson": 24,
  "fr": "Bises / Je t'embrasse",
  "zh": "親親（信末問候）",
  "note": "⭐ 熟人之間的結尾固定句，正式信不能用"
 },
 {
  "id": "L24_Vous_ne_devez_pas_faire_",
  "lesson": 24,
  "fr": "Vous ne devez pas faire d'erreurs.",
  "zh": "你不能出錯。",
  "note": "🎙老師講這場考試的標準：資訊都在紙上，要全對"
 },
 {
  "id": "L24_On_peut_sauter_et_reveni",
  "lesson": 24,
  "fr": "On peut sauter et revenir après.",
  "zh": "可以先跳過，等一下再回來。",
  "note": "🎙卡住時的正確動作——不要停在同一題"
 },
 {
  "id": "L24_Il_faut_continuer_c_est",
  "lesson": 24,
  "fr": "Il faut continuer, c'est normal d'oublier.",
  "zh": "要繼續下去，會忘記是正常的。",
  "note": "🎙學得快就一直有新字進來，忘記不是退步"
 },
 {
  "id": "L24_Je_peux_t_envoyer_ce_liv",
  "lesson": 24,
  "fr": "Je peux t'envoyer ce livre aussi.",
  "zh": "我也可以把這本書寄給你。",
  "note": "🎙envoyer＝寄送"
 },
 {
  "id": "L25_moins_que_aussi_",
  "lesson": 25,
  "fr": "moins ... que / aussi ... que / plus ... que",
  "zh": "比較級三式（配副詞與形容詞）",
  "note": "⭐ 形容詞副詞夾在中間：moins grande que"
 },
 {
  "id": "L25_autant_que",
  "lesson": 25,
  "fr": "autant que",
  "zh": "一樣多（配動詞）",
  "note": "⚠️ 動詞的同等用 autant，不能用 aussi"
 },
 {
  "id": "L25_autant_de_que",
  "lesson": 25,
  "fr": "autant de ... que",
  "zh": "一樣多的…（配名詞）",
  "note": "⚠️ 名詞前一定要加 de。Il y a autant de chambres que…"
 },
 {
  "id": "L25_plus_de_moins_de",
  "lesson": 25,
  "fr": "plus de / moins de",
  "zh": "更多的／更少的（配名詞）",
  "note": "⚠️ 名詞比較都要 de，跟 beaucoup de 同一條規則"
 },
 {
  "id": "L25_meilleur_e_",
  "lesson": 25,
  "fr": "meilleur(e)",
  "zh": "更好的（bon 的優等）",
  "note": "⛔ 不是 plus bon。形容詞，要配合性數"
 },
 {
  "id": "L25_mieux",
  "lesson": 25,
  "fr": "mieux",
  "zh": "更好地（bien 的優等）",
  "note": "⛔ 不是 plus bien。副詞，不變。J'aime mieux ce quartier"
 },
 {
  "id": "L25_pire",
  "lesson": 25,
  "fr": "pire",
  "zh": "更糟的（mauvais / mal 的優等）",
  "note": "也可以說 plus mauvais／plus mal，兩個都通"
 },
 {
  "id": "L25_Tant_pis_",
  "lesson": 25,
  "fr": "Tant pis !",
  "zh": "算了！",
  "note": "⭐ 古比較級 pis 唯一活下來的地方"
 },
 {
  "id": "L25_Je_me_sens_bien_",
  "lesson": 25,
  "fr": "Je me sens bien.",
  "zh": "我感覺很好。",
  "note": "⛔ 不能說 je me sens bon。講感覺一律 bien"
 },
 {
  "id": "L25_J_aime_bien_le_foot_",
  "lesson": 25,
  "fr": "J'aime bien le foot.",
  "zh": "我還蠻喜歡足球的。",
  "note": "⚠️ 加 bien 反而變弱：j'aime bien ＜ j'aime ＜ j'aime beaucoup"
 },
 {
  "id": "L25_Si_je_veux_lire_je_vais",
  "lesson": 25,
  "fr": "Si je veux lire, je vais à la bibliothèque.",
  "zh": "如果我想看書，我就去圖書館。",
  "note": "⭐ si ＋ 現在式 ＋ 現在式（陳述常態）"
 },
 {
  "id": "L25_Si_tu_es_malade_va_à_la",
  "lesson": 25,
  "fr": "Si tu es malade, va à la pharmacie !",
  "zh": "如果你不舒服，就去藥局！",
  "note": "⭐ si ＋ 現在式 ＋ 命令式（語氣更強）"
 },
 {
  "id": "L25_S_il_pleut_on_peut_alle",
  "lesson": 25,
  "fr": "S'il pleut, on peut aller au Centre de la BD.",
  "zh": "如果下雨，我們可以去漫畫中心。",
  "note": "⚠️ si ＋ il → s'il。BD＝bande dessinée＝漫畫"
 },
 {
  "id": "L25_Si_on_part_vivre_sur_une",
  "lesson": 25,
  "fr": "Si on part vivre sur une île déserte…",
  "zh": "如果我們去荒島生活…",
  "note": "⚠️⚠️ si on 不縮寫——只有 il／ils 前面縮"
 },
 {
  "id": "L25_le_canapé_le_sofa_le",
  "lesson": 25,
  "fr": "le canapé = le sofa = le divan",
  "zh": "沙發",
  "note": "⭐ 三個同義，canapé 最常用"
 },
 {
  "id": "L25_le_canapé_lit",
  "lesson": 25,
  "fr": "le canapé-lit",
  "zh": "沙發床",
  "note": "小房子很實用"
 },
 {
  "id": "L25_la_chaise",
  "lesson": 25,
  "fr": "la chaise",
  "zh": "椅子"
 },
 {
  "id": "L25_l_étagère",
  "lesson": 25,
  "fr": "l'étagère",
  "zh": "層架、書架",
  "note": "⚠️ 來自 étage（樓層）——架子有很多層"
 },
 {
  "id": "L25_le_lit_une_place_deux",
  "lesson": 25,
  "fr": "le lit (une place / deux places)",
  "zh": "床（單人／雙人）",
  "note": "⚠️ 用 place 算，不是 personne"
 },
 {
  "id": "L25_le_placard",
  "lesson": 25,
  "fr": "le placard",
  "zh": "櫥櫃、壁櫃"
 },
 {
  "id": "L25_les_rangements",
  "lesson": 25,
  "fr": "les rangements",
  "zh": "收納空間（統稱）",
  "note": "來自 ranger（收拾）"
 },
 {
  "id": "L25_la_table_basse",
  "lesson": 25,
  "fr": "la table basse",
  "zh": "茶几",
  "note": "basse＝矮的"
 },
 {
  "id": "L25_la_table_de_chevet",
  "lesson": 25,
  "fr": "la table de chevet",
  "zh": "床頭櫃",
  "note": "le chevet＝床頭"
 },
 {
  "id": "L25_être_au_chevet_de_quelqu",
  "lesson": 25,
  "fr": "être au chevet de quelqu'un",
  "zh": "守在某人（病）床邊照顧",
  "note": "⚠️ 帶沉重語氣，用在陪伴重病者"
 },
 {
  "id": "L25_le_tabouret",
  "lesson": 25,
  "fr": "le tabouret",
  "zh": "凳子（無靠背）"
 },
 {
  "id": "L25_Asseyez_vous_",
  "lesson": 25,
  "fr": "Asseyez-vous.",
  "zh": "請坐。",
  "note": "⭐ s'asseoir 的命令式 vous 形"
 },
 {
  "id": "L25_le_cadre_photo_",
  "lesson": 25,
  "fr": "le cadre (photo)",
  "zh": "相框",
  "note": "⚠️ cadre 另一義是「幹部、主管」"
 },
 {
  "id": "L25_le_coussin",
  "lesson": 25,
  "fr": "le coussin",
  "zh": "抱枕、靠墊",
  "note": "⚠️ 別跟 le cousin（表堂兄弟）搞混：coussin [s]／cousin [z]"
 },
 {
  "id": "L25_l_horloge",
  "lesson": 25,
  "fr": "l'horloge",
  "zh": "時鐘（掛鐘）",
  "note": "⚠️ 陰性。L'horloge donne l'heure"
 },
 {
  "id": "L25_le_rideau",
  "lesson": 25,
  "fr": "le rideau",
  "zh": "窗簾",
  "note": "⭐ le rideau de douche＝浴簾"
 },
 {
  "id": "L25_les_appareils_électromén",
  "lesson": 25,
  "fr": "les appareils électroménagers",
  "zh": "家電（統稱）",
  "note": "⚠️ électro＋ménager。ménage 又出現（第23課 faire le ménage）"
 },
 {
  "id": "L25_le_réfrigérateur_le_fr",
  "lesson": 25,
  "fr": "le réfrigérateur = le frigo",
  "zh": "冰箱",
  "note": "口語一律 frigo"
 },
 {
  "id": "L25_le_lave_linge_la_machi",
  "lesson": 25,
  "fr": "le lave-linge = la machine à laver",
  "zh": "洗衣機",
  "note": "le linge＝衣物布品"
 },
 {
  "id": "L25_la_couette",
  "lesson": 25,
  "fr": "la couette",
  "zh": "羽絨被",
  "note": "⭐ On dort avec pour ne pas avoir froid la nuit"
 },
 {
  "id": "L25_l_évier_le_lavabo",
  "lesson": 25,
  "fr": "l'évier / le lavabo",
  "zh": "廚房水槽／洗手台",
  "note": "⚠️ évier 在廚房，lavabo 在浴室"
 },
 {
  "id": "L25_le_chauffage_la_clim",
  "lesson": 25,
  "fr": "le chauffage / la clim",
  "zh": "暖氣／冷氣",
  "note": "clim 是 climatisation 的簡稱，口語都講 clim"
 },
 {
  "id": "L25_l_avenue",
  "lesson": 25,
  "fr": "l'avenue",
  "zh": "大道",
  "note": "比 la rue 寬"
 },
 {
  "id": "L25_les_bureaux",
  "lesson": 25,
  "fr": "les bureaux",
  "zh": "辦公大樓、辦公區",
  "note": "⚠️ 單數 le bureau 是辦公室／書桌"
 },
 {
  "id": "L25_les_espaces_verts",
  "lesson": 25,
  "fr": "les espaces verts",
  "zh": "綠地",
  "note": "⚠️ 不一定是公園，一小塊草地也算"
 },
 {
  "id": "L25_animé_e_vivant_e_",
  "lesson": 25,
  "fr": "animé(e) = vivant(e)",
  "zh": "熱鬧的、有活力的",
  "note": "⭐ 課本當同義詞考"
 },
 {
  "id": "L25_mourant_e_",
  "lesson": 25,
  "fr": "mourant(e)",
  "zh": "正在沒落的",
  "note": "⚠️ 老師補充：Les centres-villes sont de plus en plus mourants"
 },
 {
  "id": "L25_tranquille",
  "lesson": 25,
  "fr": "tranquille",
  "zh": "安靜的、悠閒的",
  "note": "⭐ 別人問 Ça va ? 可以回 Tranquille（還行）"
 },
 {
  "id": "L25_commerçant_e_",
  "lesson": 25,
  "fr": "commerçant(e)",
  "zh": "商店多的／店主",
  "note": "un quartier commerçant 的反面是 un quartier calme"
 },
 {
  "id": "L25_chic",
  "lesson": 25,
  "fr": "chic",
  "zh": "高級的、時髦的",
  "note": "un quartier chic＝高級住宅區（也就是貴）"
 },
 {
  "id": "L25_Zut_",
  "lesson": 25,
  "fr": "Zut !",
  "zh": "可惡！糟了！",
  "note": "⚠️ merde 的委婉版"
 },
 {
  "id": "L25_Mince_",
  "lesson": 25,
  "fr": "Mince !",
  "zh": "糟糕！可惜！",
  "note": "⚠️ 一字兩義：mince 當形容詞是「瘦的」"
 },
 {
  "id": "L25_C_est_dommage_",
  "lesson": 25,
  "fr": "C'est dommage.",
  "zh": "真可惜。",
  "note": "最中性常用的失望語"
 },
 {
  "id": "L25_C_est_pas_grave_",
  "lesson": 25,
  "fr": "C'est pas grave.",
  "zh": "沒關係。",
  "note": "完整是 Ce n'est pas grave，口語省略 ne"
 },
 {
  "id": "L25_Ça_va_aller_",
  "lesson": 25,
  "fr": "Ça va aller.",
  "zh": "會沒事的。",
  "note": "⭐ 安慰人最好用的一句"
 },
 {
  "id": "L25_Courage_",
  "lesson": 25,
  "fr": "Courage !",
  "zh": "加油！撐住！",
  "note": "不是「勇氣」，是打氣用語"
 },
 {
  "id": "L25_T_inquiète_",
  "lesson": 25,
  "fr": "T'inquiète.",
  "zh": "別擔心。",
  "note": "⚠️ ne 跟 pas 都省略了，字面像肯定但意思是否定。寫作不能這樣寫"
 },
 {
  "id": "L25_Ça_m_arrange_Ça_ne_m_",
  "lesson": 25,
  "fr": "Ça m'arrange. / Ça ne m'arrange pas.",
  "zh": "這樣對我方便／不方便。",
  "note": "⭐ 約時間必備。si ça t'arrange＝如果你方便"
 },
 {
  "id": "L25_passer_voir_quelqu_un_",
  "lesson": 25,
  "fr": "passer (voir quelqu'un)",
  "zh": "順道過去（看某人）",
  "note": "⚠️ 不是久留，是「過去一下」"
 },
 {
  "id": "L25_pareil_le_",
  "lesson": 25,
  "fr": "pareil(le)",
  "zh": "一樣的",
  "note": "Tu es pareil que ton père＝你跟你爸一個樣"
 },
 {
  "id": "L25_C_est_clair_",
  "lesson": 25,
  "fr": "C'est clair !",
  "zh": "那還用說！",
  "note": "⭐ 很口語的強烈同意"
 },
 {
  "id": "L25_Je_pense_la_même_chose_",
  "lesson": 25,
  "fr": "Je pense la même chose.",
  "zh": "我也這麼想。",
  "note": "la même chose＝同一件事"
 },
 {
  "id": "L25_rendre_",
  "lesson": 25,
  "fr": "rendre + 形容詞",
  "zh": "使…變成…",
  "note": "⭐ C'est ça qui le rend beau。rendre 另一義是「歸還」"
 },
 {
  "id": "L25_défiler",
  "lesson": 25,
  "fr": "défiler",
  "zh": "走秀",
  "note": "le défilé＝時裝秀、遊行"
 },
 {
  "id": "L25_un_corps_parfait",
  "lesson": 25,
  "fr": "un corps parfait",
  "zh": "完美的身體",
  "note": "課文主題：誰定義完美"
 },
 {
  "id": "L25_Chaque_corps_est_unique_",
  "lesson": 25,
  "fr": "Chaque corps est unique.",
  "zh": "每個身體都是獨一無二的。",
  "note": "課文金句"
 },
 {
  "id": "L26_Ils_ne_se_sentent_pas_bi",
  "lesson": 26,
  "fr": "Ils ne se sentent pas bien dans leur peau.",
  "zh": "他們對自己不自在。",
  "note": "⭐ se sentir bien dans sa peau＝字面「在自己的皮膚裡感覺舒服」＝自我接納。整塊記"
 },
 {
  "id": "L26_déclare_t_il",
  "lesson": 26,
  "fr": "déclare-t-il",
  "zh": "他表示。",
  "note": "⚠️ 這個 -t- 沒有任何意思，純粹為了好唸（déclare il 唸起來卡）。只出現在 il／elle／on 前面：déclare-t-elle、déclare-t-on"
 },
 {
  "id": "L26_Mais_c_est_nous_qui_port",
  "lesson": 26,
  "fr": "Mais c'est nous qui portons les vêtements.",
  "zh": "但穿衣服的是我們。",
  "note": "⭐ 全文結論句。c'est … qui 是強調句型；這裡的 nous ＝一般人，不是模特兒"
 },
 {
  "id": "L26_un_sosie",
  "lesson": 26,
  "fr": "un sosie",
  "zh": "長得一模一樣的人（替身）",
  "note": "⭐ 英文的 look-alike／doppelgänger。老師：Michael Jackson 有很多 sosies"
 },
 {
  "id": "L26_Il_ne_ressemble_plus_aut",
  "lesson": 26,
  "fr": "Il ne ressemble plus autant qu'avant à l'empereur.",
  "zh": "他不再像以前那麼像皇帝了。",
  "note": "⭐⭐ 三個東西疊在一起：ne … plus（不再）＋ autant que（一樣多）＋ avant（以前）＝「不再像以前那麼…」"
 },
 {
  "id": "L26_l_empereur",
  "lesson": 26,
  "fr": "l'empereur",
  "zh": "皇帝",
  "note": "拿破崙的頭銜。文章用它代稱本尊，避免一直重複名字"
 },
 {
  "id": "L26_Je_n_ai_plus_du_tout_la",
  "lesson": 26,
  "fr": "Je n'ai plus du tout la tête de l'emploi.",
  "zh": "我完全沒有那個樣子了。",
  "note": "⭐ avoir la tête de l'emploi＝長得就是那個工作的樣子。⚠️ 老師警告：這句拿來說別人可能很失禮（暗指他「活該做這種工作」）"
 },
 {
  "id": "L26_Il_avait_le_bon_physique",
  "lesson": 26,
  "fr": "Il avait le bon physique.",
  "zh": "他有適合的外型。",
  "note": "⭐ 課本第6題答案：「avoir le physique idéal pour un travail」就是這句"
 },
 {
  "id": "L26_le_même_visage_rond_que",
  "lesson": 26,
  "fr": "le même visage rond que Bonaparte",
  "zh": "跟波拿巴一樣的圓臉",
  "note": "⭐⭐ le même ＋ 名詞 ＋ que——本課主文法的課文出處"
 },
 {
  "id": "L26_Mais_il_ne_suffit_pas_d",
  "lesson": 26,
  "fr": "Mais il ne suffit pas d'être petit pour être Napoléon.",
  "zh": "但光是矮並不足以成為拿破崙。",
  "note": "⭐ il ne suffit pas de ＋ 原形＝光是…還不夠"
 },
 {
  "id": "L26_Il_est_musclé_et_sec",
  "lesson": 26,
  "fr": "Il est musclé et sec.",
  "zh": "他有肌肉而且精瘦。",
  "note": "⭐ 這組能並存，就證明 sec ≠ mince——sec 講的是沒有多餘脂肪"
 },
 {
  "id": "L26_avoir_bonne_mine",
  "lesson": 26,
  "fr": "avoir bonne mine",
  "zh": "氣色好",
  "note": "⭐ la mine 指的是臉色——看起來精神好、狀態好"
 },
 {
  "id": "L26_avoir_mauvaise_mine",
  "lesson": 26,
  "fr": "avoir mauvaise mine",
  "zh": "氣色差",
  "note": "⚠️ 看得出來人有狀況。可以接著問 ça va ?"
 },
 {
  "id": "L26_avoir_un_corps_parfait",
  "lesson": 26,
  "fr": "avoir un corps parfait",
  "zh": "有完美的身材",
  "note": "le corps＝身體"
 },
 {
  "id": "L26_les_canons_de_beauté",
  "lesson": 26,
  "fr": "les canons de beauté",
  "zh": "審美標準",
  "note": "＝les critères de beauté。老師：兩個說法一樣"
 },
 {
  "id": "L26_être_bien_dans_sa_peau",
  "lesson": 26,
  "fr": "être bien dans sa peau",
  "zh": "自在、接納自己",
  "note": "⭐ 也可以說 se sentir bien dans sa peau。整塊記，不要拆"
 },
 {
  "id": "L26_Le_vêtement_te_rend_beau",
  "lesson": 26,
  "fr": "Le vêtement te rend beau.",
  "zh": "這件衣服讓你變好看。",
  "note": "⭐⭐ rendre ＋ 形容詞＝使…變得…。主詞是衣服"
 },
 {
  "id": "L26_Il_a_le_même_nez_que_son",
  "lesson": 26,
  "fr": "Il a le même nez que son père.",
  "zh": "他的鼻子跟他爸一樣。",
  "note": "⭐ 相似：même 前面要有冠詞，而且跟名詞配合（le même / la même / les mêmes）"
 },
 {
  "id": "L26_Il_achète_autant_de_vête",
  "lesson": 26,
  "fr": "Il achète autant de vêtements que moi.",
  "zh": "他買的衣服跟我一樣多。",
  "note": "⭐ 數量：autant de ＋ 名詞。跟第25課同一條規則——講數量就有 de"
 },
 {
  "id": "L26_Il_a_le_même_visage_rond",
  "lesson": 26,
  "fr": "Il a le même visage rond que Bonaparte.",
  "zh": "他跟波拿巴一樣有圓臉。",
  "note": "⭐ 課文B的句子——這就是為什麼課本把兩篇排在一起"
 },
 {
  "id": "L26_Ces_deux_robes_sont_pare",
  "lesson": 26,
  "fr": "Ces deux robes sont pareilles.",
  "zh": "這兩件洋裝一樣。",
  "note": "⭐ pareil＝égal、identique。要跟名詞配合性數：pareil／pareille／pareils／pareilles"
 },
 {
  "id": "L26_Ils_parlent_autant_l_un",
  "lesson": 26,
  "fr": "Ils parlent autant l'un que l'autre.",
  "zh": "他們兩個一樣多話。",
  "note": "⭐ 兩個人在你面前，不用講名字，直接「一個跟另一個一樣」。老師示範：兩個很吵的小孩就這樣講"
 },
 {
  "id": "L26_Tout_va_bien",
  "lesson": 26,
  "fr": "Tout va bien.",
  "zh": "一切都好。",
  "note": "⭐ 這裡的 tout ＝ toutes les choses，永遠寫 t-o-u-t，不配合任何東西"
 },
 {
  "id": "L26_J_achète_des_vêtements_t",
  "lesson": 26,
  "fr": "J'achète des vêtements tous les trois mois.",
  "zh": "我每三個月買一次衣服。",
  "note": "⭐ tous les ＋ 數字 ＋ 時間＝每隔多久一次。⚠️ 這裡不能換成 chaque"
 },
 {
  "id": "L26_J_ai_passé_toute_l_année",
  "lesson": 26,
  "fr": "J'ai passé toute l'année à jouer au golf.",
  "zh": "我整年都在打高爾夫。",
  "note": "⭐ passer ＋ 時間 ＋ à ＋ 原形＝花時間做某事"
 },
 {
  "id": "L26_Chaque_défaut_peut_être",
  "lesson": 26,
  "fr": "Chaque « défaut » peut être vu comme une « qualité ».",
  "zh": "每個「缺點」都可以被看成一個「優點」。",
  "note": "⭐ 全文主旨句。être vu comme＝被視為"
 },
 {
  "id": "L26_Vous_êtes_doué_e_pour_la",
  "lesson": 26,
  "fr": "Vous êtes doué(e) pour la communication.",
  "zh": "你有溝通的天分。",
  "note": "⭐ être doué pour＝有…的天分。老師岔題講法國球員 Doué 就是這個字"
 },
 {
  "id": "L26_On_peut_compter_sur_votr",
  "lesson": 26,
  "fr": "On peut compter sur votre prudence et votre tact.",
  "zh": "大家可以信賴你的謹慎和分寸。",
  "note": "⭐ compter sur qqn＝依靠某人（tu peux compter sur moi＝你可以靠我）；le tact＝分寸、體貼（課本註解：respect, délicatesse）"
 },
 {
  "id": "L26_Vous_ne_supportez_pas_le",
  "lesson": 26,
  "fr": "Vous ne supportez pas le bazar ?",
  "zh": "你受不了一團亂？",
  "note": "⭐ supporter＝忍受；le bazar＝亂七八糟（老師：來自中東那種很雜亂的市集）"
 },
 {
  "id": "L26_Ça_vous_fait_gagner_un_t",
  "lesson": 26,
  "fr": "Ça vous fait gagner un temps fou.",
  "zh": "這替你省下超多時間。",
  "note": "⭐⭐ 兩個要點：法文說「贏時間」（gagner du temps）不說「省」；un temps fou＝超多時間（fou 字面是瘋狂）"
 },
 {
  "id": "L26_Chaque_faiblesse_est_aus",
  "lesson": 26,
  "fr": "Chaque faiblesse est aussi une force.",
  "zh": "每個弱點同時也是一種力量。",
  "note": "⭐ 結論句。⚠️ 這裡的 aussi ＝「也」，不是比較級的 aussi"
 },
 {
  "id": "L26_Le_savoir_rend_plus_tolé",
  "lesson": 26,
  "fr": "Le savoir rend plus tolérant avec les autres et soi-même.",
  "zh": "知道這件事，會讓人對別人和自己更寬容。",
  "note": "⭐ le savoir＝知識（動詞當名詞用）；rendre ＋ 形容詞 又出現一次；soi-même＝自己（泛指，不指定人稱）"
 },
 {
  "id": "L26_Il_ne_semble_pas_croire",
  "lesson": 26,
  "fr": "Il ne semble pas croire en la bonté humaine.",
  "zh": "他似乎不相信人性本善。",
  "note": "⭐ 老師：所以他的故事結局常常很慘。la bonté＝善良"
 },
 {
  "id": "L26_Pendant_l_été_la_cigale",
  "lesson": 26,
  "fr": "Pendant l'été, la cigale chante tous les jours.",
  "zh": "夏天，蟬每天唱歌。",
  "note": "⭐ tous les jours ＝本課文法"
 },
 {
  "id": "L26_Qu_est_ce_que_tu_as_fait",
  "lesson": 26,
  "fr": "Qu'est-ce que tu as fait pendant l'été ?",
  "zh": "你夏天做了什麼？",
  "note": "⭐ passé composé 問句"
 },
 {
  "id": "L26_La_fourmi_n_est_pas_prêt",
  "lesson": 26,
  "fr": "La fourmi n'est pas prêteuse : c'est là son moindre défaut.",
  "zh": "螞蟻不愛借東西給人，這是牠最小的缺點。",
  "note": "⭐ un défaut 又出現了——課本把課文C跟這篇排在一起不是巧合"
 },
 {
  "id": "L26_On_peut_voir_la_suite",
  "lesson": 26,
  "fr": "On peut voir la suite.",
  "zh": "我們可以看接下來的部分。",
  "note": "🎙 la suite＝後續。開始上課接續上次進度時說的"
 },
 {
  "id": "L26_Tu_te_rappelles",
  "lesson": 26,
  "fr": "Tu te rappelles ?",
  "zh": "你記得嗎？",
  "note": "🎙 ＝ tu te souviens ?（第20課學過的那組）"
 },
 {
  "id": "L26_Ça_veut_dire_quoi",
  "lesson": 26,
  "fr": "Ça veut dire quoi ?",
  "zh": "這是什麼意思？",
  "note": "🎙 口語問法（正式是 qu'est-ce que ça veut dire ?）。Owen 自己要會主動用這句"
 },
 {
  "id": "L26_Ce_n_est_pas_grave",
  "lesson": 26,
  "fr": "Ce n'est pas grave.",
  "zh": "沒關係。",
  "note": "🎙 課本印錯字時老師說的"
 },
 {
  "id": "L26_On_peut_s_en_sortir",
  "lesson": 26,
  "fr": "On peut s'en sortir.",
  "zh": "我們應付得來。",
  "note": "🎙 s'en sortir＝脫困、搞定，很常用"
 },
 {
  "id": "L26_Tu_n_as_pas_de_problème",
  "lesson": 26,
  "fr": "Tu n'as pas de problème avec le mot « gros » ?",
  "zh": "你對「胖」這個字沒有意見吧？",
  "note": "🎙 老師確認學生會不會不舒服時說的"
 },
 {
  "id": "L26_Normalement_tu_ne_dis_pa",
  "lesson": 26,
  "fr": "Normalement, tu ne dis pas à quelqu'un qu'il est gros.",
  "zh": "一般來說，你不會對別人說他胖。",
  "note": "🎙 社會語用的提醒"
 },
 {
  "id": "L26_Je_pense_que_ce_texte_es",
  "lesson": 26,
  "fr": "Je pense que ce texte est un peu difficile.",
  "zh": "我覺得這篇文章有點難。",
  "note": "🎙 老師自己承認課文難度時說的"
 },
 {
  "id": "L26_On_peut_regarder_rapidem",
  "lesson": 26,
  "fr": "On peut regarder rapidement.",
  "zh": "我們可以快速看一下。",
  "note": "🎙 rapidement＝快速地"
 },
 {
  "id": "L26_C_est_quoi_ça_veut_dire",
  "lesson": 26,
  "fr": "C'est quoi, ça veut dire quoi ?",
  "zh": "這是什麼、什麼意思？",
  "note": "🎙 完全口語的追問方式"
 },
 {
  "id": "L26_Tu_peux_compter_sur_moi",
  "lesson": 26,
  "fr": "Tu peux compter sur moi.",
  "zh": "你可以信賴我。",
  "note": "🎙 老師解釋 compter sur 時給的例句"
 },
 {
  "id": "L26_chaque_famille",
  "lesson": 26,
  "fr": "chaque famille",
  "zh": "想說「我對家裡每個人都稱讚」",
  "note": "⚠️ 那是「每個家庭」。要說 chaque membre de ma famille——chaque 是一個一個看"
 },
 {
  "id": "L26_costaud_e",
  "lesson": 26,
  "fr": "costaud(e)",
  "zh": "壯",
  "note": "⚠️ 跟胖不一樣——是 big & strong。「il est costaud」是稱讚"
 },
 {
  "id": "L26_corpulent_e",
  "lesson": 26,
  "fr": "corpulent(e)",
  "zh": "壯碩、體型大",
  "note": "比較文雅，重點在「佔空間」而不是脂肪"
 },
 {
  "id": "L26_taille_plus",
  "lesson": 26,
  "fr": "taille plus",
  "zh": "大尺碼",
  "note": "從服裝尺碼來的說法（plus size），最中性"
 },
 {
  "id": "L26_rond_e",
  "lesson": 26,
  "fr": "rond(e)",
  "zh": "圓潤",
  "note": "臉（un visage rond）跟身材（elle est ronde）都能用，比 gros 溫和"
 },
 {
  "id": "L26_barbu_e",
  "lesson": 26,
  "fr": "barbu(e)",
  "zh": "有鬍子的",
  "note": "adj｜la barbe＝鬍子"
 },
 {
  "id": "L26_chauve",
  "lesson": 26,
  "fr": "chauve",
  "zh": "禿頭的",
  "note": "adj｜⚠️ 全禿或剃光。課本註解 1 就是這個字"
 },
 {
  "id": "L26_dégarni_e",
  "lesson": 26,
  "fr": "dégarni(e)",
  "zh": "頭髮稀疏的",
  "note": "adj｜⚠️ 兩側還有、頂上沒了。跟 chauve 不一樣"
 },
 {
  "id": "L26_les_cheveux",
  "lesson": 26,
  "fr": "les cheveux",
  "zh": "頭髮",
  "note": "m.pl｜永遠複數。gris／blancs／blonds／bruns／châtains／courts／longs"
 },
 {
  "id": "L26_châtain",
  "lesson": 26,
  "fr": "châtain",
  "zh": "栗色的",
  "note": "adj｜老師：brun 跟 châtain 很接近，都是深髮色"
 },
 {
  "id": "L26_la_fossette",
  "lesson": 26,
  "fr": "la fossette",
  "zh": "酒窩",
  "note": "f｜臉頰或下巴上都可能有"
 },
 {
  "id": "L26_le_menton",
  "lesson": 26,
  "fr": "le menton",
  "zh": "下巴",
  "note": "m｜la fossette au menton＝下巴的酒窩"
 },
 {
  "id": "L26_le_sourire",
  "lesson": 26,
  "fr": "le sourire",
  "zh": "微笑",
  "note": "m｜sourire 也是動詞"
 },
 {
  "id": "L26_le_visage",
  "lesson": 26,
  "fr": "le visage",
  "zh": "臉",
  "note": "m｜⚠️ 跟 la tête（頭）不同。un visage rond＝圓臉"
 },
 {
  "id": "L26_âgé_e",
  "lesson": 26,
  "fr": "âgé(e)",
  "zh": "年長的",
  "note": "adj｜＝vieux／vieille（口語）≠ jeune。⚠️ âgé 比 vieux 客氣"
 },
 {
  "id": "L26_fort_e",
  "lesson": 26,
  "fr": "fort(e)",
  "zh": "強壯的",
  "note": "adj｜⚠️ 也可以形容心理：c'est une personne forte＝她內心很強大"
 },
 {
  "id": "L26_mesurer_1_60_m",
  "lesson": 26,
  "fr": "mesurer 1,60 m",
  "zh": "身高160公分",
  "note": "v｜唸 un mètre soixante"
 },
 {
  "id": "L26_musclé_e",
  "lesson": 26,
  "fr": "musclé(e)",
  "zh": "有肌肉的",
  "note": "adj｜le muscle＝肌肉"
 },
 {
  "id": "L26_mince",
  "lesson": 26,
  "fr": "mince",
  "zh": "纖細的",
  "note": "adj｜⚠️ ＝skinny，強調細。老師：課本把 sec 跟 mince 畫等號，但其實不完全一樣"
 },
 {
  "id": "L26_ressembler_à",
  "lesson": 26,
  "fr": "ressembler à",
  "zh": "像…",
  "note": "Tu ressembles à ton père. ／ 用代名詞：Tu me ressembles."
 },
 {
  "id": "L26_être_le_sosie_de",
  "lesson": 26,
  "fr": "être le sosie de",
  "zh": "是…的分身",
  "note": "Il est le sosie de Napoléon.（長得一模一樣的人）"
 },
 {
  "id": "L26_avoir_la_tête_de_l_emplo",
  "lesson": 26,
  "fr": "avoir la tête de l'emploi",
  "zh": "長得就是那個樣子",
  "note": "⚠️ 稱讚或侮辱都可以，看語境。老師說拿來說別人很失禮"
 },
 {
  "id": "L26_une_qualité",
  "lesson": 26,
  "fr": "une qualité",
  "zh": "優點",
  "note": "f｜↔ un défaut"
 },
 {
  "id": "L26_un_défaut",
  "lesson": 26,
  "fr": "un défaut",
  "zh": "缺點",
  "note": "m｜課本標題：les qualités de vos défauts"
 },
 {
  "id": "L26_bavard_e",
  "lesson": 26,
  "fr": "bavard(e)",
  "zh": "多話的",
  "note": "adj｜bavarder＝閒聊"
 },
 {
  "id": "L26_bruyant_e",
  "lesson": 26,
  "fr": "bruyant(e)",
  "zh": "吵的",
  "note": "adj｜le bruit＝噪音"
 },
 {
  "id": "L26_sans_gêne",
  "lesson": 26,
  "fr": "sans gêne",
  "zh": "沒分寸的",
  "note": "adj｜⚠️ gêner＝打擾 → sans gêne＝不介意打擾別人"
 },
 {
  "id": "L26_sociable",
  "lesson": 26,
  "fr": "sociable",
  "zh": "好相處的",
  "note": "adj｜不等於「社交強」，是「跟人相處沒問題」"
 },
 {
  "id": "L26_spontané_e",
  "lesson": 26,
  "fr": "spontané(e)",
  "zh": "直接的、不假思索的",
  "note": "adj｜↔ réfléchi"
 },
 {
  "id": "L26_doué_e_pour",
  "lesson": 26,
  "fr": "doué(e) pour",
  "zh": "有…天分的",
  "note": "adj｜être doué pour la communication"
 },
 {
  "id": "L26_timide",
  "lesson": 26,
  "fr": "timide",
  "zh": "害羞的",
  "note": "adj｜課本：être d'un naturel timide"
 },
 {
  "id": "L26_réfléchi_e",
  "lesson": 26,
  "fr": "réfléchi(e)",
  "zh": "深思熟慮的",
  "note": "adj｜réfléchir＝思考"
 },
 {
  "id": "L26_déranger",
  "lesson": 26,
  "fr": "déranger",
  "zh": "打擾",
  "note": "v｜＝gêner"
 },
 {
  "id": "L26_compter_sur",
  "lesson": 26,
  "fr": "compter sur",
  "zh": "信賴、依靠",
  "note": "v｜Tu peux compter sur moi."
 },
 {
  "id": "L26_la_prudence",
  "lesson": 26,
  "fr": "la prudence",
  "zh": "謹慎",
  "note": "f｜prudent(e)＝謹慎的"
 },
 {
  "id": "L26_le_tact",
  "lesson": 26,
  "fr": "le tact",
  "zh": "分寸、體貼",
  "note": "m｜課本註解：respect, délicatesse"
 },
 {
  "id": "L26_maniaque",
  "lesson": 26,
  "fr": "maniaque",
  "zh": "有潔癖的、龜毛的",
  "note": "adj｜⚠️ 是負面的「過頭」，不是英文的 maniac（瘋子）"
 },
 {
  "id": "L26_le_désordre",
  "lesson": 26,
  "fr": "le désordre",
  "zh": "亂",
  "note": "m｜↔ l'ordre"
 },
 {
  "id": "L26_énerver",
  "lesson": 26,
  "fr": "énerver",
  "zh": "使煩躁",
  "note": "v｜être énervé＝很煩"
 },
 {
  "id": "L26_supporter",
  "lesson": 26,
  "fr": "supporter",
  "zh": "忍受",
  "note": "v｜⚠️ 不是英文的 support（支持）"
 },
 {
  "id": "L26_le_bazar",
  "lesson": 26,
  "fr": "le bazar",
  "zh": "一團亂",
  "note": "m｜老師：來自那種很雜亂的市集"
 },
 {
  "id": "L26_ordonné_e",
  "lesson": 26,
  "fr": "ordonné(e)",
  "zh": "有條理的",
  "note": "adj｜l'ordre＝秩序"
 },
 {
  "id": "L26_tolérant_e",
  "lesson": 26,
  "fr": "tolérant(e)",
  "zh": "寬容的",
  "note": "adj｜結論句：rend plus tolérant"
 },
 {
  "id": "L26_soi_même",
  "lesson": 26,
  "fr": "soi-même",
  "zh": "自己",
  "note": "pron｜⚠️ 泛指用 soi-même（不指定人稱時一律用這個）"
 },
 {
  "id": "L26_le_renard",
  "lesson": 26,
  "fr": "le renard",
  "zh": "狐狸",
  "note": "intelligent et menteur（聰明但愛說謊）"
 },
 {
  "id": "L26_le_loup",
  "lesson": 26,
  "fr": "le loup",
  "zh": "狼",
  "note": "indépendant mais souvent un peu stupide（獨立但常常有點笨）"
 },
 {
  "id": "L26_l_agneau",
  "lesson": 26,
  "fr": "l'agneau",
  "zh": "羔羊",
  "note": "doux et honnête（溫和誠實）"
 },
 {
  "id": "L26_le_lion",
  "lesson": 26,
  "fr": "le lion",
  "zh": "獅子",
  "note": "autoritaire et cruel（專斷殘忍）"
 },
 {
  "id": "L26_le_rat",
  "lesson": 26,
  "fr": "le rat",
  "zh": "老鼠",
  "note": "superficiel en groupe, curieux et réfléchi seul（在群體裡膚淺，單獨時好奇又深思）"
 },
 {
  "id": "L26_la_grenouille",
  "lesson": 26,
  "fr": "la grenouille",
  "zh": "青蛙",
  "note": "envieuse et prétentieuse（愛嫉妒又自命不凡）"
 },
 {
  "id": "L26_la_fourmi",
  "lesson": 26,
  "fr": "la fourmi",
  "zh": "螞蟻",
  "note": "inquiète et travailleuse（焦慮又勤勞）"
 },
 {
  "id": "L26_la_cigale",
  "lesson": 26,
  "fr": "la cigale",
  "zh": "蟬",
  "note": "optimiste et paresseuse（樂觀又懶惰）"
 },
 {
  "id": "L26_gagner_un_temps_fou",
  "lesson": 26,
  "fr": "gagner un temps fou",
  "zh": "逐字翻成 win time 覺得怪",
  "note": "法文說「贏時間」不說「省時間」：gagner du temps"
 },
 {
  "id": "L27_Nous_mentons_vous_mentez",
  "lesson": 27,
  "fr": "Nous mentons, vous mentez, ils mentent.",
  "zh": "我們／你們／他們說謊。",
  "note": "⭐ 複數才把 t 唸出來。跟 partir／sortir 同一類（-tir 動詞）"
 },
 {
  "id": "L27_À_propos_de_la_photo_de",
  "lesson": 27,
  "fr": "À propos de la photo de profil…",
  "zh": "關於大頭照…",
  "note": "⭐ à propos de＝關於（＝about）。開場句型，寫作可以直接用"
 },
 {
  "id": "L27__est_si_la_vôtre_est_ada",
  "lesson": 27,
  "fr": "…est si la vôtre est adaptée au public visé.",
  "zh": "…就是你的那張照片適不適合你想給的對象。",
  "note": "⭐⭐ la vôtre ＝ votre photo de profil（第一個所有格代名詞）。être adapté à＝適合"
 },
 {
  "id": "L27_le_public_visé",
  "lesson": 27,
  "fr": "le public visé",
  "zh": "目標對象、想觸及的人",
  "note": "⭐ viser＝瞄準（target）→ le public visé＝你瞄準的那群人"
 },
 {
  "id": "L27_Une_photo_réussie_peut_ê",
  "lesson": 27,
  "fr": "Une photo réussie peut être originale mais pas trop bizarre.",
  "zh": "一張成功的照片可以有個性，但不要太怪。",
  "note": "⭐ réussi(e)＝成功的（動詞 réussir：je réussis, tu réussis）；original＝有個性、特別 ≠ bizarre＝怪"
 },
 {
  "id": "L27_C_est_votre_tête_que_l_e",
  "lesson": 27,
  "fr": "C'est votre tête que l'employeur veut voir, pas les leurs.",
  "zh": "老闆想看的是你的臉，不是他們的。",
  "note": "⭐⭐ les leurs＝leurs têtes（他們的臉）。⚠️ 老師特別點：是 les leurs 不是 les leur——所有格代名詞跟著被代替的名詞變複數"
 },
 {
  "id": "L27_Il_faut_paraître_sûr_de",
  "lesson": 27,
  "fr": "Il faut paraître sûr de soi et professionnel.",
  "zh": "要看起來有自信、專業。",
  "note": "⭐⭐ paraître＝顯得、看起來（＝appear）；être sûr de soi＝有自信。⚠️ 泛指用 soi，講自己時換人稱：je suis sûr de moi"
 },
 {
  "id": "L27_Il_a_changé_la_sienne_po",
  "lesson": 27,
  "fr": "Il a changé la sienne pour avoir l'air plus sérieux.",
  "zh": "他把自己那張換掉，好讓自己看起來更正經。",
  "note": "⭐⭐ la sienne＝sa photo；avoir l'air ＋ 形容詞＝看起來…（跟 paraître 同義）"
 },
 {
  "id": "L27_un_site_de_rencontres",
  "lesson": 27,
  "fr": "un site de rencontres",
  "zh": "交友網站",
  "note": "⭐ rencontrer＝遇見、認識 → site de rencontres＝dating site"
 },
 {
  "id": "L27_Là_il_s_agit_d_attirer_l",
  "lesson": 27,
  "fr": "Là, il s'agit d'attirer la sympathie.",
  "zh": "在那邊，重點是要讓人有好感。",
  "note": "⭐⭐ il s'agit de＝重點在於、講的是（無人稱句，只有 il 這個形式）；attirer＝吸引（門上的 tirez＝拉、poussez＝推同一個字根）"
 },
 {
  "id": "L27__de_capter_l_attention_e",
  "lesson": 27,
  "fr": "…de capter l'attention et de sortir du lot.",
  "zh": "…抓住注意力、跳出人群。",
  "note": "⭐ un lot＝一批、一群 → sortir du lot＝脫穎而出（outstand）"
 },
 {
  "id": "L27_La_photo_permet_d_en_dir",
  "lesson": 27,
  "fr": "La photo permet d'en dire plus sur votre personnalité.",
  "zh": "照片能多透露一些你的個性。",
  "note": "⭐ permettre de ＋ 原形＝讓…得以…；en dire plus＝多說一點（en 是第21課的代名詞）"
 },
 {
  "id": "L27_N_hésitez_pas_à_vous_met",
  "lesson": 27,
  "fr": "N'hésitez pas à vous mettre en scène.",
  "zh": "別客氣，儘管把自己「演」出來。",
  "note": "⭐ n'hésitez pas à＝儘管去…（超高頻客氣說法）；se mettre en scène＝把自己放進場景裡（第26課拉封丹那段的 mettre en scène 同一個字）"
 },
 {
  "id": "L27__pour_renseigner_les_aut",
  "lesson": 27,
  "fr": "…pour renseigner les autres sur vos passions.",
  "zh": "…好讓別人知道你熱愛什麼。",
  "note": "⭐ renseigner＝提供資訊；反過來自己問人是 se renseigner sur（打聽）"
 },
 {
  "id": "L27_Voici_les_miennes",
  "lesson": 27,
  "fr": "Voici les miennes !",
  "zh": "這些是我的！",
  "note": "⭐⭐ les miennes＝mes photos（陰性複數）。課本用這句直接帶出整張文法表"
 },
 {
  "id": "L27_sa_photo_f_sg_la_sienne",
  "lesson": 27,
  "fr": "sa photo (f. sg) → la sienne",
  "zh": "他的照片 → 他的（那張）",
  "note": "⭐⭐ ② 跟著「東西」變，不是跟著「人」變。photo 是陰性，所以就算擁有者是男的也用 la sienne"
 },
 {
  "id": "L27_écrire_j_écrirai",
  "lesson": 27,
  "fr": "écrire → j'écrirai",
  "zh": "我會寫",
  "note": "⚠️⚠️ 上一課 imparfait 要看現在式 nous écriv-ons → j'écrivais；未來式看原形 écrire → j'écrirai。看到 v 是過去、看到 r 是未來"
 },
 {
  "id": "L27_prendre_je_prendrai",
  "lesson": 27,
  "fr": "prendre → je prendrai",
  "zh": "我會拿／我會搭",
  "note": "-re 動詞去掉最後那個 e，剩下的 r 留著"
 },
 {
  "id": "L27_manger_je_mangerai",
  "lesson": 27,
  "fr": "manger → je mangerai",
  "zh": "我會吃",
  "note": "⭐ -er 動詞整個原形都不動，直接加字尾"
 },
 {
  "id": "L27_Comment_seront_nos_vies",
  "lesson": 27,
  "fr": "Comment seront nos vies en 2050 ?",
  "zh": "2050 年我們的生活會是什麼樣子？",
  "note": "⭐⭐ seront＝être 的未來式（ser- ＋ -ont）。標題就是本課文法"
 },
 {
  "id": "L27_Comme_ça_paraît_loin_la",
  "lesson": 27,
  "fr": "Comme ça paraît loin, la vie dans trente ans !",
  "zh": "三十年後的生活，感覺好遙遠！",
  "note": "⭐ paraître＝顯得（課文A也出現過）；loin＝遠。整句是很好用的口語感嘆"
 },
 {
  "id": "L27__un_qui_fera_apparaître",
  "lesson": 27,
  "fr": "…un qui fera apparaître des burgers, des frites, des jouets.",
  "zh": "…還有一個能變出漢堡、薯條、玩具。",
  "note": "⭐ faire ＋ 原形＝讓…發生（faire apparaître＝使出現）；un jouet＝玩具"
 },
 {
  "id": "L27_Comme_de_petites_soucoup",
  "lesson": 27,
  "fr": "Comme de petites soucoupes volantes.",
  "zh": "像小型的飛碟。",
  "note": "⭐ une soucoupe＝碟子 → soucoupe volante＝飛碟（UFO）。⚠️ 形容詞在後面要配合：soucoupes volantes"
 },
 {
  "id": "L27_Elles_sauront_leur_chemi",
  "lesson": 27,
  "fr": "Elles sauront leur chemin.",
  "zh": "它們自己認得路。",
  "note": "⭐⭐ sauront＝savoir 的未來式（saur- ＋ -ont）；le chemin＝路徑"
 },
 {
  "id": "L27_Nous_n_aurons_pas_besoin",
  "lesson": 27,
  "fr": "Nous n'aurons pas besoin d'avoir un volant.",
  "zh": "我們不需要有方向盤。",
  "note": "⭐⭐ avoir besoin de 的未來式否定；⚠️ le volant＝方向盤（跟上面的 volant＝會飛的同字不同義，同一篇文章裡兩個都出現）"
 },
 {
  "id": "L27_Le_GPS_pourra_conduire_t",
  "lesson": 27,
  "fr": "Le GPS pourra conduire tout seul.",
  "zh": "GPS 可以自己開。",
  "note": "⭐ conduire＝開車；tout seul＝完全自己來。⚠️ 開車的人叫 le conducteur；le chauffeur 本義來自 chauffer（加熱）——蒸汽車時代要先把車燒熱才能開"
 },
 {
  "id": "L27_Dans_le_futur_on_mangera",
  "lesson": 27,
  "fr": "Dans le futur, on mangera un comprimé, quatre fois par jour.",
  "zh": "未來我們會一天吃四次藥錠。",
  "note": "⭐ un comprimé＝藥錠（課本註解：une pilule，像藥一樣的東西）；quatre fois par jour＝一天四次"
 },
 {
  "id": "L27_Mais_on_aura_le_choix",
  "lesson": 27,
  "fr": "Mais on aura le choix.",
  "zh": "但我們可以選。",
  "note": "⭐ avoir le choix＝有選擇（choisir 的名詞）"
 },
 {
  "id": "L27_Dans_un_avenir_proche_de",
  "lesson": 27,
  "fr": "Dans un avenir proche, des robots nous serviront.",
  "zh": "在不久的將來，機器人會為我們服務。",
  "note": "⭐ dans un avenir proche＝在不久的將來（寫作超好用）；servir＝服務、上菜"
 },
 {
  "id": "L27_Selon_moi_l_IA_est_révol",
  "lesson": 27,
  "fr": "Selon moi, l'IA est révolutionnaire.",
  "zh": "我認為 AI 是革命性的。",
  "note": "⭐ selon moi / selon vous＝依我／你看（表達意見的固定開場）"
 },
 {
  "id": "L27_Moi_aussi_je_l_utilise_t",
  "lesson": 27,
  "fr": "Moi aussi, je l'utilise tout le temps.",
  "zh": "我也是，我一直在用。",
  "note": "🎙 老師自己的回答"
 },
 {
  "id": "L27_Dans_vingt_ans_ma_vie_à",
  "lesson": 27,
  "fr": "Dans vingt ans, ma vie à Taipei ne sera pas la même.",
  "zh": "二十年後，我在台北的生活不會一樣了。",
  "note": "⭐ sera＝être 未來式；la même＝第26課的文法"
 },
 {
  "id": "L27_Elle_saura_mon_chemin_do",
  "lesson": 27,
  "fr": "Elle saura mon chemin, donc je n'aurai pas besoin de volant.",
  "zh": "它認得我的路，所以我不需要方向盤。",
  "note": "⭐⭐ 兩個不規則字根：savoir→saur-、avoir→aur-"
 },
 {
  "id": "L27_Le_mien_fera_le_café_et",
  "lesson": 27,
  "fr": "Le mien fera le café et rangera mes dossiers.",
  "zh": "我的那台會煮咖啡、整理我的檔案。",
  "note": "⭐⭐ le mien＝mon robot（陽性單數）；faire→fer-；ranger＝收好"
 },
 {
  "id": "L27_Elle_dit_toujours_que_le",
  "lesson": 27,
  "fr": "Elle dit toujours que le sien travaille plus que le mien.",
  "zh": "她老說她的那台比我的更會做事。",
  "note": "⭐ 同一句裡 le sien 跟 le mien 對打，加上第25課的比較級 plus … que"
 },
 {
  "id": "L27_Je_continuerai_à_manger",
  "lesson": 27,
  "fr": "Je continuerai à manger les siennes tous les dimanches.",
  "zh": "我每個星期天都會繼續吃她做的那些。",
  "note": "⭐⭐ les siennes＝les nouilles de ma mère（陰性複數）；continuer à ＋ 原形"
 },
 {
  "id": "L27_Est_ce_que_leur_futur_se",
  "lesson": 27,
  "fr": "Est-ce que leur futur sera meilleur que le nôtre ?",
  "zh": "他們的未來會比我們的更好嗎？",
  "note": "⭐⭐ le nôtre（有帽子）＝notre futur；meilleur que＝比較級不規則（第25課）"
 },
 {
  "id": "L27_Je_ne_sais_pas_mais_il_f",
  "lesson": 27,
  "fr": "Je ne sais pas, mais il faudra apprendre vite.",
  "zh": "我不知道，但我們得學得快。",
  "note": "⭐ il faudra＝falloir 的未來式，只有 il 這一格"
 },
 {
  "id": "L27_Les_machines_elles_appre",
  "lesson": 27,
  "fr": "Les machines, elles, apprendront plus vite que nous.",
  "zh": "機器嘛，它們會學得比我們快。",
  "note": "⭐ les machines, elles,＝口語的強調結構（重讀代名詞回指主詞）"
 },
 {
  "id": "L27_Est_ce_que_toi_tu_as_cet",
  "lesson": 27,
  "fr": "Est-ce que toi, tu as cette qualité ou pas ?",
  "zh": "你有這個優點嗎？",
  "note": "🎙 老師逐字問過整張詞彙表的問法——⭐ 把詞彙套進自己身上就是他的教法"
 },
 {
  "id": "L27_Tu_te_souviens",
  "lesson": 27,
  "fr": "Tu te souviens ?",
  "zh": "你記得嗎？",
  "note": "🎙 帶出舊字時用（第20課學過 se souvenir）"
 },
 {
  "id": "L27_Et_l_opposé_c_est",
  "lesson": 27,
  "fr": "Et l'opposé, c'est…",
  "zh": "那反過來是…",
  "note": "🎙 l'opposé＝相反的那個。老師成對給字時一直用"
 },
 {
  "id": "L27_On_peut_regarder_les_exe",
  "lesson": 27,
  "fr": "On peut regarder les exercices.",
  "zh": "我們來看練習。",
  "note": "🎙 進練習題時的固定句"
 },
 {
  "id": "L27_C_est_ça",
  "lesson": 27,
  "fr": "C'est ça.",
  "zh": "對，就是這樣。",
  "note": "🎙 答對時的回應"
 },
 {
  "id": "L27_Très_bien_on_peut_s_arrê",
  "lesson": 27,
  "fr": "Très bien, on peut s'arrêter ici aujourd'hui.",
  "zh": "很好，今天就到這裡。",
  "note": "🎙 s'arrêter＝停下來。下課固定句"
 },
 {
  "id": "L27_Je_te_le_recommande",
  "lesson": 27,
  "fr": "Je te le recommande.",
  "zh": "我推薦你看／試。",
  "note": "🎙 老師推薦電影時說的。recommander＋雙代名詞"
 },
 {
  "id": "L27__elle_peut_tout_faire",
  "lesson": 27,
  "fr": "「elle peut tout faire」",
  "zh": "想說「AI 用途很多」",
  "note": "⚠️ 老師改成 Elle a beaucoup d'utilisations.——「什麼都能做」在法文聽起來太滿，用「用途很多」比較準"
 },
 {
  "id": "L27__arranger_mon_voyage",
  "lesson": 27,
  "fr": "「arranger mon voyage」",
  "zh": "想說「安排我的旅行」",
  "note": "⚠️ 老師改兩處：動詞用 préparer，而且用複數 mes voyages → préparer mes voyages"
 },
 {
  "id": "L27_chaleureux",
  "lesson": 27,
  "fr": "chaleureux",
  "zh": "熱情的、待人溫暖",
  "note": "chaleureuse｜⭐ 來自 la chaleur（熱度）——待人「有溫度」"
 },
 {
  "id": "L27_curieux",
  "lesson": 27,
  "fr": "curieux",
  "zh": "好奇的",
  "note": "curieuse｜⚠️ 老師強調拼字：字根是 curi-，陽性 -eux／陰性 -euse，沒有 x-e 這種寫法"
 },
 {
  "id": "L27_discret",
  "lesson": 27,
  "fr": "discret",
  "zh": "低調的、不多話",
  "note": "discrète｜不代表不友善，是「不張揚、不搶話」"
 },
 {
  "id": "L27_doux",
  "lesson": 27,
  "fr": "doux",
  "zh": "溫和的",
  "note": "douce｜⚠️ 本義是柔軟（un pull doux＝毛很軟的毛衣），用在人身上＝性情溫和"
 },
 {
  "id": "L27_extraverti_e",
  "lesson": 27,
  "fr": "extraverti(e)",
  "zh": "外向的",
  "note": "extravertie｜⭐ 反義 introverti(e)（內向）——老師特地成對給"
 },
 {
  "id": "L27_fidèle",
  "lesson": 27,
  "fr": "fidèle",
  "zh": "忠誠的、專一的",
  "note": "fidèle｜⭐ 兩種場合都用：對朋友忠誠、感情上不劈腿。第26課的 le chien est fidèle 就是這個字"
 },
 {
  "id": "L27_honnête",
  "lesson": 27,
  "fr": "honnête",
  "zh": "誠實的",
  "note": "honnête｜↔ menteur(-se)。⚠️ 開頭 h 不發音，唸 [ɔnɛt]"
 },
 {
  "id": "L27_optimiste",
  "lesson": 27,
  "fr": "optimiste",
  "zh": "樂觀的",
  "note": "optimiste｜⚠️ 陰陽同形（-iste 結尾都是）。↔ pessimiste"
 },
 {
  "id": "L27_prudent_e",
  "lesson": 27,
  "fr": "prudent(e)",
  "zh": "謹慎的、小心的",
  "note": "prudente｜＝careful。名詞 la prudence"
 },
 {
  "id": "L27_travailleur",
  "lesson": 27,
  "fr": "travailleur",
  "zh": "勤勞的",
  "note": "travailleuse｜⚠️ 老師特地唸清楚：tra-vail-leur，不是「Taiwanese」"
 },
 {
  "id": "L27_autoritaire",
  "lesson": 27,
  "fr": "autoritaire",
  "zh": "專斷的、愛下命令",
  "note": "autoritaire｜⭐ 老師的定義：quelqu'un qui aime donner des ordres"
 },
 {
  "id": "L27_cruel_le",
  "lesson": 27,
  "fr": "cruel(le)",
  "zh": "殘忍的",
  "note": "cruelle｜⚠️ 陰性雙 l：cruel → cruelle"
 },
 {
  "id": "L27_envieux",
  "lesson": 27,
  "fr": "envieux",
  "zh": "愛嫉妒的",
  "note": "envieuse｜avoir envie de（想要）同源——「想要別人有的東西」"
 },
 {
  "id": "L27_inquiet",
  "lesson": 27,
  "fr": "inquiet",
  "zh": "焦慮的、老是擔心",
  "note": "inquiète｜⚠️ 陰性是 inquiète（有 accent grave）"
 },
 {
  "id": "L27_menteur",
  "lesson": 27,
  "fr": "menteur",
  "zh": "愛說謊的",
  "note": "menteuse｜⭐ 動詞是 mentir（見下方變位）"
 },
 {
  "id": "L27_paresseux",
  "lesson": 27,
  "fr": "paresseux",
  "zh": "懶惰的",
  "note": "paresseuse｜la paresse＝懶惰"
 },
 {
  "id": "L27_pessimiste",
  "lesson": 27,
  "fr": "pessimiste",
  "zh": "悲觀的",
  "note": "pessimiste｜↔ optimiste。⚠️ 陰陽同形"
 },
 {
  "id": "L27_peureux",
  "lesson": 27,
  "fr": "peureux",
  "zh": "膽小的",
  "note": "peureuse｜⭐ la peur（恐懼）→ 老師的定義：quelqu'un qui a peur facilement"
 },
 {
  "id": "L27_prétentieux",
  "lesson": 27,
  "fr": "prétentieux",
  "zh": "自命不凡的",
  "note": "prétentieuse｜≒ arrogant。老師直接用英文 arrogant 解釋"
 },
 {
  "id": "L27_stupide",
  "lesson": 27,
  "fr": "stupide",
  "zh": "愚蠢的",
  "note": "stupide｜陰陽同形"
 },
 {
  "id": "L27_superficiel_le",
  "lesson": 27,
  "fr": "superficiel(le)",
  "zh": "膚淺的",
  "note": "superficielle｜la surface＝表面"
 },
 {
  "id": "L27_têtu_e",
  "lesson": 27,
  "fr": "têtu(e)",
  "zh": "固執的",
  "note": "têtue｜⭐ la tête（頭）→「頭很硬」。老師自承：Moi, je suis très têtu."
 },
 {
  "id": "L27_avoir_des_yeux_de_lynx",
  "lesson": 27,
  "fr": "avoir des yeux de lynx",
  "zh": "有山貓的眼睛",
  "note": "⭐ 眼力很好、什麼都看得到。老師的用法：東西你找半天找不到，別人一眼就看到——Tu as des yeux de lynx !"
 },
 {
  "id": "L27_avoir_une_mémoire_d_élép",
  "lesson": 27,
  "fr": "avoir une mémoire d'éléphant",
  "zh": "有大象的記憶",
  "note": "記性超好、什麼都記得（也可以帶點「連小事都記仇」的意味）"
 },
 {
  "id": "L27_avoir_une_tête_de_cochon",
  "lesson": 27,
  "fr": "avoir une tête de cochon",
  "zh": "有一顆豬頭",
  "note": "⚠️⚠️ ＝很固執（不是罵人笨）。這是魁北克的說法——老師說加拿大用這個"
 },
 {
  "id": "L27_C_est_ma_photo_de_classe",
  "lesson": 27,
  "fr": "C'est ma photo de classe.",
  "zh": "photo 陰性單數",
  "note": "C'est la mienne."
 },
 {
  "id": "L27_C_est_sa_personnalité",
  "lesson": 27,
  "fr": "C'est sa personnalité.",
  "zh": "personnalité 陰性單數",
  "note": "C'est la sienne."
 },
 {
  "id": "L27_C_est_votre_texte_de_pré",
  "lesson": 27,
  "fr": "C'est votre texte de présentation.",
  "zh": "texte 陽性單數 → 帽子別忘了",
  "note": "C'est le vôtre."
 },
 {
  "id": "L27__parti_avec_les_siens",
  "lesson": 27,
  "fr": "…parti avec les siens",
  "zh": "標準法語",
  "note": "⭐ 帶走了他自己的那些（＝ses meubles）——本課文法"
 },
 {
  "id": "L27__parti_avec_les_chiens",
  "lesson": 27,
  "fr": "…parti avec les chiens",
  "zh": "ch'ti 口音聽起來的樣子",
  "note": "帶著狗走了——所以主角滿頭問號"
 },
 {
  "id": "L27_bientôt",
  "lesson": 27,
  "fr": "bientôt",
  "zh": "很快、不久之後",
  "note": "⭐ 最近的一個，但老師提醒「也沒有那麼快」——不是明天"
 },
 {
  "id": "L27_dans_un_avenir_proche",
  "lesson": 27,
  "fr": "dans un avenir proche",
  "zh": "在不久的將來",
  "note": "比 bientôt 正式，寫作首選。l'avenir＝未來（＝le futur）"
 },
 {
  "id": "L27_dans_le_futur",
  "lesson": 27,
  "fr": "dans le futur",
  "zh": "在未來",
  "note": "沒有指定多遠，最中性"
 },
 {
  "id": "L27_Ça_paraît_loin",
  "lesson": 27,
  "fr": "Ça paraît loin !",
  "zh": "感覺好遠！",
  "note": "⭐ 口語感嘆，課文開頭那句"
 },
 {
  "id": "L27_la_découverte",
  "lesson": 27,
  "fr": "la découverte",
  "zh": "發現",
  "note": "f｜découvrir＝發現（本來就存在的東西）"
 },
 {
  "id": "L27_l_invention",
  "lesson": 27,
  "fr": "l'invention",
  "zh": "發明",
  "note": "f｜⚠️ 跟 découverte 分清楚：發明是做出來的，發現是原本就在"
 },
 {
  "id": "L27_inventer",
  "lesson": 27,
  "fr": "inventer",
  "zh": "發明",
  "note": "v｜l'inventeur / l'inventrice＝發明家"
 },
 {
  "id": "L27_fabriquer",
  "lesson": 27,
  "fr": "fabriquer",
  "zh": "製造",
  "note": "v｜⭐ 課本題：機器人是 fabriquer 不是 découvrir——因為要做出來"
 },
 {
  "id": "L27_l_innovation",
  "lesson": 27,
  "fr": "l'innovation",
  "zh": "創新",
  "note": "f｜課本題：Cette machine est une innovation（不是 inventrice——那是「發明家」，指人）"
 },
 {
  "id": "L27_la_nouveauté",
  "lesson": 27,
  "fr": "la nouveauté",
  "zh": "新東西、新功能",
  "note": "f｜⭐ 老師的例子：la nouveauté de l'iPhone 18, c'est…"
 },
 {
  "id": "L27_l_évolution",
  "lesson": 27,
  "fr": "l'évolution",
  "zh": "演進",
  "note": "f｜évoluer＝演變"
 },
 {
  "id": "L27_l_énergie_solaire",
  "lesson": 27,
  "fr": "l'énergie solaire",
  "zh": "太陽能",
  "note": "f｜課本題：L'énergie solaire permet à ce bateau de fonctionner"
 },
 {
  "id": "L27_la_technologie",
  "lesson": 27,
  "fr": "la technologie",
  "zh": "科技",
  "note": "f｜複數 les technologies＝各種科技"
 },
 {
  "id": "L27_révolutionner",
  "lesson": 27,
  "fr": "révolutionner",
  "zh": "徹底改變",
  "note": "v｜⭐ 老師的例句：L'IA révolutionne le monde du travail.（AI 徹底改變了職場）"
 },
 {
  "id": "L27_le_monde_du_travail",
  "lesson": 27,
  "fr": "le monde du travail",
  "zh": "職場、工作的世界",
  "note": "m｜⚠️ le monde de la mode（時尚圈，第26課）同一個結構"
 },
 {
  "id": "L27_l_ingénieur_e",
  "lesson": 27,
  "fr": "l'ingénieur(e)",
  "zh": "工程師",
  "note": "m / f｜課本題：les ingénieurs de cette start-up"
 },
 {
  "id": "L27_une_start_up",
  "lesson": 27,
  "fr": "une start-up",
  "zh": "新創公司",
  "note": "f｜⚠️ 英文字但用法文唸：老師特地示範"
 },
 {
  "id": "L27_l_appareil",
  "lesson": 27,
  "fr": "l'appareil",
  "zh": "裝置、機器",
  "note": "m｜⭐⭐ 泛指「幫你做事的東西」，不必是電子的：un appareil photo＝相機、les appareils de musculation＝健身器材"
 },
 {
  "id": "L27_le_moteur",
  "lesson": 27,
  "fr": "le moteur",
  "zh": "馬達、引擎",
  "note": "m｜課本題：Cet avion fonctionne avec un moteur électrique"
 },
 {
  "id": "L27_la_navette",
  "lesson": 27,
  "fr": "la navette",
  "zh": "接駁車／太空梭",
  "note": "f｜課本題：une navette spatiale＝太空梭"
 },
 {
  "id": "L27_le_robot",
  "lesson": 27,
  "fr": "le robot",
  "zh": "機器人",
  "note": "m｜形容詞 robotisé(e)＝機器人化的"
 },
 {
  "id": "L27_fonctionner_marcher",
  "lesson": 27,
  "fr": "fonctionner ＝ marcher",
  "zh": "運作",
  "note": "v｜⭐ 課本題：fonctionner 的同義字是 marcher（不是 aller／travailler）。ça ne marche pas＝壞了"
 },
 {
  "id": "L27_réparer",
  "lesson": 27,
  "fr": "réparer",
  "zh": "修理",
  "note": "v｜課本題：J'ai réparé mon ordinateur, j'espère qu'il va bien fonctionner"
 },
 {
  "id": "L27_indispensable",
  "lesson": 27,
  "fr": "indispensable",
  "zh": "不可或缺的",
  "note": "Bientôt, les robots deviendront indispensables."
 },
 {
  "id": "L27_autonome",
  "lesson": 27,
  "fr": "autonome",
  "zh": "自動駕駛的、自主的",
  "note": "Un jour, les voitures seront autonomes."
 },
 {
  "id": "L27_futuriste",
  "lesson": 27,
  "fr": "futuriste",
  "zh": "未來感的",
  "note": "Les films de science-fiction sont très futuristes."
 },
 {
  "id": "L27_pratique",
  "lesson": 27,
  "fr": "pratique",
  "zh": "方便好用的",
  "note": "J'ai acheté une imprimante 3D, c'est très pratique."
 },
 {
  "id": "L27_inutile",
  "lesson": 27,
  "fr": "inutile",
  "zh": "沒用的",
  "note": "Cet appareil ne sert à rien, il est vraiment inutile."
 },
 {
  "id": "L27_robotisé_e",
  "lesson": 27,
  "fr": "robotisé(e)",
  "zh": "機器人化的",
  "note": "Dans ce restaurant, le service est entièrement robotisé."
 },
 {
  "id": "L27_le_GPS",
  "lesson": 27,
  "fr": "le GPS",
  "zh": "衛星導航",
  "note": "唸法文字母"
 },
 {
  "id": "L27_l_hologramme",
  "lesson": 27,
  "fr": "l'hologramme",
  "zh": "全像投影",
  "note": "⭐ 課文用它上遠距課：把人投影成 3D"
 },
 {
  "id": "L27_l_imprimante_3D",
  "lesson": 27,
  "fr": "l'imprimante 3D",
  "zh": "3D 列印機",
  "note": "imprimer＝列印"
 },
 {
  "id": "L27_l_intelligence_artificie",
  "lesson": 27,
  "fr": "l'intelligence artificielle (l'IA)",
  "zh": "人工智慧",
  "note": "⚠️⚠️ 法文不說 AI，說 IA——因為法文的形容詞放後面。陰性：une intelligence → l'IA est…"
 },
 {
  "id": "L27_le_logiciel",
  "lesson": 27,
  "fr": "le logiciel",
  "zh": "軟體",
  "note": "＝software"
 },
 {
  "id": "L27_la_reconnaissance_facial",
  "lesson": 27,
  "fr": "la reconnaissance faciale",
  "zh": "臉部辨識",
  "note": "⭐ reconnaître（認出）→ la reconnaissance。Face ID 就是這個"
 },
 {
  "id": "L27_la_tablette",
  "lesson": 27,
  "fr": "la tablette",
  "zh": "平板",
  "note": "une tablette numérique＝數位平板"
 },
 {
  "id": "L27_la_soucoupe_volante",
  "lesson": 27,
  "fr": "la soucoupe volante",
  "zh": "飛碟",
  "note": "⚠️ 想像類"
 },
 {
  "id": "L27_la_téléportation",
  "lesson": 27,
  "fr": "la téléportation",
  "zh": "瞬間移動",
  "note": "⚠️ 想像類。動詞 se téléporter"
 },
 {
  "id": "L27_poser",
  "lesson": 27,
  "fr": "poser",
  "zh": "以為是「擺姿勢 pose」",
  "note": "⚠️ poser une question＝提問。這個字幾乎都跟 question 一起出現"
 },
 {
  "id": "L27_start_up",
  "lesson": 27,
  "fr": "start-up",
  "zh": "用英文唸",
  "note": "法文裡照法文的節奏唸——老師特地示範了一次"
 },
 {
  "id": "L28_Quand_tu_auras_18_ans_je",
  "lesson": 28,
  "fr": "Quand tu auras 18 ans, je t'achèterai un ordinateur.",
  "zh": "你18歲的時候，我會買一台電腦給你。",
  "note": "⭐⭐ 兩邊都是未來式。⚠️ 中文的「…的時候」很容易讓人寫成現在式，法文這裡不行"
 },
 {
  "id": "L28_Quand_tu_seras_disponibl",
  "lesson": 28,
  "fr": "Quand tu seras disponible, on s'appellera en visio ?",
  "zh": "你有空的時候，我們視訊通話好嗎？",
  "note": "⭐ quand ＋ 未來 ＋ 未來。disponible＝有空的（＝libre）；en visio＝視訊（就是 FaceTime 那種）"
 },
 {
  "id": "L28_Si_l_ordinateur_tombe_en",
  "lesson": 28,
  "fr": "Si l'ordinateur tombe en panne, appelle le réparateur.",
  "zh": "如果電腦壞了，就打給維修的人。",
  "note": "⭐ 第二式（現在＋命令）。tomber en panne＝故障（第27課的 être en panne＝壞掉的狀態）；le réparateur＝修理師傅（réparer＝修）"
 },
 {
  "id": "L28_Nous_vous_téléphonerons",
  "lesson": 28,
  "fr": "Nous vous téléphonerons quand nous rentrerons à la maison.",
  "zh": "我們回到家會打給你們。",
  "note": "⭐ quand ＋ 未來 ＋ 未來"
 },
 {
  "id": "L28_Si_tu_achètes_ce_smartph",
  "lesson": 28,
  "fr": "Si tu achètes ce smartphone, tu pourras utiliser le GPS.",
  "zh": "如果你買這支手機，你就可以用 GPS。",
  "note": "⭐ 老師的修改：原本寫 tu utiliseras le GPS 也對，但「你可以用」比「你會用」更合語意 → 用 pourras 更自然"
 },
 {
  "id": "L28_Si_vous_sortez_sans_votr",
  "lesson": 28,
  "fr": "Si vous sortez sans votre téléphone, prenez une carte.",
  "zh": "如果你們不帶手機出門，就帶張地圖。",
  "note": "⭐ 第二式（命令）。une carte 這裡是地圖"
 },
 {
  "id": "L28_Quand_mes_enfants_seront",
  "lesson": 28,
  "fr": "Quand mes enfants seront grands, ils habiteront à Paris.",
  "zh": "等我的小孩長大，他們會住在巴黎。",
  "note": "⭐ quand ＋ 未來 ＋ 未來"
 },
 {
  "id": "L28_Faites_des_recherches_à",
  "lesson": 28,
  "fr": "Faites des recherches à l'avance sur les itinéraires.",
  "zh": "事先查好路線。",
  "note": "⭐ à l'avance＝事先；un itinéraire＝路線；faire des recherches＝做查詢（recherche 是查資料，不是「研究」那麼重）"
 },
 {
  "id": "L28_Vos_proches_ne_seront_do",
  "lesson": 28,
  "fr": "Vos proches ne seront donc pas énervés.",
  "zh": "所以你的親友就不會生氣。",
  "note": "⭐ 副詞 donc 貼著動詞 seront，pas 被推到後面"
 },
 {
  "id": "L28_Donc_vos_proches_ne_sero",
  "lesson": 28,
  "fr": "Donc, vos proches ne seront pas énervés.",
  "zh": "（同義）所以，你的親友不會生氣。",
  "note": "⭐ 也可以整個丟到句首——這樣就不用擠了。⚠️ 兩種都對，插在中間比較書面、比較法國人"
 },
 {
  "id": "L28_Je_suis_Mbappé_sur_Insta",
  "lesson": 28,
  "fr": "Je suis Mbappé sur Instagram.",
  "zh": "我在 Instagram 上追蹤姆巴佩。",
  "note": "⭐⭐ 老師寫在白板上的那句。⚠️ 字面也可以讀成「我是姆巴佩」——只有 je／tu 這兩格會撞，其餘全部不一樣（il suit ≠ il est）"
 },
 {
  "id": "L28_Je_te_suis",
  "lesson": 28,
  "fr": "Je te suis.",
  "zh": "我追蹤你。／我跟著你。",
  "note": "⭐ 社群語境就是 follow。⚠️ 跟 s'abonner à 的差別見下方詞彙表"
 },
 {
  "id": "L28_C_est_vrai_ce_qu_on_raco",
  "lesson": 28,
  "fr": "C'est vrai ce qu'on raconte ?",
  "zh": "大家在傳的是真的嗎？",
  "note": "⭐ ＝ les gens（也可以是 quelqu'un）。⚠️ raconter＝講述、傳（故事、傳聞）"
 },
 {
  "id": "L28_Est_ce_qu_on_vous_a_déjà",
  "lesson": 28,
  "fr": "Est-ce qu'on vous a déjà parlé de la RoboCup ?",
  "zh": "有人跟你們講過 RoboCup 嗎？",
  "note": "⭐ ＝ quelqu'un——「有沒有人曾經…」"
 },
 {
  "id": "L28_On_a_gagné_quatre_compét",
  "lesson": 28,
  "fr": "On a gagné quatre compétitions.",
  "zh": "我們贏了四場比賽。",
  "note": "⭐ ＝ nous（說話者是隊上的人）"
 },
 {
  "id": "L28_On_est_entré_chez_moi_po",
  "lesson": 28,
  "fr": "On est entré chez moi pour voler mon ordinateur.",
  "zh": "有人闖進我家偷走我的電腦。",
  "note": "⭐ ＝ quelqu'un。⚠️ chez moi 已經標明是「我家」，所以 on 不可能是「我們」"
 },
 {
  "id": "L28_L_année_dernière_on_est",
  "lesson": 28,
  "fr": "L'année dernière, on est allés à la RoboCup.",
  "zh": "去年我們去了 RoboCup。",
  "note": "⭐⭐ ＝ nous。⚠️ 看得出來的線索是 allés 加了 s——on 當「我們」用時，分詞可以跟著複數配合"
 },
 {
  "id": "L28_Mon_téléphone_n_a_plus_d",
  "lesson": 28,
  "fr": "Mon téléphone n'a plus de batterie, il va s'éteindre.",
  "zh": "我手機沒電了，它要關機了。",
  "note": "⭐ ne … plus de＝不再有（否定的 de）；s'éteindre＝（自己）熄掉、關機"
 },
 {
  "id": "L28_Je_n_ai_pas_de_photo_de",
  "lesson": 28,
  "fr": "Je n'ai pas de photo de toi et moi, on fait un selfie ?",
  "zh": "我沒有我們兩個的照片，我們拍張自拍？",
  "note": "⭐ 這個 on ＝ nous（本課主文法②）"
 },
 {
  "id": "L28_Je_t_ai_appelé_trois_foi",
  "lesson": 28,
  "fr": "Je t'ai appelé trois fois mais tu n'as pas décroché.",
  "zh": "我打給你三次但你都沒接。",
  "note": "⭐ décrocher＝把話筒拿起來＝接電話"
 },
 {
  "id": "L28_Je_ne_suis_pas_joignable",
  "lesson": 28,
  "fr": "Je ne suis pas joignable du 7 au 27 août.",
  "zh": "我8月7日到27日聯絡不上。",
  "note": "🎙 老師說法國人放假時常這樣講（自動回覆／留言）。⭐ du … au …＝從…到…"
 },
 {
  "id": "L28_Je_te_suis_sur_Instagram",
  "lesson": 28,
  "fr": "Je te suis sur Instagram.",
  "zh": "我在 IG 上追蹤你。",
  "note": "⭐ suivre 講的是動作：我去按了追蹤"
 },
 {
  "id": "L28_Je_suis_abonné_à_sa_chaî",
  "lesson": 28,
  "fr": "Je suis abonné à sa chaîne.",
  "zh": "我訂閱了他的頻道。",
  "note": "⭐ être abonné à 講的是狀態：我現在是訂閱者。⚠️ 這個字也用在付費的：Je suis abonné à la salle de sport.（我辦了健身房會員）"
 },
 {
  "id": "L28_Internet_marche_mal_je_n",
  "lesson": 28,
  "fr": "Internet marche mal, je n'arrive pas à me connecter.",
  "zh": "網路很差，我連不上。",
  "note": "⭐⭐ ne pas arriver à ＋ 原形＝做不到、沒辦法（超高頻）；marcher＝運作（機器）"
 },
 {
  "id": "L28_Cette_application_semble",
  "lesson": 28,
  "fr": "Cette application semble géniale, je vais la télécharger.",
  "zh": "這個 app 看起來超讚，我要下載它。",
  "note": "⭐ sembler ＋ 形容詞＝看起來…（＝avoir l'air，第27課）"
 },
 {
  "id": "L28_On_l_utilise_pour_trouve",
  "lesson": 28,
  "fr": "On l'utilise pour trouver son chemin.",
  "zh": "我們用它來找路。",
  "note": "⭐ utiliser qqch pour ＋ 原形"
 },
 {
  "id": "L28_Ça_permet_d_identifier_l",
  "lesson": 28,
  "fr": "Ça permet d'identifier le visage des personnes.",
  "zh": "這能夠辨識人臉。",
  "note": "⭐ permettre de ＋ 原形＝讓…得以…（第27課出現過）"
 },
 {
  "id": "L28_On_s_en_sert_pour_fabriq",
  "lesson": 28,
  "fr": "On s'en sert pour fabriquer de petits objets.",
  "zh": "我們用它來做小東西。",
  "note": "⭐⭐ s'en servir＝用它（en 是第21課的代名詞）。⚠️ de petits objets——形容詞在前面，des 縮成 de（第22課）"
 },
 {
  "id": "L28_Il_a_fait_sensation_avec",
  "lesson": 28,
  "fr": "Il a fait sensation avec ses messages depuis les étoiles.",
  "zh": "他從星星那邊發的訊息造成了轟動。",
  "note": "⭐ faire sensation＝造成轟動（整塊記）；depuis 這裡是「從…（地點）」，不是時間"
 },
 {
  "id": "L28_Il_n_a_pas_déçu_son_mill",
  "lesson": 28,
  "fr": "Il n'a pas déçu son million d'abonnés.",
  "zh": "他沒有讓他的一百萬名追蹤者失望。",
  "note": "⭐⭐ un abonné＝訂閱者／追蹤者（就是上面詞彙表的 s'abonner）；décevoir→過去分詞 déçu（失望）"
 },
 {
  "id": "L28_avec_déjà_une_vingtaine",
  "lesson": 28,
  "fr": "avec déjà une vingtaine de tweets, en français et en anglais",
  "zh": "已經發了二十來則推特，法文跟英文都有",
  "note": "⭐ une vingtaine de＝二十來個。同型：une dizaine（十來個）、une centaine（一百來個）"
 },
 {
  "id": "L28_On_rêve_de_battre_l_équi",
  "lesson": 28,
  "fr": "On rêve de battre l'équipe humaine championne du monde.",
  "zh": "我們夢想打敗人類的世界冠軍隊。",
  "note": "⭐⭐ rêver de ＋ 原形＝夢想做…；battre＝打敗。這個 on ＝ nous"
 },
 {
  "id": "L28_J_espère_que_la_France_g",
  "lesson": 28,
  "fr": "J'espère que la France gagnera.",
  "zh": "我希望法國會贏。",
  "note": "⭐⭐ espérer que ＋ 未來式——⚠️ 期望的是還沒發生的事，所以後面接未來式，這是本課文法的實際用途"
 },
 {
  "id": "L28_En_2050_on_espère_qu_ils",
  "lesson": 28,
  "fr": "En 2050, on espère qu'ils seront très performants.",
  "zh": "2050年，希望它們會非常強。",
  "note": "⭐ performant＝性能好的、表現強的（機器、公司都能用）"
 },
 {
  "id": "L28_Demain_je_vais_essayer_d",
  "lesson": 28,
  "fr": "Demain, je vais essayer de passer une journée sans portable.",
  "zh": "明天我要試著過一天不帶手機的日子。",
  "note": "⭐ essayer de ＋ 原形（課文用過）"
 },
 {
  "id": "L28_On_dit_que_c_est_diffici",
  "lesson": 28,
  "fr": "On dit que c'est difficile, mais on ne sait jamais.",
  "zh": "大家都說很難，但誰知道呢。",
  "note": "⭐⭐ 第一個 on＝les gens（大家），第二個 on 也是泛指。on ne sait jamais＝很難說（固定說法）"
 },
 {
  "id": "L28_Si_je_me_perds_demain_je",
  "lesson": 28,
  "fr": "Si je me perds demain, je demanderai mon chemin à quelqu'un.",
  "zh": "如果我明天迷路，我會跟人問路。",
  "note": "⭐⭐ 第三式（現在＋未來）。⚠️ 主詞是 je，所以是 mon chemin"
 },
 {
  "id": "L28_Si_vous_faites_la_même_c",
  "lesson": 28,
  "fr": "Si vous faites la même chose, ne prenez pas votre chargeur !",
  "zh": "如果你們也要這樣做，別帶充電器！",
  "note": "⭐ 第二式（現在＋命令，而且是否定命令）。un chargeur＝充電器（charger＝充電）"
 },
 {
  "id": "L28_Comme_ça_si_quelqu_un_m",
  "lesson": 28,
  "fr": "Comme ça, si quelqu'un m'appelle, je réponds quand même.",
  "zh": "這樣一來，如果有人打給我，我還是接得到。",
  "note": "⭐ comme ça＝這樣一來；quand même＝還是、仍然（口語超高頻）"
 },
 {
  "id": "L28_Le_matin_je_ne_me_connec",
  "lesson": 28,
  "fr": "Le matin, je ne me connecterai pas aux réseaux sociaux.",
  "zh": "早上我不會登入社群網站。",
  "note": "⭐⭐ 反身動詞的未來式＋否定：ne me connecterai pas；se connecter à 要接 à"
 },
 {
  "id": "L28_Si_tout_se_passe_bien_je",
  "lesson": 28,
  "fr": "Si tout se passe bien, je recommencerai le mois prochain.",
  "zh": "如果一切順利，我下個月會再來一次。",
  "note": "⭐⭐ 第三式。se passer＝（事情）發生、進行；recommencer＝重新開始"
 },
 {
  "id": "L28_Et_si_c_est_trop_dur_on",
  "lesson": 28,
  "fr": "Et si c'est trop dur, on verra bien.",
  "zh": "如果太難的話，再說吧。",
  "note": "⭐⭐ on verra＝到時候再說（口語固定句，這個 on ＝ nous／泛指都通）"
 },
 {
  "id": "L28_On_en_était_au_futur",
  "lesson": 28,
  "fr": "On en était au futur.",
  "zh": "我們上次講到未來式。",
  "note": "🎙 開場第一句。⭐ en être à＝進行到…（回到上次進度的固定說法）"
 },
 {
  "id": "L28_On_avait_vu_le_vocabulai",
  "lesson": 28,
  "fr": "On avait vu le vocabulaire.",
  "zh": "我們（那時）已經看過詞彙了。",
  "note": "🎙 ⚠️ avait vu 是 plus-que-parfait（B1 才正式學），現在只要聽得懂：比過去更早的過去"
 },
 {
  "id": "L28_Ça_veut_dire_quoi_suivre",
  "lesson": 28,
  "fr": "Ça veut dire quoi, suivre ?",
  "zh": "suivre 是什麼意思？",
  "note": "🎙 老師問生詞的固定問法。⭐ Owen 自己也要主動用這句"
 },
 {
  "id": "L28_Tu_sais_ce_que_c_est",
  "lesson": 28,
  "fr": "Tu sais ce que c'est ?",
  "zh": "你知道那是什麼嗎？",
  "note": "🎙 ce que＝間接問句裡的「什麼」"
 },
 {
  "id": "L28_Tu_peux_redire_la_phrase",
  "lesson": 28,
  "fr": "Tu peux redire la phrase ?",
  "zh": "你可以再說一次這句嗎？",
  "note": "🎙 redire＝再說一次（re- ＋ dire）。⭐ 也可以拿來請對方重講"
 },
 {
  "id": "L28_On_va_voir",
  "lesson": 28,
  "fr": "On va voir.",
  "zh": "我們來看看。",
  "note": "🎙 換到下一題時的固定句"
 },
 {
  "id": "L28_Très_très_bien",
  "lesson": 28,
  "fr": "Très très bien.",
  "zh": "非常好。",
  "note": "🎙 答對時的回應（老師習慣連講兩個 très）"
 },
 {
  "id": "L28_l_appel",
  "lesson": 28,
  "fr": "l'appel",
  "zh": "一通電話（名詞）",
  "note": "m.｜⚠️⚠️ 只有一個 l。跟動詞 j'appelle（兩個 l）不同——見下方拼字那一格"
 },
 {
  "id": "L28_le_selfie",
  "lesson": 28,
  "fr": "le selfie",
  "zh": "自拍",
  "note": "m.｜直接用英文字，法文照收"
 },
 {
  "id": "L28_le_smartphone",
  "lesson": 28,
  "fr": "le smartphone",
  "zh": "智慧型手機",
  "note": "m.｜也直接用英文字"
 },
 {
  "id": "L28_le_SMS_le_texto",
  "lesson": 28,
  "fr": "le SMS = le texto",
  "zh": "簡訊",
  "note": "m.｜⚠️ 走電信不走網路——沒有網路時還能用。法文兩個字通用"
 },
 {
  "id": "L28_le_téléphone_fixe",
  "lesson": 28,
  "fr": "le téléphone fixe",
  "zh": "市內電話、家用電話",
  "note": "m.｜fixe＝固定的（不會動的那支）"
 },
 {
  "id": "L28_le_téléphone_portable_le",
  "lesson": 28,
  "fr": "le téléphone portable = le portable",
  "zh": "手機",
  "note": "m.｜⭐ 法國人日常就只說 portable。⚠️ portable 也可以指筆電，靠上下文分"
 },
 {
  "id": "L28_contacter_quelqu_un",
  "lesson": 28,
  "fr": "contacter quelqu'un",
  "zh": "聯絡某人",
  "note": "⭐ 直接接人，不加介系詞（COD）"
 },
 {
  "id": "L28_appeler_quelqu_un",
  "lesson": 28,
  "fr": "appeler quelqu'un",
  "zh": "打電話給某人",
  "note": "⭐ 也是直接接人（COD）。⛔ 不說 appeler à quelqu'un"
 },
 {
  "id": "L28_téléphoner_à_quelqu_un",
  "lesson": 28,
  "fr": "téléphoner à quelqu'un",
  "zh": "打電話給某人",
  "note": "⚠️⚠️ 這個要加 à（COI）→ 代名詞用 lui / leur"
 },
 {
  "id": "L28_répondre_au_téléphone",
  "lesson": 28,
  "fr": "répondre au téléphone",
  "zh": "接電話",
  "note": "⚠️ répondre à（COI）→ Je vais lui répondre"
 },
 {
  "id": "L28_décrocher_raccrocher",
  "lesson": 28,
  "fr": "décrocher ≠ raccrocher",
  "zh": "接起 ≠ 掛斷",
  "note": "⭐ 字根 crochet＝掛鉤（老式電話掛在鉤子上）：dé-＝拿下來、r(a)-＝掛回去"
 },
 {
  "id": "L28_allumer_éteindre",
  "lesson": 28,
  "fr": "allumer ≠ éteindre",
  "zh": "開機 ≠ 關機",
  "note": "⚠️⚠️ 這一組只用在電、燈、機器；門窗是 ouvrir / fermer，不能混用"
 },
 {
  "id": "L28_être_joignable",
  "lesson": 28,
  "fr": "être joignable",
  "zh": "聯絡得上",
  "note": "⭐ 來自 joindre qqn（聯絡到某人）。⚠️ 跟 rejoindre（去跟某人會合）同字根"
 },
 {
  "id": "L28_le_PC_l_ordinateur",
  "lesson": 28,
  "fr": "le PC = l'ordinateur",
  "zh": "電腦",
  "note": "m.｜⭐ 口語常說 l'ordi（縮寫）"
 },
 {
  "id": "L28_l_écran",
  "lesson": 28,
  "fr": "l'écran",
  "zh": "螢幕",
  "note": "m.｜⭐ le grand écran＝電影（大銀幕）、le petit écran＝電視。老師特地補的"
 },
 {
  "id": "L28_le_clavier",
  "lesson": 28,
  "fr": "le clavier",
  "zh": "鍵盤",
  "note": "m.｜字根 la clé（鍵）"
 },
 {
  "id": "L28_la_souris",
  "lesson": 28,
  "fr": "la souris",
  "zh": "滑鼠",
  "note": "f.｜⚠️⚠️ 跟英文一樣是「老鼠」。而且 Souris ! 也是 sourire（微笑）的命令式——同形不同字"
 },
 {
  "id": "L28_l_imprimante",
  "lesson": 28,
  "fr": "l'imprimante",
  "zh": "印表機",
  "note": "f.｜動詞是 imprimer（列印）"
 },
 {
  "id": "L28_la_clé_USB",
  "lesson": 28,
  "fr": "la clé USB",
  "zh": "隨身碟",
  "note": "f.｜⚠️ 台灣人講「USB」，法文是 clé USB（USB 鑰匙）。英文是 flash drive"
 },
 {
  "id": "L28_l_appli_cation",
  "lesson": 28,
  "fr": "l'appli(cation)",
  "zh": "app、應用程式",
  "note": "f.。⭐ 口語就說 appli"
 },
 {
  "id": "L28_le_site_Internet",
  "lesson": 28,
  "fr": "le site Internet",
  "zh": "網站",
  "note": ""
 },
 {
  "id": "L28_se_connecter_se_déconnec",
  "lesson": 28,
  "fr": "se connecter ≠ se déconnecter",
  "zh": "登入 ≠ 登出",
  "note": "⭐ 反身動詞：je me connecte"
 },
 {
  "id": "L28_s_abonner_se_désabonner",
  "lesson": 28,
  "fr": "s'abonner ≠ se désabonner",
  "zh": "訂閱／追蹤 ≠ 取消訂閱",
  "note": "⭐ 名詞 un abonnement＝訂閱、會員資格（健身房、電信、電子報都用）"
 },
 {
  "id": "L28_en_ligne",
  "lesson": 28,
  "fr": "en ligne",
  "zh": "線上（online）",
  "note": "⚠️⚠️ 不是「排隊」——排隊是 faire la queue（la queue＝尾巴，人排成一條尾巴）"
 },
 {
  "id": "L28_envoyer_un_courriel",
  "lesson": 28,
  "fr": "envoyer un courriel",
  "zh": "寄一封電子郵件",
  "note": "⭐ le courriel ＝ courrier électronique（法文自己造的字）；le mail / l'e-mail 也通用"
 },
 {
  "id": "L28_télécharger_un_document",
  "lesson": 28,
  "fr": "télécharger un document, une vidéo, une photo",
  "zh": "下載檔案／影片／照片",
  "note": "⚠️ un document 這裡是檔案（file）"
 },
 {
  "id": "L28_faire_une_visio_conféren",
  "lesson": 28,
  "fr": "faire une visio(conférence)",
  "zh": "視訊通話／視訊會議",
  "note": "⭐ 口語 on s'appelle en visio＝我們視訊"
 },
 {
  "id": "L28_réseaux_sociaux",
  "lesson": 28,
  "fr": "réseaux sociaux",
  "zh": "複數兩個字都要變",
  "note": "⚠️ réseau→réseaux（-eau 加 x，不是 s）、social→sociaux（-al→-aux）。老師拿 cheval→chevaux 做對照"
 },
 {
  "id": "L29_J_ai_aussi_une_grande_qu",
  "lesson": 29,
  "fr": "J'ai aussi une grande quantité d'herbes aromatiques.",
  "zh": "我也有很大量的香草。",
  "note": "⭐ les herbes aromatiques＝香草（herbe＝草、aromatique＝有香氣的）"
 },
 {
  "id": "L29_Je_cuisine_mes_légumes_a",
  "lesson": 29,
  "fr": "Je cuisine mes légumes avec les œufs de mon poulailler.",
  "zh": "我用自家雞舍的蛋來煮我的菜。",
  "note": "⭐ le poulailler＝雞舍（le poulet＝雞 → 雞住的地方）"
 },
 {
  "id": "L29_Mon_propre_mug",
  "lesson": 29,
  "fr": "Mon propre mug.",
  "zh": "我自己的杯子。",
  "note": "⭐ 形容詞在前 → 「自己的」"
 },
 {
  "id": "L29_Mon_mug_est_propre",
  "lesson": 29,
  "fr": "Mon mug est propre.",
  "zh": "我的杯子是乾淨的。",
  "note": "⭐ 形容詞在後 → 「乾淨的」。⚠️ 同一個字、位置決定意思，跟第22課完全同一條規則"
 },
 {
  "id": "L29_J_en_ai_pas",
  "lesson": 29,
  "fr": "J'en ai pas.",
  "zh": "我沒有。（口語）",
  "note": "⚠️⚠️ 課本 Attention：口語常把 ne 吃掉，變成 j'en ai pas。⭐ 老師強調：ne 才是真正的否定（pas 可以換成 rien／personne／jamais），但講話時反而是 ne 消失"
 },
 {
  "id": "L29_Se_laver_les_mains_Lavez",
  "lesson": 29,
  "fr": "Se laver les mains → Lavez-vous les mains !",
  "zh": "洗手 → 請洗手！",
  "note": "⭐⭐ 代名詞跑到動詞後面並用連字號接住"
 },
 {
  "id": "L29_Brossez_vous_les_dents_m",
  "lesson": 29,
  "fr": "Brossez-vous les dents, matin et soir !",
  "zh": "早晚刷牙！",
  "note": "⭐ 老師當堂補的（給客人的提醒）。se brosser les dents＝刷牙"
 },
 {
  "id": "L29_Dans_ce_restaurant_il_fa",
  "lesson": 29,
  "fr": "Dans ce restaurant, il faut réserver la table à l'avance.",
  "zh": "在這家餐廳，必須事先訂位。",
  "note": "⭐ il faut 直接接原形（⛔ 不加 de）；à l'avance＝事先（第28課的字）"
 },
 {
  "id": "L29_Il_est_défendu_de_boire",
  "lesson": 29,
  "fr": "Il est défendu de boire l'eau de ce robinet.",
  "zh": "禁止喝這個水龍頭的水。",
  "note": "⭐ le robinet＝水龍頭。⚠️ 老師的語感差別：défendu 比 interdit 軟一點——喝了會生病，但不會有人來抓你"
 },
 {
  "id": "L29_Sinon_vous_pouvez_prendr",
  "lesson": 29,
  "fr": "Sinon, vous pouvez prendre une amende.",
  "zh": "否則你可能會被罰款。",
  "note": "⭐⭐ sinon＝否則；une amende＝罰款。⚠️ 見下方發音警報：amende（罰款）跟 amande（杏仁）同音"
 },
 {
  "id": "L29_Chez_les_Pondu_il_est_né",
  "lesson": 29,
  "fr": "Chez les Pondu, il est nécessaire d'attendre les autres.",
  "zh": "在 Pondu 家，必須等別人。",
  "note": "⭐ 反過來就是把否定拿掉"
 },
 {
  "id": "L29_Il_ne_faut_pas_mettre_le",
  "lesson": 29,
  "fr": "Il ne faut pas mettre les coudes sur la table.",
  "zh": "不可以把手肘放在桌上。",
  "note": "⭐ le coude＝手肘。原文是 il faut mettre…（Dupon 家），反過來加 ne…pas"
 },
 {
  "id": "L29_Vous_ne_pouvez_pas_sorti",
  "lesson": 29,
  "fr": "Vous ne pouvez pas sortir de table quand vous voulez.",
  "zh": "不可以想離席就離席。",
  "note": "⭐ sortir de table＝離開餐桌（⚠️ 沒有冠詞，是固定說法）"
 },
 {
  "id": "L29_Je_fais_cuire_le_gâteau",
  "lesson": 29,
  "fr": "Je fais cuire le gâteau.",
  "zh": "我把蛋糕烤熟。",
  "note": "⭐⭐ 煮東西要用 faire cuire（讓它熟）。⛔ 不能說 je cuis le gâteau"
 },
 {
  "id": "L29_20_cl_de_lait",
  "lesson": 29,
  "fr": "20 cl de lait",
  "zh": "200 毫升的牛奶",
  "note": "⚠️⚠️ 法國用 cl（centilitre），台灣用 ml。換算：cl 後面加一個 0 就是 ml（20 cl＝200 ml）。還有 dl（décilitre）但少用"
 },
 {
  "id": "L29_la_crème_chantilly",
  "lesson": 29,
  "fr": "la crème chantilly",
  "zh": "打發鮮奶油",
  "note": "⚠️ Owen 問「chantilly 是什麼意思」→ 老師：沒有別的意思，法國人就這樣叫打發鮮奶油（可能來自一個舊品牌名）"
 },
 {
  "id": "L29_Le_dimanche_je_cuisine_p",
  "lesson": 29,
  "fr": "Le dimanche, je cuisine pour toute la famille.",
  "zh": "星期天我為全家人下廚。",
  "note": "⭐ le dimanche（加定冠詞）＝每個星期天"
 },
 {
  "id": "L29_Des_oignons_J_en_achète",
  "lesson": 29,
  "fr": "Des oignons ? J'en achète toujours une botte.",
  "zh": "洋蔥嗎？我總是買一把。",
  "note": "⭐⭐ en ＋ 量詞留在後面（une botte）"
 },
 {
  "id": "L29_De_la_farine_Il_m_en_fau",
  "lesson": 29,
  "fr": "De la farine ? Il m'en faut 500 grammes.",
  "zh": "麵粉嗎？我需要500公克。",
  "note": "⭐⭐ 精確數量：en ＋ 數字留下來。il me faut＝我需要"
 },
 {
  "id": "L29_À_la_maison_il_faut_lave",
  "lesson": 29,
  "fr": "À la maison, il faut laver les légumes avant de les couper.",
  "zh": "在家裡，切菜之前一定要先洗。",
  "note": "⭐ il faut ＋ 原形（不加 de）；avant de ＋ 原形＝在…之前"
 },
 {
  "id": "L29_Lavez_vous_les_mains_ava",
  "lesson": 29,
  "fr": "Lavez-vous les mains avant de commencer !",
  "zh": "開始之前先洗手！",
  "note": "⭐⭐ 反身動詞的肯定命令式：代名詞放後面並用連字號"
 },
 {
  "id": "L29_Il_est_interdit_de_touch",
  "lesson": 29,
  "fr": "Il est interdit de toucher au four quand il est chaud.",
  "zh": "烤箱燙的時候禁止碰它。",
  "note": "⭐ il est interdit de ＋ 原形；toucher à＝碰"
 },
 {
  "id": "L29_Mes_enfants_en_mangent_t",
  "lesson": 29,
  "fr": "Mes enfants en mangent toujours deux parts.",
  "zh": "我的小孩總是吃兩塊。",
  "note": "⭐⭐ en ＋ 數字：deux parts 留在後面。une part＝一塊（切開的）"
 },
 {
  "id": "L29_Ils_ne_doivent_pas_mange",
  "lesson": 29,
  "fr": "Ils ne doivent pas manger avant les autres.",
  "zh": "他們不可以比別人先吃。",
  "note": "⭐ 禁止：ne devoir pas ＋ 原形"
 },
 {
  "id": "L29_De_la_crème_chantilly_No",
  "lesson": 29,
  "fr": "De la crème chantilly ? Non merci, je n'en veux pas.",
  "zh": "鮮奶油嗎？不用了，謝謝，我不要。",
  "note": "⭐⭐ ⛔ 不能只說 je ne veux pas——vouloir 後面要有東西，所以用 en 收住"
 },
 {
  "id": "L29_Mais_le_café_lui_je_le_v",
  "lesson": 29,
  "fr": "Mais le café, lui, je le veux bien.",
  "zh": "但咖啡嘛，我倒是想要。",
  "note": "⭐⭐ 特定的那一樣東西 → 用 le 不是 en。跟上一句剛好成對比"
 },
 {
  "id": "L29_C_est_la_spécialité_de_l",
  "lesson": 29,
  "fr": "C'est la spécialité de la maison.",
  "zh": "這是本店的招牌菜。",
  "note": "🇫🇷 課本 Unité 6 的標語。⭐ 老師的用法更廣：去外婆家永遠想吃同一道，因為那是 sa spécialité"
 },
 {
  "id": "L29_Tu_comprends",
  "lesson": 29,
  "fr": "Tu comprends ?",
  "zh": "你懂嗎？",
  "note": "🎙 講完一個概念後的確認"
 },
 {
  "id": "L29_Je_vous_verse_un_verre_d",
  "lesson": 29,
  "fr": "Je vous verse un verre d'eau ?",
  "zh": "我幫你倒杯水好嗎？",
  "note": "🎙 老師用來示範 verser 的日常用法——不只用在食譜"
 },
 {
  "id": "L29_Préchauffez_le_four_à_20",
  "lesson": 29,
  "fr": "Préchauffez le four à 200°C.",
  "zh": "把烤箱預熱到200度。",
  "note": "⭐ pré-（預先）＋ chauffer（加熱）；le four＝烤箱"
 },
 {
  "id": "L29_Lavez_et_séchez_les_frui",
  "lesson": 29,
  "fr": "Lavez et séchez les fruits rouges.",
  "zh": "把紅色莓果洗淨擦乾。",
  "note": "laver＝洗、sécher＝弄乾（形容詞 sec＝乾的）"
 },
 {
  "id": "L29_Versez_la_pâte_sur_les_f",
  "lesson": 29,
  "fr": "Versez la pâte sur les fruits.",
  "zh": "把麵糊倒在水果上。",
  "note": "⭐⭐ verser＝倒；la pâte＝麵糊／麵團（見下方）"
 },
 {
  "id": "L29_Coupez_le_beurre_en_peti",
  "lesson": 29,
  "fr": "Coupez le beurre en petits morceaux et posez-les dessus.",
  "zh": "把奶油切成小塊放在上面。",
  "note": "⭐ couper en morceaux＝切成塊；dessus＝在上面。⚠️ posez-les＝命令式後接代名詞"
 },
 {
  "id": "L29_l_aubergine_f",
  "lesson": 29,
  "fr": "l'aubergine (f.)",
  "zh": "茄子",
  "note": ""
 },
 {
  "id": "L29_l_avocat_m",
  "lesson": 29,
  "fr": "l'avocat (m.)",
  "zh": "酪梨",
  "note": "⚠️ 同一個字也是律師——靠上下文分"
 },
 {
  "id": "L29_la_betterave",
  "lesson": 29,
  "fr": "la betterave",
  "zh": "甜菜根",
  "note": "⚠️ 台灣少見。紫紅色，甜的"
 },
 {
  "id": "L29_la_carotte",
  "lesson": 29,
  "fr": "la carotte",
  "zh": "胡蘿蔔",
  "note": ""
 },
 {
  "id": "L29_le_céleri",
  "lesson": 29,
  "fr": "le céleri",
  "zh": "芹菜",
  "note": ""
 },
 {
  "id": "L29_la_courge",
  "lesson": 29,
  "fr": "la courge",
  "zh": "瓜類（總稱）",
  "note": "⭐ 老師：courge 是一整個家族，la courgette（櫛瓜）只是其中一種"
 },
 {
  "id": "L29_l_endive_f",
  "lesson": 29,
  "fr": "l'endive (f.)",
  "zh": "苦苣",
  "note": "⚠️⚠️ 老師強調很苦，台灣沒吃過。法國人常在裡面夾東西吃"
 },
 {
  "id": "L29_le_navet",
  "lesson": 29,
  "fr": "le navet",
  "zh": "蕪菁（白蘿蔔那類）",
  "note": "⚠️ 台灣少見"
 },
 {
  "id": "L29_l_oignon_m",
  "lesson": 29,
  "fr": "l'oignon (m.)",
  "zh": "洋蔥",
  "note": ""
 },
 {
  "id": "L29_le_poireau",
  "lesson": 29,
  "fr": "le poireau",
  "zh": "韭蔥",
  "note": "⚠️⚠️ 台灣沒有。長得像超長超粗的蔥"
 },
 {
  "id": "L29_le_radis",
  "lesson": 29,
  "fr": "le radis",
  "zh": "小蘿蔔",
  "note": "⭐ 台灣叫櫻桃蘿蔔。老師：法國人不煮它，洗一洗沾奶油生吃"
 },
 {
  "id": "L29_la_farine",
  "lesson": 29,
  "fr": "la farine",
  "zh": "麵粉",
  "note": ""
 },
 {
  "id": "L29_les_lentilles_f",
  "lesson": 29,
  "fr": "les lentilles (f.)",
  "zh": "扁豆",
  "note": "⚠️ 台灣少見。légume sec＝乾豆類"
 },
 {
  "id": "L29_les_pois_chiches_m",
  "lesson": 29,
  "fr": "les pois chiches (m.)",
  "zh": "鷹嘴豆",
  "note": "⭐ 中東餐廳的 falafel、鷹嘴豆泥就是它"
 },
 {
  "id": "L29_le_riz",
  "lesson": 29,
  "fr": "le riz",
  "zh": "米、飯",
  "note": "⭐ 老師：le riz 是 céréale（穀類），跟麵粉同一組"
 },
 {
  "id": "L29_la_semoule",
  "lesson": 29,
  "fr": "la semoule",
  "zh": "粗麥（庫斯庫斯的原料）",
  "note": "🇫🇷 le couscous＝北非小米飯，UNESCO 非物質文化遺產，也是法國人最愛的菜之一"
 },
 {
  "id": "L29_l_amande_f",
  "lesson": 29,
  "fr": "l'amande (f.)",
  "zh": "杏仁",
  "note": "⚠️⚠️ 跟 une amende（罰款）同音——見下方發音警報"
 },
 {
  "id": "L29_la_banane",
  "lesson": 29,
  "fr": "la banane",
  "zh": "香蕉",
  "note": ""
 },
 {
  "id": "L29_la_framboise",
  "lesson": 29,
  "fr": "la framboise",
  "zh": "覆盆子",
  "note": ""
 },
 {
  "id": "L29_la_groseille",
  "lesson": 29,
  "fr": "la groseille",
  "zh": "紅醋栗",
  "note": "⚠️ 台灣少見。食譜裡拿來裝飾"
 },
 {
  "id": "L29_le_kiwi",
  "lesson": 29,
  "fr": "le kiwi",
  "zh": "奇異果",
  "note": ""
 },
 {
  "id": "L29_la_mûre",
  "lesson": 29,
  "fr": "la mûre",
  "zh": "黑莓",
  "note": "⚠️⚠️ 跟 la myrtille（藍莓）最容易混。老師：這些莓果多半是在森林裡找到的"
 },
 {
  "id": "L29_la_myrtille",
  "lesson": 29,
  "fr": "la myrtille",
  "zh": "藍莓",
  "note": ""
 },
 {
  "id": "L29_la_poire",
  "lesson": 29,
  "fr": "la poire",
  "zh": "西洋梨",
  "note": ""
 },
 {
  "id": "L29_la_prune",
  "lesson": 29,
  "fr": "la prune",
  "zh": "李子",
  "note": ""
 },
 {
  "id": "L29_les_crevettes_f",
  "lesson": 29,
  "fr": "les crevettes (f.)",
  "zh": "蝦",
  "note": "⭐ les fruits de mer＝海鮮（第22課出現過）"
 },
 {
  "id": "L29_la_cannelle",
  "lesson": 29,
  "fr": "la cannelle",
  "zh": "肉桂",
  "note": ""
 },
 {
  "id": "L29_la_coriandre",
  "lesson": 29,
  "fr": "la coriandre",
  "zh": "香菜",
  "note": "⭐ 老師跟 Owen 都不愛。⚠️ 拼字：coriandre"
 },
 {
  "id": "L29_le_cumin",
  "lesson": 29,
  "fr": "le cumin",
  "zh": "孜然",
  "note": ""
 },
 {
  "id": "L29_le_curcuma",
  "lesson": 29,
  "fr": "le curcuma",
  "zh": "薑黃",
  "note": ""
 },
 {
  "id": "L29_le_gingembre",
  "lesson": 29,
  "fr": "le gingembre",
  "zh": "薑",
  "note": ""
 },
 {
  "id": "L29_la_menthe",
  "lesson": 29,
  "fr": "la menthe",
  "zh": "薄荷",
  "note": ""
 },
 {
  "id": "L29_la_muscade",
  "lesson": 29,
  "fr": "la muscade",
  "zh": "肉豆蔻",
  "note": ""
 },
 {
  "id": "L29_le_safran",
  "lesson": 29,
  "fr": "le safran",
  "zh": "番紅花",
  "note": "🇫🇷 最貴的香料。老師提到台北101旁邊有間印度餐廳就叫這個名字"
 },
 {
  "id": "L29_une_barquette_de",
  "lesson": 29,
  "fr": "une barquette de",
  "zh": "一小盒（塑膠盒）",
  "note": "framboises、fraises（軟的莓果）"
 },
 {
  "id": "L29_une_botte_de",
  "lesson": 29,
  "fr": "une botte de",
  "zh": "一把（綁起來的）",
  "note": "oignons、carottes、radis"
 },
 {
  "id": "L29_un_bouquet_de",
  "lesson": 29,
  "fr": "un bouquet de",
  "zh": "一束",
  "note": "menthe、coriandre（香草）"
 },
 {
  "id": "L29_une_boule_de",
  "lesson": 29,
  "fr": "une boule de",
  "zh": "一球",
  "note": "glace（冰淇淋）"
 },
 {
  "id": "L29_une_feuille_de",
  "lesson": 29,
  "fr": "une feuille de",
  "zh": "一片葉子",
  "note": "menthe"
 },
 {
  "id": "L29_une_pincée_de",
  "lesson": 29,
  "fr": "une pincée de",
  "zh": "一撮",
  "note": "sel、poivre"
 },
 {
  "id": "L29_une_tablette_de",
  "lesson": 29,
  "fr": "une tablette de",
  "zh": "一片（板狀）",
  "note": "chocolat。⭐ 老師：法國人也用 tablette 講腹肌"
 },
 {
  "id": "L29_un_pot_de",
  "lesson": 29,
  "fr": "un pot de",
  "zh": "一罐／一盒",
  "note": "crème、yaourt"
 },
 {
  "id": "L29_ajouter",
  "lesson": 29,
  "fr": "ajouter",
  "zh": "加",
  "note": ""
 },
 {
  "id": "L29_couper_en_morceaux",
  "lesson": 29,
  "fr": "couper (en morceaux)",
  "zh": "切（成塊）",
  "note": ""
 },
 {
  "id": "L29__faire_cuire",
  "lesson": 29,
  "fr": "(faire) cuire",
  "zh": "烹煮",
  "note": "⚠️⚠️ 一定要 faire cuire，不然煮的是你自己"
 },
 {
  "id": "L29_laver",
  "lesson": 29,
  "fr": "laver",
  "zh": "洗",
  "note": ""
 },
 {
  "id": "L29_mélanger",
  "lesson": 29,
  "fr": "mélanger",
  "zh": "混合",
  "note": ""
 },
 {
  "id": "L29_mettre_au_four_enfourner",
  "lesson": 29,
  "fr": "mettre au four = enfourner",
  "zh": "送進烤箱",
  "note": "⭐ 兩種說法都要認得"
 },
 {
  "id": "L29_préchauffer_le_four",
  "lesson": 29,
  "fr": "préchauffer le four",
  "zh": "預熱烤箱",
  "note": ""
 },
 {
  "id": "L29_préparer",
  "lesson": 29,
  "fr": "préparer",
  "zh": "準備",
  "note": ""
 },
 {
  "id": "L29__laisser_refroidir",
  "lesson": 29,
  "fr": "(laisser) refroidir",
  "zh": "（讓它）冷卻",
  "note": ""
 },
 {
  "id": "L29_servir",
  "lesson": 29,
  "fr": "servir",
  "zh": "上桌、端出",
  "note": ""
 },
 {
  "id": "L29_sortir_du_four",
  "lesson": 29,
  "fr": "sortir du four",
  "zh": "從烤箱拿出來",
  "note": ""
 },
 {
  "id": "L29_verser",
  "lesson": 29,
  "fr": "verser",
  "zh": "倒",
  "note": "⭐ 也用在倒飲料：Je vous verse un verre d'eau ?"
 },
 {
  "id": "L30_Vous_ne_devez_pas_être_c",
  "lesson": 30,
  "fr": "Vous ne devez pas être cuisinier ou cuisinière de métier.",
  "zh": "你不可以是職業廚師。",
  "note": "⭐⭐ de métier＝以…為職業的（＝professionnel，第29課的字）。⚠️ 這是整份規範的第一條：Locmiam 只給業餘的人用"
 },
 {
  "id": "L30_Utilisez_toujours_de_l_e",
  "lesson": 30,
  "fr": "Utilisez toujours de l'eau potable.",
  "zh": "請永遠使用可飲用水。",
  "note": "⭐ potable＝可飲用的（drinkable）。命令式肯定句"
 },
 {
  "id": "L30_Oui_je_m_engage_à_respec",
  "lesson": 30,
  "fr": "Oui, je m'engage à respecter la charte Locmiam.",
  "zh": "是的，我承諾遵守 Locmiam 規範。",
  "note": "⭐ 表單最後的勾選句；s'engager à ＋ 原形＝承諾做…"
 },
 {
  "id": "L30_poils",
  "lesson": 30,
  "fr": "poils",
  "zh": "（動物的）毛",
  "note": "⚠️⚠️ 人的頭髮是 cheveux，但動物的毛（包括貓狗）一律叫 poils，不能說 cheveux de chat。⛔ 這是老師當堂糾正的：poils 也用在人的體毛，但頭髮永遠是 cheveux"
 },
 {
  "id": "L30_horaire_d_ouverture_de_8",
  "lesson": 30,
  "fr": "horaire d'ouverture de 8h à 12h",
  "zh": "營業時間 8點到12點",
  "note": "⭐ l'horaire＝時間、時刻表（和 l'heure 不同，horaire 講的是一個時段安排）"
 },
 {
  "id": "L30_le_tartare_de_bœuf_d_alg",
  "lesson": 30,
  "fr": "le tartare (de bœuf, d'algues, etc.)",
  "zh": "韃靼（生牛肉、生海藻等）",
  "note": "⭐⭐ 生食料理，跟法式食物「生食」文化有關；⚠️ 不是台灣說的「塔塔醬」（tartare sauce 是另一種東西，老師確認兩者不同）"
 },
 {
  "id": "L30_la_moutarde_de_Dijon",
  "lesson": 30,
  "fr": "la moutarde de Dijon",
  "zh": "第戎芥末醬",
  "note": "🇫🇷 老師補充：Dijon 是法國一座以芥末聞名的城市"
 },
 {
  "id": "L30_le_vinaigre",
  "lesson": 30,
  "fr": "le vinaigre",
  "zh": "醋",
  "note": "⭐ vinaigrette＝油醋醬（vinaigre＝醋 ＋ -ette）。老師示範了一款薯片沾醬：橄欖油＋鹽＋薑＋balsamique（巴薩米克醋）"
 },
 {
  "id": "L30_C_est_plus_cher_en_Franc",
  "lesson": 30,
  "fr": "C'est plus cher en France, mais c'est plus healthy.",
  "zh": "在法國比較貴，但比較健康。",
  "note": "🎙 老師的個人觀察對照：台灣的麥當勞是全世界最便宜的之一；法國一個人吃麥當勞可能要台幣五、六百元"
 },
 {
  "id": "L30_Le_colombo_c_est_la_spéc",
  "lesson": 30,
  "fr": "Le colombo, c'est la spécialité de la maison.",
  "zh": "colombo 是本店招牌菜。",
  "note": "⭐ la spécialité de la maison＝本店招牌（也可以說 spécialité du restaurant）。老師的延伸用法：去外婆家永遠想吃同一道菜，因為那是 sa spécialité（她的拿手菜）——不限於餐廳"
 },
 {
  "id": "L30_Ce_chef_n_a_eu_que_de_bo",
  "lesson": 30,
  "fr": "Ce chef n'a eu que de bonnes critiques.",
  "zh": "這位主廚只得到好評。",
  "note": "課本第3b題答案。⭐ une critique 在法文可以是正面的，不像英文 criticism 偏負面——老師特別點出這個假朋友；n'a eu 是 avoir 的 passé composé"
 },
 {
  "id": "L30_Vous_avez_déjà_fait_un_r",
  "lesson": 30,
  "fr": "Vous avez déjà fait un régime ? — Je n'en ai jamais fait.",
  "zh": "你曾經節食過嗎？——我從來沒節食過。",
  "note": "⭐ un régime＝節食計畫（不是「政權」，這裡是飲食語境）；ne...jamais＝從來不"
 },
 {
  "id": "L30_gastronomique",
  "lesson": 30,
  "fr": "gastronomique",
  "zh": "美食的、頂級料理的",
  "note": "⭐⭐ 拆成兩半：gastro-＝胃、腹部相關（跟英文 gastric 同源）＋ -nomique＝知識、規律（跟 loi／connaissance 同源，如同 économique 裡的 -nomique）。老師的講法：「胃的知識」——很懂吃的學問"
 },
 {
  "id": "L30_Près_de_chez_moi_il_y_a",
  "lesson": 30,
  "fr": "Près de chez moi, il y a un petit bistrot que j'adore.",
  "zh": "我家附近有一間我很喜歡的小酒館。",
  "note": "⭐ près de chez moi＝在我家附近（Locmiam charte 的字）"
 },
 {
  "id": "L30_On_était_là_la_dernière",
  "lesson": 30,
  "fr": "On était là la dernière fois.",
  "zh": "我們上次講到這裡。",
  "note": "🎙 課堂開場、接續上次進度的固定句"
 },
 {
  "id": "L30_C_est_bon",
  "lesson": 30,
  "fr": "C'est bon ?",
  "zh": "可以嗎？／懂了嗎？",
  "note": "🎙 確認理解的口頭禪，跟第28、29課記過的 On est bon? 同一組"
 },
 {
  "id": "L30_le_bistrot_la_brasserie",
  "lesson": 30,
  "fr": "le bistrot = la brasserie",
  "zh": "小酒館＝啤酒館餐廳",
  "note": "⭐ 兩個字互為同義詞"
 },
 {
  "id": "L30_le_fast_food_la_restaura",
  "lesson": 30,
  "fr": "le fast-food = la restauration rapide",
  "zh": "速食",
  "note": "⭐ 老師補的正式說法：la restauration rapide"
 },
 {
  "id": "L30_le_restaurant_végan",
  "lesson": 30,
  "fr": "le restaurant végan",
  "zh": "全素餐廳",
  "note": "不含任何動物性成分"
 },
 {
  "id": "L30_le_restaurant_végétarien",
  "lesson": 30,
  "fr": "le restaurant végétarien",
  "zh": "素食餐廳",
  "note": ""
 },
 {
  "id": "L30_le_traiteur",
  "lesson": 30,
  "fr": "le traiteur",
  "zh": "外燴、私廚",
  "note": "⭐⭐ 老師解釋：不是在餐廳吃，是婚禮、活動這種在外面（例如城堡）辦桌時請人來做菜，中文最接近「私廚／外燴」"
 },
 {
  "id": "L30_à_emporter_sur_place",
  "lesson": 30,
  "fr": "à emporter ≠ sur place",
  "zh": "外帶 ≠ 內用",
  "note": "⭐⭐ 打電話訂餐或到店裡都可以用這組回答，對應台灣的「內用外帶」"
 },
 {
  "id": "L30_l_ambiance_f",
  "lesson": 30,
  "fr": "l'ambiance (f.)",
  "zh": "氣氛",
  "note": ""
 },
 {
  "id": "L30_commander_des_plats",
  "lesson": 30,
  "fr": "commander des plats",
  "zh": "點餐、訂餐",
  "note": ""
 },
 {
  "id": "L30_fait_maison",
  "lesson": 30,
  "fr": "fait maison",
  "zh": "自家製、手工做的",
  "note": "Locmiam charte 的核心詞"
 },
 {
  "id": "L30_la_nappe",
  "lesson": 30,
  "fr": "la nappe",
  "zh": "桌布",
  "note": "老師：bistrot 的招牌是紅白格子桌布（nappe à carreaux）"
 },
 {
  "id": "L30_le_pourboire",
  "lesson": 30,
  "fr": "le pourboire",
  "zh": "小費",
  "note": ""
 },
 {
  "id": "L30_le_serveur_la_serveuse",
  "lesson": 30,
  "fr": "le serveur, la serveuse",
  "zh": "服務生（男／女）",
  "note": ""
 },
 {
  "id": "L30_le_service",
  "lesson": 30,
  "fr": "le service",
  "zh": "服務",
  "note": ""
 },
 {
  "id": "L30_le_tablier",
  "lesson": 30,
  "fr": "le tablier",
  "zh": "圍裙",
  "note": "回鍋 Locmiam charte 的字"
 },
 {
  "id": "L30_acide",
  "lesson": 30,
  "fr": "acide",
  "zh": "酸",
  "note": ""
 },
 {
  "id": "L30_amer_amère",
  "lesson": 30,
  "fr": "amer, amère",
  "zh": "苦",
  "note": "陰陽性字尾不同（-er → -ère）"
 },
 {
  "id": "L30_épicé_e_pimenté_e",
  "lesson": 30,
  "fr": "épicé(e) = pimenté(e)",
  "zh": "辣、辛香",
  "note": "兩個同義字都要認得"
 },
 {
  "id": "L30_fade",
  "lesson": 30,
  "fr": "fade",
  "zh": "淡而無味",
  "note": "⭐ 老師：加鹽 (sel) 會讓食物從 fade 變 goûteux——fade 的反義字就是 goûteux，不是 salé"
 },
 {
  "id": "L30_goûteux_goûteuse",
  "lesson": 30,
  "fr": "goûteux, goûteuse",
  "zh": "有味道的、鮮美的",
  "note": ""
 },
 {
  "id": "L30_gras_grasse",
  "lesson": 30,
  "fr": "gras, grasse",
  "zh": "油、肥（食物）",
  "note": "⚠️ gros（人胖）跟 gras（食物油）是不同字，發音也不同，容易混——見下方發音警報"
 },
 {
  "id": "L30_déguster",
  "lesson": 30,
  "fr": "déguster",
  "zh": "細細品嚐",
  "note": "⭐⭐ 帶著享受、專注的心情小口吃／喝，課本定義：manger ou boire de petites quantités。老師：這個字英文沒有剛好對應的詞，最接近 savor"
 },
 {
  "id": "L30_grignoter",
  "lesson": 30,
  "fr": "grignoter",
  "zh": "正餐之間吃零食",
  "note": "⭐⭐ 課本原文（Au bistrot 課文註1）：manger un peu entre les repas——在早餐跟午餐、午餐跟晚餐之間吃一點"
 },
 {
  "id": "L30_se_régaler",
  "lesson": 30,
  "fr": "se régaler",
  "zh": "大快朵頤、吃得很滿足",
  "note": "⭐ un régal（名詞：一種享受）也是這課評論裡最常見的稱讚語"
 },
 {
  "id": "L30_gourmand_e",
  "lesson": 30,
  "fr": "gourmand(e)",
  "zh": "貪吃、愛吃（什麼都愛吃）",
  "note": "Une personne qui aime manger."
 },
 {
  "id": "L30_difficile",
  "lesson": 30,
  "fr": "difficile",
  "zh": "挑食、難搞",
  "note": "Une personne qui n'aime que très peu d'aliments.（⭐ 這句本身就是本課主文法 ne…que 的例句）"
 },
 {
  "id": "L30_végan_e",
  "lesson": 30,
  "fr": "végan(e)",
  "zh": "純素",
  "note": "Une personne qui ne mange pas de produits d'origine animale.（⚠️ 老師逐條確認：奶、蛋、起司全部不吃）"
 },
 {
  "id": "L30_allergique_à",
  "lesson": 30,
  "fr": "allergique (à…)",
  "zh": "對…過敏",
  "note": "Une personne intolérante à certains aliments."
 },
 {
  "id": "L30_gourmet",
  "lesson": 30,
  "fr": "gourmet",
  "zh": "美食家（講究吃）",
  "note": "Une personne qui aime surtout les plats très fins, la grande cuisine.（⚠️⚠️ 跟 gourmand 不一樣——gourmand 是「愛吃、吃很多」，gourmet 是「懂吃、挑精緻」）"
 },
 {
  "id": "L30_bleu",
  "lesson": 30,
  "fr": "bleu",
  "zh": "極生（幾乎不烤）",
  "note": "⭐ 老師補充：台灣餐廳習慣問「三分五分七分熟」，法式只分四級，bleu 比三分還生"
 },
 {
  "id": "L30_saignant_e",
  "lesson": 30,
  "fr": "saignant(e)",
  "zh": "三分熟（帶血）",
  "note": "字根 saigner＝流血"
 },
 {
  "id": "L30_à_point",
  "lesson": 30,
  "fr": "à point",
  "zh": "五分熟",
  "note": "法式牛排最常見的預設熟度"
 },
 {
  "id": "L30_bien_cuit_e",
  "lesson": 30,
  "fr": "bien cuit(e)",
  "zh": "全熟",
  "note": ""
 },
 {
  "id": "L30_le_bœuf_bourguignon",
  "lesson": 30,
  "fr": "le bœuf bourguignon",
  "zh": "紅酒燉牛肉",
  "note": "勃艮第名菜"
 },
 {
  "id": "L30_le_bouillon",
  "lesson": 30,
  "fr": "le bouillon",
  "zh": "高湯",
  "note": ""
 },
 {
  "id": "L30_la_choucroute",
  "lesson": 30,
  "fr": "la choucroute",
  "zh": "酸菜香腸鍋",
  "note": "見下方文化補充（阿爾薩斯）"
 },
 {
  "id": "L30_le_clafoutis",
  "lesson": 30,
  "fr": "le clafoutis",
  "zh": "水果烤蛋糕",
  "note": "第29課已學過完整食譜"
 },
 {
  "id": "L30_le_confit_de_canard",
  "lesson": 30,
  "fr": "le confit (de canard)",
  "zh": "油封（鴨腿）",
  "note": "第29課學過：用油慢煮再泡在油裡保存"
 },
 {
  "id": "L30_le_couscous",
  "lesson": 30,
  "fr": "le couscous",
  "zh": "庫斯庫斯（北非小米飯）",
  "note": "第29課提過：UNESCO 非物質文化遺產，法國人最愛的菜之一"
 },
 {
  "id": "L30_les_crêpes_f",
  "lesson": 30,
  "fr": "les crêpes (f.)",
  "zh": "可麗餅",
  "note": "布列塔尼特產"
 },
 {
  "id": "L30_le_flan",
  "lesson": 30,
  "fr": "le flan",
  "zh": "布丁",
  "note": ""
 },
 {
  "id": "L30_le_fondant_au_chocolat",
  "lesson": 30,
  "fr": "le fondant au chocolat",
  "zh": "熔岩巧克力蛋糕",
  "note": ""
 },
 {
  "id": "L30_le_gratin",
  "lesson": 30,
  "fr": "le gratin",
  "zh": "焗烤",
  "note": "⭐ 老師：只要上面加起司烤過的都算 gratin"
 },
 {
  "id": "L30_le_pâté",
  "lesson": 30,
  "fr": "le pâté",
  "zh": "肉醬、抹醬",
  "note": "bistrot 招牌前菜之一"
 },
 {
  "id": "L30_les_poireaux_vinaigrette",
  "lesson": 30,
  "fr": "les poireaux-vinaigrette",
  "zh": "油醋韭蔥",
  "note": "bistrot 經典冷盤，見文法補充「vinaigre／vinaigrette」"
 },
 {
  "id": "L30_le_pot_au_feu",
  "lesson": 30,
  "fr": "le pot-au-feu",
  "zh": "蔬菜燉牛肉湯",
  "note": "⚠️⚠️ 老師特別澄清：不是台灣的火鍋！湯裡有肉有菜，但吃法是撈出來放到盤子上吃，不是邊煮邊涮"
 },
 {
  "id": "L30_la_purée",
  "lesson": 30,
  "fr": "la purée",
  "zh": "馬鈴薯泥",
  "note": "常配 poulet rôti"
 },
 {
  "id": "L30_la_ratatouille",
  "lesson": 30,
  "fr": "la ratatouille",
  "zh": "普羅旺斯燉菜",
  "note": ""
 },
 {
  "id": "L30_les_saucisses_f",
  "lesson": 30,
  "fr": "les saucisses (f.)",
  "zh": "香腸",
  "note": "阿爾薩斯特產"
 },
 {
  "id": "L30_la_tartiflette",
  "lesson": 30,
  "fr": "la tartiflette",
  "zh": "馬鈴薯培根焗烤",
  "note": "山區菜，第29課例句出現過（tartiflette 裡的 crème fraîche）"
 },
 {
  "id": "L30_engagement",
  "lesson": 30,
  "fr": "engagement",
  "zh": "以為只有「訂婚」的意思",
  "note": "⚠️ un engagement 泛指任何「承諾、答應要做的事」（合約、菜單承諾都算），只有搭配婚姻語境時才特指訂婚／結婚承諾，今天 Locmiam charte 用的是廣義那個"
 }
];
