"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LargeBodyFeature = void 0;
const selection_1 = require("@lexical/selection");
const utils_1 = require("@lexical/utils");
const richtext_lexical_1 = require("@payloadcms/richtext-lexical");
const lexical_1 = require("lexical");
const LargeBodyNode_1 = require("./nodes/LargeBodyNode");
require("./index.scss");
const LargeBodyFeature = () => {
    return {
        feature: () => ({
            floatingSelectToolbar: {
                sections: [
                    (0, richtext_lexical_1.FormatSectionWithEntries)([
                        {
                            ChildComponent: () => import('./Icon').then((module) => module.LargeBodyIcon),
                            isActive: ({ editor, selection }) => {
                                if ((0, lexical_1.$isRangeSelection)(selection)) {
                                    const selectedNode = (0, richtext_lexical_1.getSelectedNode)(selection);
                                    const largeBodyParent = (0, utils_1.$findMatchingParent)(selectedNode, LargeBodyNode_1.$isLargeBodyNode);
                                    return largeBodyParent != null;
                                }
                                return false;
                            },
                            key: 'largeBody',
                            label: `Large Body`,
                            onClick: ({ editor }) => {
                                //setHeading(editor, headingSize)
                                editor.update(() => {
                                    const selection = (0, lexical_1.$getSelection)();
                                    if ((0, lexical_1.$isRangeSelection)(selection)) {
                                        (0, selection_1.$setBlocksType)(selection, () => (0, LargeBodyNode_1.$createLargeBodyNode)());
                                    }
                                });
                            },
                            order: 20,
                        },
                    ]),
                ],
            },
            nodes: [
                {
                    node: LargeBodyNode_1.LargeBodyNode,
                    type: LargeBodyNode_1.LargeBodyNode.getType(),
                },
            ],
            props: null,
            slashMenu: {
                options: [
                    {
                        options: [
                            new richtext_lexical_1.SlashMenuOption(`Large Body`, {
                                Icon: () => import('./Icon').then((module) => module.LargeBodyIcon),
                                keywords: ['largeBody'],
                                onSelect: ({ editor }) => {
                                    const selection = (0, lexical_1.$getSelection)();
                                    if ((0, lexical_1.$isRangeSelection)(selection)) {
                                        (0, selection_1.$setBlocksType)(selection, () => (0, LargeBodyNode_1.$createLargeBodyNode)());
                                    }
                                },
                            }),
                        ],
                        key: 'Basic',
                        displayName: 'Basic',
                    },
                ],
            },
        }),
        key: 'largeBody',
    };
};
exports.LargeBodyFeature = LargeBodyFeature;
