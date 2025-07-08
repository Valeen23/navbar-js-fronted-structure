document.addEventListener("DOMContentLoaded", function(){
    const navbarElement = document.querySelector(".navbar-container");

    if(navbarElement){
        fetch("/frontend/public/views/components/navbar.html")
        .then(response => response.text())
        .then(data => {navbarElement.innerHTML = data;

        //===logica para reslatar el enlace que está activo en el navbar

        //Obtener la ruta actual

        //Si no hay un archivo específico se asume que es el index
        const currentPage = window.location.pathname.split("/").pop() || "index.html";

        //Seleciona todos los enlaces del navbar que usarán la clase personalizada
        const navbarLinks = navbarElement.querySelectorAll(".navbar__link");

        //Recorre cada enlace del navbar
        navbarLinks.forEach(link => {

            //Verifica si el href del enlace incluye el nombre de la página actual
            if(link.getAttribute("href").includes(currentPage)){

                //Si es la página actual se le asigna la clase 'activa' para destacarla visulamente 
                link.classList.add("active");
            }
        });

    })
    .catch(error => console.error("Error cargando el navbar", error));
    }
});