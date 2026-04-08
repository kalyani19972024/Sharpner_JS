import { useState } from "react";
import { useContext } from "react";
import CartContext from "../store/Cartcontext";

function Navbar(props) {

   

    const Cartctx = useContext(CartContext);

     //const items=Cartctx.items || [] ;

    const numberOfCartItems = Cartctx.items.reduce((curNumber, item) => {
        console.log(curNumber);
        console.log(item.amount);
        return curNumber + item.amount;
    }, 0);
    return (
        <div>
            <nav className="d-flex justify-content-between align-items-start p-3 px-4 bg-danger text-white">
                <h1>Reactmeals</h1>
                <div >
                    <button className=" text-light bg-dark btn btn-secondary btn-lg   position-relative" onClick={props.onShow}>🛒 Your Cart
                        <div
                            className="rounded-circle bg-danger text-white"
                            style={{
                                display: 'inline-block',
                                width: '30px',
                                height: '30px',
                                borderRadius: '50%',
                                textAlign: 'center',
                                lineHeight: '30px',
                                marginLeft: '10px', // spacing from text
                                fontSize: '14px'
                            }}
                        >
                            {numberOfCartItems}
                        </div>

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

export default Navbar;