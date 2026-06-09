import {
  DataValidation,
  I18n,
  PopPosition
} from "@site0/tijs";
import { computed } from "vue";
import { DemoPopupEmitter, DemoPopupProps } from "./demo-popup-types";

export type DemoPopupApi = ReturnType<typeof useDemoPopupApi>;
export type DemoPopupSetup = {
  emit: DemoPopupEmitter,
  getValidation?: () => DataValidation | undefined,
}
//-----------------------------------------------------
export const PopupPositions: PopPosition[] = [
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
  // 操作函数
  //-----------------------------------------------------
  function onClick(pos: PopPosition) {
    console.log("click", pos);
    if (props.handler) {
      props.handler({ pos, logicType: props.defaultType ?? 'primary' })
    }
  }

  //-----------------------------------------------------
  // 数据改动
  //-----------------------------------------------------

  //-----------------------------------------------------
  // 返回接口
  //-----------------------------------------------------
  return {
    // 计算属性
    Title,
    // 操作函数
    onClick,
    // 数据改动
    // 远程操作

  };
}