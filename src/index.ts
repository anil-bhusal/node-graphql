import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import { createConnection } from 'typeorm';
import 'reflect-metadata';
import { schema } from './schema/userSchema';
import { root } from './resolver/userResolver';
import config from './config/ormconfig';
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;
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

    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}/graphql`);
    });
}).catch(error => console.log('Database connection error: ', error));
