import { CodeEditorProps, LayoutSchema, SwitcherProps } from '@site0/tijs';
import { PlaygroundProps } from './playground-types';
import { PlaygroundFeature } from './use-playground';

export function usePlaygroundSchema(
  props: PlaygroundProps,
  api: PlaygroundFeature
) {
  const config = api.getExampleProps();
  const exOptions = api.getExampleOptions();
  return {
    tabs: {
      comType: 'TiSwitcher',
      comConf: {
        style: { padding: '.4em' },
        options: exOptions,
        value: api.exampleName,
      },
      events: {
        change: ({ data }) => {
          console.log('tabs change', data);
          api.selectExample(data);
        },
      },
    },
    modes: {
      comType: 'TiSwitcher',
      comConf: {
        value: api.ViewMode.value,
        style: { padding: '.4em' },
        defaultItemType: 'success',
        itemGap: 't',
        itemRadius: 't',
        options: [
          { value: 'LR', icon: 'fas-table-columns' },
          { value: 'TB', icon: 'zmdi-view-agenda' },
          { value: 'FU', icon: 'zmdi-view-carousel' },
        ],
      } as SwitcherProps,
      events: {
        change: ({ data }) => {
          console.log('menu change', data);
        },
      },
    },
    bgs: {
      comType: 'TiSwitcher',
      comConf: {
        value: api.BGMode.value,
        style: { padding: '.4em' },
        defaultItemType: 'number',
        itemGap: 't',
        itemRadius: 't',
        options: [
          { value: 'transparent', icon: 'fas-chess-board' },
          { value: 'filled', icon: 'fas-fill' },
        ],
      } as SwitcherProps,
      events: {
        change: ({ data }) => {
          console.log('menu change', data);
        },
      },
    },
    live: {
      comType: props.comType,
      comConf: config,
    },
    conf: {
      comType: 'TiCodeEditor',
      comConf: {
        className: 'fit-parent',
        value: config,
        type: 'json',
      } as CodeEditorProps,
    },
  } as LayoutSchema;
}
