import { Mesh, MeshBasicMaterial } from 'three'
import React from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    ['Piso_Surface_-_Matte_0001']: Mesh
  }
  materials: {
    MasterAtlas: MeshBasicMaterial
  }
}

type Props = {
  
}

export default function Model(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('models/tavern.glb') as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh castShadow geometry={nodes['Piso_Surface_-_Matte_0001'].geometry} material={materials.MasterAtlas} position={[-0.353, 1.531, 0.611]} rotation={[-Math.PI, 0, -Math.PI]} scale={4.426} />
    </group>
  )
}

useGLTF.preload('models/tavern.glb')
