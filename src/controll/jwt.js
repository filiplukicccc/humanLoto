import jwt from 'jsonwebtoken';
const crypto = require('crypto'),
  algorithm = 'aes-256-ctr',
  password = 'M3z!keS3';

const jwtPass = '9KxZ21Qrs@dgx9z';

function encrypt(text) {
  let cipher = crypto.createCipher(algorithm, password);
  let crypted = cipher.update(text, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
}

function decrypt(text) {
  let decipher = crypto.createDecipher(algorithm, password);
  let dec = decipher.update(text, 'hex', 'utf8');
  dec += decipher.final('utf8');
  return dec;
}

function sign(payload) {
  return encrypt(jwt.sign(payload, jwtPass))
}

function verify(token) {
  return jwt.verify(decrypt(token), jwtPass);
}

export default {
  sign,
  verify
}