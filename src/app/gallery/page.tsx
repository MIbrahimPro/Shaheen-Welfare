import type { Metadata } from 'next';
import fs from 'node:fs';
import path from 'node:path';
import { BASE, pageMetadata } from '@/lib/site';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = pageMetadata(
  'Gallery',
  'Photo reportage from the field: schools, medical camps, wheelchair distributions, vocational training and community events of Shaheen Welfare Society.',
  '/gallery',
);

// The manifest changes only when photos are added; refresh hourly in background.
export const revalidate = 3600;

interface GalleryImage {
  src: string;
  caption: string;
  page: number;
  width: number;
  height: number;
}

function loadGallery(): GalleryImage[] {
  try {
    const file = path.join(process.cwd(), 'public', 'gallery.json');
    return JSON.parse(fs.readFileSync(file, 'utf8')) as GalleryImage[];
  } catch {
    return [];
  }
}

/**
 * Balanced masonry: shortest-column-first placement keeps the columns
 * close in height, which reads better than a naive round-robin split
 * when aspect ratios vary. Order is preserved within each column.
 */
function toColumns(images: GalleryImage[], columns: number): GalleryImage[][] {
  const cols: GalleryImage[][] = Array.from({ length: columns }, () => []);
  const heights = new Array(columns).fill(0);
  for (const img of images) {
    const i = heights.indexOf(Math.min(...heights));
    cols[i].push(img);
    heights[i] += img.height / img.width; // aspect ratio as column cost
  }
  return cols;
}

export default function GalleryPage() {
  const images = loadGallery().map((img) => ({ ...img, src: `${BASE}${img.src}` }));
  const columns = toColumns(images, 3);
  return (
    <>
      <div className="page-head">
        <div className="wrap">
          <Breadcrumbs current="Gallery" />
          <h1>Gallery</h1>
          <p>
            Photographs from two decades of field work: classrooms, camps, distributions and
            ceremonies across District Sargodha.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="wrap">
          {images.length === 0 ? (
            <p>Photographs will be published shortly.</p>
          ) : (
            <div className="gallery-masonry">
              {columns.map((col, i) => (
                <div className="gallery-col" key={i}>
                  {col.map((img) => (
                    <figure className="gallery-item" key={img.src}>
                      <img
                        src={img.src}
                        alt={img.caption}
                        loading="lazy"
                        width={img.width}
                        height={img.height}
                      />
                      <figcaption>{img.caption}</figcaption>
                    </figure>
                  ))}
                </div>
              ))}
            </div>
          )}
          <p className="form-note" style={{ marginTop: 28 }}>
            Scanned from the organization’s printed profile; originals available at the head office.
          </p>
        </div>
      </section>
    </>
  );
}
