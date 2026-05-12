document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('main-header');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const backToTop = document.getElementById('back-to-top');
    
    // Mobile Toggle
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            header.classList.toggle('active');
        });
    }

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            header.classList.remove('active');
        });
    });
    
    // Scroll Effects
    window.addEventListener('scroll', () => {
        // Sticky Header
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Back to Top visibility
        if (window.scrollY > 500) {
            backToTop.style.display = 'flex';
        } else {
            backToTop.style.display = 'none';
        }
    });

    // Back to Top Click
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Smooth Scrolling for Nav Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // FAQ Toggle
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQs
            faqItems.forEach(otherItem => otherItem.classList.remove('active'));
            
            // Toggle current FAQ
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Form Submission (Mock)
    const leadForm = document.getElementById('lead-form');
    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you! Your inquiry has been sent. Our team will contact you shortly.');
            leadForm.reset();
        });
    }

    // Simple Intersection Observer for Fade-In Effects
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const revealElements = [
        '.service-card', 
        '.feat-item', 
        '.process-step', 
        '.faq-item', 
        '.stat-item', 
        '.testi-card', 
        '.contact-info', 
        '.contact-form-box', 
        '.partner-card',
        '.industry-item',
        '.compliance-box'
    ];

    document.querySelectorAll(revealElements.join(', ')).forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });

    // Counter Animation
    const counters = document.querySelectorAll('.count');
    const counterSpeed = 100; // Adjusted speed

    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        let count = 0;
        
        const updateCount = () => {
            const inc = target / counterSpeed;
            if (count < target) {
                count += inc;
                counter.innerText = Math.ceil(count).toLocaleString();
                requestAnimationFrame(updateCount);
            } else {
                counter.innerText = target.toLocaleString();
            }
        };
        updateCount();
    };

    // Observer for counters
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counterElements = entry.target.querySelectorAll('.count');
                counterElements.forEach(el => animateCounter(el));
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 }); // Reduced threshold for mobile reliability

    const counterSection = document.querySelector('.counter-section');
    if (counterSection) {
        counterObserver.observe(counterSection);
    }
});
