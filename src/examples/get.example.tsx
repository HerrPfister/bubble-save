import React, { ReactElement, useEffect } from 'react';
import { useBubbleSave } from '../hooks';

const GetBubble = (): ReactElement => {
  const { bubbleUp, online, result } = useBubbleSave({
    request: async () => {
      const result = await fetch('/logo.svg', { method: 'GET' });

      return await result.blob();
    },
  });

  useEffect(() => {
    if (result) {
      const file = window.URL.createObjectURL(result);
      window.open(file);
    }
  }, [result]);

  const onClickHandler = () => bubbleUp();

  const className = `indicator ${online ? 'online' : 'offline'}`;

  return (
    <div>
      <div>
        Is Online:&nbsp;
        <span className={className} />
      </div>
      <button type="button" onClick={onClickHandler}>
        Try bubbling with a GET!
      </button>
    </div>
  );
};

export default GetBubble;
