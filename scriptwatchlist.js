const userWatchlist = document.querySelector('#user-movielist')
let watchlistHtml = []
const emptyWatchlist = document.querySelector('#empty-watchlist')
let localStorageWatchlist = JSON.parse(localStorage.getItem('watchlist'))

if (localStorageWatchlist) {
    emptyWatchlist.style.display = 'none'
    renderWatchlist()
}

function renderWatchlist(){
    localStorageWatchlist = JSON.parse(localStorage.getItem('watchlist'))
    if (localStorageWatchlist.length > 0) {
        for(const title in localStorageWatchlist) {
            generateWatchlist(`${localStorageWatchlist[title]}`)
            }
    } else {
        userWatchlist.innerHTML = `
                <div class="explore" id="explore" >
                    <img src="./images/cameraroll.png" class="cameraroll" alt="An icon of a camera roll">
                    <p class="explore">Start exploring!</p>
                </div>
                `
    }
    
}

console.log(localStorageWatchlist)

function generateWatchlist(movieTitle) {
        watchlistHtml = []
        fetch(`http://www.omdbapi.com/?apikey=7288476a&t=${movieTitle}&type=movie&plot=short&r=json`)
        .then(res => res.json())
        .then(movieData => {
            watchlistHtml.push(`   
                <div class='movie-data'>
                    <img src=${movieData.Poster} class='poster' alt='Official poster of the movie ${movieData.Title}'>
                    <div class='movie-info'>
                        <h2 class='movie-title'>${movieData.Title} <span class='rating'><img src='./images/star.png' class='star'
                        alt='A star icon'>
                        ${movieData.imdbRating}</span></h2>
                        <div class='runtime-genre-watchlist''>
                            <p><i>${movieData.Runtime}</i></p>
                            <p>${movieData.Genre}</p>
                            <p class='add-to-watchlist' id ='${movieData.imdbID}' data-title='${movieData.Title}'>
                            <img src='./images/remove.png' class='icon icon-remove' alt='A plus symbol icon'>Remove from the watchlist</p>
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
        .then(() => {
                userWatchlist.innerHTML = watchlistHtml.join('') 
            
        })
    
    }



    document.addEventListener('click', function(e) {
        if(e.target.dataset.title) {
            console.log(localStorageWatchlist)
        const filteredArray = localStorageWatchlist.filter(function(movie){

                if (movie === e.target.dataset.title){

                    return false
                }
                else {
                    return true
                }
            }) 

        localStorage.clear()
        localStorage.setItem('watchlist',JSON.stringify(filteredArray))

        renderWatchlist()


        }

    })
    
    
