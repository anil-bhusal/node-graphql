import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import { createConnection } from 'typeorm';
import 'reflect-metadata';
import { schema } from './schema/userSchema';
import { root } from './resolver/userResolver';
import config from './ormconfig';

// TypeORM connection setup
createConnection(config).then(() => {
  console.log('Connected to PostgreSQL database');

  // Express server setup
  const app = express();

  // GraphQL endpoint
  app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  }));

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/graphql`);
  });
}).catch(error => console.log('Database connection error: ', error));
