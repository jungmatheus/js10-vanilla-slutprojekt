//FUNKTION SOM DÖLJER ALLA SECTIONS GENOM ATT LÄGGA TILL "HIDDEN" TILL ALLA SEKTIONER
function hideAllSections() {
    let link = document.querySelectorAll("section")
    for (let i = 0; i < link.length; i++) {
        link[i].classList.add("hidden")
        // console.log(link[i]);
    }
}


// console.log(response)


let btn = document.querySelectorAll(".btn-wrapper button")//TAR KNAPPARNA HOME, SEARCH OCH INFO
let currentClass;
for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener("click", function () { // GER KNAPPARNA EN EVENT LISTENER
        currentClass = "." + btn[i].innerHTML.toLowerCase()//HÄMTAR INNERTEXT OCH OMVANDLAR DET TILL LOWER CASE SAMT SPARAR DET I "CURRENTCLASS" VARIABELN

        hideAllSections() // KALLAR PÅ FUNKTIONEN SOM LÄGGER TILL HIDDEN PÅ ALLA SEKTIONS
        document.querySelector(currentClass).classList.remove("hidden")//TAR BORT HIDDEN FRÅN JUST DEN SEKTION MAN VÄLJER GENOM ATT KLICKA PÅ KNAPPEN
    })
}

let dataRandomBeer = []
// console.log(dataRandomBeer.name)

async function randomBeer() {
    dataRandomBeer = []
    const request = await fetch(`https://api.punkapi.com/v2/beers/random`)
    const response = await request.json()
    dataRandomBeer.push(
        {"name" : response[0].name},
        {"abv" : response[0].abv},
        {"description" : response[0].description},
        {"volume_value" : response[0].volume.value},
        {"food_pairing" : response[0].food_pairing},
        {"brewers_tips" : response[0].brewers_tips},
        {"ingredients" : response[0].ingredients}
        )
    if (response[0].image_url != null) {
        dataRandomBeer.push({"picture" : response[0].image_url} ) 
    }
    if (response[0].image_url === null){
        dataRandomBeer.push({"picture" : "images/baby-yoda.jpeg"} )
    }
        
    return response
}
//randomBeer()



function fillTheInfo(source) {
    if (source[0].image_url != null) {
        document.querySelector(".beer-card-img").src = source[0].image_url
        document.querySelector(".info-beer-card-img").src = source[0].image_url
        document.querySelector(".info-beer-card-img").style = "max-height: 400px"
    }
    if (source[0].image_url === null) {
        console.log("we got a null!");

        //Landing page beer card
        document.querySelector(".beer-card-img").src = "images/baby-yoda.jpeg"
        document.querySelector(".beer-card-img").style = "max-width: 300px"
        //Info page beer card
        document.querySelector(".info-beer-card-img").src = "images/baby-yoda.jpeg"
        document.querySelector(".info-beer-card-img").style = "max-height: 400px; max-width: 300px"
    }

    var a = document.getElementsByClassName("info-beer-information")[0]
    a.innerHTML = "<ul>"
    //all information om ölen som visas under INFO page
    a.innerHTML += "<li>" + "<strong> Name: </strong>" + source[0].name + "</li>"
    a.innerHTML += "<li>" + "<strong> Alcohol by volume: </strong>" + source[0].abv + "</li>"
    a.innerHTML += "<li>" + "<strong> Description: </strong>" + source[0].description + "</li>"
    a.innerHTML += "<li>" + "<strong> Volume: </strong>" + source[0].volume.value + " " + source[0].volume.unit + "</li>"
    a.innerHTML += "<li>" + "<strong> Food pairing : </strong>" + source[0].food_pairing + "</li>"
    a.innerHTML += "<li>" + "<strong> Brewer tips : </strong>" + source[0].brewers_tips + "</li>"
    a.innerHTML += "<li>" + "" + "</li>"
    // a.innerHTML += "<li>" + "<strong> Ingredients: </strong>" + source[0].ingredients + "</li>"
    
    
}

