import UserForm from "./UserForm";

const Mealitem=(props)=>{
    const price=`$${props.price.toFixed(2)}` ;
  return (
    <li className="border-bottom ">
         <div>
            <h4 className="font-weight-bold">{props.name}</h4>
            <div className="font-italic">{props.description}</div>
            <div className="text-danger">{price}</div>
         </div>
         <div className="justify-content-end d-flex ms-auto text-align-right ">
             <UserForm/>
         </div>
    </li>
   
  )
}

export default Mealitem ;