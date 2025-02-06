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
    content: 'hahahah',
  });
</script>
<template>
  <div class="demo-tips" ref="main">
    <section>
      <a href="#A" data-tip-id="AAA" data-tip-content="Customizing TiTextSnippet in Vue 3 with Vite using JSX brings new flexibility.">AAA</a>
    </section>
    <hr />
    <section>
      <table border="1">
        <thead>
          <tr>
            <th>Title A</th>
            <th>Title B</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Cell A</td>
            <td>Cell B</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>
<style scoped lang="scss">
  @use '@site0/tijs/sass/_all.scss' as *;
</style>
