import type { Idea, ContentVariant, Task, ActivityEvent } from '../types/tcos';
import { mockIdeas, mockContents, mockTasks } from '../mock/data';

const STORAGE_KEYS = {
  IDEAS: 'tcos_ideas',
  CONTENTS: 'tcos_contents',
  TASKS: 'tcos_tasks',
  ACTIVITIES: 'tcos_activities'
};

export class LocalRepository {
  private static isInitialized = false;

  public static init() {
    if (this.isInitialized) return;
    
    // Seed initial data if nothing exists in localStorage
    if (!localStorage.getItem(STORAGE_KEYS.IDEAS)) {
      localStorage.setItem(STORAGE_KEYS.IDEAS, JSON.stringify(mockIdeas));
    }
    if (!localStorage.getItem(STORAGE_KEYS.CONTENTS)) {
      localStorage.setItem(STORAGE_KEYS.CONTENTS, JSON.stringify(mockContents));
    }
    if (!localStorage.getItem(STORAGE_KEYS.TASKS)) {
      localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(mockTasks));
    }
    if (!localStorage.getItem(STORAGE_KEYS.ACTIVITIES)) {
      localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify([]));
    }
    
    this.isInitialized = true;
  }

  // Ideas
  static getIdeas(): Idea[] {
    this.init();
    const data = localStorage.getItem(STORAGE_KEYS.IDEAS);
    return data ? JSON.parse(data) : [];
  }

  static getIdeaById(id: string): Idea | null {
    const ideas = this.getIdeas();
    return ideas.find(i => i.id === id) || null;
  }

  static saveIdea(idea: Idea): void {
    const ideas = this.getIdeas();
    const index = ideas.findIndex(i => i.id === idea.id);
    if (index >= 0) {
      ideas[index] = idea;
    } else {
      ideas.push(idea);
    }
    localStorage.setItem(STORAGE_KEYS.IDEAS, JSON.stringify(ideas));
  }

  // Contents
  static getContents(): ContentVariant[] {
    this.init();
    const data = localStorage.getItem(STORAGE_KEYS.CONTENTS);
    return data ? JSON.parse(data) : [];
  }

  static getContentById(id: string): ContentVariant | null {
    const contents = this.getContents();
    return contents.find(c => c.id === id) || null;
  }

  static getContentsByIdeaId(ideaId: string): ContentVariant[] {
    const contents = this.getContents();
    return contents.filter(c => c.parentIdeaId === ideaId);
  }

  static saveContent(content: ContentVariant): void {
    const contents = this.getContents();
    const index = contents.findIndex(c => c.id === content.id);
    if (index >= 0) {
      contents[index] = content;
    } else {
      contents.push(content);
    }
    localStorage.setItem(STORAGE_KEYS.CONTENTS, JSON.stringify(contents));
  }

  // Tasks
  static getTasks(): Task[] {
    this.init();
    const data = localStorage.getItem(STORAGE_KEYS.TASKS);
    return data ? JSON.parse(data) : [];
  }

  static saveTask(task: Task): void {
    const tasks = this.getTasks();
    const index = tasks.findIndex(t => t.id === task.id);
    if (index >= 0) {
      tasks[index] = task;
    } else {
      tasks.push(task);
    }
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
  }

  // Activities
  static getActivities(contentId?: string): ActivityEvent[] {
    this.init();
    const data = localStorage.getItem(STORAGE_KEYS.ACTIVITIES);
    const activities: ActivityEvent[] = data ? JSON.parse(data) : [];
    if (contentId) {
      return activities.filter(a => a.contentId === contentId).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    }
    return activities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }

  static logActivity(activity: Omit<ActivityEvent, 'id' | 'timestamp'>): void {
    const activities = this.getActivities();
    const newActivity: ActivityEvent = {
      ...activity,
      id: `ACT-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      timestamp: new Date().toISOString()
    };
    activities.push(newActivity);
    localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(activities));
  }

  // Helpers
  static generateId(prefix: 'IDEA' | 'CNT' | 'TSK'): string {
    return `${prefix}-2026-${String(Date.now()).slice(-5)}${Math.floor(Math.random() * 1000)}`;
  }
}
