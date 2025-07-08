const db=require('../utils/booking');

const addUsers=(req,res) => {
     const {name,email} =req.body ;
     const insertQuery='INSERT INTO USERS (name,email) VALUES (?,?)' ;

     db.execute(insertQuery,[name,email],(err)=> {
        if(err){
            console.log(err.message);
            res.status(500).send(err.message);
            db.end();
            return ;
        }
        console.log('value has been added');
        res.status(200).send(`User with name ${name} successfully added`);
     })
}

const getUsers=(req,res)=> {
    const  getQuery='SELECT * FROM USERS';

    db.execute(getQuery,[name,email],(err,result) => {
         if(err){
            console.log(err.message);
            res.status(500).send(err.message);
            db.end();
            return ;
         }
         res.send(result);
    })
}

const addBuses=(req,res)=> {
    const {busNumber, totalSeats, availableSeats }=req.body ;
    const createQuery='INSERT INTO buses (busName, totalSeats, availableSeats) VALUES (?, ?, ?)';
    
     db.execute(createQuery,[busNumber,totalSeats,availableSeats],(err,result) => {
         if(err){
            console.log(err.message);
            res.status(500).send(err.message);
            db.end();
            return ;
         }
         console.log('Bus has been added');
         res.status(200).send(`Bus with No. ${busNumber} added successfully`);
     })
}

const getBuses=(req,res)=> {
    const seats=parseInt(req.params.seats);
    const  getbusQuery='SELECT * FROM buses WHERE availableSeats > ?' ;

    db.execute(getbusQuery,[seats],(err,result)=> {
        if(err){
            console.log(err.message);
            res.status(500).send(err.message);
            db.end();
            return ; 
        }
        res.send(result);
    })
}


module.exports={
    addUsers,
    getUsers,
    addBuses,
    getBuses
}
