import React, { useState, useContext } from 'react'
import {assets} from "../assets/assets.js"
import { Link, useNavigate } from 'react-router-dom';
import {AppContext} from "../context/AppContext.jsx"

const Navbar = ({setShowLogin}) =>{
  
  const [open, setOpen] = useState(false);
  const { logout, credit, user, token } = useContext(AppContext);
  const navigate = useNavigate()
  
  return (
    <div className="flex items-center justify-between py-4">
      <Link to="/">
        <img src={assets.logo} alt="" className="w-28 sm:w-32 lg:w-40" />
      </Link>
      
      <div>
        {user?
        <div className="flex items-center gap-2 sm:gap-3">
          <button onClick={()=>navigate("/buy")} className="flex items-center gap-2 bg-blue-100 px-4 sm:px-6 py-1.5 sm:py-3 rounded-full hover:scale-105 transition-all duration-700">
            <img src={assets.credit_star} />
            <p className="text-xs sm:text-sm font-medium text-grey-600 ">Credits left: {credit}</p>
          </button>
          <p className='text-grey-600 max-sm:hidden pl-4'>Hi, {user?.name}</p>

          <div className="relative">
            <img
              src={assets.profile_icon}
              className="w-10 cursor-pointer"
              onClick={() => setOpen(!open)}
              alt="Profile"
            />
          
            {open && (
              <div className="absolute right-0 mt-2 z-10">
                <ul className="bg-white rounded-md border shadow-lg text-sm">
                  <li onClick={logout} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        :
        <div className="flex items-center gap-2 sm:gap-5">
          <p onClick = {()=>navigate("/buy")} className="cursor-pointer">Pricing</p>
          <button onClick={()=>setShowLogin(true)} className="bg-zinc-800 text-white px-7 py-2 sm:px-10 text-sm rounded-full">Login</button>
        </div>
        }
      </div>
    </div>
  )
}

export default Navbar