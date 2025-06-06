import { CommonProps } from "@site0/tijs";

export type LeafletMapEmitter = {
  (event: "change", payload: any): void;
};

export type LeafletMapProps = CommonProps & {
  // 这里可以添加地图控件特有的属性
  zoom?: number;
  center?: [number, number];
};