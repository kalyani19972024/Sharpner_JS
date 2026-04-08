import {useState,useContext} from 'react';
import CartContext from '../../store/Cartcontext';

const UserForm=(props)=>{
   const[amount,setAmount]=useState(0);
   const CartCtx = useContext(CartContext);   



   const handleSubmit=(event)=>{
      event.preventDefault();

      const newItem = {
      id: props.id,       // Ensure these props are passed from the parent (MealItem)
      name: props.name,
      price: props.price,
      amount: Number(amount)
    };
     console.log(newItem.id , newItem.name);

    if (newItem.amount > 0) {
      CartCtx.addItem(newItem); // This triggers addItemToCartHandler in your Provider
    }
      
   }

 return (
    <form className="d-flex flex-column align-items-end" onSubmit={handleSubmit}>
        <div className="d-flex align-items-center gap-2 mb-1">
             <label htmlFor="amount" >Amount</label>
             <input id="amount" type="number" name="amount"  min="1"
                value={amount} onChange={(e) => setAmount(e.target.value)}
               className="form-control form-control-sm"
               style={{ width: "60px" }}/>
              <br></br>
        </div>
       
         <button className="bg-danger text-white  btn-sm ">+Add</button>
    </form>
 )
}

export default UserForm ;