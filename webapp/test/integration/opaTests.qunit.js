/* global QUnit */
QUnit.config.autostart = false;

sap.ui.require(["northwinddemo/test/integration/AllJourneys"
], function () {
	QUnit.start();
});
