---
title: '国产大模型密集开源｜AI 新闻速递 · 2026-08-29'
description: '2026-08-29 AI 领域重要动态与信息来源整理。'
pubDate: 2026-08-29
category: 'AI新闻速递'
tags: ['AI', '新闻']
draft: false
---

<!-- workbuddy-source: automation-2026-08-03-08-27-32/AI新闻速递-2026-08-29.md -->
<!-- workbuddy-source-sha256: 623ebc27ca53cbb9d68e4ba7c814ba02270282f978ee5c517415a73142446185 -->

> 采集范围：2026-08-25 至 2026-08-29 期间 AI 领域的重要官方发布与权威媒体报道。已剔除未经证实或来源不明的传闻。

---

## 1. 腾讯混元发布并开源新一代大模型 Hy4 preview

**发布时间**：2026-08-28

**核心要点**：
- 腾讯混元新一代旗舰大语言模型 **Hy4 preview** 正式发布并开源，采用 MoE 架构。
- 总参数 **770B**，单次推理激活参数 **49B**，上下文长度突破 **1M tokens**，词表 120,832，License 为 Apache 2.0。
- 定位“为生产力而生”，重点优化代码、办公、游戏开发和科研等真实生产力场景。
- 已在 WorkBuddy、CodeBuddy、元宝、ima 等腾讯产品同步首发，并在腾讯云 TokenHub 与 OpenRouter 上线 API。
- API 定价：输入 6 元/百万 tokens，输出 18 元/百万 tokens，缓存命中 0.3 元/百万 tokens；WorkBuddy/CodeBuddy 限时两周免费体验。

