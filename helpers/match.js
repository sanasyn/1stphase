const config = require('../config/config').heroku;
const pg = require('pg');
const knex = require('knex')(getConnectionOptions());

const geneticQuery = require('./translate').geneticQuery;
const petQuery = require('./translate').petQuery;
const spinalQuery = require('./translate').spinalQuery;
const mriSearch = require('./translate').mriSearch;
const memoryEvalArray = require('./translate').memoryEvalArray;
const medicationsArray = require('./translate').medicationsArray;
const query = require('./exampleObjects').complete;

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
	// console.log("BODY: ", req.body);
	// let query = req.body;
	return knex.select('nct_id','official_title','city','state','zip')
	.from('aact_master')
	.where(function() {
		this
		.where('minimum_age', '<=' , query.age)
		.andWhere('maximum_age', '>=' , query.age)
		.orWhere({
			'minimum_age': 'N/A',
			'maximum_age': 'N/A'
		})
	})
	.andWhere(function() {
		this
		.where('gender', query.gender)
		.orWhere('gender', 'All')
	})
	.andWhere(knex.raw("criteria_inc ilike any ( :arraySearch)", 
			{arraySearch: memoryEvalArray(query.memoryEval)}
			))
	.andWhere(knex.raw("criteria_inc ilike any ( :arraySearch)", 
			{arraySearch: geneticQuery(query.geneticTesting)}
			))
	.andWhere(knex.raw("criteria_inc ilike any ( :spinalSearch)", 
			{spinalSearch: spinalQuery(query.spinalTap)}
			))
	.andWhere(knex.raw("criteria_inc ilike ( :mriSearch)", 
			{mriSearch: mriSearch(query.mri)}
			))
	.andWhere(knex.raw("criteria_inc ilike any ( :arraySearch)", 
			{arraySearch: petQuery(query.pet)}
			))
	.andWhere(knex.raw("criteria_inc ilike any ( :arraySearch)", 
			{arraySearch: medicationsArray(query.medications)}
			))
	// .limit(10)
	.then(rows => {
		getFacilityDistance(query.zipcode, rows)
		// res.send(rows)
	})
	// .catch((error) => {
	// 	res.send(new Error('Error querying database. ', error));
	// });
}

runQuery();
// module.exports = {
// 	runQuery: runQuery,
// }