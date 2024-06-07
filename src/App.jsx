import { Canvas, useThree } from '@react-three/fiber'
import React, { useEffect, useRef } from 'react'
import { OrbitControls } from '@react-three/drei'
import './App.css'

import LoadModel from './components/LoadModel'
import Lights from './components/Lights'
import Flame from './components/Flame/Flame'

const url = 'https://glb-bucket-portfolio.s3-accelerate.amazonaws.com/'


const App = () => {
  return (
    <Canvas shadows camera={{ position: [-200, 175, 200]}} style={{ background: '#272727' }}>
      <OrbitControls />

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
      {/* <group> */}
        <Flame url={url + 'animated_torch_flame1'} position={[-34, 7, -70]} scale={[13, 5, 10]}/>

        <Flame url={url + 'animated_torch_flame1'} position={[49, 53, 79]} scale={[4.5, 1.5, 4.5]}/>
        <Flame url={url + 'animated_torch_flame1'} position={[49, 53, -30]} scale={[4.5, 1.5, 4.5]}/>
        <Flame url={url + 'animated_torch_flame1'} position={[-26, 53, -66]} scale={[4.5, 1.5, 4.5]}/>

        <Flame url={url + 'animated_torch_flame1'} position={[65, 63, 120]} scale={[4.5, 1.5, 4.5]}/>
        <Flame url={url + 'animated_torch_flame1'} position={[65, 63, -70]} scale={[4.5, 1.5, 4.5]}/>
        <Flame url={url + 'animated_torch_flame1'} position={[53, 63, -83]} scale={[4.5, 1.5, 4.5]}/>
        <Flame url={url + 'animated_torch_flame1'} position={[-90, 63, -83]} scale={[4.5, 1.5, 4.5]}/>

        <Flame url={url + 'animated_torch_flame1'} position={[-34, 7, -70]} scale={[10, 10, 10]}/>
      {/* </group> */}

    </Canvas>
  )
}

export default App
