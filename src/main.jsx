import React, { createContext, useContext, useState} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

const PanContext = createContext()

export const usePan = () => {
  return useContext(PanContext)
};

export const PanProvider = ({children}) => {
  const [pan, setPan] = useState(true)
  const soundUrl = import.meta.env.VITE_AWS_URL + 'whoosh.mp3'
  const whoosh = new Audio(soundUrl)

  const value = {
    pan, 
    setPan,
    whoosh
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
