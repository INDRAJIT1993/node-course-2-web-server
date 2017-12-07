const express = require('express');
const hbs = require('hbs');
const fs =require('fs');
var port =process.env.PORT || 3000;
var app = express();
hbs.registerPartials(__dirname +'/views/partials')

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.use((req,res,next) =>{
    var now = new Date().toString();
    var log=(`${now}: ${req.method} ${req.url}`);
    console.log(log);
 fs.appendFile('consolelog', log + '\n');
    next();
});

app.use((req,res,next) =>{
res.render('maintianance.hbs');
});
hbs.registerHelper('getCurrentYear', () =>{
    return new Date().getFullYear()
});
hbs.registerHelper('screamIt', (text) =>{
    return text.toUpperCase();
});

app.get('/', (req, res) =>{
res.render('home.hbs', {
    pagetitle : 'home page',
    bodytext :'Welcome',
    

});
});

app.listen(port, () =>{
    console.log(`server is up and running at port ${port}`);
});

app.get('/about', (req, res) =>{
res.render('about.hbs', {
pagetitle : 'About page',

});

});

app.get('/bad', (req, res) =>{
res.send({
    errormsg:'unable to handle request'
});
});