const axios = require('axios');
const APIKEY = require('../config/config').googlemaps;

const getFacilityDistance = (zip, facilities) => {
    const addressArray =[];
    // facilities.map((facility) => {
    //     if (facility.state && !isNaN(facility.zip) && facility.zip.length === 5) {
    //         addressArray.push(facility);
    //     }
    // })
    const modifiedObj = facilities.map((facility) => {
        const facilityAddress = constructAddress(facility);
        console.log("FACILITY ADDRESS: ", facilityAddress);

        return axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${zip}&destinations=${facilityAddress}&key=${APIKEY}`)
            .then((res) => {
                // console.log("RES: ",res);
                let miles = res.data.rows[0].elements[0].status === "OK" ? (res.data.rows[0].elements[0].distance.text).slice(0,-3) : "100000";
                facility.distance = parseInt(miles.replace(/,/g,''));

                return facility
            })
    })

    return Promise.all(modifiedObj)
    .then(values => {
        return values.sort((a,b) => a.distance - b.distance)
    })
    .catch(error => {
        console.log(error.error)
        return error.error
    })
}

function constructAddress(facility){
    return facility.city+','+facility.state+','+facility.zip
}

module.exports = getFacilityDistance;