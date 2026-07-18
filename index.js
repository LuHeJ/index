/**
 * AboutPanel — 场景01：关于我
 * 个人介绍、教育背景、实习经历、项目经历、兴趣爱好、个人理念
 */
const AboutPanel = {
  name: 'AboutPanel',
  template: `
    <div class="about-panel">
      <div class="vue-card panel-card" style="--i:0">
        <div class="vue-card-title">关于我</div>
        <div class="vue-card-desc">
          23届计算机应用技术专业专科毕业生，具备Web全栈开发、AI工具落地、视觉设计与视频剪辑复合能力。
          有企业前端实习经验，擅长从需求到落地的完整交付，注重代码质量与交互体验的平衡，
          始终保持技术学习热情，持续拓展能力边界。
        </div>
        <div class="vue-tag-row">
          <span class="vue-tag">前端开发</span>
          <span class="vue-tag">AI增效</span>
          <span class="vue-tag">视觉设计</span>
          <span class="vue-tag">视频剪辑</span>
          <span class="vue-tag">全栈实践</span>
        </div>
      </div>

      <div class="vue-card panel-card" style="--i:1">
        <div class="vue-card-title">教育背景</div>
        <div class="timeline-item">
          <div class="timeline-time">2020 - 2023</div>
          <div class="timeline-title">计算机应用技术 · 专科</div>
          <div class="timeline-desc">
            系统学习计算机基础、前端开发、Python/C++程序设计、数据库原理等课程，
            在校期间完成多个课程项目，打下扎实的技术基础。
          </div>
        </div>
      </div>

      <div class="vue-card panel-card" style="--i:2">
        <div class="vue-card-title">实习经历</div>
        <div class="timeline-item">
          <div class="timeline-time">苏州极豹信息科技 · 前端开发实习生</div>
          <div class="timeline-title">负责企业官网与内部管理系统前端开发</div>
          <div class="timeline-desc">
            基于Vue.js完成页面组件开发与迭代，配合后端联调接口，
            参与页面性能优化，首屏加载速度提升约30%，协助完成响应式适配与兼容性修复。
          </div>
        </div>
      </div>

      <div class="vue-card panel-card" style="--i:3">
        <div class="vue-card-title">项目经历</div>
        <div class="timeline-item">
          <div class="timeline-time">2024.01 - 至今</div>
          <div class="timeline-title">个人品牌主页 · 独立开发</div>
          <div class="timeline-desc">
            独立设计并开发响应式个人主页，融合 Canvas 粒子动画、Vue 3 动态路由、毛玻璃 UI 等交互效果，
            完整展示个人技术栈与审美风格，作为求职与技术交流的名片。
          </div>
        </div>
        <div class="timeline-item">
          <div class="timeline-time">2023.09 - 2023.12</div>
          <div class="timeline-title">校园二手交易小程序 · 核心开发</div>
          <div class="timeline-desc">
            使用微信小程序原生框架 + 云开发，实现商品发布、搜索筛选、在线聊天、订单管理等核心功能。
          </div>
        </div>
      </div>

      <div class="vue-card panel-card" style="--i:4">
        <div class="vue-card-title">兴趣爱好</div>
        <div class="vue-tag-row">
          <span class="vue-tag">🎮 游戏</span>
          <span class="vue-tag">🎀 二次元</span>
          <span class="vue-tag">🎵 音乐</span>
          <span class="vue-tag">📷 摄影</span>
          <span class="vue-tag">🎬 剪辑</span>
          <span class="vue-tag">🎸 吉他</span>
          <span class="vue-tag">☕ 咖啡</span>
          <span class="vue-tag">🍸 鸡尾酒</span>
          <span class="vue-tag">🌧️ 淋雨</span>
          <span class="vue-tag">✈️ 旅游</span>
          <span class="vue-tag">···</span>
        </div>
      </div>

      <div class="vue-card panel-card" style="--i:5">
        <div class="vue-card-title">个人理念</div>
        <div class="vue-card-desc" style="font-size:16px;color:#f0d8d8;">
          "技术是工具，创意是内核，做能解决实际问题的创造者。"
        </div>
      </div>
    </div>
  `
};


