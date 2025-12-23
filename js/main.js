/**
 * Event Management Website - Main JavaScript
 * Handles navigation, animations, form validation, and page-specific interactions.
 */

injectNavbar();
injectFooter();

document.addEventListener('DOMContentLoaded', () => {
    initMobileNav();
    initSmoothScroll();
    initStickyNav();
    initTabs();
    initModals();
    initForms();
    initCounters();
    initAccordions();
    initCountdown();
    initSpeakerSlider();
    initMap();
    handleBrokenImages();
});

/* ==========================================
   Global Navbar Injection
   ========================================== */

function injectNavbar() {
    const body = document.body;
    if (!body) return;

    const transparentPref = body.dataset.navTransparent === 'true';
    const requestedTheme = (body.dataset.navTheme || (document.documentElement.classList.contains('dark') ? 'dark' : 'light')).toLowerCase();
    const themeConfig = requestedTheme === 'dark'
        ? getDarkThemeConfig(transparentPref)
        : getLightThemeConfig(transparentPref);

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const isActive = (pages) => pages.includes(currentPage);
    const desktopLinkClass = (pages) => isActive(pages)
        ? themeConfig.desktopActive
        : themeConfig.desktopInactive;
    const mobileLinkClass = (pages) => isActive(pages)
        ? themeConfig.mobileActive
        : themeConfig.mobileInactive;
    const homeVariantClass = (pages) => isActive(pages)
        ? themeConfig.homeActive
        : themeConfig.homeInactive;

    const registerBtnClasses = isActive(['register.html'])
        ? themeConfig.registerActive
        : themeConfig.registerDefault;

    const signupBtnClasses = isActive(['signup.html'])
        ? themeConfig.signupActive
        : themeConfig.signupDefault;

    const navTemplate = `
        <nav class="fixed w-full z-50 transition-all duration-300 ${themeConfig.topClasses}" id="navbar" data-site-navbar="true" data-nav-theme="${themeConfig.name}" data-transparent-at-top="${transparentPref}" data-nav-top-class="${themeConfig.topClasses}" data-nav-scroll-class="${themeConfig.scrolledClasses}">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between h-20 items-center">
                    <div class="flex-shrink-0 flex items-center">
                        <a href="index.html" class="flex items-center gap-2 group">
                            <div class="w-10 h-10 ${themeConfig.brandMark} rounded-lg flex items-center justify-center text-white font-bold text-xl group-hover:scale-110 transition-transform duration-300 shadow-lg ${themeConfig.brandShadow}">
                                TS
                            </div>
                            <span class="font-bold text-2xl tracking-tight ${themeConfig.brandText} group-hover:${themeConfig.brandHover} transition-colors hidden sm:block">TechSummit</span>
                        </a>
                    </div>

                    <div class="hidden md:flex items-center space-x-8">
                        <div class="relative group">
                            <button class="flex items-center gap-1 ${themeConfig.homeTrigger} focus:outline-none py-2">
                                Home <i class="fas fa-chevron-down text-xs transition-transform duration-300 group-hover:rotate-180"></i>
                            </button>
                            <div class="${themeConfig.dropdownWrapper}">
                                <a href="index.html" class="${homeVariantClass(['', 'index.html'])}">
                                    <i class="fas fa-sun me-2 text-yellow-500"></i> Home 1
                                </a>
                                <a href="index2.html" class="${homeVariantClass(['index2.html'])}">
                                    <i class="fas fa-moon me-2 text-purple-500"></i> Home 2
                                </a>
                            </div>
                        </div>
                        <a href="event-details.html" class="${desktopLinkClass(['event-details.html', 'event-details2.html'])}">
                            Event Details
                            <span class="absolute -bottom-1 start-0 w-0 h-0.5 ${themeConfig.accentBorder} transition-all duration-300 group-hover:w-full"></span>
                        </a>
                        <a href="schedule.html" class="${desktopLinkClass(['schedule.html', 'schedule2.html'])}">
                            Schedule
                            <span class="absolute -bottom-1 start-0 w-0 h-0.5 ${themeConfig.accentBorder} transition-all duration-300 group-hover:w-full"></span>
                        </a>
                        <a href="contact.html" class="${desktopLinkClass(['contact.html', 'contact2.html'])}">
                            Contact
                            <span class="absolute -bottom-1 start-0 w-0 h-0.5 ${themeConfig.accentBorder} transition-all duration-300 group-hover:w-full"></span>
                        </a>
                        <a href="user-dashboard.html" class="${desktopLinkClass(['user-dashboard.html', 'admin-dashboard.html'])}">
                            Dashboard
                            <span class="absolute -bottom-1 start-0 w-0 h-0.5 ${themeConfig.accentBorder} transition-all duration-300 group-hover:w-full"></span>
                        </a>
                        <a href="login.html" class="${desktopLinkClass(['login.html'])} hover:scale-105 transition-transform">
                            Log in
                        </a>
                        <a href="signup.html" class="${signupBtnClasses}">
                            Sign Up
                        </a>
                        <button id="rtl-toggle" onclick="toggleRTL(event)" class="${themeConfig.rtlToggleDesktop}">
                            <i class="fas fa-globe text-lg"></i>
                        </button>
                    </div>

                    <div class="md:hidden flex items-center gap-4">
                        <div class="flex items-center gap-2">
                            <button id="rtl-toggle-mobile" onclick="toggleRTL(event)" class="${themeConfig.rtlToggleMobile}">
                                <i class="fas fa-globe"></i>
                            </button>
                        </div>
                        <button id="mobile-menu-btn" class="${themeConfig.mobileMenuButton}" aria-expanded="false">
                            <i class="fas fa-bars text-2xl transition-transform duration-300"></i>
                        </button>
                    </div>
                </div>
            </div>

            <div id="mobile-menu" class="${themeConfig.mobileMenuWrapper}">
                <div class="px-4 pt-2 pb-6 space-y-2">
                    <div class="space-y-1">
                        <div class="${themeConfig.mobileSectionLabel}">Home Variants</div>
                        <a href="index.html" class="${mobileLinkClass(['', 'index.html'])}">Home 1</a>
                        <a href="index2.html" class="${mobileLinkClass(['index2.html'])}">Home 2</a>
                    </div>
                    <a href="user-dashboard.html" class="${mobileLinkClass(['user-dashboard.html', 'admin-dashboard.html'])}">Dashboard</a>
                    <a href="event-details.html" class="${mobileLinkClass(['event-details.html', 'event-details2.html'])}">Event Details</a>
                    <a href="schedule.html" class="${mobileLinkClass(['schedule.html', 'schedule2.html'])}">Schedule</a>
                    <a href="contact.html" class="${mobileLinkClass(['contact.html', 'contact2.html'])}">Contact</a>
                    <div class="${themeConfig.languageRow}">
                        <span>Language Direction</span>
                        <button onclick="toggleRTL(event)" class="${themeConfig.languageButton}">
                            <i class="fas fa-globe"></i>
                        </button>
                    </div>
                    <div class="border-t ${themeConfig.mobileDivider} my-2 pt-2">
                        <a href="login.html" class="${mobileLinkClass(['login.html'])}">Log in</a>
                        <a href="signup.html" class="${themeConfig.mobileSignup}">Sign Up</a>
                    </div>
                </div>
            </div>
        </nav>
    `;

    const existingNav = document.querySelector('body > nav');
    if (existingNav) {
        existingNav.outerHTML = navTemplate.trim();
    } else {
        body.insertAdjacentHTML('afterbegin', navTemplate.trim());
    }
}

