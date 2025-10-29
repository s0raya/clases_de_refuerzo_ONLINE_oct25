const hamburgerIcon = document.getElementById("hamburger-icon");
const navbar = document.getElementById("navbar");

hamburgerIcon.addEventListener('click', () => {
    navbar.classList.toggle("active");
})