import { AppModalProps, AppModelApi, ProcessProps } from '@site0/tijs';
import { DialogItem } from './ex-types';

export default {
  name: 'process',
  text: 'i18n:demo-modal-example-process',
  comConf: {
    dialogs: [
      {
        title: 'Process Normal',
        type: 'primary',
        dialog: {
          icon: 'zmdi-notifications',
          title: 'Process Normal Dialog',
          type: 'primary',
          position: 'center',
          showMask: true,
          clickMaskToClose: true,
          width: '600px',
          height: '90%',
          comType: 'TiProcess',
          comConf: {
            className: 'cover-parent',
            title: 'Demo Processing',
            progress: {
              value: 0,
            },
            logs: [],
          } as ProcessProps,
          //watchDeep: true,
          appear: (api: AppModelApi) => {
            let comConf = api.getComConf();
            let { progress, logs } = comConf.value;
            let n = 0;
            let intervalId = setInterval(() => {
              // 超过 100% 结束
              if (n > 1) {
                clearInterval(intervalId);
                return;
              }
              n += 0.02;
              let msg = `Timestamp: ${new Date().toISOString()}`;
              logs.push(msg);
              // console.log(msg);
              progress.value = n;
            }, 100);

            // 确保关闭这计时器
            api.onClose(() => {
              clearInterval(intervalId);
            });
          },
        } as AppModalProps,
      },
    ] as DialogItem[],
  },
};
