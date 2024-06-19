import { Canvas} from '@react-three/fiber'
import { BakeShadows, MeshReflectorMaterial, useCursor } from '@react-three/drei'
import { Suspense, useState } from 'react'
import { Perf } from 'r3f-perf'
import './App.css'


import LoadModel from './components/LoadModel'
import Lights from './components/Lights'
import Text from './components/Text'
import SmallText from './components/SmallText'
import LoadImage from './components/LoadImage'
import Camera from './components/Camera'
import InitialLoad from './components/InitialLoad'
import { usePan } from './main'


import Flame from './components/Flame'
import Sconce from './components/Sconce'
import ArcadeMachine from './components/ArcadeMachine'
import Tavern from './components/Tavern'
import LightPost from './components/Lightpost'
import MedievalBookStack from './components/MedievalBookStack'
import ProjectSign from './components/ProjectSign'

// function Test() {
//   //!-------------------- Test --------------------
  
//   // const { scene: highDetail } = useGLTF('/models/high-res/bounty_board.glb')
//   // const { scene: lowDetail } = useGLTF('/models/low-res/bounty_board.glb')
//   const ref = useRef();
//   const { camera } = useThree();
  
//   // useFrame(() => {
//   //   if (ref.current) {
//   //     const distance = camera.position.distanceTo(ref.current.position);
//   //     console.log('Distance:', distance)
//   //   }
//   // })
//   //!-------------------- End Test --------------------
//   return (
//     <Detailed distances={[0, 80]} position={[52, -5, 150]} rotation={[0, -Math.PI / 2, 0]} scale={[10, 10, 10]} ref={ref}>
//     <LoadModel 
//       file={'high-res/bounty_board.glb'} 
//       // scale={[10, 10, 10]} 
//       // rotation={[0, -1.575, 0]} 
//       // position={[52, -5, 150]} 
//       canHover
//       lookAt={[52, 16, 139]}
//       moveTo={[41, 16, 139]}
//       shadow
//       />
//     <LoadModel 
//       file={'low-res/bounty_board.glb'} 
//       // scale={[10, 10, 10]} 
//       // rotation={[0, -1.575, 0]} 
//       // position={[52, -5, 150]} 
//       canHover
//       lookAt={[52, 16, 139]}
//       moveTo={[41, 16, 139]}
//       shadow
//       />
//   </Detailed>
//   )
// }

