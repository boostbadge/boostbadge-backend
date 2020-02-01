// Create & Configure CORS Configuration (used by Express and Apollo)
require('dotenv').config({ path: 'variables.env' });

export default {
  origin: process.env.FRONTEND_URL,
  credentials: true,
};
