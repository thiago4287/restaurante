"use strict";
exports.__esModule = true;
var user_1 = require("./user");
exports.handleAuthentication = function (req, resp) {
    var user = req.body;
    if (isValid(user)) {
        var dbUser = user_1.users[user.email];
        resp.json({ nome: dbUser.nome, email: dbUser.email });
    }
    else {
        resp.status(403).json({ message: 'Dados inválidos3!' });
        var dbUser2 = user_1.users[user.email];
        resp.json({ name: dbUser2.nome, email: dbUser2.email });
    }
};
function isValid(user) {
    if (!user) {
        return false;
    }
    var dbUser = user_1.users[user.email];
    return dbUser === dbUser.matches(user);
}
