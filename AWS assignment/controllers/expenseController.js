
const Expense = require('../models');

exports.addExpense = async (req, res) => {
  const { amount, description, category } = req.body;
   const userId = req.user.id;
  try {
    const expense = await Expense.create({ amount, description, category , UserId: userId,});

    res.status(201).json(expense);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error adding expense' });
  }
};

exports.getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll();
    res.json(expenses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching expenses' });
  }
};

exports.deleteExpense = async (req, res) => {
    const expenseId = req.params.id;
  const userId = req.user.id;

  try {
    const deleted = await Expense.findBypk(expenseId);
   if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    if (expense.UserId !== userId) {
      return res.status(403).json({ message: 'Not authorized to delete this expense' });
    }

    await expense.destroy();
    res.json({ message: 'Expense deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting expense' });
  }
};


