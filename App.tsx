import * as React from 'react';
import { Section } from './components';

export default function App() {
  return (
    <main>
      <Section key={1}>test 1</Section>
      <Section key={2}>test 2</Section>
      <Section key={3}>test 3</Section>
    </main>
  );
}
