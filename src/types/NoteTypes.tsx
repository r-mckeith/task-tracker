export interface NewNote {
  text: string;
  taskId: number;
}

export interface AddNoteProps {
  showModal: boolean;
  onClose: () => void;
  taskId: number;
  setShowModal: (show: boolean) => void;
}

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