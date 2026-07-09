<p align="center">
  <img src="https://img.shields.io/badge/纯手搓-HTML%20%2B%20CSS%20%2B%20JS-e53935?style=for-the-badge&logo=html5&logoColor=white" />
  <img src="https://img.shields.io/badge/框架-Vue%203-4FC08D?style=for-the-badge&logo=vuedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/字体-VT323-orange?style=for-the-badge&logo=googlefonts&logoColor=white" />
  <img src="https://img.shields.io/badge/零依赖-纯原生动画-000?style=for-the-badge" />
</p>

<h1 align="center">🔴 LuHe / 鹿禾 · 个人主页</h1>

<p align="center">
  一个 <b>单文件</b> 全栈个人主页 — 像素字体 · 暗黑红调 · Canvas 粒子 · 毛玻璃 UI · Vue 3 动态路由
</p>

<p align="center">
  <b>🇨🇳 中文教学向 · 欢迎 Star / Fork / 下载学习二创</b>
</p>

---

## 🖼️ 预览

<!-- 替换为你自己的截图链接 -->
<!-- ![预览截图](preview.png) -->

> 黑红暗色调 · 双图融合背景 · Canvas 粒子连线 · VT323 像素字体 · 毛玻璃欢迎弹窗 → Vue 3 全屏内容区

---

## 🧱 技术栈

| 层级 | 技术 | 说明 |
|---|---|---|
| **结构** | HTML5 | 纯手写，无脚手架 |
| **样式** | CSS3 | 原生 CSS，CSS 变量主题系统，毛玻璃 `backdrop-filter` |
| **动效** | Canvas API | 80 个粒子的连线动画 + 鼠标排斥交互 |
| **交互** | Vanilla JS | IntersectionObserver 滚动动画、音频控制、键盘快捷键 |
| **框架** | Vue 3 (CDN) | 全屏内容区：动态路由、标签页切换、响应式数据渲染 |
| **字体** | VT323 (Google Fonts) | 像素终端风格，全局统一 |

> **零构建、零打包、零 npm。** 一个 HTML 文件 + 几张图片，拖进浏览器就跑。

---

## 🎯 适合谁看

| 如果你… | 你能学到… |
|---|---|
| 🎓 是前端新手 | CSS 变量主题系统怎么搭、毛玻璃怎么写、响应式怎么处理 |
| 🎨 想做个个人主页 | 从布局到动效的完整思路，拿来就改，换上自己的信息就是你的主页 |
| 🧪 对 Canvas 好奇 | 粒子生成、连线算法、鼠标斥力交互——从 0 到 1 手写 |
| 🔧 想学 Vue 3 | 零配置的 CDN 引入方式，`data / computed / methods / watch` 实战用法 |
| 🎮 喜欢像素/终端风格 | VT323 字体 + 暗红配色 + `SCENCE 01` 状态栏——复古未来主义的氛围设计 |
| 📖 想教学/做分享 | 代码注释清晰，结构分层明确，适合作为教学案例拆解 |

---

## 🗺️ 文件结构

```
LuHeJ/
├── index.html      ← 🏠 整个应用，2500+ 行，注释分区明确
├── g1.jpg          ← 左背景图（人物/场景）
├── g2.jpg          ← 右背景图（人物/场景）
├── g3.jpg          ← Vue 覆盖层背景图
├── BGM1.mp3        ← 背景音乐（可选，不传也能跑）
└── README.md       ← 📖 你正在看的这个
```

---

## 🧩 架构拆解

```
┌─────────────────────────────────────────────────┐
│  index.html                                     │
│                                                 │
│  🎨 <style> — CSS 主题系统                       │
│     ├── :root { --red-dark, --glass-bg ... }    │
│     ├── 双图融合背景 (clip-path 斜切拼接)          │
│     ├── Canvas 粒子层                             │
│     ├── 网格背景 + 暗角遮罩                        │
│     ├── 毛玻璃欢迎弹窗                             │
│     ├── 各个 UI 组件 (logo / 音乐条 / 信息卡 / …)  │
│     ├── Vue 全屏覆盖层 (侧边栏 + 内容区)            │
│     └── 响应式 @media (768px / 480px)             │
│                                                 │
│  🧩 <body> — HTML 结构                           │
│     ├── <canvas> 粒子画布                         │
│     ├── 左上 Logo                                │
│     ├── 右上 音乐控制器                            │
│     ├── 左下 欢迎区 + 进入按钮                      │
│     ├── 右下 个人信息卡                             │
│     ├── 底部 状态栏                               │
│     ├── 毛玻璃 欢迎弹窗                             │
│     └── <div id="vue-app"> Vue 挂载点             │
│         ├── 侧边栏：关于我 / 技能 / 联系 / 简历      │
│         └── 内容区：v-if 条件渲染 4 个面板           │
│                                                 │
│  ⚡ <script> — 核心逻辑                           │
│     ├── Particle 类 (生成 / 更新 / 绘制 / 连线)      │
│     ├── 音频播放控制 (播放 / 暂停 / 音量 / 动画)     │
│     ├── 欢迎弹窗动画时序                           │
│     ├── IntersectionObserver 滚动动画              │
│     ├── 键盘快捷键 (方向键 / 空格 / Esc)            │
│     └── Vue.createApp 全屏内容应用                  │
│         ├── data: tabs / skillGroups / contacts  │
│         ├── computed: totalSkillCount            │
│         ├── methods: show / hide / goToTab       │
│         └── watch: currentTab → updateStatusBar  │
└─────────────────────────────────────────────────┘
```

