import { DeltaUpdateMode, EmitAdaptor, EmitAdaptorPayload, I18n, StrOptionItem, TiAppBus, tiCheckComponent, TiComExampleModelTarget, Tmpl, Util, Vars } from '@site0/tijs';
import JSON5 from 'json5';
import _ from 'lodash';
import { computed, ref, Ref } from 'vue';
import { useRouter } from 'vue-router';
import { PlaygroundBackground, PlaygroundLayoutMode, PlaygroundProps } from './playground-types';

export type PlaygroundFeature = ReturnType<typeof usePlayground>;

export function usePlayground(props: PlaygroundProps,
  _bus: TiAppBus,
  _layout_mode: Ref<PlaygroundLayoutMode>,
  _background: Ref<PlaygroundBackground>) {
  const comInfo = tiCheckComponent(props.comType);
  const exampleName = props.example || comInfo.defaultProps || 'simple';
  const router = useRouter();
  const _cus_config_var = ref<Vars>();
  const _cus_config_txt = ref<string>();

  function onComConfChange(input: string) {
    console.log('onComConfigChange', typeof input, input);
    try {
      let config = JSON5.parse(input);
      _cus_config_txt.value = input;
      _cus_config_var.value = config;
    } catch (err) {
      console.info('parse error', err);
    }
  }

  function __handle_sub_event(event: EmitAdaptorPayload) {
    let { eventName, data: payload } = event
    console.log('__handle_sub_event', eventName, payload);
    _bus.emit(eventName, payload);
    let comConf = getExampleProps();

    // 处理属性更新
    let model = comInfo.exampleModel;
    let target = model[eventName];

    // 看来需要处理
    if (target) {
      let targets: TiComExampleModelTarget[] = _.concat(target);
      let delta = {} as Vars;
      let update_mode: DeltaUpdateMode = 'assign';
      for (let target of targets) {
        // {"change": "value"}
        if (_.isString(target)) {
          let key = Tmpl.exec(target, payload);
          _.set(delta, key, payload);
        }
        // {"field-change": (val: any, comConf) => void}
        else if (_.isFunction(target)) {
          target(payload, delta);
        }
        // {"field-change": {key:"data.${name}", value:"=value"}}
        else {
          let key = Tmpl.exec(target.key, payload);
          let val = Util.explainObj(payload, target.val, {
            jsValue: {
              autoNum: false,
              autoBool: false,
              autoJson: false,
              autoDate: false,
            },
          });
          // 确保是普通 Js 对象
          if (val && val instanceof Map) {
            val = Util.mapToObj(val);
          }
          _.merge(delta, val);
        }

        // 更新配置信息
        if ('assign' == update_mode) {
          _.assign(_cus_config_var.value, delta);
        } else if ('merge' == update_mode) {
          _.merge(_cus_config_var.value, delta);
        } else {
          _.merge(_cus_config_var.value, delta);
        }
        _cus_config_txt.value = JSON5.stringify(_cus_config_var.value, null, 2);
      }
    }
  }

  function getLiveEventHandlers() {
    let re = {} as Record<string, EmitAdaptor>;
    let models = comInfo.exampleModel ?? { 'change': 'value' };
    for (let eventName of _.keys(models)) {
      re[eventName] = __handle_sub_event;
    }
    return re;
  }

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

  function getExampleProps(): Vars {
    // 采用自定义
    if (!_.isEmpty(_cus_config_var.value)) {
      return _.assign({}, _cus_config_var.value);
    }

    // 采用默认
    let ex = _.find(comInfo.exampleProps, (ex) => ex.name === exampleName);
    if (!ex) {
      return {}
    }
    if (_.isFunction(ex.comConf)) {
      return _.cloneDeep(ex.comConf());
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
    onComConfChange,
    getLiveEventHandlers,
    getExampleOptions,
    getExampleProps,
    getBlockBodyStyle,
    getBlockMainStyle,
    selectExample,
    setBackground: (bg: PlaygroundBackground) => {
      _background.value = bg;
    },
    setLayoutMode: (mode: PlaygroundLayoutMode) => {
      _layout_mode.value = mode;
    },
    BackgroundMode: computed(() => _background.value),
    LayoutMode: computed(() => _layout_mode.value),
  };
}
