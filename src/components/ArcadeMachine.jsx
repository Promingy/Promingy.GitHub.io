import { useGLTF } from '@react-three/drei'
import LoadProject from './LoadProject'
import SmallText from './SmallText'
import LoadImage from './LoadImage'
import { useEffect, useState } from 'react'
import { usePan } from '../main'
import Data from '../data.json'

export default function ArcadeMachine(props) {
  const { nodes, materials } = useGLTF('models/arcade_machine.glb')
  const { lookingAt, defaultImage } = usePan()
  const [ staticImage, setStaticImage] = useState({...Data.images.loadingImage})

  useEffect(() => {
    if(defaultImage) {
      setStaticImage({...Data[props.name].image})
    }
  }, [defaultImage])

  return (
    <>
    {lookingAt != props.name ? 
        <LoadImage {...staticImage}/>
        :
        <>
          <LoadProject  {...Data[props.name].loadProject}/>
          <SmallText {...Data[props.name].switchProject}/>
          <SmallText {...Data[props.name].backText}/>
        </>
      }
    <group {...props} dispose={null}>
      <mesh receiveShadow geometry={nodes.Cube001_10011_0.geometry} material={materials['10011']} position={[0, 0.015, 0]} scale={0.985} />
      <mesh receiveShadow geometry={nodes.Cylinder001_1001_0.geometry} material={materials['1001']} position={[0.271, -0.165, 0.001]} scale={0.306} />
    </group>
    </>
  )
}

useGLTF.preload('models/arcade_machine.glb')
