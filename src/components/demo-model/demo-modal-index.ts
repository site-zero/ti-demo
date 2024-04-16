import { TiComInfo, TiComRace } from '@site0/tijs';
import { App } from 'vue';
import DemoModal from './DemoModal.vue';
import { simple } from './example/index.ts';

const COM_TYPE = 'DemoModal';

let en = {
  'com-name': 'Demo Model',
};
let cn = {
  'com-name': '模式框演示',
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
  exampleProps: [simple],
};

export { DemoModal, DemoModalInfo };