/**
 * SkillsPanel — 场景02：技能领域
 * 技能分组卡片 + 常用工具 + 正在学习 + 技能总数统计
 */
const SkillsPanel = {
  name: 'SkillsPanel',
  data() {
    return {
      skillGroups: [
        {
          category: '编码开发',
          description: '掌握前后端核心技术栈，可独立完成Web项目从页面到接口的完整开发。',
          skills: ['HTML5/CSS3', 'JavaScript', 'Vue 3', 'Python', 'C++', 'Bootstrap', '微信小程序', 'MySQL'],
        },
        {
          category: '视觉交互',
          description: '具备设计审美与界面落地能力，兼顾视觉质感与用户体验。',
          skills: ['Photoshop', 'Illustrator', 'UI设计', '响应式布局', '交互动效', '用户体验优化'],
        },
        {
          category: 'AI增效',
          description: '熟练运用主流AI工具与模型提升开发创作效率，可落地自动化工作流。',
          skills: ['AI图像生成', 'AI文案优化', '自动化脚本', '批量处理', '提示词工程', 'AI工具二次开发', 'AI Agent', 'Claude', 'Codex'],
        },
        {
          category: '视频剪辑',
          description: '可独立完成产品宣传、项目演示等场景的视频制作。',
          skills: ['剪映专业版', '卡点剪辑', '字幕制作', '转场动效', '宣传短片', '演示视频'],
        },
        {
          category: '音乐创作',
          description: '热爱吉他演奏与音乐制作，具备编曲、录音、混音等音频创作能力。',
          skills: ['指弹吉他', '电吉他', '编曲', '混音', '作曲', '录音'],
        },
      ],
    };
  },
  computed: {
    totalSkillCount() {
      return this.skillGroups.reduce((sum, group) => sum + group.skills.length, 0);
    },
  },
  template: `
    <div class="skills-panel">
      <div class="vue-card panel-card" v-for="(skillGroup, idx) in skillGroups" :key="skillGroup.category" :style="'--i:' + idx">
        <div class="vue-card-title">{{ skillGroup.category }}</div>
        <div class="vue-card-desc">{{ skillGroup.description }}</div>
        <div class="vue-tag-row">
          <span class="vue-tag" v-for="skill in skillGroup.skills" :key="skill">{{ skill }}</span>
        </div>
      </div>
      <div class="vue-card panel-card" style="--i:5">
        <div class="vue-card-title">常用工具</div>
        <div class="vue-tag-row">
          <span class="vue-tag">VS Code</span>
          <span class="vue-tag">Git</span>
          <span class="vue-tag">Figma</span>
          <span class="vue-tag">Postman</span>
          <span class="vue-tag">Claude AI</span>
          <span class="vue-tag">ChatGPT</span>
          <span class="vue-tag">Photoshop</span>
          <span class="vue-tag">剪映</span>
        </div>
      </div>
      <div class="vue-card panel-card" style="--i:6">
        <div class="vue-card-title">正在学习</div>
        <div class="vue-card-desc">
          深入探索 TypeScript 类型系统、Next.js 全栈框架、Three.js 3D 可视化，
          持续拓展技术视野与实战能力。
        </div>
        <div class="vue-tag-row">
          <span class="vue-tag">TypeScript</span>
          <span class="vue-tag">Next.js</span>
          <span class="vue-tag">Three.js</span>
        </div>
      </div>
      <div class="vue-card panel-card" style="text-align:center;--i:7">
        <div class="vue-highlight-num">{{ totalSkillCount }}+</div>
        <div class="vue-card-desc" style="margin-top:4px;">技能标签总数 · 持续学习迭代中</div>
      </div>
    </div>
  `
};


/**
 * ContactPanel — 场景03：联系方式
 * 联系方式卡片 + 社交媒体 + 在线时间 + 合作说明
 */
