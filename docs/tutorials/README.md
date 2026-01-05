---
title: 教程中心
sidebar: false
article: false
---

# 📚 教程中心

<p style="text-align: center; font-size: 1.2em; color: #6a737d; margin: 20px 0;">系统化学习路径，从入门到精通</p>

<div style="text-align: center; margin: 30px 0; padding: 20px; background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%); border-radius: 12px; border: 2px solid rgba(102, 126, 234, 0.2);">
  <p style="margin: 10px 0; font-size: 1.1em; font-weight: 600;">📖 想要添加自己的教程？</p>
  <p style="margin: 10px 0; color: #6a737d;">查看 <a href="/tutorials/使用指南.html" style="color: #667eea; font-weight: 600; text-decoration: underline;">教程中心使用指南</a> 了解如何快速添加和管理教程内容</p>
</div>

<style>
/* 分类标题样式 */
.section-title {
  text-align: center;
  font-size: 2em;
  font-weight: bold;
  margin: 60px 0 15px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
}

.section-title::before {
  content: '';
  position: absolute;
  left: 50%;
  bottom: -10px;
  transform: translateX(-50%);
  width: 60px;
  height: 4px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 2px;
}

.section-subtitle {
  text-align: center;
  font-size: 1em;
  color: var(--text-color-secondary, #6a737d);
  margin: 20px 0 40px;
  opacity: 0.8;
}

/* 教程卡片容器 */
.tutorial-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin: 40px 0;
}

/* Magic Card 样式 */
.tutorial-cards .magic-card {
  position: relative;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 24px 20px 22px;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  min-height: 380px !important;
}

.tutorial-cards .magic-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 16px;
  padding: 1px;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.3), rgba(118, 75, 162, 0.3));
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.tutorial-cards .magic-card:hover::before {
  opacity: 1;
}

/* Magic Card 背景光效 */
.tutorial-cards .magic-card__bg {
  position: absolute;
  inset: 0;
  border-radius: 16px;
  opacity: 0;
  transition: opacity 0.3s ease;
  background: radial-gradient(
    600px circle at var(--x, 50%) var(--y, 50%),
    rgba(102, 126, 234, 0.15),
    transparent 40%
  );
  pointer-events: none;
  z-index: 0;
}

.tutorial-cards .magic-card:hover .magic-card__bg {
  opacity: 0;
}

/* 卡片头部 */
.tutorial-cards .card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  position: relative;
  z-index: 2;
  height: 56px;
}

/* 卡片图标 */
.tutorial-cards .card-icon {
  font-size: 48px;
  transition: transform 0.3s ease;
  line-height: 1;
}

.tutorial-cards .magic-card:hover .card-icon {
  transform: scale(1.1) rotate(-5deg);
}

