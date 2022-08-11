import * as React from 'react';
import { Section as StyledSection } from './Section.styled';

const parseToPx = (val: number) => `${val}px`;

type SectionProps = {};

const Section = ({ children }: React.PropsWithChildren<SectionProps>) => {
  const sectionEl = React.useRef<HTMLDivElement>();
  const isMouseDown = React.useRef(false);
  const [isDragged, setIsDragged] = React.useState(false);

  // const onDragStart = (e: React.MouseEvent<HTMLElement>) => {
  //   console.log(e);
  // };

  // const onDragEnd = (e: React.MouseEvent<HTMLElement>) => {
  //   console.log(e);
  // };

  React.useEffect(() => {
    if (isDragged) {
      console.log('add MouseDown Event');

      document.addEventListener('mousemove', onMouseMove);
    }

    return () => {
      console.log('unmount me');
      console.log('remove MouseDown Event');

      document.removeEventListener('mousemove', onMouseMove);
    };
  }, [isDragged]);

  // this probably should be in higher component
  const onMouseMove = ({
    pageX: cursorXPosition,
    pageY: cursorYPosition,
  }: MouseEvent) => {
    console.log(parseToPx(cursorXPosition));
    console.log(parseToPx(cursorYPosition));

    const { x: sectionElXPosition, y: sectionElYPosition } =
      sectionEl.current.getBoundingClientRect();

    // console.log(sectionEl.current.getBoundingClientRect());

    console.log('y', parseToPx(cursorYPosition - sectionElYPosition));
    console.log('x', parseToPx(cursorXPosition - sectionElXPosition));

    sectionEl.current.style.position = 'fixed';
    sectionEl.current.style.top = parseToPx(
      cursorYPosition - sectionElYPosition
    );
    sectionEl.current.style.left = parseToPx(
      cursorXPosition - sectionElXPosition
    );
  };

  const onMouseDown = (e: React.MouseEvent<HTMLElement>) => {
    console.log('mouse down');
    setIsDragged(true);
    // isMouseDown.current = true;
  };

  const onMouseUp = (e: React.MouseEvent<HTMLElement>) => {
    console.log('mouse up');
    setIsDragged(false);
    // isMouseDown.current = false;
  };

  console.log('rerender');

  return (
    <StyledSection
      isDragged={isDragged}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      ref={sectionEl}
      // onMouseMove={onMouseMove}
      // draggable
      // onDragStart={onDragStart}
      // onDragEnd={onDragEnd}
    >
      {children}
    </StyledSection>
  );
};

export { Section };
