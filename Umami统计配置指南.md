# Umami 统计配置完整指南

> 本指南将帮助你从零开始配置 Umami 网站统计系统，包括部署 Umami 服务、创建数据库、配置统计功能和查看数据。

## 📋 目录

- [什么是 Umami](#什么是-umami)
- [快速开始](#快速开始)
- [第一步：选择部署方式](#第一步选择部署方式)
- [第二步：部署 Umami 到 Vercel](#第二步部署-umami-到-vercel)
- [第三步：配置数据库](#第三步配置数据库)
- [第四步：配置环境变量](#第四步配置环境变量)
- [第五步：创建网站并获取网站 ID](#第五步创建网站并获取网站-id)
- [第六步：在博客中配置 Umami](#第六步在博客中配置-umami)
- [第七步：验证配置](#第七步验证配置)
- [高级配置选项](#高级配置选项)
- [数据管理](#数据管理)
- [常见问题](#常见问题)
- [注意事项](#注意事项)
- [总结](#总结)

---

## 什么是 Umami

Umami 是一款**开源、隐私友好**的网站分析工具，它是 Google Analytics 的轻量级替代品。它的特点包括：

- ✅ **隐私友好**：不收集个人数据，符合 GDPR 要求
- ✅ **轻量快速**：体积小（约 2KB），不影响网站性能
- ✅ **开源免费**：完全开源，可自行部署
- ✅ **实时统计**：实时查看访问数据
- ✅ **多网站支持**：可以管理多个网站
- ✅ **无 Cookie**：不使用 Cookie，保护用户隐私
- ✅ **暗色模式**：支持暗色模式界面
- ✅ **数据导出**：支持导出统计数据

---

## 快速开始

如果你已经熟悉 Vercel 和数据库配置，可以按照以下步骤快速配置：

1. **部署 Umami 到 Vercel**（约 3 分钟）
   - 使用 Vercel 一键部署
   - 配置环境变量

2. **配置数据库**（约 2 分钟）
   - 创建 PostgreSQL 或 MySQL 数据库
   - 获取数据库连接信息

3. **配置环境变量**（约 1 分钟）
   - 在 Vercel 中配置数据库连接
   - 设置管理员账号

4. **创建网站并获取网站 ID**（约 1 分钟）
   - 登录 Umami 管理后台
   - 创建网站并获取网站 ID

5. **配置博客**（约 1 分钟）
   - 在 `docs/.vuepress/config.ts` 中添加 Umami 脚本

**总计时间：约 8 分钟** ⏱️

> 💡 **提示**：如果你是第一次配置，建议按照下面的详细步骤操作。

---

## 第一步：选择部署方式

Umami 支持多种部署方式，你可以根据需求选择：

### 方式一：Vercel 部署（推荐）

- ✅ **免费使用**
- ✅ **自动 HTTPS**
- ✅ **全球 CDN 加速**
- ✅ **自动部署**
- ✅ **配置简单**

### 方式二：Railway 部署

- ✅ **免费额度**
- ✅ **内置数据库**
- ✅ **一键部署**

### 方式三：Docker 部署

- ✅ **完全控制**
- ✅ **适合服务器**
- ⚠️ 需要自己管理服务器

### 方式四：其他平台

- **Netlify**：类似 Vercel
- **Render**：类似 Railway
- **自建服务器**：完全自主控制

> 💡 **推荐**：对于大多数用户，建议使用 **Vercel 部署**，配置最简单。

---

## 第二步：部署 Umami 到 Vercel

### 2.1 注册 Vercel 账号

1. 访问 Vercel 官网：https://vercel.com/
2. 点击「Sign Up」按钮
3. 使用 GitHub 账户进行快捷登录（推荐）

> 💡 **提示**：如果你未登录，Vercel 会让你注册或登录，请使用 GitHub 账户进行快捷登录。

### 2.2 一键部署 Umami

点击以下链接，跳转至 Vercel 进行 Umami 部署：

**[一键部署到 Vercel](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fumami-software%2Fumami)**

或者手动操作：

1. 访问 Vercel Dashboard
2. 点击「New Project」
3. 选择「Import Git Repository」
4. 输入 Umami 仓库地址：`https://github.com/umami-software/umami`
5. 点击「Deploy」

### 2.3 等待部署完成

部署过程中，Vercel 会自动构建和部署项目：

等待部署完成后，你会看到一个部署成功的页面，但此时还不能正常使用，需要配置数据库和环境变量。

### 2.4 获取部署地址

部署完成后，你会得到一个 Umami 服务地址，格式如下：

```
https://your-project-name.vercel.app
```

这个地址就是你的 Umami 服务地址，后续配置会用到。

> 💡 **提示**：记下这个地址，后续配置时会用到。

---

## 第三步：配置数据库

Umami 需要数据库来存储统计数据。支持 PostgreSQL 和 MySQL。

### 3.1 选择数据库服务

#### 选项一：Supabase（推荐，免费）

1. 访问 Supabase 官网：https://supabase.com/
2. 使用 GitHub 账户登录
3. 点击「New Project」
4. 填写项目信息：
   - **Name**：例如 `umami-db`
   - **Database Password**：设置数据库密码（**请妥善保管**）
   - **Region**：选择离你最近的区域
5. 点击「Create new project」
6. 等待数据库创建完成（约 1-2 分钟）

#### 选项二：Railway（推荐，免费）

1. 访问 Railway 官网：https://railway.app/
2. 使用 GitHub 账户登录
3. 点击「New Project」
4. 选择「Provision PostgreSQL」或「Provision MySQL」
5. 等待数据库创建完成

#### 选项三：PlanetScale（MySQL，免费）

1. 访问 PlanetScale 官网：https://planetscale.com/
2. 使用 GitHub 账户登录
3. 创建数据库
4. 获取连接信息

#### 选项四：其他数据库服务

- **Neon**：PostgreSQL，免费额度
- **ElephantSQL**：PostgreSQL，免费额度
- **Aiven**：PostgreSQL/MySQL，免费试用

> 💡 **推荐**：对于大多数用户，建议使用 **Supabase**，免费且配置简单。

### 3.2 获取数据库连接信息

#### Supabase 获取连接信息

1. 进入 Supabase 项目
2. 点击左侧菜单「Settings」→「Database」
3. 找到「Connection string」部分
4. 选择「URI」格式，你会看到类似这样的连接字符串：

```
postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
```

5. 记录以下信息：
   - **Database URL**：完整的连接字符串
   - **Database Host**：例如 `db.xxxxx.supabase.co`
   - **Database Port**：`5432`（PostgreSQL）或 `3306`（MySQL）
   - **Database Name**：通常是 `postgres`（PostgreSQL）或数据库名称
   - **Database User**：通常是 `postgres`
   - **Database Password**：你设置的密码

#### Railway 获取连接信息

1. 进入 Railway 项目
2. 点击数据库服务
3. 在「Variables」标签中可以看到：
   - `DATABASE_URL`：完整的连接字符串
   - `MYSQL_HOST` 或 `PGHOST`：数据库主机
   - `MYSQL_PORT` 或 `PGPORT`：端口
   - `MYSQL_DATABASE` 或 `PGDATABASE`：数据库名
   - `MYSQL_USER` 或 `PGUSER`：用户名
   - `MYSQL_PASSWORD` 或 `PGPASSWORD`：密码

> ⚠️ **重要**：请妥善保管数据库连接信息，不要泄露给他人。

---

## 第四步：配置环境变量

### 4.1 进入 Vercel 项目设置

1. 在 Vercel Dashboard 中找到你的 Umami 项目
2. 点击项目进入详情页
3. 点击「Settings」→「Environment Variables」

### 4.2 配置必需的环境变量

#### 环境变量 1：DATABASE_URL（必需）

- **Key**：`DATABASE_URL`
- **Value**：你的数据库连接字符串
  - PostgreSQL 格式：`postgresql://username:password@host:port/database`
  - MySQL 格式：`mysql://username:password@host:port/database`
- **Environments**：选择 `All Environments`（Production、Preview、Development）

> 💡 **示例**：
> - PostgreSQL：`postgresql://postgres:password@db.xxxxx.supabase.co:5432/postgres`
> - MySQL：`mysql://user:password@host:3306/database`

#### 环境变量 2：HASH_SALT（必需）

- **Key**：`HASH_SALT`
- **Value**：随机字符串（用于加密，建议使用强随机字符串）
- **Environments**：选择 `All Environments`
- **生成方法**：可以使用在线工具生成，或运行以下命令：
  ```bash
  openssl rand -base64 32
  ```

> 💡 **提示**：`HASH_SALT` 用于加密用户密码，请妥善保管。

#### 环境变量 3：DATABASE_TYPE（可选）

如果使用 MySQL，需要设置：

- **Key**：`DATABASE_TYPE`
- **Value**：`mysql`
- **Environments**：选择 `All Environments`

> 💡 **提示**：如果使用 PostgreSQL，可以不设置此变量（默认使用 PostgreSQL）。

### 4.3 配置可选的环境变量

#### 环境变量 4：APP_SECRET（可选）

- **Key**：`APP_SECRET`
- **Value**：随机字符串（用于会话加密）
- **Environments**：选择 `All Environments`
- **生成方法**：可以使用在线工具生成，或运行以下命令：
  ```bash
  openssl rand -base64 32
  ```

#### 环境变量 5：DISABLE_TELEMETRY（可选）

- **Key**：`DISABLE_TELEMETRY`
- **Value**：`true`（禁用遥测数据）
- **Environments**：选择 `All Environments`

#### 环境变量 6：FORCE_SSL（可选）

- **Key**：`FORCE_SSL`
- **Value**：`true`（强制使用 HTTPS）
- **Environments**：选择 `All Environments`

### 4.4 环境变量配置清单

配置完成后，请检查以下环境变量：

- [ ] `DATABASE_URL` 已配置（必需）
- [ ] `HASH_SALT` 已配置（必需）
- [ ] `DATABASE_TYPE` 已配置（如果使用 MySQL）
- [ ] `APP_SECRET` 已配置（可选，推荐）
- [ ] 其他可选环境变量已配置（按需）

### 4.5 重新部署

配置完环境变量后，需要重新部署项目使配置生效：

1. 点击「Deployments」标签
2. 找到最新的部署记录
3. 点击右侧的「⋯」菜单
4. 选择「Redeploy」
5. 确认重新部署

等待重新部署完成后，Umami 应该可以正常访问了。

---

## 第五步：创建网站并获取网站 ID

### 5.1 访问 Umami 管理后台

1. 访问你的 Umami 服务地址：`https://your-project-name.vercel.app`
2. 首次访问会看到登录页面

### 5.2 创建管理员账号

1. 点击「Sign up」或「Create account」
2. 填写注册信息：
   - **Username**：管理员用户名（例如：`admin`）
   - **Password**：管理员密码（建议使用强密码）
   - **Confirm Password**：确认密码
3. 点击「Sign up」完成注册
4. 注册成功后会自动登录

> ⚠️ **重要**：请妥善保管管理员账号和密码。

### 5.3 创建网站

1. 登录后，点击「Add website」或「添加网站」按钮
2. 填写网站信息：
   - **Name**：网站名称（例如：`我的博客`）
   - **Domain**：网站域名（例如：`blog.example.com` 或 `localhost`）
   - **Enable tracking**：启用追踪（保持开启）
3. 点击「Save」保存

> 💡 **提示**：
> - 如果本地测试，Domain 可以填写 `localhost`
> - 如果部署到生产环境，填写实际域名
> - 可以添加多个网站进行管理

### 5.4 获取网站 ID

创建网站后，你会看到一个网站列表，每个网站都有一个唯一的 **Website ID**（也称为 Tracking ID）。

1. 在网站列表中，找到你刚创建的网站
2. 点击网站名称进入详情页
3. 在网站设置中可以看到 **Website ID**，格式类似：`xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`
4. 或者点击「Settings」→「Tracking Code」，可以看到完整的追踪代码

> 💡 **提示**：记下这个 Website ID，后续配置博客时会用到。

### 5.5 查看追踪代码

在网站设置中，你可以看到完整的追踪代码：

```html
<script
  defer
  src="https://your-project-name.vercel.app/script.js"
  data-website-id="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
></script>
```

这个代码需要添加到你的博客中。

---

## 第六步：在博客中配置 Umami

### 6.1 打开配置文件

打开 `docs/.vuepress/config.ts` 文件，找到 `head` 配置部分（大约在第 23 行）。

### 6.2 找到 Umami 配置

找到被注释的 Umami 配置部分：

```typescript
// Umami 统计分析（示例，按需开启并替换为你自己的配置）
// ['script', {
//     defer: true,
//     src: 'https://your-umami-domain.com/script.js',
//     'data-website-id': 'your-website-id'
// }],
```

### 6.3 取消注释并填写配置

将上面的注释取消，并替换为你的实际配置：

```typescript
// Umami 统计分析
['script', {
    defer: true,
    src: 'https://your-project-name.vercel.app/script.js', // 替换为你的 Umami 服务地址
    'data-website-id': 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' // 替换为你的网站 ID
}],
```

### 6.4 完整配置示例

以下是完整的 `head` 配置示例：

```typescript
head: [
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }],
    ['meta', { name: 'keywords', content: '博客,技术博客,Java,Python,前端,后端,模板' }],
    ['meta', { name: 'author', content: '你的名字' }],
    ['link', { rel: 'icon', href: '/favicon.png' }],
    
    // Umami 统计分析
    ['script', {
        defer: true,
        src: 'https://your-project-name.vercel.app/script.js',
        'data-website-id': 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
    }],
],
```

### 6.5 实际配置示例

以下是一个实际可用的配置示例（请替换为你的实际地址和网站 ID）：

```typescript
// 在 docs/.vuepress/config.ts 中
head: [
    // ... 其他配置 ...
    
    // Umami 统计分析
    ['script', {
        defer: true,
        src: 'https://umami-server-xxx.vercel.app/script.js', // 你的 Umami 服务地址
        'data-website-id': 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' // 你的网站 ID
    }],
],
```

### 6.6 配置检查清单

配置完成后，请检查以下项目：

- [ ] Umami 服务地址已正确填写（不是 `your-umami-domain.com`）
- [ ] 服务地址格式正确（以 `https://` 开头，以 `/script.js` 结尾）
- [ ] 网站 ID 已正确填写（不是 `your-website-id`）
- [ ] 网站 ID 格式正确（UUID 格式）
- [ ] 配置文件语法正确（没有缺少逗号或括号）

---

## 第七步：验证配置

### 7.1 启动本地开发服务器

```bash
npm run dev
```

### 7.2 访问博客页面

1. 打开浏览器访问 `http://localhost:8080`
2. 访问任意页面
3. 等待几秒钟让统计数据上传

### 7.3 检查浏览器控制台

1. 打开浏览器开发者工具（F12）
2. 切换到「Network」标签
3. 刷新页面
4. 查找是否有对 Umami 服务的请求（例如：`/api/collect` 或 `/api/send`）
5. 如果看到请求且状态码为 200，说明配置成功

### 7.4 验证统计数据

1. 访问你的 Umami 管理后台：`https://your-project-name.vercel.app`
2. 登录后，进入你创建的网站
3. 你应该能看到：
   - **实时访问数据**：当前在线访客
   - **访问统计**：页面浏览量、独立访客等
   - **页面分析**：最受欢迎的页面
   - **来源分析**：访客来源（直接访问、搜索引擎等）
   - **设备分析**：设备类型、浏览器、操作系统等

### 7.5 测试不同页面

1. 访问博客的不同页面（首页、文章页、留言板等）
2. 在 Umami 后台查看统计数据
3. 确认所有页面都能正常统计

> 💡 **提示**：统计数据可能需要几秒钟才能显示在后台，请耐心等待。

---

## 高级配置选项

### 自定义事件追踪

Umami 支持自定义事件追踪，可以在代码中手动触发：

```javascript
// 追踪自定义事件
umami.track('button-click', { button: 'subscribe' });
```

### 禁用自动页面追踪

如果只想追踪特定页面，可以禁用自动追踪：

```typescript
['script', {
    defer: true,
    src: 'https://your-project-name.vercel.app/script.js',
    'data-website-id': 'your-website-id',
    'data-auto-track': 'false' // 禁用自动追踪
}],
```

### 配置数据收集选项

可以配置数据收集的详细程度：

```typescript
['script', {
    defer: true,
    src: 'https://your-project-name.vercel.app/script.js',
    'data-website-id': 'your-website-id',
    'data-do-not-track': 'true', // 尊重 Do Not Track 设置
    'data-cache': 'true', // 启用缓存
}],
```

### 多网站配置

如果需要在多个网站中使用同一个 Umami 实例：

1. 在 Umami 后台创建多个网站
2. 为每个网站获取不同的网站 ID
3. 在对应的网站配置中使用对应的网站 ID

### 自定义域名

如果需要使用自定义域名访问 Umami：

1. 在 Vercel 项目设置中添加自定义域名
2. 配置 DNS 解析
3. 更新博客配置中的 Umami 服务地址

---

## 数据管理

### 查看统计数据

#### 实时数据

1. 访问 Umami 管理后台
2. 进入网站详情页
3. 可以看到实时访问数据：
   - 当前在线访客
   - 今日访问量
   - 今日独立访客

#### 历史数据

1. 在网站详情页中，可以查看：
   - **访问趋势**：按日期查看访问量趋势
   - **页面分析**：最受欢迎的页面
   - **来源分析**：访客来源统计
   - **设备分析**：设备、浏览器、操作系统统计
   - **地理位置**：访客地理位置分布（如果启用）

### 导出数据

1. 在网站详情页中，点击「Export」按钮
2. 选择导出格式（CSV 或 JSON）
3. 选择时间范围
4. 下载数据文件

### 删除数据

> ⚠️ **警告**：删除操作不可恢复，请谨慎操作。

1. 在网站设置中，可以删除特定时间范围的数据
2. 或者删除整个网站（会删除所有相关数据）

### 备份数据

建议定期备份统计数据：

1. 定期导出统计数据（CSV 或 JSON 格式）
2. 将数据文件保存到安全的位置
3. 建议每月备份一次

---

## 常见问题

### Q1: 统计数据不显示

**可能原因：**

1. Umami 服务地址配置错误
2. 网站 ID 配置错误
3. 数据库连接问题
4. 网络连接问题

**解决方案：**

1. 检查 `config.ts` 中的 Umami 服务地址是否正确
2. 确认网站 ID 是否正确
3. 检查浏览器控制台是否有错误信息
4. 确认 Umami 服务正常运行
5. 检查数据库连接是否正常

### Q2: 提示「无法连接到 Umami 服务」

**可能原因：**

1. Umami 服务未正常运行
2. 环境变量配置错误
3. 数据库连接失败

**解决方案：**

1. 访问 Umami 服务地址，确认服务正常运行
2. 检查 Vercel 部署状态
3. 检查环境变量配置是否正确
4. 检查数据库连接是否正常
5. 查看 Vercel 日志，检查是否有错误信息

### Q3: 统计数据延迟显示

**可能原因：**

1. 数据收集需要时间
2. 数据库写入延迟

**解决方案：**

1. 统计数据通常需要几秒钟到几分钟才能显示
2. 这是正常现象，请耐心等待
3. 如果长时间不显示，检查数据库连接

### Q4: 如何重置统计数据

如果需要重置统计数据：

1. 在 Umami 管理后台，进入网站设置
2. 可以删除特定时间范围的数据
3. 或者删除网站后重新创建

> ⚠️ **警告**：删除操作不可恢复。

### Q5: 免费版有什么限制

Vercel 免费版的限制：

- **函数执行时间**：10 秒
- **带宽**：100GB/月
- **构建时间**：45 分钟/月

Supabase 免费版的限制：

- **数据库大小**：500MB
- **带宽**：2GB/月
- **API 请求**：50,000/月

对于个人博客来说，免费版通常足够使用。

### Q6: 如何迁移统计数据

如果需要迁移统计数据：

1. 导出原 Umami 实例的数据
2. 在新 Umami 实例中导入数据
3. 或者使用数据库迁移工具

> 💡 **提示**：Umami 数据格式请参考官方文档。

### Q7: 统计数据不准确

**可能原因：**

1. 浏览器插件拦截（如广告拦截器）
2. 用户禁用 JavaScript
3. 爬虫访问

**解决方案：**

1. 这是正常现象，所有统计工具都会遇到
2. 统计数据仅供参考，不是绝对准确的
3. 可以结合其他统计工具（如服务器日志）进行对比

### Q8: 如何查看 API 调用统计

#### Vercel 使用统计

1. 登录 Vercel Dashboard
2. 进入你的项目
3. 点击「Analytics」标签
4. 可以查看：
   - 函数调用次数
   - 带宽使用情况
   - 响应时间统计

#### Supabase 使用统计

1. 登录 Supabase Dashboard
2. 进入你的项目
3. 点击「Settings」→「Usage」
4. 可以查看：
   - 数据库大小
   - API 请求次数
   - 带宽使用情况

> 💡 **提示**：注意监控使用量，避免超出免费额度。

### Q9: 如何配置邮件通知

Umami 目前不支持邮件通知功能。如果需要接收统计报告：

1. 定期登录 Umami 后台查看数据
2. 或者使用第三方工具定期导出数据
3. 或者使用 Umami API 获取数据并发送邮件

### Q10: 如何防止数据丢失

**预防措施：**

1. 定期导出统计数据（CSV 或 JSON 格式）
2. 定期备份数据库（如果使用自建数据库）
3. 建议每月备份一次
4. 将备份文件保存到安全的位置

**恢复方法：**

1. 如果有备份，可以在 Umami 后台导入数据
2. 或者使用数据库备份恢复

> ⚠️ **警告**：请务必定期备份数据，避免数据丢失。

### Q11: 配置后脚本不加载

**可能原因：**

1. Umami 服务地址配置错误
2. 网络连接问题
3. 浏览器插件拦截（如广告拦截器）
4. 脚本路径错误

**解决方案：**

1. 检查浏览器控制台是否有错误信息
2. 尝试禁用浏览器插件（如广告拦截器）
3. 检查网络连接，确保可以访问 Umami 服务
4. 确认脚本路径正确（应该是 `/script.js`）
5. 尝试使用其他浏览器测试

### Q12: 如何配置自定义域名

如果需要使用自定义域名访问 Umami：

1. 在 Vercel 项目设置中添加自定义域名
2. 配置 DNS 解析（添加 CNAME 记录）
3. 等待 DNS 生效（通常几分钟到几小时）
4. 更新博客配置中的 Umami 服务地址

### Q13: 如何追踪多个网站

如果需要追踪多个网站：

1. 在 Umami 后台创建多个网站
2. 为每个网站获取不同的网站 ID
3. 在对应的网站配置中使用对应的网站 ID
4. 可以在同一个 Umami 实例中管理所有网站

### Q14: Vercel 部署失败

**可能原因：**

1. 环境变量配置错误
2. 构建超时
3. 代码错误
4. 数据库连接失败

**解决方案：**

1. 检查 Vercel 部署日志，查看错误信息
2. 确认环境变量配置正确（DATABASE_URL、HASH_SALT 等）
3. 检查构建日志，查看是否有代码错误
4. 确认数据库连接正常
5. 尝试重新部署

### Q15: 数据库连接失败

**可能原因：**

1. 数据库连接字符串错误
2. 数据库服务未启动
3. 网络连接问题
4. 数据库密码错误

**解决方案：**

1. 检查 DATABASE_URL 环境变量是否正确
2. 确认数据库服务正常运行
3. 检查数据库密码是否正确
4. 确认数据库允许外部连接（如果使用云数据库）
5. 查看 Vercel 日志，检查连接错误信息

---

## 注意事项

### ⚠️ 安全建议

1. **不要泄露网站 ID**：网站 ID 应该保密，不要提交到公开的代码仓库
2. **使用环境变量**：生产环境建议使用环境变量存储敏感信息
3. **定期更新**：定期更新 Umami 版本，修复安全漏洞
4. **数据库安全**：妥善保管数据库连接信息，不要泄露

### 💡 最佳实践

1. **使用环境变量**（推荐）：

在生产环境中，建议使用环境变量来配置 Umami：

```typescript
// 在 config.ts 中
head: [
    // ... 其他配置 ...
    
    // Umami 统计分析
    ['script', {
        defer: true,
        src: process.env.UMAMI_URL || 'https://your-umami-domain.com/script.js',
        'data-website-id': process.env.UMAMI_WEBSITE_ID || 'your-website-id'
    }],
],
```

2. **定期备份数据**：定期在 Umami 后台导出统计数据
3. **监控使用量**：定期查看 Vercel 和数据库使用统计，避免超出免费额度
4. **配置自定义域名**：使用自定义域名访问 Umami，提升专业度
5. **多网站管理**：如果管理多个网站，使用同一个 Umami 实例统一管理

### 📚 相关资源

- [Umami 官方文档](https://umami.is/docs)
- [Umami GitHub](https://github.com/umami-software/umami)
- [Vercel 官方文档](https://vercel.com/docs)
- [Supabase 官方文档](https://supabase.com/docs)
- [VuePress Reco 主题文档](https://theme-reco.vuejs.press/)

---

## 总结

配置 Umami 网站统计系统的完整流程：

### 快速检查清单

- [ ] 注册 Vercel 账号（使用 GitHub 登录）
- [ ] 部署 Umami 到 Vercel
- [ ] 创建数据库（Supabase、Railway 或其他）
- [ ] 获取数据库连接信息
- [ ] 配置 Vercel 环境变量（DATABASE_URL、HASH_SALT 等）
- [ ] 重新部署 Vercel 项目
- [ ] 访问 Umami 管理后台注册账号
- [ ] 创建网站并获取网站 ID
- [ ] 在 `config.ts` 中配置 Umami 脚本
- [ ] 本地测试统计功能
- [ ] 验证统计数据是否正常显示
- [ ] 部署到生产环境并再次验证

### 配置步骤总结

1. ✅ **部署 Umami**：使用 Vercel 一键部署 Umami 服务端
2. ✅ **配置数据库**：创建 PostgreSQL 或 MySQL 数据库
3. ✅ **配置环境变量**：在 Vercel 中配置数据库连接和其他环境变量
4. ✅ **创建网站**：在 Umami 后台创建网站并获取网站 ID
5. ✅ **配置博客**：在 `config.ts` 中添加 Umami 追踪脚本
6. ✅ **验证配置**：本地测试并验证统计功能正常
7. ✅ **部署上线**：部署到生产环境并再次验证

### 重要提示

- ⚠️ **安全**：不要将网站 ID 提交到公开代码仓库
- ⚠️ **环境变量**：必须在 Vercel 中配置环境变量，否则无法正常工作
- 💡 **免费版限制**：注意 Vercel 和数据库的免费额度限制
- 💡 **定期备份**：建议定期导出统计数据
- 💡 **隐私友好**：Umami 不收集个人数据，符合 GDPR 要求

如果遇到问题，请参考「常见问题」部分或查看相关文档。

---

<div align="center">

## 🎉 配置完成！

**配置完成后，你的博客就可以使用 Umami 网站统计功能了！**

### 📚 相关资源

- [Umami 官方文档](https://umami.is/docs)
- [Umami GitHub](https://github.com/umami-software/umami)
- [Vercel 官方文档](https://vercel.com/docs)
- [Supabase 官方文档](https://supabase.com/docs)
- [VuePress Reco 主题文档](https://theme-reco.vuejs.press/)
- [项目 Issues](https://github.com/YIXUAN-oss/Blog-Template/issues)

### 💬 获取帮助

如有问题，欢迎通过以下方式获取帮助：

- 📧 提交 [Issue](https://github.com/YIXUAN-oss/Blog-Template/issues)
- 📖 查看 [使用指南.md](./使用指南.md)
- 🔍 搜索相关问题
- 📚 查看 [Umami 官方文档](https://umami.is/docs)

---

**祝你使用愉快！** ✨

</div>