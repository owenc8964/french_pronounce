/* ============================================================
   codex.js — 文法資料庫（大局觀記憶宮殿）的資料層
   ------------------------------------------------------------
   9 大章 → 節 → 條目，每條有永久座標（n），涵蓋 A1→B2 全境。
   顯示於 map.html 第三分頁「📚文法資料庫」；quiz/gram_trainer
   答題結果區用 codexLocate(topic) 顯示「📍 5-2-2」定位連結。

   ⚠️ 鐵律：座標一經指定永不變動、永不重編——這是 Owen 的記憶
   宮殿地址（他靠「明確位置」記憶）。之後新增條目只能在該節尾端
   取下一個號碼；就算條目作廢也保留號碼標 deprecated，不回收。

   欄位：n=座標 lvl=CEFR等級 name=中文名 fr=法文標籤 brief=一行摘要
   pts=說明條列 ex=[{fr,zh}]例句 exc=[例外] vs=[{n,note}]相似對比
   topics=[quiz topic]（每個topic全庫只出現一次，定位才唯一）
   gram=gram_rules.js 的文法點id（連去練習）
   章/節只有 n/name/fr（+節可掛 topics 當粗定位）。
   ============================================================ */

const CODEX = [

// ═══ 第 1 章 名詞與限定詞 ═══════════════════════════════════
{ n:'1', name:'名詞與限定詞', fr:'Le nom et ses déterminants', sections:[

 { n:'1-1', name:'名詞的性別', fr:'Le genre', items:[
  { n:'1-1-1', lvl:'A1', name:'陰陽性的本質', fr:'masculin / féminin',
    brief:'每個名詞出生就帶性別標籤，是分類籤不是意義',
    ex:[{fr:'Le livre est sur la table.', zh:'書（陽）在桌子（陰）上。'},
        {fr:'Le soleil et la lune.', zh:'太陽（陽）與月亮（陰）——德文剛好相反，可見跟意義無關'}],
    pts:[
      {r:'性別跟東西本身無關——桌子沒有女性特質，純粹是分類籤（拉丁文三性崩塌的遺產）',
       fr:'la table, la voiture', zh:'桌子、汽車（都是陰性，但沒有理由）'},
      {r:'背名詞永遠連冠詞一起背：不背 livre，背 le livre——冠詞就是性別標籤本人',
       fr:'le livre, la maison', zh:'背的時候整組一起唸出聲'},
      {r:'形容詞、冠詞、所有格全部看名詞穿制服——性別是全句性數配合的源頭',
       fr:'une grande maison blanche', zh:'一棟白色大房子（grande、blanche 都跟著 maison 變陰性）'},
    ],
    exc:['少數雙性別雙意義：le tour（一圈）vs la tour（塔）、le livre（書）vs la livre（磅）'],
    vs:[{n:'1-1-2', note:'判性靠字尾機率，不靠意義'}], gram:'articles' },
  { n:'1-1-2', lvl:'A2', name:'字尾判性訣竅', fr:'terminaisons',
    brief:'字尾可以猜性別，準確率八九成',
    ex:[{fr:'la nation, la santé, la culture', zh:'-tion／-té／-ure 結尾 → 猜陰性'},
        {fr:'le fromage, le gouvernement, le tourisme', zh:'-age／-ment／-isme 結尾 → 猜陽性'}],
    pts:[
      {r:'偏陰性字尾：-tion/-sion、-té、-ure、-ette、-ance/-ence、-ie',
       fr:'la station, la baguette, la boulangerie', zh:'車站、法棍、麵包店'},
      {r:'偏陽性字尾：-age、-ment、-eau、-isme、-oir',
       fr:'le voyage, le bureau, le miroir', zh:'旅行、辦公室、鏡子'},
      {r:'-e 結尾「傾向」陰性但例外極多，只能當弱線索，別當規則',
       fr:'le musée, le lycée', zh:'博物館、高中（-ée 卻是陽性）'},
    ],
    exc:['-age 例外：la page、la plage、l\'image（陰）','l\'eau（陰）——最常用的例外'] },
  { n:'1-1-3', lvl:'A1', name:'人與職業的陰陽形', fr:'noms de personnes',
    brief:'指人的名詞跟著人的性別變形',
    ex:[{fr:'Il est étudiant. Elle est étudiante.', zh:'他是學生。她是學生。（+e）'},
        {fr:'un acteur et une actrice', zh:'男演員和女演員（-teur→-trice）'}],
    pts:[
      {r:'基本 +e；-eur→-euse；-teur→-trice；-ien→-ienne',
       fr:'un vendeur / une vendeuse, un musicien / une musicienne', zh:'售貨員、音樂家的陰陽形'},
      {r:'部分職業歷史上只有陽性形，現代法語正在補陰性形',
       fr:'un professeur / une professeure', zh:'老師（新式陰性形已被接受）'},
    ] },
 ]},

 { n:'1-2', name:'名詞的複數', fr:'Le nombre', items:[
  { n:'1-2-1', lvl:'A1', name:'規則複數 +s', fr:'pluriel en -s',
    brief:'加 s 但不發音——複數靠冠詞聽出來',
    ex:[{fr:'le livre → les livres', zh:'一本書 → 一些書（唸起來只差 le→les）'},
        {fr:"J'ai deux chats.", zh:'我有兩隻貓。（chats 的 s 完全不發音）'}],
    pts:[
      {r:'書寫 +s，口語完全聽不到——耳朵靠冠詞 le→les、un→des 判斷複數',
       fr:'la table / les tables', zh:'桌子／桌子們（聽 la vs les）'},
      {r:'所以聽力時注意力放在冠詞上，不要等字尾',
       fr:'Il y a des chiens.', zh:'有一些狗。（des 就是複數訊號）'},
    ] },
  { n:'1-2-2', lvl:'A2', name:'-eau/-eu→+x、-al→-aux', fr:'pluriels en -x',
    brief:'兩個古法語拼寫家族',
    ex:[{fr:'un gâteau → des gâteaux', zh:'一個蛋糕 → 一些蛋糕（+x）'},
        {fr:'le journal → les journaux', zh:'報紙 → 報紙們（-al→-aux，發音也變）'}],
    pts:[
      {r:'-eau/-eu 結尾加 x（不是 s）',
       fr:'les cheveux, les bureaux', zh:'頭髮、辦公室們'},
      {r:'-al 變 -aux——這組連發音都變，聽得出複數',
       fr:'un animal / des animaux', zh:'一隻動物／一些動物'},
    ],
    exc:['-s/-x/-z 結尾不變：le fils→les fils','l\'œil→les yeux（完全換字）'] },
 ]},

 { n:'1-3', name:'冠詞', fr:'Les articles', topics:['articles'], items:[
  { n:'1-3-1', lvl:'A1', name:'定冠詞', fr:'le / la / l\' / les',
    brief:'特定的、雙方都知道的、或泛指整類',
    ex:[{fr:"J'aime la musique et le sport.", zh:'我喜歡音樂和運動。（泛指整類→定冠詞）'},
        {fr:'Ferme la porte !', zh:'關門！（你知我知的那扇門）'}],
    pts:[
      {r:'四張臉：le（陽）la（陰）l\'（母音前）les（複數）',
       fr:"le café, la gare, l'école, les amis", zh:'咖啡、車站、學校、朋友們'},
      {r:'⚠️ 中文使用者的坑：泛指一整類也要定冠詞，中文英文都不加',
       fr:"J'aime le café.", zh:'我喜歡（喝）咖啡。（不是特定某杯）'},
    ], gram:'articles' },
  { n:'1-3-2', lvl:'A1', name:'不定冠詞', fr:'un / une / des',
    brief:'第一次提到、隨便哪一個',
    ex:[{fr:'Il y a un chien et des chats.', zh:'有一隻狗和一些貓。'},
        {fr:"J'habite dans un appartement.", zh:'我住在一間公寓。（第一次提到）'}],
    pts:[
      {r:'un（陽）une（陰）des（複數）——英文 a/an 加上一個英文沒有的複數版',
       fr:'une amie, des amies', zh:'一個朋友（女）、一些朋友（女）'},
    ] },
  { n:'1-3-3', lvl:'A2', name:'部分冠詞', fr:'du / de la / de l\'',
    brief:'不可數的「一些」——吃喝的預設冠詞',
    ex:[{fr:"Je bois de l'eau et du café.", zh:'我喝水和咖啡。（喝的是「一些」不是全部）'},
        {fr:'Elle mange de la viande.', zh:'她吃肉。（陰性→de la）'}],
    pts:[
      {r:'字面＝de+定冠詞＝「那東西的一部分」——吃喝談的永遠是一部分',
       fr:'Je mange du pain.', zh:'我吃（一些）麵包，不是整條'},
      {r:'抽象名詞也用部分冠詞',
       fr:'faire du sport, avoir du courage', zh:'做運動、有勇氣'},
    ],
    vs:[{n:'1-3-4', note:'du 有兩個身分：部分冠詞 vs de+le 縮合，長一樣意思不同'}] },
  { n:'1-3-4', lvl:'A1', name:'縮合冠詞', fr:'du / au / des / aux',
    brief:'de+le、à+le 黏成一個音的化石',
    ex:[{fr:'Je vais au marché.', zh:'我去市場。（à+le→au）'},
        {fr:'Il parle du prof.', zh:'他在講老師（的事）。（de+le→du）'}],
    pts:[
      {r:'只有 le/les 被吃掉：de+le=du、de+les=des、à+le=au、à+les=aux',
       fr:'aux États-Unis', zh:'在美國（à+les→aux）'},
      {r:'la 和 l\' 不縮合，照寫',
       fr:'à la gare, de l\'école', zh:'在車站、從學校'},
    ] },
  { n:'1-3-5', lvl:'A2', name:'變 de 的場合', fr:'la règle du « de »',
    brief:'否定與量詞之後，冠詞塌縮成 de',
    ex:[{fr:'Je ne mange pas de viande.', zh:'我不吃肉。（否定後 de la→de）'},
        {fr:'Il mange beaucoup de pâtes.', zh:'他吃很多麵。（量詞後→de）'}],
    pts:[
      {r:'否定後：du/de la/des → de（數量歸零）',
       fr:"Il n'y a plus de dessert.", zh:'甜點沒了。'},
      {r:'量詞後：beaucoup de、un peu de、trop de、un kilo de',
       fr:'un kilo de tomates', zh:'一公斤番茄'},
      {r:'形容詞放複數名詞前時 des → de',
       fr:'de beaux objets', zh:'一些漂亮的物品'},
    ],
    exc:['être 的否定不變：Ce n\'est pas du café（身分判斷句保留原冠詞）'] },
  { n:'1-3-6', lvl:'A2', name:'不加冠詞的場合', fr:'l\'absence d\'article',
    brief:'少數位置冠詞消失',
    ex:[{fr:'Elle est médecin.', zh:'她是醫生。（職業當屬性→裸用）'},
        {fr:'Je viens de Taïwan.', zh:'我來自台灣。（國名搭 de 不加冠詞）'}],
    pts:[
      {r:'職業當屬性時裸用；c\'est 開頭才有冠詞',
       fr:"Il est professeur. / C'est un professeur.", zh:'他是老師。／這是一位老師。'},
      {r:'月份、星期直接裸用',
       fr:'en janvier, lundi', zh:'在一月、星期一'},
    ],
    vs:[{n:'7-3-1', note:'c\'est + 冠詞 vs il est + 裸職業，同一條分界'}] },
 ]},

 { n:'1-4', name:'指示詞', fr:'Les démonstratifs', items:[
  { n:'1-4-1', lvl:'A1', name:'指示形容詞', fr:'ce / cet / cette / ces',
    brief:'「這個/那個」，法文不分遠近',
    ex:[{fr:'Cette valise est lourde.', zh:'這個行李箱很重。（陰性→cette）'},
        {fr:'Cet hôtel est cher.', zh:'這間旅館很貴。（陽性+母音→cet）'}],
    pts:[
      {r:'四張臉：ce（陽）cet（陽+母音）cette（陰）ces（複數）',
       fr:'ce livre, ces téléphones', zh:'這本書、這些手機'},
      {r:'cet＝母音相撞禁忌的墊音形（跟 mon amie 同一條規則）',
       fr:'cet ordinateur, cet ami', zh:'這台電腦、這位朋友'},
      {r:'法文預設不分遠近；要強調才加 -ci/-là',
       fr:'ce livre-ci / ce livre-là', zh:'這本／那本'},
    ],
    topics:['demonstrative-adj'], gram:'determinants' },
  { n:'1-4-2', lvl:'B1', name:'指示代名詞', fr:'celui / celle / ceux / celles',
    brief:'「那個～的」——把名詞收掉再指一次',
    ex:[{fr:'Quel livre ? Celui de Paul.', zh:'哪本書？保羅的那本。'},
        {fr:'Je préfère celle qui est bleue.', zh:'我比較喜歡藍色的那個（陰性）。'}],
    pts:[
      {r:'celui（陽）celle（陰）ceux（陽複）celles（陰複），跟被代替的名詞配合',
       fr:'ceux de la classe', zh:'班上的那些人'},
      {r:'不能單獨站，後面必接 de、-ci/-là 或關係子句',
       fr:'celui-là, celle que je veux', zh:'那一個、我要的那個'},
    ] },
 ]},

 { n:'1-5', name:'所有格', fr:'Les possessifs', items:[
  { n:'1-5-1', lvl:'A1', name:'所有格形容詞', fr:'mon / ma / mes …',
    brief:'跟「被擁有的名詞」配合，不跟主人',
    ex:[{fr:'Sa femme est fleuriste.', zh:'他的太太是花店老闆。（看femme陰性→sa，不看主人）'},
        {fr:'Nos enfants sont grands.', zh:'我們的孩子們長大了。（複數→nos）'}],
    pts:[
      {r:'全表：mon/ma/mes、ton/ta/tes、son/sa/ses、notre/nos、votre/vos、leur/leurs',
       fr:'ma mère, tes amis, leurs filles', zh:'我媽、你的朋友們、他們的女兒們'},
      {r:'⚠️ 中文使用者最大坑：son/sa 看名詞性別不看主人——「她的爸爸」也是 son père',
       fr:'Marie aime son père.', zh:'瑪麗愛她爸爸。（père陽性→son）'},
    ],
    topics:['family-possessives'], gram:'determinants' },
  { n:'1-5-2', lvl:'A1', name:'母音前借陽性形', fr:'mon amie',
    brief:'ma amie 母音相撞，借 mon 來墊',
    ex:[{fr:"C'est mon amie Sophia.", zh:'這是我朋友（女）蘇菲亞。'},
        {fr:'Son école est loin.', zh:'他/她的學校很遠。（école陰性但母音開頭→son）'}],
    pts:[
      {r:'陰性名詞母音開頭 → ma/ta/sa 借用 mon/ton/son',
       fr:'ton amie, son histoire', zh:'你的朋友（女）、他的故事'},
      {r:'純發音規則，名詞還是陰性——後面形容詞照配陰性',
       fr:'Mon amie est belle.', zh:'我朋友（女）很漂亮。（belle陰性）'},
    ],
    topics:['possessives'], gram:'determinants',
    vs:[{n:'2-2-4', note:'bel/nouvel/vieil 同一條母音禁忌'}] },
  { n:'1-5-3', lvl:'B1', name:'所有格代名詞', fr:'le mien / la tienne …',
    brief:'「我的那個」——名詞收掉的所有格',
    ex:[{fr:"Ce livre ? C'est le mien.", zh:'這本書？是我的。'},
        {fr:'Ta voiture est plus grande que la mienne.', zh:'你的車比我的大。'}],
    pts:[
      {r:'le mien/la mienne、le tien、le sien、le nôtre、le vôtre、le leur',
       fr:"C'est la sienne.", zh:'是他/她的（那個陰性東西）。'},
      {r:'冠詞+性數都配合被代替的名詞',
       fr:'mes clés → les miennes', zh:'我的鑰匙們 → 我的（陰複）'},
    ] },
 ]},

 { n:'1-6', name:'數與量', fr:'Les nombres et quantités', items:[
  { n:'1-6-1', lvl:'A2', name:'量詞', fr:'expressions de quantité',
    brief:'量詞後面一律 de + 裸名詞',
    ex:[{fr:'Je mange beaucoup de pâtes.', zh:'我吃很多麵。'},
        {fr:'un kilo de tomates, une bouteille de vin', zh:'一公斤番茄、一瓶酒'}],
    pts:[
      {r:'程度量詞：beaucoup de、un peu de、assez de、trop de',
       fr:'trop de sel', zh:'太多鹽'},
      {r:'單位量詞：un kilo de、une bouteille de、une douzaine de——中間永遠是裸 de',
       fr:"une douzaine d'œufs", zh:'一打蛋'},
    ],
    vs:[{n:'1-3-5', note:'就是「變de」規則的量詞分支'}] },
  { n:'1-6-2', lvl:'A1', name:'數字系統', fr:'les nombres',
    brief:'70/80/90 是古代二十進位的化石',
    ex:[{fr:'quatre-vingt-quinze', zh:'95 ＝ 4×20＋15'},
        {fr:'soixante-dix-huit', zh:'78 ＝ 60＋18'}],
    pts:[
      {r:'70=60+10、80=4×20、90=4×20+10——二十進位的殘骸；比利時瑞士直接說 septante/nonante',
       fr:'soixante-dix, quatre-vingts, quatre-vingt-dix', zh:'70、80、90'},
      {r:'21/31/41…加 et：vingt et un',
       fr:'trente et un', zh:'31'},
    ],
    exc:['quatre-vingts 有 s，但 quatre-vingt-un 後面接數字就沒 s'] },
  { n:'1-6-3', lvl:'A2', name:'序數', fr:'les ordinaux',
    brief:'字尾 -ième，只有「第一」特殊',
    ex:[{fr:'le premier étage', zh:'二樓（法國的一樓是台灣的二樓！）'},
        {fr:'la deuxième rue à gauche', zh:'左邊第二條街'}],
    pts:[
      {r:'數字+ième：deuxième、troisième；只有 premier/première 完全不規則',
       fr:'le troisième jour', zh:'第三天'},
      {r:'日期只有1號用序數，其他用基數',
       fr:'le premier mai / le 4 juin', zh:'5月1日／6月4日'},
    ] },
 ]},
]},

// ═══ 第 2 章 形容詞 ═════════════════════════════════════════
{ n:'2', name:'形容詞', fr:'L\'adjectif', sections:[

 { n:'2-1', name:'性數配合', fr:'L\'accord', topics:['adjective-agreement'], items:[
  { n:'2-1-1', lvl:'A1', name:'基本配合 +e / +s', fr:'accord de base',
    brief:'衛星穿主星的制服：陰+e、複+s',
    pts:['grand → grande → grands → grandes','已經 -e 結尾的陰性不再加：jeune 不變','+e 常讓尾子音發出聲：grand[grɑ̃]→grande[grɑ̃d]——配合是聽得到的'],
    ex:[{fr:'une robe verte, des yeux verts', zh:'綠洋裝、綠眼睛'}], gram:'adjectifs-accord' },
  { n:'2-1-2', lvl:'A2', name:'變形家族', fr:'terminaisons spéciales',
    brief:'六大字尾家族各有變法',
    pts:['-eux→-euse（courageux/courageuse）','-if→-ive（sportif/sportive）','-er→-ère（cher/chère）','-on/-en→-onne/-enne（bon/bonne, coréen/coréenne）','-c→-che/-que（blanc/blanche）','完全不規則：beau/belle、nouveau/nouvelle、vieux/vieille、long/longue、fou/folle'],
    ex:[{fr:'Elle est courageuse et sportive.', zh:'她勇敢又愛運動。'}] },
  { n:'2-1-3', lvl:'A2', name:'不變的形容詞', fr:'adjectifs invariables',
    brief:'借來的顏色字不配合',
    pts:['orange、marron（本是名詞「橘子/栗子」，借來當顏色所以不變形）','複合顏色不變：bleu clair、vert foncé'],
    ex:[{fr:'des chaussures marron', zh:'棕色的鞋（marron不加s）'}] },
 ]},

 { n:'2-2', name:'位置', fr:'La place', topics:['adjective-position'], items:[
  { n:'2-2-1', lvl:'A1', name:'預設放名詞後', fr:'adjectif postposé',
    brief:'客觀分類的形容詞在後面',
    pts:['顏色、國籍、形狀、類別一律後置：une voiture rouge、un film français'],
    ex:[{fr:'une ville française', zh:'一座法國城市'}], gram:'adjectifs-accord' },
  { n:'2-2-2', lvl:'A2', name:'BAGS 前置組', fr:'adjectifs antéposés',
    brief:'美醜好壞大小新舊老少——高頻評價字搶前位',
    pts:['Beauté美醜 Âge新舊老少 Goodness好壞 Size大小：beau, joli, bon, mauvais, grand, petit, nouveau, vieux, jeune','前置+複數 → des 變 de：de beaux objets'],
    ex:[{fr:'un beau garçon, une petite maison', zh:'帥男孩、小房子'}] },
  { n:'2-2-3', lvl:'B1', name:'前後變義', fr:'place et sens',
    brief:'同一個字，位置一換意思就換',
    pts:['un grand homme 偉人 / un homme grand 高個子','mon ancien prof 前任老師 / une maison ancienne 老房子','ma propre chambre 我自己的房間 / une chambre propre 乾淨的房間'],
    ex:[{fr:'un grand homme ≠ un homme grand', zh:'偉人 ≠ 高個子'}] },
  { n:'2-2-4', lvl:'A2', name:'母音前特殊形', fr:'bel / nouvel / vieil',
    brief:'beau/nouveau/vieux 遇母音的墊音形',
    pts:['un bel homme、un nouvel ordinateur、un vieil ami','只在「陽性單數+母音開頭名詞」出現；發音其實＝陰性形'],
    ex:[{fr:'un bel appartement', zh:'一間漂亮的公寓'}],
    vs:[{n:'1-5-2', note:'mon amie 同一條母音相撞禁忌'}] },
 ]},

 { n:'2-3', name:'比較與最高級', fr:'La comparaison', topics:['comparaison'], items:[
  { n:'2-3-1', lvl:'A2', name:'比較級三式', fr:'plus / aussi / moins … que',
    brief:'三個副詞當萬用零件',
    pts:['plus + adj + que（更）、aussi…que（一樣）、moins…que（較不）','比較對象是代名詞用重讀形：plus grande que moi'],
    ex:[{fr:'Elle est plus grande que moi.', zh:'她比我高。'}], gram:'comparaison' },
  { n:'2-3-2', lvl:'A2', name:'meilleur 與 pire', fr:'comparatifs irréguliers',
    brief:'拉丁文比較級活化石，不走 plus',
    pts:['bon → meilleur（絕不說 plus bon）','mauvais → pire','副詞版：bien → mieux（B1，跟 meilleur 常搞混）'],
    ex:[{fr:'Le thé est meilleur que le café.', zh:'茶比咖啡好。'}],
    vs:[{n:'9-5-2', note:'meilleur 配名詞（形容詞）、mieux 配動詞（副詞）'}] },
  { n:'2-3-3', lvl:'B1', name:'最高級', fr:'le superlatif',
    brief:'比較級前面加定冠詞',
    pts:['le/la/les plus + adj：la plus grande ville','形容詞在後位時冠詞出現兩次：la ville la plus grande','範圍用 de：le meilleur de la classe'],
    ex:[{fr:'C\'est la plus belle plage de France.', zh:'這是法國最美的海灘。'}] },
  { n:'2-3-4', lvl:'B1', name:'名詞與動詞的比較', fr:'plus de … que / verbe + plus que',
    brief:'比數量用 plus de，比動作用動詞+plus',
    pts:['J\'ai plus de livres que toi（數量）','Il travaille plus que moi（動作）'],
    ex:[{fr:'Elle a autant de patience que lui.', zh:'她跟他一樣有耐心。（autant de＝名詞版aussi）'}] },
 ]},
]},

// ═══ 第 3 章 代名詞 ═════════════════════════════════════════
{ n:'3', name:'代名詞', fr:'Les pronoms', sections:[

 { n:'3-1', name:'主詞代名詞', fr:'Pronoms sujets', items:[
  { n:'3-1-1', lvl:'A1', name:'六人稱與 tu/vous', fr:'je, tu, il …',
    brief:'主詞代名詞是黏在動詞上的輕音節',
    pts:['je/tu/il/elle/nous/vous/ils/elles','vous＝敬稱單數或複數；tu＝熟人單數——選錯是社交地雷不是文法錯','ils 只要混一個男性就用（哪怕99女1男）'],
    ex:[{fr:'Vous êtes professeur ?', zh:'您是老師嗎？（敬稱）'}] },
  { n:'3-1-2', lvl:'A1', name:'on', fr:'on = nous 口語版',
    brief:'「人」磨成的萬用主詞，動詞跟 il 同形',
    pts:['口語的我們：On va au cinéma ?','也可指「大家/人們」：En France, on mange tard','動詞永遠第三人稱單數'],
    ex:[{fr:'On a un appartement.', zh:'我們有一間公寓。'}],
    topics:['on-vs-nous'], gram:'pronouns',
    vs:[{n:'6-4-1', note:'on 也是法文迴避被動語態的主力'}] },
 ]},

 { n:'3-2', name:'重讀代名詞', fr:'Pronoms toniques', items:[
  { n:'3-2-1', lvl:'A2', name:'moi / toi / lui / eux', fr:'pronoms toniques',
    brief:'有重音的加強版，扛主詞代名詞站不住的場合',
    pts:['moi, toi, lui, elle, nous, vous, eux, elles','用在：介詞後（chez lui）、強調（Moi, je pense…）、單獨回答（Qui ? Moi.）、比較後（plus grand que toi）','⚠️ il→lui、ils→eux 是最常錯的兩格'],
    ex:[{fr:'Chez eux, on mange bien.', zh:'在他們家吃得好。'},{fr:'Et toi ?', zh:'那你呢？'}],
    topics:['pronoms-toniques'], gram:'pronouns' },
 ]},

 { n:'3-3', name:'受詞代名詞', fr:'Pronoms compléments', items:[
  { n:'3-3-1', lvl:'A2', name:'COD 直接受詞', fr:'me, te, le, la, nous, vous, les',
    brief:'不經介詞的受詞，放動詞前面',
    pts:['Je le connais（我認識他）——先想「動詞直接吃到誰」','母音前縮寫：le/la→l\'、me→m\'、te→t\'','否定包住：Je ne la connais pas'],
    ex:[{fr:'Tu m\'aides ?', zh:'你幫我嗎？'},{fr:'Il les aime.', zh:'他愛他們。'}],
    topics:['cod-pronouns'], gram:'pronouns',
    vs:[{n:'3-3-2', note:'COD吃「誰/什麼」；COI吃「à+人」→lui/leur'}] },
  { n:'3-3-2', lvl:'B1', name:'COI 間接受詞', fr:'lui / leur',
    brief:'動詞經過 à 才碰到的人 → lui/leur',
    pts:['parler à、téléphoner à、donner à… → Je lui parle（不分男女！）','複數 leur：Je leur téléphone','me/te/nous/vous 身兼 COD/COI 兩職，只有第三人稱分家'],
    ex:[{fr:'Je lui donne le livre.', zh:'我把書給他/她。'}],
    vs:[{n:'3-3-1', note:'le/la（直接）vs lui（經過à）——測驗最愛考的分界'}] },
  { n:'3-3-3', lvl:'B2', name:'雙代名詞順序', fr:'ordre des doubles pronoms',
    brief:'兩顆代名詞疊放的固定軌道',
    pts:['順序：me/te/se/nous/vous → le/la/les → lui/leur → y → en','Il me le donne / Je le lui donne','口訣：一二人稱先行，第三人稱 COD 在 COI 前'],
    ex:[{fr:'Je le lui donne.', zh:'我把它給他。'}] },
 ]},

 { n:'3-4', name:'y 與 en', fr:'Les pronoms y et en', items:[
  { n:'3-4-1', lvl:'A2', name:'y ＝ 那裡', fr:'y de lieu',
    brief:'地點收進一個字母',
    pts:['代替 à/en/chez/dans + 地點：Tu vas à Paris ? — J\'y vais.','固定句：On y va !（走吧）、Ça y est !（好了/搞定）'],
    ex:[{fr:"J'y vais demain.", zh:'我明天去那裡。'}],
    topics:['pronom-y'], gram:'pronouns' },
  { n:'3-4-2', lvl:'B1', name:'y ＝ à + 事物', fr:'y remplaçant à + chose',
    brief:'penser à、réfléchir à 的事物版代名詞',
    pts:['Tu penses à ton examen ? — J\'y pense.','⚠️ à+人不用 y，用重讀形：Je pense à lui'],
    ex:[{fr:"J'y réfléchis.", zh:'我在考慮這件事。'}] },
  { n:'3-4-3', lvl:'B1', name:'en ＝ 部分量', fr:'en de quantité',
    brief:'du/de la/des/數量 的名詞收進 en',
    pts:['Tu veux du café ? — J\'en veux bien.','帶數字要複述數字：Tu as des enfants ? — J\'en ai deux.'],
    ex:[{fr:"J'en ai deux.", zh:'我有兩個。'}],
    vs:[{n:'8-2-1', note:'en 也是介係詞（en France, en bus）——同形不同身分'}] },
  { n:'3-4-4', lvl:'B1', name:'en ＝ de + 事物', fr:'en remplaçant de + chose',
    brief:'parler de、avoir besoin de 的事物版',
    pts:['Tu parles de ton projet ? — J\'en parle souvent.','de+人用重讀形：Je parle de lui'],
    ex:[{fr:"J'en ai besoin.", zh:'我需要它。'}] },
 ]},

 { n:'3-5', name:'關係代名詞', fr:'Pronoms relatifs', topics:['qui-que'], items:[
  { n:'3-5-1', lvl:'B1', name:'qui（主格）', fr:'qui sujet',
    brief:'子句缺主詞用 qui——後面直接接動詞',
    pts:['la France est un pays qui change','qui 永不縮寫（qui il→qui il，不變 qu\'il）'],
    ex:[{fr:"L'homme qui parle est mon prof.", zh:'正在說話的人是我老師。'}], gram:'relatifs',
    vs:[{n:'3-5-2', note:'挖掉的洞是主詞→qui；是受詞→que'}] },
  { n:'3-5-2', lvl:'B1', name:'que（受格）', fr:'que objet',
    brief:'子句缺受詞用 que——後面先出現新主詞',
    pts:["c'est un métier que j'adore",'母音前縮 qu\'：le livre qu\'il lit'],
    ex:[{fr:"C'est un métier que j'adore.", zh:'這是我熱愛的職業。'}], gram:'relatifs' },
  { n:'3-5-3', lvl:'B1', name:'où（時地格）', fr:'où',
    brief:'地點與時間的關係詞',
    pts:['la ville où j\'habite（地）','le jour où je suis arrivé（時——中文說「的那天」，不能用 quand）'],
    ex:[{fr:"C'est la ville où je suis né.", zh:'這是我出生的城市。'}] },
  { n:'3-5-4', lvl:'B2', name:'dont（de格）', fr:'dont',
    brief:'動詞帶 de 的關係詞：de+先行詞',
    pts:['parler de → le film dont je parle','avoir besoin de → l\'outil dont j\'ai besoin','所有關係：la fille dont le père est médecin'],
    ex:[{fr:'le livre dont tu parles', zh:'你說的那本書'}] },
  { n:'3-5-5', lvl:'B2', name:'lequel 家族', fr:'lequel / auquel / duquel',
    brief:'介詞後的關係詞，性數配合',
    pts:['la table sur laquelle…、le projet auquel je pense','人可用 qui 代替：l\'ami avec qui je voyage'],
    ex:[{fr:'la raison pour laquelle je pars', zh:'我離開的原因'}] },
 ]},

 { n:'3-6', name:'不定代名詞', fr:'Pronoms indéfinis', items:[
  { n:'3-6-1', lvl:'A2', name:'quelqu\'un / quelque chose / tout', fr:'indéfinis courants',
    brief:'某人/某事/全部 的代名詞組',
    pts:['quelqu\'un（某人）、quelque chose（某事）、tout le monde（大家，動詞單數！）','否定鏡像：personne、rien（見 7-2-2）'],
    ex:[{fr:'Tout le monde est là.', zh:'大家都在。（est 不是 sont）'}] },
 ]},
]},

// ═══ 第 4 章 動詞變位系統（現在式） ══════════════════════════
{ n:'4', name:'動詞變位系統', fr:'La conjugaison au présent', sections:[

 { n:'4-1', name:'第一組 -ER', fr:'Verbes en -ER', items:[
  { n:'4-1-1', lvl:'A1', name:'標準 -ER 變位', fr:'parler 型',
    brief:'90%動詞的家：字尾多半不發音，變位其實是拼字',
    pts:['-e/-es/-e/-ons/-ez/-ent','parle=parles=parlent 同音——耳朵只要顧 nous -ons、vous -ez','新動詞一律入此組：googler、liker'],
    ex:[{fr:'Je parle, nous parlons.', zh:'我說、我們說。'}],
    topics:['er-verbs'], gram:'er-verbs' },
  { n:'4-1-2', lvl:'A2', name:'拼寫微調五家族', fr:'particularités orthographiques',
    brief:'為保住發音做的拼字手術',
    pts:['manger→nous mangeons（保軟g）；commencer→nous commençons（ç保s音）','acheter→j\'achète（啞音節前開音變è）；appeler→j\'appelle（疊字版同功能）','payer→je paie/paye（兩可）'],
    ex:[{fr:'nous mangeons, j\'achète', zh:'我們吃、我買'}] },
  { n:'4-1-3', lvl:'A1', name:'aller（獨行俠）', fr:'aller',
    brief:'唯一不規則的 -er 動詞——因為它是拼裝車',
    pts:['vais/vas/va/allons/allez/vont（來自三個不同拉丁動詞的零件）','是 futur proche 的引擎（見 5-5-1）'],
    ex:[{fr:'Je vais au marché.', zh:'我去市場。'}] },
 ]},

 { n:'4-2', name:'第二組 -IR', fr:'Verbes en -IR (finir)', items:[
  { n:'4-2-1', lvl:'A2', name:'finir 型（-iss-）', fr:'finir, choisir, réfléchir',
    brief:'複數帶 -iss- 的規則家族',
    pts:['-is/-is/-it/-issons/-issez/-issent','-iss- 是拉丁文「逐漸變成」的化石：grandir（長大）、rougir（變紅）多半是變化類動詞','regular 判別法：能不能說 nous -issons'],
    ex:[{fr:'Nous choisissons le menu.', zh:'我們選套餐。'}],
    topics:['ir-re-verbs'], gram:'ir-re' },
 ]},

 { n:'4-3', name:'第三組（不規則）', fr:'Le 3e groupe', items:[
  { n:'4-3-1', lvl:'A1', name:'être 與 avoir', fr:'être / avoir',
    brief:'最高頻→磨損最兇→最不規則',
    pts:['être：suis/es/est/sommes/êtes/sont；avoir：ai/as/a/avons/avez/ont','年齡感受用 avoir：J\'ai 25 ans、j\'ai faim/froid/chaud','兩者都是複合時態的助動詞（見 5-2）'],
    ex:[{fr:"J'ai faim.", zh:'我餓了。（擁有飢餓）'}],
    topics:['etre-avoir'], gram:'etre-avoir' },
  { n:'4-3-2', lvl:'A2', name:'faire 與 dire', fr:'faire / dire',
    brief:'vous faites、vous dites——僅有的非 -ez 組',
    pts:['faire：fais/fais/fait/faisons/faites/font','dire：dis/dis/dit/disons/dites/disent','faire 是萬用動詞：faire du sport/les courses/la cuisine、il fait beau'],
    ex:[{fr:'Vous faites la cuisine ?', zh:'你們煮飯嗎？（faites！）'}],
    topics:['irregular-verbs-3rd-group'], gram:'ir-re' },
  { n:'4-3-3', lvl:'A2', name:'prendre 與 mettre', fr:'prendre / mettre',
    brief:'單數規矩、複數變臉',
    pts:['prendre：prends/prend/prenons/prennent（複數丟d，ils疊n）','mettre：mets/met/mettons（雙t只在複數）','家族：apprendre、comprendre；promettre、permettre 同模式'],
    ex:[{fr:'Ils prennent le bus.', zh:'他們搭公車。'}] },
  { n:'4-3-4', lvl:'A2', name:'venir 與 tenir', fr:'venir / tenir',
    brief:'viens/viennent 的鼻音家族',
    pts:['viens/viens/vient/venons/venez/viennent','venir de + inf＝剛剛做完（見 5-6-1）','家族：revenir、devenir、se souvenir；tenir 同模式'],
    ex:[{fr:'Je viens de Taïwan.', zh:'我來自台灣。'}] },
  { n:'4-3-5', lvl:'A2', name:'partir / sortir / dormir 型', fr:'verbes en -tir/-mir',
    brief:'單數砍尾音的口語家族',
    pts:['pars/pars/part/partons（單數丟t音）','sortir、dormir、sentir、servir 同模式'],
    ex:[{fr:'Je pars demain.', zh:'我明天出發。'}] },
  { n:'4-3-6', lvl:'A2', name:'vendre 型 -RE', fr:'verbes en -dre',
    brief:'il 形零字尾的規則 -RE 家族',
    pts:['vends/vends/vend/vendons/vendez/vendent','répondre、attendre、entendre、perdre 同模式'],
    ex:[{fr:'Ils vendent le pain.', zh:'他們賣麵包。'}] },
  { n:'4-3-7', lvl:'A2', name:'情態三王 pouvoir/vouloir/devoir', fr:'verbes modaux',
    brief:'自己變位、後面永遠原形',
    pts:['peux/peut/pouvons/peuvent；veux/veut/voulons/veulent；dois/doit/devons/doivent','⚠️ elle veut 不是 veux——x是je/tu專用','je voudrais＝想要的禮貌版（條件式，見 6-2-1）'],
    ex:[{fr:'Elle veut partir.', zh:'她想離開。'}],
    topics:['pouvoir-vouloir'], gram:'ir-re' },
  { n:'4-3-8', lvl:'B1', name:'savoir / connaître / voir / boire', fr:'autres irréguliers',
    brief:'高頻不規則的第二梯隊',
    pts:['sais/sait/savons；connais/connaît/connaissons；vois/voit/voyons/voient；bois/boit/buvons/boivent','savoir＝會（技能/資訊）、connaître＝認識（人/地方）——只能接名詞'],
    ex:[{fr:'Je sais nager mais je ne connais pas cette piscine.', zh:'我會游泳但不認識這間泳池。'}] },
 ]},

 { n:'4-4', name:'反身動詞', fr:'Verbes pronominaux', items:[
  { n:'4-4-1', lvl:'A2', name:'反身代詞系統', fr:'se laver 型',
    brief:'動作回到自己，代詞跟人稱走',
    pts:['me/te/se/nous/vous/se + 動詞：je me lave','母音前縮寫：je m\'appelle、tu t\'habilles','日常起居全家桶：se lever、se doucher、s\'habiller、se coucher'],
    ex:[{fr:'Je me réveille à 7h.', zh:'我七點醒來。'}],
    topics:['reflexive-verbs'], gram:'reflechis' },
  { n:'4-4-2', lvl:'A2', name:'反身動詞的否定', fr:'négation des pronominaux',
    brief:'ne 站在反身代詞前面',
    pts:['Je ne me réveille pas à 7h（ne+me+動詞+pas）','原形時代詞先行：ne pas se lever'],
    ex:[{fr:'Il ne se rase pas.', zh:'他不刮鬍子。'}] },
  { n:'4-4-3', lvl:'B1', name:'相互動詞', fr:'sens réciproque',
    brief:'複數的 se ＝「互相」',
    pts:['Ils se téléphonent（他們互打電話）','On se voit demain ?（明天見？）'],
    ex:[{fr:'Nous nous aimons.', zh:'我們相愛。'}] },
 ]},

 { n:'4-5', name:'無人稱動詞', fr:'Verbes impersonnels', items:[
  { n:'4-5-1', lvl:'A1', name:'il y a / il faut / il fait', fr:'expressions impersonnelles',
    brief:'il 是假主詞，沒有人在那裡',
    pts:['il y a＝有（存在）：Il y a un chien','il faut + inf＝必須（見 6-7-1）','天氣全家桶：il fait beau/froid、il pleut、il neige'],
    ex:[{fr:'Il y a du vent et il pleut.', zh:'有風而且下雨。'}],
    vs:[{n:'9-4-1', note:'il y a + 時間＝「…之前」是另一個身分'}] },
 ]},
]},
];

