# D6：gender 題缺口盤點＋第 35、36 課候選（2026-09-25 清晨排程）

> 對應 `GAME_ROADMAP.md` 佇列 D6（＝AUDIT 的 P4 3/3）。⏸ **全部是候選，⛔ 沒有改 `questions.js`**。
> 盤點用 `tools/tmp_gender_gap.js` 跑（`node tools/tmp_gender_gap.js` 可重跑），數字是**粗估**，限制見第一節末。

---

## 零、先講三個跟預期不一樣的地方

1. **AUDIT 說「第 3、6、11、14、19 課沒有表格」，指的是 `table_drill.html` 的練習表，不是筆記。**
   筆記裡這五課都有表格（第 3 課 5 張、第 6 課 7 張、第 11 課 10 張、第 14 課 12 張、第 19 課 8 張），
   而且第 11、14、19 課的名詞表都很厚（30／32／18 列）。→ 那一條是 P5（填表擴表格）的事，**跟 gender 題無關**，不要混在一起。
   全部 36 課只有**第 2 課筆記沒有 `<table>`**。

2. ⚠️⚠️ **現有 51 題 gender 裡有 10 題在遊戲裡幾乎打不對**（B 類，排程不改，給互動 session）：
   `questions.js:80–84`（sport／musique／art／histoire／café）、`104–107`（France／Canada／Mexique／États-Unis）、`728`（vestiaire）
   的答案寫成 `陽性 → le sport`、`陰性 → en France` 這種**說明文字**。
   但 gender 在 `quest.html` 是打字題（「重擊」招式；沒有 `opts`），`typeCheck()`（`quest.html:3479`）用 `normAns()` 比對，
   `normAns` 只去掉重音／標點／大小寫，**不會去掉「陽性 →」**——Owen 打 `le sport` 會被判錯，要打出整串 `陽性 → le sport` 才算對。
   第一次錯會提示「開頭是：陽性…」，所以不是完全卡死，但體驗很怪。
   → 建議：把這 10 題的 `a` 改成只留冠詞＋名詞（`le sport`、`en France`），「陽性／陰性」移到 `aNote`；或在 `typeCheck` 比對前去掉 `/^.*→\s*/`。
   （本批候選的答案格式已經避開這個問題：答案只有冠詞或單字。）

3. **gender 題集中在第 1–5 課**（51 題裡 48 題在第 1–5、8 課，第 13 課 1 題），**第 6 課以後幾乎是零**——
   但第 11 課以後幾乎每課都有 20–60 列帶陰陽性的名詞。缺的不是來源，是沒人出題。

---

## 一、盤點表（課次 × 有沒有可長 gender 題的來源）

欄位：`表格`＝筆記裡 `<table>` 數；`名詞列`＝表格裡能判斷陰陽性的列（詞性欄寫 n.m./n.f.、標 (m.)/(f.)、或法文欄以 le／la／un／une 開頭）；`gender 題`＝`questions.js` 現有數。

