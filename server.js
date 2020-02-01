import { ApolloServer } from 'apollo-server-express';
import path from 'path';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import models from './models';
import app from './app';
import corsOptions from './config/cors';

// Create & Configure Apollo Server
const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')));
const resolvers = mergeResolvers(
  fileLoader(path.join(__dirname, './resolvers'))
);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: req => ({ ...req, models }),
});

server.applyMiddleware({ app, cors: corsOptions });

export default server;
