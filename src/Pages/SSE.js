import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";


// import useUpdateEffect from "../store/hooks/useUpdateEffect";

function SSE() {
  const location=useLocation();
  const roomId=location.pathname.split("/debate/")[1];
  const [listening, setListening] = useState(false);
  const [data, setData] = useState([]);
  const [value, setValue] = useState(null);

  const [meventSource, msetEventSource] = useState(undefined);

  let eventSource = undefined;

  useEffect(() => {
    if (!listening) {
      eventSource = new EventSource(`https://api.wepeech.com:8443/subscribe/${roomId}`,); //구독
      msetEventSource(eventSource);
      console.log("eventSource", eventSource);

      eventSource.onopen = event => {
          console.log("연결완료")
      };
      eventSource.onmessage = event => {
        console.log("result", event.data);
        setData(old => [...old, event.data]);
        setValue(event.data);
      };

        eventSource.onerror = event => {
        console.log(event.target.readyState);
        if (event.target.readyState === EventSource.CLOSED) {
          console.log("eventsource closed (" + event.target.readyState + ")");
        }
        eventSource.close();
      };

      setListening(true);
    }

    return () => {
      eventSource.close();
      console.log("eventsource closed");
    };
  }, []);

  useEffect(() => {
    console.log("data: ", data);
  }, [data]);

  const checkData = () => {
    console.log(data);
  };

  const startDebate = () => {
    const cookies = new Cookies(); 
    const token = cookies.get("token");
    axios
      .get(`https://api.wepeech.com:8443/timer/${roomId}`,
      {headers: { "Authorization": token }})
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div style={{marginTop:"100px"}}>
      <button onClick={checkData}>구독하기</button>
      <button onClick={startDebate}>토론방 시작하기</button>
      <header className="App-header">
        <div style={{ backgroundColor: "white" }}>
          Received Data
          {data.map((d, index) => (
            <span key={index}>{d}</span>
          ))}
        </div>
      </header>
      <div>value: {value}</div>
    </div>
  );
}

export default SSE;