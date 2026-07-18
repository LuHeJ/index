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
