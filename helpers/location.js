const axios = require('axios');
const APIKEY = require('../config/config').googlemaps;

const getFacilityDistance = (zip, facilities) => {
    
    const modifiedObj = facilities.map((facility) => {
        const facilityAddress = constructAddress(facility);

        return axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${zip}&destinations=${facilityAddress}&key=${APIKEY}`)
            .then((res) => {
                let miles = (res.data.rows[0].elements[0].distance.text).slice(0,-3);
                facility.distance = parseInt(miles.replace(/,/g,''));

                return facility
            })
    })

    return Promise.all(modifiedObj)
}

function constructAddress(facility){
    return facility.city+','+facility.state+','+facility.zip
}

module.exports = getFacilityDistance;