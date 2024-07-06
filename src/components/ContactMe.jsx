import { Detailed, Html, TransformControls, useGLTF } from '@react-three/drei'
import { MeshBasicMaterial } from 'three'
import { useAppContext } from '../context'
import { useFrame, useThree } from '@react-three/fiber'
import { useRef, useState } from 'react'

export default function Contact(props) {
  const { materials: lowMats } = useGLTF('models/low-res/contact_sign.glb')
  const { materials: midMats } = useGLTF('models/mid-res/contact_sign.glb')
  const { nodes, materials: highMats } = useGLTF('models/high-res/contact_sign.glb')

  const ref = useRef()
  const tref = useRef();

  const [ name, setName ] = useState('Enter Name Here');
  const [ email, setEmail ] = useState('Enter Email Here');
  const [ message, setMessage ] = useState('Enter Message Here');

  const context = useAppContext();
  const { controls } = useThree();

  const lowBasic = new MeshBasicMaterial({map: lowMats.T_floor_sign_1001.map})
  const midBasic = new MeshBasicMaterial({map: midMats.T_floor_sign_1001.map})
  const highBasic = new MeshBasicMaterial({map: highMats.T_floor_sign_1001.map})

  // useFrame(() => {
  //   if (ref.current){
  //     ref.current.updateMatrixWorld();
  //     console.log(ref.current.rotation)
  //   }  
  // })

  return (
    <>
    {context.lookingAt == 'contact' &&
    <>
    <group ref={ref} scale={[1.9, 2, 1]} position={[-87, 11.25, 116.5]} rotation={[-0.224, -0.796, -0.139]}>
      <mesh onPointerOver={e => e.stopPropagation()} onClick={e => e.stopPropagation()}>
        <Html transform>
          <form className='contactForm'>
            <div className="nameWrapper">
              <input 
                className="contact" 
                value={name} 
                type='text' 
                onChange={e => setName(e.target.value)} 
                onClick={() => setName(name == "Enter Name Here" ? "" : name)} 
                onBlur={() => setName(name || "Enter Name Here")}
                required
                />
            </div>
            <div className="emailWrapper">
              <input 
                className="contact" 
                type='email' 
                value={email}
                onChange={e => setEmail(e.target.value)}
                onClick={() => setEmail(email == "Enter Email Here" ? "" : email)}
                onBlur={() => setEmail(email || "Enter Email Here")}
                required
              />
            </div>
            <div className="messageWrapper">
              <textarea 
                className="message" 
                value={message}
                onChange={e => setMessage(e.target.value)}
                onClick={() => setMessage(message == "Enter Message Here" ? "" : message)}
                onBlur={() => setMessage(message || "Enter Message Here")}
                required
              />
            </div>
          </form>
        </Html>
      </mesh>
    </group>
    </>
    }
      {/* <Detailed {...props} distances={[0, 50, 100]} onPointerOver={context.handlePointerIn} onPointerOut={context.handlePointerOut} > */}
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
