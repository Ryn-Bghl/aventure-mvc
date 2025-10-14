document.addEventListener('DOMContentLoaded', () => {
    const draggables = document.querySelectorAll('.data-block');
    const dropzones = document.querySelectorAll('.template-snippet');
    const feedback = document.getElementById('feedback-message');
    let correctPairs = 0;

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', e.target.dataset.source);
            setTimeout(() => {
                e.target.style.display = 'none';
            }, 0);
        });
        
        draggable.addEventListener('dragend', (e) => {
            setTimeout(() => {
                e.target.style.display = 'block';
            }, 0);
        });
    });

    dropzones.forEach(dropzone => {
        dropzone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropzone.classList.add('over');
        });

        dropzone.addEventListener('dragleave', () => {
            dropzone.classList.remove('over');
        });

        dropzone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropzone.classList.remove('over');
            const sourceId = e.dataTransfer.getData('text/plain');
            const targetId = dropzone.dataset.target;

            if (sourceId === targetId) {
                dropzone.classList.add('dropped');
                
                const draggedEl = document.querySelector(`[data-source=${sourceId}]`);
                if (draggedEl) {
                    draggedEl.style.display = 'none';
                }

                correctPairs++;
                if (correctPairs === dropzones.length) {
                    feedback.textContent = 'Parfait ! La Vue sait maintenant quoi afficher !';
                    feedback.style.color = '#4caf50';
                }
            } else {
                feedback.textContent = 'Ces données ne correspondent pas à ce template.';
                feedback.style.color = '#f44336';
                setTimeout(() => feedback.textContent = '', 2000);
            }
        });
    });
});