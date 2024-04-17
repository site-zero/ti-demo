import { AppModalProps, Vars } from '@site0/tijs';
import { DialogItem } from './ex-types';
import _ from 'lodash';

function genSnippet(position: string): DialogItem {
  let title = _.upperFirst(_.camelCase(position));
  return {
    title,
    dialog: {
      title: `${title} Dialog`,
      position,
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
      genSnippet('left-top'),
      genSnippet('top'),
      genSnippet('right-top'),
      genSnippet('left'),
      genSnippet('center'),
      genSnippet('right'),
      genSnippet('bottom-left'),
      genSnippet('bottom'),
      genSnippet('bottom-right'),
      genSnippet('free'),
    ],
  },
};
