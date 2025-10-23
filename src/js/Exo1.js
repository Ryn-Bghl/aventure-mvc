// Données initiales : liste des cartes avec réponse attendue
const initialCards = [
  { id: 1, text: "📦 Requête SQL: SELECT * FROM users", answer: "M" },
  { id: 2, text: '🎨 HTML: bouton "Envoyer"', answer: "V" },
  { id: 3, text: "🧭 Fonction qui gère le clic utilisateur", answer: "C" },
  { id: 4, text: "📦 Classe User(id, name, email)", answer: "M" },
  { id: 5, text: "🎨 CSS: style pour le texte en rouge", answer: "V" },
  { id: 6, text: "🧭 Vérifie si l'utilisateur est connecté", answer: "C" },
  {
    id: 7,
    text: "📦 Migration: table users (id, email, password)",
    answer: "M",
  },
  { id: 8, text: "🎨 Rendu template avec données utilisateur", answer: "V" },
  { id: 9, text: "🧭 Route qui appelle le contrôleur", answer: "C" },
];

const piecesContainer = document.getElementById("pieces");
const zones = Array.from(document.querySelectorAll(".zone"));
const feedbackEl = document.getElementById("feedback");

// Etat courant
let cards = [];
let helpMode = false; // false = aide désactivée (pas de feedback immédiat)

function createCardEl(card) {
  const el = document.createElement("div");
  el.className = "piece";
  el.draggable = true;
  el.id = "card-" + card.id;
  el.dataset.answer = card.answer;
  el.textContent = card.text;

  el.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", el.id);
    setTimeout(() => el.classList.add("dragging"), 5);
  });
  el.addEventListener("dragend", () => {
    el.classList.remove("dragging");
  });
  return el;
}

function renderPile(list) {
  piecesContainer.innerHTML = "";
  list.forEach((c) => piecesContainer.appendChild(createCardEl(c)));
}

function shuffleArray(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
}

// initialisation
function init() {
  cards = initialCards.map((c) => Object.assign({}, c));
  shuffleArray(cards);
  renderPile(cards);
  clearZones();
  feedback("Place les cartes dans la bonne zone puis clique sur Vérifier.");
}

function clearZones() {
  zones.forEach((z) => {
    // move any pieces inside zones back to pile
    Array.from(z.querySelectorAll(".piece")).forEach((p) =>
      piecesContainer.appendChild(p),
    );
    z.classList.remove("active");
  });
  // clear styles
  document.querySelectorAll(".piece").forEach((p) => {
    p.classList.remove("correct", "wrong");
  });
}

// Drag/drop handling for zones and pile
zones.forEach((zone) => {
  zone.addEventListener("dragover", (e) => {
    e.preventDefault();
    zone.classList.add("active");
  });
  zone.addEventListener("dragleave", () => zone.classList.remove("active"));
  zone.addEventListener("drop", (e) => {
    e.preventDefault();
    zone.classList.remove("active");
    const id = e.dataTransfer.getData("text/plain");
    const el = document.getElementById(id);
    if (el) {
      zone.appendChild(el);
      // micro-feedback: placed animation
      el.classList.add("placed");
      el.addEventListener("animationend", () => el.classList.remove("placed"), {
        once: true,
      });

      // behavior depends on helpMode
      if (helpMode) {
        if (el.dataset.answer === zone.dataset.answer) {
          el.classList.add("correct");
          createConfetti(zone);
          setTimeout(() => el.classList.remove("correct"), 1200);
        } else {
          el.classList.add("wrong");
          // highlight correct zone briefly
          const correctZone = zones.find(
            (z) => z.dataset.answer === el.dataset.answer,
          );
          if (correctZone) {
            correctZone.classList.add("active");
            setTimeout(() => correctZone.classList.remove("active"), 900);
          }
          setTimeout(() => el.classList.remove("wrong"), 900);
        }
      } else {
        // no immediate feedback in no-help mode
        el.classList.remove("correct", "wrong");
      }
    }
  });
});

// allow dropping back to pile
piecesContainer.addEventListener("dragover", (e) => e.preventDefault());
piecesContainer.addEventListener("drop", (e) => {
  e.preventDefault();
  const id = e.dataTransfer.getData("text/plain");
  const el = document.getElementById(id);
  if (el) {
    piecesContainer.appendChild(el);
    el.classList.add("placed");
    el.addEventListener("animationend", () => el.classList.remove("placed"), {
      once: true,
    });
  }
});

// confetti helper
function createConfetti(container) {
  // create wrapper
  let wrap = container.querySelector(".confetti");
  if (!wrap) {
    wrap = document.createElement("div");
    wrap.className = "confetti";
    container.appendChild(wrap);
  }
  const colors = ["#FFC107", "#4CAF50", "#E91E63", "#2196F3", "#FF5722"];
  // generate a few pieces
  for (let i = 0; i < 16; i++) {
    const span = document.createElement("span");
    span.style.left = Math.random() * 100 + "%";
    span.style.background = colors[Math.floor(Math.random() * colors.length)];
    span.style.transform = "rotate(" + Math.floor(Math.random() * 360) + "deg)";
    span.style.animationDelay = Math.random() * 200 + "ms";
    wrap.appendChild(span);
    // cleanup
    setTimeout(() => span.remove(), 1200);
  }
  // remove wrapper after animations
  setTimeout(() => {
    if (wrap.children.length === 0) wrap.remove();
  }, 1400);
}

// controls
document.getElementById("shuffleBtn").addEventListener("click", () => {
  shuffleArray(cards);
  renderPile(cards);
  feedback("Cartes mélangées.");
});
document.getElementById("resetBtn").addEventListener("click", () => {
  init();
});
document.getElementById("checkBtn").addEventListener("click", checkAnswers);

// aide toggle
const helpToggle = document.getElementById("helpToggle");
helpToggle.addEventListener("click", () => {
  helpMode = !helpMode;
  helpToggle.textContent = "Aide : " + (helpMode ? "OFF" : "ON");
  helpToggle.setAttribute("aria-pressed", String(helpMode));
  feedback("Mode Aide : " + (helpMode ? "Désactivé" : "Activé"));
});

function checkAnswers() {
  let total = 0,
    correct = 0;
  // reset classes
  document.querySelectorAll(".piece").forEach((p) => {
    p.classList.remove("correct", "wrong");
  });

  zones.forEach((z) => {
    Array.from(z.querySelectorAll(".piece")).forEach((p) => {
      total++;
      if (p.dataset.answer === z.dataset.answer) {
        p.classList.add("correct");
        correct++;
      } else {
        p.classList.add("wrong");
      }
    });
  });

  feedback(`${correct} / ${total} correct${total > 1 ? "s" : ""}`);
}

function feedback(msg) {
  feedbackEl.textContent = msg;
}

// démarrer
init();
