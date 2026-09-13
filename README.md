# 未名手记

“未名手记”是部署在 GitHub Pages 的中文静态博客，使用 Astro、Markdown 和 Pagefind 构建。当前界面采用修仙藏书阁风格，并提供文章列表、年度归档、分类书架、标签、中文全文搜索、RSS、站点地图、深浅色主题和可视化界面设置。

- 公开站点：<https://zouyang007.github.io/>
- 发布分支：`main`
- 自动部署：GitHub Actions

## 项目结构

```text
.
├─ .github/                 # 自动部署与 Dependabot
├─ docs/                    # 写作模板和维护记录
├─ public/                  # 原样发布的站点资源
├─ scripts/                 # 构建后的自动验证程序
└─ src/
   ├─ components/           # 页面组件
   ├─ content/blog/         # Markdown 文章
   ├─ layouts/              # 通用页面与文章布局
   ├─ pages/                # 首页、文章、归档、分类、标签和搜索
   ├─ styles/               # 全站基础样式与藏书阁主题
   └─ utils/                # 文章、分类与书架辅助逻辑
```

## 本地运行

需要 Node.js 22.12 或更高版本。

```powershell
npm ci
npm run dev
```

开发地址默认为 <http://localhost:4321/>。全文搜索只存在于生产构建中；测试完整站点时使用：

```powershell
npm run build
npm run preview
```

`npm run build` 会依次完成 Astro 类型检查、静态站点生成、Pagefind 中文索引和站点完整性验证。最后一步会检查：

- 核心页面和每篇公开文章是否生成；
- 草稿是否意外进入公开站点；
- HTML 中的站内链接和资源引用是否有效；
- WorkBuddy 来源标记是否重复或缺少哈希；
- 已停用的 `WorkBuddy` 标签是否重新出现；
- `dist`、`.astro`、依赖目录或环境变量文件是否误入 Git。

已有构建结果时，也可以单独运行 `npm run verify`。

## 新增文章

1. 将 [`docs/article-template.md.example`](docs/article-template.md.example) 复制到 `src/content/blog/`。
2. 使用稳定的英文短链接命名，例如 `how-i-take-notes.md`。
3. 填写文章信息和正文。
4. 本地执行 `npm run build`。
5. 检查通过后提交并推送到 `main`，GitHub Actions 会自动发布。

文章地址与文件名绑定，例如 `how-i-take-notes.md` 对应 `/posts/how-i-take-notes/`。公开后不要随意改名，以免旧链接失效。

文章信息格式：

```yaml
---
title: '文章标题'
description: '用一两句话说明读者能从文章中获得什么。'
pubDate: 2026-09-13
updatedDate: 2026-09-14 # 可选
category: '分类名称'
tags: ['标签一', '标签二']
draft: false
heroImage: '../../assets/your-image.jpg' # 可选
---
```

私人内容应保存在仓库外，或放在已被 Git 忽略的 `drafts/` 目录。`draft: true` 只会阻止页面发布；如果源文件已经推送到公开仓库，其他人仍然可以看到它。

## 自动内容与长期维护

每日 WorkBuddy 同步和每周内容任务只向 `src/content/blog/` 添加文章，不应修改主题、配置或历史文章。新文章不得添加 `WorkBuddy` 标签。

- 每次发布：运行 `npm run build`，再提交、推送并检查 GitHub Actions。
- 每月：处理 Dependabot、安全提醒和失效外部链接。
- 每季度：在单独分支升级 Astro 与 npm 依赖，验证后再合并。
- 每半年：克隆完整仓库作为离线备份，并复查简介、联系方式和分类。

仓库清理和结构调整记录见 [`docs/maintenance-log.md`](docs/maintenance-log.md)。

## 独立域名

购买域名后，在 `public/CNAME` 中只写最终域名，同时修改 `astro.config.mjs` 或部署任务的 `SITE_URL`，完成 DNS 和 GitHub Pages 域名验证后再开启强制 HTTPS。不要配置通配符 DNS 记录。
