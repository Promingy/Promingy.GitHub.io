import { AdaptiveDpr, BakeShadows, MeshReflectorMaterial, Preload, meshBounds } from '@react-three/drei'
import { Suspense, useEffect, useState } from 'react'
import { Canvas} from '@react-three/fiber'
import { useAppContext } from './context'
// import { Perf } from 'r3f-perf'
import Data from './data.json'
import './App.css'


import InitialLoad from './components/InitialLoad'
// import StartButton from './components/StartScreen'
import LoadImage from './components/LoadImage'
import NavText from './components/Text'
import Lights from './components/Lights'
import Camera from './components/Camera'
import Clock from './components/Clock'


// import ArcadeMachine from './components/ArcadeMachine'
import BountyBoard from './components/BountyBoard'
import SkillBooks from './components/SkillBooks'
import Contact from './components/ContactMe'
// import Tavern from './components/Tavern'
// import Flame from './components/Flame'
import Swarm from './components/Swarm'

import StartButton from './tsx_components/StartButton'

import Tavern from './tsx_components/Tavern'
import ArcadeMachine from './tsx_components/ArcadeMachine'
import Flame from './tsx_components/Flame'

const App = () => {
  const context = useAppContext();
  const [ assetsLoaded, setAssetsLoaded ] = useState(false)
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  let panTimeout

  useEffect(() => {
    clearTimeout(panTimeout)
    context.setPan(false)
    
    if (context.lookingAt == 'none' && !context.pan) {
      panTimeout = setTimeout(() => context.setPan(true), 5000)
    }

    return () => clearTimeout(panTimeout)
  }, [context.lookingAt])

   return (
    <>
      {assetsLoaded && <Clock /> }
      {context.displayStart && <StartButton afterRender={() => setAssetsLoaded(true)}/> }
      <Canvas shadows camera={{ position: [87.7, 26, 59.75], fov: isMobile ? 120 : 75}} style={{ background: "#000000" }}>
        {/* <Perf openByDefault /> */}
        <Suspense fallback={<InitialLoad />}>
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
