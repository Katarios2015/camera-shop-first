import { useRef, useEffect, RefObject } from 'react';

export default function useFocus<T extends HTMLElement>(dependence:boolean): RefObject<T> {
  const elementRef = useRef<T>(null);

  useEffect(() => {
    if(dependence && elementRef.current){
      elementRef.current.style.visibility = 'visible';
      elementRef.current?.focus();
    }
  }, [dependence]);

  return elementRef;
}
