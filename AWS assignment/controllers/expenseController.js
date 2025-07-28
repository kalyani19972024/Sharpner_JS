
const Expense = require('../models/Expense');

// ✅ Add Expense
exports.addExpense = async (req, res) => {
  const { amount, description, category } = req.body;
 console.log("req.user:", req.user);
    console.log("req.body:", req.body);
  const userId = req.user.id; // From token
  console.log("userID****", userId)
  try {
    const expense = await Expense.create({ amount, description, category,  userId });
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add expense' });
  }
};

// ✅ Get All Expenses of Logged-in User
exports.getAllExpenses = async (req, res) => {
 // const userId = req.user.userId;
console.log('req.user:', req.user);

  try {
    const expenses = await Expense.findAll({ where: { userId: req.user.id  } });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch expenses' });
  }
};

// ✅ Update Expense
exports.updateExpense = async (req, res) => {
  const { amount, description, category } = req.body;
  const expenseId = req.params.id;
  const userId = req.user.userId;

  try {
    const expense = await Expense.findOne({ where: { id: expenseId, userId } });

    if (!expense) return res.status(404).json({ error: 'Expense not found' });

    expense.amount = amount;
    expense.description = description;
    expense.category = category;

    await expense.save();

    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update expense' });
  }
};

// ✅ Delete Expense
exports.deleteExpense = async (req, res) => {
  const expenseId = req.params.id;
  const userId = req.user.userId;

  try {
    const deleted = await Expense.destroy({ where: { id: expenseId, userId } });

    if (!deleted) return res.status(404).json({ error: 'Expense not found or not yours' });

    res.status(200).json({ message: 'Expense deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete expense' });
  }
};
