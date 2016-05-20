/* GrafTès
 *
 * /server.js - main entry point, server config
 *
 * coded by leny@flatLand!
 * started at 20/05/2016
 */

import { GraphQLObjectType, GraphQLString, GraphQLSchema } from "graphql";
import graphqlHTTP from "express-graphql";
import express from "express";

let oData, oUserType, oSchema;

oData = require( "../data.json" );

oUserType = new GraphQLObjectType( {
    "name": "User",
    "fields": {
        "id": {
            "type": GraphQLString
        },
        "name": {
            "type": GraphQLString
        }
    }
} );

oSchema = new GraphQLSchema( {
    "query": new GraphQLObjectType( {
        "name": "Query",
        "fields": {
            "user": {
                "type": oUserType,
                "args": {
                    "id": {
                        "type": GraphQLString
                    }
                },
                "resolve": ( _, oArgs ) => {
                    return oData[ oArgs.id ];
                }
            }
        }
    } )
} );

express()
    .use( "/", graphqlHTTP( {
        "schema": oSchema,
        "pretty": true,
        "graphiql": true
    } ) )
    .listen( 12345 );

console.log( "GraphQL server running on http://localhost:12345" );
