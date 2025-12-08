/**
 * Event Management Website - Main JavaScript
 * Handles navigation, animations, form validation, and page-specific interactions.
 */

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
});

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
    const nav = document.querySelector('nav');
    if (nav) {
        const isDark = document.documentElement.classList.contains('dark');
        const transparentAtTop = nav.getAttribute('data-transparent-at-top') === 'true';

        window.addEventListener('scroll', () => {
            if (window.scrollY > 10) {
                if (isDark) {
                    nav.classList.remove('bg-gray-900/50');
                    nav.classList.add('bg-gray-900/95', 'shadow-lg');
                } else {
                    nav.classList.add('bg-white/90', 'backdrop-blur-md', 'shadow-sm');
                    if (transparentAtTop) {
                        nav.classList.remove('bg-transparent');
                    } else {
                        // Ensure bg-white is present if we scrolled down, though it likely is already there
                        nav.classList.remove('bg-white'); // Remove solid white to add translucent
                    }
                }
            } else {
                if (isDark) {
                    nav.classList.add('bg-gray-900/50');
                    nav.classList.remove('bg-gray-900/95', 'shadow-lg');
                } else {
                    nav.classList.remove('bg-white/90', 'backdrop-blur-md', 'shadow-sm');
                    if (transparentAtTop) {
                        nav.classList.add('bg-transparent');
                    } else {
                        nav.classList.add('bg-white');
                    }
                }
            }
        });

        // Initial Check
        if (transparentAtTop && window.scrollY <= 10 && !isDark) {
            nav.classList.add('bg-transparent');
            nav.classList.remove('bg-white', 'shadow-sm');
        } else if (!transparentAtTop && !isDark) {
            nav.classList.add('bg-white');
            nav.classList.remove('bg-transparent');
        }
    }
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
