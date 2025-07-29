const User = require('../models/User');
const Expense = require('../models/Expense');

// ✅ Add Expense
exports.addExpense = async (req, res) => {
  const { amount, description, category } = req.body;
  const userId = req.user.id; // From token
  console.log("userID****", userId)
  try {
    const expense = await Expense.create({ amount, description, category, UserId: userId });

    const user = await User.findByPk(userId);
    user.totalExpense = (user.totalExpense || 0) + Number(amount);
    await user.save();
     res.status(201).json({ expense, totalExpense: user.totalExpense });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add expense' });
  }
};

// ✅ Get All Expenses of Logged-in User
exports.getAllExpenses = async (req, res) => {
  const userId = req.user.id;
console.log('req.user:', req.user);

  try {
    console.log('Fetching expenses for userId:', userId);
    const expenses = await Expense.findAll({ where: { userId } });
    console.log('Expenses found:', expenses);
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch expenses' });
  }
};

// ✅ Update Expense
exports.updateExpense = async (req, res) => {
  const { amount, description, category } = req.body;
   const { id } = req.params;
  // const expenseId = req.params.id;
  // const userId = req.user.userId;

  try {
    const expense = await Expense.findOne({ where: { id, userId: req.user.id } });

    if (!expense) return res.status(404).json({ error: 'Expense not found' });

    expense.amount = amount;
    expense.description = description;
    expense.category = category;

    await expense.save();
   
    res.status(200).json({ message: 'Expense updated successfully', expense });
    
  } catch (error) {
    res.status(500).json({ error: 'Failed to update expense' });
  }
};

// ✅ Delete Expense
exports.deleteExpense = async (req, res) => {
  // const expenseId = req.params.id;
  // const userId = req.user.userId;
  const { id } = req.params;

  try {
    const deleted = await Expense.destroy({ where: { id, userId: req.user.id } });

    if (!deleted) return res.status(404).json({ error: 'Expense not found or not yours' });

    res.status(200).json({ message: 'Expense deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete expense' });
  }
};
