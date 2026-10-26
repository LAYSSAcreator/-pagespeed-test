document.addEventListener("DOMContentLoaded", function () {
    
    const itensMenu = document.querySelectorAll("#lista ul li");

    const destinos = {
        0: "#banner-principal",     
        1: "#cards",   
        2: "#roteiros",    
        3: "#ajuda",    
        4: "#sobre"     
    };

    itensMenu.forEach((item, index) => {
       
        item.style.cursor = "pointer";

        item.addEventListener("click", function () {
            const seletorAlvo = destinos[index];
            const elementoAlvo = document.querySelector(seletorAlvo);

            if (elementoAlvo) {
               
                elementoAlvo.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });
});
