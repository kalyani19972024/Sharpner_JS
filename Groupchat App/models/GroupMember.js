
const { DataTypes } = require('sequelize');
const sequelize = require("../utils/db");

  const GroupMember = sequelize.define('GroupMember', {
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
    role: { 
        type: DataTypes.ENUM('owner','admin','member'), 
        allowNull: false, 
        defaultValue: 'member' 
    },
    status: { 
        type: DataTypes.ENUM('active','left','removed'), 
        allowNull: false,
        defaultValue: 'active' 
    },
    joined_at: {
         type: DataTypes.DATE, 
         allowNull: false, 
         defaultValue: DataTypes.NOW 
        },
    left_at: { 
        type: DataTypes.DATE, 
        allowNull: true }
    });

    module.exports=GroupMember ;
