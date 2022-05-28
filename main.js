const kbtracker = require("./scripts/kbtracker");
kbtracker.startTracking();

const app = require("./scripts/app");
app.init();

const updater = require("./scripts/updater");
updater.checkForUpdate();

$actions.resolve();