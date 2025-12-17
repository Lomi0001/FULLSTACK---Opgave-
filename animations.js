const scrollAnimation = document.querySelector("#animationScroll");
const scrollAnimation1 = document.querySelector("#animationScroll1");

const animationDuration = 2000;
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {

            entry.target.classList.add("appear");
        }
    });
});


observer.observe(scrollAnimation);
observer.observe(scrollAnimation1);

