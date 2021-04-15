import { useEffect, useState, useContext } from 'react';

import { BubbleSaveContext } from '../BubbleSaveContext';

const PING_URL = '/';
const PING_METHOD = 'OPTIONS';
const POLLING_RATE = 30000;

export const LOCAL_STORAGE_KEY = 'lcl.stg.bbl.k';

export type useBubbleSaveProps<S, T> = {
  request: (requestBody?: S) => Promise<T>;
  url?: string;
  pollingRate?: number;
};

export type useBubbleSaveContext<S, T> = {
  bubbleUp: (requestBody?: S) => void;
  online: boolean;
  result?: T | null;
  lastRequestBody?: S | null;
  error?: string | null;
};

export type statusCallbackType = (status: boolean) => void;

export function useBubbleSave<S, T>({
  request,
  url = PING_URL,
  pollingRate = POLLING_RATE,
}: useBubbleSaveProps<S, T>): useBubbleSaveContext<S, T> {
  let requestIntervalId: number;

  const { online, updateOnline } = useContext(BubbleSaveContext);

  const [result, setResult] = useState<T>();
  const [error, setError] = useState();

  const locallyStoredData = localStorage.getItem(LOCAL_STORAGE_KEY);
  const lastRequestBody = locallyStoredData && JSON.parse(locallyStoredData);

  const isOnline = async () => {
    const result = await fetch(url, { method: PING_METHOD });

    return result.status >= 200 && result.status <= 299;
  };

  const updateOnlineStatus = async (statusCallback?: statusCallbackType) => {
    try {
      const isSuccessStatus = await isOnline();

      updateOnline(isSuccessStatus);
      statusCallback?.(isSuccessStatus);
    } catch {
      updateOnline(false);
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
      async () =>
        await updateOnlineStatus((status) => {
          if (status) makeRequest(requestBody);
        }),
      pollingRate,
    );
  };

  const bubbleUp = async (requestBody?: S) =>
    await updateOnlineStatus(async (status: boolean) => {
      if (requestBody) localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(requestBody));

      if (status) {
        makeRequest(requestBody);
      } else {
        if (!requestIntervalId) clearInterval(requestIntervalId);
        startPolling(requestBody);
      }
    });

  useEffect(() => {
    (async () => await updateOnlineStatus())();

    return () => clearInterval(requestIntervalId);
  }, []);

  return {
    bubbleUp,
    result,
    lastRequestBody,
    error,
    online,
  };
}
