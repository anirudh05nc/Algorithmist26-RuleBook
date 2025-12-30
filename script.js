document.addEventListener("DOMContentLoaded", function () {
    // --- Intro Sequence ---
    const introContainer = document.getElementById("intro-container");

    // Stagger animation for intro text
    const introLetters = document.querySelectorAll("#intro-text span");
    introLetters.forEach((span, index) => {
        span.style.animationDelay = `${index * 0.1}s`;
    });

    setTimeout(() => {
        if (introContainer) {
            introContainer.style.transition = "opacity 1s ease";
            introContainer.style.opacity = "0";
            setTimeout(() => {
                introContainer.style.display = "none";
            }, 1000);
        }
    }, 2500); // 2.5s delay to let animations finish


    // --- Scroll Animations ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const cards = document.querySelectorAll(".algorithm-container li");
    cards.forEach((card, index) => {
        // Set initial state for animation
        card.style.opacity = "0";
        card.style.transform = "translateY(50px)";
        card.style.transition = "opacity 0.6s ease, transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)";

        observer.observe(card);
    });

    // --- Interactive Background Glow ---
    const cursorGlow = document.getElementById('cursor-glow');

    if (cursorGlow) {
        document.addEventListener('mousemove', (e) => {
            requestAnimationFrame(() => {
                // Determine opacity based on having moved (fade in on first move)
                cursorGlow.style.opacity = '1';
                cursorGlow.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
            });
        });
    }
});
