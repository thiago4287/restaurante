"use strict";
exports.__esModule = true;
var User = /** @class */ (function () {
    function User(email, nome, password) {
        this.email = email;
        this.nome = nome;
        this.password = password;
    }
    User.prototype.matches = function (another) {
        return another !== undefined &&
            another.email === this.email &&
            another.password === this.password;
    };
    return User;
}());
exports.User = User;
exports.users = {
    "juliana@gmail.com": new User('juliana@gmail.com', 'Juliana', 'juliana23'),
    "carlos@gmail.com": new User('carlos@gmail.com', 'Carlos', 'carlos12')
};
