<script setup lang="ts">
  import { openAppModal } from '@site0/tijs';
  import { DialogItem } from './example/ex-types';

  const props = defineProps<{
    dialogs: DialogItem[];
  }>();

  async function OnOpenDialog(dia: DialogItem) {
    let re = openAppModal(dia.dialog);
    console.log(`Dialog[${dia.title}]`, re);
  }
</script>
<template>
  <div class="demo-modal">
    <div
      v-for="dia in props.dialogs"
      class="demo-modal-item"
      @click="OnOpenDialog(dia)">
      <div class="as-text">{{ dia.title }}</div>
      <div class="as-brief" v-if="dia.brief">{{ dia.brief }}</div>
    </div>
  </div>
</template>
<style scoped lang="scss">
  @use '@site0/tijs/scss' as *;

  .demo-modal {
    padding: SZ(10);
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(SZ(120), 1fr));
    grid-auto-rows: auto;
    gap: SZ(10);
  }

  .demo-modal-item {
    @include flex-center;
    @include button(primary);
  }
</style>
