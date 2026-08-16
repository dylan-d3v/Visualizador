// Almacenador de Zustand para manejar el estado del visor de dibujo
import { create } from "zustand";
// Interface para el estado del visor
interface ViewerState {
  selectedObjectId: string | null;
  isDetailOpen: boolean;
  cssClass: string;

  selectObject: (id: string) => void;
  closeDetail: () => void;
}
// Crea un store de Zustand para manejar el estado del visor
export const useViewerStore = create<ViewerState>((set) => ({
  selectedObjectId: null,

  isDetailOpen: false,
  cssClass: "object-marker",

  selectObject: (id) =>
    set({
      selectedObjectId: id,
      isDetailOpen: true,
      cssClass: "object-marker-selected"
    }),

  closeDetail: () =>
    set({
      isDetailOpen: false,
      selectedObjectId: null,
      cssClass: "object-marker"
    }),
}));