"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_1 = __importDefault(require("../utilities/deepMerge"));
const link_1 = __importDefault(require("./link"));
const linkGroup = ({ appearances, overrides = {} } = {}) => {
    const generatedLinkGroup = {
        name: 'links',
        fields: [
            (0, link_1.default)({
                appearances,
            }),
        ],
        type: 'array',
    };
    return (0, deepMerge_1.default)(generatedLinkGroup, overrides);
};
exports.default = linkGroup;
