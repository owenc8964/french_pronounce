# CLB7 法語學習系統 — 交接文件

> 給新 session 的 Claude：Owen 在學法語（CLB7 課程，目前 A1/A2），
> 這份文件是完整的專案快照，讀完就能直接上手。

---

## 最新進度（2026-06-17 更新）

- 學習時間：2026-05-14 ~ 2026-06-17（34天）
- 完成課程：9堂，平均 3.7 天/課
- Quiz BANK：379題（包含Duolingo框架庫15題）
- 最大文法缺口：passé composé（尚無題目）

---

## 戰略分析：A1 → CLB7（B2）一年路線圖

### 最高優先：接下來必須攻的文法

1. **passé composé** — 最大弱點，avoir/être + participe passé，accord 規則
2. **反身動詞** (verbes pronominaux) — 已在第9課出現，需強化
3. **pronoms COD/COI** — 代詞替換，B1 必備
4. **subjonctif présent** — 進入 B1/B2 的門檻

---

## 檔案結構

| 檔案 | 用途 | 狀態 |
|------|------|------|
| `quiz.html` | 主 quiz 系統，SRS + 能力地圖 | GitHub Pages 部署 |
| `french_notes.html` | 第1-9課筆記 | git 追蹤，未部署 |
| `map.html` | 課程地圖（60格） | git 追蹤，未部署 |
| `table_drill.html` | 動詞變位練習 | GitHub Pages 部署 |
| `french_basics.html` | 基礎發音 | GitHub Pages 部署 |

---

## Quiz 系統重要細節

### SRS key pattern
- `clb7_q_{id}` → `{w, c, last}` (wrong, correct, lastDate)
- `clb7_dq_{id}` → drill SRS

### topic tag 系統（33個主題）
- 全部 379 題都有 `topic:'xxx'` 欄位
- `TOPIC_LABELS` dict 有中文對照
- lesson:0 = 框架庫（Duolingo 誤區 + 句型慣用法，不是真實課次）

### 匯出 JSON 分析協議
- `exportAllData()` 下載含 `exportedAt` 時間戳的 JSON
- **先確認** exportedAt 是否比上次分析更新，避免重複分析
- 趨勢分析 = 兩個快照的 `topicSummary[].pct` 差值

---

## 第8課筆記（2026-06-14上課）
9 單元：形容詞位置、衣服/配件/材質、尺寸、天氣+季節、futur proche、venir變位、ce/cet/cette/ces、科技物品+ça sert à quoi、每日作息反身動詞

## 第9課筆記（2026-06-16上課）
8 單元：journée vs jour、反身動詞變位+否定、睡眠用語差別、Mathilde Boulesteix閱讀詞彙、on vs nous、pouvoir vs vouloir、邀約句型、頻率副詞

---

## 地圖解鎖狀態（19/60格）

已解鎖主題：salutations, alphabet, chiffres, couleurs, famille, nourriture, boissons, corps, maison, ville, verbes-er, etre-avoir, articles, adjectifs, heure(L6), transports(L6), vetements(L7), meteo(L8), futur-proche(L8), routine(L8)

---

## Duolingo 5大誤區（lesson:0）

已轉為15題進入 BANK：
1. 冠詞 (articles)：du jazz, du lait, 音樂類冠詞
2. 動詞變位 (etre-avoir, irregular-verbs-3rd-group)：tu es, je viens, elle veut
3. à+地點介詞 (preposition-place-transport)：On va à la piscine
4. ce/cet (demonstrative-adj)：cet animal, cet hôtel
5. avoir感受句 (etre-avoir)：Il a chaud, J'ai faim

---

## 下一步建議

1. **第10課**：上完後補充 french_notes.html + quiz 題目（passé composé 優先）
2. **定期匯出 JSON**：每2週下載一次傳給 Claude 做趨勢分析
3. **地圖解鎖**：可考慮新增 passé-composé, pronoms-cod 格子
