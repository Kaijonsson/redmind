class StarWarsClass {


        //Skapar listan med Star Wars-karaktärer//////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////
    createNewList(fetchedData) {
        let counter = 0;

        for (let i = 0; i < fetchedData.results.length; i++) {

            counter++;
            let swCharacter = fetchedData.results[i];
            let newListItem = document.createElement("li");
            newListItem.setAttribute("class", "list-group-item");
            newListItem.setAttribute("id", "list" + counter);
            //skapat <li>
            //skapar <ul>
            let ulList = document.getElementById("ulId");    
            newListItem.innerHTML = swCharacter.name;
            //lägger in varje namn i API i varsin <li>
            //appendar <li> i <ul>
            ulList.appendChild(newListItem);

            //öppnar ett ny ruta vid klick på ett namn.
            newListItem.addEventListener("click", function() {
                let cardHandler = document.getElementById("characterCard");

                if(cardHandler == null) {
                    starWarsClass.createStarWarsCharacterCard(swCharacter);

                } else {
                    cardHandler.parentNode.childNodes[3].remove();
                    starWarsClass.createStarWarsCharacterCard(swCharacter)
                }            
            })
        }

    }

    createStarWarsCharacterCard(characterCardToCreate) {
        //changing layout of application on "click".
        let thisStarWarsClass = this;
        this.setClassGrid();

        let btn = document.createElement("button");
        btn.setAttribute("id", "exitButton")
        btn.innerText = "X";

        btn.addEventListener("click", function (event) {
            event.preventDefault();
            btn.parentNode.remove();
            thisStarWarsClass.setClassFlex();
        })
        //creates new div to present clicked character with more info.
        let newDiv = document.createElement("div");
        newDiv.setAttribute("id", "characterCard");
        let ref = document.getElementById("mainListId");
        let parent = document.getElementById("mainListId").parentNode;
        parent.insertBefore(newDiv, ref);
        newDiv.appendChild(btn);
        newDiv.appendChild(thisStarWarsClass.getStarWarsCharacterInfo(characterCardToCreate))
        return newDiv;
    }

    getStarWarsCharacterInfo(character){
        let properties = [
            "Name: "        + character.name, 
            "Height: "      + character.height + "cm", 
            "Gender: "      + character.gender,
            "Birth Year: "  + character.birth_year,
            "Mass: "        + character.mass + "kg",
            "skin-color: "  + character.skin_color
        ]

        let characterUl = document.createElement("ul");
        characterUl.setAttribute("id", "characterCardUl");

        for (let property of properties){
            let characterList = document.createElement("li");
            characterList.setAttribute("class", "characterCardClass");
            characterList.innerHTML = property;

            characterUl.appendChild(characterList);
        }


        return characterUl
    }

    setClassGrid() {
        document.getElementById("contentBoxId").setAttribute("class", "contentBox-grid");
        document.getElementById("swSearch").setAttribute("class", "title-grid");
        document.getElementById("mainListId").setAttribute("class", "mainList-grid");
        document.getElementById("swFooter").setAttribute("class", "grid");
    }

    setClassFlex() {
        document.getElementById("contentBoxId").setAttribute("class", "contentBox-flex");
        document.getElementById("swSearch").setAttribute("class", "title-flex");
        document.getElementById("mainListId").setAttribute("class", "mainList-flex");
        document.getElementById("swFooter").setAttribute("class", "grid");

    }

    async getNextPage(page) {
        try {
            const newPageResponse = await fetch("https://swapi.dev/api/people/?page=" + page);
            const pageData = await newPageResponse.json();
            console.log(pageData.results);
            return pageData.results;

        }catch (error) {
            console.error(error);
        }

    }


































}