function injectFooter() {
    const body = document.body;
    if (!body) return;

    const currentYear = new Date().getFullYear();

    const footerTemplate = `
        <footer class="bg-gray-900 text-gray-300 py-12 border-t border-gray-800" data-site-footer="true">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid md:grid-cols-4 gap-8 mb-8">
                    <div class="col-span-1">
                        <a href="index.html" class="flex items-center gap-2 mb-4">
                            <div class="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold">TS</div>
                            <span class="font-bold text-xl text-white">TechSummit</span>
                        </a>
                        <p class="text-sm text-gray-400">The premier technology conference for innovators and leaders.</p>
                    </div>

                    <div>
                        <h4 class="text-white font-bold mb-4">Quick Links</h4>
                        <ul class="space-y-2 text-sm">
                            <li><a href="index.html" class="hover:text-blue-400 transition">Home</a></li>
                            <li><a href="event-details.html" class="hover:text-blue-400 transition">About</a></li>
                            <li><a href="schedule.html" class="hover:text-blue-400 transition">Schedule</a></li>
                            <li><a href="contact.html" class="hover:text-blue-400 transition">Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 class="text-white font-bold mb-4">Legal</h4>
                        <ul class="space-y-2 text-sm">
                            <li><a href="#" class="hover:text-blue-400 transition">Privacy Policy</a></li>
                            <li><a href="#" class="hover:text-blue-400 transition">Terms of Service</a></li>
                            <li><a href="#" class="hover:text-blue-400 transition">Code of Conduct</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 class="text-white font-bold mb-4">Connect</h4>
                        <div class="flex gap-4">
                            <a href="#" class="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition text-white"><i class="fab fa-twitter"></i></a>
                            <a href="#" class="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition text-white"><i class="fab fa-linkedin-in"></i></a>
                            <a href="#" class="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition text-white"><i class="fab fa-instagram"></i></a>
                        </div>
                    </div>
                </div>

                <div class="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
                    <p>&copy; ${currentYear} TechSummit. All rights reserved.</p>
                    <p>Designed for excellence.</p>
                </div>
            </div>
        </footer>
    `;

    const existingFooter = document.querySelector('body > footer');
    if (existingFooter) {
        existingFooter.outerHTML = footerTemplate.trim();
    } else {
        body.insertAdjacentHTML('beforeend', footerTemplate.trim());
    }
}

