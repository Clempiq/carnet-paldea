export const TYPES = {1:'Normal',2:'Combat',3:'Vol',4:'Poison',5:'Sol',6:'Roche',7:'Insecte',8:'Spectre',9:'Acier',10:'Feu',11:'Eau',12:'Plante',13:'Électrik',14:'Psy',15:'Glace',16:'Dragon',17:'Ténèbres',18:'Fée'};
export const STATUS = {team:'Équipe',box:'Boîte',dead:'Cimetière',missed:'Manquée'};
export const ZONES = [
  'Cuchalaga','Route de Cuchalaga','Caverne de la Crique','Plato Real',
  ...Array.from({length:6},(_,i)=>`Zone Sud n°${i+1}`),
  ...Array.from({length:3},(_,i)=>`Zone Est n°${i+1}`),
  ...Array.from({length:3},(_,i)=>`Zone Ouest n°${i+1}`),
  ...Array.from({length:3},(_,i)=>`Zone Nord n°${i+1}`),
  'Mesaledo','Sevaro','Cuencia','Levalendura','Jarramanca','Porto Marinada','Mezclamora','Pinchoria','Alforneira','Frigao',
  'Désert Rôtissable','Bosquet Tagué','Forêt Toastée',"Grotte d’Alforneira",'Tunnel Mezcla-Pincho','Mont Nappé','Lac Asrol',
  'Mer du Sud de Paldea',"Mer de l’Est de Paldea","Mer de l’Ouest de Paldea",'Mer du Nord de Paldea','Ligue Pokémon','Académie Orange','Cratère de Paldea','Zone Zéro',
  'Repaire du Groupe Segin','Repaire du Groupe Schedar','Repaire du Groupe Tsih','Repaire du Groupe Ruchbah','Repaire du Groupe Caph'
];
// Maximum adverse level, not the partner's level. Sources in SOURCES.md.
const rows = [
  ['era','Éra','Sevaro','Arène','Insecte',15],
  ['craparoi','Craparoi','Zone Sud n°3','Dominant','Roche',16],
  ['colza','Colza','Cuencia','Arène','Plante',17],
  ['lestombaile','Lestombaile','Zone Ouest n°1','Dominant','Vol / Ténèbres',20],
  ['brome','Brome','Groupe Segin','Team Star','Ténèbres',21],
  ['mashynn','Mashynn','Levalendura','Arène','Électrik',24],
  ['meloco','Meloco','Groupe Schedar','Team Star','Feu',27],
  ['ferdeter','Ferdeter','Zone Est n°3','Dominant','Acier',29],
  ['kombu','Kombu','Jarramanca','Arène','Eau',30],
  ['erio','Erio','Groupe Tsih','Team Star','Poison',33],
  ['okuba','Okuba','Mezclamora','Arène','Normal',36],
  ['laim','Laïm','Frigao','Arène','Spectre',42],
  ['fort-ivoire','Fort-Ivoire','Désert Rôtissable','Dominant','Sol / Combat',45],
  ['tully','Tully','Alforneira','Arène','Psy',45],
  ['grusha','Grusha','Mont Nappé','Arène','Glace',48],
  ['ortega','Ortiga','Groupe Ruchbah','Team Star','Fée',51],
  ['eri','Nèflie','Groupe Caph','Team Star','Combat',56],
  ['fourbe-dragon','Oyacata & Nigirigon','Lac Asrol','Dominant','Eau / Dragon',57,'Oyacata est au niveau 56 ; Nigirigon au niveau 57.'],
];
export const BOSSES = rows.map(([id,name,place,kind,type,level,note])=>({id,name,place,kind,type,level,note:note||''}));
export const FINALS = [
  {id:'clavel',name:'Clavel',place:'Mesaledo',kind:'Finale',type:'Équipe variée',level:61,note:'Après les 5 bases Team Star. À faire avant la Ligue pour garder des plafonds croissants.'},
  {id:'cayenn',name:'Cayenn',place:'Conseil 4 · 1/4',kind:'Finale',type:'Sol',level:58},
  {id:'popi',name:'Popi',place:'Conseil 4 · 2/4',kind:'Finale',type:'Acier',level:59},
  {id:'okuba-ligue',name:'Okuba',place:'Conseil 4 · 3/4',kind:'Finale',type:'Vol',level:60},
  {id:'hassa',name:'Hassa',place:'Conseil 4 · 4/4',kind:'Finale',type:'Dragon',level:61},
  {id:'alisma',name:'Alisma',place:'Maîtresse de la Ligue',kind:'Finale',type:'Équipe variée',level:62},
  {id:'cassiopée',name:'Cassiopée',place:'Finale de la Team Star',kind:'Finale',type:'Équipe variée',level:63},
  {id:'pepper',name:'Pepper',place:'Finale des Dominants',kind:'Finale',type:'Équipe variée',level:63},
  {id:'menzi',name:'Menzi',place:'Dernier duel de la Voie du Maître',kind:'Finale',type:'Équipe variée',level:66},
  {id:'olim',name:'Olim (I.A.)',place:'Zone Zéro · Pokémon Écarlate',kind:'Finale',type:'Pokémon Paradoxes',level:67},
  {id:'koraidon',name:'Koraidon',place:'Protocole de protection du paradis',kind:'Finale',type:'Combat / Dragon',level:72,note:'Duel scénarisé avec votre Koraidon : hors plafond Nuzlocke de l’équipe.',noCap:true}
];
// Clavel precedes the uninterrupted League; League uses a fixed Hassa cap of 61.
export const RULES = [
  ['onePerZone','Une rencontre par zone','Une rencontre manquée consomme aussi la zone.'],
  ['permadeath','Mort définitive','Un Pokémon au cimetière ne peut plus revenir en jeu. Désactivez temporairement pour corriger une erreur.'],
  ['nicknames','Surnoms obligatoires','Chaque Pokémon capturé reçoit un nom.'],
  ['dupes','Clause des doublons','Avertit lorsqu’une famille d’évolution a déjà été capturée. Vous pouvez relancer votre rencontre.'],
  ['shiny','Exception chromatique','Une rencontre chromatique ne consomme pas de zone et peut être ajoutée dans une zone utilisée.'],
  ['noItems','Aucun soin en combat','Engagement à respecter sur la Switch ; rappel affiché dans le carnet.']
];
