import {nativeVlElement, define} from '/node_modules/vl-ui-core/dist/vl-core.js';
import '/node_modules/@govflanders/vl-ui-util/dist/js/util.js';
import '/node_modules/@govflanders/vl-ui-core/dist/js/core.js';
import '/node_modules/vl-ui-toaster/lib/toaster.js';

/**
 * VlToaster
 * @class
 * @classdesc De toaster component is een container voor een aantal gestapelde alerts.
 *
 * @extends HTMLDivElement
 * @mixes nativeVlElement
 *
 * @property {string} data-vl-top-left - Positioneert de toaster op linkerbovenhoek.
 * @property {string} data-vl-top-right - Positioneert de toaster op rechterbovenhoek.
 * @property {string} data-vl-bottom-left - Positioneert de toaster op linkeronderhoek.
 * @property {string} data-vl-bottom-right - Posistioneert de toaster op rechteronderhoek.
 * @property {string} data-vl-fadeout - Elke alert verdwijnt automatisch 5 seconden na openen.
 *
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-toaster/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-toaster/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-toaster.html|Demo}
 */
export class VlToaster extends nativeVlElement(HTMLDivElement) {
  static get _observedAttributes() {
    return ['fadeout'];
  }

  static get _observedClassAttributes() {
    return ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
  }

  static get _dressedAttributeName() {
    return 'data-vl-toaster-dressed';
  }

  connectedCallback() {
    this.classList.add('vl-toaster');
    this._dress();
  }

  get _classPrefix() {
    return 'vl-toaster--';
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
   * @param {HTMLElement} alert
   */
  push(alert) {
    setTimeout(() => {
      this._element.appendChild(alert);
    });
  }

  /**
   *
   * Verwijdert een alert uit hun parent
   * @return {void}
   * @param {HTMLElement} alert
   */
  closeAlert(alert) {
    vl.util.addClass(alert, this.toasterFadeClass);
    window.setTimeout(function() {
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
    if (!this._dressed) {
      vl.toaster.dress(this);
    }
  }
}

define('vl-toaster', VlToaster, {extends: 'div'});
