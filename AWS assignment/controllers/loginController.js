
const User=require('../models/User');
const bcrypt = require('bcrypt');

exports.login= async(req,res)=> {

     const {email,password}=req.body ;

     try{
        const user= await User.findOne({where:{email}});
        if(!user){
            return res.status(401).json({message:'User not found'});
        }
         
        const isMatch= await bcrypt.compare(password, user.password);
        if(!isMatch){
             return res.status(401).json({message:'incorrect password'});
        }

        res.status(201).json({message:'Login successful'});
     }catch(err){
        console.error('Login error:',err);
        res.status(500).json({ message: 'Something went wrong.' });
     }

}