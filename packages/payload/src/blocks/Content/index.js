"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Content = void 0;
const invertBackground_1 = require("../../fields/invertBackground");
const link_1 = __importDefault(require("../../fields/link"));
const richText_1 = __importDefault(require("../../fields/richText"));
const columnFields = [
    {
        name: 'size',
        defaultValue: 'oneThird',
        options: [
            {
                label: 'One Third',
                value: 'oneThird',
            },
            {
                label: 'Half',
                value: 'half',
            },
            {
                label: 'Two Thirds',
                value: 'twoThirds',
            },
            {
                label: 'Full',
                value: 'full',
            },
        ],
        type: 'select',
    },
    (0, richText_1.default)(),
    {
        name: 'enableLink',
        type: 'checkbox',
    },
    (0, link_1.default)({
        overrides: {
            admin: {
                condition: (_, { enableLink }) => Boolean(enableLink),
            },
        },
    }),
];
exports.Content = {
    fields: [
        invertBackground_1.invertBackground,
        {
            name: 'columns',
            fields: columnFields,
            type: 'array',
        },
    ],
    slug: 'content',
};
