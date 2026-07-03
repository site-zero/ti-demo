import { FieldRefer, StrOptionItem, SwitcherProps } from "@site0/tijs";

export function toast_config_fields(): FieldRefer[] {
  const AspectSizeOptions: StrOptionItem[] = [
    { value: "t", text: "T", tip: "Tiny" },
    { value: "s", text: "S", tip: "Small" },
    { value: "m", text: "M", tip: "Middle" },
    { value: "b", text: "B", tip: "Big" },
    { value: "h", text: "H", tip: "Huge" },
  ];
  return [
    {
      title: "Reverse Color",
      name: "reverseColor",
      type: "Boolean",
      comType: "TiToggle",
    },
    {
      title: "Font Size",
      name: "boxFontSize",
      type: "String",
      comType: "TiSwitcher",
      comConf: {
        defaultItemType: "danger",
        options: AspectSizeOptions,
      } as SwitcherProps,
    },
    {
      title: "Box Padding",
      name: "boxPadding",
      type: "String",
      comType: "TiSwitcher",
      comConf: {
        defaultItemType: "success",
        options: AspectSizeOptions,
      } as SwitcherProps,
    },
    {
      title: "Box Radius",
      name: "boxRadius",
      type: "String",
      comType: "TiSwitcher",
      comConf: {
        defaultItemType: "primary",
        options: AspectSizeOptions,
      } as SwitcherProps,
    },
  ];
}
