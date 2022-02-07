import { useEffect, useState } from 'react';
import { tap, Observable } from 'rxjs';

// TODO: Idea from https://observable-hooks.js.org/api/#useobservablestate, use that instead if it makes sense

// TODO: use better type than any, typescript generics?
export const useObservableState = (
  input$: Observable<any>,
  initialState: any
) => {
  const [inputData, setInputData] = useState(initialState);

  useEffect(() => {
    const subscription = input$.pipe(tap(setInputData)).subscribe();

    // TODO: could cause memory leaks if not unsubscribed? Or should this be handled elsewhere?
    return () => {
      subscription.unsubscribe();
    };
  }, [input$]);

  return inputData;
};
