const navLinks = document.querySelectorAll('#navbar a');
let currentIndex = 0;

function updateFocus(index) {
    navLinks.forEach((link, i) => {
        link.classList.remove('focused');
        if (i === index) {
            link.classList.add('focused');
            link.focus();
        }
    });
}

updateFocus(currentIndex);

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
        currentIndex = (currentIndex + 1) % navLinks.length;
        updateFocus(currentIndex);
        event.preventDefault();
    } else if (event.key === 'ArrowLeft') {
        currentIndex = (currentIndex - 1 + navLinks.length) % navLinks.length;
        updateFocus(currentIndex);
        event.preventDefault();
    }
});

const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;
const notificationSound = new Audio('discord-notification.mp3');

function applySavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.add(savedTheme);
        updateButtonLabel(savedTheme);
    } else {
        body.classList.add('day-theme');
    }
}

function updateButtonLabel(theme) {
    if (theme === 'night-theme') {
        themeToggleBtn.textContent = 'Switch to Day Mode';
    } else {
        themeToggleBtn.textContent = 'Switch to Night Mode';
    }
}

applySavedTheme();

themeToggleBtn.addEventListener('click', () => {
    if (body.classList.contains('day-theme')) {
        body.classList.replace('day-theme', 'night-theme');
        localStorage.setItem('theme', 'night-theme');
        updateButtonLabel('night-theme');
        notificationSound.play();
    } else {
        body.classList.replace('night-theme', 'day-theme');
        localStorage.setItem('theme', 'day-theme');
        updateButtonLabel('day-theme');
    }
});

const languageSelect = document.getElementById('language-select');
const headerTitle = document.querySelector('.header-title');
const introText = document.querySelector('.intro-text');
const sectionHeading = document.querySelector('.section-heading');
const imageCaption = document.querySelector('.image-caption');

const translations = {
    en: {
        title: "Always Clothed",
        intro: "Check out our latest arrivals and exclusive offers!",
        heading: "Featured Products",
        caption: "Our new summer collection is now available!"
    },
    ru: {
        title: "Always Clothed",
        intro: "Проверьте наши последние поступления и эксклюзивные предложения!",
        heading: "Избранные продукты",
        caption: "Наша новая летняя коллекция теперь доступна!"
    },
    kk: {
        title: "Always Clothed",
        intro: "Жаңа түсірілімдеріміз бен эксклюзив ұсыныстарымызды қараңыз!",
        heading: "Ерекше өнімдер",
        caption: "Жазғы жаңа коллекциямыз енді қол жетімді!"
    }
};

languageSelect.addEventListener('change', () => {
    const selectedLanguage = languageSelect.value;
    updateLanguage(selectedLanguage);
});

function updateLanguage(lang) {
    headerTitle.textContent = translations[lang].title;
    introText.textContent = translations[lang].intro;
    sectionHeading.textContent = translations[lang].heading;
    imageCaption.textContent = translations[lang].caption;
}
