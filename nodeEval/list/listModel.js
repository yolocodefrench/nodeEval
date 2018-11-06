var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var listSchema = new Schema({
	'name' : String,
	'user' :  mongoose.Types.ObjectId,
	'items' : Array
});

module.exports = mongoose.model('list', listSchema);
