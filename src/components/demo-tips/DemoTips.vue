<script setup lang="ts">
  import { TI_TIP_API_KEY } from '@site0/tijs';
  import { inject, onUnmounted } from 'vue';

  const _tips_api = inject(TI_TIP_API_KEY);
  const _tips = _tips_api!.createRegister(onUnmounted);
  const t0 = _tips.addTip({
    modifier: 'CTRL',
    content:
      'Customizing TiTextSnippet in Vue 3 with Vite using JSX brings new flexibility.',
    dockMode: 'H-left',
    width: '120px',
    type: 'danger',
  });
  const t1 = _tips.addTip({
    content:
      'Customizing TiTextSnippet in Vue 3 with Vite using JSX brings new flexibility.',
    dockMode: 'H-right',
    width: '120px',
    type: 'warn',
  });
  const t2 = _tips.addTip({
    content:
      'Customizing TiTextSnippet in Vue 3 with Vite using JSX brings new flexibility.',
    dockMode: 'V-top',
    type: 'number',
  });
  const t3 = _tips.addTip({
    content:
      'Customizing TiTextSnippet in Vue 3 with Vite using JSX brings new flexibility.',
    dockMode: 'V-bottom',
    type: 'text',
  });
</script>
<template>
  <div class="demo-tips" ref="main">
    <h3>this is some tips</h3>
    <section class="as-links">
      <a
        href="#"
        data-tip="Customizing TiTextSnippet in Vue 3 with Vite using JSX brings new flexibility."
        data-tip-padding="b"
        data-tip-modifier="ALT+SHIFT">
        Hover to show tip
      </a>
    </section>
    <hr />
    <section>
      <table border="1">
        <thead>
          <tr>
            <th><span :data-tip="`::${t0}`">H-left</span></th>
            <th><span :data-tip="`::${t1}`">H-right</span></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><span :data-tip="`::${t2}`">V-top</span></td>
            <td><span :data-tip="`::${t3}`">V-bottom</span></td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>
<style scoped lang="scss">
  @use '@site0/tijs/sass/_all.scss' as *;
  section.as-links {
    @include flex-align;
  }
  table {
    td,
    th {
      padding: 0.5em 2em;
    }
  }
</style>
