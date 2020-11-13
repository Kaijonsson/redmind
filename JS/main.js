// Main function to fetch first 10 Star wars characters.
async function getStarWars() {
    try {
        const characterResponse = await fetch('https://swapi.dev/api/people/');
        const characterData = await characterResponse.json();
        const starWarsClass = new StarWarsClass;
        //--------------------------------------------------------------------//
        starWarsClass.createNewList(characterData.results); //create the first list of starWars Characters + build the foundation of the website.

        

    
        //basically count from 2-10 and set a new pagenumber via the "for-loop" in the method "getNextPage".
        //getNextPage repeats the steps in the previous method but with new pages from SWAPI for each iteration.
        maxPages = 10;
        minPages = 1;
        for (let i = 2; i < maxPages; i++) {
            starWarsClass.getNextPage(i)
            }

    
        //Search SWAPI using the API's own search engine.
        
        let btn = document.getElementById("searchBtn");
            btn.addEventListener("click", function(event) {
                event.preventDefault();
                let input =  document.getElementById("input").value;
                starWarsClass.searchTheGalaxy(input);
            })

    }catch (error) {
        console.error(error);
    }

}


getStarWars() //calls the first async funcion, basically the "on-button".











