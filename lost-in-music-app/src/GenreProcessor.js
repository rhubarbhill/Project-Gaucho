import React, { useState } from "react";
import genresText from './genres.js';

const GenreProcessor = () => {
    // Step 1: Genre Dictionary (Sample Data)

    function parseCSV(text) {
        const lines = text.split("\n").map(line => line.trim()).filter(Boolean); // Split lines and remove empty lines
        const rows = lines.slice(1); // Skip the header row

        // Parse each row, split by commas, and filter out empty values
        const data = rows.map(row =>
            row.split(",").map(cell => cell.trim()).filter(cell => cell !== "")
        );

        return data;
    }

    // Example usage:
    const csvText = ``; //Can be removed

    const csvData = parseCSV(genresText);
    console.log('A', csvData);

    // const csvData = [
    //     ["Pop Rock", "Pop Rock", "Rock; Pop", "Top-level"],
    //     ["Indie Rock", "Indie Rock", "Rock", "Top-level"],
    //     ["Abstract Hip Hop", "Abstract Hip Hop", "Hip Hop", "Top-level"],
    //     ["Jazz Rap", "J–zz Rap", "Hip Hop", "Top-level"],
    //     ["Blues Rock", "Bl–es Rock", "Rock", "Blues"],
    //     ["Blues", "Blues", "Top-level", "Top-level"],
    //     ["East Coast Hip Hop", "East Coast Hip Hop", "Hip Hop", "Top-level"],
    //     ["Experimental Hip Hop", "Exp–rimental Hip Hop", "Hip Hop", "Abstract Hip Hop"],
    //     ["Conscious Hip Hop", "Conscious Hip Hop", "Hip Hop", "Top-level"],
    // ];

    // Build the genre dictionary
    const buildGenreDictionary = (csvData) => {
        const genreDict = {};
        csvData.forEach((row) => {
            const [pureTag, editedName, immediateParents, ...allParents] = row;
            const genreEntry = {
                editedName: editedName || pureTag,
                immediateParents: immediateParents
                    ? immediateParents.split(";").map((s) => s.trim())
                    : [],
                allParents: allParents.filter(Boolean).map((s) => s.trim()),
            };
            genreDict[pureTag] = genreEntry;
            if (pureTag !== editedName) {
                genreDict[editedName] = genreEntry;
            }
        });
        return genreDict;
    };

    const genreDict = buildGenreDictionary(csvData);

    // React state for input and output
    const [inputText, setInputText] = useState("");
    const [outputText, setOutputText] = useState("");

    // Function to process genres
    const processGenres = (input) => {
        const lines = input.split("\n").map((line) => line.trim()).filter(Boolean);
        const output = [];

        lines.forEach((line) => {
            const genres = line.split(";").map((genre) => genre.trim());
            const includedParents = new Set(); // Track already included parents
            const invalidGenres = [];

            // Expand genres to their edited names if applicable
            const expandedGenres = genres.map((genre) => {
                const entry = genreDict[genre];
                if (!entry) {
                    invalidGenres.push(genre);
                    return `[${genre} IS NOT A GENRE]`; // Mark invalid genres
                }
                return entry.editedName; // Always use the edited name if it exists
            });
            // Collect all parents of the input genres
            const allParents = genres.flatMap((genre) => {
                const entry = genreDict[genre];
                if (!entry) return [];
                // Replace each parent with its edited name, if applicable
                const immediateParents = entry.immediateParents.map((parent) => {
                    const parentEntry = genreDict[parent];
                    return parentEntry ? parentEntry.editedName : parent;
                });
                const allParentNames = entry.allParents.map((parent) => {
                    const parentEntry = genreDict[parent];
                    return parentEntry ? parentEntry.editedName : parent;
                });
                return [...immediateParents, ...allParentNames];
            });

            // Filter parents to avoid redundancy
            const filteredParents = allParents.filter((parent) => {
                const entry = genreDict[parent];
                const editedParent = entry ? entry.editedName : parent;
    
                // Exclude "Top-level"
                if (editedParent === "Top-level") return false;
    
                // Exclude parents that are substrings of any input genre or expanded genre
                if (
                    expandedGenres.some((g) => g.includes(editedParent)) || // Edited name is part of an input genre
                    includedParents.has(editedParent) // Already added
                ) {
                    return false;
                }
    
                // Exclude parents that are substrings of more specific parents
                if (
                    allParents.some((otherParent) => {
                        const otherEntry = genreDict[otherParent];
                        const editedOther = otherEntry ? otherEntry.editedName : otherParent;
                        return editedOther !== editedParent && editedOther.includes(editedParent);
                    })
                ) {
                    return false;
                }
    
                includedParents.add(editedParent); // Track included parent
                return true;
            });

            // Combine input genres and filtered parents into the output
            output.push([...expandedGenres, ...filteredParents].join("; "));
        });

        return output.join("\n");
    };

    // Handle the process button click
    const handleProcessClick = () => {
        const processedOutput = processGenres(inputText);
        setOutputText(processedOutput);
    };

    return (
        <div style={{ maxWidth: "600px", margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
            <h1>Genre Processor</h1>
            <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter genres here..."
                style={{
                    width: "100%",
                    height: "150px",
                    marginBottom: "15px",
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    fontSize: "14px",
                    resize: "vertical",
                }}
            />
            <button
                onClick={handleProcessClick}
                style={{
                    padding: "10px 20px",
                    fontSize: "16px",
                    border: "none",
                    borderRadius: "5px",
                    backgroundColor: "#007BFF",
                    color: "white",
                    cursor: "pointer",
                    marginBottom: "15px",
                }}
            >
                Process Genres
            </button>
            <textarea
                value={outputText}
                onChange={(e) => setOutputText(e.target.value)}
                placeholder="Output will appear here..."
                style={{
                    width: "100%",
                    height: "150px",
                    marginBottom: "15px",
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    fontSize: "14px",
                    resize: "vertical",
                }}
            />
        </div>
    );
};

export default GenreProcessor;
