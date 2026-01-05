# 懿轩的个人博客 | YiXuan's Blog

<img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License" style="border-radius: 8px;" />

---

<img src="https://img.shields.io/badge/VuePress-2.x-green.svg" alt="VuePress" style="border-radius: 8px;" />
<img src="https://img.shields.io/badge/theme-vuepress--reco-brightgreen.svg" alt="Theme" style="border-radius: 8px;" />

## ✨ 特性

- 🎨 **美观主题** - 支持卡片式布局、动画过渡、响应式设计
- 🌐 **多语言支持** - 中文 / 英文 自动切换（可扩展更多语言）
- 🔍 **全局搜索** - 内置搜索，支持关键词高亮
- 🌙 **暗黑模式** - 自动跟随系统，支持手动切换
- 📱 **移动友好** - 完美适配手机、平板、桌面
- 📈 **SEO 优化** - 自动生成 sitemap、meta 标签、RSS 支持
- 🖼️ **图片懒加载** - 提升加载速度
- 📊 **统计分析** - 可选集成Umami（自托管）
- 🧩 **插件丰富** - 代码复制、阅读进度、页面滚动效果等

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 本地开发

```bash
npm run dev
```

访问 `http://localhost:8080` 查看效果

### 构建部署

```bash
npm run build
```

生成的静态文件在 `docs/.vuepress/dist` 目录

## 📂 项目结构

```text
Blog-Template/
├── docs/                      # 文档 & 内容根目录
│   ├── .vuepress/             # VuePress 配置 & 样式
│   │   ├── config.ts          # 主配置文件
│   │   ├── client.ts          # 客户端增强
│   │   ├── public/            # 静态资源（logo、头像等）
│   │   └── styles/            # 自定义样式
│   ├── blogs/                 # 博客文章
│   ├── tutorials/             # 教程中心
│   ├── diary/                 # 日常随笔
│   ├── friendship/            # 友情链接
│   ├── guestbook/             # 留言板
│   ├── en/                    # 英文首页等
│   └── README.md              # 中文首页
├── package.json               # 项目配置
├── vercel.json                # Vercel 部署配置
└── README.md                  # 仓库说明
```

## 📝 内容管理

### 添加文章

在对应目录下创建 Markdown 文件，例如：

```markdown
---
title: 文章标题
date: 2025-01-01
categories:
  - 分类
tags:
  - 标签1
  - 标签2
---

文章内容...
```

### 添加教程

在 `docs/tutorials/` 目录下创建对应的教程分类文件夹。

## 🌐 部署

### Vercel（推荐）

本项目已配置好 Vercel 部署，只需简单几步：

1. **导入 GitHub 仓库**
   - 访问 [Vercel](https://vercel.com)
   - 点击 "Import Project"
   - 选择此 GitHub 仓库

2. **配置项目**（已自动配置，无需修改）
   - Framework Preset: `VuePress`
   - Build Command: `npm run build`
   - Output Directory: `docs/.vuepress/dist`
   - Install Command: `npm install --legacy-peer-deps`

3. **部署**
   - 点击 "Deploy" 即可
   - 每次推送到 main 分支会自动重新部署

### GitHub Pages

1. 修改 `docs/.vuepress/config.ts` 中的 `base` 配置
2. 执行 `npm run build`
3. 将 `docs/.vuepress/dist` 目录推送到 `gh-pages` 分支


## 👤 作者

**懿轩 (YiXuan)**

- 📧 Email: byyi.xuan@outlook.com
- 🐙 GitHub: [@YIXUAN-oss](https://github.com/YIXUAN-oss)

## 📄 许可证

[MIT](LICENSE) © 懿轩


