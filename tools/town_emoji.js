/* town_emoji.js — 物品圖鑑用的圖案對照（2026-10-16）
 * 來源字庫：chunks.js 抽出的陰陽性名詞（跟 town.html／quest.html 的 genderPool 同一套抽法）。
 * quest.html 的 GENDER_EMOJI 會先合進來（town.html 載入後合併），這裡補其餘的字。
 * 抽象名詞配「意思最接近」的圖案；⚠️ 只是圖案，不是翻譯，中文意思一律看 chunks.js。
 */
var DEX_EMOJI = {
  sport:'⚽',cinéma:'🎬',musique:'🎵',université:'🎓',mariage:'💍',entrée:'🥗',addition:'🧾','steak-frites':'🥩',
  boulangerie:'🥖',boucherie:'🥩',poissonnerie:'🐟',fromagerie:'🧀',pâtisserie:'🧁','centre-ville':'🏙️',banlieue:'🏘️',
  avenue:'🛣️',boulevard:'🌳',carrefour:'🚦',quai:'⚓',place:'⛲',fleuve:'🏞️',mairie:'🏛️',commissariat:'🚓',
  bibliothèque:'📚',cathédrale:'⛪',théâtre:'🎭',covoiturage:'🚙',ligne:'🚏',itinéraire:'🗺️',prix:'🏷️','week-end':'🛋️',
  semaine:'🗓️',costume:'🤵',pointure:'👟',jour:'☀️',jeudi:'📅',chambre:'🛏️',cuisine:'🍳',salon:'🛋️',grenier:'📦',
  terrasse:'☕','lave-linge':'🧺','lave-vaisselle':'🍽️',cuisinière:'🔥',couloir:'🚪',hall:'🏢',balcon:'🪴',pelouse:'🌱',
  résidence:'🏘️',fauteuil:'🪑',armoire:'🚪',genou:'🦵',gorge:'🗣️',jambe:'🦵',ventre:'🫃',paracétamol:'💊',sirop:'🍯',
  radio:'🩻',gymnase:'🏀',vestiaire:'👕',sauna:'🧖',musculation:'🏋️',gymnastique:'🤸',produit:'🛍️',location:'🔑',
  météo:'🌦️',wwoofing:'🧑‍🌾','micro-aventure':'🎒',expérience:'✨',campagne:'🌾',ferme:'🐄',goûter:'🍪',proximité:'📍',
  bâtiment:'🏢',région:'🗾',endroit:'📍',mouton:'🐑',porc:'🐖',veau:'🐄',formation:'📘',sujet:'💬',métier:'🧰',
  note:'💯',commerce:'🏪',droit:'⚖️','pause-déjeuner':'🥪',visioconférence:'💻',équipe:'👥',marque:'™️',souvenir:'🎁',
  mémoire:'🧠',saveur:'😋',figue:'🫐',clémentine:'🍊',tartine:'🍞',beignet:'🍩',madeleine:'🧁',vue:'👀',goût:'👅',
  toucher:'✋',bruit:'🔊',jeunesse:'🧒',silence:'🤫',temps:'⏳',climat:'🌍',côte:'🏖️',prairie:'🌾',pause:'⏸️',
  dépense:'💸','globe-trotteur':'🌏',toit:'🏠',studio:'🏠',foyer:'🏠',véranda:'🪟',buanderie:'🧺','rez-de-chaussée':'🚪',
  superficie:'📐',loyer:'💶',chauffage:'♨️',ménage:'👪',colocation:'🧑‍🤝‍🧑',épreuve:'📝',trimestre:'📆',semestre:'📆',
  chaîne:'📺',téléfilm:'📺',patinoire:'⛸️',guerre:'⚔️',exposition:'🖼️','canapé-lit':'🛋️',placard:'🗄️',tabouret:'🪑',
  sosie:'👯',fossette:'😊',menton:'🧔',qualité:'👍',défaut:'👎',prudence:'⚠️',tact:'🤝',désordre:'🌀',bazar:'🌀',
  cigale:'🦗',découverte:'🔍',nouveauté:'🆕',technologie:'🔬','start-up':'🚀',navette:'🚐',logiciel:'💾',téléportation:'🌀',
  betterave:'🥕',céleri:'🥬',courge:'🎃',endive:'🥬',navet:'🥕',poireau:'🧅',radis:'🥕',semoule:'🌾',amande:'🌰',
  framboise:'🍓',groseille:'🍒',mûre:'🫐',myrtille:'🫐',prune:'🍑',cannelle:'🪵',coriandre:'🌿',cumin:'🫙',curcuma:'🫚',
  muscade:'🌰',safran:'🌺',vinaigre:'🍶',traiteur:'🍱',ambiance:'🎶',pourboire:'🪙',service:'🛎️',bouillon:'🍲',
  choucroute:'🌭',clafoutis:'🥧',couscous:'🍲',flan:'🍮',gratin:'🧀',pâté:'🥫','pot-au-feu':'🍲',purée:'🥔',
  ratatouille:'🍆',tartiflette:'🥔',épaule:'💪',cheville:'🦶',cou:'🧣',cuisse:'🍗',poignet:'⌚',bâillement:'🥱',
  repos:'😌',respiration:'🌬️',sieste:'😴',tension:'😬',tonus:'⚡',nombre:'🔢',allergie:'🤧',anxiété:'😰',asthme:'😮‍💨',
  indigestion:'🤢',infection:'🦠',insomnie:'🌙',migraine:'🤕',stress:'😣',antibiotique:'💊',antiseptique:'🧴',remède:'🌿',
  traitement:'🩺',accident:'💥',appel:'📞',victime:'🩹',circulation:'🚗',guérison:'💚',allure:'🕴️',coude:'💪',
  'avant-bras':'💪',hanche:'🕺',orteil:'🦶',foie:'🫀',estomac:'🫃',nouvelle:'📰',revue:'📖',enquête:'🕵️',reportage:'🎙️',
  forme:'🔷',utopie:'🌈',courant:'⚡',presse:'🗞️',domaine:'🗂️',rediffusion:'🔁',tchat:'💬',documentaire:'🎞️',
  plateforme:'🖥️',abonnement:'🔔',journal:'📰',titre:'🔠',direct:'🔴',émission:'📻',culture:'🎨',écologie:'♻️',
  économie:'📈',politique:'🗳️',société:'🏙️',essence:'⛽',finale:'🏆',ligue:'🏅','passe-temps':'🧩',dispositif:'⚙️',
  écoute:'🎧',voix:'🗣️',projet:'📋',scénario:'🎬',écrivain:'✍️',ingénieur:'👷',souhait:'🌠',défi:'🏔️',occasion:'♻️',
  étagère:'📚',don:'🎁',partage:'🤲',taille:'📏',lumière:'💡',argent:'💰',couleur:'🎨',alimentation:'🛒',
  électroménager:'🔌',multimédia:'🎮',vêtement:'👕',écran:'🖥️',tour:'🖥️',jardinage:'🌻',bricolage:'🔨',mécanique:'🔧',
  planète:'🌍',tutoriel:'📹',mercerie:'🧵',couture:'🧵',atelier:'🛠️',mouchoir:'🤧',kit:'🧰',cadre:'🖼️',matière:'🧶',
  panne:'⚠️',réparation:'🔧',outil:'🛠️',échelle:'🪜',scie:'🪚',ponceuse:'🪚',rasoir:'🪒',herbe:'🌿',accorderie:'🤝',
  entraide:'🤝',solidarité:'🫶',repassage:'👔',déménagement:'🚚',fonctionnement:'⚙️',troc:'🔄',vêtothèque:'👚',
  circuit:'🔁',devis:'📄',capitale:'🏙️',croisière:'🛳️',rizière:'🌾',récit:'📜',orage:'⛈️',hébergement:'🏨',
  destination:'📍',direction:'🧭',aéroport:'🛫',billet:'🎫',vol:'✈️',escale:'🛬','demi-pension':'🍽️',avis:'⭐',
  patrimoine:'🏰',excursion:'🥾',anecdote:'💬',audioguide:'🎧',brochure:'📄',déception:'😞',histoire:'📜',cascade:'💦',
  falaise:'🪨',grotte:'🕳️',volcan:'🌋',critère:'✅',caillou:'🪨',bac:'📝',révélation:'💡',rigueur:'📏',
  dévouement:'❤️',licence:'🎓',master:'🎓',beauté:'💄','bien-être':'🧘',communication:'📣',informatique:'💻',
  management:'📊',marketing:'📢',nettoyage:'🧽',numérique:'📱',restauration:'🍴',coworking:'💼',emploi:'💼',
  entreprise:'🏢',local:'🏬',matériel:'🧰',compétence:'🧠',recrutement:'🤝',poubelle:'🗑️',centaine:'💯',geste:'👋',
  jury:'👩‍⚖️',étape:'👣',biodiversité:'🦋',disparition:'💨',espèce:'🦎',destruction:'💥',surexploitation:'⛏️',
  désert:'🏜️',lagon:'🏝️',nature:'🌲',gaspillage:'🗑️',plastique:'🧴',comportement:'🐾',robinet:'🚰',félin:'🐆',
  proie:'🐁',poulailler:'🐔',coq:'🐓',camarade:'🧑‍🤝‍🧑',rongeur:'🐹',menace:'⚠️',reptile:'🦎',caméléon:'🦎',
  tortue:'🐢',serpent:'🐍',déforestation:'🪓',pêche:'🎣',renouvellement:'🔄'
};

