const { GraphQLScalarType } = require('graphql');

const mock = [
    { nome: "Pedro", email: "pedro@gmail.com", ativo: true },
    { nome: "Marcelo", email: "pedro@gmail.com", ativo: true },
]

const UserResolvers = {
    RolesType: {
        ESTUDANTE:"ESTUDANTE",
        DOCENTE: "DOCENTE",
        COORDENACAO: "COORDENACAO",
    },
    DateTime: new GraphQLScalarType({
        name: 'DateTime',
        description: 'String de data e hora no formato ISO-8601',
        serialize: (value) => value.toISOString(),
        parseValue: (value) => new Date(value),
        parseLiteral: (ast) => new Date(ast.value),
    }),
    Query: {
        users: (root, args, { dataSources }, info) => {
            return dataSources.userAPI.getUsers()
        },
        user: (root, { id }, { dataSources }, info) => {
            return dataSources.userAPI.getUserById(id)
        }
    },
    Mutation: {
        addUser: async (root, { user }, { dataSources }, info) => {
            return dataSources.userAPI.addUser(user);
        },
        updateUser: async (root, user, { dataSources }, info) => {
            return dataSources.userAPI.updateUser(user);
        },
        deleteUser: async (root, { id }, { dataSources }, info) => {
            return dataSources.userAPI.deleteUser(id);
        }
    }
};

module.exports = UserResolvers;