export interface Task {
    id: string;
    text: string;
    category: string;
    completed: boolean;
    dueDate: Date;
  }
  
  export type CategoryFilter = '' | 'Hogar' | 'Estudio' | 'Trabajo' | 'Compras' | 'Ocio' | 'Otros';
  export type StatusFilter = '' | 'completed' | 'pending';