import { useGLTF, Detailed, meshBounds, Float, Clouds, Cloud, Line } from '@react-three/drei'
import { useThree, useFrame } from '@react-three/fiber'
import { useCallback, useState } from 'react'
import { useAppContext } from '../context'
import { clearTimeouts } from './Camera'
import { MeshBasicMaterial, LinearFilter, NearestFilter } from 'three'

export default function SkillBooks(props) {
  const { nodes, materials } = useGLTF(`models/low-res/skill_books.glb`)
  const { materials: midMats } = useGLTF(`models/mid-res/skill_books.glb`)
  const { nodes: highNodes, materials: highMats } = useGLTF(`models/high-res/test.glb`)
  const [opacity, setOpacity] = useState(0)
  const [hovered, setHovered] = useState(false)
  const context = useAppContext()
  const { controls } = useThree();

  for (let m in highMats) {highMats[m].minFilter = NearestFilter; highMats[m].magFilter = LinearFilter}

  useFrame(() => {
    if (hovered && opacity < 1 && context.lookingAt == "none") setOpacity(opacity + 0.005)
    else if (!hovered && opacity > 0) setOpacity(opacity - 0.0075);
  })

  
  const handleClick = useCallback(() => {
    context.setPan(false);
    context.setTransition(true)
    context.toggleTransitionTimeout(false)

    clearTimeouts();
    clearTimeout(context.panTimeout);

    context.whoosh.play();

    if (context.lookingAt == 'skills') {
      context.setLookingAt('none')
      
      controls.setLookAt(-200, 175, 200, 0, 0, 0,true)
      context.toggleTransitionTimeout(true)
    }
    else {
      context.setLookingAt('skills')
      controls.setLookAt(44, 47, -15, 48, 47, -15, true)
    }
}, [controls, context.setPan, context.whoosh])

  return (
    <>
    <Float floatingRange={[0, 1]} rotationIntensity={0} speed={5}>
      <Clouds material={MeshBasicMaterial}>
        <Cloud fade={0} opacity={opacity} seed={.24} color="papayawhip" speed={1} scale={1.25} position={[54, 42, -14]} rotation={[0, Math.PI / 2, 0]}/>
      </Clouds>
    </Float>
    <Detailed raycast={meshBounds} {...props} distances={[0, 15, 80]} 
    onPointerOver={(e) => {
      context.handlePointerIn(e);
      setHovered(true);
    }} 
    onPointerOut={(e) => {
      context.handlePointerOut(e);
      setHovered(false);
    }} 
    onClick={handleClick}>
        <mesh geometry={highNodes.Box002_ORANGE_0.geometry} material={highMats.Atlas} position={[-29.474, 42.98, -58.969]} rotation={[-Math.PI / 2, 0, 0]} scale={[219.325, 140.484, 42.414]} />
        <mesh geometry={highNodes.Box002_ORANGE_0.geometry} material={highMats.Atlas} position={[-29.474, 42.98, -58.969]} rotation={[-Math.PI / 2, 0, 0]} scale={[219.325, 140.484, 42.414]} />
        <mesh geometry={highNodes.Box002_ORANGE_0.geometry} material={highMats.Atlas} position={[-29.474, 42.98, -58.969]} rotation={[-Math.PI / 2, 0, 0]} scale={[219.325, 140.484, 42.414]} />
    </Detailed>
    </>
  )
}

useGLTF.preload('models/low-res/skill_books.glb')
useGLTF.preload('models/mid-res/skill_books.glb')
useGLTF.preload('models/high-res/test.glb')
