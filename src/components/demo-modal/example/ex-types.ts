import { AlertOptions, AppModalProps, LogicType } from '@site0/tijs';

export type DialogItem = {
  title: string;
  brief?: string;
  type: LogicType;
  dialog?: AppModalProps;
  alert?: {
    msg: string;
    options: AlertOptions;
  };
};

export function genDialogItems(
  genSnippet: (position: string, type?: LogicType) => DialogItem
): DialogItem[] {
  return [
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
  ];
}
