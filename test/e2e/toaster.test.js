const { assert, driver } = require('vl-ui-core').Test.Setup;
const VlToasterPage = require('./pages/vl-toaster.page');

describe('vl-toaster', async () => {
    const vlToasterPage = new VlToasterPage(driver);

    before(() => {
        return vlToasterPage.load();
    });

    it("Als gebruiker kan ik alerts in een toaster zien", async () => {
        const toaster = await vlToasterPage.getStandardToaster();
        await assert.eventually.isFalse(toaster.shouldFadeOut());
        await assert.eventually.isFalse(toaster.isLocatedBottomLeft());
        await assert.eventually.isFalse(toaster.isLocatedBottomRight());
        await assert.eventually.isFalse(toaster.isLocatedTopLeft());
        await assert.eventually.isFalse(toaster.isLocatedTopRight());

        const successAlertButton = await vlToasterPage.getStandardToasterSuccessAlertButton();
        const warningAlertButton = await vlToasterPage.getStandardToasterWarningAlertButton();

        await assert.eventually.lengthOf(toaster.getAlerts(), 0);

        await successAlertButton.click();
        await assert.eventually.lengthOf(toaster.getAlerts(), 1);

        await warningAlertButton.click();
        const alerts = await toaster.getAlerts();
        assert.lengthOf(alerts, 2);
        const successAlert = alerts[0];
        await assert.eventually.isTrue(successAlert.isSuccess());
        const warningAlert = alerts[1];
        await assert.eventually.isTrue(warningAlert.isWarning());
    });

    it("Als gebruiker kan ik een toaster in alle hoeken van de pagina zien", async () => {
        const bottomLeftToaster = await vlToasterPage.getBottomLeftToaster();
        await assert.eventually.isTrue(bottomLeftToaster.isLocatedBottomLeft());
        await assert.eventually.isFalse(bottomLeftToaster.isLocatedBottomRight());
        await assert.eventually.isFalse(bottomLeftToaster.isLocatedTopLeft());
        await assert.eventually.isFalse(bottomLeftToaster.isLocatedTopRight());

        const bottomRightToaster = await vlToasterPage.getBottomRightToaster();
        await assert.eventually.isFalse(bottomRightToaster.isLocatedBottomLeft());
        await assert.eventually.isTrue(bottomRightToaster.isLocatedBottomRight());
        await assert.eventually.isFalse(bottomRightToaster.isLocatedTopLeft());
        await assert.eventually.isFalse(bottomRightToaster.isLocatedTopRight());

        const topLeftToaster = await vlToasterPage.getTopLeftToaster();
        await assert.eventually.isFalse(topLeftToaster.isLocatedBottomLeft());
        await assert.eventually.isFalse(topLeftToaster.isLocatedBottomRight());
        await assert.eventually.isTrue(topLeftToaster.isLocatedTopLeft());
        await assert.eventually.isFalse(topLeftToaster.isLocatedTopRight());

        const topRightToaster = await vlToasterPage.getTopRightToaster();
        await assert.eventually.isFalse(topRightToaster.isLocatedBottomLeft());
        await assert.eventually.isFalse(topRightToaster.isLocatedBottomRight());
        await assert.eventually.isFalse(topRightToaster.isLocatedTopLeft());
        await assert.eventually.isTrue(topRightToaster.isLocatedTopRight());
    });

    it("Als gebruiker kan ik zien dat alerts na enkele seconden verdwijnen indien de toaster zo geconfigureerd werd", async () => {
        const toaster = await vlToasterPage.getFadeoutToaster();
        await assert.eventually.isTrue(toaster.shouldFadeOut());

        const successAlertButton = await vlToasterPage.getFadeoutToasterSuccessAlertButton();
        const errorAlertButton = await vlToasterPage.getFadeoutToasterErrorAlertButton();

        await successAlertButton.click();
        await errorAlertButton.click();
        await assert.eventually.lengthOf(toaster.getAlerts(), 2);

        await driver.wait(async () => {
            const alerts = await toaster.getAlerts();
            return alerts.length === 0;
        });
    }).timeout(10000);
});
