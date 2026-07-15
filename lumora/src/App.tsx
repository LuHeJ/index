/**
 * @file App.tsx
 * @description Lumora — 沉浸式专注力应用首屏。全屏视频背景轮播、
 *              液态玻璃 UI、响应式导航与暗色模式切换。
 * @stack React 18 + TypeScript + Tailwind CSS + Lucide Icons
 */

import { useState, useCallback } from 'react';
import { Menu, X } from 'lucide-react';

/**
 * 背景视频素材列表
 * @description 4 段全屏循环视频，分别对应不同自然场景氛围。
 *              第 3 段（Deep Woods）触发全局暗色模式。
 */
const VIDEOS = [
  {
    url: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_081127_0992a171-d3c6-4978-8213-0ec5df8b6d63.mp4',
    label: 'Golden Hour',
  },
  {
    url: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_092026_dd05b805-ea0f-40b2-8c52-332b88502592.mp4',
    label: 'Still Water',
  },
  {
    url: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_081042_df7202bf-bd80-4b2b-bbc6-1f09ba2870e9.mp4',
    label: 'Deep Woods',
  },
  {
    url: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_080959_4cac5234-3573-464e-a5b7-76b94b8a7d61.mp4',
    label: 'Quiet Dawn',
  },
] as const;

/** 桌面端导航链接 */
const NAV_LINKS = ['How It Works', 'Features', 'Pricing', 'Community'];

/** 底部统计栏数据（移动端隐藏竖线分隔符） */
const STATS = [
  '60+ Deep Sessions',
  '12,000+ Creators',
  '4.8 User Satisfaction',
  'Intentional-First Design',
];

/**
 * Figma 导出的透明 PNG 覆盖层
 * @description 置于视频层之上 (z-10)，通过 train-bob 动画产生微妙的浮动感，
 *              增加画面层次与质感。
 */
const OVERLAY_PNG =
  'https://soft-zoom-63098134.figma.site/_assets/v11/0b4a435b2df2747593c43d7a1c9b4578f7d8d90c.png';

/**
 * Lumora 首屏组件
 * @description 全屏沉浸式 Hero Section，包含：
 *              - 4 段视频背景轮播（1000ms 渐变过渡）
 *              - 液态玻璃 UI 效果
 *              - 响应式导航（桌面端 pill 导航 / 移动端汉堡菜单）
 *              - 邮箱注册表单
 *              - "Deep Woods" 视频触发暗色模式
 * @returns {JSX.Element} 全屏 section 元素
 */
