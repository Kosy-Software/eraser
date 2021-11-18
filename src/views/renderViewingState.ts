import { ComponentState } from "../lib/appState";
export function renderViewingState(state: ComponentState): HTMLElement {
    let viewingRoot = document.querySelector("#viewing") as HTMLTemplateElement;
    let viewingElement = viewingRoot.content.firstElementChild.cloneNode(true) as HTMLElement;
    let iframe = viewingElement.querySelector("iframe") as HTMLIFrameElement;
    iframe.style.height = "100vh";
    iframe.style.width = "100vw";
    iframe.src = `https://app.tryeraser.com/integration/kosy-office/${state.eraserName}?layout=${state.layoutName}`;

    return viewingElement;
}