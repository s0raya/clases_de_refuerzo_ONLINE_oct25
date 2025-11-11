const menuToggle = document.getElementById("hamburger-icon");
const navbar = document.getElementById("navbar");
const submenuLinks = document.querySelectorAll('.has-submenu > a');

menuToggle.addEventListener('click', () => {
    navbar.classList.toggle("active");
})

submenuLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        link.parentElement.classList.toggle('active')
    })
})


/*********** Para cerrar otros submenús al abrir uno *******/

/*submenuLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        submenuLinks.forEach(l => {
            if (l !== link) l.parentElement.classList.remove('active');
        });
        link.parentElement.classList.toggle('active');
    });
});*/