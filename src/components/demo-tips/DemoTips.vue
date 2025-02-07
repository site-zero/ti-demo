<script setup lang="ts">
  import { TIPSET_API } from '@site0/tijs';
  import { inject, onMounted, onUnmounted, useTemplateRef } from 'vue';

  const _app_tips = inject(TIPSET_API);
  const $main = useTemplateRef('main');
  const _tips = _app_tips?.createComTips({
    getScope: () => $main.value,
    onMounted,
    onUnmounted,
  });
  _tips?.addTip({
    selector: 'th:first-child',
    content:
      'Customizing TiTextSnippet in Vue 3 with Vite using JSX brings new flexibility.',
    dockMode: 'H-left',
    width: '120px',
    type: 'danger',
  });
  _tips?.addTip({
    selector: 'th:last-child',
    content:
      'Customizing TiTextSnippet in Vue 3 with Vite using JSX brings new flexibility.',
    dockMode: 'H-right',
    width: '120px',
    type: 'warn',
  });
  _tips?.addTip({
    selector: 'td:first-child',
    content:
      'Customizing TiTextSnippet in Vue 3 with Vite using JSX brings new flexibility.',
    dockMode: 'V-top',
    width: '120px',
    type: 'number',
  });
  _tips?.addTip({
    selector: 'td:last-child',
    content:
      'Customizing TiTextSnippet in Vue 3 with Vite using JSX brings new flexibility.',
    dockMode: 'V-bottom',
    width: '120px',
    type: 'text',
  });
</script>
<template>
  <div class="demo-tips" ref="main">
    <h3>this is some tips</h3>
    <section class="as-links">
      <a
        href="#"
        data-tip-id="AAA"
        data-tip-content="Customizing TiTextSnippet in Vue 3 with Vite using JSX brings new flexibility."
        data-tip-padding="b">
        Hover to show tip
      </a>
    </section>
    <hr />
    <section>
      <table border="1">
        <thead>
          <tr>
            <th>H-left</th>
            <th>H-right</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>V-top</td>
            <td>V-bottom</td>
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