function getLightThemeConfig(transparent) {
    return {
        name: 'light',
        topClasses: transparent ? 'bg-transparent' : 'bg-white/95 backdrop-blur-lg border-b border-gray-100 shadow-sm',
        scrolledClasses: 'bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm',
        brandMark: 'bg-blue-600',
        brandShadow: 'group-hover:shadow-blue-500/50',
        brandText: 'text-gray-900',
        brandHover: 'text-blue-600',
        homeTrigger: 'text-blue-600 font-medium',
        dropdownWrapper: 'absolute start-0 top-full w-48 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50 overflow-hidden',
        homeActive: 'block px-4 py-3 text-sm text-blue-600 bg-blue-50 border-s-4 border-blue-600 font-semibold',
        homeInactive: 'block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium border-s-4 border-transparent hover:border-blue-600',
        desktopActive: 'text-blue-600 font-semibold relative group',
        desktopInactive: 'text-gray-600 hover:text-blue-600 transition font-medium relative group',
        accentBorder: 'bg-blue-600',
        registerDefault: 'bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-blue-500/40 transform hover:-translate-y-1 hover:scale-105 active:scale-95',
        registerActive: 'bg-blue-700 text-white px-6 py-2.5 rounded-full font-semibold transition-all duration-300 shadow-lg',
        signupDefault: 'bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-blue-500/40 transform hover:-translate-y-1 hover:scale-105 active:scale-95',
        signupActive: 'bg-blue-700 text-white px-6 py-2.5 rounded-full font-semibold transition-all duration-300 shadow-lg',
        rtlToggleDesktop: 'text-gray-600 hover:text-blue-600 transition px-3 py-1 border border-gray-200 rounded-md text-sm hover:border-blue-300 hover:bg-blue-50',
        rtlToggleMobile: 'text-gray-500 hover:text-blue-600 font-bold border border-gray-200 rounded px-2 py-1 text-sm',
        mobileMenuButton: 'text-gray-600 hover:text-gray-900 focus:outline-none',
        mobileMenuWrapper: 'hidden md:hidden bg-white/95 backdrop-blur-md border-t border-gray-100 absolute w-full shadow-lg transform transition-all duration-300 origin-top',
        mobileSectionLabel: 'px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider',
        mobileActive: 'block px-3 py-3 rounded-md text-base font-semibold text-blue-600 bg-blue-50',
        mobileInactive: 'block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50',
        languageRow: 'flex items-center justify-between px-3 py-2 text-gray-700 font-medium bg-gray-50 rounded-md',
        languageButton: 'text-gray-700 hover:text-blue-600 font-bold border border-gray-200 rounded px-2 py-1 text-sm bg-white',
        mobileDivider: 'border-gray-100',
        mobileRegister: 'block w-full text-center mt-2 bg-blue-600 text-white px-5 py-3 rounded-lg font-medium hover:bg-blue-700 shadow-md',
        mobileSignup: 'block w-full text-center mt-2 bg-blue-600 text-white px-5 py-3 rounded-lg font-medium hover:bg-blue-700 shadow-md'
    };
}

