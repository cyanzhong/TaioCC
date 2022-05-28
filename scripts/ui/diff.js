const colors = require("./constants/colors");
const fonts = require("./constants/fonts");
const dimens = require("./constants/dimens");
const strings = require("./constants/strings");

function render(diffs) {
  const { text, styles } = diffs.reduce((results, item) => {
    const text = item.value;
    const range = $range(results.location, text.length);
    const style = (() => {
      if (item.added) {
        return {
          range,
          color: colors.insertedText,
          bgcolor: colors.insertedBackground
        }
      } else if (item.removed) {
        return {
          range,
          color: colors.deletedText,
          bgcolor: colors.deletedBackground
        }
      } else {
        return null;
      }
    })();

    return {
      text: results.text + text,
      location: results.location + text.length,
      styles: [...results.styles, ...style ? [style] : []]
    }
  }, { text: "", location: 0, styles: [] });

  $ui.push({
    props: {
      title: strings.diff
    },
    views: [
      {
        type: "text",
        props: {
          editable: false,
          selectable: false,
          textContainerInset: dimens.smallInsets,
          styledText: {
            text,
            styles,
            font: fonts.body,
            color: colors.label,
            markdown: false,
          }
        },
        layout: (make, view) => {
          make.top.bottom.equalTo(0);
          make.left.equalTo(view.super.safeAreaLeft);
          make.right.equalTo(view.super.safeAreaRight);
        }
      }
    ]
  });
}

module.exports = {
  render
}