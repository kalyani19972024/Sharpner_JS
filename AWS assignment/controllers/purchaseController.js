const Razorpay = require('razorpay');


exports.purchasePremium = async(req, res) => {

  console.log("***************");
  try{
    var rzp = new Razorpay({
      key_id:process.env.RAZORPAY_KEY_ID,
      key_secret:process.env.RAZORPAY_KEY_SECRET
    })

    const amount = 2500 * 100;

    const order = await rzp.orders.create({ amount, currency: "INR" }); // ✅ use await

    await req.user.createOrder({ orderId: order.id, status: "PENDING" });

    return res.status(201).json({ order, key_id: rzp.key_id });

    // rzp.orders.create({amount,currency:"INR"},(err,o)=>{

    //   if(err){
    //     throw new Error(JSON.stringify(err));
    //   }

    //   req.user.createOrder({orderid:o.id,status:"PENDING"}).then(() => {
    //     return res.status(201).json({o, key_id:rzp.key_id})
    //   })

    // })
  
  }
  catch(error) {
    console.error('Error while purchasing:', error);
    return res.status(403).json({ message: 'Something went wrong', error: error });
  }
}
