<script lang="ts" setup>
  import { TiForm, toLogicColor } from "@site0/tijs";
  import { computed } from "vue";
  import { use_demo_popup_form } from "./demo-popup-form";
  import { DemoPopupEmitter, DemoPopupProps } from "./demo-popup-types";
  import { useDemoPopupApi } from "./use-demo-popup-api";
  //-----------------------------------------------------
  const emit = defineEmits<DemoPopupEmitter>();
  const props = withDefaults(defineProps<DemoPopupProps>(), {
    defaultContent: "",
  });
  //-----------------------------------------------------
  const api = useDemoPopupApi(props, emit);
  //-----------------------------------------------------
  const TopStyle = computed(() => {
    const { logicType } = api.Data.value;
    const color = toLogicColor(logicType);
    const border = toLogicColor(logicType, "b");
    const bg = toLogicColor(logicType, "r");
    return {
      "--color": color,
      "--border": border,
      "--bg": bg,
    };
  });
  //-----------------------------------------------------
  const FormConfig = use_demo_popup_form(props, api);
  //-----------------------------------------------------
  defineExpose({
    getData: () => api.Data.value,
  });
  //-----------------------------------------------------
</script>
<template>
  <div class="demo-popup" :style="TopStyle">
    <div class="part-left">
      <h4>{{ api.Title.value }}</h4>
      <main>
        <a v-for="it in api.PopupPositions.value" @click.left="api.onClick(it)">
          {{ it.text }}
        </a>
      </main>
    </div>
    <TiForm v-bind="FormConfig" class="part-right" @change="api.onFormChange" />
  </div>
</template>
<style lang="scss">
  @use "./demo-popup.scss";
</style>
