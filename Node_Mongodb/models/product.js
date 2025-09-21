const connectToMongo = require("../util/db");
const { ObjectId } = require("mongodb");

class Product {
  constructor(name, price, description) {
    this.name = name;
    this.price = price;
    this.description = description || "";
    this.createdAt = new Date();
  }

  async save() {
    const db = await connectToMongo();
    const productCollection = db.collection("products");
    const result = await productCollection.insertOne(this);
    return result;
  }

  static async fetchAll() {
    const db = await connectToMongo();
    const productCollection = db.collection("products");
    return productCollection.find().toArray();
  }

  static async findById(id) {
    if (!ObjectId.isValid(id)) return null;
    const db = await connectToMongo();
    const productCollection = db.collection("products");
    return productCollection.findOne({ _id: new ObjectId(id) });
  }

  static async deleteById(id) {
    if (!ObjectId.isValid(id)) return null;
    const db = await connectToMongo();
    const productCollection = db.collection("products");
    return productCollection.deleteOne({ _id: new ObjectId(id) });
  }
}

module.exports = Product;
