 // État de l'application
    let draggedElement = null;
    let usedElements = new Set();

    // Sélection des éléments
    const draggableItems = document.querySelectorAll('.pdrag');
    const targets = document.querySelectorAll('.target');
    const validateBtn = document.getElementById('validate-btn');
    const resetBtn = document.getElementById('reset-btn');
    const feedback = document.getElementById('feedback');
    const progressText = document.getElementById('progress-text');
    const progressFill = document.getElementById('progress-fill');

    // Gestion du drag
    draggableItems.forEach(item => {
      item.addEventListener('dragstart', (e) => {
        if (usedElements.has(item.dataset.value)) {
          e.preventDefault();
          return;
        }
        draggedElement = item;
        item.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', item.dataset.value);
        e.dataTransfer.setData('text/html', item.innerHTML);
      });

      item.addEventListener('dragend', () => {
        item.classList.remove('dragging');
      });
    });

    // Gestion du drop
    targets.forEach(target => {
      target.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        target.classList.add('drag-over');
      });

      target.addEventListener('dragleave', () => {
        target.classList.remove('drag-over');
      });

      target.addEventListener('drop', (e) => {
        e.preventDefault();
        target.classList.remove('drag-over');
        
        const value = e.dataTransfer.getData('text/plain');
        const html = e.dataTransfer.getData('text/html');
        
        // Retirer l'ancienne valeur si elle existe
        if (target.dataset.currentValue) {
          usedElements.delete(target.dataset.currentValue);
          // Réactiver l'élément
          draggableItems.forEach(item => {
            if (item.dataset.value === target.dataset.currentValue) {
              item.classList.remove('used');
            }
          });
        }
        
        // Ajouter la nouvelle valeur
        target.innerHTML = html;
        target.dataset.currentValue = value;
        target.classList.add('filled');
        target.classList.remove('correct', 'incorrect');
        
        // Marquer l'élément comme utilisé
        usedElements.add(value);
        if (draggedElement) {
          draggedElement.classList.add('used');
        }
        
        updateProgress();
        hideFeedback();
      });

      // Double-clic pour retirer un élément
      target.addEventListener('dblclick', () => {
        if (target.dataset.currentValue) {
          usedElements.delete(target.dataset.currentValue);
          draggableItems.forEach(item => {
            if (item.dataset.value === target.dataset.currentValue) {
              item.classList.remove('used');
            }
          });
          target.innerHTML = '';
          delete target.dataset.currentValue;
          target.classList.remove('filled', 'correct', 'incorrect');
          updateProgress();
          hideFeedback();
        }
      });
    });

    // Mise à jour de la progression
    function updateProgress() {
      const filled = Array.from(targets).filter(t => t.dataset.currentValue).length;
      progressText.textContent = `${filled}/4`;
      const percentage = (filled / 4) * 100;
      progressFill.style.width = `${percentage}%`;
      progressFill.textContent = `${Math.round(percentage)}%`;
    }

    // Validation
    validateBtn.addEventListener('click', () => {
      let allCorrect = true;
      let filledCount = 0;

      targets.forEach(target => {
        if (target.dataset.currentValue) {
          filledCount++;
          const expected = target.dataset.expected;
          const actual = target.dataset.currentValue;
          
          if (expected === actual) {
            target.classList.add('correct');
            target.classList.remove('incorrect');
          } else {
            target.classList.add('incorrect');
            target.classList.remove('correct');
            allCorrect = false;
          }
        } else {
          allCorrect = false;
        }
      });

      if (filledCount === 0) {
        showFeedback('⚠️ Place d\'abord les éléments dans les zones de dépôt !', 'error');
      } else if (allCorrect) {
        showFeedback('🎉 Félicitations ! Tu as parfaitement compris le flux d\'une requête MVC ! Le routeur reçoit la requête, le controller la traite, le modèle gère les données, et la vue affiche le résultat !', 'success');
      } else {
        showFeedback('❌ Certaines réponses sont incorrectes. Réessaie ! Rappel : Routeur → Controller → Modèle → Vue', 'error');
      }
    });

    // Reset
    resetBtn.addEventListener('click', () => {
      targets.forEach(target => {
        target.innerHTML = '';
        delete target.dataset.currentValue;
        target.classList.remove('filled', 'correct', 'incorrect');
      });
      
      draggableItems.forEach(item => {
        item.classList.remove('used');
      });
      
      usedElements.clear();
      hideFeedback();
      updateProgress();
    });

    // Feedback
    function showFeedback(message, type) {
      feedback.textContent = message;
      feedback.className = `feedback ${type}`;
    }

    function hideFeedback() {
      feedback.className = 'feedback hidden';
    }

    // Initialisation
    updateProgress();