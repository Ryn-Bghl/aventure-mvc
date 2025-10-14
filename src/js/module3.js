document.addEventListener('DOMContentLoaded', () => {
    const actionContainer = document.getElementById('action-container');
    const feedbackMessage = document.getElementById('feedback-message');

    const correctOrder = [
        "1. Recevoir la requête HTTP (GET /articles)",
        "2. Demander la liste des articles au Modèle",
        "3. Récupérer la liste des articles du Modèle",
        "4. Choisir la Vue 'liste_articles'",
        "5. Envoyer les données (la liste) à la Vue",
        "6. Renvoyer la réponse HTML au navigateur"
    ];

    let userOrder = [];
    let shuffledActions = [...correctOrder].sort(() => Math.random() - 0.5);

    function renderButtons() {
        actionContainer.innerHTML = '';
        shuffledActions.forEach(actionText => {
            const button = document.createElement('button');
            button.textContent = actionText;
            button.dataset.action = actionText;
            actionContainer.appendChild(button);
        });
    }

    actionContainer.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const clickedAction = e.target.dataset.action;
            const nextCorrectAction = correctOrder[userOrder.length];

            if (clickedAction === nextCorrectAction) {
                userOrder.push(clickedAction);
                e.target.classList.add('correct');
                e.target.disabled = true;
                feedbackMessage.textContent = 'Correct !';
                feedbackMessage.style.color = '#4caf50';

                if (userOrder.length === correctOrder.length) {
                    feedbackMessage.textContent = 'Félicitations ! Vous avez terminé la séquence !';
                }
            } else {
                e.target.classList.add('incorrect');
                feedbackMessage.textContent = 'Erreur ! L\'ordre est incorrect. On recommence.';
                feedbackMessage.style.color = '#f44336';

                // Reset after a delay
                setTimeout(() => {
                    userOrder = [];
                    shuffledActions = [...correctOrder].sort(() => Math.random() - 0.5);
                    renderButtons();
                    feedbackMessage.textContent = '';
                }, 1500);
            }
        }
    });

    renderButtons();
});
