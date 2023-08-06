import { MongoClient } from "mongodb";

let cachedClient = null;

export async function connectToDatabase() {
  if (cachedClient && cachedClient.isConnected()) {
    console.log("Using cached MongoDB connection");
    return cachedClient;
  }

  console.log("Creating new MongoDB connection");
  const client = await MongoClient.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  cachedClient = client;
  console.log("MongoDB connection created");
  return client;
}
