const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const bcrypt = require('bcrypt');


var UserSchema = new mongoose.Schema({
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true }
});

UserSchema.pre('save', function(next) {
    var user = this;

// only hash the password if it has been modified (or is new)
if (!user.isModified('password')) return next();

// generate a salt
bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) return next(err);

        // override the cleartext password with the hashed one
        user.password = hash;
        next();
    });
});


});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

// FLIPCARD SCHEMA
// deck: String, required
// question: String, required
// answer: String, required

var flipcardSchema = new mongoose.Schema({
    deck: { type: String, required: true },
    question: String,
    answer: String
});

const User = mongoose.model('User', UserSchema);
const Flipcard = mongoose.model('Flipcard', flipcardSchema);

module.exports = {User, Flipcard};
