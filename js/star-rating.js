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

async function getAlbums(){
    await fetch('\\app-data\\library\\picture-library.json')
    .then((response) => response.json())
    .then((json) => {
        //have a counter to help name the radio button groups
        let starGroups = 1;
        //get out each and every album
        for( let i = 0; i< json.albums.length; i++){
        console.log(json.albums[i].pictures);
        let pictures = json.albums[i].pictures;
            //get out each and every picture
            for(let j = 0; j<pictures.length; j++){
                //add a node in element 'test'
                const testDiv = document.getElementById("test");
                var node = document.createElement('p');
                node.innerHTML = json.albums[i].pictures[j].title + ' '+ starGroups;
                testDiv.appendChild(node);
                starGroups++;
            }
           
        }
        
    });
}


function createRating(jsonArray){
    console.log(jsonArray);
    //const divID = 'rating'+jsonArray[1];
    //console.log(divID);
   

    //create a rating container
    //add specific ID
    //add specific name for all the stars so they don't get mixed upp
    //add eraseRating function to the button

}

function saveRating(){
    //get the correct Json for the picture
    //set the rating value
}