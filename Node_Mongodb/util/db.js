// util/db.js
const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";
const dbName = "sharpner_db";

let _db;

async function connectToMongo() {
  if (_db) return _db; // reuse connection

  const client = new MongoClient(url);
  await client.connect();
  console.log("Connected to MongoDB ✅");
  _db = client.db(dbName);
  return _db;
}

module.exports = connectToMongo;
