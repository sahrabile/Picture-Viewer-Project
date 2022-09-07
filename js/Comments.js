var popup = document.getElementById("popUp");

// need to itterate over all buttons
var btn = document.getElementById("Edit1");

// When the user clicks on the button, open the popup
btn.onclick = function() {
  popup.style.display = "block";
}

// When the user clicks anywhere outside of the popup-content, close it
window.onclick = function(event) {
  if (event.target == popup) {
    popup.style.display = "none";
  }
} 

function getValue(componentID){
  return document.getElementById(`${componentID}`).value;
}

//need a good way to put in all the different names of components when they autogenerate
function setCommentAndTitle(titleID, commentID, newTitleID, newCommentID){
  let titleContainer = document.getElementById(`${titleID}`);
  let commentContainer = document.getElementById(`${commentID}`);
  let newTitle = getValue(newTitleID);
  let newComment = getValue(newCommentID);


  titleContainer.innerHTML = newTitle;
  commentContainer.innerHTML = newComment;
  document.getElementById(`${newTitleID}`).value ="";
  document.getElementById(`${newCommentID}`).value ="";
  popup.style.display = "none";


}