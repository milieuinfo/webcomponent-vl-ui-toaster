const VlToaster = require('../components/vl-toaster');
const {VlButton} = require('vl-ui-button').Test;
const {Page} = require('vl-ui-core').Test;
const {Config} = require('vl-ui-core').Test;

class VlToasterPage extends Page {
  async _getToaster(selector) {
    return new VlToaster(this.driver, selector);
  }

  async _getButton(selector) {
    return new VlButton(this.driver, selector);
  }

  async load() {
    await super.load(`${Config.baseUrl}/demo/vl-toaster.html`);
  }

  async getStandardToaster() {
    return this._getToaster('#demo-toaster');
  }

  async getTopLeftToaster() {
    return this._getToaster('#top-left-toaster');
  }

  async getTopRightToaster() {
    return this._getToaster('#top-right-toaster');
  }

  async getBottomLeftToaster() {
    return this._getToaster('#bottom-left-toaster');
  }

  async getBottomRightToaster() {
    return this._getToaster('#bottom-right-toaster');
  }

  async getFadeoutToaster() {
    return this._getToaster('#fadeout-toaster');
  }

  async getStandardToasterSuccessAlertButton() {
    return this._getButton('#demo-toaster-success-alert-button');
  }

  async getStandardToasterWarningAlertButton() {
    return this._getButton('#demo-toaster-warning-alert-button');
  }

  async getFadeoutToasterSuccessAlertButton() {
    return this._getButton('#fadeout-toaster-success-alert-button');
  }

  async getFadeoutToasterErrorAlertButton() {
    return this._getButton('#fadeout-toaster-error-alert-button');
  }
}

module.exports = VlToasterPage;
