console.log('scripts/content-script.js')

var tracklist = document.getElementById("tracks")
if (tracklist != undefined) {
    var all_tracks = tracklist.getElementsByClassName("track")
}

var album_info = document.getElementsByClassName("album_info_outer")
var artist_field = album_info[0].getElementsByClassName("artist")
artist_name = artist_field[0].innerText
if (artist_name.startsWith('The ')) {
    artist_name_slice = artist_name.slice(4)
}
//TODO: As well as artists with a non-Latin character as the first one

var album_name = document.querySelector("#column_container_right > div.section_main_info.section_outer > div > div.album_title").innerText
var release_type = document.querySelector("#column_container_right > div.section_main_info.section_outer > div > table.album_info_outer > tbody > tr > td > table > tbody > tr:nth-child(2) > td").innerText

var info_hdr_list = document.getElementsByClassName("info_hdr")

var lang_row_num = -1
var year_row_num = 3
var share_row_num = -1
//TODO: Phase out "share_row_num" because the Share row is gone now

for (let i = 0; i < info_hdr_list.length; i++) {
    //if ('Language' in info_hdr_list[i].html)
    if(info_hdr_list[i].innerText == 'Language' || info_hdr_list[i].innerText == 'Languages') {
        console.log('Language field is present')
        console.log(info_hdr_list[i].innerText)
        lang_row_num = i
    }
    if(info_hdr_list[i].innerText == 'Released') {
        year_row_num = i
    }
    if(info_hdr_list[i].innerText == 'Descriptors') {
        share_row_num = i
    }
}

var year_field = document.querySelector("#column_container_right > div.section_main_info.section_outer > \
div > table.album_info_outer > tbody > tr > td > table > tbody > tr:nth-child("+(year_row_num+1)+") > td > a > b")
if (year_field != null) {
    year_name = year_field.innerText
} else {year_name = 'N/A'} //This is just a temporary solution
//TODO: This is a general thing, but account for edge cases where some fields may be empty
//TODO: Account for cases where the year is not in blue
//Error Case: Maggot Brained (Single) by Funkadelic, Infinity Repeating (Additional release) by Daft Punk

var pri_genres_field = document.querySelector("#column_container_right > div.section_main_info.section_outer > \
div > table.album_info_outer > tbody > tr > td > table > tbody > tr.release_genres > td:nth-child(2) > \
div > span.release_pri_genres")
var pri_genres = pri_genres_field.innerText.replaceAll(",", ";")
//
//TODO: Eventually fix this to account for cases where some above rows are missing
//TODO: This one's a long one, but integrate this with the Genre Tree Program

var share_tweet = document.querySelector("#column_container_right > div.section_main_info.section_outer > \
div > table.album_info_outer > tbody > tr > td > table > tbody > tr:nth-child("+(share_row_num+1)+") > td > div:nth-child(1)")

if (lang_row_num != -1) {
    var lang_field = document.querySelector("#column_container_right > div.section_main_info.section_outer > \
    div > table.album_info_outer > tbody > tr > td > table > tbody > tr:nth-child("+(lang_row_num+1)+") > td")
    lang_name = lang_field.innerText.replaceAll(",", ";")
} else {
    lang_name = "Blank"
}

var album_info_end = document.querySelector("#column_container_right > div.section_main_info.section_outer > \
div > table.album_info_outer")

