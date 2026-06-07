<script lang="ts" setup>
  import { PopPosition, Toast } from "@site0/tijs";
  import _ from "lodash";
  import { DemoToastEmitter, DemoToastProps } from "./demo-toast-types";
  //-----------------------------------------------------
  const emit = defineEmits<DemoToastEmitter>();
  const props = withDefaults(defineProps<DemoToastProps>(), {});
  //-----------------------------------------------------
  const positions: PopPosition[] = [
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
  async function onClick(pos: PopPosition) {
    await Toast("hello", { position: pos });
  }
  //-----------------------------------------------------
</script>
<template>
  <div class="demo-toast">
    <h4>Toast In Position</h4>
    <main>
      <a v-for="pos in positions" @click.left="onClick(pos)">
        {{ _.upperFirst(pos) }}
      </a>
    </main>
  </div>
</template>
<style lang="scss">
  @use "./demo-toast.scss";
</style>
