
const { DataTypes } = require('sequelize');
const sequelize = require("../utils/db");

  const GroupReadState = sequelize.define('GroupReadState', {
    id: { 
        type: DataTypes.BIGINT.UNSIGNED, 
        primaryKey: true, 
        autoIncrement: true 
    },
    group_id: {
         type: DataTypes.BIGINT.UNSIGNED, 
         allowNull: false 
    },
    user_id: { 
        type: DataTypes.BIGINT.UNSIGNED,
         allowNull: false
     },
    last_read_message_id: {
         type: DataTypes.BIGINT.UNSIGNED, 
         allowNull: false,
          defaultValue: 0 
        }
});
module.exports=GroupReadState ;