<script setup lang="ts">
  import { CssUtils, I18n, TiIcon } from '@site0/tijs';
  import _ from 'lodash';
  import { ref } from 'vue';
  import { buildNavItemGroups, NavItem, NavItemGroup } from './build-nav-items';

  type NavProps = {
    current?: string;
  };

  const props = defineProps<NavProps>();

  const _com_count = ref(0);
  const _com_grops = ref<NavItemGroup[]>(buildNavItemGroups(_com_count));

  function getItemClass(it: NavItem) {
    let re = CssUtils.mergeClassName(_.map(it.tags, (tag) => `is-${tag}`));
    if (it.name == props.current) {
      re['is-current'] = true;
    }
    return re;
  }

  // function OnClickItem(it: NavItem) {
  //   if (it.current) {
  //     return;
  //   }
  //   emit("select", it.name);
  // }
</script>

<template>
  <nav>
    <template v-for="grp in _com_grops">
      <h3>
        {{ grp.text }} <em> x {{ grp.items.length }}</em>
      </h3>
      <section>
        <div v-for="it in grp.items" :class="getItemClass(it)" class="nav-item">
          <RouterLink :to="it.href">
            <TiIcon class="s24" :value="it.icon || 'fas-question'" />
            <span>{{ I18n.text(it.text ?? it.name) }}</span>
          </RouterLink>
        </div>
      </section>
    </template>
    <aside>Total {{ _com_count }} Components</aside>
  </nav>
</template>

<style scoped lang="scss">
  @use '@site0/tijs/sass/_all.scss' as *;

  nav {
    position: relative;
    padding: 0.4em;
    font-size: var(--ti-fontsz-m);
    line-height: 1.4em;
    > aside {
      @include pos-abs($t: 0, $r: 0, $h: 2em);
      @include flex-center($jc: flex-start);
      @include font-fixed;
      font-size: 9px;
      padding: 0 0.2em;
      color: var(--ti-color-track);
    }
  }

  h3 {
    border-bottom: 1px solid var(--ti-color-border-shallow);
    margin: 0;
    padding: 0.2em;
    font-size: SZ(10);
    color: var(--ti-color-track);
    em {
      font-style: normal;
      font-weight: normal;
      opacity: 0.6;
    }
  }

  section {
    padding: SZ(10) 0;
    @include flex-align($ai: stretch, $ac: stretch);

    div.nav-item {
      width: 5em;
      margin: 0.1em;
      > a {
        @include flex-align-v-nowrap($ai: center);
        text-align: center;
        cursor: pointer;
        padding: 0.4em 0;
        border-radius: var(--ti-measure-r-s);
        span {
          display: block;
          font-size: 0.8em;
          //white-space: nowrap;
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        &:hover {
          background-color: var(--ti-color-highlight);
          text-decoration: none;
          span {
            text-decoration: underline;
          }
        }
      }

      &.is-current > a {
        font-weight: bold;
        background-color: var(--ti-color-selected);
        color: var(--ti-color-selected-f);
        cursor: default;
      }

      &.is-ing > a {
        color: var(--ti-color-warn);
        > * {
          opacity: 0.8;
        }
      }

      &.is-scaffold > a {
        color: var(--ti-color-track);
        > * {
          opacity: 0.8;
        }
      }
    }
  }
</style>
