import bcrypt = require("bcryptjs");
import validator = require("validator");
import uniqid = require("uniqid");
const mongoose = require("mongoose");
 
const UserSchema = mongoose.Schema({
	memberID: {
		type: String,
		index: true
	},
	username: {
		type: String,
		index: false
	},
	registerDate: {
		type: Number,
		index: false
	},
	lastLoginDate: {
		type: Number,
		index: false
	},
	password: {
		type: String
	},
	email: {
		type: String
	},
	refreshToken: {
		type: String
    },
    accessToken: {
        type: String
    }
});

var UserData = mongoose.model("User", UserSchema);


UserData.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	callback(err, isMatch);
	});
};

UserData.registerUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
		bcrypt.hash(newUser.password, salt, function(err, hash) {
			newUser.password = hash;
			newUser.memberID = uniqid();
			newUser.registerDate = new Date().getTime();
			newUser.save();
			callback(null, newUser);
		});
	});
};

UserData.getUserByEmail = function(email, callback){
	// console.log(validator.isEmail(email));
	UserData.findOne({email: email}, callback);
};

UserData.getUserByUsername = function(username, callback){
	UserData.findOne({username: username}, callback);
};

export = UserData;