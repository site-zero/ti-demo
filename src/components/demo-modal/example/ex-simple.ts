import { AppModalProps, LogicType, Vars } from '@site0/tijs';
import _ from 'lodash';
import { DialogItem, genDialogItems } from './ex-types';

export default {
  name: 'simple',
  text: 'i18n:simple',
  comConf: {
    dialogs: genDialogItems(
      (position: string, type: LogicType = 'info'): DialogItem => {
        let title = _.upperFirst(_.camelCase(position));
        return {
          title,
          dialog: {
            icon: 'zmdi-notifications',
            title: `${title} Dialog`,
            type,
            position,
            showMask: true,
            clickMaskToClose: true,
            iconOk: 'zmdi-windows',
            result: `[${type}]:${position}`,
            comType: 'TiHtmlSnippet',
            comConf: {
              content: `<strong>Hello</strong>: <em style='color:red'>${position}</em>`,
            } as Vars,
          } as AppModalProps,
        } as DialogItem;
      }
    ), // dialogs: genDialogItems(
  },
};
