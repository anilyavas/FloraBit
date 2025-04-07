import { create } from 'zustand';

interface ScanResult {
  uri: string;
  issue: string;
  cause?: string;
  solution?: string;
}

interface PlantScanStore {
  scan: ScanResult | null;
  loading: boolean;
  setScan: (scan: ScanResult | null) => void;
  setLoading: (loading: boolean) => void;
  reset: () => void;
}

export const usePlantScanStore = create<PlantScanStore>((set) => ({
  scan: null,
  loading: false,
  setScan: (scan) => set({ scan }),
  setLoading: (loading) => set({ loading }),
  reset: () => set({ scan: null, loading: false }),
}));
