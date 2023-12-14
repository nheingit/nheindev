/** @module @lexical/largeBody */
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import type { DOMExportOutput, LexicalEditor, ParagraphNode } from 'lexical';
import { type EditorConfig, ElementNode, type LexicalNode, type NodeKey, type RangeSelection, type SerializedElementNode } from 'lexical';
export type SerializedLargeBodyNode = SerializedElementNode;
/** @noInheritDoc */
export declare class LargeBodyNode extends ElementNode {
    constructor({ key }: {
        key?: NodeKey;
    });
    static clone(node: LargeBodyNode): LargeBodyNode;
    static getType(): string;
    static importJSON(serializedNode: SerializedLargeBodyNode): LargeBodyNode;
    canBeEmpty(): true;
    canInsertTextAfter(): true;
    canInsertTextBefore(): true;
    collapseAtStart(): true;
    createDOM(config: EditorConfig): HTMLElement;
    exportDOM(editor: LexicalEditor): DOMExportOutput;
    exportJSON(): SerializedElementNode;
    insertNewAfter(_: RangeSelection, restoreSelection?: boolean): ParagraphNode;
    isInline(): false;
    updateDOM(prevNode: LargeBodyNode, dom: HTMLElement): boolean;
}
export declare function $createLargeBodyNode(): LargeBodyNode;
export declare function $isLargeBodyNode(node: LexicalNode | null | undefined): node is LargeBodyNode;
//# sourceMappingURL=LargeBodyNode.d.ts.map