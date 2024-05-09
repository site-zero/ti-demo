<script setup lang="ts">
  import { BUS_KEY, TiMainFrame } from '@site0/tijs';
  import { onUnmounted, provide, ref, watch } from 'vue';
  import {
    CssUtils,
    Num,
    TiStore,
    createAppBus,
    watchAppResize,
  } from '@site0/tijs';

  /*-------------------------------------------------------

                   全局消息总线

-------------------------------------------------------*/
  let bus = createAppBus(onUnmounted);
  provide(BUS_KEY, bus);
  watchAppResize(bus);
  /*-------------------------------------------------------

                      Data

-------------------------------------------------------*/
  let _TC_key = 'Ti-DemoApp-Theme-Color';
  let _TC_dft = 'auto-color-mode';
  let tc_val = TiStore.local.getString(_TC_key, 'auto-color-mode');
  const theme_color = ref(tc_val);
  /*-------------------------------------------------------

                   Methods

-------------------------------------------------------*/
  function ToggleThemeColorMode() {
    let colors = ['light', 'dark', 'auto-color-mode'];
    let index = colors.indexOf(theme_color.value);
    let color = Num.scrollIndex(index + 1, colors.length);
    theme_color.value = colors[color];
    if (_TC_dft == theme_color.value) {
      TiStore.local.remove(_TC_key);
    } else {
      TiStore.local.set(_TC_key, theme_color.value);
    }
  }
  function updateDocumentThemeColorMark() {
    let klass = {
      'auto-color-mode': 'auto-color-mode' == theme_color.value,
      'light': 'light' == theme_color.value,
      'dark': 'dark' == theme_color.value,
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
      immediate: true,
    }
  );
</script>

<template>
  <TiMainFrame
    mode="Z"
    :keep-frame="{ keepAt: 'Ti-Demo-MainFrame', keepMode: 'local' }">
    <!--插槽: 顶栏-->
    <template v-slot:sky>
      <h1 class="demo-sky">Ti Demo App</h1>
    </template>
    <!--插槽: 侧边栏-->
    <template v-slot:chute>
      <RouterView class="chute" name="chute" />
    </template>
    <!--插槽: 底栏-->
    <template v-slot:foot>
      <div>动态底栏</div>
    </template>
    <!--插槽: 主区域-->
    <RouterView
      class="arena"
      name="arena"
      :theme_color="theme_color"
      @toggle:theme_color="ToggleThemeColorMode" />
  </TiMainFrame>
</template>
