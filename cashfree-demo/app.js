// app.js
const express = require("express");
const bodyParser = require("body-parser");
const { Cashfree, CFEnvironment } = require("cashfree-pg"); // install with: npm i cashfree-pg
const { v4: uuidv4 } = require("uuid"); // install with: npm i uuid

const app = express();
const PORT = 3500;

app.use(bodyParser.json());

// ✅ Configure Cashfree SDK (Sandbox credentials)
const cashfree = new Cashfree(
  CFEnvironment.SANDBOX,
  "TEST10732604492a5e13605e17ca939240623701",      // Replace with your App ID
  "cfsk_ma_test_ddb69decdfa580d8628727737dc1b01b_fe65cc7a"   // Replace with your Secret Key
);

// ✅ Serve a basic HTML form to initiate payment
app.get("/", (req, res) => {
  res.send(`
    <h2>Cashfree Payment Demo</h2>
    <form action="/create-order" method="POST">
      <button type="submit">Pay ₹1</button>
    </form>
  `);
});

// ✅ Create Order and redirect to Cashfree checkout
app.post("/create-order", async (req, res) => {
  const orderId = "order_" + Date.now(); // Or use uuidv4();

  const orderRequest = {
    order_id: orderId,
    order_amount: 1.0,
    order_currency: "INR",
    customer_details: {
      customer_id: "user_001",
      customer_email: "test@example.com",
      customer_phone: "9876543210"
    },
    order_meta: {
      return_url: `http://localhost:${PORT}/status?order_id=${orderId}`, // ✅ Correctly inject order ID
      notify_url: `http://localhost:${PORT}/webhook`, // optional
      payment_methods: "cc,dc,upi"
    },
    order_expiry_time: new Date(Date.now() + 20 * 60 * 1000).toISOString() // 20 mins later
  };

  try {
    const response = await cashfree.PGCreateOrder(orderRequest);
    const sessionId = response.data.payment_session_id;

    // ✅ Redirect to Cashfree Checkout Page
    res.redirect(`https://sandbox.cashfree.com/pgapp/v1/checkout/${sessionId}`);
  } catch (err) {
    console.error("Order creation failed:", err.response?.data || err.message);
    res.status(500).send("Order creation failed. See logs.");
  }
});

// ✅ After Payment - Check Order Status
app.get("/status", async (req, res) => {
  const orderId = req.query.order_id;

  try {
    const response = await cashfree.PGFetchOrder(orderId);
    const orderStatus = response.data.order_status;

    res.send(`
      <h2>Payment Status</h2>
      <p>Order ID: ${orderId}</p>
      <p>Status: ${orderStatus}</p>
      <a href="/">Go Home</a>
    `);
  } catch (err) {
    console.error("Failed to fetch order status:", err.response?.data || err.message);
    res.status(500).send("Failed to fetch order status.");
  }
});

// ✅ Optional: Handle notify_url webhook
app.post("/webhook", (req, res) => {
  console.log("Received Webhook:", req.body);
  res.status(200).send("OK");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
