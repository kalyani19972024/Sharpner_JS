
const { User} = require('../models/User');
const {Expense}=require('../models/Expense');
const Sequelize = require('sequelize');

exports.getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await User.findAll({
      attributes: ['id', 'name', [Sequelize.fn('SUM', Sequelize.col('expenses.amount')), 'totalExpenses']],
      include: [{ model: Expense, attributes: [] }],
      group: ['User.id'],
      order: [[Sequelize.literal('totalExpenses'), 'DESC']]
    });

    res.status(200).json(leaderboard);
  } catch (err) {
    console.error('Leaderboard error:', err);
    res.status(500).json({ message: 'Failed to fetch leaderboard' });
  }
};
