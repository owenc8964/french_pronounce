# STORY_BIBLE — Val-Brume 主線劇本（第二～四章）

> ⚠️⚠️ **劇透，Owen 不用打開。** 這份是給之後寫 town.html 主線的 session 看的。
> 2026-10-15 草稿。機制規格見 `STORY_DESIGN.md`；第一章已實作在 `town.html`（`CLUE_TXT`／`LETTER`／`solveChapter`）。
> 可直接接進遊戲的資料草稿：`tools/story_ch2_4_draft.js`（⛔ 還沒接進 town.html）。

---

## 0. 第一幕的大謎（只寫到第四章）

**設定**：Val-Brume 是魁北克一個被霧（la brume）吞掉一半的小鎮。傳說鐘樓的鐘每晚一響，霧就退回湖和礦坑裡。
年輕人一個一個搬走，小鎮沒落。

**第一幕的真相（玩家要一章一章拼出來）**：
- 鎮上每晚敲鐘的是麵包師傅 **Bernard** 的妹妹 **Élise**。
- 一年前的某一夜，Élise 走進霧裡沒有回來，鐘從那晚停了（＝第一章的「鐘停了」）。
- 在霧裡，人看不見彼此，**只有聲音過得去**。Bernard 相信她還在，就找 **Margot**（住湖邊、有船）和她弟弟 **Paul**，三個人半夜把鐘運進湖裡沉下去——「讓 Élise 聽得到」。他每晚提著燈去橋邊聽（第一章的 `j'allais au pont`）。
- 其實 Élise 在霧的下面：湖底跟舊礦坑是通的。她只在夜裡上來找路；她要的是鐘回到**鐘樓**——鐘聲要從高處響，才帶得了路。Bernard 好心，但放錯了地方。
- 第四章末，四個人把鐘撈上來掛回鐘樓，Élise 回家。⭐ 第一幕結束的鉤子：**「下面不只我一個。」**——這些年「搬走」的鎮民，其實沒有走遠。→ 第二幕：一棟一棟重建，就是一個一個把人接回來。

**人物**（中文旁白裡出現就好，不需要介紹）：
| 人 | 是誰 | 語氣 |
|---|---|---|
| Bernard | 麵包師傅，第一章的「B.」 | 話少、固執、很疼妹妹 |
| Élise | Bernard 的妹妹，敲鐘的人 | 只用字條和聲音出現，第四章末才現身 |
| Margot | 住湖邊，有一艘船、一台車 | 爽朗，什麼都看在眼裡 |
| Paul | Margot 的弟弟，力氣大，敢下礦坑 | 老實、怕被誤會 |
| Gaston | 第一章麥田裡的老農夫 | 愛講話，記性很好 |

**伏筆回收**（`STORY_DESIGN.md` §4）：
- 第一章礦坑深處那本**泡過水的日記**（`j'allais au pont`）→ 第三章揭曉：是 Élise 帶下去的，湖水從湖底流進礦坑。
- 第一章 `Il en revient`（他剛從河邊回來）→ 第二章：他是去湖那邊聽鐘，不是去做壞事。

---

## 1. 每章對到的文法（跟第一章不重複、三章之間也不重複）

| 章 | 線索一 | 線索二 | 線索三 |
|---|---|---|---|
| 1（已做） | 過去分詞配合 mise（L37） | en＝從那裡（L21） | imparfait＝習慣（L20） |
| 2 | 指示代名詞 celui-là（L38） | COI leur＝複數的人（L31） | C'est … que＝誰對誰做（L23／L38） |
| 3 | pour que＋虛擬式＝換了主詞（L41） | 所有格代名詞 la sienne 跟著東西走（L27） | si＋imparfait→conditionnel＝跟事實相反（L36） |
| 4 | ne … que＝只有，不是否定（L30） | y＝à＋東西；人要說 à lui（L40） | demander si＝問，不是說（L39） |

---

## 2. 第二章・誰搬得動一口鐘

