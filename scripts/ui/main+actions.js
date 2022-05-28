const opencc = require("../libs/opencc");
const builder = require("./builder");
const util = require("../util");
const configs = require("../configs");
const cache = require("../cache");
const strings = require("./constants/strings");

function reloadText(states, views) {
  const sourceText = (() => {
    const text = states.sourceText;
    if (text.length > 0) {
      return text;
    } else {
      return strings.empty_text;
    }
  })();

  const alpha = states.isEmpty() ? 0.4 : 1.0;
  views.sourceText().alpha = alpha;
  views.destinationText().alpha = alpha;

  const from = configs[cache.sourceIndex()].code;
  const to = configs[cache.destinationIndex()].code;
  const key = `${from}-${to}`;

  const convert = (() => {
    const cached = states.converters[key];
    if (cached) {
      return cached;
    }
    const converter = opencc.Converter({ from, to });
    states.converters[key] = converter;
    return converter;
  })();

  states.destinationText = states.isEmpty() ? "" : convert(sourceText);
  views.sourceText().text = util.truncate(sourceText);
  views.destinationText().text = states.isEmpty() ? convert(strings.empty_text) : util.truncate(states.destinationText);
  views.mainView().reload();
}

function editText(states, views) {
  const editor = require("./editor");
  editor.render(states.sourceText, newText => {
    states.sourceText = newText;
    reloadText(states, views);
  });
}

function copyText(states, views) {
  util.tapic();
  $clipboard.text = states.destinationText;
  if (states.isAnimating) {
    return;
  }

  const offset = 32;
  const button = views.copyButton();
  const checkmark = builder.makeCopyCheckmark(button, offset);
  button.super.add(checkmark);

  const frame = checkmark.frame;
  const moveTo = (delay, offset, completion) => {
    button.updateLayout((make, view) => {
      make.centerY.equalTo(view.super).offset(-offset);
    });

    $ui.animate({
      delay, duration: 0.45, damping: 0.6, velocity: 0.2,
      animation: () => {
        button.relayout();
        checkmark.frame = (() => {
          const rect = { ...frame };
          rect.y -= offset;
          return rect;
        })();
      },
      completion
    });
  }

  states.isAnimating = true;
  moveTo(0, offset, () => {
    moveTo(1, 0, () => states.isAnimating = false);
  });
}

function readFromClipboard(states, views) {
  util.tapic();
  states.sourceText = $clipboard.text || "";
  reloadText(states, views);
}

function reviewDifferences(states, views) {
  const jsdiff = require("../libs/jsdiff");
  const diffView = require("./diff");
  const differences = jsdiff.diffChars(states.sourceText, states.destinationText);
  diffView.render(differences);
}

function replaceWithResult(states, views) {
  util.tapic();
  $editor.selectedRange = states.selectedRange;
  $editor.selectedText = states.destinationText;
  $app.close();
}

module.exports = {
  reloadText,
  editText,
  copyText,
  readFromClipboard,
  reviewDifferences,
  replaceWithResult,
}