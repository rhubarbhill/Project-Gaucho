console.log('scripts/content-script.js')

//var tracklist = document.getElementsByClassName("tracks tracklisting")
var tracklist = document.getElementById("tracks")
var all_tracks = tracklist.getElementsByClassName("track")

var song
var blank = ' '
for (let i = 0; i < all_tracks.length; i++) {
    if (all_tracks[i].style.textAlign != 'right') {
    song = all_tracks[i].getElementsByClassName("rendered_text")
    btn = document.createElement("button")
    btn.innerText = '📋'
    song[0].insertAdjacentElement("afterend", btn)
    song[0].insertAdjacentText("afterend", blank)
    console.log(song[0].innerText)
    }
}
