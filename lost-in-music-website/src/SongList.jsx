import React, { useState } from 'react'
import Papa from 'papaparse'
import songs_dict from './songs.js'

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

    return(<div className="to-do-list">

        <h1>To-Do List</h1>

        <div>
            <input
                type="text"
                placeholder="Enter a task..."
                value={newTask}
                onChange={handleInputChange}/>
            <button
                className="add-button"
                onClick={addTask}>
                Add
            </button>
            <button
                className="rand-button"
                onClick={randomNew}>
                Random New
            </button>
            <button
                className="rand-button"
                onClick={randomReplaceAll}>
                Random Replace All
            </button>
        </div>

        <ol>
            {tasks.map((song, index) => 
                <li key={index}>
                    <span style={{color: song.TC, backgroundColor: song.BC}} className="text">{
                            song.Conc
                        }</span>
                    <button
                        className="delete-button"
                        onClick={() => deleteTask(index)}>
                        Delete
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

                    <button
                        className="rand-button"
                        onClick={() => randomReplace(index)}>
                        Replace
                    </button>
                </li>
            )}
        </ol>

    </div>)
}

export default SongList