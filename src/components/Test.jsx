import { useGLTF } from '@react-three/drei'

export default function Test(props) {
  const { nodes, materials } = useGLTF('models/test.glb')
  for (let m in materials) materials[m].side = 0
  return (
    <group {...props} dispose={null}>
      <mesh castShadow receiveShadow geometry={nodes['Piso_Surface_-_Matte_0001'].geometry} material={materials.bake} position={[-0.538, 1.531, 0.913]} rotation={[-Math.PI, 0, -Math.PI]} scale={4.099} />
    </group>
  )
}

useGLTF.preload('models/test.glb')
