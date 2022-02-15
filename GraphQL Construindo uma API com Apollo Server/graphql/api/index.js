// Schema Definition Language
// Int - inteiro de 32 bits
// Float - tipo ponto flutuante
// String - sequência de caracteres no formato UTF-8
// Boolean - true ou false
// ID - identificador único, usado normalmente para localizar dados

const { ApolloServer } = require('apollo-server');
const userSchema = require('./user/schema/user.graphql');
const UserResolvers = require('./user/resolvers/userResolver.js');
const UserAPI = require('./user/datasource/user');

// Modelos - Schemas
const typeDefs = [ userSchema ];

// Controllers - Resolvers
const resolvers = [UserResolvers];

const server = new ApolloServer({ 
    typeDefs, 
    resolvers, 
    introspection: true, 
    playground: true, 
    dataSources: () => {
        return {
            userAPI: new UserAPI()
        }
    },
});

server.listen({ port: 4000 }).then(({ url }) => {
    console.log(`Server Running at ${url}`)
});