import {
  CommonProps,
  FieldRefer,
  LogicType,
  PopPosition,
  Vars,
} from "@site0/tijs";

export type DemoPopupEmitter = {
  (event: "change", payload: any): void;
};

export type DemoPopupProps = CommonProps & {
  keepName?: string;
  title?: string;
  defaultType?: LogicType;
  defaultContent?: string;
  handler?: DemoPopupHandler;
  moreFields?: FieldRefer[];
};

export type DemoPopupPayload = {
  pos: PopPosition;
  logicType?: LogicType;
  more: Vars;
};

export type DemoPopupHandler = (payload: DemoPopupPayload) => void;
