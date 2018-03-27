module.exports = {
    aact: {
        node_env : process.env.NODE_ENV || 'dev',
        port : process.env.PORT || 5432,
        client : process.env.CLIENT || 'postgres',
        user : process.env.AACT_DB_USER || 'aact',
        host : process.env.AACT_HOST || 'NotProvided',
        database : process.env.AACT_DATABASE || 'NotProvided',
        password : process.env.AACT_PASSWORD || 'NotProvided',
        poolMin : process.env.poolMin || '0',
        poolMax : process.env.poolMax || '100',     
        connectionString : process.env.AACT_CONNECTION_AACT || 'NotProvided'
    },
    heroku: {
        port : process.env.PORT || 5432,
        client : process.env.HEROKU_CLIENT || 'pg',
        user : process.env.HEROKU_DB_USER || 'NotProvided',
        host : process.env.HEROKU_HOST || 'NotProvided',
        database : process.env.HEROKU_DATABASE || 'NotProvided',
        password : process.env.HEROKU_PASSWORD || 'NotProvided',  
    },
    zipcode: {
        port : process.env.PORT || 5432,
        client : process.env.ZIP_CLIENT || 'pg',
        user : process.env.ZIP_DB_USER || 'NotProvided',
        host : process.env.ZIP_HOST || 'NotProvided',
        database : process.env.ZIP_DATABASE || 'NotProvided',
        password : process.env.ZIP_PASSWORD || 'NotProvided',  
    },
    googlemaps: procces.env.GOOGLE_KEY || 'NotProvided'
}