**接續**：第一章最後打開鐘樓，鐘不見了。
**這章的問題**：那麼重的一口鐘，是誰搬走的？搬去哪裡了？
**對應區域／重建**：東邊的湖（新區域）＋重建 ⛵ **Margot 的船屋**。
**解鎖條件建議**：第一章 solved ＋ 🍞 麵包店已蓋好 → 鐘樓門口出現開場旁白，東邊的路打開。重建船屋（🐟×3 📦×3＋40🪙）後，三張紙條才出現；紙條位置：① 湖岸（Gaston 在釣魚）② 麵包店裡 ③ Margot 家門口。

**開場（鐘樓門口，旁白）**：
> 鐘樓裡空蕩蕩的，地上有兩道很深的拖痕，一路拖到東邊的湖。一個人不可能搬得動這口鐘。

### 線索一（湖岸）
- **scene**：湖岸上，Margot 的車和 Margot 的船並排停著。你問釣魚的 Gaston：那一晚他們用哪一個載鐘？他用下巴指了指：
- **fr**：`Ils ont pris celui-là.`
- **文法點**：指示代名詞 celui（陽性單數）／celle（陰性單數）——**lesson-38**（主文法1）；passé composé prendre → pris（lesson-17）
- **gloss**：（無生字）
- **ask**：他們載鐘用的是哪一個？
- **opts**：① 🚤 le bateau de Margot（Margot 的船）② 🚗 la voiture de Margot（Margot 的車）
- **a**：① 船
- **why**：celui 是陽性單數 → le bateau。車 la voiture 是陰性，會說 celle-là。
- **wrong**（角色誤會）：你把 Margot 的車從裡到外翻了一遍，只翻出一袋硬掉的麵包。
- **查證**：`Ils ont pris celui-là.` 標準法文 ✓（celui-là 指著眼前的東西，課本練習2f 同型：`Celle-ci ou celle-là ?`）

### 線索二（麵包店裡）
- **scene**：麵包店的櫃檯下壓著 Bernard 的小本子，那一夜只寫了一行。
- **fr**：`Je leur ai demandé de m'aider.`
- **文法點**：COI 代名詞 lui（單數）／leur（複數）、demander à qqn de＋原形——**lesson-31**（主文法，demander 在 COI 動詞清單裡）；代名詞放在助動詞前——**lesson-34**（COD／COI 放哪裡）
- **gloss**：aider 幫忙（m'aider＝幫我）
- **ask**：那一夜 Bernard 找了幾個人幫忙？
- **opts**：① 不只一個人 ② 只有一個人
- **a**：① 不只一個
- **why**：leur＝「對他們」，複數的人；只找一個人會寫 je lui ai demandé。
- **wrong**：你以為他只找了一個幫手，滿鎮只問 Margot 一個人——她聳聳肩，叫你去問她弟弟。
- **查證**：✓（leur 不加 s；放在 ai 前面）

### 線索三（Margot 家門口）
- **scene**：Margot 的弟弟 Paul 在門口劈柴，你問他那一夜的事。他還沒開口，Margot 從窗戶探出頭替他回答：
- **fr**：`C'est Paul que Bernard a appelé cette nuit-là.`
  （⚠️ 一定要讓 Margot 說——Paul 自己用第三人稱講自己會很怪）
- **文法點**：關係代名詞 que（que 後面接「主詞＋動詞」，前面那個人是受詞）——**lesson-16**、**lesson-23**；強調句 C'est … que——**lesson-38**（主文法2 La mise en relief）
- **gloss**：cette nuit-là 那一夜
- **ask**：那一夜是誰打給誰？
- **opts**：① Bernard 打給 Paul ② Paul 打給 Bernard
- **a**：①
- **why**：que 後面是 Bernard a appelé → 打電話的是 Bernard，Paul 是被打的那一個。Paul 打的話會說 C'est Paul qui a appelé Bernard。
- **wrong**：你跑去問 Paul 為什麼半夜吵醒 Bernard，Paul 一臉冤枉：「是他吵醒我的！」
- **查證**：✓（appelé 跟 que＝Paul 配合，陽性單數不變形，所以這句不會跟第37課的配合打架）

