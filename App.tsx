import * as React from 'react';
import { Draggable, DraggableProvider } from './components';

const data = [
  { id: 1, label: 'test 1' },
  { id: 2, label: 'test 2' },
  { id: 3, label: 'test 3' },
];

export default function App() {
  return (
    <main>
      <DraggableProvider>
        {data.map(({ id, label }) => (
          <Draggable key={id}>{label}</Draggable>
        ))}
      </DraggableProvider>
    </main>
  );
}
