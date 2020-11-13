class StarWarsClass {


    createNewList(fetchedData) { //creates a <ul> and an appended <li> for each name in SWAPI's array.

        for (let data of fetchedData) {

            let swCharacter = data;
            console.log(data);
            let newListItem = document.createElement("li");
            newListItem.setAttribute("class", "list-group-item");
            // <li> element created.
            let ulList = document.getElementById("ulId");
            //<ul> element created
            newListItem.innerHTML = swCharacter.name;
            //character name saved in <li>.innerHTML
            ulList.appendChild(newListItem); //li added to <ul>

            let self = this;

            newListItem.addEventListener("click", function () {
                self.insertStarWarsCard(swCharacter);
                newListItem.scrollIntoView();
                newListItem.style.textDecoration = "underline";
            }) //when clicking on name in list, scroll that name into view, add an underline to it, and use name in next method.
        }


    }

    insertStarWarsCard(characterToInsert) {
        let cardHandler = document.getElementById("characterCard");
        //if there is no previous "additional info" on display, create new "additional info" to display.
        if (cardHandler == null) {
            this.createStarWarsCharacterCard(characterToInsert);
            //otherwise remove the "additional info" window on display. and create the new "additional info" to display.
        } else {
            cardHandler.parentNode.childNodes[3].remove();
            this.createStarWarsCharacterCard(characterToInsert)
        }
    }

    createStarWarsCharacterCard(characterCardToCreate) {
        //changing layout of application on "click".
        this.setClassNewFlex();
        //create a button to be able to close the "additional info" window manually.
        let btn = document.createElement("button");
        btn.setAttribute("id", "exitButton")
        btn.innerText = "X";
        //add eventlistener to that button to execute the exit-action.
        let self = this;
        btn.addEventListener("click", function () {
            location.reload();
            btn.parentNode.remove();
            self.setClassFlex();
        })
        //creates new div to present clicked character with more info.
        let newDiv = document.createElement("div");
        newDiv.setAttribute("id", "characterCard");
        newDiv.appendChild(btn);
        document.getElementById("mainListId").appendChild(newDiv);
        newDiv.appendChild(this.getStarWarsCharacterInfo(characterCardToCreate))
        //in new div, add exit button and character-info.
        return newDiv;
    }

    getStarWarsCharacterInfo(character) {
        let properties = [ //save character info in an array.
            "Name: " + character.name,
            "Height: " + character.height + "cm",
            "Gender: " + character.gender,
            "Birth Year: " + character.birth_year,
            "Mass: " + character.mass + "kg",
            "skin-color: " + character.skin_color
        ]

        let characterUl = document.createElement("ul");
        characterUl.setAttribute("id", "characterCardUl");
        //create an <ul> in which to add new <li>.

        for (let property of properties) {
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
            const newPageResponse = await fetch("https://swapi.dev/api/people/?page=" + pageNum);
            const pageData = await newPageResponse.json();
            this.createNewList(pageData.results);

        } catch(error) {
            console.error(error);
        }

    }


    async searchTheGalaxy(searchWord) { //search function of the website.
        try {

            const searchResponse = await fetch("https://swapi.dev/api/people/?search=" + searchWord);
            const searchData = await searchResponse.json();
            console.log(searchData);
            //if a match is found, create new "additional info" window, with that value.
            // this.insertStarWarsCard(searchData.results[0]);
            let listItems = document.getElementsByClassName("list-group-item");
            let listArray = [];
            //save listItems.InnerHTML as an array.
            for (let item of listItems) {
                listArray.push(item.innerHTML);
            }

            for (let item of listItems) {
                if (item.innerHTML === searchData.results[0].name) {
                    //put matched item into view and make it underlined.
                    console.log(searchData.results);
                    this.insertStarWarsCard(searchData.results[0]);
                    item.scrollIntoView();
                    item.style.textDecoration = "underline";
                }


            }








        }catch(error) {
            console.error(error);
        }

    }



























}