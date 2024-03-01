const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
// Define paths for handlebars

const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../src/templates/views')
const partialsPath = path.join(__dirname, '../src/templates/partials')

// setup handlebars engine
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirPath))

// pass values for templates
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Gowrav Krishna',
        age: 35
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Us',
        name: 'Gowrav Krishna',
        age: 35
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Us',
        name: 'Gowrav Krishna',
        age: 35
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        console.log("empty")
        console.log(req.query)
        return res.send({
            error: 'you must provide a search term'
        })
    }

    res.send({
        products: req.query.products,
        search: req.query.search
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Page Not Found 404'
    })
})

app.listen(3000, () => {
    console.log("running express up with port 3000")
})