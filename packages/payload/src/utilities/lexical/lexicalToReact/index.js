"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeLexical = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const escape_html_1 = __importDefault(require("escape-html"));
const react_1 = require("react");
const nodeFormat_1 = require("./nodeFormat");
function serializeLexical({ nodes }) {
    return ((0, jsx_runtime_1.jsx)(react_1.Fragment, { children: nodes?.map((_node, index) => {
            if (_node.type === 'text') {
                const node = _node;
                let text = ((0, jsx_runtime_1.jsx)("span", { dangerouslySetInnerHTML: { __html: (0, escape_html_1.default)(node.text) } }, index));
                if (node.format & nodeFormat_1.IS_BOLD) {
                    text = (0, jsx_runtime_1.jsx)("strong", { children: text }, index);
                }
                if (node.format & nodeFormat_1.IS_ITALIC) {
                    text = (0, jsx_runtime_1.jsx)("em", { children: text }, index);
                }
                if (node.format & nodeFormat_1.IS_STRIKETHROUGH) {
                    text = ((0, jsx_runtime_1.jsx)("span", { className: "line-through", children: text }, index));
                }
                if (node.format & nodeFormat_1.IS_UNDERLINE) {
                    text = ((0, jsx_runtime_1.jsx)("span", { className: "underline", children: text }, index));
                }
                if (node.format & nodeFormat_1.IS_CODE) {
                    text = (0, jsx_runtime_1.jsx)("code", { children: text }, index);
                }
                if (node.format & nodeFormat_1.IS_SUBSCRIPT) {
                    text = (0, jsx_runtime_1.jsx)("sub", { children: text }, index);
                }
                if (node.format & nodeFormat_1.IS_SUPERSCRIPT) {
                    text = (0, jsx_runtime_1.jsx)("sup", { children: text }, index);
                }
                return text;
            }
            if (_node == null) {
                return null;
            }
            // NOTE: Hacky fix for
            // https://github.com/facebook/lexical/blob/d10c4e6e55261b2fdd7d1845aed46151d0f06a8c/packages/lexical-list/src/LexicalListItemNode.ts#L133
            // which does not return checked: false (only true - i.e. there is no prop for false)
            const serializedChildrenFn = (node) => {
                if (node.children == null) {
                    return null;
                }
                else {
                    if (node?.type === 'list' && node?.listType === 'check') {
                        for (const item of node.children) {
                            if ('checked' in item) {
                                if (!item?.checked) {
                                    item.checked = false;
                                }
                            }
                        }
                        return serializeLexical({ nodes: node.children });
                    }
                    else {
                        return serializeLexical({ nodes: node.children });
                    }
                }
            };
            const serializedChildren = 'children' in _node ? serializedChildrenFn(_node) : '';
            switch (_node.type) {
                case 'linebreak': {
                    return (0, jsx_runtime_1.jsx)("br", {}, index);
                }
                case 'paragraph': {
                    return (0, jsx_runtime_1.jsx)("p", { children: serializedChildren }, index);
                }
                case 'heading': {
                    const node = _node;
                    const Tag = node?.tag;
                    return (0, jsx_runtime_1.jsx)(Tag, { children: serializedChildren }, index);
                }
                case 'list': {
                    const node = _node;
                    const Tag = node?.tag;
                    return ((0, jsx_runtime_1.jsx)(Tag, { className: node?.listType, children: serializedChildren }, index));
                }
                case 'listitem': {
                    const node = _node;
                    if (node?.checked != null) {
                        return ((0, jsx_runtime_1.jsx)("li", { "aria-checked": node.checked ? 'true' : 'false', className: `component--list-item-checkbox ${node.checked
                                ? 'component--list-item-checkbox-checked'
                                : 'component--list-item-checked-unchecked'}`, 
                            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
                            role: "checkbox", tabIndex: -1, value: node?.value, children: serializedChildren }, index));
                    }
                    else {
                        return ((0, jsx_runtime_1.jsx)("li", { value: node?.value, children: serializedChildren }, index));
                    }
                }
                case 'quote': {
                    const node = _node;
                    return (0, jsx_runtime_1.jsx)("blockquote", { children: serializedChildren }, index);
                }
                case 'link': {
                    const node = _node;
                    const fields = node.fields;
                    if (fields.linkType === 'custom') {
                        const rel = fields.newTab ? 'noopener noreferrer' : undefined;
                        return ((0, jsx_runtime_1.jsx)("a", { href: fields.url, rel: rel, target: fields.newTab ? 'target="_blank"' : undefined, children: serializedChildren }, index));
                    }
                    else {
                        return (0, jsx_runtime_1.jsx)("span", { children: "Internal link coming soon" }, index);
                    }
                }
                default:
                    return null;
            }
        }) }));
}
exports.serializeLexical = serializeLexical;