| 課 | 表格 | 名詞列 | gender 題 | 判定 | 主題（能長什麼） |
|---|---|---|---|---|---|
| 1 | 1 | 0 | **17** | 已有 | 國籍形容詞陰性形 |
| 2 | 0 | 0 | **11** | 已有 | 名詞陰陽性、國家介系詞（⚠️ 9 題答案格式問題，見零之2） |
| 3 | 5 | 5 | **5** | 已有 | 職業陰性形 |
| 4 | 5 | 0 | **7** | 已有 | 顏色形容詞配合 |
| 5 | 4 | 6 | **7** | 已有 | 餐具、菜單 |
| 6 | 7 | 5 | 0 | 薄 | 交通工具（à pied／à vélo…，只有 5 個） |
| 7 | 4 | 3 | 0 | 薄 | 時間詞（semaine／week-end） |
| 8 | 3 | 0 | **3** | 已有 | beau／nouveau／ce 變化 |
| 9 | 3 | 0 | 0 | ⛔ 無來源 | 表格是動詞／文法 |
| 10 | 5 | 0 | 0 | ⛔ 無來源 | 表格是動詞／文法 |
| 11 | 10 | 30 | 0 | ⭐ 厚 | 房間、家電、家具 |
| 12 | 5 | 27 | 0 | ⭐ 厚 | 身體部位、看病 |
| 13 | 7 | 33 | **1** | ⭐ 厚 | 健身房、運動、住宿 |
| 14 | 12 | 32 | 0 | ⭐ 厚 | 鄉間、住宿、自然 |
| 15 | 14 | 26 | 0 | ⭐ 厚 | 自然、動物、肉類、學校 |
| 16 | 14 | 26 | 0 | ⭐ 厚 | 工作、⭐ 職業陰陽成對（boucher/bouchère、directeur/directrice、chef/cheffe） |
| 17 | 7 | 0 | 0 | ⛔ 無來源 | 表格是動詞／文法 |
| 18 | 8 | 9 | 0 | 薄 | 婚姻家庭 |
| 19 | 8 | 18 | 0 | 中 | 休閒景點、運動 |
| 20 | 13 | 24 | 0 | ⭐ 厚 | 回憶、食物、家 |
| 21 | 11 | 19 | 0 | 中 | 五感、景色 |
| 22 | 9 | 35 | 0 | ⭐ 厚 | 天氣、海邊／鄉間／山區 |
| 23 | 12 | 43 | 0 | ⭐ 厚 | 住宿、租屋、費用 |
| 24 | 13 | 37 | 0 | ⭐ 厚 | 考試、電視、運動、餐廳 |
| 25 | 12 | 27 | 0 | ⭐ 厚 | 家具、家電 |
| 26 | 12 | 20 | 0 | 中 | 臉、個性、動物 |
| 27 | 17 | 18 | 0 | 中 | 科技、未來 |
| 28 | 10 | 18 | 0 | 中 | 3C、網路 |
| 29 | 12 | 52 | 0 | ⭐⭐ 很厚 | 蔬果、香料、量詞 |
| 30 | 12 | 30 | 0 | ⭐ 厚 | 餐廳、法國菜 |
| 31 | 14 | 30 | 0 | ⭐ 厚 | 身體、睡眠、放鬆 |
| 32 | 16 | 52 | 0 | ⭐⭐ 很厚 | 病症、藥、急救、⭐ 職業成對（policier/policière、pompier/pompière） |
| 33 | 18 | 65 | 0 | ⭐⭐ 很厚（有重複列） | 媒體、新聞 |
| 34 | 12 | 28 | 0 | ⭐ 厚 | 廣播、podcast、電影 |
| 35 | 18 | 53 | 0 | ⭐⭐ 很厚 | 消費、二手、3C、手作 |
| 36 | 10 | 41 | 0 | ⭐ 厚 | 手作工具、互助、旅行 |

**小計**：已有 gender 題 7 課｜⛔ 無來源 3 課（9、10、17）｜薄（<10 列）3 課（6、7、18）｜**可以長題的 23 課**（11–16、19–36）。

⚠️ **這張表的限制**（腳本是 regex 粗估）：
- 會多算：幾列其實是**例句**被當成名詞（第 15、23、27 課有幾列以 Le／La／Un 開頭的句子）；第 33 課有同一個字在不同表重複出現。
- 會少算：只寫 `l'` 或 `les`、沒標 (m.)／(f.) 的名詞**看不出性別，不算**——這些剛好也是最不該拿來出題的（來源本身沒寫性別）。
- 會誤判：`la cave / le sous-sol` 這種一列兩個字只取第一個判斷。
→ 判定「厚／薄／無」的等級可信，精確數字不要引用。

### 建議的補題順序（依對 Owen 的價值）
1. **第 35、36 課**（最新，這次先出，見第二節）
2. **第 29、32 課**：很多 `l'` 開頭但筆記有標 (m.)／(f.) 的名詞（l'aubergine f.、l'avocat m.、l'oignon m.、l'asthme m.、l'antibiotique m.、l'allergie f.…）——冠詞把性別藏起來的字，最需要專門練
3. **第 16、32 課的職業成對**：可以沿用第 3 課「X → 女性形？」格式（`quest.html:1033` 對這個格式有特別處理）
4. **第 23、11、25 課**：住宿與家具，CLB 生活情境、口說 T2 會用到

