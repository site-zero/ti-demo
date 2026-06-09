import { TiComInfo, TiComRace } from "@site0/tijs";
import { App } from "vue";
import DemoPopup from "./DemoPopup.vue";

const COM_TYPE = "DemoPopup";

const en_us = {
  'com-name': 'DemoPopup',
};
const zh_cn = {
  'com-name': 'DemoPopup',
};

const DemoPopupInfo: TiComInfo = {
  icon: "fas-address-book",
  race: TiComRace.VIEW,
  asInner: true,
  name: COM_TYPE,
  text: "i18n:demo-popup-com-name",
  i18n: {
    en_us: en_us,
    en_uk: en_us,
    zh_cn: zh_cn,
    zh_hk: zh_cn,
  },
  com: DemoPopup,
  install: (app: App) => {
    app.component(COM_TYPE, DemoPopupInfo);
  },
  defaultProps: "",
  exampleProps: [],
};

export * from "./demo-popup-types";
export { DemoPopup, DemoPopupInfo };

