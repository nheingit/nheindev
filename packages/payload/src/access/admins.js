"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.admins = void 0;
const checkRole_1 = require("../collections/Users/checkRole");
const admins = ({ req: { user } }) => {
    return (0, checkRole_1.checkRole)(['admin'], user);
};
exports.admins = admins;
