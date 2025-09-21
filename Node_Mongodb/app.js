
// app.js
const express = require("express");
const connectToMongo = require("./util/db");
const productRoutes = require("./routes/productRoute");
 const adminRoutes = require("./routes/adminRoute");
 const userRoutes = require("./routes/userRoute");
 const cartRoutes = require("./routes/cartRoute");

const app = express();
app.use(express.json());

app.use("/products", productRoutes);
// app.use("/admin", adminRoutes);
app.use("/users", userRoutes);
app.use("/cart", cartRoutes);


connectToMongo()
  .then(() => {
    app.listen(3000, () => console.log("Server running on port 3000"));
  })
  .catch(err => console.error("Failed to connect to MongoDB:", err));


// app.listen(3000, () => console.log("Server running on port 3000"));

