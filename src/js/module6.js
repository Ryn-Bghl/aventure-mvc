document.addEventListener('DOMContentLoaded', () => {
    const questionEl = document.getElementById('question');
    const choicesEl = document.getElementById('choices');
    const feedbackEl = document.getElementById('feedback-message');

    const gameFlow = [
        {
            question: "Une requête utilisateur (GET /produits) arrive sur l'application. Qui la prend en charge en premier ?",
            choices: ["La Vue", "Le Contrôleur", "Le Modèle"],
            correct: 1
        },
        {
            question: "Le Contrôleur a besoin de la liste de tous les produits. À qui la demande-t-il ?",
            choices: ["À la base de données directement", "Au Modèle", "À la Vue"],
            correct: 1
        },
        {
            question: "Le Modèle a récupéré la liste des produits. Que fait-il maintenant ?",
            choices: ["Il l'envoie directement au navigateur", "Il la met en forme en HTML", "Il la retourne au Contrôleur"],
            correct: 2
        },
        {
            question: "Le Contrôleur a maintenant les données. Quelle est sa prochaine étape ?",
            choices: ["Choisir une Vue et lui passer les données", "Modifier les données", "Stocker les données en session"],
            correct: 0
        },
        {
            question: "La Vue reçoit les données. Quel est son unique rôle ?",
            choices: ["Les afficher en générant du HTML", "Les vérifier et les nettoyer", "Les sauvegarder pour plus tard"],
            correct: 0
        },
        {
            question: "La boucle est presque terminée ! Qui envoie la réponse HTML finale au navigateur ?",
            choices: ["La Vue", "Le Modèle", "Le Contrôleur"],
            correct: 2
        }
    ];

    let currentStep = 0;

    function renderStep(step) {
        const current = gameFlow[step];
        questionEl.textContent = current.question;
        choicesEl.innerHTML = '';
        current.choices.forEach((choice, index) => {
            const button = document.createElement('button');
            button.textContent = `${index + 1}. ${choice}`;
            button.dataset.index = index;
            choicesEl.appendChild(button);
        });
    }

    choicesEl.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const selectedChoice = parseInt(e.target.dataset.index, 10);
            const correctChoice = gameFlow[currentStep].correct;

            if (selectedChoice === correctChoice) {
                currentStep++;
                feedbackEl.textContent = 'Bonne réponse !';
                feedbackEl.style.color = '#4caf50';

                if (currentStep < gameFlow.length) {
                    renderStep(currentStep);
                } else {
                    questionEl.textContent = "Félicitations !";
                    choicesEl.innerHTML = "<p>Vous avez terminé l'aventure MVC et maîtrisez le flux complet !</p>";
                }
            } else {
                feedbackEl.textContent = 'Mauvaise réponse, essayez encore !';
                feedbackEl.style.color = '#f44336';
                e.target.classList.add('incorrect');
                setTimeout(() => {
                    e.target.classList.remove('incorrect');
                    feedbackEl.textContent = '';
                }, 1000);
            }
        }
    });

    renderStep(currentStep);
});