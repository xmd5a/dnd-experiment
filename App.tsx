import * as React from 'react';
import { Section } from './components';

export default function App() {
  return (
    <main>
      <Section key={1}>test</Section>
      <Section key={2}>test 2</Section>
    </main>
  );
}
