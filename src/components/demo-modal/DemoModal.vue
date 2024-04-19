<script setup lang="ts">
  import { Alert, openAppModal } from '@site0/tijs';
  import { DialogItem } from './example/ex-types';

  const props = defineProps<{
    dialogs: DialogItem[];
  }>();

  async function OnOpenDialog(dia: DialogItem) {
    // 普通对话框
    if (dia.dialog) {
      let re = await openAppModal(dia.dialog);
      console.log(`Dialog[${dia.title}]`, re);
    }
    // 消息框
    else if (dia.alert) {
      await Alert(dia.alert.msg, dia.alert.options);
    }
  }
</script>
<template>
  <div class="demo-modal">
    <div
      v-for="dia in props.dialogs"
      class="demo-modal-item active-reverse"
      :class="`box-as-${dia.type || 'info'}`"
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
    cursor: pointer;
    padding: SZ(8) SZ(12);
    border-radius: SZ(4);
    user-select: none;
    font-size: 0.9em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    .as-text {
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
</style>