const CODEX_PART2 = [

// ═══ 第 5 章 時態（直陳式時間軸） ════════════════════════════
{ n:'5', name:'時態', fr:'Les temps de l\'indicatif', sections:[

 { n:'5-1', name:'現在式的地盤', fr:'Le présent', items:[
  { n:'5-1-1', lvl:'A1', name:'présent 的三種工作', fr:'valeurs du présent',
    brief:'現在、習慣、以及「還在繼續」——比中文英文管得寬',
    pts:['當下：Je mange（我正在吃——法文沒有進行式，présent兼任）','習慣：Je travaille le lundi','depuis 句的「持續到現在」也用présent（見 9-4-1）'],
    ex:[{fr:'Je travaille depuis 8h.', zh:'我從八點工作到現在。（用現在式！）'}] },
 ]},

 { n:'5-2', name:'複合過去式', fr:'Le passé composé', topics:['passe-compose'], items:[
  { n:'5-2-1', lvl:'A2', name:'avoir + 過去分詞', fr:'PC avec avoir',
    brief:'「擁有＋完成品」表達過去——大多數動詞的過去式',
    pts:["J'ai mangé、Ils ont acheté、Vous avez trouvé",'否定包住助動詞：On n\'a pas trouvé de lit','疑問倒裝也只動助動詞：As-tu fini ?'],
    ex:[{fr:'Vous avez trouvé des meubles ?', zh:'你們找到家具了嗎？'}], gram:'passe' },
  { n:'5-2-2', lvl:'A2', name:'être 家族＋配合', fr:'PC avec être',
    brief:'移動/狀態轉變動詞：分詞像形容詞，跟主詞配合',
    pts:['14常客：aller, venir, partir, arriver, entrer, sortir, monter, descendre, rester, tomber, naître, mourir, retourner, passer','Elle est sortie（+e）、Ils sont partis（+s）——跟 elle est grande 同一個配合邏輯','記法：這些動詞講的是「主詞自己變成什麼/移到哪」'],
    ex:[{fr:'Elle est arrivée hier.', zh:'她昨天到了。'}],
    exc:['monter/descendre/sortir/passer 帶直接受詞時改用avoir：J\'ai sorti le chien（我遛了狗）'],
    vs:[{n:'5-2-3', note:'反身動詞一律搭 être'}], gram:'passe' },
  { n:'5-2-3', lvl:'B1', name:'反身動詞的 PC', fr:'PC des pronominaux',
    brief:'一律 être；配合看代詞是不是直接受詞',
    pts:['Elle s\'est levée（+e）','⚠️ 代詞是間接受詞時不配合：Elle s\'est lavé les mains（真正受詞是les mains在後面）'],
    ex:[{fr:'Ils se sont couchés tard.', zh:'他們很晚睡。'}] },
  { n:'5-2-4', lvl:'A2', name:'過去分詞的形', fr:'participes passés',
    brief:'-é / -i / -u 三條生產線＋高頻例外',
    pts:['-er→é（mangé）、-ir→i（fini）、-re→u（vendu）','高頻例外：être→été、avoir→eu、faire→fait、prendre→pris、mettre→mis、dire→dit、écrire→écrit、voir→vu、boire→bu、pouvoir→pu、vouloir→voulu、devoir→dû、venir→venu、naître→né、mourir→mort'],
    ex:[{fr:"J'ai pris le métro.", zh:'我搭了地鐵。（prendre→pris）'}] },
  { n:'5-2-5', lvl:'B2', name:'COD 前置的配合', fr:'accord avec COD antéposé',
    brief:'受詞跑到前面時，avoir 的分詞也要配合它',
    pts:['la robe que j\'ai achetée（que=la robe 在前→+e）','Je les ai vus（les在前→+s）','寫作扣分重災區，口語多半聽不出來'],
    ex:[{fr:'Ces photos ? Je les ai prises hier.', zh:'這些照片？我昨天拍的。（prises+es）'}] },
 ]},

 { n:'5-3', name:'未完成過去式', fr:'L\'imparfait', topics:['imparfait'], items:[
  { n:'5-3-1', lvl:'A2', name:'imparfait 的用途', fr:'valeurs de l\'imparfait',
    brief:'廣角鏡：過去的背景、狀態、習慣',
    pts:['描述當時場景：Il faisait beau, il y avait du monde','過去的習慣：Quand j\'étais petit, je jouais au foot','A2階段先掌握無人稱三兄弟：il faisait / il y avait / c\'était'],
    ex:[{fr:"C'était super !", zh:'（那時）超棒的！'}], gram:'imparfait',
    vs:[{n:'5-3-3', note:'vs passé composé——法文時態最重要的一組對比'}] },
  { n:'5-3-2', lvl:'B1', name:'imparfait 的變位', fr:'formation',
    brief:'nous 現在式砍 -ons ＋ ais/ais/ait/ions/iez/aient',
    pts:['nous faisons → je faisais；nous buvons → je buvais','唯一例外：être → j\'étais（因為 nous sommes 砍不出字根）'],
    ex:[{fr:'Nous mangions ensemble.', zh:'我們那時常一起吃飯。'}] },
  { n:'5-3-3', lvl:'B1', name:'PC vs imparfait（鏡頭論）', fr:'PC vs imparfait',
    brief:'特寫拍事件、廣角拍背景——同一段故事兩顆鏡頭',
    pts:['Il pleuvait（背景）quand je suis sorti（事件）','問自己：這句是「然後發生了什麼」（PC）還是「當時是什麼樣子」（imparfait）','敘事考題的靈魂，TEF/TCF寫作口說必考'],
    ex:[{fr:'Je dormais quand tu as téléphoné.', zh:'你來電時我正在睡。'}],
    vs:[{n:'5-2-2', note:'事件線用PC'}] },
 ]},

 { n:'5-4', name:'愈過去式', fr:'Le plus-que-parfait', items:[
  { n:'5-4-1', lvl:'B1', name:'過去的過去', fr:'PQP',
    brief:'助動詞改 imparfait ＋ 分詞：比過去更早一層',
    pts:["J'avais déjà mangé quand il est arrivé（他到之前我就吃完了）",'結構＝PC的助動詞退一格時態','間接引語的時態退位也用它（見 7-6-1）'],
    ex:[{fr:'Elle était déjà partie.', zh:'她（那時）已經走了。'}] },
 ]},

 { n:'5-5', name:'未來', fr:'Le futur', items:[
  { n:'5-5-1', lvl:'A2', name:'futur proche', fr:'aller + infinitif',
    brief:'口語主力：aller 變位＋原形',
    pts:['Je vais finir la robe（即將/打算）','只有 aller 動、後面永遠原形','否定包 aller：Je ne vais pas partir'],
    ex:[{fr:'On va être en retard !', zh:'我們要遲到了！'}],
    topics:['futur-proche'], gram:'futur-proche',
    vs:[{n:'5-5-2', note:'口語近程用proche、書面/遠程/承諾用simple'}] },
  { n:'5-5-2', lvl:'B1', name:'futur simple', fr:'le futur simple',
    brief:'原形＋avoir字尾：書面與承諾的未來',
    pts:['parler+ai/as/a/ons/ez/ont：je parlerai','高頻不規則字根：être→ser-、avoir→aur-、aller→ir-、faire→fer-、venir→viendr-、pouvoir→pourr-、voir→verr-','quand+futur（法文邏輯）：Quand j\'aurai le temps, je viendrai'],
    ex:[{fr:'Demain, il fera beau.', zh:'明天天氣會好。（氣象預報體）'}] },
 ]},

 { n:'5-6', name:'剛剛過去', fr:'Le passé récent', items:[
  { n:'5-6-1', lvl:'A2', name:'venir de + 原形', fr:'passé récent',
    brief:'「從做完某事走過來」＝剛剛做完',
    pts:['Je viens de finir（我剛結束）','aller+inf 的鏡像結構，同樣只動 venir'],
    ex:[{fr:'Il vient de partir.', zh:'他剛走。'}],
    topics:['passe-recent'], gram:'passe' },
 ]},

 { n:'5-7', name:'簡單過去式（識讀）', fr:'Le passé simple', items:[
  { n:'5-7-1', lvl:'B2', name:'文學過去式', fr:'passé simple',
    brief:'只出現在書面敘事，會認就好不用會寫',
    pts:['il parla、elle fut、ils vinrent——小說/歷史文的PC替身','閱讀測驗看到別慌：把它當PC理解即可'],
    ex:[{fr:'Il ouvrit la porte et sortit.', zh:'他開門出去了。（小說體）'}] },
 ]},

 { n:'5-8', name:'時態呼應', fr:'La concordance des temps', items:[
  { n:'5-8-1', lvl:'B2', name:'主句過去，從句退位', fr:'concordance',
    brief:'主句一變過去，從句時態整排後退一格',
    pts:['présent→imparfait：Il dit qu\'il vient → Il a dit qu\'il venait','futur→conditionnel：…qu\'il viendrait','PC→PQP：…qu\'il était venu'],
    ex:[{fr:'Elle pensait que tu viendrais.', zh:'她以為你會來。'}],
    vs:[{n:'7-6-1', note:'間接引語就是它的主戰場'}] },
 ]},
]},

// ═══ 第 6 章 語氣 ═══════════════════════════════════════════
{ n:'6', name:'語氣', fr:'Les modes', sections:[

 { n:'6-1', name:'命令式', fr:'L\'impératif', items:[
  { n:'6-1-1', lvl:'A2', name:'命令式', fr:'impératif',
    brief:'砍掉主詞直接說；-er 動詞 tu 形去 s',
    pts:['只有 tu/nous/vous 三格：Mange ! / Allons-y ! / Montez !','-ER 的 tu 去 s（Mange !），其他組保留（Finis !）','否定照包：N\'achetez pas de tickets !','代名詞後掛且 me→moi：Aide-moi !（否定回前：Ne m\'aide pas）'],
    ex:[{fr:'Montez dans le bus !', zh:'上公車！'}],
    topics:['imperative-mood'], gram:'imperatif' },
 ]},

 { n:'6-2', name:'條件式', fr:'Le conditionnel', items:[
  { n:'6-2-1', lvl:'A2', name:'禮貌條件式', fr:'je voudrais …',
    brief:'把要求包上「假設」的軟墊',
    pts:['je voudrais（我想要）、j\'aimerais、tu pourrais…?、on devrait','點餐/請求的標準開場：Je voudrais une baguette'],
    ex:[{fr:'Je voudrais un café, s\'il vous plaît.', zh:'我想要一杯咖啡，謝謝。'}] },
  { n:'6-2-2', lvl:'B1', name:'條件式現在＋si句', fr:'conditionnel présent',
    brief:'futur字根＋imparfait字尾：假設世界的動詞',
    pts:['形：je parlerais、il ferait（跟futur只差字尾）','Si + imparfait, conditionnel：Si j\'avais le temps, je voyagerais','也用於委婉斷言：Ce serait une bonne idée'],
    ex:[{fr:'Si j\'étais riche, j\'achèterais une maison.', zh:'如果我有錢就買房。'}],
    vs:[{n:'6-6-1', note:'si 條件句三式的第二式'}] },
  { n:'6-2-3', lvl:'B2', name:'條件式過去（悔恨式）', fr:'conditionnel passé',
    brief:'aurais/serais＋分詞：早知道就…',
    pts:["J'aurais dû partir plus tôt（我早該早點走）",'Si + PQP, cond. passé：Si j\'avais su, je n\'aurais pas accepté'],
    ex:[{fr:'Tu aurais pu me dire !', zh:'你大可以跟我說啊！'}] },
 ]},

 { n:'6-3', name:'虛擬式', fr:'Le subjonctif', items:[
  { n:'6-3-1', lvl:'B1', name:'什麼時候觸發', fr:'emplois du subjonctif',
    brief:'主句表達意志/情緒/懷疑時，que 後面切到主觀時空',
    pts:['意志：il faut que、je veux que','情緒：je suis content que','懷疑：je ne pense pas que','連詞：bien que、pour que、avant que','⚠️ 確信類不觸發：je pense que + 直陳式'],
    ex:[{fr:'Il faut que tu viennes.', zh:'你必須來。'}],
    vs:[{n:'6-3-3', note:'pense que vs ne pense pas que——同動詞兩個時空'}] },
  { n:'6-3-2', lvl:'B1', name:'虛擬式的形', fr:'formation',
    brief:'ils 現在式砍 -ent ＋ e/es/e/ions/iez/ent',
    pts:['ils finissent → que je finisse','高頻不規則：être→sois、avoir→aie、aller→aille、faire→fasse、pouvoir→puisse、savoir→sache'],
    ex:[{fr:'…que tu fasses tes devoirs.', zh:'…你把作業做完。'}] },
  { n:'6-3-3', lvl:'B2', name:'虛擬 vs 直陳', fr:'subjonctif ou indicatif ?',
    brief:'斷言用直陳、態度用虛擬——考分界線',
    pts:['Je pense qu\'il vient（斷言）/ Je ne pense pas qu\'il vienne（懷疑）','espérer 特例走直陳：J\'espère qu\'il viendra'],
    ex:[{fr:'Je doute qu\'il soit là.', zh:'我懷疑他在不在。'}] },
 ]},

 { n:'6-4', name:'被動與替代', fr:'La voix passive', items:[
  { n:'6-4-1', lvl:'B2', name:'被動語態與 on 替代', fr:'passif / on',
    brief:'être＋分詞（配合主詞）；口語多半用 on 繞開',
    pts:['La lettre a été écrite par Marie（分詞配合主詞）','口語替代：On m\'a volé mon vélo（比 mon vélo a été volé 自然）','se faire + inf：Il s\'est fait renvoyer（被開除）'],
    ex:[{fr:'Le gâteau a été mangé.', zh:'蛋糕被吃掉了。'}],
    vs:[{n:'3-1-2', note:'on 的第三個身分：被動殺手'}] },
 ]},

 { n:'6-5', name:'副動詞', fr:'Le gérondif', items:[
  { n:'6-5-1', lvl:'B2', name:'en + -ant', fr:'gérondif',
    brief:'「一邊…一邊」與「藉由…」',
    pts:['Il écoute de la musique en travaillant（同時）','On apprend en faisant（方式/手段）','形：nous 現在式砍-ons＋ant（faisant、buvant）'],
    ex:[{fr:'Je me suis blessé en tombant.', zh:'我跌倒受了傷。'}] },
 ]},

 { n:'6-6', name:'si 條件句', fr:'Les hypothèses avec si', items:[
  { n:'6-6-1', lvl:'B1', name:'三式總表', fr:'si + trois temps',
    brief:'現實→présent+futur；假設→imparfait+cond.；悔恨→PQP+cond.passé',
    pts:['①Si tu viens, on mangera ensemble（真可能）','②Si tu venais, on mangerait（現在的假設）','③Si tu étais venu, on aurait mangé（過去的悔恨）','⚠️ si 後面永遠不放 futur/conditionnel'],
    ex:[{fr:"S'il pleut demain, je resterai chez moi.", zh:'明天下雨我就待在家。'}] },
 ]},

 { n:'6-7', name:'義務與建議', fr:'Obligation et conseil', items:[
  { n:'6-7-1', lvl:'A2', name:'il faut vs devoir', fr:'il faut / devoir',
    brief:'一般義務（假主詞）vs 個人義務（欠）',
    pts:['il faut + inf：不指定誰的必須','devoir：dois/doit/devons——你「欠」這個動作','il faut que + 虛擬式＝指定對象版（B1，見 6-3-1）'],
    ex:[{fr:'Il faut boire de l\'eau. / Je dois partir.', zh:'該喝水。／我得走了。'}],
    topics:['ilfaut-devoir'], gram:'conseils' },
  { n:'6-7-2', lvl:'A2', name:'給建議句組', fr:'donner des conseils',
    brief:'conseiller de / tu peux / tu devrais 三段軟硬度',
    pts:['Je te conseille de + inf','Tu peux + inf（軟）→ Tu devrais + inf（中）→ Il faut + inf（硬）'],
    ex:[{fr:'Je te conseille de faire du sport.', zh:'我建議你運動。'}],
    topics:['giving-advice'], gram:'conseils' },
  { n:'6-7-3', lvl:'A2', name:'公告體：禁止與請求', fr:'Défense de / Merci de',
    brief:'名詞開頭的告示語氣',
    pts:['Défense de + inf（禁止…）、Interdit de + inf','Merci de + inf（請…，禮貌指令）'],
    ex:[{fr:'Défense de fumer.', zh:'禁止吸菸。'}],
    topics:['interdiction-demande'], gram:'conseils' },
 ]},
]},

// ═══ 第 7 章 句型 ═══════════════════════════════════════════
{ n:'7', name:'句型', fr:'Les structures de phrase', sections:[

 { n:'7-1', name:'問句', fr:'L\'interrogation', items:[
  { n:'7-1-1', lvl:'A1', name:'問句三式', fr:'trois registres',
    brief:'語調（口語）/ est-ce que（萬用）/ 倒裝（書面）',
    pts:['Tu viens ? / Est-ce que tu viens ? / Viens-tu ?','est-ce que＝問句支架，後面語序完全不動','倒裝母音相撞加t：Va-t-il ?'],
    ex:[{fr:'Est-ce que vous parlez français ?', zh:'您說法語嗎？'}], gram:'questions' },
  { n:'7-1-2', lvl:'A1', name:'疑問詞', fr:'mots interrogatifs',
    brief:'qui/que/où/quand/comment/combien/pourquoi',
    pts:['口語常後置：Tu habites où ?','pourquoi 回答用 parce que'],
    ex:[{fr:'Tu pars quand ?', zh:'你何時走？'}],
    topics:['question-words'], gram:'questions' },
  { n:'7-1-3', lvl:'A1', name:'quel 的配合', fr:'quel / quelle / quels / quelles',
    brief:'quel 是形容詞，跟著名詞穿制服',
    pts:['quel âge、quelle ville、quels artistes、quelles langues','搭 être：Quelle est la date ?'],
    ex:[{fr:'Quelles langues tu parles ?', zh:'你說哪些語言？'}], gram:'questions' },
  { n:'7-1-4', lvl:'B1', name:'qu\'est-ce qui / que', fr:'sujet ou objet ?',
    brief:'「什麼」當主詞還是受詞的分岔',
    pts:['Qu\'est-ce qui se passe ?（什麼＝主詞）','Qu\'est-ce que tu fais ?（什麼＝受詞）','尾字 qui/que 跟關係代名詞同一套主受格邏輯（見 3-5）'],
    ex:[{fr:"Qu'est-ce qui ne va pas ?", zh:'哪裡不對勁？'}] },
 ]},

 { n:'7-2', name:'否定', fr:'La négation', topics:['negation'], items:[
  { n:'7-2-1', lvl:'A1', name:'ne … pas', fr:'négation de base',
    brief:'兩片麵包夾住變位動詞',
    pts:['Je ne comprends pas','母音前 n\'：Je n\'aime pas','複合時態夾助動詞：Je n\'ai pas fini'],
    ex:[{fr:'Elle ne travaille pas le lundi.', zh:'她週一不上班。'}], gram:'negation' },
  { n:'7-2-2', lvl:'A2', name:'換尾巴家族', fr:'jamais / plus / rien / personne',
    brief:'尾巴原本都是名詞（一步/一人/一物），搶走了否定意義',
    pts:['ne…jamais（從不）、ne…plus（不再）、ne…rien（沒東西）、ne…personne（沒人）','rien/personne 可當主詞：Personne ne sait','⚠️ plus 否定時 s 不發音（發音就變「更多」）'],
    ex:[{fr:'Je ne connais personne à Paris.', zh:'我在巴黎誰都不認識。'}], gram:'negation' },
  { n:'7-2-3', lvl:'A2', name:'否定後冠詞變 de', fr:'pas de',
    brief:'數量歸零 → de',
    pts:['du pain → pas de pain、des amis → pas d\'amis','定冠詞不變：Je n\'aime pas le café（喜好談的是整類）'],
    ex:[{fr:'Il n\'y a plus de dessert.', zh:'甜點沒了。'}],
    vs:[{n:'1-3-5', note:'跟量詞變de是同一條'}] },
  { n:'7-2-4', lvl:'B1', name:'ne … que（只有）', fr:'restriction',
    brief:'不是否定，是限縮——「除了…之外都不」',
    pts:['Je n\'ai que dix euros（我只有十歐）','que 站在被限縮的東西前面','＝seulement 的文法版'],
    ex:[{fr:'Elle ne boit que de l\'eau.', zh:'她只喝水。'}] },
  { n:'7-2-5', lvl:'B1', name:'口語掉 ne', fr:'chute du ne',
    brief:'日常口語 ne 常消失——聽力要能認出來',
    pts:['Je sais pas（=Je ne sais pas）、C\'est pas grave','聽力放寬、寫作絕不省'],
    ex:[{fr:"J'ai pas le temps.", zh:'我沒時間。（口語）'}] },
 ]},

 { n:'7-3', name:'c\'est 與 il est', fr:'c\'est / il est', items:[
  { n:'7-3-1', lvl:'A2', name:'分界線', fr:'c\'est + nom / il est + adj',
    brief:'c\'est 端出一個東西；il est 描述屬性',
    pts:['c\'est + 冠詞 + 名詞：C\'est une ville française','il est + 形容詞/裸職業：Il est grenoblois、Elle est médecin','評論整件事用 c\'est：C\'est important'],
    ex:[{fr:"C'est un bon prof. / Il est prof.", zh:'他是位好老師。／他是老師。'}],
    topics:['cest-il-est'], gram:'etre-avoir' },
 ]},

 { n:'7-4', name:'強調句', fr:'La mise en relief', items:[
  { n:'7-4-1', lvl:'B1', name:'c\'est … qui / que', fr:'phrase clivée',
    brief:'把聚光燈打在句子某一塊',
    pts:["C'est moi qui ai payé（是我付的——動詞跟真主詞配合）","C'est demain que je pars（強調時間）"],
    ex:[{fr:"C'est lui qui a raison.", zh:'是他對。'}] },
 ]},

 { n:'7-5', name:'感嘆句', fr:'L\'exclamation', items:[
  { n:'7-5-1', lvl:'B1', name:'Quel … ! / Comme … !', fr:'exclamatives',
    brief:'quel 感嘆配合名詞；comme/qu\'est-ce que 感嘆整句',
    pts:['Quelle bonne idée !（不加冠詞）','Comme c\'est beau ! / Qu\'est-ce que c\'est bon !'],
    ex:[{fr:'Quel beau temps !', zh:'天氣真好！'}] },
 ]},

 { n:'7-6', name:'間接引語', fr:'Le discours indirect', items:[
  { n:'7-6-1', lvl:'B2', name:'轉述的變形', fr:'discours rapporté',
    brief:'que 接進來：代名詞換、時態退位、問句改 si/ce que',
    pts:['Il dit : « Je viens » → Il dit qu\'il vient','主句過去→時態退位（見 5-8-1）','是否問句→si：Il demande si tu viens','qu\'est-ce que→ce que：Il demande ce que tu fais'],
    ex:[{fr:"Elle m'a demandé si j'étais libre.", zh:'她問我有沒有空。'}] },
 ]},
]},

// ═══ 第 8 章 介係詞與連接詞 ══════════════════════════════════
{ n:'8', name:'介係詞與連接詞', fr:'Prépositions et connecteurs', sections:[

 { n:'8-1', name:'地點介係詞', fr:'Prépositions de lieu', items:[
  { n:'8-1-1', lvl:'A1', name:'國家與城市', fr:'en / au / aux / à',
    brief:'同一次縮合的不同下場：en陰、au陽、aux複、à城市',
    pts:['en France（陰）、au Canada（陽）、aux États-Unis（複）、à Taipei（城市/島）','來自：de France、du Canada、des États-Unis、de Taïwan','字尾 -e 多陰性'],
    ex:[{fr:'Je vais en France, il vit au Japon.', zh:'我去法國，他住日本。'}],
    exc:['le Mexique 陽性（-e卻陽）→ au Mexique'],
    topics:['preposition-country'], gram:'prepositions' },
  { n:'8-1-2', lvl:'A1', name:'場所與 chez', fr:'à la / au / chez',
    brief:'地方用 à+縮合；「人的地盤」用 chez',
    pts:['à la boucherie、au marché、aux caisses','chez + 人/職業：chez le poissonnier、chez moi、chez le médecin'],
    ex:[{fr:'Je vais chez le coiffeur puis au supermarché.', zh:'我先去理髮店再去超市。'}],
    topics:['preposition-place-transport'], gram:'prepositions' },
  { n:'8-1-3', lvl:'A2', name:'方位詞組', fr:'localisation',
    brief:'de 家族的方位套件',
    pts:['à droite de / à gauche de / à côté de / en face de / près de / loin de','de+le 照縮：en face du canapé','entre A et B（之間）、sur/sous/dans/devant/derrière'],
    ex:[{fr:'La gare est loin de chez moi.', zh:'車站離我家很遠。'}],
    topics:['prepositions-lieu2'], gram:'prepositions' },
 ]},

 { n:'8-2', name:'交通介係詞', fr:'Transports', items:[
  { n:'8-2-1', lvl:'A1', name:'en / à + 交通工具', fr:'en bus / à pied',
    brief:'進得去的用 en，跨上去或步行用 à',
    pts:['en bus/métro/train/voiture/avion','à pied、à vélo、à moto'],
    ex:[{fr:"Je vais à l'école en bus.", zh:'我搭公車上學。'}],
    vs:[{n:'3-4-3', note:'en 另有代名詞身分——同形不同職'}] },
 ]},

 { n:'8-3', name:'de 與 à 的多重身分', fr:'de / à polyvalents', items:[
  { n:'8-3-1', lvl:'B1', name:'de 的身分清單', fr:'les emplois de « de »',
    brief:'所屬/來源/量詞後/否定後/形容詞前——五張臉',
    pts:['所屬：le livre de Paul','來源：venir de France','量詞後與否定後（見 1-3-5）','de+inf 接補語：content de te voir'],
    ex:[{fr:'le vélo de mon frère', zh:'我哥的腳踏車'}] },
  { n:'8-3-2', lvl:'B1', name:'à 的身分清單', fr:'les emplois de « à »',
    brief:'方向/位置/對象/用途/特徵',
    pts:['方向與位置：aller à Paris、être à la maison','間接受詞的橋：parler à、donner à（→lui/leur，見 3-3-2）','用途：une machine à laver；特徵：la fille aux yeux bleus'],
    ex:[{fr:'un verre à vin', zh:'酒杯（裝酒用的杯）'}] },
  { n:'8-3-3', lvl:'B2', name:'動詞的介係詞搭配', fr:'verbe + à / de + inf',
    brief:'動詞接原形要不要橋、用哪座橋——只能整組記',
    pts:['直通：vouloir/pouvoir/aimer + inf','à橋：commencer à、réussir à、apprendre à','de橋：essayer de、décider de、finir de、oublier de'],
    ex:[{fr:"J'apprends à conduire. / J'essaie de comprendre.", zh:'我在學開車。／我試著理解。'}] },
 ]},

 { n:'8-4', name:'連接詞', fr:'Les connecteurs', items:[
  { n:'8-4-1', lvl:'A1', name:'基礎連接詞', fr:'et / mais / ou / donc / car',
    brief:'並列句的五個基本零件',
    pts:['et（和）mais（但）ou（或）donc（所以）car（因為，書面）'],
    ex:[{fr:'Il est tard, donc je pars.', zh:'很晚了，所以我走了。'}] },
  { n:'8-4-2', lvl:'A2', name:'因果：parce que / pour', fr:'cause et but',
    brief:'parce que+子句講原因；pour+原形講目的',
    pts:['Je reste parce que je suis fatigué（原因）','Je pars pour travailler（目的）','pour ou contre + 名詞：表態句型（télétravail 課）'],
    ex:[{fr:'Pourquoi ? — Parce que !', zh:'為什麼？——就是這樣！'}],
    topics:['connectors-pour-parceque'], gram:'opinions' },
  { n:'8-4-3', lvl:'B1', name:'論述連接詞', fr:'connecteurs du discours',
    brief:'寫作口說的骨架詞：先後/對比/讓步/結論',
    pts:['順序：d\'abord → ensuite/puis → enfin','對比：cependant、pourtant、par contre','讓步：bien que（+虛擬）、malgré + 名詞','結論：par conséquent、en effet（佐證）'],
    ex:[{fr:"D'abord je lis, ensuite je réponds.", zh:'我先讀再回答。'}] },
 ]},
]},

// ═══ 第 9 章 副詞與時間表達 ══════════════════════════════════
{ n:'9', name:'副詞與時間', fr:'Adverbes et expressions de temps', sections:[

 { n:'9-1', name:'頻率', fr:'La fréquence', items:[
  { n:'9-1-1', lvl:'A1', name:'頻率光譜', fr:'toujours → jamais',
    brief:'從總是到從不的一條刻度尺',
    pts:['toujours > souvent > parfois/quelquefois > rarement > jamais','搭配週期：tous les jours、le lundi（每週一）、une fois par semaine','位置：變位動詞後（Je vais souvent au parc）'],
    ex:[{fr:'Il y va toujours.', zh:'他總是去。'}],
    topics:['frequency-adverbs'], gram:'negation' },
 ]},

 { n:'9-2', name:'強度與程度', fr:'L\'intensité', items:[
  { n:'9-2-1', lvl:'A2', name:'強度光譜', fr:'un peu → trop',
    brief:'un peu < assez < très/beaucoup < trop（過頭）',
    pts:['très + 形容詞/副詞：très grand','beaucoup + 動詞後：Je mange beaucoup','trop 自帶負評：Il travaille trop','量化名詞全部 +de：trop de sel'],
    ex:[{fr:'C\'est assez bien mais trop cher.', zh:'還不錯但太貴。'}],
    topics:['intensite'], gram:'negation' },
 ]},

 { n:'9-3', name:'副詞構詞', fr:'Formation des adverbes', items:[
  { n:'9-3-1', lvl:'B1', name:'-ment 副詞', fr:'adverbes en -ment',
    brief:'陰性形容詞＋ment（≈英文-ly）',
    pts:['lente→lentement、heureuse→heureusement','-ant/-ent 結尾變 -amment/-emment：récent→récemment','⚠️ bien/mal/vite 是獨立副詞不加 -ment'],
    ex:[{fr:'Parlez lentement, s\'il vous plaît.', zh:'請說慢一點。'}] },
 ]},

 { n:'9-4', name:'時間定位', fr:'Situer dans le temps', items:[
  { n:'9-4-1', lvl:'A2', name:'durée 四天王', fr:'pendant / depuis / il y a / à',
    brief:'問自己：括號閉合了沒',
    pts:['pendant＝閉合括號：J\'ai travaillé pendant trois ans','depuis＝開口括號連著現在（配présent！）：J\'habite ici depuis deux ans','il y a＝往回量到一個點：il y a dix jours','longtemps/toujours 當副詞直接放動詞後'],
    ex:[{fr:'Ils ont déménagé il y a dix jours.', zh:'他們十天前搬家。'}],
    topics:['duree'], gram:'duree-temps',
    vs:[{n:'4-5-1', note:'il y a 的另一個身分是「有」'}] },
  { n:'9-4-2', lvl:'A2', name:'à + 年紀 / 時刻', fr:'à 2 ans / à 8h',
    brief:'à 釘住一個時間點',
    pts:['à deux ans（兩歲時）、à 8 heures（八點）','de…à…：de 9h à 17h'],
    ex:[{fr:'Je suis arrivée en France à deux ans.', zh:'我兩歲時到法國。'}] },
  { n:'9-4-3', lvl:'A1', name:'日期與時刻', fr:'la date et l\'heure',
    brief:'le+數字+月份；heure 是陰性',
    pts:['le 4 juin（1號用 premier）','Il est une heure et demie（heure陰性→une、demie+e）','en janvier / au printemps（春天例外用au）、en été/automne/hiver'],
    ex:[{fr:"Mon anniversaire, c'est le 4 juin.", zh:'我生日是6月4日。'}],
    topics:['numbers-dates-heure'] },
  { n:'9-4-4', lvl:'A2', name:'相對時間詞', fr:'hier / demain / prochain / dernier',
    brief:'以「今天」為原點的座標詞',
    pts:['hier / aujourd\'hui / demain；avant-hier / après-demain','la semaine prochaine / dernière（跟名詞配合）','ce matin、ce soir、ce week-end'],
    ex:[{fr:'La semaine prochaine, nous partons.', zh:'下週我們出發。'}] },
 ]},

 { n:'9-5', name:'副詞位置與 bien/mieux', fr:'Place et cas particuliers', items:[
  { n:'9-5-1', lvl:'B1', name:'副詞的位置', fr:'place de l\'adverbe',
    brief:'短副詞貼動詞；複合時態夾中間',
    pts:['現在式：動詞後（Je mange souvent ici）','複合時態短副詞夾中間：J\'ai bien dormi、Il a trop mangé'],
    ex:[{fr:"J'ai déjà fini.", zh:'我已經做完了。'}] },
  { n:'9-5-2', lvl:'B1', name:'bien / mieux vs bon / meilleur', fr:'bien ou bon ?',
    brief:'副詞線（bien→mieux）與形容詞線（bon→meilleur）不互通',
    pts:['bon/meilleur 修飾名詞：un meilleur café','bien/mieux 修飾動詞：Il chante mieux que moi','C\'est bon（好吃/好了）vs C\'est bien（做得好/不錯）'],
    ex:[{fr:'Ça va mieux.', zh:'（狀況）好多了。'}],
    vs:[{n:'2-3-2', note:'meilleur 那條是形容詞線'}] },
 ]},
]},
];

