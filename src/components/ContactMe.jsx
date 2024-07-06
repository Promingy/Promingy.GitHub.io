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

  const [ messageLine1, setMessageLine1 ] = useState('');
  const [ messageLine2, setMessageLine2 ] = useState('');
  const [ messageLine3, setMessageLine3 ] = useState('');
  const [ messageLine4, setMessageLine4 ] = useState('');
  const [ messageLine5, setMessageLine5 ] = useState('');
  const [ messageLine6, setMessageLine6 ] = useState('');

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
    {context.lookingAt == "contact" && 
    <>
    {/* <TransformControls object={ref.current} ref={tref} mode='rotate' /> */}
    {/* <group ref={ref} scale={[2.3, 2, 1]} position={[-87, 16.722, 116.5]} rotation={[-0.223, -0.706, -0.117]}> */}
    <group ref={ref} scale={[1.9, 2, 1]} position={[-87, 15.1, 116.5]} rotation={[-0.225, -0.797, -0.152]}>
      <mesh>
        <Html transform occlude>
          <form className='contactForm'>
            <div className="nameWrapper">
              <label for="name" className="name-label">Name:</label>
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
              <label for="email" className="email-label">Email:</label>
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
              <label for="message" className="message-label">Message:</label>
              <input 
                type='text' 
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
      <Detailed {...props} distances={[0, 50, 100]} onPointerOver={context.handlePointerIn} onPointerOut={context.handlePointerOut} >
      {/* <Detailed {...props} distances={[0, 50, 100]} onPointerOver={context.handlePointerIn} onPointerOut={context.handlePointerOut} onClick={e => context.handleClick(e, controls, props)}> */}
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
