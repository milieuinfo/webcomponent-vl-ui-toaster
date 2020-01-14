const VlToaster = require('../components/vl-toaster');
const { Page } = require('vl-ui-core');
const { Config } = require('vl-ui-core');

class VlToasterPage extends Page {
    async _getToaster(selector) {
        return new VlToaster(this.driver, selector);
    }

    async load() {
        await super.load(Config.baseUrl + '/demo/vl-toaster.html');
    }
}

module.exports = VlToasterPage;
