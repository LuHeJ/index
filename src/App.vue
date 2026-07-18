<template>


    
    <audio id="bgAudio" src="BGM1.mp3" loop preload="auto"></audio>

    
    <!-- ===== 背景层 (双图融合) =====
   [作用] 两张背景图以对角线融合为全屏背景。
   [怎么做] 两个 div (.bg-left / .bg-right) 分别承载左右背景图，
           通过 CSS clip-path 实现对角线裁剪融合。
   [为什么] 使用 div + CSS 而非 <img> 标签 + JS：
     - CSS clip-path 是 GPU 加速的，性能更好
     - 两个 div 绝对定位叠加，不需要 JS 计算
     - background-image 支持 cover/position 等灵活控制
-->
    <div class="bg-images">
        <div class="bg-left"></div>
        <div class="bg-right"></div>
    </div>

    
    <!-- ===== 粒子动画画布 =====
   [作用] HTML5 Canvas 元素，JS 在其上绘制粒子连线动画。
   [怎么做] <canvas> 标签创建画布，JS 通过 getContext('2d') 获取 2D 渲染上下文。
   [为什么] Canvas 2D 而非 WebGL：80 个粒子 + 连线用 Canvas 2D 足够，
           WebGL 虽更快但 API 复杂度高得多，此处性能远未到瓶颈。
