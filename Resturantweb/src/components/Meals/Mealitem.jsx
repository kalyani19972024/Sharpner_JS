import {useState} from "react";
import UserForm from "./UserForm";


const Mealitem=(props)=>{

  const [cartItems,setCartItems]=useState([]);

  const handleAddItem=(item)=>{
     setCartItems([...cartItems,item]);
  }

    const price=`$${props.price.toFixed(2)}` ;
  return (
    <li className="border-bottom ">
         <div>
            <h4 className="font-weight-bold">{props.name}</h4>
            <div className="font-italic">{props.description}</div>
            <div className="text-danger">{price}</div>
         </div>
         <div className="justify-content-end d-flex ms-auto text-align-right ">
             <UserForm id={props.id} name={props.name} price={props.price} onAdd={handleAddItem} 
             />
             
         </div>
    </li>
   
  )
}

export default Mealitem ;