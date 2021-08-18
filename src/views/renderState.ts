import { ComponentState } from "../lib/appState";
import { renderViewingState } from './renderViewingState';

type RenderView = (state: ComponentState) => HTMLElement;

export function render(state: ComponentState): void {
    let renderView: RenderView;
    let rootNode = document.getElementById("root");

    renderView = renderViewingState;

    //No need to import (and maintain) an entire component library and its customs for this small app...
    //All of the states are cleanly defined
    var emptyNode = rootNode.cloneNode(false);
    //Clears the root node
    rootNode.parentNode.replaceChild(emptyNode, rootNode);
    //Appens the child to the root node
    emptyNode.appendChild(renderView(state));
}