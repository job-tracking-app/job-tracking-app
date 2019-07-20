import React from 'react';
import './App.css';
import {BrowserRouter} from "react-router-dom"
import routes from "./routers"
import Navbar from "./components/Navbar/Navbar"
import Footer from "./components/Footer/Footer"

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      {routes}
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
