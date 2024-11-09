import { Cloud, Clouds, Float, useGLTF } from '@react-three/drei';
import LoadProject from './LoadProject';
import NavText from './Text';
import LoadImage from './LoadImage';
import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context';
import Data from '../data.json';
import { useThree } from '@react-three/fiber';
import { Euler, Mesh, MeshBasicMaterial, Vector3 } from 'three';
import { useOpacityAnimation } from '../hooks/useOpacityAnimation';


interface LoadProject {
    url: string;
    position: Vector3;
    rotation: Euler;
}

interface NextProject {
    text: string;
    size: number;
    position: Vector3;
    rotation: Euler;
    moveTo: Vector3;
    lookAt: {
      (vector: Vector3): void;
      (x: number, y: number, z: number): void;
    };
    hoverColor: string;
    name: string;
    click: boolean;
}

interface BackText {
    text: string;
    size: number;
    position: Vector3;
    rotation: Euler;
    moveTo: Vector3;
    lookAt: {
      (vector: Vector3): void;
      (x: number, y: number, z: number): void;
    };
    color: string;
    name: string;
    click: boolean;
}

interface ImageProps {
    file: string;
    position: Vector3;
    rotation: Euler;
    scale: Vector3;
    basic: boolean;
}

interface ArcadeMachineProps {
    position: Vector3;
    scale: Vector3;
    rotation: Euler;
    moveTo: Vector3;
    lookAt: {
      (vector: Vector3): void;
      (x: number, y: number, z: number): void;
    };
    cloudPosition: Vector3;
    name: string;
    loadProject: LoadProject;
    nextProject: NextProject;
    backText: BackText;
    image: ImageProps;
}

interface StaticImage {
  file: string;
  position: Vector3;
  scale: Vector3;
  rotation: Euler;
  basic: boolean;
}

const loadingImagePosition = new Vector3(...Data.images.loadingImage.position);
const loadingImageRotation = new Euler(...Data.images.loadingImage.rotation);
const loadingImageScale = new Vector3(...Data.images.loadingImage.scale);

const ArcadeMachine: React.FC<ArcadeMachineProps> = (props) => {
  const { nodes, materials } = useGLTF('/models/arcade_machine.glb');
  const [staticImage, setStaticImage] = useState<StaticImage>({
    file: Data.images.loadingImage.file,
    position: loadingImagePosition,
    rotation: loadingImageRotation,
    scale: loadingImageScale,
    basic: Data.images.loadingImage.basic,
  });
  const { cloudOpacity, setIsHovered } = useOpacityAnimation();
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
      {cloudOpacity > 0 && (
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
        {...props}
        onPointerOver={(e) => {
          if (context.lookingAt == 'none' || context.lookingAt == 'projects') {
            context.handlePointerIn(e);
            setIsHovered(true);
          }
        }}
        onPointerOut={(e) => {context.handlePointerOut(e); setIsHovered(false)}}
        onClick={(e) => {
          if (context.lookingAt == 'none' || context.lookingAt == 'projects'){
            context.handleClick(e, controls, props)
          }
        }}
      />
    </>
  );
};

useGLTF.preload('/models/arcade_machine.glb');

export default ArcadeMachine;