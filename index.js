import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import models from './models';
import { scrapeUsers } from './scraper/user';
import { scrapeVehicles } from './scraper/vehicle';
import { scrapePhotos } from './scraper/photo';

require('dotenv').config({ path: 'variables.env' });

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')));
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: req => ({ ...req, models }),
});

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
};

const app = express();
const PORT = 5000;

app.use(cookieParser());
app.use(cors(corsOptions));
app.use((req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    req.userId = userId;
  }
  next();
});
server.applyMiddleware({ app, cors: corsOptions });

models.sequelize
  .sync({ force: process.env.SCRAPE === 'TRUE' })
  .then(async () => {
    console.log(`Connection has been established successfully.`);
    console.log(`.............................................`);
    if (process.env.SCRAPE === 'TRUE') {
      await scrapeUsers();
      await scrapeVehicles();
      await scrapePhotos();
    }
    await app.listen({ port: PORT });
    console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
