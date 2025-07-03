 const {sendErrorResponse, sendResponse}= require('../utils/response');

exports.getUser=(req,res)=> {
    const user=req.params.user ; //simulating that no user was found

    if(user>10){
       return  sendErrorResponse(res,{message:'user not found', statusCode:404});
    }
    res.json(user);
    return sendResponse(res,user,200);
};


exports.createUser=(req,res)=> {
     const{name,email} = req.body ;

     if(!name || !email){
        return sendErrorResponse(res,{message:'Name and Email are required',statusCode:400});
     }

     //simulate creation
     const user={id:1,name,email};
     return sendResponse(res,user,201);
};