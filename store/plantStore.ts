import { create } from 'zustand';

interface ScanResult {
  uri: string;
  issue: string;
  cause: string;
  solution: string;
}

interface PlantScanState {
  scan: ScanResult | null;
  loading: boolean;
  setScan: (scan: ScanResult) => void;
  setLoading: (loading: boolean) => void;
  reset: () => void;
}

export const usePlantScanStore = create<PlantScanState>((set) => ({
  scan: null,
  loading: false,
  setScan: (scan) => set({ scan }),
  setLoading: (loading) => set({ loading }),
  reset: () => set({ scan: null, loading: false }),
}));
