<script lang="ts" setup>
  import { TiForm } from "@site0/tijs";
  import _ from "lodash";
  import { use_demo_popup_form } from "./demo-popup-form";
  import { DemoPopupEmitter, DemoPopupProps } from "./demo-popup-types";
  import { PopupPositions, useDemoPopupApi } from "./use-demo-popup-api";
  //-----------------------------------------------------
  const emit = defineEmits<DemoPopupEmitter>();
  const props = withDefaults(defineProps<DemoPopupProps>(), {});
  const api = useDemoPopupApi(props, { emit });
  //-----------------------------------------------------
  const FormConfig = use_demo_popup_form(props);
  //-----------------------------------------------------
</script>
<template>
  <div class="demo-popup">
    <h4>{{ api.Title.value }}</h4>
    <main>
      <a v-for="pos in PopupPositions" @click.left="api.onClick(pos)">
        {{ _.upperFirst(pos) }}
      </a>
    </main>
    <TiForm v-bind="FormConfig" />
  </div>
</template>
<style lang="scss">
  @use "./demo-popup.scss";
</style>
