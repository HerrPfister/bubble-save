import React, { ReactElement, useState } from 'react';
import { useBubbleSave } from '../hooks';

type formFields = {
  firstName?: string;
  lastName?: string;
};

const PostBubble = (): ReactElement => {
  const [fields, setFields] = useState<formFields>({});

  const { bubbleUp, online, result, lastRequestBody } = useBubbleSave<formFields, string>({
    request: async (data?: formFields): Promise<string> => {
      return new Promise((resolve) => {
        resolve(`POST mock, would have been called with ${JSON.stringify(data)}`);
      });
    },
  });

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    bubbleUp(fields);
  };

  const className = `indicator ${online ? 'online' : 'offline'}`;

  const handleFieldUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setFields({ ...fields, [name]: value });
  };

  return (
    <div>
      <div>
        Is Online:&nbsp;
        <span className={className} />
      </div>
      {result && <p>{result}</p>}
      <form onSubmit={onSubmitHandler}>
        <input type="text" onChange={handleFieldUpdate} name="firstName" defaultValue={lastRequestBody?.firstName} />
        <input type="text" onChange={handleFieldUpdate} name="lastName" defaultValue={lastRequestBody?.lastName} />
        <button type="submit">Try bubbling with a POST!</button>
      </form>
    </div>
  );
};

export default PostBubble;
