import React, {useContext} from "react";
import { plans, assets } from "../assets/assets.js";
import {AppContext} from "../context/AppContext.jsx"
import {motion} from "motion/react"
import {useNavigate} from "react-router-dom"
import axios from "axios"

const BuyCredit = () => {
  
  const {user, backendUrl, loadCreditsData, token, setShowLogin} = useContext(AppContext)
  
  const navigate = useNavigate()
  
  const initPay = async (order) =>{
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID, 
      amount: order.amount,
      currency: order.currency,
      name: "Credits Payment",
      description: "Credits Payment",
      order_id: order.id, 
      receipt: order.receipt,
      handler: async (response)=>{
        try{
          const {data} = await axios.post(backendUrl+"/api/user/verify-razor", response, {headers: {token}})
          if (data.success){
            loadCreditsData()
            navigate("/")
            toast.success("Credit Added Successfully")
          }
        }catch(error){
          toast.error(error.message)
        }
      }
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }
  const paymentRazorpay = async (planId) =>{
    try{
      if (!user) {
        setShowLogin(true)
      }
      
      const {data}  = await axios.post(backendUrl+"/api/user/pay-razor", {planId}, {headers: {token}})
      
      if (data.success){
        initPay(data.order)
      }
      
    }catch(error) {
      toast.error(error.message)
    }
  }
  
  return (
    <motion.div 
    initial={{opacity: 0.2, y:100}}
    transition={{duration:1}}
    whileInView={{opacity:1, y:0}}
    viewport={{once:true}}
    className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <button className="px-6 py-2 rounded-full border border-indigo-500 text-indigo-600 font-medium hover:bg-indigo-500 hover:text-white transition duration-300">
          Our Plans
        </button>

        <h1 className="mt-6 text-4xl font-bold text-gray-800">
          Choose Your Perfect Plan
        </h1>

        <p className="mt-3 text-gray-500 max-w-2xl mx-auto">
          Purchase credits and generate amazing AI images. Choose the plan
          that best suits your needs.
        </p>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex justify-center">
                <div className="bg-indigo-100 p-4 rounded-full">
                  <img
                    src={assets.logo_icon}
                    alt="Plan"
                    className="w-10 h-10"
                  />
                </div>
              </div>

              <h2 className="mt-6 text-2xl font-bold text-gray-800">
                {item.id}
              </h2>

              <p className="mt-2 text-gray-500">{item.desc}</p>

              <div className="my-8">
                <span className="text-5xl font-bold text-indigo-600">
                  ${item.price}
                </span>
                <p className="text-gray-500 mt-2">
                  {item.credits} Credits
                </p>
              </div>

              <button onClick={()=>paymentRazorpay(item.id)} className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition duration-300">{user?"Purchase":"Get Started"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default BuyCredit;