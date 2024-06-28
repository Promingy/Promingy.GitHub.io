import { useGLTF, Detailed, meshBounds, Cloud, Clouds, Float } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useCallback, useState} from 'react'
import { useAppContext } from '../context'
import { clearTimeouts } from './Camera'
import { MeshBasicMaterial } from 'three'

export default function BountyBoard(props) {
  const { nodes, materials } = useGLTF(`models/${props.res || 'low-res'}/bounty_board.glb`)
  const { materials: midMats } = useGLTF(`models/mid-res/bounty_board.glb`)
  const { materials: highMats } = useGLTF(`models/high-res/bounty_board.glb`)
  const [ hovered, setHovered ] = useState(false)
  const [opacity, setOpacity] = useState(0)
  const context = useAppContext()
  const { controls } = useThree();

  useFrame(() => {
    if (hovered && opacity < 1 && context.lookingAt == 'none') setOpacity(opacity + 0.0025)
    else if (!hovered && opacity > 0) setOpacity(opacity - 0.0075);
  })
  
  const handleClick = useCallback(() => {
    context.setTransition(true)
    context.toggleTransitionTimeout(false)
    context.setPan(false);
    
    clearTimeouts();
    clearTimeout(context.panTimeout);

    context.whoosh.play();

    if (context.lookingAt == 'bounty') {
      context.setLookingAt('none')

      controls.setLookAt(-200, 175, 200, 0, 0, 0, true)
      context.toggleTransitionTimeout(true)
    }
    else {
      context.setLookingAt('bounty')
      controls.setLookAt(41, 16, 139, 52, 16, 139, true)
    }
}, [controls, context.setPan, context.whoosh])


  return (
    <>
    {opacity &&
    <Float floatingRange={[-2, 0]} rotationIntensity={0} speed={5}>
      <Clouds material={MeshBasicMaterial}>
        <Cloud fade={0.000000001} color='papayawhip' opacity={opacity} speed={1} scale={4} position={[52, -3, 152.5]} rotation={[0, Math.PI / 2, 0]} seed={.5} />
      </Clouds>
    </Float>
    }
    <group {...props} raycast={meshBounds} dispose={null} 
        onPointerOver={(e) => {
            context.handlePointerIn(e);
            setHovered(true);
          }
        } 
        onPointerOut={(e) => {
              context.handlePointerOut(e);
              setHovered(false);
            }
          } 
        onClick={handleClick}>
      <Detailed distances={[0, 30, 100]}>
      <mesh castShadow receiveShadow geometry={nodes.Object_4.geometry} material={highMats['default']} position={[0, 1.643, -0.056]} scale={1.919} />
      <mesh castShadow receiveShadow geometry={nodes.Object_4.geometry} material={midMats['default']} position={[0, 1.643, -0.056]} scale={1.919} />
      <mesh castShadow receiveShadow geometry={nodes.Object_4.geometry} material={materials['default']} position={[0, 1.643, -0.056]} scale={1.919} />
      </Detailed>
    </group>
    </>
  )
}

useGLTF.preload('models/low-res/bounty_board.glb')
useGLTF.preload('models/mid-res/bounty_board.glb')
useGLTF.preload('models/high-res/bounty_board.glb')
