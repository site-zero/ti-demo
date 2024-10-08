import { TiComInfo, TiComRace } from '@site0/tijs';
import { App } from 'vue';
import DemoModal from './DemoModal.vue';
import * as example from './example/index.ts';

const COM_TYPE = 'DemoModal';

let en = {
  'com-name': 'Demo Model',
  'example-alert': 'Alert',
  'example-confirm': 'Confirm',
  'example-prompt': 'Prompt',
  'example-process': 'Process',
};
let cn = {
  'com-name': '模式框演示',
  'example-alert': '消息框',
  'example-confirm': '确认框',
  'example-prompt': '提示框',
  'example-process': '进度框',
};

const DemoModalInfo: TiComInfo = {
  icon: 'far-clone',
  race: TiComRace.ACTION,
  name: COM_TYPE,
  text: 'i18n:demo-modal-com-name',
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
  defaultProps: 'simple',
  exampleProps: [
    example.simple,
    example.alerts,
    example.confirms,
    example.prompts,
    example.process,
  ],
};

export { DemoModal, DemoModalInfo };
