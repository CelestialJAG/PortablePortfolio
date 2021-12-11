import { ApolloServer } from "apollo-server-micro";
import { typeDefs } from "../../graphql/schema";
import { resolvers } from "../../graphql/resolvers";
import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import Cors from "micro-cors";
import { ApolloClient } from "@apollo/client";
const cors = Cors();
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

const startServer = apolloServer.start();

const handler = cors(async (req: NextApiRequest, res: NextApiResponse) => {
  const url = process.env.NEXT_PUBLIC_MONGODB_URL;
  const mongoClient = new MongoClient(url);
  const db = mongoClient.db("main");
  await mongoClient.connect();
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
  // client.

  // // try {
  // const users = db.collection("users");
  //

  //   if (req.method === "POST") {
  //     const { data } = JSON.parse(req.body);
  //     users.insertOne(data);
  //   }
  //   res.status(200).json({});
  // } catch (err) {
  //   res.status(404).json({ err: err.message });
  // }
});
export default handler;
export const config = {
  api: {
    bodyParser: false,
  },
};
