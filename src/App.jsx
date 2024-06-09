import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { CameraControls, Reflector } from '@react-three/drei'
import {useEffect, useRef } from 'react'
import { usePan } from './main'
import './App.css'


import LoadModel from './components/LoadModel'
import Lights from './components/Lights'
import Flame from './components/Flame/Flame'
import Text from './components/Text/Text'
import LoadImage from './components/LoadImage'
import LoadProject from './components/LoadProject'
import { AmbientLight } from 'three'


const url = 'https://glb-bucket-portfolio.s3-accelerate.amazonaws.com/'
let timeout, timeout2;

export function clearTimeouts() {
  clearTimeout(timeout)
  clearTimeout(timeout2)
}

export function CameraRotation () {
  const cameraRef = useRef();
  const { controls } = useThree();
  const { pan, setPan } = usePan()

  useEffect(() => {
    function onDragStart() {
      setPan(false)
      clearTimeout(timeout)
      clearTimeout(timeout2)
    }

    function onDragEnd() {
      timeout = setTimeout(() => {
        controls.setLookAt(-200, 175, 200, 0, 0, 0, true)
      }, 10000)
    
      timeout2 = setTimeout(() => {
        setPan(true)
      }
      , 15000)
    }

    if (controls) {
      controls.addEventListener('controlstart', onDragStart)
      controls.addEventListener('controlend', onDragEnd)
    }

    return () => {
      if (controls) {
        controls.removeEventListener('controlstart', onDragStart)
        controls.removeEventListener('controlend', onDragEnd)
      }
    }
    
  }, [controls])


  useFrame(() => { 
    if(cameraRef.current && pan){
      const rotationSpeed = 0.001
  
      cameraRef.current.rotate(rotationSpeed, 0)
    }
  }, [cameraRef])

  
   return <CameraControls 
      maxDistance={700}
      minDistance={220}
      maxPolarAngle={Math.PI / 2}
      truckSpeed={0}
      smoothTime={1}
      ref={cameraRef}
      makeDefault
    />
}

const App = () => {
  const tavernRef = useRef();
  const arcadeRef = useRef();

   return (
    <Canvas shadows camera={{ position: [-200, 175, 200]}} style={{ background: "#000000" }}>
      <fog attach="fog" args={[0x000000, 100, 1500]} />
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
        file={'updated_tavern.glb'} 
        scale={[25, 25, 25]} 
        refToUse={tavernRef}
        />
      <LoadModel 
        file={'bounty_board_w_resume.glb'} 
        scale={[10, 10, 10]} 
        rotation={[0, -1.575, 0]} 
        position={[52, -5, 150]} 
        canHover={true}
        lookAt={[52, 16, 139]}
        moveTo={[41, 16, 139]}
        />
      <LoadModel 
        file={'lightpost.glb'} 
        scale={[4.5, 4.5, 4.5]} 
        position={[-90, -5, 120]} 
        rotation={[0, 2.5, 0]}
        />
      <LoadModel 
        file={'updated_pile_of_books.glb'} 
        scale={[.15, .15, .15]} 
        position={[48, 51.75, -8]} 
        rotation={[-1.6, -1.5, 0]} 
        canHover={true}
        moveTo={[44, 47, -15]} 
        lookAt={[48, 47, -15]}  
        />
      <LoadModel 
        file={'medieval_book_stack.glb'} 
        scale={[.33, .33, .33]} 
        position={[22, 23.6, 70]} 
        rotation={[0, -2.5, 0]}
      />

      <LoadModel
        file={'arcade_machine.glb'}
        scale={[25, 25, 25]}
        position={[80, -8, 0]}
        rotation={[0, 1.575, 0]}
        refToUse={arcadeRef}
      />

      <LoadImage
        file={'ainsworth_corbin_resume.png'}
        position={[50.4, 15.75, 140.9]}
        scale={[.113, .14, .1]}
        rotation={[.075, -1.575, 0]}
      />

      <LoadImage
        file={"about_me.png"}
        position={[-3.91, 36.5, -69.95]}
        scale={[.0475, .085, .1]}
      />

      <Text 
        text='Résumé' 
        position={[-178, 59, -72]}
        moveTo={[41, 16, 139]}
        lookAt={[52, 16, 139]}
        size={15}
        depth={5}
        setControls={false}
        />
      <Text 
        text='Skills' 
        position={[-183, 37, -72]}
        moveTo={[44, 47, -15]}
        lookAt={[48, 47, -15]}
        size={15}
        depth={5}
        setControls={false}
        />
      <Text 
        text='Experience'
        position={[-183, 15, -72]}
        moveTo={[-11, 38.95, -64.5]}
        lookAt={[-11, 38.95, -75.5]}
        size={15}
        depth={5}
        setControls={false}
        />
      <Text 
        text='About Me' 
        position={[-190, -7, -72]}
        moveTo={[-4, 36.5, -64.5]}
        lookAt={[-4, 36.5, -75.5]}
        size={15}
        depth={5}
        setControls={false}
      />
      <Text
        text='Back'
        position={[-2.5, 32.5, -69.94]}
        moveTo={[-200, 175, 200]}
        lookAt={[0, 0, 0]}
        size={.25}
        depth={0}
        setControls={true}
        hoverColor={0x00ff00}
      />
      <Text
        text='Experience'
        position={[-6, 32.5, -69.94]}
        moveTo={[-11, 38.95, -64.5]}
        lookAt={[-11, 38.95, -75.5]}
        size={.25}
        depth={0}
        setControls={true}
        hoverColor={0x00ff00}
      />
      <Text
        text='About Me'
        position={[-12.5, 35.125, -69.94]}
        moveTo={[-4, 36.5, -64.5]}
        lookAt={[-4, 36.5, -75.5]}
        size={.25}
        depth={0}
        setControls={true}
        hoverColor={0x00ff00}
        />
      <Text
        text='Back'
        position={[-9, 35.125, -69.94]}
        moveTo={[-200, 175, 200]}
        lookAt={[0, 0, 0]}
        size={.25}
        depth={0}
        setControls={true}
        hoverColor={0x00ff00}
      />

      <Flame file={'animated_torch_flame1'} position={[-34, 7, -70]} scale={[13, 5, 10]}/>

      <Flame file={'animated_torch_flame1'} position={[49, 53, 79]} scale={[4.5, 1.5, 4.5]}/>
      <Flame file={'animated_torch_flame1'} position={[49, 53, -30]} scale={[4.5, 1.5, 4.5]}/>
      <Flame file={'animated_torch_flame1'} position={[-26, 53, -66]} scale={[4.5, 1.5, 4.5]}/>

      <Flame file={'animated_torch_flame1'} position={[65, 63, 120]} scale={[4.5, 1.5, 4.5]}/>
      <Flame file={'animated_torch_flame1'} position={[65, 63, -70]} scale={[4.5, 1.5, 4.5]}/>
      <Flame file={'animated_torch_flame1'} position={[53, 63, -83]} scale={[4.5, 1.5, 4.5]}/>
      <Flame file={'animated_torch_flame1'} position={[-90, 63, -83]} scale={[4.5, 1.5, 4.5]}/>

      <LoadProject
        url={'https://project1.corbinainsworth.com'}
        rotation={[0, 1.575, 0]}
        position={[80, 0, 0]}
        scale={[.5, 1, 1]}
        occludeRef={[arcadeRef]}
      />

      {/* <ambientLight /> */}


    </Canvas>
  )
}

export default App