### 章末推理（Margot 的船屋）
- **ask**：所以，鐘是怎麼不見的？
- **opts**：
  1. ✅ Bernard 半夜打給 Paul，找了 Paul 和 Margot 一起，用 Margot 的船把鐘運進湖裡
  2. ❌ Bernard 一個人開 Margot 的車，把鐘載走 → **線索二** leur 是複數，他找了不只一個人；**線索一** celui 是船不是車
  3. ❌ Paul 半夜打給 Bernard 求救，兩個人用車把鐘藏起來 → **線索三** que：打電話的是 Bernard；**線索一**：用的是船
- **揭曉**（旁白）：你划著 Margot 的船到湖中央。湖水很清，鐘就躺在湖底，好好的。
- **鉤子**：那天半夜，湖底傳來一聲鐘響。——**可是湖底沒有人。**
- **獎勵建議**：+40🪙；船屋蓋好後湖上可以釣到 ⭐ 魚（呼應「鐘聲」）。

---

## 3. 第三章・午夜的鐘聲

**這章的問題**：湖底沒有人，鐘為什麼會響？是誰在敲？
**對應區域／重建**：湖岸夜晚＋重建 🏠 **Élise 的家**（山坡上，鎖了一年）。
**解鎖條件建議**：第二章 solved。重建 Élise 的家（📦×4 ⛏×2＋50🪙）。紙條位置：① Élise 家裡（Bernard 在）② 湖岸的石頭上 ③ 船屋（Margot）。⭐ 建議線索二「只在晚上出現」——如果遊戲有日夜，白天走過去只看到空石頭（不擋人：白天按也能看，只是旁白不同；⛔ 不要做成卡關）。

**開場（Bernard 在 Élise 家門口等你，旁白）**：
> Bernard 第一次開口叫住你：「你聽到了，對吧？」他打開這扇一年沒開的門。

### 線索一（Élise 的家）
- **scene**：Élise 的桌上全是灰，只有一張紙是新的。Bernard 終於承認是他做的：
- **fr**：`J'ai mis la cloche dans le lac pour qu'Élise l'entende.`
- **文法點**：pour＋原形（同一個主詞）／pour que＋虛擬式（換了主詞）——**lesson-41**（主文法）；entendre 的虛擬式字根看 ils entendent → entend-＋e——**lesson-34**；mettre 的 passé composé j'ai mis——**lesson-17**
- **gloss**：la cloche 鐘・entendre 聽見（虛擬式 qu'elle entende）
- **ask**：Bernard 把鐘沉進湖裡，是要讓誰聽見？
- **opts**：① Élise ② 他自己
- **a**：① Élise
- **why**：pour que 後面換了主詞（Élise）——聽的人不是他。要是為了自己聽，會說 pour l'entendre。
- **wrong**：你以為他只是想自己半夜聽鐘聲，還勸他早點睡——他看了你一眼，沒說話。
- **查證**：✓ `qu'Élise`（que 遇母音開頭的人名要省略）；`l'entende` 的 l'＝la cloche

### 線索二（湖岸的石頭上）
- **scene**：湖邊的石頭上放著一條圍巾和一頂帽子，都是乾的，像是昨晚才放上去的。你問 Bernard：有沒有 Élise 的？他拿起其中一樣：
- **fr**：`Oui. C'est la sienne.`
- **文法點**：所有格代名詞跟著「東西」的陰陽性走，不是跟著「人」——**lesson-27**（主文法①，課本 `C'est sa personnalité. C'est la sienne.` 同型）
- **gloss**：（無生字；une écharpe 圍巾 lesson-35、un chapeau 帽子 lesson-8 都學過，選項裡附中文）
- **ask**：Bernard 拿起來的是哪一樣？
- **opts**：① 🧣 l'écharpe（圍巾）② 🎩 le chapeau（帽子）
- **a**：① 圍巾
- **why**：la sienne 是陰性 → une écharpe。帽子 le chapeau 是陽性，會說 le sien。
- **wrong**：你把帽子捧給 Bernard，他搖搖頭：「這是 Gaston 的。他每次釣魚都忘記帶走。」
- **查證**：✓（⚠️ 這格的線索是「物」的陰陽，不是「主人」的陰陽——Élise 是女的跟答案無關，旁白已經用「你問有沒有 Élise 的」把主人固定住）

