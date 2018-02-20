const config = require('../config/config');
const pg = require('pg');
const knex = require('knex')(getConnectionOptions());

const geneticQuery = require('./translate').geneticQuery;
const petQuery = require('./translate').petQuery;
const spinalQuery = require('./translate').spinalQuery;
const mriSearch = require('./translate').mriSearch;
const memoryEvalArray = require('./translate').memoryEvalArray;
const medicationsArray = require('./translate').medicationsArray;
const query = require('./exampleObjects').complete;

function getConnectionOptions() {
	return {
		client: config.local.client,
		connection : {
			host: config.local.host,
			user: config.local.user,
			password: config.local.password,
			database: config.local.database
		}
	}
}

function runQuery() {
	return knex.count()
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
	.andWhere(function() {
		this
		.where(knex.raw("criteria_inc like all ( :spinalSearch)", 
			{spinalSearch: spinalQuery(query.spinalTap)}
			));
	})
	.andWhere(function() {
		this
		.where(knex.raw("criteria_inc like ( :mriSearch)", 
			{mriSearch: mriSearch(query.mri)}
			));
	})
	.andWhere(function() {
		this
		.where(knex.raw("criteria_inc like all ( :arraySearch)", 
			{arraySearch: petQuery(query.pet)}
			));
	})
	.andWhere(function() {
		this
		.where(knex.raw("criteria_inc like any ( :arraySearch)", 
			{arraySearch: memoryEvalArray(query.memoryEval)}
			));
	})
	.andWhere(function() {
		this
		.where(knex.raw("criteria_inc like any ( :arraySearch)", 
			{arraySearch: medicationsArray(query.medications)}
			));
		// .where(knex.raw("criteria_inc like any (array['%donepezil%', '%aricept%', '%cholinesterase%', '%rivastigmine%', '%exelon%', '%galantamine%', '%razadyne%', '%memantine%', '%namenda%' ])"));
		// .where(knex.raw("criteria_inc like any (array ?,?,?,?,?,?,?,?,?)", medicationsArray(query.medications)));
		// .where(knex.raw("criteria_inc like any (array['%donepezil%','%memantine%'])"));
		// .where(knex.raw("criteria_inc ~ 'donepezil'"))
	})
	.then(function(rows) {
		console.log(rows);
	})
	.catch(function(error){
		console.log(error)
	});
}

function testQuery() {
	return knex.select()
	.from('aact_master')
	.where('nct_id','NCT02951559')
	.then(function(rows) {
		console.log(rows);
	})
	.catch(function(error){
		console.log(error)
	});
}

// medicationsArray(query.medications);
runQuery();
// testQuery();