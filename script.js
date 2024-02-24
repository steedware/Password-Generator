document.addEventListener('DOMContentLoaded', function () {
    const passwordOutput = document.getElementById('password-output');
    const passwordForm = document.getElementById('password-form');
    const generateButton = document.getElementById('generate-button');

    generateButton.addEventListener('click', function (event) {
        event.preventDefault();
        generatePassword();
    });

    // Dodajemy obsługę zdarzeń do checkboxów
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener('change', function () {
            // Aktualizujemy hasło tylko po kliknięciu przycisku "Generuj hasło"
            passwordOutput.textContent = '';
        });
    });

    function generatePassword() {
        const passwordLength = document.getElementById('password-length').value;
        const includeLowerCase = document.getElementById('lowercase-checkbox').checked;
        const includeUpperCase = document.getElementById('uppercase-checkbox').checked;
        const includeNumbers = document.getElementById('numbers-checkbox').checked;
        const includeSymbols = document.getElementById('symbols-checkbox').checked;

        const password = generatePasswordString(
            passwordLength,
            includeLowerCase,
            includeUpperCase,
            includeNumbers,
            includeSymbols
        );

        passwordOutput.textContent = `Wygenerowane hasło: ${password}`;
    }

    function generatePasswordString(length, includeLowerCase, includeUpperCase, includeNumbers, includeSymbols) {
        const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
        const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const numberChars = "0123456789";
        const symbolChars = "!@#$%^&*()_+-=";

        let allowedChars = "";
        let password = "";

        allowedChars += includeLowerCase ? lowercaseChars : "";
        allowedChars += includeUpperCase ? uppercaseChars : "";
        allowedChars += includeNumbers ? numberChars : "";
        allowedChars += includeSymbols ? symbolChars : "";

        if (length <= 0) {
            return `(Długość hasła musi wynosić min. 1)`;
        }

        if (allowedChars.length === 0) {
            return `(Przynajmniej jeden warunek musi być spełniony)`;
        }

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * allowedChars.length);
            password += allowedChars[randomIndex];
        }

        return password;
    }
});
