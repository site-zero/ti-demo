import { LayoutGridProps } from '@site0/tijs';
import { PlaygroundFeature } from './use-playground';

export function usePlaygroundLayout(api: PlaygroundFeature): LayoutGridProps {
  return {
    className: 'fit-parent',
    keepSizes: 'local: Demo-Playground-Layout-Sizes',
    gridStyle: {
      backgroundColor: 'var(--ti-color-border-thin)',
      gap: '2px',
    },
    itemStyle: {
      backgroundColor: 'var(--ti-color-card)',
    },
    layout: {
      gridTemplateColumns: '50% 1fr',
      gridTemplateRows: 'auto 1fr',
    },
    blocks: [
      {
        type: 'grid',
        grid: { gridColumn: '1/span 2' },
        layout: {
          gridTemplateColumns: '1fr auto auto',
          gridTemplateRows: '1fr',
        },
        blocks: [{ name: 'tabs' }, { name: 'modes' }, { name: 'bgs' }],
      },
      {
        name: 'live',
        overflowMode: 'cover',
        // mainStyle: {
        //   display: 'flex',
        //   alignItems: 'center',
        //   justifyContent: 'center',
        //   height: '100%',
        // },
        bodyStyle: api.getBlockBodyStyle(),
        mainStyle: api.getBlockMainStyle(),
        bar: {
          mode: 'column',
          position: 'next',
          adjustIndex: 0,
        },
      },
      {
        name: 'conf',
        overflowMode: 'cover',
      },
    ],
  };
}
