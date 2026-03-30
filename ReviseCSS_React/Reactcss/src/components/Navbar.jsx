import Cadbury_logo_new from "../assets/Cadbury_logo_new.jpg" ;

function Mynavbar(){
 return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
       <div className="container-fluid">
          <a href="#" className="navbar-brand text-warning fw-bold">
             <img src={Cadbury_logo_new} width={80} alt="logo"/>
            Cadbury</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
             <span className="navbar-toggler-icon"></span>
          </button>
          <div id="navabarNav" className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto">
                
                <li className="nav-item">
                    <a href="#" className="nav-link">Home</a>
                </li>
                <li className="nav-item">
                    <a href="#" className="nav-link">About</a>
                </li>
            </ul>
            <form className="d-flex ms-3">
                    <input className="form-control me-2"/>
                    <button className="btn btn-outline-light" type="submit" placeholder="search...">button</button>
                </form>
          </div>
       </div>
    </nav>
   
 )
}

export default Mynavbar ;