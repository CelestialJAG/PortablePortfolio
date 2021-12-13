import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const url = process.env.NEXT_PUBLIC_MONGODB_URL;
  const mongoClient = new MongoClient(url);
  await mongoClient.connect();
  const db = mongoClient.db("main");
  const users = db.collection("users");

  if (req.method === "POST") {
    const { data } = JSON.parse(req.body);
    users.insertOne(data);
  }
  if (req.method === "GET") {
    const { query } = req.query;
    const user = await users.findOne({ userID: query });
    res.status(200).json({ user });
  }
};
export default handler;
