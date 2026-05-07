export interface Todo {
  id: string;   // Required, This matches your clean API contract. Make frondend Templete (html), Perfectly compatible.
  title: string;
  completed: boolean;
  createdAt?: string;
  updatedAt?: string;
}
