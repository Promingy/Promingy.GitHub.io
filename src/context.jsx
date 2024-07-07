import { createContext, useCallback, useContext, useState} from 'react'
import { useCursor } from '@react-three/drei';
import { clearTimeouts } from './components/Camera'

const context = createContext()

export const useAppContext = () => {
  return useContext(context)
};

export const ContextProvider = ({children}) => {
  const [pan, setPan] = useState(false)
  const [smallText, setSmallText] = useState(false)
  const [lookingAt, setLookingAt] = useState('')
  const [hovered, setHovered] = useState(false)
  const [panTimeout, setPanTimeout] = useState(null)
  const [displayStart, setDisplayStart] = useState(false);
  const [initialCamera, setInitialCamera] = useState(true)
  const [transition, setTransition] = useState(false)
  const [defaultImage, setDefaultImage] = useState(false)
  
  
  let timeout;

  const handleClick = useCallback((e, controls, props) => {
    e.stopPropagation();

    setTransition(true);
    toggleTransitionTimeout(false);
    setPan(false);
    setHovered(false);
    
    clearTimeouts();
    clearTimeout(panTimeout);

    props.click && click.play();
    whoosh.play();

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

  const whoosh = new Audio(whooshURL)
  const click = new Audio(clickURL)

  const value = {
    pan, 
    setPan,
    whoosh,
    click,
    smallText,
    setSmallText,
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
    toggleTransitionTimeout
  }

  return (
    <context.Provider value={value}>
      {children}
    </context.Provider>
    )
}