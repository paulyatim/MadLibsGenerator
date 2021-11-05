class MadLibs {
    constructor(id, nombre, genero, edadMinima, prompts) {
        this.id = id;
        this.name = nombre;
        this.genre = genero;
        this.minAge = edadMinima;
        this.prompts = prompts;
    }
}

const catalogue = [
                {id:1, 
                    name: "Braveheart Speech", 
                    genre: "Cine", 
                    minAge: 13, 
                    prompts: ["verb", "verb", "verb", "verb", "verb ending in 'ing'", "plural noun", "plural noun", "noun", "plural noun", "plural noun", "noun"]},
                {id:2, 
                    name: "Game of Thrones, Chaos", 
                    genre: "TV", 
                    minAge: 18, 
                    prompts: ["noun", "noun", "verb", "noun", "verb", "noun", "noun", "noun", "noun", "noun"]},
                {id:3, 
                    name: "Cumpleaños de...", 
                    genre: "Español", 
                    minAge: 7, 
                    prompts: ["nombre femenino", "número", "adjetivo femenino", "adjetivo femenino", "hora", "lugar", "número", "verbo en tercera persona en plural", "adverbio", "comida", "bebida", "sustantivo masculino", "adjetivo masculino", "número mayor a 1", "sustantivo femenino en plural", "adjetivo femenino en plural", "sustantivo masculino", "adjetivo masculino"]},
                {id:4, 
                    name: "Avatar", 
                    genre: "TV", 
                    minAge: 10, 
                    prompts: ["noun", "noun", "noun", "noun", "past verb", "past verb", "verb", "past verb", "number", "relative", "past verb", "name", "verb ending in 'ing'", "adjetive", "verb"]}
                ];

$(".catalogueCard").click(playMadLib);

// función que muestra los inputs del juego al que se le hizo click
function playMadLib(e) {
    let selectedCard = e.target.id;
    let card = selectCard(selectedCard);
    let list = $("#inputWords");
    list.text("");
    for (const type of card.prompts) {
        list.append(`<label>${type.toUpperCase()}</label>
                     <input type="text" class="inputWord">`);
    }
    list.append(`<button onclick="loadWords(${card.id})">Submit Words</button>`);
}

function selectCard(selectedCard) {
    switch (selectedCard) {
        case "braveheartCard":
            return catalogue[0];
        case "gotCard":
            return catalogue[1];
        case "espanolCard":
            return catalogue[2];
        case "avatarCard":
            return catalogue[3];
        default:
            break;
    }
}

// función que lee los valores de los inputs ingresados por el usuario
function loadWords(madLibId) {
    let fields = $("#inputWords .inputWord").get();
    let answers = [];
    for (const field of fields) {
        answers.push((field.value).toUpperCase());
    }
    showMadLib(madLibId, answers);
}

// función que muestra el madLib con los valores ingresados por el usuario
function showMadLib(madLibId, answers) {
    $("#presentation").text("");
    $("#presentation").append("<div></div>");
    let presentationText = $("#presentation div")
    switch (madLibId) {
        case 1:
            presentationText.append(`<p class="resultTitle">Braveheart MadLibs!</p>
                                 <p>Aye, <span>${answers[0]}</span> and you may <span>${answers[1]}</span>. <span>${answers[2]}</span> and you'll <span>${answers[3]}</span> -- at least a while. And <span>${answers[4]}</span> in your <span>${answers[5]}</span> many years from now, would you be willing to trade all the <span>${answers[6]}</span> from this <span>${answers[7]}</span> to that for one chance, just one chance to come back here and tell our <span>${answers[8]}</span> that they may take our <span>${answers[9]}</span>, but they'll never take our <span>${answers[10]}</span>!!!</p>`);
            break;
        case 2:
            presentationText.append(`<p class="resultTitle">Game of Thrones MadLibs!</p>
                                 <p>Chaos isn't a <span>${answers[0]}</span>. Chaos is a <span>${answers[1]}</span>. Many who try to <span>${answers[2]}</span> it fail, never to try again. The <span>${answers[3]}</span> breaks them. And some given a chance to <span>${answers[4]}</span>, they refuse. They cling to the <span>${answers[5]}</span>, or the <span>${answers[6]}</span>, or <span>${answers[7]}</span>, the illusions. Only the <span>${answers[8]}</span> is real. The <span>${answers[9]}</span> is all there is.</p>`);
            break;
        case 3:
            presentationText.append(`<p class="resultTitle">¡MadLibs en Español!</p>
                                 <p>Hoy es el cumpleaños de <span>${answers[0]}</span>. ¡Cumple <span>${answers[1]}</span> años! Ella quiere tener una fiesta muy <span>${answers[2]}</span> y <span>${answers[3]}</span>. La fiesta empieza a las  <span>${answers[4]}</span> en <span>${answers[5]}</span>. Vienen <span>${answers[6]}</span> invitados. En la fiesta, primero todos <span>${answers[7]}</span> muy <span>${answers[8]}</span>. Después, comen <span>${answers[9]}</span> y beben <span>${answers[10]}</span>. Finalmente, <span>${answers[0]}</span> puede abrir sus regalos. Su mejor amigo le regala un <span>${answers[11]}</span> <span>${answers[12]}</span>. Su vecino le regala <span>${answers[13]}</span> <span>${answers[14]}</span> <span>${answers[15]}</span>. El mejor regalo de todos es un <span>${answers[16]}</span> <span>${answers[17]}</span>. ¡Feliz cumpleaños, <span>${answers[0]}</span>!</p>`);
            break;
        case 4:
            presentationText.append(`<p class="resultTitle">Avatar: The Last Airbender MadLibs!</p>
                                 <p><span>${answers[0]}</span>. <span>${answers[1]}</span>. <span>${answers[2]}</span>. <span>${answers[3]}</span>. Long ago, the four nations <span>${answers[4]}</span> together in harmony. Then, everything changed when the Fire Nation <span>${answers[5]}</span>. Only the Avatar, master of all four elements, could <span>${answers[6]}</span> them, but when the world needed him most, he <span>${answers[7]}</span>. <span>${answers[8]}</span> years passed and my <span>${answers[9]}</span> and I <span>${answers[10]}</span> the new Avatar, an airbender named <span>${answers[11]}</span>. And although thier <span>${answers[12]}</span> skills are <span>${answers[13]}</span>, they have a lot to learn before they're ready to <span>${answers[14]}</span> anyone. But I believe <span>${answers[11]}</span> can save the world.</p>`);
            break;
        default:
            break;
    }
}