/* quest.html 的 GENDER_EMOJI 原樣複製（2026-10-16），town.html 載入時一起合併 */
var DEX_EMOJI_QUEST = {"chien": "🐕", "chat": "🐈", "cheval": "🐎", "lapin": "🐇", "poisson": "🐟", "poule": "🐔", "vache": "🐄", "canard": "🦆", "renard": "🦊", "loup": "🐺", "lion": "🦁", "rat": "🐀", "grenouille": "🐸", "fourmi": "🐜", "mouette": "🕊️", "maison": "🏠", "appartement": "🏢", "école": "🏫", "église": "⛪", "hôpital": "🏥", "banque": "🏦", "gare": "🚉", "musée": "🏛️", "pont": "🌉", "mer": "🌊", "plage": "🏖️", "montagne": "⛰️", "forêt": "🌲", "fleur": "🌸", "plante": "🪴", "soleil": "☀️", "étoile": "⭐", "feu": "🔥", "lac": "🏞️", "café": "☕", "glace": "🍨", "assiette": "🍽️", "huile": "🫗", "beurre": "🧈", "confiture": "🍯", "banane": "🍌", "carotte": "🥕", "oignon": "🧅", "riz": "🍚", "kiwi": "🥝", "poire": "🍐", "avocat": "🥑", "aubergine": "🍆", "farine": "🌾", "saumon": "🍣", "bœuf": "🥩", "gingembre": "🫚", "quiche": "🥧", "guitare": "🎸", "piano": "🎹", "violon": "🎻", "tambour": "🥁", "batterie": "🥁", "lit": "🛏️", "chaise": "🪑", "canapé": "🛋️", "frigo": "🧊", "ascenseur": "🛗", "escalier": "🪜", "valise": "🧳", "tente": "⛺", "van": "🚐", "parasol": "⛱️", "igloo": "🧊", "robot": "🤖", "ordinateur": "💻", "smartphone": "📱", "clavier": "⌨️", "souris": "🖱️", "tablette": "📱", "selfie": "🤳", "moteur": "⚙️", "ambulance": "🚑", "bras": "💪", "pied": "🦶", "main": "✋", "nez": "👃", "bouche": "👄", "oreille": "👂", "tête": "🗣️", "dos": "🔙", "cerveau": "🧠", "langue": "👅", "sourire": "😊", "visage": "🙂", "rêve": "💭", "réveil": "⏰", "douche": "🚿", "tennis": "🎾", "rugby": "🏉", "yoga": "🧘", "judo": "🥋", "natation": "🏊", "vélodrome": "🚴", "chalet": "🛖", "village": "🏘️", "fontaine": "⛲", "dentiste": "🦷", "pharmacie": "💊", "grippe": "🤧", "fièvre": "🤒", "toux": "😷", "sable": "🏝️", "port": "⚓", "dune": "🏜️", "rideau": "🪟", "coussin": "🛋️", "couette": "🛌", "nappe": "🧺", "tablier": "👨‍🍳", "sommet": "🏔️", "tonnerre": "⚡", "canicule": "🥵", "printemps": "🌱", "paysage": "🏞️", "jardin": "🌳", "garage": "🚗", "chauffeur": "🧑‍✈️", "diplôme": "🎓", "téléviseur": "📺", "salaire": "💶", "contrat": "📝", "parfum": "🌸", "cheminée": "🏠", "menthe": "🌿", "fraîcheur": "🌬️", "chaleur": "🌡️", "courrier": "✉️"};
