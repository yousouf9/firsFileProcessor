const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    data:{
        type:mongoose.Schema.Types.Mixed
    },
    data_type:{
        type:String,
        required:true
    }
})

module.exports.Etisalat = mongoose.model("Etisalat", dataSchema);