import { useGLTF } from '@react-three/drei'

export default function Sconce(props) {
  const { nodes, materials } = useGLTF('models/old_black_sconce.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Cylinder006__0.geometry} material={materials['Scene_-_Root']} position={[1.772, -0.057, -2.88]} scale={1.718} />
    </group>
  )
}

useGLTF.preload('models/old_black_sconce.glb')
