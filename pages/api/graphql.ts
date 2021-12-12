import { ApolloServer } from "apollo-server-micro";
import { typeDefs } from "../../graphql/schema";
import { resolvers } from "../../graphql/resolvers";
import { NextApiRequest, NextApiResponse } from "next";
import { Collection, MongoClient } from "mongodb";
import Cors from "micro-cors";
import { ApolloClient } from "@apollo/client";
import { PrismaClient } from ".prisma/client";
const cors = Cors();
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

const startServer = apolloServer.start();
// const prisma = new PrismaClient();

const handler = cors(async (req: NextApiRequest, res: NextApiResponse) => {
  // const url = process.env.NEXT_PUBLIC_MONGODB_URL;
  // const mongoClient = new MongoClient(url);
  // await mongoClient.connect();
  // const db = mongoClient.db("main");
  // const users = db.collection("users");

  if (req.method == "OPTIONS") {
    res.end();
    return false;
  }
  await startServer;
  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);

  // const client=new ApolloClient({
  //   uri:
  // })

  // if (req.method === "POST") {
  // const { data } = JSON.parse(req.body);
  // users.insertOne(data);
  // }
  // res.status(200).json({});
});
export default handler;
export const config = {
  api: {
    bodyParser: false,
  },
};