/* 卡片徽章 */
.tutorial-cards .card-badge {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.75em;
  font-weight: 600;
  color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.tutorial-cards .badge-hot {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.tutorial-cards .badge-recommend {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.tutorial-cards .badge-frontend {
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
}

.tutorial-cards .badge-essential {
  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
}

.tutorial-cards .badge-must {
  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
}

/* 卡片内容 */
.tutorial-cards .card-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.tutorial-cards .magic-card .card-content h3 {
  margin: 0 0 10px 0;
  font-size: 1.5em;
  font-weight: 600;
  color: var(--text-color, #2c3e50);
  transition: all 0.3s ease;
  position: relative;
  z-index: 3;
  border: none !important;
  padding: 0 !important;
  line-height: 1.4;
  height: 42px;
  display: flex;
  align-items: center;
}

.tutorial-cards .magic-card:hover .card-content h3 {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  transform: translateX(4px);
}

.tutorial-cards .card-desc {
  color: var(--text-color-secondary, #6a737d);
  font-size: 0.95em;
  line-height: 1.6;
  margin: 0 0 12px 0;
  position: relative;
  z-index: 2;
  height: 48px;
  display: flex;
  align-items: center;
}

/* 卡片标签 */
.tutorial-cards .card-tags {
  display: flex;
  flex-wrap: nowrap;
  gap: 6px;
  margin-bottom: 12px;
  overflow: hidden;
  position: relative;
  z-index: 2;
  height: 56px;
  align-items: flex-start;
}

.card-tag {
  padding: 4px 8px;
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
  border-radius: 8px;
  font-size: 0.7em;
  font-weight: 500;
  transition: all 0.3s ease;
  white-space: nowrap;
  flex-shrink: 0;
}

.tutorial-cards .magic-card:hover .card-tag {
  background: rgba(102, 126, 234, 0.2);
  transform: translateY(-2px);
}

/* 模块列表区域 */
.tutorial-cards .card-modules {
  margin: 16px 0 20px 0;
  position: relative;
  z-index: 2;
  flex: 1;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

.tutorial-cards .module-title {
  font-size: 0.85em;
  font-weight: 600;
  color: var(--text-color, #2c3e50);
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  opacity: 0.9;
  flex-shrink: 0;
}

.tutorial-cards .module-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 8px;
}

.tutorial-cards .module-item {
  font-size: 0.85em;
  color: var(--text-color-secondary, #6a737d);
  padding: 6px 12px;
  background: rgba(102, 126, 234, 0.05);
  border-radius: 8px;
  border-left: 3px solid rgba(102, 126, 234, 0.3);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.tutorial-cards .module-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  transform: scaleY(0);
  transition: transform 0.3s ease;
}

.tutorial-cards .magic-card:hover .module-item {
  background: rgba(102, 126, 234, 0.08);
  transform: translateX(4px);
  border-left-color: rgba(102, 126, 234, 0.5);
}

.tutorial-cards .magic-card:hover .module-item::before {
  transform: scaleY(1);
}

/* 卡片底部 */
.tutorial-cards .card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 16px;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  position: relative;
  z-index: 2;
  flex-shrink: 0;
}

.tutorial-cards .footer-text {
  color: #667eea;
  font-weight: 600;
  font-size: 0.9em;
  transition: all 0.3s ease;
}

.tutorial-cards .magic-card:hover .footer-text {
  transform: translateX(4px);
}

/* 悬停效果 */
.tutorial-cards .magic-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(102, 126, 234, 0.2);
}

/* 响应式设计 */
@media (min-width: 1201px) {
  .tutorial-cards {
    grid-template-columns: repeat(3, 1fr) !important;
  }
}

@media (max-width: 1200px) and (min-width: 769px) {
  .tutorial-cards {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
}

@media (max-width: 768px) {
  .tutorial-cards {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .tutorial-cards .magic-card {
    min-height: auto;
  }
  
  .tutorial-cards .card-header {
    height: auto;
  }
  
  .tutorial-cards .card-icon {
    font-size: 40px;
  }
  
  .tutorial-cards .magic-card .card-content h3 {
    font-size: 1.3em;
    height: auto;
  }
  
  .tutorial-cards .card-desc {
    height: auto;
  }
  
  .tutorial-cards .card-tags {
    flex-wrap: wrap;
    gap: 6px;
    height: auto;
  }
  
  .tutorial-cards .card-tag {
    font-size: 0.75em;
    padding: 3px 8px;
  }
  
  .tutorial-cards .module-item {
    font-size: 0.8em;
    padding: 5px 10px;
  }
  
  .tutorial-cards .module-title {
    font-size: 0.8em;
  }
}

/* 暗黑模式适配 */
[data-theme="dark"] .tutorial-cards .magic-card {
  background: rgb(28, 28, 30) !important;
  backdrop-filter: none;
  border-color: rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3), 0 2px 8px rgba(0, 0, 0, 0.2);
}

[data-theme="dark"] .tutorial-cards .magic-card:hover {
  background: rgb(38, 38, 40) !important;
  box-shadow: 0 12px 40px rgba(102, 126, 234, 0.4);
}

[data-theme="dark"] .tutorial-cards .magic-card .card-content h3 {
  color: rgba(255, 255, 255, 0.9);
}

[data-theme="dark"] .tutorial-cards .card-desc {
  color: rgba(255, 255, 255, 0.6);
}

[data-theme="dark"] .tutorial-cards .card-tag {
  background: rgba(102, 126, 234, 0.2);
  color: #8b9eff;
}

[data-theme="dark"] .tutorial-cards .card-footer {
  border-top-color: rgba(255, 255, 255, 0.1);
}

[data-theme="dark"] .tutorial-cards .footer-text {
  color: #8b9eff;
}

/* 暗黑模式 - 模块列表 */
[data-theme="dark"] .tutorial-cards .module-title {
  color: rgba(255, 255, 255, 0.9);
}

[data-theme="dark"] .tutorial-cards .module-item {
  background: rgba(102, 126, 234, 0.15);
  border-left-color: rgba(102, 126, 234, 0.5);
  color: rgba(255, 255, 255, 0.7);
}

[data-theme="dark"] .tutorial-cards .magic-card:hover .module-item {
  background: rgba(102, 126, 234, 0.25);
  border-left-color: rgba(102, 126, 234, 0.7);
}

/* 暗黑模式 - 分类标题 */
[data-theme="dark"] .section-subtitle {
  color: rgba(255, 255, 255, 0.6);
}
</style>

<script>
// 卡片点击跳转功能
export default {
  mounted() {
    this.initCardClick();
  },
  updated() {
    this.initCardClick();
  },
  methods: {
    initCardClick() {
      this.$nextTick(() => {
        const cards = document.querySelectorAll('.magic-card[data-href]');
        cards.forEach((card) => {
          // 移除旧的事件监听器（如果存在）
          card.onclick = null;
          // 添加新的点击事件
          card.onclick = (e) => {
            e.preventDefault();
            const href = card.getAttribute('data-href');
            if (href) {
              this.$router.push(href);
            }
          };
        });
      });
    }
  }
}
</script>

<div class="tutorial-cards">

<!-- 示例教程 1：分层结构 -->
<div class="magic-card" data-href="example-tutorial/">
  <span class="magic-card__bg"></span>
  <div class="card-header">
    <div class="card-icon">📚</div>
    <span class="card-badge badge-hot">示例</span>
  </div>
  <div class="card-content">
    <h3>示例教程（分层结构）</h3>
    <p class="card-desc">展示分层结构的教程组织方式，适合系统化学习路径</p>
    <div class="card-modules">
      <div class="module-title">📑 包含模块：</div>
      <div class="module-list">
        <div class="module-item">📖 第一章：基础入门</div>
        <div class="module-item">📖 第二章：进阶内容</div>
        <div class="module-item">📖 第三章：实战项目</div>
      </div>
    </div>
    <div class="card-footer">
      <span class="footer-text">查看示例 →</span>
    </div>
  </div>
</div>

<!-- 示例教程 2：扁平化结构 -->
<div class="magic-card" data-href="another-tutorial/">
  <span class="magic-card__bg"></span>
  <div class="card-header">
    <div class="card-icon">🎯</div>
    <span class="card-badge badge-recommend">示例</span>
  </div>
  <div class="card-content">
    <h3>另一个示例教程（扁平化）</h3>
    <p class="card-desc">展示扁平化结构的教程组织方式，适合快速参考文档</p>
    <div class="card-modules">
      <div class="module-title">📑 包含模块：</div>
      <div class="module-list">
        <div class="module-item">⚡ 快速开始</div>
        <div class="module-item">📖 核心概念</div>
        <div class="module-item">📚 API 参考</div>
        <div class="module-item">⚙️ 配置选项</div>
        <div class="module-item">💻 示例代码</div>
      </div>
    </div>
    <div class="card-footer">
      <span class="footer-text">查看示例 →</span>
    </div>
  </div>
</div>

</div>

<div style="margin: 40px 0; padding: 30px; background: rgba(102, 126, 234, 0.05); border-radius: 16px; border-left: 4px solid #667eea;">
  <h3 style="margin-top: 0; color: #667eea;">💡 如何添加自己的教程？</h3>
  <p style="margin: 15px 0; line-height: 1.8;">
    1. 在 <code>docs/tutorials/</code> 目录下创建你的教程目录<br>
    2. 创建教程首页 <code>README.md</code> 和教程文章<br>
    3. 在上面的卡片区域添加你的教程卡片（参考示例格式）<br>
    4. 详细步骤请查看 <a href="/tutorials/使用指南.html" style="color: #667eea; font-weight: 600;">📖 教程中心使用指南</a>
  </p>
</div>



## 🎓 学习资源推荐

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 30px 0;">
  <div style="padding: 20px; background: rgba(102, 126, 234, 0.05); border-radius: 12px; border-left: 4px solid #667eea;">
    <h4 style="margin-top: 0; color: #667eea;">📺 在线学习</h4>
    <p style="margin: 10px 0; color: #6a737d; font-size: 0.9em;">B站、慕课网、极客时间</p>
  </div>
  <div style="padding: 20px; background: rgba(102, 126, 234, 0.05); border-radius: 12px; border-left: 4px solid #667eea;">
    <h4 style="margin-top: 0; color: #667eea;">💻 刷题平台</h4>
    <p style="margin: 10px 0; color: #6a737d; font-size: 0.9em;">LeetCode、牛客网、Codeforces</p>
  </div>
  <div style="padding: 20px; background: rgba(102, 126, 234, 0.05); border-radius: 12px; border-left: 4px solid #667eea;">
    <h4 style="margin-top: 0; color: #667eea;">👥 技术社区</h4>
    <p style="margin: 10px 0; color: #6a737d; font-size: 0.9em;">GitHub、掘金、CSDN、Stack Overflow</p>
  </div>
  <div style="padding: 20px; background: rgba(102, 126, 234, 0.05); border-radius: 12px; border-left: 4px solid #667eea;">
    <h4 style="margin-top: 0; color: #667eea;">📚 官方文档</h4>
    <p style="margin: 10px 0; color: #6a737d; font-size: 0.9em;">始终是最好的学习资料</p>
  </div>
</div>

---

<div style="text-align: center; margin: 40px 0; padding: 25px; background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%); border-radius: 16px;">
  <p style="margin: 10px 0; font-size: 1.1em; font-weight: 600; color: #2c3e50;">🚀 开始创建你的第一个教程吧！</p>
  <p style="margin: 15px 0; color: #6a737d;">查看 <a href="/tutorials/使用指南.html" style="color: #667eea; font-weight: 600; text-decoration: underline;">📖 教程中心使用指南</a> 获取详细步骤</p>
</div>
