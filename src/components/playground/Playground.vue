<script lang="ts" setup>
  import { BlockEvent, TiLayoutGrid, Vars } from '@site0/tijs';
  import { computed, ref } from 'vue';
  import { PlaygroundProps } from './playground-types';
  import { usePlayground } from './use-playground';
  import { usePlaygroundLayout } from './use-playground-layout';
  import { usePlaygroundSchema } from './use-playground-schema';
  //--------------------------------------------------
  const props = defineProps<PlaygroundProps>();
  //--------------------------------------------------
  const _shown = ref<Vars>({});
  const api = computed(() => usePlayground(props));
  //--------------------------------------------------
  const GUILayout = computed(() => usePlaygroundLayout(api.value));
  const GUISchema = computed(() => usePlaygroundSchema(props, api.value));
  //--------------------------------------------------
</script>
<template>
  <TiLayoutGrid
    v-bind="GUILayout"
    :schema="GUISchema"
    :shown="_shown"
    class="bunya-packing-editor"
    @hide="_shown.config = false" />
</template>
