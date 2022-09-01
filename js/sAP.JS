function myFunction(imgs) {
    var expandImg = document.getElementById("expandedImg");
    var imgText = document.getElementById("imgtext");
    var imgDesc = document.getElementById("imgdesc");
    expandImg.src = imgs.src;
    imgText.innerHTML = imgs.alt;
    imgDesc.innerHTML = imgs.dataset.description;
    expandImg.parentElement.style.display = "block";
  }