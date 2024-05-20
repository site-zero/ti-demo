<script setup lang="ts">
  import {
    CssUtils,
    I18n,
    TiComInfo,
    TiComRace,
    TiIcon,
    Vars,
    tiFindComponents,
  } from '@site0/tijs';
  import _ from 'lodash';
  import { computed, ref } from 'vue';

  type NavProps = {
    current?: string;
  };

  const props = defineProps<NavProps>();

  interface NavItem extends TiComInfo {
    icon: string;
    className?: Vars;
    current?: boolean;
    href: string;
  }

  type NavItemGroup = {
    race: TiComRace;
    text: string;
    items: NavItem[];
  };

  let allComs = tiFindComponents();
  const _com_count = ref(0);

  const NavItemGroups = computed(() => {
    // 准备归纳
    let itemMap = {} as {
      [k: string]: NavItem[];
    };

    // 归纳
    _com_count.value = 0;
    for (let comInfo of allComs) {
      if (comInfo.asInner) {
        continue;
      }
      _com_count.value += 1;
      let current = comInfo.name == props.current;
      let it: NavItem = {
        ...comInfo,
        current,
        className: CssUtils.mergeClassName(
          {
            'is-current': current,
          },
          _.map(comInfo.tags, (tag) => `is-${tag}`)
        ),
        href: `/${comInfo.name}`,
      };
      let items = itemMap[it.race];
      if (!items) {
        items = [];
        itemMap[it.race] = items;
      }
      items.push(it);
    }

    // 输出列表
    let groups: NavItemGroup[] = [];
    _.forEach(itemMap, (items, race) => {
      groups.push({
        race: race as TiComRace,
        text: race,
        items: _.sortBy(items, 'name'),
      });
    });
    return groups;
  });

  // function OnClickItem(it: NavItem) {
  //   if (it.current) {
  //     return;
  //   }
  //   emit("select", it.name);
  // }
</script>

<template>
  <nav>
    <template v-for="grp in NavItemGroups">
      <h3>
        {{ grp.text }} <em> x {{ grp.items.length }}</em>
      </h3>
      <section>
        <div v-for="it in grp.items" :class="it.className" class="nav-item">
          <RouterLink :to="it.href">
            <TiIcon class="s24" :value="it.icon || 'fas-question'" />
            <span>{{ I18n.text(it.text) }}</span>
          </RouterLink>
        </div>
      </section>
    </template>
    <aside>Total {{ _com_count }} Components</aside>
  </nav>
</template>

<style scoped lang="scss">
  @use '@site0/tijs/scss' as *;

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
      color: var(--ti-color-disable);
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
      margin: 0;
      > a {
        @include flex-align-v-nowrap($ai: center);
        text-align: center;
        cursor: pointer;
        padding: 0.6em 0;
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
          background-color: var(--ti-color-hightlight);
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