function getDarkThemeConfig(transparent) {
    return {
        name: 'dark',
        topClasses: transparent ? 'bg-transparent border-b border-gray-800' : 'bg-gray-900/80 border-b border-gray-800 backdrop-blur-lg',
        scrolledClasses: 'bg-gray-900/95 backdrop-blur-lg border-b border-gray-800 shadow-lg',
        brandMark: 'bg-purple-600',
        brandShadow: 'group-hover:shadow-purple-500/50',
        brandText: 'text-white',
        brandHover: 'text-purple-400',
        homeTrigger: 'text-gray-300 hover:text-white font-medium',
        dropdownWrapper: 'absolute start-0 top-full w-48 bg-gray-800 rounded-xl shadow-2xl border border-gray-700 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50 overflow-hidden',
        homeActive: 'block px-4 py-3 text-sm text-purple-400 bg-purple-900/20 border-s-4 border-purple-500 font-medium',
        homeInactive: 'block px-4 py-3 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors border-s-4 border-transparent hover:border-purple-500',
        desktopActive: 'text-purple-400 font-semibold relative group',
        desktopInactive: 'text-gray-300 hover:text-white transition font-medium relative group',
        accentBorder: 'bg-purple-500',
        registerDefault: 'bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-purple-500/40 transform hover:-translate-y-1 hover:scale-105 active:scale-95',
        registerActive: 'bg-purple-700 text-white px-6 py-2.5 rounded-full font-semibold transition-all duration-300 shadow-lg',
        signupDefault: 'bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-purple-500/40 transform hover:-translate-y-1 hover:scale-105 active:scale-95',
        signupActive: 'bg-purple-700 text-white px-6 py-2.5 rounded-full font-semibold transition-all duration-300 shadow-lg',
        rtlToggleDesktop: 'text-gray-300 hover:text-white transition px-3 py-1 border border-gray-700 rounded-md text-sm hover:border-purple-500 hover:bg-gray-800',
        rtlToggleMobile: 'text-gray-300 hover:text-white font-bold border border-gray-700 rounded px-2 py-1 text-sm',
        mobileMenuButton: 'text-gray-300 hover:text-white focus:outline-none',
        mobileMenuWrapper: 'hidden md:hidden bg-gray-900/95 backdrop-blur-md border-t border-gray-800 absolute w-full shadow-lg transform transition-all duration-300 origin-top',
        mobileSectionLabel: 'px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider',
        mobileActive: 'block px-3 py-3 rounded-md text-base font-semibold text-purple-400 bg-purple-900/20',
        mobileInactive: 'block px-3 py-3 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800',
        languageRow: 'flex items-center justify-between px-3 py-2 text-gray-300 font-medium bg-gray-800 rounded-md border border-gray-700',
        languageButton: 'text-gray-300 hover:text-white font-bold border border-gray-700 rounded px-2 py-1 text-sm bg-gray-900',
        mobileDivider: 'border-gray-800',
        mobileRegister: 'block w-full text-center mt-2 bg-purple-600 text-white px-5 py-3 rounded-lg font-medium hover:bg-purple-700 shadow-md',
        mobileSignup: 'block w-full text-center mt-2 bg-purple-600 text-white px-5 py-3 rounded-lg font-medium hover:bg-purple-700 shadow-md'
    };
}

/* ==========================================
   Navigation
   ========================================== */

function initMobileNav() {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    const closeBtn = document.getElementById('close-mobile-menu');

    if (btn && menu) {
        btn.addEventListener('click', () => {
            const isExpanded = btn.getAttribute('aria-expanded') === 'true';
            btn.setAttribute('aria-expanded', !isExpanded);
            menu.classList.toggle('hidden');
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                menu.classList.add('hidden');
                btn.setAttribute('aria-expanded', 'false');
            });
        }

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!menu.contains(e.target) && !btn.contains(e.target) && !menu.classList.contains('hidden')) {
                menu.classList.add('hidden');
                btn.setAttribute('aria-expanded', 'false');
            }
        });
    }
}

function initStickyNav() {
    const nav = document.querySelector('nav[data-site-navbar="true"]');
    if (!nav) return;

    const topClasses = (nav.dataset.navTopClass || '').split(' ').filter(Boolean);
    const scrolledClasses = (nav.dataset.navScrollClass || '').split(' ').filter(Boolean);

    const applyNavState = (scrolled) => {
        if (scrolled) {
            if (topClasses.length) nav.classList.remove(...topClasses);
            if (scrolledClasses.length) nav.classList.add(...scrolledClasses);
        } else {
            if (scrolledClasses.length) nav.classList.remove(...scrolledClasses);
            if (topClasses.length) nav.classList.add(...topClasses);
        }
    };

    applyNavState(window.scrollY > 10);

    window.addEventListener('scroll', () => {
        applyNavState(window.scrollY > 10);
    });
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const menu = document.getElementById('mobile-menu');
                const btn = document.getElementById('mobile-menu-btn');
                if (menu && !menu.classList.contains('hidden')) {
                    menu.classList.add('hidden');
                    btn.setAttribute('aria-expanded', 'false');
                }
            }
        });
    });
}

