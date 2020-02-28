import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import corsOptions from './config/cors';

// Create & Configure Express App
const app = express();
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

export default app;
