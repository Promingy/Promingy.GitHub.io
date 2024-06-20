import { useState, useEffect } from "react";

export default function Clock() {
    const [time, setTime] = useState({
      seconds: new Date().getSeconds(),
      minutes: new Date().getMinutes(),
      hours: new Date().getHours(),
    });
  
    useEffect(() => {
      const clock = setInterval(() => {
        setTime({
          seconds: new Date().getSeconds(),
          minutes: new Date().getMinutes(),
          hours: new Date().getHours(),
        });
      }, 1000)
  
      return () => clearInterval(clock)
    },[])
  
    const { seconds, minutes, hours } = time;
  
    const formatTime = (unit) => unit < 10 ? `0${unit}` : unit
    
    return (
        <div style={{color: "white", position: "absolute", zIndex: 1, left: 20}}>
          <h2 style={{marginBottom: 5,}}>Corbin Ainsworth</h2>
          <h3 style={{marginTop: 5, marginBottom: 5}}>Software Engineer</h3>
          <h3 style={{marginTop: 0}}>{formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}</h3>
        </div>
    )
  }