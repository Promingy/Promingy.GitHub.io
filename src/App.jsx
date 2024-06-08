import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { CameraControls, Reflector } from '@react-three/drei'
import { useEffect, useRef, useState } from 'react'
import './App.css'



import LoadModel from './components/LoadModel'
import Lights from './components/Lights'
import Flame from './components/Flame/Flame'
import Text from './components/Text/Text'

import { FontLoader } from 'three/examples/jsm/Addons.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { extend } from '@react-three/fiber'
import Playball from './Playball_Regular.json'
extend({ TextGeometry })

const url = 'https://glb-bucket-portfolio.s3-accelerate.amazonaws.com/'
let timeout, timeout2;

export function CameraRotation () {
  const cameraRef = useRef();
  const { controls } = useThree();
  const [pan, setPan] = useState(true)

  // useEffect(() => {
    function onDragStart() {
      setPan(false)
      clearTimeout(timeout)
      clearTimeout(timeout2)
    }

    function onDragEnd() {
      timeout = setTimeout(() => {
        timeout = null
        controls.setLookAt(-200, 175, 200, 0, 0, 0, true)
      }, 2000)
    
      timeout2 = setTimeout(() => {
        setPan(true)
        timeout2 = null
      }
      , 7000)
    }

    if (controls) {
      controls.addEventListener('controlstart', onDragStart)
      controls.addEventListener('controlend', onDragEnd)
    }

  //   return () => {
  //     if (controls) {
  //       controls.removeEventListener('controlstart', onDragStart)
  //       controls.removeEventListener('controlend', onDragEnd)
  //     }
  //   }
    
  // }, [])


  useFrame(() => { 
    if(cameraRef.current && pan){
      const rotationSpeed = !pan ? 0 : 0.001
  
      cameraRef.current.rotate(rotationSpeed, 0)
    }
  }, [cameraRef])

  
   return <CameraControls 
      maxDistance={333}
      minDistance={170}
      maxPolarAngle={Math.PI / 2}
      truckSpeed={0}
      smoothTime={1}
      ref={cameraRef}
      makeDefault
      enabled={true}
    />
}

// function Text({text, size, depth, position, moveTo, lookAt}) {
//   const font = new FontLoader().parse(Playball)
//   const [hovered, setHovered] = useState(false)
//   const [color, setColor] = useState(0xffffff)
//   const {controls} = useThree()

//   useEffect(() => {
//       document.body.style.cursor = hovered ? 'pointer' : 'auto'
//       setColor(hovered ? 0xff0000 : 0xffffff)
//   },[hovered])

//   return (
//       <mesh
//           castShadow 
//           receiveShadow 
//           position={position}
//           onPointerOver={(e) => {
//               e.stopPropagation()
//               setHovered(true)
//           }}
//           onPointerOut={(e) => {
//               e.stopPropagation()
//               setHovered(false)
//           }}
//           onClick={() => {
//               clearTimeout(timeout)
//               clearTimeout(timeout2)
//               controls?.setLookAt(...moveTo, ...lookAt, true)
//           }}
//         >
//           <textGeometry args={[text, { font, size, depth }]} />
//           <meshStandardMaterial color={color} />
//       </mesh>
//   )
// }

