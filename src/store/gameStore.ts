import { create } from 'zustand';
export interface Player {
  id: string;
  name: string;
  score: number;
  award: string;
}
interface GameState {
  phase: 'avatar' | 'lobby' | 'villa' | 'kitchen' | 'party' | 'oscar';
  coins: number;
  gems: number;
  hostOrder: string[];
  players: Player[];
  setPhase: (phase: GameState['phase']) => void;
  spinHostDraw: () => void;
  spendCoins: (amount: number) => boolean;
}
export const useGameStore = create<GameState>((set, get) => ({
  phase: 'avatar',
  coins: 85000,
  gems: 2500,
  hostOrder: ['سارا', 'نرگس', 'میلاد', 'آرمان'],
  players: [
    { id: 'p1', name: 'سارا', score: 37, award: 'خوش‌سلیقه‌ترین میزبان' },
    { id: 'p2', name: 'نرگس', score: 35, award: 'بهترین استایل' },
    { id: 'p3', name: 'میلاد', score: 33, award: 'خلاق‌ترین غذا' },
    { id: 'p4', name: 'آرمان', score: 31, award: 'محبوب‌ترین مهمان' }
  ],
  setPhase: (phase) => set({ phase }),
  spinHostDraw: () => {
    const shuffled = [...get().hostOrder].sort(() => Math.random() - 0.5);
    set({ hostOrder: shuffled });
  },
  spendCoins: (amount) => {
    if (get().coins < amount) return false;
    set((s) => ({ coins: s.coins - amount }));
    return true;
  }
}));