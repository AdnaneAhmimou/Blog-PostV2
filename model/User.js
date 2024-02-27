const post = require('./Post');
class User {
    static id = 0;

    constructor(firstName, lastName, email, password) {
        this.id = ++User.id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }
}

module.exports = User;