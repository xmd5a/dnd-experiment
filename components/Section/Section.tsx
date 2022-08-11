import * as React from 'react';
import { Section as StyledSection } from './Section.styled';

const Section = () => {
  const sectionEl = React.useRef();

  const onDragStart = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
  };

  const onDragEnd = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
  };

  const onMouseDown = (e: React.MouseEvent<HTMLElement>) => {
    console.log('mouse down');
  };

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
  };

  console.log('rerender');

  return (
    <StyledSection
      draggable
      ref={sectionEl}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      section
    </StyledSection>
  );
};

export { Section };
