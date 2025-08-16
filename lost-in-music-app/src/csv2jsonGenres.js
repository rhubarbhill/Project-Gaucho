const fs = require("fs");
const csv = require("csv-parser"); // Install with `npm install csv-parser`

// Input and output file paths
const inputCsv = "./genres6c.csv"; // Path to your CSV file
const outputJson = "./genres.json"; // Path for the output JSON file

// Function to parse CSV and convert to JSON
function convertCsvToJson(inputCsv, outputJson) {
    const genreList = [];

    fs.createReadStream(inputCsv)
        .pipe(csv())
        .on("data", (row) => {
            // Process each row into JSON format
            const genreEntry = {
                pureTag: row["Pure Tag"],
                editedName: row["Edited Version (if appl.) –"],
                immediateParents: row["I. Parents"] ? row["I. Parents"].split(";").map(s => s.trim()) : [],
                allParents: Object.keys(row)
                    .filter((key) => key.startsWith("A") && row[key]) // Columns A1 to A12
                    .map((key) => row[key].trim()),
            };

            genreList.push(genreEntry);
        })
        .on("end", () => {
            // Write JSON to output file
            fs.writeFileSync(outputJson, JSON.stringify({ genres: genreList }, null, 2));
            console.log(`Conversion complete. JSON saved to ${outputJson}`);
        });
}

// Run the conversion
convertCsvToJson(inputCsv, outputJson);
