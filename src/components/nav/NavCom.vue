<script setup lang="ts">
  import {
    I18n,
    TiComInfo,
    TiComRace,
    TiIcon,
    tiFindComponents,
  } from '@site0/tijs';
  import _ from 'lodash';
  import { computed } from 'vue';

  type NavProps = {
    current?: string;
  };

  const props = defineProps<NavProps>();

  interface NavItem extends TiComInfo {
    icon: string;
    className?: string;
    current?: boolean;
    href: string;
  }

  type NavItemGroup = {
    race: TiComRace;
    text: string;
    items: NavItem[];
  };

  let allComs = tiFindComponents();

  const NavItemGroups = computed(() => {
    // 准备归纳
    let itemMap = {} as {
      [k: string]: NavItem[];
    };

    // 归纳
    for (let comInfo of allComs) {
      if (comInfo.asInner) {
        continue;
      }
      let current = comInfo.name == props.current;
      let it: NavItem = {
        ...comInfo,
        current,
        className: current ? 'is-current' : undefined,
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
      <h3>{{ grp.text }}</h3>
      <section>
        <div v-for="it in grp.items" :class="it.className" class="nav-item">
          <RouterLink :to="it.href">
            <TiIcon class="s16" :value="it.icon || 'fas-question'" />
            <span>{{ I18n.text(it.text) }}</span>
          </RouterLink>
        </div>
      </section>
    </template>
  </nav>
</template>

<style scoped lang="scss">
  @use '@site0/tijs/scss' as *;

  nav {
    padding: SZ(4);
    font-size: SZ(12);
    line-height: 1.4em;
  }

  h3 {
    border-bottom: 1px solid var(--ti-color-border-shallow);
    margin: 0;
    padding: 0.2em;
    font-size: SZ(10);
    color: var(--ti-color-track);
  }

  section {
    padding: SZ(10) 0;
    @include flex-align($ai: stretch, $ac: stretch);

    div.nav-item {
      width: SZ(48);
      margin: SZ(2);
      > a {
        @include flex-align-v-nowrap($ai: center);
        text-align: center;
        cursor: pointer;
        padding:SZ(6) SZ(4);
        border-radius: SZ(2);
        span {
          display: block;
          font-size: 0.8em;
          white-space: nowrap;
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        &:hover {
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
    }
  }
</style>
