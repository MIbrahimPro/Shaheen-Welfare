/**
 * OPTIONAL: mirrors public/gallery images to Cloudinary under shaheen/gallery/.
 * The current CLOUDINARY_APP_KEY is read-only (upload returns 403 "missing
 * permissions"), so the site ships with self-hosted images in /public/gallery.
 * Run this if the key is later granted create/upload permissions.
 *
 * Env: CLOUDINARY_APP_NAME, CLOUDINARY_APP_KEY, CLOUDINARY_APP_SECRET
 * Usage: node scripts/cloudinary-upload.mjs
 */
import { createRequire } from 'node:module';
import { readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const require = createRequire(import.meta.url);
const { v2: cloudinary } = require('cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_APP_NAME,
  api_key: process.env.CLOUDINARY_APP_KEY,
  api_secret: process.env.CLOUDINARY_APP_SECRET,
});

const SRC = join(process.cwd(), 'public', 'gallery');

if (!existsSync(SRC)) {
  console.error('Run scripts/build-local-gallery.mjs first.');
  process.exit(1);
}

const files = readdirSync(SRC).filter((f) => /\.(jpe?g)$/i.test(f)).sort();

for (const file of files) {
  const publicId = `shaheen/gallery/${file.replace(/\.(jpe?g)$/i, '')}`;
  try {
    await cloudinary.uploader.upload(join(SRC, file), {
      public_id: publicId,
      overwrite: true,
      folder: 'shaheen/gallery',
    });
    console.log(`uploaded ${publicId}`);
  } catch (err) {
    console.error(`failed ${file}: ${err.message ?? err}`);
  }
}
