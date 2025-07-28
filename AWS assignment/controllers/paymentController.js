// exports.processPayment = async(req, res) => {
//     const orderId = "ORDER-"+Date.now();
//     const orderAmount = 2000;
//     const orderCurrency = "INR";
//     const customerId = "1";
//     const customerPhone = "1234567890"

//     try {
//         // Create an order  in CashFree and get the patment session id
//         const paymentSessionId = await createOrder(
//             orderId,
//             orderAmount,
//             orderCurrency,
//             customerId,
//             customerPhone,
//         );

//         // Save the payment detals to database
//         await Payment.create({
//           orderId,
//           paymentSessionId,
//           orderAmount,
//           orderCurrency,
//           paymentStatus: "Pending",
//         });
//          res.json({paymentSessionId, orderId})
//     }catch(error) {
//         console.error("Error processing payments", error.message);
//     }  
// }