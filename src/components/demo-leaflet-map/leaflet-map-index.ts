import { TiComInfo, TiComRace } from "@site0/tijs";
import { App } from "vue";
import LeafletMap from "./LeafletMap.vue";

const COM_TYPE = "LeafletMap";

const LeafletMapInfo: TiComInfo = {
  icon: "fas-map", // 使用地图图标
  race: TiComRace.VIEW,
  name: COM_TYPE,
  text: "Leaflet Map",
  i18n: {
    en_uk: {},
    en_us: {},
    zh_cn: {},
    zh_hk: {},
  },
  com: LeafletMap,
  install: (app: App) => {
    app.component(COM_TYPE, LeafletMap);
  },
  defaultProps: "",
  exampleProps: [],
};

export * from "./leaflet-map-types";
export { LeafletMap, LeafletMapInfo };