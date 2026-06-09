import { DroplistProps, FormProps, StrOptionItem } from "@site0/tijs";
import _ from "lodash";
import { DemoPopupProps } from "./demo-popup-types";



export function use_demo_popup_form(props: DemoPopupProps,): FormProps {
  return {
    layoutHint: '<240>',
    fields: [
      {
        title: 'Type',
        name: 'logicType',
        comType: "TiDroplist",
        comConf: {
          placeholder: props.defaultType || 'Select Type',
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
          ])
        } as DroplistProps
      }
    ]
  }
}

function toStrOptionItems(strs: string[]): StrOptionItem[] {
  let re = [] as StrOptionItem[];
  for (let s of strs) {
    re.push({ value: s, text: _.capitalize(s) });
  }
  return re;
}