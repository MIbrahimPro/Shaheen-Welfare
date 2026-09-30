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
 * Masonry is done in CSS (multicol with balanced columns), so the markup
 * is a flat list: the browser keeps every column equal at any width.
 */
export default function GalleryPage() {
  const images = loadGallery().map((img) => ({ ...img, src: `${BASE}${img.src}` }));
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
              {images.map((img) => (
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
          )}
          <p className="form-note" style={{ marginTop: 28 }}>
            Scanned from the organization’s printed profile; originals available at the head office.
          </p>
        </div>
      </section>
    </>
  );
}
