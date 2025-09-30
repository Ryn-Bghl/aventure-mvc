# Vrai ou Faux - MVC Game

Ce projet est un jeu de Vrai ou Faux conçu pour illustrer l'architecture Modèle-Vue-Contrôleur (MVC) en JavaScript. Le but est de répondre à une série de questions sur le pattern MVC.

## Architecture MVC

Le projet est structuré en trois composants principaux pour séparer les responsabilités :

- **Modèle (model.js)** : Gère les données de l'application. Il contient les questions, les réponses, et la logique pour vérifier les réponses et suivre le score.
- **Vue (view.js)** : Gère l'interface utilisateur. Elle affiche les questions, met à jour le score, et gère les interactions avec les boutons.
- **Contrôleur (controller.js)** : Fait le lien entre le Modèle et la Vue. Il gère les actions de l'utilisateur, met à jour le modèle en conséquence, et rafraîchit la vue.

## Comment jouer

1.  Ouvrez le fichier `src/index.html` dans votre navigateur.
2.  Cliquez sur le bouton "Commencer" pour démarrer le jeu.
3.  Répondez aux questions en cliquant sur "Vrai" ou "Faux".
4.  Votre score sera mis à jour après chaque réponse.
5.  À la fin du jeu, un message s'affichera pour vous indiquer que vous avez terminé.

## Structure des fichiers

```
.
├── src
│   ├── index.html
│   ├── style.css
│   ├── model.js
│   ├── view.js
│   └── controller.js
├── .gitignore
└── README.md
```