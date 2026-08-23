import type { Idea, ContentVariant, Task } from '../types/tcos';

export const mockIdeas: Idea[] = [
  {
    id: 'IDEA-2026-00001',
    title: 'Laravel Middleware dalam 60 Detik',
    pillar: 'Software Engineering',
    category: 'PHP',
    topic: 'Laravel Middleware',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'IDEA-2026-00002',
    title: 'Kenapa PHP Belum Mati?',
    pillar: 'Software Engineering',
    category: 'PHP',
    topic: 'Future of PHP',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'IDEA-2026-00003',
    title: '5 Kesalahan Junior Developer',
    pillar: 'Career',
    category: 'Software Engineering',
    topic: 'Junior Mistakes',
    createdAt: new Date().toISOString(),
  }
];

export const mockContents: ContentVariant[] = [
  {
    id: 'CNT-2026-00001',
    parentIdeaId: 'IDEA-2026-00001',
    title: 'Laravel Middleware dalam 60 Detik',
    status: 'SCRIPT',
    platform: 'Instagram Reel',
    audience: 'Junior Developer',
    angle: 'Tutorial',
    hookType: 'Mistake',
    framework: 'PAS',
    script: {
      hook: 'Kesalahan terbesar developer pemula saat menggunakan Middleware...',
      problem: 'Seringkali logic autentikasi ditaruh langsung di dalam controller.',
      agitate: 'Akibatnya, kalau ada 10 endpoint, kamu nulis kode yang sama 10 kali. Bikin pusing kalau ada perubahan!',
      solve: 'Pindahkan logic tersebut ke Middleware. Satu file, bisa dipasang ke semua route yang butuh.',
      cta: 'Follow untuk tips Laravel lainnya!',
    },
    caption: 'Stop tulis ulang kode auth kamu! Gunakan middleware untuk kode yang lebih bersih. #laravel #php #webdev',
    hashtags: ['#laravel', '#php', '#webdev', '#programming'],
    keywords: ['laravel middleware', 'belajar php', 'tutorial laravel'],
    visualIdea: 'Mulai dengan muka bingung melihat code berantakan, lalu transisi ke layar code yang rapi pakai middleware.',
    aRoll: 'Talking head menjelaskan masalah controller yang gemuk.',
    bRoll: 'Screencast menunjukkan perbedaan sebelum dan sesudah pakai middleware.',
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'CNT-2026-00002',
    parentIdeaId: 'IDEA-2026-00001',
    title: 'Laravel Middleware Explained',
    status: 'READY',
    platform: 'LinkedIn',
    audience: 'Software Engineers',
    angle: 'Education',
    hookType: 'Curiosity',
    framework: 'Before-After-How',
    script: {
      hook: 'Do you know why your Laravel controllers are getting out of hand?',
      problem: 'Putting too much logic like auth and logging directly in the controller.',
      agitate: 'It violates SRP and makes your app hard to maintain.',
      solve: 'Middleware intercepts requests before they hit the controller. It is the perfect place for cross-cutting concerns.',
      cta: 'What is your favorite Laravel middleware? Let me know in the comments.',
    },
    caption: 'How to keep your controllers clean using Laravel Middleware.',
    hashtags: ['#laravel', '#softwareengineering', '#php'],
    keywords: ['laravel', 'clean architecture'],
    visualIdea: 'Code snippet image comparing bad controller vs good controller + middleware.',
    aRoll: '',
    bRoll: '',
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'CNT-2026-00003',
    parentIdeaId: 'IDEA-2026-00002',
    title: 'Kenapa PHP Belum Mati?',
    status: 'EDITING',
    platform: 'YouTube Short',
    audience: 'Tech Enthusiast',
    angle: 'Controversial',
    hookType: 'Tech Absurd',
    framework: 'PAS',
    script: {
      hook: 'Setiap tahun ada yang bilang PHP mati. Tapi kok Facebook masih pakai?',
      problem: 'Banyak yang benci PHP karena pengalaman di versi lama.',
      agitate: 'Tapi faktanya 70% web di dunia masih jalan pakai PHP.',
      solve: 'PHP 8 ke atas punya JIT, strongly typed, dan ekosistem seperti Laravel yang super solid.',
      cta: 'Subscribe buat update tech seru lainnya!',
    },
    caption: 'Fakta kenapa PHP akan terus hidup. #php #webdev #programmer',
    hashtags: ['#php', '#webdev'],
    keywords: ['php 8', 'laravel', 'apakah php mati'],
    visualIdea: 'Meme RIP PHP yang dicoret.',
    aRoll: 'Talking head energetic.',
    bRoll: 'Screenshot statistik w3techs soal penggunaan PHP.',
    updatedAt: new Date().toISOString(),
  }
];

export const mockTasks: Task[] = [
  {
    id: 'TSK-1',
    title: 'Laravel Middleware dalam 60 Detik',
    type: 'Record',
    priority: 'High',
    contentId: 'CNT-2026-00001',
    status: 'Todo',
    timeEstimate: '30m'
  },
  {
    id: 'TSK-2',
    title: 'Kenapa PHP Belum Mati?',
    type: 'Edit',
    priority: 'Medium',
    contentId: 'CNT-2026-00003',
    status: 'Todo',
    timeEstimate: '1h'
  },
  {
    id: 'TSK-3',
    title: '5 Kesalahan Junior Developer',
    type: 'Publish',
    priority: 'High',
    contentId: 'CNT-2026-00004',
    status: 'Todo',
  },
  {
    id: 'TSK-4',
    title: 'REST API vs GraphQL',
    type: 'Review',
    priority: 'Low',
    contentId: 'CNT-2026-00005',
    status: 'Todo',
  }
];

export const mockDashboardMetrics = {
  views: '12.4K',
  engagement: '8.2%',
  followers: '+4.8%'
};

export const mockPipelineCounts = {
  ideas: 12,
  scripts: 6,
  recording: 3,
  editing: 4,
  ready: 2,
  published: 5
};
