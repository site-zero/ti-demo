import {
  Dicts,
  I18n,
  I18nSet,
  LogLevel,
  MessageMap,
  TiComSet,
  TiDict,
  installTiComponents,
  installTiCoreI18n,
  tiPutComponents,
} from "@site0/tijs";
import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import TiDemoApp from "./app/TiDemoApp.vue";
import { LeafletMapInfo } from "./components/demo-leaflet-map/leaflet-map-index";
import { DemoModalInfo } from "./components/demo-modal/demo-modal-index";
import { DemoTipsInfo } from "./components/demo-tips/demo-tips-index";
import PageDetail from "./components/detail/PageDetail.vue";
import NavCom from "./components/nav/NavCom.vue";
import en_us from "./i18n/en-us.json";
import zh_cn from "./i18n/zh-cn.json";
import "./style.scss";
let cn = zh_cn as MessageMap;
let en = en_us as MessageMap;

//
// 准备自定义控件
//
const demos = {
  DemoModal: DemoModalInfo,
  DemoTips: DemoTipsInfo,
  //LeafletMap: LeafletMapInfo,
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
let lang = "zh-cn";
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
      let host = "https://t.site0.xyz";
      host = "http://localhost:8080";
      let url = `${host}/a/lookup/${path}&hint=${encodeURIComponent(hint)}`;
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
createDemoDict("hello", "/test?limit=10");
createDemoDict("hello100", "/test?limit=100");
Dicts.getOrCreate(
  Dicts.makeDictOptions({
    data: [
      { value: "AUD", text: "Australian Dollar" },
      { value: "CNY", text: "Chinese Yuan" },
      { value: "EUR", text: "Euro" },
      { value: "GBP", text: "British Pound" },
      { value: "HKD", text: "Hong Kong Dollar" },
      { value: "JPY", text: "Japanese Yen" },
      { value: "USD", text: "US Dollar" },
    ],
  }),
  "Currencies"
);
Dicts.getOrCreate(
  Dicts.makeDictOptions({
    data: [
      { value: "G", text: "GRAM" },
      { value: "HG", text: "HECTOGRAM" },
      { value: "KG", text: "KILOGRAM" },
      { value: "T", text: "TONNE" },
    ],
  }),
  "WeightUnits"
);
Dicts.getOrCreate(
  Dicts.makeDictOptions({
    data: [
      { value: "CC", text: "CM3", tip: "CUBIC CENTIMETRE" },
      { value: "C8", text: "DM3", tip: "CUBIC DECIMETRE" },
      { value: "CU", text: "M3", tip: "CUBIC METRE" },
    ],
  }),
  "VolumeUnits"
);

//
// 准备路由
//
let router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/:comType?/:example?",
      components: {
        chute: NavCom,
        arena: PageDetail,
      },
      props: {
        chute: (route) => ({
          current: route.params.comType || "TiUnknown",
        }),
        arena: (route) => ({
          comType: route.params.comType || "TiUnknown",
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
installTiComponents(app);
app.mount("#app");
