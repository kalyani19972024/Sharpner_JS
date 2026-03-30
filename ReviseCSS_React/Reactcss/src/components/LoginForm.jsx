import {useState} from "react" ;

function LoginForm(){
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    const formHandler=(event)=>{
         event.preventDefault();
         console.log(email,password);
    }
   return (
    <div className="container mt-5">
        <div className="card p-4 shadow">
            <h3 className="text-center mb-3">Login</h3>

            <form onSubmit={formHandler}>
                <input type="email" className="form-control mb-3" placeholder="Type email" value={email}
                onChange={(e)=>{setEmail(e.target.value)}}/>
                <input type="password" className="form-control mb-3" placeholder="Type Password" value={password}
                onChange={(e)=>{setPassword(e.target.value)}}/>
            </form>
            <button className="btn btn-primary w-100">
                Login
            </button>
        </div>

    </div>
   )
}

export default LoginForm ;