import type { AccessArgs } from 'payload/config';
import type { User } from '../payload-types';
type isAdmin = (args: AccessArgs<unknown, User>) => boolean;
export declare const admins: isAdmin;
export {};
//# sourceMappingURL=admins.d.ts.map