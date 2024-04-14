import { TiComInfo, TiComRace } from '@site0/tijs';
import { App } from 'vue';
import DemoModel from './DemoModel.vue';
import { simple } from './example/index.ts';

const COM_TYPE = 'DemoModel';

let en = {
  'com-name': 'Demo Model',
};
let cn = {
  'com-name': '模式框演示',
};

const DemoModelInfo: TiComInfo = {
  icon: 'far-clone',
  race: TiComRace.ACTION,
  name: COM_TYPE,
  text: 'i18n:demo-model-com-name',
  i18n: {
    en_us: en,
    en_uk: en,
    zh_cn: cn,
    zh_hk: cn,
  },
  com: DemoModel,
  install: (app: App) => {
    app.component(COM_TYPE, DemoModel);
  },
  defaultProps: 'simple',
  exampleProps: [simple],
};

export { DemoModel, DemoModelInfo };
