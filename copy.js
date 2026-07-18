(function() {
            
            /**
         * ============================================================
         * 欢迎弹窗状态机
         * init-state -> show-content (内容淡入) -> slide-out (左滑) -> hidden-final (隐藏)
         * 主内容在弹窗滑出时同步从右侧滑入
         * ============================================================
         */
        const welcomeOverlay = document.getElementById('welcomeOverlay');
            const welcomeContent = document.getElementById('welcomeContent');
            const welcomeEnterBtn = document.getElementById('welcomeEnterBtn');
            const scrollEnterBtn = document.getElementById('scrollEnterBtn');
            const mainWrapper = document.getElementById('mainWrapper');

            /** 欢迎弹窗关闭标记 — 防止 dismissWelcome() 被重复调用 */
            let welcomeDismissed = false;

            
                    /**
         * 初始化欢迎弹窗动画时序
         * @description 50ms 后移除 init-state 触发背景渐变到毛玻璃 (1.2s)，
         *              100ms 后添加 show-content 触发文字淡入
         * @returns {void}
         */
        function initWelcomeOverlay() {
                
                
                setTimeout(() => {
                    welcomeOverlay.classList.remove('init-state');
                }, 50);

                
                setTimeout(() => {
                    welcomeOverlay.classList.add('show-content');
                }, 100);
            }

            
                    /**
         * 关闭欢迎弹窗
         * @description 弹窗左滑 + 主内容右滑入 + 动画完成后恢复 body 滚动
         *              welcomeDismissed 标记防止重复触发
         * @returns {void}
         */
        function dismissWelcome() {
                if (welcomeDismissed) return;
                welcomeDismissed = true;

                
                welcomeOverlay.classList.add('slide-out');

                
                setTimeout(() => {
                    mainWrapper.classList.add('slide-in');
                }, 80);

                
                setTimeout(() => {
                    welcomeOverlay.classList.add('hidden-final');
                    document.body.style.overflow = '';
                }, 750);
            }

            
            welcomeEnterBtn.addEventListener('click', () => {
                dismissWelcome();
            });

            
            scrollEnterBtn.addEventListener('click', () => {
                const skillsSection = document.getElementById('skills');
                if (skillsSection) {
                    skillsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });

            
                    /**
         * 滚动观察器 — 从右侧滑入动画
         * @description rootMargin: -30px 使元素在即将进入视口时提前触发，
         *              threshold: 0.08 只需 8% 可见即触发
         */
        const animateSections = document.querySelectorAll('.animate-section');
            const sectionObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    const section = entry.target;
                    if (entry.isIntersecting) {
                        section.classList.add('in-view');
                    }
                });
            }, { root: null, rootMargin: '-30px 0px -30px 0px', threshold: 0.08 });

            animateSections.forEach(section => sectionObserver.observe(section));

            
            /**
         * ============================================================
         * 粒子动画系统 (Canvas 2D)
         * - HSL 色相范围 340-360 (红色系)，匹配设计主题
         * - 粒子环绕屏幕边缘移动 (toroidal wrapping)
         * - opacity 呼吸式脉动 (0.1-0.7)
         * - 数量根据屏幕面积动态计算 (上限 120)
         * ============================================================
         */
        const canvas = document.getElementById('particles-canvas');
            const ctx = canvas.getContext('2d');
            let particles = [];
            let animationId;

            function resizeCanvas() {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
            resizeCanvas();
            window.addEventListener('resize', () => {
                resizeCanvas();
                initParticles();
            });

            /**
             * @class Particle
             * @description 粒子实体 — HSL 色相 340-360（红色谱）匹配设计主题。
             *              环绕屏幕边缘移动（toroidal wrapping），
             *              带 opacity 呼吸式脉动（0.1 ~ 0.7）。
             */
            class Particle {
                constructor() {
                    this.reset();
                }
                /** 随机初始化粒子属性 */
                reset() {
                    this.x = Math.random() * canvas.width;          // 随机 X 坐标
                    this.y = Math.random() * canvas.height;         // 随机 Y 坐标
                    this.size = Math.random() * 1.8 + 0.4;          // 粒子大小 (0.4 ~ 2.2)
                    this.speedX = (Math.random() - 0.5) * 0.35;    // X 方向漂移速度
                    this.speedY = (Math.random() - 0.5) * 0.35;    // Y 方向漂移速度
                    this.opacity = Math.random() * 0.5 + 0.2;      // 基础透明度 (0.2 ~ 0.7)
                    this.opacitySpeed = (Math.random() - 0.5) * 0.008; // 透明度呼吸速率
                    this.hue = Math.random() * 20 + 340;            // HSL 色相 340~360（红色谱）
                }
                /** 更新位置 + 呼吸式透明度脉动 + 环绕屏幕边缘 */
                update() {
                    this.x += this.speedX;
                    this.y += this.speedY;
                    this.opacity += this.opacitySpeed;
                    // 透明度在 0.1~0.7 之间往复，到达边界时反转方向
                    if (this.opacity > 0.7) this.opacitySpeed = -Math.abs(this.opacitySpeed);
                    if (this.opacity < 0.1) this.opacitySpeed = Math.abs(this.opacitySpeed);
                    // Toroidal wrapping: +20/-20 缓冲区确保粒子完全移出后再瞬移
                    if (this.x < -20) this.x = canvas.width + 20;
                    if (this.x > canvas.width + 20) this.x = -20;
                    if (this.y < -20) this.y = canvas.height + 20;
                    if (this.y > canvas.height + 20) this.y = -20;
                }
                /** 双层渲染：实心核 + 2.5x 外发光晕 */
                draw() {
                    // 内层：实心粒子核，饱和度 70%，亮度 65%
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                    ctx.fillStyle = `hsla(${this.hue}, 70%, 65%, ${this.opacity})`;
                    ctx.fill();
                    // 外层：2.5 倍半径柔光晕，alpha 仅为核心 12%
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size * 2.5, 0, Math.PI * 2);
                    ctx.fillStyle = `hsla(${this.hue}, 70%, 65%, ${this.opacity * 0.12})`;
                    ctx.fill();
                }
            }

                    /**
         * 根据屏幕面积动态计算粒子数量 (上限 120)
         * @returns {void}
         */
        function initParticles() {
                const count = Math.min(Math.floor((canvas.width * canvas.height) / 10000), 120);
                particles = [];
                for (let i = 0; i < count; i++) particles.push(new Particle());
            }

                    /**
         * 粒子间连线 — 距离 < 130px 绘制半透明红色线段
         * @returns {void}
         */
        function connectParticles() {
                const maxDist = 130;
                for (let i = 0; i < particles.length; i++) {
                    for (let j = i + 1; j < particles.length; j++) {
                        const dx = particles[i].x - particles[j].x;
                        const dy = particles[i].y - particles[j].y;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        if (dist < maxDist) {
                            const opacity = (1 - dist / maxDist) * 0.12;
                            ctx.beginPath();
                            ctx.moveTo(particles[i].x, particles[i].y);
                            ctx.lineTo(particles[j].x, particles[j].y);
                            ctx.strokeStyle = `rgba(229,57,53,${opacity})`;
                            ctx.lineWidth = 0.6;
                            ctx.stroke();
                        }
                    }
                }
            }

                    /**
         * requestAnimationFrame 渲染循环
         * @returns {void}
         */
        function animate() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                particles.forEach(p => {
                    p.update();
                    p.draw();
                });
                connectParticles();
                animationId = requestAnimationFrame(animate);
            }

            initParticles();
            animate();

            
            initWelcomeOverlay();

            
            document.body.style.overflow = 'hidden';

            
                    /**
         * 页面卸载前清理 — 取消动画帧 + 断开观察器
         */
        window.addEventListener('beforeunload', () => {
                cancelAnimationFrame(animationId);
                sectionObserver.disconnect();
            });

            // 开发诊断日志
            console.log('%c👋 你好！欢迎来到鹿禾的个人主页 %c✨',
                'font-size:1.2em;font-weight:bold;color:#ff6659;font-family:"VT323",monospace;');
            // 页面初始化诊断日志
            console.log('%c在黑红夜色中，很高兴遇见你。', 'color:#b8b8b8;');
            console.log('%cSCENCE 01 主 IDLE LOOP — 已就绪', 'color:#6b6b6b;font-style:italic;');
            // 页面转场说明
            console.log('%c页面转场动画：旧页左滑 → 新页从右侧滑入', 'color:#ff6659;font-size:0.85em;');
            console.log('%c所有内容区域均从右侧进入 ✨', 'color:#ff6659;font-size:0.85em;');
        })();
