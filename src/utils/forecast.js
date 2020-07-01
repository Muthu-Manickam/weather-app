// This file is to get forecast from the internet
request = require('request')

const forecast = (latitude,longitude,location,callback) => {

    const url = 'https://api.darksky.net/forecast/c9b49d1a583448f5a1fa27ac393cb355/'+latitude+','+longitude;

    request({url, json : true}, (error,{body}) => {
        if(error){
            callback('unable to connect to services',undefined)
        } else if(body.error){
            callback('unable to find the weather',undefined)
        } else{
            callback(undefined,body.daily.data[0].summary+'It is currenty '+body.currently.temperature+' degree. The temperature high is '+body.daily.data[0].temperatureHigh+' degree. The temperature high is '+body.daily.data[0].temperatureLow+' degree. There is '+body.currently.precipProbability+'% chances of rain')
        }
    })
}

module.exports = forecast