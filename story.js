// Itinéraire conseillé : les trois voies restent jouables dans l'ordre choisi.
export const PROLOGUE = [
  {id:'starter',title:'Un premier compagnon',zone:'Cuchalaga',text:'Choisissez votre starter chez Menzi et livrez votre premier duel. Enregistrez son lieu de rencontre selon vos règles.'},
  {id:'premiers-pas',title:'Les premières Poké Balls',zone:'Route de Cuchalaga',text:'Suivez Menzi sur la route et découvrez la capture. Votre Nuzlocke commence au moment défini par vos règles.'},
  {id:'crique',title:'Une rencontre inattendue',zone:'Caverne de la Crique',text:'Aidez Koraidon, puis traversez la caverne à ses côtés.'},
  {id:'phare',title:'Le phare et Pepper',zone:'Route de Cuchalaga',text:'Retrouvez Menzi et Pepper près du phare, puis prenez la direction de Plato Real.'},
  {id:'mesaledo',title:'En route pour la grande ville',zone:'Zone Sud n°1',text:'Passez par Plato Real et rejoignez Mesaledo. Préparez votre équipe au duel avec Menzi à l’entrée.'},
  {id:'academie',title:'Bienvenue à l’Académie Orange',zone:'Académie Orange',text:'Rencontrez les élèves et découvrez les trois voies : les arènes, les Dominants et la Team Star.'},
  {id:'tresor',title:'Le départ de la Chasse au Trésor',zone:'Mesaledo',text:'Quittez l’Académie avec Koraidon. Vous êtes libre de voyager : le parcours ci-dessous propose un ordre par niveau.'}
];
export const ROUTE_GUIDE = {
  era:{zones:['Zone Sud n°2','Sevaro'],text:'Sortez de Mesaledo par l’ouest. À Sevaro, passez l’examen de l’arène avant de défier Éra.'},
  craparoi:{zones:['Zone Sud n°3'],text:'Repartez vers l’est de Mesaledo. Retrouvez Pepper et cherchez le Dominant sur les falaises.'},
  colza:{zones:['Zone Sud n°3','Cuencia'],text:'Continuez vers Cuencia. Terminez l’examen de l’arène pour poursuivre la Voie du Maître.'},
  lestombaile:{zones:['Zone Ouest n°1'],text:'Rejoignez les hauteurs à l’ouest de Paldea pour poursuivre la recherche des Épices Secrètes avec Pepper.'},
  brome:{zones:['Zone Ouest n°1','Repaire du Groupe Segin'],text:'Préparez trois compagnons pour l’assaut de la base, puis affrontez Brome et sa Starmobile.'},
  mashynn:{zones:['Zone Est n°1','Zone Est n°2','Levalendura'],text:'Rejoignez Levalendura par la côte est et participez à l’examen de Mashynn.'},
  meloco:{zones:['Zone Est n°1','Repaire du Groupe Schedar'],text:'Poursuivez l’Opération Stardust à la base Feu. Vérifiez vos trois premiers Pokémon avant l’assaut.'},
  ferdeter:{zones:['Zone Est n°3'],text:'Explorez la zone minière et retrouvez Pepper pour le prochain Dominant.'},
  kombu:{zones:['Porto Marinada','Jarramanca'],text:'L’examen de Kombu vous emmène aux enchères de Porto Marinada. Revenez ensuite à l’arène.'},
  erio:{zones:['Bosquet Tagué','Repaire du Groupe Tsih'],text:'Traversez le bosquet pour rejoindre la base Poison et poursuivre l’Opération Stardust.'},
  okuba:{zones:['Zone Ouest n°3','Mezclamora'],text:'À Mezclamora, cherchez les indices de l’examen de l’arène avant le combat contre Okuba.'},
  laim:{zones:['Tunnel Mezcla-Pincho','Mont Nappé','Frigao'],text:'Montez vers Frigao. Préparez des partenaires complémentaires pour les combats en duo de cette arène.'},
  'fort-ivoire':{zones:['Désert Rôtissable'],text:'Retournez dans le désert et retrouvez Pepper face au Dominant propre à Pokémon Écarlate.'},
  tully:{zones:['Zone Sud n°6','Alforneira'],text:'Rejoignez Alforneira et terminez l’examen de l’arène Psy.'},
  grusha:{zones:['Mont Nappé'],text:'Rejoignez l’arène du Mont Nappé pour le dernier défi de la Voie du Maître avant la Ligue.'},
  ortega:{zones:['Zone Nord n°3','Repaire du Groupe Ruchbah'],text:'Rendez-vous dans le nord pour l’assaut de la base Fée.'},
  eri:{zones:['Zone Nord n°2','Repaire du Groupe Caph'],text:'Préparez votre équipe pour la base Combat et sa Starmobile.'},
  'fourbe-dragon':{zones:['Lac Asrol'],text:'Explorez les îles du lac avec Koraidon. Cette étape conclut la recherche des cinq Épices Secrètes.'}
};
export const END_STORY = [
  {id:'rassemblement',title:'Les trois voies se rejoignent',zone:'Cratère de Paldea',text:'Après les finales avec Menzi, Pepper et Cassiopée, retrouvez vos compagnons à l’entrée de la Zone Zéro.'},
  {id:'postes',title:'Au cœur du cratère',zone:'Zone Zéro',text:'Descendez avec vos compagnons et visitez les quatre postes d’observation pour ouvrir l’accès au laboratoire.'},
  {id:'retour',title:'Le retour à la maison',zone:'Mesaledo',text:'Après le dernier combat et le générique, revenez à l’Académie. Votre aventure principale est terminée.'}
];
export const STORY_IDS=[...PROLOGUE,...END_STORY].map(s=>s.id);
export const TRAVEL_REWARDS={craparoi:'Sprint',lestombaile:'Nage',ferdeter:'Grand saut','fort-ivoire':'Planage','fourbe-dragon':'Escalade'};