/* ==========================================
   Tabs & Accordions
   ========================================== */

function initTabs() {
    const tabGroups = document.querySelectorAll('[role="tablist"]');

    tabGroups.forEach(group => {
        const tabs = group.querySelectorAll('[role="tab"]');
        const panels = document.querySelectorAll('[role="tabpanel"]');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Deactivate all tabs in this group
                tabs.forEach(t => {
                    t.setAttribute('aria-selected', 'false');
                    t.classList.remove('border-blue-600', 'text-blue-600');
                    t.classList.add('border-transparent', 'text-gray-500');
                });

                // Activate clicked tab
                tab.setAttribute('aria-selected', 'true');
                tab.classList.remove('border-transparent', 'text-gray-500');
                tab.classList.add('border-blue-600', 'text-blue-600');

                // Hide all panels
                panels.forEach(p => p.classList.add('hidden'));

                // Show target panel
                const targetId = tab.getAttribute('aria-controls');
                document.getElementById(targetId)?.classList.remove('hidden');
            });
        });
    });
}

function initAccordions() {
    const accordions = document.querySelectorAll('.accordion-item');

    accordions.forEach(item => {
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');
        const icon = item.querySelector('.accordion-icon');

        if (header && content) {
            header.addEventListener('click', () => {
                const isOpen = !content.classList.contains('hidden');

                // Close all others (optional - remove if you want multiple open)
                accordions.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.querySelector('.accordion-content').classList.add('hidden');
                        const otherIcon = otherItem.querySelector('.accordion-icon');
                        if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
                    }
                });

                // Toggle current
                content.classList.toggle('hidden');
                if (icon) {
                    icon.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
                }
            });
        }
    });
}

/* ==========================================
   Modals
   ========================================== */

function initModals() {
    const triggers = document.querySelectorAll('[data-modal-target]');
    const closeButtons = document.querySelectorAll('[data-modal-close]');

    triggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const modalId = trigger.getAttribute('data-modal-target');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.remove('hidden');
                modal.classList.add('flex');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            }
        });
    });

    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.fixed'); // Assuming modal wrapper has 'fixed' class
            closeModal(modal);
        });
    });

    // Close on backdrop click
    document.querySelectorAll('.modal-backdrop').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });
}

function closeModal(modal) {
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = '';
    }
}

/* ==========================================
   Forms
   ========================================== */

function initForms() {
    const forms = document.querySelectorAll('form:not(#register-form)'); // Exclude multi-step form

    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Simple validation
            let isValid = true;
            const inputs = form.querySelectorAll('input[required], textarea[required]');

            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('border-red-500');
                } else {
                    input.classList.remove('border-red-500');
                }
            });

            if (isValid) {
                // Mock submission
                const btn = form.querySelector('button[type="submit"]');
                const originalText = btn.innerHTML;

                btn.disabled = true;
                btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Sending...';

                setTimeout(() => {
                    btn.innerHTML = '<i class="fas fa-check mr-2"></i> Success!';
                    btn.classList.remove('bg-blue-600');
                    btn.classList.add('bg-green-600');

                    setTimeout(() => {
                        form.reset();
                        btn.disabled = false;
                        btn.innerHTML = originalText;
                        btn.classList.add('bg-blue-600');
                        btn.classList.remove('bg-green-600');

                        // Redirect if login
                        if (form.id === 'login-form') {
                            const email = document.getElementById('email').value;
                            if (email.includes('admin')) {
                                window.location.href = 'admin-dashboard.html';
                            } else {
                                window.location.href = 'user-dashboard.html';
                            }
                        }
                    }, 2000);
                }, 1500);
            }
        });
    });

    // Multi-step form logic
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        initMultiStepForm(registerForm);
    }
}

