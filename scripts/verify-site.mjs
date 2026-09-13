import { execFile } from 'node:child_process';
import { access, readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);
const root = process.cwd();
const distRoot = path.join(root, 'dist');
const contentRoot = path.join(root, 'src', 'content', 'blog');
const failures = [];

async function walk(directory) {
	const entries = await readdir(directory, { withFileTypes: true });
	const files = [];
	for (const entry of entries) {
		const absolute = path.join(directory, entry.name);
		if (entry.isDirectory()) files.push(...await walk(absolute));
		else if (entry.isFile()) files.push(absolute);
	}
	return files;
}

async function exists(file) {
	try {
		await access(file);
		return true;
	} catch {
		return false;
	}
}

function relative(file) {
	return path.relative(root, file).split(path.sep).join('/');
}

function htmlRoute(file) {
	const outputPath = path.relative(distRoot, file).split(path.sep).join('/');
	if (outputPath === 'index.html') return '/';
	if (outputPath.endsWith('/index.html')) return `/${outputPath.slice(0, -10)}`;
	return `/${outputPath}`;
}

function outputCandidates(urlPath) {
	let decoded;
	try {
		decoded = decodeURIComponent(urlPath);
	} catch {
		failures.push(`无法解码站内地址：${urlPath}`);
		return [];
	}
	const clean = decoded.replace(/^\/+/, '');
	if (!clean) return [path.join(distRoot, 'index.html')];
	if (decoded.endsWith('/')) return [path.join(distRoot, clean, 'index.html')];
	if (path.extname(clean)) return [path.join(distRoot, clean)];
	return [path.join(distRoot, clean), path.join(distRoot, clean, 'index.html')];
}

async function verifyTrackedFiles() {
	try {
		const { stdout } = await execFileAsync('git', ['ls-files'], { cwd: root });
		const forbidden = stdout
			.split(/\r?\n/)
			.filter(Boolean)
			.filter((file) => /^(dist|node_modules|\.astro)\//.test(file) || /^\.env(?:\.|$)/.test(file));
		for (const file of forbidden) failures.push(`不应纳入 Git 的生成或私密文件：${file}`);
	} catch (error) {
		failures.push(`无法读取 Git 文件清单：${error.message}`);
	}
}

async function verifyContent() {
	const markdownFiles = (await walk(contentRoot)).filter((file) => file.endsWith('.md'));
	const sourceOwners = new Map();
	let publishedCount = 0;

	for (const file of markdownFiles) {
		const name = path.basename(file);
		const info = await stat(file);
		const text = await readFile(file, 'utf8');
		if (info.size === 0) failures.push(`空文章文件：${relative(file)}`);
		if (!/^[a-z0-9]+(?:-[a-z0-9]+)*\.md$/.test(name)) failures.push(`文章文件名不是稳定英文短链接：${relative(file)}`);
		if (!/^---\r?\n[\s\S]+?\r?\n---/.test(text)) failures.push(`文章缺少有效 frontmatter：${relative(file)}`);

		const tagLine = text.match(/^tags:\s*(.+)$/m)?.[1] ?? '';
		if (/(?:^|[\s,'"\[])workbuddy(?:$|[\s,'"\]])/i.test(tagLine)) failures.push(`文章包含已禁用的 WorkBuddy 标签：${relative(file)}`);

		const source = text.match(/<!--\s*workbuddy-source:\s*(.+?)\s*-->/i)?.[1];
		const sourceHash = text.match(/<!--\s*workbuddy-source-sha256:\s*([a-f0-9]{64})\s*-->/i)?.[1];
		if (source && !sourceHash) failures.push(`WorkBuddy 来源缺少 SHA-256 标记：${relative(file)}`);
		if (source) {
			if (sourceOwners.has(source)) failures.push(`WorkBuddy 来源重复：${source}（${sourceOwners.get(source)}、${relative(file)}）`);
			else sourceOwners.set(source, relative(file));
		}

		const isDraft = /^draft:\s*true\s*$/m.test(text);
		const slug = name.slice(0, -3);
		const routeFile = path.join(distRoot, 'posts', slug, 'index.html');
		if (isDraft && await exists(routeFile)) failures.push(`草稿被生成到公开站点：${relative(file)}`);
		if (!isDraft) {
			publishedCount += 1;
			if (!await exists(routeFile)) failures.push(`已发布文章缺少输出页面：/posts/${slug}/`);
		}
	}

	return { articleCount: markdownFiles.length, publishedCount };
}

async function verifyOutput() {
	const required = [
		'index.html',
		'404.html',
		'posts/index.html',
		'archive/index.html',
		'categories/index.html',
		'tags/index.html',
		'search/index.html',
		'rss.xml',
		'sitemap-index.xml',
		'pagefind/pagefind.js',
	];
	for (const file of required) {
		if (!await exists(path.join(distRoot, file))) failures.push(`构建结果缺少核心文件：dist/${file}`);
	}

	const outputFiles = await walk(distRoot);
	const htmlFiles = outputFiles.filter((file) => file.endsWith('.html'));
	let referenceCount = 0;
	for (const file of htmlFiles) {
		const html = await readFile(file, 'utf8');
		const sourceRoute = htmlRoute(file);
		const references = html.matchAll(/\b(?:href|src)=["']([^"']+)["']/gi);
		for (const match of references) {
			const raw = match[1].trim();
			if (!raw || raw.startsWith('#') || raw.startsWith('//') || /^[a-z][a-z0-9+.-]*:/i.test(raw)) continue;
			referenceCount += 1;
			let pathname;
			try {
				pathname = new URL(raw, `https://local.invalid${sourceRoute}`).pathname;
			} catch {
				failures.push(`无效站内地址：${relative(file)} → ${raw}`);
				continue;
			}
			const candidates = outputCandidates(pathname);
			const results = await Promise.all(candidates.map(exists));
			if (!results.some(Boolean)) failures.push(`失效站内链接：${relative(file)} → ${raw}`);
		}
	}

	const forbiddenTag = outputFiles.some((file) => {
		const outputPath = path.relative(distRoot, file).split(path.sep).join('/');
		return /^tags\/workbuddy(?:\/|$)/i.test(outputPath);
	});
	if (forbiddenTag) failures.push('构建结果重新生成了已禁用的 WorkBuddy 标签页');

	return { htmlCount: htmlFiles.length, referenceCount };
}

await verifyTrackedFiles();
const content = await verifyContent();
const output = await verifyOutput();

if (failures.length > 0) {
	console.error('站点验证失败：');
	for (const failure of [...new Set(failures)]) console.error(`- ${failure}`);
	process.exitCode = 1;
} else {
	console.log(`站点验证通过：${content.articleCount} 篇源文章，${content.publishedCount} 个公开文章路由，${output.htmlCount} 个 HTML 页面，${output.referenceCount} 个站内资源引用。`);
}
