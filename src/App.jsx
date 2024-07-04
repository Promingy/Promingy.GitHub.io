import { AdaptiveDpr, BakeShadows, MeshReflectorMaterial, meshBounds } from '@react-three/drei'
import { Suspense, useEffect, useState } from 'react'
import { Canvas} from '@react-three/fiber'
import { useAppContext } from './context'
import { Perf } from 'r3f-perf'
import Data from './data.json'
import './App.css'


import Lights from './components/Lights'
import MenuText from './components/Text'
import SmallText from './components/SmallText'
import LoadImage from './components/LoadImage'
import Camera from './components/Camera'
import InitialLoad from './components/InitialLoad'


import Flame from './components/Flame'
import ArcadeMachine from './components/ArcadeMachine'
import Tavern from './components/Tavern'
import Clock from './components/Clock'
import BountyBoard from './components/BountyBoard'
import SkillBooks from './components/SkillBooks'
import Contact from './components/ContactMe'
import StartButton from './components/StartScreen'
import Swarm from './components/Swarm'

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
        <fog attach="fog" args={['#000000', 400, 750]}/>
        <Suspense fallback={<InitialLoad />}>
          <Camera />
          <BakeShadows />
          <group> {/* 3000 / 6000 triangles */}
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
            <MenuText {...Data.menuText.resume}/>
            <MenuText {...Data.menuText.skills}/>
            <MenuText {...Data.menuText.experience}/>
            <MenuText {...Data.menuText.aboutMe}/>
            <MenuText {...Data.menuText.projects}/>
          </group>
          <Flame /> {/* 1500 / 3000 triangles */}
          {context.smallText &&
          <>
            <SmallText {...Data.smallText.experience}/>
            <SmallText {...Data.smallText.experience.backText}/>
            <SmallText {...Data.smallText.aboutMe}/>
            <SmallText {...Data.smallText.aboutMe.backText}/>
          </>
          }
          <group> {/* 6000 / 12000 triangles - 2000/each */}
            <ArcadeMachine {...Data.arcadeMachine1}/>
            <ArcadeMachine {...Data.arcadeMachine2}/>
            <ArcadeMachine {...Data.arcadeMachine3}/>
          </group>
          <Contact {...Data.contact} />
          <BountyBoard {...Data.bountyBoard}/> {/* 2000 / 4000 triangles */}
          <SkillBooks {...Data.skillBooks}/> {/* 2000 / 4000 triangles */}
          <Tavern {...Data.tavern} raycast={meshBounds} onPointerOver={e => e.stopPropagation()} onClick={e => e.stopPropagation()}/> {/* 38000 / 76000 triangles */}
        </Suspense>
        <AdaptiveDpr pixelated />
      </Canvas>
    </>
  )
}

export default App
