/**
 * Dedupes extracted PDF images (pdfimages emits every PDF image XObject,
 * sometimes twice for soft-masked placements) and copies one copy of each
 * into public/gallery. Writes public/gallery.json manifest.
 *
 * Env: GALLERY_SRC (default /tmp/shaheen-select)
 * Usage: node scripts/build-local-gallery.mjs
 */
import { createHash } from 'node:crypto';
import { readdirSync, readFileSync, mkdirSync, copyFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const SRC = process.env.GALLERY_SRC || '/tmp/shaheen-select';
const DEST = join(process.cwd(), 'public', 'gallery');
const MANIFEST = join(process.cwd(), 'public', 'gallery.json');

/** Captions verified against the actual images (contact-sheet review), keyed by PDF page. */
const CAPTIONS = {
  7: 'Shaheen Cadet School — photo albums from the early years',
  8: 'School events, classrooms and prize ceremonies',
  9: 'Wheelchairs, seminars and distribution ceremonies',
  10: 'Program activities and community seminars',
  11: 'Seminars and community programs',
  12: 'Uniform distribution for orphaned and needy students',
  13: 'Eid gifts and packages for orphans and widows',
  14: 'Voter education for a vibrant tomorrow',
  15: 'Community sessions and medical activities',
  16: 'Awareness seminars with invited guests',
  17: 'Field activities and community camps',
  18: 'Field activities and community camps',
  19: 'Field activities and community camps',
  20: 'Field activities and community camps',
  21: 'Partnership with Bedari — Rise Education Project',
  22: 'Awareness sessions and youth dialogues',
  23: 'Awareness sessions and youth dialogues',
  24: 'Awareness sessions and youth dialogues',
  25: 'Awareness sessions and youth dialogues',
  26: 'Public message and memorial events',
};

function captionFor(file) {
  const m = file.match(/pg-(\d+)/);
  const page = m ? Number(m[1]) : 0;
  return CAPTIONS[page] ?? 'Shaheen Welfare Society field activity';
}

if (!existsSync(SRC)) {
  console.error(`Source folder not found: ${SRC}`);
  process.exit(1);
}

mkdirSync(DEST, { recursive: true });

const seen = new Set();
const manifest = [];
const files = readdirSync(SRC).filter((f) => /\.(jpe?g)$/i.test(f)).sort();

for (const file of files) {
  const buf = readFileSync(join(SRC, file));
  const hash = createHash('md5').update(buf).digest('hex');
  if (seen.has(hash)) continue;
  seen.add(hash);

  const name = file.replace(/\.(jpeg|jpg)$/i, '').concat('.jpg');
  copyFileSync(join(SRC, file), join(DEST, name));
  const m = name.match(/pg-(\d+)/);
  const page = m ? Number(m[1]) : 0;
  manifest.push({
    src: `/gallery/${name}`,
    caption: captionFor(name),
    page,
  });
}

manifest.sort((a, b) => a.page - b.page || a.src.localeCompare(b.src));
writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2));
console.log(`Copied ${manifest.length} unique images (${files.length - manifest.length} duplicates skipped)`);
console.log(`Manifest: ${MANIFEST}`);