const ContactPanel = {
  name: 'ContactPanel',
  data() {
    return {
      contacts: [
        { label: '电子邮箱', value: '2743591998@qq.com', link: 'mailto:2743591998@qq.com' },
        { label: 'GitHub', value: 'github.com/LuHeJ/index.git', link: 'https://github.com/LuHeJ/index.git' },
        { label: '微信', value: 'xiaoyiyanyu', link: null },
        { label: '所在城市', value: '中国 · 河北石家庄', link: null },
      ],
    };
  },
  template: `
    <div class="contact-panel">
      <div class="vue-card panel-card" v-for="(contact, idx) in contacts" :key="contact.label" :style="'--i:' + idx">
        <div class="vue-card-title">{{ contact.label }}</div>
        <div class="vue-card-desc">
          <a v-if="contact.link" :href="contact.link" target="_blank" class="vue-link">{{ contact.value }}</a>
          <span v-else>{{ contact.value }}</span>
        </div>
      </div>
      <div class="vue-card panel-card" style="--i:4">
        <div class="vue-card-title">社交媒体</div>
        <div class="vue-card-desc">
          更多动态与作品持续更新中，欢迎关注与交流。
        </div>
        <div class="vue-tag-row">
          <span class="vue-tag">GitHub</span>
          <span class="vue-tag">掘金</span>
          <span class="vue-tag">CSDN</span>
          <span class="vue-tag">B站</span>
          <span class="vue-tag">抖音</span>
        </div>
      </div>
      <div class="vue-card panel-card" style="--i:5">
        <div class="vue-card-title">在线时间</div>
        <div class="vue-card-desc">
          工作日 19:00 - 23:00 在线<br />
          周末全天可沟通<br />
          紧急事务请邮件联系，24小时内回复。
        </div>
      </div>
      <div class="vue-card panel-card" style="--i:6">
        <div class="vue-card-title">合作说明</div>
        <div class="vue-card-desc">
          欢迎技术交流、项目合作与求职机会沟通，无论是前端开发、AI工具落地、
          视觉设计还是视频剪辑相关的需求，都可以随时联系，我会尽快回复。
        </div>
      </div>
    </div>
  `
};


/**
 * ResumePanel — 场景04：个人简历
 * 简历头部 + 教育背景 + 工作经历 + 专业技能 + 项目经验 + 自我评价
 */
