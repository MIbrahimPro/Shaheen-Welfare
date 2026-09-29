/**
 * Rebuilds public/gallery.json from public/gallery after enhancement:
 * records each image's true pixel dimensions (the masonry layout needs
 * natural aspect ratios) and assigns human, varied captions.
 *
 * Captions are written per image here; update this file to recaption
 * without touching page code. Run: node scripts/build-gallery-manifest.mjs
 */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { createHash } from 'node:crypto';

const GALLERY = join(process.cwd(), 'public', 'gallery');
const MANIFEST = join(process.cwd(), 'public', 'gallery.json');

/** Fallback captions per PDF page, used only when no specific caption exists. */
const PAGE_CONTEXT = {
  7: "Shaheen Cadet School in its early years",
  8: "Classrooms and school ceremonies",
  9: "Seminars and community gatherings",
  10: "Health and awareness activities",
  11: "Community mobilization in the villages",
  12: "Meetings with community organizations",
  13: "Village outreach and relief work",
  14: "Free medical camp with partner doctors",
  15: "Vocational training and women's programs",
  16: "Seminars with invited guests",
  17: "Distribution ceremonies",
  18: "Field visits across the district",
  19: "Flood relief operations",
  20: "Meetings with partners and notables",
  21: "Rise Education Project with Bedari",
  22: "Youth awareness sessions",
  23: "Ramadan ration distribution",
  24: "Women's economic empowerment sessions",
  25: "Awareness walks and youth dialogues",
  26: "Public message campaigns",
};

