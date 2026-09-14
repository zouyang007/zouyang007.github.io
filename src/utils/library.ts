export const libraryNames: Record<string, string> = {
 '历史上的今天': '大陆纪要',
 '每日新闻早报': '万界见闻',
 'AI新闻速递': '天机秘录',
 'GitHub高分项目': '百工造物',
 '每周总结': '万界周志',
};
export const libraryName = (category: string) => libraryNames[category] ?? category;
