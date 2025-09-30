# 🎮 Vrai ou Faux: PHP MVC Edition

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

An interactive quiz game designed to test and improve your understanding of the Model-View-Controller (MVC) architectural pattern.

<!-- You can replace this with a real screenshot of your game! -->
![Game Screenshot Placeholder](https://via.placeholder.com/720x400.png?text=Vrai+ou+Faux+MVC+Game)

---

## 🎯 Project Goal

This project serves as a practical exercise in software architecture. The initial version intentionally places all application logic within a single JavaScript file (`src/app.js`).

The primary goal is to **refactor this code** into a clean and maintainable MVC architecture, separating concerns into three distinct components:
-   **Model (`model.js`):** To manage the application's data (the questions, the current score).
-   **View (`view.js`):** To handle the presentation logic and what the user sees.
-   **Controller (`controller.js`):** To act as the intermediary, handling user input and updating the model and view accordingly.

## ✨ Features

-   A series of true/false questions about core MVC concepts.
-   Instant feedback on your answers.
-   Real-time score tracking.
-   Simple, clean, and responsive UI built with vanilla web technologies.

## 🛠️ Tech Stack

-   **Frontend:** Vanilla HTML5, CSS3, JavaScript (ES6+)
-   **Tooling:** No build tools or external libraries required.

## 🚀 Getting Started

No complex setup needed!

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/vrai-faux-php-mvc.git
    ```
2.  **Navigate to the directory:**
    ```bash
    cd vrai-faux-php-mvc
    ```
3.  **Open the application:**
    Simply open the `src/index.html` file in your favorite web browser.

## 🕹️ How to Play

1.  Click the **"Commencer"** button to start the quiz.
2.  Read the statement displayed on the screen.
3.  Select **"Vrai"** (True) or **"Faux"** (False).
4.  Your score will be updated, and the next question will appear automatically.
5.  A completion message will be shown at the end of the quiz.

## 🤝 How to Contribute

This project is perfect for learning and practicing MVC! Contributions are highly encouraged, especially for the main refactoring task.

1.  **Fork the Repository.**
2.  **Create a new Branch:** `git checkout -b feature/mvc-refactor`
3.  **Make your changes:** The main task is to move the logic from `src/app.js` into `src/model.js`, `src/view.js`, and `src/controller.js`.
4.  **Commit your changes:** `git commit -m 'feat: Refactor logic to MVC pattern'`
5.  **Push to the Branch:** `git push origin feature/mvc-refactor`
6.  **Open a Pull Request** with a clear description of your changes.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---
*Built by _Duck-Noris_ as a fun way to learn software architecture.*