---

## 二、第 35、36 課候選（20 題）

**出題原則**
- 只挑「**性別猜不到**」的字：`-e` 結尾卻是陽性（meuble、cadre）、母音開頭被 `l'` 藏起性別（herbe、argent、électroménager）、一字兩性別兩意思（une tour／un tour）、`-age`／`-ment` 陽性字尾規則。⛔ 不出 la table、la couleur 這種看字尾就知道的。
- 答案只寫冠詞（`le`／`la`／`un`／`une`）或一個形容詞，**避開零之2 的打字比對問題**；格式沿用 `questions.js:270–276`（第 5 課餐具）的 `_____ 名詞 (le / la)`。
- 母音開頭的字問「底層是 le 還是 la」，`aNote` 寫實際用法 `l'…`。
- 每題 `src` 欄是 `french_notes.html` 行號；性別是標準法文，筆記表格都有標冠詞或 (m.)／(f.)。⛔ 沒有自創法文句（唯一一句 `L'essence est très chère.` 是筆記裡老師的原句）。

```js
/* ── 第 36 課（11 題）── */
{ lesson:36, topic:'vocab-travail-manuel', type:'gender', q:'_____ meuble（一件家具）(le / la)', hint:'-e 結尾，但…', a:'le', aNote:'le meuble（m）。⚠️ -e 結尾不等於陰性', src:'french_notes.html:13263' },
{ lesson:36, topic:'vocab-travail-manuel', type:'gender', q:'_____ cadre（相框）(le / la)', hint:'-e 結尾，但…', a:'le', aNote:'le cadre（m）。框本身才是 cadre', src:'french_notes.html:13267' },
{ lesson:36, topic:'vocab-travail-manuel', type:'gender', q:'_____ outil（工具）(un / une)', hint:'母音開頭，用 un/une 才看得出來', a:'un', aNote:"un outil（m）→ l'outil、plein d'outils", src:'french_notes.html:13307' },
{ lesson:36, topic:'vocab-travail-manuel', type:'gender', q:'_____ pièce（零件）(le / la)', hint:'', a:'la', aNote:"la pièce（f）。同一個字也是硬幣、房間——三個意思都是陰性", src:'french_notes.html:13296' },
{ lesson:36, topic:'vocab-travail-manuel', type:'gender', q:'_____ herbe（草）→ 底層是 le 還是 la？', hint:"實際寫 l'herbe", a:'la', aNote:"l'herbe（f）。母音開頭的 l' 會把性別藏起來，要另外記", src:'french_notes.html:13314（另見 5874，第 20 課）' },
{ lesson:36, topic:'vocab-travail-manuel', type:'gender', q:'_____ entraide（互助）→ 底層是 le 還是 la？', hint:"實際寫 l'entraide", a:'la', aNote:"l'entraide（f）＝entre＋aide；l'aide 也是陰性", src:'french_notes.html:13363' },
{ lesson:36, topic:'vocab-travail-manuel', type:'gender', q:'L\'essence est très _____ (cher)', hint:"l'essence 是陽性還是陰性？", a:'chère', aNote:"l'essence（f）→ 形容詞配陰性 chère。🎙 老師原句", src:'french_notes.html:13372（另見 12106，第 33 課）' },
{ lesson:36, topic:'vocab-travail-manuel', type:'gender', q:'_____ déménagement（搬家）(le / la)', hint:'-ment 結尾', a:'le', aNote:'le déménagement（m）。⭐ -ment 結尾的名詞幾乎都是陽性', src:'french_notes.html:13366' },
{ lesson:36, topic:'vocab-travail-manuel', type:'gender', q:'_____ covoiturage（共乘）(le / la)', hint:'-age 結尾', a:'le', aNote:"le covoiturage（m）。⭐ -age 結尾大多陽性（le repassage）；⚠️ 例外要另記：la plage、la page、l'image（f）", src:'french_notes.html:13371' },
{ lesson:36, topic:'vocab-voyage-sur-mesure', type:'gender', q:'_____ devis（報價單）(le / la)', hint:'', a:'le', aNote:'le devis（m），單複數同形', src:'french_notes.html:13514' },
{ lesson:36, topic:'vocab-voyage-sur-mesure', type:'gender', q:'_____ orage（雷雨）(un / une)', hint:'-age 結尾', a:'un', aNote:"un orage（m）→ l'orage。跟 le covoiturage 同一條 -age 規則", src:'french_notes.html:13579（另見第 22 課 6582）' },

/* ── 第 35 課（9 題）── */
{ lesson:35, topic:'vocab-consommation', type:'gender', q:'_____ argent（錢）→ 底層是 le 還是 la？', hint:"實際寫 l'argent", a:'le', aNote:"l'argent（m）。⚠️ 也是「銀」", src:'french_notes.html:12937' },
{ lesson:35, topic:'vocab-consommation', type:'gender', q:'_____ alimentation（食品）→ 底層是 le 還是 la？', hint:'-tion 結尾', a:'la', aNote:"l'alimentation（f）。⭐ -tion 結尾一律陰性", src:'french_notes.html:12980' },
{ lesson:35, topic:'vocab-consommation', type:'gender', q:'_____ électroménager（家電）→ 底層是 le 還是 la？', hint:"實際寫 l'électroménager", a:'le', aNote:"l'électroménager（m）。家裡所有用電的東西（洗衣機、冰箱）", src:'french_notes.html:12981' },
{ lesson:35, topic:'vocab-consommation', type:'gender', q:'_____ occasion（二手品／機會）(un / une)', hint:'-sion 結尾', a:'une', aNote:"une occasion（f）→ l'occasion（Je saute sur l'occasion）", src:'french_notes.html:12735' },
{ lesson:35, topic:'vocab-consommation', type:'gender', q:'_____ défi（挑戰）(un / une)', hint:'', a:'un', aNote:'un défi（m）：le défi « Rien de neuf »', src:'french_notes.html:12732' },
{ lesson:35, topic:'vocab-consommation', type:'gender', q:'_____ tour（直立式主機）(un / une)', hint:'像一座塔', a:'une', aNote:'une tour（f）＝塔、直立式主機；⚠️ un tour（m）＝一圈、一趟（entourer 的 tour，第 24 課）。性別不同意思不同', src:'french_notes.html:12996' },
{ lesson:35, topic:'vocab-consommation', type:'gender', q:'les soldes（折扣季）是陽性還是陰性？回答單數冠詞 le 或 la', hint:'筆記標 (m.)', a:'le', aNote:'les soldes（m.pl）＝法國一年兩次的官方折扣季。⚠️ 常被誤當陰性', src:'french_notes.html:12743' },
{ lesson:35, topic:'vocab-consommation', type:'gender', q:'_____ atelier（工作坊）(un / une)', hint:'母音開頭', a:'un', aNote:"un atelier（m）→ l'atelier", src:'french_notes.html:13048' },
{ lesson:35, topic:'vocab-consommation', type:'gender', q:'_____ écharpe en laine（羊毛圍巾）(un / une)', hint:'母音開頭', a:'une', aNote:"une écharpe（f）→ l'écharpe", src:'french_notes.html:13051' },
```

⏸ **入庫前要 Owen 確認的三件事**
1. **topic 都用既有的**（已 grep 核對）：第 36 課只有 `vocab-travail-manuel`／`vocab-voyage-sur-mesure` 兩個詞彙 topic，互助／共乘那幾題（accorderie 段）就掛 `vocab-travail-manuel`；第 35 課手作段（atelier、écharpe）掛 `vocab-consommation`。要不要替 accorderie／fait maison 另開 topic 由 Owen 決定。
2. `les soldes` 那題問法比較彆扭（複數名詞問單數冠詞），不喜歡可以直接刪。
3. 零之2 的 10 題舊題要不要順手修（B 類，不在這次範圍）。
