import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const url = process.env.NEXT_PUBLIC_MONGODB_URL;
    const client = new MongoClient(url);
    await client.connect();
    const db = client.db("main");
    const users = db.collection("users");
    if (req.method === "POST") {
      const { data } = JSON.parse(req.body);
      users.insertOne(data);
    }
    res.status(200).json({});
  } catch (err) {
    res.status(404).json({ err: err.message });
  }
};
export default handler;
