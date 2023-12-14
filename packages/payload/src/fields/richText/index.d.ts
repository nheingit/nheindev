import type { FeatureProvider } from '@payloadcms/richtext-lexical';
import type { RichTextField } from 'payload/types';
type RichText = (overrides?: Partial<RichTextField>, additions?: {
    features?: FeatureProvider[];
}) => RichTextField;
declare const richText: RichText;
export default richText;
//# sourceMappingURL=index.d.ts.map