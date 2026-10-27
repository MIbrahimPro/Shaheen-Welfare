export interface Program {
  slug: string;
  title: string;
  intro: string;
  items: string[];
}

export const PROGRAMS: Program[] = [
  {
    slug: 'education',
    title: 'Education & Literacy',
    intro:
      'From a cadet school for orphans to non-formal schools, school admissions and practical support for girls, education has been at the heart of our work since 2001.',
    items: [
      'Shaheen Cadet School (2001–2018): free quality schooling for orphaned and needy children',
      '60 Non-Formal Basic Education Schools with the Literacy Department (2005)',
      'Literacy campaign “Apna Haq Jana” (ongoing)',
      'Rise Education Project in partnership with Bedari (2024)',
      'School admissions, uniforms, bags and books for orphaned and deserving girls',
      'Bicycles for girls who travel far to attend school',
    ],
  },
  {
    slug: 'health',
    title: 'Healthcare & Public Health',
    intro:
      'A standing health clinic, awareness campaigns and free medical camps bring basic healthcare within reach of low-income families across the district.',
    items: [
      'Shaheen Health Care clinic (2002 – ongoing)',
      'Family Health Program',
      'HIV Awareness, Counseling and Testing Center',
      'Free medical and eye camps with the Bin Mutlib Foundation',
      'Dengue fever awareness drives',
      'TB awareness campaign with The Asia Foundation',
      'Family planning seminars',
    ],
  },
  {
    slug: 'disability',
    title: 'Support for Persons with Disabilities',
    intro:
      'Disability-card support, mobility equipment and vocational skills so persons with disabilities can participate fully in society.',
    items: [
      'Wheelchairs, tricycles and prosthetic forms',
      'Registration help and financial assistance for disability cards',
      'School support, uniforms and equipment for children with disabilities',
      'Vocational training and sewing machines for economic independence',
    ],
  },
  {
    slug: 'social-welfare',
    title: 'Social Welfare & Relief',
    intro:
      'Direct support for orphans, widows and families in crisis, from Ramadan packages and legal aid to flood and natural-disaster relief.',
    items: [
      'Ramadan and Eid packages for orphans and widows',
      'Legal assistance for the poor and marginalized',
      'Legal Advocacy Cell “Mushkil Daso Hal Dasay”',
      'Relief camp for flood victims (2010, Founder’s initiative)',
      'Emergency support for families affected by natural disasters',
      'Plantation drives and environmental awareness',
      'Safe drinking water awareness',
    ],
  },
  {
    slug: 'governance',
    title: 'Governance & Advocacy',
    intro:
      'Helping citizens, especially women and youth, claim their democratic rights, from voter education to election observation.',
    items: [
      'Citizen Voice in Local Government Budget (USAID/DTW, 2008)',
      'Voter education (SNEP, 2007)',
      'Women’s voting awareness (ongoing)',
      'Promoting Democratic Thinking with Bedari & FAFEN (2024)',
      'Election observation in Bhera and Bhalwal (2024)',
      'Youth Dialogue: Empowering Youth Voices (Bedari & FAFEN, 2024)',
      'Birth and death registration campaign (ongoing)',
      'Human rights awareness and prevention of violence against women',
    ],
  },
  {
    slug: 'economic',
    title: 'Economic Empowerment',
    intro:
      'Skills that pay. Our vocational training center equips women to earn, save and stand on their own feet.',
    items: [
      'Shaheen Vocational Training Center for women',
      'Computer, flower making, beauty care, sewing and embroidery skills',
      'Pottery, flowerpot making and other practical crafts',
      'Economic Empowerment Program',
      'Political Empowerment Program',
      'Local Governance Program',
      'Radio for Social Development',
    ],
  },
];

export interface Project {
  title: string;
  partner: string;
  duration: string;
}

