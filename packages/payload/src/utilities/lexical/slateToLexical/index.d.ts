import type { SerializedEditorState } from 'lexical';
interface SlateNode {
    [key: string]: any;
    children?: SlateNode[];
    type?: string;
}
export declare function convertSlateToLexical(slateData: SlateNode[]): SerializedEditorState;
export {};
//# sourceMappingURL=index.d.ts.map