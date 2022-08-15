import styled from 'styled-components';

const Section = styled.div`
  display: block;
  width: 200px;
  height: 50px;
  border: 2px solid #000;
  margin-bottom: 20px;

  &:hover {
    cursor: move;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

export { Section };
