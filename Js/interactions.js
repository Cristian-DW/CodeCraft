/**
 * CodeCraft Interactions
 * Handles Scrolling animations and Typing Effect for the Landing Page.
 */

document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    initTypingEffect();
});

// ============================================
// 1. SCROLL REVEAL (INTERSECTION OBSERVER)
// ============================================
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: Stop observing once revealed to avoid re-animating
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: "0px 0px -50px 0px" // Slight offset so it triggers a bit before reaching bottom
    });

    reveals.forEach(el => observer.observe(el));
}

// ============================================
// 2. TYPING EFFECT (MATRIX STYLE)
// ============================================
function initTypingEffect() {
    const titleElement = document.getElementById('hero-title');
    if (!titleElement) return;

    // The text we want to "type"
    // Note: We are keeping the <br> and <span> structure.
    // For simplicity, we'll type the first part, then fade in the second part.
    
    // Reset content initially to just the cursor
    const fullHTML = titleElement.innerHTML;
    
    // We will actually just add a class that triggers the CSS animation for the text
    // Because typing HTML complexity (<br>, <span>) with JS is messy.
    // Instead, let's use a pure CSS approach toggled by JS or a simple char-by-char for the first line.
    
    // Simpler approach:
    // 1. Hide the gradient text initially.
    // 2. Type "Domina la Web,"
    // 3. Then reveal the gradient text.

    const textPart1 = "Domina la Web,";
    const htmlPart2 = '<br><span class="highlight-text-gradient">Línea por Línea</span>';

    titleElement.innerHTML = `<span id="type-target"></span><span class="cursor">|</span>`;
    
    let i = 0;
    const speed = 100; // ms per char

    function typeWriter() {
        if (i < textPart1.length) {
            document.getElementById('type-target').textContent += textPart1.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        } else {
            // Typing done. Remove cursor after a bit and show the rest.
            setTimeout(() => {
                document.querySelector('.cursor').style.display = 'none';
                titleElement.innerHTML = textPart1 + htmlPart2;
                
                // Add a fade-in class to the new part if we wanted, 
                // but simpler is just replacing the HTML which renders immediately.
                // Let's add a small animation to the span.
                const span = titleElement.querySelector('span.highlight-text-gradient');
                if(span) {
                    span.style.opacity = '0';
                    span.style.transition = 'opacity 1s ease';
                    requestAnimationFrame(() => span.style.opacity = '1');
                }
            }, 500);
        }
    }

    // Start typing
    typeWriter();
}
