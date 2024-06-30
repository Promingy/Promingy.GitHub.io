import { Cloud, Clouds, Float, useGLTF } from '@react-three/drei'
import LoadProject from './LoadProject'
import SmallText from './SmallText'
import LoadImage from './LoadImage'
import { useEffect, useState, useCallback } from 'react'
import { useAppContext } from '../context'
import Data from '../data.json'
import { useThree, useFrame } from '@react-three/fiber'
import { clearTimeouts } from './Camera'
import { MeshBasicMaterial } from 'three'

export default function ArcadeMachine(props) {
  const { nodes, materials } = useGLTF('models/arcade_machine.glb')
  const [ staticImage, setStaticImage] = useState({...Data.images.loadingImage})
  const [ hovered, setHovered ] = useState(false)
  const [opacity, setOpacity] = useState(0)
  const { controls } = useThree();
  const context = useAppContext()


  useEffect(() => {
    if(context.defaultImage) {
      setStaticImage({...Data[props.name].image})
    }
  }, [context.defaultImage])

  useFrame(() => {
    if (hovered && opacity < 1 && context.lookingAt == 'none') setOpacity(opacity + 0.0025)
    else if (!hovered && opacity > 0) setOpacity(opacity - 0.0075);
  })

  const handleClick = useCallback((e) => {
    e.stopPropagation()

    context.setTransition(true)
    context.toggleTransitionTimeout(false)
    context.setPan(false);
    
    clearTimeouts();
    clearTimeout(context.panTimeout);

    context.whoosh.play();

    if (context.lookingAt == props.name) {
      context.setLookingAt('none')

      controls.setLookAt(-200, 175, 200, 0, 0, 0, true)
      context.toggleTransitionTimeout(true)
    }
    else {
      context.setLookingAt(props.name)
      controls.setLookAt(...props.moveTo, ...props.lookAt, true)
    }
}, [controls, context.setPan, context.whoosh])

  return (
    <>
    {context.lookingAt != props.name ? 
        <LoadImage {...staticImage}/>
        :
        <>
          <LoadProject  {...Data[props.name].loadProject}/>
          <SmallText {...Data[props.name].switchProject}/>
          <SmallText {...Data[props.name].backText}/>
        </>
      }

    {opacity && <Float floatingRange={[-1, 1]} rotationIntensity={0} speed={5}>
      <Clouds material={MeshBasicMaterial}>
        <Cloud fade={0.000000001} color='grey' opacity={opacity} speed={1} scale={[4, 2, 4]} position={Data[props.name].cloudPosition} rotation={[0, Math.PI / 2, 0]} seed={.52} />
        <Cloud fade={0.000000001} color='grey' opacity={opacity} speed={1} scale={[4, 2, 4]} position={[Data[props.name].cloudPosition[0] - 10, Data[props.name].cloudPosition[1], Data[props.name].cloudPosition[2]]} rotation={[0, Math.PI / 2, 0]} seed={.52} />
      </Clouds>
    </Float>}
    <group {...props} dispose={null} 
      onPointerOver={(e) => {
        context.handlePointerIn(e);
        setHovered(true);
      }} 
      onPointerOut={(e) => {
        context.handlePointerOut(e);
        setHovered(false);
      }}
      onClick={handleClick}
    >
      <mesh geometry={nodes.Cube001_10011_0.geometry} material={materials['Baked.001']} position={[0, 0.015, 0]} scale={0.985} />
    </group>
  )
    </>
  )
}

useGLTF.preload('models/arcade_machine.glb')
