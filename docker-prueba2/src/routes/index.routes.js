const { Router } = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('../schema');
const resolvers = require('../resolvers');

const router = Router();

const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app: router });

module.exports = router;
