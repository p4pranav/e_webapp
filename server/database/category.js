var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var catSchema = new Schema({
    category: {
        type: String,
        unique: true
    },
    description: String,
    image: String,
    cur_date:{
        type:Date,
        default:Date.now()
    }
})
module.exports = mongoose.model('category',catSchema);