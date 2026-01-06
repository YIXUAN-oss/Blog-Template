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

    // 使用 Vite 打包工具，并优化构建配置
    bundler: viteBundler({
        viteOptions: {
            build: {
                // 启用代码分割
                rollupOptions: {
                    output: {
                        // 手动代码分割，优化加载性能
                        manualChunks: (id) => {
                            // 将 node_modules 中的依赖分离
                            if (id.includes('node_modules')) {
                                // Vue 相关库单独打包
                                if (id.includes('vue') || id.includes('@vue')) {
                                    return 'vue-vendor'
                                }
                                // 主题相关库单独打包
                                if (id.includes('vuepress-theme-reco')) {
                                    return 'theme-vendor'
                                }
                                // 其他第三方库
                                return 'vendor'
                            }
                        },
                        // 优化 chunk 文件名
                        chunkFileNames: 'assets/js/[name]-[hash].js',
                        entryFileNames: 'assets/js/[name]-[hash].js',
                        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
                    },
                },
                // 启用压缩
                minify: 'terser',
                terserOptions: {
                    compress: {
                        drop_console: true, // 生产环境移除 console
                        drop_debugger: true,
                    },
                },
                // 启用 CSS 代码分割
                cssCodeSplit: true,
                // 设置 chunk 大小警告限制
                chunkSizeWarningLimit: 1000,
                // 启用 sourcemap（可选，生产环境可关闭以减小体积）
                sourcemap: false,
            },
            // 优化依赖预构建
            optimizeDeps: {
                include: [
                    'vue',
                    'vuepress',
                    'vuepress-theme-reco',
                ],
            },
            // 服务器配置（开发环境）
            // 注意：Vite 的 HTTP/2 支持通过 https 选项启用
            // server: {
            //     https: true, // 启用 HTTPS 以支持 HTTP/2
            // },
        },
    }),

    // 配置 URL 格式：启用 cleanUrls 可生成不带 .html 扩展名的 URL
    // 注意：VuePress 2.x 可能不支持此配置
    // cleanUrls: true, // 如果需要，取消注释以启用
    head: [
        ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }],
        ['meta', { name: 'keywords', content: '博客,技术博客,Java,Python,前端,后端,模板' }],
        ['meta', { name: 'author', content: '你的名字' }],
        // ['meta', { name: 'algolia-site-verification', content: 'your-algolia-verification' }],
        ['link', { rel: 'icon', href: '/favicon.png' }],
        
        // 性能优化：DNS 预解析和预连接
        ['link', { rel: 'dns-prefetch', href: 'https://cdn.jsdelivr.net' }],
        ['link', { rel: 'preconnect', href: 'https://cdn.jsdelivr.net', crossorigin: 'anonymous' }],
        // 备用 CDN 预连接（如果使用其他 CDN）
        ['link', { rel: 'dns-prefetch', href: 'https://gitcode.net' }],
        ['link', { rel: 'dns-prefetch', href: 'https://gitee.com' }],
        
        // 关键资源预加载（Logo 和头像）
        ['link', { rel: 'preload', href: '/logo.png', as: 'image' }],
        ['link', { rel: 'preload', href: '/avatar.png', as: 'image' }],
        
        // 性能优化：减少渲染阻塞
        ['meta', { name: 'format-detection', content: 'telephone=no' }],
        ['meta', { 'http-equiv': 'x-dns-prefetch-control', content: 'on' }],

        // 自定义搜索框样式（关键 CSS 内联，减少渲染阻塞）
        ['style', {}, `
            .search-box { width: 230px !important; min-width: 230px !important; max-width: 230px !important; }
            .search-box input { width: 100% !important; }
            @media (max-width: 768px) {
                .search-box { width: 200px !important; min-width: 200px !important; max-width: 200px !important; }
            }
        `],
        
        // 性能优化：延迟加载非关键 CSS
        ['script', {}, `
            // 延迟加载非关键 CSS，提升首屏加载速度
            (function() {
                if (document.readyState === 'loading') {
                    document.addEventListener('DOMContentLoaded', loadNonCriticalCSS);
                } else {
                    loadNonCriticalCSS();
                }
                
                function loadNonCriticalCSS() {
                    // 使用 requestIdleCallback 延迟加载非关键样式
                    if ('requestIdleCallback' in window) {
                        requestIdleCallback(function() {
                            loadStyles();
                        }, { timeout: 2000 });
                    } else {
                        setTimeout(loadStyles, 2000);
                    }
                }
                
                function loadStyles() {
                    // 这里可以预加载其他非关键 CSS 文件
                    // 例如：评论系统样式、动画样式等
                }
            })();
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

        // 自动设置分类（推荐保持开启，主题会根据 Frontmatter 自动归类）
        autoSetBlogCategories: true,

        // 自动设置系列（推荐保持开启）
        // 说明：
        // - 默认使用目录结构自动生成系列 / 侧边栏
        // - 一般情况下你不需要手动配置 series
        // - 如果你希望精确控制某个教程的章节顺序或分组
        //   可以在 recoTheme({ ... }) 中单独添加 series 配置
        //   具体示例请查看仓库根目录的《使用指南.md》中「系列 / 侧边栏配置」章节
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

        // 教程中心侧边栏 / 系列示例配置
        // 说明：
        // - 这里仅对 /tutorials/ 以及 example-tutorial 做了示例
        // - 你可以按相同格式为自己的教程路径新增或调整
        series: {
            // 教程中心总入口的侧边栏
            // '/tutorials/': [
            //     {
            //         text: '教程中心',
            //         children: [
            //             '/tutorials/README.md',
            //             '/tutorials/example-tutorial/README.md',
            //             '/tutorials/another-tutorial/README.md',
            //         ],
            //     },
            // ],

            // example-tutorial 教程的章节侧边栏
            '/tutorials/example-tutorial/': [
                {
                    text: '01-基础入门',
                    children: [
                        '/tutorials/example-tutorial/01-基础入门/README.md',
                        '/tutorials/example-tutorial/01-基础入门/01-教程概述.md',
                        '/tutorials/example-tutorial/01-基础入门/02-环境搭建.md',
                        '/tutorials/example-tutorial/01-基础入门/03-第一个示例.md',
                    ],
                },
                {
                    text: '02-进阶内容',
                    children: [
                        '/tutorials/example-tutorial/02-进阶内容/README.md',
                        '/tutorials/example-tutorial/02-进阶内容/01-高级特性.md',
                        '/tutorials/example-tutorial/02-进阶内容/02-最佳实践.md',
                        '/tutorials/example-tutorial/02-进阶内容/03-常见问题.md',
                    ],
                },
                {
                    text: '03-实战项目',
                    children: [
                        '/tutorials/example-tutorial/03-实战项目/README.md',
                        '/tutorials/example-tutorial/03-实战项目/01-项目规划.md',
                        '/tutorials/example-tutorial/03-实战项目/02-代码实现.md',
                        '/tutorials/example-tutorial/03-实战项目/03-测试部署.md',
                    ],
                },
            ],
        },

        // Algolia 搜索配置（已禁用，使用主题内置搜索，可按需开启）
        // algolia: {
        //     appId: '...',
        //     apiKey: '...',
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


