document.addEventListener('DOMContentLoaded', () => {
    const draggables = document.querySelectorAll('.data-item');
    const dropzones = document.querySelectorAll('.model-action');
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
                dropzone.textContent += ` - Correct !`;
                dropzone.style.pointerEvents = 'none'; // Disable further drops
                
                const draggedEl = document.querySelector(`[data-source=${sourceId}]`);
                if (draggedEl) {
                    draggedEl.style.display = 'none'; // Keep it hidden
                }

                correctPairs++;
                if (correctPairs === dropzones.length) {
                    feedback.textContent = 'Bravo ! Toutes les associations sont correctes !';
                    feedback.style.color = '#4caf50';
                }
            } else {
                feedback.textContent = 'Incorrect. Essayez une autre association.';
                feedback.style.color = '#f44336';
                setTimeout(() => feedback.textContent = '', 2000);
            }
        });
    });
});