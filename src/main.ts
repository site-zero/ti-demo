import {
  Dicts,
  I18n,
  I18nSet,
  LogLevel,
  MessageMap,
  TiComSet,
  TiDict,
  addLogger,
  installTiCoreI18n,
  setDefaultLogLevel,
  tiPutComponents,
  tidyLogger,
} from '@site0/tijs';
import '@site0/tijs/style.scss';
import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import TiDemoApp from './TiDemoApp.vue';
import { DemoModalInfo } from './components/demo-modal/demo-modal-index';
import PageDetail from './components/detail/PageDetail.vue';
import NavCom from './components/nav/NavCom.vue';
import en_us from './i18n/en-us.json';
import zh_cn from './i18n/zh-cn.json';
import './style.scss';
let cn = zh_cn as MessageMap;
let en = en_us as MessageMap;

setDefaultLogLevel(LogLevel.WARN);
addLogger('ti', LogLevel.DEBUG);
addLogger('Ti', LogLevel.WARN);
addLogger('TiTable.resizing', LogLevel.WARN);
addLogger('TiTable', LogLevel.DEBUG);
tidyLogger();
//
// 准备自定义控件
//
const demos = {
  DemoModal: DemoModalInfo,
} as TiComSet;
tiPutComponents(demos);

//
// 准备多国语言
//
const app_i18ns = {
  zh_cn: cn,
  en_us: en,
  zh_hk: cn,
  en_uk: en,
} as I18nSet;
let lang = 'zh-cn';
let langKey = I18n.toLangKey(lang);
I18n.putAll(app_i18ns[langKey]);
installTiCoreI18n(lang, true);
//updateInstalledComponentsLangs(langKey);

// setEnv('comDefaultProps',{
//   TiLabel: {
//     value: "BBBBBB"
//   }
// })
function makeDictQuery(path: string) {
  return async (_dict: TiDict, hint: string, signal?: AbortSignal) =>
    new Promise<any[]>((resolve, reject) => {
      let url = `https://t.site0.xyz/a/lookup/${path}&hint=${encodeURIComponent(
        hint
      )}`;
      fetch(url, {
        signal,
      })
        .then((resp) => {
          resp
            .json()
            .then((reo) => {
              if (reo.ok) {
                resolve(reo.data);
              } else {
                reject(reo);
              }
            })
            .catch(reject);
        })
        .catch(reject);
    });
}

function createDemoDict(name: string, path: string) {
  Dicts.getOrCreate(
    Dicts.makeDictOptions({
      data: async () =>
        new Promise<any[]>((resolve) => {
          resolve([]);
        }),
      query: makeDictQuery(path),
    }),
    name
  );
}

//
// 准备字典
//
createDemoDict('hello', '/test?min=4&max=10&len=100');
createDemoDict('hello100', '/test?min=90&max=100&len=100');

//
// 准备路由
//
let router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/:comType?/:example?',
      components: {
        chute: NavCom,
        arena: PageDetail,
      },
      props: {
        chute: (route) => ({
          current: route.params.comType || 'TiUnknown',
        }),
        arena: (route) => ({
          comType: route.params.comType || 'TiUnknown',
          example: route.params.example,
        }),
      },
    },
  ],
});

//
// 创建应用并挂载
//
let app = createApp(TiDemoApp);
//app.config.devtools = true;
app.use(router);

app.mount('#app');
