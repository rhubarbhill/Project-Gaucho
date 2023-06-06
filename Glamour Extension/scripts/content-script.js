console.log('scripts/content-script.js')

//var tracklist = document.getElementsByClassName("tracks tracklisting")
var tracklist = document.getElementById("tracks")
var all_tracks = tracklist.getElementsByClassName("track")

var album_info = document.getElementsByClassName("album_info_outer")
var artist_field = album_info[0].getElementsByClassName("artist")
artist_name = artist_field[0].innerText

var song
var blank = ' '
for (let i = 0; i < all_tracks.length; i++) {
    if (all_tracks[i].style.textAlign != 'right') {
    this["song"+i] = all_tracks[i].getElementsByClassName("rendered_text")
    this["btn_pencil"+i] = document.createElement("button")
    this["btn_pencil"+i].innerText = '✏️'
    const song_text = this["song"+i][0].innerText
    this["btn_pencil"+i].onclick = function() {pencil(song_text)}
    this["btn_clip"+i] = document.createElement("button")
    this["btn_clip"+i].innerText = '📋📋'
    this["song"+i][0].insertAdjacentElement("afterend", this["btn_clip"+i])
    this["song"+i][0].insertAdjacentText("afterend", blank)
    this["song"+i][0].insertAdjacentElement("afterend", this["btn_pencil"+i])
    this["song"+i][0].insertAdjacentText("afterend", blank)
    console.log(song_text)
    }
}

function pencil(song_title) {
    console.log(song_title)
    chrome.runtime.sendMessage({
        song: song_title,
        artist: artist_name
    })
    // TODO: Make it so the pencil works even when the popup is closed
}