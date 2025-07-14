
const Expense=require('../model/expense');

exports.addExpense= async(req,res)=> {
    try{
         const {amount,description,category}=req.body ;
         const expense=await Expense.create({amount,description,category});
         res.status(201).json(expense);
    }catch(err){
          res.status(500).json({err:"failed to add expense"});
    }
};

exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll();
    res.status(200).json(expenses);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch expenses' });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    await Expense.destroy({ where: { id } });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete expense' });
  }
};

exports.editExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, description, category } = req.body;
    await Expense.update({ amount, description, category }, { where: { id } });
    const updated = await Expense.findByPk(id);
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to edit expense' });
  }
};


