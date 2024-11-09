import { createContext, useCallback, useContext, useEffect, useRef, useState} from 'react'
import { useCursor } from '@react-three/drei';
import { clearTimeouts } from './tsx_components/Camera'

const context = createContext()

export const useAppContext = () => {
  return useContext(context)
};

function debounce(fn, delay) {
  let timerId;
  return (...args) => {
    if (timerId) clearTimeout(timerId);
    timerId = setTimeout(() => fn(...args), delay);
  }
}

/**
 * ContextProvider component that provides application-wide context values and handlers.
 * 
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The child components to be wrapped by the context provider.
 * @returns {JSX.Element} A context provider component.
 */
export const ContextProvider = ({ children }) => {
  const [pan, setPan] = useState(false);
  const [lookingAt, setLookingAt] = useState('');
  const [hovered, setHovered] = useState(false);
  const [panTimeout, setPanTimeout] = useState(null);
  const [displayStart, setDisplayStart] = useState(false);
  const [initialCamera, setInitialCamera] = useState(true);
  const [transition, setTransition] = useState(false);
  const [defaultImage, setDefaultImage] = useState(false);
  const [mute, setMute] = useState(false);
  const [viewed, setViewed] = useState(false);

  let timeout;

  let debounceSetHovered = useCallback(debounce(setHovered, 50), [])

  /**
   * Handles click events on interactive elements.
   * 
   * @param {Event} e - The click event.
   * @param {Object} controls - Camera controls object.
   * @param {Object} props - Properties of the clicked element.
   */
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

    if (lookingAt === props.name) {
      setLookingAt('none');
      controls.setLookAt(-200, 175, 200, 0, 0, 0, true);
      toggleTransitionTimeout(true);
    } else {
      setLookingAt(props.name);
      clearTimeouts();
      controls.setLookAt(...props.moveTo, ...props.lookAt, true);
    }
  }, [lookingAt, mute, panTimeout]);

  /**
   * Handles pointer entering an interactive area.
   * 
   * @param {Event} e - The pointer event.
   */
  const handlePointerIn = useCallback((e) => {
    e.stopPropagation();
    debounceSetHovered(true);
  }, [debounceSetHovered]);

  /**
   * Handles pointer leaving an interactive area.
   * 
   * @param {Event} e - The pointer event.
   */
  const handlePointerOut = useCallback((e) => {
    e.stopPropagation();
    debounceSetHovered(false);
  }, [debounceSetHovered]);

  /**
   * Toggles transition timeout and optionally sets default image.
   * 
   * @param {boolean} toggle - Whether to toggle the timeout.
   * @param {boolean} [defaultImage=false] - Whether to set the default image.
   */
  function toggleTransitionTimeout(toggle, defaultImage = false) {
    clearTimeout(timeout);

    if (toggle) {
      timeout = setTimeout(() => {
        setTransition(false);
        if (defaultImage) setDefaultImage(true);
      }, 5000);
    }
  }

  useCursor(hovered, 'pointer', 'default');

  // Audio file URLs
  const whooshURL = 'sounds/whoosh.mp3';
  const clickURL = 'sounds/click.mp3';
  const fireURL = 'sounds/fire.mp3';

  // Audio elements
  const whoosh = useRef(new Audio(whooshURL)).current;
  const click = useRef(new Audio(clickURL)).current;
  const fire = useRef(new Audio(fireURL)).current;

  fire.loop = true;

  // Effect to handle fire audio play/pause based on mute state
  useEffect(() => {
    if (viewed) {
      mute ? fire.pause() : fire.play();
      
      return () => {
        fire.pause();
        fire.currentTime = 0;
      };
    }
  }, [mute, viewed]);

  // Context value object
  const value = {
    pan,
    setPan,
    audio: { whoosh, click, fire },
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
    setMute,
    viewed,
    setViewed,
  };

  return (
    <context.Provider value={value}>
      {children}
    </context.Provider>
  );
};
