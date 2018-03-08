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
const caregiverQueryInc = require('./translate').caregiverQueryInc;
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
	return knex
	// .distinct()
	.select('nct_id','official_title','facility_id','city','state','zip','country')
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
	// // GOOD
	.andWhere(knex.raw("criteria_ex NOT ILIKE any ( :search)",
			{search: geneticQueryEx(query.geneticTesting)}
			))
	.andWhere(knex.raw("criteria_inc ILIKE ( :search)", 
			{search: geneticQueryInc(query.geneticTesting)}
			))
	// // GOOD
	.andWhere(knex.raw("criteria_ex NOT ILIKE :mriSearch", 
			{mriSearch: mriQuery(query.mri)}
			))
	// // GOOD
	.andWhere(knex.raw("criteria_ex NOT ILIKE any ( :arraySearch)",
			{arraySearch: petQuery(query.pet)}
			))
	// //GOOD
	.andWhere(knex.raw("criteria_ex NOT LIKE any ( :spinalSearch)", 
			{spinalSearch: spinalQuery(query.spinalTap)}
			))
	// //GOOD
	.andWhere(knex.raw("criteria_ex NOT ILIKE any ( :strokeSearch)", 
			{strokeSearch: strokeQuery(query.stroke)}
			))
	// // //GOOD
	.andWhere(knex.raw("criteria_ex NOT ILIKE any ( :arraySearch)", 
			{arraySearch: medicationsQuery(query.medications)}
			))
	// // //GOOD
	.andWhere(knex.raw("criteria_inc NOT ILIKE any ( :careSearch)", 
			{careSearch: caregiverQueryInc(query.informant)}
			))
	// .limit(10)
	.then(rows => {
		return getFacilityDistance(query.zipcode, rows)
			.then((results) => {
				console.log(results)
				res.send(results)
			})
	})
	// .then((rows) => {
	// 	console.log(rows)
	// 	res.send(rows)

	// })
	.catch((error) => {
		res.send(new Error('Error querying database. ', error));
	});
}

// runQuery();
module.exports = {
	runQuery: runQuery,
}