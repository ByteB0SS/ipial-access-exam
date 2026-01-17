const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.remove('animate-on-scroll');
            entry.target.classList.add('animated');
            void entry.target.offsetWidth; // Trigger reflow to restart the animation
        }
    });
})

const hiddenElements = document.querySelectorAll('.animate-on-scroll');
hiddenElements.forEach((el) => observer.observe(el));