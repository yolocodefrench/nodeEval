class List {
    constructor(){
        this.name = '';
        this.user = 0;
        this.items = [];
    }
}

const listSchema = new mongoose.Schema({
    name: String,
    user: Number,
    item: [Number]
  })
  
module.exports.studentSchema;
module.exports.list = function (){
    return new List();
};