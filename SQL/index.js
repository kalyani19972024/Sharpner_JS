
const express=require('express');
const mysql=require('mysql2');
const app=express() ;

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

const creationQuery=`create table Students(
      id  INT  AUTO_INCREMENT  PRIMARY KEY ,
      name  VARCHAR(20),
      email VARCHAR(20)
)`

connection.execute(creationQuery,(err) => {
    if(err){
        console.log(err);
        connection.end();
        return ;
    }
    console.log('Table is created');
})

app.get('/',(req,res)=> {
    res.send('Hello World!');
}

)

app.listen(3100,() => {
    console.log('server is listening');
})