document.addEventListener('DOMContentLoaded', () => {
    // Add smooth scroll behavior for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Dynamic text animation for About section
    const phrases = [
        "crafting intuitive Android experiences.",
        "writing clean and scalable code.",
        "building solid architectures with Kotlin.",
        "turning ideas into reliable products."
    ];
    
    let currentPhrase = 0;
    let currentChar = 0;
    let isDeleting = false;
    const dynamicText = document.querySelector('.dynamic-text');
    const typingDelay = 100; // Delay between each character
    const deletingDelay = 50; // Delay when deleting characters
    const newPhraseDelay = 2000; // Delay before starting a new phrase

    function typeEffect() {
        const currentText = phrases[currentPhrase];
        
        if (isDeleting) {
            // Remove characters
            dynamicText.textContent = currentText.substring(0, currentChar - 1);
            currentChar--;
        } else {
            // Add characters
            dynamicText.textContent = currentText.substring(0, currentChar + 1);
            currentChar++;
        }

        // Determine next timeout duration
        let timeout = isDeleting ? deletingDelay : typingDelay;

        // Check if word is complete
        if (!isDeleting && currentChar === currentText.length) {
            // Start deleting after a delay
            timeout = newPhraseDelay;
            isDeleting = true;
        } else if (isDeleting && currentChar === 0) {
            // Move to next phrase
            isDeleting = false;
            currentPhrase = (currentPhrase + 1) % phrases.length;
        }

        setTimeout(typeEffect, timeout);
    }

    // Start the typing effect
    if (dynamicText) {
        setTimeout(typeEffect, newPhraseDelay);
    }

    // Add ripple effect to cards
    const cards = document.querySelectorAll('.profile-card, .social-card, .about-section');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
            card.classList.add('card-hover');
        });

        card.addEventListener('mouseleave', () => {
            card.classList.remove('card-hover');
        });
    });
});