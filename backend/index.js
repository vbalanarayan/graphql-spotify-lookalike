import express from 'express';
import graphqlHTTP from 'express-graphql';
import { schema } from './src/graphql/schema';

const app = express();
const PORT = 8888;

// serving static files
app.use(express.static('public'));

app.get('/', (req, res) =>
    res.send(`GraphQL is running!`)
);

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
}));

app.listen(PORT, () =>
    console.log(`your server is running on localhost:${PORT}/graphql`)
);
