import sha256 from 'sha256';
import randomID from 'random-id';
import jwt from '../jwt';
import Moment from 'moment';
import pg from '../../../db/pg';
import configToken from '../config';


export default async function fbLogin(args) {
  let forReturn;
  // Proveravam fbToken sa fejsbukom
  await fetch('https://graph.facebook.com/me?access_token=' + args.fbToken)
    .then((response) => response.text())
    .then(async (responseText) => {
      const data = JSON.parse(responseText);
      const id = data.id
      const checkUser = await pg.models.User.find({ where: { fbId: id } })
      // Proveravam da li je user vec registrovan
      if (checkUser) {
        const payload = {
          id: checkUser.id,
          username: checkUser.username,
          email: checkUser.email,
          channel: checkUser.channel,
          RoleId: checkUser.RoleId,
        }
        const token = jwt.sign(payload)
        // Ako je registrovan vracamo token
        forReturn = {
          id: checkUser.id,
          username: checkUser.username,
          email: checkUser.email,
          channel: checkUser.channel,
          token,
        }
        // u suprotnom ga registrujemo
      } else {
        // Sa fb id-jem uzimam informacije o korisniku
        await fetch('https://graph.facebook.com/' + id + '/?fields=first_name,last_name,email&access_token=' + args.fbToken)
          .then((response) => response.text())
          .then(async (responseText) => {
            const data = JSON.parse(responseText);
            // Proveravam da li korisnik postoji u bazi sa tim emailom
            const checkUser = await pg.models.User.find({ where: { email: data.email } })
            if (checkUser) {
              let deletePassword
              if (!checkUser.verified) {
                deletePassword = await pg.models.User.update({
                  password_hash: null,
                  salt: null,
                }, { where: { id: checkUser.id } })
              } else {
                deletePassword = true
              }
              const fbId = { fbId: data.id }
              const createFbId = await pg.models.User.update(fbId, { where: { email: data.email } })
              if (deletePassword) {
                if (createFbId) {
                  const payload = {
                    id: checkUser.id,
                    username: checkUser.username,
                    email: checkUser.email,
                    channel: checkUser.channel,
                    RoleId: checkUser.RoleId,
                  }
                  const token = jwt.sign(payload)
                  forReturn = {
                    id: checkUser.id,
                    username: checkUser.username,
                    email: checkUser.email,
                    channel: checkUser.channel,
                    token,
                  }
                } else {
                  forReturn = {
                    error: "Something went wrong."
                  }
                }
              } else {
                forReturn = {
                  error: "Something went wrong."
                }
              }

            } else {
              const username = await sane(data.first_name)
              const channel = randomID(32)
              const user = { username, email: data.email, fbId: data.id, channel, RoleId: 1, verified: true }
              const createUser = await pg.models.User.create(user)
              const createBidCoins = pg.models.UserBidCoinAmmount.create({ id: createUser.id, UserId: createUser.id, bidCoinAmmount: 50 })
              const createUserWallet = pg.models.UserWallet.create({ id: createUser.id, UserId: createUser.id })
              if (createUser) {
                const payload = {
                  id: createUser.id,
                  username: createUser.username,
                  email: createUser.email,
                  channel: createUser.channel,
                  RoleId: createUser.RoleId,
                }
                const token = jwt.sign(payload)
                forReturn = {
                  id: createUser.id,
                  username: createUser.username,
                  email: createUser.email,
                  channel: createUser.channel,
                  token,
                }
              } else {
                forReturn = {
                  error: "Something went wrong."
                }
              }
            }
          })
      }
    })
  return forReturn

}

async function sane(username) {
  const checkUser = await pg.models.User.find({ where: { username: username } })
  if (!checkUser) {
    return username
  } else {
    const random = randomID(5, "0")
    const newName = username + random
    username(newName)
  }
}

