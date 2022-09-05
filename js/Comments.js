var popup = document.getElementById("popUp");

// need to itterate over all buttons
var btn = document.getElementById("Edit1");

// Get the <span> element that closes the modal
//var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the popup
btn.onclick = function() {
  popup.style.display = "block";
}
/*
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}*/

// When the user clicks anywhere outside of the popup-content, close it
window.onclick = function(event) {
  if (event.target == popup) {
    popup.style.display = "none";
  }
} 