var table = "<table id='custom-table' style='text-align:left;'> \
<tr> \
    <th>✓</th> \
    <th>Song</th> \
    <th>Artist</th> \
    <th>*</th> \
    <th>Year</th> \
    <th>F. Genre(s)</th> \
    <th>B. Genre(s)</th> \
    <th>*</th> \
    <th>*</th> \
    <th>*</th> \
    <th>*</th> \
    <th>*</th> \
    <th>Language</th> \
    <th>Alt. S.</th> \
    <th>Alt. A.</th> \
    <th>*</th> \
    <th>*</th> \
    <th>*</th> \
    <th>*</th> \
    <th>Date Added</th> \
</tr> \
<tr> \
    <td id='check-holder'>✓</td> \
    <td id='song-holder'></td> \
    <td id='artist-holder'></td> \
    <td id='BLANK-score-holder'></td> \
    <td id='year-holder'></td> \
    <td id='fgenres-holder'></td> \
    <td id='bgenres-holder'></td> \
    <td id='BLANK-topdesc-holder'></td> \
    <td id='BLANK-alldesc-holder'></td> \
    <td id='BLANK-comments-holder'></td> \
    <td id='BLANK-best-moment(s)-holder'></td> \
    <td id='BLANK-comments-date-holder'></td> \
    <td id='lang-holder'></td> \
    <td id='alt-song-name-holder'></td> \
    <td id='alt-artist-name-holder'></td> \
    <td id='BLANK-notes-holder'></td> \
    <td id='BLANK-attributes-holder'></td> \
    <td id='BLANK-owned-holder'></td> \
    <td id='BLANK-mixtapes-holder'></td> \
    <td id='date-added-holder'></td> \
</tr> \
</table>"

var curr_song = "..."
var curr_artist = "..."
var curr_year = "..."
var curr_fgenres = "..."
var curr_bgenres = "..."
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

const track_list = []

//TODO: Account for releases that don't have a track listing, prevent error
if (tracklist != undefined) {
    for (let i = 0; i < all_tracks.length; i++) {
        text_holder = 'N/A'
        if (all_tracks[i].getElementsByClassName("rendered_text").length != 0) {
            let ref = document.querySelector(`#tracks > li:nth-child(${i+1}) > div.tracklist_line > span.tracklist_title > span:nth-child(1) > span > a`)
            if (ref !== null && ref.className === "artist") {
                songElements = all_tracks[i].getElementsByClassName("song")
                this["song"+i] = songElements
                // TODO: Eventually, figure out how to get this to apply to the final song element rather than just the first
                text_holder = this["song"+i][songElements.length-1].innerText.substring(3)
            } else {
                this["song"+i] = all_tracks[i].getElementsByClassName("rendered_text")
                text_holder = this["song"+i][0].innerText
            }
        } else {
            if (i < all_tracks.length) {
                j = i+1 
            } else {
                continue
            }
            this["song"+i] = document.querySelector(`#tracks > li:nth-child(${j}) > div.tracklist_line > span.tracklist_title > span:nth-child(1) > a.song`)
            // this["song"+i] = document.querySelector(`#tracks > li:nth-child(${j}) > div > span.tracklist_title > a`)
            if (this["song"+i] == null) {
                continue
            }
            text_holder = this["song"+i].innerText
        }
        this["ft_list"+i] = []
        this["ft_credit"+i] = all_tracks[i].getElementsByClassName("featured_credit")

        if (this["ft_credit"+i].length > 0) {
            this["ft_type"+i] = this["ft_credit"+i][0].innerText.slice(0,4)
            this["feature"+i] = this["ft_credit"+i][0].getElementsByClassName("artist")
        
            for (let j = 0; j < this["feature"+i].length; j++) {
                this["ft_list"+i].push(this["feature"+i][j].innerText)
            }
        }

        this["btn_pencil"+i] = document.createElement("button")
        this["btn_pencil"+i].innerText = '✏️'
        const song_text = text_holder
        this["btn_pencil"+i].onclick = function() {pencil(song_text)}

        this["btn_clip"+i] = document.createElement("button")
        this["btn_clip"+i].innerText = '📋'
        this["btn_clip"+i].onclick = function() {clipboard(song_text)}

        this["btn_dclip"+i] = document.createElement("button")
        this["btn_dclip"+i].innerText = '📋➕'
        this["btn_dclip"+i].onclick = function() {double_clipboard(artist_name, song_text)}

        if(all_tracks[i].getElementsByClassName("rendered_text").length != 0) {
            this["song"+i][0].insertAdjacentElement("afterend", this["btn_pencil"+i])
            this["song"+i][0].insertAdjacentText("afterend", blank)
            this["song"+i][0].insertAdjacentElement("afterend", this["btn_dclip"+i])
            this["song"+i][0].insertAdjacentText("afterend", blank)
            this["song"+i][0].insertAdjacentElement("afterend", this["btn_clip"+i])
            this["song"+i][0].insertAdjacentText("afterend", blank)
        } else {
            this["song"+i].insertAdjacentElement("afterend", this["btn_pencil"+i])
            this["song"+i].insertAdjacentText("afterend", blank)
            this["song"+i].insertAdjacentElement("afterend", this["btn_dclip"+i])
            this["song"+i].insertAdjacentText("afterend", blank)
            this["song"+i].insertAdjacentElement("afterend", this["btn_clip"+i])
            this["song"+i].insertAdjacentText("afterend", blank)
        }
        
        track_list.push(song_text)
    }
}

