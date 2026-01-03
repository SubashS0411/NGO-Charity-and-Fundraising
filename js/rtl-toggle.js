/**
 * Event Management Website - RTL Toggle
 * Handles bidirectional language switching.
 */

// Make toggleRTL globally available
window.toggleRTL = function (event) {
    if (event) event.preventDefault();

    const html = document.documentElement;
    const currentDir = html.getAttribute('dir');
    const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';

    setDirection(newDir);
};

document.addEventListener('DOMContentLoaded', () => {
    initRTL();
});

function initRTL() {
    // Check saved preference
    const savedDir = localStorage.getItem('dir') || 'ltr';
    setDirection(savedDir);
}

function setDirection(dir) {
    const html = document.documentElement;

    // Update HTML attribute
    html.setAttribute('dir', dir);

    // Save preference
    localStorage.setItem('dir', dir);

    // Update all toggle buttons (desktop and mobile)
    const toggleBtns = document.querySelectorAll('#rtl-toggle, #rtl-toggle-mobile');

    toggleBtns.forEach(btn => {
        if (dir === 'rtl') {
            // Switch to LTR mode text
            const span = btn.querySelector('span');
            if (span) span.textContent = 'LTR';
            btn.setAttribute('aria-label', 'Switch to LTR');
            // Globe icon stays as globe icon
            // if (btn.querySelector('.fa-globe')) {
            //     btn.innerHTML = '<span class="font-bold">LTR</span>';
            // }
        } else {
            // Switch to RTL mode text
            const span = btn.querySelector('span');
            if (span) span.textContent = 'RTL';
            btn.setAttribute('aria-label', 'Switch to RTL');
            // Globe icon stays as globe icon
            // if (btn.querySelector('.fa-globe')) {
            //     btn.innerHTML = '<span class="font-bold">RTL</span>';
            // }
        }
    });

    // Flip arrow icons if needed
    const arrows = document.querySelectorAll('.fa-arrow-right, .fa-arrow-left, .fa-chevron-right, .fa-chevron-left');
    arrows.forEach(arrow => {
        if (dir === 'rtl') {
            arrow.classList.add('rtl-rotate-180');
            // Note: In Tailwind we usually use rtl:rotate-180 class instead of JS, 
            // but this is a fallback for dynamic content if needed.
            // For this project, we are primarily using utility classes.
        } else {
            arrow.classList.remove('rtl-rotate-180');
        }
    });

    closeMobileExperiences();
    document.dispatchEvent(new CustomEvent('directionchange', { detail: { dir } }));
}

function closeMobileExperiences() {
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileToggle = document.getElementById('mobile-menu-btn');
    if (mobileMenu) {
        mobileMenu.classList.add('hidden');
        if (mobileToggle) {
            mobileToggle.setAttribute('aria-expanded', 'false');
        }
    }
}
