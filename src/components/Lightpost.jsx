import { useGLTF } from '@react-three/drei'

export default function Lightpost(props) {
  const { nodes, materials } = useGLTF('models/lightpost.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.defaultMaterial002.geometry} material={materials["Material.001"]} position={[-0.008, 12.185, 0]} scale={[12.186, 12.185, 12.185]} />
    </group>
  )
}

useGLTF.preload('models/lightpost.glb')
