
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
    const response = await fetch('https://swapi.dev/api/people');
    const data = await response.json();
//--------------------------------------------------------------------//

    // let counter = 0;
    // for (characters of data.results) {
    //         counter++
    //         characters = data.results.name;
    //         console.log(counter + ": " + characters);

    // }


    let counter = 0;

    for (let i = 0; i < data.results.length; i++) {
        counter++;
        // console.log(counter + ": " + data.results[i].name);
        let newListItem = document.createElement("li");
        newListItem.setAttribute("class", "list-group-item");
        newListItem.setAttribute("id", "list" + counter);
        //skapat <li>
        //skapar <ul>
        let ulList = document.getElementById("ulId");    
        newListItem.innerHTML = counter + ": " + data.results[i].name;
        //lägger in varje namn i API i varsin <li>
        console.log(data.results[i].name)  
        //appendar <li> i <ul>
        ulList.appendChild(newListItem);


        //öppnar ett ny ruta vid klick på ett namn.
        newListItem.addEventListener("click", function(e) {
            e.preventDefault();
            let newDiv = document.createElement("div");
            newDiv.setAttribute("class", "characterCard");
            let ref = document.getElementById("mainListId");
            let parent = document.getElementById("mainListId").parentNode;
            parent.insertBefore(newDiv, ref);
            //div created to present add. info about characters.

            
        })


    }

}

getStarWars()
.then(response => {
    console.log("yay");
})
.catch(error => {
    console.log("error");
    console.log(error);
});