// 合併兩段
CODEX_PART2.forEach(ch => CODEX.push(ch));

/* ── 術語白話字典（點擊小標籤彈出，全庫共用）────────────────── */
const CODEX_TERMS = {
  '部分冠詞': '「一些」的冠詞——不可數的東西取一部分：du pain＝一些麵包（不是整條）',
  '定冠詞': 'le/la/les——特定的、或泛指一整類（J\'aime le café＝咖啡這種東西）',
  '不定冠詞': 'un/une/des——第一次提到、隨便哪一個（un chien＝某一隻狗）',
  '縮合': '兩個字被講快黏成一個：de+le→du、à+le→au',
  '變位': '動詞跟著主詞換衣服：je parle / nous parlons——同一個動詞六種樣子',
  '原形': '動詞的字典形（沒穿衣服）：parler、finir——兩個動詞連用時第二個永遠原形',
  '助動詞': '幫忙組時態的 avoir/être：J\'ai mangé 的 ai 只是幫手，真正的動作是 mangé',
  '過去分詞': '動詞的「完成品」形：mangé、fini、vendu——複合過去式的第二塊零件',
  '反身動詞': '動作回到自己身上的動詞：se laver 洗自己＝洗澡（多了 me/te/se）',
  'COD': '動詞「直接吃到」的對象：「我看到他」的「他」——變代名詞放動詞前（Je le vois）',
  'COI': '動詞經過 à 才碰到的人：「我打電話給他」→ Je lui téléphone（不分男女）',
  '重讀代名詞': '有重音的加強版代名詞 moi/toi/lui/eux——介詞後、強調、單獨回答時用',
  '關係代名詞': '把兩句黏成一句的鉤子：l\'homme qui parle＝「正在說話的」那個人',
  '性數配合': '形容詞/分詞跟名詞穿同套制服：陰性+e、複數+s（grande, grands）',
  '直陳式': '預設模式——陳述事實用的動詞形（你目前學的幾乎都是它）',
  '虛擬式': '主觀模式——表達想要/情緒/懷疑時，que 後面動詞換的形（B1 才學）',
  '條件式': '假設與禮貌模式：je voudrais＝「我想要」的軟化版',
  '命令式': '砍掉主詞直接命令：Mange !＝吃！',
  '無人稱': 'il 是假主詞、沒有人在那裡：il pleut（下雨）、il faut（必須）',
  '介係詞': '名詞前的小方向詞：à/de/en/chez——法文的膠水',
  '先行詞': '關係子句修飾的那個名詞：le livre que je lis 裡的 le livre',
};

/* ── 索引與定位 helpers ───────────────────────────────────── */

// 攤平索引：座標→節點、topic→座標
const CODEX_BY_N = {};
const CODEX_TOPIC_MAP = {};
CODEX.forEach(ch => {
  CODEX_BY_N[ch.n] = ch;
  (ch.sections || []).forEach(sec => {
    CODEX_BY_N[sec.n] = sec;
    (sec.topics || []).forEach(t => { CODEX_TOPIC_MAP[t] = sec.n; });
    (sec.items || []).forEach(it => {
      CODEX_BY_N[it.n] = it;
      (it.topics || []).forEach(t => { CODEX_TOPIC_MAP[t] = it.n; });
    });
  });
});

// quiz topic → {num, name}；詞彙類 topic 沒有座標回傳 null
function codexLocate(topic) {
  const n = CODEX_TOPIC_MAP[topic];
  if (!n) return null;
  const node = CODEX_BY_N[n];
  return { num: n, name: node.name };
}

