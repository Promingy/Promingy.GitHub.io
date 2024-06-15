
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Sconce(props) {
  const { nodes, materials } = useGLTF('models/old_black_sconce.glb')
  return (
    <group {...props} dispose={null}>
      <group
        position={[-16.978, -17.49, -31.572]}
        rotation={[-Math.PI / 2, 0, 0]}
        userData={{ name: 'Sketchfab_model' }}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01} userData={{ name: 'RootNode' }}>
          <group position={[-724.003, 1591.901, 2869.242]} userData={{ name: 'Cylinder.006' }}>
            <mesh
              // castShadow
              // receiveShadow
              geometry={nodes.Cylinder006__0.geometry}
              material={materials['Scene_-_Root']}
              position={[2533.678, 0, 0]}
              userData={{ name: 'Cylinder.006__0' }}
            />
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('models/old_black_sconce.glb')
