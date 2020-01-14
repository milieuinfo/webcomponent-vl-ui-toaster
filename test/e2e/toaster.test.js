
const { assert, driver } = require('vl-ui-core').Test;
const VlToasterPage = require('./pages/vl-toaster.page');

describe('vl-toaster', async () => {
    const vlToasterPage = new VlToasterPage(driver);

    before(() => {
        return vlToasterPage.load();
    });
});
