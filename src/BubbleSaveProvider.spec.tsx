import React from 'react';
import { render, screen } from '@testing-library/react';

import Chance from 'chance';

import { BubbleSaveProvider } from './BubbleSaveProvider';
import { useBubbleSave } from './hooks';

const chance = new Chance();

describe('BubbleSaveProvider', () => {
  it('should render the children', () => {
    const expectedHeader = chance.word();

    render(
      <BubbleSaveProvider>
        <h1>{expectedHeader}</h1>
      </BubbleSaveProvider>,
    );

    const header = screen.getByRole('heading', { name: expectedHeader });

    expect(header).toBeInTheDocument();
  });

  it('should pass down the online status of the app', () => {
    const TestComponent = () => {
      const { online } = useBubbleSave({ request: jest.fn().mockResolvedValue(true) });

      return <p>Is online: {online.toString()}</p>;
    };

    render(
      <BubbleSaveProvider>
        <TestComponent />
      </BubbleSaveProvider>,
    );

    const paragraph = screen.getByText('Is online: false');

    expect(paragraph).toBeInTheDocument();
  });
});
