"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appearanceOptions = void 0;
const deepMerge_1 = __importDefault(require("../utilities/deepMerge"));
exports.appearanceOptions = {
    default: {
        label: 'Default',
        value: 'default',
    },
    primary: {
        label: 'Primary Button',
        value: 'primary',
    },
    secondary: {
        label: 'Secondary Button',
        value: 'secondary',
    },
};
const link = ({ appearances, disableLabel = false, overrides = {} } = {}) => {
    const linkResult = {
        name: 'link',
        admin: {
            hideGutter: true,
        },
        fields: [
            {
                fields: [
                    {
                        name: 'type',
                        admin: {
                            layout: 'horizontal',
                            width: '50%',
                        },
                        defaultValue: 'reference',
                        options: [
                            {
                                label: 'Internal link',
                                value: 'reference',
                            },
                            {
                                label: 'Custom URL',
                                value: 'custom',
                            },
                        ],
                        type: 'radio',
                    },
                    {
                        name: 'newTab',
                        admin: {
                            style: {
                                alignSelf: 'flex-end',
                            },
                            width: '50%',
                        },
                        label: 'Open in new tab',
                        type: 'checkbox',
                    },
                ],
                type: 'row',
            },
        ],
        type: 'group',
    };
    const linkTypes = [
        {
            name: 'reference',
            admin: {
                condition: (_, siblingData) => siblingData?.type === 'reference',
            },
            label: 'Document to link to',
            maxDepth: 1,
            relationTo: ['pages'],
            required: true,
            type: 'relationship',
        },
        {
            name: 'url',
            admin: {
                condition: (_, siblingData) => siblingData?.type === 'custom',
            },
            label: 'Custom URL',
            required: true,
            type: 'text',
        },
    ];
    if (!disableLabel) {
        linkTypes.map((linkType) => ({
            ...linkType,
            admin: {
                ...linkType.admin,
                width: '50%',
            },
        }));
        linkResult.fields.push({
            fields: [
                ...linkTypes,
                {
                    name: 'label',
                    admin: {
                        width: '50%',
                    },
                    label: 'Label',
                    required: true,
                    type: 'text',
                },
            ],
            type: 'row',
        });
    }
    else {
        linkResult.fields = [...linkResult.fields, ...linkTypes];
    }
    if (appearances !== false) {
        let appearanceOptionsToUse = [
            exports.appearanceOptions.default,
            exports.appearanceOptions.primary,
            exports.appearanceOptions.secondary,
        ];
        if (appearances) {
            appearanceOptionsToUse = appearances.map((appearance) => exports.appearanceOptions[appearance]);
        }
        linkResult.fields.push({
            name: 'appearance',
            admin: {
                description: 'Choose how the link should be rendered.',
            },
            defaultValue: 'default',
            options: appearanceOptionsToUse,
            type: 'select',
        });
    }
    return (0, deepMerge_1.default)(linkResult, overrides);
};
exports.default = link;
