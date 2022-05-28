const util = require("../../util");

module.exports = {
  chevron_forward: "chevron.forward",
  doc_plaintext: "doc.plaintext",
  text_magnifyingglass: "text.magnifyingglass",
  text_insert: "text.insert",
  checkmark_bubble: util.ios15 ? "checkmark.bubble" : "bubble",
  checkmark_circle_fill: "checkmark.circle.fill",
  ellipsis: "ellipsis",
}