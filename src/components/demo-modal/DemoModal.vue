<script setup lang="ts">
  import { Alert, Confirm, Prompt, openAppModal } from '@site0/tijs';
  import _ from 'lodash';
  import { ref } from 'vue';
  import { DialogItem } from './example/ex-types';

  const diaResult = ref<any>();

  const props = defineProps<{
    dialogs: DialogItem[];
  }>();

  async function OnOpenDialog(dia: DialogItem) {
    // 普通对话框
    if (dia.dialog) {
      let re = await openAppModal(dia.dialog);
      console.log(`Dialog[${dia.title}]`, re);
      diaResult.value = re;
    }
    // 消息框
    else if (dia.alert) {
      await Alert(dia.alert.msg, dia.alert.options);
      diaResult.value = undefined;
    }
    // 确认框
    else if (dia.confirm) {
      diaResult.value = await Confirm(dia.confirm.msg, dia.confirm.options);
    }
    // 提示框
    else if (dia.prompt) {
      diaResult.value = await Prompt(dia.prompt.msg, dia.prompt.options);
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
  <div class="demo-result" v-if="!_.isUndefined(diaResult)">
    {{ diaResult }}
  </div>
</template>
<style scoped lang="scss">
  @use '@site0/tijs/sass/_all.scss' as *;

  .demo-modal {
    padding: SZ(10);
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-auto-rows: auto;
    gap: SZ(10);

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
  }

  .demo-result {
    padding: 1em;
    margin: 0.5em;
    border: 2px dotted var(--ti-color-info);
    @include font-fixed;
  }
</style>
