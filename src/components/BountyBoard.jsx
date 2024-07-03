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
    else if (opacity > 0) setOpacity(opacity - 0.0075);
  })

  return (
    <>
    {opacity &&
    <Float floatingRange={[-2, 0]} rotationIntensity={0} speed={5}>
      <Clouds material={MeshBasicMaterial}>
        <Cloud 
          color='papayawhip' 
          opacity={opacity} 
          speed={1} 
          scale={4} 
          position={[52, -3, 152.5]} 
          rotation={[0, Math.PI / 2, 0]} 
          seed={.5} 
        />
      </Clouds>
    </Float>
    }
      <Detailed 
        distances={[0, 30, 100]} 
        {...props} 
        raycast={meshBounds} 
        onPointerOver={e => {context.handlePointerIn(e); setHovered(true)}}
        onPointerOut={e => {context.handlePointerOut(e); setHovered(false)}}
        onClick={e => context.handleClick(e, controls, props)}
      >
        <mesh castShadow receiveShadow geometry={nodes.Object_4.geometry} material={highMats['default']} position={[0, 1.643, -0.056]} scale={1.919} />
        <mesh castShadow receiveShadow geometry={nodes.Object_4.geometry} material={midMats['default']} position={[0, 1.643, -0.056]} scale={1.919} />
        <mesh castShadow receiveShadow geometry={nodes.Object_4.geometry} material={materials['default']} position={[0, 1.643, -0.056]} scale={1.919} />
      </Detailed>
    </>
  )
}

useGLTF.preload('models/low-res/bounty_board.glb')
useGLTF.preload('models/mid-res/bounty_board.glb')
useGLTF.preload('models/high-res/bounty_board.glb')
