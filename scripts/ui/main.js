const actions = require("./main+actions");
const builder = require("./builder");
const util = require("../util");
const cache = require("../cache");
const symbols = require("./constants/symbols");
const dimens = require("./constants/dimens");
const strings = require("./constants/strings");
const colors = require("./constants/colors");

const states = {
  sourceText: (() => {
    const text = $editor.selectedText || "";
    if (text.length > 0) {
      return text;
    } else {
      return $clipboard.text || "";
    }
  })(),
  destinationText: "",
  isEmpty: () => states.sourceText.length === 0,
  isAnimating: false,
  selectedRange: $range(0, 0),
  converters: {},
}

const views = {
  mainView: () => $("main-view"),
  sourceText: () => $("source-text"),
  destinationText: () => $("destination-text"),
  copyButton: () => $("copy-button"),
}

const actionTypes = {
  readFromClipboard: 0,
  reviewDifferences: 1,
  replaceWithResult: 2,
}

function render() {
  // In case selection gets changed due to first responder change
  states.selectedRange = $editor.selectedRange;

  const cells = [
    {
      rows: [
        builder.makeTextBox({
          id: "source-text",
          menu: {
            title: strings.source_text,
            selectedIndex: cache.sourceIndex(),
            onChange: index => {
              cache.setSourceIndex(index);
              reloadText();
            }
          },
          actionButton: {
            id: "edit-button",
            title: strings.edit,
            handler: editText
          },
          actionHandler: editText
        })
      ]
    },
    {
      rows: [
        builder.makeTextBox({
          id: "destination-text",
          menu: {
            title: strings.destination_text,
            selectedIndex: cache.destinationIndex(),
            onChange: index => {
              cache.setDestinationIndex(index);
              reloadText();
            }
          },
          actionButton: {
            id: "copy-button",
            title: strings.copy,
            handler: copyText
          },
          actionHandler: copyText
        })
      ]
    },
    {
      rows: [
        builder.makeActionRow({
          label: strings.read_from_clipboard,
          icon: symbols.doc_plaintext
        }),
        builder.makeActionRow({
          label: strings.diff,
          icon: symbols.text_magnifyingglass
        }),
        builder.makeActionRow({
          label: strings.replace_with_result,
          icon: symbols.text_insert
        })
      ]
    }
  ];

  $ui.render({
    props: {
      title: "TaioCC",
      titleColor: util.onTaio ? colors.tint : null,
      navButtons: [
        {
          title: strings.about,
          symbol: symbols.ellipsis,
          handler: () => {
            const about = require("../about");
            about.open();
          }
        }
      ],
      keyCommands: [
        {
          input: "C", // cmd-c to copy to clipboard
          modifiers: 1 << 20,
          title: strings.read_from_clipboard,
          handler: () => copyText()
        },
        {
          input: "V", // cmd-v to read from clipboard
          modifiers: 1 << 20,
          title: strings.read_from_clipboard,
          handler: () => readFromClipboard()
        }
      ]
    },
    views: [
      {
        type: "list",
        props: {
          id: "main-view",
          style: 2,
          autoRowHeight: true,
          separatorInset: dimens.zeroInsets,
          data: cells
        },
        layout: $layout.fill,
        events: {
          didSelect: (_, indexPath) => {
            if (indexPath.section < 2) {
              return;
            }

            switch (indexPath.row) {
              case actionTypes.readFromClipboard: readFromClipboard(); break;
              case actionTypes.reviewDifferences: reviewDifferences(); break;
              case actionTypes.replaceWithResult: replaceWithResult(); break;
              default: break;
            }
          }
        }
      }
    ]
  });

  if (!states.isEmpty()) {
    views.sourceText().text = states.sourceText;
  }

  reloadText();
}

function reloadText() {
  return actions.reloadText(states, views);
}

function editText() {
  return actions.editText(states, views);
}

function copyText() {
  return actions.copyText(states, views);
}

function readFromClipboard() {
  return actions.readFromClipboard(states, views);
}

function reviewDifferences() {
  return actions.reviewDifferences(states, views);
}

function replaceWithResult() {
  return actions.replaceWithResult(states, views);
}

module.exports = {
  render
}