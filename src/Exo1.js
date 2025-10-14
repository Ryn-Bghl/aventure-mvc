
		// Données initiales : liste des cartes avec réponse attendue
		const initialCards = [
			{id:1, text:'📦 Requête SQL: SELECT * FROM users', answer:'M'},
			{id:2, text:'🎨 HTML: bouton "Envoyer"', answer:'V'},
			{id:3, text:'🧭 Fonction qui gère le clic utilisateur', answer:'C'},
			{id:4, text:'📦 Classe User(id, name, email)', answer:'M'},
			{id:5, text:'🎨 CSS: style pour le texte en rouge', answer:'V'},
			{id:6, text:'🧭 Vérifie si l\'utilisateur est connecté', answer:'C'},
			{id:7, text:'📦 Migration: table users (id, email, password)', answer:'M'},
			{id:8, text:'🎨 Rendu template avec données utilisateur', answer:'V'},
			{id:9, text:'🧭 Route qui appelle le contrôleur', answer:'C'}
		];

		const piecesContainer = document.getElementById('pieces');
		const zones = Array.from(document.querySelectorAll('.zone'));
		const feedbackEl = document.getElementById('feedback');

		// Etat courant
		let cards = [];

		function createCardEl(card){
			const el = document.createElement('div');
			el.className = 'piece';
			el.draggable = true;
			el.id = 'card-' + card.id;
			el.dataset.answer = card.answer;
			el.textContent = card.text;

			el.addEventListener('dragstart', e => {
				e.dataTransfer.setData('text/plain', el.id);
				setTimeout(()=> el.classList.add('dragging'), 5);
			});
			el.addEventListener('dragend', () => { el.classList.remove('dragging'); });
			return el;
		}

		function renderPile(list){
			piecesContainer.innerHTML = '';
			list.forEach(c => piecesContainer.appendChild(createCardEl(c)));
		}

		function shuffleArray(a){
			for(let i=a.length-1;i>0;i--){
				const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];
			}
		}

		// initialisation
		function init(){
			cards = initialCards.map(c=>Object.assign({},c));
			shuffleArray(cards);
			renderPile(cards);
			clearZones();
			feedback('Place les cartes dans la bonne zone puis clique sur Vérifier.');
		}

		function clearZones(){
			zones.forEach(z => {
				// move any pieces inside zones back to pile
				Array.from(z.querySelectorAll('.piece')).forEach(p => piecesContainer.appendChild(p));
				z.classList.remove('active');
			});
			// clear styles
			document.querySelectorAll('.piece').forEach(p => { p.classList.remove('correct','wrong'); });
		}

		// Drag/drop handling for zones and pile
		zones.forEach(zone => {
			zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('active'); });
			zone.addEventListener('dragleave', () => zone.classList.remove('active'));
			zone.addEventListener('drop', e => {
				e.preventDefault(); zone.classList.remove('active');
				const id = e.dataTransfer.getData('text/plain');
				const el = document.getElementById(id);
				if(el) zone.appendChild(el);
			});
		});

		// allow dropping back to pile
		piecesContainer.addEventListener('dragover', e => e.preventDefault());
		piecesContainer.addEventListener('drop', e => {
			e.preventDefault();
			const id = e.dataTransfer.getData('text/plain');
			const el = document.getElementById(id);
			if(el) piecesContainer.appendChild(el);
		});

		// controls
		document.getElementById('shuffleBtn').addEventListener('click', ()=>{ shuffleArray(cards); renderPile(cards); feedback('Cartes mélangées.'); });
		document.getElementById('resetBtn').addEventListener('click', ()=>{ init(); });
		document.getElementById('checkBtn').addEventListener('click', checkAnswers);

		function checkAnswers(){
			let total=0, correct=0;
			// reset classes
			document.querySelectorAll('.piece').forEach(p => { p.classList.remove('correct','wrong'); });

			zones.forEach(z => {
				Array.from(z.querySelectorAll('.piece')).forEach(p => {
					total++;
					if(p.dataset.answer === z.dataset.answer){ p.classList.add('correct'); correct++; }
					else { p.classList.add('wrong'); }
				});
			});

			feedback(`${correct} / ${total} correct${total>1?'s':''}`);
		}

		function feedback(msg){ feedbackEl.textContent = msg; }

		// démarrer
		init();
