import { useGLTF } from '@react-three/drei'
import { LinearFilter } from 'three'

export default function Model(props) {
  const { nodes, materials } = useGLTF('models/high-res/test.glb')
  for (const m in materials) materials[m].map.minFilter = LinearFilter
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Box007_purple_0.geometry} material={materials['Material.001']} position={[-29.474, 42.98, -58.969]} rotation={[-Math.PI / 2, 0, 0]} scale={[219.325, 140.484, 42.414]} />
    </group>
  )
}

useGLTF.preload('models/high-res/test.glb')
