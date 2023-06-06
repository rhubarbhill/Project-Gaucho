console.log("This is a popup!")
console.log(document.body)

curr_song = "..."

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.dir(message.song)
    console.dir(message.artist)

    curr_song = message.song
    var songContent = curr_song
    var songHolder = document.getElementById("song-holder")

    console.log(songHolder.innerHTML)
    songHolder.innerHTML = songContent
    console.log(songHolder.innerHTML)
})

/*(async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const [{ result }] = await chrome.scripting.executeScript(({
      target: { tabId: tab.id },
      func: () => song_title,
    }))
    document.body.textContent = result;
  })()*/