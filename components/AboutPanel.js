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
