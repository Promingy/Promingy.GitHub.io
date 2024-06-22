import { useState, useEffect } from "react";

export default function Clock() {
    const [time, setTime] = useState(new Date());
    const [name, setName] = useState("")
    const [subHeader, setSubHeader] = useState("")

    const hours = time.getHours().toString().padStart(2, '0')
    const minutes = time.getMinutes().toString().padStart(2, '0')
    const seconds = time.getSeconds().toString().padStart(2, '0')
  
    useEffect(() => {
      const clock = setInterval(() => {
        setTime(new Date());
      }, 1000)
  
      return () => clearInterval(clock)
    },[])

    useEffect(() => {
      // set name one letter at a time with a .25 second delay between letters
      // set the sub header after the name is set with a .25 second delay between letters
      // clear the interval after the sub header is set and the name is set

      const name = "Corbin Ainsworth"
      const subHeader = "Software Engineer"
      let [i, j] = [0, 0]

      const interval = setInterval(() => {
        setName(name.slice(0, i))
        i++
        if (i > name.length) {
          clearInterval(interval)
          const subHeaderInterval = setInterval(() => {
            setSubHeader(subHeader.slice(0, j))
            j++
            if (j > subHeader.length) clearInterval(subHeaderInterval)
          }, 100)
        }
      }
      , 100)

    },[])  
    
    return (
        <div style={{color: "white", position: "absolute", zIndex: 1, left: 20}}>
          <h2 style={{marginBottom: 5,}}>{name}</h2>
          <h3 style={{marginTop: 5, marginBottom: 5}}>{subHeader}</h3>
          <h3 style={{marginTop: 0}}>{hours}:{minutes}:{seconds}</h3>
        </div>
    )
  }