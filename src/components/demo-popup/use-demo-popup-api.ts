import {
  DataValidation,
  I18n,
  PopPosition,
  StrOptionItem,
  toPopPosition,
  Vars
} from "@site0/tijs";
import _ from "lodash";
import { computed, ref } from "vue";
import { DemoPopupEmitter, DemoPopupPayload, DemoPopupProps } from "./demo-popup-types";

export type DemoPopupApi = ReturnType<typeof useDemoPopupApi>;
export type DemoPopupSetup = {
  emit: DemoPopupEmitter,
  getValidation?: () => DataValidation | undefined,
}
//-----------------------------------------------------
export const _positions: PopPosition[] = [
  "left-top",
  "top",
  "right-top",
  "left",
  "center",
  "right",
  "bottom-left",
  "bottom",
  "bottom-right",
];
//-----------------------------------------------------

export function useDemoPopupApi(
  props: DemoPopupProps,
  setup: DemoPopupSetup
) {
  //-----------------------------------------------------
  // 数据模型
  //-----------------------------------------------------
  const _data = ref<Vars>({
    logicType: props.defaultType ?? 'primary',
  })
  //-----------------------------------------------------
  // 计算属性
  //-----------------------------------------------------
  const Title = computed(() => {
    if (props.title) {
      return I18n.text(props.title);
    }
    return 'Demo Popup';
  })
  //-----------------------------------------------------
  const PopupPositions = computed((): StrOptionItem[] => {
    let re: StrOptionItem[] = [];
    for (let pos of _positions) {
      re.push({
        value: pos,
        text: _.upperCase(pos)
      })
    }
    return re;
  });
  //-----------------------------------------------------
  // 操作函数
  //-----------------------------------------------------
  function onClick(it: StrOptionItem) {
    console.log("click", it);
    let pos: PopPosition = toPopPosition(it.value);
    if (props.handler) {
      let payload: DemoPopupPayload = {
        pos,
        ..._data.value,
      }
      props.handler(payload);
    }
  }
  //-----------------------------------------------------
  // 数据改动
  //-----------------------------------------------------
  function onFormChange(delta: Vars) {
    _.assign(_data.value, delta);
  }
  //-----------------------------------------------------
  // 返回接口
  //-----------------------------------------------------
  return {
    // 计算属性
    Title,
    PopupPositions,
    // 操作函数
    onClick,
    // 数据改动
    onFormChange,
  };
}