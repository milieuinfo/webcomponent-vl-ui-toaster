const { VlElement } = require('vl-ui-core').Test;
const { By } = require('vl-ui-core').Test.Setup;

class VlToaster extends VlElement {
    async shouldFadeOut() {
        return this.hasAttribute('fadeout');
    }

    async isLocatedTopLeft() {
        return this.hasAttribute('top-left');
    }

    async isLocatedTopRight() {
        return this.hasAttribute('top-right');
    }

    async isLocatedBottomLeft() {
        return this.hasAttribute('bottom-left');
    }

    async isLocatedBottomRight() {
        return this.hasAttribute('bottom-right');
    }

    async getAlerts() {
        const children = await this.findElements(By.css('vl-alert'));
        if (children.length > 0) {
            const { VlAlert } = require('vl-ui-alert').Test;
            return Promise.all(children.map(child => new VlAlert(this.driver, child)));
        } else {
            return [];
        }
    }
}


module.exports = VlToaster;
