<script setup lang="ts">
import { BUS_KEY } from "ti";
import { onUnmounted, provide, ref, watch } from "vue";
import { CssUtils, Num, Store, createAppBus, watchAppResize } from "ti";

/*-------------------------------------------------------

                   全局消息总线

-------------------------------------------------------*/
let bus = createAppBus(onUnmounted);
provide(BUS_KEY, bus);
watchAppResize(bus)
/*-------------------------------------------------------

                      Data

-------------------------------------------------------*/
let _TC_key = "Ti-DemoApp-Theme-Color";
let _TC_dft = "auto-color-mode";
let tc_val = Store.local.getString(_TC_key, "auto-color-mode");
const theme_color = ref(tc_val);
/*-------------------------------------------------------

                   Methods

-------------------------------------------------------*/
function ToggleThemeColorMode() {
  let colors = ["light", "dark", "auto-color-mode"];
  let index = colors.indexOf(theme_color.value);
  let color = Num.scrollIndex(index + 1, colors.length);
  theme_color.value = colors[color];
  if (_TC_dft == theme_color.value) {
    Store.local.remove(_TC_key);
  } else {
    Store.local.set(_TC_key, theme_color.value);
  }
}
function updateDocumentThemeColorMark() {
  let klass = {
    "auto-color-mode": "auto-color-mode" == theme_color.value,
    "light": "light" == theme_color.value,
    "dark": "dark" == theme_color.value
  };
  let html = document.documentElement;
  html.className = CssUtils.joinClassNames(klass);
}
/*-------------------------------------------------------

                   Methods

-------------------------------------------------------*/
watch(
  theme_color,
  () => {
    updateDocumentThemeColorMark();
  },
  {
    immediate: true
  }
);
</script>

<template>
  <main class="demo-top">
    <RouterView class="chute" name="chute" />
    <RouterView class="arena" name="arena" :theme_color="theme_color"
      @toggle:theme_color="ToggleThemeColorMode" />
  </main>
</template>
