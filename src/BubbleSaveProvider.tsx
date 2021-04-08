import React, { ReactElement, ReactNode, useState } from 'react';

import { BubbleSaveContext } from './BubbleSaveContext';

export type BubbleSaveProviderProps = {
  children?: ReactNode;
};

export const BubbleSaveProvider = ({ children }: BubbleSaveProviderProps): ReactElement => {
  const [online, setOnline] = useState(false);

  const context = { online, updateOnline: setOnline };

  return <BubbleSaveContext.Provider value={context}>{children}</BubbleSaveContext.Provider>;
};
