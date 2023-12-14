import type { Field } from 'payload/types';
export declare const appearanceOptions: {
    default: {
        label: string;
        value: string;
    };
    primary: {
        label: string;
        value: string;
    };
    secondary: {
        label: string;
        value: string;
    };
};
export type LinkAppearances = 'default' | 'primary' | 'secondary';
type LinkType = (options?: {
    appearances?: LinkAppearances[] | false;
    disableLabel?: boolean;
    overrides?: Record<string, unknown>;
}) => Field;
declare const link: LinkType;
export default link;
//# sourceMappingURL=link.d.ts.map