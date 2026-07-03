import { LogicType, PopItemProps } from "@site0/tijs";

export type DemoModalEmitter = {
  (event: "change", payload: any): void;
};

export type DemoModalProps = {
  handler: (payload: DemoModalPayload) => Promise<void>;
};

export type DemoModalPayload = PopItemProps & {
  type?: LogicType;
  title: string;
  content: string;
  contentType?: "text" | "html";
};
