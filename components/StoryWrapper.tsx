import { ComponentPreview } from './ComponentPreview';
import { CanvasAttributes } from './data/types.ts';
import React, { FC } from 'react';

interface StoryWrapperProps {
  attributes: CanvasAttributes;
  component: React.FC<any>;
}

export function StoryWrapper({ attributes, component: Component }: StoryWrapperProps) {
  return (
    <ComponentPreview canvas={attributes.canvas} withSpacing>
      <Component {...(attributes.props || null)} />
    </ComponentPreview>
  );
}
