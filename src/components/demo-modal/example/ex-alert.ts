import { LogicType } from '@site0/tijs';
import _ from 'lodash';
import { DialogItem, genDialogItems } from './ex-types';

export default {
  name: 'alert',
  text: 'i18n:demo-modal-example-alert',
  comConf: {
    dialogs: genDialogItems(
      (position: string, type: LogicType = 'info'): DialogItem => {
        let title = _.upperFirst(_.camelCase(position));
        return {
          title,
          alert: {
            msg: `Show Alert
            --------------------- 
            ${title}
            ---------------------
            `,
            options: {
              type,
              showMask: true,
              clickMaskToClose: true,
              iconOk: 'zmdi-windows',
            },
          },
        } as DialogItem;
      }
    ), // dialogs: genDialogItems(
  },
};
