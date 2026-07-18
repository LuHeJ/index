/**
         * ============================================================
         * 粒子连线动画系统 (Canvas 2D)
         * - 80 个粒子在画布上缓慢漂移
         * - 距离 < 150px 的粒子之间绘制半透明连线
         * - 鼠标 120px 范围内粒子受到排斥力
         * ============================================================
         */
        const canvasEl = document.getElementById('particle-canvas');
    const ctx = canvasEl.getContext('2d');

    let width, height;
    let particles = [];
    const particleCount = 80;
    const connectDistance = 150;

            /** 调整画布尺寸以匹配视口 */
        function resize() {
        width = canvasEl.width = window.innerWidth;
        height = canvasEl.height = window.innerHeight;
    }

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

            /** 初始化粒子数组 */
        function initParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

            /**
         * 绘制粒子间连线 — O(n^2) 邻近检测
         * @description 距离 < 150px 的粒子对绘制半透明连线，透明度随距离衰减
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
            /** 鼠标交互 - 120px 范围内粒子受排斥力 */
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
         * ============================================================
         */
        const bgAudio = document.getElementById('bgAudio');
    const musicPlayBtn = document.getElementById('musicPlayBtn');
    const volumeSlider = document.getElementById('volumeSlider');
    const noteIcon = musicPlayBtn.querySelector('.note-icon');

    bgAudio.volume = parseInt(volumeSlider.value) / 100;

            /** 同步音乐按钮 UI 与播放状态 */
        function updateMusicBtnUI() {
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

    volumeSlider.addEventListener('input', () => {
        bgAudio.volume = parseInt(volumeSlider.value) / 100;
    });
    volumeSlider.addEventListener('change', () => {
        bgAudio.volume = parseInt(volumeSlider.value) / 100;
    });

    bgAudio.addEventListener('play', updateMusicBtnUI);
    bgAudio.addEventListener('pause', updateMusicBtnUI);
    bgAudio.addEventListener('ended', updateMusicBtnUI);
    bgAudio.addEventListener('volumechange', () => {
        const volPercent = Math.round(bgAudio.volume * 100);
        if (parseInt(volumeSlider.value) !== volPercent) {
            volumeSlider.value = volPercent;
        }
    });

    updateMusicBtnUI();

    
    /**
         * ============================================================
         * 页面导航指示器 (test.html 独有)
         * 4 个横条 dash 对应 Vue 的 4 个标签页，
         * 点击 dash -> 更新 active 状态 + 同步 Vue currentTab
         * Vue tab 变化时也回写 dash 状态 (双向绑定)
         * ============================================================
         */
        const navDashes = document.querySelectorAll('.nav-dash');
    let currentPage = 1;
    const totalPages = navDashes.length;

            /**
         * 更新 dash 激活态 + 状态栏文字
         * @param {number} pageNum - 场景编号 (1-4)
         */
        function updateDashActive(pageNum) {
        currentPage = pageNum;
        navDashes.forEach(d => {
            const p = parseInt(d.getAttribute('data-page'));
            d.classList.toggle('active', p === pageNum);
            d.title = p === pageNum ?
                `场景 ${String(p).padStart(2, '0')} · 当前` :
                `场景 ${String(p).padStart(2, '0')}`;
        });
        document.getElementById('pageNavIndicator').title =
            `页面导航 · 当前第${currentPage}页 / 共${totalPages}页`;
        const statusSpan = document.querySelector('.status-bar span');
        if (statusSpan) {
            statusSpan.textContent =
                `SCENCE ${String(currentPage).padStart(2, '0')} 主 IDLE LOOP`;
        }
    }

    navDashes.forEach(dash => {
        dash.addEventListener('click', () => {
            const pageNum = parseInt(dash.getAttribute('data-page'));
            if (pageNum === currentPage && !window.vueApp?.visible) return;
            updateDashActive(pageNum);
            
            if (window.vueApp && window.vueApp.visible) {
                window.vueApp.goToTab(pageNum);
            }
            console.log(`导航到第 ${currentPage} 页（共 ${totalPages} 页）`);
        });
    });

    
    const welcomeOverlay = document.getElementById('welcomeOverlay');
    const enterMainBtn = document.getElementById('enterMainBtn');
    const topRightPanel = document.getElementById('topRightPanel');
    const welcomeArea = document.getElementById('welcomeArea');
    const logoEl = document.querySelector('.logo');
    const statusBarEl = document.querySelector('.status-bar');
    const controlsEl = document.querySelector('.controls');
    const sideLineEl = document.querySelector('.side-line');
    const profileCardEl = document.getElementById('profileCard');

    
    const allUiElements = [
        logoEl,
        topRightPanel,
        welcomeArea,
        statusBarEl,
        controlsEl,
        sideLineEl,
        profileCardEl
    ];

    
            /**
         * 显示欢迎覆盖层 + 隐藏所有固定 UI 元素
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
            bgAudio.play().then(() => {
                updateMusicBtnUI();
                console.log('🎵 背景音乐开始播放');
            }).catch(err => {
                console.warn('音乐播放失败:', err.message);
            });
            console.log('欢迎覆盖层已关闭，所有UI元素已淡入，进入主页。');
        }
    });

    
    const enterBtn = document.getElementById('enterBtn');
    const slideMask = document.getElementById('slideMask');

    let touchStartX = 0;
    let touchDragging = false;

    enterBtn.addEventListener('click', () => {
        enterSite();
    });
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
         * 触发滑动进入 -> 打开 Vue 全屏区域
         * @description 如音乐未播放则自动开始播放
         */
        function enterSite() {
        
        if (window.vueApp && window.vueApp.visible) return;
        slideMask.classList.add('active');
        if (bgAudio.paused) {
            bgAudio.play().then(updateMusicBtnUI).catch(() => {});
        }
        
        setTimeout(() => {
            if (window.vueApp) {
                window.vueApp.show();
                console.log('🖥 Vue 内容区域已打开');
            }
        }, 800);
    }

    
            /**
         * 关闭 Vue 覆盖层 (供 Vue 内部调用)
         */
        function closeVueOverlay() {
        if (window.vueApp && window.vueApp.visible) {
            window.vueApp.hide();
        }
        
        setTimeout(() => {
            slideMask.classList.remove('active');
        }, 450);
    }

    
    /**
         * ============================================================
         * 键盘快捷键
         * Esc / Space / ArrowUp / ArrowDown / ArrowLeft / ArrowRight
         * 欢迎覆盖层可见时忽略
         * ============================================================
         */
        document.addEventListener('keydown', (e) => {
        
        if (welcomeOverlay.classList.contains('visible')) {
            return;
        }
        
        if (e.code === 'Escape') {
            if (window.vueApp && window.vueApp.visible) {
                e.preventDefault();
                closeVueOverlay();
                return;
            }
        }
        if (e.code === 'Space' && e.target === document.body) {
            e.preventDefault();
            if (bgAudio.paused) {
                bgAudio.play().then(updateMusicBtnUI).catch(() => {});
            } else {
                bgAudio.pause();
                updateMusicBtnUI();
            }
        }
        if (e.code === 'ArrowUp' && e.target === document.body) {
            e.preventDefault();
            const newVol = Math.min(100, parseInt(volumeSlider.value) + 5);
            volumeSlider.value = newVol;
            bgAudio.volume = newVol / 100;
        }
        if (e.code === 'ArrowDown' && e.target === document.body) {
            e.preventDefault();
            const newVol = Math.max(0, parseInt(volumeSlider.value) - 5);
            volumeSlider.value = newVol;
            bgAudio.volume = newVol / 100;
        }
        if (e.code === 'ArrowRight' && e.target === document.body && currentPage < totalPages) {
            e.preventDefault();
            const nextDash = document.querySelector(`.nav-dash[data-page="${currentPage + 1}"]`);
            if (nextDash) nextDash.click();
        }
        if (e.code === 'ArrowLeft' && e.target === document.body && currentPage > 1) {
            e.preventDefault();
            const prevDash = document.querySelector(`.nav-dash[data-page="${currentPage - 1}"]`);
            if (prevDash) prevDash.click();
        }
    });

    
    window.addEventListener('resize', () => {
        resize();
        initParticles();
    });
    resize();
    initParticles();
    animate();

    
    const vueApp = Vue.createApp({
        data() {
            return {
                visible: false,
                currentTab: 1,
                tabs: [
                    { id: 1, name: '关于我' },
                    { id: 2, name: '项目作品' },
                    { id: 3, name: '技能领域' },
                    { id: 4, name: '联系方式' },
                ],
                projects: [
                    {
                        id: 1,
                        title: '智能图像生成器',
                        desc: '基于扩散模型的AI图像生成工具，支持文本到图像、图像到图像的转换。提供直观的Web界面，支持批量处理和实时预览。',
                        techs: ['Python', 'PyTorch', 'FastAPI', 'Vue.js', 'Docker'],
                    },
                    {
                        id: 2,
                        title: '个人知识管理系统',
                        desc: '一个以图谱为核心的知识管理平台，支持Markdown笔记、双向链接和可视化知识网络。',
                        techs: ['TypeScript', 'React', 'Neo4j', 'Node.js', 'GraphQL'],
                    },
                    {
                        id: 3,
                        title: '3D场景编辑器',
                        desc: '基于Three.js的在线3D场景编辑工具，支持模型导入、材质编辑和光照调整，导出为GLB格式。',
                        techs: ['Three.js', 'WebGL', 'Vue 3', 'Blender API'],
                    },
                    {
                        id: 4,
                        title: '实时协作白板',
                        desc: '支持多人实时协作的在线白板应用，具备画笔、图形、文本和便签等工具，使用WebSocket同步。',
                        techs: ['Canvas API', 'WebSocket', 'Express', 'Redis', 'Svelte'],
                    },
                ],
                skillGroups: [
                    {
                        category: '前端开发',
                        description: '构建响应式、高性能的用户界面，注重交互体验与视觉细节。',
                        skills: ['HTML/CSS', 'JavaScript', 'Vue 3', 'React', 'Three.js', 'Tailwind CSS', 'GSAP'],
                    },
                    {
                        category: '后端与AI',
                        description: '设计可扩展的服务架构，并将AI模型部署为可用API。',
                        skills: ['Python', 'Node.js', 'FastAPI', 'PyTorch', 'LangChain', 'Docker', 'RESTful API'],
                    },
                    {
                        category: '工具与设计',
                        description: '使用现代工具链提升开发效率与设计品质。',
                        skills: ['Figma', 'Git', 'Linux', 'Vite', 'Webpack', 'CI/CD', 'Blender'],
                    },
                ],
                contacts: [
                    { label: '电子邮箱', value: 'luhe@example.com', link: 'mailto:luhe@example.com' },
                    { label: 'GitHub', value: 'github.com/luhe-miao', link: 'https://github.com' },
                    { label: '微信', value: 'LuHe_Miao', link: null },
                    { label: '所在地', value: '中国 · 石家庄', link: null },
                ],
            };
        },
        computed: {
            currentTabData() {
                return this.tabs.find(t => t.id === this.currentTab) || this.tabs[0];
            },
                                /** @returns {number} 技能标签总数 */
                    totalSkillCount() {
                return this.skillGroups.reduce((sum, group) => sum + group.skills.length, 0);
            },
        },
        methods: {
            show() {
                this.visible = true;
                
                updateDashActive(this.currentTab);
                document.body.style.overflow = 'hidden';
            },
                                /** 隐藏覆盖层 + 恢复滚动 */
                    hide() {
                this.visible = false;
                document.body.style.overflow = '';
            },
                                /** 关闭按钮 */
                    closeOverlay() {
                closeVueOverlay();
            },
                                /**
                     * 切换标签页 + 同步外部 dash
                     * @param {number} id - 标签页 ID (1-4)
                     */
                    goToTab(id) {
                this.currentTab = id;
                
                updateDashActive(id);
            },
        },
        watch: {
            currentTab(newVal) {
                
                updateDashActive(newVal);
            },
                                visible(newVal) {
                if (!newVal) {
                    
                    document.body.style.overflow = '';
                }
            },
        },
        mounted() {
            console.log('🟢 Vue 3 应用已挂载，等待"向右滑动进入"触发...');
        },
    });

    
    const vueInstance = vueApp.mount('#vue-app');
    window.vueApp = vueInstance;

    // 开发诊断日志 — 完整初始化流程说明
    console.log('🖤 LuHe / miao~ 主页已就绪');
    console.log('  初始状态：仅显示背景（粒子/网格/暗角）');
    console.log('  页面加载后显示欢迎覆盖层（"别来无恙啊"）');
    console.log('  点击"进入主页"后：覆盖层淡出，所有UI元素淡入');
    console.log('  点击"向右滑动进入"或滑动 → 遮罩动画 → Vue全屏区域打开');
    console.log('  Vue区域：4个场景面板 · 左侧导航 · 右侧内容');
    console.log('  右上角 · 音乐控制器 | 页面导航（与Vue内部联动）');
    console.log('  右下角 · 个人信息卡（PROFILE）');
    console.log('  快捷键：空格=播放/暂停 | ↑↓=音量 | ←→=切换场景 | ESC=关闭Vue区域');
    console.log('  音乐系统：HTML5 Audio（替换 src 即可使用自己的音乐）');
    console.log('  英文字体：VT323（等宽像素风格）');
    console.log('  Vue 3 驱动的内容面板 · 响应式数据 · 过渡动画');
