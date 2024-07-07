import { useState, useEffect } from "react";
import MyInfo from "../myInfo.json";
import { useAppContext } from "../context";

export default function Clock() {
    const [time, setTime] = useState(new Date());
    const [name, setName] = useState("")
    const [jobTitle, setJobTitle] = useState("")
    const {mute, setMute} = useAppContext()
    const typingSound = new Audio('sounds/typing.mp3')

    const hours = time.getHours().toString().padStart(2, '0')
    const minutes = time.getMinutes().toString().padStart(2, '0')
    const seconds = time.getSeconds().toString().padStart(2, '0')
  
    useEffect(() => {
      const clock = setInterval(() => {
        setTime(new Date());
      }, 1000)

      // set name one letter at a time with a .25 second delay between letters
      // set the sub header after the name is set with a .25 second delay between letters
      // clear the interval after the sub header is set and the name is set

      const name = MyInfo.name
      const jobTitle = MyInfo.jobTitle
      let [i, j] = [0, 0]

      typingSound.volume = 0.8
      typingSound.play()


      const interval = setInterval(() => {
        setName(name.slice(0, i))
        i++
        if (i > name.length) {
          clearInterval(interval)
          const subHeaderInterval = setInterval(() => {
            setJobTitle(jobTitle.slice(0, j))
            j++
            if (j > jobTitle.length) {
              typingSound.pause()
              clearInterval(subHeaderInterval)
            }
          }, 100)
        }
      }
      , 100)
  
      return () => {clearInterval(clock); clearInterval(interval)}
    },[])
    
    return (
        <div style={{color: "white", position: "absolute", zIndex: 1, left: 20}}>
          <h2 style={{marginBottom: 5,}}>{name}</h2>
          <h3 style={{marginTop: 5, marginBottom: 5}}>{jobTitle}</h3>
          <h3 className="timeWrapper" style={{marginTop: 0}}>
            <p className="time">{hours}:{minutes}:{seconds}</p>
            <i className={`fa-solid fa-volume-${mute ? 'xmark' : 'high'}`} onClick={() => setMute(!mute)}/>
          </h3>
        </div>
    )
  }