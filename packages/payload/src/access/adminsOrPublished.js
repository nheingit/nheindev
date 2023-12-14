"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminsOrPublished = void 0;
const checkRole_1 = require("../collections/Users/checkRole");
const adminsOrPublished = ({ req: { user } }) => {
    if (user && (0, checkRole_1.checkRole)(['admin'], user)) {
        return true;
    }
    return {
        _status: {
            equals: 'published',
        },
    };
};
exports.adminsOrPublished = adminsOrPublished;