-->
    <canvas id="particle-canvas"></canvas>

    
    <!-- ===== 网格纹理 ===== -->
    <div class="grid-bg"></div>

    
    <!-- ===== 暗角遮罩 ===== -->
    <div class="vignette"></div>

    
    <!-- ===== 固定 UI 元素 ===== -->
    <div class="side-line overlay-active"></div>

    
    <div class="logo overlay-active">
        <span class="dot"></span>
        <span class="luhe">LuHe</span>
        <span class="slash">/</span>
        <span class="miaow">个人主页</span>
    </div>

    
    <div class="top-right-panel overlay-active" id="topRightPanel">
        
        <div class="music-controller" id="musicController" title="背景音乐控制">
            <button class="music-play-btn" id="musicPlayBtn" aria-label="播放/暂停背景音乐">
                <span class="note-icon">♫</span>
            </button>
            <div class="volume-slider-wrap">
                <input type="range" class="volume-slider" id="volumeSlider" min="0" max="100" value="40" title="音量调节" aria-label="音量调节" />
            </div>
        </div>
    </div>

    
    <div class="welcome-area overlay-active" id="welcomeArea">
        <div class="welcome-text">欢迎宾至，鹿禾的主页。</div>
        <button class="enter-btn" id="enterBtn">
            <span>详情主页→</span>
            <span class="arrow">→</span>
        </button>
        <div class="enter-hint">SLIDE RIGHT TO ENTER</div>
    </div>

    
    <div class="profile-card overlay-active" id="profileCard">
        <div class="profile-label">PROFILE</div>
        <div class="profile-name">LuHe</div>
        <div class="profile-desc">在代码与想象直接，描绘未来的轮廓。</div>
        <div class="profile-info-row">
            <span class="profile-info-label">LOCATION</span>
            <span class="profile-info-value">Shi Jia Zhuang</span>
        </div>
        <div class="profile-info-row">
            <span class="profile-info-label">ORIENTATION</span>
            <span class="profile-info-value">Web · AI · visual</span>
        </div>
    </div>

    
    <div class="status-bar overlay-active">
        <span>SCENCE 01 · 主页面</span>
        <div class="progress-track">
            <div class="progress-fill"></div>
        </div>
    </div>

    
    <div class="controls overlay-active">
        <div class="control-btn" title="音效">🎤</div>
        <div class="control-btn" title="设置">⚙</div>
    </div>

    
    <!-- ===== 毛玻璃欢迎覆盖层 ===== -->
    <div class="welcome-overlay" id="welcomeOverlay">
        <div class="welcome-overlay-inner">
            <h1 class="welcome-title">别来无恙啊</h1>
            <button class="welcome-enter-btn" id="enterMainBtn">
                <span>点击进入主页</span>
            </button>
        </div>
        <div class="welcome-subtle">WELCOME · 鹿禾的个人主页</div>
    </div>

    
    <!-- ===== 主页时钟 ===== -->
    <div class="main-clock overlay-active" id="mainClock"><div class="clock-time">00:00</div><div class="clock-date">2026/07/18</div></div>

    <!-- ===== 滑动过渡遮罩 ===== -->
    <div class="slide-mask" id="slideMask"></div>

    
    <!-- ===== Vue 3 全屏内容区域 ===== -->
    <div id="vue-app">
        <transition name="vue-overlay">
            <div v-if="visible" class="vue-overlay-root">
                <div class="vue-main-overlay">
                    
                    <nav class="vue-sidebar" :class="{ collapsed: sidebarCollapsed }">
                        <div class="vue-sidebar-header">
                            <button class="sidebar-toggle" @click="sidebarCollapsed = !sidebarCollapsed" :title="sidebarCollapsed ? '展开侧边栏' : '折叠侧边栏'">{{ sidebarCollapsed ? '»' : '«' }}</button>
                            <div class="vue-sidebar-title" v-show="!sidebarCollapsed">鹿禾·LuHe</div>
                            <div class="vue-sidebar-subtitle" v-show="!sidebarCollapsed">NAVIGATION</div>
                        </div>
                        <div v-for="tab in tabs" :key="tab.id" class="vue-nav-item" :class="{ active: currentTab === tab.id }" @click="goToTab(tab.id)" :title="tab.name">
                            <span class="vue-nav-dot"></span>
                            <span v-show="!sidebarCollapsed">{{ tab.name }}</span>
                        </div>
                        <div class="vue-sidebar-divider" v-show="!sidebarCollapsed">
                            <span class="divider-dot"></span><span class="divider-line"></span><span class="divider-dot"></span><span class="divider-line"></span><span class="divider-dot"></span>
                        </div>
                        <div class="vue-sidebar-footer" v-show="!sidebarCollapsed">
                            <div class="footer-dot-row"><span></span><span></span><span></span><span></span><span></span></div>
                            <div class="footer-quote">CODE · CREATE · REPEAT</div>
                        </div>
                    </nav>
                    <div class="vue-content-area">
                        <div class="vue-content-topbar">
                            <span class="vue-content-breadcrumb">SCENCE {{ String(currentTab).padStart(2, '0') }}<span class="breadcrumb-sep"> · </span><span class="breadcrumb-name">{{ currentTabData.name }}</span></span>
                            <button class="vue-close-btn" @click="closeOverlay" title="关闭 · 返回主页">✕</button>
                        </div>
                        <div class="vue-content-scroll">
                            <about-panel v-if="currentTab === 1" />
                                <skills-panel v-else-if="currentTab === 2" />
                                <contact-panel v-else-if="currentTab === 3" />
                                <resume-panel v-else-if="currentTab === 4" />
                                <inspire-panel v-else-if="currentTab === 5" />
                                <tool-panel v-else-if="currentTab === 6" />
                                <wiki-panel v-else-if="currentTab === 7" />
                                <codelab-panel v-else-if="currentTab === 8" />
                                <div v-else-if="currentTab === 9" class="navi-panel">
                                <div class="vue-card panel-card" style="--i:0"><div class="vue-card-title">技术文档</div><div class="navi-links"><a href="https://developer.mozilla.org" target="_blank" class="navi-link">MDN Web Docs</a><a href="https://devdocs.io" target="_blank" class="navi-link">DevDocs 聚合</a><a href="https://cn.vuejs.org" target="_blank" class="navi-link">Vue 3 中文</a><a href="https://react.dev" target="_blank" class="navi-link">React 官方</a><a href="https://tailwindcss.com" target="_blank" class="navi-link">Tailwind CSS</a><a href="https://nodejs.org/docs" target="_blank" class="navi-link">Node.js 文档</a></div></div>
                                <div class="vue-card panel-card" style="--i:1"><div class="vue-card-title">在线工具</div><div class="navi-links"><a href="https://codepen.io" target="_blank" class="navi-link">CodePen</a><a href="https://jsonformatter.org" target="_blank" class="navi-link">JSON 格式化</a><a href="https://regex101.com" target="_blank" class="navi-link">Regex 测试</a><a href="https://caniuse.com" target="_blank" class="navi-link">Can I Use</a><a href="https://www.jsv9000.app" target="_blank" class="navi-link">JS 可视化</a><a href="https://transform.tools" target="_blank" class="navi-link">代码转换</a></div></div>
                                <div class="vue-card panel-card" style="--i:2"><div class="vue-card-title">图标与素材</div><div class="navi-links"><a href="https://lucide.dev" target="_blank" class="navi-link">Lucide Icons</a><a href="https://fontawesome.com" target="_blank" class="navi-link">Font Awesome</a><a href="https://unsplash.com" target="_blank" class="navi-link">Unsplash 图片</a><a href="https://www.flaticon.com" target="_blank" class="navi-link">Flaticon</a><a href="https://coolors.co" target="_blank" class="navi-link">Coolors 配色</a><a href="https://colorhunt.co" target="_blank" class="navi-link">ColorHunt</a></div></div>
                                <div class="vue-card panel-card" style="--i:3"><div class="vue-card-title">社区与学习</div><div class="navi-links"><a href="https://github.com" target="_blank" class="navi-link">GitHub</a><a href="https://stackoverflow.com" target="_blank" class="navi-link">Stack Overflow</a><a href="https://juejin.cn" target="_blank" class="navi-link">掘金社区</a><a href="https://www.freecodecamp.org" target="_blank" class="navi-link">freeCodeCamp</a><a href="https://leetcode.cn" target="_blank" class="navi-link">LeetCode 刷题</a><a href="https://www.runoob.com" target="_blank" class="navi-link">菜鸟教程</a></div></div>
                                <div class="vue-card panel-card" style="--i:4"><div class="vue-card-title">部署与云服务</div><div class="navi-links"><a href="https://vercel.com" target="_blank" class="navi-link">Vercel</a><a href="https://pages.github.com" target="_blank" class="navi-link">GitHub Pages</a><a href="https://www.netlify.com" target="_blank" class="navi-link">Netlify</a><a href="https://hub.docker.com" target="_blank" class="navi-link">Docker Hub</a><a href="https://www.npmjs.com" target="_blank" class="navi-link">npm Registry</a><a href="https://cdnjs.com" target="_blank" class="navi-link">cdnjs</a></div></div>
                                <div class="vue-card panel-card" style="--i:5"><div class="vue-card-title">AI 工具</div><div class="navi-links"><a href="https://claude.ai" target="_blank" class="navi-link">Claude AI</a><a href="https://chat.openai.com" target="_blank" class="navi-link">ChatGPT</a><a href="https://github.com/features/copilot" target="_blank" class="navi-link">Copilot</a><a href="https://v0.dev" target="_blank" class="navi-link">v0 生成 UI</a><a href="https://bolt.new" target="_blank" class="navi-link">Bolt 快速构建</a><a href="https://huggingface.co" target="_blank" class="navi-link">Hugging Face</a></div></div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>

    <!-- Vue 组件脚本（必须在 Vue CDN 之后、index.js 之前加载） -->
    
</template>

<script setup>

import { ref, computed, onMounted } from 'vue'

