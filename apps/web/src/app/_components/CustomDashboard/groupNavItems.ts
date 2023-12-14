import type { Permissions } from 'payload/auth';
import type { SanitizedCollectionConfig, SanitizedGlobalConfig } from 'payload/types'


export enum EntityType {
  collection = 'collections',
  global = 'globals',
}

export type EntityToGroup =
  | {
      entity: SanitizedCollectionConfig;
      type: EntityType.collection;
    }
  | {
      entity: SanitizedGlobalConfig;
      type: EntityType.global;
    };

export type Group = {
  entities: EntityToGroup[];
  label: string;
};

export function groupNavItems(
  entities: EntityToGroup[],
  permissions: Permissions
): Group[] {
  const result = entities.reduce(
    (groups, entityToGroup) => {
      if (
        permissions?.[entityToGroup.type.toLowerCase()]?.[entityToGroup.entity.slug]?.read
          .permission
      ) {
        let groupLabel = entityToGroup.entity.admin.group;

        // Check if groupLabel is an object and convert it to a string appropriately
        if (typeof groupLabel === 'object' && groupLabel !== null) {
          // Assuming groupLabel is an object with a string index signature
          // You might need to adjust this part based on the actual structure of your data
          groupLabel = groupLabel[Object.keys(groupLabel)[0]];
        } else if (!groupLabel) {
          // Default label if groupLabel is not set
          groupLabel = capitalizeFirstLetter(entityToGroup.type);
        }

        const existingGroup = groups.find(
          (group) => group.label === groupLabel
        ) as Group;

        let matchedGroup: Group = existingGroup;
        if (!existingGroup) {
          matchedGroup = { entities: [], label: groupLabel as string };
          groups.push(matchedGroup);
        }

        matchedGroup.entities.push(entityToGroup);
      }

      return groups;
    },
    [
      {
        entities: [],
        label: 'Collections',
      },
      {
        entities: [],
        label: 'Globals',
      },
    ],
  );

  return result.filter((group) => group.entities.length > 0);
}

function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}