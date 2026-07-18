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

    
    <!-- ===== 滑动过渡遮罩 ===== -->
    <div class="slide-mask" id="slideMask"></div>

    
    <!-- ===== Vue 3 全屏内容区域 ===== -->
    <div id="vue-app">
        <transition name="vue-overlay">
            <div v-if="visible" class="vue-overlay-root">
                <div class="vue-main-overlay">
                    
                    <nav class="vue-sidebar">
                        <div class="vue-sidebar-header">
                            <div class="vue-sidebar-title">鹿禾·LuHe</div>
                            <div class="vue-sidebar-subtitle">NAVIGATION</div>
                        </div>
                        <div v-for="tab in tabs" :key="tab.id" class="vue-nav-item" :class="{ active: currentTab === tab.id }" @click="goToTab(tab.id)" :title="tab.name">
                            <span class="vue-nav-dot"></span>
                            <span>{{ tab.name }}</span>
                        </div>
                        <div class="vue-sidebar-divider">
                            <span class="divider-dot"></span>
                            <span class="divider-line"></span>
                            <span class="divider-dot"></span>
                            <span class="divider-line"></span>
                            <span class="divider-dot"></span>
                        </div>
                        <div class="vue-sidebar-footer">
                            <div class="footer-dot-row">
                                <span></span><span></span><span></span><span></span><span></span>
                            </div>
                            <div class="footer-quote">CODE · CREATE · REPEAT</div>
                        </div>
                    </nav>

                    
                    <div class="vue-content-area">
                        <div class="vue-content-topbar">
                            <span class="vue-content-title">
                                SCENCE {{ String(currentTab).padStart(2, '0') }} · {{ currentTabData.name }}
                            </span>
                            <button class="vue-close-btn" @click="closeOverlay" title="关闭 · 返回主页">✕</button>
                        </div>
                        <div class="vue-content-scroll">
                            <transition name="panel-fade" mode="out-in">
                                
                                <about-panel v-if="currentTab === 1" :key="1"></about-panel>

                                
                                <skills-panel v-if="currentTab === 2" :key="2"></skills-panel>

                                
                                <contact-panel v-if="currentTab === 3" :key="3"></contact-panel>

                                
                                <resume-panel v-if="currentTab === 4" :key="4"></resume-panel>

                            </transition>
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

// ===== Vue 应用 =====
const visible = ref(false)
const currentTab = ref(1)
const tabs = [
  { id: 1, name: '关于我' }, { id: 2, name: '技能领域' },
  { id: 3, name: '联系方式' }, { id: 4, name: '个人简历' },
]
const currentTabData = computed(() => tabs.find(t => t.id === currentTab.value) || tabs[0])
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

  console.log('🖤 LuHe 个人主页 (Vite + Vue SFC) 已就绪')
})

</script>

<style>
@import '../index.css';
</style>
