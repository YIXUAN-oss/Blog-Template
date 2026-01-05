import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'
import { recoTheme } from 'vuepress-theme-reco'
// import { docsearchPlugin } from '@vuepress/plugin-docsearch' // 已改用主题内置 Algolia

export default defineUserConfig({
    lang: 'zh-CN',
    title: '你的博客',
    description: '一个基于 VuePress 2 的个人博客模板',

    // 根据部署环境设置 base 路径（请按需修改）
    // 本地开发: 使用根路径 /
    // Vercel: 使用根路径 /
    // GitHub Pages: 使用 /your-repo-name/
    base: process.env.VERCEL || process.env.NODE_ENV === 'development' ? '/' : '/your-repo-name/',

    // 使用 Vite 打包工具
    bundler: viteBundler(),

    // 配置 URL 格式：启用 cleanUrls 可生成不带 .html 扩展名的 URL
    // 注意：VuePress 2.x 可能不支持此配置
    // cleanUrls: true, // 如果需要，取消注释以启用
    head: [
        ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }],
        ['meta', { name: 'keywords', content: '博客,技术博客,Java,Python,前端,后端,模板' }],
        ['meta', { name: 'author', content: '你的名字' }],
        // ['meta', { name: 'algolia-site-verification', content: 'your-algolia-verification' }],
        ['link', { rel: 'icon', href: '/favicon.png' }],
        
        // 图片 CDN 优化：DNS 预解析和预连接
        ['link', { rel: 'dns-prefetch', href: 'https://cdn.jsdelivr.net' }],
        ['link', { rel: 'preconnect', href: 'https://cdn.jsdelivr.net', crossorigin: 'anonymous' }],
        // 备用 CDN 预连接（如果使用其他 CDN）
        ['link', { rel: 'dns-prefetch', href: 'https://gitcode.net' }],
        ['link', { rel: 'dns-prefetch', href: 'https://gitee.com' }],

        // 自定义搜索框样式
        ['style', {}, `
            .search-box { width: 230px !important; min-width: 230px !important; max-width: 230px !important; }
            .search-box input { width: 100% !important; }
            @media (max-width: 768px) {
                .search-box { width: 200px !important; min-width: 200px !important; max-width: 200px !important; }
            }
        `],

        // Umami 统计分析（示例，按需开启并替换为你自己的配置）
        // ['script', {
        //     defer: true,
        //     src: 'https://your-umami-domain.com/script.js',
        //     'data-website-id': 'your-website-id'
        // }],
    ],

    theme: recoTheme({
        // Logo
        logo: '/logo.png',

        // 作者信息（请替换为你的名字）
        author: '你的名字',
        authorAvatar: '/avatar.png',

        // 最后更新时间
        lastUpdatedText: '最后更新时间',

        // 自动设置分类
        autoSetBlogCategories: true,

        // 自动设置系列
        autoSetSeries: true,

        // 移动端优化
        catalogTitle: '目录',

        // 导航栏配置
        navbar: [
            { text: '首页', link: '/', icon: 'IconHome' },
            { text: '教程中心', link: '/tutorials/', icon: 'IconBook' },
            { text: '技术文章', link: '/posts.html', icon: 'IconArticle' },
            { text: '友情链接', link: '/friendship/', icon: 'IconGift' },
            { text: '日常随笔', link: '/diary/', icon: 'IconPen' },
            { text: '留言板', link: '/guestbook/', icon: 'IconMessageBoard' },
            { text: '关于', link: '/about/', icon: 'IconUser' },
        ],

        // 系列配置 - 禁用所有侧边栏
        series: {
            // Java后端
            '/tutorials/java-backend/java/': [],
            '/tutorials/java-backend/mysql/': [],
            '/tutorials/java-backend/redis/': [],
            '/tutorials/java-backend/maven/': [],
            '/tutorials/java-backend/mybatis/': [],
            '/tutorials/java-backend/mybatisPlus/': [],
            '/tutorials/java-backend/spring/': [],
            '/tutorials/java-backend/springboot/': [],
            '/tutorials/java-backend/springmvc/': [],
            '/tutorials/java-backend/springcloud/': [],
            '/tutorials/java-backend/elasticsearch/': [],
            '/tutorials/java-backend/rabbitmq/': [],
            '/tutorials/java-backend/jdbc/': [],
            '/tutorials/java-backend/servlet/': [],

            // Python人工智能
            '/tutorials/python-ai/python/': [],
            '/tutorials/python-ai/numpy/': [],
            '/tutorials/python-ai/pandas/': [],
            '/tutorials/python-ai/matplotlib/': [],
            '/tutorials/python-ai/scikitlearn/': [],
            '/tutorials/python-ai/tensorflow/': [],
            '/tutorials/python-ai/pytorch/': [],
            '/tutorials/python-ai/nlp/': [],
            '/tutorials/python-ai/cv/': [],

            // Java 转大模型开发
            '/tutorials/java-to-llm/01-prerequisites/': [],
            '/tutorials/java-to-llm/02-llm-fundamentals/': [],
            '/tutorials/java-to-llm/03-prompt-engineering/': [],
            '/tutorials/java-to-llm/04-api-integration/': [],
            '/tutorials/java-to-llm/05-spring-ai/': [],
            '/tutorials/java-to-llm/06-vector-databases/': [],
            '/tutorials/java-to-llm/07-rag-applications/': [],
            '/tutorials/java-to-llm/08-agent-development/': [],
            '/tutorials/java-to-llm/09-fine-tuning/': [],
            '/tutorials/java-to-llm/10-enterprise-practices/': [],
            '/tutorials/java-to-llm/11-projects/': [],

            // 计算机基础
            '/tutorials/computer-basics/network/': [],
            '/tutorials/computer-basics/operating-system/': [],
            '/tutorials/computer-basics/computer-organization/': [],
            '/tutorials/computer-basics/data-structures/': [],

            // 开发工具
            '/tutorials/development-tools/git/': [],

            // DevOps
            '/tutorials/devops-engineer/docker/': [],

            // HarmonyOS 开发
            '/tutorials/harmonyos-dev/': [],
            '/tutorials/harmonyos-dev/01-harmonyos-next-intro/': [],
            '/tutorials/harmonyos-dev/02-arkts-advanced/': [],
            '/tutorials/harmonyos-dev/03-arkui-next/': [],
            '/tutorials/harmonyos-dev/04-state-management-next/': [],
            '/tutorials/harmonyos-dev/05-ability-framework/': [],
            '/tutorials/harmonyos-dev/06-navigation-router/': [],
            '/tutorials/harmonyos-dev/07-data-management/': [],
            '/tutorials/harmonyos-dev/08-network-connect/': [],
            '/tutorials/harmonyos-dev/09-ai-native/': [],
            '/tutorials/harmonyos-dev/10-distributed-next/': [],
            '/tutorials/harmonyos-dev/11-graphics-animation/': [],
            '/tutorials/harmonyos-dev/12-multimedia-next/': [],
            '/tutorials/harmonyos-dev/13-service-card-next/': [],
            '/tutorials/harmonyos-dev/14-security-privacy/': [],
            '/tutorials/harmonyos-dev/15-performance-optimization/': [],
            '/tutorials/harmonyos-dev/16-testing-devops/': [],
            '/tutorials/harmonyos-dev/17-harmony-ecology/': [],

            // 数据库
            '/tutorials/database/mysql/': [],
            '/tutorials/database/redis/': []
        },

        // Algolia 搜索配置（已禁用，使用主题内置搜索，可按需开启）
        // algolia: {
        //     appId: 'MLKOH1MKDT',
        //     apiKey: '5af2979d2d290ce4e9247d7f89549455',
        //     indexName: 'your-blog-pages',
        //     // 可选：高级配置
        //     algoliaOptions: { 
        //         'facetFilters': ["lang:zh-CN"] 
        //     },
        //     debug: false // 调试时可设置为 true
        // },

        // 友情链接配置（已改用自定义组件 FriendshipLinks.vue）
        // 自定义组件支持分类显示，数据在组件内部维护

        // 评论配置（支持 Valine 或 Waline，可显示浏览量）
        // 方案一：使用 Valine（基于 LeanCloud，简单易用）
        // 1. 访问 https://console.leancloud.cn/ 注册并登录
        // 2. 创建应用，获取 App ID 和 App Key
        // 3. 在应用设置中配置 Web 安全域名
        // 4. 取消下面的注释并填写你的 App ID 和 App Key
        // commentConfig: {
        //   type: 'valine',
        //   options: {
        //     appId: 'your-app-id', // 替换为你的 LeanCloud App ID
        //     appKey: 'your-app-key', // 替换为你的 LeanCloud App Key
        //     placeholder: '请输入评论...',
        //     visitor: true, // 启用浏览量统计（重要！）
        //     recordIP: false, // 是否记录评论者IP
        //   },
        // },
        
        // 方案二：使用 Waline（推荐，功能更强大，支持浏览量统计）
        // 使用你自己的 Waline 服务地址（示例：your-waline-domain.com）
        commentConfig: {
          type: 'waline',
          options: {
            serverURL: process.env.VERCEL 
              ? 'https://your-waline-domain.com'  // 生产环境 Waline 地址
              : 'https://your-waline-domain.com', // 开发环境 Waline 地址
            visitor: true, // 启用浏览量统计（VuePress Reco 主题会自动在文章页面显示）
            dark: 'auto', // 自动切换暗色模式
            // 不强制登录，允许匿名评论
            // login: 'force', // 已移除强制登录
            // 表情配置（可选，需要服务端支持）
            // emoji: [
            //   'https://cdn.jsdelivr.net/gh/walinejs/emojis@1.0.0/weibo',
            //   'https://cdn.jsdelivr.net/gh/walinejs/emojis@1.0.0/qq',
            // ],
            // 图片上传（可选，需要服务端配置）
            // imageUploader: true,
            // 代码高亮（可选）
            // highlighter: true,
            // 数学公式支持（可选）
            // mathTagSupport: true,
            locale: {
              placeholder: '请输入留言，填写邮箱可收到回复哦！...',
              website: '网址(http://)',
            },
          },
        },
    }),


    // 多语言支持
    locales: {
        '/': {
            lang: 'zh-CN',
            title: '你的博客',
            description: '一个基于 VuePress 2 的个人博客模板',
        },
        '/en/': {
            lang: 'en-US',
            title: "Your Blog",
            description: 'A VuePress 2 powered blog template',
        }
    },
})


