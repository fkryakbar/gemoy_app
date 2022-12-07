import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url:any = process.env.DB_URL;
const client = new MongoClient(url);

// Database Name
const dbName = process.env.DB_NAME;

export async function Database(collection:string) {
  // Use connect method to connect to the server
  await client.connect();
  const db = client.db(dbName).collection(collection);

  return db
}




