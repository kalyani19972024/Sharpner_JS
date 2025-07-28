

const User = require('../models/User');
const Expense = require('../models/Expense');

User.hasMany(Expense, { foreignKey: 'userId' });
Expense.belongsTo(User, { foreignKey: 'userId' });

module.exports = { User, Expense };
