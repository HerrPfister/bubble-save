import React, { ReactElement } from 'react';

import { BubbleSaveProvider } from '../BubbleSaveProvider';

import GetBubble from './get.example';
import PostBubble from './post.example';

const ExampleApp = (): ReactElement => {
  return (
    <BubbleSaveProvider>
      <GetBubble />
      <PostBubble />
    </BubbleSaveProvider>
  );
};

export default ExampleApp;
