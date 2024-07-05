import { Detailed, Html, useGLTF } from '@react-three/drei'
import { MeshBasicMaterial } from 'three'
import { useAppContext } from '../context'
import { useThree } from '@react-three/fiber'
import { useState } from 'react'

export default function Contact(props) {
  const { materials: lowMats } = useGLTF('models/low-res/contact_sign.glb')
  const { materials: midMats } = useGLTF('models/mid-res/contact_sign.glb')
  const { nodes, materials: highMats } = useGLTF('models/high-res/contact_sign.glb')

  const [name, setName] = useState('');

  const context = useAppContext();
  const { controls } = useThree();

  const lowBasic = new MeshBasicMaterial({map: lowMats.T_floor_sign_1001.map})
  const midBasic = new MeshBasicMaterial({map: midMats.T_floor_sign_1001.map})
  const highBasic = new MeshBasicMaterial({map: highMats.T_floor_sign_1001.map})

  return (
    <>
    {context.lookingAt == "contact" && 
    <group position={[-100, 10, 150]} rotation={[0.025, -0.75, 0.01]}>
      <mesh>
        <Html transform>
          <input className="contact" value={name} type='text' onChange={e => setName(e.value)}/>
        </Html>
      </mesh>
    </group>}
      <Detailed {...props} distances={[0, 50, 100]} onPointerOver={context.handlePointerIn} onPointerOut={context.handlePointerOut} onClick={e => context.handleClick(e, controls, props)}>
          <mesh geometry={nodes.defaultMaterial.geometry} material={highBasic} position={[0, 56.743, 0.001]} rotation={[-Math.PI / 2, 0, 0]} scale={56.743} />
          <mesh geometry={nodes.defaultMaterial.geometry} material={midBasic} position={[0, 56.743, 0.001]} rotation={[-Math.PI / 2, 0, 0]} scale={56.743} />
          <mesh geometry={nodes.defaultMaterial.geometry} material={lowBasic} position={[0, 56.743, 0.001]} rotation={[-Math.PI / 2, 0, 0]} scale={56.743} />
      </Detailed>
    </>
    )
}

useGLTF.preload('models/low-res/contact_sign.glb')
useGLTF.preload('models/mid-res/contact_sign.glb')
useGLTF.preload('models/high-res/contact_sign.glb')
