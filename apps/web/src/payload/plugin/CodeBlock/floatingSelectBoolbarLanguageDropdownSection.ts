
  import type { FloatingToolbarSectionEntry, FloatingToolbarSection } from '@payloadcms/richtext-lexical'
  
  export const LanguageDropdownSectionWithEntries = (
    entries: FloatingToolbarSectionEntry[],
  ): FloatingToolbarSection => {
    return {
      ChildComponent: () =>
      import('../../../app/_components/bannerImage').then((module) => module.BannerImage),
      entries,
      key: 'dropdown-language',
      order: 2,
      type: 'dropdown',
    }
  }