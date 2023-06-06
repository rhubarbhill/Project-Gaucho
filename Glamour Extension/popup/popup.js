console.log("This is a popup!")
console.log(document.body)

// TODO: Make it so the pencil works even when the popup is closed

var curr_song = "..."
var curr_artist = "..."
var content = ''
var holder = ''

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.dir(message.song)
    console.dir(message.artist)

    write_cell(curr_song, message.song, "song-holder")
    write_cell(curr_artist, message.artist, "artist-holder")
})

function write_cell (curr_, message_, id) {
    curr_ = message_
    content = curr_
    holder = document.getElementById(id)
    holder.innerHTML = content
}