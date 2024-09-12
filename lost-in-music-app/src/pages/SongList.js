import React, { useState } from 'react'
// import Papa from 'papaparse'
import songs_dict from '../songs.js'
import '../App.css';

function SongList() {

    function rand(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
      }

    // async function getSongData() {
    //     Papa.parse("Gtest sheet.csv", {
    //         download: true,
    //         complete: function(results) {
    //             let headers = [results.data[0]];
        
    //             for (let i = 1; i < results.data.length; i++) { //results.data.length is number of songs + 1 (the header)
    //                 let dictionary = {}
    //                 for (let j = 0; j < headers[0].length-1; j++) { //For this song, go through and assign the headers to the info
    //                     dictionary[`${headers[0][j]}`] = results.data[i][j];
    //                 }
    //                 songs.push(dictionary);
    //             }
                
    //             console.log('H', songs[0]);
    //             // alert(songs[0].Song);
    //             // console.log('J', songs[rand(0,songs.length-1)].Conc);
    //         }
    //     })
    // }

    // getSongData().then(resolve => {
    //     console.log('K', songs)
    // });

    console.log('J', songs_dict[rand(0,songs_dict.length-1)].Conc)
    // console.log('K', songs[0].Name)

    // Other stuff

    const [tasks, setTasks] = useState([songs_dict[0], songs_dict[1], songs_dict[2]]);
    const [newTask, setNewTask] = useState("");

    function handleInputChange(event){
        setNewTask(event.target.value)
    }

    function randomNew(){
        let newSong = songs_dict[rand(0,songs_dict.length-1)]
        setTasks(t => [...t, newSong])
    }

    function randomReplace(index){
        let newSong = songs_dict[rand(0,songs_dict.length-1)]
        const updatedTasks = [...tasks];
        updatedTasks[index] = newSong;
        setTasks(updatedTasks);
    }

    function randomReplaceAll() { //Not yet functional

        //What I'm effectively trying to accomplish (doesn't work because for loops don't work here)
        for (let i = 0; i < tasks.length, i++;) {
            randomReplace(i);
            console.log('test');
        }

        tasks.map( //Does not work, only replaces final one
            (song, index) => (
                randomReplace(index)
            )
        )

    }

    function addTask() {
        if(newTask.trim() !== "") {
            setTasks(t => [...t, newTask]);
            setNewTask("");
        }
    }

    function deleteTask(index){
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
        //element isn't used, so it's replaced with "_"
        //"i" used instead of "index" since that's already there
    }

    function moveTaskUp(index){
        if(index > 0){
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] = 
            [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function moveTaskDown(index){
        if(index < tasks.length - 1){
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] = 
            [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function Conc( { artist, song } ) {
        if(artist.includes("; ")) {
            let artist_list = artist.split("; ");
            let main_artists = [artist_list[0]];
            let features = [];
            console.log("A", artist_list);

            for (let i = 1; i < artist_list.length; i++) {
                if(artist_list[i].includes("ft. ")) {
                    features.push(artist_list[i].substring(4));
                } else {
                    main_artists.push(artist_list[i]);
                }
            }

            let main_artists_string = `${artist_list[0]}`;
            let features_string = ``;

            console.log("B", main_artists);
            console.log("C", features);

            if (main_artists.length > 1) { // If there's other collaborators
                for (let i = 1; i < main_artists.length; i++) {
                    main_artists_string += `, ${main_artists[i]}`;
                }
            }

            if (features.length > 0) { // If there's any features
                features_string += "(ft. "
                for (let i = 0; i < features.length; i++) {
                    if (i === 0 && i === features.length-1) { //If there's only one feature
                        features_string += `${features[i]})` //Ends the string
                    } else if (i === 0) { //If it's just one of multiple features
                        features_string += `${features[i]}`
                    } else if (i > 0 && i !== features.length-1) { //If there's still more features after this
                        features_string += `, ${features[i]}`
                    } else if (i > 0 && i === features.length-1) { //If this is the final feature in the list
                        features_string += `, ${features[i]})`
                    }
                }
            }

            console.log("D", main_artists_string);
            console.log("E", features_string);

            if (main_artists.length > 1 && features.length > 0) {
                //if there's a collab AND a feature, return Artist A, Artist B, Artist C... - Song (ft. Artist D, Artist E...)
                return <span>{main_artists_string} - {song} {features_string}</span>;
            } else if (main_artists.length > 1) {
                //if there's a collab, return Artist A, Artist B, Artist C... - Song
                return <span>{main_artists_string} - {song}</span>;
            } else if (features.length > 1) {
                //if there's a feature, return Artist A - Song (ft. Artist B, Artist C...)
                return <span>{artist_list[0]} - {song} {features_string}</span>;
            }
        }

        return <span>{artist} - {song}</span>;
    }

    function Lang( { language } ) {
        return <span>{language}</span>
    }

    return(<div className="to-do-list">

        <h1>Song Randomizer</h1>

        <div>
            <button
                className="top-button"
                onClick={randomNew}>
                Random New
            </button>
            <button
                className="top-button"
                onClick={randomReplaceAll}>
                Random Replace All
            </button>
        </div>

        <ol>
            {tasks.map((song, index) => 
                <li key={index} style={{backgroundColor: song.BC}} className="song-row">
                    <table>
                        <th className="song-info" style={{color: song.TC}}>
                            <div>
                                <span className="song-name">
                                    {<Conc
                                        artist = {song.Artist}
                                        song = {song.Song}
                                    />} <span style={{fontWeight: "normal", fontSize: "1rem"}}>
                                            ({song.Year})
                                        </span>
                                </span>
                            </div>
                            <div>
                                <span className="genres" style={{fontWeight: "normal", fontSize: "1.2rem"}}>
                                    {song["F. Genre(s)"].replaceAll(";", ",")}
                                </span>
                            </div>
                            {/* [decided not to include language for now]
                            <div className="language">
                                <span style={{fontWeight: "normal", fontSize: "0.8rem"}}>
                                    Language: <Lang
                                        language = {song.Language}
                                    />
                                </span>
                            </div> */}
                        </th>

                        <th className="buttons">
                            <button
                                className="add-button"
                                onClick={() => randomReplace(index)}>
                                🎲
                            </button>

                            <button
                                className="delete-button"
                                onClick={() => deleteTask(index)}>
                                ❌
                            </button>

                            <button
                                className="move-button"
                                onClick={() => moveTaskUp(index)}>
                                👆
                            </button>

                            <button
                                className="move-button"
                                onClick={() => moveTaskDown(index)}>
                                👇
                            </button>
                        </th>
                    </table>
                </li>
            )}
        </ol>

    </div>)
}

export default SongList