import React, { useState } from 'react'
// import Papa from 'papaparse'
import songs_dict from '../songs.js'
import '../App.css';

function SongList() {

    function rand(min, max) {
        //Old flawed version
        //return Math.floor(Math.random() * (max - min) + min);

        //New version
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    console.log('J', songs_dict[rand(0, songs_dict.length - 1)].Conc)

    const [tasks, setTasks] = useState([songs_dict[0], songs_dict[1], songs_dict[2]]);
    const [newTask, setNewTask] = useState("");

    const [searchTerm, setSearchTerm] = useState("");

    const [genreSearch, setGenreSearch] = useState("");
    const [descriptorSearch, setDescriptorSearch] = useState("");
    const [yearSearch, setYearSearch] = useState("");
    const [languageSearch, setLanguageSearch] = useState("");

    // Checkboxes
    const [includeAllGenres, setIncludeAllGenres] = useState(false);
    const [includeAllDescriptors, setIncludeAllDescriptors] = useState(false);
    const [includeAllYears, setIncludeAllYears] = useState(false);
    const [includeAllLanguages, setIncludeAllLanguages] = useState(false);

    const filteredSongs = songs_dict.filter((song) => {
        // Normalize song fields to lowercase for comparison
        const genres = song["B. Genre(s)"]?.toLowerCase();
        const descriptors = song["All descriptors"]?.toLowerCase();
        const year = song.Year.toString();
        const language = song.Language?.toLowerCase();
    
        // Check each search condition; if any condition is empty, it's treated as true
        const genreSearchTerms = genreSearch.split(";").map(term => term.trim().toLowerCase());
        const descriptorSearchTerms = descriptorSearch.split(";").map(term => term.trim().toLowerCase());
        const yearSearchTerms = yearSearch.split(";").map(term => term.trim());
        const languageSearchTerms = languageSearch.split(";").map(term => term.trim().toLowerCase());

        // Function to handle AND/OR logic
        function matchSearchTerms(searchTerms, field, includeAll) {
            if (includeAll) {
                // AND logic: Every term in searchTerms must match
                return searchTerms.every(term => field.includes(term));
            } else {
                // OR logic: At least one term in searchTerms must match
                return searchTerms.some(term => field.includes(term));
            }
        }

        // Apply filters with AND/OR logic
        // Year always uses OR logic
        const matchesGenre = genreSearch === "" || matchSearchTerms(genreSearchTerms, genres, includeAllGenres);
        const matchesDescriptor = descriptorSearch === "" || matchSearchTerms(descriptorSearchTerms, descriptors, includeAllDescriptors);
        const matchesYear = yearSearch === "" || yearSearchTerms.includes(year);
        const matchesLanguage = languageSearch === "" || matchSearchTerms(languageSearchTerms, language, includeAllLanguages);
    
        // Only include the song if all conditions are met
        return matchesGenre && matchesDescriptor && matchesYear && matchesLanguage;
    });
    

    function handleInputChange(event) {
        setNewTask(event.target.value)
    }

    function randomNew() {
        // let newSong = songs_dict[rand(0,songs_dict.length-1)]
        // setTasks(t => [...t, newSong])

        if (filteredSongs.length > 0) {
            let newSong = filteredSongs[rand(0, filteredSongs.length - 1)];
            setTasks((t) => [...t, newSong]);
        } else {
            alert("No songs match your search criteria.");
        }
    }

    function randomReplace(index) {
        let newSong = songs_dict[rand(0, songs_dict.length - 1)]
        const updatedTasks = [...tasks];
        updatedTasks[index] = newSong;
        setTasks(updatedTasks);
    }

    function handleSearchChange(event) {
        setSearchTerm(event.target.value.toLowerCase());  // Normalize to lowercase
    }

    function randomReplaceAll() { //Not yet functional
        const newTasks = tasks.map(() => {
            return filteredSongs.length > 0 
                ? filteredSongs[rand(0, filteredSongs.length - 1)] 
                : null;
        });
    
        setTasks(newTasks);
    }

    function addTask() {
        if (newTask.trim() !== "") {
            setTasks(t => [...t, newTask]);
            setNewTask("");
        }
    }

    function deleteTask(index) {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
        //element isn't used, so it's replaced with "_"
        //"i" used instead of "index" since that's already there
    }

    function moveTaskUp(index) {
        if (index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] =
                [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function moveTaskDown(index) {
        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] =
                [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function Conc({ artist, song }) {
        if (artist.includes("; ")) {
            let artist_list = artist.split("; ");
            let main_artists = [artist_list[0]];
            let features = [];
            console.log("A", artist_list);

            for (let i = 1; i < artist_list.length; i++) {
                if (artist_list[i].includes("ft. ")) {
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
                    if (i === 0 && i === features.length - 1) { //If there's only one feature
                        features_string += `${features[i]})` //Ends the string
                    } else if (i === 0) { //If it's just one of multiple features
                        features_string += `${features[i]}`
                    } else if (i > 0 && i !== features.length - 1) { //If there's still more features after this
                        features_string += `, ${features[i]}`
                    } else if (i > 0 && i === features.length - 1) { //If this is the final feature in the list
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

    function Lang({ language }) {
        return <span>{language}</span>
    }

    return (<div className="to-do-list">

        <h1>Song Randomizer</h1>

        {/* <div>
            <input
                type="text"
                placeholder="Search by genre..."
                value={genreSearch}
                onChange={(e) => setGenreSearch(e.target.value)}
            />
            <label>
                <input
                    type="checkbox"
                    checked={includeAllGenres}
                    onChange={(e) => setIncludeAllGenres(e.target.checked)}
                />
                Include all genres
            </label>
        </div>
        
        <div>
            <input
                type="text"
                placeholder="Search by descriptor..."
                value={descriptorSearch}
                onChange={(e) => setDescriptorSearch(e.target.value)}
            />
            <label>
                <input
                    type="checkbox"
                    checked={includeAllDescriptors}
                    onChange={(e) => setIncludeAllDescriptors(e.target.checked)}
                />
                Include all descriptors
            </label>
        </div>

        <div>
            <input
                type="text"
                placeholder="Search by year..."
                value={yearSearch}
                onChange={(e) => setYearSearch(e.target.value)}
            />
        </div>

        <div>
            <input
                type="text"
                placeholder="Search by language..."
                value={languageSearch}
                onChange={(e) => setLanguageSearch(e.target.value)}
            />
            <label>
                <input
                    type="checkbox"
                    checked={includeAllLanguages}
                    onChange={(e) => setIncludeAllLanguages(e.target.checked)}
                />
                Include all languages
            </label>
        </div> */}

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

        <div className="song-page">
            <div className="song-container">
                <ol>
                    {tasks.map((song, index) =>
                        <li key={index} style={{ backgroundColor: song.BC }} className="song-row">
                            <div className="song-content">
                                <th className="song-info" style={{ color: song.TC }}>
                                    <div>
                                        <span className="song-name">
                                            {<Conc
                                                artist={song.Artist}
                                                song={song.Song}
                                            />} <span style={{ fontWeight: "normal", fontSize: "0.9rem" }}>
                                                ({song.Year})
                                            </span>
                                        </span>
                                    </div>
                                    <div>
                                        <span className="genres" style={{ fontWeight: "normal", fontSize: "1rem" }}>
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
                            </div>
                        </li>
                    )}
                </ol>
            </div>

            <div className="search-container">
                <div className="search-group">
                    <div>
                        <input
                            type="text"
                            placeholder="Search by genre..."
                            value={genreSearch}
                            onChange={(e) => setGenreSearch(e.target.value)}
                        />
                        <label>
                            <input
                                type="checkbox"
                                checked={includeAllGenres}
                                onChange={(e) => setIncludeAllGenres(e.target.checked)}
                            />
                            Include all
                        </label>
                    </div>
                </div>

                <div className="search-group">
                    <div>
                        <input
                            type="text"
                            placeholder="Search by descriptor..."
                            value={descriptorSearch}
                            onChange={(e) => setDescriptorSearch(e.target.value)}
                        />
                        <label>
                            <input
                                type="checkbox"
                                checked={includeAllDescriptors}
                                onChange={(e) => setIncludeAllDescriptors(e.target.checked)}
                            />
                            Include all
                        </label>
                    </div>
                </div>

                <div className="search-group">
                    <div>
                        <input
                            type="text"
                            placeholder="Search by year..."
                            value={yearSearch}
                            onChange={(e) => setYearSearch(e.target.value)}
                        />
                    </div>
                </div>

                <div className="search-group">
                    <div>
                        <input
                            type="text"
                            placeholder="Search by language..."
                            value={languageSearch}
                            onChange={(e) => setLanguageSearch(e.target.value)}
                        />
                        <label>
                            <input
                                type="checkbox"
                                checked={includeAllLanguages}
                                onChange={(e) => setIncludeAllLanguages(e.target.checked)}
                            />
                            Include all
                        </label>
                    </div>
                </div>
            </div>
        </div>

        {/* <h1>Divider</h1>
        <h2>The below is just for debugging purposes</h2>

        <ol>
            {filteredSongs.map((song, index) =>
                <li key={index} style={{ backgroundColor: song.BC }} className="song-row">
                    <table>
                        <th className="song-info" style={{ color: song.TC }}>
                            <div>
                                <span className="song-name">
                                    {<Conc artist={song.Artist} song={song.Song} />}
                                    <span style={{ fontWeight: "normal", fontSize: "1rem" }}>
                                        ({song.Year})
                                    </span>
                                </span>
                            </div>
                            <div>
                                <span className="genres" style={{ fontWeight: "normal", fontSize: "1.2rem" }}>
                                    {song["F. Genre(s)"].replaceAll(";", ",")}
                                </span>
                            </div>
                        </th>
                    </table>
                </li>
            )}
        </ol> */}

    </div>)
}

export default SongList