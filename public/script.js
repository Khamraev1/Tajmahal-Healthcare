// Mobile menu functionality
const mobileMenuBtn = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        navLinks.classList.remove('active');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile menu after clicking
            navLinks.classList.remove('active');
        }
    });
});

// Contact form submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const formData = new FormData(this);
        const data = Object.fromEntries(formData);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (result.success) {
                alert('Xabaringiz muvaffaqiyatli yuborildi! Tez orada siz bilan bog\'lanamiz.');
                this.reset();
            } else {
                alert('Xabar yuborishda xatolik yuz berdi. Iltimos, keyinroq qayta urinib ko\'ring.');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Xabar yuborishda xatolik yuz berdi. Iltimos, keyinroq qayta urinib ko\'ring.');
        }
    });
}

// Update doctor-details.js and service-details.js form submissions
document.addEventListener('DOMContentLoaded', function () {
    // Doctor appointment form
    const appointmentForm = document.getElementById('appointment-form');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const formData = new FormData(this);
            const data = Object.fromEntries(formData);

            try {
                const response = await fetch('/api/appointment', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                const result = await response.json();

                if (result.success) {
                    alert('Ariza muvaffaqiyatli yuborildi! Tez orada siz bilan bog\'lanamiz.');
                    this.reset();
                } else {
                    alert('Ariza yuborishda xatolik yuz berdi. Iltimos, keyinroq qayta urinib ko\'ring.');
                }
            } catch (error) {
                console.error('Error submitting appointment form:', error);
                alert('Ariza yuborishda xatolik yuz berdi. Iltimos, keyinroq qayta urinib ko\'ring.');
            }
        });
    }

    // Service request form
    const serviceForm = document.getElementById('service-form');
    if (serviceForm) {
        serviceForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const formData = new FormData(this);
            const data = Object.fromEntries(formData);

            try {
                const response = await fetch('/api/service-request', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                const result = await response.json();

                if (result.success) {
                    alert('Xizmat so\'rovi muvaffaqiyatli yuborildi! Tez orada siz bilan bog\'lanamiz.');
                    this.reset();
                } else {
                    alert('Xizmat so\'rovini yuborishda xatolik yuz berdi. Iltimos, keyinroq qayta urinib ko\'ring.');
                }
            } catch (error) {
                console.error('Error submitting service form:', error);
                alert('Xizmat so\'rovini yuborishda xatolik yuz berdi. Iltimos, keyinroq qayta urinib ko\'ring.');
            }
        });
    }
});

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }

    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // Scroll Down
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // Scroll Up
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Animate elements on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.service-card, .doctor-card, .hospital-card, .about-content, .about-image');

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;

        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.classList.add('animate');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Add loading animation to images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', function () {
        this.classList.add('loaded');
    });
}); 