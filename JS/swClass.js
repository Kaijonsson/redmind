class StarWarsClass {


createNewList(fetchedData) { //creates a <ul> and an appended <li> for each name in SWAPI's array.

    let counter = 0;
    let thisStarWarsClass = this;
    for (let i = 0; i < fetchedData.results.length; i++) {

        counter++;
        let swCharacter = fetchedData.results[i];
        let newListItem = document.createElement("li");
        newListItem.setAttribute("class", "list-group-item");
        // <li> element created.
        let ulList = document.getElementById("ulId");    
        //<ul> element created
        newListItem.innerHTML = swCharacter.name;
        //character name saved in <li>.innerHTML
        ulList.appendChild(newListItem); //li added to <ul>

        newListItem.addEventListener("click", function() {
            thisStarWarsClass.insertStarWarsCard(swCharacter);
            newListItem.scrollIntoView(); 
            newListItem.style.textDecoration = "underline";
        }) //when clicking on name in list, scroll that name into view, add an underline to it, and use name in next method.
    }

}

insertStarWarsCard(characterToInsert) {
    let thisStarWarsClass = this;
    let cardHandler = document.getElementById("characterCard");
    //if there is no previous "additional info" on display, create new "additional info" to display.
    if(cardHandler == null) {
        thisStarWarsClass.createStarWarsCharacterCard(characterToInsert);
        //otherwise remove the "additional info" window on display. and create the new "additional info" to display.
    } else {
        cardHandler.parentNode.childNodes[3].remove();
        thisStarWarsClass.createStarWarsCharacterCard(characterToInsert)
    }    
}

createStarWarsCharacterCard(characterCardToCreate) {
    //changing layout of application on "click".
    let thisStarWarsClass = this;
    this.setClassNewFlex();
    //create a button to be able to close the "additional info" window manually.
    let btn = document.createElement("button");
    btn.setAttribute("id", "exitButton")
    btn.innerText = "X";
    //add eventlistener to that button to execute the exit-action.
    btn.addEventListener("click", function (event) {
        location.reload();
        btn.parentNode.remove();
        thisStarWarsClass.setClassFlex();
    })
    //creates new div to present clicked character with more info.
    let newDiv = document.createElement("div");
    newDiv.setAttribute("id", "characterCard");
    newDiv.appendChild(btn); 
    document.getElementById("mainListId").appendChild(newDiv);
    newDiv.appendChild(thisStarWarsClass.getStarWarsCharacterInfo(characterCardToCreate))
    //in new div, add exit button and character-info.
    return newDiv;
}

getStarWarsCharacterInfo(character){
    let properties = [ //save character info in an array.
        "Name: "        + character.name, 
        "Height: "      + character.height + "cm", 
        "Gender: "      + character.gender,
        "Birth Year: "  + character.birth_year,
        "Mass: "        + character.mass + "kg",
        "skin-color: "  + character.skin_color
    ]

    let characterUl = document.createElement("ul");
    characterUl.setAttribute("id", "characterCardUl");
    //create an <ul> in which to add new <li>.

    for (let property of properties){
        //for each character-property in the newly created array, save that property in a <li>.
        let characterList = document.createElement("li");
        characterList.setAttribute("class", "characterCardClass");
        characterList.innerHTML = property;

        characterUl.appendChild(characterList); //save the new <li> in newly created <ul>
    }


    return characterUl //return the <ul><li>innerHTML</li></ul>
}

setClassNewFlex() { //set class to "mainListId" - element to change style when needed.
    document.getElementById("mainListId").setAttribute("class", "mainList-new-flex")
}

setClassFlex() { //set same class back to original css when needed.
    document.getElementById("mainListId").setAttribute("class", "mainList-flex");

}


async getNextPage(pageNum) { //method to fetch API based on argument.
    try {
        let thisStarWarsClass = this;

        const newPageResponse = await fetch("https://swapi.dev/api/people/?page=" + pageNum);
        const pageData = await newPageResponse.json();
        thisStarWarsClass.createNewList(pageData);


    }catch (error) {
        console.error(error);
    }

}


async searchTheGalaxy(searchWord) { //search function of the website.
    try {
        let thisStarWarsClass = this;

        const searchResponse = await fetch("https://swapi.dev/api/people/?search=" + searchWord);
        const searchData = await searchResponse.json();
        let searchValue = searchData;

            let listItems = document.getElementsByClassName("list-group-item");
        
            let listArray = [];
            //save listItems.InnerHTML as an array.
                for (let item of listItems) {
                    listArray.push(item.innerHTML);
                }
                //loop through that array and match searchvalue against each element of array.
                for (let charName of listArray){
                    if (searchValue.results[0].name === charName){
                        //if a match is found, create new "additional info" window, with that value.
                        thisStarWarsClass.insertStarWarsCard(searchValue.results[0]);
                        for (let item of listItems) {
                            if (item.innerHTML === searchValue.results[0].name){
                                //put matched item into view and make it underlined.
                                item.scrollIntoView(); 
                                item.style.textDecoration = "underline";
                            }
                        }
                    }


                    
                }
  

        

    }catch (error) {
        console.error(error);
    }

}





// let label = document.createElement("label");
// label.setAttribute("type", "text");
// label.innerHTML = "Try again, maybe with different spelling."
// document.getElementById("swSearch").appendChild(label);


























}