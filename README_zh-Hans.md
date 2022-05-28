## TaioCC

为 [Taio](https://taio.app) 设计的繁简转换工具，基于 [opencc-js](https://github.com/nk2028/opencc-js) 项目。

<img src="https://github.com/cyanzhong/TaioCC/raw/main/screenshots/IMG_1.PNG" width="360" alt="TaioCC"/>

<img src="https://github.com/cyanzhong/TaioCC/raw/main/screenshots/IMG_2.PNG" width="360" alt="对比差异"/>

> 了解更多关于 OpenCC 的信息，请查看[这里](https://github.com/BYVoid/OpenCC)。

## 主要特性

- 简体和繁体转换
- 习惯用语转换
- 变体转换
- 差异对比视图
- 复制结果或替换编辑器中选中的文本
- 通过 `⌘ C` 和 `⌘ V` 来操作剪贴板数据

## 安装

请查看[这里](https://actions.taio.app/#/cn/utility?id=taiocc)。

## 构建 Taio 动作

从源码构建 Taio [文本动作](https://docs.taio.app/#/cn/quick-start/actions)，只需运行：

```
yarn install && yarn build
```

生成的文件位于 `dist` 目录中，AirDrop 到设备或从 Taio 打开文件来完成安装。

## 第三方开源协议

- [OpenCC](https://github.com/BYVoid/OpenCC/blob/master/LICENSE)
- [opencc-js](https://github.com/nk2028/opencc-js/blob/main/LICENSE)
- [jsdiff](https://github.com/kpdecker/jsdiff/blob/master/LICENSE)