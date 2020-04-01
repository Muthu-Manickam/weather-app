const request = require('request')

const geocode = (address,callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address + '.json?access_token=pk.eyJ1IjoibXV0aHUxOTk4IiwiYSI6ImNrN3l3NmNtMjAwNWkzbW84aW9rdW1taHIifQ.CJgfLd80woYS4lekJcLOpA'

    request({url, json : true}, (error,{body}) => { 
        if(error){
            callback('unable to connect to services',undefined)
        } else if(body.features.length === 0){
            callback('unable to find location', undefined)
        } else{
            callback(undefined, {
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location : body.features[0].place_name
            })
        }
    })
}

module.exports = geocode