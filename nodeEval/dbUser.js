var fs = require('fs');
let User = require('./user.js')


module.exports.addUser = function (payload) {
    var obj = require('../db.json')
    let user = User.user();
    if(obj.users.length == 0 ) {
        user.id = 0
        user.name = payload.name;
        user.password = payload.password;
        try{
            obj.users.push(user)
            writeData(obj)
            return {"status":200, "message" : "The user has been added"}
        }
        catch(error){
            return {"status":500,  "message" :"An error occured while adding the user to the database"}
        }
    }
    else{
        user.id = obj.users[(obj.users.length)-1].id + 1
        let i = 0;
        for (i = 0; i < obj.users.length; i++) {
            console.log(obj.users[i].password + ' : ' +  payload.password )
            if (obj.users[i].password == payload.password && obj.users[i].name == payload.name){
                return {"status":500, "message" :"A user already exists"}
            }
            user.name = payload.name;
            user.password = payload.password;
        }
        try{
            obj.users.push(user)
            writeData(obj)
            return {"status":200, "message" : "The user has been added"}
        }
        catch(error){
            return {"status":500,  "message" :"An error occured while adding the user to the database"}
        }
    }
    
    
}

module.exports.getUserByCredentials = function (name, password){
    var obj = require('../db.json')
    console.log(name, password)
    const user = obj.users.find((e) => e.name == name && e.password == password)
    if(user){
        return {"status":200, "message" : "The user exists"}
    }
    return {"status":500, "message" : "The user does not exist"}
    
    
}
module.exports.removeUser = function (id) {
    var obj = require('../db.json')
    let i = 0;
    if(obj.items.length > 0){
        for (i = 0; i < obj.users.length; i++) {
            if (id == obj.users[i].id) {
                try{
                    obj.users.splice(i, 1)
                    writeData(obj)
                    return {"status":200, "message" : `The user with the id ${id} has been deleted`}
                }
                catch(error){
                    return {"status":500, "message" : "An error occured while trying to delete the user"}
                }
            }
        }
    }
    return {"status":404, "message" : "No user with this id"}
}
module.exports.modifyUser = function (id, payload) {
    var obj = require('../db.json')
    let i = 0;
    for (i = 0; i < obj.users.length; i++) {
        if (id == obj.users[i].id) {
            try{
                for(var key in payload){
                    obj.users[i][key] = payload[key]
                }
            }
            catch(error){
                return {"status":500, "message" : error}
            }
            writeData(obj)
            return {"status":200, "message" : "The user has been modified"}
        }
    }
}
module.exports.getUser = function (id) {
    var obj = require('../db.json')
    let i = 0;
    for (i = 0; i < obj.users.length; i++) {
        if (id == obj.users[i].id) {
            return {"status":200, "message" : JSON.stringify(obj.users[i])}
        }
    }
    return {"status":404, "message" : "No user exists with this id"}
}

function writeData (obj) {
    fs.writeFile ("../db.json", JSON.stringify(obj, null, 4), function(err) {
        if (err) throw err;
        console.log('complete');
        }
    );
}
