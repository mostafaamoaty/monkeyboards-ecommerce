import { create } from "zustand";
import type { Pedal } from "./pedals";

export interface BoardPedal {
  instanceId: string;
  pedal: Pedal;
  x: number;
  y: number;
  rotation: number;
}

export interface BoardSize {
  id: string;
  name: string;
  width: number;
  height: number;
}

export const boardSizes: BoardSize[] = [
  { id: "compact", name: "Compact", width: 500, height: 250 },
  { id: "standard", name: "Standard", width: 550, height: 350 },
  { id: "pro", name: "Pro", width: 600, height: 400 },
  { id: "mega", name: "Mega", width: 800, height: 450 },
];

interface PedalboardState {
  boardPedals: BoardPedal[];
  selectedPedalId: string | null;
  boardSize: BoardSize;
  zoom: number;
  
  addPedal: (pedal: Pedal, x: number, y: number) => void;
  removePedal: (instanceId: string) => void;
  updatePedalPosition: (instanceId: string, x: number, y: number) => void;
  rotatePedal: (instanceId: string, rotation: number) => void;
  selectPedal: (instanceId: string | null) => void;
  clearBoard: () => void;
  setBoardSize: (size: BoardSize) => void;
  setZoom: (zoom: number) => void;
  deleteSelected: () => void;
}

export const usePedalboardStore = create<PedalboardState>((set, get) => ({
  boardPedals: [],
  selectedPedalId: null,
  boardSize: boardSizes[1],
  zoom: 1,

  addPedal: (pedal, x, y) => {
    const instanceId = `${pedal.id}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    set((state) => ({
      boardPedals: [
        ...state.boardPedals,
        { instanceId, pedal, x, y, rotation: 0 },
      ],
      selectedPedalId: instanceId,
    }));
  },

  removePedal: (instanceId) => {
    set((state) => ({
      boardPedals: state.boardPedals.filter((p) => p.instanceId !== instanceId),
      selectedPedalId: state.selectedPedalId === instanceId ? null : state.selectedPedalId,
    }));
  },

  updatePedalPosition: (instanceId, x, y) => {
    set((state) => ({
      boardPedals: state.boardPedals.map((p) =>
        p.instanceId === instanceId ? { ...p, x, y } : p
      ),
    }));
  },

  rotatePedal: (instanceId, rotation) => {
    set((state) => ({
      boardPedals: state.boardPedals.map((p) =>
        p.instanceId === instanceId ? { ...p, rotation } : p
      ),
    }));
  },

  selectPedal: (instanceId) => {
    set({ selectedPedalId: instanceId });
  },

  clearBoard: () => {
    set({ boardPedals: [], selectedPedalId: null });
  },

  setBoardSize: (size) => {
    set({ boardSize: size });
  },

  setZoom: (zoom) => {
    set({ zoom: Math.max(0.5, Math.min(2, zoom)) });
  },

  deleteSelected: () => {
    const { selectedPedalId } = get();
    if (selectedPedalId) {
      get().removePedal(selectedPedalId);
    }
  },
}));
