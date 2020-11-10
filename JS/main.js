
// fetch('https://swapi.dev/api/people')
// .then(response => {
//     if (response.ok) {
//         console.log("SUCCESS")
//     } else {
//         console.log("not successful")
//     }
//     response.json()
// })
// .then(data => {
//     console.log(data)
// });


async function getStarWars() {
    const characterResponse = await fetch('https://swapi.dev/api/people');
    const characterData = await characterResponse.json();
//--------------------------------------------------------------------//

    console.log(characterData.results[0]);

    let counter = 0;

    for (let i = 0; i < characterData.results.length; i++) {
        counter++;
        let swCharacter = characterData.results[i];
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
        newListItem.addEventListener("click", function(e) {
            let cardHandler = document.getElementById("characterCard");

            if(cardHandler == null) {
                createStarWarsCharacterCard();

            } else {
                cardHandler.parentNode.childNodes[3].remove();
                createStarWarsCharacterCard()
            }

            
        })

        function createStarWarsCharacterCard() {
            //changing layout of application on "click".
            document.getElementById("contentBoxId").setAttribute("class", "contentBox-grid");
            document.getElementById("swTitle").setAttribute("class", "title-grid");
            document.getElementById("mainListId").setAttribute("class", "mainList-grid");
            document.getElementById("swFooter").setAttribute("class", "grid");

            //creates new div to present clicked character with more info.
            let newDiv = document.createElement("div");
            newDiv.setAttribute("id", "characterCard");
            let ref = document.getElementById("mainListId");
            let parent = document.getElementById("mainListId").parentNode;
            parent.insertBefore(newDiv, ref);
            newDiv.appendChild(getStarWarsCharacterInfo(swCharacter))
        return newDiv;
    }


    }
    function getStarWarsCharacterInfo(character){
        let properties = [
            "Name: " + " " + character.name, 
            "Height: " +  " " + character.height, 
            "Gender: " +  " " + character.gender,
            "Birth Year: " + " " + character.birth_year
        ]

        let characterUl = document.createElement("ul");
        characterUl.setAttribute("id", "characterCardUl");

        for (property of properties){
            let characterList = document.createElement("li");
            characterList.setAttribute("class", "characterCardClass");
            characterList.innerHTML = property;

            characterUl.appendChild(characterList);
        }


        return characterUl
    }



}

getStarWars()
.then(characterResponse => {
})
.catch(error => {
    console.log("error");
    console.log(error);
});














            // getCharacterStarship(swCharacter.starships[0]);

            // async function getCharacterStarship(characterName){
            //     const starShipResponse = await fetch(characterName);
            //     const starshipData = await starShipResponse.json();
            // }