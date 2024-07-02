import { useGLTF } from '@react-three/drei'
import { MeshBasicMaterial } from 'three'

export default function Tavern(props) {
  const { nodes, materials } = useGLTF('models/tavern.glb')
  
  materials["MasterAtlas.001"].roughness = 1
  materials["MasterAtlas.001"].metalness = 0
  materials["MasterAtlas.001"].side = 0
  const basicMaterial = new MeshBasicMaterial({map: materials["MasterAtlas.001"].map})


  return (
    <group {...props} dispose={null}>
      <mesh castShadow  geometry={nodes['Piso_Surface_-_Matte_0002'].geometry} material={basicMaterial} position={[-0.65, 2.285, 0.788]} rotation={[-Math.PI, 0, -Math.PI]} scale={4.602} />
    </group>
  )
}

useGLTF.preload('models/test.glb')
