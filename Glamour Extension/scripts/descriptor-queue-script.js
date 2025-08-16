// Define the string you're searching for in the fifth column
const targetString = "[descriptor62870]";

// Select the table by its class
const table = document.querySelector(".tblstandard");

if (table) {
    // Get all rows of the table
    const rows = table.querySelectorAll("tr");

    let name = null;
    let complexString = null;

    rows.forEach((row) => {
        const cells = row.querySelectorAll("td");

        // Ensure the row has the expected number of cells
        if (cells.length >= 6) {
            const fifthColumnText = cells[4].textContent.trim();

            if (fifthColumnText === targetString) {
                // Extract data from the fourth and sixth columns
                name = cells[3].textContent.trim();
                complexString = cells[5].textContent.trim();
            }
        }
    });

    if (name && complexString) {
        const smallGreenElement = document.querySelector(".smallgreen");

        // Add the extracted information earlier in the DOM (customize as needed)
        const infoDiv = document.createElement("div");
        infoDiv.innerHTML = `
            <p>${name} / ${complexString}</p>
        `;
        smallGreenElement.insertAdjacentElement("afterend", infoDiv);
    } else {
        console.error("No matching row found or columns are missing.");
    }
} else {
    console.error("Table with class 'tblstandard' not found.");
}


// // Define the target words you want to search for
// const targetWords = ['music', 'literature']; //Obsolete now
// // Select the table and header
// const table = document.querySelector("#content > table.tblstandard");
// const nameHeader = document.querySelector("#content > table.tblstandard > tbody > tr:nth-child(1) > th:nth-child(4)");

// // A list of people who silently voted "no" after change back to "music," even despite all my very lengthy
// // meta comments and explanations and just the self-evident obviousness of this descriptor's necessity
// const listOfIdiots = ['120DaysofSodom', 'WackyWombat99', 'cute', 'kewooseven', 'gjelly', 'AleLiddell', 'Monsieur_Renard', 'brunolk44', '4U6V',
//   'anonymous00700', 'Zillv'];

// //Retrieve the first row's Name (it will always be "music" until it gets approved)
// const firstRowName = document.querySelector("#content > table.tblstandard > tbody > tr:nth-child(2) > td:nth-child(4)").innerText;

// // Retrieve the voting info, which is printed in the format int | int // username
// const votingInfo = document.querySelector("#content > table.tblstandard > tbody > tr:nth-child(2) > td:nth-child(6)").innerText;

// // Split the voting info into variables (mainly just so the string can be dynamically edited)
// const [part1, part2] = votingInfo.split('//');
// const [int1, int2] = part1.trim().split('|').map(num => parseInt(num.trim()));
// const str = part2.trim();
// let str_ = str;

// // A very important function
// if (listOfIdiots.includes(str)) {
//   //If the most recent commenter is one of the fucking idiots, be sure to print that out instead of their actual
//   //name because I don't wanna see their name anymore, I just want them labeled as a fucking idiot
//   str_ = "A fucking idiot";
// }

// // Display the info
// console.log(`${firstRowName} - ${int1} | ${int2} // ${str_}`)




// if (table && nameHeader) {
//   // Initialize counters for each target word
//   let counts = {};
//   targetWords.forEach(word => {
//     counts[word] = 0;
//   });
  
//   // Find the column index of the "Name" header
//   const headerIndex = Array.from(nameHeader.parentNode.children).indexOf(nameHeader) + 1;

//   // Loop through all rows in the table and check the cells in the target column
//   const rows = table.querySelectorAll('tbody tr');
//   rows.forEach(row => {
//     const cellText = row.children[headerIndex - 1].textContent.trim().toLowerCase(); // Get the text in the "Name" column

//     targetWords.forEach(word => {
//       if (cellText.includes(word)) {
//         counts[word]++;
//       }
//     });
//   });

//   // Log the counts to the console
//   // console.log(`music: ${counts['music']}}`);
// }

// // Log the innerHTML of the specified element just once
// const targetElement = document.querySelector("#content > table:nth-child(10) > tbody > tr > td:nth-child(1) > span");

// if (targetElement) {
//   console.log(targetElement.innerHTML);
// }