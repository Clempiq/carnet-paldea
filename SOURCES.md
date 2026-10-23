# Sources et choix de suivi

Données vérifiées le 22 octobre 2026 pour le jeu de base Pokémon Écarlate.

- [Pokébip — Champions](https://www.pokebip.com/page/jeux-video/pokemon-ecarlate-violet/champions-d-arene) : niveaux maximums 15, 17, 24, 30, 36, 42, 45, 48.
- [Pokébip — Team Star](https://www.pokebip.com/page/jeux-video/pokemon-ecarlate-violet/boss-team-star) : maximums 21, 27, 33, 51, 56 ; finales 63.
- [Serebii — Path of Legends](https://www.serebii.net/scarletviolet/pathoflegends.shtml) et [Bulbapedia — Titan Pokémon](https://bulbapedia.bulbagarden.net/wiki/Titan_Pok%C3%A9mon) : Craparoi 16, Lestombaile 20, Ferdeter 29, Fort-Ivoire 45, Oyacata 56 puis Nigirigon 57. Plusieurs anciens guides reprennent les niveaux des partenaires de Pepper (19, 28, 44, 55), qui ne sont pas ceux des boss.
- [Pokébip — Ligue](https://www.pokebip.com/page/jeux-video/pokemon-ecarlate-violet/ligue-pokemon) : Cayenn 58, Popi 59, Okuba 60, Hassa 61, Alisma 62.
- [Pokébip — Rivaux](https://www.pokebip.com/page/jeux-video/pokemon-ecarlate-violet/combats-rivaux) : Pepper 63, Menzi 66.
- [Poképédia — Clavel](https://www.pokepedia.fr/Clavel) : 61.
- [Poképédia — Professeure Olim](https://www.pokepedia.fr/Professeure_Olim) : I.A. 67, Koraidon 72 (duel scénarisé, exclu du plafond de l’équipe).
- [Pokébip — Guide des lieux](https://www.pokebip.com/page/jeux-video/pokemon-ecarlate-violet/guide-des-lieux/accueil) : lieux nommés de Paldea. Les villes, cadeaux et repaires peuvent dépendre de votre convention Nuzlocke ; utilisez le lieu indiqué sur le résumé du Pokémon.

L’itinéraire ordonne les 18 badges par niveau maximum adverse. Le plafond de la série du Conseil 4 est fixé à 61, puis 62 pour Alisma. Clavel est placé avant la série pour éviter un retour en arrière de plafond. Les autres finales suivent leur niveau. Le plafond manuel permet d’autres conventions.

## Catalogue

## Histoire et rencontres par zone — mise à jour du 23 octobre 2026

- [Pokébip — Chasse au Trésor](https://www.pokebip.com/page/jeux-video/pokemon-ecarlate-violet/chasse-au-tresor) : les trois voies indépendantes. Les textes courts de l’application sont rédigés pour le carnet.
- [SuperSoluce — Prologue](https://www.supersoluce.com/soluce/pokemon-ecarlate-violet/prologue-decouverte-de-l-academie) : enchaînement du début de l’histoire et index du cheminement.
- [Pokébip — Koraidon](https://www.pokebip.com/page/jeux-video/pokemon-ecarlate-violet/formes-koraidon-miraidon) : Sprint, Nage, Grand saut, Planage et Escalade après les cinq Dominants correspondants.
- `habitats.json` contient les faits d’apparition des 49 fiches du [Guide des lieux Pokébip](https://www.pokebip.com/page/jeux-video/pokemon-ecarlate-violet/guide-des-lieux/accueil). Chaque lieu porte son URL source, aussi accessible depuis l’interface. Tables de biomes et listes d’apparitions fixes ; lignes exclusives Violet exclues. Les formes de Paldea et Plumeline sont associées à leurs types propres ; les variantes visuelles de mêmes types sont regroupées. Hors raids, événements, cadeaux et rencontres légendaires spéciales. Une liste vide signifie qu’aucune rencontre sauvage n’est répertoriée dans ces sections, pas qu’aucun Pokémon ne peut jamais être obtenu à cet endroit. Les niveaux indiqués sont ceux de la première section sauvage du lieu ; les sous-zones et apparitions fixes peuvent différer.

## Données du catalogue national

`pokemon.json` provient des CSV publics de [PokéAPI](https://github.com/PokeAPI/pokeapi/tree/master/data/v2/csv) : `pokemon_species_names.csv` (langue 5), `pokemon.csv`, `pokemon_types.csv`, `pokemon_species.csv`. 1 025 espèces nationales et 9 formes alternatives utiles à Paldea, dont les trois Tauros et Axoloto de Paldea. Le catalogue ne garantit pas la disponibilité d’une espèce dans Écarlate. Les types restent éditables pour d’autres formes.

Illustrations chargées depuis le dépôt public [PokeAPI/sprites](https://github.com/PokeAPI/sprites), avec repli sur les sprites et un symbole si le réseau est indisponible. Pokémon et les illustrations appartiennent à leurs ayants droit. Ce projet de fan n’est pas affilié à Nintendo, Creatures, GAME FREAK ou The Pokémon Company.

Polices DM Sans et Fraunces via Google Fonts, avec repli sur les polices système. Aucun outil de mesure d’audience, aucun backend, aucun compte utilisateur. Seules les ressources visuelles externes nécessitent ces requêtes réseau ; le carnet n’est jamais transmis à un serveur.
