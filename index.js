import app from './app';
import server from './server';

require('dotenv').config({ path: 'variables.env' });

const PORT = 5000;

app.listen({ port: PORT });
console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`);
