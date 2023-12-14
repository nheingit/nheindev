import type { ArrayField } from 'payload/dist/fields/config/types';
import type { Field } from 'payload/types';
import type { LinkAppearances } from './link';
type LinkGroupType = (options?: {
    appearances?: LinkAppearances[] | false;
    overrides?: Partial<ArrayField>;
}) => Field;
declare const linkGroup: LinkGroupType;
export default linkGroup;
//# sourceMappingURL=linkGroup.d.ts.map