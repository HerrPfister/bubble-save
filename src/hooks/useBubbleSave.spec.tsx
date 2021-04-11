import React from 'react';
import { waitFor, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fetchMock from 'jest-fetch-mock';

import Chance from 'chance';

import { useBubbleSave } from './useBubbleSave';
import { BubbleSaveProvider } from '../BubbleSaveProvider';

const chance = new Chance();

describe('useBubbleSave', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('should set the application connection status to offline when ping fails', async () => {
    fetchMock.mockReject();

    const TestComponent = () => {
      const { online } = useBubbleSave<unknown, string>({
        request: jest.fn().mockResolvedValue(chance.string()),
      });

      return <p>{online ? 'online' : 'offline'}</p>;
    };

    render(
      <BubbleSaveProvider>
        <TestComponent />
      </BubbleSaveProvider>,
    );

    await waitFor(() => expect(screen.getByText('offline')).toBeInTheDocument());
  });

  it('should set the application connection status to online when ping succeeds', async () => {
    fetchMock.mockOnce();

    const TestComponent = () => {
      const { online } = useBubbleSave<unknown, string>({
        request: jest.fn().mockResolvedValue(chance.string()),
      });

      return <p>{online ? 'online' : 'offline'}</p>;
    };

    render(
      <BubbleSaveProvider>
        <TestComponent />
      </BubbleSaveProvider>,
    );

    await waitFor(() => expect(screen.getByText('online')).toBeInTheDocument());
  });

  it('should return the result of the request when online and request succeeds', async () => {
    fetchMock.mockOnce();

    const expectedResult = chance.word();

    const TestComponent = () => {
      const { bubbleUp, result } = useBubbleSave<unknown, string>({
        request: jest.fn().mockResolvedValue(expectedResult),
      });

      const handleTest = () => bubbleUp();

      return (
        <>
          <p>{result}</p>
          <button type="button" onClick={handleTest}>
            test
          </button>
        </>
      );
    };

    render(
      <BubbleSaveProvider>
        <TestComponent />
      </BubbleSaveProvider>,
    );

    userEvent.click(screen.getByRole('button', { name: 'test' }));

    await waitFor(() => expect(screen.getByText(expectedResult)).toBeInTheDocument());
  });

  it('should return the error of the request when online but request fails', async () => {
    fetchMock.mockOnce();

    const expectedError = chance.word();

    const TestComponent = () => {
      const { bubbleUp, error } = useBubbleSave<unknown, string>({
        request: jest.fn().mockRejectedValue(new Error(expectedError)),
      });

      const handleTest = () => bubbleUp();

      return (
        <>
          <p>{error}</p>
          <button type="button" onClick={handleTest}>
            test
          </button>
        </>
      );
    };

    render(
      <BubbleSaveProvider>
        <TestComponent />
      </BubbleSaveProvider>,
    );

    userEvent.click(screen.getByRole('button', { name: 'test' }));

    await waitFor(() => expect(screen.getByText(expectedError)).toBeInTheDocument());
  });
});
