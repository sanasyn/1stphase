'use strict'

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
		user : process.env.DB_USER || '',
		host : process.env.HOST || 'localhost',
		database : process.env.DATABASE || '',
		password : process.env.PASSWORD || '',	
	},
	heroku: {
        port : process.env.NODE_ENV || 5432,
        client : process.env.CLIENT || 'pg',
        user : process.env.DB_USER || 'udvarwydbwewdx',
        host : process.env.HOST || 'ec2-54-83-11-247.compute-1.amazonaws.com',
        database : process.env.DATABASE || 'd4kltvr29jig9h',
        password : process.env.PASSWORD || '820cc5f1693678e34b525f8157dedfecbe65d63d97af95f905b30f449e302108',  
    }
}