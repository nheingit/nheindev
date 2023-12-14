"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.slugField = void 0;
const deepMerge_1 = __importDefault(require("../utilities/deepMerge"));
const formatSlug_1 = __importDefault(require("../utilities/formatSlug"));
const slugField = (fieldToUse = 'title', overrides = {}) => (0, deepMerge_1.default)({
    name: 'slug',
    admin: {
        position: 'sidebar',
    },
    hooks: {
        beforeValidate: [(0, formatSlug_1.default)(fieldToUse)],
    },
    index: true,
    label: 'Slug',
    type: 'text',
}, overrides);
exports.slugField = slugField;
