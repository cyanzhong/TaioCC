const util = require("./util");
const updater = require("./updater");
const strings = require("./ui/constants/strings");

async function open() {
  $prefs.edit({
    "title": strings.about,
    "insetGrouped": true,
    "groups": [
      {
        "items": [
          {
            "title": "README",
            "type": "script",
            "value": `$ui.push({
              props: {
                title: "README"
              },
              views: [
                {
                  type: "markdown",
                  props: {
                    content: (() => {
                      const fileName = $l10n("README_FILE");
                      if (typeof __TAIOCC_README__ === "object") {
                        return __TAIOCC_README__[fileName];
                      } else {
                        return $file.read(fileName).string;
                      }
                    })()
                  },
                  layout: $layout.fill
                }
              ]
            })`
          },
          {
            "title": $l10n("SOURCE_CODE"),
            "type": "link",
            "value": "https://github.com/cyanzhong/TaioCC"
          }
        ]
      },
      {
        "items": [
          {
            "title": strings.current_version,
            "type": "info",
            "value": updater.currentVersion()
          },
          {
            "title": strings.get_latest_version,
            "type": "script",
            "value": (() => {
              if (util.onTaio) {
                return `$app.openURL("taio://actions?action=import&url=${encodeURIComponent(strings.taio_update_url)}");`;
              } else {
                return `$app.openURL("jsbox://import?url=${encodeURIComponent('https://github.com/cyanzhong/TaioCC/raw/main/dist/taiocc.zip')}&name=${encodeURIComponent($addin.current.name)}");`;
              }
            })() + "\n\n$app.close();"
          }
        ]
      }
    ]
  });
}

module.exports = {
  open
}