const ResumePanel = {
  name: 'ResumePanel',
  template: `
    <div class="resume-panel">
      <div class="vue-card panel-card" style="--i:0">
        <div class="resume-header">
          <div class="resume-name-block">
            <h2>鹿禾 / LuHe</h2>
            <p>Web前端开发 · 全栈实践 · AI增效工程师</p>
          </div>
          <div class="resume-contact-grid">
            <span><strong>所在城市</strong>河北石家庄</span>
            <span><strong>工作性质</strong>全职 / 远程</span>
            <span><strong>电子邮箱</strong>2743591998@qq.com</span>
            <span><strong>GitHub</strong>github.com/LuHeJ/index.git</span>
          </div>
        </div>
      </div>

      <div class="vue-card panel-card" style="--i:1">
        <div class="resume-section-title">教育背景</div>
        <div class="timeline-item">
          <div class="timeline-time">2020.09 - 2023.06</div>
          <div class="timeline-title">计算机应用技术 · 专科</div>
          <div class="timeline-desc">
            主修课程：Web前端开发、数据结构、数据库原理、Python程序设计、C++程序设计、计算机网络、UI设计基础<br />
            专业排名前15%，多次获得学业奖学金，完成多个课程设计与实战项目。
          </div>
        </div>
      </div>

      <div class="vue-card panel-card" style="--i:2">
        <div class="resume-section-title">工作/实习经历</div>
        <div class="timeline-item">
          <div class="timeline-time">2023.03 - 2023.08</div>
          <div class="timeline-title">苏州极豹信息科技有限公司 · 前端开发实习生</div>
          <div class="timeline-desc">
            1. 参与企业官网与内部管理系统的前端开发，基于Vue 3 + Element Plus实现20+业务组件，覆盖数据看板、表单、权限管理等模块；<br />
            2. 配合后端完成接口联调，使用Axios封装统一请求拦截与错误处理，提升接口联调效率约25%；<br />
            3. 负责页面响应式适配与浏览器兼容性优化，覆盖Chrome、Edge、移动端等多端，首屏加载速度提升30%；<br />
            4. 参与代码评审与技术文档编写，协助团队建立前端组件规范。
          </div>
        </div>
      </div>

      <div class="vue-card panel-card" style="--i:3">
        <div class="resume-section-title">专业技能</div>
        <div class="resume-skill-row">
          <div class="resume-skill-name">HTML5 / CSS3</div>
          <div class="resume-skill-bar"><div class="resume-skill-fill" style="width: 90%;"></div></div>
          <div class="resume-skill-level">熟练</div>
        </div>
        <div class="resume-skill-row">
          <div class="resume-skill-name">JavaScript</div>
          <div class="resume-skill-bar"><div class="resume-skill-fill" style="width: 85%;"></div></div>
          <div class="resume-skill-level">熟练</div>
        </div>
        <div class="resume-skill-row">
          <div class="resume-skill-name">Vue 3</div>
          <div class="resume-skill-bar"><div class="resume-skill-fill" style="width: 80%;"></div></div>
          <div class="resume-skill-level">熟练</div>
        </div>
        <div class="resume-skill-row">
          <div class="resume-skill-name">Python</div>
          <div class="resume-skill-bar"><div class="resume-skill-fill" style="width: 70%;"></div></div>
          <div class="resume-skill-level">掌握</div>
        </div>
        <div class="resume-skill-row">
          <div class="resume-skill-name">微信小程序</div>
          <div class="resume-skill-bar"><div class="resume-skill-fill" style="width: 75%;"></div></div>
          <div class="resume-skill-level">掌握</div>
        </div>
        <div class="resume-skill-row">
          <div class="resume-skill-name">AI工具应用</div>
          <div class="resume-skill-bar"><div class="resume-skill-fill" style="width: 85%;"></div></div>
          <div class="resume-skill-level">熟练</div>
        </div>
        <div class="resume-skill-row">
          <div class="resume-skill-name">PS / 剪映</div>
          <div class="resume-skill-bar"><div class="resume-skill-fill" style="width: 80%;"></div></div>
          <div class="resume-skill-level">熟练</div>
        </div>
      </div>

      <div class="vue-card panel-card" style="--i:4">
        <div class="resume-section-title">项目经验</div>
        <div class="timeline-item">
          <div class="timeline-time">2024.01 - 至今</div>
          <div class="timeline-title">个人品牌主页 · 独立开发</div>
          <div class="timeline-desc">
            独立设计并开发响应式个人主页，融合 Canvas 粒子动画、Vue 3 动态路由、毛玻璃 UI 等交互效果，
            完整展示个人技术栈与审美风格，作为求职与技术交流的名片。
          </div>
        </div>
        <div class="timeline-item">
          <div class="timeline-time">2023.09 - 2023.12</div>
          <div class="timeline-title">校园二手交易小程序 · 核心开发</div>
          <div class="timeline-desc">
            使用微信小程序原生框架 + 云开发，实现商品发布、搜索筛选、在线聊天、订单管理等核心功能。
          </div>
        </div>
      </div>

      <div class="vue-card panel-card" style="--i:5">
        <div class="resume-section-title">自我评价</div>
        <div class="vue-card-desc">
          1. 具备扎实的Web前端开发基础，有企业实习项目经验，熟悉完整的前端开发流程与协作规范；<br />
          2. 复合能力突出，覆盖编码开发、视觉设计、AI增效、视频剪辑四大板块，可独立完成从需求到交付的全链路工作；<br />
          3. 学习能力强，对新技术保持高度热情，持续关注前端与AI领域的发展趋势，善于将新工具落地到实际工作中提效；<br />
          4. 工作态度认真负责，注重代码质量与用户体验，具备良好的沟通能力与团队协作意识。
        </div>
      </div>
    </div>
  `
};


