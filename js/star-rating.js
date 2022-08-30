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

//we can change the fetch to help each and every album get the right pictures and generate the rating containers
//maybe with help of album name/ id/ index as a property in function -> change the first for loop
async function generateRatingContainer(){
    await fetch('\\app-data\\library\\picture-library.json')
    .then((response) => response.json())
    .then((json) => {
        //have a counter to help name the radio button groups and labels
        let starGroups = 1;
        let starId= 0;

        //get out each and every album
        for( let i = 0; i< json.albums.length; i++){
            let pictures = json.albums[i].pictures;

                //get out each and every picture
                for(let j = 0; j<pictures.length; j++){
                    //add a node in element 'test'
                    const testDiv = document.getElementById("test");
                    var node = document.createElement('p');
                    node.innerHTML = json.albums[i].pictures[j].title + ' '+ starGroups;
                    testDiv.appendChild(node);
                    
                    //build a rating container
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

                        //later: set the right radio button to checked to display the right rating
                    }
                    starGroups++;
                    testDiv.appendChild(ratingContainer);
                }
                
            }
        
    });
}

function saveRating(){
    //get the correct Json for the picture
    //set the rating value
}