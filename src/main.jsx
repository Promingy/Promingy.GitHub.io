import React, { createContext, useContext, useState} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

const PanContext = createContext()

export const usePan = () => {
  return useContext(PanContext)
};

export const PanProvider = ({children}) => {
  const [pan, setPan] = useState(true)
  const whooshURL = import.meta.env.VITE_AWS_URL + 'sounds/whoosh.mp3'
  const clickURL = import.meta.env.VITE_AWS_URL + 'sounds/click.mp3'
  const fireURL = import.meta.env.VITE_AWS_URL + 'sounds/fire.mp3'

  const whoosh = new Audio(whooshURL)
  const click = new Audio(clickURL)
  const fire = new Audio(fireURL)

  fire.loop = true

  const value = {
    pan, 
    setPan,
    whoosh,
    click,
    fire
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