// ===== 面板组件 =====
const AboutPanel = {
  name: 'AboutPanel',
  template: '<div class="about-panel"><div class="vue-card panel-card" style="--i:0"><div class="vue-card-title">关于我</div><div class="vue-card-desc">23届计算机应用技术专业专科毕业生，具备Web全栈开发、AI工具落地、视觉设计与视频剪辑复合能力。有企业前端实习经验，擅长从需求到落地的完整交付，注重代码质量与交互体验的平衡，始终保持技术学习热情，持续拓展能力边界。</div><div class="vue-tag-row"><span class="vue-tag">前端开发</span><span class="vue-tag">AI增效</span><span class="vue-tag">视觉设计</span><span class="vue-tag">视频剪辑</span><span class="vue-tag">全栈实践</span></div></div><div class="vue-card panel-card" style="--i:1"><div class="vue-card-title">教育背景</div><div class="timeline-item"><div class="timeline-time">2020 - 2023</div><div class="timeline-title">计算机应用技术 · 专科</div><div class="timeline-desc">系统学习计算机基础、前端开发、Python/C++程序设计、数据库原理等课程，在校期间完成多个课程项目，打下扎实的技术基础。</div></div></div><div class="vue-card panel-card" style="--i:2"><div class="vue-card-title">实习经历</div><div class="timeline-item"><div class="timeline-time">苏州极豹信息科技 · 前端开发实习生</div><div class="timeline-title">负责企业官网与内部管理系统前端开发</div><div class="timeline-desc">基于Vue.js完成页面组件开发与迭代，配合后端联调接口，参与页面性能优化，首屏加载速度提升约30%。</div></div></div><div class="vue-card panel-card" style="--i:3"><div class="vue-card-title">项目经历</div><div class="timeline-item"><div class="timeline-time">2024.01 - 至今</div><div class="timeline-title">个人品牌主页 · 独立开发</div><div class="timeline-desc">独立设计并开发响应式个人主页，融合 Canvas 粒子动画、Vue 3 动态路由、毛玻璃 UI 等交互效果。</div></div><div class="timeline-item"><div class="timeline-time">2023.09 - 2023.12</div><div class="timeline-title">校园二手交易小程序 · 核心开发</div><div class="timeline-desc">使用微信小程序原生框架 + 云开发，实现商品发布、搜索筛选、在线聊天、订单管理等核心功能。</div></div></div><div class="vue-card panel-card" style="--i:4"><div class="vue-card-title">兴趣爱好</div><div class="vue-tag-row"><span class="vue-tag">🎮 游戏</span><span class="vue-tag">🎀 二次元</span><span class="vue-tag">🎵 音乐</span><span class="vue-tag">📷 摄影</span><span class="vue-tag">🎬 剪辑</span><span class="vue-tag">🎸 吉他</span><span class="vue-tag">☕ 咖啡</span><span class="vue-tag">🍸 鸡尾酒</span><span class="vue-tag">🌧️ 淋雨</span><span class="vue-tag">✈️ 旅游</span><span class="vue-tag">···</span></div></div><div class="vue-card panel-card" style="--i:5"><div class="vue-card-title">个人理念</div><div class="vue-card-desc" style="font-size:16px;color:#f0d8d8;">&quot;技术是工具，创意是内核，做能解决实际问题的创造者。&quot;</div></div></div>'
};

const SkillsPanel = {
  name: 'SkillsPanel',
  data() { return { skillGroups: [
    { category: '编码开发', description: '掌握前后端核心技术栈，可独立完成Web项目从页面到接口的完整开发。', skills: ['HTML5/CSS3','JavaScript','Vue 3','Python','C++','Bootstrap','微信小程序','MySQL'] },
    { category: '视觉交互', description: '具备设计审美与界面落地能力，兼顾视觉质感与用户体验。', skills: ['Photoshop','Illustrator','UI设计','响应式布局','交互动效','用户体验优化'] },
    { category: 'AI增效', description: '熟练运用主流AI工具与模型提升开发创作效率，可落地自动化工作流。', skills: ['AI图像生成','AI文案优化','自动化脚本','批量处理','提示词工程','AI工具二次开发','AI Agent','Claude','Codex'] },
    { category: '视频剪辑', description: '可独立完成产品宣传、项目演示等场景的视频制作。', skills: ['剪映专业版','卡点剪辑','字幕制作','转场动效','宣传短片','演示视频'] },
    { category: '音乐创作', description: '热爱吉他演奏与音乐制作，具备编曲、录音、混音等音频创作能力。', skills: ['指弹吉他','电吉他','编曲','混音','作曲','录音'] }
  ]}; },
  computed: { totalSkillCount() { return this.skillGroups.reduce((s,g) => s + g.skills.length, 0); } },
  template: `<div class="skills-panel"><div class="vue-card panel-card" v-for="(sg,idx) in skillGroups" :key="sg.category" :style="'--i:'+idx"><div class="vue-card-title">{{ sg.category }}</div><div class="vue-card-desc">{{ sg.description }}</div><div class="vue-tag-row"><span class="vue-tag" v-for="s in sg.skills" :key="s">{{ s }}</span></div></div><div class="vue-card panel-card" style="--i:5"><div class="vue-card-title">常用工具</div><div class="vue-tag-row"><span class="vue-tag">VS Code</span><span class="vue-tag">Git</span><span class="vue-tag">Figma</span><span class="vue-tag">Postman</span><span class="vue-tag">Claude AI</span><span class="vue-tag">ChatGPT</span><span class="vue-tag">Photoshop</span><span class="vue-tag">剪映</span></div></div><div class="vue-card panel-card" style="--i:6"><div class="vue-card-title">正在学习</div><div class="vue-card-desc">深入探索 TypeScript 类型系统、Next.js 全栈框架、Three.js 3D 可视化，持续拓展技术视野与实战能力。</div><div class="vue-tag-row"><span class="vue-tag">TypeScript</span><span class="vue-tag">Next.js</span><span class="vue-tag">Three.js</span></div></div><div class="vue-card panel-card" style="text-align:center;--i:7"><div class="vue-highlight-num">{{ totalSkillCount }}+</div><div class="vue-card-desc" style="margin-top:4px;">技能标签总数 · 持续学习迭代中</div></div></div>`
};

