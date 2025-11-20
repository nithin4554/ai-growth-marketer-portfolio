export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  metrics: { label: string; value: string }[];
  tags: string[];
  status: 'Live' | 'Beta' | 'Prototype';
}

export interface Experiment {
  id: string;
  title: string;
  description: string;
  status: 'In Progress' | 'Completed' | 'Archived';
  tags: string[];
}

export interface ChatMessage {
  role: 'user' | 'system' | 'assistant';
  content: string;
  type?: 'text' | 'link' | 'action';
  actionLabel?: string;
  actionUrl?: string;
}

export enum SectionId {
  HERO = 'hero',
  WORK = 'work',
  LAB = 'lab',
  EDGE = 'edge',
  PROCESS = 'process',
  CONTACT = 'contact',
}