import { createContext } from 'react';

export type BubbleSaveContextType<S, T> = {
  bubbleUp: (requestBody?: S) => void;
  online: boolean;
  result?: T | null;
  lastRequestBody?: S | null;
  error?: string | null;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const BubbleSaveContext = createContext<BubbleSaveContextType<any, any>>({} as BubbleSaveContextType<any, any>);
