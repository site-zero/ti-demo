import { getBunyaBus } from '@bunya/lib';
import { CoreStoreApi } from '@bunya/store';
import { ActionBarItem, Confirm } from '@site0/tijs';

export function getAllocatedActions(isAIR: boolean): ActionBarItem[] {
  let re: ActionBarItem[] = [
    {
      icon: 'zmdi-time-restore',
      text: 'Reset This Line',
      className: 'is-info',
      enabled: {
        hasCheckedUnallocated: true,
      },
      action: 'restore-unallocated-remain',
    },
  ];

  if (isAIR) {
    re.push({
      text: 'Allocate',
      className: 'is-secondary',
      enabled: {
        hasCheckedUnallocated: true,
      },
      action: 'allocate',
    });
  }

  return re;
}

export function getContainerActions(isAIR: boolean): ActionBarItem[] {
  let re = [];
  if (!isAIR) {
    re.push({
      text: 'Allocate',
      className: 'is-secondary',
      enabled: {
        hasCheckedUnallocated: true,
        hasSelectedContainer: true,
      },
      action: 'allocate',
    });
  }
  return re;
}

export function getUnallocatedActions(api: CoreStoreApi): ActionBarItem[] {
  const bus = getBunyaBus();
  return [
    {
      icon: 'fas-boxes-packing',
      text: 'Auto Packing',
      className: 'is-primary-r',
      disabled: {
        changed: true,
      },
      action: async () => {
        await api.autoPakcing({ reset: false });
        bus.emit('CORE-STORE', 'process', 'auto-packing');
        await api.packing.refresh('reset');
      },
      items: [
        {
          icon: 'fas-clock-rotate-left',
          text: 'Reset Packing and Auto Create Again',
          enabled: {
            changed: false,
            existsConsol: true,
          },
          action: async () => {
            let msg = `This operation will remove all the PackingLines in the current consolidation. 
            Even those created manually by you will be removed.`;
            if (
              await Confirm(msg, {
                type: 'warn',
                textOk: 'YES, DO IT',
                textCancel: 'Cancel',
              })
            ) {
              await api.autoPakcing({ reset: true });
              bus.emit('CORE-STORE', 'process', 'auto-packing');
              await api.packing.refresh('reset');
            }
          },
        },
      ],
    },
    {
      text: 'Unallocate',
      className: 'is-warn-r',
      enabled: {
        hasCheckedAllocated: true,
      },
      action: 'unallocate',
    },
  ];
}
