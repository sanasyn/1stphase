'use strict'

// module.exports = {
// 	node_env : process.env.NODE_ENV || 'dev',
// 	port : process.env.NODE_ENV || 5432,
// 	client : process.env.CLIENT || 'postgres',
// 	user : process.env.DB_USER || 'aact',
// 	host : process.env.HOST || 'aact-db.ctti-clinicaltrials.org',
// 	database : process.env.DATABASE || 'aact',
// 	password : process.env.PASSWORD || 'aact',
// 	poolMin : process.env.poolMin || '0',
// 	poolMax : process.env.poolMax || '100',
// }

module.exports = {
	aact: {
		node_env : process.env.NODE_ENV || 'dev',
		port : process.env.NODE_ENV || 5432,
		client : process.env.CLIENT || 'postgres',
		user : process.env.DB_USER || 'aact',
		host : process.env.HOST || 'aact-db.ctti-clinicaltrials.org',
		database : process.env.DATABASE || 'aact',
		password : process.env.PASSWORD || 'aact',
		poolMin : process.env.poolMin || '0',
		poolMax : process.env.poolMax || '100',		
		connectionString : process.env.CONNECTION_AACT || 'postgres://aact:aact@aact-db.ctti-clinicaltrials.org:5432/aact'
	},
	local: {
		port : process.env.NODE_ENV || 5432,
		client : process.env.CLIENT || 'postgres',
		user : process.env.DB_USER || 'marissapels',
		host : process.env.HOST || 'localhost',
		database : process.env.DATABASE || 'trials_local',
		password : process.env.PASSWORD || 'Map-121790',	
	}
}