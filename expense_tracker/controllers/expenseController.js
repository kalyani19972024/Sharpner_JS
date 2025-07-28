const { Expense } = require('../models');

exports.addExpense = async (req, res) => {
  const { amount, category } = req.body;
  const userId = req.userId;

  try {
    const expense = await Expense.create({ amount, category, UserId: userId });
    res.status(201).json({ expense });
  } catch (err) {
    res.status(500).json({ message: 'Error adding expense', error: err.message });
  }
};

exports.getExpenses = async (req, res) => {
  const userId = req.userId;

  try {
    const expenses = await Expense.findAll({ where: { UserId: userId } });
    res.json({ expenses });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching expenses', error: err.message });
  }
};
