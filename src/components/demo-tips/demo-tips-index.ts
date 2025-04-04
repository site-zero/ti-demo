import { TiComInfo, TiComRace } from '@site0/tijs';
import { App } from 'vue';
import DemoTips from './DemoTips.vue';
import * as example from './example/index.ts';

const COM_TYPE = 'DemoTips';

let en = {
  'com-name': 'Demo Model',
  'example-tips': 'Tips Box',
};
let cn = {
  'com-name': '提示框演示',
  'example-tips': '提示框',
};

const DemoTipsInfo: TiComInfo = {
  icon: 'zmdi-comment-text',
  race: TiComRace.ACTION,
  name: COM_TYPE,
  text: 'i18n:demo-tips-com-name',
  i18n: {
    en_us: en,
    en_uk: en,
    zh_cn: cn,
    zh_hk: cn,
  },
  com: DemoTips,
  install: (app: App) => {
    app.component(COM_TYPE, DemoTips);
  },
  liveStyle: {
    width: '100%',
    height: '100%',
    padding: '10px',
  },
  defaultProps: 'simple',
  exampleProps: [example.simple],
};

export { DemoTips, DemoTipsInfo };
