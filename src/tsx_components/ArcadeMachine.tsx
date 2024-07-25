import { Mesh, MeshBasicMaterial, Vector3 } from 'three'
import React, { useEffect, useState } from 'react'
import { useGLTF, Cloud, Clouds, Float } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import Data from '../data.json'
import { useAppContext } from '../context'
import { useFrame, useThree } from '@react-three/fiber'
import LoadImage from '../components/LoadImage'
import LoadProject from '../components/LoadProject'
import NavText from '../components/Text'

type GLTFResult = GLTF & {
  nodes: {
    Cube001_10011_0: Mesh
  }
  materials: {
    ['Baked.001']: MeshBasicMaterial
  }
}

type StaticImage = {
  file: string,
  position: number[],
  rotation: number[],
  scale: number[],
  basic: boolean
}

export default function Model(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('models/arcade_machine.glb') as GLTFResult;
  const [ staticImage, setStaticImage ] = useState<StaticImage>({ ...Data.images.loadingImage });
  const [ hovered, setHovered ] = useState<boolean>(false);
  const [ opacity, setOpacity ] = useState<number>(0);
  const { controls } = useThree();
  const context = useAppContext();
  const lookingAt = context.lookingAt == "none" || context.lookingAt == "projects";
  const dataName: string = props.name ?? "arcadeMachine1";

  const cloudPositionArr = Data[dataName].cloudPosition as [number, number, number];

  const cloudPosition = cloudPositionArr ? new Vector3(...cloudPositionArr) : undefined;
  const cloud2Position = cloudPositionArr ? new Vector3(cloudPositionArr[0] - 10, ...cloudPositionArr.slice(1)) : undefined;


  useEffect(() => {
    if (context.defaultImage) {
      setStaticImage({...Data[dataName].image})
    }
  },[context.defaultImage]);

  useFrame(() => {
    if (hovered && opacity < 1 && lookingAt) setOpacity(opacity + 0.0025);
    else if (opacity > 0) setOpacity(opacity - 0.0075);
  })


  return (
    <>
    {context.lookingAt != dataName ? 
          <LoadImage {...staticImage}/>
          :
          <>
            <LoadProject  {...Data[dataName].loadProject}/>
            {Data[dataName].nextProject && <NavText {...Data[dataName].nextProject}/>}
            {Data[dataName].previousProject && <NavText {...Data[dataName].previousProject}/>}
            <NavText {...Data[dataName].backText}/>
          </>
        }
      {opacity && 
      <Float floatingRange={[-1, 1]} rotationIntensity={0} speed={5}>
        <Clouds material={MeshBasicMaterial}>
          <Cloud
            fade={10}
            color='grey'
            opacity={opacity}
            speed={1}
            scale={[4, 2, 4]}
            position={cloudPosition}
            rotation={[0, Math.PI / 2, 0]}
            seed={.52}
          />
          <Cloud 
            fade={10}
            color='grey'
            opacity={opacity}
            speed={1}
            scale={[4, 2, 4]}
            position={cloud2Position}
            rotation={[0, Math.PI / 2, 0]}
            seed={.52}
          />
        </Clouds>
      </Float>}
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Cube001_10011_0.geometry} 
        material={materials['Baked.001']} 
        position={[0, 0.015, 0]} 
        scale={0.985}
        onPointerOver={(e) => {
          if (lookingAt){
            setHovered(true)
            context.handlePointerIn(e); 
          }
        }}
        onPointerOut={(e) => {
          if (lookingAt){
            setHovered(false)
            context.handlePointerOut(e); 
          }
        }}
        onClick={(e) => {
          if (lookingAt){
            setHovered(false)
            context.handleClick(e, controls, props)
          }
        }}
        />
    </group>
    </>
  )
}

useGLTF.preload('models/arcade_machine.glb')
