export interface DomainItem {
  id: string
  title: string
  subtitle?: string
  status: string
  category: string
  date?: string
  tags?: string[]
  metadata?: Record<string, string | number>
}

export interface DomainConfig {
  code: string
  title: string
  category: 'Content System' | 'Production' | 'Intelligence' | 'Business' | 'Operations'
  description: string
  knowledgePath: string
  status: 'VERIFIED' | 'PARTIAL' | 'RECONSTRUCTED'
  metrics: { label: string; value: string }[]
  guidelines: string[]
  checklists: string[]
  items: DomainItem[]
  actions: { label: string; primary?: boolean }[]
}

export const domainRegistry: Record<string, DomainConfig> = {
  archive: {
    code: '12_ARCHIVE',
    title: 'Archive & Cold Storage',
    category: 'Operations',
    description: 'Cold storage, historical project preservation, master video cuts, project bundles, and 3-2-1 backup verification.',
    knowledgePath: 'knowledge/12_ARCHIVE/',
    status: 'VERIFIED',
    metrics: [
      { label: 'Archived Projects', value: '48' },
      { label: 'Storage Used', value: '1.42 TB' },
      { label: 'Verified Backups', value: '100%' },
      { label: 'Retention Policy', value: '3 Years' }
    ],
    guidelines: [
      'Hierarchy format: Year / Month / Project_Name / RAW and FINAL.',
      'Naming convention: YYYYMMDD_PLATFORM_TITLE_VERSION.',
      'Always maintain 3 copies on 2 different media types with 1 offsite copy.',
      'Before cold storage migration, verify checksum and export full project metadata XML.'
    ],
    checklists: [
      'Master video render exported in ProRes 422 and H.264',
      'Thumbnail PSD and high-res PNG preserved with layer assets',
      'Timeline project file and external audio stems packaged',
      'Local SSD and Cloud cold storage synchronized'
    ],
    items: [
      {
        id: 'ARC-2026-089',
        title: 'Complete CreatorOS Masterclass Series',
        subtitle: '12 Modules Video Course and Source Files',
        status: 'Archived',
        category: 'Course Master',
        date: '2026-08-28',
        tags: ['Video', 'Master', 'Cold Storage'],
        metadata: { 'Size': '42.5 GB', 'Format': 'ProRes 422', 'Location': 'Drive B (Archive)' }
      },
      {
        id: 'ARC-2026-084',
        title: 'Laravel 13 Architecture Breakdown (Reel + Carousel)',
        subtitle: 'Production assets and subtitle timelines',
        status: 'Archived',
        category: 'Social Reel',
        date: '2026-08-15',
        tags: ['Instagram', 'TikTok', 'Raw Files'],
        metadata: { 'Size': '8.2 GB', 'Format': 'H.264 4K', 'Location': 'Cloud Offsite' }
      },
      {
        id: 'ARC-2026-077',
        title: 'AI Prompt Engineering Playbook 2026 Edition',
        subtitle: 'Final PDF, Markdown sources, and promo kit',
        status: 'Archived',
        category: 'Digital Product',
        date: '2026-07-30',
        tags: ['Product', 'PDF', 'Assets'],
        metadata: { 'Size': '1.8 GB', 'Format': 'PDF + MD', 'Location': 'Vault 1' }
      },
      {
        id: 'ARC-2026-062',
        title: 'Q2 Content Sprints & B-Roll Library Pack',
        subtitle: 'Studio footage, screen recordings, voice-over stems',
        status: 'Cold Storage',
        category: 'B-Roll Bank',
        date: '2026-06-30',
        tags: ['Footage', 'B-Roll', 'RAW'],
        metadata: { 'Size': '184 GB', 'Format': 'ProRes Proxy', 'Location': 'Cold Storage A' }
      }
    ],
    actions: [
      { label: 'Import to Archive', primary: true },
      { label: 'Verify 3-2-1 Checksum' },
      { label: 'Export Catalog XML' }
    ]
  },
  brand: {
    code: '01_BRAND',
    title: 'Brand Identity & Guidelines',
    category: 'Content System',
    description: 'Design system tokens, typography scales, archetype positioning, brand voice vocabulary, and QA checklists.',
    knowledgePath: 'knowledge/01_BRAND/',
    status: 'VERIFIED',
    metrics: [
      { label: 'Brand Archetype', value: 'Sage / Creator' },
      { label: 'Primary Accent', value: '#10B981 Emerald' },
      { label: 'Deep Base', value: '#0A192F Navy' },
      { label: 'Heading Font', value: 'Montserrat' }
    ],
    guidelines: [
      'Palette: Dark Navy #0A192F, Emerald Accent #10B981, Clean White #F8FAFC, Slate #64748B.',
      'Headings must use Montserrat / Poppins bold. Body copy uses Inter / Roboto clean sans.',
      'Subtitle rule: Bold center, 2-3 words per burst, highlight key verbs with accent color.',
      'Strict ban list: Do not use generic AI buzzwords (revolusioner, permadani, menyelami).'
    ],
    checklists: [
      'Visual watermark at 30% opacity on bottom corner',
      'High-contrast text hierarchy for mobile viewport readability',
      'Palette compliance: no unapproved neon or generic hex values',
      'Tone check: authentic, pragmatic, authority without arrogance'
    ],
    items: [
      {
        id: 'BRD-TOK-01',
        title: 'Master Color Palette Tokens',
        subtitle: 'HSL and Hex codes for Dark SaaS UI and Socials',
        status: 'Active Rule',
        category: 'Design Token',
        tags: ['Color', 'Tokens', 'UI'],
        metadata: { 'Primary': '#0A192F', 'Accent': '#10B981', 'Muted': '#64748B' }
      },
      {
        id: 'BRD-TYP-02',
        title: 'Typography & Subtitle Blueprint',
        subtitle: 'Scales for 1080x1920 short-form & 1080x1350 carousel',
        status: 'Active Rule',
        category: 'Typography',
        tags: ['Fonts', 'Subtitles', 'Presets'],
        metadata: { 'Heading': 'Montserrat 700', 'Body': 'Inter 400', 'Kerning': '-0.02em' }
      },
      {
        id: 'BRD-VOC-03',
        title: 'Brand Voice Guard & Vocabulary Banlist',
        subtitle: 'Automated filter for banned terms and tone deviations',
        status: 'Active Rule',
        category: 'Copywriting',
        tags: ['Tone', 'Editorial', 'SOP'],
        metadata: { 'Banned Count': '48 Words', 'Tone': 'Pragmatic Builder', 'Register': 'Semi-formal' }
      }
    ],
    actions: [
      { label: 'Update Brand Book', primary: true },
      { label: 'Run Brand QA Check' },
      { label: 'Export Color Assets' }
    ]
  },
  audience: {
    code: '02_AUDIENCE',
    title: 'Audience Personas & Research',
    category: 'Content System',
    description: 'Target personas, pain point maps, aspirations, and content research inputs from polls, comments, and community.',
    knowledgePath: 'knowledge/02_AUDIENCE/',
    status: 'VERIFIED',
    metrics: [
      { label: 'Active Personas', value: '7 Profiles' },
      { label: 'Core Demographic', value: 'Age 20-35' },
      { label: 'Top Pain Point', value: 'Career Transition' },
      { label: 'Research Inputs', value: '142 Recorded' }
    ],
    guidelines: [
      'Personas must reflect actual creator target: Mahasiswa, Fresh Graduate, Freelancer, Junior Dev, Career Switcher, UMKM.',
      'Every content item in the pipeline must target at least one primary persona.',
      'Direct quotes from comments and community DMs are canonical sources of audience pain points.'
    ],
    checklists: [
      'Persona pain point directly answered in the first 5 seconds',
      'Relatable terminology matching the audience career stage',
      'Realistic actionable solution without condescension'
    ],
    items: [
      {
        id: 'AUD-01',
        title: 'Junior Programmer / Tech Worker',
        subtitle: 'Struggling with backend architecture, clean code, and career growth',
        status: 'Core Persona',
        category: 'Professional',
        tags: ['Developer', 'Junior', 'Tech'],
        metadata: { 'Goal': 'Senior promotion', 'Fear': 'Obsolescence by AI', 'Platform': 'LinkedIn, YouTube' }
      },
      {
        id: 'AUD-02',
        title: 'Freelancer & Solopreneur',
        subtitle: 'Needs automated content engines, personal branding, and high-ticket clients',
        status: 'Core Persona',
        category: 'Business',
        tags: ['Freelance', 'Creator', 'Agency'],
        metadata: { 'Goal': '$5k MRR', 'Fear': 'Income inconsistency', 'Platform': 'X, Instagram' }
      },
      {
        id: 'AUD-03',
        title: 'Career Switcher to Tech / AI',
        subtitle: 'Non-CS background looking for practical roadmap without academic jargon',
        status: 'Growth Persona',
        category: 'Learner',
        tags: ['Upskilling', 'Career', 'Beginner'],
        metadata: { 'Goal': 'First tech job', 'Fear': 'Wasting time on tutorials', 'Platform': 'TikTok, Reels' }
      }
    ],
    actions: [
      { label: 'Add Persona Profile', primary: true },
      { label: 'Analyze Audience Feedback' }
    ]
  },
  system: {
    code: '03_CONTENT_SYSTEM',
    title: 'Content Pillars & Frameworks',
    category: 'Content System',
    description: 'The 10 foundational content pillars, storytelling frameworks (PAS, AIDA, BAB), hook templates, and CTA libraries.',
    knowledgePath: 'knowledge/03_CONTENT_SYSTEM/',
    status: 'VERIFIED',
    metrics: [
      { label: 'Pillars', value: '10 Pillars' },
      { label: 'Hook Formulas', value: '24 Verified' },
      { label: 'CTA Blueprints', value: '16 Ready' },
      { label: 'Frameworks', value: 'PAS / AIDA / BAB' }
    ],
    guidelines: [
      'Pillars: AI, Python, Laravel, Data Science, ML, GIS, Career, Productivity, Freelancing, Personal Branding.',
      '3-Second Hook Rule: Start with immediate stakes, contrast, or provocative insight.',
      'Never use ambiguous calls to action. Direct user to one specific action per content piece.'
    ],
    checklists: [
      'Selected pillar aligns with weekly production theme',
      'Hook matches one of the 5 canonical hook archetypes',
      'CTA has clear value proposition'
    ],
    items: [
      {
        id: 'SYS-PIL-01',
        title: 'Laravel & Modern Backend Pillar',
        subtitle: 'REST APIs, clean architecture, performance optimization, and testing',
        status: 'Active Pillar',
        category: 'Tech Pillar',
        tags: ['Laravel', 'PHP 8.3', 'MySQL'],
        metadata: { 'Weekly Quota': '2 items', 'Format': 'Carousel & Reel' }
      },
      {
        id: 'SYS-FRM-02',
        title: 'Problem - Agitate - Solve (PAS) Story Framework',
        subtitle: 'Used for viral career advice and tech bottleneck breakdowns',
        status: 'Core Formula',
        category: 'Framework',
        tags: ['Storytelling', 'Copywriting'],
        metadata: { 'Avg Retention': '78%', 'Best For': 'Short-form video' }
      }
    ],
    actions: [
      { label: 'Explore Hook Library', primary: true },
      { label: 'New Pillar Blueprint' }
    ]
  },
  script: {
    code: '04_SCRIPT',
    title: 'Script Studio & Teleprompter',
    category: 'Production',
    description: 'Modular script composition: 3-second hook, opening beat, value delivery, retention resets, and platform variants.',
    knowledgePath: 'knowledge/04_SCRIPT/',
    status: 'VERIFIED',
    metrics: [
      { label: 'Scripts in Production', value: '8 Drafts' },
      { label: 'Target Word Count', value: '120-150 words' },
      { label: 'Optimal Duration', value: '45-60 seconds' },
      { label: 'Pacing Rate', value: '140 wpm' }
    ],
    guidelines: [
      'Short-form script maximum length: 150 words for 60 seconds pacing.',
      'Insert visual cues [B-ROLL], [ZOOM IN], [TEXT ON SCREEN] every 4-6 seconds.',
      'Closing CTA must connect directly to the opening premise.'
    ],
    checklists: [
      'Read script aloud with timer to ensure pacing under 60 seconds',
      'Banned vocabulary check passed',
      'Teleprompter formatted into 4-word reading chunks'
    ],
    items: [
      {
        id: 'SCR-2026-01',
        title: 'How Senior Engineers Structure Microservices in 2026',
        subtitle: 'Target: Reels & Shorts. Duration: 52s.',
        status: 'Ready to Record',
        category: 'Architecture',
        tags: ['Tech', 'Coding', 'Reels'],
        metadata: { 'Words': '138 words', 'Persona': 'Junior Programmer' }
      },
      {
        id: 'SCR-2026-02',
        title: '3 Freelance Contract Mistakes That Cost Me Thousands',
        subtitle: 'Target: TikTok & LinkedIn. Duration: 48s.',
        status: 'Draft Review',
        category: 'Career',
        tags: ['Freelance', 'Lessons', 'TikTok'],
        metadata: { 'Words': '124 words', 'Persona': 'Freelancer' }
      }
    ],
    actions: [
      { label: 'Create New Script', primary: true },
      { label: 'Launch Teleprompter' }
    ]
  },
  recording: {
    code: '05_RECORDING',
    title: 'Recording Sessions & Gear SOP',
    category: 'Production',
    description: 'Pre-production checklists, studio audio/lighting configurations, camera presets, and RAW media ingestion.',
    knowledgePath: 'knowledge/05_RECORDING/',
    status: 'VERIFIED',
    metrics: [
      { label: 'Resolution', value: '4K 24fps / 60fps' },
      { label: 'Color Profile', value: '10-Bit Log' },
      { label: 'Audio Standard', value: '-12dB Peak' },
      { label: 'Lighting Setup', value: '3-Point Key/Fill/Rim' }
    ],
    guidelines: [
      'Check audio gain before every take. Room noise threshold under -50dB.',
      'Camera framing: Eyes positioned at the upper third line of vertical frame.',
      'Take slate / clapper sound at beginning of take for multi-camera sync.'
    ],
    checklists: [
      'Camera batteries 100% and SD card formatted',
      'Key light 5600K at 65% power, rim light colored accent',
      'Lapel/shotgun mic battery verified and record test take',
      'Teleprompter text speed synced to natural speaking cadence'
    ],
    items: [
      {
        id: 'REC-SES-01',
        title: 'Studio Batch Recording Session A',
        subtitle: '4 Short-form videos: Clean Code, Laravel DB, AI tooling',
        status: 'Scheduled',
        category: 'Studio Shoot',
        date: '2026-09-14',
        tags: ['Studio', '4K', 'Batch'],
        metadata: { 'Takes Target': '12 takes', 'Equipment': 'Sony FX3 + 24mm f1.4' }
      }
    ],
    actions: [
      { label: 'Start Shoot Checklist', primary: true },
      { label: 'Ingest SD Card Media' }
    ]
  },
  editing: {
    code: '06_EDITING',
    title: 'Editing Studio & Post-Production',
    category: 'Production',
    description: 'Editing queue, software project files, LUTs, motion graphics packages, sound design banks, and export pipelines.',
    knowledgePath: 'knowledge/06_EDITING/',
    status: 'VERIFIED',
    metrics: [
      { label: 'Queue Items', value: '5 In Progress' },
      { label: 'Avg Edit Time', value: '45 mins/video' },
      { label: 'Export Codec', value: 'H.264 / ProRes' },
      { label: 'Target Bitrate', value: '25 Mbps VBR' }
    ],
    guidelines: [
      'Cut jump pauses tightly (remove silence longer than 0.25 seconds).',
      'Add sound effects (whoosh, pop, click) on every significant visual transition.',
      'Background music must duck -18dB under dialogue track.'
    ],
    checklists: [
      'Color grading LUT applied and skin tones vectorscope verified',
      'Dynamic caption animation rendered and checked for typos',
      'End screen safe zones observed (no UI overlays covering text)',
      'Export verified on mobile device before publication approval'
    ],
    items: [
      {
        id: 'EDT-2026-09',
        title: 'Laravel 13 Architecture Guide (Final Cut)',
        subtitle: 'Timeline: 00:00:54. CapCut / Premiere export.',
        status: 'In Review',
        category: 'Short-Form',
        tags: ['Premiere', '4K', 'Subtitles'],
        metadata: { 'Revision': 'v2', 'Editor': 'Giraldo', 'Export Size': '142 MB' }
      }
    ],
    actions: [
      { label: 'Open Editing Queue', primary: true },
      { label: 'Download Asset Presets' }
    ]
  },
  posting: {
    code: '07_POSTING',
    title: 'Distribution & Scheduling Hub',
    category: 'Production',
    description: 'Multi-platform scheduling, automated posting gateway, caption formatting, hashtag sets, and upload checklists.',
    knowledgePath: 'knowledge/07_POSTING/',
    status: 'VERIFIED',
    metrics: [
      { label: 'Scheduled Posts', value: '6 Posts' },
      { label: 'Platforms', value: 'IG, TikTok, YT, LI' },
      { label: 'Prime Time Window', value: '18:30 - 20:00' },
      { label: 'Post Success Rate', value: '99.4%' }
    ],
    guidelines: [
      'Format caption with line breaks and strong first line preview.',
      'Use 3 to 5 targeted niche hashtags (avoid generic 10M+ tag spam).',
      'Pin engagement prompt comment within first 5 minutes of publishing.'
    ],
    checklists: [
      'Custom high-ctr thumbnail selected and previewed in feed grid',
      'Platform native audio selected where applicable',
      'All links tested and UTM campaign tags attached'
    ],
    items: [
      {
        id: 'PST-2026-44',
        title: 'Why ORM Optimization Matters in High-Traffic Apps',
        subtitle: 'Scheduled across Instagram Reel and LinkedIn Article',
        status: 'Scheduled',
        category: 'Multi-Platform',
        date: '2026-09-12 19:00',
        tags: ['Reels', 'LinkedIn', 'Queued'],
        metadata: { 'Platform': 'Instagram + LinkedIn', 'UTM': 'creatoros_launch' }
      }
    ],
    actions: [
      { label: 'Schedule New Post', primary: true },
      { label: 'View Publishing Calendar' }
    ]
  },
  analytics: {
    code: '08_ANALYTICS',
    title: 'Creator Analytics & Learning Loop',
    category: 'Intelligence',
    description: 'Content performance dashboards, retention graph analysis, audience conversion rates, and iterative learning loops.',
    knowledgePath: 'knowledge/08_ANALYTICS/',
    status: 'VERIFIED',
    metrics: [
      { label: '30-Day Views', value: '284.6K' },
      { label: 'Avg Watch Time', value: '74.2%' },
      { label: 'Share Ratio', value: '4.8%' },
      { label: 'Lead Conversions', value: '412 Signups' }
    ],
    guidelines: [
      'Focus on retention rate at 3s, 15s, and 30s as the primary quality metric.',
      'Shares and Saves indicate high-value reference content.',
      'Feed high-performing content angles back into Content System ideation.'
    ],
    checklists: [
      'Perform weekly content retrospective every Sunday evening',
      'Catalog top 10% outlier posts into Inspiration Vault',
      'Identify retention drop-off moments in underperforming videos'
    ],
    items: [
      {
        id: 'ANL-REP-08',
        title: 'August 2026 Monthly Growth Report',
        subtitle: 'Top performing format: Step-by-step code carousels',
        status: 'Analyzed',
        category: 'Performance',
        date: '2026-08-31',
        tags: ['Monthly', 'Insights', 'Growth'],
        metadata: { 'Impressions': '412K', 'Follower Net': '+2,840', 'Top Post': 'ARC-2026-084' }
      }
    ],
    actions: [
      { label: 'Generate Weekly Digest', primary: true },
      { label: 'Export Analytics CSV' }
    ]
  },
  repurpose: {
    code: '11_REPURPOSE',
    title: 'Content Repurposing Engine',
    category: 'Intelligence',
    description: 'Cross-format transformation matrix: Long-form Video -> Carousels -> Twitter Threads -> LinkedIn Posts -> Newsletters.',
    knowledgePath: 'knowledge/11_REPURPOSE/',
    status: 'VERIFIED',
    metrics: [
      { label: 'Repurpose Multiplier', value: '1 : 5' },
      { label: 'Active Matrices', value: '12 Trees' },
      { label: 'Time Saved / Week', value: '14 Hours' },
      { label: 'Secondary Views', value: '92.4K' }
    ],
    guidelines: [
      'One pillar video must produce at least 1 carousel, 2 short clips, and 1 text breakdown.',
      'Adapt tone and format to the destination platform rather than plain copy-pasting.',
      'Preserve original core thesis while customizing hook for platform audience.'
    ],
    checklists: [
      'Key takeaways extracted into visual slide bullet points',
      'Horizontal B-roll reframed to 9:16 with panning',
      'Long-form code snippets simplified into 3 lines for carousel readability'
    ],
    items: [
      {
        id: 'REP-TREE-01',
        title: 'Masterclass: Modern Software Architecture in Creator Economy',
        subtitle: 'Parent video converted into 4 shorts + 1 LinkedIn carousel + 1 article',
        status: 'Active Matrix',
        category: 'Transformation',
        tags: ['YouTube', 'Carousels', 'Newsletter'],
        metadata: { 'Children Count': '6 Items', 'Status': 'All Published' }
      }
    ],
    actions: [
      { label: 'New Repurpose Flow', primary: true },
      { label: 'View Conversion Trees' }
    ]
  },
  ai: {
    code: '13_AI_LIBRARY',
    title: 'AI Prompt Library & Model Vault',
    category: 'Intelligence',
    description: 'Curated prompt engineering templates, brand-tuned LLM system instructions, image generation models, and AI workflow recipes.',
    knowledgePath: 'knowledge/13_AI_LIBRARY/',
    status: 'VERIFIED',
    metrics: [
      { label: 'Curated Prompts', value: '64 Tested' },
      { label: 'System Blueprints', value: '12 Personas' },
      { label: 'Integrated Models', value: 'Claude / GPT / Gemini' },
      { label: 'Generation Success', value: '98.2%' }
    ],
    guidelines: [
      'All AI generation outputs must pass through Brand Voice QA before saving.',
      'System prompts must specify negative vocabulary and banned buzzwords explicitly.',
      'Prompt templates must accept structured variables (Pillar, Persona, Goal, Length).'
    ],
    checklists: [
      'Prompt produces high-burstiness and high-perplexity human phrasing',
      'Zero em-dash or en-dash output enforcement verified',
      'Factual claims cross-verified against Knowledge Base'
    ],
    items: [
      {
        id: 'PRM-01',
        title: 'Humanized Tech Hook Generator (Zero-AI-Cadence)',
        subtitle: 'System prompt enforcing natural cadence variation and strong stakes',
        status: 'Verified Tool',
        category: 'Scripting',
        tags: ['Prompt', 'LLM', 'Hooks'],
        metadata: { 'Model': 'Claude 3.7 / GPT-4o', 'Success Rate': '96%' }
      },
      {
        id: 'PRM-02',
        title: 'Carousel Slide Synthesizer',
        subtitle: 'Converts technical blog post into 7 high-impact visual slides',
        status: 'Verified Tool',
        category: 'Design Copy',
        tags: ['Carousel', 'Summary', 'Slides'],
        metadata: { 'Format': 'JSON Array', 'Avg Time': '12 seconds' }
      }
    ],
    actions: [
      { label: 'Test Prompt in Playground', primary: true },
      { label: 'Add New Prompt Template' }
    ]
  },
  knowledge: {
    code: '14_KNOWLEDGE_BASE',
    title: 'Knowledge Base & Creator Wiki',
    category: 'Intelligence',
    description: 'Source of truth documentation, technical cheat sheets, domain rules, code snippets, and verified educational assets.',
    knowledgePath: 'knowledge/14_KNOWLEDGE_BASE/',
    status: 'VERIFIED',
    metrics: [
      { label: 'Knowledge Docs', value: '17 Domains' },
      { label: 'Code Snippets', value: '120+' },
      { label: 'Audit Status', value: 'Level 1 & 2 Verified' },
      { label: 'Integrity Rating', value: '100%' }
    ],
    guidelines: [
      'Follow hierarchy of evidence: Level 1 original documents always override lower inference.',
      'Distinguish verified knowledge from reconstructed or proposed modifications.',
      'Never invent unverified business facts or technical architectures.'
    ],
    checklists: [
      'All references linked to canonical files in knowledge/ repository',
      'Changes reviewed against domain governance rules',
      'Protected documents preserved without modifications'
    ],
    items: [
      {
        id: 'KB-01',
        title: 'CreatorOS Master Architecture & Domain Ownership Manual',
        subtitle: 'Authoritative rules for all 17 content and brand operational domains',
        status: 'Canonical Doc',
        category: 'Architecture',
        tags: ['Core', 'Rules', 'SOP'],
        metadata: { 'Level': 'Level 1 Source', 'Last Audit': '2026-09-11' }
      }
    ],
    actions: [
      { label: 'Browse Wiki Index', primary: true },
      { label: 'Verify Knowledge Integrity' }
    ]
  },
  products: {
    code: '09_DIGITAL_PRODUCT',
    title: 'Digital Products & Offers',
    category: 'Business',
    description: 'Digital course blueprints, templates, Notion workspaces, e-books, sales funnels, and pricing tiers.',
    knowledgePath: 'knowledge/09_DIGITAL_PRODUCT/',
    status: 'VERIFIED',
    metrics: [
      { label: 'Active Products', value: '3 Products' },
      { label: 'Total Customers', value: '1,840+' },
      { label: 'Avg Rating', value: '4.9 / 5.0' },
      { label: 'Conversion Rate', value: '4.2%' }
    ],
    guidelines: [
      'Each product must have a clear Transformation Promise for the buyer.',
      'Lead magnets must solve one specific problem with immediate gratification.',
      'Keep refund policy, access details, and community onboarding automated.'
    ],
    checklists: [
      'Checkout page and payment gateway integration verified',
      'Post-purchase automated onboarding email sequence active',
      'Downloadable assets hosted on reliable CDN with signed URLs'
    ],
    items: [
      {
        id: 'PRD-01',
        title: 'CreatorOS Pro Template & Workflow Operating System',
        subtitle: 'Complete Notion + Vue creator studio with 17 SOP workflows',
        status: 'Live Product',
        category: 'Template',
        tags: ['Notion', 'Digital', 'Operating System'],
        metadata: { 'Price': '$79', 'Sales': '840 units' }
      }
    ],
    actions: [
      { label: 'New Product Blueprint', primary: true },
      { label: 'Sales Funnel Analytics' }
    ]
  },
  portfolio: {
    code: '10_PORTFOLIO',
    title: 'Creator Portfolio & Case Studies',
    category: 'Business',
    description: 'Public creator showcase, brand partnership case studies, client testimonials, media kits, and collaboration metrics.',
    knowledgePath: 'knowledge/10_PORTFOLIO/',
    status: 'VERIFIED',
    metrics: [
      { label: 'Case Studies', value: '8 Published' },
      { label: 'Media Kit Views', value: '1.2K / Mo' },
      { label: 'Brand Sponsors', value: '14 Brands' },
      { label: 'Avg Deal Size', value: '$2,500' }
    ],
    guidelines: [
      'Include verified metrics, before/after transformations, and client endorsements.',
      'Update media kit monthly with audited analytics numbers.',
      'Deliver case studies in a problem -> strategy -> execution -> measurable result structure.'
    ],
    checklists: [
      'Media kit PDF updated with latest follower demographics',
      'Brand logo usage permissions verified',
      'Direct contact booking form operational'
    ],
    items: [
      {
        id: 'PTF-01',
        title: 'Cloud DevOps SaaS Brand Campaign Case Study',
        subtitle: 'Sponsored series generating 1.2M views and 4,500 developer signups',
        status: 'Published Case Study',
        category: 'Sponsorship',
        tags: ['B2B', 'SaaS', 'DevRel'],
        metadata: { 'Client': 'DevCloud', 'Impressions': '1.2M', 'ROI': '420%' }
      }
    ],
    actions: [
      { label: 'Update Media Kit', primary: true },
      { label: 'Add Client Case Study' }
    ]
  },
  business: {
    code: '16_BUSINESS',
    title: 'Monetization & Business Pipeline',
    category: 'Business',
    description: 'Revenue streams, brand deals, consulting bookings, contracts, client invoicing, and monthly financial summaries.',
    knowledgePath: 'knowledge/16_BUSINESS/',
    status: 'VERIFIED',
    metrics: [
      { label: 'Monthly Revenue', value: '$12,400' },
      { label: 'Active Deals', value: '4 Deals' },
      { label: 'Pipeline Value', value: '$28,000' },
      { label: 'Invoice Status', value: 'All Paid' }
    ],
    guidelines: [
      'Diversify revenue across 3 pillars: Digital products, Brand sponsorships, and Consulting.',
      'Require 50% upfront deposit on all commercial sponsorships.',
      'Track Net MRR, customer acquisition cost, and churn rate.'
    ],
    checklists: [
      'Contract signed and deliverables milestone schedule agreed',
      'Tax invoices generated with proper VAT / PPh documentation',
      'Deliverables verified against contract scope of work'
    ],
    items: [
      {
        id: 'BIZ-DEAL-01',
        title: 'Q3 Enterprise DevRel Consulting Retainer',
        subtitle: 'Developer education, architecture reviews, and monthly webinars',
        status: 'Active Retainer',
        category: 'Consulting',
        tags: ['Retainer', 'B2B', 'Enterprise'],
        metadata: { 'Value': '$5,000 / mo', 'Term': '6 Months' }
      }
    ],
    actions: [
      { label: 'Create New Deal', primary: true },
      { label: 'Generate Invoice' }
    ]
  },
  assets: {
    code: '15_ASSET_LIBRARY',
    title: 'Asset Library & Media Vault',
    category: 'Operations',
    description: 'Central repository of visual assets, logo packs, motion design overlays, sound effects, thumbnail templates, and meme banks.',
    knowledgePath: 'knowledge/15_ASSET_LIBRARY/',
    status: 'VERIFIED',
    metrics: [
      { label: 'Total Assets', value: '1,420 Files' },
      { label: 'Sound FX Bank', value: '380 Clips' },
      { label: 'Motion Overlays', value: '85 Packs' },
      { label: 'Meme Vault', value: '420 Items' }
    ],
    guidelines: [
      'Organize assets by format and usage category: B-Roll, SFX, Overlays, Memes, Logos.',
      'All commercial assets must have verified commercial license provenance.',
      'Keep fast search tags attached to every uploaded file.'
    ],
    checklists: [
      'Asset resolution meets minimum 1080p standards',
      'Audio clips normalized to -6dB ceiling',
      'License rights documented in asset metadata'
    ],
    items: [
      {
        id: 'AST-SFX-01',
        title: 'Master UI Sound Design Pack (Whoosh, Pop, Click, Riser)',
        subtitle: 'WAV 48kHz 24-bit studio sound effects library',
        status: 'Verified Pack',
        category: 'Audio',
        tags: ['SFX', 'Audio', 'WAV'],
        metadata: { 'Files': '48 Clips', 'License': 'Royalty Free' }
      },
      {
        id: 'AST-GFX-02',
        title: 'Glassmorphism Motion UI Overlays (4K Alpha)',
        subtitle: 'Transparent ProRes 4444 HUD and code overlays',
        status: 'Verified Pack',
        category: 'Motion Graphic',
        tags: ['Overlay', 'Alpha', 'ProRes'],
        metadata: { 'Files': '24 Overlays', 'Resolution': '3840x2160' }
      }
    ],
    actions: [
      { label: 'Upload Asset', primary: true },
      { label: 'Search Asset Vault' }
    ]
  },
  sop: {
    code: '17_SOP',
    title: 'Standard Operating Procedures (SOPs)',
    category: 'Operations',
    description: 'The 17 authoritative SOP execution manuals, role definitions, operational workflows, and quality gate guidelines.',
    knowledgePath: 'knowledge/17_SOP/',
    status: 'VERIFIED',
    metrics: [
      { label: 'Total SOPs', value: '17 Standard SOPs' },
      { label: 'Execution Rate', value: '100% Compliance' },
      { label: 'Last Revision', value: '2026-09-11' },
      { label: 'Audit Result', value: 'Passed All Gates' }
    ],
    guidelines: [
      'Every content item must pass quality gates: 3-second hook, palette, audio ceiling, subtitle spec.',
      'Zero unauthorized assumptions: ambiguous rules must be clarified before implementation.',
      'SOP execution ensures consistent brand authority and production speed.'
    ],
    checklists: [
      'SOP-01 to SOP-07: Content creation pipeline compliance verified',
      'SOP-08 to SOP-13: Intelligence and monetization loop verified',
      'SOP-14 to SOP-17: Asset, archive, and governance compliance verified'
    ],
    items: [
      {
        id: 'SOP-01-17',
        title: 'CreatorOS 17-Stage Production & Distribution SOP Master Manual',
        subtitle: 'Complete end-to-end operational protocol from idea discovery to archive',
        status: 'Active Standard',
        category: 'Governance',
        tags: ['SOP', 'Manual', 'Master'],
        metadata: { 'Authority': 'Level 1 Source', 'Version': '2.4' }
      }
    ],
    actions: [
      { label: 'Run Full SOP Audit', primary: true },
      { label: 'Download SOP Manual' }
    ]
  }
}