function initMultiStepForm(form) {
    let currentStep = 1;
    const totalSteps = 4;

    const updateStep = (step) => {
        // Hide all steps
        document.querySelectorAll('.form-step').forEach(el => el.classList.add('hidden'));
        // Show current step
        document.querySelector(`[data-step="${step}"]`).classList.remove('hidden');

        // Update progress bar
        const progress = ((step - 1) / (totalSteps - 1)) * 100;
        document.getElementById('progress-bar').style.width = `${progress}%`;

        // Update indicators
        document.querySelectorAll('.step-indicator').forEach((el, idx) => {
            if (idx + 1 <= step) {
                el.classList.add('bg-blue-600', 'text-white', 'border-blue-600');
                el.classList.remove('bg-white', 'text-gray-500', 'border-gray-300');
            } else {
                el.classList.remove('bg-blue-600', 'text-white', 'border-blue-600');
                el.classList.add('bg-white', 'text-gray-500', 'border-gray-300');
            }
        });

        currentStep = step;
        window.scrollTo(0, 0);
    };

    document.querySelectorAll('.next-step').forEach(btn => {
        btn.addEventListener('click', () => {
            // Validate current step
            const currentStepEl = document.querySelector(`[data-step="${currentStep}"]`);
            const inputs = currentStepEl.querySelectorAll('input[required], select[required]');
            let isValid = true;

            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('border-red-500');
                } else {
                    input.classList.remove('border-red-500');
                }
            });

            if (isValid) {
                // Save data to session storage
                const formData = new FormData(form);
                for (let [key, value] of formData.entries()) {
                    sessionStorage.setItem(key, value);
                }

                if (currentStep < totalSteps) {
                    updateStep(currentStep + 1);
                }
            }
        });
    });

    document.querySelectorAll('.prev-step').forEach(btn => {
        btn.addEventListener('click', () => {
            if (currentStep > 1) {
                updateStep(currentStep - 1);
            }
        });
    });

    // Final submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = document.getElementById('submit-btn');
        btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Processing...';

        setTimeout(() => {
            // Show success message
            form.innerHTML = `
                <div class="text-center py-12">
                    <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <i class="fas fa-check text-3xl text-green-600"></i>
                    </div>
                    <h2 class="text-3xl font-bold text-gray-900 mb-4">Registration Successful!</h2>
                    <p class="text-gray-600 mb-8">Thank you for registering. We've sent a confirmation email to your inbox.</p>
                    <a href="user-dashboard.html" class="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">Go to Dashboard</a>
                </div>
            `;
            sessionStorage.clear(); // Clear data
        }, 2000);
    });
}

/* ==========================================
   Counters & Animations
   ========================================== */

function initCounters() {
    const counters = document.querySelectorAll('.counter');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000; // 2 seconds
                const step = target / (duration / 16); // 60fps

                let current = 0;
                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        counter.innerText = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.innerText = target;
                    }
                };

                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

function initCountdown() {
    const countdownEl = document.getElementById('countdown');
    if (!countdownEl) return;

    // Set date to 14 days from now
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 14);

    const updateTimer = () => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = String(days).padStart(2, '0');
        document.getElementById('hours').innerText = String(hours).padStart(2, '0');
        document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
        document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');

        if (distance < 0) {
            clearInterval(interval);
            countdownEl.innerHTML = "EXPIRED";
        }
    };

    const interval = setInterval(updateTimer, 1000);
    updateTimer();
}

/* ==========================================
   Speaker Slider
   ========================================== */

function initSpeakerSlider() {
    const slider = document.getElementById('speakers-slider');
    const prevBtn = document.getElementById('prev-speaker');
    const nextBtn = document.getElementById('next-speaker');

    if (slider && prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
            const scrollAmount = isRTL ? 320 : -320;
            slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });

        nextBtn.addEventListener('click', () => {
            const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
            const scrollAmount = isRTL ? -320 : 320;
            slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
    }
}

/* ==========================================
   Map Initialization
   ========================================== */

function initMap() {
    const mapElement = document.getElementById('map');
    if (mapElement && typeof L !== 'undefined') {
        const map = L.map('map').setView([37.784323, -122.40069], 15);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker([37.784323, -122.40069]).addTo(map)
            .bindPopup('Moscone Center<br>747 Howard St, San Francisco')
            .openPopup();
    }
}

function handleBrokenImages() {
    const removeImage = (img) => {
        const fallback = img.getAttribute('data-fallback-src');
        if (fallback) {
            img.src = fallback;
            img.removeAttribute('data-fallback-src');
        } else {
            img.classList.add('opacity-0');
            setTimeout(() => img.remove(), 200);
        }
    };

    document.querySelectorAll('img:not([data-ignore-error-handler="true"])').forEach(img => {
        if (img.complete && img.naturalWidth === 0) {
            removeImage(img);
        } else {
            img.addEventListener('error', () => removeImage(img));
        }
    });
}
