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
  const study = req.body;

  return getStudyInfo(study)
    .then((data)=> getContactInfo(data, study))
    .then((data) => res.send(data))
}

function getStudyInfo(study){
  return knex
    .select('nct_id','official_title','description','phase','city','state','zip','criteria_inc','criteria_ex')
    .from('aact_master')
    .where('facility_id', '=', study.facility_id)
    .then(row => {
      return row
    })
}

function getContactInfo(data, study){
  return knex
    .select('facility_name','central_contact_name','central_contact_phone','central_contact_email','facility_contact_name','facility_contact_phone','facility_contact_email','facility_name')
    .from('contact_info')
    .where('facility_id', '=', study.facility_id)
    .then(row => {
      return {
        study: data,
        contact: row
      }
    })
}

module.exports = getDetails;