import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart'

function App() {
  return (
    <>
       <Cart/>
       <Navbar/>
       <main>
           <Meals/>
       </main>
       
    </>
  );
}

export default App;
