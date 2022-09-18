const mainContainer = document.getElementById('main-container')
const startSlide = document.getElementById('startSlide')
const imagesOnPage = []
let choosenImages = []
let index = 0;

let slideIndex = 1;
function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n){
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";

}


var modal = document.getElementById("myModal");

var btn = document.getElementById("startSlide");

var closeButton = document.getElementById("close");



btn.onclick = function(){
    modal.style.display = "block";
}

closeButton.onclick = function(){
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none"
    }
}


    for(let i = 0; i < mainContainer.childElementCount; i++){
        imagesOnPage.push(mainContainer.children[i])
    }


    

startSlide.addEventListener('click', e => {
    choosenImages = []
    for(let j = 0; j < imagesOnPage.length; j++){
        if (imagesOnPage[j].children[0].children[0].hasAttribute("checked")) {
            choosenImages.push(imagesOnPage[j].children[1].children[0].getAttribute("src"))
        }
    }
    console.log(choosenImages)
    
})

for(let j = 0; j < imagesOnPage.length; j++){
    imagesOnPage[j].children[0].children[0].addEventListener('click', e => {
        if(imagesOnPage[j].children[0].children[0].hasAttribute("checked")){
            imagesOnPage[j].children[0].children[0].removeAttribute("checked")
            imagesOnPage[j].children[0].children[0].setAttribute("unchecked", '')
        }else{
            imagesOnPage[j].children[0].children[0].setAttribute("unchecked", '')
            imagesOnPage[j].children[0].children[0].setAttribute("checked", '')
        }
    })
}