const App = () => {

   return (
    <Canvas shadows camera={{ position: [-200, 175, 200]}} style={{ background: '#272727' }}>
      <CameraRotation />

      <Reflector
        mixStrength={.1} // Strength of the reflections
        resolution={1024} // Off-buffer resolution, lower=faster, higher=better quality
        args={[1000, 1000]} // PlaneBufferGeometry arguments
        rotation={[-Math.PI * 0.5, 0, 0]}
        mirror={.97} // Mirror environment, 0 = texture colors, 1 = pick up env colors
        minDepthThreshold={1}
        maxDepthThreshold={.5}
        depthScale={50}
        position={[0, -7, 0]}
        />

      <group>
        <Lights position={[44, 50, 80]}  intensity={2000} />
        <Lights position={[44, 50, -30]}  intensity={2000} />
        <Lights position={[-25, 50, -60]}  intensity={2000} />
        <Lights position={[-33.3, 10, -65]} rotateX={3.14} color={'orange'} intensity={2500} decay={1.8} />

        <Lights position={[65, 63, 120]}  intensity={2000} decay={1.5}/>
        <Lights position={[65, 63, -70]}  intensity={2000} decay={1.5}/>
        <Lights position={[53, 63, -83]}  intensity={2000} decay={1.5}/>
        <Lights position={[-90, 63, -83]} intensity={2000} decay={1.5}/>

        <Lights position={[-98.5, 80, 114]} color={0xffd21c}  intensity={3000}  decay={1.7}/>
        <Lights position={[-82.5, 80, 127]} color={0xffd21c}  intensity={3000}  decay={1.7}/>

        <directionalLight position={[90, 300, -120]} intensity={2} color={0x7f7f7f}/>
      </group>

      <LoadModel 
        url={url + 'updated_tavern'} 
        scale={[25, 25, 25]} 
        />
      <LoadModel 
        url={url + 'bounty_board_w_resume'} 
        scale={[10, 10, 10]} 
        rotation={[0, -1.575, 0]} 
        position={[52, -5, 150]} 
        canHover={true}
        />
      <LoadModel 
        url={url + 'lightpost'} 
        scale={[4.5, 4.5, 4.5]} 
        position={[-90, -5, 120]} 
        rotation={[0, 2.5, 0]}
        />
      <LoadModel 
        url={url + 'pile_of_books'} 
        scale={[.15, .15, .15]} 
        position={[48, 51.75, -14.4]} 
        rotation={[-1.6, -1.5, 0]} 
        canHover={true}
        />
      <LoadModel 
        url={url + 'second_pile_of_books'} 
        scale={[.15, .15, .15]} 
        position={[48, 51.75, -8]} 
        rotation={[-1.6, -1.5, 0]} 
        canHover={true}
        />
      <LoadModel 
        url={url + 'medieval_book_stack'} 
        scale={[.33, .33, .33]} 
        position={[22, 23.6, 70]} 
        rotation={[0, -2.5, 0]}/>
      
      <Text 
        url={url} 
        text='Résumé' 
        position={[-178, 59, -72]} 
        moveTo={[41, 16, 139]} 
        lookAt={[52, 16, 139]} 
        size={15} 
        depth={5}
        timeout={timeout}
        timeout2={timeout2}
        />
      <Text 
        url={url} 
        text='Skills' 
        position={[-183, 37, -72]} 
        moveTo={[44, 47, -15]} 
        lookAt={[48, 47, -15]}  
        size={15} 
        depth={5}/>
      <Text 
        url={url} 
        text='Experience' 
        position={[-183, 15, -72]} 
        moveTo={[]} 
        lookAt={[]} 
        size={15} 
        depth={5}
        />
      <Text 
        url={url} 
        text='About Me' 
        position={[-190, -7, -72]} 
        moveTo={[-4, 36.5, -64.5]} 
        lookAt={[-4, 36.5, -75.5]}  
        size={15} 
        depth={5}
      />

      <Flame url={url + 'animated_torch_flame1'} position={[-34, 7, -70]} scale={[13, 5, 10]}/>

      <Flame url={url + 'animated_torch_flame1'} position={[49, 53, 79]} scale={[4.5, 1.5, 4.5]}/>
      <Flame url={url + 'animated_torch_flame1'} position={[49, 53, -30]} scale={[4.5, 1.5, 4.5]}/>
      <Flame url={url + 'animated_torch_flame1'} position={[-26, 53, -66]} scale={[4.5, 1.5, 4.5]}/>

      <Flame url={url + 'animated_torch_flame1'} position={[65, 63, 120]} scale={[4.5, 1.5, 4.5]}/>
      <Flame url={url + 'animated_torch_flame1'} position={[65, 63, -70]} scale={[4.5, 1.5, 4.5]}/>
      <Flame url={url + 'animated_torch_flame1'} position={[53, 63, -83]} scale={[4.5, 1.5, 4.5]}/>
      <Flame url={url + 'animated_torch_flame1'} position={[-90, 63, -83]} scale={[4.5, 1.5, 4.5]}/>


    </Canvas>
  )
}

export default App
