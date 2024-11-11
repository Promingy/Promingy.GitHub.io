import React, { Suspense, useEffect, useState } from 'react';
import { AdaptiveDpr, BakeShadows, MeshReflectorMaterial, Preload, meshBounds } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useAppContext } from './context';
import { Vector3, Euler } from 'three';
// import { Perf } from 'r3f-perf';
import Data from './data.json';
import './App.css';

import InitialLoad from './tsx_components/InitialLoad';
import StartButton from './tsx_components/StartScreen';
import LoadImage from './tsx_components/LoadImage';
import Lights from './tsx_components/Lights';
import NavText from './tsx_components/Text';
import Camera from './tsx_components/Camera';
import Clock from './tsx_components/Clock';

import ArcadeMachine from './tsx_components/ArcadeMachine';
import BountyBoard from './tsx_components/BountyBoard';
import SkillBooks from './tsx_components/SkillBooks';
import Contact from './tsx_components/ContactMe';
import Tavern from './tsx_components/Tavern';
import Flame from './tsx_components/Flame';
import Swarm from './tsx_components/Swarm';

function transformData(data: any) {
  return {
    ...data,
    position: new Vector3(...data.position || []),
    rotation: new Euler(...data.rotation || []),
    scale: new Vector3(...data.scale || []),
  }
}

const App: React.FC = () => {
  const context = useAppContext();
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  let panTimeout: ReturnType<typeof setTimeout>;
  const loadingImage = context.defaultImage ? Data.arcadeMachine3.image : Data.images.loadingImage;
  console.log(loadingImage)

  useEffect(() => {
    clearTimeout(panTimeout);
    context.setPan(false);

    if (context.lookingAt === 'none' && !context.pan) {
      panTimeout = setTimeout(() => {
        context.setPan(true);
      }, 5000);
    }

    return () => clearTimeout(panTimeout);
  }, [context.lookingAt]);


  return (
    <>
      {assetsLoaded && <Clock />}
      {context.displayStart && <StartButton onStart={() => setAssetsLoaded(true)} />}
      <Canvas
        onPointerMove={undefined}
        id="canvas"
        shadows
        camera={{ position: [87.7, 26, 59.75], fov: isMobile ? 120 : 75 }}
        style={{ background: '#000000' }}
        >
        {/* <Perf openByDefault /> */}
        <Suspense fallback={<InitialLoad />}>
          <fog attach="fog" args={['#000000', 400, 750]} />
          <AdaptiveDpr pixelated />
          <Preload all />
          <Camera />
          <BakeShadows />

          {/* Swarm groups */}
          <group>
            <Swarm count={425} opacity={0.75} color="Gray" />
            <Swarm count={100} opacity={0.45} color="maroon" />
            <Swarm count={225} opacity={0.66} color="darkorange" />
          </group>

          {/* Ground Plane */}
          <mesh receiveShadow rotation={[-Math.PI * 0.5, 0, 0]} position={[0, -7, 0]}>
            <planeGeometry args={[1000, 1000]} />
            {isMobile ? (
              <meshLambertMaterial color="grey" />
            ) : (
              <MeshReflectorMaterial
                mixStrength={0.1}
                resolution={256}
                mirror={0.97}
              />
            )}
          </mesh>

          {/* Light Setup */}
          <group>
            <Lights shadow position={new Vector3(70, 60, 120)} intensity={2000} decay={1.5} />
            <Lights shadow position={new Vector3(-90, 63, -83)} intensity={2000} decay={1.5} />
            <directionalLight position={[90, 300, -120]} intensity={2} color={0x7f7f7f} />
            <ambientLight />
          </group>

          {/* Loading images */}
          <LoadImage {...transformData(Data.images.resume)} />
          <LoadImage {...transformData(Data.images.aboutMe)} />

          {/* Navigation Text */}
          <group>
            <NavText {...transformData(Data.menuText.resume)} />
            <NavText {...transformData(Data.menuText.skills)} />
            {/* <NavText {...Data.menuText.experience} /> */}
            <NavText {...transformData(Data.menuText.aboutMe)} />
            <NavText {...transformData(Data.menuText.projects)} />
            <NavText {...transformData(Data.menuText.contact)} />
          </group>

          {/* Flame Effect */}
          <Flame />

          {/* Additional Navigation Text when looking at 'about' */}
          {context.lookingAt === 'about' && (
            <>
              {/* <NavText {...Data.smallText.experience.backText} /> */}
              {/* <NavText {...Data.smallText.aboutMe} /> */}
              {/* <NavText {...Data.smallText.experience} /> */}
              <NavText {...transformData(Data.smallText.aboutBackText)} />
            </>
          )}

          {/* Arcade Machines */}
          <group>
            <ArcadeMachine {...transformData(Data.arcadeMachine1)} />
            <ArcadeMachine {...transformData(Data.arcadeMachine2)} />
            <ArcadeMachine {...transformData(Data.arcadeMachine3)} image={loadingImage} />
          </group>

          {/* Contact, Bounty Board, Skill Books, and Tavern Components */}
          <Contact {...transformData(Data.contact)} onPointerOver={(e) => e.stopPropagation()} onClick={(e) => e.stopPropagation()} />
          <BountyBoard {...transformData(Data.bountyBoard)} />
          <SkillBooks {...transformData(Data.skillBooks)} />
          <Tavern
            {...transformData(Data.tavern)}
            raycast={meshBounds}
            onPointerOver={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
          />
        </Suspense>
      </Canvas>
    </>
  );
};

export default App;
