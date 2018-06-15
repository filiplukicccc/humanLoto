import Sequelize from 'sequelize';

const pg = new Sequelize('postgres://cybele:20jebotevps18@localhost/cryptster_prod');


const User = pg.define('User', {
	username: {
		type: Sequelize.STRING,
		unique: true,
	},
	email: {
		type: Sequelize.STRING,
		unique: true
	},
	fbId: {
		type: Sequelize.STRING,
		unique: true
	},
	gId: {
		type: Sequelize.STRING,
		unique: true
	},
	address: {
		type: Sequelize.STRING
	},
	password_hash: {
		type: Sequelize.STRING
	},
	salt: {
		type: Sequelize.STRING
	},
	emailHash: {
		type: Sequelize.STRING
	},
	channel: {
		type: Sequelize.STRING
	},
	verified: {
		type: Sequelize.BOOLEAN
	}
})

const ResetPassword = pg.define('ResetPassword', {
	hash: {
		type: Sequelize.STRING,
		unique: true,
	},
	emailHash: {
		type: Sequelize.STRING,
	},
	time: {
		type: Sequelize.INTEGER,
	},
	isUsed: {
		type: Sequelize.BOOLEAN,
	}
})



export default pg