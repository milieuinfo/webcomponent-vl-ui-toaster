import {NativeVlElement, define} from "/node_modules/vl-ui-core/vl-core.js";

(() => {
  loadScript('util.js',
      '/node_modules/@govflanders/vl-ui-util/dist/js/util.min.js', () => {
        loadScript('core.js',
            '/node_modules/@govflanders/vl-ui-core/dist/js/core.min.js', () => {
              loadScript('vl-toaster.js',
                  '/node_modules/@govflanders/vl-ui-toaster/dist/js/toaster.js');
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

export class VlToaster extends NativeVlElement(HTMLDivElement) {
  constructor() {
    super();
  }

  get _classPrefix() {
    return 'vl-toaster--';
  }

  get _stylePath() {
    return '../style.css';
  }

  _fadeoutChangedCallback(oldValue, newValue) {
    if (newValue ==="" || newValue ===true) {
      this._element.setAttribute('data-vl-toaster-fadeout', true);
    } else {
      this._element.removeAttribute('data-vl-toaster-fadeout', false);
    }
  };

  static get _observedAttributes() {
    return ['fadeout'];
  }

  static get _observedClassAttributes() {
    return ['top-left', 'top-right', 'bottom-left', 'bottom-right']
  }

  connectedCallback(){
    this.classList.add('vl-toaster');
  }

  push(alert) {
    this._element.appendChild(alert);
  }
}

define('vl-toaster', VlToaster, {extends: 'div'});