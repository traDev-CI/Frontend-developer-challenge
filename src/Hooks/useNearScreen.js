import React, {useEffect, useState, useRef} from 'react';


//This hook will help you to detect in which part of the screen a component is found.
const useNearScreen = ({distance = '100px'} = { }) => {
    const fromRef = useRef();
    const [isNearScreen, setView] = useState(false);
   
    useEffect(() => {
      let observer;
      const onchange = (entries, observer) => {
        const element = entries[0];
        if (element.isIntersecting) {
          setView(true);
          observer.disconnect();
        }
      };
  
      Promise.resolve(
        typeof IntersectionObserver !== "undefined"
          ? IntersectionObserver
          : import("intersection-observer")
      ).then(() => {
        observer = new IntersectionObserver(onchange, {
          rootMargin: distance,
        });
        observer.observe(fromRef.current);
      });
  
      return () => observer && observer.disconnect();
    });
    return {isNearScreen, fromRef}
  };
  
  export default useNearScreen;