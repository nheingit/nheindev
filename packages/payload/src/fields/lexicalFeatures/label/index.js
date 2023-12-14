"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LabelFeature = void 0;
const selection_1 = require("@lexical/selection");
const utils_1 = require("@lexical/utils");
const richtext_lexical_1 = require("@payloadcms/richtext-lexical");
const lexical_1 = require("lexical");
const LabelNode_1 = require("./nodes/LabelNode");
require("./index.scss");
const LabelFeature = () => {
    return {
        feature: () => ({
            floatingSelectToolbar: {
                sections: [
                    (0, richtext_lexical_1.FormatSectionWithEntries)([
                        {
                            ChildComponent: () => import('./Icon').then((module) => module.LabelIcon),
                            isActive: ({ selection }) => {
                                if ((0, lexical_1.$isRangeSelection)(selection)) {
                                    const selectedNode = (0, richtext_lexical_1.getSelectedNode)(selection);
                                    const labelParent = (0, utils_1.$findMatchingParent)(selectedNode, LabelNode_1.$isLabelNode);
                                    return labelParent != null;
                                }
                                return false;
                            },
                            key: 'label',
                            label: `Label`,
                            onClick: ({ editor }) => {
                                //setHeading(editor, headingSize)
                                editor.update(() => {
                                    const selection = (0, lexical_1.$getSelection)();
                                    if ((0, lexical_1.$isRangeSelection)(selection)) {
                                        (0, selection_1.$setBlocksType)(selection, () => (0, LabelNode_1.$createLabelNode)());
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
                    node: LabelNode_1.LabelNode,
                    type: LabelNode_1.LabelNode.getType(),
                },
            ],
            props: null,
            slashMenu: {
                options: [
                    {
                        options: [
                            new richtext_lexical_1.SlashMenuOption(`Label`, {
                                Icon: () => import('./Icon').then((module) => module.LabelIcon),
                                keywords: ['label'],
                                onSelect: () => {
                                    const selection = (0, lexical_1.$getSelection)();
                                    if ((0, lexical_1.$isRangeSelection)(selection)) {
                                        (0, selection_1.$setBlocksType)(selection, () => (0, LabelNode_1.$createLabelNode)());
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
        key: 'label',
    };
};
exports.LabelFeature = LabelFeature;
