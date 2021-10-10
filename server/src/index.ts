require("dotenv").config();

import express, { Application } from "express";
import { ApolloServer } from "apollo-server-express";
import { resolvers, typeDefs } from "./graphql";
import { connectDatabase } from "./database/index";

const mount = async (app: Application) => {
  const db = await connectDatabase();

  const server = new ApolloServer({
    resolvers,
    typeDefs,

    context: () => ({
      db,
    }),
  });
  await server.start();
  server.applyMiddleware({ app });

  app.listen(process.env.PORT);
  console.log(`server running on port 9000`);
  const listings = await db.listings.find({}).toArray();
  console.log(listings);
};

mount(express());