**来源**：[腾讯官方网站](https://www.tencent.com/zh-cn/tencent-releases-and-open-sources-tencent-hy4-preview/)、[腾讯云开发者社区](https://cloud.tencent.com/developer/article/2733836)、[InfoQ](https://www.infoq.cn/news/SxrNXURUimQf4hL83ybj)

---

## 2. 阿里通义千问开源 Qwen3.8-Flash-Next

**发布时间**：2026-08-26 晚

**核心要点**：
- 阿里巴巴通义千问团队发布并开源 **Qwen3.8-Flash-Next**，作为下一代 Qwen4 架构的预览版。
- 主模型 **125B** 参数，额外挂载 **51B** N-gram Embedding，每 token 仅激活 **6B** 参数。
- 原生上下文 **262K**，可扩展至 **1M tokens**；训练成本约为 Qwen3.7-Plus 的 1/9。
- 在多项基准测试中超越 DeepSeek-V4-Flash 与 Claude Opus 4.6，并同步支持 vLLM/SGLang Day-0 推理。
- 权重已发布于 Hugging Face 与 ModelScope，生产版 API 已在千问 AI 平台上线。

**来源**：[Qwen 官方博客](https://qwen.ai/blog?id=qwen3.8-flash-next)、[GitHub QwenLM 官方仓库](https://github.com/QwenLM/Qwen3.8-Flash-Next/commit/4f58f4ddd855bedaf7eadcd53bbbb1b3362cecff)、[阿里云开发者社区](https://developer.aliyun.com/article/1759085)

---

## 3. 智谱开源 GLM-5.3-Flash 原生多模态大模型

**发布时间**：2026-08-26 晚

**核心要点**：
- 智谱 Z.ai 上线并开源 **GLM-5.3-Flash**，为 GLM-5 系列首个原生多模态模型。
- 总参数 **320B**，激活参数 **18B**，上下文窗口 **1M tokens**，最大输出 131,072 tokens，支持文本、图像、视频输入。
- 采用稀疏与线性注意力混合架构，注意力计算量降至前代近 1/3，KV 缓存缩减 4 倍以上。
- Artificial Analysis 综合智能指数 **57 分**，与 Claude Opus 4.8 持平；API 定价为前代 GLM-5.3 的约 1/10。
- 所有上线流量首次由国产芯片集群大规模承载，自研推理引擎端到端性能较基线提升 3 倍。
- 权重以 MIT 协议发布于 Hugging Face，支持 SGLang、vLLM、TokenSpeed 等框架 Day-0 推理。

**来源**：[Z.ai 官方博客](https://z.ai/blog/glm-5.3-flash)、[智谱华章官网](https://www.zhipuai.cn/zh/research/163)

---

## 4. OpenAI 宣布终止向 Cursor 提供模型

**发布时间**：2026-08-28

**核心要点**：
- OpenAI 官方博客宣布，自 **2026-11-12** 起终止向 Cursor 提供模型访问权限。
- 原因是 Cursor 被 SpaceX 收购后，OpenAI 对 SpaceX/马斯克方面能否遵守服务条款“失去信任”，并引用此前与 Twitter、xAI 等合作中的违约行为作为依据。
- Cursor 此前是 OpenAI 模型的重度集成方，OpenAI 建议受影响用户迁移至 ChatGPT Enterprise 或 OpenAI 官方 API。

**来源**：[OpenAI 官方博客](https://openai.com/index/our-decision-on-cursor-following-its-acquisition-by-spacex/)、[Reuters](https://www.reuters.com)、[财联社](https://www.cls.cn)

---

## 5. Anthropic 发布 Model Hardware Standard（MHS）研究预览

**发布时间**：2026-08-27

**核心要点**：
- Anthropic 发布 **Model Hardware Standard（MHS）** 研究预览，旨在为 AI 智能体安全操作实验室与制造物理设备提供统一的模型无关规范。
- 与 QuEra、MIT 物理工程系统中心等合作验证，支持光学镊子、量子计算设备等精密仪器。
- 官方数据显示，采用 MHS 后设备集成时间从数周/数月缩短至数小时/分钟，激光恢复成功率达 **99.3%**。

**来源**：[Anthropic 官方新闻页](https://www.anthropic.com/news/model-hardware-standard-research-preview)、[QuEra 官方新闻稿](https://www.quera.com)

---

## 6. OpenAI 公布自研推理芯片 Jalapeño 首批测试结果

**发布时间**：2026-08-25

**核心要点**：
- OpenAI 官方博客公布其自研 AI 推理芯片 **Jalapeño** 的首批测试结果。
- 与对比系统（Nvidia GB200/GB300）相比，每瓦特可完成 **1.5–1.9 倍** 的 AI 计算量，延迟降低 **1.7–3.6 倍**。
- 测试模型包括 GPT-OSS 120B、DeepSeek R1 与 Kimi K2.5 1T。
- OpenAI 表示 Jalapeño 主要面向推理与智能体负载，将继续推进后续迭代。

**来源**：[OpenAI 官方博客](https://openai.com/index/jalapeno-first-results/)、[DeepTech 深科技](https://www.deeptech.cn)

---

## 7. 英伟达发布 2027 财年第二季度财报

**发布时间**：2026-08-26 盘后

**核心要点**：
- 英伟达 2027 财年 Q2 营收 **962.2 亿美元**，同比增长约 **106%**；数据中心业务营收约 **890 亿美元**。
- 公司对 2028 财年全年营收增速给出约 **70%** 的指引。
- 财报发布后盘后股价上涨约 7%。

**来源**：[环球网](https://www.huanqiu.com)、[中新经纬](https://www.jwview.com)、[Reuters via Economic Times](https://economictimes.indiatimes.com)

---

## 8. 优必选发布 2026 年中期业绩公告

**发布时间**：2026-08-28 晚间公告，08-29 广泛报道

**核心要点**：
- 优必选 2026 年上半年营收 **12.7 亿元人民币**，同比增长 **104.2%**。
- 全尺寸人形机器人销量 **921 台**，同比增长 **1946.7%**。
- 毛利约 **5.68 亿元**，毛利率 **44.7%**。
- 业绩公告已按香港联交所要求正式披露。

**来源**：[香港交易所披露易 HKEX News](https://www.hkexnews.hk)、[澎湃新闻](https://www.thepaper.cn)、[南方日报/南方+](https://www.southcn.com)、[东方财富](https://finance.eastmoney.com)

---

## 已剔除 / 未纳入说明

- **“英伟达拟 129 亿美元收购 Hugging Face”**：目前仅在部分聚合新闻中以“据报”形式出现，未见 Nvidia 或 Hugging Face 官方确认，按“未经证实或来源不明的信息直接剔除”原则未予收录。

---

*报告生成时间：2026-08-29 10:25 (GMT+8)*
