let express = require('express');
let jwt = require('jsonwebtoken');
let config = require('config');
let fs = require('fs')
let app = express();
const item = require('./item/itemRoutes')
const list = require('./list/listRoutes')
const user = require('./user/userRoutes')
const userController = require('./user/userController')
var mongoose = require('mongoose');

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


var url = 'mongodb://127.0.0.1:27017/db';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.on('open', function(){
	console.log('Connected');
});

let formatLog = (str) => (new Date()).toDateString() + "::" + str + "\r\n";

app.post('/', (req, res) => {
    userController.authenticate(req, res)
});

app.use(
    (req, res, next) => {
        try {

            if(!req.headers.authorization){
                next("token")
            }
            else{
                const token = req.headers.authorization.replace("Bearer ", "")
                jwt.verify(token, config.get('server.secret'));
                next();
            }
            
        } catch (error) {
            next(error)
        }
    },
    (req, res, next) => {
        fs.writeFileSync('../logs/request.log', formatLog(req.method + " " + req.originalUrl), { flag: 'a' });
        next();
});

app.use('/user', user)
app.use('/list', list)
app.use('/item', item)
app.use((err, req, res, next) => {
    if (err) {
        if (err == "token"){
            res.send('You have to provide a token')
        }
        fs.writeFileSync('../logs/error.log', formatLog(req.method + " " + req.originalUrl) + err, { flag: 'a' });
    }
    next();
});


app.listen(8080, function () {
    console.log('APIlistening on port 8080')
})