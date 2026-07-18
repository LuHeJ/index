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
