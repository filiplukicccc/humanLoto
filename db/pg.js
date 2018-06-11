import Sequelize from 'sequelize';

const pg = new Sequelize('postgres://cybele:Mfgdjz@x12308@cybeletechnologies.ml/cryptster_prod');

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

export default pg