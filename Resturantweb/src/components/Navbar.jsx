import { useState } from "react";

function Navbar(props){

   
 return (
    <div>
        <nav class="d-flex justify-content-between align-items-start p-3 px-4 bg-danger text-white">
        <h1>Reactmeals</h1>
           <div >
            <button class=" text-light bg-dark btn btn-secondary btn-lg   position-relative" onClick={props.onShow}>🛒 Your Cart
                <button class="rounded-circle bg-danger text-white" >
                    3
                </button>
            </button>
           </div>
        </nav>
         
         {/* //for image */}
        <div>
            <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836"
            alt="food" className="img-fluid w-100" style={{ height: "500px", objectFit: "cover" }}></img>
        </div>
    </div>
    
 )
}

export default Navbar ;