async function printRandomBeer(){
    let testRandomBeerPrint = await randomBeer()
    fillTheInfo(testRandomBeerPrint)
    
    document.querySelector(".home-beer-card-name p").innerHTML = testRandomBeerPrint[0].name
    return testRandomBeerPrint
}
printRandomBeer()

document.querySelector(".home-random-beer-button").addEventListener("click", printRandomBeer)


async function print(desiredFetch) {
    let randomBeerFetch = await desiredFetch

    // fillTheInfo(randomBeerFetch)

    if (randomBeerFetch[0].image_url != null) {
        // document.querySelector(".beer-card-img").src = randomBeerFetch[0].image_url
        document.querySelector(".info-beer-card-img").src = randomBeerFetch[0].image_url
        document.querySelector(".info-beer-card-img").style = "max-height: 400px"
    }
    if (randomBeerFetch[0].image_url === null) {
        console.log("we got a null!");

        //Landing page beer card
        // document.querySelector(".beer-card-img").src = "images/baby-yoda.jpeg"
        // document.querySelector(".beer-card-img").style = "max-width: 300px"
        //Info page beer card
        document.querySelector(".info-beer-card-img").src = "images/baby-yoda.jpeg"
        document.querySelector(".info-beer-card-img").style = "max-height: 400px; max-width: 300px"
    }

    var a = document.getElementsByClassName("info-beer-information")[0]
    a.innerHTML = "<ul>"
    //all information om ölen som visas under INFO page
    a.innerHTML += "<li>" + "<strong> Name: </strong>" + randomBeerFetch[0].name + "</li>"
    a.innerHTML += "<li>" + "<strong> Alcohol by volume: </strong>" + randomBeerFetch[0].abv + "</li>"
    a.innerHTML += "<li>" + "<strong> Description: </strong>" + randomBeerFetch[0].description + "</li>"
    a.innerHTML += "<li>" + "<strong> Volume: </strong>" + randomBeerFetch[0].volume.value + " " + randomBeerFetch[0].volume.unit + "</li>"
    a.innerHTML += "<li>" + "<strong> Food pairing : </strong>" + randomBeerFetch[0].food_pairing + "</li>"
    a.innerHTML += "<li>" + "<strong> Brewer tips : </strong>" + randomBeerFetch[0].brewers_tips + "</li>"
    a.innerHTML += "<li>" + "" + "</li>"
    // a.innerHTML += "<li>" + "<strong> Ingredients: </strong>" + randomBeerFetch[0].ingredients + "</li>"

    let theHops = ""
    let theMalt = ""
    let coma = ", "
    for (let i = 0; i < randomBeerFetch[0].ingredients.hops.length; i++) {
        theHops += randomBeerFetch[0].ingredients.hops[i].name + coma
        // console.log(theHops)
    }
    for (let i = 0; i < randomBeerFetch[0].ingredients.malt.length; i++) {
        theMalt += randomBeerFetch[0].ingredients.malt[i].name + coma
        // console.log(theMalt)
    }
    a.innerHTML += "<li>" + "<strong> Ingredients: <br> </strong>" + "<u><i>Hops</i></u>: " + theHops.slice(0, -2) + '.' + "<br>" + "<u><i>Malt</i></u>: " + theMalt.slice(0, -2) + '.' + "</li>"
    a.innerHTML += "<li>" + "<strong> Yeast : </strong>" + randomBeerFetch[0].ingredients.yeast + "</li>"

}
//print(randomBeer());


