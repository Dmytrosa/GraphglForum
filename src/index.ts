import express from "express" 
import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import { buildSchema} from "type-graphql";
import { ForumResolver } from "./graphql/resolvers";

const main = async () => {
  const schema = await buildSchema({
    resolvers: [ForumResolver]
  });

  const apolloServer = new ApolloServer({ schema });

  const app = express();

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("server started on http://localhost:4000/graphql");
  });
};

main();