import * as React from 'react';
import { Section as StyledSection } from './Section.styled';

const parseToPx = (val: number) => `${val}px`;

type SectionProps = {};

const Section = ({ children }: React.PropsWithChildren<SectionProps>) => {
  const sectionEl = React.useRef<HTMLDivElement>();
  const initialMousePosition = React.useRef({ x: 0, y: 0 });
  const initialSectionPosition = React.useRef({ position: null, x: 0, y: 0 });
  const [isDragged, setIsDragged] = React.useState(false);

  React.useEffect(() => {
    if (isDragged) {
      document.addEventListener('mousemove', onMouseMove);

      console.log('add MouseDown Event');
    }

    return () => {
      console.log('unmount me');

      if (isDragged) {
        console.log('remove MouseDown Event');
        document.removeEventListener('mousemove', onMouseMove);
      }
    };
  }, [isDragged]);

  const onMouseMove = ({
    pageX: cursorXPosition,
    pageY: cursorYPosition,
  }: MouseEvent) => {
    const deltaX = cursorXPosition - initialMousePosition.current.x;
    const deltaY = cursorYPosition - initialMousePosition.current.y;

    sectionEl.current.style.position = 'fixed';
    sectionEl.current.style.left = parseToPx(
      initialSectionPosition.current.x + deltaX
    );
    sectionEl.current.style.top = parseToPx(
      initialSectionPosition.current.y + deltaY
    );
  };

  const onMouseDown = ({
    pageX: cursorXPosition,
    pageY: cursorYPosition,
  }: React.MouseEvent<HTMLElement>) => {
    const { x: sectionXPosition, y: sectionYPosition } =
      sectionEl.current.getBoundingClientRect();
    initialSectionPosition.current = {
      x: sectionXPosition,
      y: sectionYPosition,
      position: sectionEl.current.style.position,
    };
    initialMousePosition.current.x = cursorXPosition;
    initialMousePosition.current.y = cursorYPosition;
    setIsDragged(true);
  };

  const onMouseUp = () => {
    sectionEl.current.style.position = initialSectionPosition.current.position;
    setIsDragged(false);
  };

  console.log('rerender');

  return (
    <StyledSection
      isDragged={isDragged}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      ref={sectionEl}
    >
      {children}
    </StyledSection>
  );
};

export { Section };