const ContactPanel = {
  name: 'ContactPanel',
  data() { return { contacts: [
    { label:'电子邮箱', value:'2743591998@qq.com', link:'mailto:2743591998@qq.com' },
    { label:'GitHub', value:'github.com/LuHeJ/index.git', link:'https://github.com/LuHeJ/index.git' },
    { label:'微信', value:'xiaoyiyanyu', link:null },
    { label:'所在城市', value:'中国 · 河北石家庄', link:null }
  ]}; },
  template: `<div class="contact-panel"><div class="vue-card panel-card" v-for="(c,idx) in contacts" :key="c.label" :style="'--i:'+idx"><div class="vue-card-title">{{ c.label }}</div><div class="vue-card-desc"><a v-if="c.link" :href="c.link" target="_blank" class="vue-link">{{ c.value }}</a><span v-else>{{ c.value }}</span></div></div><div class="vue-card panel-card" style="--i:4"><div class="vue-card-title">社交媒体</div><div class="vue-card-desc">更多动态与作品持续更新中，欢迎关注与交流。</div><div class="vue-tag-row"><span class="vue-tag">GitHub</span><span class="vue-tag">掘金</span><span class="vue-tag">CSDN</span><span class="vue-tag">B站</span><span class="vue-tag">抖音</span></div></div><div class="vue-card panel-card" style="--i:5"><div class="vue-card-title">在线时间</div><div class="vue-card-desc">工作日 19:00 - 23:00 在线<br/>周末全天可沟通<br/>紧急事务请邮件联系，24小时内回复。</div></div><div class="vue-card panel-card" style="--i:6"><div class="vue-card-title">合作说明</div><div class="vue-card-desc">欢迎技术交流、项目合作与求职机会沟通，无论是前端开发、AI工具落地、视觉设计还是视频剪辑相关的需求，都可以随时联系。</div></div></div>`
};

const ResumePanel = {
  name: 'ResumePanel',
  template: '<div class="resume-panel"><div class="vue-card panel-card" style="--i:0"><div class="resume-header"><div class="resume-name-block"><h2>鹿禾 / LuHe</h2><p>Web前端开发 · 全栈实践 · AI增效工程师</p></div><div class="resume-contact-grid"><span><strong>所在城市</strong>河北石家庄</span><span><strong>工作性质</strong>全职 / 远程</span><span><strong>电子邮箱</strong>2743591998@qq.com</span><span><strong>GitHub</strong>github.com/LuHeJ/index.git</span></div></div></div><div class="vue-card panel-card" style="--i:1"><div class="resume-section-title">教育背景</div><div class="timeline-item"><div class="timeline-time">2020.09 - 2023.06</div><div class="timeline-title">计算机应用技术 · 专科</div><div class="timeline-desc">主修课程：Web前端开发、数据结构、数据库原理、Python程序设计、C++程序设计、计算机网络、UI设计基础<br/>专业排名前15%，多次获得学业奖学金。</div></div></div><div class="vue-card panel-card" style="--i:2"><div class="resume-section-title">工作/实习经历</div><div class="timeline-item"><div class="timeline-time">2023.03 - 2023.08</div><div class="timeline-title">苏州极豹信息科技有限公司 · 前端开发实习生</div><div class="timeline-desc">1.基于Vue 3+Element Plus实现20+业务组件；2.配合后端联调，Axios封装统一请求拦截；3.页面响应式适配与浏览器兼容性优化；4.参与代码评审与技术文档编写。</div></div></div><div class="vue-card panel-card" style="--i:3"><div class="resume-section-title">专业技能</div><div class="resume-skill-row" v-for="sk in [{n:&quot;HTML5/CSS3&quot;,w:&quot;90%&quot;,l:&quot;熟练&quot;},{n:&quot;JavaScript&quot;,w:&quot;85%&quot;,l:&quot;熟练&quot;},{n:&quot;Vue 3&quot;,w:&quot;80%&quot;,l:&quot;熟练&quot;},{n:&quot;Python&quot;,w:&quot;70%&quot;,l:&quot;掌握&quot;},{n:&quot;微信小程序&quot;,w:&quot;75%&quot;,l:&quot;掌握&quot;},{n:&quot;AI工具应用&quot;,w:&quot;85%&quot;,l:&quot;熟练&quot;},{n:&quot;PS/剪映&quot;,w:&quot;80%&quot;,l:&quot;熟练&quot;}]" :key="sk.n"><div class="resume-skill-name">{{ sk.n }}</div><div class="resume-skill-bar"><div class="resume-skill-fill" :style="{width:sk.w}"></div></div><div class="resume-skill-level">{{ sk.l }}</div></div></div><div class="vue-card panel-card" style="--i:4"><div class="resume-section-title">项目经验</div><div class="timeline-item"><div class="timeline-time">2024.01-至今</div><div class="timeline-title">个人品牌主页 · 独立开发</div><div class="timeline-desc">独立设计并开发响应式个人主页，融合Canvas粒子动画、Vue 3动态路由、毛玻璃UI等。</div></div><div class="timeline-item"><div class="timeline-time">2023.09-2023.12</div><div class="timeline-title">校园二手交易小程序</div><div class="timeline-desc">微信小程序原生框架+云开发，商品发布、搜索筛选、在线聊天、订单管理。</div></div></div><div class="vue-card panel-card" style="--i:5"><div class="resume-section-title">自我评价</div><div class="vue-card-desc">1.具备扎实的Web前端开发基础，有企业实习经验；2.复合能力突出，覆盖编码、设计、AI、视频四大板块；3.学习能力强，持续关注前端与AI发展趋势；4.工作认真负责，注重代码质量与用户体验。</div></div></div>'
};

