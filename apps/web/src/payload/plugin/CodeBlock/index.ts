import { $createCodeNode, CodeNode, SerializedCodeNode } from '@lexical/code';
import { $setBlocksType } from '@lexical/selection';
import { $INTERNAL_isPointSelection, $getSelection, $isRangeSelection, FORMAT_TEXT_COMMAND } from 'lexical';

import type { FeatureProvider } from '@payloadcms/richtext-lexical';
import { TextDropdownSectionWithEntries, convertLexicalNodesToHTML } from '@payloadcms/richtext-lexical';
import { SectionWithEntries } from '@payloadcms/richtext-lexical/dist/field/features/format/common/floatingSelectToolbarSection';
import { HTMLConverter } from '@payloadcms/richtext-lexical';

import { SlashMenuOption } from '@payloadcms/richtext-lexical';

const setCodeBlock = (language = 'plaintext') => {
  const selection = $getSelection();
  if ($isRangeSelection(selection)) {
    $setBlocksType(selection, () => {
      const codeNode = $createCodeNode()
      codeNode.setLanguage(language)
      return codeNode
    });
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
                            console.log(selection)
                            if ($INTERNAL_isPointSelection(selection)) {
                            $setBlocksType(selection, () => $createCodeNode());
                            }
                        });
                        },
                        order: 20,
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
                          .split('\n')
                          .map(line => `<code>${line}</code>`)
                          .join('\n');
                          const language = node.language; // Get the language from the node
                          return `<pre><code class="language-${language}">${formattedChildrenText}</code></pre>`;
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