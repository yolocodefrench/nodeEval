const listSchema = new mongoose.Schema({
    label: String,
    image: Number,
    description: [Number]
  })
  
module.exports.listSchema;