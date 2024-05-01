export interface SearchParamsOptions {
  listId?: string;
  labelId?: string;
  unsorted?: boolean;
  upcoming?: boolean;
  overdue?: boolean;
  incomplete?: boolean;
  today?: boolean;
  pending?: boolean;
  completed?: boolean;
  view?: string;
  offset?: number;
  dueDate?: string;
}

export const queryParamsMapping: Record<
  keyof SearchParamsOptions,
  keyof SearchParamsOptions
> = {
  listId: 'listId',
  labelId: 'labelId',
  unsorted: 'unsorted',
  upcoming: 'upcoming',
  overdue: 'overdue',
  today: 'today',
  pending: 'pending',
  incomplete: 'incomplete',
  completed: 'completed',
  view: 'view',
  offset: 'offset',
  dueDate: 'dueDate',
};

export interface ExtendedSearchParamsOptions extends SearchParamsOptions {
  view?: 'board' | 'list';
  status: 'incomplete' | 'pending' | 'completed';
}

export type FilterOption = keyof ExtendedSearchParamsOptions;
