# Vrai ou Faux - MVC Game

Ce projet est un jeu de Vrai ou Faux conçu pour illustrer l'architecture Modèle-Vue-Contrôleur (MVC) en JavaScript. Le but est de répondre à une série de questions sur le pattern MVC.

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
│   ├── app.js
│   ├── model.js (vide)
│   ├── view.js (vide)
│   └── controller.js (vide)
├── .gitignore
└── README.md
```

**Note:** Actuellement, toute la logique du jeu est contenue dans `app.js`. Les fichiers `model.js`, `view.js`, et `controller.js` sont des coquilles vides, prévues pour une future refactorisation du code afin de suivre le modèle de conception MVC.
