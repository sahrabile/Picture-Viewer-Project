/*function myFunction(imgs) {
    var modal = document.getElementById('displayContainer')
    var expandImg = document.getElementById("expandedImg");
    var imgText = document.getElementById("imgtext");
    var imgDesc = document.getElementById("imgdesc");
    expandImg.src = imgs.src;
    imgText.innerHTML = imgs.alt;
    imgDesc.innerHTML = imgs.dataset.description;
    expandImg.parentElement.style.display = "block";
    modal.style.display = 'block'
  }*/

  /*function Function(){
  const modal = document.querySelector('.container');
  const previews = document.querySelectorAll('.gallery img')
  const original = document.querySelector('.full-img')

  /*var expandImg = document.getElementById("expandedImg");*/
  
  /*expandImg.src = imgs.src;*/
  /*var imgText = document.getElementById("imgtext");
  var imgDesc = document.getElementById("imgdesc");*/
  /*imgText.innerHTML = imgs.alt;
  imgDesc.innerHTML = imgs.dataset.description;
  previews.forEach((preview) =>{
    preview.addEventListener("click", ()=> {
      modal.classList.toggle("open");
    });

  });

  modal.addEventListener('click', (e)=>{
    if (e.target.classList.contains("modal")) {
      modal.classList.toggle("open");
      original.classList.toggle("open");
    }
  })

  }*/
  

  

function Function(){
  var image = document.getElementsByClassName("blur")
  // need to itterate over all buttons
  var modal = document.getElementById("myModal");


  // When the user clicks on the button, open the popup
  image.onclick = function() {
    modal.style.display = "block";
  }
}
  

/*function Function(imgs){
  var modal = document.getElementById("myModal");
  var preview = document.getElementById("expandedImg");
  var imgText = document.getElementById("imgtext");
  var imgDesc = document.getElementById("imgdesc");

  preview.src = imgs.src;
  imgText.innerHTML = imgs.alt;
  imgDesc.innerHTML = imgs.dataset.description;

 preview.onclick = function(){
    modal.style.display = "block";
  }
}*/

/*function Function(imgs){
    var modal = document.getElementById("myModal")
    var images = document.getElementsByClassName("full-img")
    var modalImg = document.getElementById("expandedImg")
    var imgDesc = document.getElementById("imgdesc");


    // Go through all of the images with our custom class
    for (var i = 0; i < images.length; i++) {
      var img = images[i];
      // and attach our click listener for this image.
      img.onclick = function(evt) {
        modalImg.src = imgs.src;
        imgDesc.innerHTML = imgs.dataset.description;
        modal.style.display = "block";
      }
    }
    var span = document.getElementsByClassName("closebtn")[0];
    span.onclick = function(){
    modal.style.display = "none";
  }
}
*/


/*function Function(imgs){
  var modal = document.getElementById('myModal');

    var img = document.getElementsByClassName("full-img")
    var modalImg = document.getElementById("expandedImg")
    var captionText = document.getElementById("imgdesc");
  
  var showModal = function(){
      modal.style.display = "block";
      modalImg.src = imgs.src;
      captionText.innerHTML = imgs.dataset.description;
  }
  
  for (var i = 0; i < img.length; i++) {
      img[i].addEventListener('click', showModal);
  }
  
  var span = document.getElementsByClassName("closebtn")[0];
  
  span.onclick = function() { 
      modal.style.display = "none";
  }
}*/