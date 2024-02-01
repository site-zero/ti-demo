<script setup lang="ts">
import { TiComInfo, TiComRace, TiIcon, tiFindComponents, I18n } from "ti";
import _ from "lodash";
import { computed } from "vue";


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
    let it = {
      ...comInfo
    } as NavItem;
    it.current = it.name == props.current;
    it.className = it.current ? "is-current" : undefined;
    it.href = `/${it.name}`;
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
      items: _.sortBy(items, "name")
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
    <section v-for="grp in NavItemGroups">
      <h3>{{ grp.text }}</h3>
      <div v-for="it in grp.items" :class="it.className" class="nav-item">
        <RouterLink :to="it.href">
          <TiIcon :value="it.icon || 'fas-question'" />
          <span>{{ I18n.text(it.text) }}</span>
        </RouterLink>
      </div>
    </section>
  </nav>
</template>

<style scoped lang="scss">
@use "ti/scss" as *;

nav {
  padding: SZ(4);
  font-size: SZ(12);
  line-height: 1.4em;
}

section {
  padding: SZ(10) 0;

  h3 {
    border-bottom: 1px solid var(--ti-color-border-shallow);
    margin: 0;
    padding: 0.2em;
    font-size: SZ(10);
    color: var(--ti-color-track);
  }

  div.nav-item {
    >a {
      @include flex-align-nowrap;
      padding: 0.5em 0.6em;
      cursor: pointer;

      >.ti-icon {
        margin-right: SZ(4);
      }
    }

    &.is-current>a {
      font-weight: bold;
      background-color: var(--ti-color-selected);
      color: var(--ti-color-selected-f);
      border-left: 3px solid var(--ti-color-primary);
      cursor: default;
    }
  }
}
</style>
