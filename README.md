[💬 English / 中文](https://github.com/cyanzhong/TaioCC/blob/main/README_zh-Hans.md)

## TaioCC

Chinese Converter for [Taio](https://taio.app), based on [opencc-js](https://github.com/nk2028/opencc-js).

<img src="https://github.com/cyanzhong/TaioCC/raw/main/screenshots/IMG_1.PNG" width="360" alt="TaioCC"/>

<img src="https://github.com/cyanzhong/TaioCC/raw/main/screenshots/IMG_2.PNG" width="360" alt="Review Diffs"/>

> Learn more about OpenCC, check [here](https://github.com/BYVoid/OpenCC).

## Main Features

- Convert between Simplified and Traditional Chinese
- Phrase conversion
- Character variant conversion
- Diff view to compare differences
- Copy the result or replace selected text in the editor
- `⌘ C` and `⌘ V` to manipulate clipboard data

## Installation

Check [here](https://actions.taio.app/#/utility?id=taiocc).

## Building Taio Actions

To build Taio [text actions](https://docs.taio.app/#/quick-start/actions) from source, simply run:

```
yarn install && yarn build
```

Generated files are located in the `dist` folder, AirDrop to the device or open the file from Taio to complete the installation.

## Third-party Licenses

- [OpenCC](https://github.com/BYVoid/OpenCC/blob/master/LICENSE)
- [opencc-js](https://github.com/nk2028/opencc-js/blob/main/LICENSE)
- [jsdiff](https://github.com/kpdecker/jsdiff/blob/master/LICENSE)