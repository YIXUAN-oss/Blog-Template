<template>
  <div class="friendship-links-container">
    <h1 class="page-title">🔗 友情链接</h1>
    <p class="page-description">这里收集了一些优秀的技术网站和学习资源，欢迎交换友链！</p>
    
    <div class="links-wrapper">
      <div 
        v-for="(category, index) in linksData" 
        :key="index"
        class="category-section"
      >
        <div class="category-header">
          <h2 class="category-title">{{ category.title }}</h2>
          <div class="category-divider"></div>
        </div>
        
        <div class="links-grid">
          <a
            v-for="(link, linkIndex) in category.links"
            :key="linkIndex"
            :href="link.link"
            target="_blank"
            rel="noopener noreferrer"
            class="link-card"
          >
            <div class="card-content">
              <div class="logo-wrapper">
                <img 
                  :src="link.logo" 
                  :alt="link.title"
                  class="link-logo"
                  @error="handleImageError"
                />
              </div>
              <div class="link-info">
                <h3 class="link-title">{{ link.title }}</h3>
                <p class="link-desc">{{ link.description }}</p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>

    <!-- 申请友链说明 -->
    <div class="apply-section">
      <h2>📮 申请友链</h2>
      <div class="apply-content">
        <p>欢迎交换友情链接！请确保您的网站满足以下条件：</p>
        <ul>
          <li>✅ 网站内容健康、积极向上</li>
          <li>✅ 网站可以正常访问</li>
          <li>✅ 网站有一定的原创内容</li>
          <li>✅ 建议使用 HTTPS</li>
        </ul>
        <p class="contact-info">
          如需交换友链，请通过 
          <a href="mailto:byyi.xuan@outlook.com">邮件联系我</a>，
          或在 <a href="https://github.com/YIXUAN-oss" target="_blank">GitHub</a> 留言。
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Link {
  title: string
  logo: string
  link: string
  description: string
}

interface Category {
  title: string
  links: Link[]
}

