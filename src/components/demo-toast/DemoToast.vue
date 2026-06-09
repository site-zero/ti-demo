<script lang="ts" setup>
  import { Toast } from "@site0/tijs";
  import { DemoPopup, DemoPopupPayload } from "../";
  import { DemoToastEmitter, DemoToastProps } from "./demo-toast-types";
  //-----------------------------------------------------
  const emit = defineEmits<DemoToastEmitter>();
  const props = withDefaults(defineProps<DemoToastProps>(), {});
  //-----------------------------------------------------
  async function onClick(payload: DemoPopupPayload) {
    let { pos } = payload;
    await Toast("hello", { position: pos });
  }
  //-----------------------------------------------------
</script>
<template>
  <DemoPopup :handler="onClick" title="Demo Toast" defaultType="warn" />
</template>
<style lang="scss">
  @use "./demo-toast.scss";
</style>
