
const {Sequelize}=require('sequelize');

const sequelize=new Sequelize('jobdb', 'root', 'Kalyani@123',{
     host:'localhost',
     dialect:'mysql'
});

module.exports=sequelize ;