import React, { ReactElement, ReactNode } from 'react';

import { BubbleSaveContext } from './BubbleSaveContext';

export type BubbleSaveProviderProps = {
  children?: ReactNode;
};

export const BubbleSaveProvider = ({ children }: BubbleSaveProviderProps): ReactElement => (
  <BubbleSaveContext.Consumer>
    {(context) => <BubbleSaveContext.Provider value={context}>{children}</BubbleSaveContext.Provider>}
  </BubbleSaveContext.Consumer>
);
