const userWatchlist = document.querySelector('#user-movielist')
const watchlistHtml = []
const emptyWatchlist = document.querySelector('#empty-watchlist')
let localStorageWatchlist = JSON.parse(localStorage.getItem('watchlist'))

if(localStorageWatchlist) {
    emptyWatchlist.style.display = 'none'
    for(const title in localStorageWatchlist) {
        generateWatchlist(`${localStorageWatchlist[title]}`)
        }
}

function generateWatchlist(movieTitle) {
        fetch(`http://www.omdbapi.com/?apikey=7288476a&t=${movieTitle}&type=movie&plot=short&r=json`)
        .then(res => res.json())
        .then(movieData => {
            watchlistHtml.push(`   
                <div class="movie-data">
                    <img src=${movieData.Poster} class="poster">
                    <div class="movie-info">
                        <h2 class="movie-title">${movieData.Title} <span class="rating"><img src='./images/star.png' class='star'>
                        ${movieData.imdbRating}</span></h2>
                        <div class='runtime-genre-watchlist''>
                            <p><i>${movieData.Runtime}</i></p>
                            <p>${movieData.Genre}</p>
                            <p class="remove-from-watchlist" data-title='${movieData.Title}'><img src='./images/remove.png' class='delete-btn'> Remove from your watchlist</p>
                        </div>
                        <p>${movieData.Plot}</p>
                        <p class="additional-info">Directed by: <i>${movieData.Director}</i><br>
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
        .then(() => userWatchlist.innerHTML = watchlistHtml.join("") )
    
    }
    