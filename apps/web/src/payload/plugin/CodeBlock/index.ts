import { $createCodeNode, CodeNode, SerializedCodeNode } from '@lexical/code';
import { $setBlocksType } from '@lexical/selection';
import { $getSelection, $isRangeSelection } from 'lexical';

import type { FeatureProvider } from '@payloadcms/richtext-lexical';
import { TextDropdownSectionWithEntries, convertLexicalNodesToHTML } from '@payloadcms/richtext-lexical';
import { HTMLConverter } from '@payloadcms/richtext-lexical';

import { SlashMenuOption } from '@payloadcms/richtext-lexical';

const setCodeBlock = () => {
  const selection = $getSelection();
  if ($isRangeSelection(selection)) {
    $setBlocksType(selection, () => $createCodeNode());
  }
};

export const CodeBlockFeature = (): FeatureProvider => {
  return {
    feature: () => {
      return {
        floatingSelectToolbar: {
            sections: [
                TextDropdownSectionWithEntries([
                    {
                        ChildComponent: () =>
                        import('../../../app/_components/bannerImage').then((module) => module.BannerImage),
                        isActive: () => false,
                        key: 'code-block-formatting',
                        label: 'Code Block',
                        onClick: ({ editor }) => {
                        editor.update(() => {
                            const selection = $getSelection();
                            if ($isRangeSelection(selection)) {
                            $setBlocksType(selection, () => $createCodeNode());
                            }
                        });
                        },
                        order: 1,
                    }
                ]),
            ],
          },
        props: null,
        slashMenu: {
          options: [
            {
              displayName: 'Blocks',
              key: 'blocks',
              options: [
                new SlashMenuOption('code-block', {
                  Icon: () => import('../../../app/_components/bannerImage').then((module) => module.BannerImage),
                  displayName: 'Code Block',
                  keywords: ['code', 'block'],
                  onSelect: ({ editor }) => {
                    editor.update(() => {
                      setCodeBlock();
                    });
                  },
                }),
              ],
            },
          ],
        },
        nodes: [
          {
            converters: {
                html: {
                    converter: async ({converters, node, parent}) => {
                        const childrenText = await convertLexicalNodesToHTML({
                            converters,
                            lexicalNodes: node.children,
                            parent: {
                                ...node,
                                parent,
                            }
                        })
                        const formattedChildrenText = childrenText
                            .replace(/\n/g, '<br>')
                            .replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;'); // Replace tabs with spaces

                        // Return the code wrapped in a <code> tag with the appropriate classes and attributes
                        return `<code data-highlight-language="${node.language}" dir="${node.direction}">${formattedChildrenText}</code>`;
                    },
                    nodeTypes: [CodeNode.getType()]
                } as HTMLConverter<SerializedCodeNode>,
            },
            node: CodeNode,
            type: CodeNode.getType(),
          },
        ],
      };
    },
    key: 'codeblock',
  };
};