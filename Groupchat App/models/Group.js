
const { DataTypes } = require('sequelize');
const sequelize = require("../utils/db");

  const Group = sequelize.define('Group', {
    id: { 
        type: DataTypes.BIGINT.UNSIGNED, 
        primaryKey: true, 
        autoIncrement: true 
    },
    name: { 
        type: DataTypes.STRING(120), 
        allowNull: false 
    },
    owner_id: { 
        type: DataTypes.BIGINT.UNSIGNED, 
        allowNull: false 
    },
    description: { 
        type: DataTypes.STRING(240), 
        allowNull: true 
    },
    is_private: { 
        type: DataTypes.BOOLEAN, 
        allowNull: false, 
        defaultValue: true 
    }
});

module.exports=Group ;

  