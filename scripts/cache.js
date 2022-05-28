const strings = require("./ui/constants/strings");

const keys = {
  source: "source-index",
  destination: "destination-index",
}

function sourceIndex() {
  const index = $cache.get(keys.source);
  if (typeof index === "undefined") {
    return parseInt(strings.default_source_index);
  } else {
    return index;
  }
}

function setSourceIndex(index) {
  $cache.set(keys.source, index);
}

function destinationIndex() {
  const index = $cache.get(keys.destination);
  if (typeof index === "undefined") {
    return parseInt(strings.default_destination_index);
  } else {
    return index;
  }
}

function setDestinationIndex(index) {
  $cache.set(keys.destination, index);
}

module.exports = {
  sourceIndex,
  setSourceIndex,
  destinationIndex,
  setDestinationIndex,
}