// ===== 新面板：灵感墙 =====
const InspirePanel = {
  name: 'InspirePanel',
  template: `<div class="inspire-panel">
    <div class="vue-card panel-card float-card" style="--i:0;--float-duration:4s;--float-delay:0s"><div class="inspire-quote">&quot;好的设计是尽可能少的设计。&quot;</div><div class="inspire-author">— Dieter Rams</div></div>
    <div class="vue-card panel-card float-card" style="--i:1;--float-duration:4.5s;--float-delay:0.3s"><div class="inspire-quote">&quot;代码是写给人看的，只是顺便让机器执行。&quot;</div><div class="inspire-author">— Harold Abelson</div></div>
    <div class="vue-card panel-card float-card" style="--i:2;--float-duration:5s;--float-delay:0.6s"><div class="inspire-quote">&quot;简单是复杂的终极形式。&quot;</div><div class="inspire-author">— Leonardo da Vinci</div></div>
    <div class="vue-card panel-card float-card" style="--i:3;--float-duration:4.2s;--float-delay:0.9s"><div class="inspire-quote">&quot;Stay hungry, stay foolish.&quot;</div><div class="inspire-author">— Steve Jobs</div></div>
    <div class="vue-card panel-card float-card" style="--i:4;--float-duration:3.8s;--float-delay:0.2s"><div class="inspire-quote">&quot;世上本没有路，走的人多了，也便成了路。&quot;</div><div class="inspire-author">— 鲁迅</div></div>
    <div class="vue-card panel-card float-card" style="--i:5;--float-duration:4.7s;--float-delay:0.5s"><div class="inspire-quote">&quot;The best way to predict the future is to invent it.&quot;</div><div class="inspire-author">— Alan Kay</div></div>
    <div class="vue-card panel-card float-card" style="--i:6;--float-duration:5.2s;--float-delay:0.8s"><div class="inspire-quote">&quot;创造性的行为，源自于对常识的怀疑。&quot;</div><div class="inspire-author">— 宫本茂</div></div>
    <div class="vue-card panel-card float-card" style="--i:7;--float-duration:4.0s;--float-delay:1.1s"><div class="inspire-quote">&quot;Any fool can write code that a computer can understand. Good programmers write code that humans can understand.&quot;</div><div class="inspire-author">— Martin Fowler</div></div>
  </div>`
};

// ===== 新面板：工具箱 =====
const ToolPanel = {
  name: 'ToolPanel',
  template: `<div class="tool-panel">
    <div class="vue-card panel-card tilt-card tool-card" style="--i:0"><div class="tool-icon">🧠</div><div class="vue-card-title">IntelliJ IDEA</div><div class="vue-card-desc">主力 IDE，智能代码补全与重构，Java/前端/全栈一站式开发。</div></div>
    <div class="vue-card panel-card tilt-card tool-card" style="--i:1"><div class="tool-icon">🖥️</div><div class="vue-card-title">VS Code</div><div class="vue-card-desc">轻量编辑器，插件生态丰富，前端快速迭代首选。</div></div>
    <div class="vue-card panel-card tilt-card tool-card" style="--i:2"><div class="tool-icon">🎨</div><div class="vue-card-title">Figma</div><div class="vue-card-desc">浏览器端协作设计，实时多人编辑，设计系统与原型交付。</div></div>
    <div class="vue-card panel-card tilt-card tool-card" style="--i:3"><div class="tool-icon">🐳</div><div class="vue-card-title">Docker</div><div class="vue-card-desc">容器化平台，环境隔离，一次构建到处运行。</div></div>
    <div class="vue-card panel-card tilt-card tool-card" style="--i:4"><div class="tool-icon">⚡</div><div class="vue-card-title">Vite</div><div class="vue-card-desc">新一代构建工具，ESM 原生驱动，毫秒级 HMR。</div></div>
    <div class="vue-card panel-card tilt-card tool-card" style="--i:5"><div class="tool-icon">📦</div><div class="vue-card-title">Git</div><div class="vue-card-desc">分布式版本控制，分支策略，团队协作基石。</div></div>
    <div class="vue-card panel-card tilt-card tool-card" style="--i:6"><div class="tool-icon">🤖</div><div class="vue-card-title">Claude</div><div class="vue-card-desc">AI 编程助手，代码生成与审查，加速开发迭代。</div></div>
    <div class="vue-card panel-card tilt-card tool-card" style="--i:7"><div class="tool-icon">📮</div><div class="vue-card-title">Postman</div><div class="vue-card-desc">API 调试与测试，请求集合管理，团队协作。</div></div>
    <div class="vue-card panel-card tilt-card tool-card" style="--i:8"><div class="tool-icon">🔍</div><div class="vue-card-title">Chrome DevTools</div><div class="vue-card-desc">浏览器开发者工具，性能分析，DOM 调试，网络监控。</div></div>
    <div class="vue-card panel-card tilt-card tool-card" style="--i:9"><div class="tool-icon">💻</div><div class="vue-card-title">Terminal</div><div class="vue-card-desc">命令行终端，Shell 脚本，自动化任务，服务器管理。</div></div>
    <div class="vue-card panel-card tilt-card tool-card" style="--i:10"><div class="tool-icon">🖼️</div><div class="vue-card-title">Photoshop</div><div class="vue-card-desc">图像编辑与设计，位图处理，UI 素材制作。</div></div>
    <div class="vue-card panel-card tilt-card tool-card" style="--i:11"><div class="tool-icon">📝</div><div class="vue-card-title">Notion</div><div class="vue-card-desc">全功能笔记与知识库，项目管理，文档协作。</div></div>
  </div>`
};

