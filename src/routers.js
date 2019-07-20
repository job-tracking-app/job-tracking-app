import React from 'react';
import {Switch, Route} from "react-router-dom"
import About from "./components/About/About"
import Contact from "./components/Contact/Contact" 
import Faq from "./components/Faq/Faq"
import Home from "./components/Home/Home"
import Login from "./components/Login/Login"
import Profile from "./components/Profile/Profile"
import Register from "./components/Register/Register"

export default(
    <Switch>
        <Route exact path = "/" component = {Home}/>
        <Route path = "/about" component = {About}/>
        <Route path = "/faq" component = {Faq}/>
        <Route path = "/contact" component = {Contact}/>
        <Route path = "/login" component = {Login}/>
        <Route path = "/register" component ={Register}/>
        <Route path ="/profile" component = {Profile}/>
    </Switch>
)