const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    fName: {
        type: String,
        required: true,
        trim: true
    },
    lName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true
    },
    hash_password : {
        type: String,
        required:true
    },
    role:{
        type: String,
        enum : ['User','Organization'],
        default: 'User'
    }
} , {timestamps:true} );


userSchema.virtual('password').set(function  (password) {
    this.hash_password =  bcrypt.hashSync(password , 10);
})

userSchema.methods ={
    authenticate : function(password) {
        return bcrypt.compareSync(password , this.hash_password);
    }
}

module.exports =  mongoose.model('User' , userSchema);
