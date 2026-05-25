/**
 * Chạy: node scripts/generate-sitemap.js
 * Sinh sitemap.xml từ dữ liệu tĩnh (cần Node 18+)
 */
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const BASE = 'https://thuongluongmini.pages.dev';

const dataPath = join(root, 'js/data.js');
const src = readFileSync(dataPath, 'utf8');

const idMatches = [...src.matchAll(/id:\s*(\d+)/g)];
const slugMatches = [...src.matchAll(/slug:\s*['"]([^'"]+)['"]/g)];

const places = [];
const seen = new Set();
for (let i = 0; i < idMatches.length && i < slugMatches.length; i++) {
    const id = idMatches[i][1];
    const slug = slugMatches[i][1];
    const key = `${id}-${slug}`;
    if (seen.has(key)) continue;
    seen.add(key);
    places.push({ id, slug });
}

const staticUrls = [
    { loc: `${BASE}/`, priority: '1.0', changefreq: 'daily' },
    { loc: `${BASE}/#/danh-muc/an-uong`, priority: '0.9', changefreq: 'weekly' },
    { loc: `${BASE}/#/danh-muc/vui-choi`, priority: '0.9', changefreq: 'weekly' },
    { loc: `${BASE}/#/danh-muc/du-lich`, priority: '0.9', changefreq: 'weekly' },
    { loc: `${BASE}/#/danh-muc/trang-phuc`, priority: '0.8', changefreq: 'weekly' },
    { loc: `${BASE}/#/tim-kiem`, priority: '0.8', changefreq: 'weekly' },
    { loc: `${BASE}/#/lo-trinh`, priority: '0.85', changefreq: 'weekly' },
];

const placeUrls = places.map(p => ({
    loc: `${BASE}/#/dia-diem/${p.id}/${p.slug}`,
    priority: '0.7',
    changefreq: 'weekly'
}));

const all = [...staticUrls, ...placeUrls];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${all.map(u => `  <url>
    <loc>${u.loc}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;

writeFileSync(join(root, 'sitemap.xml'), xml);
console.log(`✅ sitemap.xml — ${all.length} URLs (${places.length} địa điểm)`);
