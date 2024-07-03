import { useGLTF, Detailed, meshBounds, Float, Clouds, Cloud } from '@react-three/drei'
import { useThree, useFrame } from '@react-three/fiber'
import { useState } from 'react'
import { useAppContext } from '../context'
import { MeshBasicMaterial, NearestFilter } from 'three'

export default function SkillBooks(props) {
  const { materials: lowMats } = useGLTF(`models/low-res/skill_books.glb`)
  const { materials: midMats } = useGLTF(`models/mid-res/skill_books.glb`)
  const { nodes, materials: highMats } = useGLTF(`models/high-res/skill_books.glb`)
  const [opacity, setOpacity] = useState(0)
  const [hovered, setHovered] = useState(false)
  const context = useAppContext()
  const { controls } = useThree();

  for (let m in highMats) {highMats[m].minFilter = NearestFilter; highMats[m].magFilter = NearestFilter}

  useFrame(() => {
    if (hovered && opacity < 1 && context.lookingAt == "none") setOpacity(opacity + 0.005)
    else if (opacity > 0) setOpacity(opacity - 0.0075);
  })

  return (
    <>
    {opacity && <Float floatingRange={[0, 1]} rotationIntensity={0} speed={5}>
      <Clouds material={MeshBasicMaterial}>
        <Cloud opacity={opacity} seed={.24} color="papayawhip" speed={1} scale={1.25} position={[54, 42, -14]} rotation={[0, Math.PI / 2, 0]}/>
        <Cloud opacity={opacity} seed={.25} color="papayawhip" speed={1} scale={1.25} position={[54, 42, 0]} rotation={[0, Math.PI / 2, 0]}/>
      </Clouds>
    </Float>}
    <Detailed
      {...props}
      raycast={meshBounds}
      distances={[0, 25, 200]}
      onPointerOver={(e) => {context.handlePointerIn(e); setHovered(true)}}
      onPointerOut={(e) => {context.handlePointerOut(e); setHovered(false)}}
      onClick={e => context.handleClick(e, controls, props)}
    >
        <mesh geometry={nodes.Box002_ORANGE_0.geometry} material={highMats.Atlas} />
        <mesh geometry={nodes.Box002_ORANGE_0.geometry} material={midMats.Atlas} />
        <mesh geometry={nodes.Box002_ORANGE_0.geometry} material={lowMats.Atlas} />
    </Detailed>
    </>
  )
}

useGLTF.preload('models/low-res/skill_books.glb')
useGLTF.preload('models/mid-res/skill_books.glb')
useGLTF.preload('models/high-res/test.glb')
