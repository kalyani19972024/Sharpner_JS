
import { Navbar } from 'react-bootstrap';
import './App.css'

// import Card from './components/Card' ;
import Mynavbar from './components/Navbar' ;
import LoginForm from './components/LoginForm';
import Footer from './components/Footer'

function App() {

  return (
    <div className='app-container' >
      <Mynavbar title='Home'/>
      {/* <Card image={ReactImg} title="React" description="Build modern UI easily"/>
      <Card image={ReactImg} title="CSS" description="Make your UI beautiful"/> */}
      <LoginForm/>
      <Footer/>
    </div>
   
  )
}

export default App
