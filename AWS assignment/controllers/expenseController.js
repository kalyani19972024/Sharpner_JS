
const Expense = require('../models/Expense');

exports.addExpense = async (req, res) => {
  const { amount, description, category } = req.body;

  try {
    const expense = await Expense.create({ amount, description, category });
    res.status(201).json(expense);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error adding expense' });
  }
};
