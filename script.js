const searchBtn = document.querySelector("#search-btn")
const userInput = document.querySelector("#user-input")
const searchForm = document.querySelector("#search-form")



searchForm.addEventListener('submit', function(e) {
    e.preventDefault
    search()

})


async function search() {
    const response = await fetch("http://www.omdbapi.com/?apikey=7288476a&")
    const movie = await response.json()
    console.log(response)
    console.log(movie)
}