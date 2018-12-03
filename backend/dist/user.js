"use strict";
exports.__esModule = true;
var User = /** @class */ (function () {
    function User(email, nome, passsword) {
        this.email = email;
        this.nome = nome;
        this.passsword = passsword;
    }
    User.prototype.matches = function (another) {
        return another !== undefined &&
            another.email === this.email &&
            another.passsword === this.passsword;
    };
    return User;
}());
exports.User = User;
exports.users = {
    "juliana@gmail.com": new User('juliana@gmail.com', 'Juliana', 'juliana23'),
    "carlos@gmail.com": new User('carlos@gmail.com', 'Carlos', 'carlos12')
};
