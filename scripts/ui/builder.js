const configs = require("../configs");
const util = require("../util");
const colors = require("./constants/colors");
const fonts = require("./constants/fonts");
const symbols = require("./constants/symbols");
const dimens = require("./constants/dimens");

function makeTextBox({ id, menu, actionButton, actionHandler }) {
  return {
    type: "view",
    layout: $layout.fill,
    views: [
      {
        type: "view",
        props: {
          clipsToBounds: true
        },
        layout: make => {
          make.left.top.right.equalTo(0);
          make.height.equalTo(dimens.headerHeight);
        },
        views: [
          {
            type: "button",
            props: {
              bgcolor: colors.clear,
              clipsToBounds: false,
              font: fonts.header,
              titleColor: colors.tint,
              title: configs[menu.selectedIndex].title,
              menu: {
                title: menu.title,
                pullDown: true,
                asPrimary: true,
                items: configs.map((config, index) => {
                  return {
                    title: config.title,
                    handler: sender => {
                      sender.title = configs[index].title;
                      menu.onChange(index);
                    }
                  }
                })
              }
            },
            layout: (make, view) => {
              make.leading.equalTo(dimens.cellPadding);
              make.centerY.equalTo(view.super);
            },
            views: [
              {
                type: "image",
                props: {
                  symbol: symbols.chevron_forward,
                  tintColor: colors.tint
                },
                layout: (make, view) => {
                  make.centerY.equalTo(view.super).offset(util.onMac ? -1 : 0);
                  make.leading.equalTo(view.super.trailing).offset(2);
                }
              }
            ]
          },
          {
            type: "button",
            props: {
              id: actionButton.id,
              bgcolor: colors.clear,
              font: fonts.header,
              tintColor: colors.tint,
              titleColor: colors.tint,
              title: actionButton.title
            },
            layout: (make, view) => {
              make.trailing.equalTo(view.super.trailing).offset(-dimens.cellPadding);
              make.centerY.equalTo(view.super).offset(0);
            },
            events: {
              tapped: actionButton.handler
            }
          },
          {
            type: "view",
            props: {
              bgcolor: colors.separator
            },
            layout: make => {
              make.left.right.bottom.equalTo(0);
              make.height.equalTo(dimens.hairlineHeight);
            }
          }
        ]
      },
      {
        type: "button",
        props: {
          bgcolor: colors.clear
        },
        layout: make => {
          make.top.equalTo(dimens.headerHeight);
          make.left.right.bottom.equalTo(0);
        },
        events: {
          tapped: actionHandler
        },
        views: [
          {
            type: "label",
            props: {
              id,
              lines: 0,
              text: " " // To ensure the automatic height
            },
            layout: make => {
              make.top.bottom.inset(12);
              make.leading.trailing.inset(dimens.cellPadding);
            }
          }
        ]
      }
    ]
  }
}

function makeActionRow({ label, icon }) {
  return {
    type: "view",
    props: {
      selectable: true
    },
    layout: $layout.fill,
    views: [
      {
        type: "label",
        props: {
          text: label
        },
        layout: (make, view) => {
          make.leading.equalTo(dimens.cellPadding);
          make.centerY.equalTo(view.super);
        }
      },
      {
        type: "image",
        props: {
          tintColor: colors.tint,
          symbol: icon
        },
        layout: (make, view) => {
          make.trailing.inset(dimens.cellPadding);
          make.centerY.equalTo(view.super);
          make.size.equalTo(dimens.cellIconSize);
        }
      }
    ]
  }
}

function makeCopyCheckmark(anchor, offset, size = 24) {
  const frame = anchor.frame;
  return $ui.create({
    type: "image",
    props: {
      symbol: symbols.checkmark_circle_fill,
      tintColor: colors.tint,
      frame: $rect(frame.x + (frame.width - size) * 0.5, frame.y + (frame.height - size) * 0.5 + offset, size, size)
    }
  });
}

module.exports = {
  makeTextBox,
  makeActionRow,
  makeCopyCheckmark,
}