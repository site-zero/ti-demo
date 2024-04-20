import { LogicType } from '@site0/tijs';
import { Chance } from 'chance';
import _ from 'lodash';
import { DialogItem, genDialogItems } from './ex-types';

// 创建一个 Chance 实例
const chance = new Chance();

export default {
  name: 'confirm',
  text: 'i18n:demo-modal-example-confirm',
  comConf: {
    dialogs: genDialogItems(
      (position: string, type: LogicType = 'info'): DialogItem => {
        let title = _.upperFirst(_.camelCase(position));
        //-----------------------------------------
        let msg =
          position.indexOf('-') > 0
            ? `Show Confirm In Position: ${title}::
              -----------------<This is Text Content>-------------------
              ${chance.paragraph()}`
            : `Show Confirm In Position: ${title}`;
        //-----------------------------------------
        let bodyIcon = {
          'left-top': undefined,
          'top': 'zmdi-amazon',
          'right-top': 'zmdi-speaker',
          'left': 'zmdi-blogger',
          'center': 'zmdi-camera-alt',
          'right': 'zmdi-phone-msg',
          'bottom-left': 'zmdi-bluetooth',
          'bottom': 'zmdi-tv-alt-play',
          'bottom-right': 'zmdi-whatsapp',
          'free': 'zmdi-yahoo',
        }[position];
        //-----------------------------------------
        return {
          title,
          type,
          confirm: {
            msg,
            options: {
              type,
              position,
              showMask: true,
              clickMaskToClose: true,
              bodyIcon
            },
          },
        } as DialogItem;
      }
    ), // dialogs: genDialogItems(
  },
};
