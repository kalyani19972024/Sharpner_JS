import CartContext from './Cartcontext';
import {useState} from "react" ;

const CartProvider=(props)=>{
    const [items,setItems]=useState([]) ; // array of cart items 
    const[totalAmount,setTotalAmount]=useState(0) ;

    const addItemToCartHandler=(item)=>{
           setItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(it => it.id === item.id);
      const existingItem = prevItems[existingItemIndex];

      let updatedItems;

      if (existingItem) {
        // Increase the amount
        const updatedItem = {
          ...existingItem,
          amount: existingItem.amount + item.amount,
        };
        updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = updatedItem;
      } else {
        // Add new item
        updatedItems = prevItems.concat(item);
      }
      return updatedItems;
    });

    // Update total amount
    setTotalAmount((prevTotal) => prevTotal + item.price * item.amount);
    }


    const removeItemFromCartHandler=(id)=>{
          setItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(it => it.id === id);
      const existingItem = prevItems[existingItemIndex];

      if (!existingItem) return prevItems; // Item not found

      let updatedItems;

      if (existingItem.amount === 1) {
        // Remove item
        updatedItems = prevItems.filter(it => it.id !== id);
      } else {
        // Decrease amount
        const updatedItem = {
          ...existingItem,
          amount: existingItem.amount - 1,
        };
        updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = updatedItem;
      }

      // Update total amount
      setTotalAmount((prevTotal) => prevTotal - existingItem.price);
      return updatedItems;
    });
    }
    const cartContext={
        items:items,
        totalAmount:totalAmount,
        addItem:addItemToCartHandler,
        removeItem:removeItemFromCartHandler
    }
   return (
       <CartContext.Provider value={cartContext}>
        {props.children}
       </CartContext.Provider>
   )
}

export default CartProvider;