<script lang="ts" setup>
  import { BUS_KEY, TiLayoutGrid, useKeep, Vars } from '@site0/tijs';
  import { computed, inject, ref, watch } from 'vue';
  import { useRouter } from 'vue-router';
  import {
    PlaygroundBackground,
    PlaygroundLayoutMode,
    PlaygroundProps,
  } from './playground-types';
  import { usePlayground } from './use-playground';
  import { usePlaygroundLayout } from './use-playground-layout';
  import { usePlaygroundSchema } from './use-playground-schema';
  //--------------------------------------------------
  const props = defineProps<PlaygroundProps>();
  //--------------------------------------------------
  const router = useRouter();
  const _bus = inject(BUS_KEY);
  const _shown = ref<Vars>({});
  const _layout_mode = ref<PlaygroundLayoutMode>('LR');
  const _background = ref<PlaygroundBackground>('filled');
  const api = computed(() =>
    usePlayground(props, _bus!, router, _layout_mode, _background)
  );
  //--------------------------------------------------
  const GUILayout = computed(() => usePlaygroundLayout(api.value));
  const GUISchema = computed(() => usePlaygroundSchema(props, api.value));
  //--------------------------------------------------
  const keep = useKeep({
    keepAt: 'Ti-Demo-Playground-Settings',
    keepMode: 'local',
  });
  let state_loal = keep.loadObj();
  if (state_loal) {
    _layout_mode.value = state_loal.layout_mode || 'LR';
    _background.value = state_loal.background || 'filled';
  }
  //--------------------------------------------------
  watch(
    () => [_layout_mode.value, _background.value],
    () => {
      let data = {
        layout_mode: _layout_mode.value,
        background: _background.value,
      };
      keep.save(data);
    }
  );
  //--------------------------------------------------
  watch(
    () => [props.comType, props.example],
    () => {
      api.value.loadExampleProps();
    },
    { immediate: true }
  );
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
<style lang="scss">
  @use '@site0/tijs/sass/_all.scss' as *;

  div.block-main-body-wrapper.as-transparent {
    @include bg-chessboard;
  }
</style>
