import React, { useState, useEffect } from 'react';
import MyInfo from "../myInfo.json";
import { useAppContext } from "../context";

/**
 * The Clock component displays the current time and the name and job title of the user.
 * The text is animated in with a typing effect.
 */
const Clock: React.FC = () => {
  const [time, setTime] = useState<Date>(new Date()); // The current time
  const [name, setName] = useState<string>(""); //The name of the user to be displayed
  const [jobTitle, setJobTitle] = useState<string>("");  //The job title of the user to be displayed
  const { mute, setMute } = useAppContext(); //The context for the mute state
  const typingSound = new Audio('sounds/typing.mp3'); //An audio object for the typing sound

   //The current hours, minutes and seconds
  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');

  useEffect(() => {
  
    //Set the current time every second
    const clock = setInterval(() => {
      setTime(new Date());
    }, 1000);

  
    //Set the name and job title one letter at a time with a .25 second delay between letters
    //Set the sub header after the name is set with a .25 second delay between letters
    //Clear the interval after the sub header is set and the name is set
    const name = MyInfo.name;
    const jobTitle = MyInfo.jobTitle;
    let [nameIndex, jobIndex] = [0, 0];

    typingSound.volume = 0.8;
    typingSound.play();

    const interval = setInterval(() => {
      setName(name.slice(0, nameIndex));
      nameIndex++;
      if (nameIndex > name.length) {
        clearInterval(interval);
        const subHeaderInterval = setInterval(() => {
          setJobTitle(jobTitle.slice(0, jobIndex));
          jobIndex++;
          if (jobIndex > jobTitle.length) {
            typingSound.pause();
            clearInterval(subHeaderInterval);
          }
        }, 100);
      }
    }, 100);

    return () => {
      //Clear the intervals when the component is unmounted
      clearInterval(clock);
      clearInterval(interval);
    };
  }, []);

  return (
    <div style={{ color: "white", position: "absolute", zIndex: 1, left: 20 }}>
      <h2>{name}</h2>
      <h3>{jobTitle}</h3>
      <h3 className="timeWrapper" style={{marginTop: 0}}>
            <p className="time">{hours}:{minutes}:{seconds}</p>
            <i className={`fa-solid fa-volume-${mute ? 'xmark' : 'high'}`} onClick={() => setMute(!mute)}/>
          </h3>
    </div>
  );
};

export default Clock;