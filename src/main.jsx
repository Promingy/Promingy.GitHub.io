import React, { createContext, useCallback, useContext, useState} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { useCursor } from '@react-three/drei';

const PanContext = createContext()

export const usePan = () => {
  return useContext(PanContext)
};

export const PanProvider = ({children}) => {
  const [pan, setPan] = useState(true)
  const [smallText, setSmallText] = useState(false)
  const [lookingAt, setLookingAt] = useState('none')
  const [hovered, setHovered] = useState(false)
  const [panTimeout, setPanTimeout] = useState(null)
  const [displayStart, setDisplayStart] = useState(false);

  const handlePointerIn = useCallback(() => setHovered(true), [hovered])
  const handlePointerOut = useCallback(() => setHovered(false), [hovered])

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
  }

  return (
    <PanContext.Provider value={value}>
      {children}
    </PanContext.Provider>
    )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PanProvider>
      <App />
    </PanProvider>
  </React.StrictMode>,
)