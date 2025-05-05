export interface PasswordEntry {
  id: string;
  title: string;
  username: string;
  password: string;
  website?: string;
  category?: string;
  notes?: string;
  createdAt: number;
  updatedAt: number;
  favorite: boolean;
}

export interface CategoryCount {
  category: string;
  count: number;
}