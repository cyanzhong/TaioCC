const util = require("../../util");

module.exports = {
  header: $font("medium", 15),
  body: $font(util.onMac ? 19 : 17),
}