const App = () => {
  const { smallText } = usePan()
  const [hovered, setHovered] = useState(false);

  useCursor(hovered, 'pointer', 'default')
  
   return (
    <>
      <Canvas shadows dpr={1} camera={{ position: [-200, 175, 200]}} style={{ background: "#000000" }}>
        {/* <Perf position={'top-left'} /> */}
        <Suspense fallback={<InitialLoad />}>
          {/* <fog attach="fog" args={[0x000000, 100, 1500]} /> */}
          <Camera />

          <mesh receiveShadow rotation={[-Math.PI * 0.5, 0, 0]} position={[0, -7, 0]}>
              <planeGeometry args={[1000, 1000]} />
              <MeshReflectorMaterial
                mixStrength={.1} // Strength of the reflections
                resolution={512} // Off-buffer resolution, lower=faster, higher=better quality
                args={[1000, 1000]} // PlaneBufferGeometry arguments
                rotation={[-Math.PI * 0.5, 0, 0]}
                mirror={.97} // Mirror environment, 0 = texture colors, 1 = pick up env colors
                minDepthThreshold={1}
                maxDepthThreshold={.5}
                depthScale={50}
                position={[0, -7, 0]}
              />
          </mesh>

          <group>
            <Lights shadow position={[44, 50, 80]}  intensity={2000} />
            <Lights shadow position={[44, 50, -30]}  intensity={2000} />
            <Lights shadow position={[-25, 50, -60]}  intensity={2000} />
            <Lights shadow position={[-33.3, 10, -65]} rotateX={3.14} color={'orange'} intensity={2500} decay={1.7} />

            <Lights shadow position={[70, 60, 120]}  intensity={2000} decay={1.5}/>
            <Lights position={[65, 63, -70]}  intensity={2000} decay={1.5}/>
            <Lights position={[53, 63, -83]}  intensity={2000} decay={1.5}/>
            <Lights shadow position={[-90, 63, -83]} intensity={2000} decay={1.5}/>

            <Lights shadow position={[-82.5, 80, 127]} color={0xffd21c}  intensity={3500}  decay={1.675}/>

            <directionalLight position={[90, 300, -120]} intensity={2} color={0x7f7f7f}/>
          </group>

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
            enableButtons
            />
          <Text 
            text='About Me' 
            position={[-190, -7, -72]}
            moveTo={[-4, 36.5, -64.5]}
            lookAt={[-4, 36.5, -75.5]}
            size={15}
            depth={5}
            setControls={false}
            enableButtons
          />
          <Text
            text='Project1'
            position={[-185, 0, -20]}
            rotation={[-1.575, 0, 0]}
            moveTo={[95, 28, -0.5]}
            lookAt={[85.2, 27, -0.75]}
            size={15}
            depth={1}
            setControls={false}
            displayProject={'project1'}
            sounds
          />
          <Text
            text='Project2'
            position={[-185, 0, 0]}
            rotation={[-1.575, 0, 0]}
            moveTo={[95, 28, 50]}
            lookAt={[85, 27, 49.5]}
            size={15}
            depth={1}
            displayProject={'project2'}
            setControls={false}
          />

          <Flame />

          <Sconce position={[75, 60, 105]} rotation={[0, Math.PI, 0]} scale={[5, 5, 5]}/>
          <Sconce position={[75, 60, -85]} rotation={[0, Math.PI, 0]} scale={[5, 5, 5]}/>
          <Sconce position={[40, 60, -92.75]} rotation={[0, -Math.PI / 2, 0]} scale={[5, 5, 5]}/>
          <Sconce position={[-105, 60, -92.75]} rotation={[0, -Math.PI / 2, 0]} scale={[5, 5, 5]}/>

          { smallText &&
            <>
            <SmallText
            text='Experience'
            position={[-5, 33, -69.94]}
            // position={[-6, 33, -69.94]}
            moveTo={[-11, 38.95, -64.5]}
            lookAt={[-11, 38.95, -75.5]}
            setControls
            hoverColor={'#ff0000'}
            switchProject
          />
          <SmallText
            text='Back'
            position={[-2.5, 33, -69.94]}
            moveTo={[-200, 175, 200]}
            lookAt={[0, 0, 0]}
            setControls
            hoverColor={'#ff0000'}
          />


          <SmallText
            text='About Me'
            position={[-11.5, 35.5, -69.94]}
            moveTo={[-4, 36.5, -64.5]}
            lookAt={[-4, 36.5, -75.5]}
            setControls
            hoverColor={'#ff0000'}
            switchProject
            />
          <SmallText
            text='Back'
            position={[-9, 35.5, -69.94]}
            moveTo={[-200, 175, 200]}
            lookAt={[0, 0, 0]}
            setControls
            hoverColor={'#ff0000'}
          />
          </>
          }

          <LoadModel 
            file={'skill_books.glb'} 
            scale={[.15, .15, .15]} 
            position={[48, 51.75, -8]} 
            rotation={[-1.6, -1.5, 0]} 
            canHover
            moveTo={[44, 47, -15]} 
            lookAt={[48, 47, -15]}  
          />

            <LoadModel 
              file={'bounty_board.glb'}
              scale={[10, 10, 10]}
              rotation={[0, -Math.PI / 2, 0]}
              position={[52, -5, 150]}
              canHover
              lookAt={[52, 16, 139]}
              moveTo={[41, 16, 139]}
            />

          <ProjectSign scale={[.25, .25, .25]} rotation={[0, Math.PI / 2, 0]} position={[75, 70, 22]} onPointerOver={(e) => {e.stopPropagation(); setHovered(true)}} onPointerOut={(e) => {e.stopPropagation(); setHovered(false)}}/>
          <ArcadeMachine position={[80, -8, 0]} scale={[25, 25, 25]} rotation={[0, Math.PI / 2, 0]} project={'https://project1.corbinainsworth.com'} name='project1'/>
          <ArcadeMachine position={[80, -8, 50]} scale={[25, 25, 25]} rotation={[0, Math.PI / 2, 0]} project={'https://project2.corbinainsworth.com'} name='project2'/>
          <MedievalBookStack position={[22, 23.6, 70]} scale={[.33, .33, .33]} rotation={[0, -2.5, 0]} />
          <LightPost position={[-90, -5, 120]} scale={[4.5, 4.5, 4.5]} rotation={[0, 2.5, 0]}/>

          <Tavern scale={[25, 25, 25]} onPointerOver={e => e.stopPropagation()}/>

          <BakeShadows />
        </Suspense>
      </Canvas>    
    </>
  )
}

export default App