---

## 🔑 关键技术点

### 1. CSS 变量主题系统

```css
:root {
    --bg-deep: #0a0505;          /* 最深背景 */
    --red-bright: #c84040;       /* 主红色 */
    --glass-bg: rgba(25,8,8,0.6); /* 毛玻璃底色 */
    --transition-smooth: 0.35s cubic-bezier(0.4,0,0.2,1);
}
```
换一套 `:root` 变量 = 换一套皮肤。想做蓝调/紫调/绿调主题？改这里的颜色值就行。

### 2. Canvas 粒子系统

```js
class Particle {
    reset() { /* 随机位置、速度、透明度、色相 */ }
    update() { /* 边界反弹 + 透明度呼吸 */ }
    draw()   { /* 两层圆：实心核心 + 光晕外层 */ }
}
// 80 个粒子，距离 < 150px 自动连线
// 鼠标靠近 120px 内产生斥力
```

### 3. 毛玻璃弹窗 + 内容从右侧滑入

欢迎弹窗（模糊背景 → 清晰）和主内容（`translateX(130px)` → 0）的双重转场。`cubic-bezier(0.22, 0.61, 0.36, 1)` 自定义缓出曲线，比 `ease` 更有弹性。

### 4. Vue 3 CDN 零配置

```html
<script src="https://unpkg.com/vue@3/dist/vue.global.prod.js"></script>
```
不装 Node、不跑 `npm install`，一个 `<script>` 标签就能用完整的 Vue 3 响应式系统。

---

## 🚀 快速开始

```bash
# 1. Clone 到本地
git clone https://github.com/LuHeJ/LuHeJ.git

# 2. 直接用浏览器打开 index.html
#    或者用任意静态服务器：
npx serve .
#    python -m http.server 8080
#    Live Server (VS Code 插件)

# 3. 改内容
#    把 "鹿禾" 换成你的名字
#    把 g1.jpg / g2.jpg 换成你的照片
#    把 BGM1.mp3 换成你的音乐（或删掉 <audio> 标签）
#    在 :root 里改颜色 = 一键换肤
```

---

## 🎨 二创指南

| 想改的效果 | 改哪里 |
|---|---|
| 颜色主题 | `:root` 里的 CSS 变量 |
| 字体 | `<link>` 里的 Google Fonts + `body { font-family }` |
| 背景图 | 替换 `g1.jpg` `g2.jpg` `g3.jpg` |
| 个人信息 | HTML 里 `.profile-card` 区域 + Vue `data()` 里的 `contacts` |
| 技能标签 | Vue `data()` 里的 `skillGroups` |
| 粒子数量 | JS 里 `particleCount = 80` 改大/改小 |
| 连线距离 | JS 里 `connectDistance = 150` |
| 内容面板 | Vue `<template>` 里 `v-if="currentTab === X"` 的各区块 |

---

## ⌨️ 快捷键

| 按键 | 功能 |
|---|---|
| `Space` | 播放/暂停背景音乐 |
| `↑ / ↓` | 音量 +5 / -5 |
| `→ / ←` | Vue 面板内翻页（下一个/上一个标签） |
| `Esc` | 关闭 Vue 全屏面板，返回主页 |

---

## 📋 浏览器兼容

| 浏览器 | 状态 |
|---|---|
| Chrome / Edge 90+ | ✅ 全功能 |
| Firefox 90+ | ✅ 全功能 |
| Safari 15+ | ✅ 全功能（`backdrop-filter` 需 15+） |
| 移动端 Safari / Chrome | ✅ 响应式适配 |

---

## ⭐ 支持与交流

如果这个项目对你有帮助：

- **点个 Star** ⭐ — 让更多人看到
- **Fork 一份** 🍴 — 改成你自己的主页
- **提 Issue** 💬 — 有问题/建议直接问
- **分享给你的朋友** 📣 — 一起学习前端

> "技术是工具，创意是内核。做能解决实际问题的创造者。"

---

<p align="center">
  <sub>Made with ❤️ by <a href="https://github.com/LuHeJ">LuHe</a> · 纯手搓 · 欢迎二创</sub>
</p>