const linksData = ref<Category[]>([
  {
    title: '📚 前端框架',
    links: [
      {
        title: 'Vue.js',
        logo: 'https://cn.vuejs.org/logo.svg',
        link: 'https://cn.vuejs.org/',
        description: '渐进式 JavaScript 框架'
      },
      {
        title: 'React',
        logo: 'https://react.dev/favicon.ico',
        link: 'https://react.dev/',
        description: '用于构建用户界面的 JavaScript 库'
      },
      {
        title: 'VuePress',
        logo: 'https://v2.vuepress.vuejs.org/images/hero.png',
        link: 'https://v2.vuepress.vuejs.org/zh/',
        description: 'Vue 驱动的静态网站生成器'
      },
      {
        title: 'vuepress-theme-reco',
        logo: 'https://avatars.githubusercontent.com/u/54167020?s=200&v=4',
        link: 'https://github.com/vuepress-reco',
        description: '一款简洁的 VuePress 博客主题'
      },
      {
        title: 'Nuxt.js',
        logo: 'https://nuxt.com/icon.png',
        link: 'https://nuxt.com/',
        description: 'Vue.js 的直观 Web 框架'
      },
      {
        title: 'Next.js',
        logo: 'https://nextjs.org/favicon.ico',
        link: 'https://nextjs.org/',
        description: 'React 应用框架'
      },
      {
        title: 'Angular',
        logo: 'https://angular.io/assets/images/favicons/favicon.ico',
        link: 'https://angular.io/',
        description: 'Google 开发的 Web 应用框架'
      },
      {
        title: 'Svelte',
        logo: 'https://svelte.dev/favicon.png',
        link: 'https://svelte.dev/',
        description: '编译型前端框架'
      },
      {
        title: 'Vite',
        logo: 'https://vitejs.dev/logo.svg',
        link: 'https://vitejs.dev/',
        description: '下一代前端构建工具'
      },
      {
        title: 'TypeScript',
        logo: 'https://www.typescriptlang.org/favicon-32x32.png',
        link: 'https://www.typescriptlang.org/',
        description: 'JavaScript 的超集'
      }
    ]
  },
  {
    title: '⚙️ 后端框架',
    links: [
      {
        title: 'Spring',
        logo: 'https://spring.io/favicon.svg',
        link: 'https://spring.io/',
        description: 'Java 企业级应用框架'
      },
      {
        title: 'Node.js',
        logo: 'https://nodejs.org/static/images/favicons/favicon.png',
        link: 'https://nodejs.org/',
        description: 'JavaScript 运行时环境'
      },
      {
        title: 'Express',
        logo: 'https://expressjs.com/images/favicon.png',
        link: 'https://expressjs.com/',
        description: 'Node.js Web 应用框架'
      },
      {
        title: 'Django',
        logo: 'https://static.djangoproject.com/img/icon-touch.e4872c4da341.png',
        link: 'https://www.djangoproject.com/',
        description: 'Python Web 框架'
      },
      {
        title: 'Flask',
        logo: 'https://flask.palletsprojects.com/en/2.3.x/_static/shortcut-icon.png',
        link: 'https://flask.palletsprojects.com/',
        description: '轻量级 Python Web 框架'
      },
      {
        title: 'FastAPI',
        logo: 'https://fastapi.tiangolo.com/img/favicon.png',
        link: 'https://fastapi.tiangolo.com/',
        description: '现代化的 Python API 框架'
      }
    ]
  },
  {
    title: '💾 数据库 & 存储',
    links: [
      {
        title: 'MySQL',
        logo: 'https://labs.mysql.com/common/logos/mysql-logo.svg',
        link: 'https://www.mysql.com/',
        description: '最流行的开源关系型数据库'
      },
      {
        title: 'PostgreSQL',
        logo: 'https://www.postgresql.org/favicon.ico',
        link: 'https://www.postgresql.org/',
        description: '强大的开源关系型数据库'
      },
      {
        title: 'MongoDB',
        logo: 'https://www.mongodb.com/assets/images/global/favicon.ico',
        link: 'https://www.mongodb.com/',
        description: '文档型 NoSQL 数据库'
      },
      {
        title: 'Redis',
        logo: 'https://redis.io/favicon.ico',
        link: 'https://redis.io/',
        description: '内存数据结构存储'
      },
      {
        title: 'Elasticsearch',
        logo: 'https://www.elastic.co/favicon.ico',
        link: 'https://www.elastic.co/',
        description: '分布式搜索和分析引擎'
      }
    ]
  },
  {
    title: '🛠️ 开发工具',
    links: [
      {
        title: 'GitHub',
        logo: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
        link: 'https://github.com',
        description: '全球最大的代码托管平台'
      },
      {
        title: 'VS Code',
        logo: 'https://code.visualstudio.com/favicon.ico',
        link: 'https://code.visualstudio.com/',
        description: '轻量级但功能强大的代码编辑器'
      },
      {
        title: 'npm',
        logo: 'https://static-production.npmjs.com/b0f1a8318363185cc2ea6a40ac23eeb2.png',
        link: 'https://www.npmjs.com/',
        description: 'JavaScript 包管理器'
      },
      {
        title: 'Git',
        logo: 'https://git-scm.com/images/logos/downloads/Git-Icon-1788C.png',
        link: 'https://git-scm.com/',
        description: '分布式版本控制系统'
      },
      {
        title: 'Postman',
        logo: 'https://www.postman.com/favicon-32x32.png',
        link: 'https://www.postman.com/',
        description: 'API 开发协作平台'
      },
      {
        title: 'Docker',
        logo: 'https://www.docker.com/favicon.ico',
        link: 'https://www.docker.com/',
        description: '容器化应用平台'
      },
      {
        title: 'Vercel',
        logo: 'https://vercel.com/favicon.ico',
        link: 'https://vercel.com/',
        description: '前端部署平台'
      },
      {
        title: 'Netlify',
        logo: 'https://www.netlify.com/favicon.ico',
        link: 'https://www.netlify.com/',
        description: '静态网站托管平台'
      }
    ]
  },
  {
    title: '🤖 AI & 工具',
    links: [
      {
        title: 'ChatGPT',
        logo: 'https://cdn.oaistatic.com/assets/favicon-o20kmmos.svg',
        link: 'https://chat.openai.com/',
        description: 'OpenAI 对话式 AI'
      },
      {
        title: 'GitHub Copilot',
        logo: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
        link: 'https://github.com/features/copilot',
        description: 'AI 代码助手'
      },
      {
        title: 'Perplexity',
        logo: 'https://www.perplexity.ai/favicon.svg',
        link: 'https://www.perplexity.ai/',
        description: 'AI 搜索引擎'
      },
      {
        title: 'Claude',
        logo: 'https://www.anthropic.com/favicon.ico',
        link: 'https://claude.ai/',
        description: 'Anthropic AI 助手'
      },
      {
        title: 'Notion',
        logo: 'https://www.notion.so/images/favicon.ico',
        link: 'https://www.notion.so/',
        description: '全能笔记和协作工具'
      },
      {
        title: 'Regex101',
        logo: 'https://regex101.com/favicon.ico',
        link: 'https://regex101.com/',
        description: '正则表达式测试工具'
      }
    ]
  },
  {
    title: '📖 学习文档',
    links: [
      {
        title: 'MDN Web Docs',
        logo: 'https://developer.mozilla.org/apple-touch-icon.png',
        link: 'https://developer.mozilla.org/zh-CN/',
        description: 'Web 技术权威文档'
      },
      {
        title: 'ES6 入门教程',
        logo: 'https://es6.ruanyifeng.com/favicon.ico',
        link: 'https://es6.ruanyifeng.com/',
        description: '阮一峰的 ECMAScript 6 入门'
      },
      {
        title: '菜鸟教程',
        logo: 'https://www.runoob.com/favicon.ico',
        link: 'https://www.runoob.com/',
        description: '编程入门教程网站'
      },
      {
        title: 'W3School',
        logo: 'https://www.w3school.com.cn/ui2019/logo-32-red.png',
        link: 'https://www.w3school.com.cn/',
        description: 'Web 技术教程'
      },
      {
        title: '现代 JavaScript 教程',
        logo: 'https://zh.javascript.info/img/favicon/favicon.png',
        link: 'https://zh.javascript.info/',
        description: '从基础到高阶的 JavaScript 教程'
      },
      {
        title: 'freeCodeCamp',
        logo: 'https://cdn.freecodecamp.org/universal/favicons/favicon.ico',
        link: 'https://www.freecodecamp.org/',
        description: '免费编程学习平台'
      },
      {
        title: 'LeetCode',
        logo: 'https://leetcode.com/favicon.ico',
        link: 'https://leetcode.com/',
        description: '算法刷题平台'
      },
      {
        title: 'Roadmap.sh',
        logo: 'https://roadmap.sh/manifest/favicon.ico',
        link: 'https://roadmap.sh/',
        description: '开发者技能路线图'
      },
      {
        title: 'DevDocs',
        logo: 'https://devdocs.io/favicon.ico',
        link: 'https://devdocs.io/',
        description: '开发文档聚合搜索'
      }
    ]
  },
  {
    title: '💬 社区论坛',
    links: [
      {
        title: 'Stack Overflow',
        logo: 'https://cdn.sstatic.net/Sites/stackoverflow/Img/apple-touch-icon.png',
        link: 'https://stackoverflow.com/',
        description: '全球最大的开发者问答社区'
      },
      {
        title: '掘金',
        logo: 'https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/static/favicons/favicon-32x32.png',
        link: 'https://juejin.cn/',
        description: '中文技术分享社区'
      },
      {
        title: 'SegmentFault',
        logo: 'https://static.segmentfault.com/main_site_next/0dc4bace/touch-icon.png',
        link: 'https://segmentfault.com/',
        description: '中文技术问答社区'
      },
      {
        title: 'V2EX',
        logo: 'https://www.v2ex.com/static/icon-192.png',
        link: 'https://www.v2ex.com/',
        description: '创意工作者社区'
      },
      {
        title: 'GitHub Community',
        logo: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
        link: 'https://github.com/community',
        description: 'GitHub 官方社区'
      },
      {
        title: 'CSDN',
        logo: 'https://g.csdnimg.cn/static/logo/favicon32.ico',
        link: 'https://www.csdn.net/',
        description: '中文IT技术社区'
      },
      {
        title: '博客园',
        logo: 'https://www.cnblogs.com/favicon.ico',
        link: 'https://www.cnblogs.com/',
        description: '开发者博客平台'
      },
      {
        title: 'Reddit',
        logo: 'https://www.redditstatic.com/desktop2x/img/favicon/favicon-32x32.png',
        link: 'https://www.reddit.com/r/programming/',
        description: '国际技术讨论社区'
      }
    ]
  },
  {
    title: '🎨 设计资源',
    links: [
      {
        title: 'iconfont',
        logo: 'https://img.alicdn.com/imgextra/i4/O1CN01Z5paLz1O0zuCC7osS_!!6000000001644-55-tps-83-82.svg',
        link: 'https://www.iconfont.cn/',
        description: '阿里巴巴矢量图标库'
      },
      {
        title: 'Dribbble',
        logo: 'https://cdn.dribbble.com/assets/favicon-b38525134603b9513174ec887944bde1a869eb6cd414f4d640ee48ab2a15a26b.ico',
        link: 'https://dribbble.com/',
        description: '设计师作品分享平台'
      },
      {
        title: 'Unsplash',
        logo: 'https://unsplash.com/favicon-32x32.png',
        link: 'https://unsplash.com/',
        description: '免费高质量图片素材'
      },
      {
        title: 'Figma',
        logo: 'https://static.figma.com/app/icon/1/favicon.png',
        link: 'https://www.figma.com/',
        description: '协作式界面设计工具'
      },
      {
        title: 'Pexels',
        logo: 'https://www.pexels.com/assets/static/images/meta/pexels-icon.png',
        link: 'https://www.pexels.com/',
        description: '免费高质量图片和视频'
      },
      {
        title: 'Font Awesome',
        logo: 'https://fontawesome.com/favicon.ico',
        link: 'https://fontawesome.com/',
        description: '图标字体库'
      },
      {
        title: 'Color Hunt',
        logo: 'https://colorhunt.co/img/color-hunt-icon-ios.png',
        link: 'https://colorhunt.co/',
        description: '配色方案分享平台'
      },
      {
        title: 'Canva',
        logo: 'https://static.canva.com/web/images/favicon.ico',
        link: 'https://www.canva.com/',
        description: '在线设计工具'
      }
    ]
  }
])

