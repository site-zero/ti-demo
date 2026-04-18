import { IconInput } from "@site0/tijs";
import { FLAG_CN, FLAG_HK, FLAG_UK, FLAG_US } from "./b64_images";

export const DD_LANG = [
  {
    icon: {
      type: "image",
      src: `data:image/png;base64,${FLAG_CN}`,
    } as IconInput,
    value: "zh-cn",
    text: "简体中文",
  },
  {
    icon: {
      type: "image",
      src: `data:image/png;base64,${FLAG_HK}`,
    } as IconInput,
    value: "zh-hk",
    text: "繁體中文",
  },
  {
    icon: {
      type: "image",
      src: `data:image/png;base64,${FLAG_US}`,
    } as IconInput,
    value: "en-us",
    text: "English (US)",
  },
  {
    icon: {
      type: "image",
      src: `data:image/png;base64,${FLAG_UK}`,
    } as IconInput,
    value: "en-uk",
    text: "English",
  },
];
