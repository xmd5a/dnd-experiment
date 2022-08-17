import * as React from 'react';
import { Draggable as StyledDraggable } from './Draggable.styled';

const parseToPx = (val: number) => `${val}px`;

type DraggableProps = {};

const Draggable = React.forwardRef(
  ({ children }: React.PropsWithChildren<DraggableProps>, ref) => {
    const sectionEl = React.useRef<HTMLDivElement>();
    const initialMousePosition = React.useRef({ x: 0, y: 0 });
    const initialSectionPosition = React.useRef({ position: null, x: 0, y: 0 });
    const [isDragged, setIsDragged] = React.useState(false);

    const calcElPosition = ({
      pageX: cursorXPosition,
      pageY: cursorYPosition,
    }: MouseEvent) => {
      const deltaX = cursorXPosition - initialMousePosition.current.x;
      const deltaY = cursorYPosition - initialMousePosition.current.y;

      sectionEl.current.style.left = parseToPx(
        initialSectionPosition.current.x + deltaX
      );
      sectionEl.current.style.top = parseToPx(
        initialSectionPosition.current.y + deltaY
      );
    };

    React.useEffect(() => {
      if (isDragged) {
        document.addEventListener('mousemove', onMouseMove);

        // console.log('add MouseDown Event');
      }

      return () => {
        // console.log('unmount me');

        if (isDragged) {
          // console.log('remove MouseDown Event');
          document.removeEventListener('mousemove', onMouseMove);
        }
      };
    }, [isDragged]);

    const onMouseMove = (e: MouseEvent) => {
      calcElPosition(e);
    };

    const onMouseDown = (e: MouseEvent) => {
      const { x: sectionXPosition, y: sectionYPosition } =
        sectionEl.current.getBoundingClientRect();
      const { pageX: cursorXPosition, pageY: cursorYPosition } = e;

      initialSectionPosition.current = {
        x: sectionXPosition,
        y: sectionYPosition,
        position: sectionEl.current.style.position,
      };
      initialMousePosition.current.x = cursorXPosition;
      initialMousePosition.current.y = cursorYPosition;

      sectionEl.current.style.position = 'fixed';
      calcElPosition(e);

      setIsDragged(true);
    };

    const onMouseUp = () => {
      sectionEl.current.style.position =
        initialSectionPosition.current.position;

      setIsDragged(false);
    };

    // console.log('rerender');

    return (
      <React.Fragment>
        {isDragged && <StyledDraggable />}
        <StyledDraggable
          isDragged={isDragged}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          ref={sectionEl}
          // ref={ref}
        >
          {children}
        </StyledDraggable>
      </React.Fragment>
    );
  }
);

export { Draggable };
