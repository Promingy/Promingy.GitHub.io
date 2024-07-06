import { useGLTF } from '@react-three/drei'
import { MeshBasicMaterial } from 'three'

export default function Model(props) {
  const { nodes, materials } = useGLTF('models/tavern_no_light.glb')
  const basicMaterial = new MeshBasicMaterial({map: materials.MasterAtlas.map})
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes['Piso_Surface_-_Matte_0001'].geometry} material={basicMaterial} position={[-21.19, 0.001, 0.72]} rotation={[-Math.PI, 0, -Math.PI]} scale={0.009} />
    </group>
  )
}

useGLTF.preload('models/tavern_no_light.glb')
