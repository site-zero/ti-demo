import {
  DeltaUpdateMode,
  EmitAdaptor,
  EmitAdaptorEvent,
  I18n,
  StrOptionItem,
  TiAppBus,
  tiCheckComponent,
  TiComExampleModelTarget,
  Tmpl,
  Util,
  Vars,
} from "@site0/tijs";
import JSON5 from "json5";
import _ from "lodash";
import { computed, ref, Ref } from "vue";
import { Router } from "vue-router";
import {
  PlaygroundBackground,
  PlaygroundLayoutMode,
  PlaygroundProps,
} from "./playground-types";

export type PlaygroundFeature = ReturnType<typeof usePlayground>;

export function usePlayground(
  props: PlaygroundProps,
  _bus: TiAppBus,
  router: Router,
  _layout_mode: Ref<PlaygroundLayoutMode>,
  _background: Ref<PlaygroundBackground>
) {
  const comInfo = tiCheckComponent(props.comType);
  const exampleName = props.example || comInfo.defaultProps || "simple";
  const _cus_config_var = ref<Vars>();
  const _cus_config_txt = ref<string>();

  function onComConfChange(input: string) {
    //console.log('onComConfigChange', typeof input, input);
    try {
      let config = JSON5.parse(input);
      _cus_config_txt.value = input;
      _cus_config_var.value = config;
    } catch (err) {
      //console.info('parse error', err);
    }
  }

  function __handle_sub_event(event: EmitAdaptorEvent) {
    let { eventName, data: payload } = event;
    //console.log('__handle_sub_event', eventName, payload);
    _bus.emit(eventName, payload);
    //let comConf = getExampleProps();

    // 处理属性更新
    let model = comInfo.exampleModel;
    if(_.isFunction(model)){
      model(eventName, payload);
      return;
    }
    let target = model[eventName];

    // 看来需要处理
    if (target) {
      let targets: TiComExampleModelTarget[] = _.concat(target);
      for (let target of targets) {
        // 高度自定义
        if (_.isFunction(target)) {
          _cus_config_var.value = target(payload, _cus_config_var.value ?? {});
          continue;
        }

        // 获取目标
        if (!_cus_config_var.value) {
          _cus_config_var.value = {};
        }
        let scopedData = _cus_config_var.value;
        let update_mode: DeltaUpdateMode = "assign";
        let delta = {} as Vars;
        // {"change": "value"}
        if (_.isString(target)) {
          let key = Tmpl.exec(target, payload);
          _.set(delta, key, payload);
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
          // 指定了更新模式
          if (target.mode) {
            update_mode = target.mode;
          }
          // 指定了更新模板
          if (target.scope) {
            let scope = Tmpl.exec(target.scope, payload);
            scopedData = _.get(scopedData, scope);
          }
          // 确保是普通 Js 对象
          if (val && val instanceof Map) {
            val = Util.mapToObj(val);
          }

          if ("..." == key) {
            _.assign(delta, val);
          } else {
            _.set(delta, key, val);
          }
        }

        // 防空
        if (!scopedData) {
          continue;
        }

        // 更新配置信息
        if ("assign" == update_mode) {
          _.assign(scopedData, delta);
        } else {
          _.merge(scopedData, delta);
        }
      }
      // 更新配置文件文本
      _cus_config_txt.value = JSON5.stringify(_cus_config_var.value, null, 2);
    }
  }

  function getLiveEventHandlers() {
    let re = {} as Record<string, EmitAdaptor>;
    let models = comInfo.exampleModel ?? { change: "value" };
    for (let eventName of _.keys(models)) {
      re[eventName] = __handle_sub_event;
    }

    // 剩余的消息，仅仅通知一下总线
    for (let eventName of comInfo.events) {
      if (!re[eventName]) {
        re[eventName] = (event: EmitAdaptorEvent) => {
          let { eventName, data: payload } = event;
          _bus.emit(eventName, payload);
        };
      }
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

  function loadExampleProps() {
    let ex = _.find(comInfo.exampleProps, (ex) => ex.name === exampleName);
    let config: Vars;

    // 未找到设置
    if (!ex) {
      config = {};
    }
    // 动态设置
    else if (_.isFunction(ex.comConf)) {
      config = ex.comConf();
    }
    // 直接复制
    else {
      config = _.cloneDeep(ex.comConf);
    }

    // 设置内容
    _cus_config_txt.value = JSON5.stringify(config, null, 2);
    _cus_config_var.value = config;
  }

  function getBlockBodyStyle() {
    // 采用默认样式
    return {
      INPUT: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      EDIT: {},
      SHELF: {},
      ACTION: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      TILE: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      PLAY: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      VIEW: {},
    }[comInfo.race];
  }

  function getBlockMainStyle() {
    let re = {
      INPUT: {
        display: "flex",
        maxWidth: "500px",
        margin: "auto",
        postion: "static",
        inset: "unset",
        height: "unset",
        width: "unset",
      },
      EDIT: {},
      SHELF: {},
      ACTION: {},
      TILE: {
        display: "flex",
        maxWidth: "500px",
        margin: "auto",
        postion: "static",
        inset: "unset",
        height: "unset",
        width: "unset",
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
    _cus_config_txt,
    _cus_config_var,
    comInfo,
    exampleName,
    onComConfChange,
    getLiveEventHandlers,
    getExampleOptions,
    getBlockBodyStyle,
    getBlockMainStyle,
    loadExampleProps,
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
