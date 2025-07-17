document.addEventListener('DOMContentLoaded', function() {

    // On-scroll animation
    const scrollElements = document.querySelectorAll('.animate-on-scroll');

    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add('is-visible');
    };

    const hideScrollElement = (element) => {
        element.classList.remove('is-visible');
    }

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            }
            // Optional: To make animation replay when scrolling up
            // else {
            //     hideScrollElement(el);
            // }
        });
    };

    // Initial check for elements already in view
    handleScrollAnimation();
    window.addEventListener('scroll', handleScrollAnimation);

    // Initial fade-in for hero content
    const heroContent = document.querySelector('.fade-in');
    if (heroContent) {
        setTimeout(() => {
            heroContent.style.opacity = '1';
        }, 100);
    }
    
    // Smooth scrolling for nav links
    const navLinks = document.querySelectorAll('.main-nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

});