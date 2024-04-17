import { AppModalProps, Vars } from '@site0/tijs';
import { DialogItem } from './ex-types';
import _ from 'lodash';

function genSnippet(position: string, type = 'info'): DialogItem {
  let title = _.upperFirst(_.camelCase(position));
  return {
    title,
    dialog: {
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

export default {
  name: 'simple',
  text: 'i18n:simple',
  comConf: {
    dialogs: [
      genSnippet('left-top', 'info'),
      genSnippet('top', 'success'),
      genSnippet('right-top', 'warn'),
      genSnippet('left', 'error'),
      genSnippet('center'),
      genSnippet('right'),
      genSnippet('bottom-left'),
      genSnippet('bottom'),
      genSnippet('bottom-right'),
      genSnippet('free'),
    ],
  },
};
