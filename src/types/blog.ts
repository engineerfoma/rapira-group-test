export interface BlogFilter {
  id: string;
  label: string;
  isSelected: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  description: string;
  text: string;
  image: string;
  date: string;
  readTime: string;
  categories: string[];
  comments: Comment[];
}

export interface Comment {
  id: string;
  author: string;
  avatar: string | null;
  text: string;
  date: string;
}
