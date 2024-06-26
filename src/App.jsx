import { Canvas} from '@react-three/fiber'
import { AdaptiveDpr, BakeShadows, MeshReflectorMaterial, meshBounds } from '@react-three/drei'
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
import StartButton from './components/StartScreen'

const App = () => {
  const { smallText, setPan, lookingAt, pan, displayStart } = usePan()
  const [ assetsLoaded, setAssetsLoaded ] = useState(false)
  let panTimeout

  useEffect(() => {
    clearTimeout(panTimeout)
    setPan(false)
    
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
      {assetsLoaded && <Clock /> }
      {displayStart && <StartButton afterRender={handleAssetsLoaded}/> }

      <Canvas camera={{ position: [87.7, 26, 49.75]}} style={{ background: "#000000" }}>
        <Suspense fallback={<InitialLoad />}>
          <Camera />
          <BakeShadows />

        {/* //! the refletor material jumps the triangles up about 100,000 */}

          <mesh receiveShadow rotation={[-Math.PI * 0.5, 0, 0]} position={[0, -7, 0]}>
              <planeGeometry args={[1000, 1000]} />
              {/* <meshLambertMaterial receiveShadow color='grey' /> */}
              <MeshReflectorMaterial
                mixStrength={.1} // Strength of the reflections
                resolution={256} // Off-buffer resolution, lower=faster, higher=better quality
                args={[1000, 1000]} // PlaneBufferGeometry arguments
                mirror={0.97} // Mirror environment, 0 = texture colors, 1 = pick up env colors
                position={[0, -7, 0]}
                />
          </mesh>

          <group>
            <Lights  position={[44, 50, 80]} intensity={2000} />
            <Lights  position={[44, 50, -30]} intensity={2000} />
            <Lights  position={[-25, 50, -60]} intensity={2000} />
            <Lights position={[-33.3, 10, -65]} rotateX={3.14} color='orange' intensity={2500} decay={1.7} />

            <Lights shadow position={[70, 60, 120]} intensity={2000} decay={1.5}/>
            <Lights position={[65, 63, -70]} intensity={2000} decay={1.5}/>
            <Lights position={[53, 63, -83]} intensity={2000} decay={1.5}/>
            <Lights shadow position={[-90, 63, -83]} intensity={2000} decay={1.5}/>

            <Lights shadow position={[-82.5, 80, 127]} color={0xffd21c}  intensity={3500}  decay={1.8}/>

            <directionalLight position={[90, 300, -120]} intensity={2} color={0x7f7f7f}/>
          </group>

          <LoadImage {...Data.images.resume}/>
          <LoadImage {...Data.images.aboutMe}/>

            {/* //! Using regular Text instead of Text 3D drops drawcalls by 80 and reduces triangles by 
            //! 40,000 
            */}
          <group>
            <Text1 {...Data.menuText.resume}/>
            <Text1 {...Data.menuText.skills}/>
            <Text1 {...Data.menuText.experience}/>
            <Text1 {...Data.menuText.aboutMe}/>
            <Text1 {...Data.menuText.project1}/>
            <Text1 {...Data.menuText.project2}/>
          </group>

          <Flame />

          <Sconce {...Data.sconces.backLeft}/>
          <Sconce {...Data.sconces.backRight}/>
          <Sconce {...Data.sconces.leftBack}/>
          <Sconce {...Data.sconces.leftFront}/>

          { smallText &&
            <>
            <SmallText {...Data.smallText.experience}/>
            <SmallText {...Data.smallText.experience.backText}/>


            <SmallText {...Data.smallText.aboutMe}/>
            <SmallText {...Data.smallText.aboutMe.backText}/>
          </>
          }

          <ProjectSign {...Data.projectSign}/>
          <SkillBooks {...Data.skillBooks}/>
          <BountyBoard {...Data.bountyBoard}/>
          <ArcadeMachine {...Data.arcadeMachine1}/>
          <ArcadeMachine {...Data.arcadeMachine2}/>
          <MedievalBookStack {...Data.medievalBookStack} />
          <LightPost {...Data.lightPost}/>

          <Tavern {...Data.tavern} raycast={meshBounds} onPointerOver={e => e.stopPropagation()}/>
        </Suspense>
        <AdaptiveDpr pixelated />
      </Canvas>
    </>
  )
}

export default App
