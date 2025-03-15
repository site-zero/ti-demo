<script setup lang="ts">
  import { CssUtils, Dom, I18n, TiIcon } from '@site0/tijs';
  import _ from 'lodash';
  import { onMounted, ref, useTemplateRef, watch } from 'vue';
  import { buildNavItemGroups, NavItem, NavItemGroup } from './build-nav-items';
  //-----------------------------------------------------
  const props = defineProps<{
    current?: string;
  }>();
  //-----------------------------------------------------
  const $el = useTemplateRef<HTMLElement>('el');
  const _com_count = ref(0);
  const _com_grops = ref<NavItemGroup[]>(buildNavItemGroups(_com_count));
  //-----------------------------------------------------
  function getItemClass(it: NavItem) {
    let re = CssUtils.mergeClassName(_.map(it.tags, (tag) => `is-${tag}`));
    if (it.name == props.current) {
      re['is-current'] = true;
    }
    return re;
  }
  //-----------------------------------------------------
  type ScrollBlock = 'start' | 'center' | 'end' | 'nearest';
  function autoScrollCurrentIntoView(
    block: ScrollBlock = 'nearest',
    inline: ScrollBlock = 'nearest'
  ) {
    let el = Dom.find('.is-current', $el.value!);
    if (el) {
      el.scrollIntoView({
        behavior: 'smooth', // 启用平滑滚动
        block,
        inline,
      });
    }
  }
  //-----------------------------------------------------
  watch(
    () => props.current,
    () => {
      _.delay(() => autoScrollCurrentIntoView(), 100);
    }
  );
  //-----------------------------------------------------
  onMounted(() => {
    _.delay(() => autoScrollCurrentIntoView('center'), 10);
  });
  //-----------------------------------------------------
</script>

<template>
  <nav ref="el">
    <div class="nav-con">
      <aside>
        <span>Total {{ _com_count }} Components</span>
        <a @click.left="autoScrollCurrentIntoView('center')">
          <i class="fas fa-crosshairs"></i>
        </a>
      </aside>
      <div class="nav-scroller">
        <template v-for="grp in _com_grops">
          <h3>
            {{ grp.text }} <em> x {{ grp.items.length }}</em>
          </h3>
          <section>
            <div
              v-for="it in grp.items"
              :class="getItemClass(it)"
              class="nav-item">
              <RouterLink :to="it.href">
                <TiIcon class="s24" :value="it.icon || 'fas-question'" />
                <span>{{ I18n.text(it.text ?? it.name) }}</span>
              </RouterLink>
            </div>
          </section>
        </template>
      </div>
    </div>
  </nav>
</template>

<style scoped lang="scss">
  @use './nav.scss';
</style>
