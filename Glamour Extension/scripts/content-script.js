console.log('scripts/content-script.js')

//var tracklist = document.getElementsByClassName("tracks tracklisting")
var tracklist = document.getElementById("tracks")
var all_tracks = tracklist.getElementsByClassName("track")
//var babylon = all_tracks[0].getElementsByClassName("rendered_text")
//babylon[0].innerText
////Same as all_tracks[0].getElementsByClassName("rendered_text")[0].innerText

var song
for (let i = 0; i < all_tracks.length; i++) {
    if (all_tracks[i].style.textAlign != 'right') {
    song = all_tracks[i].getElementsByClassName("rendered_text")
    console.log(song[0].innerText)
    }
}
