import { useEffect, useRef } from "react";

export const useInterval = (callback, time, endtime) => {
    console.log(endtime);
    if(endtime!=null){
        const savedCallback = useRef();

        useEffect(() => {
          savedCallback.current = callback;
        });
      
        useEffect(() => {
          if (time <= 0) return;
          function tick() {
            savedCallback.current();
          }
      
          let id = setInterval(tick, 1000);
          return () => clearInterval(id);
        }, []);
    }
  
};