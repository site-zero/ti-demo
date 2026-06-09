import { CommonProps, LogicType, PopPosition } from "@site0/tijs";

export type DemoPopupEmitter = {
  (event: "change", payload: any): void;
};

export type DemoPopupProps = CommonProps & {
  keepName?: string;
  title?: string;
  defaultType?: LogicType;
  handler?: DemoPopupHandler;
};

export type DemoPopupPayload = {
  pos: PopPosition;
  logicType: LogicType | null;
}

export type DemoPopupHandler = (payload: DemoPopupPayload) => void;