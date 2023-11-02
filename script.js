const searchBtn = document.querySelector("#search-btn")
const userInput = document.querySelector("#user-input")
const searchForm = document.querySelector("#search-form")
const searchedMovies = document.querySelector("#searched-movies")
const exploreMovies = document.querySelector("#explore")
const html = []
const errorPopUp = document.querySelector("#pop-up")


searchForm.addEventListener('submit', function(e) {
    e.preventDefault()
    searchMovies()
    userInput.value = ""
})

async function searchMovies() {
    const response = await fetch(`http://www.omdbapi.com/?apikey=7288476a&s=${userInput.value}&type=movie&r=json`)
    const moviesArray = await response.json()

    if(moviesArray.Error) {
        errorPopUp.style.display = 'flex'
    
    } else if(moviesArray) {
        exploreMovies.style.display="none"
        for(let movie of moviesArray.Search) {
            generateMovies(movie)
    
        }
    }

}

function generateMovies(movie) {
    fetch(`http://www.omdbapi.com/?apikey=7288476a&t=${movie.Title}&type=movie&plot=short&r=json`)
    .then(res => res.json())
    .then(movieData => {
        html.push(`   
            <div class="movie-data">
                <img src=${movieData.Poster} class="poster">
                <div class="movie-info">
                    <h2 class="movie-title">${movieData.Title} <span class="rating"><img src='./images/star.png' class='star'>
                    ${movieData.imdbRating}</span></h2>
                    <div class='runtime-genre-watchlist'>
                        <p><i>${movieData.Runtime}</i></p>
                        <p>${movieData.Genre}</p>
                        <p class="add-to-watchlist"><img src='./images/plus-symbol-button.png' class='add-btn'> Add to watchlist</p>
                    </div>
                    <p>${movieData.Plot}</p>
                </div>


            </div>
`
        )
    })
    .then(() => searchedMovies.innerHTML = html.join("") )

}


document.addEventListener('click', function(){
        errorPopUp.style.display = 'none'
 })


