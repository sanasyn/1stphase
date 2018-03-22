const config = require('../config/config').local;
const knex = require('knex')(getConnectionOptions());

function getConnectionOptions() {
	return {
		client: config.client,
		connection : {
			host: config.host,
			user: config.user,
			password: config.password,
			database: config.database,
		}
	}
}

// Object to hold default values for app use reasons
let reason = {
  familyHistory: false,
  researchInterest: false,
  memoryComplaints: false,
  other: false,
  otherReason: ""
}

// Inserts user's reason(s) for using the app into the database
function insertReason(req, res){
  return setValues(req.body, reason)
    .then((val) => {
      return knex
        .insert([{
          family_history: val.familyHistory, 
          interest_in_research: val.researchInterest, 
          memory_complaints: val.memoryComplaints, 
          other: val.other, 
          other_reason: val.otherReason
        }])
        .into('use_reason')
    })
    .then(() => res.send("Use reason inserted into db"))
    .catch((err) => Promise.reject(err))

}

// Helper function to set values to true if user selected reason for use
function setValues(req, reason){
  if (req.list.indexOf("Family history of Alzhimer's Disease") !== -1 ) reason.familyHistory = true;
  if (req.list.indexOf("Interested in Clinical research") !== -1) reason.researchInterest = true;
  if (req.list.indexOf("Memory Complants") !== -1) reason.memoryComplaints = true;
  if (req.list.indexOf("Other") !== -1) reason.other = true;
  if (req.otherText.length > 0) reason.otherReason = req.otherText;

  return Promise.resolve(reason)
}

module.exports = insertReason;