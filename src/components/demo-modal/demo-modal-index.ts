import { Alert, Confirm, Prompt, TiComInfo, TiComRace } from "@site0/tijs";
import _ from "lodash";
import { App } from "vue";
import { DemoModalProps } from "./demo-modal-types.ts";
import DemoModal from "./DemoModal.vue";

const COM_TYPE = "DemoModal";

let en = {
  "com-name": "Demo Model",
  "example-alert": "Alert",
  "example-confirm": "Confirm",
  "example-prompt": "Prompt",
};
let cn = {
  "com-name": "模式框演示",
  "example-alert": "消息框",
  "example-confirm": "确认框",
  "example-prompt": "提示框",
};

const DemoModalInfo: TiComInfo = {
  icon: "far-clone",
  race: TiComRace.ACTION,
  name: COM_TYPE,
  text: "i18n:demo-modal-com-name",
  i18n: {
    en_us: en,
    en_uk: en,
    zh_cn: cn,
    zh_hk: cn,
  },
  com: DemoModal,
  install: (app: App) => {
    app.component(COM_TYPE, DemoModal);
  },
  defaultProps: "alert",
  exampleProps: [
    {
      name: "alert",
      text: "i18n:demo-modal-example-alert",
      comConf: {
        handler: (payload) => {
          Alert(payload.content, _.omit(payload, "content"));
        },
      } as DemoModalProps,
    },
    {
      name: "confirm",
      text: "i18n:demo-modal-example-confirm",
      comConf: {
        handler: (payload) => {
          Confirm(payload.content, _.omit(payload, "content"));
        },
      } as DemoModalProps,
    },
    {
      name: "prompt",
      text: "i18n:demo-modal-example-prompt",
      comConf: {
        handler: (payload) => {
          Prompt(payload.content, _.omit(payload, "content"));
        },
      } as DemoModalProps,
    },
  ],
};

export { DemoModal, DemoModalInfo };
