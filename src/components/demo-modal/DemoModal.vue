<script setup lang="ts">
  import { DemoPopup, DemoPopupPayload } from "../";
  import { DemoModalEmitter, DemoModalProps } from "./demo-modal-types";
  import { modal_config_fields } from "./modal_config_fields";
  //-----------------------------------------------------
  const emit = defineEmits<DemoModalEmitter>();
  const props = defineProps<DemoModalProps>();
  //-----------------------------------------------------
  const MoreFields = modal_config_fields();
  //-----------------------------------------------------
  async function onClick(payload: DemoPopupPayload) {
    let { pos, logicType, more } = payload;
    let {
      content = "Hello",
      contentType = "text",
      title = "Demo",
      width = "320px",
      height = "240px",
      showMask = false,
      showCloser = false,
      escToClose = false,
      clickMaskToClose = false,
    } = more;
    await props.handler({
      position: pos,
      type: logicType,
      title,
      content,
      contentType,
      width,
      height,
      showMask: showMask ? true : false,
      showCloser: showCloser ? true : false,
      escToClose: escToClose ? true : false,
      clickMaskToClose: clickMaskToClose ? true : false,
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
