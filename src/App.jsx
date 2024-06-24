import { Canvas} from '@react-three/fiber'
import { BakeShadows, MeshReflectorMaterial, Preload, meshBounds } from '@react-three/drei'
import { Suspense, useEffect, useState } from 'react'
import { Perf } from 'r3f-perf'
import Data from './data.json'
import './App.css'


import Lights from './components/Lights'
import Text1 from './components/Text'
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
import Clock from './components/Clock'
import BountyBoard from './components/BountyBoard'
import SkillBooks from './components/SkillBooks'

const App = () => {
  const { smallText, setPan, lookingAt, pan } = usePan()
  const [ assetsLoaded, setAssetsLoaded ] = useState(false)
  const [ shadows, setShadows ] = useState(true)
  let panTimeout

  useEffect(() => {
    clearTimeout(panTimeout)
    setPan(!assetsLoaded || false)
    
    if (lookingAt == 'none' && !pan) {
      panTimeout = setTimeout(() => setPan(true), 5000)
    }

    return () => clearTimeout(panTimeout)
  }, [lookingAt])
  
  function handleAssetsLoaded() {
    setAssetsLoaded(true)
  }


   return (
    <>
      {assetsLoaded &&  <Clock /> }

      <Canvas shadows dpr={1} camera={{ position: [-200, 175, 200]}} style={{ background: "#000000" }}>
        {/* <Perf position={'top-left'}  openByDefault/> */}
        <Suspense fallback={<InitialLoad />}>
        <BakeShadows />
          <Camera />


        {/* //! the refletor material jumps the triangles up about 100,000 */}
          <mesh receiveShadow rotation={[-Math.PI * 0.5, 0, 0]} position={[0, -7, 0]}>
              <planeGeometry args={[1000, 1000]} />
              <meshStandardMaterial color='black' />
              {/* <MeshReflectorMaterial
                mixStrength={.1} // Strength of the reflections
                resolution={256} // Off-buffer resolution, lower=faster, higher=better quality
                args={[1000, 1000]} // PlaneBufferGeometry arguments
                rotation={[-Math.PI * 0.5, 0, 0]}
                mirror={0.97} // Mirror environment, 0 = texture colors, 1 = pick up env colors
                position={[0, -7, 0]}
              /> */}
          </mesh>

          <group>
            <Lights  position={[44, 50, 80]}  intensity={2000} />
            <Lights  position={[44, 50, -30]}  intensity={2000} />
            <Lights  position={[-25, 50, -60]}  intensity={2000} />
            <Lights shadow position={[-33.3, 10, -65]} rotateX={3.14} color='orange' intensity={2500} decay={1.7} />

            <Lights shadow position={[70, 60, 120]}  intensity={2000} decay={1.5}/>
            <Lights position={[65, 63, -70]}  intensity={2000} decay={1.5}/>
            <Lights position={[53, 63, -83]}  intensity={2000} decay={1.5}/>
            <Lights shadow position={[-90, 63, -83]} intensity={2000} decay={1.5}/>

            <Lights shadow position={[-82.5, 80, 127]} color={0xffd21c}  intensity={3500}  decay={1.8}/>

            <directionalLight position={[90, 300, -120]} intensity={2} color={0x7f7f7f}/>
          </group>

          {/* <ambientLight intensity={1.5}/> */}

          <LoadImage
            file='images/ainsworth_corbin_resume.png'
            position={[50.4, 15.75, 140.9]}
            scale={[.113, .14, .1]}
            rotation={[.075, -1.575, 0]}
          />

          <LoadImage
            file="images/about_me.png"
            position={[-3.91, 36.5, -69.95]}
            scale={[.0475, .085, .1]}
            />
            {/* //! Using regular Text instead of Text 3D drops drawcalls by 80 and reduces triangles by 
            //! 40,000 
            */}
          <group>
            <Text1 
              text='Résumé' 
              position={[-178, 59, -72]}
              moveTo={[41, 16, 139]}
              lookAt={[52, 16, 139]}
              size={15}
              lookingAt="bounty"
              />
            <Text1 
              text='Skills' 
              position={[-183, 37, -72]}
              moveTo={[44, 47, -15]}
              lookAt={[48, 47, -15]}
              size={15}
              lookingAt="skills"
              />
            <Text1 
              text='Experience'
              position={[-183, 15, -72]}
              moveTo={[-11, 38.95, -64.5]}
              lookAt={[-11, 38.95, -75.5]}
              size={15}
              enableButtons
              lookingAt="experience"
              />
            <Text1 
              text='About Me' 
              position={[-190, -7, -72]}
              moveTo={[-4, 36.5, -64.5]}
              lookAt={[-4, 36.5, -75.5]}
              size={15}
              enableButtons
              lookingAt="about"
            />
            <Text1
              text='Project1'
              position={[-260, 15, -72]}
              // moveTo={[95, 28, -0.5]}
              moveTo={[92, 27, -0.5]}
              lookAt={[85.2, 26, -0.75]}
              size={15}
              lookingAt="arcadeMachine1"
            />
            <Text1
              text='Project2'
              position={[-265, -7, -72]}
              // moveTo={[95, 28, 50]}
              moveTo={[92, 27, 49.75]}
              lookAt={[85, 26, 49.5]}
              size={15}
              lookingAt="arcadeMachine2"
            />
          </group>

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
            moveTo={[-11, 38.95, -64.5]}
            lookAt={[-11, 38.95, -75.5]}
            hoverColor='#ff0000'
            newLookingAt='experience'
          />
          <SmallText
            text='Back'
            position={[-2.5, 33, -69.94]}
            moveTo={[-200, 175, 200]}
            lookAt={[0, 0, 0]}
            hoverColor='#ff0000'
          />


          <SmallText
            text='About Me'
            position={[-11.5, 35.5, -69.94]}
            moveTo={[-4, 36.5, -64.5]}
            lookAt={[-4, 36.5, -75.5]}
            hoverColor='#ff0000'
            newLookingAt='about'
            />
          <SmallText
            text='Back'
            position={[-9, 35.5, -69.94]}
            moveTo={[-200, 175, 200]}
            lookAt={[0, 0, 0]}
            hoverColor='#ff0000'
          />
          </>
          }

          <ProjectSign {...Data.projectSign}/>
          <SkillBooks {...Data.skillBooks}/>
          <BountyBoard {...Data.bountyBoard}/>
          <ArcadeMachine {...Data.arcadeMachine1}/>
          <ArcadeMachine {...Data.arcadeMachine2}/>
          <MedievalBookStack {...Data.medievalBookStack} />
          <LightPost {...Data.lightPost}/>

          <Tavern {...Data.tavern} raycast={meshBounds} afterRender={handleAssetsLoaded} onPointerOver={e => e.stopPropagation()}/>
        </Suspense>
      </Canvas>    
    </>
  )
}

export default App
