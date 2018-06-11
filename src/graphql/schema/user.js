import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLFloat
} from 'graphql';

import pg from '../../../db/pg';

const User = new GraphQLObjectType({
  name: 'User',
  fields() {
    return {
      id: {
        type: GraphQLInt,
        resolve(root) {
          return root.id
        }
      },
      username: {
        type: GraphQLString,
        resolve(root) {
          return root.username
        }
      },
      email: {
        type: GraphQLString,
        resolve(root) {
          return root.email
        }
      },
      channel: {
        type: GraphQLString,
        resolve(root) {
          return root.channel
        }
      },
      token: {
        type: GraphQLString,
        resolve(root) {
          return root.token
        }
      },
      bidCoins: {
        type: GraphQLInt,
        async resolve(root) {
          const bidCoins = await pg.models.UserBidCoinAmmount.find({ where: { id: root.id } })
          return bidCoins.bidCoinAmmount;
        }
      },
      userWallet: {
        type: UserWallet,
        resolve(root) {
          return pg.models.UserWallet.find({ where: { id: root.id } })
        }
      },
      channel: {
        type: GraphQLString,
        resolve(root) {
          return root.channel
        }
      },
      error: {
        type: GraphQLString,
        resolve(root) {
          return root.error
        }
      },
    }
  }
})

const Role = new GraphQLObjectType({
  name: 'Role',
  fields() {
    return {
      roleId: {
        type: GraphQLInt,
        resolve(root) {
          return root.roleId
        }
      },
      success: {
        type: GraphQLBoolean,
        resolve(root) {
          return root.success
        }
      },
    }
  }
})

const UserWallet = new GraphQLObjectType({
  name: "UserWallet",
  fields() {
    return {
      id: {
        type: GraphQLInt,
        resolve(root) {
          return root.id
        }
      },
      bitcoin: {
        type: GraphQLString,
        resolve(root) {
          return root.bitcoin
        }
      },
      ripple: {
        type: GraphQLString,
        resolve(root) {
          return root.ripple
        }
      },
      etherum: {
        type: GraphQLString,
        resolve(root) {
          return root.etherum
        }
      },
      litecoin: {
        type: GraphQLString,
        resolve(root) {
          return root.litecoin
        }
      },
      cardano: {
        type: GraphQLString,
        resolve(root) {
          return root.cardano
        }
      },
      stellar: {
        type: GraphQLString,
        resolve(root) {
          return root.stellar
        }
      },
      iota: {
        type: GraphQLString,
        resolve(root) {
          return root.iota
        }
      },
      dash: {
        type: GraphQLString,
        resolve(root) {
          return root.dash
        }
      },
      monero: {
        type: GraphQLString,
        resolve(root) {
          return monero
        }
      }
    }
  }
})

export default {
  User,
  Role
}