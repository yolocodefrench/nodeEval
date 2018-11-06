const MongoClient = require('mongodb').MongoClient;

//Connection URL
const url = 'mongodb://localhost:27017'

//Database Name
const dbName = 'db'

//Create a new MongoClient
const client = new MongoClient(url, {useNewUrlParser: true});

class MongoConnector{
  init(){
    return new Promise((resolve, reject) => {
      //Use connect method to connect to the Server
      client.connect()
      .then(connectedClient => {
        this.client = connectedClient;
        this.db = client.db(dbName);
        console.log("Connected successfully to server");
        resolve(connectedClient);
      })
      .catch(err => {
        console.error("Failed to connect to server");
        throw err;
      })
    })
  }
}

const connector = new MongoConnector();
module.exports = connector;