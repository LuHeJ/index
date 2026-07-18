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
