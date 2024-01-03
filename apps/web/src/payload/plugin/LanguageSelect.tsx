import * as React from 'react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $isRangeSelection, $getSelection, $INTERNAL_isPointSelection } from 'lexical';
import { FeatureProvider } from '@payloadcms/richtext-lexical';
import { CodeNode } from '@lexical/code';

//export const LanguageSelectToolbarSection = () => {
    //const [editor] = useLexicalComposerContext();
  
    //const languages = ['plaintext', 'javascript', 'python', 'java', 'csharp']; // Add more languages as needed
  
    //const handleLanguageChange = (language) => {
      //editor.update(() => {
        //const selection = $getSelection();
        //if ($INTERNAL_isPointSelection(selection)) {
          //const node = selection.focus.getNode();
          //if (node instanceof CodeNode) {
            //node.setLanguage(language);
          //}
        //}
      //});
    //};
  
    //return (
      //<div className="language-select-toolbar">
        //{languages.map((language) => (
          //<button key={language} onClick={() => handleLanguageChange(language)}>
            //{language}
          //</button>
        //))}
      //</div>
    //);
//};

import { LanguageDropdownSectionWithEntries } from './CodeBlock/floatingSelectBoolbarLanguageDropdownSection';
const languages = ['plaintext', 'javascript', 'python', 'java', 'csharp']; // Add more languages as needed

export const CodeLanguageFeature = (): FeatureProvider => {
    const sections = languages.map((lang, i) => {
        return LanguageDropdownSectionWithEntries([
            {
                ChildComponent: () => import('../../app/_components/bannerImage').then((module) => module.BannerImage),
                isActive: () => false,
                key: `lang-${lang}`,
                label: `${lang}`,
                onClick: ({editor}) => {
                    editor.update(() => {
                        const selection = $getSelection();
                        if ($INTERNAL_isPointSelection(selection)) {
                            const node = selection.focus.getNode();
                            if (node instanceof CodeNode) {
                                node.setLanguage(lang);
                            }
                        }
                    });
                },
                order: i,
            }
        ])
    })

    return {
        feature: () => ({
            floatingSelectToolbar: {
                sections
            },
            props: null,
        }),
        key: 'code-lang'
    }
}
