const {Sequelize}= require('sequelize');

const sequelize=new Sequelize('testdb','root','Kalyani@123',{
       host:'localhost',
       dialect:'mysql'
}) ;

(async ()=> {
    try{

    await sequelize.authenticate();
    console.log("connection to the database has been created");

}
catch(error){
    console.log(error);
    
}
})();

module.exports=sequelize ;























// const mysql=require('mysql2');

// const connection=mysql.createConnection({
//     host:'localhost',
//     user:'root',
//     password:'Kalyani@123',
//     database:'testdb'
// });

// connection.connect((err) => {
//     if(err){
//         console.log(console.error);
//         return ;
//     }
    
//     console.log('connection has been created');
// })

// const creationQuery=`create table IF NOT EXISTS Students(
//       id  INT  AUTO_INCREMENT  PRIMARY KEY ,
//       name  VARCHAR(20),
//       email VARCHAR(50),
//       age INT 
// )`

// connection.execute(creationQuery,(err) => {
//     if(err){
//         console.log(err);
//         connection.end();
//         return ;
//     }
//     console.log('Table is created');
// })

// module.exports=connection ;