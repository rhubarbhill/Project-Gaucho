console.log('scripts/content-script.js')

var tracklist = document.getElementById("tracks")
var all_tracks = tracklist.getElementsByClassName("track")

var album_info = document.getElementsByClassName("album_info_outer")
var artist_field = album_info[0].getElementsByClassName("artist")
artist_name = artist_field[0].innerText

var year_field = document.querySelector("#column_container_right > div.section_main_info.section_outer > \
div > table.album_info_outer > tbody > tr > td > table > tbody > tr:nth-child(3) > td > a > b")
year_name = year_field.innerText

var lang_field = document.querySelector("#column_container_right > div.section_main_info.section_outer > \
div > table.album_info_outer > tbody > tr > td > table > tbody > tr:nth-child(10) > td")
lang_name = lang_field.innerText

var album_info_end = document.querySelector("#column_container_right > div.section_main_info.section_outer > \
div > table.album_info_outer")

var table = "<table style='text-align:left;'> \
<tr> \
    <th>Song</th> \
    <th>Artist</th> \
    <th>*</th> \
    <th>Year</th> \
    <th>Language</th> \
</tr> \
<tr> \
    <td id='song-holder'>SONG</td> \
    <td id='artist-holder'>ARTIST</td> \
    <td id='score-holder'></td> \
    <td id='year-holder'>YEAR</td> \
    <td id='lang-holder'>LANG</td> \
</tr> \
</table>"

var curr_song = "..."
var curr_artist = "..."
var curr_year = "..."
var curr_lang = "..."
var content = ''
var holder = ''
var tableOn = 0

var cell_separator = '	'

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
    }) //TODO: Phase this out, it's kind of unnecessary now
    
    if (tableOn == 0) {album_info_end.insertAdjacentHTML("afterend", table)}
    tableOn = 1

    write_cell(curr_song, song_title, "song-holder")
    write_cell(curr_artist, artist_name, "artist-holder")
    write_cell(curr_year, year_name, "year-holder")
    write_cell(curr_lang, lang_name, "lang-holder")
}

//TODO: Make a clipboard button for the entire table

function write_cell (curr_, message_, id) {
    curr_ = message_
    content = curr_
    holder = document.getElementById(id)
    holder.innerHTML = content
}