
const { DataTypes } = require('sequelize');
const sequelize = require("../utils/db");

const GroupInvite = sequelize.define('GroupInvite', {
    id: { 
        type: DataTypes.BIGINT.UNSIGNED, 
        primaryKey: true, 
        autoIncrement: true 
    },
    group_id: { 
        type: DataTypes.BIGINT.UNSIGNED, 
        allowNull: false 
    },
    invited_by: { 
        type: DataTypes.BIGINT.UNSIGNED, 
        allowNull: false 
    },
    invited_user_id: { 
        type: DataTypes.BIGINT.UNSIGNED, 
        allowNull: true 
    },
    token: { 
        type: DataTypes.CHAR(36), 
        allowNull: false, 
        unique: true 
    },
    expires_at: { 
        type: DataTypes.DATE,
         allowNull: false 
        },
    status: {
         type: DataTypes.ENUM('pending','accepted','revoked','expired'), 
         allowNull: false, 
         defaultValue: 'pending'
         }

});
module.exports=GroupInvite ;