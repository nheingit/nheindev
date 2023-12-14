"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hero = void 0;
const richtext_lexical_1 = require("@payloadcms/richtext-lexical");
const label_1 = require("./lexicalFeatures/label");
const largeBody_1 = require("./lexicalFeatures/largeBody");
const linkGroup_1 = __importDefault(require("./linkGroup"));
const richText_1 = __importDefault(require("./richText"));
exports.hero = {
    name: 'hero',
    fields: [
        {
            name: 'type',
            defaultValue: 'lowImpact',
            label: 'Type',
            options: [
                {
                    label: 'None',
                    value: 'none',
                },
                {
                    label: 'High Impact',
                    value: 'highImpact',
                },
                {
                    label: 'Medium Impact',
                    value: 'mediumImpact',
                },
                {
                    label: 'Low Impact',
                    value: 'lowImpact',
                },
            ],
            required: true,
            type: 'select',
        },
        (0, richText_1.default)({
            editor: (0, richtext_lexical_1.lexicalEditor)({
                features: [
                    (0, richtext_lexical_1.ParagraphFeature)(),
                    (0, richtext_lexical_1.HeadingFeature)({ enabledHeadingSizes: ['h1'] }),
                    (0, richtext_lexical_1.LinkFeature)({}),
                    (0, label_1.LabelFeature)(),
                    (0, largeBody_1.LargeBodyFeature)(),
                ],
            }),
        }),
        (0, linkGroup_1.default)({
            overrides: {
                maxRows: 2,
            },
        }),
        {
            name: 'media',
            admin: {
                condition: (_, { type } = {}) => ['highImpact', 'mediumImpact'].includes(type),
            },
            relationTo: 'media',
            required: true,
            type: 'upload',
        },
    ],
    label: false,
    type: 'group',
};
