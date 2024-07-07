import { createContext, useCallback, useContext, useEffect, useRef, useState} from 'react'
import { useCursor } from '@react-three/drei';
import { clearTimeouts } from './components/Camera'

const context = createContext()

export const useAppContext = () => {
  return useContext(context)
};

export const ContextProvider = ({children}) => {
  const [pan, setPan] = useState(false)
  const [lookingAt, setLookingAt] = useState('')
  const [hovered, setHovered] = useState(false)
  const [panTimeout, setPanTimeout] = useState(null)
  const [displayStart, setDisplayStart] = useState(false);
  const [initialCamera, setInitialCamera] = useState(true)
  const [transition, setTransition] = useState(false)
  const [defaultImage, setDefaultImage] = useState(false)
  const [mute, setMute] = useState(false)
  
  
  let timeout;

  const handleClick = useCallback((e, controls, props) => {
    e.stopPropagation();

    setTransition(true);
    toggleTransitionTimeout(false);
    setPan(false);
    setHovered(false);
    
    clearTimeouts();
    clearTimeout(panTimeout);

    if (!mute) {
      props.click && click.play();
      whoosh.play();
    }

    if (lookingAt == props.name) {
      setLookingAt('none')

      controls.setLookAt(-200, 175, 200, 0, 0, 0, true)
      toggleTransitionTimeout(true)
    }
    else {
      setLookingAt(props.name)
      controls.setLookAt(...props.moveTo, ...props.lookAt, true)
    }
  })
  
  const handlePointerIn = useCallback((e) => {e.stopPropagation(); setHovered(true)}, [hovered])
  const handlePointerOut = useCallback((e) => {e.stopPropagation(); setHovered(false)}, [hovered])
  function toggleTransitionTimeout(toggle, defaultImage=false) {
    clearTimeout(timeout);

    if (toggle == true) {
      timeout = setTimeout(() => {
        setTransition(false);
        if (defaultImage) setDefaultImage(true);
      }, 5000)
    }
  }

  useCursor(hovered, 'pointer', 'default')

  const whooshURL = 'sounds/whoosh.mp3'
  const clickURL = 'sounds/click.mp3'
  const fireURL = 'sounds/fire.mp3'

  const whoosh = useRef(new Audio(whooshURL)).current
  const click = useRef(new Audio(clickURL)).current
  const fire = useRef(new Audio(fireURL)).current

  fire.loop = true;

  useEffect(() => {
    if (mute) {
      fire.pause();
    }
    else {
      fire.play()
    }

    return () => {
      fire.pause()
      fire.currentTime = 0
    }
  }, [mute])

  const value = {
    pan, 
    setPan,
    whoosh,
    click,
    fire,
    lookingAt,
    setLookingAt,
    handlePointerIn,
    handlePointerOut,
    handleClick,
    setPanTimeout,
    panTimeout,
    displayStart,
    setDisplayStart,
    initialCamera,
    setInitialCamera,
    transition,
    setTransition,
    defaultImage,
    setDefaultImage,
    toggleTransitionTimeout,
    mute,
    setMute
  }

  return (
    <context.Provider value={value}>
      {children}
    </context.Provider>
    )
}