export interface NoteInterface {
  id?: number;
  text?: string;
  taskId: number;
  onAddNote?: (id: number, text: string, taskId: number) => void;
}

export interface NoteDataInterface extends NoteInterface {
  id?: number;
  visible?: boolean;
  onClose: () => void; 
  showModal: boolean;
}