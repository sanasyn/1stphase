import axios from 'axios';
const APIKEY = 'AIzaSyCE5Q3BcZRFr9SCjfnfxIOdFk54_3gSl5I';

const locationHelper = {
    getFacilityDistance: (zip, facilities) => {
        const modifiedObj = facilities.map((facility) => {
            const facilityAddress = facility.city+','+facility.state+','+facility.zip;

            return axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${zip}&destinations=${facilityAddress}&key=${APIKEY}`)
                .then((res) => {
                    let miles = (res.data.rows[0].elements[0].distance.text).slice(0,-3);
                    facility.distance = parseInt(miles.replace(/,/g,''));
                    
                    return facility
                })
        })

        return Promise.all(modifiedObj)
    }
}

export default locationHelper;