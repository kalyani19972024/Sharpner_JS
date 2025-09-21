const { MongoClient } = require("mongodb");

// Change this to your MongoDB URL
const uri = "mongodb://localhost:27017";

// Database and collection
const dbName = "sharpner_db";   // your db name
const collectionName = "products";

async function run() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected to MongoDB ✅");

    const db = client.db(dbName);
    const products = db.collection(collectionName);

    // Sample product data
    const sampleProducts = [
      { name: "Laptop", price: 60000, category: "Electronics", stock: 10 },
      { name: "Headphones", price: 2000, category: "Electronics", stock: 50 },
      { name: "Chair", price: 3000, category: "Furniture", stock: 20 },
      { name: "Notebook", price: 50, category: "Stationery", stock: 100 },
    ];

    // Insert many products
    const result = await products.insertMany(sampleProducts);
    console.log(`${result.insertedCount} products inserted`);
  } catch (err) {
    console.error("Error inserting products:", err);
  } finally {
    await client.close();
    console.log("Connection closed");
  }
}

run();
