import { create } from "zustand";
// Interface para el estado del visor
interface ViewerState {
  selectedObjectId: string | null;
  isDetailOpen: boolean;

  selectObject: (id: string) => void;
  closeDetail: () => void;
}
// Crea un store de Zustand para manejar el estado del visor
export const useViewerStore = create<ViewerState>((set) => ({
  selectedObjectId: null,

  isDetailOpen: false,

  selectObject: (id) =>
    set({
      selectedObjectId: id,
      isDetailOpen: true,
    }),

  closeDetail: () =>
    set({
      isDetailOpen: false,
      selectedObjectId: null,
    }),
}));