import { renderTemplate } from './template.js';
import { applyTheme } from './themes.js';

// State
let currentLang = 'fr'; // Default to French
const localeCache = {};
let globalConfig = null;

// DOM Elements
const app = document.getElementById('app');

// Fetch Config
async function loadConfig() {
    if (globalConfig) return globalConfig;
    try {
        const response = await fetch('/config.json');
        if (!response.ok) throw new Error('Failed to load config');
        globalConfig = await response.json();
        return globalConfig;
    } catch (error) {
        console.error(error);
        return null;
    }
}

// Fetch Locale
async function loadLocale(lang) {
    if (localeCache[lang]) {
        return localeCache[lang];
    }
    try {
        const response = await fetch(`/locales/${lang}.json`);
        if (!response.ok) throw new Error(`Failed to load locale: ${lang}`);
        const data = await response.json();
        localeCache[lang] = data;
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

// Render Function
async function render() {
    // Load Data
    const [t, config] = await Promise.all([
        loadLocale(currentLang),
        loadConfig()
    ]);
    
    if (!t || !config) {
        app.innerHTML = '<div class="error">Error loading content. Check console.</div>';
        return;
    }
    
    // Inject Content
    app.innerHTML = renderTemplate(t, config, currentLang);
    
    // Apply Theme
    if (config.theme) {
        applyTheme(config.theme);
    }

    // Update HTML lang attribute
    document.documentElement.lang = currentLang;

    // Attach Event Listeners
    attachListeners();
}

async function toggleLanguage(e) {
    e.preventDefault();
    currentLang = currentLang === 'fr' ? 'en' : 'fr';
    await loadLocale(currentLang);
    render();
}

function attachListeners() {
    // Language Toggle
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.addEventListener('click', toggleLanguage);
    }

    // Theme Switcher
    const themeSelect = document.getElementById('theme-select');
    if (themeSelect) {
        // Set initial value
        themeSelect.value = globalConfig.theme || 'default';
        
        themeSelect.addEventListener('change', (e) => {
            applyTheme(e.target.value);
            e.target.blur();
        });
    }

    // Typing Effect
    const glitchText = document.querySelector('.glitch');
    if (glitchText) {
        const text = glitchText.getAttribute('data-text');
        let index = 0;
        glitchText.textContent = '';
        
        function typeWriter() {
            if (index < text.length) {
                glitchText.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, 150);
            }
        }
        setTimeout(typeWriter, 500);
    }

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return; // Ignore empty anchors like lang toggle

            e.preventDefault();
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
                
                // Close mobile menu
                const navLinks = document.querySelector('.nav-links');
                if (navLinks) navLinks.classList.remove('active');
            }
        });
    });

    // Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
}

// Initial Render
document.addEventListener('DOMContentLoaded', () => {
    render();
});


