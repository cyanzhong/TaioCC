const dimens = require("./constants/dimens");
const colors = require("./constants/colors");
const fonts = require("./constants/fonts");
const strings = require("./constants/strings");
const symbols = require("./constants/symbols");

const states = {
  bottomInset: 0,
  delayedUpdate: null
}

const views = {
  editor: () => $("editor")
}

$app.listen({
  keyboardHeightChanged: height => {
    states.bottomInset = height;
    adjustTextInsets();
  }
});

function render(text, onChange) {
  $ui.push({
    props: {
      title: strings.source_text,
      navButtons: [
        {
          title: strings.convert,
          symbol: symbols.checkmark_bubble,
          handler: () => {
            onChange(views.editor().text);
            $ui.pop();
          }
        }
      ]
    },
    views: [
      {
        type: "text",
        props: {
          id: "editor",
          text,
          font: fonts.body,
          tintColor: colors.tint
        },
        layout: (make, view) => {
          make.top.bottom.equalTo(0);
          make.left.equalTo(view.super.safeAreaLeft);
          make.right.equalTo(view.super.safeAreaRight);
        },
        events: {
          ready: async(sender) => {
            adjustTextInsets();
            await $wait(0.5);
            sender.focus();
          },
          changed: sender => {
            if (states.delayedUpdate) {
              states.delayedUpdate.cancel();
            }
            states.delayedUpdate = $delay(0.3, () => onChange(sender.text));
          }
        }
      }
    ]
  });
}

function adjustTextInsets() {
  if (!views.editor()) {
    return;
  }

  const editor = views.editor().ocValue();
  const insets = dimens.smallInsets;
  const bottom = Math.max(insets.bottom, states.bottomInset);

  editor.$setTextContainerInset({
    left: insets.left,
    right: insets.right,
    top: insets.top,
    bottom: bottom
  });

  editor.$setScrollIndicatorInsets({
    left: 0,
    right: 0,
    top: 0,
    bottom: bottom
  });
}

module.exports = {
  render
}