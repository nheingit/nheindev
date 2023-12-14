"use strict";
/** @module @lexical/label */
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.$isLabelNode = exports.$createLabelNode = exports.LabelNode = void 0;
const utils_1 = require("@lexical/utils");
const lexical_1 = require("lexical");
/** @noInheritDoc */
class LabelNode extends lexical_1.ElementNode {
    constructor({ key }) {
        super(key);
    }
    static clone(node) {
        return new LabelNode({
            key: node.__key,
        });
    }
    static getType() {
        return 'label';
    }
    static importJSON(serializedNode) {
        const node = $createLabelNode();
        node.setFormat(serializedNode.format);
        node.setIndent(serializedNode.indent);
        node.setDirection(serializedNode.direction);
        return node;
    }
    canBeEmpty() {
        return true;
    }
    canInsertTextAfter() {
        return true;
    }
    canInsertTextBefore() {
        return true;
    }
    collapseAtStart() {
        const paragraph = (0, lexical_1.$createParagraphNode)();
        const children = this.getChildren();
        children.forEach((child) => paragraph.append(child));
        this.replace(paragraph);
        return true;
    }
    createDOM(config) {
        const element = document.createElement('span');
        (0, utils_1.addClassNamesToElement)(element, 'label');
        return element;
    }
    exportDOM(editor) {
        const { element } = super.exportDOM(editor);
        if (element && (0, lexical_1.isHTMLElement)(element)) {
            if (this.isEmpty())
                element.append(document.createElement('br'));
            const formatType = this.getFormatType();
            element.style.textAlign = formatType;
            const direction = this.getDirection();
            if (direction) {
                element.dir = direction;
            }
        }
        return {
            element,
        };
    }
    exportJSON() {
        return {
            ...super.exportJSON(),
            type: this.getType(),
        };
    }
    insertNewAfter(_, restoreSelection) {
        const newBlock = (0, lexical_1.$createParagraphNode)();
        const direction = this.getDirection();
        newBlock.setDirection(direction);
        this.insertAfter(newBlock, restoreSelection);
        return newBlock;
    }
    // Mutation
    isInline() {
        return false;
    }
    updateDOM(prevNode, dom) {
        return false;
    }
}
exports.LabelNode = LabelNode;
function $createLabelNode() {
    return (0, lexical_1.$applyNodeReplacement)(new LabelNode({}));
}
exports.$createLabelNode = $createLabelNode;
function $isLabelNode(node) {
    return node instanceof LabelNode;
}
exports.$isLabelNode = $isLabelNode;
