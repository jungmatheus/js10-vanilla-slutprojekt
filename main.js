//FUNKTION SOM DÖLJER ALLA SECTIONS GENOM ATT LÄGGA TILL "HIDDEN" TILL ALLA SEKTIONER
function showSection() {
    let link = document.querySelectorAll("section")
    for (let i = 0; i < link.length; i++) {
        link[i].classList.add("hidden")
    }
}
    
    

let btn = document.querySelectorAll(".btn-wrapper button")//TAR KNAPPARNA HOME, SEARCH OCH INFO
let currentClass;
for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener("click", function(){ // GER KNAPPARNA EN EVENT LISTENER
        currentClass = "." + btn[i].innerHTML.toLowerCase()//HÄMTAR INNERTEXT OCH OMVANDLAR DET TILL LOWER CASE SAMT SPARAR DET I "CURRENTCLASS" VARIABELN
    
        showSection() // KALLAR PÅ FUNKTIONEN SOM LÄGGER TILL HIDDEN PÅ ALLA SEKTIONS
        document.querySelector(currentClass).classList.remove("hidden")//TAR BORT HIDDEN FRÅN JUST DEN SEKTION MAN VÄLJER GENOM ATT KLICKA PÅ KNAPPEN
    })
}
 
async function randomBeer() {
    const request = await fetch (`https://api.punkapi.com/v2/beers/random`)
    const response = await request.json()
    return response
}

async function print(){
    let randomBeerFetch = await randomBeer()
    // console.log(randomBeerFetch[0])
    document.querySelector(".beer-card-img").src = randomBeerFetch[0].image_url
    document.querySelector(".home-beer-card-name p").innerHTML = randomBeerFetch[0].name
}
print()

document.querySelector(".home-random-beer-button").addEventListener("click", print)