import type { Metadata } from 'next';
import fs from 'node:fs';
import path from 'node:path';
import { BASE } from '@/lib/site';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Gallery',
  description:
    'Photo reportage from the field: schools, medical camps, wheelchair distributions, vocational training and community events of Shaheen Welfare Society.',
};

interface GalleryImage {
  src: string;
  caption: string;
  page: number;
}

function loadGallery(): GalleryImage[] {
  try {
    const file = path.join(process.cwd(), 'public', 'gallery.json');
    return JSON.parse(fs.readFileSync(file, 'utf8')) as GalleryImage[];
  } catch {
    return [];
  }
}

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
            <div className="gallery-grid">
              {images.map((img) => (
                <figure className="gallery-item" key={img.src}>
                  <img src={img.src} alt={img.caption} loading="lazy" width={900} height={675} />
                  <figcaption>{img.caption}</figcaption>
                </figure>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
