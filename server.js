const express = require("express");
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        console.log("Unable to write to file");
    });
    next();
});

/* app.use((req, res, next) => {
    res.render('maintenance.hbs');
}); */

app.use(express.static(__dirname + '/public'))

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    // res.send("<h1>Hello Express!</h1>");
    /* res.send({
        name: "John",
        likes: ["Books", "Biking"]
    }) */
    res.render('home.hbs', {
        pageTitle: 'Home page',
        welcomeMessage: 'Welcome to Home page'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {pageTitle: 'About'});
});
app.get('/projects', (req, res) => {
    res.render('projects.hbs', { pageTitle: 'Projects', message: 'Projects list' });
});

app.get('/bad', (req, res) => {
    res.send({error: "Unable to handle the request"})
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});