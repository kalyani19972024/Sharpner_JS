
const {Sequelize,DataTypes}=require('sequelize');
const sequelize=require('../utils/db-connection1');

const courses=sequelize.define('courses',{
    id:{
        primaryKey:true ,
        autoIncrement:true,
        type:DataTypes.INTEGER
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    }
})

module.exports=courses ;