album_row_btn = document.createElement("button")
album_row_btn.innerText = '📊📋➕'
album_row_btn.onclick = function() {album_row()}
notion_btn = document.createElement("button")
notion_btn.innerText = 'Notion 📋'
notion_btn.onclick = function() {notion_share()}
artist_album_btn = document.createElement("button")
artist_album_btn.innerText = '📋➕'
artist_album_btn.onclick = function() {ar_al_share()}
album_info_end.insertAdjacentElement("afterend", notion_btn)
album_info_end.insertAdjacentElement("afterend", artist_album_btn)
album_info_end.insertAdjacentElement("afterend", album_row_btn)

function album_row() {
    c = cell_sep

    a_row = `-${c}${artist_name} - ${album_name}${c}${year_name}${c}${release_type}${c}${c}${c}${pri_genres}${c}${c}${c}${c}${c}${lang_name}${c}${c}${curr_date}`
    navigator.clipboard.writeText(a_row)
}
function notion_share() {
    artist_album_link = `${artist_name} - [${album_name}](${window.location.href})`
    navigator.clipboard.writeText(artist_album_link)
}
function ar_al_share() {
    artist_album = `${artist_name} - ${album_name}`
    navigator.clipboard.writeText(artist_album)
}

//The following button still hasn't been implemented
ld_btn = document.createElement("button")
ld_btn.innerText = 'Import to Log 📋'
if (tracklist != undefined) {
    ld_entry = "[b]DATE[/b] \
    \n\n- \
    \n\nTrack review: [spoiler] \
    "
    for (let i = 0; i < all_tracks.length; i++) {
        if (all_tracks[i].style.textAlign != 'right') {
        ld_entry += `\n\n"${track_list[i]}" `
        }
    } //TODO: Figure out how to make this work because "\n" isn't working at all
    ld_entry += "[/spoiler]"

    console.log(ld_entry)
}

function ld_e() {
    console.log(ld_entry)
}

genre_btn = document.createElement("button")
genre_btn.innerText = '📋'
const genre_text = pri_genres
pri_genres_field.insertAdjacentElement("afterend", genre_btn)
pri_genres_field.insertAdjacentText("afterend", blank)
genre_btn.onclick = function() {clipboard(genre_text)}

genre_pencil = document.createElement("button")
genre_pencil.innerText = '✏️'
genre_pencil.onclick = function() {pencil_g(genre_text)}

tracklist_pencil = document.createElement("button")
tracklist_pencil.innerText = '✏️'
var tracklist_block = document.getElementById("tracks")
tracklist_block.insertAdjacentElement("beforebegin", tracklist_pencil)
tracklist_pencil.onclick = function() {tracklist_p()}

function pencil(song_title) {
    console.log(song_title)
    
    if (tableOn == 0) {album_info_end.insertAdjacentHTML("afterend", table)}

    table_clipboard_btn = document.createElement("button")
    table_clipboard_btn.innerText = '📊📋'
    table_clipboard_btn.onclick = function() {table_clipboard()}
    if (tableOn == 0) {
        album_info_end.insertAdjacentElement("afterend", table_clipboard_btn)
        genre_btn.insertAdjacentElement("afterend", genre_pencil)
        genre_pencil.insertAdjacentText("beforebegin", blank)
    }

    tableOn = 1

    write_cell(curr_song, song_title, "song-holder")
    if (artist_name.startsWith('The ') == false) {
        write_cell(curr_artist, artist_name, "artist-holder")
    } else {
        write_cell(curr_artist, artist_name_slice, "artist-holder")
    }
    write_cell(curr_year, year_name, "year-holder")
    //write_cell(curr_fgenres, f_genres, "fgenres-holder")
    //write_cell(curr_bgenres, b_genres, "bgenres-holder")
    if (lang_row_num != -1) {write_cell(curr_lang, lang_name, "lang-holder")}
    write_cell(curr_date, curr_date, "date-added-holder")
}

