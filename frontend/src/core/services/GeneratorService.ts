import type { GeneratorRequest, GeneratedContent } from '../types/tcos';

export class GeneratorService {
  static async generateHooks(topic: string, _angle: string): Promise<string[]> {
    void _angle;
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          `Kenapa ${topic} sering disalahpahami developer pemula?`,
          `Kesalahan terbesar saat menggunakan ${topic}.`,
          `Rahasia ${topic} yang tidak diajarkan di kampus.`,
          `Berhenti pakai ${topic} dengan cara lama ini.`,
          `Cara master ${topic} dalam 5 menit.`
        ]);
      }, 800); // Simulate API latency
    });
  }

  static async generateContent(request: GeneratorRequest): Promise<GeneratedContent> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: 'TMP-GEN', // Temporary ID before save
          parentIdeaId: 'TMP-IDEA',
          title: request.topic,
          status: 'IDEA',
          platform: request.formats[0] || 'Instagram Reel',
          audience: request.audience,
          angle: request.angle,
          hookType: request.hookType,
          framework: request.framework,
          script: {
            hook: `Kesalahan terbesar developer pemula saat menggunakan ${request.topic}...`,
            problem: `Banyak yang asal copy-paste tanpa mengerti best practice-nya.`,
            agitate: `Ini bikin code kamu susah di-maintain, dan gampang kena bug kalau skala aplikasi membesar.`,
            solve: `Cara yang bener adalah dengan mengerti fundamental ${request.topic} sebelum implementasi. Gunakan dokumentasi resmi dan terapkan pattern yang sesuai dengan ${request.framework}.`,
            cta: `Kasih pendapat kamu soal ${request.topic} di komen ya!`
          },
          caption: `Stop menggunakan ${request.topic} dengan cara yang salah! #tech #programming`,
          hashtags: ['#programming', '#webdev', '#coding'],
          keywords: [request.topic.toLowerCase(), 'tutorial', 'tips'],
          visualIdea: 'Screencast menunjukkan perbandingan kode yang salah vs yang benar.',
          aRoll: 'Talking head memberikan penjelasan.',
          bRoll: 'B-roll seseorang mengetik kode dengan ekspresi frustasi, lalu berubah senang.',
          updatedAt: new Date().toISOString(),
          isSaved: false
        });
      }, 1500); // Simulate longer generation time
    });
  }
}