### 線索三（船屋）
- **scene**：Margot 坐在船屋門口，看著湖。她說得很慢，像在說給自己聽：
- **fr**：`Si personne n'était en bas, la cloche ne sonnerait pas.`
- **文法點**：si＋imparfait → conditionnel＝假設、跟事實相反——**lesson-36**（Le conditionnel (2)，筆記明寫跟 si＋présent → futur 不能混用，後者是 **lesson-25**）；ne … personne／personne ne——**lesson-18**、**lesson-26**
- **gloss**：en bas 在下面・sonner（鐘）響
- **ask**：Margot 的意思是——
- **opts**：① 她相信湖底真的有人 ② 她覺得湖底沒有人 ③ 她在說：以後鐘不會再響了
- **a**：①
- **why**：sonnerait 是 conditionnel——「要是下面沒人，鐘就不會響」是跟事實相反的假設；可是鐘響了 → 下面有人。說未來會用 ne sonnera pas。
- **wrong**：你以為 Margot 在說下面沒人，轉身要走——她拉住你的袖子，指著湖面上一圈一圈的水波。
- **查證**：✓ `Si personne n'était…`（personne 當主詞，ne 照樣要有）

### 章末推理（湖岸）
- **ask**：半夜在湖底敲鐘的，是誰？
- **opts**：
  1. ✅ Élise 還在——她在下面敲鐘，告訴哥哥她聽到了
  2. ❌ 下面沒有人，是湖水把鐘推響的 → **線索三**：sonnerait 是跟事實相反的假設，Margot 相信下面有人
  3. ❌ Bernard 沉鐘是為了自己聽；石頭上那頂帽子是 Élise 留下的 → **線索一** pour que：是為了讓 Élise 聽；**線索二** la sienne：她的是圍巾，不是帽子
- **揭曉**（旁白）：Bernard 把圍巾貼在臉上，一句話也說不出來。圍巾的流蘇上沾著一層黑色的粉——跟舊礦坑的石頭一樣黑。
- **鉤子**：你想起第一章那本泡過水的日記，是在**礦坑深處**撿到的。湖底跟舊礦坑，是通的——**Élise 在礦坑裡。**
- **獎勵建議**：+50🪙；Bernard 送你一盞 🏮 提燈（第四章進礦坑深處要用）。

---

## 4. 第四章・霧的下面

**這章的問題**：Élise 在礦坑裡——她為什麼回不了家？要怎麼帶她回來？
**對應區域／重建**：⛏ **舊礦坑深處**（新區域，比現在的礦坑再往下一層）＋章末重建 🔔 **鐘樓**（把鐘掛回去，第一幕的大工程）。
**解鎖條件建議**：第三章 solved ＋ 有 🏮 提燈（第三章獎勵）＋ 鐵匠鋪買過 ⛏ 好十字鎬（打通塌方）。紙條位置：① 深處入口的牆上 ② 更深一點、牆被水沖過 ③ 最深處（Paul 在等你）。章末推理在鐘樓；鐘樓重建材料建議（⛏×6 📦×4 🐟×2＋80🪙），蓋好才播揭曉。

**開場（礦坑深處入口，旁白）**：
> 提燈照到的地方，牆上有粉筆字，字跡跟 Bernard 本子上的很像，但比較秀氣。霧在腳邊慢慢流。

### 線索一（入口的牆上）
- **scene**：最上面那一行粉筆字，寫得很大：
- **fr**：`Je ne remonte que la nuit.`
- **文法點**：ne … que＝只有（限制），不是否定——**lesson-30**（主文法）；remonter 回到上面——**lesson-21**
- **gloss**：remonter 回到上面
- **ask**：寫字的人是說——
- **opts**：① 她只在晚上上去 ② 她晚上不上去
- **a**：①
- **why**：ne … que＝「只有」，que 後面那個就是唯一的時間：la nuit。要說晚上不上去，會寫 je ne remonte pas la nuit。
- **wrong**：你以為她晚上從不上去，白天在湖邊等了一整天——只等到 Gaston 來釣魚。
- **查證**：✓（la nuit＝在夜裡，不加介系詞）

