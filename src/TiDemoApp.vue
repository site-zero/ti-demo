<script setup lang="ts">
  import {
    BUS_KEY,
    CssUtils,
    DateTime,
    Dom,
    Num,
    TIPSET_API,
    TiMainFrame,
    TiStore,
    createAppBus,
    useTipManager,
    watchAppResize,
  } from '@site0/tijs';
  import JSON5 from 'json5';
  import { onMounted, onUnmounted, provide, ref, watch } from 'vue';
  //-------------------------------------------------------
  // 准备提示信息
  const _app_tips = useTipManager();
  let $app_el = Dom.find('#app');
  if ($app_el) {
    let tips = _app_tips.createAppTipSet($app_el);
    provide(TIPSET_API, tips);
  }

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
  onMounted(() => {
    _app_tips.watchDocumentBody();
  });
  //-------------------------------------------------------
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
      <div class="demo-footer">{{ _bug_msg || '-- 总线无消息 --' }}</div>
    </template>
    <!--插槽: 主区域-->
    <RouterView
      class="arena"
      name="arena"
      :theme_color="theme_color"
      @toggle:theme_color="ToggleThemeColorMode" />
  </TiMainFrame>
</template>

<style scoped lang="scss">
  @use '@site0/tijs/sass/_all.scss' as *;
  .demo-footer {
    @include font-fixed;
    font-size: 10px;
    padding: 0 0.8em;
  }
</style>
