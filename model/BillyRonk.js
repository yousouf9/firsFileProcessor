const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    data:{
        type:mongoose.Schema.Types.Mixed
    },
    "type":{
        type:String,
        required:true
    }
})

module.exports.BillyRonK = mongoose.model("BillyRonK", dataSchema);