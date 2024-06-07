import { Canvas, useThree } from '@react-three/fiber'
import React, { useEffect, useRef } from 'react'
import './App.css'

import LoadModel from './components/LoadModel'
import Lights from './components/Lights'
import Flame from './components/Flame/Flame'

const url = 'https://glb-bucket-portfolio.s3-accelerate.amazonaws.com/'

// const CameraSetup = () => {
//   const { camera } = useThree()

//   useEffect(() => {
//     // Set camera default position
//     camera.position.set(-200, 175, 200)

//     // Set the camera default lookAt point
//     camera.lookAt(0, 0, 0)
// }, [camera])

//   return null
// }

const App = () => {
  return (
    <Canvas shadows camera={{ position: [-200, 175, 200]}} style={{ background: '#272727' }}>
      {/* <CameraSetup /> */}

      <group>
        <Lights position={[44, 50, 80]}  intensity={2000} />
        <Lights position={[44, 50, -30]}  intensity={2000} />
        <Lights position={[-25, 50, -60]}  intensity={2000} />
        <Lights position={[-33.3, 10, -65]} rotateX={3.14} color={'orange'} intensity={2500} decay={1.8} />

        <Lights position={[65, 63, 120]}  intensity={2000} decay={1.5}/>
        <Lights position={[65, 63, -70]}  intensity={2000} decay={1.5}/>
        <Lights position={[53, 63, -83]}  intensity={2000} decay={1.5}/>
        <Lights position={[-90, 63, -83]} intensity={2000} decay={1.5}/>

      </group>
      <group >
        <Lights position={[-98.5, 80, 114]} color={0xffd21c}  intensity={3000}  decay={1.7}/>
        <Lights position={[-82.5, 80, 127]} color={0xffd21c}  intensity={3000}  decay={1.7}/>
      </group>

      <LoadModel url={url + 'updated_tavern'} scale={[25, 25, 25]}/>
      <Flame url={url + 'animated_flame1'} />
    </Canvas>
  )
}

export default App
