var fs = require('fs');
let Item = require('./item.js')

module.exports.addItem = function (payload) {
    const obj = require('../db.json')
    let item= Item.item();
    if(Object.keys(payload).length == 3){
        if('label' in payload && 'image' in payload && 'description' in payload){
            console.log("#######")
            console.log(obj.items)
            for (let key in payload) {
                item[key] = payload[key]
            }
            try{
                
                if(obj.items.length == 0){
                    item.id = 0
                }
                else{
                    item.id = (obj.items[obj.items.length-1].id)+1
                }
                
                obj.items.push(item)
                console.log("%%%%%%%%%%%%%%%%%%%")
                console.log(obj.items)

                writeData(obj)

                              
                return {"status":200, "message" : "The item has been added"}
            }
            catch(error){
                return {"status":500,  "message" :error}
            }
        }
        else{
            return {"status":403,  "message" :"A field misses to create an item"}
        }
    }
    else{
        return {"status":403,  "message" :"A field misses to create an item"}
    }
    
}
module.exports.removeItem = function (id) {
    const obj = require('../db.json')
    let i = 0;
    if(obj.items.length > 0){
        for (i = 0; i < obj.items.length; i++) {
            if (id == obj.items[i].id) {
                try{
                    obj.items.splice(i, 1)
                    writeData(obj)
                    return {"status":200, "message" : `The item with the id ${id} has been deleted`}
                }
                catch(error){
                    return {"status":500, "message" : error}
                }
            }
        }
    }
    return {"status":404, "message" : "No Item with this id"}
    
}
module.exports.modifyItem = function (id, payload) {
    const obj = require('../db.json')
    let i = 0;
    for (i = 0; i < obj.items.length; i++) {
        if (id == obj.items[i].id) {
            try{
                for(var key in payload){
                    obj.items[i][key] = payload[key]
                }
            }
            catch(error){
                return {"status":500, "message" : error}
            }
            writeData(obj)
            return {"status":200, "message" : "The Item has been modified"}
        }
    }
}
module.exports.getItem = function (id) {
    const obj = require('../db.json')
    let i = 0;
    for (i = 0; i < obj.items.length; i++) {
        if (id == obj.items[i].id) {
            return {"status":200, "message" : JSON.stringify(obj.items[i])}
        }
    }
    return {"status":404, "message" : "No Item exists with this id"}
}

function writeData (obj) {
    fs.writeFile ("../db.json", JSON.stringify(obj, null, 4), function(err) {
        if (err) {
            console.log(err)
            throw err;
        }
        }
    );
}
