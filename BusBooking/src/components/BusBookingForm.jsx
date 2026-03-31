import React,{ useState } from "react";

function BusBookingForm(){
    const[formData,setFormData]=useState({name:"",email:"",phone:"",carno:""});
    const[bookings,setBookings]=useState([]);
    const [filter, setFilter] = useState("all");
     
     // Updates specific input fields in state
     const changeHandler=(event)=>{
            const {name,value}=event.target ;
            setFormData({...formData,[name]:value});
     }

     // Adds current form data to the list and resets the form
     const bookingHandler=(event)=>{
          event.preventDefault() ;
          console.log(formData);
          setBookings([...bookings,formData]);
          setFormData({name:" ",email:" ",phone:" ",carno:""});
     }

     const filteredBookings =
  filter === "all"
    ? bookings
    : bookings.filter((item) => item.carno === filter);

 return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
        <form onSubmit={bookingHandler}>
            <h2>Bus Booking</h2>
            <div>
                <select value={filter} onChange={(e)=>setFilter(e.target.value)}>
                    <option value="all">All</option>
                    <option value="bus1">Bus1</option>
                    <option value="bus2">Bus2</option>
                    <option value="bus3">Bus3</option>
                </select>
            </div>
             <br></br>
            <br></br>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" onChange={changeHandler}/>
             <br></br>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" onChange={changeHandler}/>
             <br></br>
            <label htmlFor="phoneno">phone No:</label>
            <input type="tel" id="phone" name="phone" onChange={changeHandler}/>
             <br></br>
            <label htmlFor="carno">Car Number:</label>
            <select id="carno" name="carno" onChange={changeHandler}>
                <option value="bus1">Bus 1</option>
                <option value="bus2">Bus 2</option>
                <option value="bus3">Bus 3</option>
            </select>
            <br></br>
            <br></br>
            <button type="submit" >Book</button>
        </form>

          {filteredBookings.length === 0 && <p>No bookings yet</p>}
        
           {/* {bookings.map((booking,index)=>(
            <div key={index}>
                <p>{booking.name} {booking.email}   {booking.phone}   {booking.carno}   <button>DELETE</button> <button>EDIT</button></p>
              
                </div>    
           ))} */}

           {filteredBookings.map((item, index) => (
            <div key={index} >
                 <p> {item.name}  {item.email} {item.phone} {item.carno}</p>
            </div>
))}
           
        
    </div>
 )
}

export default BusBookingForm ;