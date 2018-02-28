
// Example API call
// https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=78705&destinations=75074|32502|43210&key=APIKEY

const axios = require('axios');
const APIKEY = require('../config/config').googlemaps;

const getFacilityDistance = (zip, facilities) => {
    const facilityAddresses = getZip(facilities);
    
    axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${zip}&destinations=${facilityAddresses}&key=${APIKEY}`)
        .then((res) => {
            console.log(res.data)
            console.log(res.data.rows[0].elements)
        })
        .then(() => {
            console.log(facilities)
        })
}

function getZip(facilities){
    let facilitiesList = [];
    facilities.map((res) => {
        facilitiesList.push(res.city +','+ res.state +','+ res.zip)
    })
    return facilitiesList.join('|')
}

module.exports = getFacilityDistance;