
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
    let starWarsClass = new StarWarsClass;
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
                starWarsClass.createStarWarsCharacterCard(swCharacter);

            } else {
                cardHandler.parentNode.childNodes[3].remove();
                starWarsClass.createStarWarsCharacterCard(swCharacter)
            }            
        })
    }



}

getStarWars()
.then(characterResponse => {
})
.catch(error => {
    console.log("error");
    console.log(error);
});










