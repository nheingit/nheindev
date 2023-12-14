"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const richtext_lexical_1 = require("@payloadcms/richtext-lexical");
const deepMerge_1 = __importDefault(require("../../utilities/deepMerge"));
const link_1 = __importDefault(require("../link"));
const defaultFeatures_1 = require("./defaultFeatures");
const richText = (overrides, additions = {
    features: [],
}) => (0, deepMerge_1.default)({
    name: 'richText',
    editor: (0, richtext_lexical_1.lexicalEditor)({
        features: () => [
            ...[...defaultFeatures_1.defaultPublicDemoFeatures, ...(additions.features || [])],
            (0, richtext_lexical_1.UploadFeature)({
                collections: {
                    media: {
                        fields: [
                            {
                                name: 'caption',
                                editor: (0, richtext_lexical_1.lexicalEditor)({
                                    features: () => [(0, richtext_lexical_1.ParagraphFeature)(), ...defaultFeatures_1.defaultPublicDemoFeatures],
                                }),
                                label: 'Caption',
                                type: 'richText',
                            },
                            {
                                name: 'alignment',
                                label: 'Alignment',
                                options: [
                                    {
                                        label: 'Left',
                                        value: 'left',
                                    },
                                    {
                                        label: 'Center',
                                        value: 'center',
                                    },
                                    {
                                        label: 'Right',
                                        value: 'right',
                                    },
                                ],
                                type: 'radio',
                            },
                            {
                                name: 'enableLink',
                                label: 'Enable Link',
                                type: 'checkbox',
                            },
                            (0, link_1.default)({
                                appearances: false,
                                disableLabel: true,
                                overrides: {
                                    admin: {
                                        condition: (_, data) => Boolean(data?.enableLink),
                                    },
                                },
                            }),
                        ],
                    },
                },
            }),
        ],
    }),
    required: true,
    type: 'richText',
}, overrides || {});
exports.default = richText;
