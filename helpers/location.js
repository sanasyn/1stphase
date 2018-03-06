const config = require('../config/config').zipcode;
const pg = require('pg');
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

// Main function that invokes helper functions
function getDistance(source, facilities){
    return getSourceZip(source)
        .then((sourceZip) => facilityDistance(sourceZip, facilities))
        .then((facility) => {
            return facility.sort((a,b) => a.distance - b.distance)
        })
        .catch((err) => console.log(err))
}

// Function to return lat and long using user's zipcode
function getSourceZip(source){
    return knex
        .select('zipcode', 'latitude', 'longitude')
        .from('zipcodes')
        .where('zipcode', source)
        .limit(10)
        .then((row) => {
            return row[0];
        })
        .catch((err) => console.log(err))
}

// Map through facility results and perform math calculation for distance
function facilityDistance(source, facilities){
    const modifiedObj = facilities.map((facility) => {
        return knex
                .select('zipcode', 'latitude', 'longitude')
                .from('zipcodes')
                .where('zipcode', facility.zip)
                .limit(10)
                .then((row) => {
                    return row[0];
            })
            .then((dest) => doMath(source, dest))
            .then((dist) => {
                facility.distance = dist;
                return facility
            })
    })

    return Promise.all(modifiedObj)
}

// Math calculations using the haversine formula: https://www.movable-type.co.uk/scripts/latlong.html
function doMath(source, dest){
    const earthRadius = 3959;
    const sourceLat = parseFloat(source.latitude);
    const sourceLong = parseFloat(source.longitude);
    const destLat = parseFloat(dest.latitude);
    const destLong = parseFloat(dest.longitude);
    const sourceLatRad = sourceLat*Math.PI/180;
    const destLatRad = destLat*Math.PI/180;
    const deltaLatRad = (destLat - sourceLat)*Math.PI/180;
    const deltaLongRad = (destLong - sourceLong)*Math.PI/180;

    const a = Math.sin(deltaLatRad/2) * Math.sin(deltaLatRad/2) + Math.cos(sourceLatRad) * Math.cos(destLatRad) * Math.sin(deltaLongRad/2) * Math.sin(deltaLongRad/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const distance = earthRadius * c;
    return Math.round(distance);
}

module.exports = getDistance;