//add eventlistener to albums
const albumArray = document.querySelectorAll(".albumContainer");
const nameArray = ["Galaxies","Nebulas","Hubble telescope", "Planets", "Newborn stars"];
for(let i = 0; i<nameArray.length;i++){
    albumArray[i].addEventListener('click', (event) =>  {
        event.preventDefault();
        clearPictures();
        const row = document.createElement("div");
        row.className = "row";
        document.body.appendChild(row);
        loadPictures(`${nameArray[i]}`);
        let button = document.getElementById("backButton");
        button.style.display = "block";
        button.addEventListener("click", (event)=>{
            for(let album of albumArray){
                album.style.display = "grid";
                clearPictures();
                button.style.display = "none";
            }
        })
        for(let album of albumArray){
            album.style.display = "none";
        }
    })
}

function eraseRating(div){
    //find a way to hit all the children in div, itterate over them and erase them
    let querySelector = '#'+ div;
    let allChildren = document.querySelector(querySelector).childNodes;
    for(let i=0; i<allChildren.length;i++){
        if(allChildren[i].tagName === 'INPUT'){
            allChildren[i].checked = false;
        }
    }
    //get the json-file here and erase the rating from the right json
}

// When the user clicks anywhere outside of the popup-content, close it
window.onclick = function(event) {
    var popup = document.getElementById("popUp");
  if (event.target == popup) {
    popup.style.display = "none";
  }
} 

function getValue(componentID){
  return document.getElementById(`${componentID}`).value;
}

//need a good way to put in all the different names of components when they autogenerate
function setCommentAndTitle(){
    //get the hidden value
    var popup = document.getElementById("popUp");
    let helpingString = document.getElementById("hiddenValue").innerHTML;
    let array = helpingString.split(",");
  
    let titleContainer = document.getElementById(`${array[0]}`);
    let commentContainer = document.getElementById(`${array[1]}`);
    
    let newTitle = getValue("titleInput");
    let newComment = getValue(`Comment`);


    titleContainer.innerHTML = newTitle;
    commentContainer.innerHTML = newComment;
    document.getElementById("titleInput").value ="";
    document.getElementById(`Comment`).value ="";
    popup.style.display = "none";


}

async function loadPictures(albumTitle){
    let rowContainer = document.querySelector(".row");
    let starGroups = 1;
    let starId= 0;
    
    await fetch('\\app-data\\library\\picture-library.json')
    .then((response) => response.json())
    .then((json) => {
        
        //get out each and every album
        for( let i = 0; i< json.albums.length; i++){
            let pictures = json.albums[i].pictures;

            //check the album title
            if(json.albums[i].title === `${albumTitle}` || `${albumTitle}` === "all" ){
                //get out each and every picture in lowRes
                for(let j = 0; j<pictures.length; j++){
                    
                    var imageContainer = document.createElement('div');
                    imageContainer.className = "imageContainer";

                    let gallery = document.createElement("div");
                    gallery.className = "gallery";

                    let img = document.createElement("img");
                    img.setAttribute("class", "blur");
                    img.src = "../"+json.albums[i].path + "/"+pictures[j].imgLoRes;
                    img.setAttribute("width", 600);
                    img.setAttribute("height", 400);
                    img.setAttribute("onclick", "myFunction(this);")
                    img.setAttribute("data-description", pictures[j].comment)

                    let descFade = document.createElement("div");
                    descFade.className = "descrip fade";
                    descFade.setAttribute("id", `desc${starGroups}`);
                    descFade.innerHTML = pictures[j].comment;

                    let titleFade = document.createElement("div");
                    titleFade.className = "title fade";
                    titleFade.setAttribute("id",`name${starGroups}`);
                    titleFade.innerHTML = pictures[j].title;

                    //create edit Button
                    let editButton = document.createElement("button");
                    editButton.className = "editButton";
                    editButton.setAttribute("id", `Edit${starGroups}`);
                    //store the value for edit in hidden p and show comments
                    editButton.addEventListener('click', (event) => {
                        event.preventDefault();
                        var popup = document.getElementById("popUp");
                        var popupHidden = document.getElementById("hiddenValue");
                        popup.style.display = "block";
                        popupHidden.innerHTML = `${titleFade.id},${descFade.id}`;
                      });
                    let inner = document.createElement("i");
                    inner.className = "fa-regular fa-pen-to-square";
                    editButton.appendChild(inner);

                    //create the rating container
                    let ratingContainer = document.createElement('div');
                    ratingContainer.className = 'rating';
                    ratingContainer.id = 'rating'+ starGroups;

                    //build the erase button and add it to the container
                    let button = document.createElement('button');
                    button.onclick = function(event){
                        eraseRating(ratingContainer.id)};
                    button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M480 416C497.7 416 512 430.3 512 448C512 465.7 497.7 480 480 480H150.6C133.7 480 117.4 473.3 105.4 461.3L25.37 381.3C.3786 356.3 .3786 315.7 25.37 290.7L258.7 57.37C283.7 32.38 324.3 32.38 349.3 57.37L486.6 194.7C511.6 219.7 511.6 260.3 486.6 285.3L355.9 416H480zM265.4 416L332.7 348.7L195.3 211.3L70.63 336L150.6 416L265.4 416z"/></svg>'
                    ratingContainer.appendChild(button);

                    //create five stars with labels and add them to the container
                    for(let k = 0; k<5; k++){
                        let star = document.createElement('input');
                        star.type = 'radio';
                        star.name = starGroups;
                        star.id = starId;
                        let label = document.createElement('label');
                        label.setAttribute("for", starId);
                        starId++;
                        
                        ratingContainer.appendChild(star);
                        ratingContainer.appendChild(label);
                    }
                    starGroups++;
                    
                    gallery.appendChild(img);
                    gallery.appendChild(descFade);
                    gallery.appendChild(titleFade);
                    imageContainer.appendChild(gallery);
                    imageContainer.appendChild(ratingContainer);
                    imageContainer.appendChild(editButton);
                    rowContainer.appendChild(imageContainer);
                }
            }
                
                
        }
        
    });
}

function clearPictures(){
    const row = document.querySelector(".row");
    if(row !== null){
        row.remove();
    }
    
}

