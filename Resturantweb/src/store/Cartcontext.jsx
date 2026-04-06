import React from "react";

const CartContext=React.createContext({
    items:[],
    totalAmount:0,
    additem:()=>{},
    removeItem:()=>{}
})



export default CartContext ;