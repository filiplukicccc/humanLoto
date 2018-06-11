import pg from '../../../db/pg';
import sha256 from 'sha256';
import jwt from "../jwt";
import configToken from '../config'

export default async function loginUser(args) {
  let response = {}
  console.log('ARGS', args)
  const username = args.username
  const password = args.password
  let userFromDb = await pg.models.User.find({where: {username: username}})
  console.log('USERFROMDB', userFromDb)
  if(userFromDb) {
    if(userFromDb.verified) {
      const salt = userFromDb.salt
      const sha = password+salt
      const checkPass = sha256(sha)
      console.log(checkPass)
      if(checkPass === userFromDb.password_hash) {
        const payload = {
          id: userFromDb.id,
          username: userFromDb.username,
          email: userFromDb.email,
          channel: userFromDb.channel,
          RoleId: userFromDb.RoleId
        }
        const token = jwt.sign(payload);
        userFromDb.token = token;
        return {
          id: userFromDb.id,
          username: userFromDb.username,
          email: userFromDb.email,
          token: userFromDb.token,
        };
      } else {
        return { error: "password" }
      }
    } else {
      return { error: "verify" }
    }
  } else {
    return { error: "user" }
  }
}