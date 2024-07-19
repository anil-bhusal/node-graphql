import 'reflect-metadata';
import { createConnection } from 'typeorm';
import dotenv from 'dotenv';
import config from './config/ormconfig';
import createServer from './server';

dotenv.config();

const PORT = process.env.PORT || 3000;

// TypeORM connection setup
createConnection(config).then(() => {
  console.log('Connected to PostgreSQL database');
  
  // Initialize server
  const app = createServer();
  
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/graphql`);
  });
}).catch(error => console.log('Database connection error: ', error));
