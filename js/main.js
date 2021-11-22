class MadLibs {
    constructor(id, prompts) {
        this.id = id;
        this.prompts = prompts;
    }
}

const catalogue = [
                {id:1, 
                    prompts: ["verb", "verb", "verb", "verb", "verb ending in 'ing'", "plural noun", "plural noun", "noun", "plural noun", "plural noun", "noun"]},
                {id:2,
                    prompts: ["noun", "noun", "verb", "noun", "verb", "noun", "noun", "noun", "noun", "noun"]},
                {id:3,
                    prompts: ["nombre femenino", "número", "adjetivo femenino", "adjetivo femenino", "hora", "lugar", "número", "verbo en tercera persona en plural", "adverbio", "comida", "bebida", "sustantivo masculino", "adjetivo masculino", "número mayor a 1", "sustantivo femenino en plural", "adjetivo femenino en plural", "sustantivo masculino", "adjetivo masculino"]},
                {id:4,
                    prompts: ["noun", "noun", "noun", "noun", "past verb", "past verb", "verb", "past verb", "number", "relative", "past verb", "name", "verb ending in 'ing'", "adjective", "verb"]},
                {id:5,
                    prompts: ["famous singer", "famous singer", "Glee character", "adjective", "Glee character", "Glee character", "Glee character", "body part", "Glee character", "Glee character", "musical", "adjective", "adjective"]},
                {id:6,
                    prompts: ["día de la semana", "animal masculino", "animal masculino", "relleno de sandwich", "pariente", "animal masculino", "adjetivo masculino"]}
                ];

// Efectos de cuando se inicia la página
$("header h1").fadeIn(1000);
$("header h2").delay(500).fadeIn(1000);
$("#randomWordsSection").delay(1000).fadeIn(1000);
$("#categories").delay(1500).fadeIn(1000);
$("#catalogue").delay(2000).fadeIn(1000);

// Uso un API para generar palabras aleatorias y otro para buscar su definición
// Como el algunas palabras del API de palabras aleatorias no tienen definición en el otro API,
// solicito más palabras aleatorias de las que necesito.

let URLRANDOMWORDS = "https://random-word-api.herokuapp.com/word?number=15"
$("#btnRW").click(function (e) { 
    e.preventDefault();
    $("#randomWords").slideToggle(500);
});
$.get(URLRANDOMWORDS,
    function (words) {
        let wordCount = 0;
        for (let word of words) {
            $.get(`https://dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=df53c5a1-db45-410c-8727-316c6a8e50c6`,
                function (data) {
                    if (wordCount == 3 || typeof(data[0]) == "string" || data[0].fl == "undefined" || data[0].shortdef[0] == "undefined") {
                        return;
                    }
                    $("#randomWords").append(`<li>
                                                <div class="randomWord">
                                                    <h3 class="wordRW">${word}</h3>
                                                    <p class="partOfSpeechRW">${data[0].fl}</p>
                                                    <p class="definitionRW">${data[0].shortdef[0]}</p>
                                                </div>
                                              </li>`);
                    wordCount++;
                }
            )
        }
    }
)


// Cuando se hace click al boton "All", se muestran todas las opciones
$("#sortAll").click(function() {
    $("#catalogue div").show();
});
// Cuando se hace click a cualquir boton del navegador, se muestran todas las opciones en el mismo
// color menos la que se selecciona
$("#categories li").click(function() {
    $("#categories li").css("background-color", "#EAEB21");
})
// Cuando se hace click al boton "Movies", se muestran las opciones de dicha categoria
$("#sortMovies").click(function() {
    $("#catalogue div").hide();
    $("#braveheartCard").show();
    $("#liloCard").show();
    $("#sortMovies").css("background-color", "#cfcf1c");
});
// Cuando se hace click al boton "TV", se muestran las opciones de dicha categoria
$("#sortTV").click(function() {
    $("#catalogue div").hide();
    $("#gotCard").show();
    $("#avatarCard").show();
    $("#gleeCard").show();
    $("#sortTV").css("background-color", "#cfcf1c");
});
// Cuando se hace click al boton "Español", se muestran las opciones de dicha categoria
$("#sortEspanol").click(function() {
    $("#catalogue div").hide();
    $("#cumpleCard").show();
    $("#liloCard").show();
    $("#sortEspanol").css("background-color", "#cfcf1c");
});
// Cuando se hace click al boton "< 18", se muestran las opciones de dicha categoria
$("#sort18").click(function() {
    $("#catalogue div").show();
    $("#gotCard").hide();
    $("#sort18").css("background-color", "#cfcf1c");
});

