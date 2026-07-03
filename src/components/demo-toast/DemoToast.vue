<script lang="ts" setup>
  import { Toast } from "@site0/tijs";
  import { DemoPopup, DemoPopupPayload } from "../";
  import { toast_config_fields } from "./demo-toast-config-fields";
  import { DemoToastEmitter, DemoToastProps } from "./demo-toast-types";
  //-----------------------------------------------------
  const emit = defineEmits<DemoToastEmitter>();
  const props = withDefaults(defineProps<DemoToastProps>(), {});
  //-----------------------------------------------------
  const MoreFields = toast_config_fields();
  //-----------------------------------------------------
  async function onClick(payload: DemoPopupPayload) {
    let { pos, logicType, more } = payload;
    let { content = "Hello" } = more;
    await Toast(content, {
      position: pos,
      type: logicType,
      // reverseColor: more.reverseColor,
      // boxFontSize: more.boxFontSize,
      // boxPadding: more.boxPadding,
      // boxRadius: more.boxRadius
      ...more,
    });
  }
  //-----------------------------------------------------
</script>
<template>
  <DemoPopup
    :handler="onClick"
    title="Demo Toast"
    defaultType="warn"
    defaultContent="Hello"
    :more-fields="MoreFields" />
</template>
