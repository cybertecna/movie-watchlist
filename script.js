const searchBtn = document.querySelector("#search-btn")
const userInput = document.querySelector("#user-input")
const searchForm = document.querySelector("#search-form")
const searchedMovies = document.querySelector("#searched-movies")


searchForm.addEventListener('submit', function(e) {
    e.preventDefault()
    search()
    userInput.value = ""
})


async function search() {
    const response = await fetch(`http://www.omdbapi.com/?apikey=7288476a&s=${userInput.value}&type=movie&r=json`)
    const moviesArray = await response.json()
    let html = ''

    for(let movie of moviesArray.Search) {
        fetch(`http://www.omdbapi.com/?apikey=7288476a&t=${movie.Title}&type=movie&plot=short&r=json`)
        .then(res => res.json())
        .then(movieData => {
            html += `<div class='movie-poster'>
                        <img id='poster' src='${movieData.Poster}'>
                    </div>
                    <div class='movie-data>
                        <h2>${movieData.Title}</h2>
                        <p>${movieData.imdbRating}</p>
                        <p>${movieData.Runtime}</p>
                        <p>${movieData.Genre}</p>
                        <p>Add to watchlist</p>
                        <p>${movieData.Plot}</p>
                    </div>
            `
            console.log(movieData)
            console.log(html)
            searchedMovies.innerHTML = html
        })
        
    }

   

}