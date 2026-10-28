# Carnet Paldea

> Un carnet de bord en français pour suivre un Nuzlocke de Pokémon Écarlate, pensé pour être utilisé sur téléphone pendant qu'on joue.

**Démo :** [carnet-paldea.vercel.app](https://carnet-paldea.vercel.app)

## Le problème

Le Nuzlocke est un défi où l'on ne capture qu'un Pokémon par zone et où un Pokémon K.O. est perdu pour de bon. Suivre ces règles à la main (zones déjà utilisées, cimetière, plafond de niveau avant chaque arène) est fastidieux, et les outils existants sont en anglais ou pensés pour d'autres jeux.

**Pour qui :** les joueurs francophones qui tentent un Nuzlocke sur Écarlate et veulent un suivi fiable, sans compte ni installation.

Application créée de zéro : HTML, CSS et JavaScript natifs, sans dépendance applicative, sans backend ni compte utilisateur.

## Fonctionnalités



- **Carnet** : équipe, captures, cimetière, 18 badges, prochain objectif et plafond.
- **Rencontres** : recherche en français, illustration et types automatiques, évolution par changement d’espèce, surnom, zone, niveau, statut, chromatique et notes. Équipe limitée à six.
- **Parcours** : prologue à cocher, itinéraire narratif des 18 badges, liens vers les zones, capacités de Koraidon et derniers chapitres repliés. Niveaux réels des adversaires, sources dans `SOURCES.md`.
- **Zones** : fiches cliquables des 49 lieux de Paldea, Pokémon d’Écarlate avec sprites, types, biomes et moments, recherche locale et ajout prérempli. Bouton « Je suis ici ». Les zones utilisées sont grisées, les nouvelles captures bloquées selon les règles (exception chromatique conservée). Les morts et rencontres manquées consomment aussi la zone. Ajout de lieux personnalisés.
- **Réglages** : six règles, plafond automatique ou manuel, export/import JSON validé avant remplacement, copie de secours et annulation du dernier import.

Les données restent dans le stockage local du navigateur. **Aucune synchronisation entre appareils.** Exportez régulièrement, notamment avant de changer de navigateur, d’adresse du site ou d’appareil. Les onglets d’une même origine se mettent à jour par les événements de stockage. La navigation privée et l’effacement des données du navigateur peuvent supprimer le carnet.

L’application doit être servie en HTTP/HTTPS (les modules ne fonctionnent pas en ouvrant `index.html` avec `file://`). Elle ne revendique pas un fonctionnement hors ligne complet : le premier chargement du site et les illustrations nécessitent le réseau. La recherche dans le catalogue ne dépend pas d’une API distante.

## Développement

Prérequis : Node.js 20 ou plus récent.

```sh
npm run dev
# http://127.0.0.1:4173
npm test
npm run build
```

`dist/` contient les dix fichiers publics. Aucune variable d’environnement ni secret requis. Les tests utilisent uniquement le module de tests natif de Node.js. Les sauvegardes version 1 restent compatibles : les champs `storyCompleted` et `currentZone` sont facultatifs à l’import.

## Vercel : réglages exacts

1. Créer un dépôt GitHub `carnet-paldea` et y placer les fichiers de ce dossier à la racine.
2. Dans Vercel : **Add New → Project → Import** ce dépôt.
3. **Framework Preset : Other**.
4. **Root Directory : `./`**.
5. **Build Command : `npm run build`**.
6. **Output Directory : `dist`**.
7. **Install Command : `npm install`**.
8. **Node.js : 22.x** (ou 24.x).
9. **Environment Variables : aucune**.
10. Déployer la branche `main` en production. Vérifier l’adresse de production dans un navigateur non connecté : elle doit être publique. La protection des aperçus peut rester activée.

`vercel.json` fournit déjà la configuration de compilation. Le site fonctionne sur l’offre Hobby, sans fonctions serveur, base de données ou service payant.

Alternative en CLI une fois authentifié : `npx vercel`, sélectionner **Create new project**, nom `carnet-paldea`, puis `npx vercel --prod`. Vérifier que le projet lié correspond bien à ce nouveau carnet avant publication.

## Vérification manuelle

1. Ajouter un Poussacha, lui donner un surnom et une zone, l’envoyer en équipe.
2. Modifier son niveau, ses notes et son espèce après évolution.
3. Le déplacer dans la boîte, puis au cimetière. Vérifier la confirmation de décès et la mort définitive.
4. Recharger la page : retrouver les données et la progression.
5. Exporter, importer le fichier, confirmer l’aperçu puis recharger.
6. Tester une septième entrée d’équipe, une zone utilisée, une exception chromatique et un JSON invalide.
7. Vérifier le formulaire et la navigation sur un écran de téléphone.

## Stack

| Catégorie | Technologie |
|---|---|
| Front | HTML, CSS et JavaScript natifs (modules ES), sans framework |
| Données | Catalogue Pokémon et zones en JSON local, sauvegarde dans le `localStorage` |
| Tests | Module de tests natif de Node.js |
| Déploiement | Vercel (site statique) |

## Architecture

`app.js` : vues et interactions, `core.js` : validation et règles, `data.js` : itinéraire et zones, `pokemon.json` : catalogue, `styles.css` : interface. `server.mjs` sert uniquement à la prévisualisation locale, il n’est pas déployé. `core.test.mjs` couvre les invariants et les imports. Toutes les chaînes importées ou saisies sont échappées avant insertion dans le HTML.

## Statut

✅ **Fonctionnel et déployé.** Couvre toute l'aventure principale d'Écarlate (18 badges, 49 zones).

## Ce que j'ai appris

- **Traduire des règles de jeu en règles métier** testables (zone consommée, mort définitive, plafond de niveau, exception chromatique), isolées dans `core.js`.
- **Protéger les données de l'utilisateur** sans backend : import validé avant remplacement, copie de secours, annulation du dernier import.
- **Faire simple** : aucune dépendance, aucun compte, aucune variable d'environnement, ce qui rend le projet facile à maintenir et gratuit à héberger.
- **Concevoir pour l'usage réel** : un écran de téléphone posé à côté de la console, avec un bouton « Je suis ici » et des ajouts préremplis.
