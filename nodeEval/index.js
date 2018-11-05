let express = require('express');
let dbUser = require('./dbUser.js')
let dbItem = require('./dbItem.js')
let dbList = require('./dbList.js')
let jwt = require('jsonwebtoken');
let config = require('config');
let fs = require('fs')
let app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

let formatLog = (str) => (new Date()).toDateString() + "::" + str + "\n";

app.post('/', (req, res) => {
    let name = req.body.name;
    let password = req.body.password;
    response = dbUser.getUserByCredentials(name,password)
    if(response.status == 200){
        let token = jwt.sign({ 'user': {'name': name, 'password' : password }, version: '1.0.0' }, config.get('server.secret'));
        res.send({
            token: token
        });
    }
    else{
        res.send(response)
    }
    
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
app.get('/user/:id', (req, res) => {
    let response = db.getUser(req.params.id);
    if(response.status != 200){
        next(response)
    }
    req.statusCode = response.status;
    res.setHeader('Content-Type', 'text/plain');
    res.end(response.message);
});
app.post('/user/', (req, res) => {
    const response = dbUser.addUser(req.body);
    if(response.status != 200){
        next(response)
    }
    req.statusCode = response.status;
    res.setHeader('Content-Type', 'text/plain');
    res.end(response.message);
});
app.put('/user/:id', (req, res) => {
    response = dbUser.modifyUser(req.params.id, req.body)
    if(response.status != 200){
        next(response)
    }
    req.statusCode = response.status;
    res.setHeader('Content-Type', 'text/plain');
    res.end(response.message);
});
app.delete('/user/:id', (req, res) => {
    response = dbUser.removeUser(req.params.id)
    if(response.status != 200){
        next(response)
    }
    req.statusCode = response.status;
    res.setHeader('Content-Type', 'text/plain');
    res.end(response.message);
});

app.get('/item/:id', (req, res) => {
    let response = dbItem.getItem(req.params.id);
    if(response.status != 200){
        next(response)
    }
    req.statusCode = response.status;
    res.setHeader('Content-Type', 'text/plain');
    res.end(response.message);
});
app.post('/item/', (req, res) => {
    const response = dbItem.addItem(req.body);
    if(response.status != 200){
        next(response)
    }
    req.statusCode = response.status;
    res.setHeader('Content-Type', 'text/plain');
    res.end(response.message);
});
app.put('/item/:id', (req, res) => {
    response = dbItem.modifyItem(req.params.id, req.boy)
    if(response.status != 200){
        next(response)
    }
    req.statusCode = response.status;
    res.setHeader('Content-Type', 'text/plain');
    res.end(response.message);
})
app.delete('/item/:id', (req, res) => {
    response = dbItem.removeItem(req.params.id)
    if(response.status != 200){
        next(response)
    }
    req.statusCode = response.status;
    res.setHeader('Content-Type', 'text/plain');
    res.end(response.message);
});

app.get('/list/:id', (req, res) => {
    let response = dbList.getList(req.params.id);
    if(response.status != 200){
        next(response)
    }
    req.statusCode = response.status;
    res.setHeader('Content-Type', 'text/plain');
    res.end(response.message);
});
app.post('/list/', (req, res) => {
    const response = dbList.addList(req.body);
    if(response.status != 200){
        next(response)
    }
    req.statusCode = response.status;
    res.setHeader('Content-Type', 'text/plain');
    res.end(response.message);
});
app.put('/list/:id', (req, res) => {
    response = dbList.modifyList(req.params.id, req.boy)
    if(response.status != 200){
        next(response)
    }
    req.statusCode = response.status;
    res.setHeader('Content-Type', 'text/plain');
    res.end(response.message);
});
app.delete('/list/:id', (req, res) => {
    response = dbList.removeList(req.params.id)
    if(response.status != 200){
        next(response)
    }
    req.statusCode = response.status;
    res.setHeader('Content-Type', 'text/plain');
    res.end(response.message);
});
app.put('/list/:idList/item/:idItem', (req, res) => {
    response = dbList.addItem(req.params.idList, req.params.idItem);
    if(response.status != 200){
        next(response)
    }
    req.statusCode = response.status;
    res.setHeader('Content-Type', 'text/plain');
    res.end(response.message);
})
app.delete('/list/:idList/item/:idItem', (req, res) => {
    response = dbList.removeItem(req.params.idList, req.params.idItem);
    if(response.status != 200){
        next(response)
    }
    req.statusCode = response.status;
    res.setHeader('Content-Type', 'text/plain');
    res.end(response.message);
})
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

