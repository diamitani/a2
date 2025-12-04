
export interface Song {
  id: string;
  user_id: string;
  title: string;
  artist: string;
  file_url?: string;
  bpm?: number;
  song_key?: string;
  genre?: string;
  mood?: string;
  instrumentation?: string;
  isrc?: string;
  writers: string; // Simplified for UI
  splits: string; // Simplified for UI
  tags: string[];
  created_at: string;
}

export interface PROProfile {
  id: string;
  user_id: string;
  pro_name: 'ASCAP' | 'BMI' | 'SESAC' | '';
  member_id: string;
  writer_ipi: string;
  publisher_ipi: string;
}

export interface Company {
  id: string;
  user_id: string;
  company_name: string;
  ein: string;
  entity_type: string;
  state: string;
}

export interface RoyaltySource {
  id: string;
  name: string;
  status: 'Not Started' | 'In Progress' | 'Complete';
  notes: string;
}

export interface LicensingOpp {
  id: string;
  name: string;
  category: 'Library' | 'Agency' | 'Supervisor' | 'Network';
  contact: string;
  preferred_genres: string;
  submission_link: string;
}

export interface Document {
  id: string;
  title: string;
  type: 'contract' | 'registration' | 'royalty_statement' | 'split_sheet';
  date: string;
  url: string;
}

export interface Task {
  id: string;
  description: string;
  completed: boolean;
}

export interface Venue {
  venue: string;
  address: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  website: string;
}
