import { LayoutGridProps } from '@site0/tijs';
import { PlaygroundLayoutMode } from './playground-types';
import { PlaygroundFeature } from './use-playground';

const LAYOUTS: Record<PlaygroundLayoutMode, (api: PlaygroundFeature) => LayoutGridProps> = {
  //-------------------------------------
  // 左右布局
  //-------------------------------------
  LR: (api) => ({
    className: 'fit-parent as-card with-shadown r-s',
    keepSizes: 'local: Demo-Playground-Layout-Sizes-LR',
    gridStyle: {
      backgroundColor: 'var(--ti-color-border-thin)',
      padding: 'var(--ti-gap-m)',
      gap: 'var(--ti-gap-m)',
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
        bodyClass: {
          'as-transparent': api.BackgroundMode.value === 'transparent',
        },
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
  }),
  //-------------------------------------
  // 上下布局
  //-------------------------------------
  TB: (api) => ({
    className: 'fit-parent as-card with-shadown r-s',
    keepSizes: 'local: Demo-Playground-Layout-Sizes-TB',
    gridStyle: {
      backgroundColor: 'var(--ti-color-border-thin)',
      padding: 'var(--ti-gap-m)',
      gap: 'var(--ti-gap-m)',
    },
    itemStyle: {
      backgroundColor: 'var(--ti-color-card)',
    },
    layout: {
      gridTemplateColumns: '1fr',
      gridTemplateRows: 'auto 50% 1fr',
    },
    blocks: [
      {
        type: 'grid',
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
        bodyClass: {
          'as-transparent': api.BackgroundMode.value === 'transparent',
        },
        mainStyle: api.getBlockMainStyle(),
        bar: {
          mode: 'row',
          position: 'next',
          adjustIndex: 1,
        },
      },
      {
        name: 'conf',
        overflowMode: 'cover',
      },
    ],
  }),
  //-------------------------------------
  // 全屏模式
  //-------------------------------------
  FU: (api) => ({
    className: 'fit-parent as-card with-shadown r-s',
    keepSizes: 'local: Demo-Playground-Layout-Sizes-FU',
    gridStyle: {
      backgroundColor: 'var(--ti-color-border-thin)',
      padding: 'var(--ti-gap-m)',
      gap: 'var(--ti-gap-m)',
    },
    itemStyle: {
      backgroundColor: 'var(--ti-color-card)',
    },
    layout: {
      gridTemplateColumns: '1fr',
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
        bodyClass: {
          'as-transparent': api.BackgroundMode.value === 'transparent',
        },
        mainStyle: api.getBlockMainStyle(),
      },
    ],
    panels: [{
      title: 'Config',
      position: 'right',
      width: '50%',
      height: '100%',
      minWidth: '300px',
      maxWidth: '100px',
      name: 'conf',
    }]
  }),
}

export function usePlaygroundLayout(api: PlaygroundFeature): LayoutGridProps {
  let layout = LAYOUTS[api.LayoutMode.value];
  return layout(api);
}
