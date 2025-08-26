// Exportamos una función llamada loadCards que acepta:
// -containerSelector: un selector CSS para el contenedor donde van las card.
// -cardIds: Un array es opcional con los IDs de las card que se quieren mostrar.
export async function loadCards(containerSelector, cardIds = []) {

    // Obtenemos el contenedor del DOM
    const container = document.querySelector(containerSelector);
    if(!container)return; // Si no existe simplemente nos salimos 

    try{
        const[templateRes, dataRes] = await Promise.all([
            // Manejo de rutas - Hacer dos fetch al mismo tiempo
            // 1 es para la plantilla
            // 2 es para los datos
            fetch("/frontend/public/views/components/card.html"),
            fetch("/frontend/public/data/cards.json"),
        ]);

        // Convertir las respuestas (que llegan de las promesas) a texto y a json
        const template = await templateRes.text();
        const cards = await dataRes.json();

        //Filtramos las cards si se proporcionan los IDs específicos
        const filteredCards = cardIds.length
        ? cards.filter(card => cardIds.includes(card.id)) // Solo las que están en el arreglo
        :cards; // Si no hay filtro. úselas todas 

        filteredCards.forEach(card => {

            // Reemplazar los paceholder{{...}} del template con los datos reales
            let html = template
            .replace("{{title}}",card.title)
            .replace("{{icon1}}",card.icon1)
            .replace("{{icon2}}",card.icon2)
            .replace("{{description}}",card.description);

            // container.innerHTML += html;
            container.insertAdjacentHTML("beforeend", html);
        });

    }catch(error){
        console.error("Error, cargando las cards",error);
    }
}