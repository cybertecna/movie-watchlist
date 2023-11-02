const searchBtn = document.querySelector('#search-btn')
const userInput = document.querySelector('#user-input')
const searchForm = document.querySelector('#search-form')
const searchedMovies = document.querySelector('#searched-movies')
const exploreMovies = document.querySelector('#explore')
let html = []
const errorPopUp = document.querySelector('#pop-up')
const watchlistArray = []

searchForm.addEventListener('submit', function(e) {
    e.preventDefault()
    searchMovies()
    userInput.value = ''
})

async function searchMovies() {
    const response = await fetch(`http://www.omdbapi.com/?apikey=7288476a&s=${userInput.value}&type=movie&r=json`)
    const moviesArray = await response.json()

    if(moviesArray.Error) {
        errorPopUp.style.display = 'flex'
    
    } else if(moviesArray) {
        exploreMovies.style.display= 'none'
        html = []
        for(let movie of moviesArray.Search) {
            generateMovies(movie.Title)
        }
    }

}

function generateMovies(movieTitle) {
    fetch(`http://www.omdbapi.com/?apikey=7288476a&t=${movieTitle}&type=movie&plot=short&r=json`)
    .then(res => res.json())
    .then(movieData => {
        html.push(`   
            <div class='movie-data'>
                <img src=${movieData.Poster} class='poster' alt='Official poster of the movie ${movieData.Title}'>
                <div class='movie-info'>
                    <h2 class='movie-title'>${movieData.Title} 
                    <span class='rating'> 
                    <img src='./images/star.png' class='star' alt='A star icon'>
                    ${movieData.imdbRating}</span></h2>
                    <div class='runtime-genre-watchlist''>
                        <p><i>${movieData.Runtime}</i></p>
                        <p>${movieData.Genre}</p>
                        <p class='add-to-watchlist' id ='${movieData.imdbID}' data-title='${movieData.Title}'>
                        <img src='./images/plus-symbol-button.png' class='icon' alt='A plus symbol icon'> Add to watchlist</p>
                    </div>
                    <p>${movieData.Plot}</p>
                    <p class='additional-info'>Directed by: <i>${movieData.Director}</i><br>
                       Written by: <i>${movieData.Writer}</i><br>
                       Actors: <i>${movieData.Actors}</i><br>
                       Country: ${movieData.Country}<br>
                       Box Office: ${movieData.BoxOffice}
                       </p>
                </div>


            </div>
`
        )
    })
    .then(() => searchedMovies.innerHTML = html.join('') )

}

document.addEventListener('click', function(){
        errorPopUp.style.display = 'none'
 })

document.addEventListener('click', function(e) {
    if(e.target.dataset.title) {
        watchlistArray.push(e.target.dataset.title)
        localStorage.setItem('watchlist',JSON.stringify(watchlistArray))
        console.log(e.target.id)
        document.getElementById(e.target.id).innerHTML = `<p class='added-to-the-watchlist'>
                                                            <img src='./images/check.png' alt='A check icon' class='icon'>
                                                            Added to the watchlist</p>`
    }
})



