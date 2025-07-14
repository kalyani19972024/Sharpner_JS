
const User=require('../models/User');

const adduser= async (req,res)=> {
    try{
       const {name,email}=req.body ;
       const user= await User.create({ name, email });
       res.status(201).json(user);
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
}

const getUserBookings = async (req, res) => {
  try {
    const { Booking, Bus } = require('../models');
    const bookings = await Booking.findAll({
      where: { userId: req.params.id },
      include: [{ model: Bus, attributes: ['busNumber'] }]
    });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports={
    adduser,getUserBookings
}