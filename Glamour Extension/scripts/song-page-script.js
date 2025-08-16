console.log('scripts/song-page-script.js')

let songID = document.querySelector("#page_section_lists_root").dataset.assocId;
console.log('ID:', songID);

clipboard_ = document.createElement("button")
clipboard_.innerText = '📋'
clipboard_.onclick = function() {clipboard(concat_text)}

song_name = document.querySelector("#page_song_temp_section_header > div.page_song_header_main_info > h1 > span > span").innerText
artist_name = document.querySelector("#page_song_temp_section_header > div.page_song_header_main_info > div > h2 > a > span > span").innerText
concat_text = `[Song${songID},${artist_name} - ${song_name}]`

share = document.querySelector("#ui_breadcrumb_item_page_song_breadcrumb > span")
share.insertAdjacentElement("afterend", clipboard_)

function clipboard (concat_text) {
    navigator.clipboard.writeText(concat_text)
}