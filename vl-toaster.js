import{VlElement,define}from"/node_modules/vl-ui-core/vl-core.js";export class VlToaster extends VlElement(HTMLElement){get _classPrefix(){return"vl-toaster--"}static get _observedClassAttributes(){return["top-left","top-right","bottom-left","bottom-right"]}constructor(){super(`
    <style>@import '/node_modules/vl-ui-toaster/style.css';</style>
    <div class="vl-toaster vl-toaster--top-left">
        <slot name="alert"></slot>
    </div>`)}};define("vl-toaster",VlToaster);