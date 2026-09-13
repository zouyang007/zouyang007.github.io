# 仓库维护记录

此文件记录会影响站点结构、构建流程或长期维护方式的变更。日常文章发布不必逐篇记录在这里，Git 提交历史已经保留文章变动。

## 2026-09-13：全仓库清理与结构优化

### 检查范围

- 对比本地 `main` 与 GitHub `origin/main` 的完整文件树；检查前两者完全同步。
- 检查所有已跟踪文件、Astro 页面和组件引用、公共资源、文章元数据、发布配置及定时任务使用的固定路径。
- 运行 Astro 类型检查、npm 生产依赖安全审计、完整生产构建和站内链接验证。

### 清理内容

- 删除不再被任何页面导入的旧版 `LibraryScene.astro` 组件。
- 删除 Astro 初始模板遗留且未被引用的 6 张占位图片。
- 删除样式中未声明、页面中未加载的 2 个 Atkinson 字体文件。
- 删除与 `AGENTS.md` 内容完全相同的重复 `CLAUDE.md`；保留唯一项目开发说明。
- 移除没有任何 `.mdx` 内容使用的 `@astrojs/mdx` 依赖和集成，内容集合固定读取 Markdown。
- 从 VS Code 推荐列表移除不再需要的 MDX 扩展。

### 结构优化

- 将文章模板从仓库根目录移动到 `docs/article-template.md.example`。
- 新增 `scripts/verify-site.mjs`，并接入生产构建；自动检查公开文章路由、草稿隔离、站内链接、WorkBuddy 来源唯一性和 Git 跟踪边界。
- 重写 README，使其反映当前线上地址、藏书阁界面、目录结构、自动内容规则和真实构建流程。
- 将 Astro 更新到当前兼容的补丁版本；保留 TypeScript 主版本不变，避免在清理任务中引入破坏性升级。

### 刻意保留

- `public/images/immortal-library.webp`：首页藏书阁入口正在使用。
- `UiCustomizer.astro`：可视化界面控制面板正在首页和全站布局使用。
- `public/favicon.ico`：虽然页面优先声明 SVG 图标，但保留作旧浏览器和直接 `/favicon.ico` 请求的兼容回退。
- `.vscode/`：仍是有效的 Astro 编辑器推荐与本地调试配置。
- 所有 `src/content/blog/` 文章：均通过内容集合校验，并保留既有永久链接；本次不改写历史内容。

### 验证基线

- Astro 检查必须保持 `0 errors / 0 warnings / 0 hints`。
- npm 生产依赖安全审计必须保持无已知漏洞。
- 生产构建、Pagefind 索引和 `scripts/verify-site.mjs` 必须全部成功后才允许发布。

### 本次结果

- Astro：`0 errors / 0 warnings / 0 hints`。
- npm：全部依赖 `0 vulnerabilities`；暂不跨主版本升级 TypeScript 7。
- 内容：45 篇 Markdown 源文章，45 个公开文章路由，未发现草稿公开。
- 输出：67 个 HTML 页面，Pagefind 收录 45 个页面、10,352 个中文词条。
- 链接：2,270 个站内页面与资源引用全部存在。
- Git：未跟踪 `dist`、`.astro`、`node_modules` 或环境变量文件；仓库对象完整性检查通过。
