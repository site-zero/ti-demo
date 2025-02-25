import { CodeEditorProps, LayoutSchema } from '@site0/tijs';
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
        options: exOptions,
        value: api.exampleName,
        style: {
          padding: '.4em',
        },
      },
      events: {
        change: ({ data }) => {
          console.log('change', data);
          api.selectExample(data);
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