// ===== 新面板：技术百科 =====
const WikiPanel = {
  name: 'WikiPanel',
  template: `<div class="wiki-panel">
    <div class="vue-card panel-card" style="--i:0">
      <div class="vue-card-title">RESTful API 设计原则</div>
      <div class="vue-card-desc">REST (Representational State Transfer) 是面向资源架构的 API 设计风格。核心原则：统一接口、无状态、客户端-服务端分离、资源可缓存、分层系统。URL 应使用名词复数形式，HTTP 方法（GET/POST/PUT/DELETE）对应 CRUD 操作，状态码传达结果语义。</div>
      <div class="vue-tag-row"><span class="vue-tag">API</span><span class="vue-tag">REST</span><span class="vue-tag">HTTP</span><span class="vue-tag">后端</span></div>
    </div>
    <div class="vue-card panel-card" style="--i:1">
      <div class="vue-card-title">Git 分支策略</div>
      <div class="vue-card-desc">Git Flow：main/master（生产）、develop（开发）、feature/*（功能分支）、release/*（发布准备）、hotfix/*（紧急修复）。日常开发在 feature 分支，完成后合并到 develop，发布时创建 release 分支，确认后合并到 main 并打 tag。</div>
      <div class="vue-tag-row"><span class="vue-tag">Git</span><span class="vue-tag">版本控制</span><span class="vue-tag">协作</span></div>
    </div>
    <div class="vue-card panel-card" style="--i:2">
      <div class="vue-card-title">CSS Grid vs Flexbox</div>
      <div class="vue-card-desc">Flexbox 适合一维布局（行或列），内容尺寸决定布局。Grid 适合二维布局（行和列同时），由容器定义网格结构。简单场景用 Flex（导航栏、卡片排列），复杂页面用 Grid（整体布局、仪表盘）。两者可以嵌套使用。</div>
      <div class="vue-tag-row"><span class="vue-tag">CSS</span><span class="vue-tag">布局</span><span class="vue-tag">前端</span></div>
    </div>
    <div class="vue-card panel-card" style="--i:3">
      <div class="vue-card-title">HTTPS 与 TLS 握手</div>
      <div class="vue-card-desc">TLS 握手过程：客户端发送支持的加密套件 → 服务端返回证书和公钥 → 客户端验证证书 → 双方协商对称密钥 → 加密通信开始。HTTPS = HTTP over TLS，保证数据在传输过程中的机密性和完整性。</div>
      <div class="vue-tag-row"><span class="vue-tag">网络</span><span class="vue-tag">安全</span><span class="vue-tag">HTTPS</span></div>
    </div>
    <div class="vue-card panel-card" style="--i:4">
      <div class="vue-card-title">JavaScript 事件循环</div>
      <div class="vue-card-desc">JS 是单线程语言，通过事件循环实现异步。调用栈执行同步代码，Web APIs 处理异步任务（setTimeout/fetch），任务完成后回调进入任务队列（宏任务/微任务）。微任务（Promise.then）优先于宏任务（setTimeout）执行。</div>
      <div class="vue-tag-row"><span class="vue-tag">JavaScript</span><span class="vue-tag">异步</span><span class="vue-tag">事件循环</span></div>
    </div>
    <div class="vue-card panel-card" style="--i:5">
      <div class="vue-card-title">Docker 核心概念</div>
      <div class="vue-card-desc">镜像（Image）：只读模板，包含运行环境和代码。容器（Container）：镜像的运行实例，轻量隔离。Dockerfile：构建镜像的指令文件。Docker Compose：多容器应用编排。卷（Volume）：持久化数据存储。网络：容器间通信。</div>
      <div class="vue-tag-row"><span class="vue-tag">Docker</span><span class="vue-tag">容器</span><span class="vue-tag">DevOps</span></div>
    </div>
  </div>`
};

// ===== 新面板：Code Lab =====
const CodelabPanel = {
  name: 'CodelabPanel',
  template: `<div class="codelab-panel">
    <div class="vue-card panel-card code-card" style="--i:0"><div class="vue-card-title">Python — 快速排序</div><pre class="code-block"><code>def quicksort(arr):
    if len(arr) &lt;= 1: return arr
    pivot = arr[len(arr) // 2]
    left  = [x for x in arr if x &lt; pivot]
    mid   = [x for x in arr if x == pivot]
    right = [x for x in arr if x &gt; pivot]
    return quicksort(left) + mid + quicksort(right)</code></pre></div>
    <div class="vue-card panel-card code-card" style="--i:1"><div class="vue-card-title">JavaScript — Debounce 防抖</div><pre class="code-block"><code>function debounce(fn, delay = 300) {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() =&gt; fn.apply(this, args), delay);
  };
}</code></pre></div>
    <div class="vue-card panel-card code-card" style="--i:2"><div class="vue-card-title">CSS — 完美居中</div><pre class="code-block"><code>.center {
  display: grid;
  place-items: center;
  /* 一行代码实现水平垂直居中 */ }</code></pre></div>
    <div class="vue-card panel-card code-card" style="--i:3"><div class="vue-card-title">SQL — 常用查询模板</div><pre class="code-block"><code>SELECT u.name, COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.created_at &gt;= '2024-01-01'
GROUP BY u.id
HAVING order_count &gt; 5
ORDER BY order_count DESC;</code></pre></div>
    <div class="vue-card panel-card code-card" style="--i:4"><div class="vue-card-title">Bash — 批量重命名</div><pre class="code-block"><code>#!/bin/bash
count=1
for file in *.jpg; do
  mv &quot;$file&quot; &quot;photo_$(printf %03d $count).jpg&quot;
  ((count++))
done</code></pre></div>
    <div class="vue-card panel-card code-card" style="--i:5"><div class="vue-card-title">Git — 撤销操作</div><pre class="code-block"><code># 撤销最后一次 commit（保留修改）
git reset --soft HEAD~1

# 撤销工作区修改
git checkout -- filename

# 修改最后一次 commit 信息
git commit --amend -m &quot;new message&quot;</code></pre></div>
  </div>`
};

