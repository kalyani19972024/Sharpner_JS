import Modal from "../UI/Modal";

const Cart=(props)=>{
    const Cartitems= <ul className="d-flex justify-content-between border-bottom py-2">
        {[{id:'c1',name:'Sushi',amount:2,price:12.99}].map((item)=>(
        <li className="fw-bolder">{item.name}</li>
    ))}
    </ul>
 return (
    <Modal>
        {Cartitems}
        <div className="d-flex justify-content-between fw-bold mt-3">
            <span>Total Amount</span>
            <span>35.62</span>
        </div>
        <div className="justify-content-end d-flex gap-3">
            <button className="btn btn-outline-secondary">Close</button>
            <button className="btn btn-danger">Order</button>
        </div>
    </Modal>
 )
}

export default Cart ;