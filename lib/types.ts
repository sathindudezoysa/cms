export type Category = 'news' | 'events' | 'publications' | "conferences";

export interface Post {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  link?: string;
  category: Category;
  createdAt: number; // Store as timestamp
}