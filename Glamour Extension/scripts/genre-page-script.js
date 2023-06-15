console.log('scripts/genre-page-script.js')
//This script is specifically for the genre pages on RYM (rgenre/*)
//This script returns all of the green primary genres on the page

primary_genres_text = document.querySelector("#content > table > tbody > tr > td:nth-child(2) > \
table > tbody > tr:nth-child(1) > td > h3")
pencil_ = document.createElement("button")
pencil_.innerText = '✏️📋'
pencil_.onclick = function() {summon()}
primary_genres_text.insertAdjacentElement("afterend", pencil_)

function summon() {

    var AlbumID = document.querySelector("a.album").title.replace(/[^0-9]/g, '')
    var genreList = document.querySelector(`#genreListlg${AlbumID}`)
    var green_length = genreList.getElementsByClassName("genrea").length

    front_genres = []
    front_genres_str = ''

    for (let i = 1; i < green_length+1; i++) {
        this["pgenre"+i] = document.querySelector(`#genreListlg${AlbumID} > div:nth-child(${i}) > table > \ 
        tbody > tr > td:nth-child(1) > div > a`).innerText

        front_genres.push(this["pgenre"+i])
    }

    front_genres_str = `${front_genres[0]}`

    for (let i = 1; i < front_genres.length; i++) {
        front_genres_str += `; ${front_genres[i]}`
    }

    console.log(front_genres_str)

    var table = "<table style='text-align:left;'> \
    <tr> \
        <th>Front Genres</th> \
        <th>Clip</th> \
        <th>Back Genres</th> \
    </tr> \
    <tr> \
        <td id='front-holder'></td> \
        <td id='clip-front'></td> \
        <td id='back-holder'></td> \
    </tr> \
    </table>"

    primary_genres_text.insertAdjacentHTML("afterend", table)

    document.getElementById('front-holder').innerHTML = front_genres_str

    clipboard(front_genres_str) //Copies the front genre string at the same time the pencil is clicked

    genre_clip = document.createElement("button")
    genre_clip.innerText = '📋 (Front)'
    genre_clip.onclick = function() {clipboard(front_genres_str)}
    //document.getElementById('front-holder').innerHTML += "???"
    document.getElementById('front-holder').insertAdjacentElement("afterend", genre_clip)
}

function clipboard (song_title) {
    navigator.clipboard.writeText(song_title)
}

//TODO: Find out how to make the buttons larger without affecting other elements on the page