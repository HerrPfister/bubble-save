import { useEffect, useState } from 'react';

import { BubbleSaveContextType } from '../BubbleSaveContext';

const LOCAL_STORAGE_KEY = 'lcl.stg.bbl.k';
const PING_URL = '/';
const PING_METHOD = 'OPTIONS';
const POLLING_RATE = 30000;

export type useBubbleSaveProps<S, T> = {
  request: (requestBody?: S) => Promise<T>;
  url?: string;
  useAnyConnectionType?: boolean;
  pollingRate?: number;
};

export type statusCallbackType = (status: boolean) => void;

export function useBubbleSave<S, T>({
  request,
  url = PING_URL,
  pollingRate = POLLING_RATE,
}: useBubbleSaveProps<S, T>): BubbleSaveContextType<S, T> {
  let requestIntervalId: number;

  const [result, setResult] = useState<T>();
  const [error, setError] = useState();
  const [online, setOnline] = useState(false);

  const locallyStoredData = localStorage.getItem(LOCAL_STORAGE_KEY);
  const lastRequestBody = locallyStoredData ? JSON.parse(locallyStoredData) : undefined;

  const isOnline = async (statusCallback?: statusCallbackType) => {
    try {
      const result = await fetch(url, { method: PING_METHOD });

      const isSuccessStatus = result.status >= 200 && result.status <= 299;

      setOnline(isSuccessStatus);
      statusCallback?.(isSuccessStatus);
    } catch {
      setOnline(false);
      statusCallback?.(false);
    }
  };

  const makeRequest = async (requestBody?: S) => {
    try {
      clearInterval(requestIntervalId);

      localStorage.removeItem(LOCAL_STORAGE_KEY);

      setResult(await request(requestBody));
    } catch (e) {
      setError(e.message);
    }
  };

  const startPolling = (requestBody?: S) => {
    requestIntervalId = window.setInterval(
      () =>
        isOnline((status) => {
          if (status) makeRequest(requestBody);
        }),
      pollingRate,
    );
  };

  const bubbleUp = async (requestBody?: S) =>
    await isOnline(async (status: boolean) => {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(requestBody));

      if (status) {
        makeRequest(requestBody);
      } else {
        if (!requestIntervalId) clearInterval(requestIntervalId);
        startPolling(requestBody);
      }
    });

  useEffect(() => {
    isOnline();
  }, []);

  return {
    bubbleUp,
    result,
    lastRequestBody,
    error,
    online,
  };
}
