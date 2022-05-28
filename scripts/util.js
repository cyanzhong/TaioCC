const onMac = !$device.info.model.startsWith("iP");
const onTaio = $app.info.bundleID.includes("taio");
const ios15 = parseInt($device.info.version.split(".")[0]) >= 15;

function tapic() {
  const generator = $objc("UINotificationFeedbackGenerator").$new();
  generator.$notificationOccurred(0);
}

function truncate(text) {
  return text.substring(0, 1024);
}

module.exports = {
  onMac,
  onTaio,
  ios15,
  tapic,
  truncate,
}