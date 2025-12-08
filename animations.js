const scrollAnimation = document.querySelector("#animationScroll");
const scrollAnimation1 = document.querySelector("#animationScroll1");

const animationDuration = 2000;
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            // Element is in the viewport: add a class or change style
            entry.target.classList.add("appear");
        }
    });
});

// Start observing the elements
observer.observe(scrollAnimation);
observer.observe(scrollAnimation1);
