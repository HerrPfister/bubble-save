import { createContext } from 'react';

export type BubbleSaveContextType = {
  updateOnline: (status: boolean) => void;
  online: boolean;
};

export const BubbleSaveContext = createContext<BubbleSaveContextType>({} as BubbleSaveContextType);