// ===== 新面板：前端趋势 =====
const TrendsPanel = {
  name: 'TrendsPanel',
  template: `<div class="trends-panel">
    <div class="vue-card panel-card" style="--i:0"><div class="vue-card-title">WebAssembly (WASM)</div><div class="vue-card-desc">浏览器原生支持的二进制指令格式，允许 C/C++/Rust 等语言在 Web 上以接近原生速度运行。游戏引擎、图像处理、科学计算等高性能场景的首选方案。</div><div class="vue-tag-row"><span class="vue-tag">性能</span><span class="vue-tag">WASM</span><span class="vue-tag">🔥 热门</span></div></div>
    <div class="vue-card panel-card" style="--i:1"><div class="vue-card-title">CSS Container Queries</div><div class="vue-card-desc">基于父容器尺寸而非视口尺寸的响应式方案。组件可以根据自己所在的容器大小调整样式，真正实现「可复用组件」。2023 年起主流浏览器全面支持。</div><div class="vue-tag-row"><span class="vue-tag">CSS</span><span class="vue-tag">响应式</span><span class="vue-tag">✅ 已稳定</span></div></div>
    <div class="vue-card panel-card" style="--i:2"><div class="vue-card-title">View Transitions API</div><div class="vue-card-desc">浏览器原生页面过渡动画 API，无需 JS 动画库即可实现 SPA 页面间的平滑过渡。支持 MPA 和 SPA 两种模式，Chrome 111+ 已支持。</div><div class="vue-tag-row"><span class="vue-tag">浏览器API</span><span class="vue-tag">动画</span><span class="vue-tag">🆕 新特性</span></div></div>
    <div class="vue-card panel-card" style="--i:3"><div class="vue-card-title">AI 辅助编程</div><div class="vue-card-desc">LLM 驱动的代码生成与审查工具正在改变开发流程。从代码补全到全函数生成，从单元测试到重构建议，AI 正在成为开发者的标配工具。</div><div class="vue-tag-row"><span class="vue-tag">AI</span><span class="vue-tag">开发工具</span><span class="vue-tag">🚀 高速发展</span></div></div>
    <div class="vue-card panel-card" style="--i:4"><div class="vue-card-title">边缘计算与 Serverless</div><div class="vue-card-desc">代码运行在 CDN 边缘节点，全球低延迟。Cloudflare Workers、Vercel Edge Functions、Deno Deploy 等平台让开发者无需管理服务器即可部署全球应用。</div><div class="vue-tag-row"><span class="vue-tag">Serverless</span><span class="vue-tag">边缘计算</span><span class="vue-tag">☁️ 趋势</span></div></div>
  </div>`
};

// ===== Vue 应用 =====
const visible = ref(false)
const sidebarCollapsed = ref(false)
const currentTab = ref(1)
const tabs = [
  { id: 1, name: '关于我' }, { id: 2, name: '技能领域' },
  { id: 3, name: '联系方式' }, { id: 4, name: '个人简历' },
  { id: 5, name: '灵感墙' },   { id: 6, name: '工具箱' },   { id: 7, name: '技术百科' },   { id: 8, name: 'Code Lab' },   { id: 9, name: '编程导航' },
]
const currentTabData = computed(() => tabs.find(t => t.id === currentTab.value) || tabs[0])
const panelMap = { 1: AboutPanel, 2: SkillsPanel, 3: ContactPanel, 4: ResumePanel }
function goToTab(id) { currentTab.value = id; const s = document.querySelector('.status-bar span'); if(s) s.textContent = 'SCENCE ' + String(id).padStart(2,'0') + ' · 主页面' }
function showVue() { visible.value = true; document.body.style.overflow = 'hidden' }
function hideVue() { visible.value = false; document.body.style.overflow = '' }

// ===== 粒子系统 =====
let canvasEl, ctx, W, H, particles = [], startTime, mouseX = -1000, mouseY = -1000
class Particle {
  constructor() { this.reset() }
  reset() { this.x = Math.random()*W; this.y = Math.random()*H; this.vx = (Math.random()-0.5)*0.3; this.vy = (Math.random()-0.5)*0.3; this.radius = Math.random()*1.5+0.5; this.alpha = Math.random()*0.5+0.3; this.pulseSpeed = Math.random()*0.02+0.005; this.pulsePhase = Math.random()*Math.PI*2 }
  update(t) { this.x+=this.vx; this.y+=this.vy; if(this.x<0||this.x>W)this.vx*=-1; if(this.y<0||this.y>H)this.vy*=-1; this.currentAlpha = this.alpha + Math.sin(t*this.pulseSpeed+this.pulsePhase)*0.2 }
  draw() { ctx.beginPath();ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);ctx.fillStyle='rgba(220,90,90,'+this.currentAlpha+')';ctx.fill();ctx.beginPath();ctx.arc(this.x,this.y,this.radius*3,0,Math.PI*2);ctx.fillStyle='rgba(200,60,60,'+(this.currentAlpha*0.15)+')';ctx.fill() }
}
function resize() { W=canvasEl.width=window.innerWidth; H=canvasEl.height=window.innerHeight }
function initP() { particles=[]; for(let i=0;i<80;i++) particles.push(new Particle()) }
function drawConns() { for(let i=0;i<particles.length;i++){for(let j=i+1;j<particles.length;j++){const dx=particles[i].x-particles[j].x,dy=particles[i].y-particles[j].y,dist=Math.sqrt(dx*dx+dy*dy);if(dist<150){const a=(1-dist/150)*0.25;ctx.beginPath();ctx.moveTo(particles[i].x,particles[i].y);ctx.lineTo(particles[j].x,particles[j].y);ctx.strokeStyle='rgba(180,60,60,'+a+')';ctx.lineWidth=0.8;ctx.stroke()}}} }
function anim() { const t=Date.now()-startTime; ctx.clearRect(0,0,W,H); particles.forEach(p=>{p.update(t);p.draw()}); drawConns(); requestAnimationFrame(anim) }

// ===== 音频 =====
let bgAudio, musicBtn, volSlider, noteIcon
function updateBtnUI(){ if(!bgAudio||!musicBtn||!noteIcon)return; if(bgAudio.paused){musicBtn.classList.remove('playing');noteIcon.textContent='♫';musicBtn.title='播放背景音乐'}else{musicBtn.classList.add('playing');noteIcon.textContent='♪';musicBtn.title='暂停背景音乐'} }

// ===== 覆盖层 =====
let welcomeOverlay, allUi = [], slideMask
function showWelcome(){ if(welcomeOverlay&&!welcomeOverlay.classList.contains('visible')&&!welcomeOverlay.classList.contains('fading-out')){welcomeOverlay.classList.add('visible');allUi.forEach(el=>{if(el&&!el.classList.contains('overlay-active'))el.classList.add('overlay-active')})} }
function enterSite(){ if(visible.value)return; if(slideMask)slideMask.classList.add('active'); showVue() }
function closeOverlay(){ if(slideMask)slideMask.classList.remove('active'); hideVue() }

