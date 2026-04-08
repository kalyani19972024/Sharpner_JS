import Modal from "../UI/Modal";
import {useContext} from "react";
import CartContext from "../../store/Cartcontext";

const Cart=(props)=>{
    const CartCtx=useContext(CartContext);

     const totalAmount = `${CartCtx.totalAmount}`;

      const hasItems = CartCtx.items.length > 0;

       const cartItemRemoveHandler = (id) => {
        CartCtx.removeItem(id); // This calls the handler in your Provider
  };


    const Cartitems= <ul className="d-flex justify-content-between border-bottom py-2">
        {CartCtx.items.map((item)=>(
        <li className="fw-bolder" key={item.id}>
         <div>
            <span className="fw-bolder fs-5 d-block">{item.name}</span>
            <div className="d-flex gap-3">
              <span className="text-danger fw-bold">${item.price}</span>
              <span className="border px-2 rounded fw-bold">x {item.amount}</span>
            </div>
          </div>
          <div className="d-flex gap-2">
            {/* Pass item.id to remove */}
            <button className="btn btn-sm btn-outline-danger" onClick={() =>cartItemRemoveHandler(item.id)}>−</button>
            
            {/* Pass the actual 'item' object to add */}
            {/* <button className="btn btn-sm btn-outline-danger" onClick={() => cartItemAddHandler(item)}>+</button> */}
          </div>
        </li>
        
    ))}
    </ul>
 return (
    <Modal onHide={props.onHide}>
        {Cartitems}
        <div className="d-flex justify-content-between fw-bold mt-3">
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        <div className="justify-content-end d-flex gap-3">
            <button className="btn btn-outline-secondary" onClick={props.onHide}>Close</button>
            {hasItems && <button className="btn btn-danger">Order</button>}
           
        </div>

    </Modal>
 )
}

export default Cart ;