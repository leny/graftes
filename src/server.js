/* GrafTès
 *
 * /server.js - main entry point, server config
 *
 * coded by leny@flatLand!
 * started at 20/05/2016
 */

import { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLList } from "graphql";
import graphqlHTTP from "express-graphql";
import express from "express";

let aUsers, oUserType, oSchema;

aUsers = require( "../users.json" );

oUserType = new GraphQLObjectType( {
    "name": "User",
    "fields": {
        "id": {
            "type": GraphQLString
        },
        "first_name": {
            "type": GraphQLString
        },
        "last_name": {
            "type": GraphQLString
        },
        "email": {
            "type": GraphQLString
        }
    }
} );

oSchema = new GraphQLSchema( {
    "query": new GraphQLObjectType( {
        "name": "Query",
        "fields": {
            "users": {
                "type": new GraphQLList( oUserType ),
                "resolve": () => {
                    return aUsers;
                }
            },
            "user": {
                "type": oUserType,
                "args": {
                    "id": {
                        "type": GraphQLString
                    }
                },
                "resolve": ( _, oArgs ) => {
                    return aUsers.find( ( oUser ) => {
                        return oUser.id === oArgs.id;
                    } );
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
