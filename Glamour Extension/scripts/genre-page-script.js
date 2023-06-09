console.log('scripts/genre-page-script.js')
//This script is specifically for the genre pages on RYM (rgenre/*)
//This script returns all of the green primary genres on the page

var AlbumID = document.querySelector("a.album").title.replace(/[^0-9]/g, '')
var genreList = document.querySelector(`#genreListlg${AlbumID}`)
var green_length = genreList.getElementsByClassName("genrea").length

const front_genres = []
front_genres_str = ''

for (let i = 1; i < green_length+1; i++) {
    this["pgenre"+i] = document.querySelector(`#genreListlg${AlbumID} > div:nth-child(${i}) > table > \ 
    tbody > tr > td:nth-child(1) > div > a`).innerText

    front_genres.push(this["pgenre"+i])

    console.log("new variable: ", this["pgenre"+i])
}

front_genres_str = `${front_genres[0]}`

for (let i = 1; i < front_genres.length; i++) {
    front_genres_str += `; ${front_genres[i]}`
}

console.log(front_genres_str)