import { CssUtils, I18n, StrOptionItem, tiCheckComponent } from '@site0/tijs';
import _ from 'lodash';
import { useRouter } from 'vue-router';
import { PlaygroundProps } from './playground-types';

export type PlaygroundFeature = ReturnType<typeof usePlayground>;

export function usePlayground(props: PlaygroundProps) {
  const comInfo = tiCheckComponent(props.comType);
  const exampleName = props.example || comInfo.defaultProps || 'simple';
  const router = useRouter();

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

  function getComLiveStyle() {
    if (!_.isEmpty(comInfo.liveStyle)) {
      return CssUtils.toStyle(comInfo.liveStyle);
    }
    // 采用默认样式
    return {
      INPUT: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      },
      EDIT: {
        width: '100%',
        height: '100%',
      },
      SHELF: {
        width: '100%',
        height: '100%',
      },
      ACTION: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      },
      TILE: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      },
      PLAY: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      },
      VIEW: {
        width: '100%',
        height: '100%',
      },
    }[comInfo.race];
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
    getComLiveStyle,
    selectExample
  };
}
