import React from 'react';
import './Navbar.scss';
import {Link} from "react-router-dom"
function Navbar() {
  return (
    <header>
        <h2>Logo</h2>
        <nav>
            <Link to = "/" >Home</Link>
            <Link to = "/about" >About</Link>
            <Link to = "/faq" >FAQ</Link>
            <Link to = "/contact" >Contact</Link>
            <Link to = "/login" >Login</Link>
            <Link to = "/register">Register</Link>
         </nav>
    </header>
  );
}

export default Navbar;