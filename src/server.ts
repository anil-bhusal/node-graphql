import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { schema } from './schema/rootSchema';
import { rootResolvers } from './resolver/rootResolvers';

const createServer = () => {
    const app = express();

    app.use('/graphql', graphqlHTTP({
        schema: schema,
        rootValue: rootResolvers,
        graphiql: true,
    }));

    return app;
};

export default createServer;