const scrollAnimation = document.querySelector("#animationScroll");

const animationDuration = 2000;
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            // Element is in the viewport: add a class or change style
            scrollAnimation.classList.add("appear");

        }
    });
});

// Start observing the element
observer.observe(scrollAnimation);
