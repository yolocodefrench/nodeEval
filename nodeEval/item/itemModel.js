var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var itemSchema = new Schema({
	'label' : String,
	'image' : String,
	'description' : String
});

module.exports = mongoose.model('item', itemSchema);