export default function App() {
  /**
   * [状态] activeVideo — 当前激活的视频索引 (0-3)。
   * [怎么做] useState(0) 初始化为 Golden Hour（暖色调第一印象）。
   * [为什么] 用数字索引而非视频对象引用：
   *   - 方便比较和切换（activeVideo === 2 触发暗色模式）
   *   - 数组索引天然支持 prev/next 操作
   */
  const [activeVideo, setActiveVideo] = useState(0);
  /**
   * [状态] isTransitioning — 视频切换冷却锁。
   * [怎么做] 切换开始时设为 true，1000ms 后恢复 false。
   * [为什么] 1000ms 与 CSS transition-duration 精确匹配。
   *          冷却期间忽略所有点击，防止快速切换导致动画叠加混乱。
   */
  const [isTransitioning, setIsTransitioning] = useState(false);
  /**
   * [状态] mobileMenuOpen — 移动端全屏菜单的开关。
   * [怎么做] 汉堡按钮 onClick 切换布尔值，条件渲染全屏 overlay。
   * [为什么] 独立状态而非 CSS-only（如 :checked checkbox hack）：
   *          需要控制 body 滚动锁定、背景模糊等副作用。
   */
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  /**
   * [状态] email — 邮箱输入框的受控值。
   * [怎么做] value={email} + onChange 更新，React 受控组件模式。
   * [为什么] 受控组件让表单值成为 React state 的单一真相来源，
   *          便于在 handleSubmit 中读取和验证。
   */
  const [email, setEmail] = useState('');

  /**
   * [派生状态] isDark — 视频索引 2 (Deep Woods) 触发暗色模式。
   *
   * [怎么做] 简单的布尔等式 activeVideo === 2，返回 true/false。
   *          结果用于：
   *            1. 在 hero div 上添加 'dark' CSS 类 → 级联到 .dark .liquid-glass
   *            2. 计算 textColor（白色 → #182C41 深蓝）
   *            3. hero-content 元素的 color transition (700ms)
   *
   * [为什么] 硬编码索引 2 = Deep Woods：
   *   - 简单直接，无需额外配置
   *   - 如果视频顺序改变，只需修改这一个数字
   *   - #182C41 取自 Deep Woods 森林视频的主色调，
   *     在亮色背景（视频）上文字需要深色才可读
   */
  const isDark = activeVideo === 2;
  /**
   * [派生状态] textColor — 根据暗色模式动态计算文字颜色。
   * [怎么做] 三元表达式：isDark ? '#182C41' : '#ffffff'。
   * [为什么] 作为 inline style 传递而非 CSS 类：
   *   - 颜色需要同时在多个元素上使用（badge/heading/subtext/input/button）
   *   - 且作为文字颜色和按钮背景色的双用途
   *   - CSS 变量方案也可以，但 inline style 更直观地表达"颜色由 JS 控制"
   */
  const textColor = isDark ? '#182C41' : '#ffffff';

  /**
   * [代码作用] 视频切换的核心逻辑 — 带冷却保护的 crossfade 过渡。
   *
   * [怎么做]
   *   1. 守卫检查：如果点击的是当前视频或正在过渡中 → 忽略
   *   2. setIsTransitioning(true) 锁定 1000ms
   *   3. setActiveVideo(index) 切换视频 → CSS opacity transition 自动触发 crossfade
   *   4. setTimeout 1000ms 后解锁
   *
   * [为什么用 useCallback]
   *   useCallback 配合 [activeVideo, isTransitioning] 依赖数组，
   *   确保回调引用在依赖不变时保持稳定，避免子组件不必要的重渲染。
   *
   * [为什么 1000ms cooling]
   *   视频 opacity transition-duration 为 1000ms（inline style），
   *   冷却必须 ≥ transition 时长，否则用户可以在过渡进行中再次点击。
   *
   * @param {number} index - 目标视频索引 (0-3)
   */
  const switchVideo = useCallback(
    (index: number) => {
      if (index === activeVideo || isTransitioning) return;
      setIsTransitioning(true);
      setActiveVideo(index);
      setTimeout(() => setIsTransitioning(false), 1000);
    },
    [activeVideo, isTransitioning],
  );

  /**
   * 邮箱表单提交处理
   * @description 当前为占位实现，接入自己的注册流程时在此处替换。
   * @param {React.FormEvent} e - 表单提交事件
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      {/* ===== 视频背景层 ===== */}
      {VIDEOS.map((v, i) => (
        <video
          key={v.url}
          autoPlay
          muted
          loop
          playsInline
          className={`absolute inset-0 w-full h-full object-cover transition-opacity ${
            i === activeVideo ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionDuration: '1000ms', transitionTimingFunction: 'ease-in-out' }}
        >
          <source src={v.url} type="video/mp4" />
        </video>
      ))}

      {/* ===== PNG 纹理覆盖层 (z-10) ===== */}
      <img
        src={OVERLAY_PNG}
        alt=""
        className="absolute inset-0 w-full h-full object-cover z-10 pointer-events-none animate-train-bob"
      />

      {/* ===== 内容层 (z-20) ===== */}
      <div className="relative z-20 flex flex-col h-full">
        {/* ===== 导航栏 ===== */}
        <nav className="flex items-center justify-between px-6 sm:px-10 lg:px-14 pt-8">
          {/* Logo */}
          <span className="text-white italic text-xl sm:text-2xl" style={{ fontFamily: "'Instrument Serif', serif" }}>
            Lumora
          </span>

          {/* 桌面端导航 pill（液态玻璃容器） */}
          <div className="hidden md:flex items-center gap-1 liquid-glass rounded-full px-2 py-1.5">
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                className="text-white/90 hover:text-white text-sm px-4 py-1.5 rounded-full transition-colors"
                style={{ fontFamily: 'system-ui, sans-serif' }}
              >
                {link}
              </button>
            ))}
            <button
              className="bg-white text-black text-sm px-5 py-2 rounded-full font-medium ml-2 hover:bg-white/90 transition-colors"
              style={{ fontFamily: 'system-ui, sans-serif' }}
            >
              Get Started
            </button>
          </div>

          {/* 移动端汉堡菜单按钮 — Menu 和 X 图标叠加，通过 opacity/rotate 实现交叉淡入淡出 */}
          <button
            className="md:hidden liquid-glass rounded-full p-2.5 text-white"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <div className="relative w-5 h-5">
              <Menu
                size={20}
                className={`absolute inset-0 transition-all duration-300 ${
                  mobileMenuOpen ? 'opacity-0 rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100'
                }`}
              />
              <X
                size={20}
                className={`absolute inset-0 transition-all duration-300 ${
                  mobileMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-75'
                }`}
              />
            </div>
          </button>
        </nav>

        {/* 上间距：将 Hero 内容推至垂直居中 */}
        <div className="flex-1" />

        {/* ===== Hero 内容区 ===== */}
        <div
          {/* dark 类应用于此 div，向下级联到 .dark .liquid-glass 等规则 */}
          className={`px-6 sm:px-10 lg:px-14 flex flex-col items-center text-center ${
            isDark ? 'dark' : ''
          }`}
        >
          {/* 社交证明 Badge */}
          <div className="liquid-glass rounded-full inline-flex px-5 py-2 mb-8">
            <span
              className="text-sm tracking-wide hero-content"
              style={{ color: textColor, fontFamily: 'system-ui, sans-serif' }}
            >
              Over 10,000 minds already finding their clarity
            </span>
          </div>

          {/* 主标题 — 双 br 实现响应式断行：
              sm:hidden br 仅在移动端换行，hidden sm:inline br 仅在桌面端换行。
              结果：移动端 "Clarity in an Endlessly" / "Noisy Universe"
                    桌面端 "Clarity in an Endlessly" / "Noisy Universe" */}
          <h1
            className="text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.1] max-w-4xl font-normal hero-content tracking-tight"
            style={{ color: textColor }}
          >
            Clarity in an Endlessly{' '}
            <br className="sm:hidden" />
            <span className="hidden sm:inline"><br /></span>
            Noisy Universe
          </h1>

          {/* 副标题 — 暗色模式下透明度略降 */}
          <p
            className="max-w-xl leading-relaxed mt-6 mb-8 text-base sm:text-lg hero-content"
            style={{ color: textColor, fontFamily: 'system-ui, sans-serif', opacity: isDark ? 0.8 : 0.85 }}
          >
            Rise above the chaos of pings, infinite scrolling, and relentless
            demands. Discover how to protect your presence and create with
            intention.
          </p>

          {/* 邮箱注册表单 — 液态玻璃容器 + 动态按钮颜色 */}
          <form
            onSubmit={handleSubmit}
            className="liquid-glass rounded-full flex items-center w-full max-w-[320px] sm:max-w-sm mb-10 p-0.5"
          >
            <input
              type="email"
              placeholder="Your Best Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none px-5 py-3 text-sm hero-content placeholder:opacity-50"
              style={{
                color: textColor,
                fontFamily: 'system-ui, sans-serif',
              }}
            />
            <button
              type="submit"
              className="rounded-full px-6 py-3 text-sm font-medium transition-opacity hover:opacity-90 shrink-0"
              style={{
                backgroundColor: textColor,
                color: isDark ? '#ffffff' : '#000000',
                fontFamily: 'system-ui, sans-serif',
              }}
            >
              Get Early Access
            </button>
          </form>

          {/* 视频切换按钮组 — 激活态底部边框 + 高亮，非激活态 50% 透明度 */}
          <div
            className="flex items-center gap-6 sm:gap-8 mb-8"
            style={{ fontFamily: 'system-ui, sans-serif' }}
          >
            {VIDEOS.map((v, i) => (
              <button
                key={v.label}
                onClick={() => switchVideo(i)}
                disabled={isTransitioning}
                className={`video-switch-btn text-sm tracking-wide pb-1 ${
                  i === activeVideo ? 'active' : 'inactive'
                }`}
                style={{ color: textColor }}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>

        {/* 下间距：将 Stats 推至底部 */}
        <div className="flex-1" />

        {/* ===== 底部统计栏 =====
            移动端：直接换行排列，无分隔符
            桌面端：竖线 | 分隔符（hidden sm:inline），节省移动端空间 */}
        <div
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-0 px-6 pb-6 text-white/70 text-xs sm:text-sm"
          style={{ fontFamily: 'system-ui, sans-serif' }}
        >
          {STATS.map((stat, i) => (
            <span key={stat} className="flex items-center gap-2">
              {i > 0 && (
                <span className="hidden sm:inline text-white/30 mx-1">|</span>
              )}
              <span>{stat}</span>
            </span>
          ))}
        </div>
      </div>

      {/* ===== 移动端全屏菜单 (z-50) ===== */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="flex flex-col items-center gap-6 py-16"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 导航链接 — 每个链接延迟 50ms 依次入场，形成瀑布效果 */}
            {NAV_LINKS.map((link, i) => (
              <button
                key={link}
                className="text-white text-3xl tracking-wide transition-all duration-500"
                style={{
                  fontFamily: 'system-ui, sans-serif',
                  transitionDelay: `${100 + i * 50}ms`, /* 100ms, 150ms, 200ms, 250ms 依次递增 */
                  transitionTimingFunction: 'cubic-bezier(0.4,0,0.2,1)',
                  transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(1rem)',
                  opacity: mobileMenuOpen ? 1 : 0,
                }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link}
              </button>
            ))}
            <button
              className="mt-4 bg-white text-black px-8 py-3 rounded-full text-lg font-medium transition-all duration-500"
              style={{
                fontFamily: 'system-ui, sans-serif',
                transitionDelay: '300ms',
                transitionTimingFunction: 'cubic-bezier(0.4,0,0.2,1)',
                transform: mobileMenuOpen ? 'scale(1)' : 'scale(0.95)',
                opacity: mobileMenuOpen ? 1 : 0,
              }}
              onClick={() => setMobileMenuOpen(false)}
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