### 線索二（被水沖過的牆）
- **scene**：下一行被水沖糊了，前面那個字看不清楚，只剩後半句。Paul 舉著燈讀了兩遍：
- **fr**：`…, j'y pense chaque nuit.`
- **文法點**：COI 代名詞 y＝à＋東西／想法；想的是人要說 penser à lui（à＋重讀代名詞）——**lesson-40**（主文法，課本 `Il y pense.`／`Il pense à lui.` 原句對照）
- **gloss**：（無生字）
- **ask**：被沖掉的那個字，比較可能是——
- **opts**：① 🔔 La cloche（鐘）② 👨 Bernard（哥哥）
- **a**：① 鐘
- **why**：y 只能代替「à＋東西」；想的是哥哥會寫 je pense à lui。
- **wrong**：你跑回去跟 Bernard 說她每晚都在想他，他眼睛紅了一整天——後來你才看懂，她寫的是鐘。
- **查證**：✓（penser à＋人 → à lui，lesson-40 筆記也標了：這條只適用 penser à 這類動詞）
- ⚠️ 設計註記：答案「鐘」聽起來有點冷，所以揭曉要補回溫度——她想鐘，是因為鐘是回家的路（見章末揭曉）。

### 線索三（最深處）
- **scene**：Paul 在最深處等你，臉色發白：霧裡有人跟他說話，他看不見人，只聽得到聲音。是 Élise。
- **fr**：`Elle me demande si la cloche est dans le clocher.`
- **文法點**：間接引語——「說」接 que、「問」接 si（是否）——**lesson-39**（主文法 Le discours rapporté au présent，課本原句 `Elle se demande si le CV est utile.` 同型）；COI me（lesson-31）
- **gloss**：le clocher 鐘樓
- **ask**：Élise 跟 Paul 說的是——
- **opts**：① 她在問：鐘是不是在鐘樓裡 ② 她在說：鐘已經在鐘樓裡了
- **a**：①
- **why**：demander si＝問「是不是」。要是她說鐘在鐘樓，會轉述成 elle dit que la cloche est dans le clocher。
- **wrong**：Paul 以為她說鐘已經回去了，鬆了一口氣想走——你一把拉住他：她是在問，不是在說。

### 章末推理（鐘樓，重建完才觸發）
- **ask**：Élise 為什麼回不了家？要怎麼帶她回來？
- **opts**：
  1. ✅ 她只在夜裡上來找路，心裡惦著鐘、一直在問鐘回鐘樓了沒——要把鐘撈上來掛回鐘樓，讓鐘聲從高處帶她回家
  2. ❌ 她晚上從不上來，每天想的是哥哥——要 Bernard 自己下礦坑去接她 → **線索一** ne … que：她只在晚上上來；**線索二** y：她想的是鐘，不是人
  3. ❌ 她說鐘已經回到鐘樓了，問題不在鐘——要去別的地方找她 → **線索三** demander si：她是在問，不是在說
- **揭曉**（旁白）：四個人划著 Margot 的船，把鐘從湖底拉上來，掛回鐘樓。午夜，Bernard 敲下一年來的第一聲——霧往後退了一步，橋上亮起一盞提燈。Élise 頭髮濕的、手很冷，在笑：她不是不想回家，是霧裡看不見路，只有從高處來的鐘聲，聽得出方向。
- **鉤子**（Élise 回頭看著霧）：
  - **fr**（可選）：`Je ne suis pas seule en bas.`
  - **文法點**：否定 ne … pas（lesson-6）；seule 跟主詞 je＝Élise 配合（形容詞配合，lesson-3 起）
  - **gloss**：seul(e) 一個人・en bas 在下面（第三章學過）
  - 旁白：這些年從 Val-Brume「搬走」的人——他們沒有走遠。→ **第一幕完。**
- **獎勵建議**：+80🪙；鐘樓蓋好後每晚有鐘聲，霧退一格（地圖可見範圍變大）＝看得見的變強。

