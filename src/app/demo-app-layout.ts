import { LayoutGridProps } from '@site0/tijs';

export function useDemoAppLayout(): LayoutGridProps {
  return {
    className: 'fit-parent as-card',
    blockOverflowMode: 'cover',
    keepSizes: {
      keepMode: 'local',
      keepAt: 'Ti-Demo-MainFrame',
    },
    gridStyle: {
      backgroundColor: 'var(--ti-color-body)',
    },
    layout: {
      gridTemplateColumns: '200px 1fr',
      gridTemplateRows: '40px 1fr 32px',
      gap: '1px',
    },
    blocks: [
      {
        name: 'sky',
        grid: { gridColumnStart: 1, gridColumnEnd: 3 },
      },
      {
        name: 'chute',
        overflowMode: 'cover',
        grid: { gridRowStart: 2, gridRowEnd: 4 },
        bar: { mode: 'column', position: 'next', adjustIndex: 0 },
      },
      {
        name: 'arena',
      },
      {
        name: 'foot',
        grid: { gridColumnStart: 2, gridColumnEnd: 3 },
      },
    ],
  };
}
