const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;
app.use(express.static(__dirname + '/public'));
app.use((req, res, next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(`${now}: ${req.method} ${req.url}`);
    fs.appendFile('server.log', log+'\n', (err)=>{
        if(err){
            console.log('Unable to write log');
        }
    });
    next();
});
// app.use((req, res, next)=>{
//     res.render('maintenance');
// });
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text)=>{
    return text.toUpperCase();
});
var object = {
    name: 'Ibrokhim',
    age: 22,
    married: false
};
var error = {
    errorMessage: 'Cannot fulfill your request',
    code: 404
};
app.get('/', function(req, res){
    res.render('home', {
        pageTitle: 'Home',
        message: 'Welcome to somewebsite'
    });
});
app.get('/about', (req, res)=>{
    res.render('about', {
       pageTitle: 'About Page',
    });
});
app.get('/bad', (req,res)=>{
    res.send(error);
});
app.set('view engine', 'hbs');
app.listen(port, ()=>{
    console.log(`Server is running with PORT ${port}`);
});
