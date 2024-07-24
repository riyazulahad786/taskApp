// import React from 'react'

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Home() {
  const navigate=useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    toast.success("logout successfully");
    navigate('/register')

  }
  
  return (
    <div className="container mt-5">
  
     <div className="d-flex justify-content-between align-items-center">
     <button className="btn btn-primary mx-5 shadow">
        Create Task{" "}
        <img
          className="create mx-2"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAADAUlEQVR4nO2Zz0tUURTHP4yTIbnItEXqaiLal6V/QRHaRiTalP0PQpZStqhsmWi0KRqSViVELV2U6D+QuNIRyiK10q3ZxrhwBg6XO2/evfNm3hTzhQOPee98zz3v3Xt+DTTQQANJIAP0AWPAHLAC7AJ/RHbltzfAbaBXdFJHNzAJfAMOPOUr8BDoSmPh7cBTYD9g4bb8Bp4Ax2q1+KvAL8dCvgPPgGvAGXHykEgHcBa4DjwHNh36P4Er1Vx4Vt66bfgD0A80eXINAB8dfDNyP1G0AO8tQ6vAhQS4LwFrFvc7sZkIso7F54EjSRkAWoGXDicS+RL2trlD9XDXsjWdxIGt1eJLOTFEINqtaGO2Ta0wq+z+ANoq3TqrAXv+NLABfAZOBZyJQiVbqdtKUhd9CaSsKOqb8iEkOh2oZNfpozxpxfkQ3FMc5joEC4rjQVylJqu2MUkqLQcGFMeXuAVgn1UeZFN0IAtsKZ7zcZTGlYKpbUjRAYMXimeUGJhTCqYwS9uBYcXzOo7CilIwVWXaDvQonuU4CjtKwSSzUjgJjMhndcm84pmPeG4EyEXYOW6V3GWh439zxHM60VQqhQg7h6188P87sBNzC+UkYj0qIUuKZyniufGkt5A+xKYNTPsQn/M9xDqMmh42bQdu+IbRsTpLZHnFczOOQq9S2KyDUmJb8ZicUBYZGTrVQzF3OaSYQyZmRUUz+kjLgUXFcd9HsUtiblHZNBe+GPUtwiz0K/0934YGGfcVCdakzfNBThJUoUycd8HYWlf2pwhAuySOIomZ29QKr5Td7dCmHplV6pRvRh7VxoRlc7BSwpkaOjFh2XqcBGlWxnyaeDbgTESh1do2Rt56Dowj0eJwohAYnVzRZt2x+MSGu/pLTDtK4QWZHvhk7KwkqUUH31SSb96FISu9F2VLGvBhSfkd0k80y3WPFGb5CP1BaoQ2+Ro62YXKnrz1o6SATpmYbQQs3NQ2pjw4QR0gI0OnW1KzL0tnty9irj/JvVFpUurib9YGGuAfx18eKsRFV7jUgwAAAABJRU5ErkJggg=="
        ></img>
      </button>
      <div className="btn btn-danger mx-3" onClick={logout}>Logout</div>
     </div>

      <div className="row border mt-3">
           <div className="col-lg-4 border d-flex justify-content-center align-items-center">
               <p>Todo</p>
           </div>
           <div className="col-lg-4 border d-flex justify-content-center align-items-center">
               <p>In progress</p>
           </div>
           <div className="col-lg-4 border d-flex justify-content-center align-items-center">
               <p>Completed</p>
           </div>
      </div>
    </div>
  );
}

export default Home;
