import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// import Papa from 'papaparse'

// let songs = [];

// Papa.parse("Gtest sheet.csv", {
// 	download: true,
// 	complete: function(results) {
// 		console.log('A', results);
// 		console.log('B', results.data);
// 		console.log('C', results.data[0]);
// 		let headers = [results.data[0]];
// 		console.log('F', results.data.length); //results.data.length is number of songs + 1 (the header)
// 		console.log('G', results.data[1][headers[0].length-1]); // Must go from 0-length

// 		for (let i = 1; i < results.data.length; i++) { //results.data.length is number of songs + 1 (the header)
// 			let dictionary = {}
// 			for (let j = 0; j < headers[0].length-1; j++) { //For this song, go through and assign the headers to the info
// 				dictionary[`${headers[0][j]}`] = results.data[i][j];
// 			}
// 			songs.push(dictionary);
// 		}

// 		function rand(min, max) {
// 			return Math.floor(Math.random() * (max - min) + min);
// 		  }
		
// 		console.log('H', songs);
// 		console.log('J', songs[rand(0,songs.length-1)].Conc);
// 	}
// });

// let songs_ = [
// 	{
// 		Song: "Two Weeks",
// 		Artist: "FKA Twigs",
// 		Year: 2014
// 	}
// ];
// let headers_ = ["Song", "Artist", "Year"]
// let data_ = ["Just Like Heaven", "The Cure", 1987]

// function add_thing() {
// 	let dictionary = {};

// 	for (let i = 0; i < data_.length; i++) {
// 		dictionary[`${headers_[i]}`] = data_[i];
// 	}

// 	songs_.push(dictionary);

// 	console.log('D', songs_);
// }

// add_thing();