function seeMore() {
    let theHops = ""
    let theMalt = ""
    let coma = ", "

    hideAllSections()
    document.querySelector(".info-beer-card-img").src = dataRandomBeer[7].picture
    var a = document.getElementsByClassName("info-beer-information")[0]
    a.innerHTML = "<ul>"
    //all information om ölen som visas under INFO page
    a.innerHTML += "<li>" + "<strong> Name: </strong>" + dataRandomBeer[0].name + "</li>"
    a.innerHTML += "<li>" + "<strong> Alcohol by volume: </strong>" + dataRandomBeer[1].abv + "</li>"
    a.innerHTML += "<li>" + "<strong> Description: </strong>" + dataRandomBeer[2].description + "</li>"
    a.innerHTML += "<li>" + "<strong> Volume: </strong>" + dataRandomBeer[3].volume_value + " liters" + "</li>"
    a.innerHTML += "<li>" + "<strong> Food pairing : </strong>" + dataRandomBeer[4].food_pairing + "</li>"
    a.innerHTML += "<li>" + "<strong> Brewer tips : </strong>" + dataRandomBeer[5].brewers_tips + "</li>"
    
    for (let i = 0; i < dataRandomBeer[6].ingredients.hops.length; i++) {
        theHops += dataRandomBeer[6].ingredients.hops[i].name + coma
        // console.log(theHops)
    }
    for (let i = 0; i < dataRandomBeer[6].ingredients.malt.length; i++) {
        theMalt += dataRandomBeer[6].ingredients.malt[i].name + coma
        // console.log(theMalt)
    }
    a.innerHTML += "<li>" + "<strong> Ingredients: <br> </strong>" + "<u><i>Hops</i></u>: " + theHops.slice(0, -2) + '.' + "<br>" + "<u><i>Malt</i></u>: " + theMalt.slice(0, -2) + '.' + "</li>"
    a.innerHTML += "<li>" + "<strong> Yeast : </strong>" + dataRandomBeer[6].ingredients.yeast + "</li>"
    

    // console.log(dataRandomBeer)
   
    //skriva ut de sparade informationen om random beer card på info page
    document.querySelector(".info").classList.remove("hidden")
}
document.querySelector(".see-more").addEventListener("click", seeMore)







/* ----------------------------------------------- SEARCH PAGE ----------------------------------------- */


//global variables
var searchButton = document.querySelector(".fa-search");
var searchInput = document.querySelector("form input");
var list;


let fetchBySearch = async function (userInput) {
    let root = "https://api.punkapi.com/v2/beers?beer_name=";

    let request = await fetch(root + userInput);
    let result = await request.json();

    return result;

}



let createList = async function (userInput) {

    let fetchResult = await fetchBySearch(userInput);

    let searchMain = document.querySelector(".search-main");
    let ul = document.createElement("ul");
    searchMain.appendChild(ul);
    ul.classList.add("ul-form");

    ///creates 3 li elements
    for (let i = 0; i < fetchResult.length; i++) {
        let li = document.createElement("li");
        ul.appendChild(li);
        list = document.querySelectorAll(".ul-form li");
        list[i].classList.add("li-form");

        list[i].innerHTML = fetchResult[i].name;
        
    }
      
    //makes the list clickable
    for (let i = 0; i < list.length; i++) {
        list[i].addEventListener("click", function () {
            print(fetchBySearch(list[i].innerHTML));
            seeMore();
        })
    }
}

let hideList = function() {
    if(searchInput.value.length == 0) {
        
        for(let i = 0; i < list.length; i++) {
            list[i].remove();
        }
    }
    // else{
    //     for(let i = 0; i < list.length; i++) {
    //         list[i].style.display = "";
    //     }
    // }
}

searchInput.addEventListener("keyup", function () {
    createList(searchInput.value);
    hideList();
})
      
        
/* --------------------------------- advanced search ---------------------------- */


let advancedSearch = async function(desiredFilter) {
  let root =  "https://api.punkapi.com/v2/beers?";

  let request = await fetch(root + desiredFilter);
  let result = await request.json();




  
 return result;

}





let malt = document.querySelector(".malt");
let searchB


malt.addEventListener("click", function() {
   console.log(advancedSearch("malt=Caramalt|Amber"))
})




