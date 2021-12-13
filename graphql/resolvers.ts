import { MongoClient } from "mongodb";

export const resolvers = {
  Query: {
    users: async () => {
      const url = process.env.NEXT_PUBLIC_MONGODB_URL;
      const mongoClient = new MongoClient(url);
      await mongoClient.connect();
      const db = mongoClient.db("main");
      const users = db.collection("users");
      const doc = await users.findOne();
      return doc;
    },
  },
  Mutation: {
    createUser: async (data) => {
      const url = process.env.NEXT_PUBLIC_MONGODB_URL;
      const mongoClient = new MongoClient(url);
      await mongoClient.connect();
      const db = mongoClient.db("main");
      const users = db.collection("users");
      users.insertOne(data);
    },
  },
};
