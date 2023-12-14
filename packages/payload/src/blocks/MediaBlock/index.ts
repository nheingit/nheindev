import type { Block } from "payload/types";

import { invertBackground } from "../../fields/invertBackground";

export const MediaBlock: Block = {
  fields: [
    invertBackground,
    {
      name: "position",
      defaultValue: "default",
      options: [
        {
          label: "Default",
          value: "default",
        },
        {
          label: "Fullscreen",
          value: "fullscreen",
        },
      ],
      type: "select",
    },
  ],
  slug: "mediaBlock",
};
