
const User=require('./User');
const Bus=require('./Bus');
const Booking=require('./Booking');

User.hasMany(Booking);
Booking.belongsTo(User);


Bus.hasMany(Booking);
Booking.belongsTo(Bus);

module.exports={
    User,Bus,Booking
};