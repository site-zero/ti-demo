import { TiComInfo, TiComRace, tiFindComponents } from '@site0/tijs';
import _ from 'lodash';
import { Ref } from 'vue';
//-----------------------------------------------------
export interface NavItem extends TiComInfo {
  icon: string;
  href: string;
}
//-----------------------------------------------------
export type NavItemGroup = {
  race: TiComRace;
  text: string;
  items: NavItem[];
};
//-----------------------------------------------------
export function buildNavItemGroups(_com_count: Ref<number>) {
  const allComs = _.cloneDeep(tiFindComponents());
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
    let it: NavItem = {
      ...comInfo,
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
  return groups.reverse();
}
