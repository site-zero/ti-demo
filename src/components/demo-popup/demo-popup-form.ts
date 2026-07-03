import {
  DroplistProps,
  FieldRefer,
  FormProps,
  InputBoxProps,
  Vars,
} from "@site0/tijs";
import _ from "lodash";
import { DemoPopupProps } from "./demo-popup-types";
import { DemoPopupApi } from "./use-demo-popup-api";

export function use_demo_popup_form(
  props: DemoPopupProps,
  api: DemoPopupApi
): FormProps {
  const fields: FieldRefer[] = [
    {
      title: "Type",
      name: "logicType",
      comType: "TiSwitcher",
      comConf: {
        placeholder: props.defaultType || "Select Type",
        options: toStrOptionItems([
          "info",
          "success",
          "warn",
          "danger",
          "track",
          "disable",
          "text",
          "number",
          "primary",
          "secondary",
          "tip",
          "star",
          "fog",
        ]),
      } as DroplistProps,
    },
    {
      title: "Text",
      name: "content",
      comType: "TiInput",
      comConf: {
        trimed: true,
        placeholder: props.defaultContent,
      } as InputBoxProps,
    },
  ];
  if (props.moreFields) {
    fields.push({
      title: "More Fields",
      layoutHint: "<240>",
      bodyPartGap: "s",
      bodyPartFontSize: "s",
      maxFieldNameWidth: 120,
      fields: props.moreFields,
    });
  }
  return {
    layoutHint: 1,
    bodyPartGap: "s",
    data: api.Data.value,
    fields,
  };
}

function toStrOptionItems(strs: string[]): Vars[] {
  let re = [] as Vars[];
  for (let s of strs) {
    re.push({ value: s, text: _.capitalize(s), type: s });
  }
  return re;
}
