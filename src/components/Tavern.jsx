import { useGLTF } from '@react-three/drei'

export default function Tavern(props) {
  const { nodes, materials } = useGLTF('models/tavern.glb')
  
  materials["MasterAtlas.001"].roughness = 1

  return (
    <group {...props} dispose={null}>
      <mesh  geometry={nodes['Piso_Surface_-_Matte_0002'].geometry} material={materials["MasterAtlas.001"]} position={[-0.65, 2.285, 0.788]} rotation={[-Math.PI, 0, -Math.PI]} scale={4.602} />
    </group>
  )
}

useGLTF.preload('models/test.glb')
