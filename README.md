# Démarrage avec Create React App

Ce projet est une application de liste et de Pokédex de Pokémon construite avec React. L'application permet aux utilisateurs de visualiser une liste de Pokémon, de rechercher des Pokémon spécifiques, de les ajouter à un Pokédex personnel et de visualiser des informations détaillées sur chaque Pokémon.

## Vidéo de Présentation

[![Regarder la vidéo](home.png)](md/react-pokemom-pokedex.mov)

## Scripts Disponibles

Dans le répertoire du projet, vous pouvez exécuter :

### `npm start`

Lance l'application en mode développement.\
Ouvrez [http://localhost:3000](http://localhost:3000) pour l'afficher dans votre navigateur.

La page se rechargera lorsque vous apporterez des modifications.\
Vous pouvez également voir des erreurs de lint dans la console.

### `npm test`

Lance le coureur de tests en mode interactif.\
Voir la section sur [l'exécution des tests](https://facebook.github.io/create-react-app/docs/running-tests) pour plus d'informations.

### `npm run build`

Construit l'application pour la production dans le dossier `build`.\
Il regroupe correctement React en mode production et optimise la build pour de meilleures performances.

La build est minifiée et les fichiers incluent des hashes.\
Votre application est prête à être déployée !

Voir la section sur [le déploiement](https://facebook.github.io/create-react-app/docs/deployment) pour plus d'informations.

### `npm run eject`

**Note : cette opération est irréversible. Une fois que vous avez éjecté, vous ne pouvez plus revenir en arrière !**

Si vous n'êtes pas satisfait de l'outil de build et des choix de configuration, vous pouvez éjecter à tout moment. Cette commande supprimera la dépendance unique de votre projet.

Au lieu de cela, elle copiera tous les fichiers de configuration et les dépendances transitives (webpack, Babel, ESLint, etc.) directement dans votre projet afin que vous ayez un contrôle total sur ces fichiers. Toutes les commandes sauf `eject` continueront de fonctionner, mais elles pointeront vers les scripts copiés afin que vous puissiez les modifier. À ce stade, vous êtes seul.

Vous n'avez jamais à utiliser `eject`. L'ensemble des fonctionnalités organisées est adapté aux déploiements petits et moyens, et vous ne devriez pas vous sentir obligé de l'utiliser. Cependant, nous comprenons que cet outil ne serait pas utile si vous ne pouviez pas le personnaliser lorsque vous êtes prêt.

## Présentation du Projet

Ce projet est construit en utilisant [Create React App](https://github.com/facebook/create-react-app), qui fournit un environnement confortable pour apprendre React et est le meilleur moyen de commencer à construire une nouvelle application monopage en React. Voici quelques fonctionnalités clés et composants du projet :

### Composants

- **Layout** : Fournit la barre de navigation et la structure de mise en page pour l'application.
- **PokemonCard** : Affiche les cartes individuelles de Pokémon avec des options pour ajouter/supprimer du Pokédex et voir des informations détaillées.
- **SearchComponent** : Permet aux utilisateurs de rechercher des Pokémon par nom.
- **Popup** : Affiche des informations détaillées sur un Pokémon sélectionné.
- **ConfirmPopup** : Affiche une fenêtre contextuelle de confirmation pour vider le Pokédex.

### Fonctionnalités

- **Design Responsive** : L'application est conçue pour être responsive, garantissant une expérience fluide sur les appareils de bureau et mobiles.
- **Intégration de Local Storage** : Utilise localStorage pour enregistrer le Pokédex de l'utilisateur, garantissant que les données persistent entre les sessions.
- **Recherche Dynamique** : Implémente une fonctionnalité de recherche pour filtrer les Pokémon par nom.
- **Informations Détaillées sur les Pokémon** : Fournit des statistiques détaillées et des descriptions pour chaque Pokémon en utilisant l'API Pokémon.
- **Navigation** : Inclut des liens de navigation pour visualiser la liste des Pokémon et le Pokédex de l'utilisateur.

## En Savoir Plus

Vous pouvez en apprendre davantage dans la [documentation Create React App](https://facebook.github.io/create-react-app/docs/getting-started).

Pour apprendre React, consultez la [documentation React](https://reactjs.org/).

### Découpage du Code

Cette section a été déplacée ici : [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyse de la Taille du Bundle

Cette section a été déplacée ici : [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Création d'une Progressive Web App

Cette section a été déplacée ici : [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Configuration Avancée

Cette section a été déplacée ici : [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Déploiement

Cette section a été déplacée ici : [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` échoue lors de la minification

Cette section a été déplacée ici : [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
