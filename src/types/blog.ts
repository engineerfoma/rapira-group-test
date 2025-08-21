export interface BlogFilter {
  id: string;
  label: string;
  isSelected: boolean;
}

export interface BlogFiltersProps {
  filters: BlogFilter[];
  searchQuery: string;
  isFiltersOpen: boolean;
}

export interface BlogFiltersEmits {
  (e: 'update:filters', filters: BlogFilter[]): void;
  (e: 'update:searchQuery', query: string): void;
  (e: 'update:isFiltersOpen', isOpen: boolean): void;
  (e: 'clearAll'): void;
}