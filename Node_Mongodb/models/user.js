
const connectToMongo = require("../util/db");
const { ObjectId } = require("mongodb");

class User {
  constructor(name, email, cart = { items: [] }, id) {
    this.name = name;
    this.email = email;
    this.cart = cart;   // { items: [ { productId, quantity } ] }
    this._id = id ? new ObjectId(id) : null;
  }

  // Save user into MongoDB
  async save() {
    const db = await connectToMongo();
    const userCollection = db.collection("users");

    if (this._id) {
      return userCollection.updateOne(
        { _id: this._id },
        { $set: { name: this.name, email: this.email, cart: this.cart } }
      );
    } else {
      const result = await userCollection.insertOne(this);
      this._id = result.insertedId;
      return result;
    }
  }

  // Add product to cart
  async addToCart(productId) {
    const db = await connectToMongo();
    const userCollection = db.collection("users");

    // check if product already in cart
    const cartItem = this.cart.items.find(
      i => i.productId.toString() === productId.toString()
    );

    if (cartItem) {
      cartItem.quantity++; // ✅ increment quantity if already exists
    } else {
      this.cart.items.push({ productId: new ObjectId(productId), quantity: 1 });
    }

    return userCollection.updateOne(
      { _id: this._id },
      { $set: { cart: this.cart } }
    );
  }

  // Get full cart (with product details)
  async getCart() {
    const db = await connectToMongo();
    const productCollection = db.collection("products");

    const productIds = this.cart.items.map(i => i.productId);
    const products = await productCollection
      .find({ _id: { $in: productIds } })
      .toArray();

    // merge product details with quantity
    return products.map(p => ({
      ...p,
      quantity: this.cart.items.find(i => i.productId.toString() === p._id.toString()).quantity
    }));
  }

  // Remove product from cart
  async removeFromCart(productId) {
    this.cart.items = this.cart.items.filter(
      i => i.productId.toString() !== productId.toString()
    );

    const db = await connectToMongo();
    const userCollection = db.collection("users");

    return userCollection.updateOne(
      { _id: this._id },
      { $set: { cart: this.cart } }
    );
  }

  // Find user by ID
  static async findUserById(userId) {
    if (!ObjectId.isValid(userId)) return null;
    const db = await connectToMongo();
    const userCollection = db.collection("users");
    const userDoc = await userCollection.findOne({ _id: new ObjectId(userId) });

    if (!userDoc) return null;
    return new User(userDoc.name, userDoc.email, userDoc.cart, userDoc._id);
  }
}

module.exports = User;
