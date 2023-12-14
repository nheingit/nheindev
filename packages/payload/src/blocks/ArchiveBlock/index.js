"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Archive = void 0;
const richText_1 = __importDefault(require("../../fields/richText"));
exports.Archive = {
    fields: [
        (0, richText_1.default)({
            name: 'introContent',
            label: 'Intro Content',
        }),
        {
            name: 'populateBy',
            defaultValue: 'collection',
            options: [
                {
                    label: 'Collection',
                    value: 'collection',
                },
                {
                    label: 'Individual Selection',
                    value: 'selection',
                },
            ],
            type: 'select',
        },
        {
            name: 'relationTo',
            admin: {
                condition: (_, siblingData) => siblingData.populateBy === 'collection',
            },
            defaultValue: 'posts',
            label: 'Collections To Show',
            options: [
                {
                    label: 'Posts',
                    value: 'posts',
                },
                {
                    label: 'Projects',
                    value: 'projects',
                },
            ],
            type: 'select',
        },
        {
            name: 'categories',
            admin: {
                condition: (_, siblingData) => siblingData.populateBy === 'collection',
            },
            hasMany: true,
            label: 'Categories To Show',
            relationTo: 'categories',
            type: 'relationship',
        },
        {
            name: 'limit',
            admin: {
                condition: (_, siblingData) => siblingData.populateBy === 'collection',
                step: 1,
            },
            defaultValue: 10,
            label: 'Limit',
            type: 'number',
        },
        {
            name: 'selectedDocs',
            admin: {
                condition: (_, siblingData) => siblingData.populateBy === 'selection',
            },
            hasMany: true,
            label: 'Selection',
            relationTo: ['posts', 'projects'],
            type: 'relationship',
        },
        {
            name: 'populatedDocs',
            admin: {
                condition: (_, siblingData) => siblingData.populateBy === 'collection',
                description: 'This field is auto-populated after-read',
                disabled: true,
            },
            hasMany: true,
            label: 'Populated Docs',
            relationTo: ['posts', 'projects'],
            type: 'relationship',
        },
        {
            name: 'populatedDocsTotal',
            admin: {
                condition: (_, siblingData) => siblingData.populateBy === 'collection',
                description: 'This field is auto-populated after-read',
                disabled: true,
                step: 1,
            },
            label: 'Populated Docs Total',
            type: 'number',
        },
    ],
    labels: {
        plural: 'Archives',
        singular: 'Archive',
    },
    slug: 'archive',
};
