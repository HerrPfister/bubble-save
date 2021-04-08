import React, { ReactElement, ReactNode, useState } from 'react';

import { BubbleSaveContext } from './BubbleSaveContext';

export type BubbleSaveProviderProps = {
  children?: ReactNode;
};

export const BubbleSaveProvider = ({ children }: BubbleSaveProviderProps): ReactElement => {
  const [online, setOnline] = useState(false);

  return (
    <BubbleSaveContext.Provider value={{ online, updateOnline: setOnline }}>{children}</BubbleSaveContext.Provider>
  );
};
