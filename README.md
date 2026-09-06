# 未名手记

一个面向中文写作的 Astro 静态博客，包含文章、归档、分类、标签、中文全文搜索、RSS、站点地图、深浅色主题和 GitHub Pages 自动部署。

## 发布前必须修改

1. 编辑 `src/consts.ts`，替换博客名称、简介和作者。
2. 编辑 `src/pages/about.astro`，替换个人介绍和联系方式。
3. 在 GitHub 创建公开仓库 `<你的用户名>.github.io`。
4. 将本项目推送到仓库的 `main` 分支。
5. 在仓库的 `Settings → Pages → Build and deployment` 中选择 `GitHub Actions`。

自动部署会根据仓库所有者生成 `https://<你的用户名>.github.io`，因此无需把用户名写死在配置里。

## 本地使用

```powershell
npm install
npm run dev
```

打开 `http://localhost:4321`。全文搜索需要先生成生产文件：

```powershell
npm run build
npm run preview
```

## 写一篇文章

1. 复制 `article-template.md.example` 到 `src/content/blog/`。
2. 将文件命名为稳定的英文短链接，例如 `how-i-take-notes.md`。
3. 修改顶部信息并填写正文。
4. 运行 `npm run build`；检查通过后提交并推送。

文章地址将是 `/posts/how-i-take-notes/`。发布后不要轻易修改文件名。

未完成或私人草稿放在项目根目录的 `drafts/` 中。这个目录已被 Git 忽略，不能依赖 `draft: true` 来保护敏感内容，因为公开仓库里的源文件仍然可以被别人看到。

## 文章信息格式

```yaml
---
title: '文章标题'
description: '文章摘要'
pubDate: 2026-09-06
updatedDate: 2026-09-08 # 可选
category: '分类名称'
tags: ['标签一', '标签二']
draft: false
heroImage: '../../assets/example.jpg' # 可选
---
```

当 `draft: true` 时，文章不会进入页面、RSS、站点地图或搜索；但文件如果已经推送，仍能在公开仓库里被看到。

## 日常维护

- 每篇文章：本地预览 → `npm run build` → 提交 → 推送 → 检查 GitHub Actions。
- 每月：处理安全提醒和 Dependabot 更新，抽查外部链接。
- 每季度：在单独分支运行 `npx @astrojs/upgrade`，构建通过后再合并。
- 每半年：完整克隆仓库作为离线备份，并复查介绍、联系方式和分类。

## 使用独立域名

购买域名后，在 `public/CNAME` 中只写域名；将 GitHub Actions 中的 `SITE_URL` 改为该域名，配置 DNS，并在 GitHub Pages 设置中验证域名和强制 HTTPS。不要配置通配符 DNS 记录。
