
function showSection() {
    let link = document.querySelectorAll("section")
    for (let i = 0; i < link.length; i++) {
        link[i].classList.add("hidden")
    }
    
}
    

let btn = document.querySelectorAll("button")
let currentClass;
for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener("click", function(){
        currentClass = "." + btn[i].innerHTML.toLowerCase()
        console.log(currentClass);
        
        showSection()
        document.querySelector(currentClass).classList.remove("hidden")
    })
}