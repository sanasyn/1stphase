const config = require('../config/config').heroku;
const pg = require('pg');
const knex = require('knex')(getConnectionOptions());

const geneticQueryInc = require('./translate').geneticQueryInc;
const geneticQueryEx = require('./translate').geneticQueryEx;
const mriQuery = require('./translate').mriQuery;
const petQuery = require('./translate').petQuery;
const spinalQuery = require('./translate').spinalQuery;
const strokeQuery = require('./translate').strokeQuery;
const medicationsQuery = require('./translate').medicationsQuery;
const medicationsQueryNot = require('./translate').medicationsQueryNot;
// const query = require('./exampleObjects').complete;

const getFacilityDistance = require('./location');

function getConnectionOptions() {
	return {
		client: config.client,
		connection : {
			host: config.host,
			user: config.user,
			password: config.password,
			database: config.database,
			ssl: true
		}
	}
}

function runQuery(req, res) {
	console.log("BODY: ", req.body);
	let query = req.body;
	return knex.select('nct_id')
	.from('aact_master')
	// .where(function() {
	// 	this
	// 	.where('minimum_age', '<=' , query.age)
	// 	.andWhere('maximum_age', '>=' , query.age)
	// 	.orWhere({
	// 		'minimum_age': 'N/A',
	// 		'maximum_age': 'N/A'
	// 	})
	// })
	// .andWhere(function() {
	// 	this
	// 	.where('gender', query.gender)
	// 	.orWhere('gender', 'All')
	// })
	// .andWhere(knex.raw("criteria_inc ilike ( :search)", 
	// 		{search: geneticQueryInc(query.geneticTesting.taken)}
	// 		))
	// .andWhere(knex.raw("criteria_ex ilike any ( :search)", 
	// 		{search: geneticQueryEx(query.geneticTesting.taken)}
	// 		))
	// this does not return results when mri is no
	// .andWhereNot(knex.raw("criteria_ex ilike ( :mriSearch)", 
	// 		{mriSearch: mriQuery(query.mri)}
	// 		))
	// .andWhere(knex.raw("criteria_inc ilike any ( :arraySearch)",
	// 		{arraySearch: petQuery(query.pet)}
	// 		))
	// .andWhere(knex.raw("criteria_inc ilike any ( :spinalSearch)", 
	// 		{spinalSearch: spinalQuery(query.spinalTap)}
	// 		))
	// .andWhere(knex.raw("criteria_inc ilike ( :mriSearch)", 
	// 		{mriSearch: mriSearch(query.mri)}
	// 		))

	// .andWhere(knex.raw("criteria_inc ilike any ( :arraySearch)", 
	// 		{arraySearch: medicationsArray(query.medications)}
	// 		))
	// .limit(10)
	.then(rows => {
		return getFacilityDistance(query.zipcode, rows)
			.then((results) => {
				return results.sort((a,b) => a.distance - b.distance)
			})
	})
	.then((rows) => {
		console.log(rows)
		res.send(rows)
	})
	.catch((error) => {
		res.send(new Error('Error querying database. ', error));
	});
}

// runQuery();
module.exports = {
	runQuery: runQuery,
}