/** All 40 projects from the organization profile, in order. */
export const PROJECTS: Project[] = [
  { title: 'Shaheen Cadet School', partner: 'Founder’s Initiative', duration: '2001–2018' },
  { title: 'Shaheen Health Care', partner: 'Founder’s Initiative', duration: '2002 – ongoing' },
  { title: 'Legal Assistance for the Poor and Marginalized', partner: 'Founder’s Initiative', duration: 'Ongoing' },
  { title: 'Support for Persons with Disabilities (wheelchairs, tricycles, forms)', partner: 'Local funding', duration: 'Ongoing' },
  { title: 'Ramadan & Eid Packages (orphans and widows)', partner: 'Local funding', duration: 'Ongoing' },
  { title: 'School Uniforms and Bags for Orphaned and Deserving Girls', partner: 'Local funding', duration: 'Ongoing' },
  { title: '60 Non-Formal Basic Education Schools', partner: 'Literacy Department', duration: '2005' },
  { title: 'Legal Advocacy Cell (“Mushkil Daso Hal Dasay”)', partner: 'Local funding', duration: 'Ongoing' },
  { title: 'TOT Workshops', partner: 'NCHD', duration: '2005' },
  { title: 'Leadership & Management Skills Training', partner: 'MPDD, Government of Punjab', duration: '2005' },
  { title: 'Drainage Scheme', partner: 'SPO', duration: '2007' },
  { title: 'Independence Day Celebrations', partner: 'Local donors', duration: 'Ongoing' },
  { title: 'Milad Shareef', partner: 'Local donors', duration: 'Ongoing' },
  { title: 'Voter Education', partner: 'SNEP', duration: '2007' },
  { title: 'Medical & Eye Camps', partner: 'Bin Mutlib Foundation / local donors', duration: 'Ongoing' },
  { title: 'Gender Empowerment Program', partner: 'SPO / GTZ', duration: '2007' },
  { title: 'Literacy Campaign “Apna Haq Jana”', partner: 'Local donors', duration: 'Ongoing' },
  { title: 'Citizen Voice in Local Government Budget', partner: 'USAID / DTW Project', duration: '2008' },
  { title: 'Relief Camp for Flood Victims', partner: 'Founder’s Initiative / local community', duration: '2010' },
  { title: 'Awareness Campaign against TB', partner: 'The Asia Foundation', duration: 'Not stated' },
  { title: 'Advocacy for Kitchen Gardens', partner: 'Government of Punjab', duration: '2011' },
  { title: 'Establishment of Local Council Association at UC Level', partner: 'DTCE', duration: '2011' },
  { title: 'Birth & Death Registration Campaign', partner: 'Local funding', duration: 'Ongoing' },
  { title: 'Shaheen Vocational Training Center (Women Empowerment)', partner: 'Local funding', duration: 'Ongoing' },
  { title: 'Plantation Drives', partner: 'Society members', duration: '2011' },
  { title: 'Environmental Awareness Campaign', partner: 'Local donors', duration: 'Ongoing' },
  { title: 'Safe Drinking Water Awareness', partner: 'Local donors', duration: '2011 – ongoing' },
  { title: 'Citizen Voice to MNAs/MPAs for Development Budget', partner: 'Local donors', duration: 'Ongoing' },
  { title: 'Women’s Voting Awareness', partner: 'Local donors', duration: 'Ongoing' },
  { title: 'Family Planning Seminars', partner: 'Local funding', duration: 'Ongoing' },
  { title: 'Dengue Fever Awareness', partner: 'Founder’s Initiative', duration: 'Ongoing' },
  { title: 'Air Pollution & Smog Awareness', partner: 'Local donors', duration: 'Ongoing' },
  { title: 'Human Rights Awareness', partner: 'Local donors', duration: 'Ongoing' },
  { title: 'Prevention of Violence against Women', partner: 'Local donors', duration: 'Ongoing' },
  { title: 'Promoting Democratic Thinking and Women’s Vote', partner: 'Bedari & FAFEN', duration: '2024' },
  { title: 'Youth Awareness on Voting', partner: 'Bedari & FAFEN', duration: '2024' },
  { title: 'Election Observation (Bhera & Bhalwal)', partner: 'Bedari & FAFEN', duration: '2024' },
  { title: 'Youth Dialogue: Empowering Youth Voices', partner: 'Bedari & FAFEN', duration: '2024' },
  { title: 'Rise Education Project', partner: 'In partnership with Bedari', duration: '2024' },
];

export const PARTNERS = [
  'Canadian International Development Agency (CIDA)',
  'UNDP',
  'Trust for Voluntary Organizations (TVO)',
  'Aurat Foundation',
  'USAID',
  'The Asia Foundation',
  'Strengthening Participatory Organization (SPO)',
  'GTZ (German Technical Cooperation)',
  'Bedari',
  'FAFEN (Free and Fair Election Network)',
  'NCHD (National Commission for Human Development)',
  'MPDD, Government of Punjab',
  'Literacy Department, Government of Punjab',
  'Social Welfare Department',
  'Local Council Associations',
];

export const CORE_VALUES = [
  'Transparency and accountability',
  'Equity and inclusion',
  'Community ownership',
  'Human rights and gender equality',
  'Participatory decision-making',
];

export const FOCUS_AREAS = [
  {
    title: 'Women’s empowerment',
    description: 'Promoting equal opportunities and strengthening women’s social, political and economic leadership.',
  },
  {
    title: 'Decentralized governance',
    description: 'Integrating rights-based initiatives into local governance and grassroots structures.',
  },
  {
    title: 'Partnership for social equity',
    description: 'Working with civil society, government and communities to address marginalization and strengthen trust.',
  },
] as const;

export const AREAS_OF_EXPERTISE = [
  {
    title: 'Research',
    description: 'Applied and participatory research to identify social issues, inform policy and guide accessible interventions.',
  },
  {
    title: 'Advocacy',
    description: 'Research-based public dialogue, policy debate and awareness work that amplifies citizens’ voices.',
  },
  {
    title: 'Development interventions',
    description: 'Political, local-governance, economic-empowerment, literacy, family-health and social-development programs.',
  },
] as const;

export const DEVELOPMENT_INTERVENTIONS = [
  'Political Empowerment Program',
  'Local Governance Program',
  'Economic Empowerment Program',
  'Literacy and Non-Formal Education',
  'Family Health Program',
  'HIV Awareness, Counseling and Testing Center',
  'Radio for Social Development',
] as const;

export const OBJECTIVES = [
  'To empower women by ensuring their equal access to power structures and economic self-reliance.',
  'To enhance local human resources for managing micro-development initiatives, particularly in governance, health, education and environment sectors.',
  'To bridge the gap between civil society, public sector and communities for improved social development and institution building.',
  'To promote inclusion and opportunities for persons with disabilities.',
];