// ===== 挂载 =====
onMounted(() => {
  // 粒子
  canvasEl=document.getElementById('particle-canvas'); ctx=canvasEl.getContext('2d'); resize(); initP(); startTime=Date.now(); anim()
  window.addEventListener('resize',()=>{resize();initP()})
  document.addEventListener('mousemove',e=>{mouseX=e.clientX;mouseY=e.clientY;particles.forEach(p=>{const dx=mouseX-p.x,dy=mouseY-p.y,dist=Math.sqrt(dx*dx+dy*dy);if(dist<120){const f=(120-dist)/120*0.05;p.vx+=(dx/dist)*f;p.vy+=(dy/dist)*f}})})

  // 音频
  bgAudio=document.getElementById('bgAudio');musicBtn=document.getElementById('musicPlayBtn');volSlider=document.getElementById('volumeSlider');noteIcon=musicBtn?.querySelector('.note-icon')
  if(bgAudio&&volSlider)bgAudio.volume=parseInt(volSlider.value)/100
  if(musicBtn&&bgAudio){musicBtn.addEventListener('click',e=>{e.stopPropagation();if(bgAudio.paused)bgAudio.play().then(updateBtnUI).catch(err=>console.warn('播放失败:',err.message));else{bgAudio.pause();updateBtnUI()}})}
  if(volSlider&&bgAudio){volSlider.addEventListener('input',()=>{bgAudio.volume=parseInt(volSlider.value)/100});volSlider.addEventListener('change',()=>{bgAudio.volume=parseInt(volSlider.value)/100})}
  if(bgAudio){bgAudio.addEventListener('play',updateBtnUI);bgAudio.addEventListener('pause',updateBtnUI);bgAudio.addEventListener('ended',updateBtnUI);bgAudio.addEventListener('volumechange',()=>{const vp=Math.round(bgAudio.volume*100);if(parseInt(volSlider.value)!==vp)volSlider.value=vp})}
  updateBtnUI()

  // 欢迎覆盖层
  welcomeOverlay=document.getElementById('welcomeOverlay')
  const logoEl=document.querySelector('.logo'),topRightPanel=document.getElementById('topRightPanel'),welcomeArea=document.getElementById('welcomeArea'),statusBarEl=document.querySelector('.status-bar'),controlsEl=document.querySelector('.controls'),sideLineEl=document.querySelector('.side-line'),profileCardEl=document.getElementById('profileCard')
  allUi=[logoEl,topRightPanel,welcomeArea,statusBarEl,controlsEl,sideLineEl,profileCardEl].filter(Boolean)
  setTimeout(showWelcome,300); if(document.readyState==='complete')setTimeout(showWelcome,300)
  const enterMainBtn=document.getElementById('enterMainBtn')
  if(enterMainBtn&&welcomeOverlay){enterMainBtn.addEventListener('click',()=>{if(welcomeOverlay.classList.contains('visible')){welcomeOverlay.classList.remove('visible');welcomeOverlay.classList.add('fading-out');allUi.forEach(el=>{if(el)el.classList.remove('overlay-active')});setTimeout(()=>welcomeOverlay.classList.remove('fading-out'),1000);if(bgAudio)bgAudio.play().then(updateBtnUI).catch(()=>{})}})}

  // 滑动进入
  slideMask=document.getElementById('slideMask');const enterBtn=document.getElementById('enterBtn');if(enterBtn)enterBtn.addEventListener('click',enterSite)
  let touchStartX=0,touchDragging=false,mouseStartX=0,mouseDown=false
  document.addEventListener('touchstart',e=>{touchStartX=e.touches[0].clientX;touchDragging=true})
  document.addEventListener('touchend',e=>{if(!touchDragging)return;if(e.changedTouches[0].clientX-touchStartX>80)enterSite();touchDragging=false})
  document.addEventListener('mousedown',e=>{mouseStartX=e.clientX;mouseDown=true})
  document.addEventListener('mouseup',e=>{if(!mouseDown)return;if(e.clientX-mouseStartX>100)enterSite();mouseDown=false})

  // 键盘
  document.addEventListener('keydown',e=>{if(welcomeOverlay?.classList.contains('visible'))return;if(e.code==='Escape'){if(visible.value){e.preventDefault();closeOverlay();return}}if(e.code==='Space'&&e.target===document.body&&bgAudio){e.preventDefault();bgAudio.paused?bgAudio.play().then(updateBtnUI).catch(()=>{}):(bgAudio.pause(),updateBtnUI())}if(e.code==='ArrowUp'&&e.target===document.body&&volSlider&&bgAudio){e.preventDefault();const v=Math.min(100,parseInt(volSlider.value)+5);volSlider.value=v;bgAudio.volume=v/100}if(e.code==='ArrowDown'&&e.target===document.body&&volSlider&&bgAudio){e.preventDefault();const v=Math.max(0,parseInt(volSlider.value)-5);volSlider.value=v;bgAudio.volume=v/100}if(e.code==='ArrowRight'&&e.target===document.body){e.preventDefault();if(visible.value&&currentTab.value<4)goToTab(currentTab.value+1)}if(e.code==='ArrowLeft'&&e.target===document.body){e.preventDefault();if(visible.value&&currentTab.value>1)goToTab(currentTab.value-1)}})

  // 时钟
  const clockEl=document.getElementById('mainClock'),timeEl=clockEl?.querySelector('.clock-time'),dateEl=clockEl?.querySelector('.clock-date');
  function tick(){if(!timeEl)return;const n=new Date();timeEl.textContent=n.toLocaleTimeString('zh-CN',{hour:'2-digit',minute:'2-digit'});dateEl.textContent=n.toLocaleDateString('zh-CN')}
  tick();setInterval(tick,30000)

  console.log('🖤 LuHe 个人主页 (Vite + Vue SFC) 已就绪')
})

</script>

<style>
@import '../index.css';
</style>
