import React from 'react'
import Navbar from '../components/Navbar'
import GenreProcessor from "../GenreProcessor"
import UnfilteredProcessor from "../UnfilteredProcessor";

function GenreTool() {

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
    const csvText = ``;

    const csvData = parseCSV(csvText);
    console.log('A', csvData);

    // Example: Input CSV data [this works]
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


    return (
        <div>
            <Navbar />
            <GenreProcessor />
            <UnfilteredProcessor />
            
        </div>
    )
}

export default GenreTool