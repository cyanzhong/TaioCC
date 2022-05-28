const util = require("../../util");

module.exports = {
  zeroInsets: $insets(0, 0, 0, 0),
  smallInsets: $insets(15, 10, 15, 10),
  cellPadding: 15,
  cellIconSize: $size(24, 24),
  headerHeight: 36,
  hairlineHeight: util.onMac ? 0.7 : 1.0 / $device.info.screen.scale,
}