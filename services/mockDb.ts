import { Song, PROProfile, Company, RoyaltySource, LicensingOpp, Document, Task } from '../types';

// Initial Mock Data
let songs: Song[] = [
  { id: '1', user_id: 'u1', title: 'Neon Highway', artist: 'The Midnight Echo', bpm: 120, genre: 'Synthwave', mood: 'Nostalgic', writers: 'John Doe (50%), Jane Smith (50%)', splits: '50/50', tags: ['retro', 'night drive'], created_at: new Date().toISOString() },
  { id: '2', user_id: 'u1', title: 'Broken Strings', artist: 'The Midnight Echo', bpm: 85, genre: 'Acoustic Pop', mood: 'Sad', writers: 'John Doe (100%)', splits: '100', tags: ['acoustic', 'breakup'], created_at: new Date().toISOString() },
];

let proProfile: PROProfile = {
  id: '1', user_id: 'u1', pro_name: '', member_id: '', writer_ipi: '', publisher_ipi: ''
};

let company: Company = {
  id: '1', user_id: 'u1', company_name: '', ein: '', entity_type: 'LLC', state: ''
};

let royaltySources: RoyaltySource[] = [
  { id: '1', name: 'The MLC', status: 'Not Started', notes: 'For mechanicals' },
  { id: '2', name: 'SoundExchange', status: 'Not Started', notes: 'For digital performance royalties' },
  { id: '3', name: 'YouTube Content ID', status: 'Not Started', notes: 'Via distributor' },
];

let docs: Document[] = [
  { id: '1', title: 'Q1 2024 DistroKid Statement', type: 'royalty_statement', date: '2024-04-15', url: '#' },
  { id: '2', title: 'Split Sheet - Neon Highway', type: 'split_sheet', date: '2024-01-20', url: '#' },
];

let tasks: Task[] = [
  { id: '1', description: 'Register "Neon Highway" with BMI', completed: false },
  { id: '2', description: 'Upload Q2 Royalty Statement', completed: true },
];

// Helper to simulate async API calls
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const db = {
  songs: {
    getAll: async () => { await delay(300); return [...songs]; },
    add: async (song: Song) => { await delay(300); songs.push(song); return song; },
    update: async (id: string, updates: Partial<Song>) => {
      await delay(300);
      songs = songs.map(s => s.id === id ? { ...s, ...updates } : s);
      return songs.find(s => s.id === id);
    }
  },
  pro: {
    get: async () => { await delay(200); return { ...proProfile }; },
    update: async (updates: Partial<PROProfile>) => { await delay(300); proProfile = { ...proProfile, ...updates }; return proProfile; }
  },
  company: {
    get: async () => { await delay(200); return { ...company }; },
    update: async (updates: Partial<Company>) => { await delay(300); company = { ...company, ...updates }; return company; }
  },
  royaltySources: {
    getAll: async () => { await delay(200); return [...royaltySources]; },
    update: async (id: string, status: RoyaltySource['status']) => {
      royaltySources = royaltySources.map(r => r.id === id ? { ...r, status } : r);
      return royaltySources.find(r => r.id === id);
    }
  },
  docs: {
    getAll: async () => { await delay(300); return [...docs]; },
    add: async (doc: Document) => { await delay(300); docs.push(doc); return doc; }
  },
  tasks: {
    getAll: async () => { await delay(200); return [...tasks]; },
    toggle: async (id: string) => {
      tasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
      return tasks.find(t => t.id === id);
    }
  }
};