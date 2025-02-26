import { I18n, StrOptionItem, tiCheckComponent } from '@site0/tijs';
import _ from 'lodash';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { PlaygroundProps } from './playground-types';

export type PlaygroundFeature = ReturnType<typeof usePlayground>;
export type PlaygroundLayoutMode = 'LR' | 'TB' | 'FU';
export type PlaygroundLiveBg = 'transparent' | 'filled';

export function usePlayground(props: PlaygroundProps) {
  const comInfo = tiCheckComponent(props.comType);
  const exampleName = props.example || comInfo.defaultProps || 'simple';
  const router = useRouter();

  const _view_mode = ref<PlaygroundLayoutMode>('LR');
  const _live_bg = ref<PlaygroundLiveBg>('filled');

  function getExampleOptions() {
    let re = [] as StrOptionItem[];
    for (let ex of comInfo.exampleProps) {
      re.push({
        value: ex.name,
        text: ex.text ? I18n.text(ex.text) : ex.name,
      });
    }
    return re;
  }

  function getExampleProps() {
    let ex = _.find(comInfo.exampleProps, (ex) => ex.name === exampleName);
    if (!ex) {
      return {};
    }
    if (_.isFunction(ex.comConf)) {
      return ex.comConf();
    }
    return _.cloneDeep(ex.comConf);
  }

  function getBlockBodyStyle() {
    // 采用默认样式
    return {
      INPUT: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      EDIT: {},
      SHELF: {},
      ACTION: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      TILE: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      PLAY: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      VIEW: {},
    }[comInfo.race];
  }

  function getBlockMainStyle() {
    let re = {
      INPUT: {
        display: 'flex',
        maxWidth: '500px',
        margin: 'auto',
        paddingBottom: '20%',
        postion: 'static',
        inset: 'unset',
        height: 'unset',
        width: 'unset',
      },
      EDIT: {},
      SHELF: {},
      ACTION: {},
      TILE: {
        display: 'flex',
        maxWidth: '500px',
        margin: 'auto',
        paddingBottom: '20%',
        postion: 'static',
        inset: 'unset',
        height: 'unset',
        width: 'unset',
      },
      PLAY: {},
      VIEW: {},
    }[comInfo.race];

    _.assign(re, comInfo.liveStyle);

    return re;
  }

  function selectExample(exName: string) {
    let path = `/${props.comType}/${exName}`;
    router.push({ path });
  }

  // 输出特性
  return {
    comInfo,
    exampleName,
    getExampleOptions,
    getExampleProps,
    getBlockBodyStyle,
    getBlockMainStyle,
    selectExample,
    BGMode: computed(() => _live_bg.value),
    ViewMode: computed(() => _view_mode.value),
  };
}