// Cuando se hace click a la carta, empieza el juego seleccionado
$(".catalogueCard").click(playMadLib);

// función que muestra los inputs del juego al que se le hizo click
function playMadLib(e) {
    let selectedCard = e.target.id;
    let card = selectCard(selectedCard);
    $("#presentation").text("").css("display", "none");
    let list = $("#inputWords");
    list.text("");
    for (const type of card.prompts) {
        list.append(`<label>${type.toUpperCase()}</label>
                     <input type="text" class="inputWord">`);
    }
    list.append(`<a href="#presentation"><button onclick="loadWords(${card.id})">Submit Words</button></a>`);
    list.fadeIn(1000);
}

function selectCard(selectedCard) {
    switch (selectedCard) {
        case "braveheartCard":
            return catalogue[0];
        case "gotCard":
            return catalogue[1];
        case "cumpleCard":
            return catalogue[2];
        case "avatarCard":
            return catalogue[3];
        case "gleeCard":
            return catalogue[4];
        case "liloCard":
            return catalogue[5];
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
    $("#presentation").append("<div></div>");
    let presentationText = $("#presentation div")
    switch (madLibId) {
        case 1:
            presentationText.append(`<p class="resultTitle">Braveheart MadLibs!</p>
                                 <p>Aye, <span>${answers[0]}</span> and you may <span>${answers[1]}</span>. 
                                 <span>${answers[2]}</span> and you'll <span>${answers[3]}</span> -- at least 
                                 a while. And <span>${answers[4]}</span> in your <span>${answers[5]}</span> 
                                 many years from now, would you be willing to trade all the <span>${answers[6]}</span> 
                                 from this <span>${answers[7]}</span> to that for one chance, just one chance 
                                 to come back here and tell our <span>${answers[8]}</span> that they may take 
                                 our <span>${answers[9]}</span>, but they'll never take our <span>${answers[10]}</span>!!!</p>`);
            break;
        case 2:
            presentationText.append(`<p class="resultTitle">Game of Thrones MadLibs!</p>
                                 <p>Chaos isn't a <span>${answers[0]}</span>. Chaos is a <span>${answers[1]}</span>. 
                                 Many who try to <span>${answers[2]}</span> it fail, never to try again. The 
                                 <span>${answers[3]}</span> breaks them. And some given a chance to 
                                 <span>${answers[4]}</span>, they refuse. They cling to the <span>${answers[5]}</span>, 
                                 or the <span>${answers[6]}</span>, or <span>${answers[7]}</span>, the 
                                 illusions. Only the <span>${answers[8]}</span> is real. The 
                                 <span>${answers[9]}</span> is all there is.</p>`);
            break;
        case 3:
            presentationText.append(`<p class="resultTitle">¡El Cumpleaños de...! (Español)</p>
                                 <p>Hoy es el cumpleaños de <span>${answers[0]}</span>. ¡Cumple 
                                 <span>${answers[1]}</span> años! Ella quiere tener una fiesta muy 
                                 <span>${answers[2]}</span> y <span>${answers[3]}</span>. La fiesta empieza a 
                                 las  <span>${answers[4]}</span> en <span>${answers[5]}</span>. Vienen 
                                 <span>${answers[6]}</span> invitados. En la fiesta, primero todos 
                                 <span>${answers[7]}</span> muy <span>${answers[8]}</span>. Después, comen 
                                 <span>${answers[9]}</span> y beben <span>${answers[10]}</span>. Finalmente, 
                                 <span>${answers[0]}</span> puede abrir sus regalos. Su mejor amigo le regala 
                                 un <span>${answers[11]}</span> <span>${answers[12]}</span>. Su vecino le regala 
                                 <span>${answers[13]}</span> <span>${answers[14]}</span> <span>${answers[15]}</span>. 
                                 El mejor regalo de todos es un <span>${answers[16]}</span> <span>${answers[17]}</span>. 
                                 ¡Feliz cumpleaños, <span>${answers[0]}</span>!</p>`);
            break;
        case 4:
            presentationText.append(`<p class="resultTitle">Avatar: The Last Airbender MadLibs!</p>
                                 <p><span>${answers[0]}</span>. <span>${answers[1]}</span>. <span>${answers[2]}</span>. 
                                 <span>${answers[3]}</span>. Long ago, the four nations <span>${answers[4]}</span> together 
                                 in harmony. Then, everything changed when the Fire Nation <span>${answers[5]}</span>. Only 
                                 the Avatar, master of all four elements, could <span>${answers[6]}</span> them, but when the 
                                 world needed him most, he <span>${answers[7]}</span>. <span>${answers[8]}</span> years passed 
                                 and my <span>${answers[9]}</span> and I <span>${answers[10]}</span> the new Avatar, an airbender 
                                 named <span>${answers[11]}</span>. And although thier <span>${answers[12]}</span> skills are 
                                 <span>${answers[13]}</span>, they have a lot to learn before they're ready to 
                                 <span>${answers[14]}</span> anyone. But I believe <span>${answers[11]}</span> can save the world.</p>`);
            break;
        case 5:
            presentationText.append(`<p class="resultTitle">Glee MadLibs!</p>
                                     <p>So here's what you missed on Glee! Will made the Glee club decide wether 
                                     they were <span>${answers[0]}</span>s or <span>${answers[1]}</span>s, as if 
                                     those where the only two options, which <span>${answers[2]}</span> thought was 
                                     <span>${answers[3]}</span>, but Sue thought was stupid. So now she's got it out 
                                     for them, but this time she's principal and <span>${answers[4]}</span> is her 
                                     secretary. <span>${answers[5]}</span> wanted to go all the way with 
                                     <span>${answers[6]}</span> but <span>${answers[6]}</span> only let them touch 
                                     their <span>${answers[7]}</span>, so <span>${answers[5]}</span> cheated on them 
                                     with <span>${answers[8]}</span>, 'cuz that's the kind of person they are and 
                                     <span>${answers[6]}</span> doesn't know.<br><span>${answers[9]}</span> got the lead 
                                     in <span>${answers[10]}</span> on Broadway, but the director's kind of 
                                     <span>${answers[11]}</span> and has <span>${answers[12]}</span> eyes and wasn't even 
                                     that sure they were right for the part to begin with.<br>And that's what you missed 
                                     on Glee!</p>`);
            break;
        default:
            break;
        case 6:
            presentationText.append(`<p class="resultTitle">Lilo y Stitch (Español)</p>
                                    <p>-¿Lilo por que estas tan mojada?
                                    <br>
                                    -Es día de sandiwch, cada <span>${answers[0]}</span> le doy a 
                                    <span>${answers[1]}</span> el <span>${answers[2]}</span> un sandwich de 
                                    <span>${answers[3]}</span>-
                                    <br>
                                    -<span>${answers[1]}</span> es un <span>${answers[2]}</span>?-
                                    <br>
                                    -Y hoy no hay <span>${answers[3]}</span>, y entonces mi <span>${answers[4]}</span> 
                                    me dijo que le diera un sandwich de <span>${answers[5]}</span>, no le puedo 
                                    dar a <span>${answers[1]}</span> <span>${answers[5]}</span>.. Tu sabes lo 
                                    que es <span>${answers[5]}</span>?-
                                    <br>
                                    -<span>${answers[2]}</span>?-
                                    <br>
                                    -¡ES <span>${answers[2]}</span> SI <span>${answers[1]}</span> COME 
                                    <span>${answers[5]}</span> SERÍA UNA ABOMINACIÓN!. Llegue tarde por ir a 
                                    la tienda, por <span>${answers[3]}</span>, porque solo había ese, ese 
                                    <span>${answers[6]}</span> <span>${answers[5]}</span>!-
                                    <br>
                                    -Lilo, Lilo, por que es tan importante?-
                                    <br>
                                    -<span>${answers[1]}</span> controla el clima-</p>`);
            break;
    }
    presentationText.append(`<a href="#categories"><button id="resetAll" onclick="reset()">Play another MadLib</button></a>`);
    $("#presentation").fadeIn(1000);
}
// Cuando se hace click al boton "Play another MadLib", el juego se resetea y regresa al catalogo
function reset() {
    $("#inputWords").text("").css("display", "none");
    $("#presentation").text("").css("display", "none");
}
