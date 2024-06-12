import React, { createContext, useContext, useState} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

const PanContext = createContext()

export const usePan = () => {
  return useContext(PanContext)
};

export const PanProvider = ({children}) => {
  const [pan, setPan] = useState(true)
  const [displayProject, setDisplayProject] = useState('none')
  const [smallText, setSmallText] = useState(false)


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
    displayProject,
    setDisplayProject,
    project1URL,
    project2URL,
    smallText,
    setSmallText
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
