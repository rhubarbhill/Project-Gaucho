import React, { useState } from "react";
import genresText from './genres.js';

const UnfilteredProcessor = () => {
    // Step 1: Parse the CSV data
    function parseCSV(text) {
        const lines = text.split("\n").map(line => line.trim()).filter(Boolean);
        const rows = lines.slice(1); // Skip the header row

        return rows.map(row =>
            row.split(",").map(cell => cell.trim()).filter(cell => cell !== "")
        );
    }

    const csvData = parseCSV(genresText);

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

    // Function to process genres (Unfiltered) without duplicates
    const processGenresUnfiltered = (input) => {
        const lines = input.split("\n").map((line) => line.trim()).filter(Boolean);
        const output = [];

        lines.forEach((line) => {
            const genres = line.split(";").map((genre) => genre.trim());
            const allGenresSet = new Set(); // Use Set to avoid duplicates

            genres.forEach((genre) => {
                const entry = genreDict[genre];

                if (!entry) {
                    // Add "NOT FOUND" for missing genres
                    allGenresSet.add(`[${genre}] is NOT FOUND`);
                    return;
                }

                // Add the genre itself (pure tag only), excluding "Top-level"
                if (genre !== "Top-level") {
                    allGenresSet.add(genre);
                }

                // Add all immediate parents (pure tags only), excluding "Top-level"
                entry.immediateParents.forEach((parent) => {
                    if (parent !== "Top-level") {
                        allGenresSet.add(parent);
                    }
                });

                // Add all parents (pure tags only), excluding "Top-level"
                entry.allParents.forEach((parent) => {
                    if (parent !== "Top-level") {
                        allGenresSet.add(parent);
                    }
                });
            });

            // Combine the genres into a single line and add to the output
            output.push(Array.from(allGenresSet).join("; "));
        });

        return output.join("\n");
    };



    // Handle the process button click
    const handleProcessClick = () => {
        const processedOutput = processGenresUnfiltered(inputText);
        setOutputText(processedOutput);
    };

    return (
        <div style={{ maxWidth: "600px", margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
            <h1>Unfiltered Genre Processor</h1>
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
                Process Unfiltered Genres
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

export default UnfilteredProcessor;
