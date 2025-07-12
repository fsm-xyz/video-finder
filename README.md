# video finder

根据特定网站的规则查找到对应的video url, 发送到下载服务

## 特性

+ 只针对目标网站, 高效
+ 发送后台下载服务

支持本地和远程下载服务

## 支持

+ v.aikanbot.com + m3u8

## 理想

这个世界不能任由资本定规则, 没有财富的人也应该有自由免费获取资源的机会

仅供学习研究

## 使用

1. chrome浏览器输入`chrome://extensions/`
2. 开启右上角的`Developer mode`
3. 左侧`Load unpacked`上传这个文件夹即可
4. 点击本扩展就会弹出找到的地址, 可以点击发送到下载服务进行下载
5. scripts下添加对应网的js脚本
6. 自定义下载服务参考go语言实现的video downloader

## todo

+ 优化跨域逻辑, 目前下载地址写死在了manifest.json里面了
+ 解析规则更通用
+ 上传谷歌扩展商店
