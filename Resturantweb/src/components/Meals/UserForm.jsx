
const UserForm=()=>{
 return (
    <form className="d-flex flex-column align-items-end">
        <div className="d-flex align-items-center gap-2 mb-1">
             <label htmlFor="amount" >Amount</label>
             <input id="amount" type="number" name="amount"  min="1"
               defaultValue="0"
               className="form-control form-control-sm"
               style={{ width: "60px" }}/>
              <br></br>
        </div>
       
         <button className="bg-danger text-white  btn-sm ">+Add</button>
    </form>
 )
}

export default UserForm ;