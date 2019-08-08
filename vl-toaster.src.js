import {NativeVlElement, define} from "/node_modules/vl-ui-core/vl-core.js";
(() => {
  loadScript('util.js',
      '/node_modules/@govflanders/vl-ui-util/dist/js/util.min.js', () => {
        loadScript('core.js',
            '/node_modules/@govflanders/vl-ui-core/dist/js/core.min.js', () => {
              loadScript('vl-toaster.js',
                  '../dist/toaster.js');
            });
      });

  function loadScript(id, src, onload) {
    if (!document.head.querySelector('#' + id)) {
      let script = document.createElement('script');
      script.setAttribute('id', id);
      script.setAttribute('src', src);
      script.onload = onload;
      document.head.appendChild(script);
    }
  }
})();

/**
 * VlToaster
 * @class
 * @classdesc De toaster component is een container voor een aantal gestapelde alerts.
 *
 * @Extends VlElement
 *
 * @property {string} top-left - Positioneert de toaster op linkerbovenhoek.
 * @property {string} top-right - Positioneert de toaster op rechterbovenhoek.
 * @property {string} bottom-left - Positioneert de toaster op linkeronderhoek.
 * @property {string} bottom-right - Posistioneert de toaster op rechteronderhoek.
 * @property {string} fadeout - Elke alert verdwijnt automatisch 5 seconden na openen.
 */
export class VlToaster extends NativeVlElement(HTMLDivElement) {
  static get _observedAttributes() {
    return ['fadeout'];
  }

  static get _observedClassAttributes() {
    return ['top-left', 'top-right', 'bottom-left', 'bottom-right']
  }

  static get _dressedAttributeName() {
    return 'data-vl-toaster-dressed';
  }

  connectedCallback(){
    this.classList.add('vl-toaster');
    this._dress();
  }

  get _classPrefix() {
    return 'vl-toaster--';
  }

  get _stylePath() {
    return '../style.css';
  }

  get toasterFadeClass() {
    return 'vl-alert--fade-out';
  }

  get _dressed() {
    return !!this.getAttribute(VlToaster._dressedAttributeName);
  }

  /**
   *
   * Toont een alert
   *
   * @return {void}
   * @param alert
   */
  push(alert) {
    alert.querySelector("vl-alert").setAttribute("size","small");
    this._element.appendChild(alert);
    alert.disableClosable();
  }

  /**
   *
   * Verwijdert een alert uit hun parent
   * @return {void}
   * @param alert
   */
  closeAlert(alert){
      vl.util.addClass(alert, this.toasterFadeClass);
      window.setTimeout(function () {
        alert.remove();
      }, 300);
  }

  _fadeoutChangedCallback(oldValue, newValue) {
    if (newValue !=undefined) {
      this._element.setAttribute('data-vl-toaster-fadeout', true);
    } else {
      this._element.removeAttribute('data-vl-toaster-fadeout');
    }
  };

  _dress() {
    (async () => {
      while(!window.vl || !window.vl.toaster) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      if (!this._dressed) {
        vl.toaster._dress(this);
      }
    })();
  }
}

define('vl-toaster', VlToaster, {extends: 'div'});