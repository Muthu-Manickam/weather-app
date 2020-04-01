const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000

// Define path for express config
const publicPathDirectory = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../template/views')
const partialsPath = path.join(__dirname, '../template/partials')

//Setup handlebars and views engine
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicPathDirectory))

app.get('', (req, res) => {
    res.render('index', {
        title : 'weather',
        name : 'muthu'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title : 'help',
        name : 'muthu',
        helpText : 'helping is the best habit'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title : 'about',
        name : 'muthu'
    })
})

app.get('/weather',(req, res) => {
   
    if(!req.query.address) {

        res.send({
            error: 'Address is required'
        });

    } else {

        geocode(req.query.address,(error,{latitude, longitude, location} = {}) => { 
            if(error){
                res.send({
                    error: error
                });
            } else{
                forecast(latitude,longitude,location,(error,forecast) => {
                    if(error){
                        res.send({
                            error: error
                        });
                    } else{
                        // console.log(summary,'It is currenty ',temperature,' degree. There is ',rain,'% chances of rain in ',location)
                        res.send({
                            location,
                            forecast: forecast,
                            address: req.query.address
                        });
                    }
                })
            }
        })

    }
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'muthu',
        errorMessage: 'help page not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'muthu',
        errorMessage: 'page not found'
    })
})

app.listen(port, () => {
    console.log('port '+port)
})