---

## 5. 我最沒把握的 5 句（與原因）

1. **`Ils ont pris celui-là.`**（第二章線索一）——句子本身標準，但 celui-là 在口語裡要有「手指著」的情境；旁白一定要寫出兩樣東西並排、Gaston 在指，否則 celui 沒有先行詞會顯得突兀。另外 `pris` 本身不洩漏陰陽（沒有 COD 前置），線索完全靠 celui，這是刻意的，但要確認畫面上不要另外寫「船」字露餡。
2. **`C'est Paul que Bernard a appelé cette nuit-là.`**（第二章線索三）——法文標準，但說話的人必須是 Margot 不是 Paul（自己用第三人稱很怪），JS 草稿已改成 Margot。`cette nuit-là`（指示形容詞＋-là）筆記裡找不到這個組合，列為生字（未查證：課本是否教過 ce …-là）。
3. **`Si personne n'était en bas, la cloche ne sonnerait pas.`**（第三章線索三）——句子標準；沒把握的是**教學面**：筆記第35課記老師說 conditionnel「只要看得懂就好」，第36課才教假設。這格是看穿格（只要認得 sonnerait ≠ sonnera），應該在能力範圍內；但 `personne n'était` 這種「personne 當主詞＋imparfait」的組合，筆記裡沒有現成例句（lesson-26 只有 personne ne 的現在式），未查證。
4. **`J'ai mis la cloche dans le lac pour qu'Élise l'entende.`**（第三章線索一）——文法標準；沒把握的是 `entende` 這個虛擬式在筆記裡沒出現過（筆記有 comprennent、sachent、disparaissent，規則「字根看 ils」在 lesson-34）。Owen 只需要認出 pour que 換了主詞，不需要產出 entende，所以影響不大；但它算半個生字，已列 gloss。
5. **`…, j'y pense chaque nuit.`**（第四章線索二）——句子標準；沒把握的是**推理的嚴謹度**：y 也可以代替「à＋做某件事」或地點，所以「被沖掉的是鐘」嚴格說是「比較可能」不是「一定」。ask 已寫成「比較可能是」，選項只放鐘 vs 哥哥，排除的是「人」這一邊，邏輯上成立；如果 Owen 覺得不夠「看穿」，可以改成二選一更硬的版本（例如前半句留下 `La cl…`）。

> 其他句子我逐字檢查過（配合、時態、介系詞、省略）：`Je leur ai demandé de m'aider.`、`Oui. C'est la sienne.`、`Je ne remonte que la nuit.`、`Elle me demande si la cloche est dans le clocher.`、`Je ne suis pas seule en bas.` 標準法文 ✓。

## 6. 給接手 session 的提醒

- 三章都沿用第一章的 `CLUE_TXT` 欄位（scene／fr／gloss／ask／opts／a／why／wrong），多加 `topic`、`lessons`。章末推理多一個 `wrongWhy`（每個錯誤選項指回哪張線索）。
- ⛔ 旁白每格 ≤2 句；揭曉只指出關鍵字。現在 `scene` 有幾格接近 2 句上限，接進遊戲時不要再加。
- 跳過照樣合法：跳過的線索在章末推理裡顯示「（這張你還沒看）」。每個錯誤選項被幾張線索排除：
  - 第二章：選項 2 ← 線索一、二；選項 3 ← 線索一、三 → 跳任一張都還推得出來 ✓
  - 第三章：選項 2 ← **只有線索三**；選項 3 ← 線索一、二
  - 第四章：選項 2 ← 線索一、二；選項 3 ← **只有線索三**
  - → 第三章線索三、第四章線索三被跳過時，推理畫面要補一句中文轉述（例：「Margot 說過，她相信下面有人。」／「Paul 說，Élise 是在問他。」），這樣跳過的人不會卡關，⛔ 也不要因此禁止跳過。
- 接進遊戲前要先跟 Owen 確認：`story.js` 第 1 條鐵律的例外（`STORY_DESIGN.md` §10 已同意 town 主線用原創法文）。
