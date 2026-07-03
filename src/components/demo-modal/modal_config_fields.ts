import {
  FieldRefer,
  fldInput,
  fldToggle,
  StrOptionItem,
  SwitcherProps,
} from "@site0/tijs";

export function modal_config_fields(): FieldRefer[] {
  const TranSpeedOptions: StrOptionItem[] = [
    { value: "slow", text: "Slow" },
    { value: "normal", text: "Normal" },
    { value: "fast", text: "Fast" },
  ];
  return [
    {
      title: "Trans Speed",
      name: "tranSpeed",
      type: "String",
      comType: "TiSwitcher",
      comConf: {
        defaultItemType: "info",
        options: TranSpeedOptions,
      } as SwitcherProps,
    },
    fldInput("title", "Title", {
      placeholder: "Demo",
    }),
    fldInput("width", "Width", {
      placeholder: "320px",
    }),
    fldInput("height", "Height", {
      placeholder: "240px",
    }),
    { title: "Behaviors", colStart: 1, colSpan: 10 },
    fldToggle("showMask", "Show Mask"),
    fldToggle("showCloser", "Show Closer"),
    fldToggle("escToClose", "Escape"),
    fldToggle("clickMaskToClose", "Click Mask To Close"),
  ];
}
