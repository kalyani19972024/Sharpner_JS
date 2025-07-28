// require('dotenv').config();
// const Cashfree = require('cashfree-pg');
// const Order = require('../models/Order');
// const User = require('../models/User');

// // Initialize Cashfree (SANDBOX or PRODUCTION)
// Cashfree.PG.init({
//   clientId: process.env.CASHFREE_APP_ID,
//   clientSecret: process.env.CASHFREE_SECRET_KEY,
//   environment: 'SANDBOX', // change to 'PRODUCTION' in production
// });

// exports.createOrder = async (req, res) => {
//   const userId = req.user.userId;
//   console.log("User trying to buy premium:", req.user);

//   const orderId = `order_${Date.now()}`; // unique order id

//   const orderRequest = {
//     order_id: orderId,
//     order_amount: 99.0,
//     order_currency: 'INR',
//     customer_details: {
//       customer_id: `${userId}`,
//       customer_email: 'test@example.com', // Ideally from user record
//       customer_phone: '9999999999',       // Ideally from user record
//     },
//   };

//   try {
//     const response = await Cashfree.PG.Orders.create(orderRequest);
//     console.log("Cashfree Order Response:", response);

//     await Order.create({
//       orderid: orderId,
//       status: 'PENDING',
//       userId,
//     });

//     res.status(200).json({ payment_link: response.payment_link, orderId });
//   } catch (err) {
//     console.error('Create order error:', err);
//     res.status(500).json({ message: 'Failed to create Cashfree order' });
//   }
// };

// exports.updateOrderStatus = async (req, res) => {
//   const { orderId, paymentStatus } = req.body;

//   try {
//     const order = await Order.findOne({ where: { orderid: orderId } });

//     if (!order) {
//       return res.status(404).json({ message: 'Order not found' });
//     }

//     order.status = paymentStatus;
//     await order.save();

//     if (paymentStatus === 'PAID' || paymentStatus === 'SUCCESS') {
//       const user = await User.findByPk(order.userId);
//       user.isPremium = true;
//       await user.save();
//     }

//     res.status(200).json({ message: 'Order status updated successfully' });
//   } catch (err) {
//     console.error('Update order status error:', err);
//     res.status(500).json({ message: 'Failed to update order status' });
//   }
// };
