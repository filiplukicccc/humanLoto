import sha256 from 'sha256';
import randomID from 'random-id';
import jwt from '../jwt';
import pg from '../../../db/pg';


export default async function gLogin(args) {
  let forReturn;
  // Proveravamo token ne guglu
  await fetch('https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=' + args.gToken)
    .then((response) => response.text())
    .then(async (responseText) => {
      const data = JSON.parse(responseText);
      // Proveravamo da li je stigla data
      if (data) {
        // Proveravamo da li u bazi postoji google id
        const checkId = await pg.models.User.find({ where: { gId: data.id } })
        if (!checkId) {
          // Ako ne postoji ID u bazi , proveravamo da li postoji email u bazi
          const checkEmail = await pg.models.User.find({ where: { email: data.email } })
          if (!checkEmail) {
            // Ako ne postoji email u bazi pravimo korisnika
            const checkUsername = await getUsername(data.given_name)
            const channel = randomID(32)
            const createUser = await pg.models.User.create({
              email: data.email,
              username: checkUsername,
              gId: data.id,
              channel,
              RoleId: 1,
              verified: true
            })
            // Ako smo napravili korisnika pravimo mu novcanik i dodeljujemo mu bidCoinAmmount
            if (createUser) {
              let payload = {
                id: createUser.id,
                username: createUser.username,
                channel: createUser.channel,
                RoleId: 1,
              }
              const createBidCoins = pg.models.UserBidCoinAmmount.create({ id: createUser.id, UserId: createUser.id, bidCoinAmmount: 50 })
              const createUserWallet = pg.models.UserWallet.create({ id: createUser.id, UserId: createUser.id })
              const token = jwt.sign(payload)
              forReturn = {
                id: createUser.id,
                username: createUser.username,
                channel: createUser.channel,
                token,
              }
            } else {
              forReturn = {
                error: "Something went wrong!"
              }
            }
          } else {
            // Ako postoji email u bazi, dodeljujemo mu gId

            // Ako korisnik nije verifikovan, a loguje se preko googla, brisemo mu sifru iz baze
            let deletePassword
            if (!checkEmail.verified) {
              deletePassword = await pg.models.User.update({
                password_hash: null,
                hash: null,
              }, { where: { id: checkEmail.id }})
            } else {
              deletePassword = true
            }
            if (deletePassword) {
              const updateGId = await pg.models.User.update({
                gId: data.id
              }, { where: { email: data.email } })
              let payload = {
                id: checkEmail.id,
                username: checkEmail.username,
                email: checkEmail.email,
                channel: checkEmail.channel,
                RoleId: checkEmail.RoleId,
              }
              const token = jwt.sign(payload)
              forReturn = {
                id: createUser.id,
                username: createUser.username,
                channel: createUser.channel,
                token,
              }
            } else {
              forReturn = { error: "Something went wrong!" }
            }
          }
        } else {
          // Ako postoji ID u bazi vracamo token i logujemo ga
          let payload = {
            id: checkId.id,
            username: checkId.username,
            email: checkId.email,
            channel: checkId.channel,
            RoleId: checkId.RoleId,
          }
          const token = jwt.sign(payload)
          forReturn = {
            id: checkId.id,
            username: checkId.username,
            channel: checkId.channel,
            token,
          }
        }
      } else {
        forReturn = { error: "Something went wrong!" }
      }
    })
  return forReturn
}

async function getUsername(username) {
  const checkUser = await pg.models.User.find({ where: { username: username } })
  if (!checkUser) {
    return username
  } else {
    const random = randomID(5, "0")
    const newName = username + random
    username(newName)
  }
}



// await fetch('https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=' + token)
// .then((response) => response.text())
// .then((responseText) => {
//   const data = JSON.parse(responseText);
//   if (data.id) {
//     a.id = data.id;
//     a.success = true
//   } else {
//     a.id = 'Invalid token',
//       a.success = false
//   }
// })