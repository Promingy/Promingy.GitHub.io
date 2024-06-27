import { useGLTF, Detailed, meshBounds } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useCallback} from 'react'
import { usePan } from '../main'
import { clearTimeouts } from './Camera'

export default function BountyBoard(props) {
  const { nodes, materials } = useGLTF(`models/${props.res || 'low-res'}/bounty_board.glb`)
  const { materials: midMats } = useGLTF(`models/mid-res/bounty_board.glb`)
  const { materials: highMats } = useGLTF(`models/high-res/bounty_board.glb`)
  const { setPan, whoosh, lookingAt, setLookingAt, handlePointerIn,  handlePointerOut, panTimeout, setTransition, toggleTransitionTimeout } = usePan();
  const { controls } = useThree();

  
  const handleClick = useCallback(() => {
    setTransition(true)
    toggleTransitionTimeout(false)
    setPan(false);
    
    clearTimeouts();
    clearTimeout(panTimeout);

    whoosh.play();

    if (lookingAt == 'bounty') {
      setLookingAt('none')

      controls.setLookAt(-200, 175, 200, 0, 0, 0, true)
      toggleTransitionTimeout(true)
    }
    else {
      setLookingAt('bounty')
      controls.setLookAt(41, 16, 139, 52, 16, 139, true)
    }
}, [controls, setPan, whoosh])


  return (
    <group {...props} raycast={meshBounds} dispose={null} onPointerOver={handlePointerIn} onPointerOut={handlePointerOut} onClick={handleClick}>
      <Detailed distances={[0, 30, 100]}>
      <mesh castShadow receiveShadow geometry={nodes.Object_4.geometry} material={highMats['default']} position={[0, 1.643, -0.056]} scale={1.919} />
      <mesh castShadow receiveShadow geometry={nodes.Object_4.geometry} material={midMats['default']} position={[0, 1.643, -0.056]} scale={1.919} />
      <mesh castShadow receiveShadow geometry={nodes.Object_4.geometry} material={materials['default']} position={[0, 1.643, -0.056]} scale={1.919} />
      </Detailed>
    </group>
  )
}

useGLTF.preload('models/low-res/bounty_board.glb')
useGLTF.preload('models/mid-res/bounty_board.glb')
useGLTF.preload('models/high-res/bounty_board.glb')
