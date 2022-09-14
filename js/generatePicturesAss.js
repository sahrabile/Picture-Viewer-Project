class Album{
    constructor(id, title, comment,path,headerImage,pictures){
      this.id = id;
      this.title = title;
      this.comment = comment;
      this.path = path;
      this.headerImage = headerImage;
      this.pictures = pictures;
    }
  
    updatePictures(pictureObject){
      for(let picture of this.pictures){
        if(pictureObject.id === picture.id){
          picture.title = pictureObject.title;
          picture.comment = pictureObject.comment;
          picture.rating = pictureObject.rating;
        }
      }
    }
  }
  
  class Picture{
    constructor(id, title, comment, imgLoRes, imgHiRes, rating){
      this.id = id;
      this.title = title;
      this.comment = comment;
      this.imgLoRes = imgLoRes;
      this.imgHiRes = imgHiRes;
      this.rating = rating;
    }
  
    changeTitle(newTitle){
      this.title = newTitle;
    }
  
    changeComment(newComment){
      this.comment = newComment;
    }
  }
  
//add eventlistener to albums
const albumArray = document.querySelectorAll(".albumContainer");
const nameArray = ["Galaxies","Nebulas","Hubble telescope", "Planets", "Newborn stars"];
for(let i = 0; i<nameArray.length;i++){
    albumArray[i].addEventListener('click', (event) =>  {
        event.preventDefault();
        //erase all pictures
        clearPictures();

        //add a new row element in body
        const row = document.createElement("div");
        row.className = "row";
        document.body.appendChild(row);

        //load the right pictures for clicked album
        loadPictures(`${nameArray[i]}`);

        //create a back button to go back to album view
        let button = document.getElementById("backButton");
        button.style.display = "block";

        //add an event listener to button
        button.addEventListener("click", (event)=>{
            for(let album of albumArray){
                album.style.display = "grid";
                clearPictures();
                button.style.display = "none";
            }
        });
        
        //set album view to none
        for(let album of albumArray){
            album.style.display = "none";
        }
    })
}

async function saveRatingChanges(pictureID,rating){
  let albumArray = [];
    await fetch('\\app-data\\library\\picture-library2.json')
      .then((response) => response.json())
      .then((json) => {
          for(let i = 0; i< json.albums.length; i++){
            let album = new Album(json.albums[i].id,json.albums[i].title,json.albums[i].comment,json.albums[i].path,json.albums[i].headerImage,json.albums[i].pictures);
            for(let j = 0; j<album.pictures.length; j++){
                let picture = new Picture(album.pictures[j].id, album.pictures[j].title, album.pictures[j].comment, album.pictures[j].imgLoRes, album.pictures[j].imgHiRes, album.pictures[j].rating);
                if(picture.id === pictureID){
                    picture.rating = rating;
                    album.updatePictures(picture);
                }
            }
            albumArray.push(album);
          } 
      });
      
      const url = 'http://localhost:3000/saveJson';
          try {
            const response = await fetch(url, {
                mode: 'cors',
                method: 'post',
                headers: {'content-type' : 'application/json'},
                body: JSON.stringify(albumArray)
            });
            const result = response.text();
        
            if (!response.ok) {
              console.log("fail in fetch savingRatings");
            }
          }
          catch {
            console.log("Fetch error");
          }
}

async function saveChanges(pictureID, newTitle, newComment){
    let albumArray = [];
    await fetch('\\app-data\\library\\picture-library2.json')
      .then((response) => response.json())
      .then((json) => {
          for(let i = 0; i< json.albums.length; i++){
            let album = new Album(json.albums[i].id,json.albums[i].title,json.albums[i].comment,json.albums[i].path,json.albums[i].headerImage,json.albums[i].pictures);
            for(let j = 0; j<album.pictures.length; j++){
                let picture = new Picture(album.pictures[j].id, album.pictures[j].title, album.pictures[j].comment, album.pictures[j].imgLoRes, album.pictures[j].imgHiRes, album.pictures[j].rating);
                if(picture.id === pictureID){
                    picture.title = newTitle;
                    picture.comment = newComment;
                    album.updatePictures(picture);
                }
            }
            albumArray.push(album);
          } 
      });
      
      const url = 'http://localhost:3000/saveJson';
          try {
            const response = await fetch(url, {
                mode: 'cors',
                method: 'post',
                headers: {'content-type' : 'application/json'},
                body: JSON.stringify(albumArray)
            });
            const result = response.text();
        
            if (response.ok) {
              alert("updated json");
            }
            else {
              alert("Transmission error");
            }
          }
          catch {
            alert("Fetch error");
          }
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
    //get the json-file here and erase the rating from the right json!!
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
    const pictureId = array[2];

    let newTitle = getValue("titleInput");
    let newComment = getValue(`Comment`);


    titleContainer.innerHTML = newTitle;
    commentContainer.innerHTML = newComment;
    document.getElementById("titleInput").value ="";
    document.getElementById(`Comment`).value ="";
    popup.style.display = "none";

    //add picture id, title, comment and current rating
    saveChanges(pictureId,newTitle,newComment);


}

async function loadPictures(albumTitle){
    let rowContainer = document.querySelector(".row");
    let starGroups = 1;
    let starId= 0;
    
    await fetch('\\app-data\\library\\picture-library2.json')
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
                    img.setAttribute("onclick", "Function(this);")
                    img.setAttribute("data-description", pictures[j].comment)
                    img.onclick = function(){
                        var modal = document.getElementById("myModal");
                        modal.style.display = "block";
                      };
                    img.setAttribute("id", pictures[j].id);


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
                        popupHidden.innerHTML = `${titleFade.id},${descFade.id},${pictures[j].id}`;
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
                        eraseRating(ratingContainer.id)
                        saveRatingChanges(pictures[j].id, -1);
                      };
                    button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M480 416C497.7 416 512 430.3 512 448C512 465.7 497.7 480 480 480H150.6C133.7 480 117.4 473.3 105.4 461.3L25.37 381.3C.3786 356.3 .3786 315.7 25.37 290.7L258.7 57.37C283.7 32.38 324.3 32.38 349.3 57.37L486.6 194.7C511.6 219.7 511.6 260.3 486.6 285.3L355.9 416H480zM265.4 416L332.7 348.7L195.3 211.3L70.63 336L150.6 416L265.4 416z"/></svg>'
                    ratingContainer.appendChild(button);

                    //create five stars with labels and add them to the container
                    for(let k = 0; k<5; k++){
                        let star = document.createElement('input');
                        //show the rating on load
                        if(k === pictures[j].rating){
                          star.checked = true;
                        }
                        star.type = 'radio';
                        star.name = starGroups;
                        star.id = starId;
                        star.addEventListener("click",(event) => {
                          //updateStarRating in json
                          const starGroupName = titleFade.id.charAt(titleFade.id.length-1);
                          let rating = getStarRating(starGroupName);
                          saveRatingChanges(pictures[j].id,rating);
                        });
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

function getStarRating(inputGroupName){
  const starArray = document.querySelectorAll(`[name="${inputGroupName}"]`);
  let rating;
  for(let i = 0; i<starArray.length; i++){
    if(starArray[i].checked){
      rating = i; //will be a number between 0-4  where 0 is the last star in the row
      return rating;
    }
    else{
      rating = -1;
    }
  }
 
}