const handleImageError = (e: Event) => {
  const target = e.target as HTMLImageElement
  target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y="50" font-size="50">🔗</text></svg>'
}
</script>

<style scoped>
.friendship-links-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
  background: linear-gradient(120deg, #3eaf7c, #42d392);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-description {
  text-align: center;
  color: var(--text-color-secondary, #6a737d);
  font-size: 1.1rem;
  margin-bottom: 3rem;
}

.links-wrapper {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.category-section {
  animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.category-header {
  margin-bottom: 1.5rem;
}

.category-title {
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--text-color, #2c3e50);
  margin-bottom: 0.5rem;
}

.category-divider {
  height: 3px;
  width: 60px;
  background: linear-gradient(90deg, #3eaf7c, #42d392);
  border-radius: 2px;
}

.links-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

@media (max-width: 768px) {
  .links-grid {
    grid-template-columns: 1fr;
  }
}

.link-card {
  display: block;
  background: var(--bg-color-secondary, #f6f8fa);
  border: 1px solid var(--border-color, #e1e4e8);
  border-radius: 12px;
  padding: 1.5rem;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  cursor: pointer;
}

.link-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(62, 175, 124, 0.15);
  border-color: #3eaf7c;
}

.card-content {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.logo-wrapper {
  flex-shrink: 0;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 10px;
  padding: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.link-logo {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.link-info {
  flex: 1;
  min-width: 0;
}

.link-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-color, #2c3e50);
  margin: 0 0 0.5rem 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.link-desc {
  font-size: 0.9rem;
  color: var(--text-color-secondary, #6a737d);
  margin: 0;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 申请友链部分 */
.apply-section {
  margin-top: 4rem;
  padding: 2rem;
  background: linear-gradient(135deg, rgba(62, 175, 124, 0.1), rgba(66, 211, 146, 0.1));
  border-radius: 12px;
  border: 1px solid rgba(62, 175, 124, 0.3);
}

.apply-section h2 {
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--text-color, #2c3e50);
  margin-bottom: 1rem;
}

.apply-content p {
  color: var(--text-color, #2c3e50);
  line-height: 1.8;
  margin-bottom: 1rem;
}

.apply-content ul {
  list-style: none;
  padding: 0;
  margin: 1rem 0;
}

.apply-content ul li {
  padding: 0.5rem 0;
  color: var(--text-color, #2c3e50);
  font-size: 1rem;
}

.contact-info {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px dashed rgba(62, 175, 124, 0.3);
}

.contact-info a {
  color: #3eaf7c;
  text-decoration: none;
  font-weight: 500;
  border-bottom: 1px solid transparent;
  transition: border-color 0.3s;
}

.contact-info a:hover {
  border-bottom-color: #3eaf7c;
}

/* 暗色主题适配 */
@media (prefers-color-scheme: dark) {
  .link-card {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.1);
  }
  
  .link-card:hover {
    background: rgba(255, 255, 255, 0.08);
    box-shadow: 0 8px 20px rgba(62, 175, 124, 0.3);
  }
  
  .logo-wrapper {
    background: rgba(255, 255, 255, 0.9);
  }
}
</style>
