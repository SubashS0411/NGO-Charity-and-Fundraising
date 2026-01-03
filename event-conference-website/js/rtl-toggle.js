/**
 * Event Management Website - RTL Toggle
 * Handles bidirectional language switching.
 */

document.addEventListener('DOMContentLoaded', () => {
    initRTL();
});

// Expose global function for inline onclick handlers
window.toggleRTL = function (e) {
    if (e) {
        e.preventDefault();
    }
    const html = document.documentElement;
    const currentDir = html.getAttribute('dir');
    const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
    setDirection(newDir);
};

function initRTL() {
    // Check saved preference
    const savedDir = localStorage.getItem('dir') || 'ltr';
    setDirection(savedDir);

    // We can still try to attach listeners for progressive enhancement,
    // but the inline onclick will be the primary/fallback method.
    const toggleBtn = document.getElementById('rtl-toggle');
    const mobileToggleBtn = document.getElementById('rtl-toggle-mobile');

    if (toggleBtn) {
        toggleBtn.onclick = window.toggleRTL;
    }
    if (mobileToggleBtn) {
        mobileToggleBtn.onclick = window.toggleRTL;
    }
}

function setDirection(dir) {
    const html = document.documentElement;
    const toggleBtn = document.getElementById('rtl-toggle');
    const mobileToggleBtn = document.getElementById('rtl-toggle-mobile');

    html.setAttribute('dir', dir);
    localStorage.setItem('dir', dir);

    // Update Desktop Button
    if (toggleBtn) {
        if (dir === 'rtl') {
            toggleBtn.innerHTML = '<span class="font-bold">LTR</span>';
            toggleBtn.setAttribute('aria-label', 'Switch to LTR');
        } else {
            toggleBtn.innerHTML = '<span class="font-bold">RTL</span>';
            toggleBtn.setAttribute('aria-label', 'Switch to RTL');
        }
    }

    // Update Mobile Button
    if (mobileToggleBtn) {
        if (dir === 'rtl') {
            mobileToggleBtn.innerHTML = '<span class="font-bold">LTR</span>';
            mobileToggleBtn.classList.add('text-blue-600');
        } else {
            mobileToggleBtn.innerHTML = '<span class="font-bold">RTL</span>';
            mobileToggleBtn.classList.remove('text-blue-600');
        }
    }

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
