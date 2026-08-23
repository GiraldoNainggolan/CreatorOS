import { LocalRepository } from './LocalRepository';
import type { ContentVariant, Idea, Task, ContentStatus, GeneratorRequest, ContentPlatform } from '../types/tcos';

export class ContentService {
  
  static async getDashboardMetrics() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const contents = LocalRepository.getContents();
        const publishedCount = contents.filter(c => c.status === 'PUBLISHED').length;
        // Derived dummy metrics for now, but based on state
        resolve({
          views: `${(publishedCount * 2.4).toFixed(1)}K`,
          engagement: `${(publishedCount * 1.2 + 5).toFixed(1)}%`,
          followers: `+${(publishedCount * 0.8 + 2).toFixed(1)}%`
        });
      }, 300);
    });
  }

  static async getPipelineCounts() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const contents = LocalRepository.getContents();
        const ideas = LocalRepository.getIdeas();
        
        resolve({
          ideas: ideas.length,
          scripts: contents.filter(c => c.status === 'SCRIPT').length,
          recording: contents.filter(c => c.status === 'RECORDING').length,
          editing: contents.filter(c => c.status === 'EDITING').length,
          ready: contents.filter(c => c.status === 'READY').length,
          published: contents.filter(c => c.status === 'PUBLISHED').length
        });
      }, 300);
    });
  }

  static async getTasks(): Promise<Task[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(LocalRepository.getTasks()), 300);
    });
  }

  static async updateTaskStatus(taskId: string, status: 'Todo' | 'In Progress' | 'Done'): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const tasks = LocalRepository.getTasks();
        const task = tasks.find(t => t.id === taskId);
        if (task) {
          task.status = status;
          LocalRepository.saveTask(task);
        }
        resolve();
      }, 300);
    });
  }

  static async getPipelineContents(): Promise<ContentVariant[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(LocalRepository.getContents()), 300);
    });
  }

  static async getTopContent(): Promise<ContentVariant | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const contents = LocalRepository.getContents();
        const published = contents.filter(c => c.status === 'PUBLISHED');
        resolve(published.length > 0 ? published[0] : (contents[0] || null));
      }, 300);
    });
  }

  static async getContentById(id: string): Promise<ContentVariant | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(LocalRepository.getContentById(id));
      }, 300);
    });
  }

  static async getIdeaById(id: string): Promise<Idea | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(LocalRepository.getIdeaById(id));
      }, 300);
    });
  }

  static async getIdeas(): Promise<Idea[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(LocalRepository.getIdeas()), 300);
    });
  }

  static async getVariantsByIdea(ideaId: string): Promise<ContentVariant[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(LocalRepository.getContentsByIdeaId(ideaId));
      }, 300);
    });
  }

  static async updateContentScript(contentId: string, scriptData: Record<string, string>): Promise<ContentVariant | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const content = LocalRepository.getContentById(contentId);
        if (content) {
          content.script = { ...content.script, ...scriptData };
          content.updatedAt = new Date().toISOString();
          LocalRepository.saveContent(content);
          
          LocalRepository.logActivity({
            contentId: content.id,
            action: 'Updated Script',
            description: 'Script sections were modified and saved.',
            user: 'Giraldo'
          });
          
          resolve(content);
        } else {
          resolve(null);
        }
      }, 500);
    });
  }

  static async updateContentStatus(contentId: string, status: ContentStatus): Promise<ContentVariant | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const content = LocalRepository.getContentById(contentId);
        if (content) {
          const oldStatus = content.status;
          content.status = status;
          content.updatedAt = new Date().toISOString();
          LocalRepository.saveContent(content);
          
          LocalRepository.logActivity({
            contentId: content.id,
            action: 'Status Changed',
            description: `Moved from ${oldStatus} to ${status}`,
            user: 'Giraldo'
          });
          
          resolve(content);
        } else {
          resolve(null);
        }
      }, 500);
    });
  }

  static async saveGeneratedContent(content: Partial<ContentVariant>, generatorRequest: GeneratorRequest): Promise<ContentVariant> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newIdeaId = LocalRepository.generateId('IDEA');
        
        const newIdea: Idea = {
          id: newIdeaId,
          title: content.title || 'Untitled',
          pillar: generatorRequest.pillar || 'General',
          category: generatorRequest.category || 'Uncategorized',
          topic: generatorRequest.topic || 'Uncategorized',
          createdAt: new Date().toISOString()
        };

        LocalRepository.saveIdea(newIdea);

        // Map formats to Content Variants. If no formats, just create one.
        const formats = generatorRequest.formats && generatorRequest.formats.length > 0 
          ? generatorRequest.formats 
          : [content.platform || 'Instagram Reel'];

        const variants: ContentVariant[] = [];

        formats.forEach((format: ContentPlatform) => {
          const newId = LocalRepository.generateId('CNT');
          const newContent: ContentVariant = {
            id: newId,
            parentIdeaId: newIdeaId,
            title: content.title || 'Untitled',
            status: 'SCRIPT', // Drops into script phase
            platform: format,
            audience: content.audience || 'General',
            angle: content.angle || 'Education',
            hookType: content.hookType || 'Curiosity',
            framework: content.framework || 'PAS',
            script: content.script || { hook: '', problem: '', agitate: '', solve: '', cta: '' },
            caption: content.caption || '',
            hashtags: content.hashtags || [],
            keywords: content.keywords || [],
            visualIdea: content.visualIdea || '',
            aRoll: content.aRoll || '',
            bRoll: content.bRoll || '',
            updatedAt: new Date().toISOString()
          };
          LocalRepository.saveContent(newContent);
          
          LocalRepository.logActivity({
            contentId: newId,
            action: 'Generated',
            description: `Content variant generated via AI for ${format}`,
            user: 'System'
          });

          variants.push(newContent);
        });

        resolve(variants[0]); // Return the first variant so UI can navigate to it
      }, 800);
    });
  }
}
