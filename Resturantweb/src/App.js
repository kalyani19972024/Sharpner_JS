import logo from './logo.svg';
import './App.css';
import {useState} from "react" ;
import Navbar from './components/Navbar';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart'

function App() {
   const [isCartOpen,setIsCartOpen]=useState(false) ;

   const showCartHandler=()=>{
    setIsCartOpen(true);
   }

   const hideCartHandler=()=>{
    setIsCartOpen(false);
   }

  return (
    <>
       {isCartOpen && <Cart onHide={hideCartHandler}/>}
       <Navbar onShow={showCartHandler}/>
       <main>
           <Meals/>
       </main>
       
    </>
  );
}

export default App;
