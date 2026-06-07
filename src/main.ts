import { initHyperMaker } from "@site0/hyper-maker";
import {
  Dicts,
  I18n,
  I18nSet,
  MessageMap,
  TiDict,
  init_ti_std_columns,
  init_ti_std_fields,
  installTiComponents,
  installTiCoreI18n,
  updateInstalledComponentsLangs
} from "@site0/tijs";
import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import TiDemoApp from "./app/TiDemoApp.vue";
import { install_demo_components } from "./components";
import PageDetail from "./components/detail/PageDetail.vue";
import NavCom from "./components/nav/NavCom.vue";
import en_us from "./i18n/en-us.json";
import zh_cn from "./i18n/zh-cn.json";
import "./style.scss";
import { DD_COUNTRY, DD_CURRENCY, DD_QUANTITY } from "./support";
import { DD_COLOR_THEME } from "./support/dd-color-theme";
import { DD_LANG } from "./support/dd-lang";
let cn = zh_cn as MessageMap;
let en = en_us as MessageMap;

//
// 准备自定义控件
install_demo_components();

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
//let lang = "en-uk";
let langKey = I18n.toLangKey(lang);
I18n.putAll(app_i18ns[langKey]);
installTiCoreI18n(langKey);

// 注册 Hyper Maker 组件
initHyperMaker(langKey);

//
// 内置表单字段
//
init_ti_std_fields();
init_ti_std_columns();

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
Dicts.getOrCreate(Dicts.makeDictOptions({ data: DD_CURRENCY }), "Currencies");
Dicts.getOrCreate(Dicts.makeDictOptions({ data: DD_QUANTITY }), "Quantities");
Dicts.getOrCreate(Dicts.makeDictOptions({ data: DD_COUNTRY }), "Countries");
Dicts.getOrCreate(Dicts.makeDictOptions({ data: DD_LANG }), "Languages");
Dicts.getOrCreate(
  Dicts.makeDictOptions({ data: DD_COLOR_THEME }),
  "ColorThemes"
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
installTiComponents(app);

// 所有控件都注册完毕了，那么就整体更换一遍语言
updateInstalledComponentsLangs(langKey);

// 开启路由和挂在应用
app.use(router);
app.mount("#app");
