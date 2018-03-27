const config = require('../config/config').zipcode;
const pg = require('pg');
const knex = require('knex')(getConnectionOptions());
const zipcodes = require('zipcodes')

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

// Main function that invokes helper functions below
function getDistance(source, facilities){
    return handleZipExceptions(facilities)
        .then((modFacilities) => getSourceZip(source, modFacilities))
        .then((obj) => facilityDistance(obj))
        .then((facility) => {
            return facility.sort((a,b) => a.distance - b.distance)
        })
        .catch((err) => console.log(err))
}

function handleZipExceptions(facilities) {
    const modifiedFacilities = facilities.map((facility) => {
        if (facility.zip.indexOf('-') > -1) {
            facility.zip = facility.zip.substring(0,5);
        }

        const checkZip = zipcodes.lookup(facility.zip)

        if (typeof checkZip === 'undefined' && facility.country === 'United States') {
            facility.zip = zipcodes.lookupByName(facility.city, facility.state).length > 1 ? 
                zipcodes.lookupByName(facility.city, facility.state)[1].zip : 
                zipcodes.lookupByName(facility.city, facility.state)[0].zip;
            return facility

        }
        else if (typeof checkZip === 'undefined' && facility.country === 'Canada') {
            return knex
            .select('zipcode')
            .from('zipcodes')
            .where('city', 'like', '%'+facility.city+'%')
            .andWhere('state', 'like', '%'+facility.state+'%')
            .then((row) => {
                facility.zip = row[0].zipcode
                return facility
            })
            .catch((err) => console.log(err))
        }
        else return facility
    })
    return Promise.all(modifiedFacilities);
}

// Function to return lat and long using user's zipcode
function getSourceZip(source, facilities){
    return knex
        .select('zipcode', 'latitude', 'longitude')
        .from('zipcodes')
        .where('zipcode', source)
        .then((row) => {
            return {source: row[0], facilities: facilities};
        })
        .catch((err) => console.log(err))
}

// Map through facility results and perform math calculation for distance
function facilityDistance(obj){
    const modifiedObj = obj.facilities.map((facility) => {
        return knex
            .select('zipcode', 'latitude', 'longitude')
            .from('zipcodes')
            .where('zipcode', facility.zip)
            .then((row) => {
                return row[0];
            })
            .then((dest) => doMath(obj.source, dest))
            .then((dist) => {
                facility.distance = dist;
                return facility
            })
            .catch((err) => console.log(err))
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