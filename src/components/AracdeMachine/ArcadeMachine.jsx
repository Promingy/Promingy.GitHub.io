import React from 'react'
import { useGLTF } from '@react-three/drei'
import LoadProject from '../LoadProject'
import { usePan } from '../../main'

export default function ArcadeMachine(props) {
  const { nodes, materials } = useGLTF('models/arcade_machine.glb')
  const { displayProject } = usePan()
  return (
    <>
     {displayProject == props.name && <LoadProject
      url={props.project}
      rotation={[-1.418, 1.368, 1.414]}
      position={[85.147, 28, props.position[2]]}
      scale={[.41, .7, .1]}
    />}
    <group {...props} dispose={null}>
      <group
        position={[0.00383738, 1.01931965, 0.13054776]}
        rotation={[-Math.PI / 2, 0.00679206, Math.PI]}
        scale={[0.01183505, 0.01183504, 0.01183505]}>
        <group position={[0, 0, -0.00000991]} rotation={[Math.PI / 2, 0, 0]}>
          <group position={[0, -0.00000376, 0]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Body_1_Body_0.geometry}
              material={materials.Body}
              position={[0, -0.56953365, 1.80483043]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Null_1_Null_0.geometry}
              material={materials.Null}
              position={[0, -0.56953365, 1.80483043]}
            />
          </group>
        </group>
      </group>
    </group>
    </>
  )
}

useGLTF.preload('models/arcade_machine.glb')