import { TiComInfo, TiComRace } from "@site0/tijs";
import { App } from "vue";
import DemoToast from "./DemoToast.vue";

const COM_TYPE = "DemoToast";

const en_us = {
  'com-name': 'DemoToast',
};
const zh_cn = {
  'com-name': '瞬息框演示',
};

const DemoToastInfo: TiComInfo = {
  icon: "fas-address-book",
  race: TiComRace.ACTION,
  name: COM_TYPE,
  text: "i18n:demo-toast-com-name",
  i18n: {
    en_us: en_us,
    en_uk: en_us,
    zh_cn: zh_cn,
    zh_hk: zh_cn,
  },
  com: DemoToast,
  install: (app: App) => {
    app.component(COM_TYPE, DemoToastInfo);
  },
  defaultProps: "simple",
  exampleProps: [{
    name: 'simple',
    text: 'i18n:simple',
    comConf: {}
  }],
};

export * from "./demo-toast-types";
export { DemoToast, DemoToastInfo };