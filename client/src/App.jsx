import React, {useState, useContext } from 'react'
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar.jsx"
import Home from "./pages/Home.jsx"
import BuyCredit from "./pages/BuyCredit.jsx"
import Result from "./pages/Result.jsx"
import Footer from "./components/Footer.jsx"
import Login from "./components/Login.jsx"
import {AppContext} from "./context/AppContext.jsx"

const App = ()=>{
  
  const {setShowLogin, showLogin} = useContext(AppContext)
  
  return (
    <>
      <ToastContainer position="bottom-right" />
      {showLogin?
        (<Login setShowLogin={setShowLogin}/>):(
        
      <div className="px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b from-teal-50 to-orange-50">
        <Navbar setShowLogin={setShowLogin}/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/result" element={<Result/>}/>
          <Route path="/buy" element={<BuyCredit/>}/>
        </Routes>
        <Footer/>
      </div>
        )
      }
    </>
  )
}

export default App
