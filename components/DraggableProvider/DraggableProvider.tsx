import * as React from 'react';

import { DraggableContext, DraggableDispatchContext } from './DraggableContext';

type DraggableProviderProps = {
  children: Array<React.ReactElement>;
};

const reducer = (state, action) => {};

const initialData = null;

const DraggableProvider = ({ children }: DraggableProviderProps) => {
  const [data, dispatch] = React.useReducer(reducer, initialData);
  // const sectionRefs = {};

  // useEffect(() => {
  //   console.log(sectionRefs);
  // }, [sectionRefs]);

  // return children.map((component) => {
  //   // const refId = Symbol();

  //   return cloneElement(component, {
  //     ref: (node) => {
  //       sectionRefs[Symbol()] = node;
  //       console.log('node', node);
  //     },
  //   });
  // });

  return (
    <DraggableContext.Provider value={data}>
      <DraggableDispatchContext.Provider value={dispatch}>
        {children}
      </DraggableDispatchContext.Provider>
    </DraggableContext.Provider>
  );
};

export { DraggableProvider };
