// Schema for sample GraphQL server.

// ----------------------
// IMPORTS

// GraphQL schema library, for building our GraphQL schema
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLBoolean
} from 'graphql';
import UserSchema from './schema/user';
import UserLogin from '../controll/user/login';
import gLogin from '../controll/user/gLogin';
import fbLogin from '../controll/user/fbLogin';
import Passwords from '../controll/user/passwords';



// ----------------------

// GraphQL can handle Promises from its `resolve()` calls, so we'll create a
// simple async function that returns a simple message.  In practice, `resolve()`
// will generally pull from a 'real' data source such as a database
console.log("UserSchema", UserSchema.User)

// Message type.  Imagine this like static type hinting on the 'message'
// object we're going to throw back to the user
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields() {
    return {
      // USER LOGIN
      user_login: {
        type: UserSchema.User,
        args: {
          username: {
            type: new GraphQLNonNull(GraphQLString)
          },
          password: {
            type: new GraphQLNonNull(GraphQLString)
          },
        },
        resolve(root, args) {
          return UserLogin(args)
        }
      },
      // GOOGLE LOGIN
      user_gLogin: {
        type: UserSchema.User,
        args: {
          gToken: {
            type: new GraphQLNonNull(GraphQLString)
          },
        },
        async resolve(root, args) {
          const nesto = await gLogin(args)
          return nesto
        }
      },
      // FACEBOOK LOGIN
      user_fbLogin: {
        type: UserSchema.User,
        args: {
          fbToken: {
            type: new GraphQLNonNull(GraphQLString)
          },
        },
        async resolve(root, args) {
          const nesto = await fbLogin(args)
          return nesto
        }
      },
      // ZAHTEV ZA RESET 
      user_resetPassword: {
        type: BasicResponse,
        args: {
          email: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve(root, args) {
          return Passwords.resetPassword(args);
        }
      },
    };
  }
})

const BasicResponse = new GraphQLObjectType({
  name: 'BasicResponse',
  fields() {
    return {
      success: {
        type: GraphQLBoolean,
        resolve(root) {
          return root.success
        }
      },
      error: {
        type: GraphQLString,
        resolve(root) {
          return root.error
        }
      }
    }
  }
})

// Root query.  This is our 'public API'.
const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'Root query object',
  fields() {
    return {
      message: {
        type: GraphQLString,
        resolve() {
          return 'sss';
        },
      },
    };
  },
});

// The resulting schema.  We insert our 'root' `Query` object, to tell our
// GraphQL server what to respond to.  We could also add a root `mutation`
// if we want to pass mutation queries that have side-effects (e.g. like HTTP POST)
export default new GraphQLSchema({
  query: Query,
  mutation: Mutation
});
