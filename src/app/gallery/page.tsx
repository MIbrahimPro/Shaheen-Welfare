import type { Metadata } from 'next';
import fs from 'node:fs';
import path from 'node:path';
import Breadcrumbs from '@/components/Breadcrumbs';
import { FIELDWORK_CATEGORIES, FIELDWORK_MEDIA, type FieldworkMedia } from '@/lib/fieldwork';
import { BASE, pageMetadata } from '@/lib/site';

export const metadata: Metadata = pageMetadata(
  'Gallery & field work',
  'Photographs and video records from Shaheen Welfare Society field work: education, disability support, women’s empowerment, health, relief, environment and community advocacy.',
  '/gallery',
);

// The profile manifest changes only when photos are added; refresh hourly in background.
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

function FieldworkCard({ media }: { media: FieldworkMedia }) {
  return (
    <figure className={`fieldwork-card fieldwork-card--${media.kind}`}>
      <div className="fieldwork-media">
        {media.kind === 'video' ? (
          <video
            controls
            preload="none"
            playsInline
            poster={`${BASE}${media.poster}`}
            width={media.width}
            height={media.height}
            aria-label={media.alt}
          >
            <source src={`${BASE}${media.src}`} type="video/mp4" />
            Your browser does not support embedded video. Please use the contact page if you need
            another copy of this record.
          </video>
        ) : (
          <img
            src={`${BASE}${media.src}`}
            alt={media.alt}
            loading="lazy"
            width={media.width}
            height={media.height}
          />
        )}
      </div>
      <figcaption>
        {media.kind === 'video' && <span className="fieldwork-video-badge">Video</span>}
        {media.caption}
      </figcaption>
    </figure>
  );
}

export default function GalleryPage() {
  const archiveImages = loadGallery().map((img) => ({ ...img, src: `${BASE}${img.src}` }));
  const photoCount = FIELDWORK_MEDIA.filter((media) => media.kind === 'image').length;
  const videoCount = FIELDWORK_MEDIA.filter((media) => media.kind === 'video').length;

  return (
    <>
      <div className="page-head">
        <div className="wrap">
          <Breadcrumbs current="Gallery & field work" />
          <h1>Gallery &amp; field work</h1>
          <p>
            A visual record of the work described in the organization profile, grouped by the people
            and issues Shaheen Welfare Society serves across District Sargodha.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="wrap">
          <div className="fieldwork-intro">
            <div>
              <p className="kicker-l">Records supplied by the society</p>
              <h2>Work documented in the field</h2>
              <p style={{ marginTop: 10 }}>
                These {photoCount} photographs and {videoCount} video records are arranged by theme,
                so visitors can see how the society’s programs turn into practical support for people
                and communities.
              </p>
            </div>
            <a className="btn btn--ghost" href="#profile-archive">
              View profile archive
            </a>
          </div>

          <nav className="fieldwork-index" aria-label="Field work sections">
            {FIELDWORK_CATEGORIES.map((category) => (
              <a key={category.slug} href={`#fieldwork-${category.slug}`}>
                {category.title}
              </a>
            ))}
          </nav>

          <div className="fieldwork-sections">
            {FIELDWORK_CATEGORIES.map((category) => {
              const media = FIELDWORK_MEDIA.filter((item) => item.category === category.slug);
              return (
                <section className="fieldwork-category" id={`fieldwork-${category.slug}`} key={category.slug}>
                  <div className="fieldwork-category-head">
                    <p className="fieldwork-eyebrow">{category.eyebrow}</p>
                    <h2>{category.title}</h2>
                    <p>{category.intro}</p>
                  </div>
                  <div className="fieldwork-grid">
                    {media.map((item) => <FieldworkCard key={item.src} media={item} />)}
                  </div>
                </section>
              );
            })}
          </div>

          <section className="profile-archive" id="profile-archive">
            <div className="fieldwork-category-head">
              <p className="fieldwork-eyebrow">The organization profile</p>
              <h2>Profile photo archive</h2>
              <p>
                Scanned photographs from the society’s printed organization profile. The original
                profile is also available as a <a href={`${BASE}/Shaheen Welfare Society.pdf`}>PDF</a>.
              </p>
            </div>
            {archiveImages.length === 0 ? (
              <p>Photographs will be published shortly.</p>
            ) : (
              <div className="gallery-masonry">
                {archiveImages.map((img) => (
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
          </section>
        </div>
      </section>
    </>
  );
}
