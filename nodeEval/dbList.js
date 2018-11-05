var fs = require('fs');
let List = require('./list.js')
let dbUser = require('./dbUser.js')


module.exports.addList = function (payload) {
    var obj = require('../db.json')
    let list = List.list();

    if('name' in payload && 'user' in payload){
        if(obj.lists.length == 0 ) {
            list.id = 0
        }
        else{
            list.id = obj.lists[obj.lists.length-1].id + 1 
        }
        let i = 0;
        for (i = 0; i < obj.lists.length; i++) {
            if (obj.lists[i].name == payload.name){
                return {"status":403, "message" :"A list already exists"}
            }
    
            let response = dbUser.getUser(payload.user)
            if(response.status != 200){
                return {"status":403, "message" :`the user with the id ${payload.user} does not exists`}
            }
            
        }
        try{
            list.name = payload.name;
            list.user = payload.user
            obj.lists.push(list)
            writeData(obj)
            return {"status":200, "message" : "The list has been added"}
        }
        catch(error){
            return {"status":500,  "message" :"An error occured while adding the list to the database"}
        }
    }
    else{
        return {"status":403, "message" :'A field misses to create a list'}
    }
    
}
module.exports.removeList = function (id) {
    var obj = require('../db.json')
    let i = 0;
    if(obj.items.length > 0){
        for (i = 0; i < obj.lists.length; i++) {
            if (id == obj.lists[i].id) {
                try{
                    obj.lists.splice(i, 1)
                    writeData(obj)
                    return {"status":200, "message" : `The list with the id ${id} has been deleted`}
                }
                catch(error){
                    return {"status":500, "message" : error}
                }
            }
        }
    }
    return {"status":404, "message" : "No list with this id"}
}
module.exports.modifyList = function (id, payload) {
    var obj = require('../db.json')
    let i = 0;
    for (i = 0; i < obj.lists.length; i++) {
        if (id == obj.lists[i].id) {
            try{
                for(var key in payload){
                    if (key == 'items') {
                        return {"status" : 403, "message":"You are not allowed to modify items directly"}
                    }
                    obj.lists[i][key] = payload[key]
                }
            }
            catch(error){
                return {"status":500, "message" : error}
            }
            writeData(obj)
            return {"status":200, "message" : "The list has been modified"}
        }
    }
}
module.exports.getList = function (id) {
    var obj = require('../db.json')
    let i = 0;
    for (i = 0; i < obj.lists.length; i++) {
        if (id == obj.lists[i].id) {
            return {"status":200, "message" : JSON.stringify(obj.lists[i])}
        }
    }
    return {"status":404, "message" : "No list exists with this id"}
}

module.exports.addItem = function (idList, idItem) {
    var obj = require('../db.json')
    if (obj.lists.find((e) => e.id == idList)){
        obj.lists.find((e) => e.id == idList).items.push(parseInt(idItem))
        writeData(obj)
        return {"status":200, "message" : "item added to the list"}
    }
    return {"status":404, "message" : "No list exists with this id"}
}
module.exports.removeItem = function (idList, idItem) {
    var obj = require('../db.json')
    if (obj.lists.find((e) => e.id == idList)){
        const index = obj.lists.find((e) => e.id == idList).items.findIndex((e) => e == idItem)
        if (index != undefined){
            obj.lists.find((e) => e.id == idList).items.splice(index,1);
            writeData(obj);
            return {"status":200, "message" : "item deleted from the list"};
        }
        return {"status":404, "message" : "No item found with this id"};
    }
    return {"status":404, "message" : "No list exists with this id"};
}

function writeData (obj) {

    fs.writeFile ("../db.json", JSON.stringify(obj, null, 4), function(err) {
        if (err) throw err;
            return err
        }
    );
}
