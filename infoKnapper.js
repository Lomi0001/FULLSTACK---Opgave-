const dropdowns = document.querySelectorAll(".dropdown");

dropdowns.forEach(drop => {
    const btn = document.querySelector(".dropdown-btn");
    const content = document.querySelector(".dropdown-content");

    btn.addEventListener("click", () => {
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }

    });
});

