const config = require('../config/config').heroku;
const knex = require('knex')(getConnectionOptions());

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

function getDetails(req, res){
  console.log(req.body)
  let study = req.body;

  return knex
    .select('nct_id','official_title','description','phase')
    .from('aact_master')
    .where('facility_id', '=', study.facility_id)
    .then(row => {
      res.send(row)
    })
}

function getStudyInfo(study){
  return knex
    .select('nct_id','official_title','description','phase')
    .from('aact_master')
    .where('facility_id', '=', study.facility_id)
    .then(row => {
      res.send(row)
    })
}

function getContactInfo(study){
  return knex
    .select('facility_name','central_contact_name','central_contact_phone','central_contact_email','facility_contact_name','facility_contact_phone','facility_contact_email')
    .from('contact_info')
    .where('facility_id', '=', study.facility_id)
    .then(row => {
      res.send(row)
    })
}

module.exports = getDetails;