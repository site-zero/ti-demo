<script setup lang="ts">
  import {
    BUS_KEY,
    CssUtils,
    DateTime,
    Dom,
    Num,
    TI_APP_TIPS,
    TI_TIP_API_KEY,
    TiLayoutGrid,
    TiStore,
    createAppBus,
    watchAppResize,
  } from '@site0/tijs';
  import JSON5 from 'json5';
  import { computed, onUnmounted, provide, ref, watch } from 'vue';
  import { useDemoAppLayout } from './demo-app-layout';
  //-------------------------------------------------------
  // 准备提示信息
  let $app_el = Dom.find('#app');
  if ($app_el) {
    provide(TI_TIP_API_KEY, TI_APP_TIPS.api);
    TI_APP_TIPS.watchDocumentForTips($app_el.ownerDocument.body);
  }
  //--------------------------------------------------
  //
  // GUI Setup
  //
  const GUILayout = computed(() => useDemoAppLayout());
  //-------------------------------------------------------
  //
  //               全局消息总线
  //
  //-------------------------------------------------------
  let _bug_msg = ref<string>();
  let bus = createAppBus(onUnmounted);
  bus.on('*', (msg) => {
    let { srcBus, name, data } = msg;
    let str = `总线[${srcBus}]收到消息: '${name}'`;
    // if ('app-resize' != name) {
    //   console.log(str, data);
    // }
    let now = DateTime.format(new Date());
    _bug_msg.value = `${now} ${str} : ${JSON5.stringify(data)}`;
  });
  provide(BUS_KEY, bus);
  watchAppResize(bus);
  //-------------------------------------------------------
  //
  //                    Data
  //
  //-------------------------------------------------------
  let _TC_key = 'Ti-DemoApp-Theme-Color';
  let _TC_dft = 'auto-color-mode';
  let tc_val = TiStore.local.getString(_TC_key, 'auto-color-mode');
  const theme_color = ref(tc_val);
  //-------------------------------------------------------
  //
  //                  Methods
  //
  //-------------------------------------------------------
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
  //-------------------------------------------------------
  //
  //                  Life Hook
  //
  //-------------------------------------------------------
  watch(
    theme_color,
    () => {
      updateDocumentThemeColorMark();
    },
    {
      immediate: true,
    }
  );
  //-------------------------------------------------------
</script>

<template>
  <TiLayoutGrid v-bind="GUILayout">
    <template v-slot:default="block">
      <!--插槽: 顶栏-->
      <h1 v-if="'sky' == block.item.name" class="demo-sky"><a href="/">TiJS</a></h1>
      <!--插槽: 侧边栏-->
      <RouterView
        v-else-if="'chute' == block.item.name"
        class="demo-chute"
        name="chute" />
      <!--插槽: 底栏-->
      <div v-else-if="'foot' == block.item.name" class="demo-footer">
        <div>{{ _bug_msg || '-- 总线无消息 --' }}</div>
      </div>
      <!--插槽: 主区域-->
      <RouterView
        v-else-if="'arena' == block.item.name"
        class="demo-arena"
        name="arena"
        :theme_color="theme_color"
        @toggle:theme_color="ToggleThemeColorMode" />
    </template>
  </TiLayoutGrid>
</template>

<style scoped lang="scss">
  @use '@site0/tijs/sass/_all.scss' as *;

  .demo-sky {
    @include flex-align-nowrap;
    padding: 0 0.65em;
    margin: 0;
    font-size: 18px;
    font-weight: bold;
    background-color: var(--ti-color-info-r);
    color: var(--ti-color-info);
    border-bottom: 1px dashed var(--ti-color-info);
  }
  .demo-footer {
    @include flex-align-nowrap;
    @include font-fixed;
    position: absolute;
    inset: 0;
    font-size: 11px;
    > div {
      padding: 0 0.8em;
      width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
</style>
