
const express= require('express');
const mysql=require('mysql2');
const app=express();

const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Kalyani@123',
    database:'testdb'
});

connection.connect((err) => {
    if(err){
        console.log(console.error);
        return ;
    }
    console.log('connection has been created');
})

const createUserstable=`create table Users(
      id  INT  AUTO_INCREMENT  PRIMARY KEY ,
      name  VARCHAR(20),
      email VARCHAR(20)
)`;

const createBusestable=`create table Buses(
     id INT AUTO_INCREMENT  PRIMARY KEY,
     busNumber VARCHAR(50) NOT NULL,
     totalSeats INT NOT NULL,
     availableSeats INT NOT NULL
)`;

const createBookingstable=`create table Bookings(
    id INT AUTO_INCREMENT PRIMARY KEY ,
    seatNumber  INT NOT NULL 
)`;

const createPaymentstable=`create table Payments(
       id INT AUTO_INCREMENT PRIMARY KEY ,
       amountPaid INT NOT NULL,
       paymentStatus VARCHAR(20) NOT NULL
)`;

  connection.query(createUserstable, (err) => {
        if (err) throw err;
        console.log("Users table created");

        connection.query(createBusestable, (err) => {
            if (err) throw err;
            console.log("Buses table created");

            connection.query(createBookingstable, (err) => {
                if (err) throw err;
                console.log("Bookings table created");

                connection.query(createPaymentstable, (err) => {
                    if (err) throw err;
                    console.log("Payments table created");
                });
            });
        });
    });




 app.listen(3200,() => {
    console.log('server is listening');
})