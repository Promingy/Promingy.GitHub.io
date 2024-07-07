import { useGLTF } from '@react-three/drei'
import { MeshBasicMaterial } from 'three'

export default function Model(props) {
  const { nodes, materials } = useGLTF('models/tavern.glb')
  const basicMaterial = new MeshBasicMaterial({map: materials.MasterAtlas.map})
  
  return (
    <group {...props} dispose={null}>
      <mesh castShadow geometry={nodes['Piso_Surface_-_Matte_0001'].geometry} material={basicMaterial} position={[-0.353, 1.531, 0.611]} rotation={[-Math.PI, 0, -Math.PI]} scale={4.426} />
    </group>
  )
}

useGLTF.preload('models/tavern.glb')
