
const User=require('../models/User');
//const bcrypt = require('bcrypt');

exports.login= async(req,res)=> {

     const {email,password}=req.body ;

     try{
        const user= await User.findOne({where:{email}});
        console.log(user)
        if(!user){
            return res.status(401).json({message:'User not found'});
        }
        console.log('Stored Password:', user.password);
        console.log('Entered Password:', password);
         
        if (user.password !== password) {
            return res.status(401).json({ message: 'Incorrect password.' });
        }
       res.status(201).json({message:'Login successful'});
     }catch(err){
        console.error('Login error:',err);
        res.status(500).json({ message: 'Something went wrong.' });
     }

}