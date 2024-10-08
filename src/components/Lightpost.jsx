import { useGLTF } from '@react-three/drei'

export default function Lightpost(props) {
  const { nodes, materials } = useGLTF('models/lightpost.glb')
  for (let key in materials) materials[key].side = 0
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.defaultMaterial.geometry} material={materials.lambert4SG} position={[-0.009, 20.815, 0]} scale={2.935} />
      <mesh geometry={nodes.defaultMaterial_1.geometry} material={materials.lambert3SG} position={[-0.009, 21.51, 0]} scale={2.794} />
      <mesh geometry={nodes.defaultMaterial_2.geometry} material={materials.lambert2SG} position={[0, 12.186, 0]} scale={12.186} />
    </group>
  )
}

useGLTF.preload('models/lightpost.glb')
