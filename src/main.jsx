import React, { createContext, useCallback, useContext, useState} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { useCursor } from '@react-three/drei';

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

  const handlePointerIn = useCallback(() => setHovered(true), [hovered])
  const handlePointerOut = useCallback(() => setHovered(false), [hovered])

  let timeout;

  function toggleTransitionTimeout(toggle) {
    clearTimeout(timeout);

    if (toggle == true) {
      timeout = setTimeout(() => {
        setTransition(false)
      }, 5000)
    }
  }

  useCursor(hovered, 'pointer', 'default')

  const project1URL = 'https://project1.corbinainsworth.com'
  const project2URL = 'https://project2.corbinainsworth.com'
  const whooshURL = 'sounds/whoosh.mp3'
  const clickURL = 'sounds/click.mp3'

  const whoosh = new Audio(whooshURL)
  const click = new Audio(clickURL)

  const value = {
    pan, 
    setPan,
    whoosh,
    click,
    project1URL,
    project2URL,
    smallText,
    setSmallText,
    lookingAt,
    setLookingAt,
    handlePointerIn,
    handlePointerOut,
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

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </React.StrictMode>
)
