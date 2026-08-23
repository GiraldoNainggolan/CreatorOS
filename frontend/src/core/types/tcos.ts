export type ContentStatus = 
  | 'IDEA' 
  | 'RESEARCH' 
  | 'SCRIPT' 
  | 'RECORDING' 
  | 'EDITING' 
  | 'REVIEW' 
  | 'READY' 
  | 'SCHEDULED' 
  | 'PUBLISHED' 
  | 'ANALYZED' 
  | 'REPURPOSED' 
  | 'ARCHIVED';

export type ContentPlatform = 'Instagram Reel' | 'TikTok' | 'YouTube Short' | 'LinkedIn' | 'Carousel' | 'Blog' | 'X Thread';

export type ContentAngle = 'Education' | 'Entertainment' | 'Storytelling' | 'Controversial' | 'Case Study' | 'Tutorial' | 'Comparison' | 'Mistake' | 'Behind The Scene' | 'Opinion' | 'Review';

export type HookType = 'Curiosity' | 'Fear' | 'Mistake' | 'Tutorial' | 'Tech Absurd';

export type Framework = 'PAS' | 'AIDA' | 'BAB' | 'Open Loop' | 'Before-After-How' | 'Story-Lesson-CTA' | 'Hero Journey';

export interface Idea {
  id: string;
  title: string;
  pillar: string;
  category: string;
  topic: string;
  createdAt: string;
}

export interface ContentScript {
  hook: string;
  problem: string;
  agitate: string;
  solve: string;
  cta: string;
}

export interface ContentVariant {
  id: string;
  parentIdeaId: string;
  title: string;
  status: ContentStatus;
  platform: ContentPlatform;
  audience: string;
  angle: ContentAngle;
  hookType: HookType;
  framework: Framework;
  script: ContentScript;
  caption: string;
  hashtags: string[];
  keywords: string[];
  visualIdea: string;
  aRoll: string;
  bRoll: string;
  updatedAt: string;
}

export interface GeneratorRequest {
  pillar: string;
  category: string;
  topic: string;
  audience: string;
  angle: ContentAngle;
  hookType: HookType;
  framework: Framework;
  formats: ContentPlatform[];
  ctaType: string;
}

export interface GeneratedContent extends ContentVariant {
  // Temporary state from generator before being saved to pipeline
  isSaved?: boolean;
}

export interface Task {
  id: string;
  title: string;
  type: 'Record' | 'Edit' | 'Publish' | 'Review';
  priority: 'High' | 'Medium' | 'Low';
  contentId: string;
  status: 'Todo' | 'In Progress' | 'Done';
  timeEstimate?: string;
}

export interface ActivityEvent {
  id: string;
  contentId: string;
  action: string;
  description: string;
  timestamp: string;
  user: string;
}