/**
         * ============================================================
         * 粒子连线动画系统 (Canvas 2D)
         * - 80 个粒子在画布上缓慢漂移
         * - 距离 < 150px 的粒子之间绘制半透明连线
         * - 鼠标 120px 范围内粒子受到排斥力
         * - 每个粒子有独立的正弦 alpha 脉动周期
         * ============================================================
         */
        const canvasEl = document.getElementById('particle-canvas');
        const ctx = canvasEl.getContext('2d');

        let width, height;
        let particles = [];
        const particleCount = 80;
        const connectDistance = 150;

                /**
         * 调整画布尺寸以匹配视口
         * @returns {void}
         */
        function resize() {
            width = canvasEl.width = window.innerWidth;
            height = canvasEl.height = window.innerHeight;
        }

                /**
         * @class Particle
         * @description 粒子实体 — 自动漂移 + 独立正弦 alpha 脉动周期。
         *              每个粒子有双层渲染：实心核 + 外发光晕。
         *              reset() 用于窗口 resize 时重新随机分布位置。
         */
        class Particle {
            constructor() {
                this.reset();
            }
            reset() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.3;
                this.vy = (Math.random() - 0.5) * 0.3;
                this.radius = Math.random() * 1.5 + 0.5;
                this.alpha = Math.random() * 0.5 + 0.3;
                this.pulseSpeed = Math.random() * 0.02 + 0.005;
                this.pulsePhase = Math.random() * Math.PI * 2;
            }
            update(time) {
                this.x += this.vx;
                this.y += this.vy;
                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;
                this.currentAlpha = this.alpha + Math.sin(time * this.pulseSpeed + this.pulsePhase) * 0.2;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(220, 90, 90, ${this.currentAlpha})`;
                ctx.fill();
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius * 3, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(200, 60, 60, ${this.currentAlpha * 0.15})`;
                ctx.fill();
            }
        }

        /**
         * [代码作用] 初始化粒子数组 — 创建 80 个随机分布的粒子。
         * [怎么做] 清空数组后用 for 循环 push particleCount 个新 Particle 实例。
         * [为什么] 单独函数而非内联：
         *   - 页面加载和窗口 resize 时都需要重新初始化
         *   - 抽取为函数避免代码重复
         *   - 80 个粒子是视觉密度与性能的平衡点（移动端也能跑满 60fps）
         */
        function initParticles() {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }

                /**
         * 绘制粒子间连线 (O(n^2) 邻近检测)
         * @description 距离 < 150px 的粒子对之间绘制半透明红色连线，
         *              透明度随距离线性衰减
         * @returns {void}
         */
        function drawConnections() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < connectDistance) {
                        const alpha = (1 - dist / connectDistance) * 0.25;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(180, 60, 60, ${alpha})`;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                }
            }
        }

        let startTime = Date.now();

        function animate() {
            const time = Date.now() - startTime;
            ctx.clearRect(0, 0, width, height);
            particles.forEach(p => {
                p.update(time);
                p.draw();
            });
            drawConnections();
            requestAnimationFrame(animate);
        }

        let mouseX = -1000;
        let mouseY = -1000;
        /**
         * 鼠标交互 — 粒子排斥力
         * @description 120px 半径内粒子被推离鼠标位置。
         *              排斥力与距离成反比（越近力越大），最大力系数 0.05。
         *              初始 mouseX/mouseY = -1000 确保页面加载时无排斥。
         */
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            particles.forEach(p => {
                const dx = mouseX - p.x;
                const dy = mouseY - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    const force = (120 - dist) / 120 * 0.05;
                    p.vx += (dx / dist) * force;
                    p.vy += (dy / dist) * force;
                }
            });
        });

        
        /**
         * ============================================================
         * HTML5 Audio 音乐控制系统
         * - 播放/暂停切换
         * - 音量滑块双向同步 (UI -> Audio & Audio -> UI)
         * - 按钮 UI 状态随播放状态自动更新
         * - 首次播放需要用户交互 (浏览器自动播放策略)
         * ============================================================
         */
        const bgAudio = document.getElementById('bgAudio');
        const musicPlayBtn = document.getElementById('musicPlayBtn');
        const volumeSlider = document.getElementById('volumeSlider');
        const noteIcon = musicPlayBtn ? musicPlayBtn.querySelector('.note-icon') : null;

        if (bgAudio && volumeSlider) {
            bgAudio.volume = parseInt(volumeSlider.value) / 100;
        }

        /**
         * 同步音乐按钮 UI 与播放状态
         * @description piano 类触发外发光 pulse 动画 + noteBounce 图标跳动。
         *              图标在 ♫（暂停态）和 ♪（播放态）间切换，
         *              title 属性同步更新以提供无障碍提示。
         */
        function updateMusicBtnUI() {
            if (!bgAudio || !musicPlayBtn || !noteIcon) return;
            if (bgAudio.paused) {
                musicPlayBtn.classList.remove('playing');
                noteIcon.textContent = '♫';
                musicPlayBtn.title = '播放背景音乐';
            } else {
                musicPlayBtn.classList.add('playing');
                noteIcon.textContent = '♪';
                musicPlayBtn.title = '暂停背景音乐';
            }
        }

        if (musicPlayBtn && bgAudio) {
            musicPlayBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (bgAudio.paused) {
                    bgAudio.play().then(() => {
                        updateMusicBtnUI();
                    }).catch(err => {
                        console.warn('音乐播放失败（可能需要用户交互）:', err.message);
                    });
                } else {
                    bgAudio.pause();
                    updateMusicBtnUI();
                }
            });
        }

        if (volumeSlider && bgAudio) {
            volumeSlider.addEventListener('input', () => {
                bgAudio.volume = parseInt(volumeSlider.value) / 100;
            });
            volumeSlider.addEventListener('change', () => {
                bgAudio.volume = parseInt(volumeSlider.value) / 100;
            });
        }

        if (bgAudio) {
            bgAudio.addEventListener('play', updateMusicBtnUI);
            bgAudio.addEventListener('pause', updateMusicBtnUI);
            bgAudio.addEventListener('ended', updateMusicBtnUI);
            bgAudio.addEventListener('volumechange', () => {
                if (!volumeSlider) return;
                const volPercent = Math.round(bgAudio.volume * 100);
                if (parseInt(volumeSlider.value) !== volPercent) {
                    volumeSlider.value = volPercent;
                }
            });
        }

        updateMusicBtnUI();

        
        let currentPage = 1;
        const totalPages = 4;

        function updateStatusBar(pageNum) {
            currentPage = pageNum;
            const statusSpan = document.querySelector('.status-bar span');
            if (statusSpan) {
                statusSpan.textContent = `SCENCE ${String(currentPage).padStart(2, '0')} · 主页面`;
            }
        }

        
        const welcomeOverlay = document.getElementById('welcomeOverlay');
        const enterMainBtn = document.getElementById('enterMainBtn');
        const topRightPanel = document.getElementById('topRightPanel');
        const welcomeArea = document.getElementById('welcomeArea');
        const logoEl = document.querySelector('.logo');
        const statusBarEl = document.querySelector('.status-bar');
        const controlsEl = document.querySelector('.controls');
        const sideLineEl = document.querySelector('.side-line');
        const profileCardEl = document.getElementById('profileCard');

        /**
         * [代码作用] allUiElements 数组收集了所有需要在欢迎覆盖层显示时
         *            同步隐藏的固定 UI 元素。
         * [怎么做] 将 7 个 DOM 元素引用放入数组，.filter(Boolean) 过滤掉
         *          可能为 null 的元素（防御性编程）。
         * [为什么] 使用数组统一管理而非逐个操作：
         *   - 添加/移除联动元素只需修改数组
         *   - forEach 批量操作比逐行调用简洁
         *   - .filter(Boolean) 避免因某个元素缺失导致整体失败
         */
        const allUiElements = [
            logoEl,
            topRightPanel,
            welcomeArea,
            statusBarEl,
            controlsEl,
            sideLineEl,
            profileCardEl
        ].filter(Boolean);

        /**
         * 显示欢迎覆盖层 — 所有固定 UI 同步隐藏
         * @description 三重守卫：welcomeOverlay 存在 + 未在 visible 态 + 未在 fading-out 态
         *              overlay-active 类触发 opacity: 0 过渡（1s），与覆盖层 fade-in 同步。
         */
        function showWelcomeOverlay() {
            if (
                welcomeOverlay &&
                !welcomeOverlay.classList.contains('visible') &&
                !welcomeOverlay.classList.contains('fading-out')
            ) {
                welcomeOverlay.classList.add('visible');
                allUiElements.forEach(el => {
                    if (el && !el.classList.contains('overlay-active')) {
                        el.classList.add('overlay-active');
                    }
                });
            }
        }

        window.addEventListener('load', () => {
            setTimeout(showWelcomeOverlay, 300);
        });
        if (document.readyState === 'complete') {
            setTimeout(showWelcomeOverlay, 300);
        }

        if (enterMainBtn && welcomeOverlay) {
            enterMainBtn.addEventListener('click', () => {
                if (welcomeOverlay.classList.contains('visible')) {
                    welcomeOverlay.classList.remove('visible');
                    welcomeOverlay.classList.add('fading-out');
                    allUiElements.forEach(el => {
                        if (el) {
                            el.classList.remove('overlay-active');
                        }
                    });
                    setTimeout(() => {
                        welcomeOverlay.classList.remove('fading-out');
                    }, 1000);
                    if (bgAudio) {
                        bgAudio.play().then(() => {
                            updateMusicBtnUI();
                        }).catch(err => {
                            console.warn('音乐播放失败:', err.message);
                        });
                    }
                }
            });
        }

        
        const enterBtn = document.getElementById('enterBtn');
        const slideMask = document.getElementById('slideMask');

        let touchStartX = 0;
        let touchDragging = false;

        if (enterBtn) {
            enterBtn.addEventListener('click', () => {
                enterSite();
            });
        }
        document.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            touchDragging = true;
        });
        document.addEventListener('touchend', (e) => {
            if (!touchDragging) return;
            const endX = e.changedTouches[0].clientX;
            if (endX - touchStartX > 80) {
                enterSite();
            }
            touchDragging = false;
        });

        let mouseStartX = 0;
        let mouseDown = false;
        document.addEventListener('mousedown', (e) => {
            mouseStartX = e.clientX;
            mouseDown = true;
        });
        document.addEventListener('mouseup', (e) => {
            if (!mouseDown) return;
            if (e.clientX - mouseStartX > 100) {
                enterSite();
            }
            mouseDown = false;
        });

                /**
         * 触发滑动进入动画 -> 打开 Vue 全屏区域
         * @description 1) 激活滑动遮罩 (800ms CSS transition)
         *              2) 动画完成后显示 Vue overlay
         *              3) 如已可见则忽略 (幂等保护)
         * @returns {void}
         */
        function enterSite() {
            // 幂等保护：Vue 区域已可见时不重复触发
            if (window.vueApp && window.vueApp.visible) return;
            // 遮罩从左侧滑入（800ms CSS transition）
            if (slideMask) slideMask.classList.add('active');
            // Vue 立即显示于遮罩上方（z-index 200 > 100），
            // 自身 translateX 入场动画 550ms 同步播放，消除黑屏等待
            if (window.vueApp) {
                window.vueApp.show();
            }
        }

                /**
         * 关闭 Vue 覆盖层
         * @description 遮罩和 Vue 同时开始退出：
         *              遮罩向右滑出（800ms），Vue 向左滑出（400ms leave），
         *              Vue z-index 200 确保在遮罩上方消失，无黑屏间隙。
         * @returns {void}
         */
        function closeVueOverlay() {
            // 遮罩立即开始滑出（800ms CSS transition）
            if (slideMask) slideMask.classList.remove('active');
            // Vue 同时开始隐藏（400ms leave 动画），
            // z-index 200 确保在遮罩上方，遮罩滑出时 Vue 已完成消失
            if (window.vueApp && window.vueApp.visible) {
                window.vueApp.hide();
            }
        }

        
        /**
         * ============================================================
         * 键盘快捷键映射
         * Esc      - 关闭 Vue 覆盖层
         * Space    - 播放/暂停音乐
         * ArrowUp  - 音量 +5%
         * ArrowDown - 音量 -5%
         * ArrowRight - 下一场景
         * ArrowLeft  - 上一场景
         * 欢迎覆盖层可见时所有快捷键忽略
         * ============================================================
         */
        document.addEventListener('keydown', (e) => {
            if (welcomeOverlay && welcomeOverlay.classList.contains('visible')) return;
            if (e.code === 'Escape') {
                if (window.vueApp && window.vueApp.visible) {
                    e.preventDefault();
                    closeVueOverlay();
                    return;
                }
            }
            if (e.code === 'Space' && e.target === document.body && bgAudio) {
                e.preventDefault();
                if (bgAudio.paused) {
                    bgAudio.play().then(updateMusicBtnUI).catch(() => {});
                } else {
                    bgAudio.pause();
                    updateMusicBtnUI();
                }
            }
            if (e.code === 'ArrowUp' && e.target === document.body && volumeSlider && bgAudio) {
                e.preventDefault();
                const newVol = Math.min(100, parseInt(volumeSlider.value) + 5);
                volumeSlider.value = newVol;
                bgAudio.volume = newVol / 100;
            }
            if (e.code === 'ArrowDown' && e.target === document.body && volumeSlider && bgAudio) {
                e.preventDefault();
                const newVol = Math.max(0, parseInt(volumeSlider.value) - 5);
                volumeSlider.value = newVol;
                bgAudio.volume = newVol / 100;
            }
            if (e.code === 'ArrowRight' && e.target === document.body) {
                e.preventDefault();
                if (window.vueApp && window.vueApp.visible && currentPage < totalPages) {
                    const newPage = currentPage + 1;
                    updateStatusBar(newPage);
                    window.vueApp.goToTab(newPage);
                }
            }
            if (e.code === 'ArrowLeft' && e.target === document.body) {
                e.preventDefault();
                if (window.vueApp && window.vueApp.visible && currentPage > 1) {
                    const newPage = currentPage - 1;
                    updateStatusBar(newPage);
                    window.vueApp.goToTab(newPage);
                }
            }
        });

        
        window.addEventListener('resize', () => {
            resize();
            initParticles();
        });
        resize();
        initParticles();
        animate();

        
        /**
         * ============================================================
         * Vue 3 应用 - 全屏覆盖层 SPA
         * 4 个场景面板：关于我 / 技能领域 / 联系方式 / 个人简历
         * 左侧导航栏 + 右侧内容区，panel-fade 过渡动画
         * ============================================================
         */
        if (typeof Vue !== 'undefined') {
            const app = Vue.createApp({
                data() {
                    return {
                        visible: false,
                        currentTab: 1,
                        tabs: [
                            { id: 1, name: '关于我' },
                            { id: 2, name: '技能领域' },
                            { id: 3, name: '联系方式' },
                            { id: 4, name: '个人简历' },
                        ],
                    };
                },
                computed: {
                    currentTabData() {
                        return this.tabs.find(t => t.id === this.currentTab) || this.tabs[0];
                    },
                },
                methods: {
                    show() {
                        this.visible = true;
                        updateStatusBar(this.currentTab);
                        document.body.style.overflow = 'hidden';
                    },
                                        /** 隐藏覆盖层 + 恢复 body 滚动 */
                    hide() {
                        this.visible = false;
                        document.body.style.overflow = '';
                    },
                                        /** 关闭按钮处理 -> 委托给全局 closeVueOverlay() */
                    closeOverlay() {
                        closeVueOverlay();
                    },
                                        /**
                     * 切换到指定标签页
                     * @param {number} id - 目标标签页 ID (1-4)
                     */
                    goToTab(id) {
                        this.currentTab = id;
                        updateStatusBar(id);
                    },
                },
                watch: {
                    currentTab(newVal) {
                        updateStatusBar(newVal);
                    },
                                        /** 覆盖层关闭时恢复 body 滚动 */
                    visible(newVal) {
                        if (!newVal) {
                            document.body.style.overflow = '';
                        }
                    },
                },
                mounted() {
                    console.log('🟢 Vue 3 应用已挂载');
                },
            });

            // 注册 4 个面板组件
            if (typeof AboutPanel   !== 'undefined') app.component('about-panel',   AboutPanel);
            if (typeof SkillsPanel  !== 'undefined') app.component('skills-panel',  SkillsPanel);
            if (typeof ContactPanel !== 'undefined') app.component('contact-panel', ContactPanel);
            if (typeof ResumePanel  !== 'undefined') app.component('resume-panel',  ResumePanel);

            const vueInstance = app.mount('#vue-app');
            window.vueApp = vueInstance;
        } else {
            console.error('❌ Vue 3 未能加载，请检查网络或CDN地址');
        }

        // 开发诊断日志：确认全部初始化完成
        console.log('🖤 LuHe 个人主页已就绪');
