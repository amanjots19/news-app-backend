const mongoose = require('mongoose');


var User = new mongoose.Schema({
    name : String,
    email:{
        type:String,
    },
    password : {
        type:String,
    },
    date: { type: Date, default: Date.now },
    sourcename : [{
        type: String
    }]
});
User.methods.addSource = function(sourcename){
    const source = sourcename;


}
module.exports = mongoose.model('User', User);
