import { useGLTF } from '@react-three/drei'
import { MeshBasicMaterial, Raycaster, Vector3 } from 'three'
import React from 'react'

interface ModelProps {
  scale?: Vector3;
  raycast: (raycaster: Raycaster, intersects: any) => void;
  onPointerOver: (e: any) => void;
  onClick: (e: any) => void;
}

export default function Model(props: ModelProps) {
  const { nodes, materials } = useGLTF('models/tavern.glb')
const basicMaterial = new MeshBasicMaterial({ map: (materials.MasterAtlas as MeshBasicMaterial).map })
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        geometry={(nodes['Piso_Surface_-_Matte_0001'] as any).geometry}
        material={basicMaterial}
        position={[-0.353, 1.531, 0.611]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={4.426}
      />
    </group>
  )
}

useGLTF.preload('models/tavern.glb')