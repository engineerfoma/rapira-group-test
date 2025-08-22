export interface BlogFilter {
  id: string;
  label: string;
  isSelected: boolean;
}

export interface BlogFiltersEmits {
  (e: 'update:filters', filters: BlogFilter[]): void;
  (e: 'update:searchQuery', query: string): void;
  (e: 'update:isFiltersOpen', isOpen: boolean): void;
  (e: 'clearAll'): void;
}

export interface BlogFiltersProps {
  filters: BlogFilter[];
  searchQuery: string;
  isFiltersOpen: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  readTime: string;
  categories: string[];
  comments: Comment[];
}

export interface Comment {
  id: string;
  author: string;
  avatar: string;
  text: string;
  date: string;
}

export interface BlogCardProps {
  post: BlogPost;
}


export interface BlogCardEmits {
  (e: 'click', post: BlogPost): void;
  (e: 'addComment', payload: { postId: string; comment: Omit<Comment, 'id'> }): void;
}

