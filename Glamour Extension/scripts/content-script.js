console.log('scripts/content-script.js')

var tracklist = document.getElementById("tracks")
var all_tracks = tracklist.getElementsByClassName("track")

var album_info = document.getElementsByClassName("album_info_outer")
var artist_field = album_info[0].getElementsByClassName("artist")
artist_name = artist_field[0].innerText
//TODO: Account for artist names that start with "The"
//TODO: As well as artists with a non-Latin character as the first one

var year_field = document.querySelector("#column_container_right > div.section_main_info.section_outer > \
div > table.album_info_outer > tbody > tr > td > table > tbody > tr:nth-child(3) > td > a > b")
year_name = year_field.innerText
//TODO: This is a general thing, but account for edge cases where some fields may be empty

var pri_genres_field = document.querySelector("#column_container_right > div.section_main_info.section_outer > \
div > table.album_info_outer > tbody > tr > td > table > tbody > tr.release_genres > td:nth-child(2) > \
div > span.release_pri_genres")
//pri_genres = pri_genres_field.innerText.replaceAll(",", ";")
//
//TODO: Eventually fix this to account for cases where some above rows are missing
//TODO: This one's a long one, but integrate this with the Genre Tree Program

var lang_field = document.querySelector("#column_container_right > div.section_main_info.section_outer > \
div > table.album_info_outer > tbody > tr > td > table > tbody > tr:nth-child(10) > td")
//lang_name = lang_field.innerText.replaceAll(",", ";")
//
//TODO: A bit busted right now. Fix this entire thing to account for cases where some above rows are missing
//And for cases where there is no Language

var album_info_end = document.querySelector("#column_container_right > div.section_main_info.section_outer > \
div > table.album_info_outer")

var table = "<table style='text-align:left;'> \
<tr> \
    <th>Song</th> \
    <th>Artist</th> \
    <th>*</th> \
    <th>Year</th> \
    <th>Genre(s)</th> \
    <th>*</th> \
    <th>*</th> \
    <th>*</th> \
    <th>*</th> \
    <th>*</th> \
    <th>*</th> \
    <th>Language</th> \
    <th>*</th> \
    <th>*</th> \
    <th>*</th> \
    <th>*</th> \
    <th>*</th> \
    <th>Date Added</th> \
</tr> \
<tr> \
    <td id='song-holder'></td> \
    <td id='artist-holder'></td> \
    <td id='BLANK-score-holder'></td> \
    <td id='year-holder'></td> \
    <td id='pgenres-holder'></td> \
    <td id='BLANK-topdesc-holder'></td> \
    <td id='BLANK-alldesc-holder'></td> \
    <td id='BLANK-comments-holder'></td> \
    <td id='BLANK-comments-date-holder'></td> \
    <td id='BLANK-best-moment(s)-holder'></td> \
    <td id='BLANK-NRG-holder'></td> \
    <td id='lang-holder'></td> \
    <td id='BLANK-notes-holder'></td> \
    <td id='BLANK-attributes-holder'></td> \
    <td id='BLANK-owned-holder'></td> \
    <td id='BLANK-firstheard-holder'></td> \
    <td id='BLANK-mixtapes-holder'></td> \
    <td id='date-added-holder'></td> \
</tr> \
</table>"

var curr_song = "..."
var curr_artist = "..."
var curr_year = "..."
var curr_pgenres = "..."
var curr_lang = "..."
var content = ""
var holder = ""
var tableOn = 0

//let curr_date = new Date().toJSON().slice(0, 10)
//TODO: Very low priority, but maybe eventually learn how to convert toJSON
//to the proper timezone

const date = new Date();
let day = date.getDate();
let month = date.getMonth()+1;
let year = date.getFullYear();
if (month < 10) {
    month = `0${month}`
}
if (day < 10) {
    day = `0${day}`
}
let curr_date = `${year}-${month}-${day}`;

var cell_sep = "	"

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
    this["btn_clip"+i].innerText = '📋'
    this["btn_clip"+i].onclick = function() {clipboard(song_text)}

    this["btn_dclip"+i] = document.createElement("button")
    this["btn_dclip"+i].innerText = '📋➕'
    this["btn_dclip"+i].onclick = function() {double_clipboard(artist_name, song_text)}

    this["song"+i][0].insertAdjacentElement("afterend", this["btn_dclip"+i])
    this["song"+i][0].insertAdjacentText("afterend", blank)
    this["song"+i][0].insertAdjacentElement("afterend", this["btn_clip"+i])
    this["song"+i][0].insertAdjacentText("afterend", blank)
    this["song"+i][0].insertAdjacentElement("afterend", this["btn_pencil"+i])
    this["song"+i][0].insertAdjacentText("afterend", blank)
    console.log(song_text)
    }
}

function pencil(song_title) {
    console.log(song_title)
    /*chrome.runtime.sendMessage({
        song: song_title,
        artist: artist_name
    })*/
    //TODO: ^ Phase this out, it's kind of unnecessary now
    
    if (tableOn == 0) {album_info_end.insertAdjacentHTML("afterend", table)}

    table_clipboard_btn = document.createElement("button")
    table_clipboard_btn.innerText = '📊📋'
    table_clipboard_btn.onclick = function() {table_clipboard()}
    if (tableOn == 0) {album_info_end.insertAdjacentElement("afterend", table_clipboard_btn)}

    tableOn = 1

    write_cell(curr_song, song_title, "song-holder")
    write_cell(curr_artist, artist_name, "artist-holder")
    write_cell(curr_year, year_name, "year-holder")
    //write_cell(curr_pgenres, pri_genres, "pgenres-holder")
    //write_cell(curr_lang, lang_name, "lang-holder")
    write_cell(curr_date, curr_date, "date-added-holder")
}

//TODO: Make a clipboard button for the entire table

function clipboard (song_title) {
    navigator.clipboard.writeText(song_title)
}

function double_clipboard (artist, song) {
    artist_song = `${artist} - ${song}`
    navigator.clipboard.writeText(artist_song)
}

function table_clipboard () {
    c = cell_sep
    song = document.getElementById("song-holder").innerHTML
    artist = document.getElementById("artist-holder").innerHTML
    year = document.getElementById("year-holder").innerHTML
    the_row = `${song}${c}${artist}${c}${c}${year}`
    navigator.clipboard.writeText(the_row)
}

function write_cell (curr_, message_, id) {
    curr_ = message_
    content = curr_
    holder = document.getElementById(id)
    holder.innerHTML = content
}