import { Cloud, Clouds, Float, useGLTF } from '@react-three/drei';
import LoadProject from '../components/LoadProject';
import NavText from '../components/Text';
import LoadImage from '../components/LoadImage';
import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context';
import Data from '../data.json';
import { useThree, useFrame } from '@react-three/fiber';
import { Mesh, MeshBasicMaterial } from 'three';

interface Props {
  name: string;
}

const ArcadeMachine: React.FC<Props> = (props) => {
  const { nodes, materials } = useGLTF('models/arcade_machine.glb');
  const [staticImage, setStaticImage] = useState(Data.images.loadingImage);
  const [isHovered, setIsHovered] = useState(false);
  const [cloudOpacity, setCloudOpacity] = useState(0);
  const { controls } = useThree();
  const context = useAppContext();

  const projectData = Data[props.name];
  const cloudPosition = projectData.cloudPosition;
  const [ x, y, z ] = cloudPosition;

  useEffect(() => {
    if (context.defaultImage) {
      setStaticImage(projectData.image);
    }
  }, [context.defaultImage]);

  useFrame(() => {
    if (isHovered && cloudOpacity < 1 && (context.lookingAt === 'none' || context.lookingAt === 'projects')) {
      setCloudOpacity(prevOpacity => prevOpacity + 0.0025);
    } else if (cloudOpacity > 0) {
      setCloudOpacity(prevOpacity => prevOpacity - 0.0075);
    }
  });


  return (
    <>
      {context.lookingAt !== props.name ? (
        <LoadImage {...staticImage} />
      ) : (
        <>
          <LoadProject {...projectData.loadProject} />
          {projectData.nextProject && <NavText {...projectData.nextProject} />}
          {projectData.previousProject && <NavText {...projectData.previousProject} />}
          <NavText {...projectData.backText} />
        </>
      )}
      {cloudOpacity && (
        <Float floatingRange={[-1, 1]} rotationIntensity={0} speed={5}>
          <Clouds material={MeshBasicMaterial}>
            <Cloud
              fade={10}
              color="grey"
              opacity={cloudOpacity}
              speed={1}
              scale={[4, 2, 4]}
              position={cloudPosition}
              rotation={[0, Math.PI / 2, 0]}
              seed={0.52}
            />
            <Cloud
              fade={10}
              color="grey"
              opacity={cloudOpacity}
              speed={1}
              scale={[4, 2, 4]}
              position={[x - 10, y, z]}
              rotation={[0, Math.PI / 2, 0]}
              seed={0.52}
            />
          </Clouds>
        </Float>
      )}
      <mesh
        geometry={(nodes.Cube001_10011_0 as Mesh).geometry}
        material={materials['Baked.001']}
        position={[0, 0.015, 0]}
        scale={0.985}
        {...props}
        onPointerOver={(e) => {context.handlePointerIn(e); setIsHovered(true)}}
        onPointerOut={(e) => {context.handlePointerOut(e); setIsHovered(false)}}
        onClick={(e) => context.handleClick(e, controls, props)}
      />
    </>
  );
};

useGLTF.preload('models/arcade_machine.glb');

export default ArcadeMachine;