function pencil_g(genre_list) {
    write_cell(curr_fgenres, genre_list, "fgenres-holder")
}

function tracklist_p() {
    if (tableOn == 0) {album_info_end.insertAdjacentHTML("afterend", table)}

    for (let i = 0; i < track_list.length; i++) {
        add_row("custom-table", track_list[i])
    }
}

function add_row(table_id, song_name) {
    var table = document.getElementById(table_id); //Still a work in progress

    var row = table.insertRow(-1);

    var cell0 = row.insertCell(0);
    var cell1 = row.insertCell(1);
    var cell2 = row.insertCell(2);
    var cell3 = row.insertCell(3);
    var cell4 = row.insertCell(4);
    var cell5 = row.insertCell(5);
    var cell6 = row.insertCell(6);
    var cell7 = row.insertCell(7);
    var cell8 = row.insertCell(8);
    var cell9 = row.insertCell(9);
    var cell10 = row.insertCell(10);
    var cell11 = row.insertCell(11);
    var cell12 = row.insertCell(12); //Language
    var cell13 = row.insertCell(13);
    var cell14 = row.insertCell(14);
    var cell15 = row.insertCell(15);
    var cell16 = row.insertCell(16);
    var cell17 = row.insertCell(17);
    var cell18 = row.insertCell(18);
    var cell19 = row.insertCell(19); //Added
    
    cell0.innerHTML = "✓"
    cell1.innerHTML = song_name
    cell2.innerHTML = artist_name
    cell3.innerHTML = cell_sep
    cell4.innerHTML = year_name
    cell5.innerHTML = genre_text
    cell6.innerHTML = cell_sep
    cell7.innerHTML = cell_sep
    cell8.innerHTML = cell_sep
    cell9.innerHTML = cell_sep
    cell10.innerHTML = cell_sep
    cell11.innerHTML = cell_sep
    cell12.innerHTML = lang_name
    cell13.innerHTML = cell_sep
    cell14.innerHTML = cell_sep
    cell15.innerHTML = cell_sep
    cell16.innerHTML = cell_sep
    cell17.innerHTML = cell_sep
    cell18.innerHTML = cell_sep
    cell19.innerHTML = curr_date
}

album_name_btn = document.createElement("button")
album_name_btn.innerText = '📋'
album_title = document.querySelector("#column_container_right > div.section_main_info.section_outer > div > div.album_title")
const album_text = album_title.innerText
//album_title.insertAdjacentElement("afterend", album_name_btn)
album_name_btn.onclick = function() {clipboard(album_text)}
//TODO: Reintroduce this button once you find a way to get the button right next to the album text itself

artist_name_btn = document.createElement("button")
artist_name_btn.innerText = '📋'
const artist_text = artist_name
artist_field[0].insertAdjacentElement("afterend", artist_name_btn)
artist_field[0].insertAdjacentText("afterend", blank)
artist_name_btn.onclick = function() {clipboard(artist_text)}

function clipboard (title) {
    navigator.clipboard.writeText(title)
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
    fgenres = document.getElementById("fgenres-holder").innerHTML
    //TODO: Prevent the "&amp;" thing from showing up for genres with ampersands in the name
    language = document.getElementById("lang-holder").innerHTML
    the_date = document.getElementById("date-added-holder").innerHTML

    //TODO: Eventually, "back genres", "alt. name", and "alt. artist" will all be needed

    the_row = `✓${c}${song}${c}${artist}${c}${c}${year}${c}${fgenres}${c}${c}${c}${c}${c}${c}${c}${language}${c}${c}${c}${c}${c}${c}${c}${the_date}`
    navigator.clipboard.writeText(the_row)
}

function write_cell (curr_, message_, id) {
    curr_ = message_
    content = curr_
    holder = document.getElementById(id)
    holder.innerHTML = content
}

//TODO: Make the table cells editable
//TODO: Clean this up. Like have more consistency with the variable names, etc.