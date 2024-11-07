import { AdaptiveDpr, BakeShadows, MeshReflectorMaterial, Preload, meshBounds } from '@react-three/drei'
import { Suspense, useEffect, useState } from 'react'
import { Canvas} from '@react-three/fiber'
import { useAppContext } from './context'
// import { Perf } from 'r3f-perf'
import Data from './data.json'
import './App.css'

import InitialLoad from './tsx_components/InitialLoad'
import StartButton from './tsx_components/StartScreen'
import LoadImage from './tsx_components/LoadImage'
import Lights from './tsx_components/Lights'
import NavText from './tsx_components/Text'
import Camera from './tsx_components/Camera'
import Clock from './tsx_components/Clock'

import ArcadeMachine from './tsx_components/ArcadeMachine'
import BountyBoard from './tsx_components/BountyBoard'
import SkillBooks from './tsx_components/SkillBooks'
import Contact from './tsx_components/ContactMe'
import Tavern from './tsx_components/Tavern'
import Flame from './tsx_components/Flame'
import Swarm from './tsx_components/Swarm'

const App = () => {
  const context = useAppContext();
  const [ assetsLoaded, setAssetsLoaded ] = useState(false)
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  let panTimeout

  useEffect(() => {
    clearTimeout(panTimeout)
    context.setPan(false)
    
    if (context.lookingAt == 'none' && !context.pan) {
      panTimeout = setTimeout(() => {
        context.setPan(true)
      }, 5000)
    }

    return () => clearTimeout(panTimeout)
  }, [context.lookingAt])

    return (
    <>
      {assetsLoaded && <Clock /> }
      {context.displayStart && <StartButton onStart={() => setAssetsLoaded(true)}/> }
      <Canvas id='canvas' shadows camera={{ position: [87.7, 26, 59.75], fov: isMobile ? 120 : 75}} style={{ background: "#000000" }}>
        {/* <Perf openByDefault /> */}
        <Suspense fallback={<InitialLoad />}> // this fall back is why the start button shows a second time after loading
          <fog attach="fog" args={['#000000', 400, 750]}/>
          <AdaptiveDpr pixelated />
          <Preload all />
          <Camera />
          <BakeShadows />
          <group>
            <Swarm count={425} opacity={0.75} color='Gray'/>
            <Swarm count={100} opacity={0.45} color='maroon'/>
            <Swarm count={225} opacity={0.66} color='orange'/>
          </group>
          <mesh receiveShadow rotation={[-Math.PI * 0.5, 0, 0]} position={[0, -7, 0]}>
              <planeGeometry args={[1000, 1000]} />
              {isMobile ?
              <meshLambertMaterial receiveShadow color='grey' />
              :
              <MeshReflectorMaterial
                mixStrength={.1}
                resolution={256}
                args={[1000, 1000]}
                mirror={0.97}
                position={[0, -7, 0]}
                />
              }
          </mesh>
          <group>
            <Lights shadow position={[70, 60, 120]} intensity={2000} decay={1.5}/>
            <Lights shadow position={[-90, 63, -83]} intensity={2000} decay={1.5}/>
            <directionalLight position={[90, 300, -120]} intensity={2} color={0x7f7f7f}/>
            <ambientLight />
          </group>
          <LoadImage {...Data.images.resume}/>
          <LoadImage {...Data.images.aboutMe}/>
          <group>
              <NavText {...Data.menuText.resume}/>
              <NavText {...Data.menuText.skills}/>
              {/* <NavText {...Data.menuText.experience}/> */}
              <NavText {...Data.menuText.aboutMe}/>
              <NavText {...Data.menuText.projects}/>
              <NavText {...Data.menuText.contact}/>
          </group>
          <Flame />
          {context.lookingAt == 'about' &&
          <>
            {/* <NavText {...Data.smallText.experience.backText}/> */}
            {/* <NavText {...Data.smallText.aboutMe}/> */}
            {/* <NavText {...Data.smallText.experience}/> */}
            <NavText {...Data.smallText.aboutBackText}/>
          </>
          }
          <group>
            <ArcadeMachine {...Data.arcadeMachine1}/>
            <ArcadeMachine {...Data.arcadeMachine2}/>
            <ArcadeMachine {...Data.arcadeMachine3}/>
          </group>
          <Contact {...Data.contact} onPointerOver={e => e.stopPropagation()} onClick={e => e.stopPropagation()}/>
          <BountyBoard {...Data.bountyBoard}/>
          <SkillBooks {...Data.skillBooks}/>
          <Tavern {...Data.tavern} raycast={meshBounds} onPointerOver={e => e.stopPropagation()} onClick={e => e.stopPropagation()}/>
        </Suspense>
      </Canvas>
    </>
  )
}

export default App
