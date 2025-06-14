import 'reflect-metadata';
import { createConnection } from 'typeorm';
import dotenv from 'dotenv';
import config from './config/ormconfig';
import createServer from './server';
import { connectRabbitMQ, closeRabbitMQ } from './rabbitmq/connection';
import { startConsumer } from './rabbitmq/consumer';

dotenv.config();

const PORT = process.env.PORT || 3000;

// TypeORM connection setup
createConnection(config).then(async () => {
  console.log('Connected to PostgreSQL database');
  
  // RabbitMQ connection setup
  await connectRabbitMQ();
  
  // Start RabbitMQ consumer
  // await startConsumer();
  
  // Initialize server
  const app = createServer();
  
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/graphql`);
  });

  // Graceful shutdown
  process.on('SIGINT', async () => {
    await closeRabbitMQ();
    process.exit(0);
  });
}).catch(error => console.log('Database connection error: ', error));