/** Specific captions keyed by file stem, written against the contact sheets. */
const CAPTIONS = {
  "pg-007-002": "Photo albums from the Shaheen Cadet School archives",
  "pg-007-003": "Early school registers and student records",
  "pg-007-004": "Prize ceremony at the Shaheen Cadet School",
  "pg-007-005": "Students honored at the annual school function",
  "pg-008-032": "Classroom moments at the cadet school",
  "pg-008-033": "School assembly in the early years",
  "pg-008-034": "Students with their teachers at the cadet school",
  "pg-008-035": "Prize distribution at the annual function",
  "pg-009-074": "Community members at a society seminar",
  "pg-009-075": "Office bearers address a community seminar",
  "pg-009-076": "Guests of honor at a society event",
  "pg-009-077": "Vocational training display at a community exhibition",
  "pg-009-078": "Visiting the society stall at a local exhibition",
  "pg-009-079": "Addressing the gathering from the society podium",
  "pg-009-080": "Wheelchair handed over at a distribution ceremony",
  "pg-009-081": "Mobility aids distributed to persons with disabilities",
  "pg-010-116": "Volunteers pack rations for needy families",
  "pg-010-117": "Relief goods prepared for distribution",
  "pg-010-118": "Wheelchairs staged for handover at the society office",
  "pg-010-119": "A wheelchair recipient with his new chair",
  "pg-010-120": "Meeting with community elders",
  "pg-010-121": "Coordination meeting at the society office",
  "pg-010-122": "Society members plan the next distribution",
  "pg-011-159": "Medical camp registration desk",
  "pg-011-160": "Families wait for checkup at the free medical camp",
  "pg-011-161": "Doctors examine patients at the free camp",
  "pg-011-162": "A doctor examines a young patient",
  "pg-011-163": "Medicines dispensed free of cost at the camp",
  "pg-011-164": "Camp organizers with the medical team",
  "pg-011-165": "Patients walk home after the free eye camp",
  "pg-012-198": "Session on women's legal rights",
  "pg-012-199": "Participants at a legal awareness session",
  "pg-012-200": "Legal aid cell in session with the community",
  "pg-012-201": "Community members gather under the neem tree for a jirga",
  "pg-012-202": "A large audience at an outdoor awareness session",
  "pg-012-203": "Participants sign up at the legal literacy workshop",
  "pg-012-204": "Discussion circle at the community session",
  "pg-013-237": "Women attend a health awareness session",
  "pg-013-238": "Door-to-door outreach in the village",
  "pg-013-239": "Awareness session with village women",
  "pg-013-240": "Registration desk at the women's health camp",
  "pg-013-241": "A social mobilizer records a household survey",
  "pg-013-242": "Mothers bring children to the vaccination drive",
  "pg-013-243": "Village women gather for a community meeting",
  "pg-013-244": "Health workers brief the community on immunization",
  "pg-014-275": "Students of the Rise Education Project in class",
  "pg-014-276": "Guests of honor at the society's annual seminar",
  "pg-014-277": "A society representative addresses the seminar",
  "pg-014-278": "Office bearers host partners at the annual event",
  "pg-014-279": "Guests seated at the annual community seminar",
  "pg-014-280": "Scholarships and prizes handed to students",
  "pg-014-281": "Teachers honored at the annual function",
  "pg-015-312": "The society's banner welcomes seminar guests",
  "pg-015-313": "Society members receive guests at the seminar",
  "pg-016-348": "Office bearers and elders at the head office seminar",
  "pg-016-349": "A guest is presented a flower at the seminar",
  "pg-016-350": "Speakers at the awareness seminar",
  "pg-016-351": "Partners join the society's awareness seminar",
  "pg-016-352": "The society's founder greets seminar guests",
  "pg-016-353": "Elders bless the gathering at the annual event",
  "pg-017-384": "Relief goods loaded for village distribution",
  "pg-017-385": "Volunteers carry rations house to house",
  "pg-017-386": "A wheelchair recipient at the distribution ceremony",
  "pg-017-387": "Wheelchairs lined up before handover",
  "pg-017-388": "Fresh vegetables packed at the food distribution",
  "pg-018-423": "Elders gathered at the village gate meeting",
  "pg-018-424": "Community notables at a village meeting",
  "pg-018-425": "The society team pauses during a field visit",
  "pg-018-426": "Tree plantation drive with community volunteers",
  "pg-018-427": "A sapling handed over during the plantation drive",
  "pg-018-428": "Villagers gather for the cleanliness campaign",
  "pg-019-461": "Flood relief: families receive food packages",
  "pg-019-462": "Ration bags distributed during the 2010 floods",
  "pg-019-463": "Relief camp supplies for flood-affected families",
  "pg-019-464": "Volunteers sort donations at the relief camp",
  "pg-019-465": "A flood survivor receives shelter materials",
  "pg-020-496": "Election observation duty with FAFEN (2024)",
  "pg-020-497": "Observers brief before polling day",
  "pg-020-498": "Youth dialogue on democratic participation",
  "pg-021-529": "Flood waters cut through a village road",
  "pg-021-530": "The society team wades through flood water to reach families",
  "pg-021-531": "Boat rescue during the flood operations",
  "pg-021-532": "A crowd gathers on high ground during the floods",
  "pg-021-533": "Relief boat carries supplies to stranded families",
  "pg-021-534": "An elder receives food aid during the flood relief",
  "pg-021-535": "Volunteers carry water to the relief camp",
  "pg-022-566": "Sewing machines handed to women at the vocational center",
  "pg-022-567": "A graduate of the vocational program with her machine",
  "pg-022-568": "Trainees display work at the vocational center",
  "pg-022-569": "Trade kits distributed to vocational graduates",
  "pg-023-600": "Ramadan ration distribution in a village courtyard",
  "pg-023-601": "Ration bags packed and ready for Ramadan",
  "pg-023-602": "Volunteers hand rations to a widow at the gate",
  "pg-023-603": "Families receive Ramadan packages before Eid",
  "pg-023-604": "Eid gifts for children at the orphan distribution",
  "pg-023-605": "Eid packages stacked for the orphan families",
  "pg-023-606": "Children receive new clothes for Eid",
  "pg-024-637": "School girls enroll at the Rise Education Project desk",
  "pg-024-638": "The Rise Education Project enrollment team",
  "pg-024-639": "Teachers of the Rise Education Project (2025 intake)",
  "pg-024-640": "Parents meeting of the Rise Education Project",
  "pg-024-641": "A community elder signs the enrollment register",
  "pg-024-642": "Mothers enroll daughters at the community school",
  "pg-025-677": "Group photo after the youth dialogue session",
  "pg-025-678": "A young volunteer addresses the youth dialogue",
  "pg-025-679": "Participants at the voter awareness walk",
  "pg-025-680": "Youth volunteers register new voters",
  "pg-026-713": "Memorial reference for the society's founder",
  "pg-026-714": "The society's public message banner",
  "pg-026-715": "Election observation at a polling station (2024)",
};

function dimensionsOf(file) {
  // Fast, dependency-free size probe: parse the JPEG SOF marker.
  const buf = readFileSync(join(GALLERY, file));
  let off = 2;
  while (off < buf.length) {
    if (buf[off] !== 0xff) { off += 1; continue; }
    const marker = buf[off + 1];
    if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
      return { height: buf.readUInt16BE(off + 5), width: buf.readUInt16BE(off + 7) };
    }
    const len = buf.readUInt16BE(off + 2);
    off += 2 + len;
  }
  return { width: 800, height: 600 };
}

const seen = new Set();
const manifest = [];
for (const file of readdirSync(GALLERY).filter((f) => /\.jpe?g$/i.test(f)).sort()) {
  const hash = createHash('md5').update(readFileSync(join(GALLERY, file))).digest('hex');
  if (seen.has(hash)) continue; // guard against duplicate files
  seen.add(hash);
  const { width, height } = dimensionsOf(file);
  const stem = file.replace(/\.jpe?g$/i, '');
  const page = Number((stem.match(/pg-(\d+)/) || [])[1] || 0);
  manifest.push({
    src: `/gallery/${file}`,
    caption: CAPTIONS[stem] || PAGE_CONTEXT[page] || 'Shaheen Welfare Society field activity',
    page,
    width,
    height,
  });
}

manifest.sort((a, b) => a.page - b.page || a.src.localeCompare(b.src));
writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2));
console.log(`Wrote ${manifest.length} entries to ${MANIFEST}`);
