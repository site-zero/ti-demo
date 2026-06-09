import { tiPutComponents } from "@site0/tijs";
import { DemoModalInfo } from "./demo-modal/demo-modal-index";
import { DemoPopupInfo } from "./demo-popup/demo-popup-index";
import { DemoTipsInfo } from "./demo-tips/demo-tips-index";
import { DemoToastInfo } from "./demo-toast/demo-toast-index";

export function install_demo_components() {
    tiPutComponents({
        DemoModal: DemoModalInfo,
        DemoTips: DemoTipsInfo,
        DemoToast: DemoToastInfo,
        DemoPopup: DemoPopupInfo
    })
}

export * from "./demo-modal/demo-modal-index";
export * from "./demo-popup/demo-popup-index";
export * from "./demo-tips/demo-tips-index";
export * from "./demo-toast/demo-toast-index";
