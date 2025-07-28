

const User = require('../models/User');
const Expense = require('../models/Expense');

User.hasMany(Expense);
Expense.belongsTo(User);

module.exports = { User, Expense };
