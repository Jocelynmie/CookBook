import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const url = process.env.MONGO_URL || "mongodb://localhost:27017";
// const url = process.env.MONGO_URL;

// console.log("MONGO_URL:", process.env.MONGO_URL);
let collections = {
  recipes: null,
  mealPlans: null,
};
let client;
let db;

export async function connectToDatabase() {
  try {
    client = new MongoClient(url);
    console.log(url);

    await client.connect();
    console.log("successfully connect");

    db = client.db("CookBook");
    collections.recipes = db.collection("recipes");
    collections.mealPlans = db.collection("mealPlans");

    return db;
  } catch (error) {
    console.error("error in connection");
    throw error;
  }
}

export async function closeConnections() {
  if (client) {
    await client.close();
    console.log("db connection closed");
  }
}

export { collections };
export function getDb() {
  return db;
}
