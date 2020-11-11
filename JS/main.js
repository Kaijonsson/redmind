
async function getStarWars() {
    const characterResponse = await fetch('https://swapi.dev/api/people/');
    const characterData = await characterResponse.json();
    console.log(characterData);    
    const starWarsClass = new StarWarsClass;
    console.log(characterData.results);
//--------------------------------------------------------------------//


    starWarsClass.createNewList(characterData);
    



    // let page = 1;
    // maxPages = 9;
    // minPages = 1;

    // let nextBtn = document.getElementById("nextBtn");
    // nextBtn.addEventListener("click", function() {
    //    page++
    //    starWarsClass.getNextPage(page);
       

    // })























    ///////////////////////////////////////////////////////////////////////////////
////////////search//////////////////////////////////////////////////////////
    // let btn = document.getElementById("searchBtn");
    // btn.addEventListener("click", function(event) {
    //     event.preventDefault();
    //     let input =  document.getElementById("input").value;
    //     console.log(input);
    // })    


}

getStarWars()
.then(characterResponse => {
})
.catch(error => {
    console.log("error");
    console.log(error);
});










