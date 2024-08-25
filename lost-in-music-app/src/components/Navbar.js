// Updated code for Navbar.js
import React from 'react';
import './Navbar.css';
import {Link} from "react-router-dom";

function Navbar() {
  return (
    <div className='navigation-menu'>
        <ol>
            <li><Link to={"/"}>Song Randomizer</Link></li>
            <li><Link to={"/DescTool"}>Descriptor Tool</Link></li>
            <li><Link to={"/about"}>About</Link></li>


        </ol>
    </div>

  )
}

export default Navbar
