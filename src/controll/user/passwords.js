import sha256 from 'sha256';
import randomID from 'random-id';
import jwt from '../jwt';
import Moment from 'moment';

import pg from '../../../db/pg';
// import sendMail from '../sendMail/sendMail'; DA LI SLATI NA MAIL DA SE PROMENILA SIFRA ?
import configToken from '../config';
import sendMail from '../sendMail/sendMail'

async function changePassword(args) {
    const user = jwt.verify(args.token);
    if (user) {
        const email = user.email
        const checkUser = await pg.models.User.find({ where: { email: email } })
        if (checkUser) {
            const salt = checkUser.salt
            const oldPassword = args.oldPassword
            const oldPasswordHashed = sha256(oldPassword + salt)
            if (oldPasswordHashed === checkUser.password_hash) {
                const newPassword = args.newPassword
                const newSalt = randomID(32)
                const newPasswordHashed = sha256(newPassword + newSalt)
                const createNewPass = await pg.models.User.update({
                    password_hash: newPasswordHashed,
                    salt: newSalt,
                },
                    { where: { email: email } })
                if (createNewPass) {
                    return { success: true }
                } else {
                    return { error: "Something went wrong! Please try again." }
                }
            } else {
                return { error: "Incorrect password!" }
            }
        } else {
            return { error: "Incorrect user!" }
        }
    }
}

async function resetPassword(args) {
    const email = args.email
    const emailExist = await pg.models.User.find({ where: { email: email } })
    if (emailExist) {
        const random = randomID(32)
        const hash = sha256(email + random)
        const curentTime = Moment().utc().unix()
        const expireTime = curentTime + 120
        const timeInDb = await pg.models.ResetPassword.create({
            time: expireTime,
            hash: hash,
            emailHash: emailExist.emailHash,
            isUsed: false,
        })
        if (timeInDb) {
            const text = 'http://localhost:8081/' + hash + '/' + emailExist.emailHash
            const subject = 'Reset password'
            sendMail(email, text, subject)
            return { success: true }
        } else {
            return { error: "something went wrong" }
        }
    } else {
        return { error: "Email is not exist" }
    }
}

async function createNewPassword(args) {
    const checkTime = await checkExpireTime(args);
    if (checkTime.success) {
        const hashedMail = args.mailHash
        const checkUser = await pg.models.User.find({ where: { emailHash: hashedMail } })
        if (checkUser) {
            const newPassword = args.newPassword;
            const newSalt = randomID(32)
            const newPasswordHashed = sha256(newPassword + newSalt)
            const changePassword = await pg.models.User.update({
                password_hash: newPasswordHashed,
                salt: newSalt
            }, { where: { emailHash: hashedMail } })
            if (changePassword) {
                return checkUser
            } else {
                return { error: 'Something went wrong!' }
            }
        } else {
            return { error: "Invalid user!" }
        }
    } else {
        return checkTime
    }
}
async function checkExpireTime(args) {
    const hash = args.hash
    const emailHash = args.emailHash
    const chechHash = await pg.models.ResetPassword.find({ where: { hash: hash } })
    if (chechHash) {
        if (!chechHash.isUsed) {
            const expireTime = chechHash.time
            const currentTime = Moment().utc().unix()
            if (expireTime > currentTime) {
                // changePassword(hash)
                return { success: true }
            } else {
                return { error: 'Reset time passed!' }
            }
        } else {
            return { error: 'This link has been used!' }
        }
    } else {
        return { error: 'Error link!!' }
    }
}

export default {
    changePassword,
    resetPassword,
    createNewPassword,
    checkExpireTime
}