/** @module @lexical/label */
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import type { DOMExportOutput, LexicalEditor, ParagraphNode } from 'lexical';
import { type EditorConfig, ElementNode, type LexicalNode, type NodeKey, type RangeSelection, type SerializedElementNode } from 'lexical';
export type SerializedLabelNode = SerializedElementNode;
/** @noInheritDoc */
export declare class LabelNode extends ElementNode {
    constructor({ key }: {
        key?: NodeKey;
    });
    static clone(node: LabelNode): LabelNode;
    static getType(): string;
    static importJSON(serializedNode: SerializedLabelNode): LabelNode;
    canBeEmpty(): true;
    canInsertTextAfter(): true;
    canInsertTextBefore(): true;
    collapseAtStart(): true;
    createDOM(config: EditorConfig): HTMLElement;
    exportDOM(editor: LexicalEditor): DOMExportOutput;
    exportJSON(): SerializedElementNode;
    insertNewAfter(_: RangeSelection, restoreSelection?: boolean): ParagraphNode;
    isInline(): false;
    updateDOM(prevNode: LabelNode, dom: HTMLElement): boolean;
}
export declare function $createLabelNode(): LabelNode;
export declare function $isLabelNode(node: LexicalNode | null | undefined): node is LabelNode;
//# sourceMappingURL=LabelNode.d.ts.map